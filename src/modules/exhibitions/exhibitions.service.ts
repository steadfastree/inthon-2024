import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibition } from 'src/entities/exhibition.entity';
import { ExhibitionDto } from './dtos/exhibition.dto';
import { CreateExhibitionDto } from './dtos/create-exhibition.dto';
import { UpdateExhibitionDto } from './dtos/update-exhibition.dto';
import { Campaign } from 'src/entities/campaign.entity';

@Injectable()
export class ExhibitionsService {
  constructor(
    @InjectRepository(Exhibition)
    private exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {}

  private async toExhibitionDto(
    exhibition: Exhibition,
  ): Promise<ExhibitionDto> {
    const campaign = await this.campaignRepository.findOne({
      where: { id: exhibition.campaign.id },
      relations: ['artist', 'materials', 'materials.material'],
    });

    return {
      id: exhibition.id,
      title: exhibition.title,
      description: exhibition.description,
      startDate: exhibition.startDate,
      endDate: exhibition.endDate,
      status: exhibition.status,
      address: exhibition.address,
      latitude: exhibition.latitude,
      longitude: exhibition.longitude,
      campaign: {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        status: campaign.status,
        artist: {
          id: campaign.artist.id,
          name: campaign.artist.name,
        },
        materials: campaign.materials.map((mc) => ({
          materialId: mc.material.id,
          materialName: mc.material.name,
          requiredAmount: mc.requiredAmount,
          donatedAmount: mc.donatedAmount,
          isFulfilled: mc.isFulfilled,
        })),
      },
    };
  }

  async getExhibitions(): Promise<ExhibitionDto[]> {
    const exhibitions = await this.exhibitionRepository.find({
      relations: ['campaign'],
    });
    return Promise.all(
      exhibitions.map((exhibition) => this.toExhibitionDto(exhibition)),
    );
  }

  async getExhibition(exhibitionId: number): Promise<ExhibitionDto> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibitionId },
      relations: ['campaign'],
    });

    if (!exhibition) {
      throw new NotFoundException('전시를 찾을 수 없습니다.');
    }

    return this.toExhibitionDto(exhibition);
  }

  async createExhibition(
    createExhibitionDto: CreateExhibitionDto,
  ): Promise<ExhibitionDto> {
    const campaign = await this.campaignRepository.findOneBy({
      id: createExhibitionDto.campaignId,
    });

    if (!campaign) {
      throw new NotFoundException('캠페인을 찾을 수 없습니다.');
    }

    const exhibition = this.exhibitionRepository.create({
      ...createExhibitionDto,
      campaign,
    });

    const savedExhibition = await this.exhibitionRepository.save(exhibition);
    return this.toExhibitionDto(savedExhibition);
  }

  async updateExhibition(
    exhibitionId: number,
    updateExhibitionDto: UpdateExhibitionDto,
  ): Promise<ExhibitionDto> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: exhibitionId },
      relations: ['campaign'],
    });

    if (!exhibition) {
      throw new NotFoundException('전시를 찾을 수 없습니다.');
    }

    Object.assign(exhibition, updateExhibitionDto);
    const updatedExhibition = await this.exhibitionRepository.save(exhibition);
    return this.toExhibitionDto(updatedExhibition);
  }
}
