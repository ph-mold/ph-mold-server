import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterEstimateTable1756737475413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // group_code 컬럼 추가
    await queryRunner.query(`
      ALTER TABLE \`estimates\` 
      ADD COLUMN \`group_code\` varchar(255) NOT NULL DEFAULT ''
    `);

    // version 컬럼 추가
    await queryRunner.query(`
      ALTER TABLE \`estimates\` 
      ADD COLUMN \`version\` int NOT NULL DEFAULT 1
    `);

    // status 컬럼 추가
    await queryRunner.query(`
      ALTER TABLE \`estimates\` 
      ADD COLUMN \`status\` varchar(50) NOT NULL DEFAULT 'DRAFT'
    `);

    // status 컬럼에 CHECK 제약조건 추가 (MariaDB ENUM 대체)
    await queryRunner.query(`
      ALTER TABLE \`estimates\` 
      ADD CONSTRAINT \`CHK_estimates_status\` 
      CHECK (\`status\` IN ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'SENT', 'COMPLETED'))
    `);

    // 인덱스 추가
    await queryRunner.query(`
      CREATE INDEX \`IDX_estimates_group_code\` ON \`estimates\` (\`group_code\`)
    `);

    await queryRunner.query(`
      CREATE INDEX \`IDX_estimates_version\` ON \`estimates\` (\`version\`)
    `);

    await queryRunner.query(`
      CREATE INDEX \`IDX_estimates_status\` ON \`estimates\` (\`status\`)
    `);

    // group_code와 version의 복합 인덱스 (최신 버전 조회용)
    await queryRunner.query(`
      CREATE INDEX \`IDX_estimates_group_code_version\` ON \`estimates\` (\`group_code\`, \`version\` DESC)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 인덱스 삭제
    await queryRunner.query(`
      DROP INDEX \`IDX_estimates_group_code_version\` ON \`estimates\`
    `);
    await queryRunner.query(`
      DROP INDEX \`IDX_estimates_status\` ON \`estimates\`
    `);
    await queryRunner.query(`
      DROP INDEX \`IDX_estimates_version\` ON \`estimates\`
    `);
    await queryRunner.query(`
      DROP INDEX \`IDX_estimates_group_code\` ON \`estimates\`
    `);

    // CHECK 제약조건 삭제
    await queryRunner.query(`
      ALTER TABLE \`estimates\` 
      DROP CONSTRAINT \`CHK_estimates_status\`
    `);

    // 컬럼 삭제
    await queryRunner.query(`
      ALTER TABLE \`estimates\` DROP COLUMN \`status\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`estimates\` DROP COLUMN \`version\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`estimates\` DROP COLUMN \`group_code\`
    `);
  }
}
