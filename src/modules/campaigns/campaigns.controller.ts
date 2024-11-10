import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';
import { CampaignDto } from './dtos/campaign.dto';
import { CampaignsService } from './campaigns.service';
import { CampaignFeedDto } from './dtos/campaign-feed.dto';
import { CreateCampaignFeedDto } from './dtos/create-campaign-feed.dto';
import { CampaignListDto } from './dtos/campaign-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { ArtistGuard } from '../auth/guard/artist.guard';

@ApiBearerAuth('access-token')
@ApiTags('캠페인')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  // Status에 맞는 캠페인 목록 내놓는 메서드
  // 가드
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '캠페인 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '캠페인 목록 조회 성공',
    type: [CampaignListDto],
  })
  @ApiQuery({
    name: 'status',
    enum: CampaignStatus,
    required: false,
    description: '캠페인 상태로 필터링 (funding | in_production | completed)',
  })
  @Get()
  getCampaigns(
    @Query('status') status?: CampaignStatus,
  ): Promise<CampaignListDto[]> {
    return this.campaignsService.getCampaigns(status);
  }

  // 캠페인 상세정보.
  @UseGuards(AuthGuard('jwt'))
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

  // 가드로 role 체크해서 artist만 생성 가능하도록
  @UseGuards(AuthGuard('jwt'), ArtistGuard)
  @ApiOperation({ summary: '캠페인 생성' })
  @ApiResponse({
    status: 201,
    description: '캠페인 생성 성공',
    type: CampaignDto,
  })
  @Post()
  createCampaign(
    @Req() req,
    @Body() createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignDto> {
    return this.campaignsService.createCampaign(req.user.id, createCampaignDto);
  }

  // 가드로 role 체크해서 artist 또는 관리자만 수정 가능하도록
  @UseGuards(AuthGuard('jwt'), ArtistGuard)
  @ApiOperation({
    summary: '캠페인 상태 업데이트',
    description:
      '캠페인의 상태를 업데이트합니다. (가능한 상태: funding | in_production | completed)',
  })
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

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '캠페인 피드 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '캠페인 피드 목록 조회 성공',
    type: [CampaignFeedDto],
  })
  @Get(':campaignId/feeds')
  getCampaignFeeds(
    @Param('campaignId') campaignId: number,
  ): Promise<CampaignFeedDto[]> {
    return this.campaignsService.getCampaignFeeds(campaignId);
  }

  @UseGuards(AuthGuard('jwt'), ArtistGuard)
  @ApiOperation({ summary: '캠페인 피드 생성' })
  @ApiResponse({
    status: 201,
    description: '캠페인 피드 생성 성공',
    type: CampaignFeedDto,
  })
  @Post(':campaignId/feeds')
  createCampaignFeed(
    @Param('campaignId') campaignId: number,
    @Body() createCampaignFeedDto: CreateCampaignFeedDto,
  ): Promise<CampaignFeedDto> {
    return this.campaignsService.createCampaignFeed(
      campaignId,
      createCampaignFeedDto,
    );
  }
}
