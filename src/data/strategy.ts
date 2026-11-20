import type { StrategyDimension } from '../types'

export const strategyDimensions: StrategyDimension[] = [
  {
    slug: 'knowledge',
    title: '基础知识',
    en: 'Foundational Knowledge',
    goal: '建立可迁移的语言、数学、科学与人文底座。',
    why:
      '知识不是过时的负担，而是思考的材料。没有足够的背景知识，阅读理解、批判性思维与创造力都难以发生。关键是知识的结构，而不是数量。',
    year: [
      '确定本年度阅读主线：一条文学线、一条知识线，各 6—10 本。',
      '数学以理解与表达为主，每周至少一次“讲给别人听”。',
      '科学以观察与提问为主，完成 2—4 个家庭小项目。',
    ],
    quarter: [
      '回顾阅读记录，调整书单难度与主题比例。',
      '检查数学是否存在“会算不会说”的断点。',
      '把一个学科主题与生活问题连接，做一次小型研究。',
    ],
    week: [
      '固定 3—5 段不被打断的阅读时间。',
      '一次家庭讨论：本周读到的一个有趣观点。',
      '一次动手或户外观察，记录一个问题。',
    ],
    indicators: ['能用自己的话复述读过的内容', '会主动提出“为什么”和“怎么知道”', '愿意尝试有难度的任务'],
    skills: ['learning-ability', 'math-logic', 'scientific-literacy', 'communication'],
    articles: ['deep-reading-in-ai-age', 'knowledge-and-judgment', 'math-thinking-not-speed'],
  },
  {
    slug: 'capability',
    title: '核心能力',
    en: 'Core Capabilities',
    goal: '培养思考、学习、协作与自我调节的通用能力。',
    why:
      '具体技能会过时，能力不会。批判性思维、创造力、复杂问题解决与自我管理，是面对不确定未来时最可靠的资产。',
    year: [
      '选择 2—3 项本年度重点能力，不贪多。',
      '为每项能力设计一个可观察的家庭场景。',
      '年末复盘：能力是否体现在真实行为中，而不只是口号。',
    ],
    quarter: [
      '做一次“能力观察”：记录 3 个具体事件，而不是打分。',
      '调整任务难度，让孩子经历“努力后成功”的完整过程。',
      '引入一次需要合作完成的家庭任务。',
    ],
    week: [
      '一次开放性问题讨论，不追求标准答案。',
      '一次由孩子主导的小决策。',
      '一次复盘：这周什么方法有效，什么无效。',
    ],
    indicators: ['遇到困难会换方法而不是立刻放弃', '能解释自己的理由', '能安排并完成一件小事'],
    skills: ['critical-thinking', 'creativity', 'complex-problem-solving', 'self-management', 'collaboration'],
    articles: ['critical-thinking-at-home', 'creativity-is-not-a-talent', 'self-regulation-before-self-study'],
  },
  {
    slug: 'exploration',
    title: '兴趣探索',
    en: 'Interest Exploration',
    goal: '在广泛尝试中发现持续投入的方向。',
    why:
      '兴趣不是被安排出来的，而是在接触、尝试与自主投入中逐渐显现。早期广泛、中期聚焦、后期深入，比过早专业化更稳健。',
    year: [
      '安排 4—6 类不同领域的接触机会：自然、艺术、运动、技术、社会、手工。',
      '允许放弃，但区分“不喜欢”与“遇到困难”。',
      '年末保留 1—2 项孩子愿意持续投入的活动。',
    ],
    quarter: [
      '回顾兴趣记录：哪些活动孩子会主动提起。',
      '为持续兴趣提供一次更真实的体验：展览、比赛、工作坊或访谈。',
      '减少一项明显消耗而无热情的安排。',
    ],
    week: [
      '保留一段完全由孩子支配的自由时间。',
      '一次低成本尝试：借一本书、看一部纪录片、做一个小实验。',
      '不评价“有没有用”，只问“你注意到了什么”。',
    ],
    indicators: ['会主动要求继续某项活动', '愿意为兴趣付出额外努力', '能说出自己喜欢什么、为什么'],
    skills: ['creativity', 'aesthetic-ability', 'learning-ability', 'independent-personality'],
    articles: ['interest-before-specialization', 'the-value-of-boredom', 'range-and-early-sampling'],
  },
  {
    slug: 'health',
    title: '身体健康',
    en: 'Physical Health',
    goal: '把睡眠、运动与视力当作教育基础设施。',
    why:
      '身体状态直接影响注意力、情绪与学习效率。睡眠不足与久坐的代价，往往比少上一节课大得多。健康不是教育的附属品，而是前提。',
    year: [
      '确立家庭睡眠底线，并优先于课外安排。',
      '保证每天户外活动与每周中高强度运动。',
      '建立视力与屏幕使用的年度检查习惯。',
    ],
    quarter: [
      '回顾作息记录，找出被侵蚀的睡眠时间。',
      '调整运动项目，让身体活动有乐趣而非任务。',
      '检查屏幕规则是否被真实执行。',
    ],
    week: [
      '每天户外时间不少于 1—2 小时（视年龄与条件）。',
      '固定睡前流程，减少夜间屏幕刺激。',
      '一次全家一起的身体活动。',
    ],
    indicators: ['入睡顺利、白天精神稳定', '运动后情绪更好', '能主动离开屏幕'],
    skills: ['emotion-management', 'self-management', 'adaptability'],
    articles: ['sleep-is-learning-infrastructure', 'movement-and-the-brain', 'screen-time-family-rules'],
  },
  {
    slug: 'character',
    title: '人格发展',
    en: 'Character & Personhood',
    goal: '形成独立、负责、有判断力与幸福能力的人。',
    why:
      '教育的终点不是履历，而是一个人如何理解自己、对待他人、面对挫折与作出选择。人格发展发生在日常关系与真实责任中。',
    year: [
      '明确家庭价值观：3 条以内，并能在生活中指出对应行为。',
      '给孩子一项真实、持续的家庭责任。',
      '建立每月一次的家庭复盘与对话习惯。',
    ],
    quarter: [
      '讨论一次失败或冲突，关注理解而非责备。',
      '让孩子参与一次影响全家的决定。',
      '回顾责任执行情况，调整难度与自主度。',
    ],
    week: [
      '一次不带评价的倾听。',
      '一次让孩子承担自然后果的机会。',
      '一次表达感谢与欣赏的家庭时刻。',
    ],
    indicators: ['能承认错误并尝试修复', '关心他人感受', '在压力下仍能表达自己'],
    skills: ['responsibility', 'moral-judgment', 'independent-personality', 'emotion-management', 'leadership'],
    articles: ['inner-motivation-not-rewards', 'how-to-handle-child-failure', 'education-anxiety-and-family-boundaries'],
  },
]

export const strategyPrinciples = [
  '五个维度不是五张时间表，而是一张地图。任何一周只需要推进其中两三件事。',
  '年度定方向，季度做调整，每周留空白。计划的价值在于可修改，而不是被完成。',
  '先保证睡眠、运动与关系，再谈知识与能力。地基不稳时，增加投入往往适得其反。',
  '每个孩子的发展节奏不同。地图用于思考，不用于比较，更不用于给孩子贴标签。',
]
