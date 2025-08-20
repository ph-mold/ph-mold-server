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
import { AdminProductSpecModule } from './modules/admin/product/product-spec/admin.product-spec.module';
import { AdminProductTagModule } from './modules/admin/product/product-tag/admin.product-tag.module';
import { FileModule } from './modules/file/file.module';
import { AdminProductModule } from './modules/admin/product/product/admin.product.module';
import { AuthModule } from './modules/admin/auth/auth.module';
import { AdminTagModule } from './modules/admin/tag/admin.tag.module';
import { AdminSpecModule } from './modules/admin/spec/admin.spec.module';
import { AdminSampleRequestModule } from './modules/admin/sample-request/admin.sample-request.module';
import { InquiryModule } from './modules/inquiry/inquiry.module';
import { AdminLabelStickerModule } from './modules/admin/label-sticker/admin.label-sticker.module';
import { getMailerModule } from './utils/mailer.module';
import { AdminInquiryModule } from './modules/admin/Inquiries/admin.inquiry.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...getLocalStaticModules(),
    getMailerModule(),
    DbModule,
    HealthModule,
    ProductModule,
    TagModule,
    CategoryModule,
    SampleRequestModule,
    InquiryModule,
    AdminProductSpecModule,
    AdminProductTagModule,
    FileModule,
    AdminProductModule,
    AuthModule,
    AdminTagModule,
    AdminSpecModule,
    AdminSampleRequestModule,
    AdminLabelStickerModule,
    AdminInquiryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
