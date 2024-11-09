import { ApiProperty } from '@nestjs/swagger';
import { DonationStatus } from 'src/common/enums/donation-status.enum';

export class MaterialDonationDto {
  @ApiProperty({ description: '재료 ID' })
  materialId: number;

  @ApiProperty({ description: '재료명' })
  materialName: string;

  @ApiProperty({ description: '기부 수량' })
  amount: number;
}

export class DonationDto {
  @ApiProperty({ description: '기부 ID' })
  id: number;

  @ApiProperty({ description: '예약 날짜' })
  reservedDate: Date;

  @ApiProperty({ description: '기부 상태', enum: DonationStatus })
  status: DonationStatus;

  @ApiProperty({ description: '기부자 ID' })
  userId: number;

  @ApiProperty({ description: '수거 장소 ID' })
  pickupLocationId: number;

  @ApiProperty({ description: '기부 재료 목록', type: [MaterialDonationDto] })
  materials: MaterialDonationDto[];
}
