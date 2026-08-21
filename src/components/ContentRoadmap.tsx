import React, { useState } from 'react';
import { RoadmapItem } from '../types';
import { CalendarDays, Star, Layers, AlignLeft, ShieldCheck, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

interface Props {
  roadmap: RoadmapItem[];
}

export default function ContentRoadmap({ roadmap }: Props) {
  const [activePhase, setActivePhase] = useState<'Next 10 Pages' | 'Next 25 Pages' | 'Next 50 Pages'>('Next 10 Pages');

  // Filter roadmap items
  const filteredItems = roadmap.filter(item => item.phase === activePhase);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-6" id="roadmap-pipeline-panel">
      
      {/* Timeline headers */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-md font-bold text-gray-900 flex items-center gap-1.5">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            Tactical Content Roadmap
          </h3>
          <p className="text-xs text-gray-500">
            A chronological pipeline of recommended documents ordered strictly by expected authority impact and entity saturation speeds.
          </p>
        </div>

        {/* Phase selector tabs */}
        <div className="flex border border-gray-100 bg-gray-50 p-1 rounded-lg">
          <button
            onClick={() => setActivePhase('Next 10 Pages')}
            className={`px-4 py-1.5 text-xs rounded-md font-bold transition-all ${
              activePhase === 'Next 10 Pages' ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'
            }`}
            id="roadmap-phase-10-btn"
          >
            Phase 1: Next 10 Pages
          </button>
          <button
            onClick={() => setActivePhase('Next 25 Pages')}
            className={`px-4 py-1.5 text-xs rounded-md font-bold transition-all ${
              activePhase === 'Next 25 Pages' ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'
            }`}
            id="roadmap-phase-25-btn"
          >
            Phase 2: Next 25 Pages
          </button>
          <button
            onClick={() => setActivePhase('Next 50 Pages')}
            className={`px-4 py-1.5 text-xs rounded-md font-bold transition-all ${
              activePhase === 'Next 50 Pages' ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'
            }`}
            id="roadmap-phase-50-btn"
          >
            Phase 3: Next 50 Pages
          </button>
        </div>
      </div>

      {/* Roadmap interactive checklist */}
      <div className="space-y-6 relative pl-3 border-l-2 border-indigo-100" id="roadmap-timeline-entries">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <div key={item.id} className="relative group animate-fade-in" id={`roadmap-item-${item.id}`}>
              
              {/* Pulsing checkpoint bulb */}
              <span className="absolute -left-[19px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-indigo-600 bg-white group-hover:bg-indigo-600 transition-colors duration-200 z-10"></span>
              
              <div className="bg-gray-50/40 border border-gray-100 hover:border-indigo-100 rounded-xl p-5 hover:bg-white transition-all duration-200 shadow-3xs">
                
                {/* Header item block */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3.5 mb-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-sm font-extrabold text-indigo-700 uppercase tracking-wide">
                        Priority rank #{idx + 1}
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-100 px-2 py-0.5 rounded-sm font-semibold capitalize">
                        {item.recommendedFormat}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-800 mt-2 leading-snug">{item.title}</h4>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Estimated Impact</span>
                    <strong className="text-md font-black text-indigo-600">{item.estimatedImpact}/100</strong>
                  </div>
                </div>

                {/* Sub technical blueprint coordinates */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
                  
                  {/* Wordcount & keywords */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider mb-1">Crawl Guidelines</span>
                      <span className="text-slate-700 font-medium">Recommended word footprint: <strong className="text-slate-900 font-bold">{item.recommendedWordCount} words</strong></span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider mb-1">Target Focus Queries</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {item.targetFocusKeys.map((key, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200/60 rounded-xs px-2 py-0.5 font-medium">
                            {key}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Knowledge Entities to saturate */}
                  <div className="lg:col-span-2 space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block tracking-wider">Required Entity Injections (Entity SEO)</span>
                    <p className="text-gray-500 font-medium text-[11px] mb-1.5 leading-relaxed">
                      Saturate this article with the following verified entities to confirm contextual proximity to Google Knowledge Graphs:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.suggestedEntities.map((ent, i) => (
                        <span key={i} className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-sm px-2.5 py-0.5 font-semibold flex items-center gap-1 shadow-3xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          {ent}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Checklist Action panel */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
                  <span className="flex items-center gap-1"><BookOpen className="w-4 h-4 shrink-0" /> Generate AI content brief outline specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center">
            <AlertCircle className="w-8 h-8 text-gray-300 animate-bounce" />
            <p className="text-xs text-gray-400 mt-2 font-semibold">Generating roadmap schedules for custom coordinates...</p>
          </div>
        )}
      </div>

    </div>
  );
}
