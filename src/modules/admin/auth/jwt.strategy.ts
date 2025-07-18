import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AuthPayload } from './auth.type';
import { Request } from 'express';

// 커스텀 토큰 추출 함수
const extractTokenFromCookieOrHeader = (req: Request): string | null => {
  const platform = req.headers.platform as string;

  // web 플랫폼인 경우 쿠키를 우선적으로 확인
  if (platform === 'web') {
    // 1. 쿠키에서 access_token 확인
    const cookies = req.cookies as { access_token?: string } | undefined;
    if (cookies && cookies.access_token) {
      return cookies.access_token;
    }
  }

  // 2. Authorization 헤더에서 Bearer 토큰 확인
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // 3. 쿠키에서 access_token 확인 (web이 아닌 경우)
  if (platform !== 'web') {
    const cookies = req.cookies as { access_token?: string } | undefined;
    if (cookies && cookies.access_token) {
      return cookies.access_token;
    }
  }

  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: extractTokenFromCookieOrHeader,
      secretOrKey: config.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthPayload) {
    return payload;
  }
}
