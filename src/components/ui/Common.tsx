import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { useFavorites } from '../../lib/hooks'
import { cn } from '../../lib/utils'

export function Callout({
  title,
  children,
  variant = 'gold',
}: {
  title?: string
  children: ReactNode
  variant?: 'gold' | 'forest' | 'blue'
}) {
  return (
    <div className={cn('callout', variant === 'forest' && 'callout--forest', variant === 'blue' && 'callout--blue')}>
      {title && <div className="callout__title">{title}</div>}
      <div>{children}</div>
    </div>
  )
}

export function PageHero({
  kicker,
  title,
  desc,
  children,
}: {
  kicker: string
  title: string
  desc?: string
  children?: ReactNode
}) {
  return (
    <div className="page-hero">
      <div className="container">
        <div className="kicker page-hero__kicker">{kicker}</div>
        <h1>{title}</h1>
        {desc && <p className="page-hero__desc">{desc}</p>}
        {children && <div className="page-hero__meta">{children}</div>}
      </div>
    </div>
  )
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {tags.map((t) => (
        <span key={t} className="tag">
          {t}
        </span>
      ))}
    </div>
  )
}

export function FavoriteButton({ id, title, route, type }: { id: string; title: string; route: string; type: string }) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(id)
  return (
    <button
      className={cn('btn btn--sm', active ? 'btn--gold' : 'btn--ghost')}
      onClick={() => toggle({ id, title, route, type })}
      aria-pressed={active}
    >
      <Icon name="bookmark" size={15} />
      {active ? '已收藏' : '收藏'}
    </button>
  )
}

export function EmptyState({ title, desc, action }: { title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--forest)', marginBottom: 8 }}>{title}</p>
      {desc && <p style={{ fontSize: 14, marginBottom: action ? 18 : 0 }}>{desc}</p>}
      {action}
    </div>
  )
}

export function RelatedLink({ to, label, meta }: { to: string; label: string; meta?: string }) {
  return (
    <Link to={to} className="card card--flat" style={{ padding: '16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 15, color: 'var(--forest)' }}>{label}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-3)' }}>
          {meta}
          <Icon name="arrow-right" size={15} />
        </span>
      </div>
    </Link>
  )
}
