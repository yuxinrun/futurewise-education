import { useParams } from 'react-router-dom'
import { getTrend } from '../lib/content'
import { ArticleView } from '../components/articles/ArticleView'
import { NotFound } from './NotFound'

export function TrendDetail() {
  const { slug } = useParams()
  const article = slug ? getTrend(slug) : undefined
  if (!article) return <NotFound />
  return <ArticleView article={article} />
}
