import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/admin';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenRepository } from './refresh-token-repository';
import { calculateExpiryDate } from 'src/utils/jwt-expiry';
import { ResUserDto } from '../user/dto/res-user.dto';
import { AuthPayload } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  async loginWithRefresh(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('사용자가 존재하지 않습니다');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');

    const tokens = this.generateTokens(user);
    await this.refreshTokenRepo.saveToken(
      user,
      tokens.refreshToken,
      this.getRefreshTokenExpiry(),
    );

    return { ...tokens, user: new ResUserDto(user) };
  }

  async refreshAccessToken(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Refresh token 누락');

    const tokenEntity = await this.refreshTokenRepo.findByToken(refreshToken);
    if (!tokenEntity)
      throw new UnauthorizedException('유효하지 않은 refresh token');

    const now = new Date();
    if (tokenEntity.expiresAt.getTime() < now.getTime()) {
      await this.refreshTokenRepo.deleteToken(refreshToken);
      throw new ForbiddenException('Refresh token 만료');
    }

    const user = tokenEntity.user;
    const tokens = this.generateTokens(user);

    await this.refreshTokenRepo.deleteToken(refreshToken);
    await this.refreshTokenRepo.saveToken(
      user,
      tokens.refreshToken,
      this.getRefreshTokenExpiry(),
    );

    return tokens;
  }

  async logout(refreshToken: string) {
    if (!refreshToken) return;
    await this.refreshTokenRepo.deleteToken(refreshToken);
  }

  private generateTokens(user: User) {
    const payload: AuthPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN') || '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '14d',
    });

    return { accessToken, refreshToken };
  }

  private getRefreshTokenExpiry(): Date {
    const expiresIn =
      this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '14d';
    return calculateExpiryDate(expiresIn);
  }
}
