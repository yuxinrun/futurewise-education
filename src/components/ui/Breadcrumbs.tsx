import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs container" aria-label="面包屑">
      <Link to="/">首页</Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span className="breadcrumbs__sep">/</span>
          {item.to && i < items.length - 1 ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span className="breadcrumbs__current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
