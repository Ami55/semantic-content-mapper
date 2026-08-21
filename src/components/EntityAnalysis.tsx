import React, { useState, useMemo } from 'react';
import { EntityAnalysis, SemanticEntity } from '../types';
import { Award, AlertTriangle, ShieldCheck, CheckCircle2, Search, Cpu, BookOpen, User, Flag, Filter, ToggleLeft } from 'lucide-react';

interface Props {
  data: EntityAnalysis;
}

export default function EntityAnalysisComponent({ data }: Props) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [presenceFilter, setPresenceFilter] = useState<'all' | 'present' | 'missing'>('all');

  // Find unique entity types
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    data.extractedEntities.forEach(e => {
      if (e.type) types.add(e.type);
    });
    return Array.from(types);
  }, [data.extractedEntities]);

  // Filter entities list
  const filteredEntities = useMemo(() => {
    return data.extractedEntities.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                          e.type.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || e.type === typeFilter;
      const matchPresence = presenceFilter === 'all' || 
                            (presenceFilter === 'present' ? e.isPresent : !e.isPresent);
      return matchSearch && matchType && matchPresence;
    });
  }, [data.extractedEntities, search, typeFilter, presenceFilter]);

  // Map icons for entity categories
  const getEntityIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('tech') || t.includes('soft') || t.includes('architect')) return <Cpu className="w-4 h-4 text-purple-500" />;
    if (t.includes('person') || t.includes('athlete')) return <User className="w-4 h-4 text-blue-500" />;
    if (t.includes('reg') || t.includes('compliance') || t.includes('law')) return <Flag className="w-4 h-4 text-red-500" />;
    return <BookOpen className="w-4 h-4 text-indigo-500" />; // Fallback Concept icon
  };

  return (
    <div className="space-y-6" id="entity-analysis-panel">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Entity Coverage Metric Dial */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between" id="entity-coverage-dial">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Entity Coverage Score</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{data.coverageScore}%</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Optimal</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Calculates how effectively your indexed domains map to industry-wide recognized noun entities in semantic knowledge databases.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Competitor Benchmark</span>
            {data.competitors.map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 truncate">{c.domain}</span>
                  <span className="text-slate-500">{c.entityCoverageScore}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${idx === 0 ? 'bg-indigo-500' : 'bg-gray-400'}`}
                    style={{ width: `${c.entityCoverageScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Entity Gaps */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between lg:col-span-2" id="competitor-entity-gaps">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Primary Competitor Footprints</h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              These verified vocabulary entities are highly used by domains competing for identical search intents, but are neglected on your site.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.competitors.slice(0, 2).map((comp, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 font-mono truncate">{comp.domain}</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-sm font-bold">Coverage Rank #{idx + 1}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Heavy Entity Anchors</span>
                    <div className="flex flex-wrap gap-1">
                      {comp.topEntities.map((ent, i) => (
                        <span key={i} className="text-[11px] bg-white border border-gray-100 text-slate-800 rounded-sm px-2 py-0.5 font-medium shadow-2xs">
                          {ent}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 bg-amber-50/50 p-3 rounded-lg border border-amber-100 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-amber-900 block font-bold">Top Content Priority Warning</strong>
              <span className="text-gray-600 leading-relaxed">
                Your closest competitor covers <strong className="text-slate-800">{data.missingEntities.length} critical entities</strong> that are completely absent on your domain. This creates an immediate topical authority deficit.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Entity Explorer Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5" id="extracted-entities-ledger">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
          <div>
            <h3 className="text-md font-bold text-gray-900 flex items-center gap-1.5">
              <Cpu className="w-5 h-5 text-indigo-600" />
              Discovered Knowledge Entities Ledger
            </h3>
            <p className="text-xs text-gray-500">
              Profiles all semantically relevant entities indexed on client pages. Gaps are identified as potential next content builds.
            </p>
          </div>

          {/* Filtering panels */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            
            {/* Search */}
            <div className="relative flex-1 md:flex-initial">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                <Search className="h-3.5 w-3.5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Filter entities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full md:w-44 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            {/* Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2.5 py-1.5 text-gray-700 font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
            >
              <option value="all">All Classifications</option>
              {availableTypes.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>

            {/* Presence */}
            <select
              value={presenceFilter}
              onChange={(e) => setPresenceFilter(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2.5 py-1.5 text-gray-700 font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
            >
              <option value="all">All Content Status</option>
              <option value="present">Covered (Present)</option>
              <option value="missing">Uncovered (Missing Gaps)</option>
            </select>

          </div>
        </div>

        {/* Output Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="entities-grid-view">
          {filteredEntities.length > 0 ? (
            filteredEntities.map((entity, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-xl border hover:shadow-2xs transition-all duration-200 flex flex-col justify-between ${
                  entity.isPresent 
                    ? 'bg-emerald-50/10 border-gray-100 hover:border-emerald-200' 
                    : 'bg-amber-50/10 border-amber-100 hover:border-amber-300'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {getEntityIcon(entity.type)}
                      <span className="text-[10px] text-gray-400 font-semibold uppercase">{entity.type}</span>
                    </div>
                    
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider
                      ${entity.isPresent 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {entity.isPresent ? 'Covered' : 'Missing'}
                    </span>
                  </div>

                  <strong className="text-sm text-slate-800 font-bold block leading-snug">{entity.name}</strong>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-semibold">Semantic Salience</span>
                    <strong className="text-slate-700 font-bold">{entity.salienceScore}%</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-semibold">Topical Relevance</span>
                    <strong className="text-slate-700 font-bold">{entity.relevance}%</strong>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center">
              <ToggleLeft className="w-8 h-8 text-gray-300 animate-pulse" />
              <p className="text-xs text-gray-400 mt-2 font-medium">No entities matched your search coordinates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
