import { ApiProperty } from '@nestjs/swagger';
import { ExhibitionStatus } from 'src/common/enums/exhibition-status.enum';
import { CampaignDto } from 'src/modules/campaigns/dtos/campaign.dto';

export class ExhibitionDto {
  @ApiProperty({ description: '전시 ID' })
  id: number;

  @ApiProperty({ description: '전시 제목' })
  title: string;

  @ApiProperty({ description: '전시 설명' })
  description: string;

  @ApiProperty({ description: '시작일' })
  startDate: string;

  @ApiProperty({ description: '종료일' })
  endDate: string;

  @ApiProperty({ description: '전시 상태', enum: ExhibitionStatus })
  status: ExhibitionStatus;

  @ApiProperty({ description: '전시 주소' })
  address: string;

  @ApiProperty({ description: '위도' })
  latitude: number;

  @ApiProperty({ description: '경도' })
  longitude: number;

  @ApiProperty({
    description: '연관된 캠페인',
    type: CampaignDto,
    required: false,
  })
  campaign?: CampaignDto;
}
