'use client';

import { useEffect, useState } from 'react';
import { Users, Download, Filter } from 'lucide-react';
import { ReviewsTable } from '@/components/tables/ReviewsTable';

export default function ReviewsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filename, setFilename] = useState('');

  useEffect(() => {
    fetch('/api/records')
      .then(async res => {
        if (!res.ok) {
          setRecords([]);
          setFilename('');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setRecords(data.records || []);
        setFilename(data.filename || '');
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch records:', err);
        setRecords([]);
        setFilename('');
        setLoading(false);
      });
  }, []);

  const handleDownloadCSV = () => {
    if (records.length === 0) return;
    
    const headers = Object.keys(records[0]).join(',');
    const rows = records.map(r => Object.values(r).join(',')).join('\n');
    const csv = headers + '\n' + rows;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `processed_${filename}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080D18] flex items-center justify-center">
        <p className="text-[#94A3B8]">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080D18]">
      <div className="flex">
        <aside className="w-64 bg-[#111827] border-r border-[#1E293B] min-h-screen p-6 fixed left-0 top-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RV</span>
            </div>
            <span className="text-[#F8FAFC] font-semibold text-xl">REVLYTICS</span>
          </div>
          
          <nav className="space-y-2">
            <a href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <Users size={18} />
              <span>Home</span>
            </a>
            <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <Users size={18} />
              <span>Dashboard</span>
            </a>
            <a href="/reviews" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
              <Users size={18} />
              <span>Reviews</span>
            </a>
          </nav>
        </aside>
        
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-2">Processed Reviews</h1>
                <p className="text-[#94A3B8]">
                  {filename ? `Source: ${filename}` : 'No data uploaded'}
                </p>
              </div>
              <button
                onClick={handleDownloadCSV}
                disabled={records.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors disabled:opacity-50"
              >
                <Download size={18} />
                Download CSV
              </button>
            </div>
            
            {records.length > 0 ? (
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter size={18} className="text-[#94A3B8]" />
                  <h2 className="text-lg font-semibold text-[#F8FAFC]">All Reviews</h2>
                  <span className="text-[#94A3B8] text-sm">({records.length} records)</span>
                </div>
                <ReviewsTable data={records} />
              </div>
            ) : (
              <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-12 text-center">
                <p className="text-[#94A3B8] mb-4">No reviews available. Upload a CSV file to get started.</p>
                <a href="/upload" className="inline-block px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors">
                  Upload CSV File
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
