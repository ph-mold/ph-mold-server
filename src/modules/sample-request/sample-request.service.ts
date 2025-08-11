import { Injectable } from '@nestjs/common';
import { CreateSampleRequestDto } from './dto/create-sample-request.dto';
import { SampleRequestRepository } from './sample-request.repository';

@Injectable()
export class SampleRequestService {
  constructor(private readonly sampleRequestRepo: SampleRequestRepository) {}

  async create(dto: CreateSampleRequestDto) {
    return this.sampleRequestRepo.createAndSave(dto);
  }

  async getOne(trackingCode: string) {
    const data =
      await this.sampleRequestRepo.findOneByTrackingCode(trackingCode);

    // nodeData 내의 memo 필드를 제거하여 외부에 노출되지 않도록 함
    if (data && data.nodeData) {
      const sanitizedNodeData = { ...data.nodeData };
      Object.keys(sanitizedNodeData).forEach((status) => {
        if (
          sanitizedNodeData[status] &&
          typeof sanitizedNodeData[status] === 'object' &&
          'memo' in sanitizedNodeData[status]
        ) {
          delete (sanitizedNodeData[status] as Record<string, unknown>).memo;
        }
      });

      return {
        ...data,
        nodeData: sanitizedNodeData,
      };
    }

    return data;
  }
}
