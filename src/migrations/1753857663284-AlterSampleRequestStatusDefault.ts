import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSampleRequestStatusDefault1753857663284
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // status 컬럼의 기본값을 빈 문자열로 변경
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ALTER COLUMN status SET DEFAULT ''
        `);

    // 기존 샘플 요청들의 status를 빈 문자열로 초기화
    await queryRunner.query(`
            UPDATE sample_requests 
            SET status = '' 
            WHERE status = 'reception'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // status 컬럼의 기본값을 'reception'으로 되돌리기
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ALTER COLUMN status SET DEFAULT 'reception'
        `);

    // 기존 샘플 요청들의 status를 'reception'으로 되돌리기
    await queryRunner.query(`
            UPDATE sample_requests 
            SET status = 'reception' 
            WHERE status = ''
        `);
  }
}
