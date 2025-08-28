import { Injectable } from '@nestjs/common';
import { AdminEstimateRepository } from './admin.estimate.repository';

@Injectable()
export class AdminEstimateService {
  constructor(private readonly repo: AdminEstimateRepository) {}
}
