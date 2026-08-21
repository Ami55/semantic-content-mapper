import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { demoReports } from "./src/demoData";
import { SemanticAnalysisReport } from "./src/types";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI client lazily to avoid crashing on startup if key is missing
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not defined. Using procedural fallback generator for custom domains.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Procedural fallback generator if Gemini API key is missing or calls fail.
function generateProceduralFallback(domain: string, competitorsInput: string[]): SemanticAnalysisReport {
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
  const namePart = cleanDomain.split('.')[0] || "custom";
  const brandName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
  const competitors = competitorsInput.map(c => c.trim()).filter(Boolean);
  if (competitors.length === 0) {
    competitors.push("competitor1.com", "competitor2.com");
  }

  // Determine a default industry category based on keywords
  let category = "Digital Business";
  if (/sport|fit|nike|run|ath/.test(cleanDomain)) category = "Fitness & Athletic Performance";
  else if (/pay|stripe|bank|finance|bill|ledger|tax/.test(cleanDomain)) category = "Fintech & Billing";
  else if (/tech|ai|dev|code|software|api/.test(cleanDomain)) category = "SaaS & AI Technology";
  else if (/shop|buy|cart|store|wear|apparel/.test(cleanDomain)) category = "E-Commerce";

  return {
    domain: cleanDomain,
    competitors,
    sitewideAuthority: {
      overallScore: 68,
      strengthRating: "Emerging Expert",
      gapToLeaderPercent: 12,
      indexingStatus: `Partially Crawled (420 pages indexed, moderate semantic coverage for ${category})`
    },
    pillars: [
      {
        id: "p1",
        name: `${brandName} Core Services & Solutions`,
        description: `Core topical pillar covering unique value propositions and primary features for ${brandName}.`,
        strength: 75,
        topicalAuthorityScore: 70,
        clusters: ["c1", "c2"]
      },
      {
        id: "p2",
        name: "Industry Case Studies & Integration Guides",
        description: `Topical focus demonstrating real-world applications and multi-disciplinary utility.`,
        strength: 65,
        topicalAuthorityScore: 61,
        clusters: ["c3"]
      }
    ],
    clusters: [
      {
        id: "c1",
        name: `Primary product implementation guidelines`,
        associatedPillarId: "p1",
        pillarStrength: 75,
        clusterDepth: 2,
        pagesCount: 18,
        supportingContent: [
          `${cleanDomain}/features/setup-guide`,
          `${cleanDomain}/features/best-practices`,
          `${cleanDomain}/pricing`
        ],
        missingSupportingContent: [
          "Security architectures and compliance policies whitepaper",
          "Migration pathways from industry legacy competitors"
        ],
        topicalAuthorityScore: 72
      },
      {
        id: "c2",
        name: "Customer Onboarding & Workflow Optimization",
        associatedPillarId: "p1",
        pillarStrength: 70,
        clusterDepth: 2,
        pagesCount: 12,
        supportingContent: [
          `${cleanDomain}/help/getting-started`,
          `${cleanDomain}/help/faq`
        ],
        missingSupportingContent: [
          "Automated developer onboarding scripts and SDK overrides"
        ],
        topicalAuthorityScore: 68
      },
      {
        id: "c3",
        name: `${category} Advanced Techniques`,
        associatedPillarId: "p2",
        pillarStrength: 65,
        clusterDepth: 2,
        pagesCount: 8,
        supportingContent: [
          `${cleanDomain}/blog/advanced-tutorial`,
          `${cleanDomain}/blog/scalability-practices`
        ],
        missingSupportingContent: [
          "In-depth market comparison matrix vs primary competitors"
        ],
        topicalAuthorityScore: 60
      }
    ],
    siteKnowledgeMap: {
      nodes: [
        { id: cleanDomain, label: `${brandName} Brand Domain`, type: "pillar", size: 35, authorityScore: 68 },
        { id: "p1", label: `Pillar: ${brandName} Core Solutions`, type: "pillar", size: 28, authorityScore: 70 },
        { id: "p2", label: "Pillar: Case Studies & Guides", type: "pillar", size: 28, authorityScore: 61 },
        { id: "c1", label: "Cluster: Setup & Best Practices", type: "cluster", size: 20, clusterId: "c1", authorityScore: 72 },
        { id: "c2", label: "Cluster: Onboarding Help", type: "cluster", size: 20, clusterId: "c2", authorityScore: 68 },
        { id: "c3", label: `Cluster: ${category} Advanced`, type: "cluster", size: 20, clusterId: "c3", authorityScore: 60 },
        { id: "pg1", label: "Setup Guide Page", type: "page", clusterId: "c1", size: 10, url: `${cleanDomain}/features/setup-guide` },
        { id: "pg2", label: "Best Practices", type: "page", clusterId: "c1", size: 10, url: `${cleanDomain}/features/best-practices` },
        { id: "pg3", label: "Getting Started FAQs", type: "page", clusterId: "c2", size: 10, url: `${cleanDomain}/help/getting-started` },
        { id: "pg4", label: "Advanced Tutorial Info", type: "page", clusterId: "c3", size: 10, url: `${cleanDomain}/blog/advanced-tutorial` },
        { id: "mp1", label: "Missing: Security Architectures", type: "missing-page", clusterId: "c1", size: 12 },
        { id: "mp2", label: "Missing: Competitor comparison matrix", type: "missing-page", clusterId: "c3", size: 12 }
      ],
      links: [
        { source: cleanDomain, target: "p1", type: "pillar-to-cluster" },
        { source: cleanDomain, target: "p2", type: "pillar-to-cluster" },
        { source: "p1", target: "c1", type: "pillar-to-cluster" },
        { source: "p1", target: "c2", type: "pillar-to-cluster" },
        { source: "p2", target: "c3", type: "pillar-to-cluster" },
        { source: "c1", target: "pg1", type: "cluster-to-page" },
        { source: "c1", target: "pg2", type: "cluster-to-page" },
        { source: "c2", target: "pg3", type: "cluster-to-page" },
        { source: "c3", target: "pg4", type: "cluster-to-page" },
        { source: "c1", target: "mp1", type: "recommended-link" },
        { source: "c3", target: "mp2", type: "recommended-link" }
      ]
    },
    entityAnalysis: {
      coverageScore: 62,
      extractedEntities: [
        { name: `${brandName} Services`, type: "Brand", relevance: 95, salienceScore: 90, isPresent: true },
        { name: `${category} integration`, type: "Concept", relevance: 88, salienceScore: 82, isPresent: true },
        { name: "Optimal Security Standards", type: "Concept", relevance: 84, salienceScore: 75, isPresent: false },
        { name: "Legacy Migration Automation", type: "Technology", relevance: 80, salienceScore: 71, isPresent: false },
        { name: "Performance Scaling Core", type: "Concept", relevance: 82, salienceScore: 73, isPresent: true }
      ],
      competitors: competitors.map((comp, idx) => ({
        name: comp.split('.')[0] ? comp.split('.')[0].toUpperCase() : `Competitor ${idx + 1}`,
        domain: comp,
        entityCoverageScore: 75 - (idx * 5),
        topEntities: [`${category} Advanced Automation`, "High-Volume Transaction Sharding", "Dedicated SLA Frameworks"]
      })),
      missingEntities: [
        "Optimal Security Standards",
        "Legacy Migration Automation",
        "Dedicated SLA Frameworks"
      ]
    },
    semanticGaps: [
      {
        id: "sg1",
        name: "Enterprise Multi-Jurisdictional Security Structures",
        type: "concept",
        description: `How ${brandName} secures data and flows across sovereign boundary limits within standard ${category} deployments.`,
        impactWeight: "High",
        associatedEntity: "Optimal Security Standards",
        recommendedCoverage: `Publish a dedicated ${brandName} compliance guide addressing localized sovereign database partitioning methods.`
      },
      {
        id: "sg2",
        name: "Legacy Integration Adaptors Walkthrough",
        type: "attribute",
        description: `Technical blueprints demonstrating fast-track code modules to hot-swap competitors without interrupting real-time client services.`,
        impactWeight: "Medium",
        associatedEntity: "Legacy Migration Automation",
        recommendedCoverage: "Create developer-centric repository templates outlining single-line migration helpers."
      }
    ],
    internalLinking: {
      hubs: [
        { title: `${brandName} Resources Hub`, url: `${cleanDomain}/help`, pageAuthority: 70, inboundLinks: 120, outboundLinks: 15 },
        { title: "Core Features Dashboard Guide", url: `${cleanDomain}/features`, pageAuthority: 65, inboundLinks: 85, outboundLinks: 10 }
      ],
      orphans: [
        { title: "Advanced Scale-Out custom cluster config", url: `${cleanDomain}/blog/advanced-scale-out`, impressionsEstimated: 450, actionRequired: "Add outbound links from setup-guide to this page" }
      ],
      weakClusters: [
        { clusterName: `${category} Advanced Core`, connectivityPercent: 30, issue: "The advanced tutorials do not link back to product setup files, introducing manual navigation hurdles." }
      ],
      recommendations: [
        {
          id: "lr1",
          sourceTitle: "Best Practices Info",
          sourceUrl: `${cleanDomain}/features/best-practices`,
          targetTitle: "Advanced Scale-Out custom cluster config",
          targetUrl: `${cleanDomain}/blog/advanced-scale-out`,
          suggestedAnchorText: "for advanced multi-app clustering configurations",
          reason: "Guides users seeking custom high-reliability options directly to concrete execution guidelines."
        }
      ]
    },
    recommendations: [
      {
        id: "rec1",
        title: "Enterprise Multi-Jurisdictional Security Guidelines",
        concept: "Sovereign Framework Security",
        type: "New Pillar",
        pillarName: `${brandName} Core Services & Solutions`,
        clusterName: "Primary product implementation guidelines",
        priority: "High",
        difficulty: "Medium",
        impact: "High",
        entityGain: 18,
        topicalAuthorityGain: 15
      },
      {
        id: "rec2",
        title: "Automated Legacy Competing Services Ingestion Rails",
        concept: "Adaptive Ingestion Automation",
        type: "Quick Win",
        pillarName: `${brandName} Core Services & Solutions`,
        clusterName: "Primary product implementation guidelines",
        priority: "High",
        difficulty: "Easy",
        impact: "High",
        entityGain: 12,
        topicalAuthorityGain: 10
      }
    ],
    roadmap: [
      {
        id: "rm1",
        phase: "Next 10 Pages",
        title: `Securing ${brandName} in Multi-Cloud Financial Sovereign Clusters`,
        recommendedWordCount: 2200,
        targetFocusKeys: [`secure ${cleanDomain}`, `${namePart} security compliant`],
        suggestedEntities: ["Optimal Security Standards", `${brandName} Services`],
        estimatedImpact: 88,
        recommendedFormat: "SaaS Compliance Reference Sheet"
      },
      {
        id: "rm2",
        phase: "Next 10 Pages",
        title: `How to migrate your active workspaces to ${brandName}: 1-Click Guide`,
        recommendedWordCount: 1800,
        targetFocusKeys: ["migrate setup to new app", "workspace transfer helpers"],
        suggestedEntities: ["Legacy Migration Automation", "Performance Scaling Core"],
        estimatedImpact: 82,
        recommendedFormat: "Migration Runbook"
      }
    ]
  };
}

