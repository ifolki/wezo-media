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
  categoryKey: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  descAr: string;
  descEn: string;
  descFr: string;
  packages: StaticPackage[];
  workSteps: StaticWorkStep[];
}

export const staticServicesData: Record<string, StaticService> = {
  // Advertising & Growth
  'meta-ads-management': {
    slug: 'meta-ads-management',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'إدارة إعلانات ميتا',
    nameEn: 'Meta Ads Management',
    nameFr: 'Gestion des publicités Meta',
    descAr: 'إنشاء وإدارة وتحسين حملات Facebook وInstagram بهدف جلب العملاء أو المبيعات.',
    descEn: 'Strategy, launch and optimization of Facebook and Instagram campaigns focused on leads and sales.',
    descFr: 'Création, gestion et optimisation des campagnes Facebook et Instagram.',
    packages: [
      {
        nameAr: 'نطاق التشغيل الأساسي',
        nameEn: 'Basic Launch Scope',
        nameFr: 'Scope de Lancement',
        featuresAr: ['إعداد الحملة والجمهور المستهدف', 'تصميم ومونتاج 2 إعلانات شهرياً', 'كتابة نصوص إعلانية محفزة', 'إرسال تقرير إحصائي نهاية كل أسبوعين'],
        featuresEn: ['Target audience and pixel configuration', '2 custom creative assets prepared', 'High-conversion ad copywriting', 'Bi-weekly performance report updates'],
        featuresFr: ['Ciblage d\'audience et pixel configuré', '2 visuels publicitaires créés', 'Copywriting publicitaire optimisé', 'Rapport de performance bimensuel']
      },
      {
        nameAr: 'نطاق النمو المتقدم',
        nameEn: 'Advanced Growth Scope',
        nameFr: 'Scope Croissance Avancée',
        isPopular: true,
        featuresAr: ['اختبار جماهيري متعدد A/B Testing', 'تصميم وإنتاج 6 إعلانات شهرياً', 'تقارير أداء فورية عبر Google Looker Studio', 'تحسين وتوسيع دائم للميزانية Scaling'],
        featuresEn: ['Extensive A/B testing variations', '6 custom creative assets prepared', 'Real-time dashboard reporting access', 'Ad budget scaling and budget management'],
        featuresFr: ['Tests d\'audiences approfondis (A/B Testing)', '6 visuels publicitaires créés', 'Tableau de bord de performance en temps réel', 'Scaling et gestion du budget publicitaire']
      }
    ],
    workSteps: [
      {
        titleAr: 'التشخيص والتدقيق',
        titleEn: 'Audit & Diagnostic',
        titleFr: 'Audit et Diagnostic',
        descAr: 'دراسة الحسابات الإعلانية السابقة وفهم الجمهور بدقة.',
        descEn: 'Review past campaign analytics and pinpoint friction points.',
        descFr: 'Analyse approfondie de vos anciens comptes publicitaires.'
      },
      {
        titleAr: 'إعداد الاستراتيجية والمحتوى',
        titleEn: 'Creative Formulation',
        titleFr: 'Stratégie et Création',
        descAr: 'كتابة النصوص وتصميم الفيديوهات الإعلانية.',
        descEn: 'Drafting core concepts, copywriting, and visual assets.',
        descFr: 'Rédaction des textes et montage des visuels publicitaires.'
      },
      {
        titleAr: 'الإطلاق والتحسين',
        titleEn: 'Launch & Continuous Tuning',
        titleFr: 'Lancement et Optimisation',
        descAr: 'إطلاق الإعلانات ومراقبة الميزانية وتحسين التكلفة.',
        descEn: 'Pushing campaigns live, adjusting bids, and tracking ROAS.',
        descFr: 'Lancement des campagnes publicitaires et gestion du coût par lead.'
      }
    ]
  },
  'google-ads': {
    slug: 'google-ads',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'إعلانات Google',
    nameEn: 'Google Ads',
    nameFr: 'Publicité Google Ads',
    descAr: 'حملات بحث وجوجل للتواصل مع الباحثين عن خدماتك.',
    descEn: 'Search & display campaigns targeting active intent keywords.',
    descFr: 'Campagnes Google Search ciblant les prospects qualifiés.',
    packages: [
      {
        nameAr: 'حملات البحث الأساسية',
        nameEn: 'Basic Search setup',
        nameFr: 'Configuration Search de base',
        featuresAr: ['بحث وتحديد الكلمات المفتاحية', 'كتابة الإعلانات النصية الموسعة', 'إعداد الروابط والإضافات المخصصة', 'تقرير شهري بالأداء والتكلفة'],
        featuresEn: ['Keyword research mapping', 'Dynamic text search ads configuration', 'Extension links configured', 'Monthly analytics report updates'],
        featuresFr: ['Recherche et ciblage de mots-clés', 'Annonces textuelles dynamiques', 'Extensions d\'annonces configurées', 'Rapport de performance mensuel']
      }
    ],
    workSteps: [
      {
        titleAr: 'تحديد الكلمات المفتاحية',
        titleEn: 'Keyword Research',
        titleFr: 'Recherche de Mots-Clés',
        descAr: 'اختيار الكلمات المفتاحية الأكثر ربحية والبحث عنها.',
        descEn: 'Identifying high-intent conversion terms.',
        descFr: 'Ciblage des termes de recherche les plus rentables.'
      }
    ]
  },
  'landing-page': {
    slug: 'landing-page',
    categoryKey: 'WEB_DEVELOPMENT',
    nameAr: 'صفحة هبوط احترافية',
    nameEn: 'Conversion Landing Page',
    nameFr: 'Landing page professionnelle',
    descAr: 'صفحة ويب محسنة ومصممة خصيصاً لتحويل الزوار إلى عملاء فعليين.',
    descEn: 'Responsive single-page layouts engineered to maximize ad conversions.',
    descFr: 'Page de capture rapide optimisée pour convertir vos visiteurs.',
    packages: [
      {
        nameAr: 'التصميم والتطوير المتكامل',
        nameEn: 'Complete Landing Page Suite',
        nameFr: 'Pack Landing Page Complet',
        featuresAr: ['تصميم واجهة مخصصة ومتجاوبة', 'كتابة المحتوى التسويقي المقنع', 'ربط نماذج الاتصال والـ Pixels', 'دعم فني وتعديلات لمدة 30 يوم'],
        featuresEn: ['Fully responsive tailored UI layout', 'Compelling copywriting in selected locale', 'Forms and pixel tracking setup', '30 days support and adjustments'],
        featuresFr: ['Design sur-mesure et responsive', 'Rédaction de contenu persuasif', 'Formulaire et pixels de conversion installés', 'Support et ajustements pendant 30 jours']
      }
    ],
    workSteps: [
      {
        titleAr: 'هيكلة المحتوى والتخطيط',
        titleEn: 'Content Outline',
        titleFr: 'Structure et Design',
        descAr: 'تحديد تسلسل الأفكار والفقرات الموجهة لزيادة الإقناع.',
        descEn: 'Building user experience flow and wireframing sections.',
        descFr: 'Définition de la structure de conversion.'
      },
      {
        titleAr: 'البرمجة والربط',
        titleEn: 'Development & Analytics Integration',
        titleFr: 'Développement et Intégration',
        descAr: 'تطوير الصفحة بالكامل وربطها بنماذج استقبال البيانات بواتساب وتراكينج.',
        descEn: 'Developing the page, installing trackers, and launching contact hooks.',
        descFr: 'Développement complet et configuration des outils d\'analyse.'
      }
    ]
  },
  'business-website': {
    slug: 'business-website',
    categoryKey: 'WEB_DEVELOPMENT',
    nameAr: 'تطوير المواقع والمتاجر الإلكترونية',
    nameEn: 'Business Websites & E-commerce',
    nameFr: 'Sites Web & Boutiques E-commerce',
    descAr: 'تصميم وتطوير مواقع للشركات ومتاجر إلكترونية متكاملة وسريعة، مهيأة لمحركات البحث ومصممة لتحويل الزوار إلى عملاء.',
    descEn: 'Design and development of corporate websites and full e-commerce stores engineered for speed, SEO, and high conversion.',
    descFr: 'Conception et développement de sites vitrines et boutiques e-commerce rapides, optimisés SEO et orientés conversion.',
    packages: [
      {
        nameAr: 'موقع تعريفي احترافي للشركات',
        nameEn: 'Corporate Business Website',
        nameFr: 'Site Vitrine Professionnel',
        featuresAr: ['تصميم عصري متجاوب مع جميع الشاشات', 'تعدد اللغات (عربي / فرنسي / إنجليزي)', 'تهيئة كاملة لمحركات البحث (SEO)', 'ربط مباشر مع واتساب ونماذج طلب العروض'],
        featuresEn: ['Modern responsive UI/UX design', 'Multilingual support (AR/FR/EN)', 'Technical SEO optimization', 'Direct WhatsApp & lead capture integration'],
        featuresFr: ['Design moderne et responsive', 'Support multilingue (AR/FR/EN)', 'Optimisation SEO technique', 'Intégration WhatsApp et formulaires de contact']
      },
      {
        nameAr: 'متجر إلكتروني متكامل',
        nameEn: 'Full E-commerce Store',
        nameFr: 'Boutique E-commerce Complète',
        isPopular: true,
        featuresAr: ['إدارة كاملة للمنتجات والطلبيات والمخزون', 'دعم الدفع عند الاستلام (COD) والدفع الإلكتروني', 'ربط بيكسلات التتبع (Meta & TikTok & Google)', 'لوحة تحكم سهلة وتدريب للفريق'],
        featuresEn: ['Complete product, order, and inventory management', 'Cash on Delivery (COD) & online payment gateways', 'Ad pixels integration (Meta, TikTok, Google)', 'Easy admin dashboard & team onboarding'],
        featuresFr: ['Gestion complète des produits et commandes', 'Paiement à la livraison (COD) et en ligne', 'Intégration des pixels publicitaires', 'Tableau de bord intuitif et formation']
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
  'brand-identity': {
    slug: 'brand-identity',
    categoryKey: 'ARTIST_SERVICES',
    nameAr: 'الهوية البصرية وصناعة المحتوى',
    nameEn: 'Brand Identity & Content Creation',
    nameFr: 'Identité Visuelle & Création de Contenu',
    descAr: 'ابتكار وتطوير هويات بصرية متكاملة للشركات، تصميم الشعارات، وإنتاج محتوى إبداعي للشبكات الاجتماعية يرسخ علامتك التجارية.',
    descEn: 'Crafting complete corporate visual identities, logos, brand guidelines, and social media content that elevates your brand authority.',
    descFr: 'Création de chartes graphiques complètes, logos et contenus créatifs pour réseaux sociaux afin de valoriser votre marque.',
    packages: [
      {
        nameAr: 'حزمة الهوية البصرية الأساسية',
        nameEn: 'Essential Brand Identity',
        nameFr: 'Pack Identité Essentielle',
        featuresAr: ['تصميم شعار احترافي (3 مقترحات مبتكرة)', 'تحديد الألوان والخطوط الرسمية للعلامة', 'تصميم مطبوعات الهوية (بطاقة عمل، ورق رسمي)', 'تسليم الملفات المفتوحة بجميع الصيغ'],
        featuresEn: ['Professional logo design (3 original concepts)', 'Color palette and typography selection', 'Business card and letterhead design', 'Full source files delivery in all formats'],
        featuresFr: ['Création de logo professionnel (3 concepts)', 'Palette de couleurs et typographies', 'Carte de visite et papier à en-tête', 'Livraison des fichiers sources haute définition']
      },
      {
        nameAr: 'الهوية المتكاملة وحضور السوشيال ميديا',
        nameEn: 'Full Branding & Social Kit',
        nameFr: 'Charte Graphique & Kit Réseaux Sociaux',
        isPopular: true,
        featuresAr: ['دليل الهوية البصرية الشامل (Brand Book)', 'تجهيز قوالب وتصاميم شبكات التواصل الاجتماعي', 'تصميم الأغلفة والواجهات الرقمية', 'استراتيجية التوجه البصري للمحتوى الإعلاني'],
        featuresEn: ['Comprehensive Brand Guidelines Book', 'Custom social media post & story templates', 'Social profiles covers and highlights kit', 'Visual art direction for ad campaigns'],
        featuresFr: ['Charte graphique complète (Brand Book)', 'Templates personnalisés pour réseaux sociaux', 'Habillage complet des profils sociaux', 'Direction artistique pour vos publicités']
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
  'whatsapp-lead-automation': {
    slug: 'whatsapp-lead-automation',
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: 'الأتمتة والذكاء الاصطناعي (Auto-Pilot)',
    nameEn: 'AI Automation & WhatsApp CRM Flows',
    nameFr: 'Automatisation IA & Flux WhatsApp CRM',
    descAr: 'أتمتة مسارات التواصل مع العملاء المحتملين عبر واتساب، ربط أنظمة إدارة علاقات العملاء (CRM) ومساعدات الذكاء الاصطناعي لتأهيل الزبائن.',
    descEn: 'Automating lead qualification via WhatsApp, CRM pipeline integrations, and AI assistants to convert inquiries into sales 24/7.',
    descFr: 'Automatisation de la qualification des prospects sur WhatsApp, intégration CRM et assistants IA pour booster vos ventes.',
    packages: [
      {
        nameAr: 'أتمتة استقبال وتأهيل العملاء',
        nameEn: 'Lead Capture & WhatsApp Flow',
        nameFr: 'Flux WhatsApp & Qualification',
        featuresAr: ['ربط استمارات الموقع والإعلانات بواتساب تلقائياً', 'رسائل ترحيب وتأهيل فورية للعميل المحتمل', 'تنظيم وحفظ بيانات العملاء في لوحة CRM / Notion', 'تنبيهات فورية لفريق المبيعات بالعملاء الجادين'],
        featuresEn: ['Automatic sync from web forms & ads to WhatsApp', 'Instant automated greeting & qualification messages', 'Centralized lead storage in Notion / CRM pipeline', 'Real-time sales team alerts for hot leads'],
        featuresFr: ['Synchronisation formulaires/publicités vers WhatsApp', 'Messages d’accueil et de qualification instantanés', 'Centralisation des prospects dans votre CRM / Notion', 'Notifications en temps réel pour votre équipe commerciale']
      },
      {
        nameAr: 'منظومة الأتمتة والذكاء الاصطناعي الشاملة',
        nameEn: 'Full AI Assistant & CRM Pipeline',
        nameFr: 'Système Complet IA & CRM Auto-Pilot',
        isPopular: true,
        featuresAr: ['مساعد ذكي يجيب على الاستفسارات المتكررة 24/7', 'أتمتة جدولة المواعيد وتأكيد الطلبيات', 'مسارات إعادة استهداف ومتابعة تلقائية (Follow-up)', 'لوحة تحكم شاملة لقياس معدلات الإغلاق والتحويل'],
        featuresEn: ['24/7 AI assistant handling common customer inquiries', 'Automated appointment booking & order confirmation', 'Multi-step automated follow-up sequences', 'Analytics dashboard tracking conversion & close rates'],
        featuresFr: ['Assistant IA 24/7 pour répondre aux questions fréquentes', 'Prise de rendez-vous et confirmation automatisées', 'Séquences de relance automatiques multi-étapes', 'Suivi précis des taux de conversion et de closing']
      }
    ],
    workSteps: [
      {
        titleAr: 'هيكلة مسار العميل',
        titleEn: 'Customer Journey Mapping',
        titleFr: 'Cartographie du Parcours Client',
        descAr: 'تحديد نقاط التواصل والأسئلة الأساسية لتأهيل العميل وتوجيهه.',
        descEn: 'Designing conversation trees and lead qualification criteria.',
        descFr: 'Définition des scénarios de conversation et critères de qualification.'
      },
      {
        titleAr: 'الربط التقني وإعداد الأتمتة',
        titleEn: 'API & CRM Integration',
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
  'reels-social-video': {
    slug: 'reels-social-video',
    categoryKey: 'VIDEO_PRODUCTION',
    nameAr: 'الإنتاج المرئي والفيديوهات الإعلانية',
    nameEn: 'Commercial Video & Reels Production',
    nameFr: 'Production Vidéo & Reels Publicitaires',
    descAr: 'تصوير وإنتاج ومونتاج فيديوهات إعلانية عالية التأثير، مقاطع Reels وTikTok، ومحتوى UGC مصمم لجذب الانتباه وتحقيق المبيعات.',
    descEn: 'Studio shooting and dynamic editing of commercial videos, Reels, TikToks, and UGC hooks engineered for high engagement and sales.',
    descFr: 'Tournage et montage dynamique de vidéos publicitaires, Reels, TikTok et contenus UGC conçus pour capter l’attention et convertir.',
    packages: [
      {
        nameAr: 'باقة فيديوهات السوشيال ميديا والإعلانات',
        nameEn: 'Social & Ad Reels Pack',
        nameFr: 'Pack Vidéos Reels & Ads',
        isPopular: true,
        featuresAr: ['كتابة السيناريو والزوايا الإعلانية الجذابة (Hooks)', 'تصوير احترافي أو إنتاج محتوى UGC واقعي', 'مونتاج ديناميكي مع مؤثرات بصرية وصوتية وكتابة النصوص', 'تسليم الفيديوهات بمقاسات متوافقة مع كافة المنصات'],
        featuresEn: ['Scriptwriting and high-retention visual hooks', 'Professional shooting or authentic UGC production', 'Dynamic editing, color grading, SFX, and captions', 'Optimized aspect ratios for Instagram, TikTok & Meta Ads'],
        featuresFr: ['Écriture de scripts et accroches visuelles (Hooks)', 'Tournage professionnel ou création UGC authentique', 'Montage dynamique, sous-titrage et design sonore', 'Formats optimisés pour Instagram, TikTok et Meta Ads']
      }
    ],
    workSteps: [
      {
        titleAr: 'كتابة السيناريو والتخطيط',
        titleEn: 'Scripting & Storyboarding',
        titleFr: 'Scénarisation & Storyboard',
        descAr: 'صياغة رسائل تسويقية قوية تخطف الانتباه في أول 3 ثوانٍ.',
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
      }
    ]
  },
  'music-production': {
    slug: 'music-production',
    categoryKey: 'AUDIO_PRODUCTION',
    nameAr: 'الإنتاج الصوتي والموسيقي وخدمات الفنانين',
    nameEn: 'Audio Production & Artist Services',
    nameFr: 'Production Audio, Musique & Artistes',
    descAr: 'تسجيل صوتي احترافي، تلحين، توزيع موسيقي، ميكساج وماسترينغ، بالإضافة إلى التعليق الصوتي الإعلاني وإدارة الحضور الرقمي للفنانين.',
    descEn: 'Professional studio recording, composition, arrangement, mixing & mastering, commercial voice-overs, and digital artist services.',
    descFr: 'Enregistrement studio, composition, arrangement, mixage et mastering, voix-off publicitaires et accompagnement d’artistes.',
    packages: [
      {
        nameAr: 'الإنتاج الصوتي المتكامل (استوديو WEZO)',
        nameEn: 'Complete Studio Audio Production',
        nameFr: 'Production Audio Studio Complète',
        isPopular: true,
        featuresAr: ['تسجيل صوتي في غرف معزولة بأحدث الميكروفونات', 'توزيع موسيقي، ميكساج وماسترينغ بمعايير عالمية', 'إنتاج التعليق الصوتي الإعلاني (Voice-Over) للشركات', 'توزيع الأعمال الفنية على المنصات الرقمية (Spotify, Apple Music, YouTube)'],
        featuresEn: ['Vocal tracking in soundproofed studio booths', 'Music arrangement, professional mixing & mastering', 'Commercial voice-over production for brands', 'Digital distribution across Spotify, Apple Music & YouTube'],
        featuresFr: ['Enregistrement vocal en cabine insonorisée professionnelle', 'Arrangement musical, mixage et mastering haute fidélité', 'Production de voix-off publicitaires pour entreprises', 'Distribution digitale sur Spotify, Apple Music et YouTube']
      }
    ],
    workSteps: [
      {
        titleAr: 'التحضير والتسجيل بالاستوديو',
        titleEn: 'Pre-Production & Studio Recording',
        titleFr: 'Pré-production & Enregistrement',
        descAr: 'تحديد الهوية الصوتية والتسجيل داخل استوديو WEZO الاحترافي.',
        descEn: 'Defining the sonic direction and recording in our acoustic studio.',
        descFr: 'Définition de la direction artistique et prise de son en studio.'
      },
      {
        titleAr: 'الهندسة الصوتية والماسترينغ',
        titleEn: 'Mixing, Mastering & Release',
        titleFr: 'Mixage, Mastering & Diffusion',
        descAr: 'معالجة الصوت وموازنته للحصول على نقاء وجودة جاهزة للبث والنشر.',
        descEn: ' Acoustic balancing and mastering for broadcast-ready clarity.',
        descFr: 'Traitement acoustique et mastering prêt pour la diffusion.'
      }
    ]
  }
};

// Map legacy category slugs (audio, video, marketing, web) to canonical slugs
const legacySlugMap: Record<string, string> = {
  'audio': 'music-production',
  'video': 'reels-social-video',
  'marketing': 'meta-ads-management',
  'web': 'business-website',
};

// Return a unified config fallback if a slug doesn't exist
export function getStaticServiceDetails(slug: string): StaticService {
  const normalized = slug.toLowerCase().trim();
  const mappedSlug = legacySlugMap[normalized] || normalized;
  const service = staticServicesData[mappedSlug];
  if (service) return service;

  // Fallback structure
  return {
    slug: slug,
    categoryKey: 'DIGITAL_MARKETING',
    nameAr: slug.split('-').join(' '),
    nameEn: slug.split('-').join(' '),
    nameFr: slug.split('-').join(' '),
    descAr: 'خدمة متميزة مخصصة لمساعدتك على النمو والتميز الرقمي.',
    descEn: 'Tailored agency service built to scale your business operations.',
    descFr: 'Service sur-mesure pour vous aider à vous développer.',
    packages: [
      {
        nameAr: 'العرض الأساسي',
        nameEn: 'Core Scope of Works',
        nameFr: 'Prestation Standard',
        featuresAr: ['تسليم متكامل للمتطلبات', 'دعم فني متواصل', 'تعديلات وضمان الأداء'],
        featuresEn: ['Full delivery of agreed scope', 'Ongoing technical support line', 'Performance tuning updates'],
        featuresFr: ['Livraison complète du cahier des charges', 'Support technique réactif', 'Garantie de performance']
      }
    ],
    workSteps: [
      {
        titleAr: 'تخطيط العمل',
        titleEn: 'Scope Alignment',
        titleFr: 'Cadrage du Projet',
        descAr: 'التنسيق والاتفاق على المخرجات.',
        descEn: 'Agreeing on timeline and core deliverables.',
        descFr: 'Alignement sur les livrables et le planning.'
      }
    ]
  };
}
