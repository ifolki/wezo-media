import { getPortfolioStructuredData } from '@/lib/seo/portfolio-metadata'

interface Props {
  slug: string
  locale: string
}

export function PortfolioJsonLd({ slug, locale }: Props) {
  const schema = getPortfolioStructuredData(slug, locale)
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
