import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { graphNodes, neighborsOf, resolveCenter, typeColors, type GraphNode } from '../lib/graph'
import { PageHero, Callout } from '../components/ui/Common'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Icon } from '../components/ui/Icon'

const W = 820
const H = 600
const CX = W / 2
const CY = H / 2

export function KnowledgeMap() {
  const [params, setParams] = useSearchParams()
  const centerId = resolveCenter(params.get('node'))
  const center = graphNodes.get(centerId)!
  const [query, setQuery] = useState('')

  const neighbors = useMemo(() => neighborsOf(centerId).slice(0, 16), [centerId])

  const positioned = useMemo(() => {
    const n = neighbors.length
    return neighbors.map((node, i) => {
      const angle = (i / Math.max(n, 1)) * Math.PI * 2 - Math.PI / 2
      const rx = 280
      const ry = 210
      return { node, x: CX + Math.cos(angle) * rx, y: CY + Math.sin(angle) * ry }
    })
  }, [neighbors])

  const select = (id: string) => setParams({ node: id })

  const matches = query.trim()
    ? [...graphNodes.values()].filter((n) => n.title.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
    : []

  useSeo({
    title: '教育知识图谱',
    description: '从一项能力、一本书或一个概念出发，探索儿童发展、学习科学、书籍与全球机构之间的知识网络。',
    path: '/knowledge-map',
  })

  return (
    <>
      <Breadcrumbs items={[{ label: '教育知识图谱' }]} />
      <PageHero
        kicker="KNOWLEDGE GRAPH"
        title="教育知识与书籍关联图谱"
        desc="知识不是孤立的条目。从“创造力”出发，可以走到儿童发展研究、学习科学文章、经典书籍与全球研究机构。点击节点即可重新展开网络。"
      />
      <section className="section">
        <div className="container">
          <div className="search-bar" style={{ position: 'relative' }}>
            <input
              className="search-input"
              placeholder="跳转到任意节点，如：创造力、阅读、Make It Stick…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {matches.length > 0 && (
              <div className="tool-panel" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20, padding: 8 }}>
                {matches.map((m) => (
                  <button key={m.id} className="mini-btn" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: 4 }} onClick={() => { select(m.id); setQuery('') }}>
                    <span>{m.title}</span>
                    <span style={{ color: 'var(--ink-3)' }}>{m.typeLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="graph-layout">
            <div>
              <div className="graph-canvas">
                <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`以${center.title}为中心的知识图谱`}>
                  {positioned.map(({ node, x, y }) => (
                    <line key={`l-${node.id}`} x1={CX} y1={CY} x2={x} y2={y} stroke="#D8D5C8" strokeWidth={1.2} />
                  ))}
                  {positioned.map(({ node, x, y }) => (
                    <g key={node.id} className="graph-node" onClick={() => select(node.id)}>
                      <circle cx={x} cy={y} r={20} fill={typeColors[node.type]} opacity={0.9} />
                      <text x={x} y={y + 36} textAnchor="middle" fontSize={12.5} fill="#242B2A">
                        {node.title.length > 12 ? node.title.slice(0, 12) + '…' : node.title}
                      </text>
                    </g>
                  ))}
                  <g className="graph-node" onClick={() => select(centerId)}>
                    <circle cx={CX} cy={CY} r={34} fill={typeColors[center.type]} />
                    <circle cx={CX} cy={CY} r={40} fill="none" stroke={typeColors[center.type]} strokeWidth={1} opacity={0.4} />
                    <text x={CX} y={CY + 5} textAnchor="middle" fontSize={13} fill="#F8F7F2" fontWeight={600}>
                      {center.title.length > 8 ? center.title.slice(0, 8) + '…' : center.title}
                    </text>
                  </g>
                </svg>
              </div>
              <div className="graph-legend">
                {Object.entries({ skill: '核心能力', dev: '发展科学', book: '书籍', article: '文章', trend: '趋势', resource: '机构', age: '年龄' }).map(([k, label]) => (
                  <span key={k}><i style={{ background: typeColors[k] }} />{label}</span>
                ))}
              </div>
              {neighbors.length === 0 && (
                <Callout>这个节点暂时没有关联条目。换一个节点继续探索。</Callout>
              )}
            </div>

            <aside className="graph-panel">
              <div className="graph-panel__type">{center.typeLabel}</div>
              <h3 className="graph-panel__title" style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>{center.title}</h3>
              <p className="graph-panel__desc">{center.summary}</p>
              <Link to={center.route} className="btn btn--sm" style={{ marginBottom: 18 }}>
                查看详情 <Icon name="arrow-right" size={15} />
              </Link>
              <div className="kicker" style={{ marginBottom: 8 }}>关联节点（{neighborsOf(centerId).length}）</div>
              <ul className="graph-links">
                {neighborsOf(centerId).slice(0, 16).map((n) => (
                  <li key={n.id}>
                    <button onClick={() => select(n.id)}>
                      <span>{n.title}</span>
                      <span style={{ color: 'var(--ink-3)', fontSize: 12 }}>{n.typeLabel}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
