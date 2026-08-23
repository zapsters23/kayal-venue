import { useEffect } from 'react'

const SITE_URL = 'https://www.kayalthevenue.com'
const DEFAULT_IMAGE = `${SITE_URL}/kayal_hero_cinematic_1777883816287.png`

interface SEOConfig {
  title: string
  description: string
  path: string
  image?: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Keeps each client-rendered route's <title>, meta description, canonical
// URL and Open Graph/Twitter tags in sync since this SPA has no SSR/router
// head management of its own.
export function useSEO({ title, description, path, image }: SEOConfig) {
  useEffect(() => {
    const url = `${SITE_URL}${path === '/' ? '' : path}`
    const img = image || DEFAULT_IMAGE

    document.title = title
    setMeta('name', 'description', description)
    setCanonical(url)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'The Kayal Venue')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', img)
  }, [title, description, path, image])
}

export const PAGE_SEO: Record<string, Omit<SEOConfig, 'path'>> = {
  '/': {
    title: 'The Kayal Venue | Premium Wedding & Event Venue in Coimbatore',
    description:
      'Experience luxury and elegance at The Kayal Venue, Coimbatore. A premium outdoor lawn and banquet space for weddings, receptions and celebrations for up to 1000 guests.',
  },
  '/copy-of-home': {
    title: 'About Us | The Kayal Venue, Coimbatore',
    description:
      'Discover the story behind The Kayal Venue — a premium wedding and event venue in Coimbatore designed for unforgettable celebrations.',
  },
  '/spaces': {
    title: 'Our Spaces | The Kayal Venue, Coimbatore',
    description:
      'Explore Kayal Nila, Kayal Vizhi and Kayal Isai — our open-air lawn, banquet hall and guest accommodation spaces at The Kayal Venue, Coimbatore.',
  },
  '/services': {
    title: 'Services | The Kayal Venue, Coimbatore',
    description:
      'From weddings to corporate events, explore the services offered at The Kayal Venue — catering, decor, accommodation and event management in Coimbatore.',
  },
  '/faqs': {
    title: 'FAQs | The Kayal Venue, Coimbatore',
    description:
      'Answers to common questions about booking, capacity, catering and facilities at The Kayal Venue, a premium wedding and event venue in Coimbatore.',
  },
  '/gallery': {
    title: 'Gallery | The Kayal Venue, Coimbatore',
    description:
      'Browse photos and videos of weddings and celebrations hosted at The Kayal Venue, a premium outdoor and banquet space in Coimbatore.',
  },
  '/thank-you': {
    title: 'Thank You | The Kayal Venue, Coimbatore',
    description: 'Thank you for reaching out to The Kayal Venue. Our team will get back to you shortly.',
  },
}
