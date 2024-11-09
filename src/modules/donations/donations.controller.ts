import { Body, Controller, Get, Post, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DonationStatus } from 'src/common/enums/donation-status.enum';

@ApiTags('기부')
@Controller('donations')
export class DonationsController {
  @ApiOperation({ summary: '기부 요청 전송' })
  @ApiResponse({ status: 201, description: '기부 요청 전송 성공' })
  @Post()
  createDonation(@Body() createDonationDto: any) {
    return {};
  }

  @ApiOperation({ summary: '생성한 기부 목록 조회' })
  @ApiResponse({ status: 200, description: '기부 목록 조회 성공' })
  @Get()
  getDonations() {
    return [];
  }

  @ApiOperation({ summary: '기부 상태 업데이트' })
  @ApiResponse({ status: 200, description: '기부 상태 업데이트 성공' })
  @Put(':donationId')
  updateDonation(
    @Param('donationId') donationId: string,
    @Body('status') status: DonationStatus,
  ) {
    return {};
  }
}
