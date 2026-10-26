'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface TestimonialItem {
  nameAr: string
  nameFr: string
  nameEn: string
  companyAr: string
  companyFr: string
  companyEn: string
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
    companyAr: 'Decoafrica • متجر ديكور ونباتات',
    companyFr: 'Decoafrica • E-Commerce & Décoration',
    companyEn: 'Decoafrica • E-Commerce & Home Decor',
    quoteAr: 'مرافقة فريق WEZO MEDIA أحدثت نقلة نوعية في مبيعات متجرنا الإلكتروني. بفضل إعادة هيكلة الهوية الرقمية والحملات الإعلانية المدروسة، ضاعفنا حجم الطلبيات اليومية وحققنا عائداً إعلانياً فاق توقعاتنا.',
    quoteFr: 'L’accompagnement de WEZO MEDIA a transformé nos ventes en ligne. Grâce à la refonte de notre présence digitale et aux campagnes Meta Ads ciblées, nos commandes ont doublé avec un ROAS exceptionnel.',
    quoteEn: 'Partnering with WEZO MEDIA transformed our online store sales. Thanks to their digital strategy and targeted Meta Ads campaigns, we doubled our daily orders and achieved an outstanding ROAS.',
    stars: 5,
  },
  {
    nameAr: 'ابتسام بناني',
    nameFr: 'Btissam Bennani',
    nameEn: 'Btissam Bennani',
    companyAr: 'Crèche Btissam • مؤسسة تعليمية',
    companyFr: 'Crèche Btissam • Établissement Scolaire',
    companyEn: 'Crèche Btissam • Educational Institution',
    quoteAr: 'ساعدتنا وكالة WEZO MEDIA في تجديد هويتنا البصرية وبناء ثقة قوية مع أولياء الأمور عبر فيديوهات واقعية وحملات استهداف محلية دقيقة، مما رفع نسبة التسجيلات لدينا بأكثر من 90% خلال موسم التسجيل.',
    quoteFr: 'WEZO MEDIA nous a aidés à moderniser notre identité visuelle et à rassurer les parents grâce à des vidéos authentiques et des campagnes locales, augmentant nos inscriptions de plus de 90%.',
    quoteEn: 'WEZO MEDIA helped us refresh our brand identity and build strong trust with parents through authentic videos and localized campaigns, boosting our student enrollments by over 90%.',
    stars: 5,
  },
  {
    nameAr: 'د. هناء القندري',
    nameFr: 'Dr. Hanae Kandri',
    nameEn: 'Dr. Hanae Kandri',
    companyAr: 'عيادة الأخصائية النفسية هناء القندري',
    companyFr: 'Cabinet Psychologue Hanae Kandri',
    companyEn: 'Psychologist Hanae Kandri Clinic',
    quoteAr: 'احترافية عالية وفهم عميق لخصوصية المجال الطبي والنفسي. قام الفريق ببناء حضور رقمي رصين ومحتوى توعوي راقٍ مع مسار حجز سلس عبر واتساب، مما ضاعف عدد الاستشارات المحجوزة شهرياً.',
    quoteFr: 'Un grand professionnalisme et une compréhension fine de notre secteur. L’équipe a bâti une présence digitale sobre et rassurante avec un parcours WhatsApp fluide qui a multiplié nos consultations par 2,5.',
    quoteEn: 'High professionalism and deep understanding of the healthcare sector. The team built a trustworthy digital presence and seamless WhatsApp booking flow that multiplied our monthly consultations by 2.5x.',
    stars: 5,
  },
]

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const getName = (item: TestimonialItem) => (isAr ? item.nameAr : isFr ? item.nameFr : item.nameEn)
  const getCompany = (item: TestimonialItem) => (isAr ? item.companyAr : isFr ? item.companyFr : item.companyEn)
  const getQuote = (item: TestimonialItem) => (isAr ? item.quoteAr : isFr ? item.quoteFr : item.quoteEn)

  return (
    <section className="py-32 overflow-hidden bg-brand-dark relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-pink/5 blur-[120px] rounded-full -translate-x-1/2" />
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-2/5 space-y-10 text-start">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1]">
                {t('title')} <span className="gradient-text">{t('brand')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-bold">
                {t('subtitle')}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <div className="px-8 py-4 rounded-3xl glass-card border-brand-orange/20 shadow-2xl">
                <span className="text-3xl font-black text-white block">+230</span>
                <p className="text-sm font-bold text-brand-orange uppercase tracking-widest">{t('satisfied')}</p>
              </div>
              <div className="px-8 py-4 rounded-3xl glass-card border-brand-pink/20 shadow-2xl">
                <span className="text-3xl font-black text-white block">4.9/5</span>
                <p className="text-sm font-bold text-brand-pink uppercase tracking-widest">{t('rating')}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {feedbackList.map((item, i) => {
              const name = getName(item)
              const company = getCompany(item)
              const quote = getQuote(item)

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-10 rounded-[3rem] border-white/5 relative group hover:border-brand-orange/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                >
                  <Quote className="absolute top-8 end-10 w-16 h-16 text-white/5 group-hover:text-brand-orange/10 transition-colors" />
                  
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(item.stars)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>

                  <p className="text-lg text-text-primary leading-relaxed mb-10 relative z-10 font-bold opacity-90">
                    &ldquo;{quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl gradient-brand p-1 shadow-xl shrink-0">
                      <div className="w-full h-full rounded-xl bg-brand-dark flex items-center justify-center font-black text-xl text-white">
                        {name[0]}
                      </div>
                    </div>
                    <div className="text-start">
                      <h3 className="text-xl font-black text-white">{name}</h3>
                      <p className="text-sm font-bold text-text-muted tracking-wider">{company}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
