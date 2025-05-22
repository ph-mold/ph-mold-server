import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: Repository<RefreshToken>,
  ) {}

  async saveToken(
    user: User,
    token: string,
    expiresAt: Date,
  ): Promise<RefreshToken> {
    const existing = await this.repo.findOne({
      where: { user: { id: user.id } },
    });

    if (existing) {
      existing.token = token;
      existing.expiresAt = expiresAt;
      return this.repo.save(existing);
    }

    const newToken = this.repo.create({ user, token, expiresAt });
    return this.repo.save(newToken);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return await this.repo.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async deleteToken(token: string): Promise<void> {
    await this.repo.delete({ token });
  }

  async deleteAllForUser(userId: number): Promise<void> {
    await this.repo.delete({ user: { id: userId } });
  }
}
