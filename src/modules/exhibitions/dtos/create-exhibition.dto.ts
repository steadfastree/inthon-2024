import { ApiProperty } from '@nestjs/swagger';

export class CreateExhibitionDto {
  @ApiProperty({ description: '전시 제목' })
  title: string;

  @ApiProperty({ description: '전시 설명' })
  description: string;

  @ApiProperty({ description: '시작일', type: Date })
  startDate: Date;

  @ApiProperty({ description: '종료일', type: Date })
  endDate: Date;

  @ApiProperty({ description: '전시 주소' })
  address: string;

  @ApiProperty({ description: '위도' })
  latitude: number;

  @ApiProperty({ description: '경도' })
  longitude: number;

  @ApiProperty({ description: '캠페인 ID' })
  campaignId: number;
}
