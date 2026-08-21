import React, { useState, useEffect } from 'react';
import { 
  Network, Layers, Sparkles, AlertCircle, BarChart3, ArrowRight, 
  CheckCircle2, Compass, Cpu, Database, Flame, Globe, HelpCircle, 
  Lightbulb, ShieldCheck, Zap, BookOpen, Search, Star, ExternalLink, 
  GitBranch, Link2, Target, Trophy, Info, FileText, Check, ArrowUpRight,
  TrendingUp, Activity, Sliders, Play, Code2, Server, Eye, X,
  MousePointer, Download, Share2, Filter, RefreshCw, BookmarkCheck,
  ChevronRight, ListOrdered, CheckSquare
} from 'lucide-react';
import { SemanticAnalysisReport } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tabId: string) => void;
  report?: SemanticAnalysisReport | null;
}

export default function HowItWorksModal({ isOpen, onClose, onNavigateTab, report }: Props) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<'steps' | 'features' | 'cheatsheet'>('steps');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Fallback / active data values from current scan
  const domainName = report?.domain || "stripe.com";
  const authorityScore = report?.sitewideAuthority.overallScore ?? 78;
  const rating = report?.sitewideAuthority.strengthRating ?? "Topical Leader";
  const totalPillars = report?.pillars.length ?? 3;
  const totalClusters = report?.clusters.length ?? 8;
  const totalEntities = report?.entityAnalysis.extractedEntities.length ?? 24;
  const missingEntitiesCount = report?.entityAnalysis.missingEntities.length ?? 7;
  const semanticGapsCount = report?.semanticGaps.length ?? 6;
  const orphanCount = report?.internalLinking.orphans.length ?? 3;
  const opportunitiesCount = report?.recommendations.length ?? 12;

  const handleNavigate = (tabId: string) => {
    if (onNavigateTab) {
      onNavigateTab(tabId);
    }
    onClose();
  };

  // 7 Step-by-Step User Instructions: How to Work With This App
  const userWorkflowSteps = [
    {
      step: 1,
      title: "Enter Domain or Pick Benchmark",
      badge: "Input & Analysis",
      icon: Search,
      tabTarget: "executive_summary",
      shortDesc: "Start by entering your website URL or selecting an industry preset in the top header bar.",
      instructions: [
        "Type any domain (e.g., yourcompany.com, stripe.com, shopify.com) in the top search bar.",
        "Or click one of the quick benchmark presets (Fintech, E-commerce, SaaS, AI Cloud) to load verified models.",
        "Click 'Analyze Site' to run the NLP parsing crawler and generate your topical graph."
      ],
      whereInApp: "Top Navigation Bar (Domain input field & quick preset pills).",
      liveSnapshot: {
        label: "Currently Auditing",
        val: domainName,
        detail: "Live multi-page semantic scrape loaded"
      },
      proTip: "Try switching between different benchmark domains to compare how different market leaders structure their semantic topic clusters."
    },
    {
      step: 2,
      title: "Review Executive Authority Scorecard",
      badge: "Topical Benchmark",
      icon: BarChart3,
      tabTarget: "executive_summary",
      shortDesc: "Inspect your overall Topical Authority Score (0-100) and identify immediate diagnostic highlights.",
      instructions: [
        "Review your overall Sitewide Topical Authority Score and Strength Rating.",
        "Compare your topical coverage against top search competitors in the Competitive Gap radar.",
        "Examine the Pillar Health breakdown (Payment Processing, Billing, Developer Infrastructure) to spot weak hubs.",
        "Review Urgent Action Items for immediate wins."
      ],
      whereInApp: "Sidebar Tab #1: Executive Summary.",
      liveSnapshot: {
        label: "Sitewide Authority",
        val: `${authorityScore}/100`,
        detail: `Rating: ${rating}`
      },
      proTip: "A score above 75 indicates strong topical dominance. Scores below 60 indicate significant semantic voids where competitors outrank you."
    },
    {
      step: 3,
      title: "Explore the Interactive 3D/2D Knowledge Graph",
      badge: "Visual Graph Explorer",
      icon: Network,
      tabTarget: "knowledge_map",
      shortDesc: "Interact with the force-directed D3 network graph visualizing relationships between Pillars, Clusters, and Pages.",
      instructions: [
        "Click & drag nodes to reorganize clusters visually or see how topics connect.",
        "Zoom with mouse wheel / trackpad or click the (+) and (-) zoom controls.",
        "Click any node to open the side inspector panel with full node metadata, PageRank, and linked entities.",
        "Use the category filters (Pillar, Cluster, Supporting Page, Entity) to isolate specific node types."
      ],
      whereInApp: "Sidebar Tab #2: Site Knowledge Map.",
      liveSnapshot: {
        label: "Interactive Graph",
        val: `${report?.siteKnowledgeMap.nodes.length || 32} Nodes`,
        detail: `${report?.siteKnowledgeMap.links.length || 48} Edges Mapped`
      },
      proTip: "Look for isolated or distant nodes on the graph periphery—these often represent poorly linked orphan topics."
    },
    {
      step: 4,
      title: "Audit Clusters & Generate AI Content Blueprints",
      badge: "Hierarchy & AI Ideation",
      icon: Layers,
      tabTarget: "cluster_diagnostics",
      shortDesc: "Inspect cluster depth levels (1-3) and use the AI Content Architecture Ideation Studio to build new hubs.",
      instructions: [
        "Check cluster depth scores to verify each Master Pillar has at least 3-5 supporting sub-topic pages.",
        "Identify 'Needs Expansion' clusters that lack depth.",
        "Scroll down to the 'Content Architecture Ideation Studio', select your target vertical, and click 'Generate Architectural Blueprint' to generate new article titles and outlines with Gemini AI."
      ],
      whereInApp: "Sidebar Tab #3: Topic Pillars & Clusters.",
      liveSnapshot: {
        label: "Pillars & Clusters",
        val: `${totalPillars} Pillars / ${totalClusters} Clusters`,
        detail: "Max Depth: 3 Layers"
      },
      proTip: "Search engines reward deep thematic clusters. Expanding thin clusters from 1 page to 4 linked sub-pages delivers the fastest authority lift."
    },
    {
      step: 5,
      title: "Check Entity Salience & Uncover Competitor Gaps",
      badge: "NLP & Entity Engine",
      icon: Cpu,
      tabTarget: "entities",
      shortDesc: "Identify extracted Named Entities, check salience scores (0.0-1.0), and locate missing competitor topics.",
      instructions: [
        "Explore verified Named Entities (Organizations, Protocols, Payment Rails, Formats) recognized on your pages.",
        "Check Entity Salience: Higher salience means search engines strongly associate that concept with your core brand.",
        "Navigate to 'Semantic Gaps' (Tab #5) to view high-priority missing entities that competitors rank for.",
        "Review suggested entity co-occurrences to enrich your existing articles."
      ],
      whereInApp: "Sidebar Tab #4: Entity Analysis & Tab #5: Missing Entities & Semantic Gaps.",
      liveSnapshot: {
        label: "Entity Intelligence",
        val: `${totalEntities} Extracted`,
        detail: `${missingEntitiesCount} Missing Competitor Voids`
      },
      proTip: "Integrate missing high-salience entities directly into your H2 subheadings and intro paragraphs to signal topical completeness to search algorithms."
    },
    {
      step: 6,
      title: "Fix Orphan Pages & Optimize Internal Link Flow",
      badge: "Link Graph & PageRank",
      icon: Link2,
      tabTarget: "linking",
      shortDesc: "Identify orphan URLs with 0 incoming internal links and apply recommended anchor-text link bridges.",
      instructions: [
        "Review the 'Orphan Pages' alert list—these pages cannot receive PageRank equity because no other page links to them.",
        "Check Authority Hub pages that pass the most internal link equity.",
        "Use the 'Internal Link Recommendations' table to see exact Source URLs, Target URLs, and recommended Anchor Text to insert into your CMS."
      ],
      whereInApp: "Sidebar Tab #6: Internal Link Flow.",
      liveSnapshot: {
        label: "Orphan Pages",
        val: `${orphanCount} Flagged URLs`,
        detail: `${report?.internalLinking.recommendations.length || 8} Recommended Fixes`
      },
      proTip: "Adding just 2 contextual internal links from an authoritative pillar page to an orphan article can index and rank that orphan within days."
    },
    {
      step: 7,
      title: "Execute Phased Content Roadmap & Export Sprints",
      badge: "ROI Roadmap & Export",
      icon: Target,
      tabTarget: "roadmap",
      shortDesc: "Turn audit findings into a 3-Sprint execution plan prioritized by Impact vs. Effort, then export your data.",
      instructions: [
        "Review 'Actionable Opportunities' (Tab #7) filtered by Quick Wins, Cluster Expansions, and High Impact.",
        "Examine the 'Quarterly Content Roadmap' (Tab #8) structured into Sprint 1 (Next 10 Pages), Sprint 2 (Next 25 Pages), and Sprint 3 (Next 50 Pages).",
        "Inspect target word counts, content formats (Guides, Teardowns, Comparisons), and primary focus entities.",
        "Click 'Export CSV' in the top header bar to download deliverables for your editorial team."
      ],
      whereInApp: "Sidebar Tab #7: Actionable Opportunities & Tab #8: Content Roadmap.",
      liveSnapshot: {
        label: "Content Deliverables",
        val: `${opportunitiesCount} Prioritized Items`,
        detail: "3 Sprint Phases Ready"
      },
      proTip: "Start with Sprint 1 Quick Wins (3-5 days turnaround) to unlock quick organic traffic gains while drafting larger pillar guides."
    }
  ];

  // App Features Breakdown
  const appFeatures = [
    {
      id: "executive_summary",
      name: "Executive Summary",
      icon: BarChart3,
      description: "High-level overview featuring your Sitewide Topical Authority (0-100), competitive benchmark radar, pillar health index, and urgent quick-fix cards.",
      metricHighlight: `${authorityScore}/100 Authority Score`
    },
    {
      id: "knowledge_map",
      name: "Interactive Knowledge Map",
      icon: Network,
      description: "Dynamic D3 force-directed network graph showing node hierarchies, PageRank connections, and interactive physics filtering.",
      metricHighlight: `${report?.siteKnowledgeMap.nodes.length || 32} Nodes Mapped`
    },
    {
      id: "cluster_diagnostics",
      name: "Topic Pillars & Clusters + AI Studio",
      icon: Layers,
      description: "Audits cluster depths (Layers 1-3), flags missing supporting pieces, and features the Gemini AI Architecture Ideation Studio.",
      metricHighlight: `${totalPillars} Pillars / ${totalClusters} Clusters`
    },
    {
      id: "entities",
      name: "Entity Analysis & Competitor Radar",
      icon: Cpu,
      description: "Extracts Named Entities, calculates salience centrality scores (0.0-1.0), and plots coverage against major search rivals.",
      metricHighlight: `${totalEntities} Entities Evaluated`
    },
    {
      id: "semantic_gaps",
      name: "Missing Entities & Semantic Gaps",
      icon: AlertCircle,
      description: "Pinpoints high-priority content voids, missing conceptual triples, and high-search-intent subtopics that competitors own.",
      metricHighlight: `${semanticGapsCount} Critical Gaps`
    },
    {
      id: "linking",
      name: "Internal Link Graph & Orphan Detection",
      icon: Link2,
      description: "Simulates PageRank link flow, detects orphan pages with 0 internal links, and provides exact anchor text recommendations.",
      metricHighlight: `${orphanCount} Orphan Pages Flagged`
    },
    {
      id: "opportunities",
      name: "Actionable Content Opportunities",
      icon: Target,
      description: "Filterable matrix of Quick Wins, Cluster Expansions, and Missing Pages prioritized by estimated authority gain and editorial difficulty.",
      metricHighlight: `${opportunitiesCount} Ranked Items`
    },
    {
      id: "roadmap",
      name: "Quarterly Content Roadmap",
      icon: TrendingUp,
      description: "Phased editorial schedule (S1: Next 10 Pages, S2: Next 25 Pages, S3: Next 50 Pages) complete with target word counts and focus entities.",
      metricHighlight: "Phased S1-S3 Roadmap"
    }
  ];

  const faqs = [
    {
      q: "How do I analyze my own website?",
      a: "Simply click the search input field in the top navigation bar, type your website domain (e.g. yourbrand.com or https://yourbrand.com), and click 'Analyze Site'. The system crawls the domain structure, parses HTML headings/entities, and generates an updated knowledge report."
    },
    {
      q: "How does SemanticMapper calculate the Topical Authority Score?",
      a: "The Topical Authority Score (0-100) is calculated using a proprietary 4-pillar index: (1) Entity Salience & Depth (30%), (2) Cluster Completeness & Sub-topic Coverage (25%), (3) Internal Link Silo Equity & Orphan Page Count (25%), and (4) Competitor Benchmark Coverage (20%)."
    },
    {
      q: "How do I use the AI Architecture Ideation Studio?",
      a: "Navigate to the 'Pillars & Clusters' tab and scroll down to the Content Architecture Ideation Studio. Select your target vertical (e.g., Fintech, SaaS, E-commerce, Healthcare) and click 'Generate Architectural Blueprint'. Gemini AI will produce 2 new master Content Pillars and 4 supporting Topic Clusters complete with 6 article titles."
    },
    {
      q: "How do I fix orphan pages discovered in the audit?",
      a: "Go to the 'Internal Link Flow' tab to see the list of orphan pages. Use the 'Recommended Internal Links' table to copy recommended target pages and exact anchor-text strings to paste into your CMS (WordPress, Webflow, Shopify, etc.)."
    },
    {
      q: "Can I export the data and content roadmap?",
      a: "Yes! Click the 'Export CSV' button in the top header bar to download a spreadsheet of all identified semantic gaps, link recommendations, and roadmap deliverables."
    }
  ];

  const currentStepData = userWorkflowSteps[activeStep - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fadeIn" id="how-it-works-popup-modal">
      
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={onClose} aria-label="Close modal background"></div>

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-slate-50 border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Modal Top Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">How It Works: Step-by-Step User Guide</h2>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Operational Runbook
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-300 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Ami - SEO Girl
                </span>
              </div>
              <p className="text-xs text-slate-400">Step-by-step instructions on how to use every feature in SemanticMapper</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700 shadow-xs"
              title="Close (Esc)"
              id="close-how-it-works-modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Mode Selector */}
        <div className="bg-white px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('steps')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'steps'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" /> 7-Step User Guide
            </button>
            <button
              onClick={() => setViewMode('features')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'features'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> 8 App Modules Directory
            </button>
            <button
              onClick={() => setViewMode('cheatsheet')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'cheatsheet'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <MousePointer className="w-3.5 h-3.5" /> Controls & Shortcuts
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono hidden md:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Domain: <strong className="text-indigo-600 font-bold">{domainName}</strong>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* VIEW MODE 1: 7-Step User Guide Walkthrough */}
          {viewMode === 'steps' && (
            <div className="space-y-6">
              
              {/* Stepper Header Timeline Bar */}
              <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                  <span>Interactive Workflow Stepper (Click any step)</span>
                  <span className="text-indigo-600 font-bold">Step {activeStep} of 7</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {userWorkflowSteps.map((s) => {
                    const Icon = s.icon;
                    const isActive = activeStep === s.step;
                    return (
                      <button
                        key={s.step}
                        onClick={() => setActiveStep(s.step)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isActive 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center ${
                            isActive ? 'bg-white text-indigo-700' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {s.step}
                          </span>
                          <Icon className={`w-3 h-3 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                        </div>
                        <div className="text-[10px] font-bold leading-tight mt-1 line-clamp-1">
                          {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Step Deep-Dive Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 animate-fadeIn">
                
                {/* Header of Step Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                        Step {currentStepData.step} • {currentStepData.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">| {currentStepData.whereInApp}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
                      {currentStepData.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5">{currentStepData.shortDesc}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                      disabled={activeStep === 1}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setActiveStep(prev => Math.min(7, prev + 1))}
                      disabled={activeStep === 7}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Next Step
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Instructions */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-indigo-600" /> What to Do in This Step:
                      </h4>
                      <div className="space-y-2">
                        {currentStepData.instructions.map((inst, i) => (
                          <div key={i} className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-xs text-slate-700 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{inst}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pro Tip Box */}
                    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
                      <strong className="font-bold flex items-center gap-1.5 text-amber-800 text-xs">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> SEO Pro Tip:
                      </strong>
                      <p className="text-amber-800/90 font-light leading-relaxed text-[11px]">
                        {currentStepData.proTip}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Live Data Snapshot & Direct Jump Action */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Live Data Telemetry
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] text-slate-400 block">{currentStepData.liveSnapshot.label}</span>
                        <strong className="text-xl font-black text-indigo-400 block font-mono">
                          {currentStepData.liveSnapshot.val}
                        </strong>
                        <span className="text-xs text-slate-300 font-light block">
                          {currentStepData.liveSnapshot.detail}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block mb-2">Location in application:</span>
                        <span className="text-xs font-mono font-semibold text-indigo-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 block">
                          {currentStepData.whereInApp}
                        </span>
                      </div>
                    </div>

                    {/* Direct Tab Switch Action */}
                    <button
                      onClick={() => handleNavigate(currentStepData.tabTarget)}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Take Me There (Open {currentStepData.title})</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* VIEW MODE 2: Complete 8-Module App Feature Directory */}
          {viewMode === 'features' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  Complete Directory of the 8 Core Application Modules
                </h3>
                <p className="text-xs text-slate-500">Each module in the left sidebar fulfills a specialized role in your Semantic SEO audit.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {appFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div key={feat.id} className="bg-white hover:bg-slate-50/80 transition-colors border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="p-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600">
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-mono">
                            {feat.metricHighlight}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">{feat.name}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">{feat.description}</p>
                      </div>

                      <button
                        onClick={() => handleNavigate(feat.id)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 pt-2 border-t border-slate-100 cursor-pointer self-start"
                      >
                        Open {feat.name} <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW MODE 3: Controls, Shortcuts & Cheatsheet */}
          {viewMode === 'cheatsheet' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-1">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MousePointer className="w-4 h-4 text-indigo-600" />
                  Controls, Mouse Gestures & Shortcuts Cheatsheet
                </h3>
                <p className="text-xs text-slate-500">Master all interactive graph controls and navigation shortcuts.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Knowledge Graph Controls */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Network className="w-4 h-4 text-indigo-600" /> Knowledge Graph Mouse Controls
                  </span>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Pan Graph View:</span>
                      <kbd className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px]">Click & Drag Background</kbd>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Zoom In / Out:</span>
                      <kbd className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px]">Scroll Wheel or +/- Buttons</kbd>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Inspect Node Details:</span>
                      <kbd className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px]">Click Any Circle Node</kbd>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Reorganize Layout:</span>
                      <kbd className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px]">Click & Drag Cluster Node</kbd>
                    </li>
                  </ul>
                </div>

                {/* Data Export & Actions */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Download className="w-4 h-4 text-emerald-600" /> Data Export & Report Actions
                  </span>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Export CSV Roadmap:</span>
                      <span className="text-[11px] text-slate-500">Top Header &gt; 'Export CSV'</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Share Report Link:</span>
                      <span className="text-[11px] text-slate-500">Top Header &gt; 'Share'</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Generate AI Outlines:</span>
                      <span className="text-[11px] text-slate-500">Clusters Tab &gt; Ideation Studio</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="font-medium text-slate-800">Close Any Modal:</span>
                      <kbd className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px]">Escape Key (Esc)</kbd>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* Frequently Asked Questions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                Frequently Asked Questions About This App
              </h3>
              <p className="text-xs text-slate-500">Quick answers on navigating and utilizing SemanticMapper.</p>
            </div>

            <div className="space-y-2 pt-1">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-slate-200 rounded-lg overflow-hidden transition-colors bg-slate-50/50"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left p-3 text-xs font-bold text-slate-800 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/70 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[9px] font-extrabold shrink-0">
                          Q{idx + 1}
                        </span>
                        {faq.q}
                      </span>
                      <span className="text-slate-400 font-bold text-xs shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    
                    {isOpen && (
                      <div className="p-3 pt-0 text-xs text-slate-600 leading-relaxed font-light border-t border-slate-200/60 bg-white">
                        <p className="mt-2 text-[11px]">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer Bar */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Curated by</span>
            <strong className="text-slate-800 font-bold">Ami - SEO Girl</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Got It, Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
