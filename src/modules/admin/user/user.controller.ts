import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { User } from 'src/decorators/user.decorator';
import { ResUserDto } from './dto/res-user.dto';
import { AuthPayload } from '../auth/auth.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiBearerAuth('access-token')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async me(@User() user: AuthPayload) {
    return new ResUserDto(await this.userService.findById(user.userId));
  }
}
