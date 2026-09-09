'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RatingDistributionProps {
  data: {
    rating: number;
    count: number;
    percentage: number;
  }[];
}

export function RatingDistribution({ data }: RatingDistributionProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis 
          dataKey="rating" 
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <YAxis 
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
