import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { IssueCard } from './components/IssueCard';
import { REVIEW_DATA } from './constants';
import { Severity } from './types';

function App() {
  const [activeCategory, setActiveCategory] = useState('Overview');

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      criticalCount: REVIEW_DATA.filter(i => i.severity === Severity.CRITICAL).length,
      majorCount: REVIEW_DATA.filter(i => i.severity === Severity.MAJOR).length,
      minorCount: REVIEW_DATA.filter(i => i.severity === Severity.MINOR).length,
      totalIssues: REVIEW_DATA.length,
    };
  }, []);

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    REVIEW_DATA.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, []);

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    REVIEW_DATA.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredData = activeCategory === 'Overview' 
    ? [] 
    : REVIEW_DATA.filter(item => item.category === activeCategory);

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
            <span className="text-sm font-medium bg-slate-100 px-3 py-1 rounded-full text-slate-600">
              {filteredData.length} Issues Found
            </span>
          )}
        </header>

        {activeCategory === 'Overview' ? (
          <DashboardOverview stats={stats} categoryStats={categoryStats} />
        ) : (
          <div className="grid gap-4 animate-slide-up">
            {/* Sort by severity first */}
            {filteredData
              .sort((a, b) => {
                 const severityWeight = { [Severity.CRITICAL]: 3, [Severity.MAJOR]: 2, [Severity.MINOR]: 1, [Severity.INFO]: 0 };
                 return severityWeight[b.severity] - severityWeight[a.severity];
              })
              .map((item) => (
              <IssueCard key={item.id} item={item} />
            ))}
            
            {filteredData.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400">No issues found in this category. Great job!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;