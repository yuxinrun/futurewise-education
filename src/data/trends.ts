export interface TrendTopic {
  slug: string
  title: string
  en: string
  summary: string
  background: string
  tags: string[]
  accent: number
}

export const trends: TrendTopic[] = [
  {
    slug: 'ai-society',
    title: 'AI 社会',
    en: 'AI Society',
    summary: '当生成式 AI 进入日常工作与学习，社会对“会做什么”的定义正在改变。',
    background:
      '2022 年以来，大语言模型从研究系统走向大众产品。文本、图像、代码的生成成本快速下降，信息获取方式从“检索”转向“对话”。',
    tags: ['人工智能', '信息判断', 'AI 素养'],
    accent: 0,
  },
  {
    slug: 'future-work',
    title: '未来工作',
    en: 'Future of Work',
    summary: '任务被重新组合，而不是职业被整体替代；人的价值向判断、协作与创造迁移。',
    background:
      '自动化历史上更多替代的是任务而非整个职业。AI 时代这一逻辑可能延续，但认知型任务首次被大规模波及。',
    tags: ['职业结构', '自动化', '适应力'],
    accent: 1,
  },
  {
    slug: 'future-education',
    title: '未来教育',
    en: 'Future of Education',
    summary: '知识传递的稀缺性下降，动机、判断、关系与真实问题变得更重要。',
    background:
      '当讲解与练习可以被工具低成本提供，学校的独特价值转向社会化、反馈、情感支持与复杂任务组织。',
    tags: ['教育变革', '学习科学', '学校角色'],
    accent: 2,
  },
  {
    slug: 'future-university',
    title: '未来大学',
    en: 'Future University',
    summary: '学位、微证书、研究与产业合作并存，大学的功能可能被重新拆分。',
    background:
      '高等教育同时承担研究、教学、认证与社会化功能。技术与成本压力正在让这四者出现分离的可能。',
    tags: ['高等教育', '终身学习', '专业选择'],
    accent: 3,
  },
  {
    slug: 'future-city',
    title: '未来城市',
    en: 'Future City',
    summary: '城市是孩子的第一间教室：空间、交通、公共服务与自然可达性塑造日常学习。',
    background:
      '城市化仍在继续，但人口结构与气候压力改变城市形态。公共空间质量直接影响儿童的活动半径与独立性。',
    tags: ['城市生活', '公共空间', '自然教育'],
    accent: 4,
  },
  {
    slug: 'future-family',
    title: '未来家庭',
    en: 'Future Family',
    summary: '家庭规模缩小、代际结构变化，家庭教育的时间与资源约束更现实。',
    background:
      '少子化与老龄化同时发生，双职工家庭成为常态。家庭教育的核心不是增加投入，而是提高陪伴质量与系统稳定性。',
    tags: ['家庭结构', '亲子关系', '时间管理'],
    accent: 5,
  },
  {
    slug: 'future-economy',
    title: '未来经济',
    en: 'Future Economy',
    summary: '增长模式、就业形态与收入分配的变化，影响家庭对教育回报的预期。',
    background:
      '服务业占比上升、平台经济与远程工作扩展，同时人口老龄化改变储蓄与消费结构。教育投资的回报周期变得更难预测。',
    tags: ['经济素养', '财商教育', '不确定性'],
    accent: 6,
  },
  {
    slug: 'future-science',
    title: '未来科学',
    en: 'Future Science',
    summary: '生命科学、能源与材料领域的突破可能重塑健康、寿命与产业。',
    background:
      '基因编辑、mRNA 技术、储能与新材料持续推进。科学素养不只是知识，更是理解证据如何产生与修正。',
    tags: ['生物技术', '能源转型', '科学素养'],
    accent: 7,
  },
  {
    slug: 'human-technology',
    title: '未来人与技术',
    en: 'Human & Technology',
    summary: '技术不是中立背景，它改变注意力、关系与自我理解的方式。',
    background:
      '从算法推荐到可穿戴设备，技术越来越深地参与人的日常决策。教育需要帮助孩子建立与技术的主从关系。',
    tags: ['数字健康', '伦理', '注意力'],
    accent: 0,
  },
  {
    slug: 'demographics',
    title: '人口结构变化',
    en: 'Demographic Shift',
    summary: '少子化与老龄化改变教育资源分布、竞争强度与代际关系。',
    background:
      '多国生育率下降，学龄人口结构变化。学位供给、教师配置与养老负担都会影响家庭的教育决策环境。',
    tags: ['人口', '教育资源', '长期规划'],
    accent: 1,
  },
  {
    slug: 'climate-energy',
    title: '气候与能源转型',
    en: 'Climate & Energy',
    summary: '气候风险与能源系统重构，是未来三十年最确定的长期变量之一。',
    background:
      '极端天气频率与强度上升已被广泛观测。能源转型带来新产业，也带来区域经济与生活方式的调整。',
    tags: ['气候', '能源', '可持续'],
    accent: 2,
  },
  {
    slug: 'robotics-manufacturing',
    title: '机器人与智能制造',
    en: 'Robotics & Manufacturing',
    summary: '物理世界的自动化比数字世界慢，但正在加速。',
    background:
      '工业机器人密度持续上升，人形机器人仍处早期。制造、物流、照护等体力与半结构化任务面临渐进式变化。',
    tags: ['机器人', '制造', '动手实践'],
    accent: 3,
  },
  {
    slug: 'globalization',
    title: '全球化与地缘变化',
    en: 'Globalization & Geopolitics',
    summary: '供应链、人才流动与教育合作的不确定性上升，跨文化能力更重要。',
    background:
      '全球化并未终结，但形式在调整。留学、国际课程与跨国职业路径的风险与机会同时变化。',
    tags: ['跨文化', '国际教育', '风险意识'],
    accent: 4,
  },
  {
    slug: 'biotech-life',
    title: '生物技术与生命科学',
    en: 'Biotech & Life Science',
    summary: '健康、寿命与生育技术的变化，可能改变人生阶段的时间表。',
    background:
      '基因治疗与精准医疗进入临床，辅助生殖技术普及。这些变化对教育的影响更多是间接的，但值得长期观察。',
    tags: ['生命科学', '健康', '伦理'],
    accent: 5,
  },
  {
    slug: 'uncertainty',
    title: '未来社会的不确定性',
    en: 'Living with Uncertainty',
    summary: '预测的价值不在于说中未来，而在于帮助家庭建立可调整的系统。',
    background:
      '技术、政策、经济与气候变量相互耦合，长期预测误差随时间放大。教育规划应保留选择权与调整空间。',
    tags: ['情景思维', '选择权', '韧性'],
    accent: 6,
  },
]
