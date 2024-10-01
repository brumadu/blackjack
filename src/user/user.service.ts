import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const userData = await this.usersRepository.save({
      username,
      email,
      password,
    });
    return userData;
  }

  async getUser(id: string): Promise<User> {
    const userData = await this.usersRepository.findOneBy({ id });
    if (!userData) {
      throw new NotFoundException('User not found');
    }
    return userData;
  }

  async getAllUser(): Promise<User[]> {
    const userData = await this.usersRepository.find();
    return userData;
  }

  async deleteUser(id: string): Promise<User> {
    const userData = await this.usersRepository.findOneBy({ id });
    return await this.usersRepository.remove(userData);
  }
}
