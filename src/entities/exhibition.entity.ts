import { ExhibitionStatus } from 'src/common/enums/exhibition-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Campaign } from './campaign.entity';

@Entity()
export class Exhibition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  status: ExhibitionStatus;

  @Column()
  address: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToOne(() => Campaign, (campaign) => campaign.exhibition)
  @JoinColumn()
  campaign: Campaign;
}
