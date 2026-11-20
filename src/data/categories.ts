import type { CategoryId } from '../types'

export interface Category {
  id: CategoryId
  label: string
  en: string
  route: string
  kicker: string
  description: string
  accent: number
}

export const categories: Category[] = [
  {
    id: 'future-2056',
    label: '未来 30 年',
    en: 'FUTURE 2056',
    route: '/future-2056',
    kicker: '2026 — 2056',
    description:
      '以三十年为尺度观察技术、经济、人口与社会变化，区分已知事实、当前趋势、合理推断与未来情景，讨论它们对儿童教育意味着什么。',
    accent: 0,
  },
  {
    id: 'future-skills',
    label: '未来核心能力',
    en: 'FUTURE SKILLS',
    route: '/future-skills',
    kicker: '长期有价值的能力',
    description:
      '系统研究批判性思维、创造力、学习能力、AI 素养、情绪管理与独立人格等能力：定义、发展基础、分龄培养、家庭与学校实践、常见误区。',
    accent: 1,
  },
  {
    id: 'child-development',
    label: '儿童发展科学',
    en: 'CHILD DEVELOPMENT',
    route: '/child-development',
    kicker: '理解成长规律',
    description:
      '大脑发育、认知、语言、阅读、注意力、执行功能、情绪与社会性发展。尊重年龄差异与个体差异，说明证据边界。',
    accent: 2,
  },
  {
    id: 'family-education',
    label: '家庭教育',
    en: 'FAMILY EDUCATION',
    route: '/family-education',
    kicker: '日常中的教育战略',
    description:
      '亲子关系、沟通、独立性、内在动机、习惯与边界。强调真实生活中可操作的方法，而不是空洞口号。',
    accent: 3,
  },
  {
    id: 'learning-science',
    label: '学习科学',
    en: 'LEARNING SCIENCE',
    route: '/learning-science',
    kicker: '如何真正学会',
    description:
      '间隔重复、主动回忆、刻意练习、深度阅读、知识迁移、元认知与学习动机。解释原理，并转化为家庭可执行的方案。',
    accent: 4,
  },
  {
    id: 'ai-education',
    label: 'AI 时代教育',
    en: 'AI & EDUCATION',
    route: '/ai-education',
    kicker: '与智能共处',
    description:
      'AI 素养、人机协作、信息核验、数字安全与屏幕健康。既不把 AI 描绘成万能工具，也不制造恐慌。',
    accent: 5,
  },
  {
    id: 'future-school',
    label: '未来学校',
    en: 'FUTURE SCHOOL',
    route: '/future-school',
    kicker: '全球教育观察',
    description:
      '观察芬兰、新加坡、日本、美国、英国、德国等教育体系与项目式、探究式、个性化学习。注意历史背景与适用条件，不做简单排名。',
    accent: 6,
  },
  {
    id: 'career-life',
    label: '未来职业与人生',
    en: 'CAREER & LIFE',
    route: '/career-life',
    kicker: '保留人生选择',
    description:
      '职业趋势、专业选择、经济素养、人生决策、价值观与幸福能力。不将职业预测包装成确定的职业名单。',
    accent: 7,
  },
]
