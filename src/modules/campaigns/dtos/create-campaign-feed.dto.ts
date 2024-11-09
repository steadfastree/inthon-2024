import { ApiProperty, PickType } from '@nestjs/swagger';
import { CampaignFeedDto } from './campaign-feed.dto';

export class CreateCampaignFeedDto extends PickType(CampaignFeedDto, [
  'content',
] as const) {}
