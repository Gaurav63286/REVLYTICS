'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProductSentimentProps {
  data: {
    product: string;
    avgRating: number;
    sentimentScore: number;
    reviewCount: number;
  }[];
}

export function ProductSentiment({ data }: ProductSentimentProps) {
  const sortedData = [...data].sort((a, b) => b.sentimentScore - a.sentimentScore).slice(0, 8);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={sortedData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis 
          type="number"
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
          domain={[0, 1]}
        />
        <YAxis 
          type="category"
          dataKey="product" 
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
          width={100}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="sentimentScore" fill="#06B6D4" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
