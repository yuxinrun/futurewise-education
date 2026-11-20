import { Link, useParams } from 'react-router-dom'
import { useSeo, breadcrumbJsonLd } from '../lib/seo'
import { getSkill, getArticle, getBook, getResource, getDevTopic } from '../lib/content'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { PageHero, FavoriteButton, Callout, RelatedLink } from '../components/ui/Common'
import { NotFound } from './NotFound'
import { Icon } from '../components/ui/Icon'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="detail-section">
      <h2 className="detail-section__title">{title}</h2>
      {children}
    </section>
  )
}

export function SkillDetail() {
  const { slug } = useParams()
  const skill = slug ? getSkill(slug) : undefined
  useSeo({
    title: skill ? `${skill.title} · 未来核心能力` : '核心能力',
    description: skill?.summary,
    path: `/future-skills/${slug}`,
    jsonLd: skill ? breadcrumbJsonLd([{ name: '未来核心能力', path: '/future-skills' }, { name: skill.title, path: `/future-skills/${slug}` }]) : undefined,
  })
  if (!skill) return <NotFound />

  return (
    <>
      <Breadcrumbs items={[{ label: '未来核心能力', to: '/future-skills' }, { label: skill.title }]} />
      <PageHero kicker={skill.en} title={skill.title} desc={skill.summary}>
        <span className="tag tag--forest">{skill.group}</span>
        <FavoriteButton id={`skill:${skill.slug}`} title={skill.title} route={`/future-skills/${skill.slug}`} type="skill" />
        <Link to={`/knowledge-map?node=skill:${skill.slug}`} className="btn btn--ghost btn--sm">
          <Icon name="grid" size={15} /> 知识图谱
        </Link>
      </PageHero>

      <div className="container" style={{ paddingBottom: 64 }}>
        <Section title="定义">
          <p style={{ fontSize: 16.5, lineHeight: 1.9 }}>{skill.definition}</p>
        </Section>
        <Section title="为什么重要">
          <p style={{ fontSize: 16.5, lineHeight: 1.9 }}>{skill.importance}</p>
        </Section>
        <Section title="发展基础">
          <p style={{ fontSize: 16.5, lineHeight: 1.9 }}>{skill.foundation}</p>
        </Section>
        <Section title="不同年龄段的培养方式">
          <div className="matrix-scroll">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th style={{ width: 140 }}>阶段</th>
                  <th>培养方式</th>
                </tr>
              </thead>
              <tbody>
                {skill.ages.map((a) => (
                  <tr key={a.stage}>
                    <td>{a.stage}</td>
                    <td>{a.practice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <div className="grid grid--2">
          <Section title="家庭实践">
            <ul className="list-clean">
              {skill.family.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Section>
          <Section title="学校实践">
            <ul className="list-clean">
              {skill.school.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Section>
        </div>
        <div className="grid grid--2">
          <Section title="常见误区">
            <ul className="list-numbered">
              {skill.myths.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Section>
          <Section title="如何观察与评价">
            <ul className="list-clean">
              {skill.assessment.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <Callout variant="blue">评价应关注具体行为与进步，而非给孩子贴固定标签。</Callout>
          </Section>
        </div>

        {(skill.articles?.length || skill.books?.length || skill.devTopics?.length || skill.resources?.length) && (
          <Section title="关联知识网络">
            <div className="grid grid--2">
              <div>
                {skill.articles?.map((s) => {
                  const a = getArticle(s)
                  return a ? <RelatedLink key={s} to={a.route} label={a.title} meta="文章" /> : null
                })}
                {skill.devTopics?.map((s) => {
                  const d = getDevTopic(s)
                  return d ? <RelatedLink key={s} to={`/child-development/${d.slug}`} label={d.title} meta="发展科学" /> : null
                })}
              </div>
              <div>
                {skill.books?.map((s) => {
                  const b = getBook(s)
                  return b ? <RelatedLink key={s} to={`/books/${b.slug}`} label={b.title} meta="书籍" /> : null
                })}
                {skill.resources?.map((s) => {
                  const r = getResource(s)
                  return r ? <RelatedLink key={s} to={`/resources#${r.slug}`} label={r.name} meta="机构" /> : null
                })}
              </div>
            </div>
          </Section>
        )}
      </div>
    </>
  )
}
