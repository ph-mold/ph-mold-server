import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { HealthModule } from './health/health.module';
import { ProductModule } from './modules/product/product.module';
import { TagModule } from './modules/tag/tag.module';
import { CategoryModule } from './modules/category/category.module';
import { getLocalStaticModules } from './utils/local-serve-static-module';
import { SampleRequestModule } from './modules/sample-request/sample-request.module';
import { AdminProductSpecModule } from './modules/admin/product-spec/admin.product-spec.module';
import { AdminProductTagModule } from './modules/admin/product-tag/admin.product-tag.module';
import { FileModule } from './modules/file/file.module';
import { AdminProductModule } from './modules/admin/product/admin.product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...getLocalStaticModules(),
    DbModule,
    HealthModule,
    ProductModule,
    TagModule,
    CategoryModule,
    SampleRequestModule,
    AdminProductSpecModule,
    AdminProductTagModule,
    FileModule,
    AdminProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
