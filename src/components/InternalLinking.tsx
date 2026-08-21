import React, { useState } from 'react';
import { InternalLinkingAnalysis } from '../types';
import { HelpCircle, Network, CheckCircle2, ChevronRight, AlertCircle, RefreshCw, Star, Info, Link } from 'lucide-react';

interface Props {
  data: InternalLinkingAnalysis;
}

export default function InternalLinking({ data }: Props) {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'hubs_orphans' | 'weak_clusters'>('recommendations');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-6" id="linking-analysis-section">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-md font-bold text-gray-900 flex items-center gap-1.5">
            <Network className="w-5 h-5 text-indigo-600 animate-spin-slow" />
            Internal Linking Audit & Flow
          </h3>
          <p className="text-xs text-gray-500">
            Audit link juice distribution. Prevent orphan pages and ensure clusters are fully interconnected so Googlebot can crawl and pass PageRank.
          </p>
        </div>

        {/* Navigation Filters */}
        <div className="flex bg-gray-50 border border-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-bold transition-all ${
              activeTab === 'recommendations' ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Recommendations ({data.recommendations.length})
          </button>
          <button
            onClick={() => setActiveTab('hubs_orphans')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-bold transition-all ${
              activeTab === 'hubs_orphans' ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Hubs & Orphans
          </button>
          <button
            onClick={() => setActiveTab('weak_clusters')}
            className={`px-3.5 py-1.5 text-xs rounded-md font-bold transition-all ${
              activeTab === 'weak_clusters' ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Weak Clusters
          </button>
        </div>
      </div>

      {/* RECOMMENDATIONS TAB */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4 animate-fade-in" id="linking-recs-tab">
          {data.recommendations.map(reco => (
            <div key={reco.id} className="border border-gray-100 rounded-xl p-4 hover:border-indigo-100 transition-all bg-gray-50/20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Visual relationship arrow mapping */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-11 gap-2 items-center text-xs">
                  
                  {/* Source Node */}
                  <div className="md:col-span-5 bg-white border border-gray-100 p-2.5 rounded-lg">
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-xs font-semibold uppercase tracking-wider block mb-1">Source Page</span>
                    <strong className="text-slate-800 font-bold block truncate">{reco.sourceTitle}</strong>
                    <span className="text-[10px] text-gray-400 font-mono truncate block mt-0.5">{reco.sourceUrl}</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="md:col-span-1 text-center font-bold text-gray-400 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-indigo-400 animate-pulse hidden md:block" />
                    <span className="md:hidden block text-[10px] bg-indigo-50 text-indigo-600 rounded-lg px-2 py-0.5 my-1">Link to</span>
                  </div>

                  {/* Target Node */}
                  <div className="md:col-span-5 bg-white border border-gray-100 p-2.5 rounded-lg">
                    <span className="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-xs font-semibold uppercase tracking-wider block mb-1">Target Hub</span>
                    <strong className="text-slate-800 font-bold block truncate">{reco.targetTitle}</strong>
                    <span className="text-[10px] text-gray-400 font-mono truncate block mt-0.5">{reco.targetUrl}</span>
                  </div>

                </div>

                {/* Suggested anchor text and rationale advice */}
                <div className="lg:col-span-4 bg-indigo-50/50 border border-indigo-100 p-3.5 rounded-lg text-xs space-y-2">
                  <div>
                    <span className="text-[9px] text-indigo-800 font-extrabold uppercase tracking-wider block">Suggested Anchor Text</span>
                    <div className="font-mono bg-white px-2.5 py-1 border border-indigo-100 rounded-sm text-indigo-700 font-semibold inline-block select-all mt-1">
                      "{reco.suggestedAnchorText}"
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Strategic Intent</span>
                    <p className="text-gray-600 leading-normal">{reco.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HUBS & ORPHANS TAB */}
      {activeTab === 'hubs_orphans' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in" id="hubs-orphans-tab">
          
          {/* Crawl Hubs Card */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              Primary Crawl Hubs (High Link equity)
            </h4>
            <div className="space-y-2.5">
              {data.hubs.map((hub, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-3.5 rounded-lg shadow-2xs text-xs space-y-1.5 hover:border-gray-200 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <strong className="text-slate-800 font-bold truncate block">{hub.title}</strong>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] px-1.5 py-0.5 rounded-sm font-bold shrink-0">
                      PA Score: {hub.pageAuthority}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block truncate">{hub.url}</span>
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-4 text-[10px] text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><Link className="w-3 h-3" /> Inbound links: <strong>{hub.inboundLinks}</strong></span>
                    <span className="flex items-center gap-1"><Link className="w-3 h-3" /> Outbound links: <strong>{hub.outboundLinks}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Isolated Orphans Card */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-500 fill-red-50" />
              Isolated Orphan Nodes (0 or 1 inbound links)
            </h4>
            <div className="space-y-2.5">
              {data.orphans.map((orphan, idx) => (
                <div key={idx} className="bg-red-50/15 border border-red-100 p-3.5 rounded-lg text-xs space-y-2 hover:border-red-200 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <strong className="text-slate-800 font-bold truncate block">{orphan.title}</strong>
                    {orphan.impressionsEstimated !== undefined && (
                      <span className="text-red-700 bg-red-50 border border-red-100 text-[10px] px-1.5 py-0.5 rounded-sm font-semibold shrink-0">
                        Monthly Loss: ~{orphan.impressionsEstimated} views
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block truncate">{orphan.url}</span>
                  
                  <div className="bg-white border border-red-100/50 p-2 rounded-md">
                    <strong className="text-[9px] text-red-800 font-extrabold uppercase block mb-0.5">Required Recovery Action</strong>
                    <p className="text-gray-600 leading-normal text-[11px]">{orphan.actionRequired}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* WEAK CLUSTERS TAB */}
      {activeTab === 'weak_clusters' && (
        <div className="space-y-4 animate-fade-in" id="weak-clusters-tab">
          {data.weakClusters.map((cluster, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-indigo-100 transition-all bg-gray-50/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-3">
                <strong className="text-sm font-bold text-slate-800">{cluster.clusterName}</strong>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Internal Density:</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    cluster.connectivityPercent >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                  }`}>{cluster.connectivityPercent}% Connected</span>
                </div>
              </div>
              <div className="flex gap-2.5 text-xs text-gray-600 mt-2 leading-relaxed">
                <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-700 block font-bold mb-0.5">Content Architecture Issue found:</strong>
                  <p>{cluster.issue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
