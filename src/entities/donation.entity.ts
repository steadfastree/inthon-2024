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
import { Campaign } from './campaign.entity';
import { TimeStampEntity } from './time-stamp.entity';

@Entity()
export class Donation extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reservedDate: Date;

  @Column({
    type: 'varchar',
    enum: DonationStatus,
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

  @ManyToOne(() => Campaign)
  campaign: Campaign;

  @Column()
  @RelationId((donation: Donation) => donation.campaign)
  campaignId: number;
}
