import { CampaignStatus } from 'src/common/enums/campaign-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CampaignFeed } from './campaign-feed.entity';
import { MaterialCampaign } from './material-campaign.entity';
import { Exhibition } from './exhibition.entity';
import { TimeStampEntity } from './time-stamp.entity';

@Entity()
export class Campaign extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'varchar',
    enum: CampaignStatus,
    default: CampaignStatus.FUNDING,
  })
  status: CampaignStatus;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => User, (user) => user.campaigns)
  artist: User;

  @Column()
  @RelationId((campaign: Campaign) => campaign.artist)
  artistId: number;

  @OneToMany(
    () => MaterialCampaign,
    (materialCampaign) => materialCampaign.campaign,
  )
  materials: MaterialCampaign[];

  @OneToMany(() => CampaignFeed, (feed) => feed.campaign)
  feeds: CampaignFeed[];

  @OneToOne(() => Exhibition, (exhibition) => exhibition.campaign)
  @JoinColumn()
  exhibition: Exhibition;
}
