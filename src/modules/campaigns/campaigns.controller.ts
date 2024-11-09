import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { CampaignDto } from './dtos/campaign.dto';
import { CampaignsService } from './campaigns.service';

@ApiTags('캠페인')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @ApiOperation({ summary: '캠페인 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '캠페인 목록 조회 성공',
    type: [CampaignDto],
  })
  @Get()
  getCampaigns(
    @Query('status') status: CampaignStatus,
  ): Promise<CampaignDto[]> {
    return this.campaignsService.getCampaigns(status);
  }

  @ApiOperation({ summary: '캠페인 상세정보 조회' })
  @ApiResponse({
    status: 200,
    description: '캠페인 상세정보 조회 성공',
    type: CampaignDto,
  })
  @Get(':campaignId')
  getCampaign(@Param('campaignId') campaignId: number): Promise<CampaignDto> {
    return this.campaignsService.getCampaign(campaignId);
  }

  @ApiOperation({ summary: '캠페인 생성' })
  @ApiResponse({
    status: 201,
    description: '캠페인 생성 성공',
    type: CampaignDto,
  })
  @Post()
  createCampaign(
    @Body() createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignDto> {
    return this.campaignsService.createCampaign(createCampaignDto);
  }

  @ApiOperation({ summary: '캠페인 수정' })
  @ApiResponse({
    status: 200,
    description: '캠페인 수정 성공',
    type: CampaignDto,
  })
  @Put(':campaignId')
  updateCampaign(
    @Param('campaignId') campaignId: number,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ): Promise<CampaignDto> {
    return this.campaignsService.updateCampaign(campaignId, updateCampaignDto);
  }
}
