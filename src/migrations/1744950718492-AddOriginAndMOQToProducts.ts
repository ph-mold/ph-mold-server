import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOriginAndMOQToProducts1744950718492
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'origin',
        type: 'varchar',
        isNullable: true,
        comment: '제품 제조국',
      }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'moq',
        type: 'int',
        isNullable: true,
        comment: '최소 주문 수량',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'moq');
    await queryRunner.dropColumn('products', 'origin');
  }
}
