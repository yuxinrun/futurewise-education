import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { PageHero, Callout } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { tools } from '../data/tools'
import { Icon, type IconName } from '../components/ui/Icon'

const toolIcons: Record<string, IconName> = {
  'education-plan': 'target',
  'growth-observation': 'activity',
  'reading-plan': 'book',
  'weekly-plan': 'calendar',
  'capability-matrix': 'grid',
  favorites: 'bookmark',
  'monthly-review': 'edit',
  'career-cards': 'compass',
  'digital-habits': 'clock',
  'annual-plan': 'layers',
  'strategy-map': 'map',
}

const kindLabel: Record<string, string> = {
  records: '记录工具',
  matrix: '对照矩阵',
  reference: '参考地图',
}

export function Tools() {
  useSeo({
    title: '家庭教育工具箱',
    description: '10 个可真正使用的家庭教育规划、记录与复盘工具。无需登录，数据保存在浏览器本地，可导出导入。',
    path: '/tools',
  })
  return (
    <>
      <Breadcrumbs items={[{ label: '家庭教育工具箱' }]} />
      <PageHero
        kicker="FAMILY TOOLKIT"
        title="家庭教育实践工具"
        desc="把理念变成可以持续使用的系统。所有工具无需注册登录，数据只保存在你的浏览器本地，支持导出、导入与清空。"
      />
      <section className="section">
        <div className="container">
          <Callout variant="blue" title="数据与隐私">
            工具数据存储在浏览器 localStorage 中，不会上传到任何服务器。更换浏览器或清除缓存会丢失数据，请定期导出备份。工具用于支持思考，不用于测评或给孩子贴标签。
          </Callout>
          <div className="tool-grid" style={{ marginTop: 32 }}>
            {tools.map((t) => (
              <Link key={t.slug} to={`/tools/${t.slug}`} className="tool-card">
                <Icon name={toolIcons[t.slug] || 'sparkles'} size={40} className="tool-card__icon" />
                <div className="tool-card__kind">{kindLabel[t.kind]}</div>
                <h3 className="tool-card__title" style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>{t.title}</h3>
                <p className="tool-card__desc">{t.summary}</p>
                <span className="link-more" style={{ fontSize: 13 }}>
                  打开工具 <Icon name="arrow-right" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
