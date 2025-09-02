import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameClientToCustomerTable1756786347382
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // clients 테이블을 customers로 이름 변경
    await queryRunner.renameTable('clients', 'customers');

    // estimates 테이블의 client_id 컬럼을 customer_id로 변경
    await queryRunner.renameColumn('estimates', 'client_id', 'customer_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 롤백: customer_id를 client_id로 되돌리기
    await queryRunner.renameColumn('estimates', 'customer_id', 'client_id');

    // 롤백: customers 테이블을 clients로 되돌리기
    await queryRunner.renameTable('customers', 'clients');
  }
}
