import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserDto } from './dtos/user.dto';
import { CreditHistoryDto } from './dtos/credit-history.dto';
import { CampaignDonatedDto } from './dtos/campaign-donated.dto';
import { Donation } from 'src/entities/donation.entity';
import { UserBadge } from 'src/entities/user-badge.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserBadge)
    private userBadgeRepository: Repository<UserBadge>,
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
  ) {}

  async getMyPage(userId: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badges', 'badges.badge'],
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      credit: user.credit,
      badges: user.badges.map((userBadge) => ({
        id: userBadge.badge.id,
        name: userBadge.badge.name,
        description: userBadge.badge.description,
      })),
    };
  }

  // async getCredits(): Promise<CreditHistoryDto[]> {
  //   // TODO: 크레딧 히스토리 엔티티 구현 후 실제 데이터 조회로 수정
  //   return [
  //     {
  //       id: 1,
  //       amount: 100,
  //       createdAt: new Date(),
  //       description: '플라스틱 기부',
  //     },
  //   ];
  // }

  async getCampaignsDonated(): Promise<CampaignDonatedDto[]> {
    const donations = await this.donationRepository.find({
      where: { userId: 1 },
      relations: ['materials', 'materials.material', 'campaign'],
    });

    const campaignMap = new Map<number, CampaignDonatedDto>();

    donations.forEach((donation) => {
      const campaign = donation.campaign;
      if (!campaign) return;

      if (!campaignMap.has(campaign.id)) {
        campaignMap.set(campaign.id, {
          id: campaign.id,
          title: campaign.title,
          status: campaign.status,
          donations: [],
        });
      }

      const campaignDonated = campaignMap.get(campaign.id);
      donation.materials.forEach((materialDonation) => {
        campaignDonated.donations.push({
          materialName: materialDonation.material.name,
          amount: materialDonation.amount,
        });
      });
    });

    return Array.from(campaignMap.values());
  }
}
