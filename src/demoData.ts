import { SemanticAnalysisReport } from './types';

export const demoReports: Record<string, SemanticAnalysisReport> = {
  "stripe.com": {
    domain: "stripe.com",
    competitors: ["adyen.com", "paypal.com", "checkout.com"],
    sitewideAuthority: {
      overallScore: 94,
      strengthRating: "Niche Monopolist",
      gapToLeaderPercent: 0,
      indexingStatus: "Fully Crawled (8,420 pages indexed, high-efficiency semantic layout)"
    },
    pillars: [
      {
        id: "p1",
        name: "Global Payments infrastructure",
        description: "Payment processing, gateway components, and dynamic checkout solutions across global regions.",
        strength: 96,
        topicalAuthorityScore: 95,
        clusters: ["c1", "c2", "c3"]
      },
      {
        id: "p2",
        name: "Developer Platform & API Architecture",
        description: "Developer experience, documentation integration, SDK support, and webhook processing systems.",
        strength: 98,
        topicalAuthorityScore: 97,
        clusters: ["c4", "c5"]
      },
      {
        id: "p3",
        name: "Enterprise Revenue & Operations",
        description: "Subscription billing management, financial ledger systems, tax compliance, and automated spending tools.",
        strength: 84,
        topicalAuthorityScore: 81,
        clusters: ["c6", "c7", "c8"]
      }
    ],
    clusters: [
      {
        id: "c1",
        name: "Alternative Payment Methods (APMs)",
        associatedPillarId: "p1",
        pillarStrength: 95,
        clusterDepth: 3,
        pagesCount: 64,
        supportingContent: [
          "stripe.com/payments/payment-methods-guide",
          "stripe.com/payments/ach-direct-debit",
          "stripe.com/payments/sepa-credit-transfer",
          "stripe.com/payments/pix-brazil",
          "stripe.com/payments/ideal-netherlands",
          "stripe.com/payments/sofort-europe",
          "stripe.com/payments/digital-wallets-guide"
        ],
        missingSupportingContent: [
          "Local payment preferences in South-East Asia (GoPay, ShopeePay deep-dive)",
          "Cross-border currency conversion fees optimization strategies for high-volume traders",
          "Detailed regional compliance profiles for Middle East APMs"
        ],
        topicalAuthorityScore: 92
      },
      {
        id: "c2",
        name: "Subscription Billing & Invoicing",
        associatedPillarId: "p3",
        pillarStrength: 88,
        clusterDepth: 4,
        pagesCount: 112,
        supportingContent: [
          "stripe.com/billing",
          "stripe.com/billing/recurring-invoices",
          "stripe.com/billing/customer-portal",
          "stripe.com/billing/usage-rate-billing",
          "stripe.com/billing/revenue-recognition",
          "stripe.com/billing/dunning-management-guide"
        ],
        missingSupportingContent: [
          "Hybrid seat-based + usage billing architecture models",
          "Multi-tenant billing isolation patterns in Kubernetes-based SaaS environments",
          "Dunning cycle response rates by SaaS vertical case study"
        ],
        topicalAuthorityScore: 89
      },
      {
        id: "c3",
        name: "Fraud Mitigation & AI Radar",
        associatedPillarId: "p1",
        pillarStrength: 91,
        clusterDepth: 2,
        pagesCount: 41,
        supportingContent: [
          "stripe.com/radar",
          "stripe.com/radar/disputes-chargebacks-management",
          "stripe.com/radar/fraud-scoring-machine-learning",
          "stripe.com/radar/3d-secure-2-guide",
          "stripe.com/radar/radar-rules-customization"
        ],
        missingSupportingContent: [
          "Biometric fraud scoring developments and passive network indicators",
          "Merchant chargeback defense strategies for high-frequency low-ticket micro-transactions",
          "Comparison of machine learning risk signals vs legacy fixed rulesets"
        ],
        topicalAuthorityScore: 88
      },
      {
        id: "c4",
        name: "SDKs, Modules & Elements",
        associatedPillarId: "p2",
        pillarStrength: 98,
        clusterDepth: 3,
        pagesCount: 154,
        supportingContent: [
          "stripe.com/docs/elements",
          "stripe.com/docs/libraries-sdk",
          "stripe.com/docs/js",
          "stripe.com/docs/react-stripe-js",
          "stripe.com/docs/ios",
          "stripe.com/docs/android",
          "stripe.com/docs/webhooks"
        ],
        missingSupportingContent: [
          "Flutter Elements custom layout override recipes",
          "Web components native integration without framework wrappers for micro-frontends",
          "Optimizing bundle sizes for stripe-react on mobile network constraints"
        ],
        topicalAuthorityScore: 96
      },
      {
        id: "c5",
        name: "API Versioning & Developer Playground",
        associatedPillarId: "p2",
        pillarStrength: 97,
        clusterDepth: 2,
        pagesCount: 88,
        supportingContent: [
          "stripe.com/docs/api",
          "stripe.com/docs/api/versioning",
          "stripe.com/docs/cli",
          "stripe.com/docs/webhooks/signatures",
          "stripe.com/docs/testing-payments"
        ],
        missingSupportingContent: [
          "Automated OpenAPI schema code generation pipelines with TypeScript strict typings",
          "How Stripe handles backwards-compatible schema upgrades at scale architecture review"
        ],
        topicalAuthorityScore: 95
      },
      {
        id: "c6",
        name: "Corporate Formation & Atlas",
        associatedPillarId: "p3",
        pillarStrength: 82,
        clusterDepth: 2,
        pagesCount: 38,
        supportingContent: [
          "stripe.com/atlas",
          "stripe.com/atlas/incorporate-delaware",
          "stripe.com/atlas/us-company-taxes-foreign-founders",
          "stripe.com/atlas/stock-issuance-founders"
        ],
        missingSupportingContent: [
          "Post-incorporation board resolution templates for secondary funding rounds",
          "Understanding section 83(b) tax elections for early company hires",
          "Delaware franchise tax filing walkthrough with specific exemption examples"
        ],
        topicalAuthorityScore: 78
      },
      {
        id: "c7",
        name: "Global Tax & Sales Compliance",
        associatedPillarId: "p3",
        pillarStrength: 85,
        clusterDepth: 3,
        pagesCount: 52,
        supportingContent: [
          "stripe.com/tax",
          "stripe.com/tax/vat-obligations-digital-goods",
          "stripe.com/tax/sales-tax-thresholds-nexus",
          "stripe.com/tax/calculating-tax-automatically"
        ],
        missingSupportingContent: [
          "Corporate tax compliance when selling SaaS in South American jurisdictions",
          "Reconciling multi-source sales tax computations with local ledger systems"
        ],
        topicalAuthorityScore: 82
      },
      {
        id: "c8",
        name: "Financial Ledgers & Treasury Management",
        associatedPillarId: "p3",
        pillarStrength: 79,
        clusterDepth: 2,
        pagesCount: 22,
        supportingContent: [
          "stripe.com/treasury",
          "stripe.com/issuing",
          "stripe.com/issuing/program-management"
        ],
        missingSupportingContent: [
          "Multi-currency liquidity banking structures for SaaS conglomerates",
          "Automated balance sweeping techniques for optimized corporate treasury yields",
          "Lending programs architecture utilizing stripe capital telemetry models"
        ],
        topicalAuthorityScore: 75
      }
    ],
    siteKnowledgeMap: {
      nodes: [
        { id: "stripe.com", label: "Stripe Brand Domain", type: "pillar", size: 35, authorityScore: 94 },
        { id: "p1", label: "Pillar: Global Payments", type: "pillar", size: 28, authorityScore: 95 },
        { id: "p2", label: "Pillar: Developer Platform", type: "pillar", size: 28, authorityScore: 97 },
        { id: "p3", label: "Pillar: Enterprise Ops", type: "pillar", size: 28, authorityScore: 81 },
        { id: "c1", label: "Cluster: Payment Methods", type: "cluster", size: 20, clusterId: "c1", authorityScore: 92 },
        { id: "c2", label: "Cluster: Subscription Billing", type: "cluster", size: 20, clusterId: "c2", authorityScore: 89 },
        { id: "c3", label: "Cluster: Fraud & AI Radar", type: "cluster", size: 20, clusterId: "c3", authorityScore: 88 },
        { id: "c4", label: "Cluster: SDKs & Elements", type: "cluster", size: 20, clusterId: "c4", authorityScore: 96 },
        { id: "c5", label: "Cluster: API Versioning", type: "cluster", size: 20, clusterId: "c5", authorityScore: 95 },
        { id: "c6", label: "Cluster: Corporate Atlas", type: "cluster", size: 20, clusterId: "c6", authorityScore: 78 },
        { id: "c7", label: "Cluster: Tax & Compliance", type: "cluster", size: 20, clusterId: "c7", authorityScore: 82 },
        { id: "c8", label: "Cluster: Financial Ledgers", type: "cluster", size: 20, clusterId: "c8", authorityScore: 75 },
        { id: "pg1", label: "Payment Methods Guide", type: "page", clusterId: "c1", size: 10, url: "stripe.com/payments/payment-methods-guide" },
        { id: "pg2", label: "ACH Direct Debit", type: "page", clusterId: "c1", size: 10, url: "stripe.com/payments/ach-direct-debit" },
        { id: "pg3", label: "Recurring Invoices", type: "page", clusterId: "c2", size: 10, url: "stripe.com/billing/recurring-invoices" },
        { id: "pg4", label: "Disputes Management", type: "page", clusterId: "c3", size: 10, url: "stripe.com/radar/disputes-chargebacks-management" },
        { id: "pg5", label: "React Stripe JS Docs", type: "page", clusterId: "c4", size: 10, url: "stripe.com/docs/react-stripe-js" },
        { id: "pg6", label: "API Versioning Specs", type: "page", clusterId: "c5", size: 10, url: "stripe.com/docs/api/versioning" },
        { id: "pg7", label: "Incorporate in Delaware", type: "page", clusterId: "c6", size: 10, url: "stripe.com/atlas/incorporate-delaware" },
        { id: "pg8", label: "VAT digital goods rules", type: "page", clusterId: "c7", size: 10, url: "stripe.com/tax/vat-obligations-digital-goods" },
        { id: "pg9", label: "Issuing API program", type: "page", clusterId: "c8", size: 10, url: "stripe.com/issuing" },
        { id: "mp1", label: "Missing: GoPay / ShopeePay SEA Guide", type: "missing-page", clusterId: "c1", size: 12 },
        { id: "mp2", label: "Missing: Multi-Tenant Billing Isolation Patterns", type: "missing-page", clusterId: "c2", size: 12 },
        { id: "mp3", label: "Missing: Passive Biometrics scoring guide", type: "missing-page", clusterId: "c3", size: 12 }
      ],
      links: [
        { source: "stripe.com", target: "p1", type: "pillar-to-cluster" },
        { source: "stripe.com", target: "p2", type: "pillar-to-cluster" },
        { source: "stripe.com", target: "p3", type: "pillar-to-cluster" },
        { source: "p1", target: "c1", type: "pillar-to-cluster" },
        { source: "p3", target: "c2", type: "pillar-to-cluster" },
        { source: "p1", target: "c3", type: "pillar-to-cluster" },
        { source: "p2", target: "c4", type: "pillar-to-cluster" },
        { source: "p2", target: "c5", type: "pillar-to-cluster" },
        { source: "p3", target: "c6", type: "pillar-to-cluster" },
        { source: "p3", target: "c7", type: "pillar-to-cluster" },
        { source: "p3", target: "c8", type: "pillar-to-cluster" },
        { source: "c1", target: "pg1", type: "cluster-to-page" },
        { source: "c1", target: "pg2", type: "cluster-to-page" },
        { source: "c2", target: "pg3", type: "cluster-to-page" },
        { source: "c3", target: "pg4", type: "cluster-to-page" },
        { source: "c4", target: "pg5", type: "cluster-to-page" },
        { source: "c5", target: "pg6", type: "cluster-to-page" },
        { source: "c6", target: "pg7", type: "cluster-to-page" },
        { source: "c7", target: "pg8", type: "cluster-to-page" },
        { source: "c8", target: "pg9", type: "cluster-to-page" },
        { source: "c1", target: "mp1", type: "recommended-link" },
        { source: "c2", target: "mp2", type: "recommended-link" },
        { source: "c3", target: "mp3", type: "recommended-link" },
        { source: "pg5", target: "pg6", type: "internal-link" },
        { source: "pg3", target: "pg1", type: "internal-link" }
      ]
    },
    entityAnalysis: {
      coverageScore: 86,
      extractedEntities: [
        { name: "Payment Processor", type: "Concept", relevance: 98, salienceScore: 95, isPresent: true },
        { name: "SaaS Subscription Engine", type: "Concept", relevance: 92, salienceScore: 90, isPresent: true },
        { name: "Delaware C-Corp", type: "Concept", relevance: 86, salienceScore: 78, isPresent: true },
        { name: "PSD2 / SCA Compliance", type: "Regulation", relevance: 94, salienceScore: 91, isPresent: true },
        { name: "Merchant Account Management", type: "Concept", relevance: 88, salienceScore: 84, isPresent: true },
        { name: "Machine Learning Fraud Detection", type: "Technology", relevance: 90, salienceScore: 85, isPresent: true },
        { name: "Multi-party FinTech Ledgers", type: "Architecture", relevance: 84, salienceScore: 80, isPresent: true },
        { name: "Payment Orchestration Suite", type: "Architecture", relevance: 78, salienceScore: 75, isPresent: false },
        { name: "Sub-merchant Settlement Splitting", type: "Concept", relevance: 82, salienceScore: 74, isPresent: false },
        { name: "Local Real-time Rails (PIX/SPEI)", type: "Infrastructure", relevance: 88, salienceScore: 80, isPresent: true }
      ],
      competitors: [
        { name: "Adyen", domain: "adyen.com", entityCoverageScore: 91, topEntities: ["Payment Orchestration Suite", "Unified Commerce Integrations", "Interchange fee pricing optimization", "Global Merchant Aggregators"] },
        { name: "PayPal", domain: "paypal.com", entityCoverageScore: 78, topEntities: ["Consumer Wallet Integrations", "Two-sided peer payments", "Buyer Protection Guarantees"] },
        { name: "Checkout.com", domain: "checkout.com", entityCoverageScore: 82, topEntities: ["High-Volume Acquiring Gateways", "3D Secure 2 Auth Shields", "Crypto Asset Settlement rails"] }
      ],
      missingEntities: [
        "Payment Orchestration Suite",
        "Sub-merchants settlement split logs",
        "Interchange-plus-plus pricing transparent routing",
        "Unified retail POS native EMV terminal software"
      ]
    },
    semanticGaps: [
      {
        id: "sg1",
        name: "Payment Orchestration Architecture",
        type: "concept",
        description: "A framework illustrating how Stripe operates as part of a multi-processor transaction flow, routing based on cost/success dynamics in real-time.",
        impactWeight: "High",
        associatedEntity: "Payment Orchestration Suite",
        recommendedCoverage: "Write a high-level whitepaper outlining Strip's fallback API mechanisms and multi-processor routing capabilities to attract large enterprises."
      },
      {
        id: "sg2",
        name: "Acquirer-Specific Settlement Calendars",
        type: "attribute",
        description: "Detailed documentation highlighting exactly when funds arrive depending on local geographic acquirer settlement windows and holiday schedules.",
        impactWeight: "Medium",
        associatedEntity: "Merchant Account Management",
        recommendedCoverage: "Add interactive tables comparing default payout cycles across 45 countries with custom scheduling overrides explained."
      },
      {
        id: "sg3",
        name: "Connecting Revenue Ledgering directly to Corporate Liquidity",
        type: "relationship",
        description: "The structural connection showing how automated revenue entries flow directly into real-time operational treasury cards without manual treasury overhead.",
        impactWeight: "High",
        associatedEntity: "Multi-party FinTech Ledgers",
        recommendedCoverage: "Publish an architectural diagram and developer reference connecting Stripe Revenue Recognition APIs to Stripe Issuing triggers."
      },
      {
        id: "sg4",
        name: "Cross-border Tax Nexus Triggers by Product Tier",
        type: "supporting_topic",
        description: "A comprehensive guide analyzing differences in corporate-goods vs software-services tax nexus limits in fluctuating markets.",
        impactWeight: "Medium",
        associatedEntity: "PSD2 / SCA Compliance",
        recommendedCoverage: "Create an auto-updating state-by-state SaaS tax nexus calendar within Stripe Tax Resources."
      }
    ],
    internalLinking: {
      hubs: [
        { title: "Stripe Developer API Documentation Base", url: "stripe.com/docs/api", pageAuthority: 98, inboundLinks: 1420, outboundLinks: 65 },
        { title: "Stripe Billing Hub", url: "stripe.com/billing", pageAuthority: 89, inboundLinks: 550, outboundLinks: 42 },
        { title: "Stripe Radar Security Guide", url: "stripe.com/radar", pageAuthority: 86, inboundLinks: 320, outboundLinks: 18 }
      ],
      orphans: [
        { title: "Custom webhooks signature verification in Go", url: "stripe.com/docs/webhooks/signatures/golang", impressionsEstimated: 2300, actionRequired: "Link from Main Go SDK Library reference page" },
        { title: "SaaS metrics MRR accounting under ASC 606 standards", url: "stripe.com/billing/accounting-standards", impressionsEstimated: 1200, actionRequired: "Incorporate into Billing dynamic sidebar and link from Revenue Recognition introductory section" }
      ],
      weakClusters: [
        { clusterName: 'Corporate Formation & Atlas', connectivityPercent: 42, issue: "Articles focus deeply on incorporation, but fail to internally link to follow-up banking setup or corporate accounting guidelines on the hub page, leaving pages isolated after reading." },
        { clusterName: 'Financial Ledgers & Treasury Management', connectivityPercent: 35, issue: "Very low internal link connectivity. The treasury API guide does not cross-link to issuing or terminal APIs, causing dead-ends to users exploring fintech program creation." }
      ],
      recommendations: [
        {
          id: "lr1",
          sourceTitle: "Stripe Billing Dashboard Intro",
          sourceUrl: "stripe.com/billing",
          targetTitle: "SaaS metrics MRR accounting under ASC 606 standards",
          targetUrl: "stripe.com/billing/accounting-standards",
          suggestedAnchorText: "complying with ASC 606 subscription revenue rules",
          reason: "Directs high-value merchant financial officers reading about subscription logic straight into Stripe's expert ledger coverage, boosting topical authority."
        },
        {
          id: "lr2",
          sourceTitle: "Incorporate in Delaware (Atlas Intro)",
          sourceUrl: "stripe.com/atlas/incorporate-delaware",
          targetTitle: "Corporate Tax filing for foreign founders",
          targetUrl: "stripe.com/atlas/us-company-taxes-foreign-founders",
          suggestedAnchorText: "federal corporate tax duties for non-US owners",
          reason: "Addresses the immediate next cognitive objective of incorporating founders, consolidating the cluster's authority."
        }
      ]
    },
    recommendations: [
      {
        id: "rec1",
        title: "Hybrid seat-based + usage volume charging patterns",
        concept: "SaaS Metered Billing Integration",
        type: "Quick Win",
        pillarName: "Enterprise Revenue & Operations",
        clusterName: "Subscription Billing & Invoicing",
        priority: "Critical",
        difficulty: "Easy",
        impact: "High",
        entityGain: 12,
        topicalAuthorityGain: 8
      },
      {
        id: "rec2",
        title: "The Ultimate Payment Orchestration Architecture Blueprint",
        concept: "Multi-Processor Ledger Routing",
        type: "New Pillar",
        pillarName: "Global Payments infrastructure",
        clusterName: "Alternative Payment Methods (APMs)",
        priority: "High",
        difficulty: "Hard",
        impact: "High",
        entityGain: 25,
        topicalAuthorityGain: 18
      },
      {
        id: "rec3",
        title: "Biometric Fraud Analysis & Device Fingerprinting Signals",
        concept: "AI Risk Minimization",
        type: "Cluster Expansion",
        pillarName: "Global Payments infrastructure",
        clusterName: "Fraud Mitigation & AI Radar",
        priority: "Medium",
        difficulty: "Medium",
        impact: "Medium",
        entityGain: 15,
        topicalAuthorityGain: 10
      },
      {
        id: "rec4",
        title: "Exemptions Checklist for Delaware State Franchise Taxes",
        concept: "Startup Legal Duties",
        type: "Missing Page",
        pillarName: "Enterprise Revenue & Operations",
        clusterName: "Corporate Formation & Atlas",
        priority: "High",
        difficulty: "Easy",
        impact: "High",
        entityGain: 8,
        topicalAuthorityGain: 12
      }
    ],
    roadmap: [
      {
        id: "rm1",
        phase: "Next 10 Pages",
        title: "Solving the SaaS Hybrid Billing Problem: Seat Limits + API Usage",
        recommendedWordCount: 2200,
        targetFocusKeys: ["hybrid billing", "seat based billing", "usage metering architecture"],
        suggestedEntities: ["SaaS Subscription Engine", "Usage Metering Ledger", "Stripe Billing APIs"],
        estimatedImpact: 92,
        recommendedFormat: "Deep-Dive Architectural Guide"
      },
      {
        id: "rm2",
        phase: "Next 10 Pages",
        title: "Delaware Corporate Franchise Taxes: Safe Calculation Walkthrough",
        recommendedWordCount: 1800,
        targetFocusKeys: ["Delaware franchise tax exemptions", "Atlas tax help"],
        suggestedEntities: ["Delaware C-Corp", "Franchise taxes", "Stock par value method"],
        estimatedImpact: 88,
        recommendedFormat: "Procedural Compliance Guide"
      },
      {
        id: "rm3",
        phase: "Next 25 Pages",
        title: "What is Payment Orchestration? How Global Enterprises Prevent Tech Lock-in",
        recommendedWordCount: 3500,
        targetFocusKeys: ["payment orchestration gateway", "multi-acquirer routing", "payment fallback APM"],
        suggestedEntities: ["Payment Orchestration Suite", "Acquirer Routing Dynamics", "Retry Logic"],
        estimatedImpact: 85,
        recommendedFormat: "Comprehensive Pillar Whitepaper"
      },
      {
        id: "rm4",
        phase: "Next 25 Pages",
        title: "Flutter Payment Sheets Integration: Custom UI Layout Override Guide",
        recommendedWordCount: 1600,
        targetFocusKeys: ["Flutter payment elements styling", "native mobile stripes layout"],
        suggestedEntities: ["Flutter SDK Elements", "Mobile Web Sandbox", "Biometric Apple Pay"],
        estimatedImpact: 78,
        recommendedFormat: "Technical Code Blueprint"
      },
      {
        id: "rm5",
        phase: "Next 50 Pages",
        title: "Local Currency Conversion Rates for Middle-East e-Commerce merchants",
        recommendedWordCount: 2400,
        targetFocusKeys: ["Saudi Arabia credit cards split", "UAE digital wallets payout"],
        suggestedEntities: ["Alternative Payment Methods (APMs)", "Cross-border pricing dynamics"],
        estimatedImpact: 64,
        recommendedFormat: "Regional Market Analysis"
      }
    ]
  },
  "nike.com": {
    domain: "nike.com",
    competitors: ["adidas.com", "underarmour.com", "puma.com"],
    sitewideAuthority: {
      overallScore: 92,
      strengthRating: "Topical Leader",
      gapToLeaderPercent: 3,
      indexingStatus: "Fully Crawled (12,150 pages, strong consumer lifestyle semantic clustering)"
    },
    pillars: [
      {
        id: "p1",
        name: "Athletic Footwear & Propulsion Science",
        description: "Shoe technologies, midsole cushioning units, structural performance shoes for running, basketball, and training.",
        strength: 95,
        topicalAuthorityScore: 94,
        clusters: ["c1", "c2"]
      },
      {
        id: "p2",
        name: "Climate-Adapted Apparel Technology",
        description: "Fabric material sciences, heat retention, moisture-wicking technology, and ergonomic fit activewear.",
        strength: 87,
        topicalAuthorityScore: 84,
        clusters: ["c3", "c4"]
      },
      {
        id: "p3",
        name: "Coaching & Athlete Digital Guidance",
        description: "Training programs, community athletic events, athlete profiles, and fitness lifestyle advocacy.",
        strength: 78,
        topicalAuthorityScore: 73,
        clusters: ["c5", "c6"]
      }
    ],
    clusters: [
      {
        id: "c1",
        name: "High-Performance Running Cushioning",
        associatedPillarId: "p1",
        pillarStrength: 95,
        clusterDepth: 3,
        pagesCount: 88,
        supportingContent: [
          "nike.com/running/pegasus-zoom-air-history",
          "nike.com/running/vaporfly-carbon-plate-mechanics",
          "nike.com/running/marathon-propulsion-gains",
          "nike.com/running/daily-cushioned-trainers-reactx"
        ],
        missingSupportingContent: [
          "Detailed biomechanics of super-foam materials (ZoomX vs EVA in long runs)",
          "Ankle stability differences between high-stack racing shoes and low-profile track flats",
          "Prone-pronation support levels comparisons for amateur marathon runners"
        ],
        topicalAuthorityScore: 91
      },
      {
        id: "c2",
        name: "Basketball Signature Series Specs",
        associatedPillarId: "p1",
        pillarStrength: 92,
        clusterDepth: 4,
        pagesCount: 145,
        supportingContent: [
          "nike.com/basketball/jordan-air-traction-systems",
          "nike.com/basketball/lebron-cushioning-impact-absorb",
          "nike.com/basketball/court-feel-lateral-stability"
        ],
        missingSupportingContent: [
          "Full comparison of outsole patterns on dusty indoor courts vs asphalt playgrounds",
          "The mechanical evolution of double-stacked Zoom Air units in basketball sneakers"
        ],
        topicalAuthorityScore: 90
      },
      {
        id: "c3",
        name: "Dri-FIT & Sweat Vaporization Fabrics",
        associatedPillarId: "p2",
        pillarStrength: 87,
        clusterDepth: 2,
        pagesCount: 42,
        supportingContent: [
          "nike.com/apparel/dri-fit-material-sciences",
          "nike.com/apparel/vapor-knit-heat-zones",
          "nike.com/apparel/sweat-wicking-runners-base-layer"
        ],
        missingSupportingContent: [
          "Polyester filament microscopical analysis illustrating wicking acceleration",
          "Biodegradable active fabrics lifecycle comparison with microplastics risk reviews"
        ],
        topicalAuthorityScore: 85
      },
      {
        id: "c4",
        name: "Therma-FIT & High-Elevation Cold Gear",
        associatedPillarId: "p2",
        pillarStrength: 82,
        clusterDepth: 2,
        pagesCount: 30,
        supportingContent: [
          "nike.com/apparel/therma-fit-winter-runs",
          "nike.com/apparel/windrunner-protective-breathable-jackets"
        ],
        missingSupportingContent: [
          "How insulating synthetic down mimics goose plumes without retaining water",
          "Mountain high-altitude cold weather windproof barriers rating chart"
        ],
        topicalAuthorityScore: 78
      },
      {
        id: "c5",
        name: "Nike Run Club Training Plans",
        associatedPillarId: "p3",
        pillarStrength: 78,
        clusterDepth: 2,
        pagesCount: 36,
        supportingContent: [
          "nike.com/nrc-app/couch-to-5k-guided-runs",
          "nike.com/nrc-app/tempo-runs-intervals-pacing-schedule"
        ],
        missingSupportingContent: [
          "Rest day active recovery routines and nutritional guidelines for continuous training segments",
          "Heart rate zone training schedules for long-term aerobic threshold boosting"
        ],
        topicalAuthorityScore: 75
      },
      {
        id: "c6",
        name: "Professional Athlete Legacy profiles",
        associatedPillarId: "p3",
        pillarStrength: 85,
        clusterDepth: 3,
        pagesCount: 110,
        supportingContent: [
          "nike.com/athletes/michael-jordan-championship-legacy",
          "nike.com/athletes/serena-williams-tennis-greatness",
          "nike.com/athletes/eliud-kipchoge-breaking-two"
        ],
        missingSupportingContent: [
          "How training philosophy from professional players applies to adolescent high-school stars",
          "Full history of cross-sport design partnerships (e.g., LeBron basketball shoes styling with Mbappe soccer patterns)"
        ],
        topicalAuthorityScore: 82
      }
    ],
    siteKnowledgeMap: {
      nodes: [
        { id: "nike.com", label: "Nike Brand Domain", type: "pillar", size: 35, authorityScore: 92 },
        { id: "p1", label: "Pillar: Footwear Propulsion", type: "pillar", size: 28, authorityScore: 94 },
        { id: "p2", label: "Pillar: Climate Apparel", type: "pillar", size: 28, authorityScore: 84 },
        { id: "p3", label: "Pillar: Athlete Digital Guidance", type: "pillar", size: 28, authorityScore: 73 },
        { id: "c1", label: "Cluster: Running Cushions", type: "cluster", size: 20, clusterId: "c1", authorityScore: 91 },
        { id: "c2", label: "Cluster: Basketball Signature", type: "cluster", size: 20, clusterId: "c2", authorityScore: 90 },
        { id: "c3", label: "Cluster: Sweat Vaporization", type: "cluster", size: 20, clusterId: "c3", authorityScore: 85 },
        { id: "c4", label: "Cluster: Cold Weather Barriers", type: "cluster", size: 20, clusterId: "c4", authorityScore: 78 },
        { id: "c5", label: "Cluster: Running Coaching", type: "cluster", size: 20, clusterId: "c5", authorityScore: 75 },
        { id: "c6", label: "Cluster: Athlete Portfolios", type: "cluster", size: 20, clusterId: "c6", authorityScore: 82 },
        { id: "pg1", label: "Pegasus Zoom Air", type: "page", clusterId: "c1", size: 10, url: "nike.com/running/pegasus-zoom-air-history" },
        { id: "pg2", label: "Jordan Court Traction", type: "page", clusterId: "c2", size: 10, url: "nike.com/basketball/jordan-air-traction-systems" },
        { id: "pg3", label: "Dri-FIT Fabric Science", type: "page", clusterId: "c3", size: 10, url: "nike.com/apparel/dri-fit-material-sciences" },
        { id: "pg4", label: "Guided 5K Plan", type: "page", clusterId: "c5", size: 10, url: "nike.com/nrc-app/couch-to-5k-guided-runs" },
        { id: "mp1", label: "Missing: ZoomX foam biomechanics", type: "missing-page", clusterId: "c1", size: 12 },
        { id: "mp2", label: "Missing: Outsole pattern slip thresholds", type: "missing-page", clusterId: "c2", size: 12 }
      ],
      links: [
        { source: "nike.com", target: "p1", type: "pillar-to-cluster" },
        { source: "nike.com", target: "p2", type: "pillar-to-cluster" },
        { source: "nike.com", target: "p3", type: "pillar-to-cluster" },
        { source: "p1", target: "c1", type: "pillar-to-cluster" },
        { source: "p1", target: "c2", type: "pillar-to-cluster" },
        { source: "p2", target: "c3", type: "pillar-to-cluster" },
        { source: "p2", target: "c4", type: "pillar-to-cluster" },
        { source: "p3", target: "c5", type: "pillar-to-cluster" },
        { source: "p3", target: "c6", type: "pillar-to-cluster" },
        { source: "c1", target: "pg1", type: "cluster-to-page" },
        { source: "c2", target: "pg2", type: "cluster-to-page" },
        { source: "c3", target: "pg3", type: "cluster-to-page" },
        { source: "c5", target: "pg4", type: "cluster-to-page" },
        { source: "c1", target: "mp1", type: "recommended-link" },
        { source: "c2", target: "mp2", type: "recommended-link" },
        { source: "pg1", target: "pg4", type: "internal-link" }
      ]
    },
    entityAnalysis: {
      coverageScore: 78,
      extractedEntities: [
        { name: "Midsole Cushioning Unit", type: "Technology", relevance: 96, salienceScore: 92, isPresent: true },
        { name: "Super-foam (Pebax/ZoomX)", type: "Concept", relevance: 94, salienceScore: 90, isPresent: true },
        { name: "Moisture-Wicking Polyester", type: "Technology", relevance: 88, salienceScore: 84, isPresent: true },
        { name: "Aerobic Heart Pacing", type: "Concept", relevance: 82, salienceScore: 74, isPresent: true },
        { name: "Propulsion Carbon Plate", type: "Technology", relevance: 92, salienceScore: 89, isPresent: true },
        { name: "Ankle Supination Load", type: "Biomechanics", relevance: 86, salienceScore: 76, isPresent: false },
        { name: "Barefoot Stride Mechanics", type: "Biomechanics", relevance: 78, salienceScore: 70, isPresent: false },
        { name: "Indoor Outsole Slip Rating", type: "Safety Metric", relevance: 84, salienceScore: 78, isPresent: false }
      ],
      competitors: [
        { name: "Adidas", domain: "adidas.com", entityCoverageScore: 85, topEntities: ["High-Energy Boost Cushioning", "Recycled Ocean Plastics Ocean Apparel", "Track-field foot alignment"] },
        { name: "Under Armour", domain: "underarmour.com", entityCoverageScore: 79, topEntities: ["Infrared heat retention garments", "Biometric training metrics syncing", "Lateral court-pivot shoes"] }
      ],
      missingEntities: [
        "Ankle Supination Load",
        "Barefoot Stride Mechanics",
        "Indoor Outsole Slip Rating"
      ]
    },
    semanticGaps: [
      {
        id: "sg1",
        name: "Ankle Joint Load Under Super-foam Compression",
        type: "concept",
        description: "Analysis of how extreme padding stack heights can introduce lateral instability for novice joggers with hyper-flexible joints.",
        impactWeight: "High",
        associatedEntity: "Ankle Supination Load",
        recommendedCoverage: "Publish a deep biomechanics explainer page looking at stability ratings in racing vs training stacks."
      },
      {
        id: "sg2",
        name: "Microfiber Filament Abrasion Metrics",
        type: "attribute",
        description: "Standard details explaining how many home washing machine friction passes a Dri-FIT shirt can take before losing wicking speed.",
        impactWeight: "Medium",
        associatedEntity: "Moisture-Wicking Polyester",
        recommendedCoverage: "Create a durability maintenance guidelines subsection on shoe and apparel product pages."
      }
    ],
    internalLinking: {
      hubs: [
        { title: "Nike Air Innovations Hub", url: "nike.com/air", pageAuthority: 94, inboundLinks: 980, outboundLinks: 34 },
        { title: "Running Gear Central", url: "nike.com/running", pageAuthority: 87, inboundLinks: 420, outboundLinks: 28 }
      ],
      orphans: [
        { title: "Choosing cold barrier socks for frozen trail runs", url: "nike.com/running/winter-trail-socks", impressionsEstimated: 950, actionRequired: "Link from Therma-FIT Winter Jackets hub" }
      ],
      weakClusters: [
        { clusterName: "Therma-FIT & Winter Barriers", connectivityPercent: 44, issue: "Winter jacket product listings do not internally link back to core high-altitude scientific explainers, creating dead-end conversion hubs." }
      ],
      recommendations: [
        {
          id: "lr1",
          sourceTitle: "Marathon Propulsion Carbon Plate Mechanics",
          sourceUrl: "nike.com/running/vaporfly-carbon-plate-mechanics",
          targetTitle: "Pegasus Zoom history",
          targetUrl: "nike.com/running/pegasus-zoom-air-history",
          suggestedAnchorText: "comparing superfoam propulsion to our daily trainer lineage",
          reason: "Connects elite track-shoe science back to their high-volume everyday workhorse trainer, improving local authority."
        }
      ]
    },
    recommendations: [
      {
        id: "rec1",
        title: "Pebax Super-foam vs standard EVA Cushions: Full Biomechanical Metrics",
        concept: "Footwear Energy Returns",
        type: "Quick Win",
        pillarName: "Athletic Footwear & Propulsion Science",
        clusterName: "High-Performance Running Cushioning",
        priority: "Critical",
        difficulty: "Easy",
        impact: "High",
        entityGain: 15,
        topicalAuthorityGain: 12
      },
      {
        id: "rec2",
        title: "The Mechanics of Outsole Slip Angles: Dusty Courts Defensive Manual",
        concept: "Court Pivot Friction",
        type: "Cluster Expansion",
        pillarName: "Athletic Footwear & Propulsion Science",
        clusterName: "Basketball Signature Series Specs",
        priority: "High",
        difficulty: "Medium",
        impact: "High",
        entityGain: 18,
        topicalAuthorityGain: 14
      }
    ],
    roadmap: [
      {
        id: "rm1",
        phase: "Next 10 Pages",
        title: "ZoomX Performance Chemistry: Biomechanics of Foam Under Compression",
        recommendedWordCount: 2400,
        targetFocusKeys: ["ZoomX foam science", "energy return running cushions"],
        suggestedEntities: ["Super-foam (Pebax/ZoomX)", "Midsole Cushioning Unit"],
        estimatedImpact: 94,
        recommendedFormat: "Scientific Material deep-dive"
      },
      {
        id: "rm2",
        phase: "Next 10 Pages",
        title: "Outsole Traction Science: Preventing Slipping on Dusty Basketball Courts",
        recommendedWordCount: 2000,
        targetFocusKeys: ["basketball shoe grip", "preventing slips court traction"],
        suggestedEntities: ["Indoor Outsole Slip Rating", "Basketball Signature Series Specs"],
        estimatedImpact: 91,
        recommendedFormat: "Performance Testing Journal"
      }
    ]
  },
  "substack.com": {
    domain: "substack.com",
    competitors: ["medium.com", "patreon.com", "ghost.org"],
    sitewideAuthority: {
      overallScore: 89,
      strengthRating: "Topical Leader",
      gapToLeaderPercent: 2,
      indexingStatus: "Fully Crawled (56,200 pages, high user narrative density)"
    },
    pillars: [
      {
        id: "p1",
        name: "Creator Economy Monetization Strategies",
        description: "Subscription models, high-affinity community monetization, paid newsletter conversions, and financial analytics.",
        strength: 91,
        topicalAuthorityScore: 90,
        clusters: ["c1", "c2"]
      },
      {
        id: "p2",
        name: "Writers Curation & Editing Suite",
        description: "Editing workflows, publication design, custom landing pages, podcast hosting, and draft syndication mechanics.",
        strength: 84,
        topicalAuthorityScore: 82,
        clusters: ["c3", "c4"]
      },
      {
        id: "p3",
        name: "Algorithmic Discovery & Reader Platforms",
        description: "Network recommendations engine, mobile reader applications, in-app notes conversation feeds, and cross-writer referrals.",
        strength: 80,
        topicalAuthorityScore: 78,
        clusters: ["c5", "c6"]
      }
    ],
    clusters: [
      {
        id: "c1",
        name: "Paid Subscription Monetization Guides",
        associatedPillarId: "p1",
        pillarStrength: 91,
        clusterDepth: 3,
        pagesCount: 88,
        supportingContent: [
          "substack.com/guides/going-paid-first-30-days",
          "substack.com/guides/annual-subscription-discounts",
          "substack.com/guides/founder-tier-pricing-strategy"
        ],
        missingSupportingContent: [
          "SaaS subscription tax liabilities in European Union for individual indy-writers",
          "Churn mitigation checklists when shifting publication themes post-launch"
        ],
        topicalAuthorityScore: 88
      },
      {
        id: "c2",
        name: "Group Subscriptions & Corporate Licensing",
        associatedPillarId: "p1",
        pillarStrength: 82,
        clusterDepth: 2,
        pagesCount: 21,
        supportingContent: [
          "substack.com/resources/group-subscriptions-for-teams",
          "substack.com/resources/gifting-memberships"
        ],
        missingSupportingContent: [
          "Setting up custom domain bulk invoicing models for university classrooms",
          "Multi-member roster uploads for legacy print migrations"
        ],
        topicalAuthorityScore: 74
      },
      {
        id: "c3",
        name: "Rich Audio & Podcast Syndicate Curation",
        associatedPillarId: "p2",
        pillarStrength: 84,
        clusterDepth: 2,
        pagesCount: 35,
        supportingContent: [
          "substack.com/docs/setting-up-podcast-feed",
          "substack.com/docs/voiceover-narrations-audio-threads"
        ],
        missingSupportingContent: [
          "Direct RSS ingestion from custom third-party soundboard mixers",
          "Automated dynamic mid-roll voice sponsor placeholder insertions"
        ],
        topicalAuthorityScore: 80
      },
      {
        id: "c4",
        name: "Landing Pages & Branding Customization",
        associatedPillarId: "p2",
        pillarStrength: 79,
        clusterDepth: 3,
        pagesCount: 46,
        supportingContent: [
          "substack.com/docs/custom-domain-setup-dns",
          "substack.com/docs/customizing-welcome-email-banners"
        ],
        missingSupportingContent: [
          "Detailed CSS customization grids for premium white-labeled headers",
          "Integrating external Google Analytics 4 tags securely with Substack events tracking"
        ],
        topicalAuthorityScore: 76
      },
      {
        id: "c5",
        name: "Network Recommendations Engine",
        associatedPillarId: "p3",
        pillarStrength: 80,
        clusterDepth: 2,
        pagesCount: 22,
        supportingContent: [
          "substack.com/discovery/cross-recommendation-sharing",
          "substack.com/discovery/substack-notes-conversational-guide"
        ],
        missingSupportingContent: [
          "Data insights into referral network attribution modeling for writer growth",
          "Organic SEO ranking vs internal mobile app discoverability distribution ratios"
        ],
        topicalAuthorityScore: 82
      },
      {
        id: "c6",
        name: "Writer Community Events & Curation Panels",
        associatedPillarId: "p3",
        pillarStrength: 76,
        clusterDepth: 2,
        pagesCount: 18,
        supportingContent: [
          "substack.com/community/fellowship-winners-announcement",
          "substack.com/community/office-hours-weekly-schedule"
        ],
        missingSupportingContent: [
          "Creating local geography writer circles for offline newsletter meetups",
          "Niche editorial co-writing partnership contracts blueprint"
        ],
        topicalAuthorityScore: 72
      }
    ],
    siteKnowledgeMap: {
      nodes: [
        { id: "substack.com", label: "Substack Brand Domain", type: "pillar", size: 35, authorityScore: 89 },
        { id: "p1", label: "Pillar: Creator Economy Monetization", type: "pillar", size: 28, authorityScore: 90 },
        { id: "p2", label: "Pillar: Writers Editorial Suite", type: "pillar", size: 28, authorityScore: 82 },
        { id: "p3", label: "Pillar: Network Discoveries", type: "pillar", size: 28, authorityScore: 78 },
        { id: "c1", label: "Cluster: Paid Newsletter Subscriptions", type: "cluster", size: 20, clusterId: "c1", authorityScore: 88 },
        { id: "c2", label: "Cluster: Group Licenses for Teams", type: "cluster", size: 20, clusterId: "c2", authorityScore: 74 },
        { id: "c3", label: "Cluster: Audio Syndication & Podcasts", type: "cluster", size: 20, clusterId: "c3", authorityScore: 80 },
        { id: "c4", label: "Cluster: Brand Custom domains", type: "cluster", size: 20, clusterId: "c4", authorityScore: 76 },
        { id: "c5", label: "Cluster: Referrals & Notes Discovery", type: "cluster", size: 20, clusterId: "c5", authorityScore: 82 },
        { id: "c6", label: "Cluster: Offline Writer Fellowships", type: "cluster", size: 20, clusterId: "c6", authorityScore: 72 },
        { id: "pg1", label: "Going Paid First 30 Days Guide", type: "page", clusterId: "c1", size: 10, url: "substack.com/guides/going-paid-first-30-days" },
        { id: "pg2", label: "Group Subscription uploads", type: "page", clusterId: "c2", size: 10, url: "substack.com/resources/group-subscriptions-for-teams" },
        { id: "pg3", label: "Setting Up Custom Domains Specs", type: "page", clusterId: "c4", size: 10, url: "substack.com/docs/custom-domain-setup-dns" },
        { id: "pg4", label: "Cross-recommendations checklist", type: "page", clusterId: "c5", size: 10, url: "substack.com/discovery/cross-recommendation-sharing" },
        { id: "mp1", label: "Missing: indy writer EU VAT obligations", type: "missing-page", clusterId: "c1", size: 12 },
        { id: "mp2", label: "Missing: GA4 tag tracking specs for blogs", type: "missing-page", clusterId: "c4", size: 12 }
      ],
      links: [
        { source: "substack.com", target: "p1", type: "pillar-to-cluster" },
        { source: "substack.com", target: "p2", type: "pillar-to-cluster" },
        { source: "substack.com", target: "p3", type: "pillar-to-cluster" },
        { source: "p1", target: "c1", type: "pillar-to-cluster" },
        { source: "p1", target: "c2", type: "pillar-to-cluster" },
        { source: "p2", target: "c3", type: "pillar-to-cluster" },
        { source: "p2", target: "c4", type: "pillar-to-cluster" },
        { source: "p3", target: "c5", type: "pillar-to-cluster" },
        { source: "p3", target: "c6", type: "pillar-to-cluster" },
        { source: "c1", target: "pg1", type: "cluster-to-page" },
        { source: "c2", target: "pg2", type: "cluster-to-page" },
        { source: "c4", target: "pg3", type: "cluster-to-page" },
        { source: "c5", target: "pg4", type: "cluster-to-page" },
        { source: "c1", target: "mp1", type: "recommended-link" },
        { source: "c4", target: "mp2", type: "recommended-link" },
        { source: "pg1", target: "pg3", type: "internal-link" }
      ]
    },
    entityAnalysis: {
      coverageScore: 82,
      extractedEntities: [
        { name: "Subscription Paywall Strategy", type: "Concept", relevance: 98, salienceScore: 94, isPresent: true },
        { name: "Independent Curation Economics", type: "Concept", relevance: 90, salienceScore: 86, isPresent: true },
        { name: "Podcast RSS Syndication", type: "Technology", relevance: 84, salienceScore: 78, isPresent: true },
        { name: "Co-writing Royalty Split Contracts", type: "Legal Model", relevance: 76, salienceScore: 68, isPresent: false },
        { name: "Premium CSS Header White-Labeling", type: "Design Concept", relevance: 82, salienceScore: 74, isPresent: false },
        { name: "Network Recommendation Loops", type: "Growth Loop", relevance: 94, salienceScore: 90, isPresent: true },
        { name: "Google Analytics 4 Events Hooks", type: "Technical Spec", relevance: 80, salienceScore: 72, isPresent: false },
        { name: "VAT MOSS individual tax duties", type: "Regulation", relevance: 86, salienceScore: 79, isPresent: false }
      ],
      competitors: [
        { name: "Medium", domain: "medium.com", entityCoverageScore: 88, topEntities: ["Clap based revenue distribution", "Topic partner publication curation", "Search discovery organic indexing"] },
        { name: "Ghost", domain: "ghost.org", entityCoverageScore: 92, topEntities: ["Open-Source self-host architectures", "Advanced Mailgun email layouts", "Strict white-label CSS nodes"] },
        { name: "Patreon", domain: "patreon.com", entityCoverageScore: 84, topEntities: ["Tier-based physical merch rewards", "Direct creator-to-fan messaging rooms", "Pledge volume forecasting dials"] }
      ],
      missingEntities: [
        "Co-writing Royalty Split Contracts",
        "Premium CSS Header White-Labeling",
        "Google Analytics 4 Events Hooks",
        "VAT MOSS individual tax duties"
      ]
    },
    semanticGaps: [
      {
        id: "sg1",
        name: "Individual Newsletter VAT Compliance in EU",
        type: "concept",
        description: "How a single blogger should handle European tax registration thresholds when selling memberships directly to EU residents.",
        impactWeight: "High",
        associatedEntity: "VAT MOSS individual tax duties",
        recommendedCoverage: "Publish an easy-to-read legal handbook detailing tax collection options integrated with stripe tax."
      },
      {
        id: "sg2",
        name: "Custom CSS Overrides for Substack Themes",
        type: "attribute",
        description: "The layout specifications for background classes and font pairings to strip out default newsletter styling.",
        impactWeight: "Medium",
        associatedEntity: "Premium CSS Header White-Labeling",
        recommendedCoverage: "Offer modular layout guides and safe DNS testing pages for writers with custom tech domains."
      }
    ],
    internalLinking: {
      hubs: [
        { title: "Substack Writer Resource Hub", url: "substack.com/guides", pageAuthority: 90, inboundLinks: 1200, outboundLinks: 54 },
        { title: "Substack Product Documentation Base", url: "substack.com/docs", pageAuthority: 84, inboundLinks: 780, outboundLinks: 40 }
      ],
      orphans: [
        { title: "Voiceover narration checklist during mic tests", url: "substack.com/docs/voiceovers-setup", impressionsEstimated: 850, actionRequired: "Link from primary podcast hosting setup page" }
      ],
      weakClusters: [
        { clusterName: "Landing Pages & Branding Customization", connectivityPercent: 32, issue: "The DNS guide is completely detached from product customization sheets, creating manual search loops for starting authors." }
      ],
      recommendations: [
        {
          id: "lr1",
          sourceTitle: "Going Paid First 30 Days",
          sourceUrl: "substack.com/guides/going-paid-first-30-days",
          targetTitle: "Writer resources check on global taxes",
          targetUrl: "substack.com/guides/tax-responsibilities",
          suggestedAnchorText: "understanding your tax duties on global paid subscriptions",
          reason: "Links high-intent starting writers immediately to administrative requirements to solve friction-points early."
        }
      ]
    },
    recommendations: [
      {
        id: "rec1",
        title: "Individual EU VAT Guide: How Stripe Autopays writer VAT",
        concept: "Creator Tax Solutions",
        type: "Quick Win",
        pillarName: "Creator Economy Monetization Strategies",
        clusterName: "Paid Subscription Monetization Guides",
        priority: "Critical",
        difficulty: "Easy",
        impact: "High",
        entityGain: 14,
        topicalAuthorityGain: 12
      }
    ],
    roadmap: [
      {
        id: "rm1",
        phase: "Next 10 Pages",
        title: "EU VAT for Solo Journalists: Step-By-Step Substack Sales Compliance",
        recommendedWordCount: 2200,
        targetFocusKeys: ["solo writer VAT rules", "cross border newsletter taxes", "VAT MOSS individual"],
        suggestedEntities: ["VAT MOSS individual tax duties", "Subscription Paywall Strategy"],
        estimatedImpact: 95,
        recommendedFormat: "Step-by-step regulatory manual"
      },
      {
        id: "rm2",
        phase: "Next 10 Pages",
        title: "Custom Domain DNS Mapping: Resolving Cloudflare, Namecheap, and GoDaddy conflicts",
        recommendedWordCount: 1600,
        targetFocusKeys: ["custom domain substack DNS", "CNAME records newsletter settings"],
        suggestedEntities: ["Premium CSS Header White-Labeling", "Brand Custom domains"],
        estimatedImpact: 88,
        recommendedFormat: "Troubleshooting Guide"
      }
    ]
  }
};
