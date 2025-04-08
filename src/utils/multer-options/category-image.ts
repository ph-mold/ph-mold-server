import * as dayjs from 'dayjs';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { diskStorage, Options as MulterOptions } from 'multer';
import { join } from 'path';

function generateFilename(categoryKey: string): string {
  const today = dayjs().format('YYYYMMDD');
  const folder = join('uploads/categories', categoryKey);
  if (!existsSync(folder)) mkdirSync(folder, { recursive: true });

  const existing = readdirSync(folder).filter((name) =>
    name.startsWith(today),
  ).length;
  const index = String(existing + 1).padStart(3, '0');
  return `${today}-${index}-${categoryKey}.png`;
}

interface CategoryCreateBody {
  key: string;
}

export function categoryImageMulterOptions(): MulterOptions {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const key = (req.body as CategoryCreateBody).key;
        const folder = join('uploads/categories', key);
        if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
        cb(null, folder);
      },
      filename: (req, file, cb) => {
        const key = (req.body as CategoryCreateBody).key;
        const filename = generateFilename(key);
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
