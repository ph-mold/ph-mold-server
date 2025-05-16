import { Injectable } from '@nestjs/common';
import AdminProductRepository from './admin.product.repository';

@Injectable()
export class AdminProductService {
  constructor(
    private readonly adminProductRepository: AdminProductRepository,
  ) {}
}
