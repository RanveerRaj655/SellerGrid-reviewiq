import { TopBar } from '@/components/shared/TopBar';
import { SentimentChart } from '@/components/dashboard/SentimentChart';
import { StatCards } from '@/components/dashboard/StatCards';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="bg-background min-h-full">
      <TopBar />
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              Analytics & Trends
              <Sparkles className="text-emerald-500 w-5 h-5 fill-emerald-500/20" />
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Deep insights into your brand performance and customer sentiment.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between border-none pb-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sentiment over time</h2>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </CardHeader>
            <CardContent>
              <SentimentChart />
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between border-none pb-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Complaint categories</h2>
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            </CardHeader>
            <CardContent>
              <StatCards />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}