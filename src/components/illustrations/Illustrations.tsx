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

export function WorldChangesIllustration() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="未来世界六大变化示意">
      <rect x="0" y="0" width="400" height="300" rx="4" {...frame} />
      <circle cx="200" cy="150" r="58" fill="none" stroke={C.gold} strokeWidth="1.4" />
      <circle cx="200" cy="150" r="34" fill={C.forest} />
      <text x="200" y="146" textAnchor="middle" fill={C.paper} fontSize="12" fontFamily="serif">
        未来
      </text>
      <text x="200" y="162" textAnchor="middle" fill={C.gold} fontSize="10">
        2056
      </text>
      {[
        { x: 200, y: 52, label: 'AI' },
        { x: 296, y: 96, label: '工作' },
        { x: 296, y: 204, label: '城市' },
        { x: 200, y: 248, label: '气候' },
        { x: 104, y: 204, label: '人口' },
        { x: 104, y: 96, label: '生命' },
      ].map((n, i) => (
        <g key={i}>
          <line x1="200" y1="150" x2={n.x} y2={n.y} stroke={C.line} strokeWidth="1" />
          <circle cx={n.x} cy={n.y} r="24" fill={C.paper2} stroke={C.sage} strokeWidth="1.2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={C.forest} fontSize="11">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function CapabilityModelIllustration() {
  const rings = [
    { r: 40, label: '人格', color: C.forest },
    { r: 68, label: '思维', color: C.forest2 },
    { r: 96, label: '学习', color: C.sage },
    { r: 124, label: '知识', color: C.gold },
  ]
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="未来核心能力模型">
      <rect width="400" height="300" rx="4" {...frame} />
      {rings.map((ring, i) => (
        <circle key={i} cx="200" cy="150" r={ring.r} fill="none" stroke={ring.color} strokeWidth="1.4" opacity={0.8 - i * 0.12} />
      ))}
      <circle cx="200" cy="150" r="18" fill={C.forest} />
      <text x="200" y="154" textAnchor="middle" fill={C.gold} fontSize="10">
        人
      </text>
      {rings.map((ring, i) => (
        <text key={i} x="200" y={150 - ring.r + 14} textAnchor="middle" fill={ring.color} fontSize="11">
          {ring.label}
        </text>
      ))}
      <text x="200" y="284" textAnchor="middle" fill={C.ink} fontSize="10" opacity="0.6">
        由内而外：人格 → 思维 → 学习 → 知识
      </text>
    </svg>
  )
}

export function ChildStagesIllustration() {
  const stages = ['0—3', '3—6', '6—9', '9—12', '12—15', '15—18', '18+']
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="儿童发展阶段图">
      <rect width="400" height="300" rx="4" {...frame} />
      <path d="M40 230 Q200 60 360 230" fill="none" stroke={C.gold} strokeWidth="1.6" />
      {stages.map((s, i) => {
        const x = 40 + i * 53
        const t = i / (stages.length - 1)
        const y = 230 - Math.sin(t * Math.PI) * 150
        return (
          <g key={s}>
            <circle cx={x} cy={y} r={10 + i * 1.5} fill={i % 2 ? C.sage : C.forest} opacity="0.9" />
            <text x={x} y={y + 4} textAnchor="middle" fill={C.paper} fontSize="8">
              {i + 1}
            </text>
            <text x={x} y="258" textAnchor="middle" fill={C.forest} fontSize="10">
              {s}
            </text>
          </g>
        )
      })}
      <text x="200" y="284" textAnchor="middle" fill={C.ink} fontSize="10" opacity="0.6">
        发展是曲线，不是直线；个体节奏不同
      </text>
    </svg>
  )
}

export function BrainIllustration() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="大脑与认知发展示意">
      <rect width="400" height="300" rx="4" {...frame} />
      <path
        d="M150 90c-30 0-52 22-52 50 0 12 5 22 13 30-4 22 12 42 36 42 8 14 26 20 42 14V80c-14-6-30 0-39 10z"
        fill={C.paper2}
        stroke={C.forest}
        strokeWidth="1.6"
      />
      <path
        d="M250 90c30 0 52 22 52 50 0 12-5 22-13 30 4 22-12 42-36 42-8 14-26 20-42 14V80c14-6 30 0 39 10z"
        fill={C.paper2}
        stroke={C.forest}
        strokeWidth="1.6"
      />
      <path d="M200 80v146" stroke={C.gold} strokeWidth="1.4" />
      <path d="M130 130q30 10 50-6M130 165q30 8 52-4M270 130q-30 10-50-6M270 165q-30 8-52-4" fill="none" stroke={C.sage} strokeWidth="1.2" />
      <circle cx="160" cy="120" r="4" fill={C.gold} />
      <circle cx="240" cy="120" r="4" fill={C.blue} />
      <circle cx="150" cy="180" r="4" fill={C.sage} />
      <circle cx="250" cy="180" r="4" fill={C.gold} />
      <text x="200" y="262" textAnchor="middle" fill={C.forest} fontSize="11">
        经验塑造连接，连接支持思考
      </text>
      <text x="200" y="280" textAnchor="middle" fill={C.ink} fontSize="9" opacity="0.6">
        示意图，非精确解剖结构
      </text>
    </svg>
  )
}

