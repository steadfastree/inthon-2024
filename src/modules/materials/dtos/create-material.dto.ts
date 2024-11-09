import { ApiProperty, PickType } from '@nestjs/swagger';
import { MaterialDto } from './material.dto';

export class CreateMaterialDto extends PickType(MaterialDto, [
  'name',
  'description',
  'creditPerGram',
] as const) {}
