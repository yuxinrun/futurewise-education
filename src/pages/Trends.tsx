import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { PageHero } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { trends } from '../data/trends'
import { trendArticles } from '../lib/content'
import { Icon } from '../components/ui/Icon'

export function Trends() {
  useSeo({ title: '未来趋势研究', description: '15 个未来 30 年趋势专题：AI 社会、未来工作、未来教育、未来城市等。', path: '/future-2056/trends' })
  return (
    <>
      <Breadcrumbs items={[{ label: '未来 30 年', to: '/future-2056' }, { label: '未来趋势' }]} />
      <PageHero kicker="Trend Research" title="未来趋势专题" desc="每个专题区分事实、趋势、推断与情景，并讨论对儿童教育的影响与家庭可以做什么。" />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {trends.map((t) => {
              const doc = trendArticles.find((a) => a.slug === t.slug)
              return (
                <Link key={t.slug} to={`/future-2056/trends/${t.slug}`} className="card card--link">
                  <div className="card__kicker">{t.en}</div>
                  <h3 className="card__title">{t.title}</h3>
                  <p className="card__desc">{t.summary}</p>
                  <div className="card__foot">
                    <span>{t.tags.join(' · ')}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {doc ? `${doc.readingMinutes} 分钟` : '研究'} <Icon name="arrow-right" size={15} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
