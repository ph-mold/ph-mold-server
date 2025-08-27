import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('excel-test')
  @ApiOperation({
    summary: '견적서 엑셀 파일 생성 및 다운로드',
    description:
      '견적서 템플릿을 기반으로 테스트 데이터를 포함한 엑셀 파일을 생성하고 다운로드합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '엑셀 파일 다운로드 성공',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '견적서 템플릿 파일을 찾을 수 없음',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          example: '견적서 템플릿 파일을 찾을 수 없습니다.',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: '견적서 생성 실패',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          example: '견적서 생성에 실패했습니다.',
        },
      },
    },
  })
  async excelTest(@Res() res: Response) {
    try {
      // 1. 템플릿 파일 경로 설정
      const templatePath = path.join(
        process.cwd(),
        'src/templates/excels/quotation/template.xlsx',
      );

      // 2. 템플릿 파일 존재 확인
      if (!fs.existsSync(templatePath)) {
        return res
          .status(404)
          .json({ error: '견적서 템플릿 파일을 찾을 수 없습니다.' });
      }

      // 3. 견적서에 입력할 테스트 데이터
      const estimateData = {
        issueDate: '2025년 8월 27일',
        recipient: '(주)테스트회사',
        personInCharge: '김테스트 님',
        email: 'test@example.com',
        contact: '010-1234-5678',
        items: [
          {
            name: '샘플 아이템 1',
            spec: 'A-type',
            unit: 'EA',
            unitPrice: 1500,
            quantity: 100,
            remarks: '선주문',
          },
          {
            name: '샘플 아이템 2',
            spec: 'B-type',
            unit: 'EA',
            unitPrice: 3000,
            quantity: 50,
            remarks: '',
          },
          {
            name: '샘플 아이템 3',
            spec: 'C-type',
            unit: 'SET',
            unitPrice: 12000,
            quantity: 10,
            remarks: '세트 할인',
          },
        ],
      };

      // 4. ExcelJS로 워크북 생성
      const workbook = new ExcelJS.Workbook();

      // 5. 템플릿 파일 로드
      await workbook.xlsx.readFile(templatePath);

      // 6. 첫 번째 워크시트 선택
      const worksheet = workbook.worksheets[0];

      // 7. 고정된 위치에 데이터 삽입
      worksheet.getCell('B4').value += estimateData.issueDate; // 발신일
      worksheet.getCell('B7').value += estimateData.recipient; // 수신
      worksheet.getCell('B9').value += estimateData.personInCharge; // 담당자
      worksheet.getCell('B10').value += estimateData.email; // 이메일
      worksheet.getCell('B11').value += estimateData.contact; // 연락처

      // 8. 견적 품목 리스트 삽입 (최대 8개)
      const startRow = 17;
      const itemsToProcess = estimateData.items.slice(0, 8);

      itemsToProcess.forEach((item, index) => {
        const currentRow = startRow + index;

        // 각 품목의 정보를 해당 행의 셀에 입력
        worksheet.getCell(`B${currentRow}`).value = item.name; // 품명
        worksheet.getCell(`K${currentRow}`).value = item.spec; // 규격
        worksheet.getCell(`O${currentRow}`).value = item.unit; // 단위
        worksheet.getCell(`Q${currentRow}`).value = item.unitPrice; // 단가
        worksheet.getCell(`U${currentRow}`).value = item.quantity; // 수량
        // 금액(W열)은 '단가 * 수량'의 엑셀 수식으로 자동 계산
        worksheet.getCell(`X${currentRow}`).value = {
          formula: `Q${currentRow}*U${currentRow}`,
        };
        worksheet.getCell(`AC${currentRow}`).value = item.remarks; // 비고
      });

      // 9. 합계 금액 셀(O14)에 총액을 계산하는 SUM 수식 삽입
      if (itemsToProcess.length > 0) {
        worksheet.getCell('O14').value = {
          formula: `SUM(X${startRow}:X${startRow + itemsToProcess.length - 1})`,
        };
      }

      // 10. 응답 헤더 설정
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      // 한글과 특수문자를 포함한 파일명을 RFC 5987 형식으로 인코딩
      const filename = `견적서_${estimateData.recipient}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      const encodedFilename = encodeURIComponent(filename).replace(
        /['()]/g,
        escape,
      );

      res.setHeader(
        'Content-Disposition',
        `attachment; filename*=UTF-8''${encodedFilename}`,
      );

      // 11. 파일 스트림으로 응답
      await workbook.xlsx.write(res);
    } catch (error) {
      console.error('견적서 생성 오류:', error);
      res.status(500).json({ error: '견적서 생성에 실패했습니다.' });
    }
  }
}
