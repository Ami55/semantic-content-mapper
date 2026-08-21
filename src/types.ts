export interface GraphNode {
  id: string;
  label: string;
  type: 'pillar' | 'cluster' | 'page' | 'missing-page';
  clusterId?: string;
  pillarId?: string;
  size: number;
  val?: number; // for legacy visual systems
  url?: string;
  authorityScore?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'pillar-to-cluster' | 'cluster-to-page' | 'internal-link' | 'recommended-link';
}

export interface SiteKnowledgeMap {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface ClusterDetail {
  id: string;
  name: string;
  associatedPillarId: string;
  pillarStrength: number; // 0-100
  clusterDepth: number; // e.g. 1, 2, 3 layers
  pagesCount: number;
  supportingContent: string[]; // page titles / urls
  missingSupportingContent: string[]; // topics/articles that should exist
  topicalAuthorityScore: number; // 0-100
}

export interface PillarDetail {
  id: string;
  name: string;
  description: string;
  strength: number; // 0-100
  topicalAuthorityScore: number; // 0-100
  clusters: string[]; // cluster IDs
}

export interface SemanticEntity {
  name: string;
  type: string; // e.g. "Brand", "Concept", "Technology", "Person", "Product"
  relevance: number; // 0-100
  salienceScore: number; // 0-100
  isPresent: boolean; // boolean if user's site currently covers it
}

export interface CompetitorComparison {
  name: string;
  domain: string;
  entityCoverageScore: number;
  topEntities: string[];
}

export interface EntityAnalysis {
  coverageScore: number;
  extractedEntities: SemanticEntity[];
  competitors: CompetitorComparison[];
  missingEntities: string[];
}

export interface SemanticGap {
  id: string;
  name: string;
  type: 'concept' | 'attribute' | 'relationship' | 'supporting_topic';
  description: string;
  impactWeight: 'High' | 'Medium' | 'Low';
  associatedEntity?: string;
  recommendedCoverage: string; // Action item
}

export interface HubPage {
  title: string;
  url: string;
  pageAuthority: number; // 0-100
  inboundLinks: number;
  outboundLinks: number;
}

export interface OrphanPage {
  title: string;
  url: string;
  impressionsEstimated?: number;
  actionRequired: string;
}

export interface LinkRecommendation {
  id: string;
  sourceTitle: string;
  sourceUrl: string;
  targetTitle: string;
  targetUrl: string;
  suggestedAnchorText: string;
  reason: string;
}

export interface InternalLinkingAnalysis {
  hubs: HubPage[];
  orphans: OrphanPage[];
  weakClusters: { clusterName: string; connectivityPercent: number; issue: string }[];
  recommendations: LinkRecommendation[];
}

export interface SitewideAuthority {
  overallScore: number; // 0-100
  strengthRating: 'Novice' | 'Emerging Expert' | 'Topical Leader' | 'Niche Monopolist';
  gapToLeaderPercent: number;
  indexingStatus: string;
}

export interface ContentRecommendation {
  id: string;
  title: string;
  concept: string;
  type: 'Quick Win' | 'Cluster Expansion' | 'New Pillar' | 'Missing Page';
  pillarName: string;
  clusterName: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  impact: 'High' | 'Medium' | 'Low';
  entityGain: number; // 0-100 percentage increase
  topicalAuthorityGain: number; // 0-100
}

export interface RoadmapItem {
  id: string;
  phase: 'Next 10 Pages' | 'Next 25 Pages' | 'Next 50 Pages';
  title: string;
  recommendedWordCount: number;
  targetFocusKeys: string[];
  suggestedEntities: string[];
  estimatedImpact: number; // 0-100 scale
  recommendedFormat: string; // e.g., "Deep-Dive Guide", "Comparison Matrix", "Pillar Expansion"
}

export interface SemanticAnalysisReport {
  domain: string;
  competitors: string[];
  sitewideAuthority: SitewideAuthority;
  pillars: PillarDetail[];
  clusters: ClusterDetail[];
  siteKnowledgeMap: SiteKnowledgeMap;
  entityAnalysis: EntityAnalysis;
  semanticGaps: SemanticGap[];
  internalLinking: InternalLinkingAnalysis;
  recommendations: ContentRecommendation[];
  roadmap: RoadmapItem[];
}
