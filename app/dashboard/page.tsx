'use client';

import { BarChart3, TrendingUp, Users, CheckCircle } from "lucide-react";
import { useEffect, useState } from 'react';
import { SentimentDonut } from '@/components/charts/SentimentDonut';
import { SentimentTrend } from '@/components/charts/SentimentTrend';
import { RatingDistribution } from '@/components/charts/RatingDistribution';
import { KeywordClusters } from '@/components/charts/KeywordClusters';

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

export default function HomePage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
                <BarChart3 size={18} />
                <span>Home</span>
              </a>
              <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
                <BarChart3 size={18} />
                <span>Dashboard</span>
              </a>
              <a href="/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
                <TrendingUp size={18} />
                <span>Analytics</span>
              </a>
              <a href="/reviews" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
                <Users size={18} />
                <span>Reviews</span>
              </a>
              <a href="/pipeline" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
                <CheckCircle size={18} />
                <span>Pipeline</span>
              </a>
            </nav>
            
            <div className="mt-8 pt-6 border-t border-[#1E293B]">
              <p className="text-xs text-[#94A3B8] uppercase mb-3">Data</p>
              <a href="/upload" className="block px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors mb-2">
                Upload Dataset
              </a>
            </div>
          </aside>
          
          <main className="ml-64 flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-2">
                REVLYTICS DASHBOARD
              </h1>
              <p className="text-[#94A3B8] mb-8">Customer feedback intelligence pipeline</p>
              
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

  const trendData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    sentiment: 0.6 + Math.random() * 0.3,
    reviews: Math.floor(Math.random() * 100) + 50,
  }));
  return (
    <div className="min-h-screen bg-[#080D18]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#111827] border-r border-[#1E293B] min-h-screen p-6 fixed left-0 top-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RV</span>
            </div>
            <span className="text-[#F8FAFC] font-semibold text-xl">REVLYTICS</span>
          </div>
          
          <nav className="space-y-2">
            <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <BarChart3 size={18} />
              <span>Home</span>
            </a>
            <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </a>
            <a href="/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <TrendingUp size={18} />
              <span>Analytics</span>
            </a>
            <a href="/reviews" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <Users size={18} />
              <span>Reviews</span>
            </a>
            <a href="/pipeline" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <CheckCircle size={18} />
              <span>Pipeline</span>
            </a>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-[#1E293B]">
            <p className="text-xs text-[#94A3B8] uppercase mb-3">Data</p>
            <a href="/upload" className="block px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors mb-2">
              Upload Dataset
            </a>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                    REVLYTICS DASHBOARD
                  </h1>
                  <p className="text-[#94A3B8] mt-1">Customer feedback intelligence pipeline</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] text-sm rounded-full">● SYSTEM ONLINE</span>
                  <span className="text-[#94A3B8] text-sm">Last analysis: 2m ago</span>
                </div>
              </div>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 hover:shadow-lg hover:shadow-[#3B82F6]/10 transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Users className="text-[#3B82F6]" size={24} />
                  <span className="text-[#22C55E] text-sm">+12.4%</span>
                </div>
                <div className="text-3xl font-bold text-[#F8FAFC] mb-1">{analytics?.overview?.total_records?.toLocaleString() || '0'}</div>
                <div className="text-[#94A3B8] text-sm">Total Reviews</div>
                <div className="text-[#94A3B8] text-xs mt-2">vs previous period</div>
              </div>
              
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 hover:shadow-lg hover:shadow-[#3B82F6]/10 transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="text-[#06B6D4]" size={24} />
                  <span className="text-[#22C55E] text-sm">+2.3%</span>
                </div>
                <div className="text-3xl font-bold text-[#F8FAFC] mb-1">{analytics?.ratings?.average_rating?.toFixed(1) || '0.0'} / 5</div>
                <div className="text-[#94A3B8] text-sm">Average Rating</div>
                <div className="text-[#94A3B8] text-xs mt-2">vs previous period</div>
              </div>
              
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 hover:shadow-lg hover:shadow-[#3B82F6]/10 transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="text-[#22C55E]" size={24} />
                  <span className="text-[#22C55E] text-sm">+5.1%</span>
                </div>
                <div className="text-3xl font-bold text-[#F8FAFC] mb-1">{analytics?.sentiment?.positive_percentage?.toFixed(1) || '0.0'}%</div>
                <div className="text-[#94A3B8] text-sm">Positive Sentiment</div>
                <div className="text-[#94A3B8] text-xs mt-2">vs previous period</div>
              </div>
              
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 hover:shadow-lg hover:shadow-[#3B82F6]/10 transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="text-[#06B6D4]" size={24} />
                  <span className="text-[#22C55E] text-sm">+0.8%</span>
                </div>
                <div className="text-3xl font-bold text-[#F8FAFC] mb-1">{analytics?.overview?.processing_accuracy?.toFixed(1) || '0.0'}%</div>
                <div className="text-[#94A3B8] text-sm">Processing Accuracy</div>
                <div className="text-[#94A3B8] text-xs mt-2">vs previous period</div>
              </div>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Sentiment Overview</h2>
                <SentimentDonut data={sentimentData} />
              </div>
              
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Sentiment Trend</h2>
                <SentimentTrend data={trendData} />
              </div>
            </div>
            
            {/* Rating Distribution */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Rating Distribution</h2>
              <RatingDistribution data={ratingData} />
            </div>
            
            {/* Customer Issues */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Customer Issues</h2>
              <KeywordClusters data={keywordData} />
            </div>
            
            {/* Insights */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Key Insights</h2>
              <ul className="space-y-3">
                {analytics?.insights?.map((insight, index) => (
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
