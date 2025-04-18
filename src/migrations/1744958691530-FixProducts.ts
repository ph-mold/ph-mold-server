import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixProducts1744958691530 implements MigrationInterface {
  name = 'FixProducts1744958691530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` DROP FOREIGN KEY \`FK_52c460bf8d39fdc05d28413ee88\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` DROP FOREIGN KEY \`FK_d05c6e45472b46d287925590bb8\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_52c460bf8d39fdc05d28413ee8\` ON \`custom_category_tags\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d05c6e45472b46d287925590bb\` ON \`custom_category_tags\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` DROP COLUMN \`productId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` DROP COLUMN \`type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` ADD \`type\` enum ('include', 'exclude') NOT NULL DEFAULT 'include'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` DROP FOREIGN KEY \`FK_764771b06bf649189ff558337fa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` CHANGE \`parent_id\` \`parent_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` CHANGE \`image_url\` \`image_url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` CHANGE \`created_by\` \`created_by\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` DROP FOREIGN KEY \`FK_7ade97675e64f0a2abd6c5be81d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` DROP FOREIGN KEY \`FK_a273e09440556facdaa85d8bb2e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` CHANGE \`product_id\` \`product_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` CHANGE \`spec_type_id\` \`spec_type_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` DROP FOREIGN KEY \`FK_4f166bb8c2bfcef2498d97b4068\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`sortOrder\` \`sortOrder\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`product_id\` \`product_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`main_category\` \`main_category\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`sub_category\` \`sub_category\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`material\` \`material\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`thumbnail_image_url\` \`thumbnail_image_url\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`origin\` \`origin\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`moq\` \`moq\` int NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_52c460bf8d39fdc05d28413ee8\` ON \`custom_category_tags\` (\`custom_category_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_d05c6e45472b46d287925590bb\` ON \`custom_category_tags\` (\`tag_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` ADD CONSTRAINT \`FK_52c460bf8d39fdc05d28413ee88\` FOREIGN KEY (\`custom_category_id\`) REFERENCES \`custom_categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` ADD CONSTRAINT \`FK_d05c6e45472b46d287925590bb8\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` ADD CONSTRAINT \`FK_764771b06bf649189ff558337fa\` FOREIGN KEY (\`parent_id\`) REFERENCES \`custom_categories\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` ADD CONSTRAINT \`FK_7ade97675e64f0a2abd6c5be81d\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` ADD CONSTRAINT \`FK_a273e09440556facdaa85d8bb2e\` FOREIGN KEY (\`spec_type_id\`) REFERENCES \`spec_types\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` ADD CONSTRAINT \`FK_4f166bb8c2bfcef2498d97b4068\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_images\` DROP FOREIGN KEY \`FK_4f166bb8c2bfcef2498d97b4068\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` DROP FOREIGN KEY \`FK_a273e09440556facdaa85d8bb2e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` DROP FOREIGN KEY \`FK_7ade97675e64f0a2abd6c5be81d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` DROP FOREIGN KEY \`FK_764771b06bf649189ff558337fa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` DROP FOREIGN KEY \`FK_d05c6e45472b46d287925590bb8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` DROP FOREIGN KEY \`FK_52c460bf8d39fdc05d28413ee88\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d05c6e45472b46d287925590bb\` ON \`custom_category_tags\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_52c460bf8d39fdc05d28413ee8\` ON \`custom_category_tags\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`moq\` \`moq\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`origin\` \`origin\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`thumbnail_image_url\` \`thumbnail_image_url\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`material\` \`material\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`sub_category\` \`sub_category\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`main_category\` \`main_category\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`product_id\` \`product_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` CHANGE \`sortOrder\` \`sortOrder\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` ADD CONSTRAINT \`FK_4f166bb8c2bfcef2498d97b4068\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` CHANGE \`spec_type_id\` \`spec_type_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` CHANGE \`product_id\` \`product_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` ADD CONSTRAINT \`FK_a273e09440556facdaa85d8bb2e\` FOREIGN KEY (\`spec_type_id\`) REFERENCES \`spec_types\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_specs\` ADD CONSTRAINT \`FK_7ade97675e64f0a2abd6c5be81d\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` CHANGE \`created_by\` \`created_by\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` CHANGE \`image_url\` \`image_url\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` CHANGE \`parent_id\` \`parent_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_categories\` ADD CONSTRAINT \`FK_764771b06bf649189ff558337fa\` FOREIGN KEY (\`parent_id\`) REFERENCES \`custom_categories\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` DROP COLUMN \`type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` ADD \`type\` enum ('include', 'exclude') NOT NULL DEFAULT ''include''`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` ADD \`productId\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_d05c6e45472b46d287925590bb\` ON \`custom_category_tags\` (\`tag_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_52c460bf8d39fdc05d28413ee8\` ON \`custom_category_tags\` (\`custom_category_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` ADD CONSTRAINT \`FK_d05c6e45472b46d287925590bb8\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`custom_category_tags\` ADD CONSTRAINT \`FK_52c460bf8d39fdc05d28413ee88\` FOREIGN KEY (\`custom_category_id\`) REFERENCES \`custom_categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
