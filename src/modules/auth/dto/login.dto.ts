import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'test@example.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    password: string;
}