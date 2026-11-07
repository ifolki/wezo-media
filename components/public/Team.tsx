'use client'

import { motion } from 'framer-motion'
import { Instagram, Linkedin } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface TeamMember {
  nameAr: string
  nameFr: string
  nameEn: string
  roleKey: string
  img: string
  instagram?: string
  linkedin?: string
}

const teamMembers: TeamMember[] = [
  {
    nameAr: 'محمد بزاو',
    nameFr: 'Mohammed Bazaou',
    nameEn: 'Mohammed Bazaou',
    roleKey: 'projectManager',
    img: '/assets/team/mhammed-bazaou.png',
  },
  {
    nameAr: 'رضى العمراني',
    nameFr: 'Reda El Amrani',
    nameEn: 'Reda El Amrani',
    roleKey: 'founder',
    img: '/assets/team/team-4.jpg',
  },
  {
    nameAr: 'ياسمين بناني',
    nameFr: 'Yasmine Bennani',
    nameEn: 'Yasmine Bennani',
    roleKey: 'prodManager',
    img: '/assets/team/team-2.jpg',
  },
  {
    nameAr: 'كريم العلمي',
    nameFr: 'Karim Alami',
    nameEn: 'Karim Alami',
    roleKey: 'marketing',
    img: '/assets/team/team-1.jpg',
  },
  {
    nameAr: 'سارة الشرايبي',
    nameFr: 'Sarah Chraibi',
    nameEn: 'Sarah Chraibi',
    roleKey: 'web',
    img: '/assets/team/team-3.jpg',
  },
]

const isValidSocialUrl = (url?: string): url is string => {
  return Boolean(url && url.trim() !== '' && url.trim() !== '#')
}

export default function Team() {
  const t = useTranslations('team')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const getMemberName = (member: TeamMember) => (isAr ? member.nameAr : isFr ? member.nameFr : member.nameEn)

  const getAltText = (member: TeamMember) => {
    const name = getMemberName(member)
    const role = t(member.roleKey)
    if (isAr) return `صورة ${name} - ${role} في وكالة WEZO MEDIA`
    if (isFr) return `Portrait de ${name} - ${role} chez WEZO MEDIA`
    return `Portrait of ${name} - ${role} at WEZO MEDIA`
  }

  return (
    <section className="py-20 lg:py-24 bg-[#141C2B] border-y border-white/[0.06] relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16 space-y-3.5">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black text-text-primary leading-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base text-text-muted"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6 justify-center">
          {teamMembers.map((member, i) => {
            const name = getMemberName(member)
            const hasInstagram = isValidSocialUrl(member.instagram)
            const hasLinkedin = isValidSocialUrl(member.linkedin)
            const hasAnySocial = hasInstagram || hasLinkedin

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group text-center space-y-5 flex flex-col items-center"
              >
                <div className="relative inline-block mx-auto">
                  <div className="w-40 h-40 xl:w-44 xl:h-44 rounded-[2rem] overflow-hidden border border-white/10 shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand-orange/50">
                    <img 
                      src={member.img} 
                      alt={getAltText(member)} 
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Social Links Popup - Only rendered if member has valid personal social URLs */}
                  {hasAnySocial && (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      {hasInstagram && (
                        <a 
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${name} Instagram`}
                          className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg hover:scale-110 transition-all text-white"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {hasLinkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${name} LinkedIn`}
                          className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg hover:scale-110 transition-all text-white"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-1 pt-1">
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-brand-orange transition-colors line-clamp-1">
                    {name}
                  </h3>
                  <p className="text-brand-orange font-bold uppercase tracking-wider text-[11px]">
                    {t(member.roleKey)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
