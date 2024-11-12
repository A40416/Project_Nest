import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ example: "vinh@gmail.com"})
    @IsNotEmpty({message:"email không đc để trống"})
    email: string;
    
    @ApiProperty({ example: "123"})
    @IsNotEmpty({message:"pass không đc để trống"})
    password:string;

    @IsOptional()
    name: string;
}



