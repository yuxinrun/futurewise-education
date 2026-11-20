import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { PageHero, Callout } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { DetailSection, DetailList } from '../components/ui/DetailSection'
import { Icon } from '../components/ui/Icon'
import { contentStats } from '../lib/content'

function Shell({ kicker, title, desc, crumb, children }: { kicker: string; title: string; desc?: string; crumb: string; children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: crumb }]} />
      <PageHero kicker={kicker} title={title} desc={desc} />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>{children}</div>
      </section>
    </>
  )
}

export function About() {
  useSeo({ title: '关于我们', description: 'Futurewise 未来教育研究所的定位、理念与编辑团队说明。', path: '/about' })
  return (
    <Shell kicker="ABOUT" title="关于未来教育研究所" crumb="关于我们" desc="面向未来的智慧，而不是追逐某一种短期教育风口。">
      <DetailSection title="我们是谁">
        <p style={{ lineHeight: 1.95, fontSize: 16 }}>
          Futurewise（未来教育研究所）是一个面向未来 30 年的家庭教育规划、儿童成长与教育研究知识平台。我们以 2026—2056 年为长期视角，研究世界变化、儿童发展、教育科学与 AI 时代的能力，帮助家庭建立一套能够持续调整的教育规划系统。
        </p>
      </DetailSection>
      <DetailSection title="我们相信">
        <Callout variant="forest">
          我们不试图预测三十年后每一个孩子应该从事什么职业。教育不是替孩子安排好未来，而是帮助孩子逐渐拥有选择未来的能力。
        </Callout>
        <p style={{ lineHeight: 1.95, fontSize: 16, marginTop: 16 }}>
          教育的目标不应只是让孩子适应今天的考试制度，而应帮助孩子拥有面对未来变化的能力。我们兼顾战略视野、科学依据、现实可行性与人文关怀，不贩卖焦虑，不鼓吹内卷，不制造成功学。
        </p>
      </DetailSection>
      <DetailSection title="内容规模">
        <p style={{ lineHeight: 1.95, fontSize: 16 }}>
          目前平台收录 {contentStats.articles} 篇深度文章、{contentStats.trends} 篇未来趋势研究、{contentStats.skills} 项核心能力、{contentStats.devTopics} 个儿童发展专题、{contentStats.ageGuides} 个年龄阶段指南、{contentStats.books} 本教育书籍、{contentStats.resources} 个全球资源与 {contentStats.tools} 个家庭工具，并持续完善。
        </p>
      </DetailSection>
      <DetailSection title="联系我们">
        <p style={{ lineHeight: 1.95, fontSize: 16 }}>
          欢迎通过 <Link to="/contact" style={{ color: 'var(--gold-2)', textDecoration: 'underline' }}>联系页面</Link> 提出建议、纠错或合作意向。
        </p>
      </DetailSection>
    </Shell>
  )
}

export function EditorialPolicy() {
  useSeo({ title: '内容编辑与审核原则', description: 'Futurewise 的科学性标准、证据分级与内容审核原则。', path: '/editorial-policy' })
  const rules = [
    '不虚构研究、论文、统计数据、专家观点和机构报告。',
    '不把教育相关性研究当成因果证明。',
    '不把单一研究结论说成科学共识。',
    '区分科学证据、专家观点、经验和个人判断。',
    '不夸大早期教育或某种训练的效果。',
    '不制造家长焦虑。',
    '不宣称某种教育路径保证成功。',
    '不把未来职业预测当成事实。',
    '不对儿童进行未经验证的心理、智力和人格诊断。',
    '尊重儿童的个体差异、发展节奏和自主性。',
    '对心理健康、发展障碍等专业问题，建议咨询合格专业人员。',
    '重要论点尽量提供原始研究、系统综述或权威机构来源。',
    '为内容标注来源、发布日期和最后核查日期。',
    '对存在争议的主题，主动展示不同观点和证据局限。',
  ]
  return (
    <Shell kicker="EDITORIAL POLICY" title="内容编辑与审核原则" crumb="编辑原则" desc="科学性是本网站最重要的底线。以下原则约束每一篇内容。">
      <DetailSection title="十四条审核原则">
        <DetailList items={rules} numbered />
      </DetailSection>
      <DetailSection title="未来预测的证据分级">
        <p style={{ lineHeight: 1.95, fontSize: 16, marginBottom: 16 }}>
          对 2035、2045、2056 年的社会、职业与技术趋势，我们明确区分四个层次，不把预测写成确定事实：
        </p>
        <DetailList items={['已发生的事实：有可靠来源记录的现状。', '当前趋势：正在发生、有数据支持的方向。', '合理推断：基于趋势与机制的推论，注明不确定性。', '未来情景：多种可能性假设，用于思考而非预言。']} />
      </DetailSection>
      <DetailSection title="文章结构标准">
        <p style={{ lineHeight: 1.95, fontSize: 16 }}>
          深度文章尽量包含：值得思考的问题、核心结论、背景与时代变化、相关科学理论与研究、深入分析、对孩子成长的影响、分龄实践方法、家庭具体行动、学校与社会可以做什么、常见误区、不同观点与局限、行动清单、延伸阅读与参考资料。
        </p>
      </DetailSection>
      <Callout variant="blue" title="纠错">
        若发现事实错误、引用不当或表述夸大，欢迎通过联系页面指出，我们会核实并更新内容的最后核查日期。
      </Callout>
    </Shell>
  )
}

