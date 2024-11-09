import { ApiProperty, PickType } from '@nestjs/swagger';
import { ExhibitionDto } from './exhibition.dto';

export class CreateExhibitionDto extends PickType(ExhibitionDto, [
  'title',
  'description',
  'startDate',
  'endDate',
  'address',
  'latitude',
  'longitude',
] as const) {
  @ApiProperty({ description: '캠페인 ID' })
  campaignId: number;
}
