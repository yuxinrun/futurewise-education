import { Link } from 'react-router-dom'
import type { Article } from '../../types'
import { categoryLabel } from '../../lib/content'
import { formatDate } from '../../lib/utils'

export function ArticleRow({ article, index }: { article: Article; index?: number }) {
  return (
    <article className="article-row">
      {index !== undefined && <div className="article-row__num">{String(index + 1).padStart(2, '0')}</div>}
      <div>
        <div className="meta" style={{ marginBottom: 6 }}>
          {categoryLabel(article.category)}
        </div>
        <h3 className="article-row__title">
          <Link to={article.route}>{article.title}</Link>
        </h3>
        <p className="article-row__desc">{article.summary}</p>
      </div>
      <div className="article-row__meta">
        <div>{formatDate(article.date)}</div>
        <div>{article.readingMinutes} 分钟</div>
      </div>
    </article>
  )
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card">
      <div className="card__kicker">{categoryLabel(article.category)}</div>
      <h3 className="card__title">
        <Link to={article.route}>{article.title}</Link>
      </h3>
      <p className="card__desc">{article.summary}</p>
      <div className="card__foot">
        <span>{formatDate(article.date)}</span>
        <span>{article.readingMinutes} 分钟阅读</span>
      </div>
    </article>
  )
}
