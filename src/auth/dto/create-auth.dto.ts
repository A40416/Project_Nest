import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ example: "sabbas"})
    @IsNotEmpty({message:"email không đc để trống"})
    email: string;
    
    @IsNotEmpty({message:"pass không đc để trống"})
    password:string;

    @IsOptional()
    name: string;
}

export class CodeAuthDto {
    @ApiProperty({ example: "sabbas"})
    @IsNotEmpty({message:"_id không đc để trống"})
    _id: string;
    
    @IsNotEmpty({message:"code không đc để trống"})
    code:string;
}

export class ChangePasswordAuthDto {
    @IsNotEmpty({message:"code không đc để trống"})
    code: string;
    
    @IsNotEmpty({message:"password không đc để trống"})
    password:string;

    @IsNotEmpty({message:"confirmPassword không đc để trống"})
    confirmPassword : string;
    
    @IsNotEmpty({message:"email không đc để trống"})
    email:string;
}