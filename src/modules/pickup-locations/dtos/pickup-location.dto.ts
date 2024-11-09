import { ApiProperty } from '@nestjs/swagger';

export class PickupLocationDto {
  @ApiProperty({ description: '수거 장소 ID' })
  id: number;

  @ApiProperty({ description: '장소명' })
  name: string;

  @ApiProperty({ description: '주소' })
  address: string;

  @ApiProperty({ description: '위도', example: 37.5665 })
  latitude: number;

  @ApiProperty({ description: '경도', example: 126.978 })
  longitude: number;
}
