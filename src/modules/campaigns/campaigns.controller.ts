import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';

@ApiTags('캠페인')
@Controller('campaigns')
export class CampaignsController {
  @ApiOperation({ summary: '캠페인 목록 조회' })
  @ApiResponse({ status: 200, description: '캠페인 목록 조회 성공' })
  @Get()
  getCampaigns(@Query('status') status: CampaignStatus) {
    return [];
  }

  @ApiOperation({ summary: '캠페인 상세정보 조회' })
  @ApiResponse({ status: 200, description: '캠페인 상세정보 조회 성공' })
  @Get(':campaignId')
  getCampaign(@Param('campaignId') campaignId: string) {
    return {};
  }

  @ApiOperation({ summary: '캠페인 진행내역 조회' })
  @ApiResponse({ status: 200, description: '캠페인 진행내역 조회 성공' })
  @Get(':campaignId/feeds')
  getCampaignFeeds(@Param('campaignId') campaignId: string) {
    return [];
  }

  @ApiOperation({ summary: '캠페인 생성' })
  @ApiResponse({ status: 201, description: '캠페인 생성 성공' })
  @Post()
  createCampaign(@Body() createCampaignDto: any) {
    return {};
  }

  @ApiOperation({ summary: '캠페인 수정' })
  @ApiResponse({ status: 200, description: '캠페인 수정 성공' })
  @Put(':campaignId')
  updateCampaign(
    @Param('campaignId') campaignId: string,
    @Body() updateCampaignDto: any,
  ) {
    return {};
  }

  @ApiOperation({ summary: '캠페인 피드 생성' })
  @ApiResponse({ status: 201, description: '캠페인 피드 생성 성공' })
  @Post(':campaignId/feeds')
  createCampaignFeed(
    @Param('campaignId') campaignId: string,
    @Body() createFeedDto: any,
  ) {
    return {};
  }
}
