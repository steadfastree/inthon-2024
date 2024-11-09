import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Campaign } from './campaign.entity';
import { Material } from './material.entity';
import { TimeStampEntity } from './time-stamp.entity';

@Entity()
export class MaterialCampaign extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requiredAmount: number;

  @Column()
  donatedAmount: number;

  @Column({ default: false })
  isFulfilled: boolean;

  @ManyToOne(() => Material, (material) => material.campaigns)
  material: Material;

  @Column()
  @RelationId((mc: MaterialCampaign) => mc.material)
  materialId: number;

  @ManyToOne(() => Campaign, (campaign) => campaign.materials)
  campaign: Campaign;

  @Column()
  @RelationId((mc: MaterialCampaign) => mc.campaign)
  campaignId: number;
}
