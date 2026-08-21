import React, { useState } from 'react';
import { SemanticGap } from '../types';
import { AlertCircle, ArrowRight, HelpCircle, CheckCircle2, Star, BookOpen, Layers, GitCompare, Bookmark } from 'lucide-react';

interface Props {
  gaps: SemanticGap[];
}

export default function SemanticGapAnalysisComponent({ gaps }: Props) {
  const [activeTab, setActiveTab] = useState<'all' | 'concept' | 'attribute' | 'relationship' | 'supporting_topic'>('all');

  const filteredGaps = gaps.filter(g => 
    activeTab === 'all' || g.type === activeTab
  );

  // Helper badge to style Gap Classification Type
  const getGapTypeBadge = (type: string) => {
    switch (type) {
      case 'concept':
        return <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-sm text-[10px] uppercase font-bold border border-blue-100"><BookOpen className="w-3 h-3" /> Concept Void</span>;
      case 'attribute':
        return <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-sm text-[10px] uppercase font-bold border border-purple-100"><Bookmark className="w-3 h-3" /> Attribute Void</span>;
      case 'relationship':
        return <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-sm text-[10px] uppercase font-bold border border-indigo-100"><GitCompare className="w-3 h-3" /> Connection Void</span>;
      default:
        return <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-0.5 rounded-sm text-[10px] uppercase font-bold border border-teal-100"><Layers className="w-3 h-3" /> Sub-topic Void</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-6" id="semantic-gaps-section">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h3 className="text-md font-bold text-gray-900 flex items-center gap-1.5 animate-pulse-slow">
            <AlertCircle className="w-5 h-5 text-indigo-600" />
            Semantic Gap Diagnostics & Voids
          </h3>
          <p className="text-xs text-gray-500">
            Identifies conceptual structures that search engines expect you to explain based on modern Entity Graph schemas but which are currently unindexed on your site.
          </p>
        </div>

        {/* Categories toggles with responsive styles */}
        <div className="flex flex-wrap items-center gap-1.5 bg-gray-50 p-1 rounded-lg border border-gray-100">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-colors duration-200 ${activeTab === 'all' ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            All Gaps ({gaps.length})
          </button>
          <button
            onClick={() => setActiveTab('concept')}
            className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-colors duration-200 ${activeTab === 'concept' ? 'bg-white shadow-xs text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Concepts
          </button>
          <button
            onClick={() => setActiveTab('attribute')}
            className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-colors duration-200 ${activeTab === 'attribute' ? 'bg-white shadow-xs text-purple-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Attributes
          </button>
          <button
            onClick={() => setActiveTab('relationship')}
            className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-colors duration-200 ${activeTab === 'relationship' ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Connections
          </button>
          <button
            onClick={() => setActiveTab('supporting_topic')}
            className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-colors duration-200 ${activeTab === 'supporting_topic' ? 'bg-white shadow-xs text-teal-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Sub-topics
          </button>
        </div>
      </div>

      {/* Gaps List Display */}
      <div className="space-y-4" id="semantic-gaps-item-list">
        {filteredGaps.length > 0 ? (
          filteredGaps.map(gap => (
            <div key={gap.id} className="border border-gray-100 rounded-xl p-5 hover:border-indigo-100 transition-all duration-200 bg-gray-50/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  {getGapTypeBadge(gap.type)}
                  <strong className="text-sm font-extrabold text-slate-800 leading-snug">{gap.name}</strong>
                </div>

                <div className="flex items-center gap-2">
                  {gap.associatedEntity && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm font-mono border border-slate-200">
                      Ent: {gap.associatedEntity}
                    </span>
                  )}
                  
                  <span className={`inline-flex items-center justify-center rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider
                    ${gap.impactWeight === 'High' ? 'bg-red-50 text-red-700' : ''}
                    ${gap.impactWeight === 'Medium' ? 'bg-amber-50 text-amber-700' : ''}
                    ${gap.impactWeight === 'Low' ? 'bg-slate-100 text-slate-700' : ''}
                  `}>
                    Priority: {gap.impactWeight}
                  </span>
                </div>
              </div>

              {/* Descriptions & Advice block */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
                <div className="md:col-span-3 text-gray-600 leading-relaxed space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Gap Evaluation</span>
                  <p>{gap.description}</p>
                </div>

                <div className="md:col-span-2 bg-indigo-50/40 rounded-lg p-3.5 border border-indigo-100/50 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-indigo-700 font-extrabold uppercase block tracking-wider mb-1">Recommended SEO Integration Action</span>
                    <p className="text-gray-700 leading-relaxed font-medium">{gap.recommendedCoverage}</p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-indigo-600 font-bold cursor-pointer hover:underline mt-2 pt-2 border-t border-indigo-100/30">
                    <span>Export Topic Blueprint Outline</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
            <HelpCircle className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm text-gray-500 mt-2 font-medium">Excellent work! No semantic voids found in this category.</p>
          </div>
        )}
      </div>

      <div className="bg-slate-900 text-slate-300 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-relaxed font-sans mt-4">
        <div>
          <strong className="text-white font-bold block mb-0.5 flex items-center gap-1 text-sm">
            <Star className="text-amber-400 w-4 h-4 fill-amber-400 shrink-0" />
            Satisfy Google's Information Gain Guidelines
          </strong>
          <span>Ensure every newly written document provides net-new data entities or alternative connection viewpoints that competitor sites do not demonstrate.</span>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold px-3 py-1.5 rounded-lg shrink-0 transition-transform duration-100">
          Optimize Draft Now
        </button>
      </div>
    </div>
  );
}
