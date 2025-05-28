import { UserService } from './user.service';
import {
  HttpException,
  UseFilters,
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/index.dot';
import { HttpExceptionFilter } from '../error/http.error';

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
  async findOne(@Query() params: { username: string }) {
    const data = await this.userService.findOne(params.username);
    return {
      code: 200,
      message: '查询成功',
      data: data,
    };
  }
}
