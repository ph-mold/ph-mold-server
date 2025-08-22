import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../../../entities/admin/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  name: string;

  @IsEnum(['user', 'admin'], {
    message: 'role은 user 또는 admin 이어야 합니다.',
  })
  role: UserRole;
}
