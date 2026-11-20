export type CategoryId =
  | 'future-2056'
  | 'future-skills'
  | 'child-development'
  | 'family-education'
  | 'learning-science'
  | 'ai-education'
  | 'future-school'
  | 'career-life'

export interface ArticleMeta {
  title: string
  slug: string
  category: CategoryId
  summary: string
  date: string
  updated: string
  tags: string[]
  featured?: boolean
  readingMinutes?: number
  evidence?: string
  cover?: string
  author?: string
}

export interface TocItem {
  id: string
  text: string
  depth: number
}

export interface Article extends ArticleMeta {
  kind: 'article' | 'trend'
  body: string
  html: string
  toc: TocItem[]
  route: string
}

export interface StagePractice {
  stage: string
  practice: string
}

export interface Skill {
  slug: string
  title: string
  en: string
  group: string
  summary: string
  definition: string
  importance: string
  foundation: string
  ages: StagePractice[]
  family: string[]
  school: string[]
  myths: string[]
  assessment: string[]
  articles?: string[]
  books?: string[]
  resources?: string[]
  devTopics?: string[]
}

export interface DevTopic {
  slug: string
  title: string
  en: string
  summary: string
  science: string
  evidence: string
  stages: StagePractice[]
  family: string[]
  signals: string[]
  cautions: string[]
  myths: string[]
  skills?: string[]
  articles?: string[]
  books?: string[]
  resources?: string[]
}

export interface AgeGuide {
  slug: string
  range: string
  title: string
  subtitle: string
  summary: string
  tasks: string[]
  focus: string[]
  avoid: string[]
  environment: string[]
  reading: { title: string; note: string }[]
  activities: string[]
  observe: string[]
  myths: string[]
  skills: string[]
  devTopics: string[]
  books: string[]
  articles: string[]
}

export interface Book {
  slug: string
  title: string
  originalTitle: string
  author: string
  year: string
  publisher: string
  chineseTitle?: string
  chinesePublisher?: string
  category: string
  country: string
  verified: boolean
  verifyNote?: string
  coverTheme: number
  core: string[]
  summary: string
  questions: string[]
  audience: string
  difficulty: string
  practices: string[]
  critiques: string[]
  topics: string[]
  related: string[]
  sources: { label: string; url?: string }[]
}

export interface ResourceItem {
  slug: string
  name: string
  en?: string
  type: string
  country: string
  fields: string[]
  why: string
  reading: string[]
  url?: string
  urlVerified: boolean
  note?: string
}

export type ToolKind = 'records' | 'matrix' | 'reference'

export interface ToolField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'number' | 'date'
  options?: string[]
  placeholder?: string
  hint?: string
}

export interface ToolDef {
  slug: string
  title: string
  en: string
  summary: string
  purpose: string
  limits: string[]
  kind: ToolKind
  fields?: ToolField[]
  accent: number
}

export interface TimelineNode {
  year: number
  phase: string
  title: string
  world: string
  education: string
  family: string
  uncertainty: string
  tags: string[]
}

export interface StrategyDimension {
  slug: string
  title: string
  en: string
  goal: string
  why: string
  year: string[]
  quarter: string[]
  week: string[]
  indicators: string[]
  skills: string[]
  articles: string[]
}

export interface WeeklyNote {
  slug: string
  issue: number
  date: string
  title: string
  question: string
  body: string[]
  action: string
  related?: { label: string; to: string }[]
}

export interface SearchItem {
  id: string
  title: string
  summary: string
  type: string
  typeLabel: string
  route: string
  tags: string[]
  text: string
}
