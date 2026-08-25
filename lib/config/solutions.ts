// lib/config/solutions.ts

export interface StaticSolution {
  slug: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionFr: string;
  serviceSlugs: string[];
  primaryServiceSlug: string;
}

export const staticSolutionsData: Record<string, StaticSolution> = {
  "launch-business-brand": {
    slug: "launch-business-brand",
    nameAr: "أطلق مشروعي وعلامتي التجارية",
    nameEn: "Launch My Business & Brand",
    nameFr: "Lancer Mon Entreprise & Marque",
    descriptionAr: "الحزمة المتكاملة لتأسيس حضور رقمي قوي وإطلاق نشاطك التجاري بنجاح.",
    descriptionEn: "All-in-one package to establish a strong digital presence and launch your brand.",
    descriptionFr: "Le package complet pour établir une présence digitale forte.",
    serviceSlugs: ["brand-identity", "business-website", "landing-page"],
    primaryServiceSlug: "brand-identity"
  },
  "scale-customer-acquisition": {
    slug: "scale-customer-acquisition",
    nameAr: "زيادة وتوسيع نطاق المبيعات والعملاء",
    nameEn: "Scale Customer Acquisition",
    nameFr: "Acquisition Client à Grande Échelle",
    descriptionAr: "استراتيجيات تسويقية وقنوات نمو متطورة لزيادة مبيعاتك وأرباحك.",
    descriptionEn: "Advanced marketing strategies and growth channels to scale sales and revenue.",
    descriptionFr: "Stratégies de marketing avancées pour développer vos ventes.",
    serviceSlugs: ["meta-ads-management", "google-ads", "tiktok-ads", "advertising-audit"],
    primaryServiceSlug: "meta-ads-management"
  },
  "automate-crm-operations": {
    slug: "automate-crm-operations",
    nameAr: "أتمتة المبيعات والعملاء المحتملين",
    nameEn: "Automate CRM & Lead Flow",
    nameFr: "Automatisation CRM & Flux de Leads",
    descriptionAr: "تحسين خدمة العملاء والمبيعات التلقائية باستخدام أدوات الذكاء الاصطناعي والربط الآلي.",
    descriptionEn: "Enhance customer interactions and automate sales pipelines using custom WhatsApp integrations.",
    descriptionFr: "Optimisez vos relations clients grâce aux automations intelligentes.",
    serviceSlugs: ["whatsapp-lead-automation", "crm-sales-pipeline", "ai-business-assistant"],
    primaryServiceSlug: "whatsapp-lead-automation"
  },
  "modernize-web-ecommerce": {
    slug: "modernize-web-ecommerce",
    nameAr: "تحديث المواقع والمتاجر الإلكترونية",
    nameEn: "Modernize Web & E-commerce",
    nameFr: "Modernisation Web & E-commerce",
    descriptionAr: "بناء متاجر حديثة وسريعة ومتجاوبة مع الجوال لتعزيز المبيعات.",
    descriptionEn: "High-performance websites and online shops engineered to maximize conversions.",
    descriptionFr: "Sites internet et boutiques en ligne optimisés pour la conversion.",
    serviceSlugs: ["ecommerce-store", "business-website", "landing-page", "website-maintenance"],
    primaryServiceSlug: "ecommerce-store"
  },
  "produce-video-content": {
    slug: "produce-video-content",
    nameAr: "إنتاج محتوى فيديو إعلاني مبهر",
    nameEn: "High-converting Video Production",
    nameFr: "Production Vidéo Haute Conversion",
    descriptionAr: "إنتاج وتعديل فيديوهات ريلز، تيك توك، ومحتوى UGC إعلاني مقنع.",
    descriptionEn: "Creative short-form vertical assets and custom UGC video hooks.",
    descriptionFr: "Vidéos courtes, UGC et montages publicitaires dynamiques.",
    serviceSlugs: ["ugc-advertising-content", "reels-social-video", "ai-advertising-video", "motion-video-editing"],
    primaryServiceSlug: "ugc-advertising-content"
  },
  "setup-social-presence": {
    slug: "setup-social-presence",
    nameAr: "بناء التواجد والانتشار الاجتماعي",
    nameEn: "Build Authority on Social Media",
    nameFr: "Autorité sur les Réseaux Sociaux",
    descriptionAr: "إدارة وتجهيز صفحات التواصل الاجتماعي بمحتوى جذاب بصفة دورية.",
    descriptionEn: "Social profile setup, scheduling curation, and recurring graphic assets.",
    descriptionFr: "Configuration, modération et création de contenu récurrent pour vos profils.",
    serviceSlugs: ["social-media-management", "content-production", "social-media-setup"],
    primaryServiceSlug: "social-media-management"
  },
  "wezo-studio-music": {
    slug: "wezo-studio-music",
    nameAr: "الإنتاج الصوتي والفن الموسيقي",
    nameEn: "WEZO Studio Music & Audio Artistry",
    nameFr: "WEZO Studio Production Musicale & Audio",
    descriptionAr: "خدمات التلحين، التوزيع، التسجيل الصوتي والهندسة للأعمال الفنية والإعلانية.",
    descriptionEn: "Arrangements, vocal tracking, mixing, and mastering at WEZO Studio.",
    descriptionFr: "Production musicale, enregistrement et mixage professionnel au studio.",
    serviceSlugs: ["music-production"],
    primaryServiceSlug: "music-production"
  }
};

export function getStaticSolutionDetails(slug: string): StaticSolution | null {
  return staticSolutionsData[slug.toLowerCase().trim()] || null;
}
