import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInquiryRepliesTable1755849967008
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inquiry_replies',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'inquiry_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'reply_type',
            type: 'enum',
            enum: ['CUSTOMER', 'COMPANY'],
            default: "'COMPANY'",
            comment: '답변 주체: CUSTOMER(고객), COMPANY(회사)',
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
            comment: '답변 내용',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_inquiry_replies_inquiry_id',
            columnNames: ['inquiry_id'],
            referencedTableName: 'inquiries',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_inquiry_replies_inquiry_id',
            columnNames: ['inquiry_id'],
          },
          {
            name: 'IDX_inquiry_replies_reply_type',
            columnNames: ['reply_type'],
          },
          {
            name: 'IDX_inquiry_replies_created_at',
            columnNames: ['created_at'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inquiry_replies');
  }
}
