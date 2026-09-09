import { NextResponse } from 'next/server';
import { getProcessedData } from '@/lib/processed-data';

export async function GET() {
  try {
    // Only return data from uploaded files
    const processedData = getProcessedData();
    
    if (processedData && processedData.analytics) {
      return NextResponse.json(processedData.analytics);
    }

    // Return empty state if no data uploaded
    return NextResponse.json(
      { error: 'No data uploaded. Please upload a CSV file first.' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
