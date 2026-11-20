import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { PageHero } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { SectionHead } from '../components/ui/SectionHead'
import { CapabilityModelIllustration } from '../components/illustrations/Illustrations'
import { CapabilityTaxonomyChart } from '../components/charts/Charts'
import { skills, skillGroups } from '../data/skills'
import { Icon } from '../components/ui/Icon'

export function Skills() {
  const [group, setGroup] = useState('all')
  useSeo({ title: '未来核心能力', description: '20 项长期有价值的未来核心能力：定义、发展基础、分龄培养、家庭与学校实践。', path: '/future-skills' })
  const list = group === 'all' ? skills : skills.filter((s) => s.group === group)
  return (
    <>
      <Breadcrumbs items={[{ label: '未来核心能力' }]} />
      <PageHero kicker="FUTURE SKILLS" title="未来核心能力" desc="具体技能会过时，能力不会。每项能力都说明定义、重要性、发展基础、分龄培养、家庭与学校实践、常见误区与评价方式。" />
      <section className="section">
        <div className="container">
          <div className="split-feature" style={{ marginBottom: 48 }}>
            <div className="split-feature__visual">
              <CapabilityModelIllustration />
            </div>
            <div className="split-feature__visual">
              <CapabilityTaxonomyChart />
            </div>
          </div>
          <div className="pill-tabs">
            <button className={`pill-tab ${group === 'all' ? 'active' : ''}`} onClick={() => setGroup('all')}>
              全部（{skills.length}）
            </button>
            {skillGroups.map((g) => (
              <button key={g} className={`pill-tab ${group === g ? 'active' : ''}`} onClick={() => setGroup(g)}>
                {g}
              </button>
            ))}
          </div>
          <div className="grid grid--3">
            {list.map((s) => (
              <Link key={s.slug} to={`/future-skills/${s.slug}`} className="card card--link">
                <div className="card__kicker">{s.en}</div>
                <h3 className="card__title">{s.title}</h3>
                <p className="card__desc">{s.summary}</p>
                <div className="card__foot">
                  <span className="tag">{s.group}</span>
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
