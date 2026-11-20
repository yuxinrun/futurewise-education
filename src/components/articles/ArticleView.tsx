import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Article } from '../../types'
import { useSeo, articleJsonLd, breadcrumbJsonLd } from '../../lib/seo'
import { useRecent, useActiveHeading, useScrollProgress } from '../../lib/hooks'
import { categoryLabel, categoryRoute, relatedArticles, relatedBooks } from '../../lib/content'
import { formatDate } from '../../lib/utils'
import { Breadcrumbs } from '../ui/Breadcrumbs'
import { FavoriteButton, TagList, Callout } from '../ui/Common'
import { ArticleCard } from '../ui/ArticleBits'
import { BookCover } from '../ui/BookCover'
import { Icon } from '../ui/Icon'

export function ArticleView({ article }: { article: Article }) {
  const progress = useScrollProgress()
  const active = useActiveHeading(article.toc.map((t) => t.id))
  const { push } = useRecent()

  useEffect(() => {
    push({ id: `${article.kind}:${article.slug}`, title: article.title, route: article.route, type: article.kind })
  }, [article.slug])

  const isTrend = article.kind === 'trend'
  const catLabel = isTrend ? '未来趋势' : categoryLabel(article.category)
  const catRoute = isTrend ? '/future-2056/trends' : categoryRoute(article.category)

  useSeo({
    title: article.title,
    description: article.summary,
    path: article.route,
    type: 'article',
    jsonLd: [
      articleJsonLd({ title: article.title, description: article.summary, path: article.route, date: article.date, updated: article.updated }),
      breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: catLabel, path: catRoute },
        { name: article.title, path: article.route },
      ]),
    ],
  })

  const related = relatedArticles(article, 3)
  const books = relatedBooks(article.tags, 3)

  return (
    <>
      <div className="reading-progress" style={{ width: `${progress * 100}%` }} />
      <Breadcrumbs items={[{ label: catLabel, to: catRoute }, { label: article.title }]} />
      <div className="container">
        <header className="article-header">
          <div className="kicker">{catLabel}</div>
          <h1>{article.title}</h1>
          <p className="article-header__summary">{article.summary}</p>
          <div className="article-meta">
            <span>发布 {formatDate(article.date)}</span>
            <span>最后核查 {formatDate(article.updated)}</span>
            <span>{article.readingMinutes} 分钟阅读</span>
            {article.evidence && <span className="tag tag--gold">{article.evidence}</span>}
          </div>
          <div className="article-actions">
            <FavoriteButton id={`${article.kind}:${article.slug}`} title={article.title} route={article.route} type={article.kind} />
            <Link to="/search" className="btn btn--ghost btn--sm">
              <Icon name="search" size={15} />
              搜索相关内容
            </Link>
          </div>
        </header>

        <div className="article-layout">
          <article>
            <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
            <hr className="divider" />
            <TagList tags={article.tags} />
            <Callout title="编辑说明" variant="forest">
              本文区分科学证据、专家观点与情景推断，不构成对个体发展的诊断或保证。涉及心理健康与发展障碍等专业问题，请咨询合格专业人员。内容最后核查日期：{formatDate(article.updated)}。
            </Callout>
          </article>

          <aside className="article-aside">
            {article.toc.length > 0 && (
              <nav className="toc" aria-label="文章目录">
                <div className="toc__title">目录</div>
                {article.toc.map((t) => (
                  <a key={t.id} href={`#${t.id}`} className={active === t.id ? 'active' : ''} onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}>
                    {t.text}
                  </a>
                ))}
              </nav>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-section__title">延伸阅读</h2>
            <div className="related-grid">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {books.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-section__title">相关书籍</h2>
            <div className="book-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 560 }}>
              {books.map((b) => (
                <Link key={b.slug} to={`/books/${b.slug}`} className="book-item">
                  <BookCover book={b} small />
                  <div className="book-item__title">{b.title}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
