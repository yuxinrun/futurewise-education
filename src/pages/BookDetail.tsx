import { Link, useParams } from 'react-router-dom'
import { useSeo, breadcrumbJsonLd, bookJsonLd } from '../lib/seo'
import { getBook, relatedBooks } from '../lib/content'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { FavoriteButton, Callout, RelatedLink } from '../components/ui/Common'
import { DetailSection, DetailList } from '../components/ui/DetailSection'
import { BookCover } from '../components/ui/BookCover'
import { NotFound } from './NotFound'
import { Icon } from '../components/ui/Icon'

export function BookDetail() {
  const { slug } = useParams()
  const book = slug ? getBook(slug) : undefined
  useSeo({
    title: book ? `${book.chineseTitle || book.title} · 教育书籍` : '教育书籍',
    description: book?.summary,
    path: `/books/${slug}`,
    type: 'book',
    jsonLd: book
      ? [
          bookJsonLd({ title: book.title, author: book.author, description: book.summary, path: `/books/${slug}` }),
          breadcrumbJsonLd([{ name: '教育书籍', path: '/books' }, { name: book.chineseTitle || book.title, path: `/books/${slug}` }]),
        ]
      : undefined,
  })
  if (!book) return <NotFound />
  const related = relatedBooks(book.topics, 4).filter((b) => b.slug !== book.slug)

  return (
    <>
      <Breadcrumbs items={[{ label: '教育书籍', to: '/books' }, { label: book.chineseTitle || book.title }]} />
      <div className="container" style={{ paddingTop: 40, paddingBottom: 64 }}>
        <div className="book-detail-head">
          <div className="book-detail-head__cover">
            <BookCover book={book} />
          </div>
          <div>
            <div className="kicker" style={{ marginBottom: 12 }}>{book.category} · {book.country}</div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--forest)', lineHeight: 1.3, marginBottom: 8 }}>
              {book.chineseTitle || book.title}
            </h1>
            {book.chineseTitle && <p style={{ fontSize: 16, color: 'var(--ink-3)', fontStyle: 'italic', marginBottom: 12 }}>{book.originalTitle}</p>}
            <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 18 }}>{book.author}</p>
            <dl className="book-meta">
              <div><dt>原版书名</dt><dd>{book.originalTitle}</dd></div>
              <div><dt>出版年份</dt><dd>{book.year}</dd></div>
              <div><dt>出版社</dt><dd>{book.publisher}</dd></div>
              {book.chinesePublisher && <div><dt>中文版</dt><dd>{book.chinesePublisher}</dd></div>}
              <div><dt>阅读难度</dt><dd>{book.difficulty}</dd></div>
              <div><dt>适合读者</dt><dd>{book.audience}</dd></div>
            </dl>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
              <FavoriteButton id={`book:${book.slug}`} title={book.chineseTitle || book.title} route={`/books/${book.slug}`} type="book" />
              <Link to={`/knowledge-map?node=book:${book.slug}`} className="btn btn--ghost btn--sm">
                <Icon name="grid" size={15} /> 知识图谱
              </Link>
            </div>
            {!book.verified && book.verifyNote && (
              <Callout variant="blue" title="信息核实说明">{book.verifyNote}</Callout>
            )}
          </div>
        </div>

        <DetailSection title="核心观点">
          <DetailList items={book.core} />
        </DetailSection>
        <DetailSection title="主要内容">
          <p style={{ fontSize: 16.5, lineHeight: 1.95 }}>{book.summary}</p>
        </DetailSection>
        <div className="grid grid--2">
          <DetailSection title="值得思考的问题">
            <DetailList items={book.questions} numbered />
          </DetailSection>
          <DetailSection title="可实践的方法">
            <DetailList items={book.practices} />
          </DetailSection>
        </div>
        <DetailSection title="争议与局限">
          <DetailList items={book.critiques} />
          <Callout>任何一本书都有其视角与边界。结合多方证据与孩子实际情况判断，而非照单全收。</Callout>
        </DetailSection>
        <DetailSection title="相关主题">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {book.topics.map((t) => (
              <span key={t} className="tag tag--gold">{t}</span>
            ))}
          </div>
        </DetailSection>
        {book.sources.length > 0 && (
          <DetailSection title="参考资料">
            <ul className="list-clean">
              {book.sources.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
                      {s.label} <Icon name="external" size={13} />
                    </a>
                  ) : (
                    s.label
                  )}
                </li>
              ))}
            </ul>
          </DetailSection>
        )}
        {related.length > 0 && (
          <DetailSection title="相关书籍">
            <div className="grid grid--2">
              {related.map((b) => (
                <RelatedLink key={b.slug} to={`/books/${b.slug}`} label={b.chineseTitle || b.title} meta={b.author} />
              ))}
            </div>
          </DetailSection>
        )}
      </div>
    </>
  )
}
