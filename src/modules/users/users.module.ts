import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Donation } from 'src/entities/donation.entity';
import { Badge } from 'src/entities/badge.entity';
import { UserBadge } from 'src/entities/user-badge.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Donation, Badge, UserBadge])],
})
export class UsersModule { }
