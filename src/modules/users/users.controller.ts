import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { CreditHistoryDto } from './dtos/credit-history.dto';
import { CampaignDonatedDto } from './dtos/campaign-donated.dto';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '마이페이지 조회' })
  @ApiResponse({
    status: 200,
    description: '마이페이지 조회 성공',
    type: UserDto,
  })
  @Get()
  getMyPage(): Promise<UserDto> {
    return this.usersService.getMyPage();
  }

  // @ApiOperation({ summary: '크레딧 내역 조회' })
  // @ApiResponse({
  //   status: 200,
  //   description: '크레딧 내역 조회 성공',
  //   type: [CreditHistoryDto],
  // })
  // @Get('credits')
  // getCredits(): Promise<CreditHistoryDto[]> {
  //   return this.usersService.getCredits();
  // }

  @ApiOperation({ summary: '참여 캠페인 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '참여 캠페인 목록 조회 성공',
    type: [CampaignDonatedDto],
  })
  @Get('campaigns-donated')
  getCampaignsDonated(): Promise<CampaignDonatedDto[]> {
    return this.usersService.getCampaignsDonated();
  }
}
