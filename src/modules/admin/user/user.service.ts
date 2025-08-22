import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/admin';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepo.create({
      email,
      password: hashedPassword,
      name,
      role,
    });
  }
}
