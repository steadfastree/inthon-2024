import { PartialType, PickType } from '@nestjs/swagger';
import { ExhibitionDto } from './exhibition.dto';

export class UpdateExhibitionDto extends PartialType(
  PickType(ExhibitionDto, [
    'title',
    'description',
    'startDate',
    'endDate',
    'status',
    'address',
    'latitude',
    'longitude',
  ] as const),
) {}
