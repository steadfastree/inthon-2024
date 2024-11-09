import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from 'src/entities/donation.entity';
import { MaterialDonation } from 'src/entities/material-donation.entity';
import { CreateDonationDto } from './dtos/create-donation.dto';
import { UpdateDonationDto } from './dtos/update-donation.dto';
import { DonationDto } from './dtos/donation.dto';
import { DonationStatus } from 'src/common/enums/donation-status.enum';
import { Campaign } from 'src/entities/campaign.entity';
import { PickupLocation } from 'src/entities/pickup-location.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    @InjectRepository(MaterialDonation)
    private materialDonationRepository: Repository<MaterialDonation>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(PickupLocation)
    private pickupLocationRepository: Repository<PickupLocation>,
  ) {}

  async createDonation(
    createDonationDto: CreateDonationDto,
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
      userId: 1, // TODO: 실제 인증된 사용자 ID로 변경 필요
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
      reservedDate: donation.reservedDate,
      status: donation.status,
      userId: donation.userId,
      pickupLocationId: donation.pickupLocationId,
      materials: materialDonations.map((md) => ({
        materialId: md.materialId,
        materialName: '', // Material 엔티티에서 조회 필요
        amount: md.amount,
      })),
    };
  }

  async getDonations(): Promise<DonationDto[]> {
    const donations = await this.donationRepository.find({
      relations: ['materials'],
    });

    return donations.map((donation) =>
      this.toDonationDto(donation, donation.materials),
    );
  }

  async updateDonation(
    id: number,
    updateDonationDto: UpdateDonationDto,
  ): Promise<DonationDto> {
    await this.donationRepository.update(id, updateDonationDto);

    const updatedDonation = await this.donationRepository.findOne({
      where: { id },
      relations: ['materials'],
    });

    return this.toDonationDto(updatedDonation, updatedDonation.materials);
  }
}
