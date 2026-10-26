'use client'

import { motion } from 'framer-motion'
import { Music, Video, Megaphone, Globe, Bot, Layers, ChevronRight } from 'lucide-react'
import { Link } from '@/navigation'

interface ServicesGridProps {
  services?: any[]
  locale: string
}

const homepageCoreServices = [
  {
    id: 'srv-web',
    slug: 'business-website',
    iconType: 'web',
    nameAr: 'تطوير المواقع والمتاجر الإلكترونية',
    nameFr: 'Sites Web & Boutiques E-commerce',
    nameEn: 'Websites & E-commerce Stores',
    descAr: 'تصميم وبرمجة مواقع للشركات، متاجر إلكترونية متكاملة، وصفحات هبوط فائقة السرعة مصممة لرفع معدل التحويل والمبيعات.',
    descFr: 'Conception de sites vitrines modernes, boutiques e-commerce performantes et landing pages optimisées pour la conversion.',
    descEn: 'Custom corporate websites, full-featured e-commerce stores, and high-speed landing pages engineered to maximize conversions.',
  },
  {
    id: 'srv-marketing',
    slug: 'marketing',
    iconType: 'marketing',
    nameAr: 'التسويق الرقمي وإعلانات ميتا وجوجل',
    nameFr: 'Marketing Digital & Campagnes Ads',
    nameEn: 'Digital Marketing & Paid Acquisition',
    descAr: 'استراتيجيات تسويق رقمي متكاملة، إدارة حملات إعلانات فيسبوك وإنستغرام وجوجل لاستقطاب العملاء ومضاعفة العائد الإعلاني.',
    descFr: 'Stratégies d’acquisition sur mesure, gestion experte des campagnes Meta Ads et Google Ads pour générer des prospects qualifiés.',
    descEn: 'Tailored acquisition strategies and expert management of Meta & Google Ads campaigns to generate qualified leads and sales.',
  },
  {
    id: 'srv-branding',
    slug: 'brand-identity',
    iconType: 'branding',
    nameAr: 'الهوية البصرية وصناعة المحتوى',
    nameFr: 'Identité Visuelle & Création de Contenu',
    nameEn: 'Brand Identity & Content Creation',
    descAr: 'بناء الهوية البصرية المتكاملة للشركات، تصميم الشعارات، وإدارة حسابات التواصل الاجتماعي بمحتوى إبداعي يعزز مصداقية علامتك.',
    descFr: 'Création de chartes graphiques complètes, logos, et gestion des réseaux sociaux avec du contenu visuel à fort impact.',
    descEn: 'Comprehensive corporate branding, visual identity systems, and social media content creation that builds lasting authority.',
  },
  {
    id: 'srv-automation',
    slug: 'whatsapp-lead-automation',
    iconType: 'automation',
    nameAr: 'الأتمتة والذكاء الاصطناعي (Auto-Pilot)',
    nameFr: 'Automatisation IA & Flux WhatsApp CRM',
    nameEn: 'AI Automation & WhatsApp CRM Flows',
    descAr: 'أتمتة مسارات التواصل مع العملاء عبر واتساب، ربط أنظمة إدارة علاقات العملاء (CRM) ومساعدات الذكاء الاصطناعي لتسريع المبيعات.',
    descFr: 'Automatisation des parcours clients sur WhatsApp, intégration CRM et assistants IA pourqualifier et convertir vos prospects 24/7.',
    descEn: 'Automated WhatsApp customer journeys, CRM pipeline integrations, and AI business assistants to qualify and close leads faster.',
  },
  {
    id: 'srv-video',
    slug: 'reels-social-video',
    iconType: 'video',
    nameAr: 'الإنتاج المرئي والفيديوهات الإعلانية',
    nameFr: 'Production Vidéo & Reels Publicitaires',
    nameEn: 'Commercial Video & Reels Production',
    descAr: 'تصوير ومونتاج الفيديوهات الإعلانية، مقاطع الريلز وتيك توك، ومحتوى UGC الاحترافي المصمم لجذب الانتباه وإقناع الجمهور.',
    descFr: 'Tournage et montage de vidéos publicitaires, Reels, TikTok et contenus UGC conçus pour capter l’attention et vendre.',
    descEn: 'Studio shooting and editing of commercial videos, Reels, TikToks, and persuasive UGC content designed to stop the scroll.',
  },
  {
    id: 'srv-audio',
    slug: 'music-production',
    iconType: 'audio',
    nameAr: 'الإنتاج الصوتي والموسيقي وخدمات الفنانين',
    nameFr: 'Production Audio, Musique & Artistes',
    nameEn: 'Audio Production & Artist Services',
    descAr: 'استوديو احترافي للتسجيل الصوتي، التعليق الإعلاني (Voice-over)، التوزيع الموسيقي، وإدارة الحضور الرقمي للفنانين والمبدعين.',
    descFr: 'Studio d’enregistrement professionnel, voix-off publicitaires, production musicale, mixage et accompagnement des artistes.',
    descEn: 'Professional recording studio for commercial voice-overs, music production, mixing, mastering, and digital artist management.',
  },
]

export default function ServicesGrid({ locale }: ServicesGridProps) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const getLocalized = (item: any, prefixName: string) => {
    if (isAr) return item[`${prefixName}Ar`] || item[`${prefixName}En`]
    if (isFr) return item[`${prefixName}Fr`] || item[`${prefixName}En`]
    return item[`${prefixName}En`] || item[`${prefixName}Ar`]
  }

  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case 'web':
        return <Globe className="w-10 h-10 text-blue-500" />
      case 'marketing':
        return <Megaphone className="w-10 h-10 text-emerald-500" />
      case 'branding':
        return <Layers className="w-10 h-10 text-brand-orange" />
      case 'automation':
        return <Bot className="w-10 h-10 text-[#FF4D80]" />
      case 'video':
        return <Video className="w-10 h-10 text-amber-500" />
      case 'audio':
        return <Music className="w-10 h-10 text-purple-500" />
      default:
        return <Layers className="w-10 h-10 text-brand-orange" />
    }
  }

  return (
    <section className="py-40 relative overflow-hidden bg-[#0A0A0F] text-start">
      <div className="container-custom mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-32 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full glass-card border-brand-orange/20 text-brand-orange font-black text-sm uppercase tracking-widest"
          >
            {isAr ? 'الخدمات الرقمية المتطورة' : isFr ? 'Nos Expertises Digitales' : 'Our Specialized Services'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white px-4"
          >
            {isAr ? 'نساعدك على النمو في السوق الرقمي' : isFr ? 'Accélérez Votre Croissance Digitale' : 'Accelerate Your Digital Presence'}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {homepageCoreServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative p-12 rounded-[3.5rem] glass-card overflow-hidden hover:border-brand-orange/30 transition-all duration-500 hover:-translate-y-4 shadow-2xl flex flex-col justify-between"
            >
              <div className="relative z-10 space-y-10">
                <div 
                  className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl group-hover:border-white/20"
                >
                  {getServiceIcon(service.iconType)}
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-white group-hover:text-brand-orange transition-colors">
                    {getLocalized(service, 'name')}
                  </h3>
                  <p className="text-text-muted text-lg leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                    {getLocalized(service, 'desc')}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-8">
                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-3 text-brand-orange font-black text-lg group/link"
                >
                  <span>{isAr ? 'استكشف الخدمة بالتفصيل' : isFr ? 'Découvrir le service' : 'Explore Service'}</span>
                  <ChevronRight className="w-6 h-6 transition-transform group-hover/link:translate-x-2 rtl:rotate-180 rtl:group-hover/link:-translate-x-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
