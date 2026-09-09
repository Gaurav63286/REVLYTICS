import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For now, return sample CSV data
    // In production, this would fetch processed data from Python analytics
    const csvData = `id,review,rating,date,category,product,sentiment,sentiment_score,keyword_cluster
1,Great product! Fast shipping and excellent quality.,5,2024-01-15,Electronics,Smartphone,POSITIVE,0.95,PRODUCT_QUALITY
2,The checkout process was confusing and slow.,2,2024-01-14,Checkout,Website,NEGATIVE,0.32,CHECKOUT_LATENCY
3,Customer support was very helpful.,4,2024-01-13,Support,Service,POSITIVE,0.88,CUSTOMER_SUPPORT
4,App crashes frequently on mobile.,2,2024-01-12,Mobile,App,NEGATIVE,0.45,MOBILE_PERFORMANCE
5,Delivery was delayed by 3 days.,3,2024-01-11,Delivery,Shipping,NEUTRAL,0.52,DELIVERY_DELAY`;

    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="processed_reviews.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate CSV' },
      { status: 500 }
    );
  }
}