export function LearningScienceIllustration() {
  const steps = ['编码', '巩固', '提取', '迁移']
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="学习科学原理图">
      <rect width="400" height="300" rx="4" {...frame} />
      {steps.map((s, i) => {
        const x = 60 + i * 90
        return (
          <g key={s}>
            <rect x={x - 30} y="120" width="60" height="60" rx="6" fill={i === 2 ? C.forest : C.paper2} stroke={C.sage} strokeWidth="1.2" />
            <text x={x} y="155" textAnchor="middle" fill={i === 2 ? C.paper : C.forest} fontSize="13">
              {s}
            </text>
            {i < 3 && <path d={`M${x + 32} 150h26`} stroke={C.gold} strokeWidth="1.6" markerEnd="url(#arr)" />}
          </g>
        )
      })}
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8z" fill={C.gold} />
        </marker>
      </defs>
      <path d="M330 120q40-50-40-70-120-20-200 40" fill="none" stroke={C.blue} strokeWidth="1.2" strokeDasharray="4 4" />
      <text x="200" y="60" textAnchor="middle" fill={C.blue} fontSize="10">
        间隔与反馈循环
      </text>
      <text x="200" y="230" textAnchor="middle" fill={C.forest} fontSize="11">
        主动回忆与间隔练习，比反复阅读更持久
      </text>
    </svg>
  )
}

export function FamilyEcosystemIllustration() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="家庭教育生态系统">
      <rect width="400" height="300" rx="4" {...frame} />
      <circle cx="200" cy="150" r="30" fill={C.forest} />
      <text x="200" y="146" textAnchor="middle" fill={C.paper} fontSize="11">
        孩子
      </text>
      <text x="200" y="160" textAnchor="middle" fill={C.gold} fontSize="8">
        中心
      </text>
      {[
        { x: 200, y: 60, label: '父母' },
        { x: 300, y: 110, label: '学校' },
        { x: 300, y: 200, label: '同伴' },
        { x: 200, y: 245, label: '社区' },
        { x: 100, y: 200, label: '自然' },
        { x: 100, y: 110, label: '文化' },
      ].map((n, i) => (
        <g key={i}>
          <line x1="200" y1="150" x2={n.x} y2={n.y} stroke={C.line} />
          <circle cx={n.x} cy={n.y} r="22" fill={C.paper2} stroke={C.gold} strokeWidth="1.2" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={C.forest} fontSize="10">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function AiCollaborationIllustration() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="AI 与人类协作图">
      <rect width="400" height="300" rx="4" {...frame} />
      <circle cx="130" cy="150" r="46" fill={C.paper2} stroke={C.forest} strokeWidth="1.6" />
      <circle cx="130" cy="138" r="14" fill={C.forest} />
      <path d="M106 178q24-22 48 0" fill={C.forest} />
      <text x="130" y="216" textAnchor="middle" fill={C.forest} fontSize="11">
        人：判断与意义
      </text>
      <rect x="224" y="104" width="92" height="92" rx="10" fill={C.paper2} stroke={C.blue} strokeWidth="1.6" />
      <circle cx="252" cy="140" r="6" fill={C.blue} />
      <circle cx="288" cy="140" r="6" fill={C.blue} />
      <path d="M250 168h40" stroke={C.blue} strokeWidth="2" strokeLinecap="round" />
      <text x="270" y="216" textAnchor="middle" fill={C.blue} fontSize="11">
        AI：生成与计算
      </text>
      <path d="M178 138h44M222 162h-44" stroke={C.gold} strokeWidth="1.6" markerEnd="url(#arr2)" />
      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8z" fill={C.gold} />
        </marker>
      </defs>
      <text x="200" y="262" textAnchor="middle" fill={C.ink} fontSize="10" opacity="0.7">
        协作，而非替代；人保留最终判断
      </text>
    </svg>
  )
}

export function KnowledgeAbilityIllustration() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="知识与能力关系图">
      <rect width="400" height="300" rx="4" {...frame} />
      <rect x="60" y="180" width="280" height="40" rx="4" fill={C.paper2} stroke={C.sage} />
      <text x="200" y="205" textAnchor="middle" fill={C.forest} fontSize="12">
        知识：思考的材料
      </text>
      <rect x="90" y="120" width="220" height="40" rx="4" fill={C.paper2} stroke={C.gold} />
      <text x="200" y="145" textAnchor="middle" fill={C.forest} fontSize="12">
        能力：加工与运用
      </text>
      <rect x="120" y="60" width="160" height="40" rx="4" fill={C.forest} />
      <text x="200" y="85" textAnchor="middle" fill={C.paper} fontSize="12">
        判断与创造
      </text>
      <path d="M200 180v-20M200 120v-20" stroke={C.gold} strokeWidth="1.6" />
      <text x="200" y="252" textAnchor="middle" fill={C.ink} fontSize="10" opacity="0.7">
        知识决定能理解什么，判断力决定该相信什么
      </text>
    </svg>
  )
}
