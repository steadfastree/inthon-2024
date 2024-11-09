import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'User name',
        example: '홍길동',
    })
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'test@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'password1234',
    })
    password: string;
}
