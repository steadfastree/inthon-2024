import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { UserDto } from '../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserDto> {
    const user = this.userRepository.create(registerDto);
    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      credit: savedUser.credit,
    };
  }

  async login(loginDto: LoginDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email, password: loginDto.password },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      credit: user.credit,
    };
  }
}
