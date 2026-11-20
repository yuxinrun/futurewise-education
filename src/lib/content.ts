import { parseMarkdown } from './markdown'
import { readingMinutes, stripMarkdown } from './utils'
import type { Article, ArticleMeta, CategoryId, SearchItem } from '../types'
import { skills } from '../data/skills'
import { devTopics } from '../data/child-development'
import { ageGuides } from '../data/age-guides'
import { books } from '../data/books'
import { resources } from '../data/resources'
import { tools } from '../data/tools'
import { trends } from '../data/trends'
import { categories } from '../data/categories'

const articleFiles = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const trendFiles = import.meta.glob('../content/trends/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function buildArticle(raw: string, kind: Article['kind']): Article {
  const doc = parseMarkdown(raw)
  const meta = doc.meta as unknown as ArticleMeta
  const bodyText = stripMarkdown(doc.body)
  return {
    ...meta,
    tags: doc.tags,
    kind,
    body: doc.body,
    html: doc.html,
    toc: doc.toc,
    readingMinutes: meta.readingMinutes || readingMinutes(bodyText),
    route: kind === 'trend' ? `/future-2056/trends/${meta.slug}` : `/articles/${meta.slug}`,
  }
}

export const articles: Article[] = Object.values(articleFiles)
  .map((raw) => buildArticle(raw, 'article'))
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export const trendArticles: Article[] = Object.values(trendFiles)
  .map((raw) => buildArticle(raw, 'trend'))
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export const allDocs: Article[] = [...articles, ...trendArticles]

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
export const getTrend = (slug: string) => trendArticles.find((a) => a.slug === slug)

export const articlesByCategory = (category: CategoryId) => articles.filter((a) => a.category === category)

export const featuredArticles = articles.filter((a) => a.featured).slice(0, 6)

export const getSkill = (slug: string) => skills.find((s) => s.slug === slug)
export const getDevTopic = (slug: string) => devTopics.find((d) => d.slug === slug)
export const getAgeGuide = (slug: string) => ageGuides.find((g) => g.slug === slug)
export const getBook = (slug: string) => books.find((b) => b.slug === slug)
export const getResource = (slug: string) => resources.find((r) => r.slug === slug)
export const getTool = (slug: string) => tools.find((t) => t.slug === slug)

export const categoryLabel = (id: string) => categories.find((c) => c.id === id)?.label || id
export const categoryRoute = (id: string) => categories.find((c) => c.id === id)?.route || '/articles'

export const relatedArticles = (article: Article, count = 3) =>
  articles
    .filter((a) => a.slug !== article.slug && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, count)

export const relatedBooks = (topics: string[], count = 4) =>
  books.filter((b) => b.topics.some((t) => topics.includes(t)) || b.related.some((r) => topics.includes(r))).slice(0, count)

export const searchIndex: SearchItem[] = [
  ...allDocs.map((a) => ({
    id: `${a.kind}:${a.slug}`,
    title: a.title,
    summary: a.summary,
    type: a.kind,
    typeLabel: a.kind === 'trend' ? '未来趋势' : '深度文章',
    route: a.route,
    tags: a.tags,
    text: `${a.title} ${a.summary} ${a.tags.join(' ')} ${stripMarkdown(a.body).slice(0, 2400)}`,
  })),
  ...skills.map((s) => ({
    id: `skill:${s.slug}`,
    title: s.title,
    summary: s.summary,
    type: 'skill',
    typeLabel: '核心能力',
    route: `/future-skills/${s.slug}`,
    tags: [s.en, s.group],
    text: `${s.title} ${s.en} ${s.summary} ${s.definition} ${s.importance} ${s.family.join(' ')}`,
  })),
  ...devTopics.map((d) => ({
    id: `dev:${d.slug}`,
    title: d.title,
    summary: d.summary,
    type: 'dev',
    typeLabel: '儿童发展',
    route: `/child-development/${d.slug}`,
    tags: [d.en],
    text: `${d.title} ${d.en} ${d.summary} ${d.science} ${d.family.join(' ')}`,
  })),
  ...ageGuides.map((g) => ({
    id: `age:${g.slug}`,
    title: `${g.range} · ${g.title}`,
    summary: g.summary,
    type: 'age',
    typeLabel: '年龄指南',
    route: `/age-guides/${g.slug}`,
    tags: [g.range],
    text: `${g.range} ${g.title} ${g.summary} ${g.focus.join(' ')} ${g.tasks.join(' ')}`,
  })),
  ...books.map((b) => ({
    id: `book:${b.slug}`,
    title: b.title,
    summary: b.summary,
    type: 'book',
    typeLabel: '教育书籍',
    route: `/books/${b.slug}`,
    tags: [b.author, b.category],
    text: `${b.title} ${b.originalTitle} ${b.author} ${b.summary} ${b.core.join(' ')} ${b.topics.join(' ')}`,
  })),
  ...resources.map((r) => ({
    id: `resource:${r.slug}`,
    title: r.name,
    summary: r.why,
    type: 'resource',
    typeLabel: '全球资源',
    route: `/resources#${r.slug}`,
    tags: [r.country, r.type],
    text: `${r.name} ${r.en || ''} ${r.why} ${r.fields.join(' ')} ${r.reading.join(' ')}`,
  })),
  ...tools.map((t) => ({
    id: `tool:${t.slug}`,
    title: t.title,
    summary: t.summary,
    type: 'tool',
    typeLabel: '家庭工具',
    route: `/tools/${t.slug}`,
    tags: [t.en],
    text: `${t.title} ${t.en} ${t.summary} ${t.purpose}`,
  })),
  ...trends.map((t) => ({
    id: `topic:${t.slug}`,
    title: t.title,
    summary: t.summary,
    type: 'topic',
    typeLabel: '未来专题',
    route: `/future-2056/trends/${t.slug}`,
    tags: t.tags,
    text: `${t.title} ${t.summary} ${t.background}`,
  })),
]

export function searchContent(query: string, typeFilter = 'all'): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/).filter(Boolean)
  return searchIndex
    .filter((item) => typeFilter === 'all' || item.type === typeFilter)
    .map((item) => {
      const haystack = `${item.title} ${item.summary} ${item.tags.join(' ')} ${item.text}`.toLowerCase()
      let score = 0
      for (const term of terms) {
        if (item.title.toLowerCase().includes(term)) score += 12
        if (item.summary.toLowerCase().includes(term)) score += 6
        if (item.tags.join(' ').toLowerCase().includes(term)) score += 5
        const matches = haystack.split(term).length - 1
        score += Math.min(matches, 8)
      }
      return { item, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 40)
    .map((r) => r.item)
}

export const contentStats = {
  articles: articles.length,
  trends: trendArticles.length,
  skills: skills.length,
  devTopics: devTopics.length,
  ageGuides: ageGuides.length,
  books: books.length,
  resources: resources.length,
  tools: tools.length,
}
