'use client';
import { TopBar } from '@/components/shared/TopBar';
import { FilterBar } from '@/components/inbox/FilterBar';
import { ReviewCard } from '@/components/inbox/ReviewCard';
import { ReplyDrawer } from '@/components/inbox/ReplyDrawer';
import { useReviews } from '@/hooks/useReviews';
import { useAppStore } from '@/store/useAppStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Inbox } from 'lucide-react';

export default function InboxPage() {
  const { filters } = useAppStore();
  const { reviews, isLoading } = useReviews(filters);

  return (
    <div className="bg-background min-h-full">
      <TopBar />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              Review Inbox
              <Inbox className="text-emerald-500 w-5 h-5" />
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {reviews.length} reviews matching your filters
            </p>
          </div>
        </div>

        <FilterBar />

        <div className="mt-8 space-y-4">
          {isLoading
            ? [...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-2xl" />)
            : reviews.length === 0
              ? <div className="text-center py-20 bg-card/20 rounded-3xl border border-dashed border-border flex flex-col items-center gap-3">
                <Inbox className="w-8 h-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">No reviews match your filters.</p>
              </div>
              : reviews.map(r => <ReviewCard key={r.id} review={r} />)
          }
        </div>
      </div>
      <ReplyDrawer />
    </div>
  );
}