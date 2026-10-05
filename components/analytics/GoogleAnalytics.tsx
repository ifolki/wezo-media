'use client'

import { useEffect, useRef, Suspense } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { GA_MEASUREMENT_ID, pageview } from '@/lib/analytics/gtag'

interface Props {
  locale?: string
}

function NavigationTracker({ locale }: { locale?: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstMount = useRef(true)

  useEffect(() => {
    // Skip initial mount because gtag('config') fires the initial page_view automatically
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    if (!pathname) return

    const queryString = searchParams?.toString()
    const fullUrl = queryString ? `${pathname}?${queryString}` : pathname

    pageview({
      url: fullUrl,
      title: typeof document !== 'undefined' ? document.title : '',
      locale: locale || (pathname.startsWith('/ar') ? 'ar' : pathname.startsWith('/fr') ? 'fr' : 'en'),
    })
  }, [pathname, searchParams, locale])

  return null
}

export default function GoogleAnalytics({ locale }: Props) {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* 1. Official Google Tag (gtag.js) Loader */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* 2. Official gtag Initialization & Initial Pageview Config */}
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              page_language: '${locale || "ar"}',
              send_page_view: true
            });
          `,
        }}
      />

      {/* 3. Next.js Client-Side Route Transition Tracker */}
      <Suspense fallback={null}>
        <NavigationTracker locale={locale} />
      </Suspense>
    </>
  )
}
