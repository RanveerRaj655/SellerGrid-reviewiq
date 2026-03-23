'use client';

import { TopBar } from '@/components/shared/TopBar';
import { SentimentChart } from '@/components/dashboard/SentimentChart';
import { StatCards } from '@/components/dashboard/StatCards';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

function InsightCard({ title, value, delta, positive, description }: {
  title: string;
  value: string;
  delta?: string;
  positive?: boolean;
  description: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">{title}</p>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {delta && (
          <span className={`text-xs font-medium flex items-center gap-0.5 ${positive ? 'text-green-600' : 'text-red-500'}`}>
            {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {delta}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}

function WeeklyInsight({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const { stats, sentimentData, categoryData, isLoading } = useAnalytics();

  const weeklyInsights = [
    'Delivery complaints increased by 35% compared to last week',
    'Sneaker X2 defect reports are the fastest growing complaint category',
    'Positive sentiment dropped from 62% to 47% over 7 days',
    'Amazon has the highest negative review rate across all platforms this week',
    'WB Hoodie accounts for 38% of all unresolved complaints',
  ];

  return (
    <div>
      <TopBar />
      <div className="p-6 space-y-6">

        <div>
          <h1 className="text-xl font-semibold text-gray-900">Analytics & trends</h1>
          <p className="text-sm text-gray-400 mt-1">Last 7 days across all platforms</p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
          ) : (
            <>
              <InsightCard
                title="Avg rating"
                value={stats?.avgRating.toFixed(1) ?? '—'}
                delta={`${Math.abs(stats?.ratingDelta ?? 0).toFixed(1)}`}
                positive={(stats?.ratingDelta ?? 0) > 0}
                description="Across all platforms"
              />
              <InsightCard
                title="Negative %"
                value={`${stats?.negativePercent ?? 0}%`}
                delta={`${stats?.negativeDelta ?? 0}%`}
                positive={false}
                description="Up from last week"
              />
              <InsightCard
                title="Total reviews"
                value={stats?.totalReviews.toLocaleString() ?? '—'}
                description="Received this month"
              />
              <InsightCard
                title="Active alerts"
                value={String(stats?.activeAlerts ?? 0)}
                positive={false}
                description="Requiring attention"
              />
            </>
          )}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">Sentiment over time</h2>
                <span className="text-xs text-gray-400">Last 7 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <SentimentChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">Top complaint categories</h2>
                <span className="text-xs text-gray-400">{categoryData.reduce((a, b) => a + b.count, 0)} total</span>
              </div>
            </CardHeader>
            <CardContent>
              <StatCards />
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Platform breakdown */}
          <Card>
            <CardHeader>
              <h2 className="text-sm font-semibold text-gray-700">Platform breakdown</h2>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { platform: 'Amazon', reviews: 1842, negative: 31, color: 'bg-orange-400' },
                    { platform: 'Flipkart', reviews: 1534, negative: 22, color: 'bg-blue-400' },
                    { platform: 'Shopify', reviews: 987, negative: 18, color: 'bg-green-400' },
                    { platform: 'Instagram', reviews: 458, negative: 14, color: 'bg-pink-400' },
                  ].map(p => (
                    <div key={p.platform}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-700">{p.platform}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">{p.reviews.toLocaleString()} reviews</span>
                          <span className="text-xs text-red-500 font-medium">{p.negative}% negative</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${p.color}`}
                          style={{ width: `${(p.reviews / 1842) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly insights */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">What changed this week</h2>
                <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-medium">
                  {weeklyInsights.length} insights
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {weeklyInsights.map((insight, i) => (
                <WeeklyInsight key={i} text={insight} />
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}