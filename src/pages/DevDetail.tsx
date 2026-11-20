import { Link, useParams } from 'react-router-dom'
import { useSeo, breadcrumbJsonLd } from '../lib/seo'
import { getDevTopic, getArticle, getBook, getResource, getSkill } from '../lib/content'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { PageHero, FavoriteButton, Callout, RelatedLink } from '../components/ui/Common'
import { DetailSection, DetailList } from '../components/ui/DetailSection'
import { NotFound } from './NotFound'
import { Icon } from '../components/ui/Icon'

export function DevDetail() {
  const { slug } = useParams()
  const topic = slug ? getDevTopic(slug) : undefined
  useSeo({
    title: topic ? `${topic.title} · 儿童发展科学` : '儿童发展',
    description: topic?.summary,
    path: `/child-development/${slug}`,
    jsonLd: topic ? breadcrumbJsonLd([{ name: '儿童发展科学', path: '/child-development' }, { name: topic.title, path: `/child-development/${slug}` }]) : undefined,
  })
  if (!topic) return <NotFound />

  return (
    <>
      <Breadcrumbs items={[{ label: '儿童发展科学', to: '/child-development' }, { label: topic.title }]} />
      <PageHero kicker={topic.en} title={topic.title} desc={topic.summary}>
        <FavoriteButton id={`dev:${topic.slug}`} title={topic.title} route={`/child-development/${topic.slug}`} type="dev" />
        <Link to={`/knowledge-map?node=dev:${topic.slug}`} className="btn btn--ghost btn--sm">
          <Icon name="grid" size={15} /> 知识图谱
        </Link>
      </PageHero>

      <div className="container" style={{ paddingBottom: 64 }}>
        <DetailSection title="科学原理">
          <p style={{ fontSize: 16.5, lineHeight: 1.9 }}>{topic.science}</p>
        </DetailSection>
        <Callout variant="blue" title="证据与边界">{topic.evidence}</Callout>
        <DetailSection title="不同阶段的表现">
          <div className="matrix-scroll">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th style={{ width: 140 }}>阶段</th>
                  <th>表现与支持</th>
                </tr>
              </thead>
              <tbody>
                {topic.stages.map((s) => (
                  <tr key={s.stage}>
                    <td>{s.stage}</td>
                    <td>{s.practice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DetailSection>
        <div className="grid grid--2">
          <DetailSection title="家庭可以怎么做">
            <DetailList items={topic.family} />
          </DetailSection>
          <DetailSection title="值得观察的信号">
            <DetailList items={topic.signals} />
            <Callout>观察用于理解和支持，不是诊断。持续担忧请咨询专业人员。</Callout>
          </DetailSection>
        </div>
        <div className="grid grid--2">
          <DetailSection title="需要谨慎的地方">
            <DetailList items={topic.cautions} />
          </DetailSection>
          <DetailSection title="常见误区">
            <DetailList items={topic.myths} numbered />
          </DetailSection>
        </div>

        {(topic.skills?.length || topic.articles?.length || topic.books?.length || topic.resources?.length) && (
          <DetailSection title="关联知识网络">
            <div className="grid grid--2">
              <div>
                {topic.skills?.map((s) => {
                  const sk = getSkill(s)
                  return sk ? <RelatedLink key={s} to={`/future-skills/${sk.slug}`} label={sk.title} meta="核心能力" /> : null
                })}
                {topic.articles?.map((s) => {
                  const a = getArticle(s)
                  return a ? <RelatedLink key={s} to={a.route} label={a.title} meta="文章" /> : null
                })}
              </div>
              <div>
                {topic.books?.map((s) => {
                  const b = getBook(s)
                  return b ? <RelatedLink key={s} to={`/books/${b.slug}`} label={b.title} meta="书籍" /> : null
                })}
                {topic.resources?.map((s) => {
                  const r = getResource(s)
                  return r ? <RelatedLink key={s} to={`/resources#${r.slug}`} label={r.name} meta="机构" /> : null
                })}
              </div>
            </div>
          </DetailSection>
        )}
      </div>
    </>
  )
}
