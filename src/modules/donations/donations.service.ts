import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from 'src/entities/donation.entity';
import { MaterialDonation } from 'src/entities/material-donation.entity';
import { CreateDonationDto } from './dtos/create-donation.dto';
import { UpdateDonationDto } from './dtos/update-donation.dto';
import { DonationDto } from './dtos/donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    @InjectRepository(MaterialDonation)
    private materialDonationRepository: Repository<MaterialDonation>,
  ) {}

  async createDonation(
    createDonationDto: CreateDonationDto,
  ): Promise<DonationDto> {
    // 기본 donation 엔티티 생성
    const donation = this.donationRepository.create({
      reservedDate: createDonationDto.reservedDate,
      pickupLocationId: createDonationDto.pickupLocationId,
    });

    // donation 저장
    const savedDonation = await this.donationRepository.save(donation);

    // material donations 생성 및 저장
    const materialDonations = await Promise.all(
      createDonationDto.materials.map((material) => {
        const materialDonation = this.materialDonationRepository.create({
          materialId: material.materialId,
          amount: material.amount,
          donationId: savedDonation.id,
        });
        return this.materialDonationRepository.save(materialDonation);
      }),
    );

    // DTO로 변환하여 반환
    return {
      ...savedDonation,
      materials: materialDonations.map((md) => ({
        materialId: md.materialId,
        materialName: '', // Material 엔티티에서 조회 필요
        amount: md.amount,
      })),
    };
  }

  async getDonations(): Promise<DonationDto[]> {
    const donations = await this.donationRepository.find({
      relations: ['materials'],
    });

    return donations.map((donation) => ({
      ...donation,
      materials: donation.materials.map((md) => ({
        materialId: md.materialId,
        materialName: '', // Material 엔티티에서 조회 필요
        amount: md.amount,
      })),
    }));
  }

  async updateDonation(
    donationId: number,
    updateDonationDto: UpdateDonationDto,
  ): Promise<DonationDto> {
    const donation = await this.donationRepository.findOne({
      where: { id: donationId },
      relations: ['materials'],
    });

    Object.assign(donation, updateDonationDto);
    const updatedDonation = await this.donationRepository.save(donation);

    return {
      ...updatedDonation,
      materials: donation.materials.map((md) => ({
        materialId: md.materialId,
        materialName: '', // Material 엔티티에서 조회 필요
        amount: md.amount,
      })),
    };
  }
}
