import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { IssueCard } from './components/IssueCard';
import { REVIEW_DATA } from './constants';
import { Severity, ReviewItem } from './types';

function App() {
  const [activeCategory, setActiveCategory] = useState('Overview');
  // Initialize state from constants, allowing us to modify 'status'
  const [items, setItems] = useState<ReviewItem[]>(REVIEW_DATA);

  const toggleStatus = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'open' ? 'resolved' : 'open' }
          : item
      )
    );
  };

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      criticalCount: items.filter(i => i.severity === Severity.CRITICAL && i.status === 'open').length,
      majorCount: items.filter(i => i.severity === Severity.MAJOR && i.status === 'open').length,
      minorCount: items.filter(i => i.severity === Severity.MINOR && i.status === 'open').length,
      totalIssues: items.length,
      resolvedCount: items.filter(i => i.status === 'resolved').length
    };
  }, [items]);

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach(item => {
      // Only count open issues in the per-category breakdown
      if (item.status === 'open') {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [items]);

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach(item => {
      if (item.status === 'open') {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, [items]);

  const filteredData = activeCategory === 'Overview' 
    ? [] 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        counts={countsByCategory}
      />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {activeCategory === 'Overview' ? 'Report Analysis' : `${activeCategory} Review`}
            </h2>
            <p className="text-slate-500 mt-1">
              {activeCategory === 'Overview' 
                ? 'Summary of findings for "Noise-Aware VQA" Report' 
                : `Detailed breakdown of ${activeCategory.toLowerCase()} issues`}
            </p>
          </div>
          {activeCategory !== 'Overview' && (
            <div className="flex items-center gap-4">
               <div className="text-right">
                 <p className="text-xs text-slate-400">Progress</p>
                 <p className="text-sm font-bold text-slate-700">
                   {filteredData.filter(i => i.status === 'resolved').length} / {filteredData.length} Fixed
                 </p>
               </div>
            </div>
          )}
        </header>

        {activeCategory === 'Overview' ? (
          <DashboardOverview stats={stats} categoryStats={categoryStats} />
        ) : (
          <div className="grid gap-4 animate-slide-up">
            {/* Sort: Open first, then by severity */}
            {filteredData
              .sort((a, b) => {
                 if (a.status !== b.status) return a.status === 'open' ? -1 : 1;
                 const severityWeight = { [Severity.CRITICAL]: 3, [Severity.MAJOR]: 2, [Severity.MINOR]: 1, [Severity.INFO]: 0 };
                 return severityWeight[b.severity] - severityWeight[a.severity];
              })
              .map((item) => (
              <IssueCard key={item.id} item={item} onToggle={() => toggleStatus(item.id)} />
            ))}
            
            {filteredData.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400">No issues found in this category.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;