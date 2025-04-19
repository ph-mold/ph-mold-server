import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMockProductImages1745069745790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const imageUrl = '/contents/categories/test/20250408-002-test.png';

    for (let productId = 1; productId <= 46; productId++) {
      const imageCount = Math.floor(Math.random() * 2) + 4;

      for (let i = 0; i < imageCount; i++) {
        const isThumbnail = i === 0 ? 1 : 0;
        const sortOrder = i + 1;

        await queryRunner.query(
          `
              INSERT INTO product_images (url, is_thumbnail, sort_order, product_id, create_at)
              VALUES (?, ?, ?, ?, NOW())
            `,
          [imageUrl, isThumbnail, sortOrder, productId],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM product_images
          WHERE url = '/contents/categories/test/20250408-002-test.png'
        `);
  }
}
