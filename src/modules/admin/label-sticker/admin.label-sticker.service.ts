import { Injectable } from '@nestjs/common';
import * as htmlPdf from 'html-pdf-node';
import { LabelStickerDto } from './dto/label-sticker-request.dto';

@Injectable()
export class AdminLabelStickerService {
  private readonly labels = [
    '입고처',
    '품명',
    '코드',
    '수량',
    '중량',
    '납품일',
  ];

  private wrapWithSpans(text: string): string {
    return text
      .split('')
      .map((char) => `<span>${char}</span>`)
      .join('');
  }

  private generateTableContent(data: LabelStickerDto): string {
    if (!data || !Object.keys(data).length) {
      return '';
    }

    const values = [
      data.value1 || '',
      data.value2 || '',
      data.value3 || '',
      data.value4 || '',
      data.value5 || '',
      data.value6 || '',
    ];

    return `
      ${this.labels
        .map(
          (label) =>
            `<div>${this.wrapWithSpans(label)}</div><div class="value-cell">${values[this.labels.indexOf(label)]}</div>`,
        )
        .join('')}
      <div>팜앤몰드</div><div></div>
    `;
  }

  async getPDFLS3510(data: LabelStickerDto[]): Promise<Buffer> {
    return this.generatePDF(data);
  }

  private generateHtml(data: LabelStickerDto[]): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            @page {
              size: A4;
              margin: 0;
            }

            body {
              width: 210mm;
              height: 297mm;
              padding: 14.5mm 9.9mm 16.5mm 9.9mm;
            }

            .container {
              width: 100%;
              height: 100%;
              display: grid;
              grid-template-columns: 91.8mm 8mm 91.8mm;
              grid-template-rows: repeat(5, 53.4mm);
              gap: 0;
            }

            .cell {
              width: 100%;
              height: 100%;
              padding: 2mm;
            }

            .cell.has-content {
              border-left: 0.3mm solid black;
              border-right: 0.3mm solid black;
              border-top: 0.3mm solid black;
            }

            .cell.has-content:nth-last-child(-n+3) {
              border-bottom: 0.3mm solid black;
            }

            .center-cell {
              border: none !important;
              background-color: transparent;
            }

            .inner-table {
              display: grid;
              grid-template-columns: 1fr 3fr;
              grid-template-rows: repeat(6, 1fr) 1.8fr;
              height: 100%;
              background-color: white;
              position: relative;
              font-size: 12px;
              font-family: 'Arial', sans-serif;
            }

            .inner-table > div {
              position: relative;
              padding: 4px;
              display: flex;
              align-items: center;
              border: 1px solid #999;
            }

            .inner-table > div:nth-child(odd) {
              font-weight: bold;
              background-color: #f8f8f8;
              display: flex;
              justify-content: space-between;
              padding: 4px 8px;
            }

            .value-cell {
              justify-content: center !important;
              text-align: center;
              font-size:14px;
            }

            .inner-table > div:last-child {
              display: none;
            }

            .inner-table > div:nth-last-child(2) {
              grid-column: 1 / -1;
              text-align: center;
              font-weight: bold;
              font-size: 14px;
              background-color: white !important;
              justify-content: center;
            }

            @media print {
              html, body {
                width: 210mm;
                height: 297mm;
              }
              * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${Array(15)
              .fill(null)
              .map((_, i) => {
                const isCenter = i % 3 === 1;
                const dataIndex = Math.floor(i / 3) * 2 + (i % 3 === 2 ? 1 : 0);
                const currentData = data[dataIndex];
                const hasContent =
                  !isCenter &&
                  currentData &&
                  Object.keys(currentData).length > 0;

                return `
                  <div class="cell ${hasContent ? 'has-content' : ''} ${isCenter ? 'center-cell' : ''}" ${hasContent ? `style="background-color: ${currentData.backgroundColor || '#ff3b3b'}"` : ''}>
                    ${hasContent ? `<div class="inner-table">${this.generateTableContent(currentData)}</div>` : ''}
                  </div>
                `;
              })
              .join('')}
          </div>
        </body>
      </html>
    `;
  }

  async generatePDF(data: LabelStickerDto[] = []): Promise<Buffer> {
    const options = {
      format: 'A4',
      printBackground: true,
    };

    const file = { content: this.generateHtml(data) };
    const generatePdf = htmlPdf.generatePdf as (
      file: { content: string },
      options: any,
    ) => Promise<Buffer>;
    return generatePdf(file, options);
  }
}
