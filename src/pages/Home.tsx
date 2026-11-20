import { Link } from 'react-router-dom'
import { useSeo, websiteJsonLd, SITE_URL } from '../lib/seo'
import { asset } from '../lib/utils'
import { SectionHead } from '../components/ui/SectionHead'
import { Icon } from '../components/ui/Icon'
import { BookCover } from '../components/ui/BookCover'
import { ArticleRow } from '../components/ui/ArticleBits'
import { Timeline } from '../components/home/Timeline'
import { WorldChangesIllustration, CapabilityModelIllustration, BrainIllustration, AiCollaborationIllustration } from '../components/illustrations/Illustrations'
import { StrategyMapIllustration } from '../components/illustrations/Illustrations2'
import { ResourceStatsChart } from '../components/charts/Charts'
import { skills } from '../data/skills'
import { devTopics } from '../data/child-development'
import { ageGuides } from '../data/age-guides'
import { books } from '../data/books'
import { resources } from '../data/resources'
import { tools } from '../data/tools'
import { strategyDimensions } from '../data/strategy'
import { weeklyNotes } from '../data/weekly-notes'
import { featuredArticles, articles, contentStats } from '../lib/content'
import { neighborsOf, typeColors } from '../lib/graph'

const changes = [
  { title: '人工智能与自动化', text: '认知型任务首次被大规模波及，人的价值向判断、创造与协作迁移。', to: '/future-2056/trends/ai-society' },
  { title: '工作与职业重组', text: '职业不会被整体替代，但任务会被重新组合，适应力比单一技能更重要。', to: '/future-2056/trends/future-work' },
  { title: '人口与家庭结构', text: '少子化与老龄化改变资源分布，家庭教育的时间与质量约束更现实。', to: '/future-2056/trends/demographics' },
  { title: '气候与能源转型', text: '气候风险与能源重构是长期确定变量，可持续素养成为基本能力。', to: '/future-2056/trends/climate-energy' },
  { title: '生命科学与健康', text: '生物技术与精准医疗可能改变健康与人生阶段的时间表。', to: '/future-2056/trends/biotech-life' },
  { title: '城市与生活方式', text: '公共空间与自然可达性，塑造孩子的日常学习与独立性。', to: '/future-2056/trends/future-city' },
]

const whyPoints = [
  { title: '考试制度不等于未来需求', text: '今天的考试衡量的是特定知识掌握，而未来更需要判断、创造与持续学习。' },
  { title: '知识获取成本急剧下降', text: '当答案随手可得，提出好问题、核验信息与建立理解变得更稀缺。' },
  { title: '职业路径不再线性', text: '一次选择定终身的时代过去，保留选择权比押注热门更重要。' },
  { title: '成长需要空白与关系', text: '过度安排会侵蚀自主性、好奇心与心理健康，而这些恰恰是长期竞争力。' },
]

