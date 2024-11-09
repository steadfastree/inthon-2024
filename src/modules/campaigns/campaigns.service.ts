import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';
import { CampaignFeed } from 'src/entities/campaign-feed.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { MaterialCampaign } from 'src/entities/material-campaign.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(CampaignFeed)
    private campaignFeedRepository: Repository<CampaignFeed>,
    @InjectRepository(MaterialCampaign)
    private materialCampaignRepository: Repository<MaterialCampaign>,
  ) {}

  async getCampaigns(status: CampaignStatus) {
    const query = this.campaignRepository
      .createQueryBuilder('campaign')
      .leftJoinAndSelect('campaign.artist', 'artist')
      .leftJoinAndSelect('campaign.materials', 'materials')
      .leftJoinAndSelect('materials.material', 'material')
      .where('campaign.status = :status', { status })
      .orderBy('campaign.startDate', 'DESC');

    return query.getMany();
  }

  async getCampaign(campaignId: number) {
    const query = this.campaignRepository
      .createQueryBuilder('campaign')
      .leftJoinAndSelect('campaign.artist', 'artist')
      .leftJoinAndSelect('campaign.materials', 'materials')
      .leftJoinAndSelect('materials.material', 'material')
      .where('campaign.id = :campaignId', { campaignId });
  }

  async getCampaignFeeds(campaignId: number) {
    const query = this.campaignFeedRepository
      .createQueryBuilder('campaignFeed')
      .leftJoinAndSelect('campaignFeed.author', 'author')
      .where('campaignFeed.campaignId = :campaignId', { campaignId });
  }

  async createCampaign(createCampaignDto: any) {
    const campaign = this.campaignRepository.create(createCampaignDto);
    return this.campaignRepository.save(campaign);
  }

  async updateCampaign(campaignId: number, updateCampaignDto: any) {
    const campaign = await this.campaignRepository.findOneBy({
      id: campaignId,
    });
    return this.campaignRepository.save(campaign);
  }

  async createCampaignFeed(campaignId: number, createFeedDto: any) {
    const feed = this.campaignFeedRepository.create(createFeedDto);
    return this.campaignFeedRepository.save(feed);
  }
}
