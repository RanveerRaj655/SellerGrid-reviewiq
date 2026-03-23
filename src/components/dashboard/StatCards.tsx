'use client';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';

export function StatCards() {
  const { categoryData, isLoading } = useAnalytics();

  if (isLoading) return (
    <div className="space-y-4 mt-4">
      {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-4 w-full rounded-full" />)}
    </div>
  );

  const colors: Record<string, string> = {
    delivery: 'bg-rose-500/80', defect: 'bg-orange-500/80',
    pricing: 'bg-sky-500/80', packaging: 'bg-amber-500/80',
    service: 'bg-indigo-500/80', other: 'bg-neutral-500/80',
  };

  return (
    <div className="space-y-4 mt-4">
      {categoryData.map(item => (
        <div key={item.category} className="flex items-center gap-4">
          <span className="text-[11px] font-bold text-neutral-400 w-24 text-right capitalize tabular-nums tracking-wide">
            {item.category}
          </span>
          <div className="flex-1 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${colors[item.category] ?? 'bg-neutral-500'}`}
              style={{ width: `${item.percent}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-neutral-200 w-8 tabular-nums">{item.count}</span>
        </div>
      ))}
    </div>
  );
}