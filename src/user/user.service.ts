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

  async findUserById(id: string): Promise<CreateUserDto | null> {
    return this.userModel.findById(id);
  }

  async deleteUser(id: string) {
    console.log('id', id);
    return this.userModel.deleteOne({ _id: id });
  }

  async getAllUsers() {
    return this.userModel.find();
  }

  async updateUser(id: string, user: CreateUserDto) {
    return this.userModel.updateOne({ _id: id }, user);
  }
}
