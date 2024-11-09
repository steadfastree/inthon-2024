import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDonationDto {
  @ApiProperty({ description: '재료 ID' })
  materialId: number;

  @ApiProperty({ description: '기부 수량' })
  amount: number;
}

export class CreateDonationDto {
  @ApiProperty({ description: '예약 날짜', type: Date })
  reservedDate: Date;

  @ApiProperty({ description: '캠페인 ID' })
  campaignId: number;

  @ApiProperty({ description: '수거 장소 ID' })
  pickupLocationId: number;

  @ApiProperty({
    description: '기부할 재료 목록',
    type: [CreateMaterialDonationDto],
  })
  materials: CreateMaterialDonationDto[];
}
