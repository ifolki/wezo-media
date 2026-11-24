import Image from 'next/image'
import { ArrowUpRight, Layers, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import { portfolioProjects, PortfolioProject } from '@/lib/config/portfolio'

interface Props {
  locale: string
}

const FEATURED_SLUGS = ['cabinet-dentaire', 'decoafrica', 'mangeo-app']

export default async function ProjectsSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home_v2.realisations' })
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  // Pick the 3 projects in order
  const projects = FEATURED_SLUGS.map((slug) =>
    portfolioProjects.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

  const getCategoryLabel = (project: PortfolioProject) => {
    if (isAr) return project.categoryLabelAr || project.category
    if (isFr) return project.categoryLabelFr || project.category
    return project.categoryLabelEn || project.category
  }

  const getHighlight = (project: PortfolioProject) => {
    if (isAr) return project.highlightAr
    if (isFr) return project.highlightFr
    return project.highlightEn
  }

  const getTags = (project: PortfolioProject): string[] => {
    if (isAr && project.tagsAr) return project.tagsAr
    if (isFr && project.tagsFr) return project.tagsFr
    return project.tags || []
  }

  return (
    <section
      aria-labelledby="projects-heading"
      className="py-18 lg:py-24 bg-brand-dark text-start relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="absolute end-0 top-1/3 w-[500px] h-[500px] bg-brand-orange/[0.04] blur-[150px] rounded-full pointer-events-none -z-10"
      />

      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-14 gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-secondary border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('badge')}</span>
            </div>

            <h2
              id="projects-heading"
              className={
                isAr
                  ? 'font-cairo font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-[1.3]'
                  : 'font-syne font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-tight'
              }
            >
              {t('title')}
            </h2>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
              {t('subtitle')}
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="h-11 px-5 rounded-xl border-white/12 bg-brand-secondary/80 hover:bg-brand-secondary hover:border-brand-orange/40 font-bold text-xs sm:text-sm group gap-2 text-text-primary"
              >
                <span>{t('view_all')}</span>
                <ArrowUpRight className="w-4 h-4 text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:group-hover:-translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Real Portfolio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-brand-secondary/85 border border-white/[0.08] hover:border-brand-orange/35 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_12px_32px_rgba(0,0,0,0.25)] flex flex-col justify-between h-full"
            >
              <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full">
                {/* Project Image using next/image for zero CLS & fast loading */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-brand-dark">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent opacity-80" />

                  {/* Category Pill Top Start */}
                  <div className="absolute top-4 start-4 z-10">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-text-primary bg-brand-dark/90 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                      <Layers className="w-3 h-3 text-brand-orange" />
                      {getCategoryLabel(project)}
                    </span>
                  </div>
                </div>

                {/* Content Card Body */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-brand-orange transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <div className="w-8 h-8 rounded-lg bg-brand-dark border border-white/10 flex items-center justify-center shrink-0 text-text-primary group-hover:bg-brand-orange group-hover:text-white transition-all">
                        <ArrowUpRight className="w-4 h-4 rtl:scale-x-[-1]" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
                      {getHighlight(project)}
                    </p>
                  </div>

                  {/* Service Deliverable Tags */}
                  <div className="pt-3.5 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {getTags(project).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-[11px] font-medium text-text-primary/80 bg-brand-dark/80 border border-white/[0.07] px-2.5 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
