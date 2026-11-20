import { skills, skillGroups } from '../../data/skills'
import { resources } from '../../data/resources'
import { ageGuides } from '../../data/age-guides'
import { strategyDimensions } from '../../data/strategy'

const C = {
  forest: '#243C35',
  sage: '#84978A',
  gold: '#B99A61',
  blue: '#6E91A5',
  paper: '#F8F7F2',
  paper2: '#EEECE3',
  ink: '#242B2A',
  line: 'rgba(36,59,53,0.16)',
}

export function CapabilityTaxonomyChart() {
  const counts = skillGroups.map((g) => ({ group: g, count: skills.filter((s) => s.group === g).length }))
  const max = Math.max(...counts.map((c) => c.count))
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="未来能力分类图">
      <rect width="400" height="300" rx="4" fill={C.paper} stroke={C.line} />
      <text x="200" y="34" textAnchor="middle" fill={C.forest} fontSize="13" fontFamily="serif">
        20 项核心能力 · 六大类
      </text>
      {counts.map((c, i) => {
        const y = 60 + i * 36
        const w = (c.count / max) * 200
        return (
          <g key={c.group}>
            <text x="118" y={y + 14} textAnchor="end" fill={C.forest} fontSize="11">
              {c.group}
            </text>
            <rect x="130" y={y} width={w} height="20" rx="3" fill={i % 2 ? C.sage : C.forest} opacity="0.85" />
            <text x={136 + w} y={y + 14} fill={C.gold} fontSize="11">
              {c.count}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function LearningMethodsChart() {
  const methods = [
    { label: '主动回忆', v: 90 },
    { label: '间隔练习', v: 85 },
    { label: '交错练习', v: 72 },
    { label: '精细提问', v: 68 },
    { label: '反复阅读', v: 40 },
    { label: '划重点', v: 30 },
  ]
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="学习方式对比图">
      <rect width="400" height="300" rx="4" fill={C.paper} stroke={C.line} />
      <text x="200" y="32" textAnchor="middle" fill={C.forest} fontSize="13" fontFamily="serif">
        学习策略的相对有效性（示意）
      </text>
      {methods.map((m, i) => {
        const y = 54 + i * 34
        return (
          <g key={m.label}>
            <text x="112" y={y + 14} textAnchor="end" fill={C.forest} fontSize="11">
              {m.label}
            </text>
            <rect x="124" y={y} width="220" height="18" rx="3" fill={C.paper2} />
            <rect x="124" y={y} width={(m.v / 100) * 220} height="18" rx="3" fill={m.v >= 68 ? C.forest : C.sage} />
          </g>
        )
      })}
      <text x="200" y="278" textAnchor="middle" fill={C.ink} fontSize="9" opacity="0.65">
        基于学习科学总体趋势的示意，非精确效应量；效果因材料与情境而异
      </text>
    </svg>
  )
}

export function ResourceStatsChart() {
  const intl = resources.filter((r) => r.country !== '中国').length
  const cn = resources.filter((r) => r.country === '中国').length
  const total = intl + cn
  const r = 70
  const circ = 2 * Math.PI * r
  const cnLen = (cn / total) * circ
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="教育资源分类统计">
      <rect width="400" height="300" rx="4" fill={C.paper} stroke={C.line} />
      <text x="200" y="34" textAnchor="middle" fill={C.forest} fontSize="13" fontFamily="serif">
        全球教育资源分布
      </text>
      <g transform="translate(150,160)">
        <circle r={r} fill="none" stroke={C.forest} strokeWidth="26" />
        <circle r={r} fill="none" stroke={C.gold} strokeWidth="26" strokeDasharray={`${cnLen} ${circ - cnLen}`} transform="rotate(-90)" />
        <text y="-2" textAnchor="middle" fill={C.forest} fontSize="22" fontFamily="serif">
          {total}
        </text>
        <text y="18" textAnchor="middle" fill={C.ink} fontSize="10" opacity="0.7">
          机构资源
        </text>
      </g>
      <g transform="translate(270,130)">
        <rect width="12" height="12" fill={C.forest} />
        <text x="20" y="11" fill={C.forest} fontSize="12">
          国际 {intl}
        </text>
        <rect y="26" width="12" height="12" fill={C.gold} />
        <text x="20" y="37" fill={C.forest} fontSize="12">
          中国 {cn}
        </text>
      </g>
    </svg>
  )
}

export function AgeTopicMatrixChart() {
  const dims = ['知识', '能力', '兴趣', '健康', '人格']
  const heat = [
    [3, 2, 2, 3, 3],
    [2, 3, 3, 3, 2],
    [3, 3, 2, 2, 2],
    [3, 3, 3, 2, 2],
    [2, 3, 3, 2, 3],
    [3, 3, 3, 2, 3],
    [2, 3, 2, 2, 3],
  ]
  const colors = [C.paper2, C.sage, C.forest]
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="年龄阶段教育主题矩阵">
      <rect width="400" height="300" rx="4" fill={C.paper} stroke={C.line} />
      {dims.map((d, j) => (
        <text key={d} x={130 + j * 52} y="48" textAnchor="middle" fill={C.gold} fontSize="11">
          {d}
        </text>
      ))}
      {ageGuides.map((g, i) => (
        <g key={g.slug}>
          <text x="100" y={78 + i * 30} textAnchor="end" fill={C.forest} fontSize="10">
            {g.range}
          </text>
          {heat[i].map((v, j) => (
            <rect key={j} x={108 + j * 52} y={62 + i * 30} width="44" height="24" rx="3" fill={colors[v - 1]} opacity={v === 1 ? 1 : 0.85} />
          ))}
        </g>
      ))}
      <text x="200" y="288" textAnchor="middle" fill={C.ink} fontSize="9" opacity="0.6">
        颜色深浅表示该阶段相对侧重，非绝对标准
      </text>
    </svg>
  )
}

export function StrategyRadarChart() {
  const values = [0.8, 0.85, 0.7, 0.9, 0.8]
  const cx = 200
  const cy = 155
  const R = 95
  const pts = strategyDimensions.map((_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2
    return { a, x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R }
  })
  const valuePts = values.map((v, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2
    return `${cx + Math.cos(a) * R * v},${cy + Math.sin(a) * R * v}`
  })
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="家庭教育五维战略雷达图">
      <rect width="400" height="300" rx="4" fill={C.paper} stroke={C.line} />
      {[0.33, 0.66, 1].map((s, i) => (
        <polygon key={i} points={pts.map((p) => `${cx + (p.x - cx) * s},${cy + (p.y - cy) * s}`).join(' ')} fill="none" stroke={C.line} />
      ))}
      {pts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={C.line} />
      ))}
      <polygon points={valuePts.join(' ')} fill={C.forest} opacity="0.18" stroke={C.forest} strokeWidth="1.6" />
      {strategyDimensions.map((d, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(a) * (R + 22)
        const y = cy + Math.sin(a) * (R + 22)
        return (
          <text key={d.slug} x={x} y={y + 4} textAnchor="middle" fill={C.forest} fontSize="11">
            {d.title}
          </text>
        )
      })}
    </svg>
  )
}

