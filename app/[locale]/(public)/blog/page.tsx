'use client'

import { motion } from 'framer-motion'
import { Link } from '@/navigation'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

const posts = [
  { id: 1, title: 'كيف تختار الموزع الموسيقي المناسب؟', excerpt: 'دليل شامل للفنانين المستقلين حول كيفية اختيار المنصة المثالية لتوزيع أغانيهم عالمياً...', date: '12 مارس 2024', readTime: '5 دقائق', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'مستقبل التسويق الرقمي في 2024', excerpt: 'تعرف على أهم التوجهات التكنولوجية التي ستغير خارطة التسويق الإلكتروني في المنطقة العربية...', date: '10 مارس 2024', readTime: '8 دقائق', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'أهمية الهوية البصرية للشركات الناشئة', excerpt: 'لماذا تعتبر الهوية البصرية هي العمود الفقري لنجاح أي علامة تجارية في عصر المنافسة الشرسة؟', date: '5 مارس 2024', readTime: '6 دقائق', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600' },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen pb-20">
      <section className="py-20 bg-brand-secondary/30">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-6xl font-black text-white">المدونة</h1>
          <p className="text-xl text-text-muted">مقالات، أخبار، ونصائح من خبراء ويزو ميديا</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col h-full glass-card rounded-[2.5rem] overflow-hidden border-white/5 hover:border-brand-orange/20 transition-all"
              >
                <div className="h-64 overflow-hidden">
                   <img src={post.img} className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                </div>
                <div className="p-8 flex-grow flex flex-col space-y-4">
                   <div className="flex items-center gap-4 text-xs text-text-muted">
                      <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</div>
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</div>
                   </div>
                   <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors duration-300">
                      {post.title}
                   </h3>
                   <p className="text-text-muted leading-relaxed flex-grow">
                      {post.excerpt}
                   </p>
                   <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest pt-4 group/link">
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="w-5 h-5 transition-transform group-hover/link:-translate-x-2" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
