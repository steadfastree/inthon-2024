import { ApiProperty, PickType } from '@nestjs/swagger';
import { DonationDto } from './donation.dto';

export class UpdateDonationDto extends PickType(DonationDto, [
  'status',
] as const) {}
