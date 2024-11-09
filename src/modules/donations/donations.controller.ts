import { Body, Controller, Get, Post, Param, Put, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dtos/create-donation.dto';
import { UpdateDonationDto } from './dtos/update-donation.dto';
import { DonationDto } from './dtos/donation.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '../auth/guard/user.guard';

@ApiTags('기부')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) { }

  @ApiOperation({ summary: '기부 요청 전송' })
  @ApiResponse({
    status: 201,
    description: '기부 요청 전송 성공',
    type: DonationDto,
  })
  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Post()
  createDonation(
    @Body() createDonationDto: CreateDonationDto,
    @Req() req,
  ): Promise<DonationDto> {
    return this.donationsService.createDonation(createDonationDto, req.user.id);
  }

  @ApiOperation({ summary: '생성한 기부 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '기부 목록 조회 성공',
    type: [DonationDto],
  })
  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Get()
  getDonations(@Req() req): Promise<DonationDto[]> {
    return this.donationsService.getDonations(req.user.id);
  }

  @ApiOperation({
    summary: '기부 상태 업데이트',
    description:
      '기부 상태를 업데이트합니다. (가능한 상태: reserved | completed | cancelled | no_show)',
  })
  @ApiResponse({
    status: 200,
    description: '기부 상태 업데이트 성공',
    type: DonationDto,
  })
  // UserGuard 필요한가? 아니면 AdminGuard? 
  @Put(':donationId')
  updateDonation(
    @Param('donationId') donationId: number,
    @Body() updateDonationDto: UpdateDonationDto,
  ): Promise<DonationDto> {
    return this.donationsService.updateDonation(donationId, updateDonationDto);
  }
}
