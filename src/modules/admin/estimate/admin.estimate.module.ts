import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEstimateController } from './admin.estimate.controller';
import { AdminEstimateService } from './admin.estimate.service';
import { AdminEstimateRepository } from './admin.estimate.repository';
import { Estimate } from 'src/entities/admin/estimate.entity';
import { Customer } from 'src/entities/admin/customer.entity';
import { User } from 'src/entities/admin/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estimate, Customer, User])],
  controllers: [AdminEstimateController],
  providers: [AdminEstimateService, AdminEstimateRepository],
})
export class AdminEstimateModule {}
