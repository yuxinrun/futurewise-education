import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'

interface Props {
  kicker: string
  title: string
  desc?: string
  more?: { to: string; label: string }
  children?: ReactNode
}

export function SectionHead({ kicker, title, desc, more, children }: Props) {
  return (
    <div className="section-head">
      <div className="section-head__left">
        <div className="kicker">{kicker}</div>
        <h2 className="section-title">{title}</h2>
        {desc && <p className="section-desc">{desc}</p>}
        {children}
      </div>
      {more && (
        <Link to={more.to} className="link-more">
          {more.label}
          <Icon name="arrow-right" size={16} />
        </Link>
      )}
    </div>
  )
}
