import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/admin';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
