import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '@/decorator/customize';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('USER')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Tạo mới người dùng' })
  @ApiBody({ 
    type: CreateUserDto, 
    description: 'Dữ liệu tạo người dùng mới' 
  })
  @ApiResponse({
    status: 201,
    description: 'Người dùng đã được tạo thành công.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiOperation({ summary: 'Xem User' })
  @ApiQuery({
    name: 'current',
    description: `Số trang`,
    required: true,
})
  @ApiQuery({
    name: 'pageSize',
    description: `Số user trên 1 trang`,
    required: true,
})
  async findAll(
    @Query () query:string,
    @Query ("current") current:number,
    @Query ("pageSize") pageSize:number,
  ) {
    return this.usersService.findAll(query,current,pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
