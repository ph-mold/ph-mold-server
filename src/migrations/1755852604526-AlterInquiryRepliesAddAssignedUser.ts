import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class AlterInquiryRepliesAddAssignedUser1755852604526
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // assigned_user_id 컬럼 추가
    await queryRunner.addColumn(
      'inquiry_replies',
      new TableColumn({
        name: 'assigned_user_id',
        type: 'int',
        isNullable: true,
        comment: '담당자 ID (COMPANY 타입일 때만 사용)',
      }),
    );

    // 외래키 제약조건 추가
    await queryRunner.createForeignKey(
      'inquiry_replies',
      new TableForeignKey({
        name: 'FK_inquiry_replies_assigned_user_id',
        columnNames: ['assigned_user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    // 인덱스 추가
    await queryRunner.createIndex(
      'inquiry_replies',
      new TableIndex({
        name: 'IDX_inquiry_replies_assigned_user_id',
        columnNames: ['assigned_user_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 외래키 제약조건 제거
    const table = await queryRunner.getTable('inquiry_replies');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('assigned_user_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('inquiry_replies', foreignKey);
    }

    // 컬럼 제거
    await queryRunner.dropColumn('inquiry_replies', 'assigned_user_id');
  }
}
