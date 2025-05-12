import * as crypto from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, Options as MulterOptions } from 'multer';
import { join } from 'path';

function generateFilename(path: string): string {
  const folder = path;
  if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
  const random = Math.random().toString();
  const hash = crypto.createHash('sha1').update(random).digest('hex');
  return `${hash.slice(0, 16)}.png`;
}

export function pngMulterOptions(path?: string): MulterOptions {
  const folder = join('contents', path ?? '/images');
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
        cb(null, folder);
      },
      filename: (req, file, cb) => {
        const filename = generateFilename(folder);
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      const isPng = file.mimetype === 'image/png';
      if (!isPng) {
        cb(null, false);
        return;
      }
      cb(null, true);
    },
  };
}
