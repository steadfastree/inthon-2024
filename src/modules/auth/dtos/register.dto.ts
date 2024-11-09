import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/user-role.enum';

export class RegisterDto {
  @ApiProperty({ description: '사용자 이름' })
  name: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  @ApiProperty({ description: '사용자 역할', enum: UserRole })
  role: UserRole;
}
