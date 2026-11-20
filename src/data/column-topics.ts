import type { CategoryId } from '../types'

export const columnTopics: Record<string, string[]> = {
  'family-education': [
    '家庭教育理念', '亲子关系', '家庭沟通', '独立性培养', '责任感培养', '自主学习',
    '学习习惯', '阅读习惯', '时间管理', '情绪管理', '家庭规则', '父母角色',
    '家庭教育中的边界', '如何减少教育焦虑', '如何处理孩子的失败', '如何培养内在动机',
  ],
  'learning-science': [
    '如何有效学习', '间隔重复', '主动回忆', '刻意练习', '深度阅读', '知识迁移',
    '项目式学习', '探究式学习', '跨学科学习', '元认知', '反馈机制', '学习动机',
    '注意力与学习', '考试与真实能力', '终身学习',
  ],
  'ai-education': [
    'AI 素养', '如何向孩子解释人工智能', 'AI 辅助学习', '人机协作', 'AI 与创造力',
    'AI 与批判性思维', '信息核验', '数字安全', '隐私与伦理', '算法推荐',
    '屏幕使用与数字健康', '编程与计算思维', 'AI 时代教师角色', 'AI 时代学校教育变化',
  ],
  'future-school': [
    '全球教育体系', '芬兰教育', '新加坡教育', '日本教育', '美国教育', '英国教育',
    '德国教育', '国际教育', '双语教育', '项目式学习', '探究式教学', '个性化学习',
    '学校评价', '教师角色变化', '大学教育的未来',
  ],
  'career-life': [
    '未来职业趋势', '专业选择', '职业探索', '职业适应力', '创业与创新', '经济素养',
    '财商教育', '人生决策', '风险意识', '价值观', '幸福与人生意义', '终身成长',
  ],
}

export const columnNotes: Record<string, string> = {
  'family-education': '强调真实生活中可操作的方法，而不是空洞口号。家庭教育的核心不是控制，而是支持孩子逐渐走向独立。',
  'learning-science': '解释科学原理，并给出家庭实践方案。区分有充分证据的学习策略与流行但证据有限的说法。',
  'ai-education': '既不把 AI 描绘成万能工具，也不制造恐慌。重点是帮助孩子理解、判断并与智能协作。',
  'future-school': '不同国家教育制度有其历史背景与适用条件，不能简单排名或照搬。比较时说明口径与局限。',
  'career-life': '不将职业预测包装成确定的职业名单。重点是职业适应力、判断力与保留人生选择的能力。',
}

export const columnCategory: Record<string, CategoryId> = {
  'family-education': 'family-education',
  'learning-science': 'learning-science',
  'ai-education': 'ai-education',
  'future-school': 'future-school',
  'career-life': 'career-life',
}