export function Sources() {
  useSeo({ title: '参考资料', description: 'Futurewise 内容的主要来源类型、权威机构与引用方法。', path: '/sources' })
  return (
    <Shell kicker="SOURCES" title="参考资料与来源说明" crumb="参考资料" desc="我们优先引用原始研究、系统综述与权威机构报告，而非二手解读。">
      <DetailSection title="来源类型">
        <DetailList items={[
          '同行评审的发展心理学、认知科学与学习科学研究。',
          '权威机构的系统综述与证据清单（如 Education Endowment Foundation、What Works Clearinghouse）。',
          '国际组织报告（如 UNESCO、OECD、UNICEF、世界银行）。',
          '大学研究机构与专业智库的公开研究。',
          '经典教育著作的原版与经核实的译本。',
        ]} />
      </DetailSection>
      <DetailSection title="机构资源">
        <p style={{ lineHeight: 1.95, fontSize: 16 }}>
          完整的国际与中国机构目录见 <Link to="/resources" style={{ color: 'var(--gold-2)', textDecoration: 'underline' }}>全球教育资源</Link>。每个机构都标注性质、研究领域与经核实的官方网站。
        </p>
      </DetailSection>
      <DetailSection title="引用与核查">
        <p style={{ lineHeight: 1.95, fontSize: 16 }}>
          每篇内容标注发布日期与最后核查日期。书籍核实作者与出版信息，无法确认的译名或版本会明确标注。未来趋势内容区分事实、趋势、推断与情景。我们不会编造网址、研究或统计数据。
        </p>
      </DetailSection>
      <Callout>外部链接指向第三方网站，其内容时效与观点由原机构负责，阅读时请留意研究方法与适用条件。</Callout>
    </Shell>
  )
}

export function Privacy() {
  useSeo({ title: '隐私说明', description: 'Futurewise 不收集个人数据，工具数据仅保存在浏览器本地。', path: '/privacy' })
  return (
    <Shell kicker="PRIVACY" title="隐私说明" crumb="隐私说明" desc="这是一个静态知识网站，不需要登录，也不收集你的个人数据。">
      <DetailSection title="我们不收集什么">
        <DetailList items={['不要求注册或登录。', '不收集姓名、邮箱、儿童信息等个人数据。', '不使用云端数据库存储你的工具数据。', '不接入第三方广告或行为追踪脚本。']} />
      </DetailSection>
      <DetailSection title="工具数据如何保存">
        <p style={{ lineHeight: 1.95, fontSize: 16 }}>
          家庭教育工具箱、收藏与最近阅读等数据，仅保存在你浏览器的 localStorage 中（键名前缀 futurewise:），不会上传到任何服务器。更换浏览器、设备或清除缓存会导致数据丢失，请使用工具内的导出功能定期备份。
        </p>
      </DetailSection>
      <DetailSection title="外部链接">
        <p style={{ lineHeight: 1.95, fontSize: 16 }}>
          资源目录中的官方网站链接指向第三方机构。访问这些网站时，其隐私政策由对应机构负责。
        </p>
      </DetailSection>
      <Callout variant="blue">本站为静态站点，托管于 GitHub Pages。托管平台可能记录标准的访问日志，详情请参阅 GitHub 的隐私声明。</Callout>
    </Shell>
  )
}

export function Contact() {
  useSeo({ title: '联系我们', description: '向 Futurewise 提出建议、纠错或合作意向。', path: '/contact' })
  return (
    <Shell kicker="CONTACT" title="联系我们" crumb="联系我们" desc="欢迎建议、纠错、内容合作与资源推荐。">
      <DetailSection title="反馈渠道">
        <p style={{ lineHeight: 1.95, fontSize: 16, marginBottom: 16 }}>
          本项目开源托管于 GitHub。你可以通过仓库的 Issues 提交内容纠错、功能建议或资源推荐：
        </p>
        <a className="btn" href="https://github.com/futurewise-education/futurewise-education/issues" target="_blank" rel="noopener noreferrer">
          <Icon name="external" size={16} /> 前往 GitHub Issues
        </a>
      </DetailSection>
      <DetailSection title="我们尤其欢迎">
        <DetailList items={['指出事实错误、引用不当或夸大表述。', '推荐经得起核实的教育书籍与研究机构。', '分享真实可操作的家庭教育实践经验。', '对栏目结构与工具提出改进建议。']} />
      </DetailSection>
      <Callout>涉及儿童心理健康或发展障碍的具体问题，请咨询合格专业人员，本站不提供个体诊断或咨询。</Callout>
    </Shell>
  )
}