export function AnnualPlanChart() {
  const tasks = [
    { label: '阅读主线', start: 0, len: 12, color: C.forest },
    { label: '数学理解', start: 0, len: 12, color: C.sage },
    { label: '运动习惯', start: 0, len: 12, color: C.gold },
    { label: '兴趣探索', start: 1, len: 8, color: C.blue },
    { label: '项目研究', start: 4, len: 5, color: C.forest },
    { label: '年度复盘', start: 11, len: 1, color: C.gold },
  ]
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="家庭教育年度规划图">
      <rect width="400" height="300" rx="4" fill={C.paper} stroke={C.line} />
      <text x="200" y="32" textAnchor="middle" fill={C.forest} fontSize="13" fontFamily="serif">
        年度行动节奏（示意）
      </text>
      {Array.from({ length: 12 }).map((_, i) => (
        <text key={i} x={130 + i * 21} y="56" textAnchor="middle" fill={C.ink} fontSize="8" opacity="0.6">
          {i + 1}
        </text>
      ))}
      {tasks.map((t, i) => {
        const y = 70 + i * 32
        return (
          <g key={t.label}>
            <text x="118" y={y + 14} textAnchor="end" fill={C.forest} fontSize="10">
              {t.label}
            </text>
            <rect x={124 + t.start * 21} y={y} width={t.len * 21 - 4} height="18" rx="9" fill={t.color} opacity="0.85" />
          </g>
        )
      })}
      <text x="200" y="284" textAnchor="middle" fill={C.ink} fontSize="9" opacity="0.6">
        数字为月份；计划应保留空白与调整空间
      </text>
    </svg>
  )
}

