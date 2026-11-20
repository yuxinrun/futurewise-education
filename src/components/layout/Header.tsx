import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { Icon } from '../ui/Icon'
import { categories } from '../../data/categories'

const primaryNav = [
  { to: '/future-2056', label: '未来 30 年' },
  { to: '/future-skills', label: '核心能力' },
  { to: '/child-development', label: '儿童发展' },
  { to: '/learning-science', label: '学习科学' },
  { to: '/ai-education', label: 'AI 教育' },
  { to: '/books', label: '书籍' },
  { to: '/tools', label: '工具箱' },
]

const mobileGroups = [
  {
    title: '研究栏目',
    links: categories.map((c) => ({ to: c.route, label: c.label })),
  },
  {
    title: '知识与工具',
    links: [
      { to: '/age-guides', label: '年龄阶段指南' },
      { to: '/articles', label: '深度文章' },
      { to: '/books', label: '教育书籍' },
      { to: '/resources', label: '全球资源' },
      { to: '/knowledge-map', label: '知识图谱' },
      { to: '/tools', label: '家庭工具箱' },
      { to: '/search', label: '全站搜索' },
    ],
  },
  {
    title: '关于',
    links: [
      { to: '/about', label: '关于我们' },
      { to: '/editorial-policy', label: '编辑原则' },
      { to: '/sources', label: '参考资料' },
      { to: '/privacy', label: '隐私说明' },
      { to: '/contact', label: '联系我们' },
    ],
  },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="Futurewise 首页">
          <Logo />
          <span className="brand__text">
            <span className="brand__name">Futurewise</span>
            <span className="brand__sub">未来教育研究所</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="主导航">
          {primaryNav.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/search" className="icon-btn" aria-label="搜索">
            <Icon name="search" size={18} />
          </Link>
          <Link to="/tools/strategy-map" className="icon-btn" aria-label="家庭教育战略地图" title="家庭教育战略地图">
            <Icon name="map" size={18} />
          </Link>
          <button className="icon-btn menu-toggle" onClick={() => setOpen((v) => !v)} aria-label="菜单" aria-expanded={open}>
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <nav className={`mobile-nav ${open ? 'open' : ''}`} aria-label="移动端导航">
        {mobileGroups.map((group) => (
          <div key={group.title}>
            <div className="mobile-nav__group">{group.title}</div>
            {group.links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </header>
  )
}
