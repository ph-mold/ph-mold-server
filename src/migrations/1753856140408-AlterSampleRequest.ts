import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSampleRequest1753856140408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // status 컬럼 추가 (VARCHAR - 콤마로 구분된 완료된 상태들)
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ADD COLUMN status VARCHAR(100) DEFAULT 'reception' NOT NULL
        `);

    // assigned_user_id 컬럼 추가 (담당자 ID)
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ADD COLUMN assigned_user_id INT NULL
        `);

    // completed_at 컬럼 추가 (완료 일시)
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ADD COLUMN completed_at DATETIME NULL
        `);

    // tracking_code 컬럼 추가 (고유 추적 코드)
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ADD COLUMN tracking_code VARCHAR(50) NULL,
            ADD UNIQUE INDEX idx_tracking_code (tracking_code)
        `);

    // node_data 컬럼 추가 (JSON - 각 노드별 데이터)
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ADD COLUMN node_data JSON NULL
        `);

    // updated_at 컬럼 추가 (마지막 수정 일시)
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        `);

    // 외래키 제약 조건 추가 (assigned_user_id -> users 테이블)
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            ADD CONSTRAINT fk_sample_requests_assigned_user 
            FOREIGN KEY (assigned_user_id) REFERENCES users(id) 
            ON DELETE SET NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 외래키 제약 조건 제거
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            DROP FOREIGN KEY fk_sample_requests_assigned_user
        `);

    // 컬럼들 제거
    await queryRunner.query(`
            ALTER TABLE sample_requests 
            DROP COLUMN status,
            DROP COLUMN assigned_user_id,
            DROP COLUMN completed_at,
            DROP COLUMN tracking_code,
            DROP COLUMN node_data,
            DROP COLUMN updated_at
        `);
  }
}
