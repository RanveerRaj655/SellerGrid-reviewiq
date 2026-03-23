'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Inbox, BarChart2, Package, Settings, Zap, Menu } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/inbox', label: 'Review Inbox', icon: Inbox },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside className={cn('flex flex-col h-screen bg-neutral-950 text-white transition-all duration-300 shrink-0 border-r border-neutral-900', sidebarCollapsed ? 'w-16' : 'w-60')}>
      <div className="flex items-center justify-between px-5 py-6">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap size={18} className="text-black fill-current" />
            </div>
            <span className="font-bold text-lg tracking-tight">ReviewIQ</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-neutral-900 transition-colors ml-auto text-neutral-400 hover:text-white border border-transparent hover:border-neutral-800">
          <Menu size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 group relative',
                active
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white border border-transparent hover:border-neutral-800'
              )}
            >
              <Icon size={18} className={cn('shrink-0 transition-colors', active ? 'text-emerald-400' : 'group-hover:text-white')} />
              {!sidebarCollapsed && <span>{label}</span>}
              {active && !sidebarCollapsed && (
                <div className="absolute left-0 w-1 h-4 bg-emerald-500 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-6 mt-auto border-t border-neutral-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-black text-xs font-bold shrink-0 shadow-lg shadow-emerald-500/10 border border-white/10">RK</div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-none mb-1">Rahul Kumar</p>
              <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Brand Owner</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
