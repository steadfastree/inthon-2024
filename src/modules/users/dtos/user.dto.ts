import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/user-role.enum';

export class BadgeDto {
  @ApiProperty({ description: '뱃지 ID' })
  id: number;

  @ApiProperty({ description: '뱃지 이름' })
  name: string;

  @ApiProperty({ description: '뱃지 설명' })
  description: string;
}

export class UserDto {
  @ApiProperty({ description: '사용자 ID' })
  id: number;

  @ApiProperty({ description: '사용자 이름' })
  name: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '사용자 역할', enum: UserRole })
  role: UserRole;

  @ApiProperty({ description: '보유 크레딧' })
  credit: number;

  @ApiProperty({ description: '보유 뱃지 목록', type: [BadgeDto] })
  badges?: BadgeDto[];
}
