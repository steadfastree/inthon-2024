import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignFeedDto {
  @ApiProperty({ description: '피드 내용' })
  content: string;
}
