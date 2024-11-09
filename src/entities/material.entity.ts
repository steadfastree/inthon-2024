import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { MaterialCampaign } from './material-campaign.entity';
import { MaterialDonation } from './material-donation.entity';
import { TimeStampEntity } from './time-stamp.entity';

@Entity()
export class Material extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creditPerGram: number;

  @OneToMany(() => MaterialCampaign, (mc) => mc.material)
  campaigns: MaterialCampaign[];

  @OneToMany(() => MaterialDonation, (md) => md.material)
  donations: MaterialDonation[];
}
