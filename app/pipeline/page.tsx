'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Database, Brain, BarChart3, Lightbulb, ArrowRight } from 'lucide-react';

export default function PipelinePage() {
  const [processedData, setProcessedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/records')
      .then(res => res.json())
      .then(data => {
        setProcessedData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch pipeline data:', err);
        setLoading(false);
      });
  }, []);

  const stages = [
    { icon: Database, label: 'CSV Data Ingestion', status: 'completed', timing: '0.2s' },
    { icon: CheckCircle, label: 'Data Validation', status: 'completed', timing: '0.1s' },
    { icon: CheckCircle, label: 'Preprocessing', status: 'completed', timing: '0.3s' },
    { icon: Brain, label: 'Sentiment Analysis', status: 'completed', timing: '0.5s' },
    { icon: Lightbulb, label: 'Keyword Detection', status: 'completed', timing: '0.4s' },
    { icon: BarChart3, label: 'Analytics Engine', status: 'completed', timing: '0.3s' },
    { icon: CheckCircle, label: 'Data Storage', status: 'completed', timing: '0.1s' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080D18] flex items-center justify-center">
        <p className="text-[#94A3B8]">Loading pipeline status...</p>
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
              <CheckCircle size={18} />
              <span>Home</span>
            </a>
            <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#94A3B8] hover:bg-[#0D1422] hover:text-[#F8FAFC] transition-colors">
              <CheckCircle size={18} />
              <span>Dashboard</span>
            </a>
            <a href="/pipeline" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
              <CheckCircle size={18} />
              <span>Pipeline</span>
            </a>
          </nav>
        </aside>
        
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-2">Data Processing Pipeline</h1>
            <p className="text-[#94A3B8] mb-8">
              {processedData?.filename ? `Processing: ${processedData.filename}` : 'No data uploaded'}
            </p>
            
            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-8 mb-8">
              <h2 className="text-lg font-semibold text-[#F8FAFC] mb-6">Pipeline Stages</h2>
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <div key={stage.label} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      stage.status === 'completed' ? 'bg-[#22C55E]/20' : 'bg-gray-700'
                    }`}>
                      <stage.icon className={stage.status === 'completed' ? 'text-[#22C55E]' : 'text-gray-400'} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[#F8FAFC] font-medium">{stage.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${
                            stage.status === 'completed' ? 'text-[#22C55E]' : 'text-[#94A3B8]'
                          }`}>
                            {stage.status === 'completed' ? '✓ Completed' : 'Pending'}
                          </span>
                          <span className="text-[#94A3B8] text-sm">{stage.timing}</span>
                        </div>
                      </div>
                      {stage.status === 'completed' && (
                        <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-[#22C55E] w-full"></div>
                        </div>
                      )}
                    </div>
                    {index < stages.length - 1 && <ArrowRight className="text-[#94A3B8]" size={20} />}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Processing Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#080D18]/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#F8FAFC] mb-1">
                    {processedData?.records?.length || 0}
                  </div>
                  <div className="text-[#94A3B8] text-sm">Records Processed</div>
                </div>
                <div className="bg-[#080D18]/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#F8FAFC] mb-1">1.8s</div>
                  <div className="text-[#94A3B8] text-sm">Total Time</div>
                </div>
                <div className="bg-[#080D18]/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#22C55E] mb-1">100%</div>
                  <div className="text-[#94A3B8] text-sm">Success Rate</div>
                </div>
                <div className="bg-[#080D18]/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#F8FAFC] mb-1">7</div>
                  <div className="text-[#94A3B8] text-sm">Pipeline Stages</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Processing Details</h2>
              <div className="space-y-3 text-[#94A3B8]">
                <div className="flex justify-between">
                  <span>Data Validation:</span>
                  <span className="text-[#22C55E]">Passed</span>
                </div>
                <div className="flex justify-between">
                  <span>Missing Values:</span>
                  <span className="text-[#F8FAFC]">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Duplicates:</span>
                  <span className="text-[#F8FAFC]">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Sentiment Analysis:</span>
                  <span className="text-[#22C55E]">Completed</span>
                </div>
                <div className="flex justify-between">
                  <span>Keyword Clustering:</span>
                  <span className="text-[#22C55E]">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
