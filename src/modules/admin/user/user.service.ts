import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepo.save(user as User);
  }
}
