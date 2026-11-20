import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { PageHero, Callout } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { BookCover } from '../components/ui/BookCover'
import { books, bookCategories } from '../data/books'

export function Books() {
  const [cat, setCat] = useState('all')
  useSeo({
    title: '教育书籍',
    description: '经过核实的中外教育书籍库：儿童发展、学习科学、思维认知、AI 与未来、教育与社会。',
    path: '/books',
  })
  const list = cat === 'all' ? books : books.filter((b) => b.category === cat)
  return (
    <>
      <Breadcrumbs items={[{ label: '教育书籍' }]} />
      <PageHero
        kicker="BOOKS & RESOURCES"
        title="值得阅读的教育书籍"
        desc="不追逐书单数量，而是挑选经得起推敲的著作。每本书都核实作者与出版信息，说明核心观点、可实践方法、争议与局限。"
      />
      <section className="section">
        <div className="container">
          <Callout variant="blue" title="关于书籍信息">
            我们尽力核实书名、作者与出版信息；对无法确认的中文译名或版本会明确标注，不编造。封面为本站原创排版示意，非原版封面。
          </Callout>
          <div className="pill-tabs" style={{ marginTop: 28 }}>
            <button className={`pill-tab ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>
              全部（{books.length}）
            </button>
            {bookCategories.map((c) => (
              <button key={c} className={`pill-tab ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="book-grid">
            {list.map((b) => (
              <Link key={b.slug} to={`/books/${b.slug}`} className="book-item">
                <BookCover book={b} />
                <div className="book-item__title">{b.chineseTitle || b.title}</div>
                <div className="book-item__author">{b.author}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
