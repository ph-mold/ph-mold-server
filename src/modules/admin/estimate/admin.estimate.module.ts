import { Module } from '@nestjs/common';
import { AdminEstimateController } from './admin.estimate.controller';
import { AdminEstimateService } from './admin.estimate.service';
import { AdminEstimateRepository } from './admin.estimate.repository';

@Module({
  controllers: [AdminEstimateController],
  providers: [AdminEstimateService, AdminEstimateRepository],
})
export class AdminEstimateModule {}
