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
        featuresAr: ['إعداد الحملة والجمهور المستهدف', 'تصميم ومونتاج 2 إعلان إعلانيين شهرياً', 'كتابة نصوص إعلانية محفزة', 'إرسال تقرير إحصائي نهاية كل أسبوعين'],
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
  }
};

// Return a unified config fallback if a slug doesn't exist
export function getStaticServiceDetails(slug: string): StaticService {
  const service = staticServicesData[slug.toLowerCase().trim()];
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
