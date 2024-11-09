import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Material } from './material.entity';
import { Donation } from './donation.entity';
import { TimeStampEntity } from './time-stamp.entity';

@Entity()
export class MaterialDonation extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Material, (material) => material.donations)
  material: Material;

  @Column()
  @RelationId((md: MaterialDonation) => md.material)
  materialId: number;

  @ManyToOne(() => Donation, (donation) => donation.materials)
  donation: Donation;

  @Column()
  @RelationId((md: MaterialDonation) => md.donation)
  donationId: number;
}
