import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';
import { ArtistDto } from 'src/modules/users/dtos/artist.dto';

export class MaterialCampaignDto {
  @ApiProperty({ description: '재료 ID' })
  materialId: number;

  @ApiProperty({ description: '재료명' })
  materialName: string;

  @ApiProperty({ description: '필요한 수량' })
  requiredAmount: number;

  @ApiProperty({ description: '기부된 수량' })
  donatedAmount: number;

  @ApiProperty({ description: '달성 여부' })
  isFulfilled: boolean;
}

export class CampaignDto {
  @ApiProperty({ description: '캠페인 ID' })
  id: number;

  @ApiProperty({ description: '캠페인 제목' })
  title: string;

  @ApiProperty({ description: '캠페인 설명' })
  description: string;

  @ApiProperty({ description: '시작일' })
  startDate: Date;

  @ApiProperty({ description: '종료일' })
  endDate: Date;

  @ApiProperty({ description: '캠페인 상태', enum: CampaignStatus })
  status: CampaignStatus;

  @ApiProperty({ description: '작가 정보' })
  artist: ArtistDto;

  @ApiProperty({ description: '필요한 재료 목록', type: [MaterialCampaignDto] })
  materials: MaterialCampaignDto[];
}
