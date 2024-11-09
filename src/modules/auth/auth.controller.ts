import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @Post('register')
  register(@Body() registerDto: any) {
    return {};
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @Post('login')
  login(@Body() loginDto: any) {
    return {};
  }
}
