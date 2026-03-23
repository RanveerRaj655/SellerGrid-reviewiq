import { TopBar } from '@/components/shared/TopBar';
import { ProductTable } from '@/components/dashboard/ProductTable';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="bg-background min-h-full">
      <TopBar />
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              Product Intelligence
              <Package className="text-emerald-500 w-5 h-5" />
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Detailed performance metrics across your entire product catalog.</p>
          </div>
        </div>

        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between border-none pb-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">All products</h2>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <ProductTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}