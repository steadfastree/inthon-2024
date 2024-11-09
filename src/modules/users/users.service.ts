import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserDto } from './dtos/user.dto';
import { CreditHistoryDto } from './dtos/credit-history.dto';
import { CampaignDonatedDto } from './dtos/campaign-donated.dto';
import { Donation } from 'src/entities/donation.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
  ) { }

  async getMyPage(userId: number): Promise<UserDto> {
    // TODO: 실제 인증된 사용자 ID를 사용하도록 수정
    const user = await this.userRepository.findOneBy({ id: userId });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      credit: user.credit,
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

  async getCampaignsDonated(userId: number): Promise<CampaignDonatedDto[]> {
    const donations = await this.donationRepository.find({
      where: { userId: userId },
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
