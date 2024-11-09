import { DonationStatus } from 'src/common/enums/donation-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { PickupLocation } from './pickup-location.entity';
import { MaterialDonation } from './material-donation.entity';

@Entity()
export class Donation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reservedDate: Date;

  @Column({
    type: 'enum',
    enum: DonationStatus,
    default: DonationStatus.RESERVED,
  })
  status: DonationStatus;

  @ManyToOne(() => User, (user) => user.donations)
  user: User;

  @Column()
  @RelationId((donation: Donation) => donation.user)
  userId: number;

  @ManyToOne(() => PickupLocation, (pickup) => pickup.donations)
  pickupLocation: PickupLocation;

  @Column()
  @RelationId((donation: Donation) => donation.pickupLocation)
  pickupLocationId: number;

  @OneToMany(() => MaterialDonation, (md) => md.donation)
  materials: MaterialDonation[];
}
