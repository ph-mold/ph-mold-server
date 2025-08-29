import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEstimateTable1756479029615 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'estimates',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'template_type',
            type: 'enum',
            enum: ['INDIVIDUAL', 'CORPORATE'],
            comment:
              '템플릿 타입: INDIVIDUAL(개인사업자), CORPORATE(법인사업자)',
          },
          {
            name: 'client_id',
            type: 'int',
            isNullable: false,
            comment: '고객 ID',
          },
          {
            name: 'estimate_data',
            type: 'json',
            comment: '견적 데이터 (JSON 형태)',
          },
          {
            name: 'memo',
            type: 'text',
            isNullable: true,
            comment: '메모',
          },
          {
            name: 'created_by_admin_id',
            type: 'int',
            isNullable: false,
            comment: '견적을 생성한 관리자 ID',
          },
          {
            name: 'updated_by_admin_id',
            type: 'int',
            isNullable: false,
            comment: '견적을 업데이트한 관리자 ID',
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
            name: 'IDX_estimates_template_type',
            columnNames: ['template_type'],
          },
          {
            name: 'IDX_estimates_client_id',
            columnNames: ['client_id'],
          },
          {
            name: 'IDX_estimates_created_by_admin_id',
            columnNames: ['created_by_admin_id'],
          },
          {
            name: 'IDX_estimates_updated_by_admin_id',
            columnNames: ['updated_by_admin_id'],
          },
          {
            name: 'IDX_estimates_created_at',
            columnNames: ['created_at'],
          },
        ],
      }),
      true,
    );

    // 외래키 제약조건 추가
    await queryRunner.createForeignKey(
      'estimates',
      new TableForeignKey({
        name: 'FK_estimates_client_id',
        columnNames: ['client_id'],
        referencedTableName: 'clients',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'estimates',
      new TableForeignKey({
        name: 'FK_estimates_created_by_admin_id',
        columnNames: ['created_by_admin_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'estimates',
      new TableForeignKey({
        name: 'FK_estimates_updated_by_admin_id',
        columnNames: ['updated_by_admin_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 외래키 제약조건 먼저 삭제
    await queryRunner.dropForeignKey('estimates', 'FK_estimates_client_id');
    await queryRunner.dropForeignKey(
      'estimates',
      'FK_estimates_created_by_admin_id',
    );
    await queryRunner.dropForeignKey(
      'estimates',
      'FK_estimates_updated_by_admin_id',
    );

    // 테이블 삭제
    await queryRunner.dropTable('estimates');
  }
}
