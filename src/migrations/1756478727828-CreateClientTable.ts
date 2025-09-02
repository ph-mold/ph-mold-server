import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClientTable1756478727828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            comment: '고객 이름',
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: false,
            comment: '회사 이름',
          },
          {
            name: 'position',
            type: 'varchar',
            isNullable: true,
            comment: '직위 (선택사항)',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
            comment: '전화번호',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            comment: '이메일',
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
        indices: [
          {
            name: 'IDX_clients_company',
            columnNames: ['company'],
          },
          {
            name: 'IDX_clients_email',
            columnNames: ['email'],
          },
          {
            name: 'IDX_clients_phone',
            columnNames: ['phone'],
          },
          {
            name: 'IDX_clients_created_at',
            columnNames: ['created_at'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
