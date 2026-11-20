import type { Book } from '../../types'

const themes = [
  { bg: '#243C35', accent: '#B99A61' },
  { bg: '#2F4F45', accent: '#EEECE3' },
  { bg: '#6E91A5', accent: '#F8F7F2' },
  { bg: '#84978A', accent: '#243C35' },
  { bg: '#B99A61', accent: '#243C35' },
  { bg: '#3A3F3D', accent: '#B99A61' },
]

export function BookCover({ book, small = false }: { book: Book; small?: boolean }) {
  const theme = themes[book.coverTheme % themes.length]
  return (
    <div className="book-cover" style={{ background: theme.bg, color: theme.accent }} role="img" aria-label={`${book.title} 封面`}>
      <div className="book-cover__cat" style={{ color: theme.accent }}>
        {book.category}
      </div>
      <div>
        <div className="book-cover__rule" style={{ background: theme.accent }} />
        <div className="book-cover__title" style={{ fontSize: small ? 14 : undefined, color: theme.accent }}>
          {book.title}
        </div>
        {book.originalTitle !== book.title && (
          <div style={{ fontSize: 10, opacity: 0.75, marginTop: 6, lineHeight: 1.4 }}>{book.originalTitle}</div>
        )}
      </div>
      <div className="book-cover__author" style={{ borderColor: `${theme.accent}55`, color: theme.accent }}>
        {book.author}
      </div>
    </div>
  )
}
