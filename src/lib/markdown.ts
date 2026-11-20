import { marked } from 'marked'
import type { TocItem } from '../types'

marked.setOptions({ gfm: true, breaks: false })

export interface ParsedDoc {
  meta: Record<string, string>
  tags: string[]
  body: string
  html: string
  toc: TocItem[]
}

const parseFrontmatter = (raw: string) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  if (!match) return { meta: {} as Record<string, string>, body: raw.trim() }
  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
    meta[key] = value
  }
  return { meta, body: raw.slice(match[0].length).trim() }
}

const parseTags = (value: string | undefined) =>
  (value || '')
    .replace(/^\[|\]$/g, '')
    .split(/[,，]/)
    .map((t) => t.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean)

export function parseMarkdown(raw: string): ParsedDoc {
  const { meta, body } = parseFrontmatter(raw)
  const tags = parseTags(meta.tags)

  const toc: TocItem[] = []
  let headingIndex = 0
  const html = marked.parse(body) as string
  const withIds = html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/g, (_m, tag: string, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim()
    const depth = Number(tag.slice(1))
    const id = `sec-${headingIndex++}`
    if (depth === 2) toc.push({ id, text, depth })
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`
  })

  return { meta, tags, body, html: withIds, toc }
}

export function escapeHtml(input: string) {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
