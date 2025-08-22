import { User } from '../../../../entities/admin/user.entity';

export class ResUserDto {
  id: number;
  email: string;
  name: string;
  role: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
  }
}
