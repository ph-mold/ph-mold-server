import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const createUser = this.repo.create(user);
    return this.repo.save(createUser);
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }
}
