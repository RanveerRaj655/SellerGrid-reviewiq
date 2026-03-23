'use client';
import { TrendingDown, TrendingUp, AlertTriangle, Package, Star } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function StatItem({ label, value, delta, icon: Icon, deltaPositive }: {
  label: string; value: string; delta?: string; icon: React.ElementType; deltaPositive?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
        <Icon size={18} className="text-emerald-500" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground tabular-nums tracking-tight">{value}</span>
          {delta && (
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5",
              deltaPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
            )}>
              {deltaPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function TopBar() {
  const { stats, isLoading } = useAnalytics();

  if (isLoading) return (
    <div className="flex border-b border-border bg-card">
      {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-48 m-4" />)}
    </div>
  );

  return (
    <div className="flex items-stretch border-b border-border bg-card/50 backdrop-blur-md divide-x divide-border overflow-x-auto">
      <StatItem label="Avg rating" value={stats?.avgRating.toFixed(1) ?? '—'} delta={`${Math.abs(stats?.ratingDelta ?? 0).toFixed(1)}`} deltaPositive={(stats?.ratingDelta ?? 0) > 0} icon={Star} />
      <StatItem label="Negative reviews" value={`${stats?.negativePercent ?? 0}%`} delta={`${stats?.negativeDelta ?? 0}%`} deltaPositive={false} icon={TrendingDown} />
      <StatItem label="Active alerts" value={String(stats?.activeAlerts ?? 0)} icon={AlertTriangle} />
      <StatItem label="Impacted products" value={String(stats?.impactedProducts ?? 0)} icon={Package} />
    </div>
  );
}
