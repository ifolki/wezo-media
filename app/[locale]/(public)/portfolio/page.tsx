'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Play, ExternalLink } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'

const categories = [
  { id: 'all', label_ar: 'الكل', label_en: 'All' },
  { id: 'music', label_ar: 'موسيقى', label_en: 'Music' },
  { id: 'video', label_ar: 'فيديو', label_en: 'Video' },
  { id: 'web', label_ar: 'ويب', label_en: 'Web' },
  { id: 'marketing', label_ar: 'تسويق', label_en: 'Marketing' },
]

const projects = [
  { id: 20, title: 'Decoafrica', category: 'marketing', img: '/assets/agency/decoafrica.jpg', slug: 'decoafrica' },
  { id: 19, title: 'Crèche Btissam', category: 'marketing', img: '/assets/agency/creche-btissam.jpg', slug: 'creche-btissam' },
  { id: 18, title: 'Psychologue Hanae Kandri', category: 'marketing', img: '/assets/agency/hanae-kandri.jpg', slug: 'hanae-kandri' },
  { id: 17, title: "Horizon Travel's Morocco", category: 'marketing', img: '/assets/agency/horizon-travel.jpg', slug: 'horizon-travel' },
  { id: 16, title: 'Mangeo App', category: 'web', img: '/assets/agency/mangeo-mockup.jpg', slug: 'mangeo-app' },
  { id: 15, title: 'Vanora.ma', category: 'web', img: '/assets/agency/vanora.jpg', slug: 'vanora' },
  { id: 14, title: 'Mohammed Tifawine', category: 'music', img: '/assets/agency/tifawine-mockup.jpg', slug: 'mohammed-tifawine' },
  { id: 13, title: 'Ifolki.ma', category: 'web', img: '/assets/agency/ifolki.png', slug: 'ifolki' },
  { id: 12, title: 'Africha Oued Eddahab', category: 'marketing', img: '/assets/agency/africha-oued-eddahab.jpg', slug: 'africha-oued-eddahab' },
  { id: 11, title: 'Cabinet Dentaire Dr. Mohamed Larhmaid', category: 'marketing', img: '/assets/agency/cabinet-dentaire.jpg', slug: 'cabinet-dentaire' },
  { id: 10, title: 'Salon Juudiey', category: 'marketing', img: '/assets/agency/salon-juudiey.jpg', slug: 'salon-juudiey' },
  { id: 9, title: 'Gama Pro', category: 'marketing', img: '/assets/agency/gama-pro.jpg', slug: 'gama-pro' },
  { id: 8, title: 'SS Lavage', category: 'marketing', img: '/assets/agency/ss-lavage.jpg', slug: 'ss-lavage' },
  { id: 7, title: 'Ecole Sennouni Science School', category: 'marketing', img: '/assets/agency/ecole-sennouni.jpg', slug: 'ecole-sennouni' },
  { id: 1, title: 'Summer Anthem', category: 'music', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Corporate Identity', category: 'marketing', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'E-commerce App', category: 'web', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Fashion Film', category: 'video', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600' },
  { id: 5, title: 'Music Video X', category: 'video', img: 'https://images.unsplash.com/photo-1514525253361-bee8718a342b?auto=format&fit=crop&q=80&w=600' },
  { id: 6, title: 'Artist Website', category: 'web', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600' },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = projects.filter(p => activeCategory === 'all' || p.category === activeCategory)

  return (
    <main className="min-h-screen pb-20">
      <section className="py-20 bg-brand-secondary/30">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-6xl font-black text-white">معرض الأعمال</h1>
          <p className="text-xl text-text-muted">نشارككم قصص النجاح والمشاريع التي نفخر بإنجازها</p>
        </div>
      </section>

      <section className="py-10 sticky top-20 z-30 bg-brand-dark/80 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 items-center justify-between">
           <div className="flex flex-wrap gap-2 justify-center">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 className={`px-6 py-2 rounded-full font-bold transition-all ${
                   activeCategory === cat.id 
                     ? 'gradient-brand text-white shadow-lg' 
                     : 'glass-card text-text-muted hover:text-white'
                 }`}
               >
                 {cat.label_ar}
               </button>
             ))}
           </div>
           <div className="relative w-full md:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
             <Input className="pl-10 bg-brand-card border-white/5" placeholder="ابحث في المشاريع..." />
           </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <AnimatePresence mode="popLayout">
               {filteredProjects.map((project, i) => (
                 <Link key={project.id} href={project.slug ? `/portfolio/${project.slug}` : '#'}>
                   <motion.div
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.4 }}
                     className="group relative h-80 overflow-hidden rounded-[2rem] glass-card cursor-pointer"
                   >
                     <img src={project.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute inset-0 flex flex-col justify-end p-8 text-right space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                        <span className="text-brand-orange text-xs font-bold uppercase">{project.category}</span>
                        <h3 className="text-2xl font-black text-white">{project.title}</h3>
                        <div className="flex justify-end gap-3 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button size="icon" className="rounded-full bg-white/10 hover:bg-white/20"><Play className="w-4 h-4 fill-current" /></Button>
                           <Button size="icon" className="rounded-full bg-white/10 hover:bg-white/20"><ExternalLink className="w-4 h-4" /></Button>
                        </div>
                     </div>
                   </motion.div>
                 </Link>
               ))}
             </AnimatePresence>
           </div>
           
           <div className="mt-20">
              <Button variant="outline" className="border-white/10 px-12 py-7 text-lg rounded-2xl hover:bg-white/5">تحميل المزيد</Button>
           </div>
        </div>
      </section>
    </main>
  )
}
