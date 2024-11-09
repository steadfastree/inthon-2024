import { UserRole } from 'src/common/enums/user-role.enum';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Donation } from './donation.entity';
import { UserBadge } from './user-badge.entity';
import { CampaignFeed } from './campaign-feed.entity';
import { Campaign } from './campaign.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: 0 })
  credit: number;

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[];

  @OneToMany(() => UserBadge, (userBadge) => userBadge.user)
  badges: UserBadge[];

  @OneToMany(() => CampaignFeed, (campaignFeed) => campaignFeed.author)
  campaignFeeds: CampaignFeed[];

  @OneToMany(() => Campaign, (campaign) => campaign.artist)
  campaigns: Campaign[];
}
