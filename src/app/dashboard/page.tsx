import { TopBar } from '@/components/shared/TopBar';
import { AlertPanel } from '@/components/dashboard/AlertPanel';
import { SentimentChart } from '@/components/dashboard/SentimentChart';
import { StatCards } from '@/components/dashboard/StatCards';
import { ProductTable } from '@/components/dashboard/ProductTable';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-full">
      <TopBar />
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              Dashboard Overview
              <LayoutDashboard className="text-emerald-500 w-5 h-5" />
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Monitor your brand performance and recent activities.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Urgent alerts</h2>
            <AlertPanel />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-row items-center justify-between border-none pb-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sentiment this week</h2>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </CardHeader>
              <CardContent>
                <SentimentChart />
              </CardContent>
            </Card>
            <Card className="bg-card/30 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-row items-center justify-between border-none pb-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Top complaint categories</h2>
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              </CardHeader>
              <CardContent>
                <StatCards />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <CardHeader className="border-none pb-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Product drilldown</h2>
          </CardHeader>
          <CardContent>
            <ProductTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}