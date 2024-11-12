import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class retryActiveDto{
    @ApiProperty({
        example: 'leevinh.cntt@gmail.com',
        description: `email`,
    })
    @IsString()
    email: string;

}