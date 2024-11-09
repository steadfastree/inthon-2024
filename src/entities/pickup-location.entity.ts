import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Donation } from './donation.entity';

@Entity()
export class PickupLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Donation, (donation) => donation.pickupLocation)
  donations: Donation[];
}
