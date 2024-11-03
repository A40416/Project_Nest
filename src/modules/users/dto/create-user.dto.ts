import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "Name không được để trống"})
    @ApiProperty({
        example: 'Vinh',
        description: `Tên người dùng`,
    })
    name: string;

    @IsNotEmpty()
    @IsEmail({},{message:'Sai định dạng'})
    @ApiProperty({
        example: 'vinh@gmail.com',
        description: `User's email address`,
    })
    email: string;

    @IsNotEmpty({message: "Pass không được để trống"})
    @ApiProperty({
        example: '123',
        description: `User's password`,
    })
    password: string;

    phone: string;
    address: string;
    image: string;
}
