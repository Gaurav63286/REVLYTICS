import { NextResponse } from 'next/server';
import { getProcessedData } from '@/lib/processed-data';

export async function GET() {
  try {
    const processedData = getProcessedData();
    
    if (processedData && processedData.records) {
      return NextResponse.json({
        records: processedData.records,
        filename: processedData.filename,
        uploadedAt: processedData.uploadedAt,
      });
    }

    // Return empty state if no data uploaded
    return NextResponse.json(
      { error: 'No data uploaded. Please upload a CSV file first.' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch records' },
      { status: 500 }
    );
  }
}
