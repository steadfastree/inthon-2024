import { Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { Donation } from 'src/entities/donation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialDonation } from 'src/entities/material-donation.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { PickupLocation } from 'src/entities/pickup-location.entity';

@Module({
  controllers: [DonationsController],
  providers: [DonationsService],
  imports: [
    TypeOrmModule.forFeature([
      Donation,
      MaterialDonation,
      Campaign,
      PickupLocation,
    ]),
  ],
})
export class DonationsModule {}
