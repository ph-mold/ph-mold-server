import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { parseExpiresInToMs } from 'src/utils/jwt-expiry';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token-dev.dto';

interface AuthRequest extends Request {
  cookies: {
    refresh_token?: string;
  };
}

@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Headers('platform') platform: string,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginWithRefresh(body.email, body.password);

    const refreshMaxAge = parseExpiresInToMs(
      this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '14d',
    );

    if (platform === 'web') {
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/auth/refresh',
        maxAge: refreshMaxAge,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    return {
      accessToken,
      refreshToken: platform !== 'web' ? refreshToken : undefined,
      user,
    };
  }

  @Post('refresh-dev')
  @ApiBody({ type: RefreshTokenDto })
  async refreshDev(@Body() body: RefreshTokenDto) {
    if (this.config.get('NODE_ENV') !== 'development') {
      throw new BadRequestException('개발 환경에서만 사용할 수 있습니다.');
    }
    return await this.authService.refreshAccessToken(body.refresh_token);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
    @Headers('platform') platform: string,
    @Body('refresh_token') refreshTokenFromBody: string,
  ) {
    const refreshToken =
      platform === 'web' ? req.cookies?.refresh_token : refreshTokenFromBody;
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshAccessToken(refreshToken);

    const refreshMaxAge = parseExpiresInToMs(
      this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '14d',
    );

    if (platform === 'web') {
      res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        path: '/auth/refresh',
        maxAge: refreshMaxAge,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    return {
      accessToken,
      refreshToken: platform !== 'web' ? refreshToken : undefined,
    };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
    @Headers('platform') platform: string,
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    if (platform === 'web') {
      res.clearCookie('refresh_token', { path: '/auth/refresh' });
    }

    return { message: '로그아웃 되었습니다.' };
  }
}
