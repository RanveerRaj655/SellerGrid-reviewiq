'use client';
import { Review } from '@/types';
import { getPlatformLabel, getSentimentColor, getRootCauseColor, getRootCauseLabel, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { Star, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ReviewCard({ review }: { review: Review }) {
  const { openReplyDrawer } = useAppStore();

  const sentimentVariant = { positive: 'success', neutral: 'default', negative: 'danger' } as const;

  return (
    <div className={cn(
      "bg-card text-card-foreground border rounded-2xl p-6 transition-all hover:bg-card/40 hover:border-border/30 group",
      review.escalated ? 'border-destructive/30 bg-destructive/5' : 'border-border'
    )}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-neutral-900 border border-border px-2 py-0.5 rounded-full">
            {getPlatformLabel(review.platform)}
          </span>
          <Badge variant={sentimentVariant[review.sentiment]}>
            {review.sentiment}
          </Badge>
          {review.escalated && (
            <Badge variant="danger" className="animate-pulse">
              <AlertCircle size={10} className="mr-1" /> Escalated
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0 bg-neutral-950/50 px-2 py-1 rounded-full border border-border/50">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={cn('transition-colors', i < review.rating ? 'fill-emerald-500 text-emerald-500' : 'text-neutral-800')} />
          ))}
        </div>
      </div>

      <p className="text-[15px] text-neutral-200 leading-relaxed mb-5 font-medium italic">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {review.rootCauses.map(cause => (
          <span key={cause} className={cn("text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border", getRootCauseColor(cause))}>
            {getRootCauseLabel(cause)}
          </span>
        ))}
        {review.keywords.map(kw => (
          <span key={kw} className="text-[10px] px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-400 font-bold border border-border uppercase tracking-wider hover:text-emerald-400 hover:border-emerald-400/30 transition-colors">
            {kw}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2">
          <span className="text-foreground font-bold">{review.author}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-800" />
          {review.productName}
          <span className="w-1 h-1 rounded-full bg-neutral-800" />
          {formatDate(review.createdAt)}
        </div>
        <div className="flex gap-2">
          {!review.replied && (
            <Button size="sm" variant="primary" onClick={() => openReplyDrawer(review)} className="rounded-full px-5 shadow-lg shadow-emerald-500/10">
              Reply
            </Button>
          )}
          {review.replied && <span className="text-[11px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Replied ✓</span>}
        </div>
      </div>
    </div>
  );
}
