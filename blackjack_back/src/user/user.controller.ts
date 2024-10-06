import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body() body: { username: string; email: string; password: string },
  ) {
    const user = this.userService.createUser(
      body.username,
      body.email,
      body.password,
    );
    return { user: user };
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    const user = this.userService.getUser(id);
    return { user: user };
  }

  @Get()
  getAllUser() {
    const user = this.userService.getAllUser();
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
    return null;
  }
}
