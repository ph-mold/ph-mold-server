import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUserIdUniqueInRefreshTokens1747811984244
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE refresh_tokens
          ADD CONSTRAINT uq_refresh_tokens_user UNIQUE (user_id)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE refresh_tokens
          DROP INDEX uq_refresh_tokens_user
        `);
  }
}
