'use client';
import { mockProducts } from '@/data/mock';
import { getRootCauseColor, getRootCauseLabel } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function ProductTable() {
  const router = useRouter();

  return (
    <div className="overflow-x-auto -mx-1 px-1 mt-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {['Product', 'Avg rating', 'Primary issue', 'Reviews', 'Action'].map(h => (
              <th key={h} className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest pb-4 pr-6">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {mockProducts.map(p => (
            <tr key={p.id} className="group hover:bg-white/[0.02] transition-all cursor-default">
              <td className="py-5 pr-6">
                <p className="font-bold text-foreground tracking-tight">{p.name}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5 opacity-60">{p.category}</p>
              </td>
              <td className="py-5 pr-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tabular-nums">{p.avgRating.toFixed(1)}</span>
                  <div className={cn(
                    "p-1 rounded-md",
                    p.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' :
                      p.trend === 'down' ? 'bg-rose-500/10 text-rose-500' :
                        'bg-neutral-800 text-neutral-500'
                  )}>
                    {p.trend === 'up' && <TrendingUp size={14} />}
                    {p.trend === 'down' && <TrendingDown size={14} />}
                    {p.trend === 'stable' && <Minus size={14} />}
                  </div>
                </div>
              </td>
              <td className="py-5 pr-6">
                {p.topIssue ? (
                  <span className={cn("text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border", getRootCauseColor(p.topIssue))}>
                    {getRootCauseLabel(p.topIssue)}
                  </span>
                ) : <span className="text-neutral-700 text-[10px] font-bold uppercase tracking-widest italic">— No issues —</span>}
              </td>
              <td className="py-5 pr-6 text-neutral-400 font-bold tabular-nums tracking-wide">{p.reviewCount.toLocaleString()}</td>
              <td className="py-5">
                <Button size="sm" variant="ghost" onClick={() => router.push(`/products?id=${p.id}`)} className="h-9 px-4 rounded-xl group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all font-bold text-xs uppercase tracking-widest">
                  Explore <ArrowUpRight size={14} className="ml-1 opacity-50 group-hover:opacity-100" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
