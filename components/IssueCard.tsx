import React from 'react';
import { ReviewItem, Severity } from '../types';
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface IssueCardProps {
  item: ReviewItem;
}

export const IssueCard: React.FC<IssueCardProps> = ({ item }) => {
  const getSeverityStyles = (severity: Severity) => {
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
    <div className={`rounded-xl border ${styles.border} ${styles.bg} p-5 shadow-sm hover:shadow-md transition-shadow duration-300`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {styles.icon}
          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${styles.badge}`}>
            {item.severity}
          </span>
          <span className="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
            Page {item.page}
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">{item.location}</span>
      </div>
      
      <h3 className="text-slate-900 font-semibold mb-2">
        {item.issue}
      </h3>
      
      <div className="mt-3 bg-white/60 p-3 rounded-lg border border-slate-200/50">
        <p className="text-sm text-slate-700 leading-relaxed">
          <span className="font-bold text-slate-900 mr-1">Correction:</span>
          {item.suggestion}
        </p>
      </div>
    </div>
  );
};