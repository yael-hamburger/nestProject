// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UsersService {}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(name: string, email: string, phone: string): Promise<User> {
    const newUser = new this.userModel({ name, email, phone });
    const result = await newUser.save();
    return result;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.findUser(id);
    return user;
  }

  async updateUser(id: string, name: string, email: string, phone: string): Promise<User> {
    const updatedUser = await this.findUser(id);
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (phone) updatedUser.phone = phone;
    updatedUser.save();
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
