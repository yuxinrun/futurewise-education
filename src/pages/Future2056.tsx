import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { PageHero, Callout } from '../components/ui/Common'
import { SectionHead } from '../components/ui/SectionHead'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Timeline } from '../components/home/Timeline'
import { TimelineIllustration, CareerShiftIllustration } from '../components/illustrations/Illustrations2'
import { phases } from '../data/timeline'
import { trends } from '../data/trends'
import { trendArticles } from '../lib/content'
import { Icon } from '../components/ui/Icon'

export function Future2056() {
  useSeo({
    title: '未来 30 年 · Future 2056',
    description: '以 2026—2056 年为尺度，研究技术、经济、人口与社会变化对儿童教育的影响。',
    path: '/future-2056',
  })
  return (
    <>
      <Breadcrumbs items={[{ label: '未来 30 年' }]} />
      <PageHero
        kicker="FUTURE 2056 · 2026 — 2056"
        title="未来 30 年：在不确定中建立教育坐标"
        desc="我们不预测确定的未来，而是研究正在发生的变化，区分事实、趋势、推断与情景，帮助家庭建立可调整的教育系统。"
      >
        <Link to="/future-2056/trends" className="btn btn--sm">
          趋势研究 <Icon name="arrow-right" size={15} />
        </Link>
        <Link to="/knowledge-map" className="btn btn--ghost btn--sm">
          知识图谱
        </Link>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead kicker="Three Phases" title="三个十年，三种重点" desc="这是家庭规划的思考框架，不是对某个孩子成长速度或未来就业的保证。" />
          <div className="grid grid--3">
            {phases.map((p, i) => (
              <div className="card" key={p.range}>
                <div className="card__kicker">阶段 {i + 1}</div>
                <h3 className="card__title">{p.range}</h3>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--forest)', marginBottom: 10 }}>{p.title}</p>
                <p className="card__desc">{p.summary}</p>
                <div className="card__foot">
                  <span style={{ fontSize: 13, color: 'var(--gold-2)' }}>{p.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead kicker="Interactive Timeline" title="未来 30 年教育时间轴" desc="点击节点，查看世界变化、教育影响与家庭可做之事。" />
          <Timeline />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker="Trend Research" title="未来趋势专题" desc="每个专题包含背景、当前证据、趋势分析、不同情景、教育影响与家庭行动。" more={{ to: '/future-2056/trends', label: '全部专题' }} />
          <div className="grid grid--3">
            {trends.slice(0, 9).map((t) => (
              <Link key={t.slug} to={`/future-2056/trends/${t.slug}`} className="card card--link">
                <div className="card__kicker">{t.en}</div>
                <h3 className="card__title">{t.title}</h3>
                <p className="card__desc">{t.summary}</p>
                <div className="card__foot">
                  <span>{t.tags.slice(0, 2).join(' · ')}</span>
                  <Icon name="arrow-right" size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="split-feature">
            <div className="split-feature__visual">
              <TimelineIllustration />
            </div>
            <div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>如何阅读这些研究</h2>
              <Callout title="证据分层" variant="gold">
                每篇趋势研究都区分：已发生的事实、当前趋势、合理推断、未来情景。请把情景当作思考工具，而不是预言。
              </Callout>
              <ul className="list-clean">
                <li>关注任务与能力的变化，而不是具体职业名单。</li>
                <li>把不确定性当作规划的前提，保留选择权。</li>
                <li>定期回到现实，根据孩子的状态调整计划。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead kicker="Latest Research" title="最新趋势研究" more={{ to: '/future-2056/trends', label: '查看全部' }} />
          <div className="grid grid--3">
            {trendArticles.slice(0, 3).map((a) => (
              <Link key={a.slug} to={a.route} className="card card--link">
                <div className="card__kicker">趋势研究</div>
                <h3 className="card__title">{a.title}</h3>
                <p className="card__desc">{a.summary}</p>
                <div className="card__foot">
                  <span>{a.readingMinutes} 分钟</span>
                  <Icon name="arrow-right" size={16} />
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 32, maxWidth: 420 }}>
            <CareerShiftIllustration />
          </div>
        </div>
      </section>
    </>
  )
}
