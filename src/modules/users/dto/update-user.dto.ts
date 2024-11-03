import { ApiProperty } from '@nestjs/swagger';
import{ IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto  {
    @IsMongoId({message: 'Id không hợp lệ'})
    @IsNotEmpty({message: 'Không được để trống'})
    @ApiProperty({
        example: '66ffab63d28e5270f27cbbef',
        description: `User's ID`,
    })
    _id: string; 

    @IsOptional()
    @ApiProperty({
        example: 'vinhpro',
        description: `User's name`,
    })
    name: string;

    @ApiProperty({
        example: '04464',
        description: `User's phone`,
    })
    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;
}
