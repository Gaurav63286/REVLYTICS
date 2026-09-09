'use client';

import { BarChart3, TrendingUp, Users, CheckCircle, Upload, Download, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: BarChart3 },
    { href: '/analytics', label: 'Analytics', icon: TrendingUp },
    { href: '/reviews', label: 'Reviews', icon: Users },
    { href: '/pipeline', label: 'Pipeline', icon: CheckCircle },
  ];

  const dataItems = [
    { href: '/upload', label: 'Upload CSV', icon: Upload },
    { href: '/api/download-csv', label: 'Download CSV', icon: Download },
  ];

  return (
    <aside className="w-64 bg-card border-r border-gray-800 min-h-screen p-6 fixed left-0 top-0">
      <h1 className="text-xl font-bold text-text mb-2">📊 Review Analysis</h1>
      <p className="text-xs text-muted mb-6">v1.0.0</p>
      
      <nav className="space-y-2 mb-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-primary/20 text-primary'
                : 'text-muted hover:bg-card-hover hover:text-text'
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="pt-6 border-t border-gray-800">
        <p className="text-xs text-muted uppercase mb-3">Data</p>
        <nav className="space-y-2">
          {dataItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted hover:bg-card-hover hover:text-text'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
