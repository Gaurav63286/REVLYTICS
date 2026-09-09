'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SentimentTrendProps {
  data: {
    date: string;
    sentiment: number;
    reviews: number;
  }[];
}

export function SentimentTrend({ data }: SentimentTrendProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis 
          dataKey="date" 
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <YAxis 
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
          domain={[0, 1]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="sentiment" 
          stroke="#06B6D4" 
          strokeWidth={2}
          name="Sentiment Score"
          dot={{ fill: '#06B6D4' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
