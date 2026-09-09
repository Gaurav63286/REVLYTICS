'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface KeywordClustersProps {
  data: {
    cluster: string;
    count: number;
    sentiment: string;
  }[];
}

export function KeywordClusters({ data }: KeywordClustersProps) {
  const sortedData = [...data].sort((a, b) => b.count - a.count).slice(0, 10);
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={sortedData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis 
          type="number"
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <YAxis 
          type="category"
          dataKey="cluster" 
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
          width={120}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="count" fill="#06B6D4" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
