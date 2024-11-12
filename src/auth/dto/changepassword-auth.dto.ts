import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordAuthDto {

    @ApiProperty({
        example: 'bff7c4c7-9f4e-43c7-b5f1-a62ddc279543',
        description: `code`,
    })
    @IsNotEmpty({message:"code không đc để trống"})
    code: string;
    
    @ApiProperty({  
        example: '123',
        description: `password`,
    })
    @IsNotEmpty({message:"password không đc để trống"})
    password:string;

    @ApiProperty({  
        example: '123',
        description: `password`,
    })
    @IsNotEmpty({message:"confirmPassword không đc để trống"})
    confirmPassword : string;

    @ApiProperty({
        example: 'leevinh.cntt@gmail.com',
        description: `email`,
    })
    @IsNotEmpty({message:"email không đc để trống"})
    email:string;
    
}

export class SendCodeDto{
    @ApiProperty({
        example: 'leevinh.cntt@gmail.com',
        description: `email`,
    })
    @IsString()
    email: string;

}