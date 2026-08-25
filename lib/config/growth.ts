// lib/config/growth.ts

export interface SectorGrowthConfig {
  slug: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  heroTitleAr: string;
  heroTitleEn: string;
  heroTitleFr: string;
  heroSubAr: string;
  heroSubEn: string;
  heroSubFr: string;
  problemsAr: string[];
  problemsEn: string[];
  problemsFr: string[];
  solutionsAr: { titleAr: string; titleEn: string; titleFr: string; descAr: string; descEn: string; descFr: string }[];
  audienceAr: string[];
  audienceEn: string[];
  audienceFr: string[];
  notSuitableAr: string[];
  notSuitableEn: string[];
  notSuitableFr: string[];
  caseStudySlugs: string[]; // Portfolio/projects slug references
}

export const growthSectorsData: Record<string, SectorGrowthConfig> = {
  'general': {
    slug: 'general',
    nameAr: 'العام',
    nameEn: 'General',
    nameFr: 'Général',
    heroTitleAr: 'نحوّل الإعلانات إلى نظام مستمر لجلب العملاء.',
    heroTitleEn: 'We turn advertising into a continuous acquisition system.',
    heroTitleFr: 'Nous transformons la publicité en un système d\'acquisition continu.',
    heroSubAr: 'WEZO MEDIA تبني وتدير منظومة متكاملة تجمع بين الإعلانات، المحتوى الإعلاني، صفحات الهبوط، WhatsApp والتتبع لمساعدة الشركات على الحصول على فرص بيع حقيقية.',
    heroSubEn: 'WEZO MEDIA builds and manages an integrated system combining ads, ad creatives, landing pages, WhatsApp and tracking to help high-value businesses get real sales opportunities.',
    heroSubFr: 'WEZO MEDIA conçoit et gère un système complet alliant publicités, créations, landing pages, WhatsApp et tracking pour aider votre entreprise à générer de réelles opportunités.',
    problemsAr: [
      'الشركة تطلق الإعلانات بدون استراتيجية واضحة ومحددة.',
      'تصاميم وفيديوهات إعلانية ضعيفة أو مكررة تستهلك الميزانية.',
      'تلقي رسائل واتصالات غير مهتمة أو غير جادة تضيع وقت فريق المبيعات.',
      'انقطاع مسار المتابعة مع العميل بعد نقرة الإعلان.',
      'غياب التتبع الدقيق لمعرفة العائد على الإنفاق الإعلاني الفعلي.'
    ],
    problemsEn: [
      'Launching ad campaigns without a clear strategic roadmap.',
      'Weak or repetitive creatives that exhaust budget without conversion.',
      'Receiving low-quality messages that waste sales team resources.',
      'Disconnected follow-up path after the initial ad click.',
      'Lack of granular tracking to measure true ROAS on campaigns.'
    ],
    problemsFr: [
      'Lancer des campagnes sans feuille de route stratégique claire.',
      'Visuels ou vidéos répétitifs qui épuisent le budget sans retour.',
      'Réception de messages non qualifiés qui font perdre du temps à vos commerciaux.',
      'Parcours client interrompu après le premier clic sur la pub.',
      'Absence de tracking précis pour évaluer le véritable retour sur investissement.'
    ],
    solutionsAr: [
      {
        titleAr: 'تحليل الاستراتيجية والعرض',
        titleEn: 'Strategy & Offer Optimization',
        titleFr: 'Stratégie & Offre',
        descAr: 'دراسة السوق، المنافسة، وتحديد زوايا الإقناع الفريدة للنشاط التجاري.',
        descEn: 'Market research, competitor analysis, and crafting a unique compelling value proposition.',
        descFr: 'Étude de marché, veille concurrentielle et structuration d\'une offre irrésistible.'
      },
      {
        titleAr: 'إنتاج المحتوى الإعلاني الممتاز',
        titleEn: 'Ad Creative Production',
        titleFr: 'Production Créative',
        descAr: 'تصميم وإنتاج صور وفيديوهات إعلانية مبنية على زوايا نفسية وتسويقية متطورة.',
        descEn: 'Design and production of performance ad creatives based on advanced psychological triggers.',
        descFr: 'Conception et production de visuels et vidéos publicitaires optimisés pour la conversion.'
      },
      {
        titleAr: 'إدارة وتوجيه حملات الاستحواذ',
        titleEn: 'Paid Acquisition Management',
        titleFr: 'Acquisition Payante',
        descAr: 'إطلاق وتحسين حملات Meta Ads مستمرة واختبار الجماهير بذكاء.',
        descEn: 'Deploying and optimizing Meta Ads campaigns to ensure maximum reach and conversions.',
        descFr: 'Lancement et optimisation continue des campagnes Meta Ads pour un ciblage précis.'
      },
      {
        titleAr: 'قنوات التحويل والتصفية',
        titleEn: 'Conversion Funnel & Forms',
        titleFr: 'Tunnel de Conversion',
        descAr: 'صفحات هبوط ونماذج متكاملة لتصفية وتأهيل العملاء المحتملين قبل التواصل معهم.',
        descEn: 'Custom landing pages and multi-step forms to qualify leads before routing to sales.',
        descFr: 'Création de landing pages et formulaires pour filtrer les prospects qualifiés.'
      },
      {
        titleAr: 'تتبع البيانات وربط CRM',
        titleEn: 'Analytics & CRM Integration',
        titleFr: 'Tracking & CRM',
        descAr: 'تثبيت بيكسلات التتبع وربط الأنظمة ديناميكياً مع لوحة المتابعة Notion.',
        descEn: 'Setting up tracking pixels and syncing lead pipelines directly with Notion CRM.',
        descFr: 'Configuration des pixels de tracking et synchronisation directe avec Notion CRM.'
      },
      {
        titleAr: 'التحسين المستمر والنمو',
        titleEn: 'Scaling & Optimization',
        titleFr: 'Optimisation & Scaling',
        descAr: 'تحليل أداء الحملات دورياً ومضاعفة الميزانية للمجموعات الرابحة باستقرار.',
        descEn: 'Regular database-driven optimization to scale winning campaigns sustainably.',
        descFr: 'Analyse continue des performances pour scaler les campagnes gagnantes.'
      }
    ],
    audienceAr: [
      'لديك منتج أو خدمة حقيقية وذات جودة عالية.',
      'قيمة الصفقة أو العميل لديك تسمح بالاستثمار في تكلفة الاكتساب.',
      'يتوفر لديك فريق أو مسؤول مستعد لمتابعة والرد الفوري على العملاء المحتملين.',
      'مستعد لتخصيص ميزانية إعلانية واقعية للاختبار والنمو.',
      'تبحث عن شريك نمو تسويقي على المدى الطويل وليس مجرد مستقل رخيص.'
    ],
    audienceEn: [
      'You possess a proven, high-quality product or service.',
      'Customer lifetime value allows investing in customer acquisition cost.',
      'A dedicated salesperson or team is ready to respond immediately to qualified leads.',
      'You are prepared to allocate a realistic advertising budget for testing.',
      'Looking for a long-term strategic growth partner, not a cheap freelancer.'
    ],
    audienceFr: [
      'Vous proposez un produit ou un service de haute qualité éprouvé.',
      'La valeur à vie de vos clients permet d\'amortir le coût d\'acquisition.',
      'Une équipe ou un commercial est disponible pour répondre rapidement aux prospects.',
      'Vous êtes prêt à allouer un budget publicitaire réaliste pour les phases de test.',
      'Vous recherchez un partenaire de croissance à long terme, pas un prestataire low-cost.'
    ],
    notSuitableAr: [
      'تبحث عن أرخص منشور أو إعلان بقيمة 100 درهم.',
      'الميزانية التسويقية المتاحة ضعيفة جداً ولا تسمح بالاختبار والتحسين.',
      'لا تملك عرضاً تجارياً واضحاً أو تبيع منتجات ذات هامش ربح ضئيل جداً.',
      'غير مستعد لمتابعة الاتصالات والرسائل الواردة بشكل يومي ومنظم.',
      'تتوقع مبيعات فورية سحرية في 24 ساعة دون بناء قاعدة وثقة.'
    ],
    notSuitableEn: [
      'Looking for cheap individual social media designs or $10 setups.',
      'Ad budget is extremely low and does not allow proper testing.',
      'No clear business offer or selling low-margin commodities.',
      'Unwilling to track and follow up with qualified leads systematically.',
      'Expecting instant magic sales in 24 hours without testing.'
    ],
    notSuitableFr: [
      'Vous cherchez simplement des visuels bas de gamme ou des paramétrages à 10$.',
      'Votre budget publicitaire est trop bas pour permettre des tests fiables.',
      'Aucune offre commerciale claire ou vente de produits à marge infime.',
      'Pas de volonté de suivre et relancer systématiquement les prospects qualifiés.',
      'Vous attendez des ventes magiques immédiates en 24h sans phase d\'optimisation.'
    ],
    caseStudySlugs: ['ecole-sennouni', 'ss-lavage']
  },
  'medical': {
    slug: 'medical',
    nameAr: 'المراكز الطبية والتجميلية',
    nameEn: 'Medical & Aesthetic',
    nameFr: 'Médical & Esthétique',
    heroTitleAr: 'نحوّل الإعلانات إلى حجوزات ومواعيد حقيقية لعيادتك.',
    heroTitleEn: 'We turn advertising campaigns into real bookings for your clinic.',
    heroTitleFr: 'Nous transformons les publicités en rendez-vous pour votre clinique.',
    heroSubAr: 'منظومة نمو متكاملة للمراكز التجميلية وطب الأسنان تجمع بين الإعلانات، المحتوى المرئي لخدماتك، صفحات الهبوط الطبية، وحجز المواعيد المؤهلة وتأكيدها.',
    heroSubEn: 'Integrated growth system for dental and aesthetic clinics combining high-impact video ads, specialized landing pages, lead pre-qualification, and automated booking workflows.',
    heroSubFr: 'Système de croissance intégré pour cliniques esthétiques et dentaires associant vidéos ciblées, landing pages médicales et flux de réservation qualifiés.',
    problemsAr: [
      'تلقي اتصالات ورسائل تسأل فقط عن الأثمنة دون اهتمام فعلي بالحجز.',
      'تراجع نسب الحضور الفعلي للمرضى بعد حجز الموعد المبدئي.',
      'صعوبة شرح جودة ومستوى الأجهزة والمواد الطبية المستخدمة في العيادة.',
      'ضياع وقت المساعدات في الرد على استفسارات غير جادة ومكررة.'
    ],
    problemsEn: [
      'Receiving inquiries asking only for price lists with no intent to book.',
      'High rate of patient no-shows after the initial online appointment booking.',
      'Difficulty conveying the high quality of clinical equipment and expertise.',
      'Receptionists wasting hours answering repetitive non-qualified questions.'
    ],
    problemsFr: [
      'Prospects demandant uniquement les tarifs sans intention de réserver.',
      'Taux élevé de rendez-vous non honorés après la réservation initiale.',
      'Difficulté à valoriser la qualité de vos équipements et de votre expertise.',
      'Secrétaires débordées par des appels répétitifs et non qualifiés.'
    ],
    solutionsAr: [
      {
        titleAr: 'استراتيجية تسويق الخدمات العلاجية',
        titleEn: 'Clinical Positioning',
        titleFr: 'Positionnement Clinique',
        descAr: 'إبراز المزايا الطبية والتنافسية والتخصصات الدقيقة للعيادة.',
        descEn: 'Highlighting unique medical equipment, specialist certifications, and competitive advantages.',
        descFr: 'Mise en valeur du plateau technique et de l\'expertise médicale.'
      },
      {
        titleAr: 'محتوى مرئي طبي واحترافي',
        titleEn: 'Visual Aesthetic Content',
        titleFr: 'Production Vidéo Médicale',
        descAr: 'تصوير وإنتاج فيديوهات توضيحية للأطباء وحالات قبل وبعد لبناء الثقة المطلقة.',
        descEn: 'Shooting and editing trust-building clinic tours, doctor explainers, and before/after showcases.',
        descFr: 'Tournage de présentations de cas, témoignages et démonstrations.'
      },
      {
        titleAr: 'إعلانات الاستحواذ المحلية',
        titleEn: 'Hyper-Local Patient Ads',
        titleFr: 'Publicités Geo-Ciblées',
        descAr: 'استهداف دقيق للمهتمين بالخدمات الطبية والتجميلية في المحيط الجغرافي للعيادة.',
        descEn: 'Precise geo-targeting focusing on potential patients near your clinic location.',
        descFr: 'Ciblage géographique précis des patients potentiels à proximité.'
      },
      {
        titleAr: 'صفحات هبوط طبية للتأهيل',
        titleEn: 'Qualifying Medical funnels',
        titleFr: 'Landing Pages Médicales',
        descAr: 'صفحات تشرح العلاج بالتفصيل ونماذج تصفية لتحديد طبيعة الحالة والجاهزية المادية.',
        descEn: 'Detailing treatment steps and pre-qualifying leads based on budget and health indicators.',
        descFr: 'Présentation des traitements et formulaires de pré-qualification clinique.'
      },
      {
        titleAr: 'منظومة حجز المواعيد',
        titleEn: 'Booking Integration',
        titleFr: 'Flux de Réservation',
        descAr: 'ربط النماذج بـ WhatsApp لتسهيل تأكيد المواعيد وتلقي إشعارات الحضور التلقائية.',
        descEn: 'Syncing qualified leads with WhatsApp to accelerate appointment confirmations.',
        descFr: 'Liaison directe avec WhatsApp pour confirmation immédiate.'
      }
    ],
    audienceAr: [
      'عيادة طبية أو مركز تجميلي مرخص ويقدم خدمات علاجية عالية الجودة.',
      'تقدم خدمات ذات قيمة مرتفعة (زرع، تقويم، فيلير، ليزر، عمليات تجميل).',
      'يتوفر لديك مساعدات أو فريق استقبال مدرب على المتابعة والرد السريع وتأكيد الحجوزات.',
      'مستعد للاستثمار في إنتاج محتوى مرئي حقيقي داخل عيادتك.'
    ],
    audienceEn: [
      'Licensed dental or aesthetic clinic offering high-standard treatments.',
      'Selling high-ticket services (implants, orthodontics, fillers, laser, surgery).',
      'Dedicated reception team trained in phone follow-up and appointment scheduling.',
      'Ready to invest in premium video shooting inside the clinic premises.'
    ],
    audienceFr: [
      'Clinique dentaire ou centre esthétique agréé de haute qualité.',
      'Proposant des soins à forte valeur ajoutée (implants, facettes, injections, chirurgie).',
      'Équipe d\'accueil disponible pour rappeler rapidement et confirmer les RDV.',
      'Prêt à réaliser des captations vidéo professionnelles au sein de la clinique.'
    ],
    notSuitableAr: [
      'تبحث فقط عن جلب أرقام هواتف عشوائية بأرخص التكاليف دون تصفية.',
      'المركز يفتقر لمسؤول متاح فورياً للرد وتأكيد الحجوزات اليومية.',
      'ميزانيتك التسويقية لا تسمح بتصوير محتوى احترافي داخل العيادة.'
    ],
    notSuitableEn: [
      'Looking for massive lists of low-cost non-qualified phone numbers.',
      'No receptionist or team available to take inbound calls and follow up.',
      'Budget is too low to include professional content capture and production.'
    ],
    notSuitableFr: [
      'Vous cherchez une quantité brute de contacts non qualifiés au coût le plus bas.',
      'Pas de secrétariat disponible pour appeler et gérer les leads au quotidien.',
      'Budget insuffisant pour investir dans la création de contenu vidéo sur place.'
    ],
    caseStudySlugs: ['ecole-sennouni', 'ss-lavage']
  },
  'real-estate': {
    slug: 'real-estate',
    nameAr: 'العقارات والمشاريع السكنية',
    nameEn: 'Real Estate',
    nameFr: 'Immobilier',
    heroTitleAr: 'نحوّل الإعلانات إلى صفقات ومبيعات عقارية.',
    heroTitleEn: 'We turn digital campaigns into real estate sales and closures.',
    heroTitleFr: 'Nous transformons vos campagnes de pub en ventes immobilières.',
    heroSubAr: 'نظام متكامل لتأهيل وجلب المشترين والمهتمين بالمشاريع السكنية والتجارية، وتصفية الطلبات لتحديد الجاهزية المادية والتمويلية للعميل.',
    heroSubEn: 'Comprehensive lead acquisition and nurturing system tailored for developers and real estate brokers, filtering prospects based on purchase intent and financial readiness.',
    heroSubFr: 'Système complet de génération de prospects qualifiés pour les promoteurs et agences immobilières, filtrant les acheteurs selon leur budget et profil de financement.',
    problemsAr: [
      'الحصول على مئات الطلبات لأرقام معطلة أو عملاء لا يتذكرون تسجيل بياناتهم.',
      'ضياع مجهود المستشارين العقاريين في الاتصال بعملاء ليست لديهم قدرة تمويلية.',
      'تغير اهتمامات السوق وعدم كفاية إعلانات الصور التقليدية لإقناع المشتري.',
      'صعوبة تتبع الحملات ومعرفة أي مشروع عقاري يحقق أفضل عائد.'
    ],
    problemsEn: [
      'Getting hundreds of leads with wrong numbers or people who do not remember signing up.',
      'Brokers wasting valuable hours calling buyers without financial backing or mortgages.',
      'Basic property images are no longer enough to convince today\'s buyers.',
      'Difficulty identifying which specific property listing drives the highest ROI.'
    ],
    problemsFr: [
      'Réception de fiches contacts erronées ou de prospects n\'ayant aucun souvenir du formulaire.',
      'Négociateurs immobiliers perdant leur temps avec des profils sans financement.',
      'Les simples photos de biens ne suffisent plus à convaincre les acheteurs d\'aujourd\'hui.',
      'Difficulté à identifier quel projet ou annonce génère le meilleur retour sur investissement.'
    ],
    solutionsAr: [
      {
        titleAr: 'هيكلة زوايا عرض المشاريع',
        titleEn: 'Property Positioning',
        titleFr: 'Cadrage de Projet',
        descAr: 'إبراز المزايا السكنية والاستثمارية والموقع الجغرافي وتسهيلات الأداء.',
        descEn: 'Highlighting prime location advantages, payment plans, and investment yields.',
        descFr: 'Valorisation de l\'emplacement, des plans de paiement et des rendements locatifs.'
      },
      {
        titleAr: 'محتوى عقاري غامر (Video Tours)',
        titleEn: 'Immersive Video Tours',
        titleFr: 'Visites Vidéo Immersives',
        descAr: 'إنتاج فيديوهات استعراضية للمشاريع والشقق النموذجية لشرح تفاصيل البناء.',
        descEn: 'Producing high-quality walking tours, drone footage, and interior design showcases.',
        descFr: 'Réalisation de visites guidées vidéo professionnelles et plans drones.'
      },
      {
        titleAr: 'حملات المشترين المستهدفة',
        titleEn: 'Targeted Buyer Campaigns',
        titleFr: 'Campagnes d\'Acquisition',
        descAr: 'استهداف فئات الموظفين والمستثمرين والجالية بالخارج المهتمين بالشراء الفعلي.',
        descEn: 'Targeting qualified profiles, domestic investors, and expats looking for properties.',
        descFr: 'Ciblage d\'investisseurs, de cadres et de résidents à l\'étranger.'
      },
      {
        titleAr: 'نماذج تأهيل الجاهزية المادية',
        titleEn: 'Financial Qualification Forms',
        titleFr: 'Formulaires de Qualification',
        descAr: 'تأهيل المشترين بسؤالهم عن ميزانية الشراء المتاحة، الجاهزية للدفعة الأولى، والتمويل البنكي.',
        descEn: 'Qualifying buyers by down payment capacity, mortgage approvals, and timeline.',
        descFr: 'Filtrage des acheteurs par apport personnel, capacité d\'emprunt et délai.'
      },
      {
        titleAr: 'توجيه Leads وربط CRM',
        titleEn: 'Lead Distribution Sync',
        titleFr: 'Distribution & CRM Sync',
        descAr: 'تحويل تلقائي وفوري للطلبات الساخنة إلى فريق المبيعات العقارية لمتابعتها فوراً.',
        descEn: 'Instant routing of qualified buyers to brokers to ensure under-5-minute contact.',
        descFr: 'Acheminement instantané des prospects qualifiés vers vos agents commerciaux.'
      }
    ],
    audienceAr: [
      'وكالة عقارية أو منعش عقاري يملك مشاريع سكنية متوسطة أو فاخرة.',
      'تتوفر لديك حلول تمويلية أو تسهيلات في الأداء واضحة للعملاء.',
      'يتوفر لديك فريق مبيعات عقاري (Sales Brokers) سريع المتابعة والإغلاق.',
      'مستعد لتوفير ميزانية إعلانية كافية للمنافسة في السوق العقاري.'
    ],
    audienceEn: [
      'Real estate developers or agencies selling mid-to-high ticket properties.',
      'Offering clear financing options, installment plans, or unique projects.',
      'Active sales team ready to follow up on leads in real-time.',
      'Prepared to invest appropriate ad budget to compete in the property market.'
    ],
    audienceFr: [
      'Promoteur immobilier ou agence vendant des biens de moyen/haut standing.',
      'Proposant des facilités de paiement claires ou des projets exclusifs.',
      'Équipe commerciale réactive pour traiter les leads immobiliers en temps réel.',
      'Budget publicitaire adapté à la forte concurrence du marché de l\'immobilier.'
    ],
    notSuitableAr: [
      'تبيع مشاريع اقتصادية بهامش ربح ضئيل جداً لا يحتمل تكلفة الإعلانات المدفوعة.',
      'مستشاري المبيعات لديك يتأخرون في الاتصال بالعملاء لأيام.',
      'تبحث فقط عن أرقام هواتف عشوائية غير مصفاة مالياً.'
    ],
    notSuitableEn: [
      'Selling low-cost economy housing with margins that cannot cover acquisition costs.',
      'Sales team takes days to call back interested property buyers.',
      'Looking for bulk numbers without qualifying their purchasing power.'
    ],
    notSuitableFr: [
      'Vente de logements sociaux à très faible marge ne couvrant pas les coûts d\'acquisition.',
      'Équipe commerciale prenant plusieurs jours pour rappeler les prospects.',
      'Recherche de volumes de contacts bruts sans qualification budgétaire.'
    ],
    caseStudySlugs: ['ecole-sennouni', 'ss-lavage']
  }
};
