import { Link } from 'react-router-dom'
import type { CategoryId } from '../types'
import { useSeo, breadcrumbJsonLd } from '../lib/seo'
import { articlesByCategory, relatedBooks } from '../lib/content'
import { categories } from '../data/categories'
import { columnTopics, columnNotes } from '../data/column-topics'
import { PageHero, Callout, EmptyState } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { SectionHead } from '../components/ui/SectionHead'
import { ArticleRow } from '../components/ui/ArticleBits'
import { BookCover } from '../components/ui/BookCover'
import { FamilyEcosystemIllustration, LearningScienceIllustration, AiCollaborationIllustration, KnowledgeAbilityIllustration } from '../components/illustrations/Illustrations'
import { GlobalSystemsChart } from '../components/charts/Charts'

const visuals: Record<string, React.ReactNode> = {
  'family-education': <FamilyEcosystemIllustration />,
  'learning-science': <LearningScienceIllustration />,
  'ai-education': <AiCollaborationIllustration />,
  'future-school': <GlobalSystemsChart />,
  'career-life': <KnowledgeAbilityIllustration />,
}

export function TopicPage({ category }: { category: CategoryId }) {
  const cat = categories.find((c) => c.id === category)!
  const list = articlesByCategory(category)
  const topics = columnTopics[category] || []
  const books = relatedBooks(topics, 4)
  useSeo({
    title: cat.label,
    description: cat.description,
    path: cat.route,
    jsonLd: breadcrumbJsonLd([{ name: cat.label, path: cat.route }]),
  })

  return (
    <>
      <Breadcrumbs items={[{ label: cat.label }]} />
      <PageHero kicker={cat.en} title={cat.label} desc={cat.description} />
      <section className="section">
        <div className="container">
          <div className="split-feature" style={{ marginBottom: 48 }}>
            <div className="split-feature__visual">{visuals[category]}</div>
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--forest)', marginBottom: 14 }}>
                {cat.kicker}
              </h2>
              <p style={{ lineHeight: 1.95, color: 'var(--ink-2)', marginBottom: 18 }}>{columnNotes[category]}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {topics.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <SectionHead kicker="ARTICLES" title="深度文章" desc={`围绕${cat.label}的长期思考与实践方法。`} />
          {list.length ? (
            <div>
              {list.map((a, i) => (
                <ArticleRow key={a.slug} article={a} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState title="本栏目文章正在建设中" desc="我们正在撰写高质量深度内容，欢迎先浏览其他栏目与书籍资源。" action={<Link to="/articles" className="btn btn--ghost btn--sm">浏览全部文章</Link>} />
          )}

          {books.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <SectionHead kicker="BOOKS" title="相关书籍" more={{ to: '/books', label: '全部书籍' }} />
              <div className="book-grid">
                {books.map((b) => (
                  <Link key={b.slug} to={`/books/${b.slug}`} className="book-item">
                    <BookCover book={b} small />
                    <div className="book-item__title">{b.chineseTitle || b.title}</div>
                    <div className="book-item__author">{b.author}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Callout variant="forest" title="编辑原则">
            本栏目内容区分科学证据、专家观点与经验判断，不制造焦虑，不宣称某种路径保证成功。详见
            <Link to="/editorial-policy" style={{ color: 'var(--gold)', textDecoration: 'underline' }}> 内容编辑与审核原则</Link>。
          </Callout>
        </div>
      </section>
    </>
  )
}