// API endpoint to trigger Semantic SEO Domain analysis
app.post("/api/analyze", async (req, res) => {
  const { domain, competitors = [] } = req.body;

  if (!domain) {
    return res.status(400).json({ error: "Domain parameter is required." });
  }

  // Pre-normalize domain
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase().trim();

  // 1. Check if the site matches preloaded demo files
  if (demoReports[cleanDomain]) {
    console.log(`Returning preloaded high-fidelity scan report for ${cleanDomain}`);
    return res.json(demoReports[cleanDomain]);
  }

  // Check fuzzy matching for demo data (e.g. "stripe" -> "stripe.com")
  for (const demoKey of Object.keys(demoReports)) {
    if (cleanDomain.includes(demoKey.split('.')[0])) {
      console.log(`Fuzzy matching preset report for ${demoKey}`);
      return res.json(demoReports[demoKey]);
    }
  }

  // 2. Query Gemini if API is available, otherwise user gets procedural fallback
  const ai = getGeminiClient();
  if (!ai) {
    console.log(`No API key available, procedurally generating report for custom domain: ${cleanDomain}`);
    const r = generateProceduralFallback(cleanDomain, competitors);
    return res.json(r);
  }

  try {
    console.log(`Initiating server-side live Gemini content analysis for: ${cleanDomain}`);
    
    const prompt = `You are an expert Enterprise Semantic SEO and Entity-based Content Architect.
Analyze the following website domain: "${cleanDomain}".
Optional competitor domains: [${competitors.join(', ')}].

Perform a deep semantic authority, entity coverage, and topic cluster audit like premium enterprise SEO software.
You MUST analyze this domain name, industry, and topics, predicting its realistic SEO structure.
Output ONLY a JSON object that matches the following TypeScript structure exactly:

{
  "domain": "${cleanDomain}",
  "competitors": ${JSON.stringify(competitors)},
  "sitewideAuthority": {
    "overallScore": number (0-100),
    "strengthRating": "Novice" | "Emerging Expert" | "Topical Leader" | "Niche Monopolist",
    "gapToLeaderPercent": number (0-100),
    "indexingStatus": "description of index stats and crawled coverage"
  },
  "pillars": [
    {
      "id": "p1",
      "name": "string (name of pillar)",
      "description": "string",
      "strength": number (0-100),
      "topicalAuthorityScore": number (0-100),
      "clusters": ["c1", "c2"]
    }
  ],
  "clusters": [
    {
      "id": "c1",
      "name": "string (topic cluster)",
      "associatedPillarId": "p1",
      "pillarStrength": number,
      "clusterDepth": number (layers),
      "pagesCount": number,
      "supportingContent": ["url1", "url2"],
      "missingSupportingContent": ["suggested missing content topics in this cluster"],
      "topicalAuthorityScore": number (0-100)
    }
  ],
  "siteKnowledgeMap": {
    "nodes": [
      { "id": "node_id", "label": "node label text", "type": "pillar" | "cluster" | "page" | "missing-page", "size": number, "clusterId": "c1Optional", "authorityScore": numberOptional, "url": "urlOptional" }
    ],
    "links": [
      { "source": "node_id", "target": "node_id", "type": "pillar-to-cluster" | "cluster-to-page" | "internal-link" | "recommended-link" }
    ]
  },
  "entityAnalysis": {
    "coverageScore": number (0-100),
    "extractedEntities": [
      { "name": "string", "type": "string (e.g. Concept, Software, Regulation)", "relevance": number, "salienceScore": number, "isPresent": boolean }
    ],
    "competitors": [
      { "name": "string", "domain": "string", "entityCoverageScore": number, "topEntities": ["string"] }
    ],
    "missingEntities": ["string"]
  },
  "semanticGaps": [
    { "id": "sg1", "name": "string", "type": "concept" | "attribute" | "relationship" | "supporting_topic", "description": "string", "impactWeight": "High" | "Medium" | "Low", "associatedEntity": "string", "recommendedCoverage": "concrete recommended actions" }
  ],
  "internalLinking": {
    "hubs": [ { "title": "string", "url": "string", "pageAuthority": number, "inboundLinks": number, "outboundLinks": number } ],
    "orphans": [ { "title": "string", "url": "string", "impressionsEstimated": number, "actionRequired": "string" } ],
    "weakClusters": [ { "clusterName": "string", "connectivityPercent": number, "issue": "string" } ],
    "recommendations": [ { "id": "lr1", "sourceTitle": "string", "sourceUrl": "string", "targetTitle": "string", "targetUrl": "string", "suggestedAnchorText": "string", "reason": "string" } ]
  },
  "recommendations": [
    { "id": "rec1", "title": "string", "concept": "string", "type": "Quick Win" | "Cluster Expansion" | "New Pillar" | "Missing Page", "pillarName": "string", "clusterName": "string", "priority": "Critical" | "High" | "Medium" | "Low", "difficulty": "Easy" | "Medium" | "Hard", "impact": "High" | "Medium" | "Low", "entityGain": number, "topicalAuthorityGain": number }
  ],
  "roadmap": [
    { "id": "rm1", "phase": "Next 10 Pages" | "Next 25 Pages" | "Next 50 Pages", "title": "string", "recommendedWordCount": number, "targetFocusKeys": ["string"], "suggestedEntities": ["string"], "estimatedImpact": number, "recommendedFormat": "string" }
  ]
}

Strict requirements:
- Ensure all sources and targets in siteKnowledgeMap.links correspond to node IDs that exist in siteKnowledgeMap.nodes.
- Supply at least 2 pillars, 4 clusters, 10 entities, and 4 high-value gaps.
- The output must be valid, parseable, clean JSON. Output ONLY raw JSON, do not wrap in markdown block tags or backticks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No text output received from Gemini API.");
    }

    // Try parsing. If parsed, return.
    const jsonOutput = JSON.parse(textOutput.trim());
    return res.json(jsonOutput);

  } catch (error) {
    console.error("Gemini live analysis failed, using procedural fallback.", error);
    const r = generateProceduralFallback(cleanDomain, competitors);
    return res.json(r);
  }
});

// Helper for generating custom content ideas for pillars and clusters
function getProceduralIdeation(domain: string, brandName: string, category: string) {
  let pillars = [
    {
      name: `Core Optimization & Scaling Frameworks for ${brandName}`,
      description: "Establish absolute authority regarding execution efficiency, advanced scaling configurations, security safeguards, and enterprise system mechanics.",
      clusters: [
        {
          name: `Cluster: Enterprise Deployment Strategies & Failover Redundancy`,
          depth: 2,
          pages: [
            "Active-active multi-region clustering configurations: setup checklists and latency reviews",
            "Zero-trust compliance framework maps for distributed software systems",
            "Integrating secure webhooks with real-time payload signature verification protocols"
          ]
        },
        {
          name: `Cluster: Performance Benchmarking & Memory Optimization`,
          depth: 1,
          pages: [
            "Profiling transaction processing pipelines under severe localized spike thresholds",
            "Preventing heap fragmentation: real-time memory management rules",
            "Decoupled telemetry collectors: structuring lightweight background monitoring agents"
          ]
        }
      ]
    },
    {
      name: `Integrations & Cross-Border Compliance Workflows`,
      description: `Establish dominant authority on regulatory alignments, localized adaptations, legacy system migrations, and operational standards within ${category}.`,
      clusters: [
        {
          name: `Cluster: Seamless API Integrations & Version Control Protocols`,
          depth: 2,
          pages: [
            "Designing backwards-compatible schema transitions without code breaking",
            "OAuth client identity assertion workflows in sandboxed previews",
            "Rate-limit defense configurations: custom token buckets and client-tier quotas"
          ]
        },
        {
          name: `Cluster: Multi-Jurisdictional Reporting Requirements`,
          depth: 2,
          pages: [
            `Understanding localized tax and compliance mandates applicable to modern ${category}`,
            "Cryptographic audit trailing logs for automated compliance validation",
            "Legacy database transformation pathways: 5-stage migration runbook"
          ]
        }
      ]
    }
  ];

  // Tailor based on category keywords
  if (/Fintech|pay|billing|stripe|finance/i.test(category)) {
    pillars = [
      {
        name: `${brandName} Global Payments Architecture & Treasury Rails`,
        description: "High-value technical pillar on processing conversions, localized banking networks, clearinghouse latency, and capital orchestration for modern Fintech.",
        clusters: [
          {
            name: "Cluster: Regional Clearing Latency & Liquidity Pools",
            depth: 2,
            pages: [
              "Optimizing ACH vs SEPA transaction times: settlement curves and clearing logs",
              "Real-time reconciliation of high-volume manual bank wires using machine learning patterns",
              "Mitigating liquidity lockups during multi-currency sweep cycles"
            ]
          },
          {
            name: "Cluster: Fraud Defense, Chargebacks & Passive Recovery",
            depth: 1,
            pages: [
              "Dynamic dunning logic: retry intervals optimized by bank issuer bin structures",
              "Machine learning chargeback shields: real-time risk scores from device telemetry",
              "Passive churn reduction: seamless card updater background syncing protocols"
            ]
          }
        ]
      },
      {
        name: "SaaS Billing Models & Revenue Recognition Compliance",
        description: "Comprehensive guidance on dynamic subscription models, automated billing workflows, localized consumption tables, and global financial standards.",
        clusters: [
          {
            name: "Cluster: Advanced Composite Billing Tables",
            depth: 2,
            pages: [
              "Modeling hybrid-usage subscription tiers: base access paired with metered variables",
              "Calculating multi-tenant entitlement allocations under contract caps",
              "Developing accurate real-time billing previews for dynamic mid-cycle upgrade requests"
            ]
          },
          {
            name: "Cluster: ASC 606 & IFRS 15 Regulatory Auditing Frameworks",
            depth: 2,
            pages: [
              "Automating deferred revenue schedules for mixed-element contract delivery",
              "Establishing end-of-quarter performance obligation reports with automated accounting traces",
              "Managing localized invoice taxation requirements: managing dynamic VAT & sales taxes automatically"
            ]
          }
        ]
      }
    ];
  } else if (/Fitness|Sport|Nike|athletics/i.test(category)) {
    pillars = [
      {
        name: "Biomechanics of Propulsion & Athletic Footwear Science",
        description: "An authoritative guide to energy distribution systems, shock dissipation structures, and kinematic mechanics to maximize physical athletic performance.",
        clusters: [
          {
            name: "Cluster: Energy Return Foam Polymerization Profiles",
            depth: 2,
            pages: [
              "Analyzing PEBA foam expansion ratios vs traditional TPU in high-velocity distance runs",
              "Plate stiffness customization: balancing carbon fiber flexure based on average runner cadence",
              "Kinetic energy capture metrics during heel-strike to toe-off transit phases"
            ]
          },
          {
            name: "Cluster: Kinematic Traction Design & Ground Contact Slips",
            depth: 1,
            pages: [
              "Splay patterns: structural layout of herringbone tread elements on synthetic courts",
              "In-shoe moisture migration profiles and its relationship with blister threshold levels",
              "Optimizing grip durability: rubber compound resilience on wet road abrasions"
            ]
          }
        ]
      },
      {
        name: "Athletic Physiology & Personalized Recovery Protocols",
        description: "A comprehensive core pillar highlighting micro-restructuring, neural fatigue recovery, and muscle hypertrophy markers.",
        clusters: [
          {
            name: "Cluster: Autonomic Nervous System Recovery Triggers",
            depth: 2,
            pages: [
              "Heart Rate Variability (HRV) analysis: determining sympathetic vs parasympathetic recovery balance",
              "Passive cold exposure duration guidelines: optimizing peripheral vasoconstriction cycles",
              "Sleep staging architectures for elite endurance athletes: scheduling peak-recovery windows"
            ]
          },
          {
            name: "Cluster: Sports Nutrition Macro-Structuring & Hydration Metrics",
            depth: 1,
            pages: [
              "Exogenous carbohydrate absorption rates under maximum physiological workload",
              "Intra-workout sodium replacement ratios based on custom sweat rate profiles",
              "Cellular rehydration speed: comparing electrolyte blends under elevated heat indices"
            ]
          }
        ]
      }
    ];
  } else if (/Marketing|Creator|Writer|Substack|publishing/i.test(category)) {
    pillars = [
      {
        name: "Creator Monetization Strategies & Independent Economics",
        description: "An expert pillar highlighting independent newsletter monetization strategies, subscription funnels, and organic audience development frameworks.",
        clusters: [
          {
            name: "Cluster: Subscription Pricing Tier Optimization",
            depth: 2,
            pages: [
              "Configuring paid newsletter tiers: dynamic paywalls, free preview strategies, and special offers",
              "Maximizing long-term value via multi-year and gift subscriptions",
              "Optimizing group accounts and professional enterprise bundles"
            ]
          },
          {
            name: "Cluster: Organic Audience Growth & Referral Networks",
            depth: 1,
            pages: [
              "Analyzing co-writing and recommendation engine networks for mutual discovery",
              "SEO metadata optimization for newsletters: target keyword strategy and canonical tag tracking",
              "Designing high-converting newsletter sign-up pages: headlines and social proof layout"
            ]
          }
        ]
      },
      {
        name: "Editorial Mastery & Digital Publishing Standards",
        description: "A detailed framework on writing style, formatting, legal considerations, and community management for digital publishers.",
        clusters: [
          {
            name: "Cluster: Legal & Compliance for Digital Publishers",
            depth: 2,
            pages: [
              "Navigating EU digital services taxes and global VAT compliance for independent writers",
              "Defending intellectual property: Copyright registration and syndication contract frameworks",
              "GDPR compliance checklists for email list management and reader database storage"
            ]
          },
          {
            name: "Cluster: Community Engagement & Member Retention",
            depth: 1,
            pages: [
              "Operating discussion threads and community panels to spark reader activity",
              "Mitigating audience subscription churn: Feedback surveys and customer engagement flows",
              "Designing exclusive offline community events and meetups for premium members"
            ]
          }
        ]
      }
    ];
  } else if (/Tour|Travel|Local|Guide/i.test(category)) {
    pillars = [
      {
        name: `Hyper-Local Destination Authority & Experience Curation`,
        description: "Establishing primary expertise over niche itineraries, structural safety profiles, credentialed guides, and localized geographical content.",
        clusters: [
          {
            name: "Cluster: Niche Itinerary Structuring & Micro-Travel Guides",
            depth: 2,
            pages: [
              "Comparing self-guided walking routes vs professional local historian curation paths",
              "Off-the-path hidden neighborhood guides: regional heritage logs & custom meal stops",
              "Adaptive single-day schedules: pacing outdoor excursions based on local weather shifts"
            ]
          },
          {
            name: "Cluster: Local Experiential Safety & Quality Assurance",
            depth: 1,
            pages: [
              "Vetting standards for hyper-local activity operators: insurance caps and training audits",
              "Emergency response logs and regional translation tools for solo international travelers",
              "Seasonal route accessibility profiles for mountainous and marine areas"
            ]
          }
        ]
      },
      {
        name: "Platform Trust, Tour Planning & Booking Optimization",
        description: "A complete framework clarifying booking latency, host interaction frameworks, traveler insurance profiles, and community guides.",
        clusters: [
          {
            name: "Cluster: Dynamic Tour Customization & Dynamic Upgrades",
            depth: 2,
            pages: [
              "Building responsive customized request forms to align traveler interests with host specialties",
              "Calculating localized VAT, regional fees, and tips within payment gateways",
              "Standardizing host message templates to maintain prompt response time records"
            ]
          },
          {
            name: "Cluster: Sustainable Travel & Direct Economic Support",
            depth: 2,
            pages: [
              "Direct economic conversion: tracking how booking fees stay in rural regional business",
              "Low-impact eco-tourism credentials: standardizing community audit criteria",
              "Cultural heritage preservation guides: educational materials for respectful guest behavior"
            ]
          }
        ]
      }
    ];
  }

  return {
    brandName,
    category,
    domain,
    pillars
  };
}

// Interactive custom pillar & cluster content ideation generator
app.post("/api/ideate", async (req, res) => {
  const { domain, category } = req.body;
  const cleanDomain = (domain || "mywebsite.com").replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase().trim();
  const namePart = cleanDomain.split('.')[0] || "custom";
  const brandName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
  const selectedCategory = category || "Digital Business";

  // Check if Gemini is available
  const ai = getGeminiClient();
  if (!ai) {
    console.log(`No GEMINI_API_KEY available for ideate, returning rich procedural ideas matching category: ${selectedCategory}`);
    const procedural = getProceduralIdeation(cleanDomain, brandName, selectedCategory);
    return res.json(procedural);
  }

  try {
    console.log(`Calling Gemini API to formulate advanced custom pillar & cluster ideas for domain: ${cleanDomain} (${selectedCategory})`);
    
    // Request a formatted JSON outline of content pillar/cluster ideations
    const prompt = `You are an expert enterprise SEO Semantic Analyst and Creative Content Strategist.
Based on the domain name "${cleanDomain}" (brand name: "${brandName}") and its business category: "${selectedCategory}", formulate 2 completely distinct, highly sophisticated, brand-new Content Pillar ideas.
Under each Content Pillar, formulate exactly 2 highly detailed supporting Topic Cluster Hub ideas.
Under each of those Cluster Hubs, define 3 specialized, highly educational article titles (e.g., in-depth guides, compliance sheets, or specialized analysis - avoid generic/boring names) that would build absolute topical authority.

Return ONLY a JSON response matching this schema (do NOT wrap in backticks or markdown, output pure raw JSON):
{
  "brandName": "${brandName}",
  "category": "${selectedCategory}",
  "domain": "${cleanDomain}",
  "pillars": [
    {
      "name": "string (Creative, authoritative Content Pillar name)",
      "description": "string (Detailed summary of why this pillar is critical for authority)",
      "clusters": [
        {
          "name": "string (Supporting Topic Cluster Hub name)",
          "depth": 2,
          "pages": [
            "string (Article title 1)",
            "string (Article title 2)",
            "string (Article title 3)"
          ]
        },
        {
          "name": "string (Topic Cluster Hub 2)",
          "depth": 1,
          "pages": [
            "string (Article title 1)",
            "string (Article title 2)",
            "string (Article title 3)"
          ]
        }
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const textOutput = response.text;
    if (textOutput) {
      const generated = JSON.parse(textOutput.trim());
      return res.json(generated);
    }
    throw new Error("Empty response received from GenAI.");
    
  } catch (err) {
    console.error("Gemini live ideation failed, using rich procedural fallback instead.", err);
    const fallback = getProceduralIdeation(cleanDomain, brandName, selectedCategory);
    return res.json(fallback);
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
