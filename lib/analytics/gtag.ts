/**
 * Google Analytics 4 (GA4) Centralized Tracking Architecture
 * WEZO MEDIA (https://www.wezo.media)
 * Measurement ID: G-H1MH0L852Q
 * 
 * Strict Privacy Guidelines:
 * - NO Personal Identifiable Information (PII) is ever sent to GA4 (no emails, names, phone numbers, or free-text messages).
 * - Safe environment handling: events are logged to console in development unless NEXT_PUBLIC_GA_DEBUG=true.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-H1MH0L852Q'
const IS_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === 'true'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// Extend window object for dataLayer and gtag
declare global {
  interface Window {
    dataLayer: any[]
    gtag?: (...args: any[]) => void
  }
}

/**
 * Core event dispatcher
 */
export const event = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window === 'undefined') return

  const cleanParams: Record<string, any> = { ...params }

  if (IS_DEBUG) {
    cleanParams.debug_mode = true
  }

  // In development, log for verification
  if (!IS_PRODUCTION) {
    console.log(`%c[GA4 Event] ${eventName}`, 'color: #ff6b2b; font-weight: bold;', cleanParams)
  }

  // Send to GA4 if gtag is available
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, cleanParams)
  } else if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...cleanParams,
    })
  }
}

/**
 * Client-side Route Pageview Dispatcher
 * Triggered on client-side route transitions in Next.js App Router
 */
export const pageview = ({
  url,
  title,
  locale,
}: {
  url: string
  title?: string
  locale?: string
}) => {
  if (typeof window === 'undefined') return

  const pageTitle = title || (typeof document !== 'undefined' ? document.title : '')
  const pageLocation = typeof window !== 'undefined' ? window.location.href : url

  if (!IS_PRODUCTION) {
    console.log(`%c[GA4 Pageview] ${url}`, 'color: #10b981; font-weight: bold;', {
      page_path: url,
      page_title: pageTitle,
      page_language: locale || 'ar',
    })
  }

  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: pageTitle,
      page_location: pageLocation,
      page_language: locale || 'ar',
      ...(IS_DEBUG ? { debug_mode: true } : {}),
    })
  }
}

/* ==========================================================================
   BUSINESS CONVERSION EVENTS (HIGH-VALUE INTENT & LEAD ACTIONS)
   ========================================================================== */

/**
 * 1. WhatsApp Click Event (click_whatsapp)
 * Captured when a visitor clicks any WhatsApp CTA or support trigger
 */
export const trackWhatsAppClick = ({
  ctaLocation,
  service,
  pagePath,
  locale,
}: {
  ctaLocation: string
  service?: string
  pagePath?: string
  locale?: string
}) => {
  event('click_whatsapp', {
    event_category: 'engagement',
    cta_location: ctaLocation,
    service_name: service || 'general',
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    page_language: locale || 'ar',
  })
}

/**
 * 2. Direct Phone Call Click Event (click_phone)
 * Captured when a visitor clicks a direct call link
 */
export const trackPhoneClick = ({
  ctaLocation,
  pagePath,
  locale,
}: {
  ctaLocation: string
  pagePath?: string
  locale?: string
}) => {
  event('click_phone', {
    event_category: 'engagement',
    cta_location: ctaLocation,
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    page_language: locale || 'ar',
  })
}

/**
 * 3. Form Interaction Start Event (start_form)
 * Captured on the first user input / step in any lead or quote form
 */
export const trackFormStart = ({
  formId,
  formName,
  pagePath,
  locale,
}: {
  formId: string
  formName?: string
  pagePath?: string
  locale?: string
}) => {
  event('start_form', {
    event_category: 'form_funnel',
    form_id: formId,
    form_name: formName || formId,
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    page_language: locale || 'ar',
  })
}

/**
 * 4. Lead Submission Event (submit_lead)
 * CRITICAL CONVERSION: Only fires after successful HTTP 200 response from backend
 * ZERO PII: Does NOT send name, phone, email, or user text
 */
export const trackLeadSubmit = ({
  formId,
  serviceInterest,
  budgetTier,
  pagePath,
  locale,
}: {
  formId: string
  serviceInterest?: string
  budgetTier?: string
  pagePath?: string
  locale?: string
}) => {
  event('submit_lead', {
    event_category: 'conversion',
    form_id: formId,
    service_interest: serviceInterest || 'general',
    budget_tier: budgetTier || 'unspecified',
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    page_language: locale || 'ar',
  })
}

/**
 * 5. Request Quote CTA Click (request_quote)
 * Captured when visitor clicks a primary quote / consultation CTA button
 */
export const trackRequestQuote = ({
  ctaLocation,
  serviceName,
  pagePath,
  locale,
}: {
  ctaLocation: string
  serviceName?: string
  pagePath?: string
  locale?: string
}) => {
  event('request_quote', {
    event_category: 'cta_click',
    cta_location: ctaLocation,
    service_name: serviceName || 'general',
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    page_language: locale || 'ar',
  })
}

/**
 * 6. Service / Solution View Event (view_service)
 * Captured when a visitor accesses a specific service or growth sector page
 */
export const trackServiceView = ({
  serviceName,
  serviceSlug,
  pagePath,
  locale,
}: {
  serviceName: string
  serviceSlug?: string
  pagePath?: string
  locale?: string
}) => {
  event('view_service', {
    event_category: 'content_view',
    service_name: serviceName,
    service_slug: serviceSlug || '',
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    page_language: locale || 'ar',
  })
}
