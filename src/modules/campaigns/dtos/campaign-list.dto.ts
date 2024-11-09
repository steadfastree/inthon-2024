import { PickType } from '@nestjs/swagger';
import { CampaignDto } from './campaign.dto';

export class CampaignListDto extends PickType(CampaignDto, [
  'id',
  'title',
  'description',
  'startDate',
  'endDate',
  'imageUrl',
  'status',
  'artist',
] as const) {}
