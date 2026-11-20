import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { PageHero, Callout } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { ChildStagesIllustration } from '../components/illustrations/Illustrations'
import { AgeTopicMatrixChart } from '../components/charts/Charts'
import { ageGuides } from '../data/age-guides'
import { Icon } from '../components/ui/Icon'

export function AgeGuides() {
  useSeo({
    title: '年龄阶段指南',
    description: '0—3、3—6、6—9、9—12、12—15、15—18 与 18 岁以后的分龄教育规划：发展任务、重点、误区与家庭支持。',
    path: '/age-guides',
  })
  return (
    <>
      <Breadcrumbs items={[{ label: '年龄阶段指南' }]} />
      <PageHero
        kicker="AGE GUIDES"
        title="不同年龄阶段的成长规划"
        desc="每个阶段有不同的发展任务。重点不是抢跑，而是在合适的时机提供合适的支持，并为个体差异留出空间。"
      />
      <section className="section">
        <div className="container">
          <div className="split-feature" style={{ marginBottom: 40 }}>
            <div className="split-feature__visual">
              <ChildStagesIllustration />
            </div>
            <div className="split-feature__visual">
              <AgeTopicMatrixChart />
            </div>
          </div>
          <Callout variant="blue" title="关于年龄分段">
            年龄分段是思考框架，不是严格的发展标准。每个孩子的发展节奏不同，请把它当作参考，而非必须达标的刻度。
          </Callout>
          <div className="grid grid--3" style={{ marginTop: 32 }}>
            {ageGuides.map((g) => (
              <Link key={g.slug} to={`/age-guides/${g.slug}`} className="card card--link">
                <div className="card__kicker">{g.range}</div>
                <h3 className="card__title">{g.title}</h3>
                <p className="card__desc">{g.subtitle}</p>
                <div className="card__foot">
                  <span className="tag">分龄规划</span>
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