export function GlobalSystemsChart() {
  const systems = [
    { name: '芬兰', a: 0.8, b: 0.7, c: 0.85 },
    { name: '新加坡', a: 0.9, b: 0.85, c: 0.6 },
    { name: '日本', a: 0.8, b: 0.8, c: 0.7 },
    { name: '美国', a: 0.7, b: 0.75, c: 0.8 },
    { name: '德国', a: 0.75, b: 0.8, c: 0.7 },
  ]
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="全球教育体系对照图">
      <rect width="400" height="300" rx="4" fill={C.paper} stroke={C.line} />
      <text x="200" y="30" textAnchor="middle" fill={C.forest} fontSize="13" fontFamily="serif">
        教育体系特征对照（定性示意）
      </text>
      <text x="150" y="52" fill={C.gold} fontSize="9">学业表现</text>
      <text x="230" y="52" fill={C.gold} fontSize="9">均衡程度</text>
      <text x="310" y="52" fill={C.gold} fontSize="9">自主空间</text>
      {systems.map((s, i) => {
        const y = 70 + i * 38
        return (
          <g key={s.name}>
            <text x="110" y={y + 12} textAnchor="end" fill={C.forest} fontSize="11">
              {s.name}
            </text>
            {[s.a, s.b, s.c].map((v, j) => (
              <g key={j}>
                <rect x={140 + j * 80} y={y} width="60" height="14" rx="3" fill={C.paper2} />
                <rect x={140 + j * 80} y={y} width={60 * v} height="14" rx="3" fill={[C.forest, C.sage, C.gold][j]} />
              </g>
            ))}
          </g>
        )
      })}
      <text x="200" y="278" textAnchor="middle" fill={C.ink} fontSize="8.5" opacity="0.65">
        比较口径：基于公开研究的定性归纳，非排名；各国历史与制度背景不同，不可简单照搬
      </text>
    </svg>
  )
}

export function ContentStatsChart() {
  const items = [
    { label: '文章', v: 30 },
    { label: '趋势', v: 15 },
    { label: '能力', v: 20 },
    { label: '发展', v: 15 },
    { label: '书籍', v: 34 },
    { label: '资源', v: 30 },
  ]
  const max = Math.max(...items.map((i) => i.v))
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="内容建设统计">
      <rect width="400" height="300" rx="4" fill={C.paper} stroke={C.line} />
      <text x="200" y="34" textAnchor="middle" fill={C.forest} fontSize="13" fontFamily="serif">
        知识库内容规模
      </text>
      {items.map((it, i) => {
        const x = 60 + i * 52
        const h = (it.v / max) * 150
        return (
          <g key={it.label}>
            <rect x={x} y={220 - h} width="34" height={h} rx="3" fill={i % 2 ? C.sage : C.forest} />
            <text x={x + 17} y={212 - h} textAnchor="middle" fill={C.gold} fontSize="11">
              {it.v}
            </text>
            <text x={x + 17} y="240" textAnchor="middle" fill={C.forest} fontSize="10">
              {it.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
