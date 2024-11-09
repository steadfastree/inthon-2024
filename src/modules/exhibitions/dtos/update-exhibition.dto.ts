import { ApiProperty } from '@nestjs/swagger';
import { ExhibitionStatus } from 'src/common/enums/exhibition-status.enum';

export class UpdateExhibitionDto {
  @ApiProperty({ description: '전시 제목', required: false })
  title?: string;

  @ApiProperty({ description: '전시 설명', required: false })
  description?: string;

  @ApiProperty({ description: '시작일', type: Date, required: false })
  startDate?: Date;

  @ApiProperty({ description: '종료일', type: Date, required: false })
  endDate?: Date;

  @ApiProperty({
    description: '전시 상태',
    enum: ExhibitionStatus,
    required: false,
  })
  status?: ExhibitionStatus;

  @ApiProperty({ description: '전시 주소', required: false })
  address?: string;

  @ApiProperty({ description: '위도', required: false })
  latitude?: number;

  @ApiProperty({ description: '경도', required: false })
  longitude?: number;
}
