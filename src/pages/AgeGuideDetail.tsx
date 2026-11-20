import { Link, useParams } from 'react-router-dom'
import { useSeo, breadcrumbJsonLd } from '../lib/seo'
import { getAgeGuide, getSkill, getDevTopic, getBook, getArticle } from '../lib/content'
import { ageGuides } from '../data/age-guides'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { PageHero, FavoriteButton, Callout, RelatedLink } from '../components/ui/Common'
import { DetailSection, DetailList } from '../components/ui/DetailSection'
import { NotFound } from './NotFound'
import { Icon } from '../components/ui/Icon'

export function AgeGuideDetail() {
  const { age } = useParams()
  const guide = age ? getAgeGuide(age) : undefined
  useSeo({
    title: guide ? `${guide.range} · ${guide.title}` : '年龄阶段指南',
    description: guide?.summary,
    path: `/age-guides/${age}`,
    jsonLd: guide ? breadcrumbJsonLd([{ name: '年龄阶段指南', path: '/age-guides' }, { name: `${guide.range} ${guide.title}`, path: `/age-guides/${age}` }]) : undefined,
  })
  if (!guide) return <NotFound />
  const idx = ageGuides.findIndex((g) => g.slug === guide.slug)
  const prev = ageGuides[idx - 1]
  const next = ageGuides[idx + 1]

  return (
    <>
      <Breadcrumbs items={[{ label: '年龄阶段指南', to: '/age-guides' }, { label: guide.range }]} />
      <PageHero kicker={guide.range} title={guide.title} desc={guide.subtitle}>
        <FavoriteButton id={`age:${guide.slug}`} title={`${guide.range} ${guide.title}`} route={`/age-guides/${guide.slug}`} type="age" />
      </PageHero>
      <div className="container" style={{ paddingBottom: 64 }}>
        <p style={{ fontSize: 16.5, lineHeight: 1.95, color: 'var(--ink-2)', maxWidth: 760, marginBottom: 8 }}>{guide.summary}</p>
        <Callout variant="blue">个体发展存在差异，以下内容为参考框架，不是必须达标的标准。</Callout>

        <div className="grid grid--2">
          <DetailSection title="主要发展任务">
            <DetailList items={guide.tasks} />
          </DetailSection>
          <DetailSection title="应该重点培养">
            <DetailList items={guide.focus} />
          </DetailSection>
        </div>
        <div className="grid grid--2">
          <DetailSection title="不必过度追求">
            <DetailList items={guide.avoid} />
          </DetailSection>
          <DetailSection title="家庭环境如何支持">
            <DetailList items={guide.environment} />
          </DetailSection>
        </div>
        <DetailSection title="推荐阅读与活动">
          <div className="grid grid--2">
            <div>
              {guide.reading.map((r) => (
                <div key={r.title} style={{ padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ fontFamily: 'var(--serif)', color: 'var(--forest)', fontSize: 15.5 }}>{r.title}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 4 }}>{r.note}</div>
                </div>
              ))}
            </div>
            <DetailList items={guide.activities} />
          </div>
        </DetailSection>
        <div className="grid grid--2">
          <DetailSection title="观察成长的指标">
            <DetailList items={guide.observe} />
            <Callout>观察用于理解孩子，不是打分或贴标签。</Callout>
          </DetailSection>
          <DetailSection title="家长常见误区">
            <DetailList items={guide.myths} numbered />
          </DetailSection>
        </div>

        <DetailSection title="关联知识网络">
          <div className="grid grid--2">
            <div>
              {guide.skills.map((s) => {
                const sk = getSkill(s)
                return sk ? <RelatedLink key={s} to={`/future-skills/${sk.slug}`} label={sk.title} meta="核心能力" /> : null
              })}
              {guide.devTopics.map((s) => {
                const d = getDevTopic(s)
                return d ? <RelatedLink key={s} to={`/child-development/${d.slug}`} label={d.title} meta="发展科学" /> : null
              })}
            </div>
            <div>
              {guide.books.map((s) => {
                const b = getBook(s)
                return b ? <RelatedLink key={s} to={`/books/${b.slug}`} label={b.chineseTitle || b.title} meta="书籍" /> : null
              })}
              {guide.articles.map((s) => {
                const a = getArticle(s)
                return a ? <RelatedLink key={s} to={a.route} label={a.title} meta="文章" /> : null
              })}
            </div>
          </div>
        </DetailSection>

        <div className="stage-nav">
          {prev ? (
            <Link to={`/age-guides/${prev.slug}`} className="btn btn--ghost btn--sm">
              <Icon name="arrow-left" size={15} /> {prev.range}
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/age-guides/${next.slug}`} className="btn btn--ghost btn--sm">
              {next.range} <Icon name="arrow-right" size={15} />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
