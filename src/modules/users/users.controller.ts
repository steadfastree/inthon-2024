import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: '마이페이지 조회' })
  @ApiResponse({ status: 200, description: '마이페이지 조회 성공' })
  @Get()
  getMyPage() {
    return {};
  }

  @ApiOperation({ summary: '크레딧 내역 조회' })
  @ApiResponse({ status: 200, description: '크레딧 내역 조회 성공' })
  @Get('credits')
  getCredits() {
    return [];
  }

  @ApiOperation({ summary: '참여 캠페인 목록 조회' })
  @ApiResponse({ status: 200, description: '참여 캠페인 목록 조회 성공' })
  @Get('campaigns-donated')
  getCampaignsDonated() {
    return [];
  }
}
