import { ApiProperty, PickType } from '@nestjs/swagger';
import { CampaignDto } from './campaign.dto';

export class CreateMaterialCampaignDto {
  @ApiProperty({ description: '재료 ID' })
  materialId: number;

  @ApiProperty({ description: '필요한 수량' })
  requiredAmount: number;
}

export class CreateCampaignDto extends PickType(CampaignDto, [
  'title',
  'description',
  'startDate',
  'endDate',
] as const) {
  @ApiProperty({
    description: '필요한 재료 목록',
    type: [CreateMaterialCampaignDto],
  })
  materials: CreateMaterialCampaignDto[];
}
