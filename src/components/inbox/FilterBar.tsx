'use client';
import { useAppStore } from '@/store/useAppStore';
import { mockProducts } from '@/data/mock';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FilterBar() {
  const { filters, setFilter, resetFilters } = useAppStore();
  const hasFilters = filters.platform !== 'all' || filters.sentiment !== 'all' || filters.productId !== 'all' || filters.search !== '';

  return (
    <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border/50">
      <div className="relative flex-1 min-w-[240px]">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search reviews..."
          value={filters.search}
          onChange={e => setFilter('search', e.target.value)}
          className="w-full pl-11 pr-4 py-2 text-sm bg-neutral-900 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex items-center gap-3">
        <select
          value={filters.platform}
          onChange={e => setFilter('platform', e.target.value as any)}
          className="text-sm bg-neutral-900 border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 appearance-none cursor-pointer"
        >
          <option value="all">All platforms</option>
          <option value="amazon">Amazon</option>
          <option value="flipkart">Flipkart</option>
          <option value="shopify">Shopify</option>
          <option value="instagram">Instagram</option>
        </select>

        <select
          value={filters.sentiment}
          onChange={e => setFilter('sentiment', e.target.value as any)}
          className="text-sm bg-neutral-900 border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 appearance-none cursor-pointer"
        >
          <option value="all">All sentiments</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
          <option value="positive">Positive</option>
        </select>

        <select
          value={filters.productId}
          onChange={e => setFilter('productId', e.target.value)}
          className="text-sm bg-neutral-900 border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 appearance-none cursor-pointer max-w-[160px]"
        >
          <option value="all">All products</option>
          {mockProducts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        {hasFilters && (
          <Button size="sm" variant="ghost" onClick={resetFilters} className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10">
            <X size={14} className="mr-1" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
}
