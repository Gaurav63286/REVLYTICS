export interface Review {
  id: string;
  review: string;
  rating: number;
  date: string;
  category: string;
  product: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  sentiment_score: number;
  keyword_cluster: string;
}

export interface Analytics {
  overview: {
    total_records: number;
    processing_accuracy: number;
  };
  ratings: {
    average_rating: number;
    distribution: Record<number, number>;
  };
  sentiment: {
    positive_percentage: number;
    neutral_percentage: number;
    negative_percentage: number;
    average_score: number;
  };
  categories: {
    category_counts: Record<string, number>;
    sentiment_by_category: Record<string, any>;
  };
  keywords: {
    cluster_counts: Record<string, number>;
  };
  insights: string[];
}

export interface KPIMetric {
  label: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
}
