import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: { username: string }) {
    const user = this.userService.createUser(body.username);
    return { user: user };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
    return null;
  }
}
