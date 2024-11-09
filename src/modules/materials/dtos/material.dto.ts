import { ApiProperty } from '@nestjs/swagger';

export class MaterialDto {
  @ApiProperty({ description: '재료 ID' })
  id: number;

  @ApiProperty({ description: '재료명' })
  name: string;

  @ApiProperty({ description: '재료 설명' })
  description: string;

  @ApiProperty({ description: '그램당 크레딧' })
  creditPerGram: number;

  @ApiProperty({ description: '총 기부된 양' })
  totalDonatedAmount?: number;
}
