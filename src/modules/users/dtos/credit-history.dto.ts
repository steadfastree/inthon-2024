import { ApiProperty } from '@nestjs/swagger';

export class CreditHistoryDto {
  @ApiProperty({ description: '크레딧 변동 ID' })
  id: number;

  @ApiProperty({ description: '변동 금액' })
  amount: number;

  @ApiProperty({ description: '변동 일시' })
  createdAt: Date;

  @ApiProperty({ description: '변동 사유' })
  description: string;
}
