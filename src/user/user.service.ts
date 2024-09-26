import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  private user: UserModel[] = [];

  createUser(username: string) {
    const userId = Math.floor(Math.random() * 10000);
    const newUser = new UserModel(String(userId), username);
    this.user.push(newUser);
    return newUser;
  }

  getUser(id: string) {
    let user = this.user.find((e) => e.id == id);
    if (!user) {
      throw new NotFoundException('nenhum usuário encontrado');
    } else {
      return { ...user };
    }
  }

  deleteUser(id: string) {
    let userId = this.user.find((e) => e.id == id);
    let userIndex = this.user.findIndex((e) => e.id == id);
    if (!userId) {
      throw new NotFoundException('nenhum usuário');
    } else {
      this.user.splice(userIndex, 1);
    }
  }
}
