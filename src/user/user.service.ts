import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/index.dot';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<CreateUserDto>) {}
  async createUser(createCatDto: CreateUserDto): Promise<CreateUserDto> {
    const createdCat = new this.userModel(createCatDto);
    return createdCat.save();
  }

  async findOne(username: string): Promise<any[]> {
    return this.userModel.find({ username }).exec();
  }
}
