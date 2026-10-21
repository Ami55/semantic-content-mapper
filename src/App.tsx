import React, { useState, useEffect } from 'react';
import { demoReports } from './demoData';
import { SemanticAnalysisReport, GraphNode } from './types';

// Import subcomponents
import ExecutiveSummaryComponent from './components/ExecutiveSummary';
import SiteKnowledgeMapComponent from './components/SiteKnowledgeMap';
import ClusterAnalysis from './components/ClusterAnalysis';
import EntityAnalysisComponent from './components/EntityAnalysis';
import SemanticGapAnalysisComponent from './components/SemanticGapAnalysis';
import InternalLinking from './components/InternalLinking';
import ContentOpportunity from './components/ContentOpportunity';
import ContentRoadmap from './components/ContentRoadmap';
import HowItWorks from './components/HowItWorks';
import HowItWorksModal from './components/HowItWorksModal';

// Import design icons
import { 
  Globe, Plus, Layers, AlertCircle, Network, Flame, CalendarDays, 
  Sparkles, Star, ShieldCheck, ArrowUpRight, BarChart3, HelpCircle, 
  Trash2, Play, Search, GraduationCap, ArrowRight, Shield, RefreshCw,
  Compass, BookOpen
} from "lucide-react";

export default function App() {
  const [domainInput, setDomainInput] = useState('');
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [competitorInput, setCompetitorInput] = useState('');
  const [activeReport, setActiveReport] = useState<SemanticAnalysisReport | null>(null);
  
  // Scraper crawling stages
  const [crawlStep, setCrawlStep] = useState<number>(0);
  const [isCrawling, setIsCrawling] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('executive_summary');
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);

  // Preload primary default report so user lands on a beautiful dashboard
  useEffect(() => {
    // Default workspace is stripe.com
    setActiveReport(demoReports["stripe.com"]);
  }, []);

  // Multi-step crawling progress effect
  useEffect(() => {
    if (!isCrawling) return;
    setCrawlStep(1);

    const step1 = setTimeout(() => setCrawlStep(2), 1500);
    const step2 = setTimeout(() => setCrawlStep(3), 3000);
    const step3 = setTimeout(() => setCrawlStep(4), 4500);
    const step4 = setTimeout(() => setCrawlStep(5), 6000);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
    };
  }, [isCrawling]);

  // Handle preset clicks
  const selectPreset = (domain: string) => {
    setIsCrawling(true);
    setCrawlStep(1);
    
    // Quick scan for instant-preview (1.2s total delay)
    setTimeout(() => {
      setActiveReport(demoReports[domain]);
      setIsCrawling(false);
      setCrawlStep(0);
      setActiveTab('executive_summary');
    }, 1200);
  };

  // Add competitor domain helper
  const addCompetitor = () => {
    let cleanCop = competitorInput.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    if (cleanCop && !competitors.includes(cleanCop)) {
      setCompetitors([...competitors, cleanCop]);
      setCompetitorInput('');
    }
  };

  // Remove competitor
  const removeCompetitor = (idx: number) => {
    setCompetitors(competitors.filter((_, i) => i !== idx));
  };

  // Custom analysis handler
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domainInput.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    if (!cleanDomain) return;

    setIsCrawling(true);

    try {
      // Call full-stack server endpoints
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: cleanDomain,
          competitors: competitors
        })
      });

      if (!response.ok) {
        throw new Error("Analysis node failed.");
      }

      const reportData: SemanticAnalysisReport = await response.json();
      
      // Delay slightly at the final stage so user gets a clean transition experience
      setTimeout(() => {
        setActiveReport(reportData);
        setIsCrawling(false);
        setCrawlStep(0);
        setActiveTab('executive_summary');
      }, 7000);

    } catch (err) {
      console.error("Live analysis endpoint error, falling back dynamically.", err);
      // Fallback transition
      setTimeout(() => {
        setIsCrawling(false);
        setCrawlStep(0);
      }, 7500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 leading-normal antialiased">
      
      {/* SaaS Primary Navigation Bar (Professional Polish White style) */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-800 shadow-xs px-6 py-4" id="main-nav-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-extrabold shadow-sm">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-md font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                SemanticMapper
                <span className="bg-indigo-100 text-indigo-700 border border-indigo-200 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Enterprise</span>
              </h1>
              <p className="text-[10px] text-slate-500">Topical Authority Mapping & Entity SEO Diagnostics Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-600">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all cursor-pointer shadow-2xs group"
              id="nav-btn-how-it-works"
            >
              <Compass className="w-4 h-4 text-indigo-600 group-hover:rotate-45 transition-transform" />
              <span>How It Works</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Full-Stack Security</span>
            </div>
            <a href="#scraper-control-center" className="bg-indigo-600 hover:bg-indigo-700 font-bold px-4 py-1.5 rounded-lg transition-colors text-white shadow-xs">
              Scan New Domain
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Scraper / Form Controller Row */}
        <section className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-5" id="scraper-control-center">
          <div>
            <h2 className="text-md font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="w-5 h-5 text-indigo-600" />
              Analyze Content Architecture & SEO Footprints
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Crawl any web domain to visualize hierarchical pillars, score semantic entity densities, map links, and build an AI-powered roadmap.
            </p>
          </div>

          {/* Quick Preset scan triggers */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase block">Instant high-fidelity demo domains:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => selectPreset('stripe.com')}
                disabled={isCrawling}
                className="bg-white border border-slate-200 hover:border-indigo-400 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-800 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-2xs"
                id="preset-stripe"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
                stripe.com <span className="text-[10px] text-slate-400 bg-slate-50 px-1 py-0.5 rounded-sm font-normal">Fintech</span>
              </button>
              <button
                onClick={() => selectPreset('nike.com')}
                disabled={isCrawling}
                className="bg-white border border-slate-200 hover:border-indigo-400 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-800 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-2xs"
                id="preset-nike"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                nike.com <span className="text-[10px] text-slate-400 bg-slate-50 px-1 py-0.5 rounded-sm font-normal">Retail</span>
              </button>
              <button
                onClick={() => selectPreset('substack.com')}
                disabled={isCrawling}
                className="bg-white border border-slate-200 hover:border-indigo-400 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-800 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-2xs"
                id="preset-substack"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                substack.com <span className="text-[10px] text-slate-400 bg-slate-50 px-1 py-0.5 rounded-sm font-normal">Creator</span>
              </button>
            </div>
          </div>

          {/* Form input setup */}
          <form onSubmit={handleAnalyze} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Scan Domain</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 text-xs font-semibold">https://</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. startup-portal.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  disabled={isCrawling}
                  className="pl-16 pr-3 py-2 w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg text-xs font-bold text-slate-850 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden disabled:opacity-60"
                  id="target-domain-input"
                />
              </div>
            </div>

            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Add Competitors (Optional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. competitor.com"
                  value={competitorInput}
                  onChange={(e) => setCompetitorInput(e.target.value)}
                  disabled={isCrawling}
                  className="px-3 py-2 flex-1 bg-gray-50 border border-gray-200 focus:bg-white rounded-lg text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden disabled:opacity-60"
                  id="competitor-domain-input"
                />
                <button
                  type="button"
                  onClick={addCompetitor}
                  disabled={isCrawling}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 rounded-lg text-xs transition-colors shrink-0 disabled:opacity-50"
                  id="add-competitor-btn"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={isCrawling || !domainInput.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold p-2 text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-55 cursor-pointer"
                id="initiate-analysis"
              >
                <Play className="w-3.5 h-3.5" />
                Analyze Domain Profile
              </button>
            </div>
          </form>

          {/* Competitor pile bubbles list */}
          {competitors.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
              <span className="text-[10px] text-gray-400 font-semibold uppercase shrink-0">Scanned Competitors:</span>
              {competitors.map((comp, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full text-[10px] text-indigo-700 font-bold">
                  {comp}
                  <button type="button" onClick={() => removeCompetitor(idx)} className="hover:text-red-600" id={`del-comp-${idx}`}>
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* LOADING SCENARIO */}
        {isCrawling && (
          <div className="bg-slate-900 text-white rounded-xl shadow-lg p-8 text-center space-y-6 max-w-xl mx-auto relative overflow-hidden" id="crawling-splash-panel">
            {/* Visual looping element */}
            <div className="relative mx-auto w-20 h-20">
              <span className="absolute inset-0 rounded-full border-4 border-indigo-600/30"></span>
              <span className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin-slow"></span>
              <span className="absolute inset-2 rounded-full border-2 border-emerald-400 border-b-transparent animate-spin"></span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Active Scrape crawling in Progress</h3>
              <p className="text-xs text-slate-400">Crawling, grouping pages into semantic topic mapping schemas, and benchmarking.</p>
            </div>

            {/* Simulated pipeline checklists */}
            <div className="text-left max-w-xs mx-auto space-y-2 text-xs bg-slate-950 p-4 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center font-bold text-[9px] ${crawlStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>✓</span>
                <span className={crawlStep >= 1 ? 'font-semibold text-slate-100' : 'text-slate-500'}>Connecting Scraper channels...</span>
              </div>
              <div className="flex items-center gap-2.5 border-t border-slate-900/60 pt-2">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center font-bold text-[9px] ${crawlStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>✓</span>
                <span className={crawlStep >= 2 ? 'font-semibold text-slate-100' : 'text-slate-500'}>Scraping pages and sitemaps...</span>
              </div>
              <div className="flex items-center gap-2.5 border-t border-slate-900/60 pt-2">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center font-bold text-[9px] ${crawlStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>✓</span>
                <span className={crawlStep >= 3 ? 'font-semibold text-slate-100' : 'text-slate-500'}>Evaluating semantic entity saliences...</span>
              </div>
              <div className="flex items-center gap-2.5 border-t border-slate-900/60 pt-2">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center font-bold text-[9px] ${crawlStep >= 4 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>✓</span>
                <span className={crawlStep >= 4 ? 'font-semibold text-slate-100' : 'text-slate-500'}>Compiling link maps and authority scores...</span>
              </div>
              <div className="flex items-center gap-2.5 border-t border-slate-900/60 pt-2">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center font-bold text-[9px] ${crawlStep >= 5 ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-800 text-slate-500'}`}>...</span>
                <span className={crawlStep >= 5 ? 'font-semibold text-indigo-400 animate-pulse' : 'text-slate-500'}>Finalizing report structures...</span>
              </div>
            </div>
          </div>
        )}

        {/* COMPLETED REPORT WORKSPACE */}
        {!isCrawling && activeReport && (
          <div className="space-y-6 animate-fade-in w-full">
            {/* Professional Polish Header Row */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs" id="workspace-report-header">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <span className="px-2.5 py-1 bg-slate-100 rounded border border-slate-200 text-slate-800 font-bold font-mono">
                  {activeReport.domain}
                </span>
                <span className="text-slate-400 font-normal">/</span>
                <span className="text-slate-700 font-bold">Knowledge Architecture</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 bg-slate-100/60 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 font-medium">
                  <span className="font-semibold text-slate-400">Comparison:</span>
                  <select className="border-none bg-transparent hover:text-indigo-600 focus:ring-0 font-bold text-slate-800 py-0 pl-1 pr-4 cursor-pointer text-xs">
                    <option>Competitor: Nomad-Lists.io</option>
                    <option>Industry Standard Baseline</option>
                  </select>
                </div>
                <button 
                  onClick={() => selectPreset(activeReport.domain)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
                >
                  Refresh Audit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start" id="report-workspace-wrapper">
              
              {/* Left Metrics Summary/Category Bar */}
              <div className="xl:col-span-3 space-y-6">
                
                {/* Domain Metadata Dashboard summary */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 text-white rounded-xl shadow-md p-5 space-y-5 relative overflow-hidden" id="sidemenu-authority-metrics">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Core Audit Report</span>
                    <p className="text-md font-bold tracking-tight text-white mt-0.5 truncate font-mono outline-hidden">{activeReport.domain}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/25 rounded-xl relative text-center shrink-0">
                      <span className="text-2xl font-black text-indigo-400">{activeReport.sitewideAuthority.overallScore}</span>
                      <span className="text-[8px] text-slate-450 font-bold block uppercase tracking-wider mt-0.5">SCORE / 100</span>
                    </div>
                    <div>
                      <strong className="text-xs text-slate-250 block font-bold leading-normal">{activeReport.sitewideAuthority.strengthRating}</strong>
                      <span className="text-[10px] text-slate-400 mt-1 block">Gap to leader: <strong>{activeReport.sitewideAuthority.gapToLeaderPercent}%</strong></span>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase block tracking-wider">Crawl Coverage Stats</span>
                    <p className="leading-snug text-slate-300 font-medium font-sans">{activeReport.sitewideAuthority.indexingStatus}</p>
                  </div>
                </div>

                {/* Sidebar directory selections */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1 text-slate-300 shadow-sm" id="sidemenu-tab-navigation">
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase block tracking-widest px-2 mb-3">Analysis & Planning</span>

                  <button
                    onClick={() => setIsHowItWorksOpen(true)}
                    className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer text-indigo-300 hover:bg-slate-800 hover:text-white bg-indigo-950/40 border border-indigo-500/30 group mb-1"
                    id="tab-btn-how-it-works"
                  >
                    <span className="flex items-center gap-2"><Compass className="w-4 h-4 shrink-0 text-indigo-400 group-hover:rotate-45 transition-transform" /> How It Works</span>
                    <span className="text-[9px] bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Guide</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('executive_summary')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      activeTab === 'executive_summary' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    id="tab-btn-executive-summary"
                  >
                    <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 shrink-0 text-amber-405 fill-amber-400" /> Executive Summary</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <button
                    onClick={() => setActiveTab('knowledge_map')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      activeTab === 'knowledge_map' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    id="tab-btn-map"
                  >
                    <span className="flex items-center gap-2"><Globe className="w-4 h-4 shrink-0" /> Site Knowledge Map</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <button
                    onClick={() => setActiveTab('cluster_diagnostics')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      activeTab === 'cluster_diagnostics' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    id="tab-btn-clusters"
                  >
                    <span className="flex items-center gap-2"><Layers className="w-4 h-4 shrink-0" /> Content Pillars & Clusters</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'cluster_diagnostics' ? 'bg-indigo-500 text-white' : 'bg-slate-850 text-slate-300 font-mono border border-slate-800'}`}>{activeReport.clusters.length}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('entities')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                       activeTab === 'entities' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    id="tab-btn-entities"
                  >
                    <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 shrink-0" /> Missing Entities in Clusters</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <button
                    onClick={() => setActiveTab('semantic_gaps')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      activeTab === 'semantic_gaps' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    id="tab-btn-gaps"
                  >
                    <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /> Missing Clusters & Gaps</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === 'semantic_gaps' ? 'bg-indigo-500 text-white' : 'bg-rose-950/40 text-rose-400 border border-rose-900/30 font-mono'}`}>{activeReport.semanticGaps.length}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('linking')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      activeTab === 'linking' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    id="tab-btn-linking"
                  >
                    <span className="flex items-center gap-2"><Network className="w-4 h-4 shrink-0" /> Link Flow Audit</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <button
                    onClick={() => setActiveTab('opportunities')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      activeTab === 'opportunities' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    id="tab-btn-opportunities"
                  >
                    <span className="flex items-center gap-2"><Flame className="w-4 h-4 shrink-0" /> Opportunity Engine</span>
                    <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-sm font-bold animate-pulse">HOT</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('roadmap')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      activeTab === 'roadmap' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                    id="tab-btn-roadmap"
                  >
                    <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 shrink-0" /> Content Roadmap Gaps</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </div>

                {/* Education block */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-500 space-y-2.5 shadow-2xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-indigo-600" /> SEO Architecture Class</span>
                  <p className="leading-relaxed">
                    Avoid matching keywords in isolation. Write structural topic maps that address missing entities, establish complete connections, and build out custom semantic frameworks to gain authority.
                  </p>
                  <button
                    onClick={() => setIsHowItWorksOpen(true)}
                    className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 text-[11px] cursor-pointer pt-1"
                  >
                    Explore How It Works <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Right workspace interactive module container */}
              <div className="xl:col-span-9" id="workspace-dynamic-frame">
                {activeTab === 'how_it_works' && (
                  <HowItWorks onNavigateTab={(tab) => setActiveTab(tab)} report={activeReport} />
                )}
                {activeTab === 'executive_summary' && (
                  <ExecutiveSummaryComponent report={activeReport} onNavigateTab={(tab) => setActiveTab(tab)} />
                )}
                {activeTab === 'knowledge_map' && (
                  <SiteKnowledgeMapComponent data={activeReport.siteKnowledgeMap} />
                )}
                {activeTab === 'cluster_diagnostics' && (
                  <ClusterAnalysis pillars={activeReport.pillars} clusters={activeReport.clusters} currentDomain={activeReport.domain} />
                )}
                {activeTab === 'entities' && (
                  <EntityAnalysisComponent data={activeReport.entityAnalysis} />
                )}
                {activeTab === 'semantic_gaps' && (
                  <SemanticGapAnalysisComponent gaps={activeReport.semanticGaps} />
                )}
                {activeTab === 'linking' && (
                  <InternalLinking data={activeReport.internalLinking} />
                )}
                {activeTab === 'opportunities' && (
                  <ContentOpportunity recommendations={activeReport.recommendations} />
                )}
                {activeTab === 'roadmap' && (
                  <ContentRoadmap roadmap={activeReport.roadmap} />
                )}
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Pop-up Modal for How It Works */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        report={activeReport}
      />

      {/* Corporate footer featuring Ami - SEO Girl */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-6 mt-12 text-slate-400 text-xs" id="app-footer">
        <div className="max-w-7xl mx-auto text-[11px] text-slate-500 text-center flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Semantic Content Mapper. Developed by <strong>SEO Girl - Ami</strong>. All rights reserved.</p>
          <p className="text-slate-400">Enterprise Topical Authority & Entity Graph Engine • Designed for Modern Search</p>
        </div>
      </footer>
    </div>
  );
}
