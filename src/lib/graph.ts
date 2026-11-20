import { skills } from '../data/skills'
import { devTopics } from '../data/child-development'
import { ageGuides } from '../data/age-guides'
import { books } from '../data/books'
import { resources } from '../data/resources'
import { articles, trendArticles } from './content'

export interface GraphNode {
  id: string
  title: string
  type: string
  typeLabel: string
  route: string
  summary: string
}

export const typeColors: Record<string, string> = {
  skill: '#243C35',
  dev: '#6E91A5',
  book: '#B99A61',
  article: '#84978A',
  trend: '#3A3F3D',
  resource: '#2F4F45',
  age: '#9A7B4F',
}

const nodes = new Map<string, GraphNode>()
const edges = new Map<string, Set<string>>()

function addNode(n: GraphNode) {
  if (!nodes.has(n.id)) nodes.set(n.id, n)
}
function link(a: string, b: string) {
  if (!nodes.has(a) || !nodes.has(b) || a === b) return
  if (!edges.has(a)) edges.set(a, new Set())
  if (!edges.has(b)) edges.set(b, new Set())
  edges.get(a)!.add(b)
  edges.get(b)!.add(a)
}

for (const s of skills) addNode({ id: `skill:${s.slug}`, title: s.title, type: 'skill', typeLabel: '核心能力', route: `/future-skills/${s.slug}`, summary: s.summary })
for (const d of devTopics) addNode({ id: `dev:${d.slug}`, title: d.title, type: 'dev', typeLabel: '发展科学', route: `/child-development/${d.slug}`, summary: d.summary })
for (const g of ageGuides) addNode({ id: `age:${g.slug}`, title: `${g.range} ${g.title}`, type: 'age', typeLabel: '年龄指南', route: `/age-guides/${g.slug}`, summary: g.summary })
for (const b of books) addNode({ id: `book:${b.slug}`, title: b.chineseTitle || b.title, type: 'book', typeLabel: '教育书籍', route: `/books/${b.slug}`, summary: b.summary })
for (const r of resources) addNode({ id: `resource:${r.slug}`, title: r.name, type: 'resource', typeLabel: '全球资源', route: `/resources#${r.slug}`, summary: r.why })
for (const a of articles) addNode({ id: `article:${a.slug}`, title: a.title, type: 'article', typeLabel: '深度文章', route: a.route, summary: a.summary })
for (const t of trendArticles) addNode({ id: `trend:${t.slug}`, title: t.title, type: 'trend', typeLabel: '未来趋势', route: t.route, summary: t.summary })

for (const s of skills) {
  const id = `skill:${s.slug}`
  s.articles?.forEach((x) => link(id, `article:${x}`))
  s.books?.forEach((x) => link(id, `book:${x}`))
  s.devTopics?.forEach((x) => link(id, `dev:${x}`))
  s.resources?.forEach((x) => link(id, `resource:${x}`))
}
for (const d of devTopics) {
  const id = `dev:${d.slug}`
  d.skills?.forEach((x) => link(id, `skill:${x}`))
  d.articles?.forEach((x) => link(id, `article:${x}`))
  d.books?.forEach((x) => link(id, `book:${x}`))
  d.resources?.forEach((x) => link(id, `resource:${x}`))
}
for (const g of ageGuides) {
  const id = `age:${g.slug}`
  g.skills.forEach((x) => link(id, `skill:${x}`))
  g.devTopics.forEach((x) => link(id, `dev:${x}`))
  g.books.forEach((x) => link(id, `book:${x}`))
  g.articles.forEach((x) => link(id, `article:${x}`))
}
for (const b of books) {
  const id = `book:${b.slug}`
  for (const other of books) {
    if (other.slug === b.slug) continue
    if (b.topics.some((t) => other.topics.includes(t))) link(id, `book:${other.slug}`)
  }
}
for (const a of articles) {
  const id = `article:${a.slug}`
  for (const s of skills) {
    if (a.tags.some((t) => s.title.includes(t) || t.includes(s.title))) link(id, `skill:${s.slug}`)
  }
}

export const graphNodes = nodes
export const graphEdges = edges

export const neighborsOf = (id: string): GraphNode[] =>
  [...(edges.get(id) || [])].map((n) => nodes.get(n)!).filter(Boolean)

export const defaultCenter = 'skill:creativity'

export function resolveCenter(requested: string | null): string {
  if (requested && nodes.has(requested)) return requested
  if (nodes.has(defaultCenter)) return defaultCenter
  return nodes.keys().next().value || ''
}
