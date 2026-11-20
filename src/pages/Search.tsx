import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { searchContent, contentStats } from '../lib/content'
import { useRecent } from '../lib/hooks'
import { PageHero, EmptyState } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Icon } from '../components/ui/Icon'

const types = [
  { id: 'all', label: '全部' },
  { id: 'article', label: '文章' },
  { id: 'trend', label: '趋势' },
  { id: 'skill', label: '能力' },
  { id: 'dev', label: '发展' },
  { id: 'book', label: '书籍' },
  { id: 'age', label: '年龄' },
  { id: 'resource', label: '资源' },
  { id: 'tool', label: '工具' },
]

export function Search() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [type, setType] = useState('all')
  const { recent } = useRecent()
  useSeo({ title: '全站搜索', description: '搜索 Futurewise 的文章、趋势、能力、书籍与资源。', path: '/search' })

  const results = searchContent(query, type)
  const submit = (q: string) => {
    setQuery(q)
    setParams(q ? { q } : {})
  }

  return (
    <>
      <Breadcrumbs items={[{ label: '全站搜索' }]} />
      <PageHero kicker="SEARCH" title="全站搜索" desc={`本地索引覆盖 ${contentStats.articles + contentStats.trends} 篇文章、${contentStats.skills} 项能力、${contentStats.books} 本书与 ${contentStats.resources} 个机构资源。`} />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="search-bar">
            <input
              className="search-input"
              placeholder="输入关键词，如：创造力、阅读、AI、青春期…"
              value={query}
              autoFocus
              onChange={(e) => submit(e.target.value)}
            />
          </div>
          <div className="pill-tabs">
            {types.map((t) => (
              <button key={t.id} className={`pill-tab ${type === t.id ? 'active' : ''}`} onClick={() => setType(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          {query.trim() ? (
            results.length ? (
              <div>
                <p className="form-hint" style={{ marginBottom: 8 }}>找到 {results.length} 条结果</p>
                {results.map((r) => (
                  <Link key={r.id} to={r.route} className="search-result">
                    <div className="search-result__type">{r.typeLabel}</div>
                    <div className="search-result__title" style={{ fontFamily: 'var(--serif)' }}>{r.title}</div>
                    <p className="search-result__desc">{r.summary}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState title="没有匹配的结果" desc="试试更短的关键词，或切换分类。" />
            )
          ) : (
            <div>
              {recent.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <div className="kicker" style={{ marginBottom: 12 }}>最近阅读</div>
                  <div className="record-list">
                    {recent.slice(0, 6).map((r) => (
                      <Link key={r.id} to={r.route} className="record-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="record-item__title">{r.title}</span>
                        <Icon name="arrow-right" size={15} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <EmptyState title="输入关键词开始搜索" desc="搜索完全在本地完成，不上传任何数据。" />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
