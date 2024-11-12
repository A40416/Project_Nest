import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CodeAuthDto {
    @ApiProperty({
        example: "66ffab63d28e5270f27cbbef",
        description: `_id`,
    })
    @IsNotEmpty({message:"_id không đc để trống"})
    _id: string;
    
    @ApiProperty({
        example: 'bff7c4c7-9f4e-43c7-b5f1-a62ddc279543',
        description: `code`,
    })
    @IsNotEmpty({message:"code không đc để trống"})
    code:string;
}