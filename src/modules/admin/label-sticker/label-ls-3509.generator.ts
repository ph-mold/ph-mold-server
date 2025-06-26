import * as htmlPdf from 'html-pdf-node';
import {
  LS3509LabelStickerDto,
  LS3510LabelStickerDto,
} from './dto/label-sticker-request.dto';
import { Injectable } from '@nestjs/common';

// === 라벨/용지 레이아웃 상수 ===
const A4_WIDTH = 210; // mm
const A4_HEIGHT = 297; // mm
const PADDING_TOP = 10; // mm
const PADDING_BOTTOM = 9.8; // mm
const PADDING_SIDE = 0.5; // mm
const CENTER_GAP = 2; // mm
const LABEL_COLS = 2;
const LABEL_ROWS = 9;
const LABEL_WIDTH = (A4_WIDTH - PADDING_SIDE * 2 - CENTER_GAP) / LABEL_COLS; // mm
const LABEL_HEIGHT = (A4_HEIGHT - PADDING_TOP - PADDING_BOTTOM) / LABEL_ROWS; // mm

@Injectable()
export class LabelStickerPdfGeneratorLS3509 {
  private readonly labels = ['업체명', '제품명', '규격', '수량'];

  private wrapWithSpans(text: string): string {
    return text
      .split('')
      .map((char) => `<span>${char}</span>`)
      .join('');
  }

  private generateTableContent(data: LS3510LabelStickerDto): string {
    if (!data || !Object.keys(data).length) {
      return '';
    }

    const values = [
      data.value1 || '',
      data.value2 || '',
      data.value3 || '',
      data.value4 || '',
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

  private generateHtml(data: LS3510LabelStickerDto[]): string {
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
              line-height: 1.2;
              letter-spacing: -0.02em;
            }
            
            @page {
              size: ${A4_WIDTH}mm ${A4_HEIGHT}mm;
              margin: 0;
            }

            body {
              width: ${A4_WIDTH}mm;
              height: ${A4_HEIGHT}mm;
              padding: ${PADDING_TOP}mm ${PADDING_SIDE}mm ${PADDING_BOTTOM}mm ${PADDING_SIDE}mm;
            }

            .container {
              width: 100%;
              height: 100%;
              display: grid;
              grid-template-columns: ${LABEL_WIDTH}mm ${CENTER_GAP}mm ${LABEL_WIDTH}mm;
              grid-template-rows: repeat(${LABEL_ROWS}, ${LABEL_HEIGHT}mm);
              gap: 0;
            }

            .cell {
              width: ${LABEL_WIDTH}mm;
              height: ${LABEL_HEIGHT}mm;
              padding: 1.2mm;
              box-sizing: border-box;
            }

            .cell.has-content {
              border: 0.3mm solid #666;
            }

            .center-cell {
              width: ${CENTER_GAP}mm;
              border: none !important;
              background-color: transparent;
            }

            .inner-table {
              display: grid;
              grid-template-columns: 20mm 1fr;
              grid-template-rows: repeat(5, 1fr);
              height: 100%;
              background-color: white;
              position: relative;
              font-size: 12px;
              font-family: 'Arial', sans-serif;
            }

            .inner-table > div {
              position: relative;
              padding: 3px 8px;
              display: flex;
              align-items: center;
              border: 0.2mm solid #999;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .inner-table > div:nth-child(odd) {
              font-weight: bold;
              background-color: #f8f8f8;
              justify-content: space-between;
              padding-right: 12px;
            }

            .value-cell {
              justify-content: center !important;
              text-align: center;
              font-size: 12px;
              padding: 3px 12px !important;
            }

            .inner-table > div:last-child {
              display: none;
            }

            .inner-table > div:nth-last-child(2) {
              grid-column: 1 / -1;
              text-align: center;
              font-weight: bold;
              font-size: 12px;
              background-color: white !important;
              justify-content: center;
              border-top: 2px solid #999;
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
            ${Array(LABEL_ROWS * LABEL_COLS + LABEL_ROWS * (LABEL_COLS - 1))
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

  async generatePDF(data: LS3509LabelStickerDto[] = []): Promise<Buffer> {
    const options = {
      format: 'A4',
      printBackground: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
      timeout: 60000, // 60초 타임아웃
    };

    const file = { content: this.generateHtml(data) };
    const generatePdf = htmlPdf.generatePdf as (
      file: { content: string },
      options: any,
    ) => Promise<Buffer>;
    return generatePdf(file, options);
  }
}
