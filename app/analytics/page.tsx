'use client';

import { useEffect, useState, useRef } from 'react';
import { TrendingUp, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { SentimentDonut } from '@/components/charts/SentimentDonut';
import { SentimentTrend } from '@/components/charts/SentimentTrend';
import { RatingDistribution } from '@/components/charts/RatingDistribution';
import { KeywordClusters } from '@/components/charts/KeywordClusters';
import { CategoryBar } from '@/components/charts/CategoryBar';
import { ProductSentiment } from '@/components/charts/ProductSentiment';

interface Analytics {
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
  };
  keywords: {
    cluster_counts: Record<string, number>;
  };
  insights: string[];
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const sentimentRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const keywordRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  const downloadChart = async (ref: React.RefObject<HTMLDivElement>, name: string) => {
    if (ref.current) {
      try {
        const dataUrl = await toPng(ref.current, { backgroundColor: '#0B1220' });
        const link = document.createElement('a');
        link.download = `${name}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Failed to download chart:', error);
      }
    }
  };

  useEffect(() => {
    fetch('/api/analytics')
      .then(async res => {
        if (!res.ok) {
          setAnalytics(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data && data.error) {
          setAnalytics(null);
        } else if (data && data.sentiment && data.ratings && data.overview) {
          setAnalytics(data);
        } else {
          setAnalytics(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch analytics:', err);
        setAnalytics(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080D18] flex items-center justify-center">
        <p className="text-[#94A3B8]">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics || (analytics as any).error || !analytics.sentiment || !analytics.ratings || !analytics.overview) {
    return (
      <div className="min-h-screen bg-[#080D18]">
        <div className="flex">
          <aside className="w-64 bg-[#111827] border-r border-[#1E293B] min-h-screen p-6 fixed left-0 top-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RV</span>
              </div>
              <span className="text-[#F8FAFC] font-semibold text-xl">REVLYTICS</span>
            </div>
            
            <nav className="space-y-2">
              <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
                <TrendingUp size={18} />
                <span>Home</span>
              </a>
              <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
                <TrendingUp size={18} />
                <span>Dashboard</span>
              </a>
              <a href="/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
                <TrendingUp size={18} />
                <span>Analytics</span>
              </a>
            </nav>
          </aside>
          
          <main className="ml-64 flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-2">No Data Available</h1>
              <p className="text-[#94A3B8] mb-8">Please upload a CSV file to view analytics</p>
              
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-12 text-center">
                <p className="text-[#94A3B8] mb-4">No data has been uploaded yet</p>
                <a href="/upload" className="inline-block px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors">
                  Upload CSV File
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const sentimentData = analytics?.sentiment ? [
    { name: 'POSITIVE', value: Math.round(analytics.sentiment.positive_percentage || 0), percentage: analytics.sentiment.positive_percentage || 0 },
    { name: 'NEUTRAL', value: Math.round(analytics.sentiment.neutral_percentage || 0), percentage: analytics.sentiment.neutral_percentage || 0 },
    { name: 'NEGATIVE', value: Math.round(analytics.sentiment.negative_percentage || 0), percentage: analytics.sentiment.negative_percentage || 0 },
  ] : [];

  const ratingData = analytics?.ratings?.distribution ? Object.entries(analytics.ratings.distribution).map(([rating, count]) => ({
    rating: parseInt(rating),
    count,
    percentage: analytics?.overview ? parseFloat(((count / analytics.overview.total_records) * 100).toFixed(1)) : 0,
  })) : [];

  const keywordData = analytics?.keywords?.cluster_counts ? Object.entries(analytics.keywords.cluster_counts).map(([cluster, count]) => ({
    cluster,
    count,
    sentiment: 'NEGATIVE',
  })) : [];

  const categoryData = analytics?.categories?.category_counts ? Object.entries(analytics.categories.category_counts).map(([category, count]) => ({
    category,
    count,
    avgRating: 4.0,
  })) : [];

  const trendData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    sentiment: 0.6 + Math.random() * 0.3,
    reviews: Math.floor(Math.random() * 100) + 50,
  }));

  return (
    <div className="min-h-screen bg-[#080D18]">
      <div className="flex">
        <aside className="w-64 bg-[#111827] border-r border-[#1E293B] min-h-screen p-6 fixed left-0 top-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RV</span>
            </div>
            <span className="text-[#F8FAFC] font-semibold text-xl">REVLYTICS</span>
          </div>
          
          <nav className="space-y-2">
            <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <TrendingUp size={18} />
              <span>Home</span>
            </a>
            <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <TrendingUp size={18} />
              <span>Dashboard</span>
            </a>
            <a href="/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
              <TrendingUp size={18} />
              <span>Analytics</span>
            </a>
            <a href="/reviews" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <TrendingUp size={18} />
              <span>Reviews</span>
            </a>
            <a href="/pipeline" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <TrendingUp size={18} />
              <span>Pipeline</span>
            </a>
          </nav>
        </aside>
        
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-2">Detailed Analytics</h1>
                <p className="text-[#94A3B8]">{analytics.overview.total_records.toLocaleString()} reviews analyzed</p>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors"
              >
                <Download size={18} />
                Export Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#F8FAFC]">Sentiment Overview</h2>
                  <button
                    onClick={() => downloadChart(sentimentRef, 'sentiment-overview')}
                    className="text-[#3B82F6] hover:text-[#3B82F6]/80 text-sm"
                  >
                    <Download size={16} />
                  </button>
                </div>
                <div ref={sentimentRef}>
                  <SentimentDonut data={sentimentData} />
                </div>
              </div>
              
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#F8FAFC]">Sentiment Trend</h2>
                  <button
                    onClick={() => downloadChart(trendRef, 'sentiment-trend')}
                    className="text-[#3B82F6] hover:text-[#3B82F6]/80 text-sm"
                  >
                    <Download size={16} />
                  </button>
                </div>
                <div ref={trendRef}>
                  <SentimentTrend data={trendData} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#F8FAFC]">Rating Distribution</h2>
                  <button
                    onClick={() => downloadChart(ratingRef, 'rating-distribution')}
                    className="text-[#3B82F6] hover:text-[#3B82F6]/80 text-sm"
                  >
                    <Download size={16} />
                  </button>
                </div>
                <div ref={ratingRef}>
                  <RatingDistribution data={ratingData} />
                </div>
              </div>
              
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#F8FAFC]">Customer Issues</h2>
                  <button
                    onClick={() => downloadChart(keywordRef, 'customer-issues')}
                    className="text-[#3B82F6] hover:text-[#3B82F6]/80 text-sm"
                  >
                    <Download size={16} />
                  </button>
                </div>
                <div ref={keywordRef}>
                  <KeywordClusters data={keywordData} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#F8FAFC]">Category Analytics</h2>
                  <button
                    onClick={() => downloadChart(categoryRef, 'category-analytics')}
                    className="text-[#3B82F6] hover:text-[#3B82F6]/80 text-sm"
                  >
                    <Download size={16} />
                  </button>
                </div>
                <div ref={categoryRef}>
                  <CategoryBar data={categoryData} />
                </div>
              </div>
              
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#F8FAFC]">Product Sentiment</h2>
                  <button
                    onClick={() => downloadChart(productRef, 'product-sentiment')}
                    className="text-[#3B82F6] hover:text-[#3B82F6]/80 text-sm"
                  >
                    <Download size={16} />
                  </button>
                </div>
                <div ref={productRef}>
                  <ProductSentiment data={categoryData.slice(0, 5).map(c => ({
                    product: c.category,
                    avgRating: c.avgRating,
                    sentimentScore: 0.7,
                    reviewCount: c.count,
                  }))} />
                </div>
              </div>
            </div>
            
            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Key Insights</h2>
              <ul className="space-y-3">
                {analytics.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#94A3B8]">
                    <span className="text-[#3B82F6] mt-1">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
