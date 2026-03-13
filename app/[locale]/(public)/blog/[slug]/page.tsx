import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Calendar, Tag, ArrowRight, ArrowLeft } from 'lucide-react'
import { Link } from '@/navigation'

interface BlogPostPageProps {
  params: {
    locale: string
    slug: string
  }
}

async function getPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { 
      slug,
      isPublished: true
    }
  })
  return post
}

async function getRelatedPosts(currentId: string) {
  return await prisma.blogPost.findMany({
    where: { 
      id: { not: currentId },
      isPublished: true
    },
    take: 3,
    orderBy: { publishedAt: 'desc' }
  })
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}

  const title = params.locale === 'ar' ? post.titleAr : (params.locale === 'fr' ? post.titleFr : post.titleEn)
  const description = params.locale === 'ar' ? post.excerptAr : (params.locale === 'fr' ? post.excerptFr : post.excerptEn)

  return {
    title: `${title} | Wezo Media Blog`,
    description: description || '',
    alternates: {
      languages: {
        'ar': `/ar/blog/${params.slug}`,
        'en': `/en/blog/${params.slug}`,
        'fr': `/fr/blog/${params.slug}`,
      }
    },
    openGraph: {
      title,
      description: description || '',
      images: post.coverImage ? [post.coverImage] : [],
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(post.id)
  const { locale } = params
  const isAr = locale === 'ar'

  const title = locale === 'ar' ? post.titleAr : (locale === 'fr' ? post.titleFr || post.titleEn : post.titleEn)
  const content = locale === 'ar' ? post.contentAr : (locale === 'fr' ? post.contentFr || post.contentEn : post.contentEn)
  const excerpt = locale === 'ar' ? post.excerptAr : (locale === 'fr' ? post.excerptFr || post.excerptEn : post.excerptEn)

  return (
    <main className="min-h-screen pb-20 bg-[#0A0A0F]">
      {/* Hero Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={post.coverImage || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200'} 
            className="w-full h-full object-cover blur-3xl opacity-20"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F]/80 to-[#0A0A0F]" />
        </div>

        <div className="container-custom relative z-10 text-center space-y-8">
           <Link 
             href="/blog" 
             className="inline-flex items-center gap-2 text-brand-orange font-black uppercase tracking-widest hover:opacity-80 transition-all"
           >
             {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
             {isAr ? 'العودة للمدونة' : 'Back to Blog'}
           </Link>

           <div className="flex flex-wrap items-center justify-center gap-6 text-text-muted font-bold text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-orange" />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              {post.tags.map(tag => (
                <div key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/10 uppercase tracking-tighter text-xs">
                  <Tag className="w-3 h-3 text-brand-pink" />
                  {tag}
                </div>
              ))}
           </div>

           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight max-w-5xl mx-auto">
             {title}
           </h1>

           {excerpt && (
             <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-bold italic">
               "{excerpt}"
             </p>
           )}
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32">
        <div className="container-custom max-w-4xl">
           <div className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden shadow-2xl p-4 md:p-8">
              <img 
                src={post.coverImage || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200'}
                className="w-full h-[500px] object-cover rounded-[2.5rem] shadow-2xl mb-16"
                alt={title}
              />

              <div className="px-4 md:px-12 prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-headings:text-white prose-p:text-text-muted prose-p:leading-relaxed prose-strong:text-brand-orange">
                <div 
                  className="whitespace-pre-wrap text-start leading-loose text-lg md:text-xl font-medium"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
           </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-32 border-t border-white/5 bg-white/[0.01]">
          <div className="container-custom space-y-16">
             <div className="flex items-center justify-between">
                <h2 className="text-4xl md:text-5xl font-black text-white">
                  {isAr ? 'مقالات قد تهمك' : 'Related Articles'}
                </h2>
                <Link href="/blog" className="text-brand-orange font-bold uppercase tracking-widest hover:opacity-80 flex items-center gap-2">
                  {isAr ? 'عرض الكل' : 'View All'}
                  {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {relatedPosts.map((rPost) => (
                  <Link 
                    key={rPost.id} 
                    href={`/blog/${rPost.slug}`}
                    className="group flex flex-col glass-card rounded-[2.5rem] border-white/5 hover:border-brand-orange/20 transition-all duration-500 overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                       <img 
                         src={rPost.coverImage || ''} 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                         alt=""
                       />
                    </div>
                    <div className="p-8 space-y-4">
                       <h4 className="text-xl font-black text-white group-hover:text-brand-orange transition-colors">
                         {locale === 'ar' ? rPost.titleAr : (locale === 'fr' ? rPost.titleFr || rPost.titleEn : rPost.titleEn)}
                       </h4>
                       <div className="text-sm text-text-muted font-bold flex items-center gap-2">
                         <Calendar className="w-4 h-4" />
                         {new Date(rPost.publishedAt || rPost.createdAt).toLocaleDateString(locale)}
                       </div>
                    </div>
                  </Link>
                ))}
             </div>
          </div>
        </section>
      )}
    </main>
  )
}
