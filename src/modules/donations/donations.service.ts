import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Donation } from 'src/entities/donation.entity';
import { MaterialDonation } from 'src/entities/material-donation.entity';
import { CreateDonationDto } from './dtos/create-donation.dto';
import { UpdateDonationDto } from './dtos/update-donation.dto';
import { DonationDto } from './dtos/donation.dto';
import { DonationStatus } from 'src/common/enums/donation-status.enum';
import { Campaign } from 'src/entities/campaign.entity';
import { PickupLocation } from 'src/entities/pickup-location.entity';
import { EntityManager } from 'typeorm';
import { LessThanOrEqual } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { MaterialCampaign } from 'src/entities/material-campaign.entity';
import { Material } from 'src/entities/material.entity';
import { UserBadge } from 'src/entities/user-badge.entity';
import { Badge } from 'src/entities/badge.entity';
import { formatToKST } from 'src/common/utils/date.util';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    @InjectRepository(MaterialDonation)
    private materialDonationRepository: Repository<MaterialDonation>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(MaterialCampaign)
    private materialCampaignRepository: Repository<MaterialCampaign>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(UserBadge)
    private userBadgeRepository: Repository<UserBadge>,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
    @InjectRepository(PickupLocation)
    private pickupLocationRepository: Repository<PickupLocation>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) { }

  async createDonation(
    createDonationDto: CreateDonationDto, userId: number,
  ): Promise<DonationDto> {
    // 캠페인 존재 여부 확인
    const campaign = await this.campaignRepository.findOne({
      where: { id: createDonationDto.campaignId },
    });
    if (!campaign) {
      throw new NotFoundException('캠페인을 찾을 수 없습니다.');
    }

    // 수거장소 존재 여부 확인
    const pickupLocation = await this.pickupLocationRepository.findOne({
      where: { id: createDonationDto.pickupLocationId },
    });
    if (!pickupLocation) {
      throw new NotFoundException('수거 장소를 찾을 수 없습니다.');
    }

    // 기본 donation 엔티티 생성
    const donation = this.donationRepository.create({
      reservedDate: createDonationDto.reservedDate,
      pickupLocationId: createDonationDto.pickupLocationId,
      campaignId: createDonationDto.campaignId,
      status: DonationStatus.RESERVED,
      userId: userId, // TODO: 실제 인증된 사용자 ID로 변경 필요
    });

    // donation 저장
    const savedDonation = await this.donationRepository.save(donation);

    // material donations 생성 및 저장
    const materialDonations = await Promise.all(
      createDonationDto.materials.map((material) =>
        this.materialDonationRepository.save({
          materialId: material.materialId,
          amount: material.amount,
          donationId: savedDonation.id,
        }),
      ),
    );

    return this.toDonationDto(savedDonation, materialDonations);
  }

  private toDonationDto(
    donation: Donation,
    materialDonations: MaterialDonation[],
  ): DonationDto {
    return {
      id: donation.id,
      campaignId: donation.campaignId,
      reservedDate: formatToKST.dateTime(donation.reservedDate),
      status: donation.status,
      userId: donation.userId,
      pickupLocationId: donation.pickupLocationId,
      materials: materialDonations.map((md) => ({
        materialId: md.materialId,
        materialName: md.material.name,
        amount: md.amount,
      })),
    };
  }

  async getDonations(userId: number): Promise<DonationDto[]> {
    const donations = await this.donationRepository.find({
      where: { userId },
      relations: ['materials', 'materials.material'],
    });

    return donations.map((donation) =>
      this.toDonationDto(donation, donation.materials),
    );
  }

  async updateDonation(
    id: number,
    updateDonationDto: UpdateDonationDto,
  ): Promise<DonationDto> {
    const donation = await this.donationRepository.findOne({
      where: { id },
      relations: ['materials', 'campaign'],
    });

    if (!donation) {
      throw new NotFoundException('기부를 찾을 수 없습니다.');
    }

    // 기부 완료 상태로 변경되는 경우
    if (updateDonationDto.status === DonationStatus.COMPLETED) {
      await this.handleDonationCompletion(donation);
    } else {
      await this.donationRepository.update(id, updateDonationDto);
    }

    const updatedDonation = await this.donationRepository.findOne({
      where: { id },
      relations: ['materials'],
    });

    return this.toDonationDto(updatedDonation, updatedDonation.materials);
  }

  private async handleDonationCompletion(donation: Donation): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        // 1. 기부 상태 업데이트
        donation.status = DonationStatus.COMPLETED;
        await manager.save(donation);

        // 2. 캠페인 재료 충족량 업데이트
        await this.updateCampaignMaterials(manager, donation);

        // 3. 유저 크레딧 업데이트
        const creditAmount = await this.calculateCreditAmount(donation);
        await this.updateUserCredit(manager, donation.userId, creditAmount);

        // 4. 뱃지 부여 체크
        await this.checkAndAssignBadges(manager, donation.userId);
      });
    } catch (error) {
      // 에러 로깅
      console.error('기부 완료 처리 중 오류 발생:', error);

      // 사용자 정의 예외로 변환하여 던지기
      throw new InternalServerErrorException(
        '기부 완료 처리 중 오류가 발생했습니다. 다시 시도해 주세요.',
      );
    }
  }

  private async updateCampaignMaterials(
    manager: EntityManager,
    donation: Donation,
  ): Promise<void> {
    for (const materialDonation of donation.materials) {
      const campaignMaterial = await manager.findOne(MaterialCampaign, {
        where: {
          campaignId: donation.campaignId,
          materialId: materialDonation.materialId,
        },
      });

      if (campaignMaterial) {
        campaignMaterial.donatedAmount += materialDonation.amount;
        campaignMaterial.isFulfilled =
          campaignMaterial.donatedAmount >= campaignMaterial.requiredAmount;
        await manager.save(campaignMaterial);
      }
    }
  }

  private async calculateCreditAmount(donation: Donation): Promise<number> {
    let totalCredit = 0;

    for (const materialDonation of donation.materials) {
      const material = await this.materialRepository.findOne({
        where: { id: materialDonation.materialId },
      });

      if (material) {
        totalCredit += material.creditPerGram * materialDonation.amount;
      }
    }

    return totalCredit;
  }

  private async updateUserCredit(
    manager: EntityManager,
    userId: number,
    creditAmount: number,
  ): Promise<void> {
    const user = await manager.findOne(User, {
      where: { id: userId },
    });

    if (user) {
      user.credit += creditAmount;
      await manager.save(user);
    }
  }

  private async checkAndAssignBadges(
    manager: EntityManager,
    userId: number,
  ): Promise<void> {
    const user = await manager.findOne(User, {
      where: { id: userId },
    });

    if (!user) return;

    const eligibleBadges = await manager.find(Badge, {
      where: {
        requiredCredit: LessThanOrEqual(user.credit),
      },
    });

    for (const badge of eligibleBadges) {
      const existingUserBadge = await manager.findOne(UserBadge, {
        where: {
          userId,
          badgeId: badge.id,
        },
      });

      if (!existingUserBadge) {
        await manager.save(UserBadge, {
          userId,
          badgeId: badge.id,
        });
      }
    }
  }
}
