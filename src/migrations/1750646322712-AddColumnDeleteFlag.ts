import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnDeleteFlag1750646322712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE label_sticker_histories ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE label_sticker_histories DROP COLUMN is_deleted`,
    );
  }
}
