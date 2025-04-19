import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixProductsAndProductImages1744959304162
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`isThumbnail\` \`is_thumbnail\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`sortOrder\` \`sort_order\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`createdAt\` \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`product_images\` DROP COLUMN \`productId\``,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_images\` ADD \`productId\` int`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`create_at\` \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`sort_order\` \`sortOrder\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`is_thumbnail\` \`isThumbnail\` tinyint NOT NULL DEFAULT 0`,
    );
  }
}
