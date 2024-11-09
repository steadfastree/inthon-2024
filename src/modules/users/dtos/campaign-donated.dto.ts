import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';

export class CampaignDonatedDto {
  @ApiProperty({ description: '캠페인 ID' })
  id: number;

  @ApiProperty({ description: '캠페인 제목' })
  title: string;

  @ApiProperty({ description: '캠페인 상태', enum: CampaignStatus })
  status: CampaignStatus;

  @ApiProperty({ description: '기부한 재료 목록' })
  donations: {
    materialName: string;
    amount: number;
  }[];
}
