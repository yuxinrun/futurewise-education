import { useParams } from 'react-router-dom'
import { getArticle } from '../lib/content'
import { ArticleView } from '../components/articles/ArticleView'
import { NotFound } from './NotFound'

export function ArticleDetail() {
  const { slug } = useParams()
  const article = slug ? getArticle(slug) : undefined
  if (!article) return <NotFound />
  return <ArticleView article={article} />
}
