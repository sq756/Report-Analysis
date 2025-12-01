import React from 'react';
import { ReviewItem, Severity } from '../types';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Check } from 'lucide-react';

interface IssueCardProps {
  item: ReviewItem;
  onToggle?: () => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ item, onToggle }) => {
  const isResolved = item.status === 'resolved';

  const getSeverityStyles = (severity: Severity) => {
    if (isResolved) {
      return {
        border: 'border-slate-100',
        bg: 'bg-slate-50 opacity-75',
        badge: 'bg-slate-100 text-slate-400',
        icon: <CheckCircle2 className="text-slate-400" size={20} />
      };
    }

    switch (severity) {
      case Severity.CRITICAL:
        return {
          border: 'border-red-200',
          bg: 'bg-red-50',
          badge: 'bg-red-100 text-red-700',
          icon: <AlertCircle className="text-red-600" size={20} />
        };
      case Severity.MAJOR:
        return {
          border: 'border-amber-200',
          bg: 'bg-amber-50',
          badge: 'bg-amber-100 text-amber-700',
          icon: <AlertTriangle className="text-amber-600" size={20} />
        };
      case Severity.MINOR:
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          badge: 'bg-blue-100 text-blue-700',
          icon: <Info className="text-blue-600" size={20} />
        };
      default:
        return {
          border: 'border-slate-200',
          bg: 'bg-white',
          badge: 'bg-slate-100 text-slate-600',
          icon: <CheckCircle2 className="text-slate-600" size={20} />
        };
    }
  };

  const styles = getSeverityStyles(item.severity);

  return (
    <div className={`relative group rounded-xl border ${styles.border} ${styles.bg} p-5 shadow-sm transition-all duration-300 ${isResolved ? 'hover:opacity-100' : 'hover:shadow-md'}`}>
      
      {/* Resolve Button */}
      {onToggle && (
        <button 
          onClick={onToggle}
          className={`absolute top-5 right-5 flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
            isResolved 
              ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' 
              : 'bg-white border border-slate-200 text-slate-500 hover:bg-green-50 hover:text-green-600 hover:border-green-200 shadow-sm'
          }`}
        >
          {isResolved ? (
            <><span>Undo</span></>
          ) : (
            <>
              <Check size={14} />
              <span>Mark Fixed</span>
            </>
          )}
        </button>
      )}

      <div className="flex items-start justify-between mb-3 pr-24">
        <div className="flex items-center space-x-2">
          {styles.icon}
          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${styles.badge}`}>
            {isResolved ? 'RESOLVED' : item.severity}
          </span>
          <span className="text-xs font-mono text-slate-500 bg-white/50 px-2 py-0.5 rounded border border-slate-200/50">
            Page {item.page}
          </span>
        </div>
      </div>
      
      <div className={isResolved ? 'opacity-50 grayscale' : ''}>
        <div className="flex justify-between">
           <span className="text-xs text-slate-400 font-medium mb-1 block">{item.location}</span>
        </div>
        <h3 className={`text-slate-900 font-semibold mb-2 ${isResolved ? 'line-through text-slate-500' : ''}`}>
          {item.issue}
        </h3>
        
        {!isResolved && (
          <div className="mt-3 bg-white/60 p-3 rounded-lg border border-slate-200/50">
            <p className="text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 mr-1">Correction:</span>
              {item.suggestion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};