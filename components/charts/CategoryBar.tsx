'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryBarProps {
  data: {
    category: string;
    count: number;
    avgRating: number;
  }[];
}

export function CategoryBar({ data }: CategoryBarProps) {
  const sortedData = [...data].sort((a, b) => b.count - a.count).slice(0, 8);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={sortedData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis 
          type="number"
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <YAxis 
          type="category"
          dataKey="category" 
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
        <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
