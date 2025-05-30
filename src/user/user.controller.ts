import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../error/http.error';
import { CreateUserDto } from './dto/index.dot';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const data = await this.userService.createUser(user);
    return {
      code: 200,
      message: '创建成功',
      data: data,
    };
  }

  @Get()
  async findAll() {
    const user = await this.userService.getAllUsers();
    return {
      code: 200,
      message: '查询成功',
      data: user,
    };
  }

  @Patch()
  async update(@Body() user: CreateUserDto) {
    const id = user._id as string;
    const data = await this.userService.updateUser(id, user);
    return {
      code: 200,
      message: '修改成功',
      data: data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);

    return {
      code: 200,
      message: '查询成功',
      data: user,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    console.log('id', id);
    const user = await this.userService.deleteUser(id);
    return {
      msg: '删除成功',
      code: 200,
      data: user,
    };
  }
}
