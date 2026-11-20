import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { PageHero, Callout } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { BrainIllustration } from '../components/illustrations/Illustrations'
import { devTopics } from '../data/child-development'
import { Icon } from '../components/ui/Icon'

export function ChildDevelopment() {
  useSeo({
    title: '儿童发展科学',
    description: '大脑发育、认知、语言、阅读、注意力、执行功能、情绪与社会性发展。尊重年龄与个体差异，说明证据边界。',
    path: '/child-development',
  })
  return (
    <>
      <Breadcrumbs items={[{ label: '儿童发展科学' }]} />
      <PageHero
        kicker="CHILD DEVELOPMENT"
        title="儿童发展科学"
        desc="理解成长规律，才能避免用焦虑替代科学。每个专题都说明科学原理、证据边界、分龄表现、家庭支持、观察信号与常见误区。"
      />
      <section className="section">
        <div className="container">
          <div className="split-feature" style={{ marginBottom: 40 }}>
            <div className="split-feature__visual">
              <BrainIllustration />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--forest)', marginBottom: 16 }}>
                发展有规律，但没有统一时刻表
              </h2>
              <p style={{ lineHeight: 1.95, color: 'var(--ink-2)', marginBottom: 16 }}>
                儿童发展研究揭示了许多普遍规律：大脑发育的顺序、语言习得的阶段、执行功能的逐步成熟。但规律描述的是群体趋势，不是每个孩子的精确时间表。
              </p>
              <Callout variant="blue" title="证据边界">
                本栏目区分科学共识、单一研究结论与经验判断，不把相关性当作因果，不夸大早期训练效果。涉及发展障碍或心理健康问题，请咨询合格专业人员。
              </Callout>
            </div>
          </div>
          <div className="grid grid--3">
            {devTopics.map((d) => (
              <Link key={d.slug} to={`/child-development/${d.slug}`} className="card card--link">
                <div className="card__kicker">{d.en}</div>
                <h3 className="card__title">{d.title}</h3>
                <p className="card__desc">{d.summary}</p>
                <div className="card__foot">
                  <span className="tag">发展科学</span>
                  <Icon name="arrow-right" size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
