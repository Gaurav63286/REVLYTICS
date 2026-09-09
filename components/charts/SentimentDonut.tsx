'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
  POSITIVE: '#10B981',
  NEUTRAL: '#F59E0B',
  NEGATIVE: '#EF4444',
};

interface SentimentDonutProps {
  data: {
    name: string;
    value: number;
    percentage: number;
  }[];
}

export function SentimentDonut({ data }: SentimentDonutProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#111827',
            border: '1px solid #1F2937',
            borderRadius: '8px',
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value, entry: any) => (
            <span style={{ color: '#F8FAFC' }}>
              {value}: {entry.payload.percentage}%
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
