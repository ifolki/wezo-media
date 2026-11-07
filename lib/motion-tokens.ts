import type { Variants, Transition } from 'framer-motion'

/**
 * WEZO MEDIA — Premium Tech Motion × Minimal Luxury
 * Centralized Motion System & Tokens
 */

export const MOTION_EASING = {
  /** Luxury out curve: crisp initial momentum with ultra-smooth deceleration (Darkroom / Lusion style) */
  luxuryOut: [0.16, 1, 0.3, 1] as const,
  /** Balanced smooth curve for continuous or bidirectional transitions */
  smoothInOut: [0.65, 0, 0.35, 1] as const,
  /** Crisp micro-interaction curve for hover & focus states */
  micro: [0.22, 1, 0.36, 1] as const,
}

export const MOTION_DURATION = {
  micro: 0.24,
  fast: 0.4,
  reveal: 0.68,
  slow: 0.9,
}

export const MOTION_TRANSITION = {
  reveal: {
    duration: MOTION_DURATION.reveal,
    ease: MOTION_EASING.luxuryOut,
  } satisfies Transition,
  fast: {
    duration: MOTION_DURATION.fast,
    ease: MOTION_EASING.luxuryOut,
  } satisfies Transition,
  micro: {
    duration: MOTION_DURATION.micro,
    ease: MOTION_EASING.micro,
  } satisfies Transition,
}

/**
 * Staggered container variants (respects reduced motion via instant children)
 */
export const createStaggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0.04,
  reducedMotion = false
): Variants => ({
  hidden: { opacity: reducedMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: reducedMotion
      ? { duration: 0 }
      : {
          staggerChildren,
          delayChildren,
        },
  },
})

/**
 * Vertical editorial reveal for headlines, badges, and paragraphs
 */
export const createFadeUpVariant = (
  yOffset = 22,
  duration = MOTION_DURATION.reveal,
  reducedMotion = false
): Variants => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    y: reducedMotion ? 0 : yOffset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotion
      ? { duration: 0 }
      : {
          duration,
          ease: MOTION_EASING.luxuryOut,
        },
  },
})

/**
 * Scale + depth reveal for Bento cards and interactive modules
 */
export const createCardRevealVariant = (
  index = 0,
  reducedMotion = false
): Variants => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    y: reducedMotion ? 0 : 28,
    scale: reducedMotion ? 1 : 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: reducedMotion
      ? { duration: 0 }
      : {
          duration: MOTION_DURATION.reveal,
          delay: index * 0.07,
          ease: MOTION_EASING.luxuryOut,
        },
  },
})
