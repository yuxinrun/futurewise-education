import type { WeeklyNote } from '../types'

export const weeklyNotes: WeeklyNote[] = [
  {
    slug: 'issue-01',
    issue: 1,
    date: '2026-11-16',
    title: '当答案变得便宜，问题变得昂贵',
    question: '如果孩子随时能得到一个看起来正确的答案，我们还需要教他什么？',
    body: [
      '生成式 AI 让“得到一个答案”的成本接近于零。但答案的质量并不因此自动提高：它可能流畅、自信，却缺少证据，甚至完全错误。',
      '这意味着教育的重心需要前移：从“记住答案”转向“提出值得回答的问题”，从“完成作业”转向“判断这个答案是否可信”。',
      '家庭里可以做一个很小的练习：让孩子先写下自己的猜测，再向 AI 提问，最后比较两者差异，并追问“我们怎么知道谁更接近事实”。',
    ],
    action: '本周和孩子一起核验一个 AI 给出的说法，找到至少一个独立来源。',
    related: [
      { label: 'AI 素养', to: '/future-skills/ai-literacy' },
      { label: '信息判断能力', to: '/future-skills/information-judgment' },
    ],
  },
  {
    slug: 'issue-02',
    issue: 2,
    date: '2026-11-09',
    title: '空白时间不是浪费',
    question: '为什么把孩子的时间填满，反而可能减少学习？',
    body: [
      '大脑在休息与自由游戏中整理经验、建立联系。被完全安排的时间表，剥夺了孩子发起活动、处理无聊与自我调节的机会。',
      '无聊并不等于空虚。它常常是自主兴趣的起点：当孩子必须自己决定做什么时，才开始练习选择与投入。',
      '最好的教育规划，不是把孩子安排得没有空白，而是给成长留下探索的空间。',
    ],
    action: '本周保留两段各 45 分钟以上、完全由孩子支配的时间，不评价、不干预。',
    related: [
      { label: '游戏与学习', to: '/child-development/play-and-learning' },
      { label: '兴趣先于专业化', to: '/articles/interest-before-specialization' },
    ],
  },
  {
    slug: 'issue-03',
    issue: 3,
    date: '2026-11-02',
    title: '睡眠是最被低估的教育投资',
    question: '如果只能改变一件事，为什么应该先改变作息？',
    body: [
      '睡眠参与记忆巩固、情绪调节与注意力恢复。长期睡眠不足的孩子，可能表现为“不专心”“脾气差”“学得慢”，而原因并不在学习方法。',
      '很多家庭在课外安排上不断加码，却默认睡眠可以被压缩。这是一个顺序错误：先有稳定的身体状态，才谈得上高效学习。',
      '把睡眠当作不可协商的基础设施，比增加一节辅导课更接近教育本质。',
    ],
    action: '本周记录七天入睡与起床时间，找出被侵蚀的 30 分钟，并把它还给孩子。',
    related: [
      { label: '睡眠与成长', to: '/child-development/sleep-and-growth' },
      { label: '身体健康维度', to: '/tools/strategy-map' },
    ],
  },
]
