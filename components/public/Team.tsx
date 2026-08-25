'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'

const teamMembers = [
  { name: 'Mohammed Bazaou', roleKey: 'projectManager', img: '/assets/team/mhammed-bazaou.png' },
  { name: 'Reda El Amrani', roleKey: 'founder', img: '/assets/team/team-4.jpg' },
  { name: 'Yasmine Bennani', roleKey: 'prodManager', img: '/assets/team/team-2.jpg' },
  { name: 'Karim Alami', roleKey: 'marketing', img: '/assets/team/team-1.jpg' },
  { name: 'Sarah Chraibi', roleKey: 'web', img: '/assets/team/team-3.jpg' },
]

export default function Team() {
  const t = useTranslations('team')

  return (
    <section className="py-32 bg-brand-secondary/30 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-text-muted"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6 justify-center">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group text-center space-y-8 flex flex-col items-center"
            >
              <div className="relative inline-block mx-auto">
                <div className="w-48 h-48 xl:w-52 xl:h-52 rounded-[3rem] overflow-hidden border-2 border-white/5 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:border-brand-orange group-hover:shadow-brand-orange/20">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Social Links Popup */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-2xl hover:scale-125 transition-all text-white"
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">
                  {t(member.roleKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
