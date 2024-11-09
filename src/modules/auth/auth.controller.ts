import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ArtistGuard } from './guard/artist.guard';
import { User } from 'src/entities/user.entity';
import { UserGuard } from './guard/user.guard';

@ApiTags('인증')
@ApiBearerAuth() // Swagger에서 Bearer 토큰 인증 설정
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  /*
  // 로그인 토큰 잘 작동하는지 테스트
  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  testProtectedRoute(@Request() req) {
    return { message: '토큰이 유효합니다!', user: req.user };
  }
  // 아티스트만 접근되는지 테스트 
  @UseGuards(AuthGuard('jwt'), ArtistGuard)
  @Get('artist-only')
  artistProtectedRoute(@Request() req) {
    return { message: '아티스트 권한이 확인되었습니다!', user: req.user };
  }
  */
}
