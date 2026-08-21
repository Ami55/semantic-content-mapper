import React, { useState } from 'react';
import { PillarDetail, ClusterDetail } from '../types';
import { 
  Layers, Star, AlertTriangle, ShieldCheck, CheckCircle2, Award, 
  ArrowUpRight, BookOpen, Search, Sparkles, RefreshCw, HelpCircle, 
  Lightbulb, Check, ChevronDown, ChevronUp, Copy, SlidersHorizontal, ListCollapse
} from 'lucide-react';

interface Props {
  pillars: PillarDetail[];
  clusters: ClusterDetail[];
  currentDomain?: string;
}

export default function ClusterAnalysis({ pillars, clusters, currentDomain = "stripe.com" }: Props) {
  const [selectedPillarId, setSelectedPillarId] = useState<string | 'all'>('all');
  
  // Registry states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'authority' | 'pages' | 'depth'>('authority');
  const [showAcademy, setShowAcademy] = useState(false);

  // Ideation states
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<any>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Auto-detect a reasonable default category based on current domain from report
  React.useEffect(() => {
    const domainLower = currentDomain.toLowerCase();
    if (/pay|stripe|bank|finance|bill|ledger|tax/.test(domainLower)) {
      setSelectedCategory('Fintech & Billing');
    } else if (/sport|fit|nike|run|ath/.test(domainLower)) {
      setSelectedCategory('Fitness & Athletic Performance');
    } else if (/marketing|creator|writer|substack|publish/.test(domainLower)) {
      setSelectedCategory('Marketing & Digital Publishing');
    } else if (/tour|travel|local|guide/.test(domainLower)) {
      setSelectedCategory('Tour & Travel Curation');
    } else {
      setSelectedCategory('SaaS & AI Technology');
    }
    // Clean ideas when context changes
    setGeneratedIdeas(null);
  }, [currentDomain]);

  // Handle Copy Helper
  const handleCopy = (text: string, labelId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(labelId);
    setTimeout(() => setCopiedText(null), 1500);
  };

  // Submit Content Ideation Request
  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    setGeneratedIdeas(null);
    try {
      const response = await fetch('/api/ideate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: currentDomain,
          category: selectedCategory
        })
      });
      if (response.ok) {
        const data = await response.json();
        setGeneratedIdeas(data);
      } else {
        throw new Error("Failed to contact ideation endpoint");
      }
    } catch (err) {
      console.error("Ideation generation failed: ", err);
      // Fallback local mock to prevent breaking user flow
      const namePart = currentDomain.split('.')[0] || "custom";
      const brandName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter & Sort clusters list
  const filteredClusters = clusters
    .filter(c => selectedPillarId === 'all' || c.associatedPillarId === selectedPillarId)
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedClusters = [...filteredClusters].sort((a, b) => {
    if (sortBy === 'authority') {
      return b.topicalAuthorityScore - a.topicalAuthorityScore;
    } else if (sortBy === 'pages') {
      return b.pagesCount - a.pagesCount;
    } else if (sortBy === 'depth') {
      return b.clusterDepth - a.clusterDepth;
    }
    return 0;
  });

  return (
    <div className="space-y-8" id="cluster-analysis-section">
      
      {/* 1. SEO Academy Educational Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BookOpen className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Conceptual Primer
              </span>
              <span className="text-slate-400 text-xs">Aesthetic Topology</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">How Content Pillars & Topic Clusters Scale Authority</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Google ranks domains not by isolated keywords, but by <strong>Topical Authority</strong>. By structuring content into high-level pillars and hyper-focused cluster hubs linked back to the home pillar, you establish structured integrity that crawlers recognize as authoritative.
            </p>
          </div>
          <button 
            onClick={() => setShowAcademy(!showAcademy)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/15 active:bg-white/20 text-xs font-semibold rounded-lg border border-white/15 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 text-indigo-200"
          >
            {showAcademy ? (
              <>Hide Architecture Specs <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Explore Architecture Specs <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>

        {/* Expanded Conceptual Details */}
        {showAcademy && (
          <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 relative z-10 animate-fadeIn">
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-3">
              <h4 className="font-bold text-indigo-300 text-sm flex items-center gap-1.5">
                <Star className="w-4 h-4 text-indigo-400" />
                The Content Pillar (Central Hub)
              </h4>
              <p className="leading-relaxed text-slate-400">
                A Pillar is a comprehensive static page covering a core topic in depth (e.g., <em>"The Developer Guide to Global Payments"</em>). It links out to its sub-clusters and is broad enough to act as the primary structural anchor of the entire silo.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px]">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Anchor Target</span>
                  <strong className="text-slate-200 font-bold">Top level general intent</strong>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Ideal Density</span>
                  <strong className="text-slate-200 font-bold">1 master page per 25 subtopics</strong>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-3">
              <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                Topic Clusters (Spokes & Support)
              </h4>
              <p className="leading-relaxed text-slate-400">
                Topic Clusters are highly specific, long-tail supporting pieces (e.g., <em>"SEPA transaction latency metrics"</em>) that address individual content gaps. They use strict internal linking maps to pass PageRank directly back up to the master Content Pillar.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px]">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Anchor Target</span>
                  <strong className="text-slate-200 font-bold">High intent long-tail queries</strong>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">Ideal Density</span>
                  <strong className="text-slate-200 font-bold">5-8 cluster hubs per pillar</strong>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-indigo-950/30 p-4.5 rounded-xl border border-indigo-900/40 space-y-2">
              <h5 className="font-bold text-white text-xs">Recommended Linking Protocol:</h5>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                To maximize search rankings, ensure every Cluster Page contains a contextually natural link referencing the Content Pillar using the primary keyword as anchor text. In turn, the Content Pillar should cleanly link back to each primary Cluster hub. Content isolation prevents PageRank leakage: avoid over-linking unrelated clusters!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Primary Alignments & Filters Dashboard Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm" id="control-filters">
        <div className="space-y-1">
          <h3 className="text-md font-bold text-gray-900 flex items-center gap-1.5">
            <Layers className="w-5 h-5 text-indigo-600" />
            Topical Cluster & Pillar Alignment Index
          </h3>
          <p className="text-xs text-gray-500">
            Structure your content into logical hierarchical paths. A high Topical Authority Score requires uniform coverage without content voids.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Pillar:</span>
            <select
              value={selectedPillarId}
              onChange={(e) => setSelectedPillarId(e.target.value)}
              className="bg-transparent text-xs text-gray-700 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Pillars ({pillars.length})</option>
              {pillars.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-gray-700 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="authority">Authority Score</option>
              <option value="pages">Pages Count</option>
              <option value="depth">Cluster Depth</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Pillars Summary Cards Grid */}
      {selectedPillarId === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="pillars-summary-grid">
          {pillars.map(p => {
            const pillarClusters = clusters.filter(c => c.associatedPillarId === p.id);
            const totalPages = pillarClusters.reduce((sum, c) => sum + c.pagesCount, 0);
            return (
              <div key={p.id} className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-xs relative overflow-hidden group">
                <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-10 font-mono text-[100px] font-extrabold select-none pointer-events-none">
                  {p.id.toUpperCase()}
                </div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="p-1.5 bg-slate-800 rounded-md">
                      <Star className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                    </span>
                    <div className="flex items-end gap-1 text-right">
                      <span className="text-xs font-semibold text-slate-400">Pillar Strength:</span>
                      <span className="text-md font-extrabold text-emerald-400">{p.strength}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white tracking-tight leading-snug">{p.name}</h4>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-light">{p.description}</p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block font-normal text-[10px] uppercase">Mapped Clusters</span>
                      <strong className="text-xs text-slate-100 font-bold">{pillarClusters.length} Hubs</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-normal text-[10px] uppercase">Active URLs</span>
                      <strong className="text-xs text-slate-100 font-bold">{totalPages} Pages</strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Flat List / Table Cluster Registry */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="cluster-registry-table-block">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              Comprehensive Topic Cluster Directory Search
            </h4>
            <p className="text-xs text-slate-500">List of all identified cluster hubs. Match keywords and analyze depth thresholds.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search cluster name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-all text-slate-850"
            />
          </div>
        </div>

        {sortedClusters.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
                  <th className="py-3.5 px-5">Topic Cluster Hub</th>
                  <th className="py-3.5 px-4">Associated Pillar</th>
                  <th className="py-3.5 px-4 text-center">Depth</th>
                  <th className="py-3.5 px-4 text-center">Supporting URLs</th>
                  <th className="py-3.5 px-4 text-center">Gaps</th>
                  <th className="py-3.5 px-5 text-right">Topical Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-gray-700">
                {sortedClusters.map((cluster) => {
                  const matchingPillar = pillars.find(p => p.id === cluster.associatedPillarId);
                  const hasGaps = cluster.missingSupportingContent.length > 0;
                  return (
                    <tr key={cluster.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-semibold text-gray-900">{cluster.name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">Cluster ID: {cluster.id}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                          {matchingPillar ? matchingPillar.name : 'Shared'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-semibold text-slate-800">
                        {cluster.clusterDepth} layers
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-800">
                        {cluster.pagesCount} URLs
                      </td>
                      <td className="py-4 px-4 text-center">
                        {hasGaps ? (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                            {cluster.missingSupportingContent.length} Critical Gaps
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" /> Fully Covered
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-right font-black">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full rounded-full ${
                                cluster.topicalAuthorityScore >= 80 ? 'bg-emerald-500' :
                                cluster.topicalAuthorityScore >= 65 ? 'bg-indigo-500' : 'bg-amber-400'
                              }`}
                              style={{ width: `${cluster.topicalAuthorityScore}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm ${
                            cluster.topicalAuthorityScore >= 80 ? 'text-emerald-600' :
                            cluster.topicalAuthorityScore >= 65 ? 'text-indigo-600' : 'text-amber-500'
                          }`}>
                            {cluster.topicalAuthorityScore}/100
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 space-y-2">
            <Search className="w-8 h-8 mx-auto text-slate-350" />
            <p className="text-xs font-medium">No clusters matched your search query "{searchQuery}".</p>
          </div>
        )}
      </div>

      {/* Cluster Cards Detailed View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="clusters-breakdown-panel">
        {sortedClusters.slice(0, 4).map(cluster => {
          const matchingPillar = pillars.find(p => p.id === cluster.associatedPillarId);
          return (
            <div key={cluster.id} className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 flex flex-col justify-between hover:border-indigo-100 hover:shadow-sm transition-all duration-200">
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-605 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {matchingPillar ? matchingPillar.name : 'Core Pillar'}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 mt-2">{cluster.name}</h4>
                  </div>
                  <div className="text-right whitespace-nowrap shrink-0">
                    <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Topical Authority</span>
                    <span className={`text-lg font-black ${
                      cluster.topicalAuthorityScore >= 85 ? 'text-emerald-600' :
                      cluster.topicalAuthorityScore >= 70 ? 'text-indigo-600' : 'text-amber-600'
                    }`}>{cluster.topicalAuthorityScore}/100</span>
                  </div>
                </div>

                {/* Technical parameters stats */}
                <div className="grid grid-cols-3 gap-3 bg-slate-50/70 border border-slate-100 rounded-xl p-3 text-xs text-gray-650">
                  <div className="text-center border-r border-slate-200">
                    <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Cluster Depth</span>
                    <strong className="text-xs text-slate-800 font-extrabold">{cluster.clusterDepth} layers</strong>
                  </div>
                  <div className="text-center border-r border-slate-200">
                    <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Supporting URLs</span>
                    <strong className="text-xs text-slate-800 font-extrabold">{cluster.pagesCount} pages</strong>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-wider">Integrity</span>
                    <strong className="text-xs text-emerald-600 font-extrabold flex items-center justify-center gap-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Healthy
                    </strong>
                  </div>
                </div>

                {/* Supporting content snippet */}
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Mapped Supporting Content</span>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {cluster.supportingContent.map((url, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-55 border border-slate-100 rounded-lg text-xs text-slate-700 truncate font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{url}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing supporting content alerts */}
                {cluster.missingSupportingContent.length > 0 && (
                  <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1 uppercase tracking-wider mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      Discovered Content Gaps
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      {cluster.missingSupportingContent.map((topic, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-relaxed font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Establish topical authority by filling these gaps.</span>
                <span className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-0.5 cursor-pointer">
                  Generate Outlines <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. New Content Architecture Ideation Studio */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6" id="ideation-studio-block">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="p-1 px-2.5 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-indigo-600" /> New Addition
            </span>
            <span className="text-xs text-slate-400">Content Architecture Ideation Studio</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            Pillar & Cluster Expansion Generator
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
            Want to expand your site map? Select your target niche category or vertical index below. We will use advanced analysis to formulate 2 powerful, brand-new Content Pillars alongside detailed Supporting Cluster Pages to bypass competitors.
          </p>
        </div>

        {/* Studio parameters form */}
        <div className="bg-white p-5 rounded-xl border border-slate-200. flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-600 font-bold uppercase block">Benchmark Domain URL</label>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-xs text-slate-700 font-bold">
                {currentDomain}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-600 font-bold uppercase block">Target Niche Vertical</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold focus:ring-1 focus:ring-indigo-500 focus:outline-hidden cursor-pointer"
              >
                <option value="SaaS & AI Technology">SaaS & AI technology</option>
                <option value="Fintech & Billing">Fintech, Payments & Billing</option>
                <option value="Fitness & Athletic Performance">Fitness, Apparel & Physical Performance</option>
                <option value="Marketing & Digital Publishing">Marketing & Digital Publishing</option>
                <option value="Tour & Travel Curation">Hyper-Local Travel, Curation & Tours</option>
                <option value="Digital Business Services">Commercial E-Commerce & General Business</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateIdeas}
            disabled={isGenerating}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 font-bold text-xs text-white rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 tracking-wide self-stretch md:self-end shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                Formulating Strategy Blueprint...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-white" />
                Generate Architectural Blueprint
              </>
            )}
          </button>
        </div>

        {/* Loading Spinner Skeleton */}
        {isGenerating && (
          <div className="p-8 bg-white rounded-xl border border-dashed border-slate-200 space-y-4 animate-pulse">
            <div className="h-4 bg-slate-100 rounded-md w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-28 bg-slate-100 rounded-xl"></div>
              <div className="h-28 bg-slate-100 rounded-xl"></div>
            </div>
          </div>
        )}

        {/* Structured Blueprints Results */}
        {generatedIdeas && (
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4.5">
              <div className="space-y-0.5">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 px-2 py-0.5 rounded uppercase tracking-wider font-bold">Generated Strategy</span>
                <h4 className="text-md font-extrabold tracking-tight text-white mt-1">SEO content Blueprint for {generatedIdeas.brandName}</h4>
                <p className="text-[11px] text-slate-400">Target category context: <strong className="text-indigo-400 font-bold">{generatedIdeas.category}</strong></p>
              </div>
              <button 
                onClick={() => setGeneratedIdeas(null)}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Clear Blueprint
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {generatedIdeas.pillars?.map((pillar: any, i: number) => (
                <div key={i} className="bg-slate-950/65 rounded-xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-colors">
                  
                  {/* Pillar Title card */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                        New Content Pillar {i + 1}
                      </span>
                      <button 
                        onClick={() => handleCopy(pillar.name, `p-${i}`)}
                        className="p-1 text-slate-500 hover:text-indigo-400 transition-colors rounded hover:bg-slate-900"
                        title="Copy Pillar Path"
                      >
                        {copiedText === `p-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <h5 className="text-sm font-extrabold text-white tracking-tight leading-snug">{pillar.name}</h5>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">{pillar.description}</p>
                  </div>

                  {/* Included clusters under the pillar */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-4">
                    <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider block">Recommended Cluster Spokes:</span>
                    
                    <div className="grid grid-cols-1 gap-3.5">
                      {pillar.clusters?.map((cluster: any, j: number) => (
                        <div key={j} className="bg-slate-900/80 border border-slate-800/80 rounded-lg p-3.5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-200">
                              🚀 Hub: {cluster.name}
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono">Depth Index: {cluster.depth || 2}</span>
                          </div>

                          <div className="space-y-2 pl-3 border-l border-indigo-500/25">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">3 Essential Page Drafts to write:</span>
                            <ul className="space-y-1.5">
                              {cluster.pages?.map((page: string, k: number) => (
                                <li key={k} className="flex items-start justify-between gap-2 bg-slate-950/40 p-2 rounded border border-slate-900/60 transition-colors group">
                                  <div className="flex items-start gap-1.5 text-xs text-slate-300 font-light leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                                    <span>{page}</span>
                                  </div>
                                  <button
                                    onClick={() => handleCopy(page, `pg-${i}-${j}-${k}`)}
                                    className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-500 hover:text-white transition-opacity shrink-0"
                                    title="Copy page title"
                                  >
                                    {copiedText === `pg-${i}-${j}-${k}` ? (
                                      <Check className="w-3 h-3 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/60 text-xs text-slate-450 leading-relaxed flex items-start gap-2 text-slate-400">
              <Award className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Implementation Guideline:</strong> Add these pages into your workspace, using strict internal anchor linking referencing your primary pillar keyword. Expect a gradual rise in average ranking positions within 4-6 weeks of crawlers processing new clusters.
              </span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

