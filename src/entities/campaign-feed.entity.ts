import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { Campaign } from './campaign.entity';
import { TimeStampEntity } from './time-stamp.entity';

@Entity()
export class CampaignFeed extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.campaignFeeds)
  author: User;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  @RelationId((feed: CampaignFeed) => feed.author)
  authorId: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.feeds)
  campaign: Campaign;

  @Column()
  @RelationId((feed: CampaignFeed) => feed.campaign)
  campaignId: number;
}
