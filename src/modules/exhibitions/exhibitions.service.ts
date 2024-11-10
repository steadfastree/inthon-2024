import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibition } from 'src/entities/exhibition.entity';
import { ExhibitionDto } from './dtos/exhibition.dto';
import { CreateExhibitionDto } from './dtos/create-exhibition.dto';
import { UpdateExhibitionDto } from './dtos/update-exhibition.dto';
import { Campaign } from 'src/entities/campaign.entity';
import { ExhibitionStatus } from 'src/common/enums/exhibition-status.enum';
import { ExhibitionListDto } from './dtos/exhibition-list.dto';
import { formatToKST } from 'src/common/utils/date.util';

@Injectable()
export class ExhibitionsService {
  constructor(
    @InjectRepository(Exhibition)
    private exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {}

  private toExhibitionDto(exhibition: Exhibition): ExhibitionDto {
    return {
      id: exhibition.id,
      title: exhibition.title,
      description: exhibition.description,
      startDate: formatToKST.dateTime(exhibition.startDate),
      endDate: formatToKST.dateTime(exhibition.endDate),
      status: exhibition.status,
      address: exhibition.address,
      latitude: exhibition.latitude,
      longitude: exhibition.longitude,
      imageUrl: exhibition.imageUrl,
      campaign: exhibition.campaign
        ? {
            id: exhibition.campaign.id,
            title: exhibition.campaign.title,
            description: exhibition.campaign.description,
            startDate: formatToKST.dateTime(exhibition.campaign.startDate),
            endDate: formatToKST.dateTime(exhibition.campaign.endDate),
            status: exhibition.campaign.status,
            artist: exhibition.campaign.artist,
            materials: [],
          }
        : undefined,
    };
  }

  private toExhibitionListDto(exhibition: Exhibition): ExhibitionListDto {
    return {
      id: exhibition.id,
      title: exhibition.title,
      description: exhibition.description,
      startDate: formatToKST.dateTime(exhibition.startDate),
      endDate: formatToKST.dateTime(exhibition.endDate),
      status: exhibition.status,
      address: exhibition.address,
      latitude: exhibition.latitude,
      longitude: exhibition.longitude,
    };
  }

  async getExhibitions(
    status?: ExhibitionStatus,
  ): Promise<ExhibitionListDto[]> {
    const query = this.exhibitionRepository
      .createQueryBuilder('exhibition')
      .orderBy('exhibition.startDate', 'DESC');

    if (status) {
      query.where('exhibition.status = :status', { status });
    }

    const exhibitions = await query.getMany();
    return exhibitions.map((exhibition) =>
      this.toExhibitionListDto(exhibition),
    );
  }

  async getExhibition(id: number): Promise<ExhibitionDto> {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id },
      relations: {
        campaign: {
          artist: true,
        },
      },
    });

    if (!exhibition) {
      throw new NotFoundException('전시를 찾을 수 없습니다.');
    }

    return this.toExhibitionDto(exhibition);
  }

  async createExhibition(
    createExhibitionDto: CreateExhibitionDto,
  ): Promise<ExhibitionDto> {
    const campaign = await this.campaignRepository.findOne({
      where: { id: createExhibitionDto.campaignId },
    });
    if (!campaign) {
      throw new NotFoundException('캠페인을 찾을 수 없습니다.');
    }

    const exhibition = this.exhibitionRepository.create({
      ...createExhibitionDto,
      campaign,
      status: ExhibitionStatus.UPCOMING,
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
