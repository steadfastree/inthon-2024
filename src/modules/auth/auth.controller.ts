import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dtos/user.dto';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: UserDto,
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: UserDto,
  })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<UserDto> {
    return this.authService.login(loginDto);
  }
}
