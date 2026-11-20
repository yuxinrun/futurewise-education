import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'

export function NotFound() {
  useSeo({ title: '页面未找到', path: '/404' })
  return (
    <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <div className="kicker" style={{ marginBottom: 16 }}>404</div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--forest)', marginBottom: 16 }}>
        这一页还没有被写出来
      </h1>
      <p style={{ maxWidth: 460, margin: '0 auto 32px', color: 'var(--ink-2)', lineHeight: 1.9 }}>
        你访问的地址可能已调整，或内容仍在建设中。未来教育研究所正在持续完善，欢迎从首页重新探索。
      </p>
      <Link to="/" className="btn">返回首页</Link>
    </div>
  )
}
