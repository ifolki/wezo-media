'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { createCardRevealVariant, createFadeUpVariant, createStaggerContainer } from '@/lib/motion-tokens'

interface TestimonialItem {
  nameAr: string
  nameFr: string
  nameEn: string
  roleAr: string
  roleFr: string
  roleEn: string
  companyAr: string
  companyFr: string
  companyEn: string
  tagAr: string
  tagFr: string
  tagEn: string
  quoteAr: string
  quoteFr: string
  quoteEn: string
  stars: number
}

const feedbackList: TestimonialItem[] = [
  {
    nameAr: 'يوسف العلوي',
    nameFr: 'Youssef El Alaoui',
    nameEn: 'Youssef El Alaoui',
    roleAr: 'مؤسس ومدير متجر',
    roleFr: 'Fondateur & Gérant',
    roleEn: 'Founder & Store Director',
    companyAr: 'Decoafrica • تجارة إلكترونية وديكور',
    companyFr: 'Decoafrica • E-Commerce & Décoration',
    companyEn: 'Decoafrica • E-Commerce & Home Decor',
    tagAr: 'المتاجر والإعلانات',
    tagFr: 'E-Commerce & Meta Ads',
    tagEn: 'E-Commerce & Meta Ads',
    quoteAr:
      'مرافقة فريق WEZO MEDIA أحدثت نقلة نوعية في مبيعات متجرنا الإلكتروني. بفضل إعادة هيكلة الهوية الرقمية والحملات الإعلانية المدروسة، ضاعفنا حجم الطلبيات اليومية بشكل مستقر.',
    quoteFr:
      'L’accompagnement de WEZO MEDIA a transformé nos ventes en ligne. Grâce à la refonte de notre présence digitale et aux campagnes Meta Ads ciblées, nos commandes quotidiennes ont fortement progressé.',
    quoteEn:
      'Partnering with WEZO MEDIA transformed our online store sales. Thanks to their digital strategy and targeted Meta Ads campaigns, our daily orders grew consistently.',
    stars: 5,
  },
  {
    nameAr: 'ابتسام بناني',
    nameFr: 'Btissam Bennani',
    nameEn: 'Btissam Bennani',
    roleAr: 'مديرة المؤسسة',
    roleFr: 'Directrice d’Établissement',
    roleEn: 'School Director',
    companyAr: 'Crèche Btissam • مؤسسة تعليمية',
    companyFr: 'Crèche Btissam • Établissement Scolaire',
    companyEn: 'Crèche Btissam • Educational Institution',
    tagAr: 'الهوية والفيديو الإعلاني',
    tagFr: 'Branding & Production Vidéo',
    tagEn: 'Branding & Video Production',
    quoteAr:
      'ساعدتنا وكالة WEZO MEDIA في تجديد هويتنا البصرية وبناء ثقة قوية مع أولياء الأمور عبر فيديوهات واقعية وحملات استهداف محلية دقيقة رفعت طلبات التسجيل بشكل ملحوظ.',
    quoteFr:
      'WEZO MEDIA nous a aidés à moderniser notre identité visuelle et à rassurer les parents grâce à des vidéos authentiques et des campagnes locales à fort impact.',
    quoteEn:
      'WEZO MEDIA helped us refresh our brand identity and build strong trust with parents through authentic studio videos and localized acquisition campaigns.',
    stars: 5,
  },
  {
    nameAr: 'مهدي التازي',
    nameFr: 'Mehdi Tazi',
    nameEn: 'Mehdi Tazi',
    roleAr: 'المدير التنفيذي',
    roleFr: 'Directeur Général',
    roleEn: 'Managing Director',
    companyAr: 'Horizon Travel • وكالة أسفار وسياحة',
    companyFr: 'Horizon Travel • Agence de Voyages & Tourisme',
    companyEn: 'Horizon Travel • Travel & Tourism Agency',
    tagAr: 'الموقع وأتمتة واتساب',
    tagFr: 'Site Web & Automatisation CRM',
    tagEn: 'Web & WhatsApp CRM',
    quoteAr:
      'احترافية عالية والتزام دقيق بالمواعيد. قام الفريق بتطوير موقعنا الجديد مع ربط تلقائي لطلبات الحجز عبر واتساب وCRM، مما سهل تواصلنا مع المسافرين وسرّع إغلاق المبيعات.',
    quoteFr:
      'Un grand professionnalisme et une exécution rapide. L’équipe a conçu notre nouveau site web avec un flux de réservation WhatsApp automatisé qui a fluidifié notre gestion commerciale.',
    quoteEn:
      'High professionalism and seamless execution. The team engineered our new website and automated WhatsApp booking pipeline, making lead qualification effortless.',
    stars: 5,
  },
]

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'
  const prefersReducedMotion = Boolean(useReducedMotion())

  const getName = (item: TestimonialItem) =>
    isAr ? item.nameAr : isFr ? item.nameFr : item.nameEn
  const getRole = (item: TestimonialItem) =>
    isAr ? item.roleAr : isFr ? item.roleFr : item.roleEn
  const getCompany = (item: TestimonialItem) =>
    isAr ? item.companyAr : isFr ? item.companyFr : item.companyEn
  const getTag = (item: TestimonialItem) =>
    isAr ? item.tagAr : isFr ? item.tagFr : item.tagEn
  const getQuote = (item: TestimonialItem) =>
    isAr ? item.quoteAr : isFr ? item.quoteFr : item.quoteEn

  const headerContainer = createStaggerContainer(0.08, 0.02, prefersReducedMotion)
  const headerItem = createFadeUpVariant(16, 0.6, prefersReducedMotion)

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-20 lg:py-24 overflow-hidden bg-brand-dark relative text-start"
    >
      {/* Subtle Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[280px] bg-brand-orange/[0.04] blur-[150px] rounded-full pointer-events-none -z-10"
      />

      <div className="container-custom">
        {/* Compact Editorial Header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14"
        >
          <div className="space-y-3.5 max-w-2xl">
            <motion.div
              variants={headerItem}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-secondary border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? 'ثقة شركاء النجاح'
                  : isFr
                    ? 'Retours Clients & Partenaires'
                    : 'Client & Partner Feedback'}
              </span>
            </motion.div>

            <motion.h2
              id="testimonials-heading"
              variants={headerItem}
              className={
                isAr
                  ? 'font-cairo font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-text-primary leading-[1.3] tracking-normal'
                  : 'font-syne font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-text-primary leading-[1.15] tracking-tight'
              }
            >
              <span>{t('title')} </span>
              <span className="gradient-text inline-block pt-0.5 pb-1">{t('brand')}</span>
            </motion.h2>

            <motion.p
              variants={headerItem}
              className="text-sm sm:text-base text-text-muted leading-relaxed font-normal"
            >
              {t('subtitle')}
            </motion.p>
          </div>

          {/* Subtle Credibility Pill */}
          <motion.div
            variants={headerItem}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-secondary/70 border border-white/[0.08] text-xs sm:text-sm font-semibold text-text-primary/90 self-start lg:self-end shrink-0"
          >
            <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
            <span>
              {isAr
                ? 'شراكة استراتيجية ومواكبة ميدانية مستمرة'
                : isFr
                  ? 'Accompagnement stratégique & exécution clé en main'
                  : 'Strategic advisory & full-funnel execution'}
            </span>
          </motion.div>
        </motion.div>

        {/* Balanced 3-Column Executive Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {feedbackList.map((item, i) => {
            const name = getName(item)
            const role = getRole(item)
            const company = getCompany(item)
            const tag = getTag(item)
            const quote = getQuote(item)
            const cardVariants = createCardRevealVariant(i, prefersReducedMotion)

            return (
              <motion.article
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="group relative p-6 sm:p-7 rounded-2xl bg-brand-secondary/75 border border-white/[0.08] hover:border-brand-orange/35 transition-all duration-300 hover:-translate-y-1 shadow-[0_16px_40px_rgba(0,0,0,0.3)] flex flex-col justify-between gap-6 backdrop-blur-xl"
              >
                {/* Top Row: Stars + Service Pillar Tag */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1" aria-label={`${item.stars} out of 5 stars`}>
                      {[...Array(item.stars)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 fill-brand-orange text-brand-orange"
                        />
                      ))}
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-brand-dark/80 border border-white/[0.07] text-[10.5px] font-semibold text-text-muted">
                      {tag}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <div className="relative">
                    <Quote
                      aria-hidden="true"
                      className="w-6 h-6 text-brand-orange/20 mb-2"
                    />
                    <p className="text-sm sm:text-[15px] text-text-primary/90 leading-[1.75] font-normal">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Author Footer */}
                <div className="pt-4 border-t border-white/[0.07] flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl p-[1px] gradient-brand shrink-0 shadow-md">
                    <div className="w-full h-full rounded-[11px] bg-brand-dark flex items-center justify-center font-bold text-sm text-text-primary">
                      {name[0]}
                    </div>
                  </div>
                  <div className="min-w-0 text-start">
                    <h3
                      className={
                        isAr
                          ? 'font-cairo font-bold text-sm sm:text-[15px] text-text-primary leading-snug'
                          : 'font-syne font-bold text-sm sm:text-[15px] text-text-primary leading-snug'
                      }
                    >
                      {name}
                    </h3>
                    <p className="text-[11.5px] font-medium text-brand-orange/90 truncate mt-0.5">
                      {company}
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
