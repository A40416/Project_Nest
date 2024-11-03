import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthLoginDto {

    @ApiProperty({
        example: 'leevinh.cntt@gmail.com',
        description: `email`,
      })
    @IsString()
    username: string;

    @ApiProperty({
        example: '123',
        description: `password`,
    })
    @IsString()
    password: string;

}