'use client';

import { TopBar } from '@/components/shared/TopBar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Settings, ExternalLink, Shield, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const platforms = [
  { name: 'Amazon', status: 'connected', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  { name: 'Flipkart', status: 'connected', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  { name: 'Shopify', status: 'not connected', color: 'bg-neutral-800 text-neutral-500 border-neutral-700' },
  { name: 'Instagram', status: 'not connected', color: 'bg-neutral-800 text-neutral-500 border-neutral-700' },
];

export default function SettingsPage() {
  return (
    <div className="bg-background min-h-full">
      <TopBar />
      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              Account Settings
              <Settings className="text-emerald-500 w-5 h-5" />
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your platform integrations and alert preferences.</p>
          </div>
        </div>

        <div className="grid gap-8">
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center gap-3 border-none pb-0">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <ExternalLink size={16} className="text-emerald-500" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Platform connections</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-4">
                {platforms.map(p => (
                  <div key={p.name} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/50 border border-border/50 hover:border-emerald-500/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-400 group-hover:text-emerald-500 transition-colors">
                        {p.name[0]}
                      </div>
                      <span className="text-sm font-bold text-foreground">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={cn("text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border", p.color)}>
                        {p.status}
                      </span>
                      <button className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 hover:text-emerald-400 transition-colors underline decoration-neutral-800 underline-offset-4">
                        {p.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center gap-3 border-none pb-0">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Bell size={16} className="text-emerald-500" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Alert thresholds</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mt-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/50 border border-border/50">
                  <div>
                    <p className="text-sm font-bold text-foreground">Negative review spike</p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Alert when negative reviews increase by</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue={20} className="w-20 text-sm font-bold bg-neutral-800 border border-border rounded-xl px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-foreground" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">% surge</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/50 border border-border/50">
                  <div>
                    <p className="text-sm font-bold text-foreground">Minimum review volume</p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Only alert when complaint count exceeds</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue={10} className="w-20 text-sm font-bold bg-neutral-800 border border-border rounded-xl px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-foreground" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Reviews</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
