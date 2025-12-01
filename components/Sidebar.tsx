import React from 'react';
import { LayoutDashboard, FileText, Type, BookOpen, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { Severity } from '../types';

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  counts: Record<string, number>;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, counts }) => {
  const menuItems = [
    { id: 'Overview', icon: LayoutDashboard, label: 'Review Overview' },
    { id: 'Format', icon: FileText, label: 'Formatting & Layout' },
    { id: 'Language', icon: Type, label: 'Language & Grammar' },
    { id: 'Citation', icon: BookOpen, label: 'References' },
    { id: 'Image', icon: ImageIcon, label: 'Figures & Captions' },
    { id: 'Logic', icon: AlertTriangle, label: 'Math & Logic' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Dissertation Check
        </h1>
        <p className="text-xs text-slate-400 mt-2">Comprehensive Exam Report Review</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
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
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {count > 0 && (
                <span className="bg-slate-700 text-xs px-2 py-1 rounded-full text-blue-200">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-3">
           <p className="text-xs text-slate-400 mb-1">Status</p>
           <div className="flex items-center text-amber-400 text-sm font-bold">
             <AlertTriangle size={14} className="mr-2" />
             Requires Revision
           </div>
        </div>
      </div>
    </div>
  );
};