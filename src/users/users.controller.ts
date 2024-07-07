// import { Controller } from '@nestjs/common';

// @Controller('users')
// export class UsersController {}
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
  ) {
    const generatedId = await this.usersService.createUser(name, email, phone);
    return { id: generatedId };
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
  ) {
    return await this.usersService.updateUser(userId, name, email, phone);
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }
}
