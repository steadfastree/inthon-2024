import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Donation } from './donation.entity';
import { TimeStampEntity } from './time-stamp.entity';

@Entity()
export class PickupLocation extends TimeStampEntity {
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
