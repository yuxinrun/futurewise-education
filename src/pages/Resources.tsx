import { useState } from 'react'
import { useSeo } from '../lib/seo'
import { PageHero, Callout } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { ResourceStatsChart } from '../components/charts/Charts'
import { resources } from '../data/resources'
import { Icon } from '../components/ui/Icon'

export function Resources() {
  const [filter, setFilter] = useState<'all' | 'intl' | 'china'>('all')
  useSeo({
    title: '全球教育资源',
    description: '国际与中国权威教育机构、研究组织与专业资源目录，附官方网站与推荐理由。',
    path: '/resources',
  })
  const list = resources.filter((r) =>
    filter === 'all' ? true : filter === 'china' ? r.country === '中国' : r.country !== '中国',
  )
  return (
    <>
      <Breadcrumbs items={[{ label: '全球教育资源' }]} />
      <PageHero
        kicker="GLOBAL RESOURCES"
        title="全球权威教育资源"
        desc="把目光投向真正做研究的机构。每个资源说明机构性质、研究领域、推荐理由与适合阅读的内容，官方网站均经核实。"
      />
      <section className="section">
        <div className="container">
          <div className="split-feature" style={{ marginBottom: 40 }}>
            <div className="split-feature__visual">
              <ResourceStatsChart />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--forest)', marginBottom: 14 }}>
                如何善用这些资源
              </h2>
              <p style={{ lineHeight: 1.95, color: 'var(--ink-2)', marginBottom: 16 }}>
                权威机构的报告与综述，比二手解读更接近证据本身。阅读时留意研究方法、样本与适用条件，区分政策建议与科学结论。
              </p>
              <Callout variant="blue" title="网址核实">
                我们只收录可核实的官方网站；无法确认网址的机构会明确标注，不编造链接。外部链接指向第三方网站，请注意其内容时效。
              </Callout>
            </div>
          </div>
          <div className="pill-tabs">
            <button className={`pill-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>全部（{resources.length}）</button>
            <button className={`pill-tab ${filter === 'intl' ? 'active' : ''}`} onClick={() => setFilter('intl')}>国际机构</button>
            <button className={`pill-tab ${filter === 'china' ? 'active' : ''}`} onClick={() => setFilter('china')}>中国机构</button>
          </div>
          <div className="resource-list">
            {list.map((r) => (
              <article key={r.slug} id={r.slug} className="resource-item">
                <div>
                  <h3 className="resource-item__name" style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>{r.name}</h3>
                  {r.en && <div className="resource-item__en">{r.en}</div>}
                  <p className="resource-item__why">{r.why}</p>
                  <div className="resource-item__tags" style={{ marginBottom: 10 }}>
                    <span className="tag tag--forest">{r.country}</span>
                    <span className="tag">{r.type}</span>
                    {r.fields.map((f) => (
                      <span key={f} className="tag">{f}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.8 }}>
                    <strong style={{ color: 'var(--ink-2)' }}>适合阅读：</strong>
                    {r.reading.join('；')}
                  </div>
                  {r.note && <div style={{ fontSize: 13, color: 'var(--gold-2)', marginTop: 8 }}>{r.note}</div>}
                </div>
                <div>
                  {r.url && r.urlVerified ? (
                    <a className="resource-item__link" href={r.url} target="_blank" rel="noopener noreferrer">
                      官方网站 <Icon name="external" size={14} />
                    </a>
                  ) : (
                    <span className="resource-item__link" style={{ opacity: 0.6, cursor: 'default' }}>网址待核实</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
