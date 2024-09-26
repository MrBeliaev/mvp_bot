import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryInterface } from './db/repositories/users.repository.interface';
import { UserEntity } from './db/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
  ) {}
  async getUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.findAll();
  }

  async findById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOneById(id);
  }

  async findByTelegramId(telegramId: string): Promise<UserEntity> {
    return this.usersRepository.findByCondition({
      where: { telegramId },
    });
  }

  async createUser(user: Partial<CreateUserDto>) {
    try {
      const existingUser = await this.findByTelegramId(user.telegramId);

      if (existingUser) {
        console.log(`User with telegramId ${user.telegramId} already exists.`);
        throw new Error('User already exists');
      }

      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Unique constraint violation
        console.error(`Duplicate key error: ${error.detail}`);
        throw new Error('User already exists');
      }
      console.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  async updateUser(
    telegramId: string,
    user: Partial<UpdateUserDto>,
  ): Promise<UserEntity> {
    const existingUser = await this.findByTelegramId(telegramId);
    if (!existingUser) {
      throw new NotFoundException();
    }
    Object.assign(existingUser, user);
    return await this.usersRepository.save(existingUser);
  }
}
