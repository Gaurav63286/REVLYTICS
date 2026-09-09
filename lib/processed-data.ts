import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'data', 'processed-data.json');

export function setProcessedData(data: any) {
  try {
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      // In serverless environments, we can't write to disk
      // Fall back to memory storage
      (global as any).processedData = data;
      return;
    }
    writeFileSync(DATA_FILE, JSON.stringify(data));
  } catch (error) {
    // Fallback to memory if file write fails
    (global as any).processedData = data;
  }
}

export function getProcessedData() {
  try {
    const dataDir = join(process.cwd(), 'data');
    if (existsSync(DATA_FILE)) {
      const data = readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
    // Fallback to memory storage
    return (global as any).processedData || null;
  } catch (error) {
    // Fallback to memory storage
    return (global as any).processedData || null;
  }
}
