import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Logo size={40} />
              <div>
                <div className="footer-brand__name">Futurewise</div>
                <div className="footer-brand__slogan">未来教育研究所</div>
              </div>
            </div>
            <p className="footer-brand__note">
              我们不试图预测三十年后每一个孩子应该从事什么职业，也不试图给出一套适用于所有家庭的教育答案。教育不是替孩子安排好未来，而是帮助孩子逐渐拥有选择未来的能力。
            </p>
          </div>

          <div className="footer-col">
            <h4>研究</h4>
            <Link to="/future-2056">未来 30 年</Link>
            <Link to="/future-skills">未来核心能力</Link>
            <Link to="/child-development">儿童发展科学</Link>
            <Link to="/learning-science">学习科学</Link>
            <Link to="/ai-education">AI 时代教育</Link>
            <Link to="/future-school">未来学校</Link>
          </div>

          <div className="footer-col">
            <h4>实践</h4>
            <Link to="/family-education">家庭教育</Link>
            <Link to="/career-life">职业与人生</Link>
            <Link to="/age-guides">年龄阶段指南</Link>
            <Link to="/tools">家庭工具箱</Link>
            <Link to="/tools/strategy-map">战略地图</Link>
            <Link to="/knowledge-map">知识图谱</Link>
          </div>

          <div className="footer-col">
            <h4>资源</h4>
            <Link to="/articles">深度文章</Link>
            <Link to="/books">教育书籍</Link>
            <Link to="/resources">全球资源</Link>
            <Link to="/search">全站搜索</Link>
            <Link to="/editorial-policy">编辑原则</Link>
            <Link to="/sources">参考资料</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Futurewise · 未来教育研究所 · Plan for the Future, Not Just the Next Exam.</span>
          <span style={{ display: 'flex', gap: 18 }}>
            <Link to="/about">关于</Link>
            <Link to="/privacy">隐私</Link>
            <Link to="/contact">联系</Link>
            <Link to="/editorial-policy">内容原则</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
