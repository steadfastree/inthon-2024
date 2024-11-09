import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
