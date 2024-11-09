import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CampaignStatus } from 'src/common/enums/campaign-status.enum';

export class UpdateCampaignDto {
  @ApiProperty({ description: '캠페인 제목', required: false })
  title?: string;

  @ApiProperty({ description: '캠페인 설명', required: false })
  description?: string;

  @ApiProperty({ description: '시작일', type: Date, required: false })
  startDate?: Date;

  @ApiProperty({ description: '종료일', type: Date, required: false })
  endDate?: Date;

  @ApiProperty({
    description: '캠페인 상태',
    enum: CampaignStatus,
    required: false,
  })
  status?: CampaignStatus;
}
