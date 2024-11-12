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
  @ApiOperation({ summary: 'Tạo mới người dùng'})
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
  create(
    @Body() createUserDto: CreateUserDto,
  ):Promise<any> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiOperation({ summary: 'Xem Users' })
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
  ):Promise<any> {
    return this.usersService.findAll(query,current,pageSize);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiOperation({ summary: 'Tìm User theo Id' })
  findOne(
    @Param('id') id: string,
  ):Promise<any> {
    return this.usersService.findOne(+id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  update(
    @Body() updateUserDto: UpdateUserDto,
  ):Promise<any> {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'Xóa Thành Công',
  })
  remove(
    @Param('id') id: string,
  ):Promise<any> {
    return this.usersService.remove(id);
  }
}
