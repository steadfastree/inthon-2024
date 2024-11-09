import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dtos/create-donation.dto';
import { UpdateDonationDto } from './dtos/update-donation.dto';
import { DonationDto } from './dtos/donation.dto';
import { UserGuard } from '../auth/guard/user.guard';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guard/admin.guard';

@ApiBearerAuth('access-token')
@ApiTags('기부')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @ApiOperation({ summary: '기부 요청 전송' })
  @ApiResponse({
    status: 201,
    description: '기부 요청 전송 성공',
    type: DonationDto,
  })
  @Post()
  createDonation(
    @Req() req,
    @Body() createDonationDto: CreateDonationDto,
  ): Promise<DonationDto> {
    return this.donationsService.createDonation(req.user.id, createDonationDto);
  }

  @UseGuards(AuthGuard('jwt'), UserGuard)
  @ApiOperation({ summary: '생성한 기부 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '기부 목록 조회 성공',
    type: [DonationDto],
  })
  @Get()
  getDonations(@Req() req): Promise<DonationDto[]> {
    return this.donationsService.getDonations(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
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
  @Put(':donationId')
  updateDonation(
    @Param('donationId') donationId: number,
    @Body() updateDonationDto: UpdateDonationDto,
  ): Promise<DonationDto> {
    return this.donationsService.updateDonation(donationId, updateDonationDto);
  }
}
