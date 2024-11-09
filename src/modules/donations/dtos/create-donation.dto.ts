import { ApiProperty, PickType } from '@nestjs/swagger';
import { DonationDto } from './donation.dto';

export class CreateMaterialDonationDto {
  @ApiProperty({ description: '재료 ID' })
  materialId: number;

  @ApiProperty({ description: '기부 수량' })
  amount: number;
}

export class CreateDonationDto extends PickType(DonationDto, [
  'reservedDate',
  'pickupLocationId',
  'campaignId',
] as const) {
  @ApiProperty({
    description: '기부할 재료 목록',
    type: [CreateMaterialDonationDto],
  })
  materials: CreateMaterialDonationDto[];
}
