import { PartialType, PickType } from '@nestjs/swagger';
import { CampaignDto } from './campaign.dto';

export class UpdateCampaignDto extends PartialType(
  PickType(CampaignDto, [
    'title',
    'description',
    'startDate',
    'endDate',
    'status',
  ] as const),
) {}
