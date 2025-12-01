import React from 'react';
import { Stats } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CheckCircle2 } from 'lucide-react';

interface DashboardOverviewProps {
  stats: Stats;
  categoryStats: { name: string; value: number }[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats, categoryStats }) => {
  const completionRate = Math.round((stats.resolvedCount / stats.totalIssues) * 100) || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Progress Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
        <div>
           <h3 className="text-2xl font-bold">Review Progress</h3>
           <p className="text-blue-100 opacity-90 text-sm mt-1">
             You have resolved {stats.resolvedCount} out of {stats.totalIssues} identified issues.
           </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-3xl font-bold">{completionRate}%</span>
            <span className="block text-xs text-blue-200 uppercase tracking-wider">Complete</span>
          </div>
          <div className="h-16 w-16 relative">
             <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
               <path className="text-blue-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.4" />
               <path className="text-white" strokeDasharray={`${completionRate}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
             </svg>
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
          <p className="text-sm text-slate-500 mb-1">Remaining Issues</p>
          <p className="text-3xl font-bold text-slate-900">
            {stats.criticalCount + stats.majorCount + stats.minorCount}
          </p>
          <div className="absolute right-0 bottom-0 h-16 w-16 bg-slate-50 rounded-tl-full"></div>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
          <p className="text-sm text-red-600 mb-1">Critical Errors</p>
          <p className="text-3xl font-bold text-red-700">{stats.criticalCount}</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-100">
          <p className="text-sm text-amber-600 mb-1">Major Issues</p>
          <p className="text-3xl font-bold text-amber-700">{stats.majorCount}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100">
          <p className="text-sm text-green-600 mb-1">Resolved</p>
          <div className="flex items-center space-x-2">
            <p className="text-3xl font-bold text-green-700">{stats.resolvedCount}</p>
            <CheckCircle2 size={24} className="text-green-500" />
          </div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Pending Issues by Category</h3>
          {categoryStats.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-400">
               All issues resolved!
             </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-slate-800 mb-4 w-full text-left">Current Workload</h3>
            {stats.criticalCount + stats.majorCount + stats.minorCount > 0 ? (
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
            ) : (
              <div className="flex flex-col items-center text-green-500">
                <CheckCircle2 size={48} className="mb-2" />
                <span className="font-bold">Great Job!</span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};