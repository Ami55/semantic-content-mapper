import React, { useState, useMemo } from 'react';
import { ContentRecommendation } from '../types';
import { Target, ArrowUpRight, Shield, Award, HelpCircle, Flame, Filter, SlidersHorizontal, Layers, Star, Compass, HelpCircle as Help } from 'lucide-react';

interface Props {
  recommendations: ContentRecommendation[];
}

export default function ContentOpportunity({ recommendations }: Props) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'Quick Win' | 'Cluster Expansion' | 'New Pillar' | 'Missing Page'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'authority_gain' | 'entity_gain'>('priority');

  // Filter recommendations
  const filteredRecs = useMemo(() => {
    return recommendations.filter(r => 
      activeCategory === 'all' || r.type === activeCategory
    );
  }, [recommendations, activeCategory]);

  // Sort recommendations
  const sortedRecs = useMemo(() => {
    const priorityWeight: Record<string, number> = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    return [...filteredRecs].sort((a, b) => {
      if (sortBy === 'priority') {
        const wtA = priorityWeight[a.priority] || 0;
        const wtB = priorityWeight[b.priority] || 0;
        return wtB - wtA;
      }
      if (sortBy === 'authority_gain') {
        return b.topicalAuthorityGain - a.topicalAuthorityGain;
      }
      if (sortBy === 'entity_gain') {
        return b.entityGain - a.entityGain;
      }
      return 0;
    });
  }, [filteredRecs, sortBy]);

  return (
    <div className="space-y-6" id="content-opportunities-engine">
      
      {/* Controls & Metrics Selector */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-md font-bold text-gray-900 flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-indigo-600 animate-pulse" />
            Topical Opportunity Engine
          </h3>
          <p className="text-xs text-gray-500">
            Actionable content ideas optimized for semantic metrics. Close coverage gaps to unlock maximum Topical Authority multipliers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Recommendation Classification Filter */}
          <div className="flex bg-gray-50 border border-gray-200 p-1 rounded-lg text-xs w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-md font-bold shrink-0 transition-all ${activeCategory === 'all' ? 'bg-white shadow-2xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
              id="category-all-button"
            >
              All Ops
            </button>
            <button
              onClick={() => setActiveCategory('Quick Win')}
              className={`px-3 py-1.5 rounded-md font-bold shrink-0 transition-all ${activeCategory === 'Quick Win' ? 'bg-white shadow-2xs text-indigo-600' : 'text-gray-500'}`}
              id="category-quickwin-button"
            >
              Quick Wins
            </button>
            <button
              onClick={() => setActiveCategory('Cluster Expansion')}
              className={`px-3 py-1.5 rounded-md font-bold shrink-0 transition-all ${activeCategory === 'Cluster Expansion' ? 'bg-white shadow-2xs text-indigo-600' : 'text-gray-500'}`}
              id="category-expansion-button"
            >
              Expansions
            </button>
            <button
              onClick={() => setActiveCategory('New Pillar')}
              className={`px-3 py-1.5 rounded-md font-bold shrink-0 transition-all ${activeCategory === 'New Pillar' ? 'bg-white shadow-2xs text-indigo-600' : 'text-gray-500'}`}
              id="category-pillar-button"
            >
              New Pillars
            </button>
            <button
              onClick={() => setActiveCategory('Missing Page')}
              className={`px-3 py-1.5 rounded-md font-bold shrink-0 transition-all ${activeCategory === 'Missing Page' ? 'bg-white shadow-2xs text-indigo-600' : 'text-gray-500'}`}
              id="category-missing-button"
            >
              Missing Pages
            </button>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
            <span className="text-gray-400 font-semibold uppercase flex items-center gap-1 shrink-0"><SlidersHorizontal className="w-3.5 h-3.5" /> Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2.5 py-1.5 text-gray-700 font-bold focus:ring-1 focus:ring-indigo-500 focus:outline-hidden flex-1 sm:flex-initial"
              id="sort-select-menu"
            >
              <option value="priority">Priority Status</option>
              <option value="authority_gain">Expected Authority Gain</option>
              <option value="entity_gain">Expected Entity Gain</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="opportunities-cards-bin">
        {sortedRecs.length > 0 ? (
          sortedRecs.map(rec => (
            <div key={rec.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between hover:border-indigo-100 transition-all duration-200 relative overflow-hidden group">
              
              {/* Highlight ribbon based on priority */}
              <div className={`absolute top-0 left-0 w-1.5 h-full 
                ${rec.priority === 'Critical' ? 'bg-red-500' : ''}
                ${rec.priority === 'High' ? 'bg-amber-500' : ''}
                ${rec.priority === 'Medium' ? 'bg-blue-500' : ''}
                ${rec.priority === 'Low' ? 'bg-slate-400' : ''}
              `}></div>

              <div className="space-y-4 pl-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {/* Visual icons signaling the recommendation classification type */}
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-flex items-center justify-center rounded-sm px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide
                        ${rec.type === 'Quick Win' ? 'bg-emerald-100 text-emerald-800' : ''}
                        ${rec.type === 'Cluster Expansion' ? 'bg-blue-100 text-blue-800' : ''}
                        ${rec.type === 'New Pillar' ? 'bg-slate-800 text-slate-100' : ''}
                        ${rec.type === 'Missing Page' ? 'bg-purple-100 text-purple-800' : ''}
                      `}>
                        {rec.type}
                      </span>
                      
                      <span className="text-[10px] text-gray-400 font-semibold capitalize">Pillar ID: {rec.pillarName}</span>
                    </div>

                    <h4 className="text-md font-bold text-gray-900 mt-2 leading-snug">{rec.title}</h4>
                    <span className="text-xs text-indigo-600 font-medium block mt-1">Focus concept: <strong>{rec.concept}</strong></span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Priority</span>
                    <span className={`text-xs font-extrabold uppercase tracking-wide
                      ${rec.priority === 'Critical' ? 'text-red-600' : ''}
                      ${rec.priority === 'High' ? 'text-amber-600' : ''}
                      ${rec.priority === 'Medium' ? 'text-blue-600' : ''}
                      ${rec.priority === 'Low' ? 'text-slate-500' : ''}
                    `}>{rec.priority}</span>
                  </div>
                </div>

                {/* Metric dials */}
                <div className="grid grid-cols-4 gap-2 bg-gray-50/50 rounded-lg p-3 text-center border border-gray-100 text-[10px]">
                  <div>
                    <span className="text-gray-400 block font-semibold uppercase">Difficulty</span>
                    <strong className="text-slate-700 text-xs font-bold leading-relaxed">{rec.difficulty}</strong>
                  </div>
                  <div className="border-l border-gray-200">
                    <span className="text-gray-400 block font-semibold uppercase">Impact</span>
                    <strong className="text-slate-700 text-xs font-bold leading-relaxed">{rec.impact}</strong>
                  </div>
                  <div className="border-l border-gray-200">
                    <span className="text-emerald-600 block font-semibold uppercase">Entity Gain</span>
                    <strong className="text-emerald-700 text-xs font-extrabold leading-relaxed">+{rec.entityGain}%</strong>
                  </div>
                  <div className="border-l border-gray-200">
                    <span className="text-indigo-600 block font-semibold uppercase">Auth. Gain</span>
                    <strong className="text-indigo-700 text-xs font-extrabold leading-relaxed">+{rec.topicalAuthorityGain}%</strong>
                  </div>
                </div>
              </div>

              {/* Action layout bottom */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs pl-2">
                <span className="text-gray-400 font-mono text-[10px]">Cluster Mapping: {rec.clusterName}</span>
                <span className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-0.5 cursor-pointer">
                  Incorporate In Roadmap <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center">
            <Compass className="w-8 h-8 text-gray-300 animate-pulse" />
            <p className="text-xs text-gray-500 mt-2 font-medium">No strategic opportunities mapped inside this category classification.</p>
          </div>
        )}
      </div>

    </div>
  );
}
