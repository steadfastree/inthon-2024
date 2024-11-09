import { ApiProperty } from '@nestjs/swagger';

export class CampaignFeedDto {
  @ApiProperty({ description: '피드 ID' })
  id: number;

  @ApiProperty({ description: '피드 내용' })
  content: string;

  @ApiProperty({ description: '피드 이미지 URL', required: false })
  imageUrl?: string;

  @ApiProperty({ description: '작성자 ID' })
  authorId: number;

  @ApiProperty({ description: '캠페인 ID' })
  campaignId: number;

  @ApiProperty({ description: '생성일', example: '2024-03-11 14:30' })
  createdAt: string;
}
