'use client';
import { useAlerts } from '@/hooks/useAlerts';
import { getSeverityColor, getSeverityDot, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AlertPanel() {
  const { alerts, isLoading } = useAlerts();
  const router = useRouter();

  if (isLoading) return (
    <div className="space-y-4 mt-2">
      {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)}
    </div>
  );

  return (
    <div className="space-y-4 mt-2">
      {alerts.map(alert => (
        <div key={alert.id} className={cn(
          "rounded-2xl border p-5 transition-all hover:translate-x-1 cursor-default",
          alert.severity === 'high' ? 'bg-rose-500/10 border-rose-500/20' :
            alert.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/20' :
              'bg-sky-500/10 border-sky-500/20'
        )}>
          <div className="flex items-start gap-3 mb-3">
            <span className={cn(
              "mt-1.5 w-2 h-2 rounded-full shrink-0 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]",
              getSeverityDot(alert.severity)
            )} />
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-foreground leading-tight tracking-tight">{alert.title}</p>
              <p className="text-xs mt-1.5 text-muted-foreground leading-relaxed line-clamp-2">{alert.description}</p>
              <p className="text-[10px] mt-2 font-bold uppercase tracking-widest text-muted-foreground/50">{formatDate(alert.createdAt)}</p>
            </div>
          </div>
          <div className="flex gap-2 pl-5 pt-2">
            <Button size="sm" variant="secondary" onClick={() => router.push(`/inbox?productId=${alert.productId}`)} className="text-[11px] font-bold uppercase tracking-wider rounded-lg h-8">
              Analyze reviews
            </Button>
            <Button size="sm" variant="ghost" className="text-[11px] font-bold uppercase tracking-wider rounded-lg h-8">
              Ignore
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}