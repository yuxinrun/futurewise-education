import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Future2056 } from './pages/Future2056'
import { Trends } from './pages/Trends'
import { TrendDetail } from './pages/TrendDetail'
import { Skills } from './pages/Skills'
import { SkillDetail } from './pages/SkillDetail'
import { ChildDevelopment } from './pages/ChildDevelopment'
import { DevDetail } from './pages/DevDetail'
import { TopicPage } from './pages/TopicPage'
import { Books } from './pages/Books'
import { BookDetail } from './pages/BookDetail'
import { Resources } from './pages/Resources'
import { AgeGuides } from './pages/AgeGuides'
import { AgeGuideDetail } from './pages/AgeGuideDetail'
import { Articles } from './pages/Articles'
import { ArticleDetail } from './pages/ArticleDetail'
import { Tools } from './pages/Tools'
import { ToolPage } from './pages/ToolPage'
import { KnowledgeMap } from './pages/KnowledgeMap'
import { Search } from './pages/Search'
import { About, EditorialPolicy, Sources, Privacy, Contact } from './pages/Static'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/future-2056" element={<Future2056 />} />
          <Route path="/future-2056/trends" element={<Trends />} />
          <Route path="/future-2056/trends/:slug" element={<TrendDetail />} />
          <Route path="/future-skills" element={<Skills />} />
          <Route path="/future-skills/:slug" element={<SkillDetail />} />
          <Route path="/child-development" element={<ChildDevelopment />} />
          <Route path="/child-development/:slug" element={<DevDetail />} />
          <Route path="/family-education" element={<TopicPage category="family-education" />} />
          <Route path="/learning-science" element={<TopicPage category="learning-science" />} />
          <Route path="/ai-education" element={<TopicPage category="ai-education" />} />
          <Route path="/future-school" element={<TopicPage category="future-school" />} />
          <Route path="/career-life" element={<TopicPage category="career-life" />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:slug" element={<BookDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/age-guides" element={<AgeGuides />} />
          <Route path="/age-guides/:age" element={<AgeGuideDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:slug" element={<ToolPage />} />
          <Route path="/knowledge-map" element={<KnowledgeMap />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