export function Home() {
  useSeo({
    title: 'Futurewise · 未来教育研究所',
    description: '为孩子规划未来，而不只是规划升学。面向未来 30 年的家庭教育、儿童成长与教育研究知识平台。',
    path: '/',
    image: `${SITE_URL}images/hero/og-cover.webp`,
    jsonLd: websiteJsonLd,
  })

  const note = weeklyNotes[0]
  const homeBooks = books.slice(0, 5)
  const homeTools = tools.filter((t) => ['education-plan', 'weekly-plan', 'reading-plan', 'strategy-map', 'monthly-review', 'capability-matrix'].includes(t.slug))
  const featured = featuredArticles.length ? featuredArticles : articles.slice(0, 4)

  const creativityNeighbors = neighborsOf('skill:creativity')
  const graphGroups = [
    { type: 'dev', label: '儿童发展研究' },
    { type: 'article', label: '学习科学文章' },
    { type: 'book', label: '推荐书籍' },
    { type: 'resource', label: '全球教育机构' },
  ]
    .map((g) => ({ ...g, items: creativityNeighbors.filter((n) => n.type === g.type).slice(0, 4) }))
    .filter((g) => g.items.length > 0)

  return (
    <>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <div className="hero__eyebrow">Futurewise · 2026 — 2056</div>
            <h1>
              为孩子规划未来，
              <br />
              而不只是规划<em>升学</em>。
            </h1>
            <p className="hero__sub">
              在一个持续变化的时代，理解未来世界、儿童成长与教育科学，帮助孩子建立面向未来 30 年的知识、能力、人格与人生选择。
            </p>
            <div className="hero__actions">
              <Link to="/future-2056" className="btn">
                探索未来教育
                <Icon name="arrow-right" size={17} />
              </Link>
              <Link to="/tools/strategy-map" className="btn btn--ghost">
                开始家庭教育规划
              </Link>
            </div>
            <div className="hero__stats">
              <div>
                <div className="hero__stat-num">{contentStats.articles + contentStats.trends}</div>
                <div className="hero__stat-label">深度研究与文章</div>
              </div>
              <div>
                <div className="hero__stat-num">{contentStats.skills}</div>
                <div className="hero__stat-label">未来核心能力</div>
              </div>
              <div>
                <div className="hero__stat-num">{contentStats.books}</div>
                <div className="hero__stat-label">中外教育书籍</div>
              </div>
              <div>
                <div className="hero__stat-num">{contentStats.tools}</div>
                <div className="hero__stat-label">家庭实践工具</div>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__frame">
              <img
                className="hero__img"
                src={asset('images/hero/futurewise-hero.webp')}
                alt="一个孩子在窗边安静阅读，远处是充满希望的未来城市"
                width={1280}
                height={1024}
                fetchPriority="high"
              />
            </div>
            <div className="hero__caption">
              <div className="hero__caption-title">Plan for the Future</div>
              <div className="hero__caption-text">教育不是替孩子安排好未来，而是帮助孩子逐渐拥有选择未来的能力。</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editorial philosophy */}
      <section className="philosophy">
        <div className="container philosophy__inner">
          <div className="philosophy__kicker">Our Editorial Philosophy</div>
          <p className="philosophy__lead">
            我们不试图预测三十年后每一个孩子应该从事什么职业，也不试图给出一套适用于所有家庭的教育答案。
          </p>
          <p className="philosophy__body">
            我们希望理解正在变化的世界，理解孩子成长的规律，研究哪些能力值得长期培养，并帮助每个家庭在不确定性中作出更理性、更有远见的选择。
          </p>
          <p className="philosophy__sign">
            教育不是替孩子安排好未来，而是帮助孩子逐渐拥有<em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>选择未来的能力</em>。
            <span>Futurewise · 面向未来的智慧，而不是追逐某一种短期教育风口。</span>
          </p>
        </div>
      </section>

      {/* 3. Why rethink */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="Why Rethink" title="为什么需要重新思考孩子的教育" desc="不是否定今天的努力，而是把努力放在更长的时间尺度上。" />
          <div className="why-grid">
            <ul className="why-list">
              {whyPoints.map((p, i) => (
                <li key={p.title}>
                  <span className="why-list__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="why-list__title">{p.title}</div>
                    <p className="why-list__text">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <blockquote className="quote-block">
                教育不是为一个确定的未来训练孩子，而是让孩子拥有面对不确定性的能力。
                <cite>Futurewise 编辑理念</cite>
              </blockquote>
              <div style={{ marginTop: 28 }}>
                <WorldChangesIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Timeline */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            kicker="Future 2056"
            title="未来 30 年教育时间轴"
            desc="以 2026、2030、2035、2040、2045、2050、2056 为观察节点。这是思考框架，不是对某个孩子未来的保证。"
            more={{ to: '/future-2056', label: '进入 Future 2056' }}
          />
          <Timeline compact />
        </div>
      </section>

      {/* 4. Six changes */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="Six Shifts" title="未来世界的六大变化" desc="区分已知事实、当前趋势、合理推断与未来情景。" more={{ to: '/future-2056/trends', label: '全部趋势研究' }} />
          <div className="changes-grid">
            {changes.map((c, i) => (
              <div className="change-cell" key={c.title}>
                <div className="change-cell__num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="change-cell__title">{c.title}</h3>
                <p className="change-cell__text">{c.text}</p>
                <Link to={c.to} className="change-cell__link">
                  阅读研究 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core capabilities */}
      <section className="section section--forest">
        <div className="container">
          <SectionHead kicker="Future Skills" title="未来需要的核心能力" desc="具体技能会过时，能力不会。我们系统研究 20 项长期有价值的能力。" more={{ to: '/future-skills', label: '能力体系' }} />
          <div className="split-feature">
            <div className="skills-cloud">
              {skills.map((s) => (
                <Link key={s.slug} to={`/future-skills/${s.slug}`} className="skill-chip" style={{ background: 'rgba(248,247,242,0.06)', borderColor: 'rgba(248,247,242,0.2)', color: 'var(--paper)' }}>
                  {s.title}
                  <span className="skill-chip__en" style={{ color: 'var(--gold)' }}>
                    {s.en}
                  </span>
                </Link>
              ))}
            </div>
            <div className="split-feature__visual" style={{ background: 'var(--paper)' }}>
              <CapabilityModelIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Child development */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="Child Development" title="儿童发展与认知科学" desc="理解成长规律，尊重个体差异，说明证据边界。" more={{ to: '/child-development', label: '发展科学' }} />
          <div className="split-feature">
            <div className="split-feature__visual">
              <BrainIllustration />
            </div>
            <div>
              <ul className="list-clean">
                {devTopics.slice(0, 6).map((d) => (
                  <li key={d.slug}>
                    <Link to={`/child-development/${d.slug}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <span style={{ color: 'var(--forest)', fontWeight: 600 }}>{d.title}</span>
                      <span style={{ color: 'var(--ink-3)', fontSize: 13 }}>{d.en}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/child-development" className="link-more" style={{ marginTop: 20 }}>
                查看全部 {devTopics.length} 个专题
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Age stages */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead kicker="Age Guides" title="不同年龄阶段的成长规划" desc="阶段是参考，不是标准。每个孩子有自己的节奏。" more={{ to: '/age-guides', label: '年龄指南' }} />
          <div className="age-track">
            {ageGuides.map((g) => (
              <Link key={g.slug} to={`/age-guides/${g.slug}`} className="age-card">
                <div className="age-card__bar" />
                <div className="age-card__range">{g.range}</div>
                <div className="age-card__title">{g.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. AI era */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="AI & Education" title="AI 时代的学习方式" desc="既不把 AI 描绘成万能工具，也不制造恐慌。" more={{ to: '/ai-education', label: 'AI 教育' }} />
          <div className="split-feature">
            <div>
              <ul className="list-numbered">
                <li>先独立思考，再与 AI 协作；人保留最终判断。</li>
                <li>把 AI 当作可讨论、可核验的对象，而不是权威。</li>
                <li>用 AI 拓展想法，但自己完成理解、判断与表达。</li>
                <li>建立家庭数字规则，保护注意力、睡眠与真实关系。</li>
              </ul>
              <Link to="/future-skills/ai-literacy" className="btn btn--ghost btn--sm" style={{ marginTop: 20 }}>
                了解 AI 素养
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>
            <div className="split-feature__visual">
              <AiCollaborationIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Family strategy */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead kicker="Family Strategy" title="家庭教育战略地图" desc="把成长规划拆成五个维度，制定年度、季度与每周行动。" more={{ to: '/tools/strategy-map', label: '打开战略地图' }} />
          <div className="strategy-dims">
            {strategyDimensions.map((d, i) => (
              <Link key={d.slug} to="/tools/strategy-map" className="strategy-dim">
                <div className="strategy-dim__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="strategy-dim__title">{d.title}</div>
                <p className="strategy-dim__goal">{d.goal}</p>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 28, maxWidth: 420 }}>
            <StrategyMapIllustration />
          </div>
        </div>
      </section>

      {/* 10. Global research */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="Global Research" title="全球教育研究" desc="连接国际机构与中国研究，理解不同制度的背景与适用条件。" more={{ to: '/resources', label: '资源目录' }} />
          <div className="split-feature">
            <div className="split-feature__visual">
              <ResourceStatsChart />
            </div>
            <div>
              <ul className="list-clean">
                {resources.slice(0, 5).map((r) => (
                  <li key={r.slug}>
                    <Link to={`/resources#${r.slug}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <span style={{ color: 'var(--forest)', fontWeight: 600 }}>{r.name}</span>
                      <span className="tag">{r.country}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/future-school" className="link-more" style={{ marginTop: 20 }}>
                未来学校与全球教育观察
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Knowledge graph */}
      <section className="section">
        <div className="container">
          <SectionHead
            kicker="Knowledge Graph"
            title="教育知识与书籍关联图谱"
            desc="知识不是孤立的条目。从“创造力”出发，走到发展研究、学习科学、经典书籍与全球机构，逐步形成你自己的知识网络。"
            more={{ to: '/knowledge-map', label: '打开完整图谱' }}
          />
          <div className="graph-teaser">
            <div className="graph-teaser__groups">
              {graphGroups.map((g) => (
                <div className="graph-group" key={g.type}>
                  <div className="graph-group__head">
                    <i style={{ background: typeColors[g.type] }} />
                    {g.label}
                  </div>
                  <div className="graph-group__items">
                    {g.items.map((n) => (
                      <Link key={n.id} to={`/knowledge-map?node=${n.id}`} className="graph-chip">
                        {n.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <blockquote className="quote-block">
                从一项能力进入，看见它背后的科学、书籍与实践——这是理解，而不是收藏。
                <cite>Futurewise 知识图谱</cite>
              </blockquote>
              <Link to="/knowledge-map?node=skill:creativity" className="btn" style={{ marginTop: 28 }}>
                从“创造力”开始探索
                <Icon name="arrow-right" size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Books */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead kicker="Books" title="值得阅读的教育书籍" desc="中外教育经典，核实作者与版本，标注争议与局限。" more={{ to: '/books', label: '全部书籍' }} />
          <div className="book-grid">
            {homeBooks.map((b) => (
              <Link key={b.slug} to={`/books/${b.slug}`} className="book-item">
                <BookCover book={b} />
                <div className="book-item__title">{b.title}</div>
                <div className="book-item__author">{b.author}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Featured articles */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="Long Reads" title="深度文章精选" desc="有深度、有依据、有现实操作价值，不贩卖焦虑。" more={{ to: '/articles', label: '全部文章' }} />
          <div>
            {featured.slice(0, 4).map((a, i) => (
              <ArticleRow key={a.slug} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 13. Tools */}
      <section className="section section--forest">
        <div className="container">
          <SectionHead kicker="Family Toolkit" title="家庭教育实践工具" desc="无需注册，数据保存在浏览器本地，可导出备份。" more={{ to: '/tools', label: '全部工具' }} />
          <div className="tool-grid">
            {homeTools.map((t) => (
              <Link key={t.slug} to={`/tools/${t.slug}`} className="tool-card" style={{ background: 'rgba(248,247,242,0.05)', borderColor: 'rgba(248,247,242,0.18)' }}>
                <div className="tool-card__kind" style={{ color: 'var(--gold)' }}>{t.en}</div>
                <h3 className="tool-card__title" style={{ color: 'var(--paper)' }}>{t.title}</h3>
                <p className="tool-card__desc" style={{ color: 'rgba(248,247,242,0.7)' }}>{t.summary}</p>
                <span style={{ color: 'var(--gold)', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  打开工具 <Icon name="arrow-right" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Weekly note */}
      <section className="section">
        <div className="container">
          <SectionHead kicker="Weekly Note" title="每周教育思考" desc="每周一封短信，一个问题，一个可执行的小行动。" more={{ to: '/articles', label: '更多内容' }} />
          <div className="weekly-card" style={{ maxWidth: 760 }}>
            <div className="weekly-card__issue">
              第 {String(note.issue).padStart(2, '0')} 期 · {note.date}
            </div>
            <h3 className="weekly-card__title">{note.title}</h3>
            <div className="weekly-card__question">{note.question}</div>
            <div className="weekly-card__body">
              {note.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="weekly-card__action">
              <strong>本周行动：</strong>
              {note.action}
            </div>
            {note.related && (
              <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                {note.related.map((r) => (
                  <Link key={r.to} to={r.to} className="tag tag--gold">
                    {r.label} →
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
