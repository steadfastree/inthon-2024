import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/entities/donation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
  ) {}

  async createDonation(createDonationDto: any) {
    const donation = this.donationRepository.create(createDonationDto);
    return this.donationRepository.save(donation);
  }

  async getDonations() {
    return this.donationRepository.find();
  }

  async updateDonation(donationId: number, updateDonationDto: any) {
    const donation = await this.donationRepository.findOneBy({
      id: donationId,
    });
    return this.donationRepository.save(donation);
  }
}
