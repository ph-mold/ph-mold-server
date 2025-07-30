import { MigrationInterface, QueryRunner } from 'typeorm';

interface SampleRequestRow {
  id: number;
}

export class InsertSampleRequestTrackingCode1753857208170
  implements MigrationInterface
{
  // 8자리 UUID 생성 함수 (JavaScript)
  private generateTrackingCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('샘플 요청 tracking_code 생성 시작...');

    // 기존 샘플 요청들 조회
    const sampleRequests = (await queryRunner.query(
      'SELECT id FROM sample_requests WHERE tracking_code IS NULL OR tracking_code = ""',
    )) as SampleRequestRow[];

    console.log(
      `총 ${sampleRequests.length}개의 샘플 요청에 tracking_code를 생성합니다.`,
    );

    // 각 샘플 요청에 8자리 tracking_code 생성
    for (let i = 0; i < sampleRequests.length; i++) {
      const request = sampleRequests[i];
      const trackingCode = this.generateTrackingCode();

      await queryRunner.query(
        'UPDATE sample_requests SET tracking_code = ? WHERE id = ?',
        [trackingCode, request.id],
      );

      console.log(
        `[${i + 1}/${sampleRequests.length}] ID ${request.id}: ${trackingCode}`,
      );
    }

    console.log('샘플 요청 tracking_code 생성 완료!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // tracking_code를 NULL로 되돌리기
    await queryRunner.query(`
            UPDATE sample_requests 
            SET tracking_code = NULL
        `);
  }
}
