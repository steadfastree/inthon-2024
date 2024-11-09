import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { CreditHistoryDto } from './dtos/credit-history.dto';
import { CampaignDonatedDto } from './dtos/campaign-donated.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '../auth/guard/user.guard';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: '마이페이지 조회' })
  @ApiResponse({
    status: 200,
    description: '마이페이지 조회 성공',
    type: UserDto,
  })
  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Get()
  getMyPage(@Request() req): Promise<UserDto> {
    return this.usersService.getMyPage(req.user.id);
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
  @UseGuards(AuthGuard('jwt'), UserGuard)
  @Get('campaigns-donated')
  getCampaignsDonated(@Request() req): Promise<CampaignDonatedDto[]> {
    return this.usersService.getCampaignsDonated(req.user.id);
  }
}
