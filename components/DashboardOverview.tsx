import React from 'react';
import { Stats } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface DashboardOverviewProps {
  stats: Stats;
  categoryStats: { name: string; value: number }[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats, categoryStats }) => {
  const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 mb-1">Total Issues</p>
          <p className="text-3xl font-bold text-slate-900">{stats.totalIssues}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
          <p className="text-sm text-red-600 mb-1">Critical Errors</p>
          <p className="text-3xl font-bold text-red-700">{stats.criticalCount}</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-100">
          <p className="text-sm text-amber-600 mb-1">Major Issues</p>
          <p className="text-3xl font-bold text-amber-700">{stats.majorCount}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
          <p className="text-sm text-blue-600 mb-1">Minor Tweaks</p>
          <p className="text-3xl font-bold text-blue-700">{stats.minorCount}</p>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Issues by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryStats} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-slate-800 mb-4 w-full text-left">Quality Impact Distribution</h3>
             <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Critical', value: stats.criticalCount },
                  { name: 'Major', value: stats.majorCount },
                  { name: 'Minor', value: stats.minorCount },
                ]}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#ef4444" />
                <Cell fill="#f59e0b" />
                <Cell fill="#3b82f6" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
           <div className="flex gap-4 text-xs mt-2">
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div> Critical</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div> Major</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div> Minor</div>
           </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-2">Reviewer's Note</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          The manuscript demonstrates strong theoretical grounding in VQA and noise spectroscopy. However, the document currently suffers from artifacts typical of draft templates (placeholder text) and reference management software (junk metadata). The most critical non-formatting issue is the typo "children" (儿童) which likely obscures a scientific term about noise types. English captions in a Chinese report should also be addressed immediately.
        </p>
      </div>
    </div>
  );
};