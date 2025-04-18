import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSpecTypes1744947314583 implements MigrationInterface {
  name = 'AddSpecTypes1744947314583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. spec_types 테이블 생성
    const hasTable = await queryRunner.hasTable('spec_types');
    if (!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: 'spec_types',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            { name: 'key', type: 'varchar', isUnique: true },
            { name: 'label', type: 'varchar' },
            { name: 'unit', type: 'varchar' },
          ],
        }),
      );
    }

    // 2. 기존 type 데이터를 기반으로 spec_types 초기값 insert
    const initialTypes = [
      { key: 'ml', label: '용량', unit: 'ml' },
      { key: 'ø', label: '지름', unit: 'mm' },
      { key: 'h', label: '높이', unit: 'mm' },
      { key: 'gauge', label: '구경', unit: 'mm' },
    ];

    for (const t of initialTypes) {
      await queryRunner.query(
        'INSERT INTO spec_types (`key`, `label`, `unit`) VALUES (?, ?, ?)',
        [t.key, t.label, t.unit],
      );
    }

    // 3. product_specs 테이블에 spec_type_id 컬럼 추가
    await queryRunner.addColumn(
      'product_specs',
      new TableColumn({
        name: 'spec_type_id',
        type: 'int',
        isNullable: true,
      }),
    );

    // 4. 데이터 이전 (type 문자열 → spec_type_id)
    const typeMap: Record<string, string> = {
      ml: 'ml',
      'ø(mm)': 'ø',
      'h(mm)': 'h',
      '구경(mm)': 'gauge',
    };

    for (const [rawType, normalizedKey] of Object.entries(typeMap)) {
      await queryRunner.query(
        `
        UPDATE product_specs ps
        JOIN spec_types st ON st.key = ?
        SET ps.spec_type_id = st.id
        WHERE ps.type = ?
      `,
        [normalizedKey, rawType],
      );
    }

    // 5. 기존 type 컬럼 제거
    await queryRunner.dropColumn('product_specs', 'type');

    // 6. 외래키 설정
    await queryRunner.createForeignKey(
      'product_specs',
      new TableForeignKey({
        columnNames: ['spec_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'spec_types',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 롤백
    await queryRunner.dropForeignKey('product_specs', 'spec_type_id');
    await queryRunner.addColumn(
      'product_specs',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true,
      }),
    );

    // 역변환 필요시 여기에 구현
    await queryRunner.query(`
      UPDATE product_specs ps
      JOIN spec_types st ON ps.spec_type_id = st.id
      SET ps.type = st.label
    `);

    await queryRunner.dropColumn('product_specs', 'spec_type_id');
    await queryRunner.dropTable('spec_types');
  }
}
