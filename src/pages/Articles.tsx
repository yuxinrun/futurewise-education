import { useState } from 'react'
import { useSeo } from '../lib/seo'
import { PageHero } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { ArticleRow } from '../components/ui/ArticleBits'
import { articles } from '../lib/content'
import { categories } from '../data/categories'

export function Articles() {
  const [filter, setFilter] = useState('all')
  useSeo({ title: '深度文章', description: '面向未来教育的深度文章：有深度、有依据、有现实操作价值。', path: '/articles' })
  const list = filter === 'all' ? articles : articles.filter((a) => a.category === filter)
  return (
    <>
      <Breadcrumbs items={[{ label: '深度文章' }]} />
      <PageHero kicker="Long Reads" title="深度文章" desc="不贩卖焦虑，不鼓吹内卷，不制造成功学。每篇文章都尽量提供证据、实践与局限。" />
      <section className="section">
        <div className="container">
          <div className="pill-tabs">
            <button className={`pill-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              全部（{articles.length}）
            </button>
            {categories.map((c) => {
              const count = articles.filter((a) => a.category === c.id).length
              if (!count) return null
              return (
                <button key={c.id} className={`pill-tab ${filter === c.id ? 'active' : ''}`} onClick={() => setFilter(c.id)}>
                  {c.label}（{count}）
                </button>
              )
            })}
          </div>
          <div>
            {list.map((a, i) => (
              <ArticleRow key={a.slug} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
