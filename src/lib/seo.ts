import { useEffect } from 'react'

export const SITE_NAME = 'Futurewise · 未来教育研究所'
export const SITE_URL = 'https://futurewise-education.github.io/futurewise-education/'

interface SeoOptions {
  title: string
  description?: string
  path?: string
  type?: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSeo({ title, description, path = '/', type = 'website', image, jsonLd }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
    document.title = fullTitle
    const desc = description || '面向未来 30 年的家庭教育规划、儿童成长与教育研究知识平台。'
    const url = `${SITE_URL}#${path}`
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    if (image) {
      setMeta('property', 'og:image', image)
      setMeta('name', 'twitter:image', image)
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    const scriptId = 'futurewise-jsonld'
    document.getElementById(scriptId)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = scriptId
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [title, description, path, type, image, JSON.stringify(jsonLd)])
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'Futurewise',
  url: SITE_URL,
  inLanguage: 'zh-CN',
  description: '面向未来 30 年的家庭教育规划、儿童成长与教育研究知识平台。',
}

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}#${item.path}`,
  })),
})

export const articleJsonLd = (opts: { title: string; description: string; path: string; date: string; updated: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: opts.title,
  description: opts.description,
  inLanguage: 'zh-CN',
  datePublished: opts.date,
  dateModified: opts.updated,
  mainEntityOfPage: `${SITE_URL}#${opts.path}`,
  author: { '@type': 'Organization', name: 'Futurewise 未来教育研究所' },
  publisher: { '@type': 'Organization', name: 'Futurewise 未来教育研究所' },
})

export const bookJsonLd = (opts: { title: string; author: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: opts.title,
  author: { '@type': 'Person', name: opts.author },
  description: opts.description,
  inLanguage: 'zh-CN',
  url: `${SITE_URL}#${opts.path}`,
})
