import { PickType } from '@nestjs/swagger';
import { ExhibitionDto } from './exhibition.dto';

export class ExhibitionListDto extends PickType(ExhibitionDto, [
  'id',
  'title',
  'description',
  'startDate',
  'endDate',
  'status',
  'address',
  'latitude',
  'longitude',
] as const) {}
