import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // User 엔티티의 레포지토리 주입
    private jwtService: JwtService, // jwtService 주입
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 사용자 정보 생성
    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    // 데이터베이스에 사용자 정보 저장
    const savedUser = await this.userRepository.save(newUser);

    // 비밀번호 제외한 정보 반환 (필요시)
    const { password, ...result } = savedUser;
    return result as User;
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    // 이메일로 사용자조회
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // JWT 페이로드 생성
    const payload = { username: user.name, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
