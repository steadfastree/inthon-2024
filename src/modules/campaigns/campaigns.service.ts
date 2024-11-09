import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { CampaignDto } from './dtos/campaign.dto';
import { MaterialCampaign } from 'src/entities/material-campaign.entity';
import { Material } from 'src/entities/material.entity';
import { CampaignFeed } from 'src/entities/campaign-feed.entity';
import { CampaignFeedDto } from './dtos/campaign-feed.dto';
import { CreateCampaignFeedDto } from './dtos/create-campaign-feed.dto';
import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/common/enums/user-role.enum';
import { CampaignListDto } from './dtos/campaign-list.dto';
import { formatToKST } from 'src/common/utils/date.util';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(MaterialCampaign)
    private materialCampaignRepository: Repository<MaterialCampaign>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(CampaignFeed)
    private campaignFeedRepository: Repository<CampaignFeed>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getCampaigns(status?: CampaignStatus): Promise<CampaignListDto[]> {
    const query = this.campaignRepository
      .createQueryBuilder('campaign')
      .leftJoinAndSelect('campaign.artist', 'artist')
      .orderBy('campaign.startDate', 'DESC');

    if (status) {
      query.where('campaign.status = :status', { status });
    }

    const campaigns = await query.getMany();
    return campaigns.map((campaign) => this.toCampaignListDto(campaign));
  }

  // 캠페인 상세정보 + 캠페인을 생성한 유저(아티스트) + 캠페인에 필요한 재료 이름과 필요한 양, 기부한 양
  async getCampaign(id: number): Promise<CampaignDto> {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
      relations: ['artist', 'materials', 'materials.material'],
    });
    return this.toCampaignDto(campaign);
  }

  async getCampaignFeeds(campaignId: number): Promise<CampaignFeedDto[]> {
    const feeds = await this.campaignFeedRepository
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.campaign', 'campaign')
      .where('campaign.id = :campaignId', { campaignId })
      .orderBy('feed.created_at', 'DESC')
      .getMany();

    return feeds.map((feed) => this.toCampaignFeedDto(feed));
  }

  async createCampaign(
    artistId: number,
    createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignDto> {
    // 아티스트 존재 여부 확인
    const artist = await this.userRepository.findOne({
      where: { id: artistId, role: UserRole.ARTIST },
    });

    if (!artist) {
      throw new NotFoundException('아티스트를 찾을 수 없습니다.');
    }

    const campaign = this.campaignRepository.create({
      ...createCampaignDto,
      artistId,
      status: CampaignStatus.FUNDING,
    });

    const savedCampaign = await this.campaignRepository.save(campaign);

    // 재료 정보 저장
    await Promise.all(
      createCampaignDto.materials.map((material) =>
        this.materialCampaignRepository.save({
          campaignId: savedCampaign.id,
          materialId: material.materialId,
          requiredAmount: material.requiredAmount,
          donatedAmount: 0,
        }),
      ),
    );

    return this.getCampaign(savedCampaign.id);
  }

  async updateCampaign(
    id: number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<CampaignDto> {
    await this.campaignRepository.update(id, updateCampaignDto);
    return this.getCampaign(id);
  }

  async createCampaignFeed(
    campaignId: number,
    createCampaignFeedDto: CreateCampaignFeedDto,
  ): Promise<CampaignFeedDto> {
    const campaign = await this.campaignRepository.findOneBy({
      id: campaignId,
    });

    if (!campaign) {
      throw new NotFoundException('캠페인을 찾을 수 없습니다.');
    }

    // 캠페인 상태 체크
    if (campaign.status === CampaignStatus.FUNDING) {
      throw new BadRequestException(
        '제작 중이거나 완료된 캠페인에만 피드를 작성할 수 있습니다.',
      );
    }

    // TODO: 실제 인증된 사용자 ID를 사용하도록 수정
    const authorId = 2;

    const feed = this.campaignFeedRepository.create({
      ...createCampaignFeedDto,
      campaign,
      authorId,
    });

    const savedFeed = await this.campaignFeedRepository.save(feed);
    return this.toCampaignFeedDto(savedFeed);
  }

  private toCampaignDto(campaign: Campaign): CampaignDto {
    return {
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      status: campaign.status,
      startDate: formatToKST.dateTime(campaign.startDate),
      endDate: formatToKST.dateTime(campaign.endDate),
      artist: {
        id: campaign.artist.id,
        name: campaign.artist.name,
      },
      materials: campaign.materials.map((mc) => ({
        materialId: mc.material.id,
        materialName: mc.material.name,
        requiredAmount: mc.requiredAmount,
        donatedAmount: mc.donatedAmount,
        isFulfilled: mc.donatedAmount >= mc.requiredAmount,
      })),
    };
  }

  private toCampaignFeedDto(feed: CampaignFeed): CampaignFeedDto {
    return {
      id: feed.id,
      content: feed.content,
      authorId: feed.authorId,
      campaignId: feed.campaign.id,
      createdAt: formatToKST.dateTime(feed.createdAt),
    };
  }

  private toCampaignListDto(campaign: Campaign): CampaignListDto {
    return {
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      status: campaign.status,
      startDate: formatToKST.dateTime(campaign.startDate),
      endDate: formatToKST.dateTime(campaign.endDate),
      artist: {
        id: campaign.artist.id,
        name: campaign.artist.name,
      },
    };
  }
}
