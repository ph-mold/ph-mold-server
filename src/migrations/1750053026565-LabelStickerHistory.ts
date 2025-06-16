import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class LabelStickerHistory1750053026565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'label_sticker_histories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'file_name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'operator',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'label_type',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'label_data',
            type: 'jsonb',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('label_sticker_histories');
  }
}
