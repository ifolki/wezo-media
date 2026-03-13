'use client'

import { motion } from 'framer-motion'
import { Disc, Youtube, Music2, Share2, Mic2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RequestServiceModal from '@/components/shared/RequestServiceModal'

export default function ArtistsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1514525253361-bee8718a342b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark to-brand-dark" />
        
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mb-4"
          >
            <Disc className="w-12 h-12 animate-spin-slow" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter"
          >
             صوتك يوصل <span className="gradient-text">للعالم</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            من الإنتاج الموسيقي إلى التوزيع العالمي على جميع المنصات. نحن شريكك في رحلة النجومية.
          </p>
          <div className="pt-8">
            <RequestServiceModal>
              <Button size="lg" className="gradient-brand font-black px-12 py-8 text-xl rounded-2xl shadow-2xl">
                ابدأ رحلتك الآن
              </Button>
            </RequestServiceModal>
          </div>
        </div>
      </section>

      {/* Distribution Platforms */}
      <section className="py-24 bg-brand-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-white">وزع موسيقاك على أهم المنصات</h2>
            <p className="text-text-muted">نصل بأعمالك لأكثر من 150 منصة بث رقمي حول العالم</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Platform Icons Mockup */}
             <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center"><Share2 className="w-10 h-10" /></div>
                <span className="text-sm">Spotify</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center"><Music2 className="w-10 h-10" /></div>
                <span className="text-sm">Apple Music</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center"><Youtube className="w-10 h-10" /></div>
                <span className="text-sm">YouTube</span>
             </div>
          </div>
        </div>
      </section>

      {/* Artist Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-12">
                <div className="space-y-4">
                   <h2 className="text-5xl font-black text-white">إدارة المحتوى الرقمي</h2>
                   <p className="text-text-muted text-lg">نحن لا نقوم فقط بالتوزيع، بل ندير هويتك الرقمية بالكامل لضمان أقصى استفادة.</p>
                </div>
                
                <div className="space-y-8">
                   {[
                     { title: 'التوزيع الرقمي الشامل', desc: 'نشر الأغاني على سبوتيفاي، يوتيوب، أنغامي وغيرها بنقرة واحدة.' },
                     { title: 'التسويق الموسيقي', desc: 'حملات إعلانية مخصصة لزيادة نسب الاستماع والمتابعين.' },
                     { title: 'إدارة الحقوق الفنية', desc: 'حماية أعمالك وضمان حصولك على كامل عائدات البث.' },
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6 group">
                        <div className="w-14 h-14 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors">{item.title}</h4>
                           <p className="text-text-muted">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="relative">
                <div className="glass-card p-4 rounded-[3rem] animate-float">
                   <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600" className="rounded-[2.5rem]" />
                </div>
                <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-2xl border-brand-pink/20 glow-pink">
                   <div className="flex items-center gap-4">
                     <Mic2 className="w-10 h-10 text-brand-pink" />
                     <div>
                       <div className="text-2xl font-black text-white">+50</div>
                       <div className="text-sm text-text-muted">فنان وثقوا بنا</div>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
