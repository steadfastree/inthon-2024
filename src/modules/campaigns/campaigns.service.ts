import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { CampaignDto } from './dtos/campaign.dto';
import { MaterialCampaign } from 'src/entities/material-campaign.entity';
import { Material } from 'src/entities/material.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(MaterialCampaign)
    private materialCampaignRepository: Repository<MaterialCampaign>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  async getCampaigns(status?: CampaignStatus): Promise<CampaignDto[]> {
    const query = this.campaignRepository
      .createQueryBuilder('campaign')
      .leftJoinAndSelect('campaign.artist', 'artist')
      .leftJoinAndSelect('campaign.materials', 'materials')
      .leftJoinAndSelect('materials.material', 'material')
      .orderBy('campaign.startDate', 'DESC');

    if (status) {
      query.where('campaign.status = :status', { status });
    }

    const campaigns = await query.getMany();
    return campaigns.map((campaign) => this.toCampaignDto(campaign));
  }

  async getCampaign(id: number): Promise<CampaignDto> {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
      relations: ['artist', 'materials', 'materials.material'],
    });
    return this.toCampaignDto(campaign);
  }

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignDto> {
    const campaign = this.campaignRepository.create(createCampaignDto);
    const savedCampaign = await this.campaignRepository.save(campaign);
    return this.toCampaignDto(savedCampaign);
  }

  async updateCampaign(
    id: number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<CampaignDto> {
    await this.campaignRepository.update(id, updateCampaignDto);
    return this.getCampaign(id);
  }

  private toCampaignDto(campaign: Campaign): CampaignDto {
    return {
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      status: campaign.status,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
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
}
