import React, { useState, useCallback } from 'react';
import { UploadCloud, FileText, Loader2, CheckCircle2, FileType } from 'lucide-react';

interface FileUploaderProps {
  onAnalysisComplete: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onAnalysisComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const simulateProcessing = () => {
    setStatus('processing');
    const steps = [
      { msg: 'Extracting text content...', time: 1000 },
      { msg: 'Detecting formatting anomalies...', time: 1500 },
      { msg: 'Analyzing citation styles...', time: 1200 },
      { msg: 'Checking language and grammar...', time: 2000 },
      { msg: 'Verifying logical consistency...', time: 1500 },
      { msg: 'Finalizing report...', time: 800 }
    ];

    let currentStep = 0;
    let accumulatedTime = 0;

    steps.forEach((s, index) => {
      setTimeout(() => {
        setStep(s.msg);
        setProgress(((index + 1) / steps.length) * 100);
      }, accumulatedTime);
      accumulatedTime += s.time;
    });

    setTimeout(() => {
      setStatus('complete');
      setTimeout(onAnalysisComplete, 1000);
    }, accumulatedTime + 500);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      simulateProcessing();
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      simulateProcessing();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">PhD Report Reviewer</h1>
        <p className="text-slate-500 text-lg">Upload your thesis draft for instant AI analysis</p>
      </div>

      <div
        className={`w-full max-w-2xl bg-white rounded-2xl border-2 border-dashed transition-all duration-300 relative overflow-hidden ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-[1.02]'
            : 'border-slate-300 hover:border-blue-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {status === 'idle' && (
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              <UploadCloud size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Drag & Drop your file here
            </h3>
            <p className="text-slate-500 mb-6">
              Supports .PDF, .DOCX, or .TEX (Max 50MB)
            </p>
            <label className="relative cursor-pointer bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl font-medium">
              <span>Browse Files</span>
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.docx,.doc,.tex"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        )}

        {status === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center">
             <div className="relative mb-8">
               <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-blue-500 animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <FileText className="text-blue-500" size={24} />
               </div>
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Document</h3>
             <p className="text-blue-600 font-mono text-sm mb-6">{step}</p>
             
             <div className="w-full max-w-sm bg-slate-100 rounded-full h-2 overflow-hidden">
               <div 
                 className="bg-blue-500 h-full transition-all duration-500 ease-out"
                 style={{ width: `${progress}%` }}
               ></div>
             </div>
             <p className="text-xs text-slate-400 mt-2">{file?.name}</p>
          </div>
        )}

        {status === 'complete' && (
          <div className="p-12 flex flex-col items-center justify-center bg-green-50/50">
            <div className="bg-green-100 p-4 rounded-full mb-6 animate-bounce-short">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Analysis Complete!</h3>
            <p className="text-slate-500">Redirecting to dashboard...</p>
          </div>
        )}
      </div>

      {status === 'idle' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-3xl">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="mx-auto w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-3">
              <FileType size={20} />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">Format Check</h4>
            <p className="text-xs text-slate-500 mt-1">Detects layout shifts and font inconsistencies.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="mx-auto w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-3">
              <FileText size={20} />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">Logic & Grammar</h4>
            <p className="text-xs text-slate-500 mt-1">Identifies weak arguments and typos.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="mx-auto w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-pink-600 mb-3">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">Citation Validator</h4>
            <p className="text-xs text-slate-500 mt-1">Ensures format compliance (APA/IEEE/GB).</p>
          </div>
        </div>
      )}
    </div>
  );
};