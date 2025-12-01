import React from 'react';
import { LayoutDashboard, FileText, Type, BookOpen, Image as ImageIcon, AlertTriangle, UploadCloud } from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  counts: Record<string, number>;
  onUploadNew: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, counts, onUploadNew }) => {
  const menuItems = [
    { id: 'Overview', icon: LayoutDashboard, label: 'Review Overview' },
    { id: 'Format', icon: FileText, label: 'Formatting & Layout' },
    { id: 'Language', icon: Type, label: 'Language & Grammar' },
    { id: 'Citation', icon: BookOpen, label: 'References' },
    { id: 'Image', icon: ImageIcon, label: 'Figures & Captions' },
    { id: 'Logic', icon: AlertTriangle, label: 'Math & Logic' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Dissertation Check
        </h1>
        <p className="text-xs text-slate-400 mt-2">Comprehensive Exam Report Review</p>
      </div>
      
      <div className="p-4">
        <button 
          onClick={onUploadNew}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-3 flex items-center justify-center space-x-2 transition-colors shadow-md group"
        >
          <UploadCloud size={18} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">Upload New File</span>
        </button>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeCategory === item.id;
          const count = item.id === 'Overview' ? 0 : counts[item.id] || 0;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {count > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 mt-auto">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs text-slate-400">Current File</span>
             <span className="text-[10px] bg-slate-700 px-1 rounded text-slate-300">PDF</span>
           </div>
           <p className="text-xs font-medium text-slate-200 truncate">Subject_Exam_Report_Final.pdf</p>
        </div>
      </div>
    </div>
  );
};