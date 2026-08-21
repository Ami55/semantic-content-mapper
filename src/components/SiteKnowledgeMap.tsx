import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { SiteKnowledgeMap, GraphNode, GraphLink } from '../types';
import { Search, ZoomIn, ZoomOut, RotateCcw, HelpCircle, FileText, Settings, Layers, Star, PlusCircle, AlertCircle } from 'lucide-react';

interface ForceNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'pillar' | 'cluster' | 'page' | 'missing-page';
  size: number;
  url?: string;
  authorityScore?: number;
}

interface ForceLink extends d3.SimulationLinkDatum<ForceNode> {
  source: string | ForceNode;
  target: string | ForceNode;
  type: 'pillar-to-cluster' | 'cluster-to-page' | 'recommended-link' | 'normal';
}

interface Props {
  data: SiteKnowledgeMap;
  onNodeSelect?: (node: GraphNode) => void;
}

export default function SiteKnowledgeMapComponent({ data, onNodeSelect }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const zoomRef = useRef<any>(null);

  // Resize listener
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const newWidth = Math.max(width, 400);
        setDimensions(prev => {
          // Only trigger if width changes significantly to avoid layout loops
          if (Math.abs(prev.width - newWidth) < 10) {
            return prev;
          }
          return { width: newWidth, height: 500 };
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter nodes & links
  const filteredNodes = useMemo(() => {
    return data.nodes.filter(n => {
      const matchesSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (n.url && n.url.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = filterType === 'all' || n.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [data.nodes, searchQuery, filterType]);

  const filteredLinks = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    return data.links.filter(l => {
      // Direct comparison handle for D3-mutated links
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });
  }, [data.links, filteredNodes]);

  // Handle D3 Force Simulation
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous layouts always first

    if (filteredNodes.length === 0) return;

    // Clone data for safety because D3 mutates objects
    const nodes: ForceNode[] = filteredNodes.map(n => ({ ...n }) as ForceNode);
    const links: ForceLink[] = filteredLinks.map(l => {
      const s = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const t = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return {
        source: s,
        target: t,
        type: l.type
      } as ForceLink;
    });

    // Main graph group
    const g = svg.append("g").attr("class", "graph-container");

    // Setup Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    zoomRef.current = zoom;

    // Initial centering of SVG container Group elements
    svg.call(zoom.transform, d3.zoomIdentity);

    // Setup Force Directed Simulation
    const simulation = d3.forceSimulation<ForceNode>(nodes)
      .force("link", d3.forceLink<ForceNode, ForceLink>(links)
        .id(d => d.id)
        .distance(d => {
          if (d.type === 'pillar-to-cluster') return 80;
          if (d.type === 'cluster-to-page') return 50;
          return 70;
        })
      )
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(dimensions.width / 2, 250))
      .force("collision", d3.forceCollide<ForceNode>().radius(d => (d.size || 15) + 12));

    // Render Links
    const linkElements = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data<ForceLink>(links)
      .enter()
      .append("line")
      .attr("stroke", d => {
        if (d.type === 'pillar-to-cluster') return "#6366f1"; // Elegant indigo-500 line
        if (d.type === 'cluster-to-page') return "#cbd5e1"; // Clean slate line
        if (d.type === 'recommended-link') return "#10b981"; // Emerald-500 recommendations
        return "#818cf8";
      })
      .attr("stroke-opacity", d => d.type === 'recommended-link' ? 0.9 : 0.7)
      .attr("stroke-width", d => {
        if (d.type === 'pillar-to-cluster') return 2;
        if (d.type === 'recommended-link') return 1.8;
        return 1.3;
      })
      .attr("stroke-dasharray", "4,4"); // Consistent architectural dash spacing

    // Render Nodes
    const nodeElements = g.append("g")
      .attr("class", "nodes")
      .selectAll<SVGGElement, ForceNode>("g")
      .data<ForceNode>(nodes)
      .enter()
      .append("g")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        const originalNode = data.nodes.find(node => node.id === d.id);
        if (originalNode) {
          setSelectedNode(originalNode);
          if (onNodeSelect) onNodeSelect(originalNode);
        }
      })
      .on("mouseover", (event, d) => {
        const originalNode = data.nodes.find(node => node.id === d.id);
        if (originalNode) {
          setHoveredNode(originalNode);
        }
        // Spotlight Neighbors
        const neighborIds = new Set<string>();
        neighborIds.add(d.id);
        links.forEach(l => {
          const sId = typeof l.source === 'object' ? (l.source as any).id : l.source;
          const tId = typeof l.target === 'object' ? (l.target as any).id : l.target;
          if (sId === d.id) neighborIds.add(tId);
          if (tId === d.id) neighborIds.add(sId);
        });

        nodeElements.style("opacity", n => neighborIds.has(n.id) ? 1 : 0.25);
        linkElements.style("opacity", l => {
          const sId = typeof l.source === 'object' ? (l.source as any).id : l.source;
          const tId = typeof l.target === 'object' ? (l.target as any).id : l.target;
          return (sId === d.id || tId === d.id) ? 1 : 0.1;
        });
      })
      .on("mouseout", () => {
        setHoveredNode(null);
        nodeElements.style("opacity", 1);
        linkElements.style("opacity", 0.6);
      })
      .call(d3.drag<SVGGElement, ForceNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    // Node outer styling/glows
    nodeElements.append("circle")
      .attr("r", d => d.size)
      .attr("fill", "#ffffff") // White graph Node fill matching .graph-node exactly!
      .attr("stroke", d => {
        if (d.type === 'pillar') return "#6366f1"; // Core Indigo
        if (d.type === 'cluster') return "#4f46e5"; // Deep Royal 
        if (d.type === 'page') return "#10b981"; // Emerald green
        return "#f59e0b"; // Warning amber
      })
      .attr("stroke-width", d => d.type === 'pillar' ? 3 : 2)
      .attr("filter", "drop-shadow(0px 2.5px 5px rgba(0, 0, 0, 0.08))");

    // Add smaller icon indicators or visual centers inside nodes
    nodeElements.append("circle")
      .attr("r", 3)
      .attr("fill", d => {
        if (d.type === 'pillar') return "#6366f1";
        if (d.type === 'cluster') return "#4f46e5";
        if (d.type === 'page') return "#10b981";
        return "#f59e0b";
      })
      .attr("opacity", 0.9);

    // Add labels
    nodeElements.append("text")
      .attr("dy", d => d.size + 15)
      .attr("text-anchor", "middle")
      .text(d => d.label.length > 25 ? d.label.slice(0, 22) + "..." : d.label)
      .attr("font-family", "ui-sans-serif, system-ui, sans-serif")
      .attr("font-size", d => d.type === 'pillar' ? "12px" : "10px")
      .attr("font-weight", d => d.type === 'pillar' ? "700" : "500")
      .attr("fill", "#1e293b")
      .attr("paint-order", "stroke")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 3);

    // Tick simulation callback
    simulation.on("tick", () => {
      linkElements
        .attr("x1", d => (d.source && typeof d.source === 'object') ? (d.source as any).x ?? 0 : 0)
        .attr("y1", d => (d.source && typeof d.source === 'object') ? (d.source as any).y ?? 0 : 0)
        .attr("x2", d => (d.target && typeof d.target === 'object') ? (d.target as any).x ?? 0 : 0)
        .attr("y2", d => (d.target && typeof d.target === 'object') ? (d.target as any).y ?? 0 : 0);

      nodeElements
        .attr("transform", d => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // Helper drag handlers
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };

  }, [filteredNodes, filteredLinks, dimensions.width, dimensions.height]);

  // Zoom helpers
  const handleZoomIn = () => {
    if (zoomRef.current && svgRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (zoomRef.current && svgRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomRef.current.scaleBy, 0.7);
    }
  };

  const handleResetZoom = () => {
    if (zoomRef.current && svgRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(
        zoomRef.current.transform,
        d3.zoomIdentity
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden" id="site-knowledge-map-panel">
      {/* Visual Workspace Canvas */}
      <div className="lg:col-span-3 flex flex-col relative" ref={containerRef}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-1.5">
              <Layers className="w-5 h-5 text-indigo-600" />
              Topical Architecture Map
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Pillars and cluster hubs arranged semantically. Missing supporting gaps are highlighted in gold. Drag nodes to customize layouts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter tags */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2.5 py-1.5 text-gray-700 font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
            >
              <option value="all">All Nodes</option>
              <option value="pillar">Content Pillars Only</option>
              <option value="cluster">Topic Clusters Only</option>
              <option value="page">Current Pages</option>
              <option value="missing-page">Semantic Gaps (Missing Articles)</option>
            </select>

            {/* Quick search input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                <Search className="h-3.5 w-3.5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search index nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs w-44 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Outer Graph Canvas Wrapper */}
        <div className="relative border border-gray-100 rounded-lg bg-gray-50 flex-1 overflow-hidden" style={{ minHeight: '440px' }} id="interactive-svg-canvas">
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full block"
            style={{ height: `${dimensions.height}px`, minHeight: '440px' }}
          />

          {/* Canvas Floating controls */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1 bg-white p-1.5 shadow-sm rounded-lg border border-gray-200">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
              title="Zoom In"
              id="zoom-in-button"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors"
              title="Zoom Out"
              id="zoom-out-button"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors border-t border-gray-100"
              title="Reset View"
              id="reset-canvas-button"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Color scheme legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-2.5 rounded-lg border border-gray-200 shadow-xs flex flex-col gap-1.5 text-[10px]">
            <span className="font-semibold text-gray-700 tracking-wider uppercase mb-1">Architecture Legend</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 inline-block"></span>
              <span className="text-gray-600 font-medium">Core Content Pillar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-blue-400 inline-block"></span>
              <span className="text-gray-600 font-medium">Topic Cluster Hub</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-300 inline-block"></span>
              <span className="text-gray-600 font-medium">Existing Page (Indexed)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-300 inline-block"></span>
              <span className="text-gray-600 font-medium">Semantic Gap (Create Next)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 border-t-2 border-indigo-500 inline-block"></span>
              <span className="text-gray-600 font-medium font-mono">Internal Anchor Link</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 border-t-2 border-dashed border-emerald-400 inline-block"></span>
              <span className="text-gray-600 font-medium font-mono">Entity Gap Integration</span>
            </div>
          </div>

          {/* Node Hover Tooltip */}
          {hoveredNode && (
            <div className="absolute top-4 right-4 bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-md border border-slate-800 max-w-xs z-30 pointer-events-none animate-fade-in">
              <div className="font-bold flex items-center gap-1">
                {hoveredNode.type === 'pillar' && <Star className="w-3.5 h-3.5 text-yellow-400" />}
                {hoveredNode.type === 'cluster' && <Layers className="w-3.5 h-3.5 text-blue-400" />}
                {hoveredNode.type === 'page' && <FileText className="w-3.5 h-3.5 text-emerald-400" />}
                {hoveredNode.type === 'missing-page' && <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
                {hoveredNode.label}
              </div>
              <div className="capitalize text-[10px] text-slate-400 mt-1">Classification: {hoveredNode.type}</div>
              {hoveredNode.url && <div className="text-[10px] text-indigo-300 truncate mt-0.5">{hoveredNode.url}</div>}
              {hoveredNode.authorityScore && <div className="text-[10px] text-emerald-300 mt-0.5 font-semibold">Authority Strength: {hoveredNode.authorityScore}/100</div>}
            </div>
          )}
        </div>
      </div>

      {/* Details Side Drawer Inspector */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col justify-between" style={{ minHeight: '440px' }} id="node-inspector-drawer">
        <div>
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
            <Settings className="w-4 h-4 text-slate-500 animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Node Inspector</span>
          </div>

          {selectedNode ? (
            <div className="space-y-4 animate-fade-in" id="inspector-selected">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide
                  ${selectedNode.type === 'pillar' ? 'bg-slate-800 text-white' : ''}
                  ${selectedNode.type === 'cluster' ? 'bg-blue-100 text-blue-800' : ''}
                  ${selectedNode.type === 'page' ? 'bg-emerald-100 text-emerald-800' : ''}
                  ${selectedNode.type === 'missing-page' ? 'bg-amber-100 text-amber-800' : ''}
                `}>
                  {selectedNode.type}
                </span>

                {selectedNode.authorityScore !== undefined && (
                  <span className="bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 text-[10px] rounded-sm text-indigo-700 font-semibold">
                    PA: {selectedNode.authorityScore}
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-md font-bold text-gray-900 leading-snug">{selectedNode.label}</h4>
                {selectedNode.url && (
                  <a
                    href={`https://${selectedNode.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 hover:underline truncate block mt-1"
                  >
                    https://{selectedNode.url}
                  </a>
                )}
              </div>

              {selectedNode.type === 'pillar' && (
                <div className="text-xs text-gray-600 leading-relaxed bg-white p-3 rounded-md border border-gray-100">
                  <strong>Content Pillar Status:</strong> This represents a primary conceptual focal point of your domain footprint. Aim to aggregate multiple supportive cluster layers to secure topical credentials.
                </div>
              )}

              {selectedNode.type === 'cluster' && (
                <div className="text-xs text-gray-600 leading-relaxed bg-white p-3 rounded-md border border-gray-100">
                  <strong>Topic Cluster Status:</strong> A collection of sub-topical resources. Maximize outbound contextual internal-links from supportive pages back to this cluster head.
                </div>
              )}

              {selectedNode.type === 'page' && (
                <div className="text-xs text-gray-600 space-y-2 bg-white p-3 rounded-md border border-gray-100">
                  <p><strong>Page Rank Weight:</strong> This is an active child node contributing to your wider semantic relevance in Google Knowledge Graphs.</p>
                  {selectedNode.clusterId && <p className="text-[10px] text-gray-400">Assigned Cluster: {selectedNode.clusterId}</p>}
                </div>
              )}

              {selectedNode.type === 'missing-page' && (
                <div className="text-xs text-gray-600 space-y-2 bg-amber-50/50 p-3 rounded-md border border-amber-100">
                  <p className="text-amber-800 font-semibold flex items-center gap-1 text-[11px]">
                    <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
                    Urgent Creation Recommended
                  </p>
                  <p className="text-xs leading-relaxed text-gray-700">
                    This is a discovered keyword entity gap. Creating context for this node will satisfy Google's information gain standards for the local cluster.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10" id="inspector-placeholder">
              <HelpCircle className="w-10 h-10 text-gray-300 mx-auto stroke-1" />
              <p className="text-xs text-gray-400 mt-2">
                Click any node in the model graph to inspect its semantic authority details, URLs, and next-action optimization checklists.
              </p>
            </div>
          )}
        </div>

        {selectedNode && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setSelectedNode(null)}
              className="text-center w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              Clear Inspector Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
