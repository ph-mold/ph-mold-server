import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultOriginAndMoqToProducts1744961373028
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE products
      SET origin = '한국', moq = 10000
      WHERE origin IS NULL OR moq IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE products
      SET origin = NULL, moq = NULL
      WHERE origin = '한국' AND moq = 10000
    `);
  }
}
