export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')

export const slugify = (input: string) =>
  input
    .trim()
    .toLowerCase()
    .replace(/[^\w一-龥\- ]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)

export const formatDate = (iso: string) => {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${y} 年 ${Number(m)} 月${d ? ` ${Number(d)} 日` : ''}`
}

export const readingMinutes = (text: string) => Math.max(3, Math.round(text.replace(/\s/g, '').length / 420))

export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const stripMarkdown = (md: string) =>
  md
    .replace(/^---[\s\S]*?---/, '')
    .replace(/[#>*_`|[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
