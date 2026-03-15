import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import BlogList from '@/components/public/BlogList'

interface BlogPageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })
  
  return {
    title: `${t('title')} | Wezo Media`,
    description: t('subtitle'),
    alternates: {
      languages: {
        'ar': '/ar/blog',
        'en': '/en/blog',
        'fr': '/fr/blog',
      }
    }
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })

  return (
    <main className="min-h-screen pb-20 bg-[#0A0A0F]">
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-pink/5 blur-[120px] rounded-full" />
        </div>

        <div className="container-custom text-center space-y-8">
          <div className="inline-block px-6 py-2 rounded-full glass-card border-brand-orange/20 text-brand-orange font-black text-sm uppercase tracking-widest">
            {t('badge')}
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-bold">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <BlogList />
        </div>
      </section>
    </main>
  )
}
