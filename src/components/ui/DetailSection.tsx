import type { ReactNode } from 'react'

export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="detail-section">
      <h2 className="detail-section__title">{title}</h2>
      {children}
    </section>
  )
}

export function DetailList({ items, numbered }: { items: string[]; numbered?: boolean }) {
  return (
    <ul className={numbered ? 'list-numbered' : 'list-clean'}>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  )
}
