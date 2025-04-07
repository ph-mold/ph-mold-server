import { unlink } from 'fs/promises';

export async function safeUnlink(filePath?: string) {
  if (!filePath) return;
  try {
    await unlink(filePath);
    console.log(`🧹 삭제된 파일: ${filePath}`);
  } catch (err) {
    console.error('❗ 파일 삭제 실패:', err);
  }
}
