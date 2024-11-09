import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialCampaignDto {
  @ApiProperty({ description: '재료 ID' })
  materialId: number;

  @ApiProperty({ description: '필요한 수량' })
  requiredAmount: number;
}

export class CreateCampaignDto {
  @ApiProperty({ description: '캠페인 제목' })
  title: string;

  @ApiProperty({ description: '캠페인 설명' })
  description: string;

  @ApiProperty({ description: '시작일', type: Date })
  startDate: Date;

  @ApiProperty({ description: '종료일', type: Date })
  endDate: Date;

  @ApiProperty({
    description: '필요한 재료 목록',
    type: [CreateMaterialCampaignDto],
  })
  materials: CreateMaterialCampaignDto[];
}
