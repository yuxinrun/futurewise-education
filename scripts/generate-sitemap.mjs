import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://futurewise-education.github.io/futurewise-education/'
const ROOT = process.cwd()
const today = new Date().toISOString().slice(0, 10)

const escapeXml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  const meta = {}
  if (!m) return meta
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const k = line.slice(0, i).trim()
    let v = line.slice(i + 1).trim()
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1)
    meta[k] = v
  }
  return meta
}

function readDocs(dir) {
  const base = join(ROOT, 'src/content', dir)
  return readdirSync(base)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const meta = parseFrontmatter(readFileSync(join(base, f), 'utf8'))
      return { slug: meta.slug || f.replace(/\.md$/, ''), ...meta }
    })
}

function slugsFromData(file) {
  const t = readFileSync(join(ROOT, 'src/data', file), 'utf8')
  return [...t.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1])
}

const articles = readDocs('articles')
const trends = readDocs('trends')

const staticRoutes = [
  '/', '/future-2056', '/future-2056/trends', '/future-skills', '/child-development',
  '/family-education', '/learning-science', '/ai-education', '/future-school', '/career-life',
  '/books', '/resources', '/age-guides', '/articles', '/tools', '/knowledge-map', '/search',
  '/about', '/editorial-policy', '/sources', '/privacy', '/contact',
]

const urls = []
const add = (path, lastmod, priority = '0.6') =>
  urls.push({ loc: `${SITE_URL}#${path}`, lastmod: lastmod || today, priority })

staticRoutes.forEach((r) => add(r, today, r === '/' ? '1.0' : '0.8'))
articles.forEach((a) => add(`/articles/${a.slug}`, a.updated || a.date, '0.7'))
trends.forEach((t) => add(`/future-2056/trends/${t.slug}`, t.updated || t.date, '0.7'))
slugsFromData('skills.ts').forEach((s) => add(`/future-skills/${s}`, today, '0.6'))
slugsFromData('child-development.ts').forEach((s) => add(`/child-development/${s}`, today, '0.6'))
slugsFromData('age-guides.ts').forEach((s) => add(`/age-guides/${s}`, today, '0.6'))
slugsFromData('books.ts').forEach((s) => add(`/books/${s}`, today, '0.6'))
slugsFromData('tools.ts').forEach((s) => add(`/tools/${s}`, today, '0.5'))

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`

const rssArticles = [...articles]
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  .slice(0, 20)
const rssItems = rssArticles
  .map((a) => {
    const link = `${SITE_URL}#/articles/${a.slug}`
    const date = a.date ? new Date(a.date).toUTCString() : new Date().toUTCString()
    return `    <item>\n      <title>${escapeXml(a.title || a.slug)}</title>\n      <link>${escapeXml(link)}</link>\n      <guid isPermaLink="false">${escapeXml(link)}</guid>\n      <description>${escapeXml(a.summary || '')}</description>\n      <pubDate>${date}</pubDate>\n    </item>`
  })
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Futurewise · 未来教育研究所</title>
    <link>${escapeXml(SITE_URL)}</link>
    <atom:link href="${escapeXml(SITE_URL)}rss.xml" rel="self" type="application/rss+xml" />
    <description>为孩子规划未来，而不只是规划升学。面向未来 30 年的家庭教育、儿童成长与教育研究。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`

mkdirSync(join(ROOT, 'public'), { recursive: true })
writeFileSync(join(ROOT, 'public/sitemap.xml'), sitemap)
writeFileSync(join(ROOT, 'public/rss.xml'), rss)
console.log(`sitemap.xml: ${urls.length} URLs · rss.xml: ${rssArticles.length} items`)
