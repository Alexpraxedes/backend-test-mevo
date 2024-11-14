import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    return this.userRepository.createUser(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}
