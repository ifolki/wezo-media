import { PrismaClient, ServiceCategory } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting simplified seed execution...')

  const servicesData = [
    // Advertising & Growth
    {
      slug: 'meta-ads-management',
      category: ServiceCategory.DIGITAL_MARKETING,
      nameAr: 'إدارة إعلانات ميتا',
      nameEn: 'Meta Ads Management',
      nameFr: 'Gestion des publicités Meta',
      descAr: 'إنشاء وإدارة وتحسين حملات Facebook وInstagram بهدف جلب العملاء أو المبيعات.',
      descEn: 'Strategy, launch and optimization of Facebook and Instagram campaigns focused on leads and sales.',
      descFr: 'Création, gestion et optimisation des campagnes Facebook et Instagram orientées acquisition et ventes.',
      isActive: true,
      order: 1
    },
    {
      slug: 'google-ads',
      category: ServiceCategory.DIGITAL_MARKETING,
      nameAr: 'إعلانات Google',
      nameEn: 'Google Ads',
      nameFr: 'Publicité Google Ads',
      descAr: 'حملات بحث وجوجل للتواصل مع الباحثين عن خدماتك.',
      descEn: 'Search & display campaigns targeting active intent keywords.',
      descFr: 'Campagnes Google Search ciblant les prospects qualifiés.',
      isActive: true,
      order: 2
    },
    {
      slug: 'tiktok-ads',
      category: ServiceCategory.DIGITAL_MARKETING,
      nameAr: 'إعلانات TikTok',
      nameEn: 'TikTok Ads',
      nameFr: 'Publicité TikTok',
      descAr: 'إدارة حملات TikTok بمحتوى مخصص عمودي للمنصة.',
      descEn: 'Native TikTok campaigns engineered around video-first assets.',
      descFr: 'Campagnes publicitaires vidéo natives adaptées à l\'audience TikTok.',
      isActive: true,
      order: 3
    },
    {
      slug: 'advertising-audit',
      category: ServiceCategory.DIGITAL_MARKETING,
      nameAr: 'تدقيق واستراتيجية الإعلانات',
      nameEn: 'Advertising Audit',
      nameFr: 'Audit publicitaire',
      descAr: 'فحص حملاتك الحالية لتشخيص ضعف النتائج وتقديم خطة نمو واضحة.',
      descEn: 'Deep dive account analysis to identify cost leaks and boost ROAS.',
      descFr: 'Analyse de vos comptes pour identifier les pertes et maximiser le ROAS.',
      isActive: true,
      order: 4
    },
    // Creative & Video
    {
      slug: 'ai-advertising-video',
      category: ServiceCategory.VIDEO_PRODUCTION,
      nameAr: 'فيديو إعلاني بالذكاء الاصطناعي',
      nameEn: 'AI Advertising Video',
      nameFr: 'Vidéo publicitaire IA',
      descAr: 'إنتاج فيديو إعلاني متكامل باستخدام الذكاء الاصطناعي.',
      descEn: 'Concept, voice synthesis, and visual rendering leveraging AI.',
      descFr: 'Production vidéo publicitaire complète via IA (scénario, voix-off et montage).',
      isActive: true,
      order: 5
    },
    {
      slug: 'ugc-advertising-content',
      category: ServiceCategory.VIDEO_PRODUCTION,
      nameAr: 'محتوى UGC إعلاني',
      nameEn: 'UGC Advertising Content',
      nameFr: 'Contenu publicitaire UGC',
      descAr: 'إعلانات فيديو مقنعة ومصورة بواسطة صناع محتوى حقيقيين.',
      descEn: 'Creator-led video clips optimized to build customer trust.',
      descFr: 'Vidéos de créateurs authentiques pour booster vos ventes e-commerce.',
      isActive: true,
      order: 6
    },
    {
      slug: 'reels-social-video',
      category: ServiceCategory.VIDEO_PRODUCTION,
      nameAr: 'فيديوهات Reels ومحتوى قصير',
      nameEn: 'Reels & Short-form Video',
      nameFr: 'Reels & vidéos courtes',
      descAr: 'إنتاج فيديوهات عمودية قصيرة لمنصات ريلز وتيك توك.',
      descEn: 'Dynamic short-form vertical assets built for algorithms reach.',
      descFr: 'Création de vidéos verticales optimisées pour TikTok et Instagram Reels.',
      isActive: true,
      order: 7
    },
    {
      slug: 'motion-video-editing',
      category: ServiceCategory.VIDEO_PRODUCTION,
      nameAr: 'الموشن غرافيك والمونتاج',
      nameEn: 'Motion Graphics & Video Editing',
      nameFr: 'Motion design & montage vidéo',
      descAr: 'تحريك الرسوم وتعديل الفيديوهات بإيقاع جذاب يثبت الانتباه.',
      descEn: 'High-end transitions, graphic text tracking, and visual styling.',
      descFr: 'Montage dynamique et animations graphiques professionnelles.',
      isActive: true,
      order: 8
    },
    // Web & E-commerce
    {
      slug: 'landing-page',
      category: ServiceCategory.WEB_DEVELOPMENT,
      nameAr: 'صفحة هبوط احترافية',
      nameEn: 'Conversion Landing Page',
      nameFr: 'Landing page professionnelle',
      descAr: 'صفحة ويب محسنة ومصممة خصيصاً لتحويل الزوار إلى عملاء فعليين.',
      descEn: 'Responsive single-page layouts engineered to maximize ad conversions.',
      descFr: 'Page de capture rapide optimisée pour convertir vos visiteurs publicitaires.',
      isActive: true,
      order: 9
    },
    {
      slug: 'business-website',
      category: ServiceCategory.WEB_DEVELOPMENT,
      nameAr: 'موقع إلكتروني احترافي',
      nameEn: 'Business Website',
      nameFr: 'Site web professionnel',
      descAr: 'موقع متكامل يعرض خدمات مشروعك ويبني الثقة ويولد الاتصالات.',
      descEn: 'Corporate informational layouts displaying business services and credentials.',
      descFr: 'Site vitrine moderne pour présenter votre enterprise et rassurer vos clients.',
      isActive: true,
      order: 10
    },
    {
      slug: 'ecommerce-store',
      category: ServiceCategory.WEB_DEVELOPMENT,
      nameAr: 'متجر إلكتروني متكامل',
      nameEn: 'E-commerce Store',
      nameFr: 'Boutique e-commerce',
      descAr: 'إنشاء متجر متكامل لعرض منتجاتك واستقبل الطلبات والشحن.',
      descEn: 'Complete shop checkout systems with payment gateway and tracking pixels.',
      descFr: 'Boutique Shopify ou WooCommerce pour lancer et développer vos ventes.',
      isActive: true,
      order: 11
    },
    {
      slug: 'website-maintenance',
      category: ServiceCategory.WEB_DEVELOPMENT,
      nameAr: 'صيانة وإدارة المواقع',
      nameEn: 'Website Maintenance',
      nameFr: 'Maintenance de site web',
      descAr: 'نسخ احتياطي دوري، تحديثات أمنية وحلول سريعة للأعطال الطارئة.',
      descEn: 'Security patches, weekly performance audits, and minor style tweaks.',
      descFr: 'Sauvegardes récurrentes et mises à jour de sécurité de votre plateforme.',
      isActive: true,
      order: 12
    },
    // Branding & Design
    {
      slug: 'brand-identity',
      category: ServiceCategory.ARTIST_SERVICES,
      nameAr: 'تصميم الشعار والهوية البصرية',
      nameEn: 'Logo & Brand Identity',
      nameFr: 'Logo & identité visuelle',
      descAr: 'بناء كامل للنظام البصري والأدلة المتناسقة لعلامتك التجارية.',
      descEn: 'Brand assets guidelines, logo design variations, and visual styles.',
      descFr: 'Conception de logo et guide de style complet pour votre marque.',
      isActive: true,
      order: 13
    },
    {
      slug: 'marketing-design',
      category: ServiceCategory.ARTIST_SERVICES,
      nameAr: 'تصاميم التسويق والسوشيال ميديا',
      nameEn: 'Marketing & Social Design',
      nameFr: 'Design marketing & réseaux sociaux',
      descAr: 'تصميم إعلانات وبانرات وقوالب متميزة لقنوات التواصل.',
      descEn: 'Visual kits for social posts, ad templates, and headers.',
      descFr: 'Visuels publicitaires et modèles de publications pour vos réseaux.',
      isActive: true,
      order: 14
    },
    // Social Media
    {
      slug: 'social-media-setup',
      category: ServiceCategory.ARTIST_SERVICES,
      nameAr: 'إنشاء وتجهيز الحضور على السوشيال ميديا',
      nameEn: 'Social Media Setup',
      nameFr: 'Mise en place des réseaux sociaux',
      descAr: 'تهيئة وتصميم الحسابات الاجتماعية لتطابق الهوية التجارية وتجذب الزوار.',
      descEn: 'Configuration and header asset creation for business profiles.',
      descFr: 'Création et optimisation de vos profils sur les principaux réseaux.',
      isActive: true,
      order: 15
    },
    {
      slug: 'social-media-management',
      category: ServiceCategory.ARTIST_SERVICES,
      nameAr: 'إدارة مواقع التواصل الاجتماعي',
      nameEn: 'Social Media Management',
      nameFr: 'Gestion des réseaux sociaux',
      descAr: 'جدولة المنشورات والرد على التعليقات ومراقبة التفاعل.',
      descEn: 'Full scheduling curation, captions, and community monitoring retainers.',
      descFr: 'Planification de posts et modération pour dynamiser vos comptes.',
      isActive: true,
      order: 16
    },
    {
      slug: 'content-production',
      category: ServiceCategory.ARTIST_SERVICES,
      nameAr: 'إنتاج المحتوى الشهري',
      nameEn: 'Content Production',
      nameFr: 'Production de contenu',
      descAr: 'تسليم شهري للمنشورات والتصاميم المبتكرة دون خدمة إدارة الحساب.',
      descEn: 'Recurring asset engine providing ready-to-post graphics and video clips.',
      descFr: 'Création récurrente de posts et vidéos pour vos canaux digitaux.',
      isActive: true,
      order: 17
    },
    // AI & Automation
    {
      slug: 'whatsapp-lead-automation',
      category: ServiceCategory.DIGITAL_MARKETING,
      nameAr: 'أتمتة واتساب والعملاء المحتملين',
      nameEn: 'WhatsApp & Lead Automation',
      nameFr: 'Automatisation WhatsApp & leads',
      descAr: 'ربط WhatsApp API لإشعار العملاء بالطلبات وتأكيد الشحن آلياً.',
      descEn: 'Trigger auto-notifications, shipping updates, and follow-ups via WhatsApp.',
      descFr: 'Automatisez le traitement de vos leads et vos relances WhatsApp.',
      isActive: true,
      order: 18
    },
    {
      slug: 'crm-sales-pipeline',
      category: ServiceCategory.DIGITAL_MARKETING,
      nameAr: 'إعداد CRM ومسار المبيعات',
      nameEn: 'CRM & Sales Pipeline Setup',
      nameFr: 'Configuration CRM & pipeline commercial',
      descAr: 'تنظيم وتنسيق مراحل تتبع العملاء والمكالمات في واجهة لوحية ذكية.',
      descEn: 'Setup deals boards and automate team allocations.',
      descFr: 'Centralisez le suivi de vos prospects dans un pipeline de vente.',
      isActive: true,
      order: 19
    },
    {
      slug: 'ai-business-assistant',
      category: ServiceCategory.DIGITAL_MARKETING,
      nameAr: 'مساعد أعمال بالذكاء الاصطناعي',
      nameEn: 'AI Business Assistant',
      nameFr: 'Assistant professionnel IA',
      descAr: 'مساعد ذكي للدردشة وتأهيل العملاء التلقائي على مدار 24 ساعة.',
      descEn: 'Bespoke AI assistants trained to handle FAQs and qualify leads.',
      descFr: 'Assistant IA entraîné sur vos données pour qualifier vos prospects.',
      isActive: true,
      order: 20
    },
    // WEZO Studio
    {
      slug: 'music-production',
      category: ServiceCategory.AUDIO_PRODUCTION,
      nameAr: 'الإنتاج الموسيقي والتلحين',
      nameEn: 'Music Production & Recording',
      nameFr: 'Production musicale et enregistrement',
      descAr: 'خدمات التلحين، التوزيع، التسجيل الصوتي والهندسة للأعمال الفنية.',
      descEn: 'Full track arrangements, vocal tracking, mixing, and studio masters.',
      descFr: 'Production musicale, enregistrement et mixage professionnel.',
      isActive: true,
      order: 21
    }
  ]

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        nameAr: s.nameAr,
        nameEn: s.nameEn,
        nameFr: s.nameFr,
        descAr: s.descAr,
        descEn: s.descEn,
        descFr: s.descFr,
        category: s.category,
        isActive: s.isActive,
        order: s.order
      },
      create: {
        slug: s.slug,
        nameAr: s.nameAr,
        nameEn: s.nameEn,
        nameFr: s.nameFr,
        descAr: s.descAr,
        descEn: s.descEn,
        descFr: s.descFr,
        category: s.category,
        isActive: s.isActive,
        order: s.order
      }
    })
    console.log(`Upserted service: ${s.slug}`)
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed execution failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
