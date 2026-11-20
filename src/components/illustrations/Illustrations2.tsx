const C = {
  forest: '#243C35',
  forest2: '#2F4F45',
  ink: '#242B2A',
  sage: '#84978A',
  gold: '#B99A61',
  blue: '#6E91A5',
  paper: '#F8F7F2',
  paper2: '#EEECE3',
  line: 'rgba(36,59,53,0.16)',
}
const frame = { fill: C.paper, stroke: C.line }

export function LearningPyramidIllustration() {
  const levels = [
    { w: 280, label: '讲授 / 阅读', note: '被动' },
    { w: 230, label: '视听 / 演示', note: '' },
    { w: 180, label: '讨论 / 实践', note: '主动' },
    { w: 130, label: '教授他人 / 即时应用', note: '' },
  ]
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="学习金字塔示意（证据有限）">
      <rect width="400" height="320" rx="4" {...frame} />
      {levels.map((l, i) => {
        const y = 60 + i * 48
        return (
          <g key={i}>
            <rect x={200 - l.w / 2} y={y} width={l.w} height="38" rx="3" fill={i >= 2 ? C.forest : C.paper2} stroke={C.sage} />
            <text x="200" y={y + 24} textAnchor="middle" fill={i >= 2 ? C.paper : C.forest} fontSize="11">
              {l.label}
            </text>
          </g>
        )
      })}
      <text x="200" y="278" textAnchor="middle" fill={C.gold} fontSize="10">
        主动学习通常更有效，但具体百分比缺乏可靠证据
      </text>
      <text x="200" y="296" textAnchor="middle" fill={C.ink} fontSize="9" opacity="0.6">
        此图仅为示意，不应视为普遍有效的科学定律
      </text>
    </svg>
  )
}

export function ReadingFlowIllustration() {
  const steps = ['输入', '理解', '连接', '表达', '创造']
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="阅读与知识积累流程图">
      <rect width="400" height="300" rx="4" {...frame} />
      {steps.map((s, i) => {
        const x = 50 + i * 75
        const y = 150 - Math.sin((i / 4) * Math.PI) * 40
        return (
          <g key={s}>
            <circle cx={x} cy={y} r="26" fill={i === 4 ? C.gold : C.paper2} stroke={C.forest} strokeWidth="1.2" />
            <text x={x} y={y + 4} textAnchor="middle" fill={C.forest} fontSize="11">
              {s}
            </text>
            {i < 4 && <path d={`M${x + 27} ${y - 6}q20-14 40-6`} fill="none" stroke={C.sage} strokeWidth="1.2" />}
          </g>
        )
      })}
      <text x="200" y="230" textAnchor="middle" fill={C.forest} fontSize="11">
        阅读不只是输入，更是连接与创造
      </text>
    </svg>
  )
}

export function AnnualPlanIllustration() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="家庭教育年度规划图">
      <rect width="400" height="300" rx="4" {...frame} />
      <text x="200" y="46" textAnchor="middle" fill={C.forest} fontSize="13" fontFamily="serif">
        年度主题
      </text>
      <rect x="120" y="58" width="160" height="26" rx="13" fill={C.forest} />
      <text x="200" y="76" textAnchor="middle" fill={C.gold} fontSize="11">
        方向 · 不超过 5 个目标
      </text>
      {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => (
        <g key={q}>
          <rect x={40 + i * 84} y="120" width="72" height="60" rx="4" fill={C.paper2} stroke={C.sage} />
          <text x={76 + i * 84} y="145" textAnchor="middle" fill={C.forest} fontSize="12">
            {q}
          </text>
          <text x={76 + i * 84} y="164" textAnchor="middle" fill={C.ink} fontSize="9" opacity="0.7">
            季度行动
          </text>
        </g>
      ))}
      <path d="M200 84v36" stroke={C.gold} strokeWidth="1.4" />
      <rect x="60" y="210" width="280" height="34" rx="4" fill={C.paper2} stroke={C.gold} />
      <text x="200" y="232" textAnchor="middle" fill={C.forest} fontSize="11">
        月度复盘 · 有效 / 问题 / 调整
      </text>
      <path d="M200 180v30" stroke={C.sage} strokeWidth="1.2" strokeDasharray="3 3" />
    </svg>
  )
}

