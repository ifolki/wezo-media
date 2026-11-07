// lib/config/services.ts

export interface StaticPackage {
  nameAr: string;
  nameEn: string;
  nameFr: string;
  featuresAr: string[];
  featuresEn: string[];
  featuresFr: string[];
  isPopular?: boolean;
}

export interface StaticWorkStep {
  titleAr: string;
  titleEn: string;
  titleFr: string;
  descAr: string;
  descEn: string;
  descFr: string;
}

export interface StaticService {
  slug: string;
  categoryKey:
    | 'DIGITAL_MARKETING'
    | 'WEB_DEVELOPMENT'
    | 'VIDEO_PRODUCTION'
    | 'ARTIST_SERVICES'
    | 'AUDIO_PRODUCTION'
    | 'MUSIC_DISTRIBUTION';
  nameAr: string;
  nameEn: string;
  nameFr: string;
  descAr: string;
  descEn: string;
  descFr: string;
  deliverablesAr?: string[];
  deliverablesEn?: string[];
  deliverablesFr?: string[];
  showInCatalog?: boolean;
  showInQuoteForm?: boolean;
  parentSlug?: string | null;
  order?: number;
  packages: StaticPackage[];
  workSteps: StaticWorkStep[];
}

export const staticServicesData: Record<string, StaticService> = {
  // ============================================================================
  // PILLAR 1: DIGITAL MARKETING & PAID ADS (order: 1, sub-orders: 11..14)
  // ============================================================================
  marketing: {
    slug: 'marketing',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'التسويق الرقمي وإدارة الإعلانات',
    nameEn: 'Performance Marketing & Paid Ads',
    nameFr: 'Marketing Digital & Gestion Publicitaire',
    descAr: 'إدارة وتوسيع الحملات الإعلانية الممولة على Meta وGoogle وTikTok لبناء نظام مستمر لجلب العملاء المحتملين والمبيعات.',
    descEn: 'Full-funnel paid advertising across Meta, Google, and TikTok engineered for predictable client acquisition and ROAS.',
    descFr: 'Gestion et optimisation de campagnes Meta, Google et TikTok orientées acquisition de prospects qualifiés et ventes.',
    showInCatalog: true,
    showInQuoteForm: true,
    parentSlug: null,
    order: 1,
    deliverablesAr: [
      'بناء استراتيجية الاستحواذ وتحديد الجماهير الأعلى ربحية في السوق المغربي والدولي',
      'إدارة شاملة لحملات Meta وGoogle وTikTok مع تتبع دقيق للتحويلات (Pixel & CAPI)',
      'اختبار مستمر للإعلانات (A/B Testing) لتخفيض تكلفة العميل المحتمل (CPL)',
      'لوحة تقارير مباشرة لمتابعة الإنفاق الإعلاني والعائد على الاستثمار (ROAS)'
    ],
    deliverablesEn: [
      'Full-funnel acquisition strategy and high-intent audience segmentation',
      'End-to-end management across Meta, Google, and TikTok with Pixel & CAPI tracking',
      'Continuous creative and copy A/B testing to reduce Cost Per Lead (CPL)',
      'Live reporting dashboard tracking ad spend, leads, and return on ad spend (ROAS)'
    ],
    deliverablesFr: [
      'Stratégie d’acquisition complète et ciblage des audiences à forte intention',
      'Pilotage des campagnes Meta, Google et TikTok avec suivi Pixel & CAPI',
      'Tests A/B continus sur les créas et textes pour réduire le coût par prospect (CPL)',
      'Tableau de bord en temps réel pour suivre le budget et le retour sur investissement (ROAS)'
    ],
    packages: [
      {
        nameAr: 'باقة الانطلاق واكتساب العملاء',
        nameEn: 'Acquisition Launch Scope',
        nameFr: 'Pack Lancement Acquisition',
        featuresAr: [
          'إدارة منصة إعلانية رئيسية (Meta أو Google)',
          'إعداد البيكسل وتتبع التحويلات الأساسي',
          'إطلاق 3 حملات إعلانية (جلب عملاء + إعادة استهداف)',
          'تقرير أداء نصف شهري مع جلسة مراجعة'
        ],
        featuresEn: [
          'Management of 1 primary ad platform (Meta or Google)',
          'Pixel setup and core conversion tracking',
          '3 active campaign structures (Prospecting + Retargeting)',
          'Bi-weekly performance report and review call'
        ],
        featuresFr: [
          'Gestion d’une régie publicitaire principale (Meta ou Google)',
          'Configuration du Pixel et suivi des conversions',
          '3 campagnes actives (Acquisition + Retargeting)',
          'Rapport de performance bimensuel et point de suivi'
        ]
      },
      {
        nameAr: 'منظومة النمو المتعدد القنوات (Multi-Channel)',
        nameEn: 'Multi-Channel Growth System',
        nameFr: 'Système Croissance Multi-Canaux',
        isPopular: true,
        featuresAr: [
          'إدارة متكاملة على Meta + Google أو TikTok',
          'تتبع متقدم Server-Side (Conversion API)',
          'اختبارات A/B أسبوعية للزوايا الإعلانية والصفحات',
          'توسيع الميزانيات الرابحة (Scaling) وتقرير أسبوعي مباشر'
        ],
        featuresEn: [
          'Integrated ad management across Meta + Google or TikTok',
          'Advanced server-side tracking (Conversion API)',
          'Weekly A/B testing on ad hooks and landing pages',
          'Profitable budget scaling and live weekly reporting'
        ],
        featuresFr: [
          'Gestion intégrée sur Meta + Google ou TikTok',
          'Tracking avancé côté serveur (Conversion API)',
          'Tests A/B hebdomadaires sur les créas et pages',
          'Scaling des campagnes rentables et reporting en direct'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'دراسة العرض والسوق',
        titleEn: 'Offer & Market Diagnostic',
        titleFr: 'Diagnostic Offre & Marché',
        descAr: 'تحليل عرضك التجاري، المنافسين، واقتصاديات الوحدة لتحديد مؤشرات الأداء المستهدفة.',
        descEn: 'Analyzing your offer, competitors, and unit economics to set clear KPI targets.',
        descFr: 'Analyse de votre offre, des concurrents et définition des objectifs de rentabilité.'
      },
      {
        titleAr: 'إعداد التتبع وهيكلة الحملات',
        titleEn: 'Tracking & Funnel Setup',
        titleFr: 'Tracking & Architecture Campagnes',
        descAr: 'ربط أدوات التتبع وتجهيز الحملات الإعلانية ونصوص الإقناع.',
        descEn: 'Configuring tracking pixels, audiences, and persuasive ad copy.',
        descFr: 'Installation des pixels, segmentation des audiences et rédaction publicitaire.'
      },
      {
        titleAr: 'الإطلاق، التحسين، والتوسيع',
        titleEn: 'Launch, Optimize & Scale',
        titleFr: 'Lancement, Optimisation & Scaling',
        descAr: 'مراقبة يومية للأداء، إيقاف الإعلانات المكلفة، ومضاعفة ميزانية الإعلانات الرابحة.',
        descEn: 'Daily bid and creative optimization to cut waste and scale winning ads.',
        descFr: 'Optimisation quotidienne des coûts et augmentation progressive des budgets gagnants.'
      }
    ]
  },

  'meta-ads-management': {
    slug: 'meta-ads-management',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'إدارة إعلانات ميتا (Facebook & Instagram)',
    nameEn: 'Meta Ads Management (Facebook & Instagram)',
    nameFr: 'Gestion des Publicités Meta (Facebook & Instagram)',
    descAr: 'إنشاء وإدارة وتحسين حملات Facebook وInstagram الموجهة لجلب رسائل واتساب مؤهلة أو طلبات شراء مباشرة.',
    descEn: 'Strategy, launch, and optimization of Facebook and Instagram campaigns focused on qualified WhatsApp leads and direct sales.',
    descFr: 'Création, gestion et optimisation des campagnes Facebook et Instagram orientées prospects WhatsApp qualifiés et ventes.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'marketing',
    order: 11,
    deliverablesAr: [
      'إعداد Meta Business Manager والـ Pixel وConversion API لمنع ضياع البيانات',
      'هيكلة حملات الاستحواذ (Cold Traffic) وحملات إعادة الاستهداف (Retargeting)',
      'كتابة نصوص إعلانية (Ad Copy) بالدارجة المغربية الفصحى أو الفرنسية حسب جمهورك',
      'تحسين مستمر لتكلفة الرسالة أو العميل المحتمل (Cost Per Qualified Lead)'
    ],
    deliverablesEn: [
      'Full Meta Business Manager, Pixel, and Conversion API configuration',
      'Structured cold prospecting and multi-layer retargeting campaigns',
      'High-converting ad copywriting tailored to Moroccan & international audiences',
      'Continuous optimization of Cost Per Qualified Lead (CPL) and ROAS'
    ],
    deliverablesFr: [
      'Configuration complète du Business Manager, Pixel Meta et Conversion API',
      'Structuration des campagnes d’acquisition à froid et de reciblage (Retargeting)',
      'Rédaction publicitaire persuasive adaptée à votre audience cible au Maroc',
      'Optimisation continue du coût par prospect qualifié (CPL) et du ROAS'
    ],
    packages: [
      {
        nameAr: 'نطاق التشغيل الأساسي (Meta Launch)',
        nameEn: 'Basic Meta Launch Scope',
        nameFr: 'Scope Lancement Meta',
        featuresAr: [
          'إعداد الحملة والجمهور المستهدف على Facebook & Instagram',
          'تصميم ومونتاج 2 إعلانات شهرياً',
          'كتابة نصوص إعلانية محفزة للتحويل',
          'تقرير إحصائي مفصل كل أسبوعين'
        ],
        featuresEn: [
          'Target audience and Meta Pixel configuration',
          '2 custom creative assets prepared monthly',
          'High-conversion ad copywriting',
          'Bi-weekly performance report updates'
        ],
        featuresFr: [
          'Ciblage d’audience et configuration du Pixel Meta',
          '2 visuels publicitaires créés par mois',
          'Copywriting publicitaire optimisé conversion',
          'Rapport de performance bimensuel'
        ]
      },
      {
        nameAr: 'نطاق النمو المتقدم (Meta Scaling)',
        nameEn: 'Advanced Meta Growth Scope',
        nameFr: 'Scope Croissance Meta Avancée',
        isPopular: true,
        featuresAr: [
          'اختبار جماهيري متعدد (A/B Testing) وزوايا بيع متنوعة',
          'تصميم وإنتاج 6 إعلانات شهرياً (صور + فيديو)',
          'تقارير أداء فورية عبر Google Looker Studio',
          'تحسين وتوسيع دائم للميزانية (Scaling) وإعادة استهداف ديناميكية'
        ],
        featuresEn: [
          'Extensive A/B testing across audiences and hooks',
          '6 custom creative assets prepared monthly',
          'Real-time Looker Studio dashboard access',
          'Dynamic retargeting and profitable budget scaling'
        ],
        featuresFr: [
          'Tests A/B approfondis sur les audiences et accroches',
          '6 visuels/vidéos publicitaires créés par mois',
          'Tableau de bord de performance en temps réel',
          'Retargeting dynamique et scaling du budget'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'التشخيص وتدقيق حساب Meta',
        titleEn: 'Meta Account Audit & Diagnostic',
        titleFr: 'Audit du Compte Meta & Diagnostic',
        descAr: 'مراجعة الحملات السابقة على فيسبوك وإنستغرام وتحديد نقاط تسرب الميزانية.',
        descEn: 'Reviewing past Facebook & Instagram analytics to pinpoint cost leaks.',
        descFr: 'Analyse de vos anciennes campagnes Facebook/Instagram et détection des pertes.'
      },
      {
        titleAr: 'صياغة الزوايا الإعلانية والـ Creatives',
        titleEn: 'Ad Angles & Creative Setup',
        titleFr: 'Angles Marketing & Créas',
        descAr: 'تجهيز التصاميم والفيديوهات والنصوص الإعلانية الموجهة للجمهور المستهدف.',
        descEn: 'Preparing hooks, visuals, and ad copy aligned with buyer psychology.',
        descFr: 'Préparation des visuels, vidéos et textes adaptés à votre cible.'
      },
      {
        titleAr: 'الإطلاق والتحسين اليومي للنتائج',
        titleEn: 'Launch & Daily CPL Tuning',
        titleFr: 'Lancement & Optimisation du CPL',
        descAr: 'تشغيل الحملات ومراقبة تكلفة العميل المحتمل وجودة الرسائل الواردة يومياً.',
        descEn: 'Pushing campaigns live and optimizing daily for lead quality and ROAS.',
        descFr: 'Diffusion des campagnes et ajustement quotidien pour maximiser la qualité des leads.'
      }
    ]
  },

  'google-ads': {
    slug: 'google-ads',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'إعلانات Google (بحث، خرائط، ويوتيوب)',
    nameEn: 'Google Ads (Search, Maps & YouTube)',
    nameFr: 'Publicité Google Ads (Search, Maps & YouTube)',
    descAr: 'حملات بحث Google الموجهة لاقتناص العملاء الذين يبحثون فعلياً عن خدماتك أو منتجاتك في نفس لحظة قرار الشراء.',
    descEn: 'High-intent Google Search, Local Maps, and YouTube campaigns capturing prospects actively searching for your services.',
    descFr: 'Campagnes Google Search, Maps et YouTube ciblant les clients qui recherchent activement vos services au Maroc.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'marketing',
    order: 12,
    deliverablesAr: [
      'بحث شامل للكلمات المفتاحية الشرائية (High-Intent Keywords) بالفرنسية والعربية والإنجليزية',
      'إعداد قوائم الكلمات السلبية (Negative Keywords) لمنع النقرات الوهمية أو غير المؤهلة',
      'ربط Google Tag Manager وتتبع المكالمات الهاتفية ونقرات واتساب والنماذج',
      'تحسين نقاط الجودة (Quality Score) لتخفيض سعر النقرة (CPC) وتصدر النتائج الأولى'
    ],
    deliverablesEn: [
      'High-intent keyword research in French, Arabic, and English',
      'Strict negative keyword lists to block wasted clicks and irrelevant searches',
      'Google Tag Manager setup tracking phone calls, WhatsApp clicks, and form submits',
      'Quality Score optimization to lower Cost Per Click (CPC) and dominate top ranks'
    ],
    deliverablesFr: [
      'étude approfondie des mots-clés à forte intention d’achat (FR / AR / EN)',
      'Liste stricte de mots-clés négatifs pour bloquer les clics non qualifiés',
      'Configuration Google Tag Manager (appels, clics WhatsApp et formulaires)',
      'Optimisation du Quality Score pour réduire le CPC et dominer la 1ère page'
    ],
    packages: [
      {
        nameAr: 'حملات بحث Google الأساسية (Search Intent)',
        nameEn: 'Google Search Intent Setup',
        nameFr: 'Pack Google Search Intention',
        featuresAr: [
          'دراسة وهيكلة الكلمات المفتاحية الشرائية والكلمات السلبية',
          'كتابة الإعلانات النصية المتجاوبة (RSA) وإضافات الإعلانات',
          'إعداد تتبع التحويلات عبر Google Tag Manager',
          'تحسين أسبوعي لعروض الأسعار وتقرير شهري'
        ],
        featuresEn: [
          'High-intent keyword mapping & negative keyword filtering',
          'Responsive Search Ads (RSA) copywriting & ad extensions',
          'Conversion tracking via Google Tag Manager',
          'Weekly bid adjustments and monthly analytics report'
        ],
        featuresFr: [
          'Ciblage de mots-clés intentionnistes et mots-clés négatifs',
          'Rédaction d’annonces Responsive Search (RSA) et extensions',
          'Suivi des conversions via Google Tag Manager',
          'Ajustement hebdomadaire des enchères et rapport mensuel'
        ]
      },
      {
        nameAr: 'الهيمنة الكاملة على Google (Search + Performance Max)',
        nameEn: 'Full Google Dominance (Search + PMax)',
        nameFr: 'Domination Google (Search + Performance Max)',
        isPopular: true,
        featuresAr: [
          'حملات البحث + Performance Max + إعلانات Google Maps المحلية',
          'إعادة استهداف زوار الموقع عبر شبكة Google Display وYouTube',
          'تحسين مستمر لمعدل التحويل (CRO) مع صفحات الهبوط',
          'لوحة تقارير حية لتتبع تكلفة كل مكالمة وكل طلب عرض سعر'
        ],
        featuresEn: [
          'Search + Performance Max + Local Google Maps campaigns',
          'Display & YouTube remarketing for website visitors',
          'Landing page conversion rate optimization (CRO) alignment',
          'Live dashboard tracking cost per call and cost per quote'
        ],
        featuresFr: [
          'Campagnes Search + Performance Max + Google Maps local',
          'Remarketing Display et YouTube pour les visiteurs du site',
          'Optimisation du taux de conversion (CRO) des landing pages',
          'Dashboard en direct du coût par appel et par demande de devis'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'هندسة الكلمات المفتاحية والنية الشرائية',
        titleEn: 'Keyword & Search Intent Mapping',
        titleFr: 'Cartographie des Mots-Clés',
        descAr: 'فرز الكلمات التي تدل على رغبة فورية في الشراء واستبعاد الكلمات المعلوماتية العامة.',
        descEn: 'Isolating buyer-intent search terms and excluding non-converting queries.',
        descFr: 'Sélection des requêtes d’achat immédiat et exclusion des recherches informatives.'
      },
      {
        titleAr: 'بناء المجموعات الإعلانية وتتبع التحويلات',
        titleEn: 'Ad Groups & GTM Conversion Setup',
        titleFr: 'Groupes d’Annonces & Suivi GTM',
        descAr: 'كتابة إعلانات مطابقة لبحث العميل وربط تتبع المكالمات والنماذج بدقة.',
        descEn: 'Structuring tightly themed ad groups and verifying conversion triggers.',
        descFr: 'Création d’annonces ultra-pertinentes et configuration des balises de conversion.'
      },
      {
        titleAr: 'تنقية عبارات البحث وتخفيض تكلفة النقرة',
        titleEn: 'Search Terms Pruning & Bid Tuning',
        titleFr: 'Filtrage des Termes & Optimisation CPC',
        descAr: 'مراجعة عبارات البحث الفعلية أسبوعياً لرفع جودة العملاء وتخفيض التكلفة.',
        descEn: 'Weekly search-term audits to maximize lead quality and reduce CPA.',
        descFr: 'Audit hebdomadaire des termes recherchés pour réduire le coût par acquisition.'
      }
    ]
  },

  'tiktok-ads': {
    slug: 'tiktok-ads',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'إعلانات TikTok وجلب المبيعات',
    nameEn: 'TikTok Ads & Viral Acquisition',
    nameFr: 'Publicité TikTok & Acquisition Vidéo',
    descAr: 'إدارة حملات TikTok الإعلانية بمحتوى فيديو عمودي أصيل يخطف الانتباه في أول 3 ثوانٍ ويحول المشاهدات إلى طلبات فعلية.',
    descEn: 'Native TikTok advertising campaigns engineered around vertical video hooks that turn views into leads and e-commerce orders.',
    descFr: 'Campagnes publicitaires TikTok natives basées sur des vidéos verticales percutantes pour générer des prospects et des ventes.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'marketing',
    order: 13,
    deliverablesAr: [
      'إعداد TikTok Business Center وربط TikTok Pixel وEvents API بالموقع أو المتجر',
      'توجيه إبداعي للفيديوهات العمودية (Spark Ads & Native UGC Hooks) المتوافقة مع خوارزمية TikTok',
      'حملات توليد العملاء المحتملين (Lead Generation) وحملات التحويل المباشر للمتاجر',
      'مكافحة إجهاد الإعلان (Creative Fatigue) عبر تدوير الزوايا الإعلانية أسبوعياً'
    ],
    deliverablesEn: [
      'TikTok Business Center, Pixel, and Events API setup for accurate attribution',
      'Creative direction for native vertical ads and Spark Ads built for TikTok’s algorithm',
      'Instant Lead Generation forms and Website Conversion campaign structures',
      'Proactive creative rotation to prevent ad fatigue and maintain low CPA'
    ],
    deliverablesFr: [
      'Configuration TikTok Business Center, Pixel et Events API',
      'Direction créative pour vidéos verticales natives et Spark Ads',
      'Campagnes de génération de leads instantanés et conversions e-commerce',
      'Rotation régulière des créas pour éviter la fatigue publicitaire'
    ],
    packages: [
      {
        nameAr: 'إطلاق حملات TikTok (Native Launch)',
        nameEn: 'TikTok Native Launch Scope',
        nameFr: 'Pack Lancement TikTok Ads',
        featuresAr: [
          'إعداد TikTok Pixel وهيكلة حملات الاستحواذ',
          'إدارة واختبار 4 زوايا فيديو إعلانية شهرياً',
          'ربط استمارة العملاء الفورية أو صفحة الهبوط',
          'تقرير أداء نصف شهري بتكلفة الطلب والتحويل'
        ],
        featuresEn: [
          'TikTok Pixel setup and prospecting campaign structure',
          'Testing and managing 4 video ad variations monthly',
          'Instant form or landing page conversion integration',
          'Bi-weekly performance and CPA analytics report'
        ],
        featuresFr: [
          'Configuration du Pixel TikTok et structure d’acquisition',
          'Gestion et test de 4 variations vidéo par mois',
          'Intégration formulaire instantané ou landing page',
          'Rapport bimensuel sur le coût par acquisition'
        ]
      },
      {
        nameAr: 'توسيع مبيعات TikTok (Spark & Scale)',
        nameEn: 'TikTok Spark & Scale System',
        nameFr: 'Pack TikTok Croissance & Scaling',
        isPopular: true,
        featuresAr: [
          'إدارة حملات Spark Ads + Website Conversions + Retargeting',
          'اختبار 8 إلى 10 مقاطع وHooks مختلفة شهرياً',
          'تحسين يومي للميزانيات وتوسيع الحملات الرابحة',
          'لوحة تتبع حية للمبيعات والعملاء المحتملين'
        ],
        featuresEn: [
          'Full Spark Ads + Website Conversions + Retargeting stack',
          'Testing 8–10 video hooks and creative angles monthly',
          'Daily bid optimization and aggressive scaling of winners',
          'Live attribution dashboard for leads and store orders'
        ],
        featuresFr: [
          'Stratégie complète Spark Ads + Conversions + Retargeting',
          'Test de 8 à 10 accroches vidéo (Hooks) par mois',
          'Optimisation quotidienne et scaling des campagnes gagnantes',
          'Tableau de bord en temps réel des ventes et prospects'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'تحليل ترندات القطاع وتجهيز الـ Hooks',
        titleEn: 'Hook Strategy & Pixel Setup',
        titleFr: 'Stratégie de Hooks & Pixel',
        descAr: 'صياغة خطافات بصرية وصوتية للثواني الـ 3 الأولى تتناسب مع جمهور TikTok في المغرب.',
        descEn: 'Designing 3-second visual/audio hooks native to Moroccan TikTok audiences.',
        descFr: 'Conception d’accroches visuelles pour les 3 premières secondes sur TikTok.'
      },
      {
        titleAr: 'إطلاق اختبارات الإعلانات والجماهير',
        titleEn: 'Creative & Audience Split-Testing',
        titleFr: 'Tests Créatifs & Audiences',
        descAr: 'تشغيل عدة فيديوهات بالتوازي لاكتشاف الإعلان صاحب أقل تكلفة للتحويل.',
        descEn: 'Running split tests across creatives to isolate top-performing assets.',
        descFr: 'Lancement de tests comparatifs pour identifier les vidéos les plus rentables.'
      },
      {
        titleAr: 'مضاعفة النتائج وتحديث المحتوى',
        titleEn: 'Scaling & Creative Refresh',
        titleFr: 'Scaling & Renouvellement Créatif',
        descAr: 'رفع ميزانية الفيديوهات الرابحة وتغذية الحساب بمقاطع جديدة للحفاظ على استقرار التكلفة.',
        descEn: 'Scaling winning ad sets while refreshing hooks to sustain ROAS.',
        descFr: 'Augmentation des budgets gagnants et rafraîchissement des vidéos.'
      }
    ]
  },

  'advertising-audit': {
    slug: 'advertising-audit',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'تدقيق واستراتيجية الإعلانات الممولة',
    nameEn: 'Paid Advertising Audit & Growth Roadmap',
    nameFr: 'Audit Publicitaire & Stratégie de Croissance',
    descAr: 'فحص تقني وتسويقي شامل لحساباتك الإعلانية الحالية (Meta / Google / TikTok) لتشخيص أسباب هدر الميزانية وتقديم خطة إصلاح عملية.',
    descEn: 'Deep-dive technical and creative audit of your Meta, Google, or TikTok ad accounts to eliminate wasted spend and boost ROAS.',
    descFr: 'Audit technique et stratégique complet de vos comptes Meta, Google ou TikTok pour stopper les pertes et maximiser votre ROAS.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'marketing',
    order: 14,
    deliverablesAr: [
      'فحص صحة إعدادات الـ Pixel، أحداث التحويل، وجودة البيانات المرسلة للمنصات',
      'تحليل تاريخي للحملات السابقة لتحديد الإعلانات والجماهير التي تستنزف الميزانية',
      'تقييم كامل لمسار التحويل (Landing Page + سرعة الرد في واتساب + العرض التسويقي)',
      'تسليم خارطة طريق مكتوبة لـ 90 يوماً مع جلسة فيديو لشرح الإصلاحات خطوة بخطوة'
    ],
    deliverablesEn: [
      'Technical inspection of Pixel health, conversion events, and attribution accuracy',
      'Historical spend analysis identifying budget leaks and underperforming audiences',
      'Full funnel conversion review (Ad Creative -> Landing Page -> WhatsApp Sales Flow)',
      'Actionable 90-day recovery roadmap with a live 1-on-1 strategy walkthrough'
    ],
    deliverablesFr: [
      'Vérification technique du Pixel, des événements de conversion et de l’attribution',
      'Analyse historique des dépenses pour identifier les fuites de budget',
      'Audit complet du tunnel (Créas -> Landing Page -> Processus de vente WhatsApp)',
      'Plan d’action détaillé sur 90 jours avec session vidéo de restitution'
    ],
    packages: [
      {
        nameAr: 'تدقيق حساب إعلاني واحد + خطة إصلاح',
        nameEn: 'Single-Platform Ad Account Audit',
        nameFr: 'Audit Compte Publicitaire Unique',
        featuresAr: [
          'فحص شامل لحساب إعلاني واحد (Meta أو Google أو TikTok)',
          'تدقيق إعدادات البيكسل وتتبع التحويلات',
          'مراجعة صفحة الهبوط والرسائل الإعلانية الحالية',
          'تقرير PDF مفصل + جلسة استشارية مدتها 60 دقيقة'
        ],
        featuresEn: [
          'Deep-dive audit of 1 ad account (Meta, Google, or TikTok)',
          'Pixel and conversion tracking verification',
          'Landing page and ad creative conversion critique',
          'Detailed PDF audit report + 60-minute strategy session'
        ],
        featuresFr: [
          'Audit approfondi d’un compte (Meta, Google ou TikTok)',
          'Vérification du Pixel et du suivi des conversions',
          'Critique orientée conversion de vos créas et landing page',
          'Rapport d’audit PDF détaillé + session stratégique de 60 min'
        ]
      },
      {
        nameAr: 'تدقيق منظومة النمو الكاملة (Multi-Channel + Funnel)',
        nameEn: 'Full Growth Funnel & Multi-Platform Audit',
        nameFr: 'Audit Global Multi-Plateformes & Tunnel',
        isPopular: true,
        featuresAr: [
          'تدقيق جميع القنوات الإعلانية (Meta + Google + TikTok)',
          'تحليل المنافسين وإعادة صياغة العرض التسويقي (Offer Positioning)',
          'إصلاح أخطاء البيكسل وGoogle Tag Manager عملياً',
          'خطة نمو تنفيذية لـ 90 يوماً جاهزة للتطبيق الفوري'
        ],
        featuresEn: [
          'Audit across all active ad channels (Meta + Google + TikTok)',
          'Competitor teardown and offer positioning restructuring',
          'Hands-on fix of broken Pixel and GTM tracking tags',
          'Complete 90-day execution roadmap ready for implementation'
        ],
        featuresFr: [
          'Audit de tous vos canaux publicitaires (Meta + Google + TikTok)',
          'Analyse concurrentielle et repositionnement de votre offre',
          'Correction technique directe des erreurs Pixel et GTM',
          'Feuille de route opérationnelle sur 90 jours prête à l’emploi'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'ربط القراءة واستخراج البيانات',
        titleEn: 'Read-Only Access & Data Extraction',
        titleFr: 'Accès Lecture & Extraction de Données',
        descAr: 'الاطلاع الآمن على إحصائيات الحساب الإعلاني وإعدادات التتبع خلال آخر 6 إلى 12 شهراً.',
        descEn: 'Securely reviewing historical campaign metrics and tracking configurations.',
        descFr: 'Analyse sécurisée de l’historique de vos campagnes et de votre tracking.'
      },
      {
        titleAr: 'تشخيص الهدر ونقاط الاختناق',
        titleEn: 'Leak Detection & Funnel Bottlenecks',
        titleFr: 'Détection des Pertes & Blocages',
        descAr: 'تحديد أسباب ارتفاع تكلفة العميل المحتمل أو ضعف التحويل في الصفحة أو الواتساب.',
        descEn: 'Pinpointing exactly where ad spend is wasted or leads drop off.',
        descFr: 'Identification précise des sources de gaspillage budgétaire.'
      },
      {
        titleAr: 'تسليم التقرير وجلسة خطة العمل',
        titleEn: 'Roadmap Delivery & Strategy Call',
        titleFr: 'Remise du Plan d’Action & Coaching',
        descAr: 'شرح التوصيات خطوة بخطوة مع أولويات التنفيذ السريعة لمضاعفة العائد.',
        descEn: 'Walking through prioritized quick wins and long-term scaling steps.',
        descFr: 'Présentation des actions prioritaires pour redresser rapidement votre ROAS.'
      }
    ]
  },

  // ============================================================================
  // PILLAR 2: WEB DEVELOPMENT, FUNNELS & E-COMMERCE (order: 2, sub-orders: 21..29)
  // ============================================================================
  'business-website': {
    slug: 'business-website',
    categoryKey: 'WEB_DEVELOPMENT',
    nameAr: 'تطوير المواقع والمتاجر الإلكترونية',
    nameEn: 'Business Websites, Funnels & E-commerce',
    nameFr: 'Sites Web, Landing Pages & E-commerce',
    descAr: 'تصميم وتطوير مواقع للشركات، صفحات هبوط عالية التحويل، ومتاجر إلكترونية متكاملة وسريعة، مهيأة لمحركات البحث ومصممة لتحويل الزوار إلى عملاء.',
    descEn: 'Design and development of corporate websites, conversion landing pages, and full e-commerce stores engineered for speed, SEO, and high conversion.',
    descFr: 'Conception et développement de sites vitrines, landing pages et boutiques e-commerce rapides, optimisés SEO et orientés conversion.',
    showInCatalog: true,
    showInQuoteForm: true,
    parentSlug: null,
    order: 2,
    deliverablesAr: [
      'تصميم واجهات مخصصة (UI/UX) عصرية ومتجاوبة 100% مع الهواتف وجميع الشاشات',
      'دعم تعدد اللغات (العربية، الفرنسية، الإنجليزية) مع تهيئة تقنية كاملة لمحركات البحث (Technical SEO)',
      'ربط مباشر مع واتساب، استمارات طلب العرض الذكية، وبيكسلات الإعلانات (Meta, Google, TikTok)',
      'سرعة تحميل فائقة وحماية أمنية عالية مع لوحة تحكم سهلة لإدارة المحتوى والطلبات'
    ],
    deliverablesEn: [
      'Custom mobile-first UI/UX design engineered around brand trust and lead conversion',
      'Full multilingual architecture (AR/FR/EN) with technical SEO and schema markup',
      'Direct WhatsApp integration, smart lead capture forms, and ad tracking pixels',
      'Lightning-fast performance, SSL security, and an intuitive admin dashboard'
    ],
    deliverablesFr: [
      'Design UI/UX sur-mesure, mobile-first, conçu pour inspirer confiance et convertir',
      'Architecture multilingue (AR/FR/EN) avec optimisation SEO technique complète',
      'Intégration directe WhatsApp, formulaires intelligents et pixels publicitaires',
      'Performance ultra-rapide, sécurité SSL et interface d’administration intuitive'
    ],
    packages: [
      {
        nameAr: 'موقع تعريفي احترافي للشركات',
        nameEn: 'Corporate Business Website',
        nameFr: 'Site Vitrine Professionnel',
        featuresAr: [
          'تصميم عصري متجاوب مع جميع الشاشات (حتى 7 صفحات رئيسية)',
          'تعدد اللغات (عربي / فرنسي / إنجليزي)',
          'تهيئة كاملة لمحركات البحث (SEO) وخريطة الموقع',
          'ربط مباشر مع واتساب ونماذج طلب العروض'
        ],
        featuresEn: [
          'Modern responsive UI/UX design (up to 7 core pages)',
          'Multilingual support (AR/FR/EN)',
          'Technical SEO optimization and sitemap setup',
          'Direct WhatsApp & lead capture integration'
        ],
        featuresFr: [
          'Design moderne et responsive (jusqu’à 7 pages clés)',
          'Support multilingue (AR/FR/EN)',
          'Optimisation SEO technique et sitemap',
          'Intégration WhatsApp et formulaires de contact'
        ]
      },
      {
        nameAr: 'منصة أعمال أو متجر إلكتروني متكامل',
        nameEn: 'Full E-commerce or Custom Web Platform',
        nameFr: 'Boutique E-commerce ou Plateforme Sur-Mesure',
        isPopular: true,
        featuresAr: [
          'إدارة كاملة للخدمات أو المنتجات والطلبيات والعملاء',
          'دعم الدفع عند الاستلام (COD) والدفع الإلكتروني بالمغرب والخارج',
          'ربط بيكسلات التتبع المتقدمة وأتمتة إشعارات واتساب/CRM',
          'لوحة تحكم شاملة مع تدريب للفريق ودعم فني'
        ],
        featuresEn: [
          'Complete management of services, products, orders, and leads',
          'Cash on Delivery (COD) & online payment gateway integration',
          'Advanced ad pixels + WhatsApp/CRM automation hooks',
          'Full admin dashboard with team onboarding and support'
        ],
        featuresFr: [
          'Gestion complète des services, produits, commandes et prospects',
          'Paiement à la livraison (COD) et passerelles de paiement en ligne',
          'Pixels publicitaires avancés et automatisation WhatsApp/CRM',
          'Tableau de bord complet avec formation et support technique'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'تحليل المتطلبات وتجربة المستخدم',
        titleEn: 'UX Architecture & Wireframing',
        titleFr: 'Architecture UX & Maquettage',
        descAr: 'رسم هيكل الموقع ومسار الزائر لضمان سهولة التصفح وزيادة التحويلات.',
        descEn: 'Mapping user journeys and page structures to maximize engagement.',
        descFr: 'Conception de l’arborescence et du parcours utilisateur.'
      },
      {
        titleAr: 'البرمجة والتطوير المتقدم',
        titleEn: 'Full-Stack Development',
        titleFr: 'Développement & Intégration',
        descAr: 'بناء الموقع بأحدث التقنيات لضمان سرعة فائقة وأمان عالٍ.',
        descEn: 'Coding with modern frameworks for lightning-fast performance and security.',
        descFr: 'Développement avec les technologies les plus rapides et sécurisées.'
      },
      {
        titleAr: 'الاختبار والإطلاق الرسمي',
        titleEn: 'QA Testing & Launch',
        titleFr: 'Tests & Mise en Ligne',
        descAr: 'فحص شامل للأداء والربط مع النطاق الرسمي وأدوات التحليل.',
        descEn: 'Rigorous testing across devices, domain deployment, and analytics setup.',
        descFr: 'Vérification complète, déploiement sur votre domaine et suivi.'
      }
    ]
  },

  'landing-page': {
    slug: 'landing-page',
    categoryKey: 'WEB_DEVELOPMENT',
    nameAr: 'صفحة هبوط احترافية عالية التحويل (Landing Page)',
    nameEn: 'High-Converting Landing Page & Lead Funnel',
    nameFr: 'Landing Page Professionnelle Haute Conversion',
    descAr: 'تصميم وبرمجة صفحة هبوط مخصصة للحملات الإعلانية، مبنية وفق سيكولوجية الإقناع لتحويل أكبر نسبة من النقرات إلى عملاء فعليين.',
    descEn: 'Custom-engineered conversion landing pages designed specifically for paid ad traffic to maximize lead generation and sales.',
    descFr: 'Page de capture rapide et persuasive conçue spécialement pour vos campagnes publicitaires afin de maximiser votre taux de conversion.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'business-website',
    order: 21,
    deliverablesAr: [
      'كتابة المحتوى التسويقي الإقناعي (Copywriting) شاملاً العنوان الخاطف، معالجة الاعتراضات، والضمانات',
      'تصميم سريع التحميل جداً على الهواتف (أقل من ثانيتين) لمنع ارتداد زوار الإعلانات',
      'دمج استمارة تأهيل ذكية أو زر تحويل مباشر إلى واتساب مع تتبع كامل للأحداث',
      'تهيئة جاهزة لاختبارات A/B Testing مع دعم فني لمدة 30 يوماً بعد الإطلاق'
    ],
    deliverablesEn: [
      ' Direct-response copywriting covering value proposition, social proof, and objection handling',
      'Ultra-fast mobile loading (<2 seconds) to eliminate ad traffic bounce',
      'Embedded lead qualification form + direct WhatsApp trigger with full pixel tracking',
      'A/B testing ready layout with 30 days of post-launch technical support'
    ],
    deliverablesFr: [
      'Copywriting persuasif (promesse, preuves sociales, traitement des objections)',
      'Chargement mobile ultra-rapide (<2s) pour réduire le taux de rebond publicitaire',
      'Formulaire de qualification intégré + bouton WhatsApp avec suivi Pixel complet',
      'Structure prête pour l’A/B testing et 30 jours de support après mise en ligne'
    ],
    packages: [
      {
        nameAr: 'صفحة هبوط لتحويل الإعلانات (Single Offer Funnel)',
        nameEn: 'Single-Offer Conversion Landing Page',
        nameFr: 'Landing Page Offre Unique',
        featuresAr: [
          'تصميم واجهة مخصصة ومتجاوبة 100% مع الجوال',
          'كتابة المحتوى التسويقي المقنع بلغة واحدة',
          'ربط استمارة الطلب والـ واتساب والـ Pixels',
          'دعم فني وتعديلات لمدة 30 يوماً'
        ],
        featuresEn: [
          'Custom mobile-first conversion UI layout',
          'Persuasive direct-response copywriting (1 locale)',
          'Lead form, WhatsApp & ad pixel integration',
          '30 days of post-launch support and tweaks'
        ],
        featuresFr: [
          'Design sur-mesure 100% optimisé mobile',
          'Rédaction persuasive orientée conversion (1 langue)',
          'Formulaire, WhatsApp et pixels publicitaires configurés',
          'Support et ajustements pendant 30 jours'
        ]
      },
      {
        nameAr: 'منظومة هبوط متعددة اللغات + ربط CRM',
        nameEn: 'Multilingual Funnel + CRM & A/B Suite',
        nameFr: 'Tunnel Multilingue + CRM & A/B Testing',
        isPopular: true,
        featuresAr: [
          'صفحة هبوط متعددة اللغات (AR / FR) مع نسختين لاختبار A/B',
          'صفحة شكر (Thank You Page) مخصصة لتتبع التحويل الدقيق',
          'ربط تلقائي للطلبات مع Notion / Google Sheets / CRM',
          'تحليل خرائط الحرارة (Heatmaps) لتحسين نسبة التحويل'
        ],
        featuresEn: [
          'Multilingual landing page (AR/FR) + 2 A/B headline variants',
          'Dedicated Thank-You page for exact conversion tracking',
          'Automated lead sync to Notion, Google Sheets, or CRM',
          'Heatmap installation for post-launch CRO tuning'
        ],
        featuresFr: [
          'Landing page multilingue (AR/FR) + 2 variantes A/B',
          'Page de remerciement dédiée pour un suivi exact des conversions',
          'Synchronisation automatique des leads vers Notion / CRM',
          'Installation de heatmaps pour optimiser le taux de conversion'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'هيكلة العرض التسويقي والتسلسل الإقناعي',
        titleEn: 'Offer Structuring & Wireframe',
        titleFr: 'Structuration de l’Offre & Wireframe',
        descAr: 'بناء تسلسل الأقسام (المشكلة، الحل، الإثبات الاجتماعي، العرض، والدعوة لاتخاذ إجراء).',
        descEn: 'Mapping the persuasive flow: Hook, Problem, Solution, Proof, and CTA.',
        descFr: 'Architecture persuasive : Accroche, Problème, Solution, Preuves et Appel à l’action.'
      },
      {
        titleAr: 'التصميم البصري والبرمجة السريعة',
        titleEn: 'High-Speed UI Development',
        titleFr: 'Design UI & Développement Rapide',
        descAr: 'تطوير الصفحة بأداء فائق السرعة وتجربة استخدام سلسة على الهواتف الذكية.',
        descEn: 'Coding a lightweight, high-converting interface optimized for mobile ad clicks.',
        descFr: 'Développement d’une page ultra-rapide adaptée au trafic mobile.'
      },
      {
        titleAr: 'ربط التتبع واختبار التحويل',
        titleEn: 'Pixel Tracking & Conversion QA',
        titleFr: 'Configuration Pixels & Tests',
        descAr: 'التأكد من عمل جميع الاستمارات وأحداث البيكسل قبل توجيه الميزانية الإعلانية.',
        descEn: 'Verifying every form field, webhook, and pixel event before sending live traffic.',
        descFr: 'Validation des formulaires, webhooks et événements Pixel avant lancement.'
      }
    ]
  },

  'ecommerce-store': {
    slug: 'ecommerce-store',
    categoryKey: 'WEB_DEVELOPMENT',
    nameAr: 'تصميم وتطوير متجر إلكتروني متكامل',
    nameEn: 'E-commerce Store Design & Development',
    nameFr: 'Création de Boutique E-commerce Clé en Main',
    descAr: 'إنشاء متجر إلكتروني احترافي مصمم لرفع معدل الشراء وقيمة السلة، مع دعم كامل للدفع عند الاستلام (COD) والدفع الإلكتروني والربط مع شركات التوصيل.',
    descEn: 'Complete e-commerce store built to maximize checkout completion and average order value, with COD, online payments, and shipping integrations.',
    descFr: 'Boutique e-commerce complète conçue pour maximiser vos ventes en ligne, avec paiement à la livraison (COD), paiement par carte et livraison.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'business-website',
    order: 22,
    deliverablesAr: [
      'تجربة شراء سريعة ومبسطة (One-Step COD Form & Express Checkout) تناسب المتسوق المغربي',
      'إدارة متكاملة للمنتجات، التصنيفات، المتغيرات (المقاسات/الألوان)، والمخزون',
      'ربط بيكسلات التجارة الإلكترونية (AddToCart, InitiateCheckout, Purchase) مع Meta وTikTok وGoogle',
      'عروض زيادة قيمة السلة (Upsells / Cross-sells / Bundles) وتنبيهات السلات المتروكة'
    ],
    deliverablesEn: [
      'Frictionless checkout experience with 1-step COD form and online payment options',
      'Complete catalog management for products, variants, collections, and inventory',
      'Full e-commerce event tracking (ViewContent, AddToCart, Purchase) for Meta, TikTok & Google',
      'Built-in AOV boosters (bundles, upsells) and abandoned cart recovery workflows'
    ],
    deliverablesFr: [
      'Tunnel de commande ultra-fluide avec formulaire COD rapide et paiement en ligne',
      'Gestion complète du catalogue produits, variantes, collections et stocks',
      'Tracking e-commerce complet (AddToCart, Purchase) pour Meta, TikTok et Google',
      'Fonctionnalités d’augmentation du panier moyen (Upsell/Bundles) et relance paniers'
    ],
    packages: [
      {
        nameAr: 'متجر الإطلاق السريع (COD & Brand Store)',
        nameEn: 'COD & Brand Launch Store',
        nameFr: 'Boutique E-commerce Lancement & COD',
        featuresAr: [
          'تصميم متجر احترافي متجاوب وسريع مع هوية علامتك',
          'نموذج طلب سريع للدفع عند الاستلام (COD) في صفحة المنتج',
          'إضافة وتنظيم أول 20 منتجاً مع صفحات السياسات والشحن',
          'ربط بيكسلات الإعلانات وGoogle Sheets لتتبع الطلبات'
        ],
        featuresEn: [
          'Custom branded storefront optimized for mobile shoppers',
          'Direct 1-step Cash-on-Delivery (COD) order form on product pages',
          'Setup of up to 20 initial products + legal & shipping pages',
          'Ad pixels integration and Google Sheets order sync'
        ],
        featuresFr: [
          'Boutique personnalisée aux couleurs de votre marque et optimisée mobile',
          'Formulaire de commande directe COD sur les fiches produits',
          'Intégration de 20 produits initiaux + pages légales et livraison',
          'Configuration des pixels publicitaires et synchronisation Google Sheets'
        ]
      },
      {
        nameAr: 'متجر التجارة الإلكترونية المتقدم (Scale & Automation)',
        nameEn: 'Advanced E-commerce & Automation Suite',
        nameFr: 'Boutique E-commerce Avancée & Automatisée',
        isPopular: true,
        featuresAr: [
          'متجر متكامل متعدد اللغات والعملات (COD + بوابات الدفع الإلكتروني CMI/Stripe)',
          'نظام عروض الكميات والـ Upsell لرفع متوسط قيمة الطلب (AOV)',
          'تأكيد تلقائي للطلبات وتتبع الشحن عبر واتساب',
          'ربط مع شركات التوصيل ولوحة إحصائيات المبيعات وتدريب الفريق'
        ],
        featuresEn: [
          'Multi-language/currency store with COD + online payment gateways (CMI/Stripe)',
          'Quantity bundles and post-purchase upsells to boost Average Order Value',
          'Automated WhatsApp order confirmation and shipping status updates',
          'Shipping carrier integration, analytics dashboard, and team training'
        ],
        featuresFr: [
          'Boutique multilingue avec COD + paiement en ligne (CMI / Stripe)',
          'Offres groupées (Bundles) et Upsells pour augmenter le panier moyen',
          'Confirmation de commande et suivi de livraison automatisés sur WhatsApp',
          'Intégration sociétés de livraison, analytics et formation de votre équipe'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'هيكلة المتجر وتجربة الشراء',
        titleEn: 'Storefront & Checkout Architecture',
        titleFr: 'Architecture Boutique & Tunnel d’Achat',
        descAr: 'تصميم صفحات المنتجات وسلة المشتريات لتقليل خطوات الشراء إلى الحد الأدنى.',
        descEn: 'Designing product pages and checkout flows to minimize cart abandonment.',
        descFr: 'Conception des fiches produits et du paiement pour réduire les abandons.'
      },
      {
        titleAr: 'إعداد المنتجات، الدفع، والشحن',
        titleEn: 'Catalog, Payment & Shipping Setup',
        titleFr: 'Catalogue, Paiement & Livraison',
        descAr: 'رفع المنتجات، ضبط أسعار التوصيل حسب المدن، وتفعيل طرق الدفع.',
        descEn: 'Configuring product variants, city shipping rates, and payment methods.',
        descFr: 'Paramétrage des produits, tarifs de livraison par ville et moyens de paiement.'
      },
      {
        titleAr: 'ربط البيكسلات والأتمتة والإطلاق',
        titleEn: 'Pixel Tracking, Automation & Launch',
        titleFr: 'Tracking, Automatisation & Lancement',
        descAr: 'اختبار دورة الطلب الكاملة من النقر على الإعلان حتى وصول الطلب إلى لوحة التحكم وواتساب.',
        descEn: 'Testing the full order lifecycle from ad click to WhatsApp confirmation.',
        descFr: 'Validation complète du cycle de commande avant le lancement publicitaire.'
      }
    ]
  },

  'website-maintenance': {
    slug: 'website-maintenance',
    categoryKey: 'WEB_DEVELOPMENT',
    nameAr: 'صيانة وإدارة وحماية المواقع الإلكترونية',
    nameEn: 'Website Maintenance, Security & Performance Care',
    nameFr: 'Maintenance, Sécurité & Gestion de Site Web',
    descAr: 'رعاية تقنية مستمرة لموقعك أو متجرك تشمل النسخ الاحتياطي الدوري، التحديثات الأمنية، مراقبة السرعة، والتدخل السريع لإصلاح أي عطل.',
    descEn: 'Proactive technical care including automated backups, security patching, speed optimization, and priority bug resolution.',
    descFr: 'Maintenance préventive et corrective incluant sauvegardes automatiques, sécurité, optimisation de vitesse et support prioritaire.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'business-website',
    order: 23,
    deliverablesAr: [
      'نسخ احتياطي أسبوعي/يومي خارجي لقاعدة البيانات والملفات مع إمكانية الاستعادة الفورية',
      'مراقبة على مدار الساعة (24/7 Uptime Monitoring) وشهادات الأمان والحماية من الهجمات',
      'تحسين دوري لسرعة التحميل ومؤشرات Google Core Web Vitals',
      'ساعات عمل شهرية مخصصة لتحديث المحتوى، إضافة صفحات أو تعديل الأسعار والعروض'
    ],
    deliverablesEn: [
      'Automated daily/weekly off-site backups of files and databases with instant restore',
      '24/7 uptime monitoring, SSL management, and malware/firewall protection',
      'Ongoing Core Web Vitals and mobile page speed optimization',
      'Dedicated monthly developer hours for content updates and feature tweaks'
    ],
    deliverablesFr: [
      'Sauvegardes externes automatisées (base de données et fichiers) avec restauration rapide',
      'Surveillance 24/7 de la disponibilité, gestion SSL et protection anti-intrusion',
      'Optimisation continue de la vitesse et des Core Web Vitals',
      'Heures de développement mensuelles incluses pour vos mises à jour de contenu'
    ],
    packages: [
      {
        nameAr: 'باقة الحماية والاستقرار الأساسية',
        nameEn: 'Essential Security & Backup Care',
        nameFr: 'Forfait Maintenance & Sécurité Essentiel',
        featuresAr: [
          'نسخ احتياطي أسبوعي وفحص أمني شامل',
          'تحديث النظام والإضافات دون كسر وظائف الموقع',
          'مراقبة عمل الموقع واستقرار الاستضافة والنطاق',
          'تقرير فني شهري + ساعتين لتحديثات المحتوى'
        ],
        featuresEn: [
          'Weekly off-site backups and security scans',
          'Safe core and dependency updates with staging checks',
          '24/7 uptime and SSL certificate monitoring',
          'Monthly health report + 2 hours of content updates'
        ],
        featuresFr: [
          'Sauvegardes hebdomadaires et scan de sécurité complet',
          'Mises à jour techniques sécurisées sans interruption',
          'Surveillance 24/7 de la disponibilité et du certificat SSL',
          'Rapport technique mensuel + 2h de modifications incluses'
        ]
      },
      {
        nameAr: 'باقة الرعاية المتقدمة للأعمال والمتاجر (Priority SLA)',
        nameEn: 'Priority E-commerce & Business SLA',
        nameFr: 'Forfait Maintenance Prioritaire & Performance',
        isPopular: true,
        featuresAr: [
          'نسخ احتياطي يومي لقاعدة بيانات الطلبات والعملاء',
          'تحسين شهري لسرعة الموقع والـ SEO التقني',
          'أولوية قصوى للتدخل الطارئ خلال أقل من 4 ساعات',
          '6 ساعات تطوير وتعديل شهرياً لإضافة أقسام أو عروض جديدة'
        ],
        featuresEn: [
          'Daily database and order backups for active stores/platforms',
          'Monthly speed optimization and technical SEO audits',
          'Priority emergency response SLA (<4 hours)',
          '6 monthly development hours for new sections and promos'
        ],
        featuresFr: [
          'Sauvegardes quotidiennes des commandes et de la base de données',
          'Optimisation mensuelle de la vitesse et du SEO technique',
          'Intervention d’urgence prioritaire garantie (<4 heures)',
          '6 heures de développement par mois pour vos évolutions'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'الفحص الأولي وأخذ نسخة أمان',
        titleEn: 'Initial Health Audit & Baseline Backup',
        titleFr: 'Audit Technique Initial & Sauvegarde',
        descAr: 'فحص حالة الموقع الحالية وأخذ نسخة احتياطية كاملة وإغلاق الثغرات العاجلة.',
        descEn: 'Auditing current site health, taking a full backup, and patching urgent vulnerabilities.',
        descFr: 'Diagnostic complet du site, sauvegarde initiale et correction des failles critiques.'
      },
      {
        titleAr: 'تفعيل المراقبة والصيانة الدورية',
        titleEn: 'Automated Monitoring & Scheduled Care',
        titleFr: 'Surveillance 24/7 & Maintenance Régulière',
        descAr: 'ربط أنظمة التنبيه الفوري وجدولة التحديثات وفحوصات السرعة الأسبوعية.',
        descEn: 'Connecting uptime alerts and executing scheduled updates and speed checks.',
        descFr: 'Mise en place des alertes automatiques et des mises à jour planifiées.'
      },
      {
        titleAr: 'الدعم المستمر وتنفيذ التعديلات',
        titleEn: 'On-Demand Updates & Monthly Reporting',
        titleFr: 'Support Réactif & Rapport Mensuel',
        descAr: 'تنفيذ طلبات تحديث المحتوى الخاصة بك وإرسال ملخص شهري بأداء الموقع.',
        descEn: 'Handling your content/design requests and delivering monthly performance reports.',
        descFr: 'Réalisation de vos demandes de modifications et envoi du bilan mensuel.'
      }
    ]
  },

  web: {
    slug: 'web',
    categoryKey: 'WEB_DEVELOPMENT',
    nameAr: 'تطوير المنصات وتطبيقات الويب المخصصة',
    nameEn: 'Custom Web Platforms & SaaS Development',
    nameFr: 'Développement Web Sur-Mesure & Plateformes',
    descAr: 'هندسة وتطوير منصات رقمية مخصصة، بوابات عملاء (Client Portals)، وأنظمة حجز وإدارة داخلية مبنية بـ Next.js وقواعد بيانات حديثة.',
    descEn: 'Engineering bespoke web applications, client portals, booking engines, and internal business systems using Next.js and modern cloud databases.',
    descFr: 'Conception et développement d’applications web sur-mesure, portails clients et systèmes métier avec Next.js et bases de données modernes.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'business-website',
    order: 29,
    deliverablesAr: [
      'تحليل هندسي كامل للنظام وقواعد البيانات والصلاحيات (Role-Based Access Control)',
      'تطوير واجهات أمامية وخلفية (Full-Stack Next.js / TypeScript / PostgreSQL) عالية الأمان',
      'ربط واجهات البرمجة الخارجية (APIs، بوابات الدفع، أنظمة الفوترة، وCRM)',
      'نشر سحابي مستقر مع توثيق تقني وتدريب كامل لفريقك'
    ],
    deliverablesEn: [
      'Complete system architecture, database schema design, and role-based access control',
      'Secure full-stack development using Next.js, TypeScript, and PostgreSQL/Supabase',
      'Third-party API integrations (payment gateways, invoicing, CRM, and WhatsApp)',
      'Cloud deployment, technical documentation, and team training'
    ],
    deliverablesFr: [
      'Architecture système complète, modélisation de base de données et gestion des rôles',
      'Développement Full-Stack sécurisé (Next.js, TypeScript, PostgreSQL/Supabase)',
      'Intégrations API tierces (paiement, facturation, CRM et WhatsApp)',
      'Déploiement cloud, documentation technique et formation des équipes'
    ],
    packages: [
      {
        nameAr: 'تطوير منصة أو نظام MVP مخصص',
        nameEn: 'Custom Web App / MVP Build',
        nameFr: 'Développement Plateforme / MVP Sur-Mesure',
        isPopular: true,
        featuresAr: [
          'لوحة تحكم إدارية وبوابة مستخدمين بصلاحيات متعددة',
          'قاعدة بيانات علائقية مؤمنة وواجهات API مخصصة',
          'تصميم UI/UX متكامل متجاوب مع الهواتف والحواسيب',
          'فحص أمني وإطلاق رسمي مع ضمان صيانة 60 يوماً'
        ],
        featuresEn: [
          'Admin dashboard and multi-role client portal',
          'Secure relational database and custom API endpoints',
          'Complete responsive UI/UX design system',
          'Security audit, deployment, and 60-day warranty'
        ],
        featuresFr: [
          'Back-office administrateur et portail client multi-rôles',
          'Base de données relationnelle sécurisée et API sur-mesure',
          'Design system UI/UX complet et responsive',
          'Audit de sécurité, mise en production et garantie 60 jours'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'التحليل الوظيفي وهيكلة قاعدة البيانات',
        titleEn: 'System Specs & DB Modeling',
        titleFr: 'Cahier des Charges & Modélisation',
        descAr: 'تحديد جميع صلاحيات المستخدمين والعمليات البرمجية ومخطط البيانات.',
        descEn: 'Defining user roles, business logic, and database relationships.',
        descFr: 'Définition des rôles, de la logique métier et du schéma de données.'
      },
      {
        titleAr: 'التطوير على مراحل (Agile Sprints)',
        titleEn: 'Iterative Full-Stack Sprints',
        titleFr: 'Développement par Sprints',
        descAr: 'برمجة المنصة وعرض نسخ تجريبية دورية لمراجعتها معك أولاً بأول.',
        descEn: 'Building frontend and backend modules with regular staging demos.',
        descFr: 'Développement progressif avec démonstrations régulières sur serveur de test.'
      },
      {
        titleAr: 'الفحص الأمني والإطلاق السحابي',
        titleEn: 'Security QA & Cloud Deployment',
        titleFr: 'Recette Sécurité & Déploiement',
        descAr: 'اختبار الأداء والصلاحيات ونشر النظام على السيرفر الرسمي.',
        descEn: 'Security verification, load testing, and production rollout.',
        descFr: 'Validation de la sécurité, tests de charge et mise en ligne.'
      }
    ]
  },

  // ============================================================================
  // PILLAR 3: VIDEO PRODUCTION & AD CREATIVES (order: 3, sub-orders: 31..39)
  // ============================================================================
  'reels-social-video': {
    slug: 'reels-social-video',
    categoryKey: 'VIDEO_PRODUCTION',
    nameAr: 'الإنتاج المرئي والفيديوهات الإعلانية',
    nameEn: 'Commercial Video & Ad Creatives Production',
    nameFr: 'Production Vidéo & Créas Publicitaires',
    descAr: 'تصوير وإنتاج ومونتاج فيديوهات إعلانية عالية التأثير، مقاطع Reels وTikTok، ومحتوى UGC مصمم لجذب الانتباه وتحقيق المبيعات.',
    descEn: 'Studio shooting and dynamic editing of commercial videos, Reels, TikToks, and UGC hooks engineered for high engagement and sales.',
    descFr: 'Tournage et montage dynamique de vidéos publicitaires, Reels, TikTok et contenus UGC conçus pour capter l’attention et convertir.',
    showInCatalog: true,
    showInQuoteForm: true,
    parentSlug: null,
    order: 3,
    deliverablesAr: [
      'كتابة السيناريو والزوايا التسويقية الخاطفة للانتباه في أول 3 ثوانٍ (Scroll-Stopping Hooks)',
      'تصوير احترافي بالكاميرات والإضاءة والصوت النقي، أو تنسيق تصوير UGC واقعي',
      'مونتاج إيقاعي حديث مع Captions متحركة، تصحيح ألوان، ومؤثرات صوتية وبصرية',
      'تسليم النسخ النهائية بالمقاسات العمودية والأفقية الجاهزة للنشر والإعلانات الممولة'
    ],
    deliverablesEn: [
      'Scriptwriting and 3-second scroll-stopping visual hooks engineered for retention',
      'Professional camera/lighting/audio production or authentic creator UGC filming',
      'Rhythmic editing with animated captions, color grading, and sound design',
      'Delivery in optimized vertical and horizontal formats ready for organic & paid ads'
    ],
    deliverablesFr: [
      'Écriture de scripts et accroches visuelles (Hooks) pour capter l’attention en 3s',
      'Tournage professionnel (image, lumière, son) ou production UGC authentique',
      'Montage rythmé avec sous-titres animés, étalonnage et sound design',
      'Livraison aux formats optimisés pour Reels, TikTok, Shorts et publicités Meta'
    ],
    packages: [
      {
        nameAr: 'حزمة فيديوهات Reels والانتشار الرقمي',
        nameEn: 'Social Reels & Short-Form Pack',
        nameFr: 'Pack Vidéos Reels & Réseaux Sociaux',
        featuresAr: [
          'إنتاج ومونتاج 4 إلى 8 فيديوهات عمودية قصيرة',
          'كتابة الأفكار والسيناريوهات والـ Hooks التسويقية',
          'إضافة النصوص التفاعلية (Captions) والمؤثرات الصوتية',
          'تسليم سريع بجودة 4K/1080p جاهز للنشر'
        ],
        featuresEn: [
          'Production & editing of 4 to 8 short-form vertical videos',
          'Concept ideation, scripting, and marketing hooks',
          'Dynamic animated captions and sound effects',
          'Fast turnaround in 4K/1080p ready for publishing'
        ],
        featuresFr: [
          'Production et montage de 4 à 8 vidéos verticales courtes',
          'Conception des idées, scripts et accroches marketing',
          'Sous-titrage dynamique animé et effets sonores',
          'Livraison rapide en haute définition prête à publier'
        ]
      },
      {
        nameAr: 'حزمة الفيديوهات الإعلانية عالية التحويل (Ad Creatives)',
        nameEn: 'High-Converting Video Ad Creatives Pack',
        nameFr: 'Pack Vidéos Publicitaires Haute Conversion',
        isPopular: true,
        featuresAr: [
          'تصوير وإنتاج فيديوهات إعلانية مخصصة لحملات Meta وTikTok',
          'توفير نسختين من المقدمة (2 Hook Variations) لكل فيديو لاختبار A/B',
          'دمج عناصر الإقناع البصري والـ Call-to-Action الواضح',
          'تسليم كافة المقاسات الإعلانية مع حقوق الاستخدام التجاري'
        ],
        featuresEn: [
          'Full production of performance video ads for Meta & TikTok',
          '2 hook variations per video for A/B ad testing',
          'Visual proof overlays and clear Call-to-Action endings',
          'All ad aspect ratios included with full commercial rights'
        ],
        featuresFr: [
          'Production complète de vidéos publicitaires pour Meta et TikTok',
          '2 variantes d’accroche (Hooks) par vidéo pour vos tests A/B',
          'Intégration d’éléments de preuve et d’appels à l’action clairs',
          'Tous formats publicitaires inclus avec droits commerciaux'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'كتابة السيناريو والتخطيط الإبداعي',
        titleEn: 'Scripting & Creative Direction',
        titleFr: 'Scénarisation & Direction Créative',
        descAr: 'صياغة رسائل تسويقية قوية تخطف الانتباه في أول 3 ثوانٍ وتدفع المشاهد للتفاعل.',
        descEn: 'Crafting compelling scripts that hook viewers in the first 3 seconds.',
        descFr: 'Rédaction de scripts percutants dès les 3 premières secondes.'
      },
      {
        titleAr: 'التصوير والمونتاج الإبداعي',
        titleEn: 'Shooting & Dynamic Post-Production',
        titleFr: 'Tournage & Montage Créatif',
        descAr: 'تنفيذ التصوير والمونتاج بأعلى معايير الجودة البصرية والصوتية.',
        descEn: 'High-end filming, rhythmic cutting, captions, and sound design.',
        descFr: 'Captation haute définition, montage rythmé et habillage.'
      },
      {
        titleAr: 'المراجعة وتسليم نسخ الإعلانات',
        titleEn: 'Review & Multi-Format Delivery',
        titleFr: 'Validation & Livraison Multi-Formats',
        descAr: 'اعتماد النسخ النهائية وتسليمها جاهزة للإطلاق في الحملات والحسابات.',
        descEn: 'Final polish and delivery of ready-to-launch video assets.',
        descFr: 'Validation finale et remise des fichiers prêts pour la diffusion.'
      }
    ]
  },

  'ugc-advertising-content': {
    slug: 'ugc-advertising-content',
    categoryKey: 'VIDEO_PRODUCTION',
    nameAr: 'إنتاج محتوى UGC إعلاني (صناع محتوى حقيقيين)',
    nameEn: 'UGC Video Ads & Creator Content Production',
    nameFr: 'Production de Vidéos Publicitaires UGC',
    descAr: 'إعلانات فيديو عفوية ومقنعة مصورة بواسطة صناع محتوى مغاربة وعرب تبني الثقة الفورية مع المستهلك وترفع مبيعات التجارة الإلكترونية والخدمات.',
    descEn: 'Authentic, creator-led UGC video ads filmed in Arabic/Darija or French to build instant consumer trust and skyrocket ad conversions.',
    descFr: 'Vidéos publicitaires UGC authentiques incarnées par des créateurs au Maroc pour renforcer la confiance et booster vos ventes.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'reels-social-video',
    order: 31,
    deliverablesAr: [
      'اختيار صناع محتوى (UGC Creators) مناسبين لشريحة جمهورك (بالدارجة المغربية، العربية، أو الفرنسية)',
      'كتابة سيناريوهات بيعية طبيعية (تجربة المنتج، حل مشكلة، مقارنة قبل/بعد، شهادة عميل)',
      'مونتاج إعلاني احترافي مع لقطات قريبة للمنتج (B-Roll) ونصوص توضيحية على الشاشة',
      'حقوق استخدام إعلاني كاملة لإطلاق المقاطع في حملات Meta وTikTok الممولة'
    ],
    deliverablesEn: [
      'Casting vetted UGC creators matching your target demographic (Darija, Arabic, or French)',
      'Natural direct-response scripts (unboxing, problem/solution, testimonial, before/after)',
      'Ad-ready editing with product B-roll cutaways and on-screen captions',
      'Full paid-media usage rights for Meta and TikTok advertising campaigns'
    ],
    deliverablesFr: [
      'Sélection de créateurs UGC adaptés à votre cible (Darija, Arabe ou Français)',
      'Scripts naturels orientés conversion (unboxing, problème/solution, témoignage)',
      'Montage publicitaire avec plans de coupe produit (B-Roll) et sous-titres',
      'Cession complète des droits de diffusion pour vos publicités Meta et TikTok'
    ],
    packages: [
      {
        nameAr: 'حزمة اختبار إعلانات UGC (3 فيديوهات)',
        nameEn: 'UGC Ad Testing Pack (3 Videos)',
        nameFr: 'Pack Test UGC Ads (3 Vidéos)',
        featuresAr: [
          '3 فيديوهات UGC إعلانية مع صانع محتوى متمكن',
          'كتابة 3 زوايا بيعية مختلفة + مونتاج احترافي',
          'توفير مقدمتين مختلفتين (2 Hooks) لكل فيديو',
          'تسليم جاهز للإعلانات خلال 7 أيام عمل'
        ],
        featuresEn: [
          '3 creator-filmed UGC video ads',
          '3 distinct marketing angles + dynamic ad editing',
          '2 hook variations per video (6 testable assets total)',
          'Ad-ready delivery within 7 business days'
        ],
        featuresFr: [
          '3 vidéos publicitaires UGC tournées par un créateur',
          '3 angles marketing distincts + montage dynamique',
          '2 variantes d’accroche par vidéo (6 fichiers prêts à tester)',
          'Livraison prête pour vos campagnes sous 7 jours ouvrés'
        ]
      },
      {
        nameAr: 'حزمة توسيع المبيعات بـ UGC (6 فيديوهات + تعدد صناع المحتوى)',
        nameEn: 'Multi-Creator UGC Scaling Pack (6 Videos)',
        nameFr: 'Pack Scaling UGC Multi-Créateurs (6 Vidéos)',
        isPopular: true,
        featuresAr: [
          '6 فيديوهات UGC مصورة بواسطة 2 إلى 3 صناع محتوى مختلفين',
          'لقطات B-Roll إضافية للمنتج أو الخدمة لاستخدامها في حسابك',
          'نسخ بالدارجة المغربية والفرنسية لمخاطبة كافة الشرائح',
          '12 نسخة إعلانية جاهزة لاختبارات A/B المكثفة'
        ],
        featuresEn: [
          '6 UGC video ads filmed across 2–3 different creators',
          'Raw product B-roll footage included for your social channels',
          'Darija and French variations to capture all buyer segments',
          '12 total ad variations engineered for aggressive A/B testing'
        ],
        featuresFr: [
          '6 vidéos UGC réalisées par 2 à 3 créateurs différents',
          'Plans B-Roll produits inclus pour alimenter vos réseaux',
          'Versions en Darija et en Français selon vos audiences',
          '12 déclinaisons publicitaires prêtes pour l’A/B testing'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'اختيار صانع المحتوى وكتابة السيناريو',
        titleEn: 'Creator Casting & Ad Scripting',
        titleFr: 'Casting Créateur & Écriture du Script',
        descAr: 'اعتماد الوجه المناسب لعلامتك وكتابة سيناريو بيعي يبدو طبيعياً وغير مصطنع.',
        descEn: 'Selecting the right creator persona and writing native, persuasive scripts.',
        descFr: 'Choix du profil créateur idéal et rédaction des scripts de vente naturels.'
      },
      {
        titleAr: 'التصوير وإخراج المشاهد (Filming & B-Roll)',
        titleEn: 'Guided Creator Filming & B-Roll',
        titleFr: 'Tournage Guidé & Plans B-Roll',
        descAr: 'إشراف فريقنا على جودة الإضاءة والصوت والأداء التمثيلي وإبراز مزايا المنتج.',
        descEn: 'Directing the creator on lighting, audio clarity, and product demonstration.',
        descFr: 'Supervision du tournage pour garantir un son clair et une mise en valeur optimale.'
      },
      {
        titleAr: 'المونتاج الإعلاني وتسليم نسخ الـ Hooks',
        titleEn: 'Direct-Response Editing & Hook Delivery',
        titleFr: 'Montage Publicitaire & Déclinaisons',
        descAr: 'إضافة النصوص والمؤثرات السريعة وتسليم الفيديوهات جاهزة لإطلاق الحملات.',
        descEn: 'Adding dynamic captions, pacing cuts, and delivering multi-hook ad files.',
        descFr: 'Ajout des sous-titres dynamiques, rythme publicitaire et livraison finale.'
      }
    ]
  },

  'ai-advertising-video': {
    slug: 'ai-advertising-video',
    categoryKey: 'VIDEO_PRODUCTION',
    nameAr: 'إنتاج فيديو إعلاني بالذكاء الاصطناعي (AI Commercials)',
    nameEn: 'AI Commercial Video Production',
    nameFr: 'Production Vidéo Publicitaire par IA',
    descAr: 'إنتاج فيديوهات إعلانية سينمائية ومبتكرة باستخدام أحدث تقنيات الذكاء الاصطناعي البصري والصوتي، بتكلفة وسرعة قياسية دون الحاجة لتصوير ميداني معقد.',
    descEn: 'Cinematic and high-converting commercial videos generated with studio-grade AI visuals, realistic voice synthesis, and professional editing.',
    descFr: 'Production de vidéos publicitaires cinématiques et créatives via l’IA (visuels, voix-off réalistes et montage professionnel) en un temps record.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'reels-social-video',
    order: 32,
    deliverablesAr: [
      'كتابة الفكرة الإبداعية والسيناريو وتصميم المشاهد البصرية بالذكاء الاصطناعي بدقة عالية',
      'تعليق صوتي احترافي وطبيعي (العربية، الدارجة، الفرنسية، أو الإنجليزية) مع هندسة صوتية',
      'دمج شعار وهوية علامتك التجارية ولقطات منتجاتك الحقيقية داخل المشاهد المولدة',
      'مونتاج احترافي متكامل مع المؤثرات الصوتية (SFX) والنصوص المتحركة'
    ],
    deliverablesEn: [
      'Creative storyboarding and high-definition AI scene generation tailored to your brand',
      'Studio-quality voice-over synthesis or human recording in AR, FR, or EN',
      'Seamless compositing of your real product photos and brand logos into AI scenes',
      'Professional post-production with sound design (SFX), music, and motion captions'
    ],
    deliverablesFr: [
      'Storyboard créatif et génération de scènes IA haute définition sur-mesure',
      'Voix-off ultra-réaliste ou studio en Arabe, Français ou Anglais',
      'Intégration fluide de vos vrais produits et de votre charte graphique',
      'Post-production professionnelle avec sound design, musique et textes animés'
    ],
    packages: [
      {
        nameAr: 'إعلان فيديو AI خاطف (Single Spot)',
        nameEn: 'Single AI Commercial Spot',
        nameFr: 'Spot Publicitaire IA Unique',
        featuresAr: [
          'فيديو إعلاني متكامل مدته 30 إلى 45 ثانية',
          'توليد المشاهد البصرية + تعليق صوتي احترافي + موسيقى ومؤثرات',
          'دمج صور منتجك أو هويتك البصرية بدقة',
          'تسليم بمقاس عمودي (Reels/TikTok) وأفقي'
        ],
        featuresEn: [
          'Complete 30–45 second AI commercial video',
          'Custom AI visual scenes + professional voice-over + SFX',
          'Accurate integration of your real product/brand assets',
          'Delivered in both vertical (9:16) and square/horizontal formats'
        ],
        featuresFr: [
          'Spot vidéo publicitaire IA complet de 30 à 45 secondes',
          'Scènes visuelles IA sur-mesure + voix-off + sound design',
          'Intégration fidèle de vos produits et de votre logo',
          'Livraison aux formats vertical (9:16) et carré/horizontal'
        ]
      },
      {
        nameAr: 'حملة إعلانات AI متعددة الزوايا (3 فيديوهات)',
        nameEn: 'AI Ad Campaign Bundle (3 Commercials)',
        nameFr: 'Pack Campagne Vidéo IA (3 Spots)',
        isPopular: true,
        featuresAr: [
          '3 فيديوهات إعلانية بـ 3 أفكار وسيناريوهات تسويقية مختلفة',
          'إمكانية استخدام متحدث افتراضي (AI Avatar) أو مشاهد سينمائية',
          'نسخ متعددة اللغات (عربي + فرنسي) لنفس الحملة',
          'تسليم سريع جداً لاختبار الحملات الإعلانية بأقل تكلفة إنتاج'
        ],
        featuresEn: [
          '3 distinct AI commercial videos with different marketing angles',
          'Choice of cinematic AI scenes or realistic AI spokesperson avatars',
          'Bilingual versions (Arabic + French) for wider market reach',
          'Rapid turnaround to test creative concepts at a fraction of studio cost'
        ],
        featuresFr: [
          '3 vidéos publicitaires IA avec 3 concepts marketing distincts',
          'Au choix : scènes cinématiques IA ou avatar présentateur réaliste',
          'Versions bilingues (Arabe + Français) incluses',
          'Production rapide pour tester vos campagnes à coût réduit'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'السيناريو ولوحة المشاهد (Storyboard)',
        titleEn: 'Script & Visual Prompt Engineering',
        titleFr: 'Scénario & Direction Visuelle IA',
        descAr: 'تحويل رسالتك التسويقية إلى مشاهد بصرية متسلسلة واعتماد التوجه الفني.',
        descEn: 'Translating your marketing message into a cohesive visual storyboard.',
        descFr: 'Traduction de votre message en storyboard visuel cohérent.'
      },
      {
        titleAr: 'توليد المشاهد والتعليق الصوتي',
        titleEn: 'AI Rendering & Voice Production',
        titleFr: 'Génération Vidéo & Voix-Off',
        descAr: 'إنتاج اللقطات المتحركة بجودة عالية وتركيب الصوت والمؤثرات.',
        descEn: 'Generating consistent high-res video clips and recording the voice track.',
        descFr: 'Génération des séquences vidéo HD et création de la bande sonore.'
      },
      {
        titleAr: 'المونتاج النهائي ودمج الهوية',
        titleEn: 'Compositing & Final Edit',
        titleFr: 'Montage Final & Habillage Marque',
        descAr: 'تجميع المشاهد وإضافة شعارك ونصوص الإقناع وتصدير الملفات النهائية.',
        descEn: 'Editing scenes together with motion graphics, logos, and CTAs.',
        descFr: 'Assemblage rythmé, ajout des textes animés et livraison.'
      }
    ]
  },

  'motion-video-editing': {
    slug: 'motion-video-editing',
    categoryKey: 'VIDEO_PRODUCTION',
    nameAr: 'الموشن غرافيك والمونتاج الاحترافي (Motion & Editing)',
    nameEn: 'Motion Graphics & Commercial Video Editing',
    nameFr: 'Motion Design & Montage Vidéo Professionnel',
    descAr: 'تصميم فيديوهات موشن غرافيك توضيحية (Explainer Videos) ومونتاج احترافي للمواد المصورة بإيقاع بصري وصوتي يضاعف معدل إكمال المشاهدة.',
    descEn: '2D/3D motion graphics explainer videos and high-retention commercial editing that simplify complex services and captivate viewers.',
    descFr: 'Création de vidéos explicatives en Motion Design et montage vidéo dynamique pour présenter clairement vos services et captiver votre audience.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'reels-social-video',
    order: 33,
    deliverablesAr: [
      'رسم وتحريك العناصر البصرية والأيقونات والشخصيات (Custom Motion Graphics) المتوافقة مع هويتك',
      'مونتاج متقدم للمواد المصورة يشمل تقطيع الإيقاع، تصحيح الألوان (Color Grading)، وتنقية الصوت',
      'تصميم عناصر الجرافيك المدمجة (Lower Thirds, UI Animations, Dynamic Subtitles)',
      'تسليم الفيديو النهائي مع تعليق صوتي ومؤثرات صوتية احترافية (Sound Design)'
    ],
    deliverablesEn: [
      'Custom 2D motion graphics, icon animations, and visual storytelling aligned with your brand',
      'Advanced video editing including rhythmic pacing, color grading, and audio mastering',
      'On-screen UI animations, lower thirds, and high-retention dynamic typography',
      'Complete sound design (SFX), licensed background music, and optional voice-over'
    ],
    deliverablesFr: [
      'Animations graphiques 2D sur-mesure fidèles à votre charte visuelle',
      'Montage vidéo avancé : rythme, étalonnage des couleurs et mixage audio',
      'Habillage graphique complet (titres animés, animations d’interface, sous-titres)',
      'Sound design immersif, musique libre de droits et voix-off en option'
    ],
    packages: [
      {
        nameAr: 'باقة المونتاج الاحترافي والـ Visual Hooks',
        nameEn: 'Pro Video Editing & Visual Polish',
        nameFr: 'Pack Montage Vidéo Pro & Habillage',
        featuresAr: [
          'مونتاج احترافي لموادك المصورة (حتى 5 فيديوهات قصيرة أو فيديو طويل)',
          'إضافة عناصر موشن غرافيك توضيحية ونصوص متحركة',
          'تصحيح الألوان ومعالجة الصوت وإضافة المؤثرات',
          'جولتا تعديل مجانيتان لضمان رضاك التام'
        ],
        featuresEn: [
          'Professional editing of your raw footage (up to 5 shorts or 1 long-form video)',
          'Motion graphic overlays, callouts, and animated captions',
          'Color grading, audio cleanup, and sound effects',
          '2 complimentary revision rounds included'
        ],
        featuresFr: [
          'Montage professionnel de vos rushs (jusqu’à 5 vidéos courtes ou 1 format long)',
          'Intégration d’éléments motion design et titres animés',
          'Étalonnage couleur, nettoyage audio et effets sonores',
          '2 séries de modifications incluses'
        ]
      },
      {
        nameAr: 'فيديو موشن غرافيك متكامل للشركات (Explainer Video)',
        nameEn: 'Full Custom Motion Graphics Explainer',
        nameFr: 'Vidéo Motion Design Explicative Complète',
        isPopular: true,
        featuresAr: [
          'كتابة السيناريو التسويقي ورسم الـ Storyboard بالكامل',
          'تصميم وتحريك رسوم موشن غرافيك مخصصة لعلامتك (60 ثانية)',
          'تسجيل تعليق صوتي احترافي (AR / FR / EN) ومؤثرات صوتية',
          'مشتقات قصيرة مجانية (Cutdowns) لاستخدامها في الإعلانات'
        ],
        featuresEn: [
          'Full scriptwriting and custom visual storyboard creation',
          '60-second bespoke motion graphics animation in your brand style',
          'Studio voice-over recording (AR/FR/EN) and full sound design',
          'Bonus 15-second social ad cutdowns included'
        ],
        featuresFr: [
          'Rédaction du script marketing et création du storyboard complet',
          'Animation motion design sur-mesure de 60 secondes',
          'Enregistrement voix-off studio (AR/FR/EN) et sound design',
          'Déclinaisons courtes (15s) offertes pour vos publicités'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'السيناريو ورسم المشاهد (Storyboard)',
        titleEn: 'Script & Visual Storyboard',
        titleFr: 'Script & Storyboard Illustré',
        descAr: 'تحديد الرسالة الأساسية وتصميم المشاهد الثابتة لاعتمادها قبل بدء التحريك.',
        descEn: 'Approving the script and static style frames before animation begins.',
        descFr: 'Validation du texte et des planches graphiques avant l’animation.'
      },
      {
        titleAr: 'التحريك والمونتاج وهندسة الصوت',
        titleEn: 'Animation, Editing & Sound Design',
        titleFr: 'Animation, Montage & Sound Design',
        descAr: 'تحريك العناصر بسلاسة ومزامنتها مع التعليق الصوتي والمؤثرات.',
        descEn: 'Bringing illustrations and footage to life synced with voice and SFX.',
        descFr: 'Animation fluide des éléments graphiques synchronisée avec la voix-off.'
      },
      {
        titleAr: 'المراجعة والتسليم متعدد المقاسات',
        titleEn: 'Final Polish & Multi-Aspect Export',
        titleFr: 'Finitions & Export Multi-Formats',
        descAr: 'تطبيق أي ملاحظات نهائية وتسليم الفيديو بأعلى دقة.',
        descEn: 'Applying final tweaks and exporting master files in all required dimensions.',
        descFr: 'Ajustements finaux et livraison des fichiers haute définition.'
      }
    ]
  },

  video: {
    slug: 'video',
    categoryKey: 'VIDEO_PRODUCTION',
    nameAr: 'التصوير الميداني وإنتاج الفيديو كليب والأفلام المؤسسية',
    nameEn: 'On-Site Commercial Filming, Music Videos & Corporate Films',
    nameFr: 'Tournage Terrain, Films Institutionnels & Clips Vidéo',
    descAr: 'إنتاج مرئي ميداني متكامل يشمل تصوير الأفلام الوثائقية والتعريفية للشركات، تغطية الفعاليات، وإخراج وتصوير الفيديو كليب بأحدث معدات السينما.',
    descEn: 'Full-crew on-location video production for corporate brand films, commercial spots, event coverage, and high-end music videos.',
    descFr: 'Production vidéo complète sur site : films institutionnels d’entreprise, spots télé/web, couverture d’événements et réalisation de clips.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'reels-social-video',
    order: 39,
    deliverablesAr: [
      'فريق تصوير وإخراج متكامل مع معدات سينمائية (كاميرات 4K/6K، إضاءة احترافية، درون، ومعدات صوت)',
      'إعداد السيناريو الإخراجي، اختيار مواقع التصوير (Locations)، وإدارة الإنتاج',
      'مونتاج سينمائي وتلوين احترافي (Color Grading) وميكساج صوتي متكامل',
      'تسليم الفيلم الرئيسي مع مقاطع قصيرة مقتطفة للسوشيال ميديا'
    ],
    deliverablesEn: [
      'Full production crew with cinema-grade 4K/6K cameras, lighting, gimbal, and drone',
      'Creative direction, location scouting, casting, and on-set production management',
      'Cinema post-production: editing, color grading, VFX cleanup, and sound mixing',
      'Master film delivery plus vertical social media teaser cutdowns'
    ],
    deliverablesFr: [
      'Équipe de tournage complète (caméras cinéma 4K/6K, éclairage, drone et prise de son)',
      'Réalisation, repérage des lieux, casting et direction de production sur le terrain',
      'Post-production cinéma : montage, étalonnage couleur et mixage audio',
      'Livraison du film principal + teasers courts pour vos réseaux sociaux'
    ],
    packages: [
      {
        nameAr: 'يوم تصوير إعلاني أو مؤسسي متكامل',
        nameEn: 'Corporate / Commercial Shoot Day',
        nameFr: 'Journée de Tournage Entreprise / Publicité',
        isPopular: true,
        featuresAr: [
          'طاقم تصوير احترافي في مقر شركتك أو موقع خارجي',
          'تصوير 4K مع إضاءة سينمائية وتسجيل صوتي للمقابلات',
          'إنتاج فيلم تعريفي رئيسي + 3 مقاطع Reels مستخلصة',
          'مونتاج وتلوين احترافي جاهز للعرض'
        ],
        featuresEn: [
          'On-site production crew at your premises or chosen location',
          '4K cinema filming, studio lighting, and interview audio capture',
          '1 main corporate/brand film + 3 vertical social cutdowns',
          'Full color grading and sound mastering included'
        ],
        featuresFr: [
          'Équipe de tournage sur site dans vos locaux ou en extérieur',
          'Captation 4K, éclairage professionnel et prise de son interviews',
          '1 film institutionnel principal + 3 déclinaisons Reels',
          'Montage complet, étalonnage et habillage graphique inclus'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'ما قبل الإنتاج والتحضير الميداني',
        titleEn: 'Pre-Production & Scouting',
        titleFr: 'Pré-production & Repérage',
        descAr: 'وضع خطة التصوير، جدول المشاهد، وتجهيز المعدات والمواقع.',
        descEn: 'Planning the shot list, schedule, crew, and location logistics.',
        descFr: 'Préparation du découpage technique, du planning et de la logistique.'
      },
      {
        titleAr: 'التصوير والإخراج في الموقع',
        titleEn: 'On-Location Principal Photography',
        titleFr: 'Tournage & Réalisation sur Site',
        descAr: 'تنفيذ التصوير بإشراف مخرج فني لضمان لقطات سينمائية مبهرة.',
        descEn: 'Capturing all scenes on set with full lighting and directorial guidance.',
        descFr: 'Captation des scènes sous la supervision du réalisateur.'
      },
      {
        titleAr: 'المونتاج السينمائي والتسليم',
        titleEn: 'Cinema Post-Production & Delivery',
        titleFr: 'Post-production & Livraison Finale',
        descAr: 'تحرير الفيلم وتلوينه وتسليمه بأعلى معايير البث والعرض الرقمي.',
        descEn: 'Editing, grading, and delivering the final master film.',
        descFr: 'Montage, étalonnage et remise des fichiers masters.'
      }
    ]
  },

  // ============================================================================
  // PILLAR 4: BRAND IDENTITY & SOCIAL MEDIA (order: 4, sub-orders: 41..44)
  // ============================================================================
  'brand-identity': {
    slug: 'brand-identity',
    categoryKey: 'ARTIST_SERVICES',
    nameAr: 'الهوية البصرية وإدارة السوشيال ميديا',
    nameEn: 'Brand Identity & Social Media Content',
    nameFr: 'Identité Visuelle & Réseaux Sociaux',
    descAr: 'ابتكار وتطوير هويات بصرية متكاملة للشركات، تصميم الشعارات، وإنتاج وإدارة محتوى إبداعي للشبكات الاجتماعية يرسخ علامتك التجارية.',
    descEn: 'Crafting complete corporate visual identities, logos, brand guidelines, and social media content that elevates your brand authority.',
    descFr: 'Création de chartes graphiques complètes, logos et contenus créatifs pour réseaux sociaux afin de valoriser votre marque.',
    showInCatalog: true,
    showInQuoteForm: true,
    parentSlug: null,
    order: 4,
    deliverablesAr: [
      'تصميم شعار احترافي أصيل (Logo Design) مع دليل الهوية البصرية الكامل (Brand Guidelines)',
      'تحديد لوحة الألوان، الخطوط الرسمية، والنمط البصري للمطبوعات والواجهات الرقمية',
      'تصميم قوالب وتصاميم السوشيال ميديا والإعلانات المتناسقة مع هوية العلامة',
      'تسليم كافة الملفات المصدرية المفتوحة الجاهزة للطباعة والنشر الرقمي'
    ],
    deliverablesEn: [
      'Original logo design concepts with a comprehensive Brand Guidelines Book',
      'Strategic color systems, Arabic/Latin typography, and stationery/print assets',
      'Cohesive social media templates and advertising creative systems',
      'Full delivery of editable vector source files for print and digital use'
    ],
    deliverablesFr: [
      'Création de logo original avec charte graphique complète (Brand Book)',
      'Système de couleurs, typographies Arabe/Latin et supports imprimés',
      'Templates réseaux sociaux et système visuel pour vos campagnes',
      'Livraison de tous les fichiers sources vectoriels pour le web et l’impression'
    ],
    packages: [
      {
        nameAr: 'حزمة الهوية البصرية الأساسية',
        nameEn: 'Essential Brand Identity',
        nameFr: 'Pack Identité Essentielle',
        featuresAr: [
          'تصميم شعار احترافي (3 مقترحات مبتكرة)',
          'تحديد الألوان والخطوط الرسمية للعلامة',
          'تصميم مطبوعات الهوية (بطاقة عمل، ورق رسمي)',
          'تسليم الملفات المفتوحة بجميع الصيغ'
        ],
        featuresEn: [
          'Professional logo design (3 original concepts)',
          'Color palette and typography selection',
          'Business card and letterhead design',
          'Full source files delivery in all formats'
        ],
        featuresFr: [
          'Création de logo professionnel (3 concepts)',
          'Palette de couleurs et typographies',
          'Carte de visite et papier à en-tête',
          'Livraison des fichiers sources haute définition'
        ]
      },
      {
        nameAr: 'الهوية المتكاملة وحضور السوشيال ميديا',
        nameEn: 'Full Branding & Social Kit',
        nameFr: 'Charte Graphique & Kit Réseaux Sociaux',
        isPopular: true,
        featuresAr: [
          'دليل الهوية البصرية الشامل (Brand Book)',
          'تجهيز قوالب وتصاميم شبكات التواصل الاجتماعي',
          'تصميم الأغلفة والواجهات الرقمية',
          'استراتيجية التوجه البصري للمحتوى الإعلاني'
        ],
        featuresEn: [
          'Comprehensive Brand Guidelines Book',
          'Custom social media post & story templates',
          'Social profiles covers and highlights kit',
          'Visual art direction for ad campaigns'
        ],
        featuresFr: [
          'Charte graphique complète (Brand Book)',
          'Templates personnalisés pour réseaux sociaux',
          'Habillage complet des profils sociaux',
          'Direction artistique pour vos publicités'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'دراسة العلامة والسوق',
        titleEn: 'Brand Discovery & Research',
        titleFr: 'Étude de Marque & Marché',
        descAr: 'فهم قيم شركتك، جمهورك المستهدف، وتحليل المنافسين.',
        descEn: 'Understanding your brand values, audience, and market positioning.',
        descFr: 'Analyse de vos valeurs, de votre cible et de vos concurrents.'
      },
      {
        titleAr: 'الابتكار والتصميم البصري',
        titleEn: 'Concept & Visual Design',
        titleFr: 'Création & Direction Artistique',
        descAr: 'ابتكار الشعار والعناصر البصرية المتناغمة مع روح العلامة.',
        descEn: 'Designing logo concepts, visual motifs, and brand assets.',
        descFr: 'Conception des propositions de logo et de l’univers graphique.'
      },
      {
        titleAr: 'اعتماد الهوية وتسليم الدليل',
        titleEn: 'Finalization & Brand Book',
        titleFr: 'Finalisation & Livrables',
        descAr: 'تسليم كافة الملفات النهائية ودليل الاستخدام الموحد.',
        descEn: 'Delivering all production-ready files and brand guidelines.',
        descFr: 'Remise de tous les fichiers sources et du guide d’utilisation.'
      }
    ]
  },

  'marketing-design': {
    slug: 'marketing-design',
    categoryKey: 'ARTIST_SERVICES',
    nameAr: 'تصاميم التسويق والإعلانات والسوشيال ميديا',
    nameEn: 'Marketing, Ad Creatives & Social Media Design',
    nameFr: 'Design Marketing, Visuels Publicitaires & Réseaux Sociaux',
    descAr: 'تصميم إعلانات ثابتة (Static Ad Creatives)، منشورات الكاروسيل، البنرات، والعروض التقديمية للشركات بتصاميم احترافية ترفع نسبة النقر (CTR).',
    descEn: 'High-CTR static ad creatives, educational carousels, web banners, and sales decks designed to capture attention and convert.',
    descFr: 'Conception de visuels publicitaires à fort CTR, carrousels Instagram/LinkedIn, bannières web et présentations commerciales.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'brand-identity',
    order: 41,
    deliverablesAr: [
      'تصاميم إعلانية مخصصة لحملات Meta وGoogle Display مبنية على إبراز العرض والمشكلة والحل',
      'منشورات كاروسيل (Carousels) تعليمية وتسويقية لـ Instagram وLinkedIn',
      'تصميم بنرات المتاجر الإلكترونية والعروض الموسمية وعروض الشركات (Pitch Decks)',
      'تسليم التصاميم بجميع المقاسات (1:1, 4:5, 9:16) مع الملفات القابلة للتعديل'
    ],
    deliverablesEn: [
      'High-converting static ad creatives engineered for Meta and Google Display',
      'Multi-slide storytelling carousels for Instagram and LinkedIn authority',
      'E-commerce promotional banners, seasonal campaign visuals, and company decks',
      'Delivered in all placement ratios (1:1, 4:5, 9:16) with editable source files'
    ],
    deliverablesFr: [
      'Visuels publicitaires statiques optimisés pour le CTR sur Meta et Google',
      'Carrousels éducatifs et commerciaux pour Instagram et LinkedIn',
      'Bannières e-commerce, visuels promotionnels et présentations d’entreprise',
      'Livraison dans tous les formats (1:1, 4:5, 9:16) avec fichiers sources'
    ],
    packages: [
      {
        nameAr: 'باقة تصاميم الإعلانات والسوشيال (12 تصميماً)',
        nameEn: 'Ad & Social Design Pack (12 Visuals)',
        nameFr: 'Pack Design Publicitaire & Social (12 Visuels)',
        featuresAr: [
          '12 تصميماً احترافياً (إعلانات ممولة أو منشورات سوشيال ميديا)',
          'صياغة العناوين البصرية داخل التصميم لتعزيز النقر',
          'تسليم بمقاس المنشور ومقاس الستوري لكل تصميم',
          'تسليم سريع مع تعديلات مرنة'
        ],
        featuresEn: [
          '12 custom marketing visuals (paid ad creatives or social posts)',
          'Conversion-focused headline hierarchy on every visual',
          'Both Feed (4:5) and Story (9:16) sizes included',
          'Fast turnaround with flexible revisions'
        ],
        featuresFr: [
          '12 créations graphiques sur-mesure (publicités ou posts réseaux)',
          'Hiérarchie visuelle optimisée pour attirer le clic',
          'Déclinaison aux formats Feed (4:5) et Story (9:16)',
          'Livraison rapide et retouches incluses'
        ]
      },
      {
        nameAr: 'الباقة الشهرية الشاملة للتصميم التسويقي (25 تصميماً)',
        nameEn: 'Monthly Growth Design Retainer (25 Visuals)',
        nameFr: 'Forfait Design Marketing Mensuel (25 Visuels)',
        isPopular: true,
        featuresAr: [
          '25 تصميماً متنوعاً شهرياً (إعلانات + كاروسيل + بنرات موقع)',
          'تصميم نسختين لكل إعلان رئيسي لاختبارات A/B',
          'تصميم بروفايل شركة أو عرض تقديمي (Sales Deck) عند الطلب',
          'مصمم جرافيك مخصص لمشروعك طوال الشهر'
        ],
        featuresEn: [
          '25 monthly visuals (ad creatives, carousels, and web banners)',
          'A/B visual variations for core paid ad campaigns',
          'Company profile or sales presentation design support',
          'Dedicated senior graphic designer assigned to your brand'
        ],
        featuresFr: [
          '25 créations mensuelles (publicités, carrousels, bannières web)',
          'Variantes visuelles A/B pour vos campagnes publicitaires',
          'Conception de plaquette commerciale ou présentation client',
          'Designer graphique senior dédié à votre marque'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'تحديد الهدف والرسالة التسويقية',
        titleEn: 'Creative Brief & Copy Hooks',
        titleFr: 'Brief Créatif & Messages Clés',
        descAr: 'فهم العرض المراد ترويجه وتحديد العناوين والعناصر التي ستظهر في كل تصميم.',
        descEn: 'Aligning on the offer, target audience, and visual hook for each graphic.',
        descFr: 'Définition de l’offre, de la cible et du message principal de chaque visuel.'
      },
      {
        titleAr: 'التصميم الفني والإخراج البصري',
        titleEn: 'Graphic Design & Art Direction',
        titleFr: 'Création Graphique & Direction Artistique',
        descAr: 'تنفيذ التصاميم بدقة عالية مع مراعاة التباين البصري وهوية علامتك.',
        descEn: 'Crafting high-contrast, thumb-stopping visuals faithful to your brand guide.',
        descFr: 'Réalisation de visuels percutants et fidèles à votre identité.'
      },
      {
        titleAr: 'المراجعة وتصدير كافة المقاسات',
        titleEn: 'Review & Multi-Size Export',
        titleFr: 'Validation & Export Multi-Formats',
        descAr: 'اعتماد التصاميم وتسليمها جاهزة للنشر الفوري أو الإعلانات.',
        descEn: 'Final approval and delivery of optimized PNG/WebP and source files.',
        descFr: 'Validation finale et remise des fichiers optimisés pour la diffusion.'
      }
    ]
  },

  'social-media-setup': {
    slug: 'social-media-setup',
    categoryKey: 'ARTIST_SERVICES',
    nameAr: 'إنشاء وتجهيز الحضور الاحترافي على السوشيال ميديا',
    nameEn: 'Social Media Profile Setup & Brand Optimization',
    nameFr: 'Création & Optimisation des Profils Réseaux Sociaux',
    descAr: 'تأسيس وتهيئة حسابات شركتك على Instagram وFacebook وLinkedIn وTikTok وGoogle Business بمظهر احترافي موحد يجذب العملاء ويبني الثقة من الزيارة الأولى.',
    descEn: 'Complete creation, visual branding, and SEO optimization of your business profiles across Instagram, Facebook, LinkedIn, TikTok, and Google Business.',
    descFr: 'Création, habillage graphique et optimisation complète de vos pages professionnelles sur Instagram, Facebook, LinkedIn, TikTok et Google Business.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'brand-identity',
    order: 42,
    deliverablesAr: [
      'إنشاء أو إعادة هيكلة الحسابات التجارية وربطها بـ Meta Business Suite بشكل آمن',
      'كتابة النبذة التعريفية (Bio) الاحترافية بالكلمات المفتاحية مع أزرار التواصل وروابط التحويل',
      'تصميم صور البروفايل، الأغلفة الرسمية (Covers)، وأيقونات الـ Story Highlights الموحدة',
      'تصميم ونشر أول 6 إلى 9 منشورات تأسيسية (Pinned Grid) تشرح خدماتك وبصمتك التجارية'
    ],
    deliverablesEn: [
      'Creation or restructuring of business accounts linked properly to Meta Business Suite',
      'Keyword-optimized Bio copywriting, action buttons, and conversion link tree setup',
      'Custom profile avatars, platform headers/covers, and branded Story Highlight icons',
      'Design and publishing of an initial 6–9 post foundational grid showcasing your offer'
    ],
    deliverablesFr: [
      'Création ou restructuration des comptes professionnels reliés à Meta Business Suite',
      'Rédaction optimisée des biographies (Bio), boutons d’action et liens de conversion',
      'Création des photos de profil, bannières de couverture et icônes de Stories à la une',
      'Conception et publication des 6 à 9 premiers posts fondateurs de votre vitrine sociale'
    ],
    packages: [
      {
        nameAr: 'تجهيز وتأسيس الحضور الرقمي الكامل',
        nameEn: 'Complete Social Presence Launch Kit',
        nameFr: 'Pack Lancement & Habillage Réseaux Sociaux',
        isPopular: true,
        featuresAr: [
          'تجهيز وضبط 4 منصات رئيسية (Instagram, Facebook, TikTok, LinkedIn/Google)',
          'تصميم الأغلفة وأيقونات الـ Highlights والـ Bio الاحترافي',
          'تصميم وكتابة 6 منشورات تأسيسية لتعريف الجمهور بخدماتك',
          'ضبط الرسائل الترحيبية التلقائية وربط واتساب للأعمال'
        ],
        featuresEn: [
          'Full setup across 4 platforms (Instagram, Facebook, TikTok, LinkedIn/Google)',
          'Custom covers, Highlight icons, and conversion-focused Bio setup',
          '6 foundational grid posts designed and written for your launch',
          'Automated welcome messages and WhatsApp Business integration'
        ],
        featuresFr: [
          'Configuration complète sur 4 plateformes (Instagram, Facebook, TikTok, LinkedIn)',
          'Bannières, icônes de Stories à la une et biographies optimisées',
          '6 publications fondatrices conçues et rédigées pour votre lancement',
          'Messages d’accueil automatiques et connexion WhatsApp Business'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'ضبط الإعدادات التقنية والتسمية',
        titleEn: 'Account Architecture & Bio SEO',
        titleFr: 'Paramétrage Technique & Bio SEO',
        descAr: 'توحيد أسماء المستخدمين، الفئات التجارية، والكلمات المفتاحية في الحسابات.',
        descEn: 'Standardizing handles, business categories, and searchable bio keywords.',
        descFr: 'Harmonisation des noms d’utilisateur, catégories et mots-clés.'
      },
      {
        titleAr: 'تصميم الواجهات والمنشورات التأسيسية',
        titleEn: 'Visual Kit & Foundational Grid',
        titleFr: 'Habillage Visuel & Grille Initiale',
        descAr: 'تصميم الأغلفة، الـ Highlights، والمنشورات المثبتة التي تعكس فخامة علامتك.',
        descEn: 'Designing covers, highlights, and pinned posts that establish instant authority.',
        descFr: 'Création des couvertures, icônes et publications épinglées.'
      },
      {
        titleAr: 'النشر، الربط، والتسليم',
        titleEn: 'Publishing & Admin Handover',
        titleFr: 'Publication & Remise des Accès',
        descAr: 'رفع المحتوى التأسيسي وتسليمك الحسابات جاهزة لاستقبال الزوار والإعلانات.',
        descEn: 'Publishing the launch grid and handing over fully configured business accounts.',
        descFr: 'Mise en ligne de la grille initiale et remise des comptes prêts pour la pub.'
      }
    ]
  },

  'social-media-management': {
    slug: 'social-media-management',
    categoryKey: 'ARTIST_SERVICES',
    nameAr: 'إدارة حسابات التواصل الاجتماعي الشهرية',
    nameEn: 'Monthly Social Media Management & Community Care',
    nameFr: 'Gestion Mensuelle des Réseaux Sociaux & Community Management',
    descAr: 'إدارة شهرية متكاملة لحسابات شركتك تشمل إعداد خطة المحتوى، كتابة المنشورات، الجدولة المنتظمة، تنشيط الستوري، وتوجيه المتابعين نحو الشراء.',
    descEn: 'End-to-end monthly social media management covering content calendars, copywriting, scheduling, active stories, and lead nurturing.',
    descFr: 'Pilotage mensuel complet de vos réseaux sociaux : calendrier éditorial, rédaction, programmation, animation de stories et conversion.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'brand-identity',
    order: 43,
    deliverablesAr: [
      'إعداد روزنامة محتوى شهرية (Content Calendar) متوازنة بين المحتوى البيعي والتعليمي والتفاعلي',
      'كتابة النصوص التسويقية (Captions) واختيار الهاشتاجات وأوقات النشر المثالية',
      'جدولة ونشر المنشورات والـ Reels والـ Stories بانتظام للحفاظ على نشاط الحساب',
      'تقرير أداء شهري لنمو المتابعين والتفاعل ونقرات الروابط'
    ],
    deliverablesEn: [
      'Monthly strategic Content Calendar balancing educational, authority, and sales posts',
      'Bilingual/trilingual caption copywriting, hashtag strategy, and optimal scheduling',
      'Consistent publishing across Feed, Reels, and daily interactive Stories',
      'Monthly analytics report tracking reach, engagement, and profile-to-WhatsApp clicks'
    ],
    deliverablesFr: [
      'Calendrier éditorial mensuel équilibrant contenus éducatifs, preuves et offres',
      'Rédaction des légendes (Captions), stratégie de hashtags et programmation',
      'Publication régulière des posts, Reels et animation quotidienne en Stories',
      'Bilan mensuel des performances (portée, engagement et clics vers WhatsApp)'
    ],
    packages: [
      {
        nameAr: 'باقة الحضور المنتظم (Growth Presence)',
        nameEn: 'Consistent Brand Presence Retainer',
        nameFr: 'Forfait Présence Régulière',
        featuresAr: [
          'إدارة منصتين رئيسيتين (مثل Instagram + Facebook)',
          '12 منشوراً شهرياً (تصاميم + كاروسيل + مونتاج Reels)',
          'خطة محتوى شهرية وكتابة كاملة للنصوص + نشر Stories أسبوعية',
          'تقرير أداء شهري مفصل'
        ],
        featuresEn: [
          'Management of 2 core platforms (e.g., Instagram + Facebook)',
          '12 monthly posts (graphics, carousels, and edited Reels)',
          'Monthly content calendar, copywriting & weekly Stories',
          'Monthly engagement and growth report'
        ],
        featuresFr: [
          'Gestion de 2 plateformes clés (ex: Instagram + Facebook)',
          '12 publications par mois (visuels, carrousels et Reels)',
          'Calendrier éditorial, rédaction et Stories hebdomadaires',
          'Rapport mensuel de croissance et d’engagement'
        ]
      },
      {
        nameAr: 'باقة الإدارة الشاملة وتنشيط المبيعات (Full Authority)',
        nameEn: 'Full Authority & Community Management',
        nameFr: 'Forfait Gestion Complète & Animation',
        isPopular: true,
        featuresAr: [
          'إدارة 3 إلى 4 منصات (Instagram, Facebook, TikTok, LinkedIn)',
          '20 منشوراً ومقطع Reels شهرياً + تنشيط يومي للـ Stories',
          'الرد الأولي على التعليقات وتوجيه الاستفسارات البيعية إلى واتساب',
          'اجتماع شهري لتطوير استراتيجية المحتوى والعروض'
        ],
        featuresEn: [
          'Management across 3–4 platforms (IG, FB, TikTok, LinkedIn)',
          '20 monthly posts & Reels + daily interactive Story sequences',
          'Comment moderation and routing DM inquiries to WhatsApp sales',
          'Monthly strategy call to align content with seasonal offers'
        ],
        featuresFr: [
          'Gestion de 3 à 4 réseaux (Instagram, Facebook, TikTok, LinkedIn)',
          '20 publications et Reels par mois + Stories quotidiennes',
          'Modération des commentaires et orientation des messages vers WhatsApp',
          'Réunion stratégique mensuelle d’optimisation'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'إعداد واعتماد خطة المحتوى الشهرية',
        titleEn: 'Monthly Editorial Calendar Approval',
        titleFr: 'Validation du Calendrier Éditorial',
        descAr: 'تسليمك جدول مواضيع وأفكار الشهر كاملًا للموافقة عليه قبل بدء التصميم.',
        descEn: 'Presenting the full month’s topics, hooks, and schedule for your approval.',
        descFr: 'Présentation des sujets et concepts du mois pour validation.'
      },
      {
        titleAr: 'إنتاج التصاميم والجدولة والنشر',
        titleEn: 'Content Production & Scheduling',
        titleFr: 'Création & Programmation',
        descAr: 'تصميم المنشورات وكتابة النصوص وجدولتها في أوقات ذروة تفاعل جمهورك.',
        descEn: 'Designing visuals, writing captions, and scheduling at peak audience hours.',
        descFr: 'Conception des visuels, rédaction et publication aux heures de forte audience.'
      },
      {
        titleAr: 'المتابعة وتحليل النتائج الشهرية',
        titleEn: 'Community Care & Monthly Analytics',
        titleFr: 'Suivi & Analyse Mensuelle',
        descAr: 'مراقبة التفاعل وتحليل المنشورات الأعلى أداءً لتطوير خطة الشهر التالي.',
        descEn: 'Monitoring engagement and doubling down on top-performing content formats.',
        descFr: 'Analyse des publications les plus performantes pour optimiser le mois suivant.'
      }
    ]
  },

  'content-production': {
    slug: 'content-production',
    categoryKey: 'ARTIST_SERVICES',
    nameAr: 'إنتاج المحتوى الشهري الجاهز للنشر (Content Engine)',
    nameEn: 'Monthly Content Production Engine (Graphics & Video)',
    nameFr: 'Production Mensuelle de Contenu (Visuels & Vidéos)',
    descAr: 'خدمة تسليم شهري للمنشورات والتصاميم ومقاطع الفيديو القصيرة الجاهزة للنشر، مخصصة للشركات التي تدير حساباتها بنفسها وتحتاج لمحتوى احترافي مستمر.',
    descEn: 'Recurring monthly delivery of ready-to-post graphics, carousels, and short videos for teams that handle their own posting.',
    descFr: 'Livraison mensuelle clé en main de visuels, carrousels et vidéos courtes prêts à publier pour alimenter vos réseaux en continu.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'brand-identity',
    order: 44,
    deliverablesAr: [
      'تسليم حزمة شهرية متكاملة من التصاميم الثابتة، الكاروسيل، ومقاطع Reels الممنتجة',
      'كتابة النصوص المرفقة (Captions) والعناوين التسويقية لكل قطعة محتوى',
      'تنظيم جميع الملفات في مجلد سحابي مرتب حسب أيام النشر لسهولة الرفع الفوري',
      'ثبات كامل في الهوية البصرية وجودة التصميم دون تكلفة توظيف فريق داخلي'
    ],
    deliverablesEn: [
      'Monthly batch delivery of static designs, multi-slide carousels, and edited Reels',
      'Ready-to-copy captions and marketing hooks written for every asset',
      'Organized cloud folder structured by publishing date for effortless posting',
      'Consistent agency-grade visual quality without internal hiring overhead'
    ],
    deliverablesFr: [
      'Livraison mensuelle groupée de visuels, carrousels et vidéos Reels montées',
      'Textes de publication (Captions) et accroches rédigés pour chaque contenu',
      'Dossier cloud organisé par ordre de publication pour une mise en ligne facile',
      'Qualité graphique d’agence constante sans les coûts d’une équipe interne'
    ],
    packages: [
      {
        nameAr: 'حزمة المحتوى الشهرية الأساسية (15 قطعة محتوى)',
        nameEn: 'Core Monthly Content Batch (15 Assets)',
        nameFr: 'Pack Contenu Mensuel Essentiel (15 Contenus)',
        featuresAr: [
          '10 تصاميم ومنشورات كاروسيل احترافية',
          '5 مقاطع فيديو Reels ممنتجة مع النصوص المتحركة',
          'كتابة الـ Captions لجميع المنشورات',
          'تسليم الحزمة كاملة في بداية كل شهر'
        ],
        featuresEn: [
          '10 custom social graphics and carousel posts',
          '5 edited vertical Reels with animated captions',
          'Complete post captions written in your chosen language',
          'Delivered in organized batches ready for your team to post'
        ],
        featuresFr: [
          '10 visuels et carrousels sur-mesure',
          '5 vidéos Reels montées avec sous-titres dynamiques',
          'Légendes (Captions) rédigées pour chaque publication',
          'Livraison groupée prête à être publiée par votre équipe'
        ]
      },
      {
        nameAr: 'محرك المحتوى المكثف (30 قطعة محتوى شهرياً)',
        nameEn: 'Scale Content Engine (30 Monthly Assets)',
        nameFr: 'Pack Production Intensive (30 Contenus / Mois)',
        isPopular: true,
        featuresAr: [
          '18 تصميماً ومنشور كاروسيل للسوشيال ميديا والإعلانات',
          '12 مقطع فيديو Reels وTikTok ممنتج وجاهز',
          'قوالب Stories تفاعلية مخصصة لعلامتك',
          'أولوية في التنفيذ والتعديل مع مدير حساب مخصص'
        ],
        featuresEn: [
          '18 custom graphics and carousels for organic & paid use',
          '12 edited Reels/TikTok videos with high-retention hooks',
          'Branded interactive Story templates included',
          'Priority turnaround with a dedicated creative manager'
        ],
        featuresFr: [
          '18 visuels et carrousels pour vos réseaux et publicités',
          '12 vidéos Reels/TikTok montées avec accroches percutantes',
          'Templates de Stories interactives aux couleurs de votre marque',
          'Traitement prioritaire avec chef de projet dédié'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'جلسة تخطيط المحتوى الشهري',
        titleEn: 'Monthly Content Briefing',
        titleFr: 'Briefing Mensuel des Contenus',
        descAr: 'تحديد العروض والمنتجات والرسائل التي تود التركيز عليها خلال الشهر.',
        descEn: 'Aligning on your monthly promos, products, and key themes.',
        descFr: 'Définition de vos offres, produits phares et thématiques du mois.'
      },
      {
        titleAr: 'التصميم والمونتاج الجماعي (Batch Production)',
        titleEn: 'Studio Batch Production',
        titleFr: 'Production Graphique & Vidéo',
        descAr: 'إنتاج كافة التصاميم والفيديوهات والنصوص وفق هوية علامتك.',
        descEn: 'Producing all graphics, carousels, videos, and captions in one cohesive batch.',
        descFr: 'Création de l’ensemble des visuels, vidéos et textes du mois.'
      },
      {
        titleAr: 'المراجعة والتسليم في مجلد جاهز',
        titleEn: 'Review & Cloud Folder Handover',
        titleFr: 'Validation & Livraison Clé en Main',
        descAr: 'اعتماد المحتوى وتسليمه مرتباً وجاهزاً للنشر المباشر.',
        descEn: 'Final review and delivery of your ready-to-publish monthly content library.',
        descFr: 'Validation et mise à disposition dans votre espace cloud organisé.'
      }
    ]
  },

  // ============================================================================
  // PILLAR 5: WHATSAPP, CRM & AI AUTOMATION (order: 5, sub-orders: 51..52)
  // ============================================================================
  'whatsapp-lead-automation': {
    slug: 'whatsapp-lead-automation',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'الأتمتة والذكاء الاصطناعي (WhatsApp & CRM)',
    nameEn: 'WhatsApp, CRM & AI Business Automation',
    nameFr: 'Automatisation WhatsApp, CRM & IA',
    descAr: 'أتمتة مسارات التواصل مع العملاء المحتملين عبر واتساب، ربط أنظمة إدارة علاقات العملاء (CRM) ومساعدات الذكاء الاصطناعي لتأهيل الزبائن 24/7.',
    descEn: 'Automating lead qualification via WhatsApp, CRM pipeline integrations, and AI assistants to convert inquiries into sales 24/7.',
    descFr: 'Automatisation de la qualification des prospects sur WhatsApp, intégration CRM et assistants IA pour booster vos ventes 24/7.',
    showInCatalog: true,
    showInQuoteForm: true,
    parentSlug: null,
    order: 5,
    deliverablesAr: [
      'الرد الفوري التلقائي عبر WhatsApp في أقل من 5 ثوانٍ على كل عميل قادم من الإعلانات أو الموقع',
      'مسار أسئلة تفاعلي لتأهيل العميل (تحديد الخدمة، المدينة، الميزانية) قبل تحويله للمبيعات',
      'ربط تلقائي لكافة بيانات العملاء المحتملين مع لوحة CRM أو Notion أو Google Sheets',
      'رسائل متابعة آلية (Automated Follow-ups) لاستعادة العملاء الذين لم يكملوا الحجز أو الشراء'
    ],
    deliverablesEn: [
      'Instant <5-second automated WhatsApp response for every ad and website lead',
      'Interactive qualification flows (service, city, budget) before routing to human sales',
      'Automatic two-way sync with your CRM, Notion workspace, or Google Sheets',
      'Automated follow-up sequences to recover unresponsive prospects and abandoned inquiries'
    ],
    deliverablesFr: [
      'Réponse automatique sur WhatsApp en moins de 5 secondes pour chaque prospect',
      'Scénarios interactifs de qualification (besoin, ville, budget) avant transfert aux commerciaux',
      'Synchronisation automatique avec votre CRM, Notion ou Google Sheets',
      'Séquences de relance automatisées pour convertir les prospects indécis'
    ],
    packages: [
      {
        nameAr: 'أتمتة استقبال وتأهيل العملاء عبر واتساب',
        nameEn: 'WhatsApp Lead Capture & Qualification Flow',
        nameFr: 'Flux WhatsApp & Qualification Prospects',
        featuresAr: [
          'ربط استمارات الموقع وإعلانات Meta/TikTok بواتساب تلقائياً',
          'رسائل ترحيب وتأهيل فورية للعميل المحتمل',
          'تنظيم وحفظ بيانات العملاء في لوحة CRM / Notion',
          'تنبيهات فورية لفريق المبيعات بالعملاء الجادين'
        ],
        featuresEn: [
          'Automatic sync from web forms & ads to WhatsApp',
          'Instant automated greeting & qualification messages',
          'Centralized lead storage in Notion / CRM pipeline',
          'Real-time sales team alerts for hot leads'
        ],
        featuresFr: [
          'Synchronisation formulaires/publicités vers WhatsApp',
          'Messages d’accueil et de qualification instantanés',
          'Centralisation des prospects dans votre CRM / Notion',
          'Notifications en temps réel pour votre équipe commerciale'
        ]
      },
      {
        nameAr: 'منظومة الأتمتة والذكاء الاصطناعي الشاملة (Auto-Pilot)',
        nameEn: 'Full AI Assistant & CRM Auto-Pilot Suite',
        nameFr: 'Système Complet IA & CRM Auto-Pilot',
        isPopular: true,
        featuresAr: [
          'مساعد ذكي يجيب على الاستفسارات المتكررة 24/7 بلغات متعددة',
          'أتمتة جدولة المواعيد أو تأكيد الطلبيات والشحن',
          'مسارات إعادة استهداف ومتابعة تلقائية (Follow-up Sequences)',
          'لوحة تحكم شاملة لقياس معدلات الإغلاق والتحويل'
        ],
        featuresEn: [
          '24/7 multilingual AI assistant handling FAQs and objections',
          'Automated appointment booking or COD order confirmation',
          'Multi-step automated follow-up sequences',
          'Analytics dashboard tracking conversion & close rates'
        ],
        featuresFr: [
          'Assistant IA multilingue 24/7 pour répondre aux questions fréquentes',
          'Prise de rendez-vous ou confirmation de commande automatisée',
          'Séquences de relance automatiques multi-étapes',
          'Suivi précis des taux de conversion et de closing'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'هيكلة مسار العميل وسيناريو المحادثة',
        titleEn: 'Conversation Flow Mapping',
        titleFr: 'Cartographie du Parcours Conversationnel',
        descAr: 'تحديد نقاط التواصل والأسئلة الأساسية لتأهيل العميل وتوجيهه.',
        descEn: 'Designing conversation trees and lead qualification criteria.',
        descFr: 'Définition des scénarios de conversation et critères de qualification.'
      },
      {
        titleAr: 'الربط التقني وإعداد الأتمتة',
        titleEn: 'API, Webhook & CRM Integration',
        titleFr: 'Intégration Technique & CRM',
        descAr: 'برمجة الربط بين الموقع، واتساب، ولوحة متابعة المبيعات.',
        descEn: 'Connecting webhooks, WhatsApp APIs, and CRM databases.',
        descFr: 'Connexion entre votre site, WhatsApp et votre outil de suivi.'
      },
      {
        titleAr: 'التجربة والتشغيل التلقائي',
        titleEn: 'Testing & Auto-Pilot Launch',
        titleFr: 'Tests & Activation Auto-Pilot',
        descAr: 'اختبار كافة السيناريوهات وتدريب فريقك على إدارة النظام بمرونة.',
        descEn: 'End-to-end flow testing and training your team on the dashboard.',
        descFr: 'Validation complète des flux et prise en main par votre équipe.'
      }
    ]
  },

  'crm-sales-pipeline': {
    slug: 'crm-sales-pipeline',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'إعداد نظام CRM وهيكلة مسار المبيعات (Sales Pipeline)',
    nameEn: 'CRM Setup & Sales Pipeline Engineering',
    nameFr: 'Configuration CRM & Structuration du Pipeline Commercial',
    descAr: 'تنظيم وتوحيد جميع عملائك المحتملين القادمين من الإعلانات والموقع وواتساب داخل لوحة مبيعات ذكية تمنع ضياع أي فرصة بيعية.',
    descEn: 'Centralizing all leads from ads, website forms, and WhatsApp into a structured CRM pipeline so your sales team never loses a deal.',
    descFr: 'Centralisation de tous vos prospects (publicités, site web, WhatsApp) dans un pipeline CRM structuré pour ne plus perdre aucune vente.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'whatsapp-lead-automation',
    order: 51,
    deliverablesAr: [
      'بناء وتخصيص مراحل البيع (جديد -> تم التواصل -> عرض سعر مرسل -> تفاوض -> مغلق بنجاح)',
      'ربط تلقائي مع استمارات الموقع، إعلانات Meta Lead Ads، وواتساب بدون إدخال يدوي',
      'توزيع العملاء المحتملين على مندوبي المبيعات مع تنبيهات المهام والمتابعة المتأخرة',
      'لوحة إحصائيات لمعرفة مصدر كل عميل (UTM Tracking) ونسبة إغلاق المبيعات'
    ],
    deliverablesEn: [
      'Custom deal stages tailored to your sales cycle (New -> Qualified -> Proposal -> Won)',
      'Zero-manual-entry webhooks syncing website forms, Meta Lead Ads, and WhatsApp',
      'Automated sales rep assignment, follow-up reminders, and overdue task alerts',
      'Attribution reporting linking closed revenue back to exact ad campaigns (UTMs)'
    ],
    deliverablesFr: [
      'Étapes du pipeline personnalisées selon votre cycle de vente (Nouveau -> Qualifié -> Devis -> Gagné)',
      'Synchronisation automatique sans saisie manuelle depuis votre site, Meta Ads et WhatsApp',
      'Attribution automatique aux commerciaux et rappels de relance',
      'Reporting d’attribution reliant chaque vente à la campagne publicitaire d’origine (UTM)'
    ],
    packages: [
      {
        nameAr: 'تأسيس لوحة مبيعات ذكية (Notion / HubSpot / Custom CRM)',
        nameEn: 'Core Sales Pipeline Setup',
        nameFr: 'Mise en Place Pipeline CRM Essentiel',
        featuresAr: [
          'إعداد وتخصيص لوحة CRM ومراحل متابعة العملاء',
          'ربط تلقائي لاستمارات الموقع والإعلانات باللوحة',
          'قوالب جاهزة لعروض الأسعار ورسائل المتابعة السريعة',
          'جلسة تدريب عملية لفريق المبيعات'
        ],
        featuresEn: [
          'Custom CRM board and deal stage configuration',
          'Automated webhook sync from website and ad forms',
          'Pre-built WhatsApp/email follow-up and quote templates',
          'Hands-on onboarding session for your sales team'
        ],
        featuresFr: [
          'Configuration sur-mesure du CRM et des étapes de vente',
          'Connexion automatique des formulaires web et publicitaires',
          'Modèles de relance WhatsApp/email et suivi des devis',
          'Session de formation pratique pour votre équipe commerciale'
        ]
      },
      {
        nameAr: 'منظومة CRM المتقدمة وأتمتة المبيعات الشاملة',
        nameEn: 'Enterprise CRM & Automated Sales Operations',
        nameFr: 'Système CRM Avancé & Automatisation Commerciale',
        isPopular: true,
        featuresAr: [
          'ربط ثنائي الاتجاه مع WhatsApp والبريد الإلكتروني والفوترة',
          'تذكير تلقائي للمندوبين وإعادة تنشيط العملاء القدامى (Win-back)',
          'تتبع كامل لمصادر الإعلانات (UTM & ROAS Attribution)',
          'دعم فني وتحسين لمسار المبيعات لمدة 60 يوماً'
        ],
        featuresEn: [
          'Two-way integration with WhatsApp, email, and invoicing',
          'Automated rep reminders and dormant lead win-back sequences',
          'Full UTM & ROAS attribution dashboard per sales rep',
          '60 days of sales operations support and optimization'
        ],
        featuresFr: [
          'Intégration bidirectionnelle avec WhatsApp, email et facturation',
          'Rappels automatiques aux commerciaux et relance des anciens prospects',
          'Tableau de bord de performance par commercial et par source UTM',
          '60 jours d’accompagnement et d’optimisation'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'تحليل دورة البيع الحالية',
        titleEn: 'Sales Cycle Audit & Blueprint',
        titleFr: 'Audit du Cycle de Vente',
        descAr: 'فهم كيفية تعامل فريقك مع العملاء حالياً وتصميم المراحل والحقول المطلوبة.',
        descEn: 'Mapping your current lead handling process and defining custom CRM fields.',
        descFr: 'Analyse de votre processus actuel et définition des étapes du pipeline.'
      },
      {
        titleAr: 'بناء النظام وربط قنوات الاستقطاب',
        titleEn: 'CRM Configuration & Webhook Sync',
        titleFr: 'Paramétrage CRM & Connexions API',
        descAr: 'تجهيز اللوحة وربطها بالموقع والإعلانات وواتساب واختبار تدفق البيانات.',
        descEn: 'Building the workspace and connecting live lead sources and notifications.',
        descFr: 'Construction de l’outil et connexion de toutes vos sources de prospects.'
      },
      {
        titleAr: 'تدريب الفريق وإطلاق العمل',
        titleEn: 'Team Training & Go-Live',
        titleFr: 'Formation Équipe & Lancement',
        descAr: 'تدريب فريق المبيعات على تحديث حالات العملاء واستخراج التقارير اليومية.',
        descEn: 'Training your team to manage deals efficiently and track daily KPIs.',
        descFr: 'Formation de vos commerciaux à l’utilisation quotidienne du pipeline.'
      }
    ]
  },

  'ai-business-assistant': {
    slug: 'ai-business-assistant',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'مساعد أعمال ذكي بالذكاء الاصطناعي (AI Sales & Support Agent)',
    nameEn: 'Custom AI Business & Sales Assistant (24/7 Agent)',
    nameFr: 'Assistant Virtuel IA sur-mesure (Vente & Support 24/7)',
    descAr: 'بناء وكيل ذكاء اصطناعي مدرب خصيصاً على بيانات شركتك وأسعارك وخدماتك، يجيب العملاء فوراً على مدار 24 ساعة عبر الموقع وواتساب وإنستغرام.',
    descEn: 'Bespoke AI agent trained on your company data, pricing, and FAQs to answer inquiries, qualify leads, and book appointments 24/7.',
    descFr: 'Agent IA entraîné sur les données de votre entreprise pour répondre aux clients, qualifier les prospects et prendre des rendez-vous 24/7.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'whatsapp-lead-automation',
    order: 52,
    deliverablesAr: [
      'تدريب نموذج الذكاء الاصطناعي على قاعدة معرفة شركتك (الخدمات، الأسعار، الأسئلة الشائعة، السياسات)',
      'تحدث طبيعي ودقيق بالعربية والدارجة المغربية والفرنسية والإنجليزية حسب لغة العميل',
      'تأهيل العميل المحتمل وجمع بياناته أو حجز موعد استشارة وإرسالها مباشرة إلى CRM',
      'آلية تحويل فوري للموظف البشري (Human Handover) عند الحاجة لتدخل مبيعات مباشر'
    ],
    deliverablesEn: [
      'Custom knowledge-base training on your services, pricing, policies, and objection scripts',
      'Fluent, natural conversation in Arabic, Moroccan Darija, French, and English',
      'Automated lead capture, qualification scoring, and calendar appointment booking',
      'Seamless human handover with full conversation summary sent to your sales team'
    ],
    deliverablesFr: [
      'Entraînement sur-mesure sur votre base de connaissances (offres, tarifs, FAQ)',
      'Conversation fluide et naturelle en Arabe, Darija, Français et Anglais',
      'Qualification automatique du prospect, collecte des coordonnées et prise de RDV',
      'Transfert intelligent vers un conseiller humain avec résumé de la discussion'
    ],
    packages: [
      {
        nameAr: 'مساعد ذكي للموقع أو واتساب (AI Lead Qualifier)',
        nameEn: 'AI Website / WhatsApp Qualifier Agent',
        nameFr: 'Agent IA de Qualification (Site Web ou WhatsApp)',
        featuresAr: [
          'تدريب المساعد الذكي على خدماتك وأسئلتك الشائعة',
          'الرد الآلي الفوري 24/7 بـ 3 لغات + الدارجة',
          'جمع بيانات العميل المحتمل وحفظها في CRM / Notion',
          'تحويل المحادثات المؤهلة مباشرة لفريق المبيعات'
        ],
        featuresEn: [
          'Custom AI agent trained on your business offers and FAQs',
          '24/7 instant responses in AR, Darija, FR, and EN',
          'Automated lead data capture synced to Notion / CRM',
          'Smart escalation of hot leads to your human sales reps'
        ],
        featuresFr: [
          'Agent IA entraîné sur vos offres et questions fréquentes',
          'Réponses instantanées 24/7 en AR, Darija, FR et EN',
          'Collecte automatique des coordonnées vers Notion / CRM',
          'Transfert intelligent des prospects chauds à votre équipe'
        ]
      },
      {
        nameAr: 'وكيل مبيعات ذكي متعدد القنوات (Omnichannel AI Agent)',
        nameEn: 'Omnichannel AI Sales & Booking Agent',
        nameFr: 'Agent IA Omnicanal (WhatsApp + Instagram + Web)',
        isPopular: true,
        featuresAr: [
          'ربط موحد على WhatsApp + Instagram DM + دردشة الموقع',
          'القدرة على اقتراح الباقات وحجز المواعيد أو تتبع حالة الطلب',
          'لوحة مراقبة للمحادثات مع إمكانية التدخل البشري في أي لحظة',
          'تحديث وتطوير مستمر لقاعدة معرفة المساعد لمدة 60 يوماً'
        ],
        featuresEn: [
          'Unified AI agent across WhatsApp, Instagram DM & Website Chat',
          'Dynamic package recommendations, calendar booking & order lookup',
          'Live inbox monitoring with instant human takeover capability',
          '60 days of prompt tuning and knowledge-base optimization'
        ],
        featuresFr: [
          'Agent IA unifié sur WhatsApp, Instagram DM et Chat du site',
          'Recommandation d’offres, prise de rendez-vous et suivi de commande',
          'Interface de supervision avec reprise en main humaine à tout moment',
          '60 jours d’optimisation continue des réponses IA'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'بناء قاعدة المعرفة وقواعد الحوار',
        titleEn: 'Knowledge Base & Guardrails Setup',
        titleFr: 'Base de Connaissances & Règles IA',
        descAr: 'تجميع كافة معلومات شركتك وضبط حدود إجابات المساعد لضمان دقة المعلومات 100%.',
        descEn: 'Structuring your company docs and strict AI guardrails to prevent hallucinations.',
        descFr: 'Structuration de vos données et règles strictes pour des réponses 100% fiables.'
      },
      {
        titleAr: 'التدريب والربط بالقنوات وCRM',
        titleEn: 'Agent Training & Channel Integration',
        titleFr: 'Entraînement & Connexion aux Canaux',
        descAr: 'ربط المساعد بواتساب أو الموقع ونظام CRM لإرسال ملخصات العملاء المؤهلين.',
        descEn: 'Connecting the AI agent to WhatsApp/Web and syncing captured leads to CRM.',
        descFr: 'Intégration sur WhatsApp/Site web et synchronisation avec votre CRM.'
      },
      {
        titleAr: 'الاختبار الميداني والتحسين المستمر',
        titleEn: 'Live Conversation QA & Tuning',
        titleFr: 'Tests Réels & Affinage des Réponses',
        descAr: 'مراجعة المحادثات الأولى وتحسين نبرة الصوت وأسئلة الإقناع.',
        descEn: 'Testing real scenarios and refining prompts for maximum conversion.',
        descFr: 'Validation sur scénarios réels et optimisation du taux de qualification.'
      }
    ]
  },

  // ============================================================================
  // PILLAR 6: AUDIO PRODUCTION & ARTIST SERVICES (order: 6, sub-orders: 61..69)
  // ============================================================================
  'music-production': {
    slug: 'music-production',
    categoryKey: 'AUDIO_PRODUCTION',
    nameAr: 'الإنتاج الصوتي والموسيقي وخدمات الفنانين',
    nameEn: 'Audio Production, Studio & Artist Services',
    nameFr: 'Production Audio, Musique & Services Artistes',
    descAr: 'تسجيل صوتي احترافي، تلحين، توزيع موسيقي، ميكساج وماسترينغ، بالإضافة إلى التعليق الصوتي الإعلاني وإدارة الحضور الرقمي للفنانين.',
    descEn: 'Professional studio recording, composition, arrangement, mixing & mastering, commercial voice-overs, and digital artist services.',
    descFr: 'Enregistrement studio, composition, arrangement, mixage et mastering, voix-off publicitaires et accompagnement d’artistes.',
    showInCatalog: true,
    showInQuoteForm: true,
    parentSlug: null,
    order: 6,
    deliverablesAr: [
      'تسجيل صوتي احترافي داخل استوديو معزول صوتياً بأحدث الميكروفونات وكروت الصوت العالمية',
      'تلحين وتوزيع موسيقي أصيل، وإنتاج الهويات الصوتية والتعليق الصوتي الإعلاني (Voice-Over)',
      'هندسة صوتية متقدمة (Mixing & Mastering) تمنح العمل نقاءً وقوة جاهزة للبث والمنصات',
      'توزيع رقمي للأعمال الفنية وحماية الحقوق على Spotify وApple Music وYouTube'
    ],
    deliverablesEn: [
      'Vocal and instrument tracking in an acoustically treated studio with flagship gear',
      'Original music composition, sonic branding, and commercial voice-over production',
      'Broadcast-ready Mixing & Mastering engineered for streaming platforms',
      'Global digital music distribution and rights management across Spotify, Apple Music & YouTube'
    ],
    deliverablesFr: [
      'Prise de son vocale et instrumentale en studio traité acoustiquement',
      'Composition originale, identité sonore et production de voix-off publicitaires',
      'Mixage et Mastering haute fidélité aux normes des plateformes de streaming',
      'Distribution digitale mondiale et gestion des droits sur Spotify, Apple Music et YouTube'
    ],
    packages: [
      {
        nameAr: 'الإنتاج الصوتي والتسجيل بالاستوديو',
        nameEn: 'Studio Recording, Mix & Master',
        nameFr: 'Enregistrement Studio, Mix & Master',
        featuresAr: [
          'جلسات تسجيل صوتي احترافية داخل استوديو WEZO',
          'معالجة وتصحيح الأداء الصوتي (Vocal Tuning & Editing)',
          'ميكساج وماسترينغ احترافي بمعايير البث العالمية',
          'تسليم النسخ النهائية بصيغ WAV وMP3 عالية الجودة'
        ],
        featuresEn: [
          'Professional vocal tracking sessions at WEZO Studio',
          'Detailed vocal editing, timing, and pitch correction',
          'Full multi-track mixing and loudness mastering',
          'Delivery of high-resolution WAV and MP3 masters'
        ],
        featuresFr: [
          'Sessions d’enregistrement vocal au studio WEZO',
          'Édition vocale précise et correction de justesse',
          'Mixage multipiste et mastering aux normes internationales',
          'Livraison des fichiers masters WAV et MP3 haute définition'
        ]
      },
      {
        nameAr: 'الإنتاج الموسيقي الكامل أو الهوية الصوتية للشركات',
        nameEn: 'Full Track Production / Sonic Branding Suite',
        nameFr: 'Production Musicale Complète / Identité Sonore',
        isPopular: true,
        featuresAr: [
          'تلحين وتوزيع موسيقي كامل من الصفر (أغنية كاملة أو Jingle إعلاني)',
          'تسجيل الصوت أو توفير معلقين صوتيين محترفين (AR / FR / EN)',
          'ميكساج وماسترينغ شامل + تسليم المسارات المنفصلة (Stems)',
          'إعداد التوزيع الرقمي على المنصات أو ترخيص الاستخدام التجاري الكامل'
        ],
        featuresEn: [
          'Custom composition and full arrangement (complete song or brand jingle)',
          'Studio vocal recording or professional voice-over talent (AR/FR/EN)',
          'Full mix, master, and separated audio stems delivery',
          'Digital platform distribution setup or full commercial buyout license'
        ],
        featuresFr: [
          'Composition et arrangement sur-mesure (titre complet ou jingle marque)',
          'Enregistrement studio ou casting voix-off professionnelle (AR/FR/EN)',
          'Mixage, mastering et remise des pistes séparées (Stems)',
          'Distribution sur les plateformes ou cession complète des droits commerciaux'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'التحضير الفني والتسجيل بالاستوديو',
        titleEn: 'Pre-Production & Studio Recording',
        titleFr: 'Pré-production & Enregistrement',
        descAr: 'تحديد الهوية الصوتية والأسلوب الموسيقي والتسجيل داخل استوديو WEZO الاحترافي.',
        descEn: 'Defining the sonic direction and recording in our acoustic studio.',
        descFr: 'Définition de la direction artistique et prise de son en studio.'
      },
      {
        titleAr: 'التوزيع والهندسة الصوتية والماسترينغ',
        titleEn: 'Arrangement, Mixing & Mastering',
        titleFr: 'Arrangement, Mixage & Mastering',
        descAr: 'معالجة الصوت وموازنته للحصول على نقاء وجودة جاهزة للبث والنشر.',
        descEn: 'Acoustic balancing and mastering for broadcast-ready clarity.',
        descFr: 'Traitement acoustique et mastering prêt pour la diffusion.'
      },
      {
        titleAr: 'التسليم النهائي والنشر الرقمي',
        titleEn: 'Master Delivery & Release',
        titleFr: 'Livraison des Masters & Diffusion',
        descAr: 'تسليم الملفات القياسية وإعداد النشر على المنصات الرقمية.',
        descEn: 'Delivering final studio masters and launching across digital platforms.',
        descFr: 'Remise des fichiers finaux et mise en ligne sur les plateformes.'
      }
    ]
  },

  artist: {
    slug: 'artist',
    categoryKey: 'ARTIST_SERVICES',
    nameAr: 'خدمات الفنانين والتوزيع الرقمي وإدارة القنوات',
    nameEn: 'Artist Management, Music Distribution & Channel Growth',
    nameFr: 'Services aux Artistes, Distribution Digitale & Gestion',
    descAr: 'مواكبة شاملة للفنانين وصناع الموسيقى تشمل التوزيع الرقمي على المنصات العالمية، توثيق الحسابات، تصميم الأغلفة الفنية، والترويج الإعلاني للأعمال.',
    descEn: 'End-to-end support for recording artists including global music distribution, profile verification, cover artwork, and release promo campaigns.',
    descFr: 'Accompagnement complet des artistes : distribution sur Spotify/Apple Music, gestion de chaîne YouTube, pochettes d’album et promotion.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'music-production',
    order: 61,
    deliverablesAr: [
      'توزيع رسمي للأغاني والألبومات على Spotify وApple Music وAnghami وDeezer وTikTok مع حفظ الحقوق',
      'تصميم الغلاف الفني (Cover Art) ومقاطع الـ Visualizer والـ Teasers الترويجية',
      'إدارة وتهيئة قناة YouTube الرسمية وحسابات Spotify for Artists',
      'حملات إعلانية مخصصة لإطلاق الأغنية (Release Campaigns) وزيادة الاستماعات الحقيقية'
    ],
    deliverablesEn: [
      'Official digital distribution to Spotify, Apple Music, Anghami, Deezer & TikTok with royalty tracking',
      'Custom single/album Cover Art design, lyric visualizers, and social teasers',
      'YouTube Official Artist Channel (OAC) and Spotify for Artists optimization',
      'Targeted release marketing campaigns on YouTube, Instagram, and TikTok'
    ],
    deliverablesFr: [
      'Distribution officielle sur Spotify, Apple Music, Anghami, Deezer et TikTok avec suivi des revenus',
      'Création de la pochette (Cover Art), visualizers vidéo et teasers réseaux sociaux',
      'Optimisation de la chaîne YouTube Officielle Artiste et Spotify for Artists',
      'Campagnes de promotion ciblées sur YouTube, Instagram et TikTok lors des sorties'
    ],
    packages: [
      {
        nameAr: 'باقة إطلاق وتوزيع عمل فني (Single Release Kit)',
        nameEn: 'Single Release & Distribution Kit',
        nameFr: 'Pack Sortie de Single & Distribution',
        featuresAr: [
          'توزيع الأغنية على كافة المنصات العالمية وتفعيل Content ID',
          'تصميم غلاف الأغنية (Cover Art) + فيديو Visualizer ليوتيوب',
          'إعداد صفحة رابط ذكي (Smart Pre-Save / Listen Link) للجمهور',
          'حملة ترويجية أولية على YouTube وInstagram'
        ],
        featuresEn: [
          'Global distribution across all streaming platforms + Content ID',
          'Custom Single Cover Art + YouTube Visualizer video',
          'Smart fan listen link page (Spotify, Apple, YouTube in 1 click)',
          'Launch promo campaign setup on YouTube & Instagram'
        ],
        featuresFr: [
          'Distribution mondiale sur toutes les plateformes + Content ID',
          'Création de la pochette (Cover Art) + vidéo Visualizer YouTube',
          'Page de lien intelligent multi-plateformes pour vos fans',
          'Campagne promotionnelle de lancement sur YouTube et Instagram'
        ]
      },
      {
        nameAr: 'إدارة وتطوير مسيرة الفنان (Artist 360 Growth)',
        nameEn: 'Artist 360 Management & Promo Suite',
        nameFr: 'Accompagnement Artiste 360 & Promotion',
        isPopular: true,
        featuresAr: [
          'إنتاج وتوزيع مستمر للأعمال مع إدارة حقوق الملكية الفكرية',
          'إدارة الهوية البصرية للفنان وحسابات التواصل الاجتماعي',
          'تصوير وإخراج الفيديو كليب أو جلسات الأداء الحي (Live Sessions)',
          'إدارة الحملات الإعلانية والعلاقات العامة الرقمية (Digital PR)'
        ],
        featuresEn: [
          'Ongoing release distribution and digital rights/royalty management',
          'Complete artist branding and social media channel management',
          'Music video or live session production and art direction',
          'Dedicated YouTube/TikTok ad campaigns and digital PR'
        ],
        featuresFr: [
          'Distribution continue des sorties et gestion des droits numériques',
          'Direction artistique complète et gestion des réseaux sociaux',
          'Production de clips vidéo ou sessions live en studio',
          'Campagnes publicitaires YouTube/TikTok et relations presse digitales'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'تجهيز العمل الفني والبيانات الوصفية',
        titleEn: 'Release Prep & Metadata Mastering',
        titleFr: 'Préparation de la Sortie & Métadonnées',
        descAr: 'ضبط ملفات الماستر، أكواد ISRC، الغلاف الفني، وحقوق المؤلفين.',
        descEn: 'Preparing audio masters, ISRC codes, cover art, and publishing splits.',
        descFr: 'Vérification des masters audio, codes ISRC, pochette et crédits.'
      },
      {
        titleAr: 'الجدولة على المنصات وتقديم الـ Pitching',
        titleEn: 'Platform Scheduling & Playlist Pitching',
        titleFr: 'Planification & Pitching Playlists',
        descAr: 'رفع العمل قبل موعد الإصدار وتقديمه لقوائم التشغيل التحريرية.',
        descEn: 'Uploading ahead of release date and pitching to editorial curators.',
        descFr: 'Mise en ligne anticipée et soumission aux playlists éditoriales.'
      },
      {
        titleAr: 'إطلاق الحملة الترويجية وتتبع الإحصائيات',
        titleEn: 'Release Promo & Streams Analytics',
        titleFr: 'Campagne Promo & Suivi des Écoutes',
        descAr: 'تشغيل الإعلانات الموجهة للجمهور الفني ومتابعة نمو الاستماعات والمشاهدات.',
        descEn: 'Launching targeted fan acquisition ads and tracking streaming growth.',
        descFr: 'Diffusion des campagnes promotionnelles et suivi des performances.'
      }
    ]
  },

  audio: {
    slug: 'audio',
    categoryKey: 'AUDIO_PRODUCTION',
    nameAr: 'الهندسة الصوتية والتعليق الصوتي الإعلاني (Voice-Over & Mixing)',
    nameEn: 'Sound Engineering, Mixing & Commercial Voice-Over',
    nameFr: 'Ingénierie Sonore, Mixage & Voix-Off Publicitaire',
    descAr: 'خدمات الهندسة الصوتية المتخصصة، الميكساج والماسترينغ، تسجيل التعليق الصوتي الإعلاني للشركات، ومعالجة صوت البودكاست والكتب الصوتية.',
    descEn: 'Specialized sound engineering, multi-track mixing & mastering, commercial voice-over recording, and podcast audio post-production.',
    descFr: 'Services spécialisés d’ingénierie sonore, mixage et mastering, enregistrement de voix-off publicitaires et post-production podcast.',
    showInCatalog: false,
    showInQuoteForm: false,
    parentSlug: 'music-production',
    order: 69,
    deliverablesAr: [
      'تسجيل تعليق صوتي احترافي (Voice-Over) للإعلانات والأفلام الوثائقية والرد الآلي IVR بلغات متعددة',
      'تنظيف ومعالجة التسجيلات الصوتية والبودكاست وإزالة الضوضاء والصدى',
      'ميكساج وماسترينغ احترافي يضمن وضوح الصوت وتوازنه على الهواتف، السيارات، وشاشات العرض',
      'تصميم المؤثرات الصوتية والخلفية الموسيقية المرخصة للاستخدام التجاري'
    ],
    deliverablesEn: [
      'Commercial voice-over recording for ads, corporate films, and IVR phone systems (AR/FR/EN)',
      'Podcast and dialogue cleanup, noise reduction, and dynamic EQ balancing',
      'Precision mixing and loudness mastering calibrated for mobile, web, and broadcast',
      'Custom sound effects (SFX) and licensed background music scoring'
    ],
    deliverablesFr: [
      'Enregistrement de voix-off pour publicités, films d’entreprise et standards téléphoniques IVR',
      'Nettoyage audio de podcasts et interviews, réduction de bruit et égalisation',
      'Mixage de précision et mastering calibré pour le web, le mobile et la diffusion TV/Radio',
      'Habillage sonore (SFX) et musique de fond libre de droits commerciaux'
    ],
    packages: [
      {
        nameAr: 'باقة التعليق الصوتي الإعلاني أو معالجة البودكاست',
        nameEn: 'Commercial Voice-Over / Podcast Audio Pack',
        nameFr: 'Pack Voix-Off Publicitaire ou Post-Prod Podcast',
        isPopular: true,
        featuresAr: [
          'تسجيل تعليق صوتي إعلاني احترافي أو هندسة صوتية لحلقة كاملة',
          'تنظيف الصوت وموازنة الترددات (EQ & Compression)',
          'إضافة خلفية موسيقية ومؤثرات صوتية متناسقة',
          'تسليم سريع خلال 48 ساعة بجودة استوديو قياسية'
        ],
        featuresEn: [
          'Professional commercial voice-over or full podcast episode audio engineering',
          'Noise cleanup, EQ, compression, and loudness normalization',
          'Background music bed and sound effects integration',
          'Fast 48-hour delivery in broadcast-ready WAV/MP3'
        ],
        featuresFr: [
          'Voix-off publicitaire professionnelle ou mixage complet d’épisode podcast',
          'Nettoyage audio, égalisation, compression et normalisation',
          'Ajout de musique de fond et effets sonores adaptés',
          'Livraison rapide sous 48h aux formats WAV et MP3'
        ]
      }
    ],
    workSteps: [
      {
        titleAr: 'استلام النص أو الملفات الصوتية الخام',
        titleEn: 'Script / Raw Audio Intake',
        titleFr: 'Réception du Script ou des Pistes Brutes',
        descAr: 'تحديد نبرة الصوت المطلوبة للإعلان أو فحص المسارات الصوتية المراد معالجتها.',
        descEn: 'Selecting the voice tone or inspecting raw multi-track stems.',
        descFr: 'Choix de l’intention vocale ou analyse technique des pistes brutes.'
      },
      {
        titleAr: 'التسجيل والمعالجة والهندسة الصوتية',
        titleEn: 'Recording, Mixing & Mastering',
        titleFr: 'Enregistrement, Mixage & Mastering',
        descAr: 'تنفيذ التسجيل والميكساج بأحدث معالجات الصوت الرقمية والتناظرية.',
        descEn: 'Recording and processing audio for warmth, punch, and clarity.',
        descFr: 'Prise de son et traitement acoustique de haute précision.'
      },
      {
        titleAr: 'المراجعة وتسليم الماستر النهائي',
        titleEn: 'Client Review & Master Export',
        titleFr: 'Validation & Livraison du Master',
        descAr: 'تسليم الملفات الصوتية النهائية جاهزة للدمج في الفيديو أو البث المباشر.',
        descEn: 'Exporting final masters ready for video sync or broadcast.',
        descFr: 'Export des fichiers finaux prêts pour vos vidéos ou votre diffusion.'
      }
    ]
  }
};

// Return specialized service details for any of the 26 slugs
export function getStaticServiceDetails(slug: string): StaticService {
  const normalized = (slug || '').toLowerCase().trim();
  const service = staticServicesData[normalized];
  if (service) return service;

  // Fallback structure for any newly created dynamic service from Admin
  return {
    slug: normalized,
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: normalized.split('-').join(' '),
    nameEn: normalized.split('-').join(' '),
    nameFr: normalized.split('-').join(' '),
    descAr: 'خدمة متخصصة من وكالة WEZO MEDIA مصممة لدعم نمو أعمالك وتحقيق أهدافك الرقمية.',
    descEn: 'Tailored agency service from WEZO MEDIA built to scale your business operations.',
    descFr: 'Prestation sur-mesure par WEZO MEDIA conçue pour accélérer votre croissance digitale.',
    deliverablesAr: [
      'تحليل متكامل لمتطلبات المشروع وأهدافك التجارية',
      'تنفيذ وتطوير احترافي بواسطة متخصصين',
      'مراجعات وتعديلات متكاملة لضمان أعلى جودة',
      'دعم فني واستشارة مستمرة بعد تسليم المشروع'
    ],
    deliverablesEn: [
      'Comprehensive analysis of project and business requirements',
      'Professional development and execution by senior experts',
      'Integrative revisions to guarantee supreme output standards',
      'Continuous support and consultative follow-ups post-delivery'
    ],
    deliverablesFr: [
      'Analyse complète des besoins du projet et de vos objectifs commerciaux',
      'Exécution professionnelle par une équipe d’experts dédiés',
      'Révisions incluses pour garantir un résultat irréprochable',
      'Support technique et accompagnement continu après livraison'
    ],
    packages: [
      {
        nameAr: 'النطاق الأساسي للمشروع',
        nameEn: 'Core Project Scope',
        nameFr: 'Prestation Standard',
        featuresAr: ['دراسة وتخطيط المتطلبات', 'تنفيذ كامل للمخرجات المتفق عليها', 'جولتا مراجعة وتعديل', 'دعم فني بعد التسليم'],
        featuresEn: ['Requirements discovery & planning', 'Full execution of agreed deliverables', '2 revision rounds included', 'Post-delivery technical support'],
        featuresFr: ['Cadrage et planification des besoins', 'Exécution complète des livrables convenus', '2 séries de révisions incluses', 'Support technique après livraison']
      }
    ],
    workSteps: [
      {
        titleAr: 'التشخيص وتحديد النطاق',
        titleEn: 'Discovery & Scope Alignment',
        titleFr: 'Diagnostic & Cadrage',
        descAr: 'دراسة احتياجات مشروعك والاتفاق على المخرجات والجدول الزمني.',
        descEn: 'Aligning on objectives, deliverables, and execution timeline.',
        descFr: 'Définition précise des objectifs, des livrables et du planning.'
      },
      {
        titleAr: 'التنفيذ والمراجعة والتسليم',
        titleEn: 'Execution, Review & Handover',
        titleFr: 'Exécution, Validation & Livraison',
        descAr: 'تنفيذ العمل بأعلى معايير الجودة ومراجعته معك حتى الاعتماد النهائي.',
        descEn: 'Executing the project to agency standards and delivering final assets.',
        descFr: 'Réalisation selon nos standards de qualité et livraison finale.'
      }
    ]
  };
}
