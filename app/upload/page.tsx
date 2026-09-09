'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; records?: number } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setResult(null);
      }
    }
  };

  const handleUpload = async (fileToUpload?: File) => {
    const fileToUse = fileToUpload || file;
    if (!fileToUse) return;

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', fileToUse);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Upload response:', data);

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          records: data.records,
        });
        router.push('/dashboard');
      } else {
        setResult({
          success: false,
          message: data.error || 'Upload failed',
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setResult({
        success: false,
        message: 'Failed to upload file. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

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
              <Upload size={18} />
              <span>Home</span>
            </a>
            <a href="/upload" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]">
              <Upload size={18} />
              <span>Upload CSV</span>
            </a>
          </nav>
        </aside>
        
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-2">Upload Dataset</h1>
            <p className="text-[#94A3B8] mb-8">Upload your customer review CSV file for analysis</p>
            
            <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-8">
              <div 
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
                  dragActive ? 'border-[#3B82F6] bg-[#3B82F6]/10' : 'border-[#1E293B] hover:border-[#3B82F6]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <Upload className="mx-auto mb-4 text-[#94A3B8]" size={48} />
                <p className="text-lg text-[#F8FAFC] mb-2">{dragActive ? 'Drop your CSV here' : 'Drop your CSV here'}</p>
                <p className="text-[#94A3B8] mb-4">or</p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                  className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors"
                >
                  Browse files
                </button>
                <p className="text-sm text-[#94A3B8] mt-4">Supported format: CSV</p>
              </div>
              
              {file && (
                <div className="mt-6 p-4 bg-[#080D18]/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="text-[#3B82F6]" size={24} />
                    <div>
                      <p className="text-[#F8FAFC] font-medium">{file.name}</p>
                      <p className="text-sm text-[#94A3B8]">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUpload(file)}
                    disabled={uploading}
                    className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90 transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload & Analyze'}
                  </button>
                </div>
              )}
              
              {result && (
                <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
                  result.success ? 'bg-[#22C55E]/20 border border-[#22C55E]' : 'bg-[#EF4444]/20 border border-[#EF4444]'
                }`}>
                  {result.success ? (
                    <CheckCircle className="text-[#22C55E]" size={24} />
                  ) : (
                    <XCircle className="text-[#EF4444]" size={24} />
                  )}
                  <div>
                    <p className="text-[#F8FAFC] font-medium">{result.message}</p>
                    {result.records && (
                      <p className="text-sm text-[#94A3B8]">{result.records.toLocaleString()} records detected</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 bg-[#111827] border border-[#1E293B] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Required CSV Columns</h3>
              <ul className="space-y-2 text-[#94A3B8]">
                <li>• id - Unique identifier</li>
                <li>• review - Customer review text</li>
                <li>• rating - Rating (1-5)</li>
                <li>• date - Review date</li>
                <li>• category - Review category</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
