import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async getMyPage() {
    return this.userRepository.findOneBy({ id: 1 });
  }

  async getCredits() {
    return [];
  }

  async getCampaignsDonated() {
    return [];
  }
}
