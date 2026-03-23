'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';

export function SentimentChart() {
  const { sentimentData, isLoading } = useAnalytics();

  if (isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;

  return (
    <div className="h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sentimentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: '#737373', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#737373', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0a0a0a',
              border: '1px solid #262626',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#fafafa',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
            }}
            itemStyle={{ padding: '2px 0' }}
            cursor={{ stroke: '#404040', strokeWidth: 1 }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={6}
            wrapperStyle={{ fontSize: '11px', paddingBottom: '20px', color: '#a3a3a3', fontWeight: 600 }}
          />
          <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={3} dot={false} name="Positive" />
          <Line type="monotone" dataKey="neutral" stroke="#737373" strokeWidth={2} dot={false} name="Neutral" />
          <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={false} name="Negative" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}