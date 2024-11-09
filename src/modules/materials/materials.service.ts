import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from 'src/entities/material.entity';
import { MaterialDto } from './dtos/material.dto';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { MaterialDonation } from 'src/entities/material-donation.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(MaterialDonation)
    private materialDonationRepository: Repository<MaterialDonation>,
  ) {}

  async createMaterial(
    createMaterialDto: CreateMaterialDto,
  ): Promise<MaterialDto> {
    const material = this.materialRepository.create(createMaterialDto);
    const savedMaterial = await this.materialRepository.save(material);
    return this.toMaterialDto(savedMaterial);
  }

  async getMaterialsWithDonations(): Promise<MaterialDto[]> {
    // 모든 재료 조회
    const materials = await this.materialRepository.find();

    // 각 재료별 총 기부량 조회
    const donationSums = await this.materialDonationRepository
      .createQueryBuilder('materialDonation')
      .select('materialDonation.materialId', 'materialId')
      .addSelect('SUM(materialDonation.amount)', 'total')
      .groupBy('materialDonation.materialId')
      .getRawMany();

    // 기부량 정보를 Map으로 변환
    const donationMap = new Map(
      donationSums.map((item) => [item.materialId, Number(item.total)]),
    );

    // 재료 정보와 기부량을 합쳐서 반환
    return materials.map((material) => ({
      ...this.toMaterialDto(material),
      totalDonatedAmount: donationMap.get(material.id) || 0,
    }));
  }

  private toMaterialDto(material: Material): MaterialDto {
    return {
      id: material.id,
      name: material.name,
      description: material.description,
      creditPerGram: material.creditPerGram,
    };
  }
}