export function ObservationMatrixIllustration() {
  const rows = ['阅读', '运动', '情绪', '社会性']
  const cols = ['观察', '支持', '复盘']
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="儿童成长观察矩阵">
      <rect width="400" height="300" rx="4" {...frame} />
      {cols.map((c, j) => (
        <text key={c} x={150 + j * 80} y="60" textAnchor="middle" fill={C.gold} fontSize="11">
          {c}
        </text>
      ))}
      {rows.map((r, i) => (
        <g key={r}>
          <text x="80" y={104 + i * 48} textAnchor="end" fill={C.forest} fontSize="11">
            {r}
          </text>
          {cols.map((_, j) => (
            <rect key={j} x={118 + j * 80} y={84 + i * 48} width="64" height="34" rx="3" fill={(i + j) % 2 ? C.paper2 : C.paper} stroke={C.sage} />
          ))}
        </g>
      ))}
      <text x="200" y="284" textAnchor="middle" fill={C.ink} fontSize="9" opacity="0.6">
        记录事件，而非贴标签
      </text>
    </svg>
  )
}

export function CareerShiftIllustration() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="未来职业变化图">
      <rect width="400" height="300" rx="4" {...frame} />
      <path d="M50 220h300" stroke={C.line} />
      <path d="M60 200q80-10 140-60t140-70" fill="none" stroke={C.forest} strokeWidth="1.8" />
      <path d="M60 210q90 0 150-20t130-10" fill="none" stroke={C.gold} strokeWidth="1.6" strokeDasharray="5 4" />
      <text x="330" y="80" fill={C.forest} fontSize="10">
        判断 / 创造
      </text>
      <text x="330" y="190" fill={C.gold} fontSize="10">
        流程 / 重复
      </text>
      <text x="60" y="248" fill={C.ink} fontSize="10" opacity="0.7">
        今天
      </text>
      <text x="320" y="248" fill={C.ink} fontSize="10" opacity="0.7">
        未来
      </text>
      <text x="200" y="278" textAnchor="middle" fill={C.ink} fontSize="9" opacity="0.6">
        任务价值迁移示意，非具体职业预测
      </text>
    </svg>
  )
}

export function KnowledgeMapIllustration() {
  const nodes = [
    { x: 200, y: 150, r: 26, label: '创造力', main: true },
    { x: 110, y: 90, r: 18, label: '游戏' },
    { x: 290, y: 90, r: 18, label: '范围' },
    { x: 110, y: 210, r: 18, label: '动机' },
    { x: 290, y: 210, r: 18, label: 'AI' },
    { x: 200, y: 56, r: 16, label: '书籍' },
    { x: 200, y: 244, r: 16, label: '实践' },
  ]
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="未来教育知识地图">
      <rect width="400" height="300" rx="4" {...frame} />
      {nodes.slice(1).map((n, i) => (
        <line key={i} x1="200" y1="150" x2={n.x} y2={n.y} stroke={C.line} />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.main ? C.forest : C.paper2} stroke={n.main ? C.gold : C.sage} strokeWidth="1.3" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={n.main ? C.paper : C.forest} fontSize={n.main ? 11 : 9}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function TimelineIllustration() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="未来30年时间轴">
      <rect width="400" height="300" rx="4" {...frame} />
      <path d="M40 200h320" stroke={C.forest} strokeWidth="1.6" />
      {[2026, 2035, 2045, 2056].map((y, i) => {
        const x = 50 + i * 100
        return (
          <g key={y}>
            <circle cx={x} cy="200" r="6" fill={C.gold} />
            <text x={x} y="228" textAnchor="middle" fill={C.forest} fontSize="11">
              {y}
            </text>
            <rect x={x - 30} y={120 - i * 12} width="60" height={50 + i * 12} rx="3" fill={C.paper2} stroke={C.sage} opacity="0.8" />
          </g>
        )
      })}
      <text x="200" y="70" textAnchor="middle" fill={C.forest} fontSize="12" fontFamily="serif">
        基础 → 复合 → 自主
      </text>
    </svg>
  )
}

export function StrategyMapIllustration() {
  const dims = ['知识', '能力', '兴趣', '健康', '人格']
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="家庭教育战略地图">
      <rect width="400" height="300" rx="4" {...frame} />
      {dims.map((d, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
        const x = 200 + Math.cos(angle) * 90
        const y = 150 + Math.sin(angle) * 90
        return (
          <g key={d}>
            <line x1="200" y1="150" x2={x} y2={y} stroke={C.line} />
            <circle cx={x} cy={y} r="26" fill={C.paper2} stroke={C.gold} strokeWidth="1.3" />
            <text x={x} y={y + 4} textAnchor="middle" fill={C.forest} fontSize="11">
              {d}
            </text>
          </g>
        )
      })}
      <circle cx="200" cy="150" r="24" fill={C.forest} />
      <text x="200" y="146" textAnchor="middle" fill={C.paper} fontSize="10">
        家庭
      </text>
      <text x="200" y="160" textAnchor="middle" fill={C.gold} fontSize="8">
        战略
      </text>
    </svg>
  )
}
