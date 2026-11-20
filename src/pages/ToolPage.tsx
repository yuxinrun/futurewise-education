import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { ToolDef, ToolField } from '../types'
import { useSeo, breadcrumbJsonLd } from '../lib/seo'
import { getTool } from '../lib/content'
import { useLocalStorage, useFavorites } from '../lib/hooks'
import { downloadJson, parseJsonFile } from '../lib/storage'
import { uid } from '../lib/utils'
import { skills } from '../data/skills'
import { strategyDimensions, strategyPrinciples } from '../data/strategy'
import { getSkill, getArticle } from '../lib/content'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { PageHero, Callout, EmptyState, RelatedLink } from '../components/ui/Common'
import { StrategyMapIllustration } from '../components/illustrations/Illustrations2'
import { StrategyRadarChart } from '../components/charts/Charts'
import { NotFound } from './NotFound'
import { Icon } from '../components/ui/Icon'

interface RecordItem {
  id: string
  createdAt: string
  data: Record<string, string>
}

const emptyDraft = (fields: ToolField[]) => Object.fromEntries(fields.map((f) => [f.key, ''])) as Record<string, string>

function Field({ field, value, onChange }: { field: ToolField; value: string; onChange: (v: string) => void }) {
  const full = field.type === 'textarea'
  return (
    <div className={`form-field ${full ? 'form-field--full' : ''}`}>
      <label htmlFor={`f-${field.key}`}>{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea id={`f-${field.key}`} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : field.type === 'select' ? (
        <select id={`f-${field.key}`} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">请选择</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input id={`f-${field.key}`} type={field.type} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.hint && <span className="form-hint">{field.hint}</span>}
    </div>
  )
}

function RecordsTool({ tool }: { tool: ToolDef }) {
  const fields = tool.fields || []
  const [records, setRecords] = useLocalStorage<RecordItem[]>(`tool:${tool.slug}`, [])
  const [draft, setDraft] = useState<Record<string, string>>(() => emptyDraft(fields))
  const [editing, setEditing] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: string, v: string) => setDraft((d) => ({ ...d, [key]: v }))

  const submit = () => {
    if (!Object.values(draft).some((v) => v.trim())) {
      setMsg('请至少填写一项内容。')
      return
    }
    if (editing) {
      setRecords((prev) => prev.map((r) => (r.id === editing ? { ...r, data: draft } : r)))
      setEditing(null)
    } else {
      setRecords((prev) => [{ id: uid(), createdAt: new Date().toISOString(), data: draft }, ...prev])
    }
    setDraft(emptyDraft(fields))
    setMsg('')
  }

  const edit = (r: RecordItem) => {
    setDraft({ ...emptyDraft(fields), ...r.data })
    setEditing(r.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const remove = (id: string) => setRecords((prev) => prev.filter((r) => r.id !== id))

  const exportData = () => downloadJson(`futurewise-${tool.slug}.json`, { tool: tool.slug, exportedAt: new Date().toISOString(), records })

  const importData = async (file: File) => {
    try {
      const parsed = (await parseJsonFile(file)) as { records?: RecordItem[] } | RecordItem[]
      const incoming = Array.isArray(parsed) ? parsed : parsed.records
      if (!Array.isArray(incoming)) throw new Error('格式不符')
      const valid = incoming.filter((r) => r && typeof r === 'object' && r.data)
      setRecords((prev) => [...valid.map((r) => ({ ...r, id: r.id || uid() })), ...prev])
      setMsg(`已导入 ${valid.length} 条记录。`)
    } catch {
      setMsg('导入失败：请选择由本工具导出的 JSON 文件。')
    }
  }

  const clearAll = () => {
    if (window.confirm('确定清空本工具的全部记录？此操作不可撤销，建议先导出备份。')) {
      setRecords([])
      setMsg('已清空。')
    }
  }

  const titleKey = fields[0]?.key

  return (
    <div className="tool-shell">
      <div>
        <div className="tool-panel">
          <h3 className="tool-panel__title" style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>
            {editing ? '编辑记录' : '新增记录'}
          </h3>
          <div className="form-grid">
            {fields.map((f) => (
              <Field key={f.key} field={f} value={draft[f.key] || ''} onChange={(v) => set(f.key, v)} />
            ))}
          </div>
          <div className="form-actions">
            <button className="btn btn--sm" onClick={submit}>
              <Icon name={editing ? 'check' : 'plus'} size={15} /> {editing ? '保存修改' : '添加记录'}
            </button>
            {editing && (
              <button className="btn btn--ghost btn--sm" onClick={() => { setEditing(null); setDraft(emptyDraft(fields)) }}>
                取消
              </button>
            )}
          </div>
          {msg && <p className="form-hint" style={{ marginTop: 12, color: 'var(--gold-2)' }}>{msg}</p>}
        </div>

        <div style={{ marginTop: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--forest)' }}>记录（{records.length}）</h3>
          </div>
          {records.length === 0 ? (
            <EmptyState title="还没有记录" desc="从上方表单开始第一条记录。数据只保存在本浏览器。" />
          ) : (
            <div className="record-list">
              {records.map((r) => (
                <div key={r.id} className="record-item">
                  <div className="record-item__head">
                    <span className="record-item__title">{r.data[titleKey] || '未命名记录'}</span>
                    <div className="record-item__actions">
                      <button className="mini-btn" onClick={() => edit(r)}>编辑</button>
                      <button className="mini-btn mini-btn--danger" onClick={() => remove(r.id)}>删除</button>
                    </div>
                  </div>
                  <div className="record-item__fields">
                    {fields.filter((f) => f.key !== titleKey && r.data[f.key]).map((f) => (
                      <div key={f.key} className="record-item__field">
                        <span className="record-item__label">{f.label}</span>
                        <span className="record-item__value">{r.data[f.key]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <aside className="tool-sidebar">
        <div className="tool-note">
          <h4 style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>用途</h4>
          <p style={{ margin: 0, lineHeight: 1.8 }}>{tool.purpose}</p>
        </div>
        <div className="tool-note">
          <h4 style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>局限与提醒</h4>
          <ul>
            {tool.limits.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="tool-note">
          <h4 style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>数据管理</h4>
          <div className="data-actions">
            <button className="mini-btn" onClick={exportData} disabled={!records.length}>
              <Icon name="download" size={13} /> 导出 JSON
            </button>
            <button className="mini-btn" onClick={() => fileRef.current?.click()}>
              <Icon name="upload" size={13} /> 导入 JSON
            </button>
            <button className="mini-btn mini-btn--danger" onClick={clearAll} disabled={!records.length}>
              <Icon name="trash" size={13} /> 清空全部
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) importData(f)
                e.target.value = ''
              }}
            />
          </div>
        </div>
      </aside>
    </div>
  )
}

function FavoritesTool() {
  const { favorites, setFavorites } = useFavorites()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')
  const typeLabel: Record<string, string> = { article: '文章', trend: '趋势', skill: '能力', dev: '发展', age: '年龄', book: '书籍', resource: '资源', tool: '工具' }
  return (
    <div className="tool-shell">
      <div>
        {favorites.length === 0 ? (
          <EmptyState title="收藏夹是空的" desc="在文章、书籍、能力等页面点击“收藏”，会自动同步到这里。" action={<Link to="/articles" className="btn btn--ghost btn--sm">去浏览文章</Link>} />
        ) : (
          <div className="record-list">
            {favorites.map((f) => (
              <div key={f.id} className="record-item">
                <div className="record-item__head">
                  <Link to={f.route} className="record-item__title">{f.title}</Link>
                  <div className="record-item__actions">
                    <span className="tag">{typeLabel[f.type] || f.type}</span>
                    <button className="mini-btn mini-btn--danger" onClick={() => setFavorites((prev) => prev.filter((x) => x.id !== f.id))}>移除</button>
                  </div>
                </div>
                <div className="form-hint">收藏于 {new Date(f.savedAt).toLocaleDateString('zh-CN')}</div>
              </div>
            ))}
          </div>
        )}
        {msg && <p className="form-hint" style={{ marginTop: 12, color: 'var(--gold-2)' }}>{msg}</p>}
      </div>
      <aside className="tool-sidebar">
        <div className="tool-note">
          <h4 style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>用途</h4>
          <p style={{ margin: 0, lineHeight: 1.8 }}>把分散的资源集中起来，形成家庭自己的知识库。站内收藏会自动同步到这里。</p>
        </div>
        <div className="tool-note">
          <h4 style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>数据管理</h4>
          <div className="data-actions">
            <button className="mini-btn" disabled={!favorites.length} onClick={() => downloadJson('futurewise-favorites.json', { exportedAt: new Date().toISOString(), favorites })}>
              <Icon name="download" size={13} /> 导出 JSON
            </button>
            <button className="mini-btn" onClick={() => fileRef.current?.click()}>
              <Icon name="upload" size={13} /> 导入 JSON
            </button>
            <input ref={fileRef} type="file" accept="application/json" style={{ display: 'none' }} onChange={async (e) => {
              const f = e.target.files?.[0]
              e.target.value = ''
              if (!f) return
              try {
                const parsed = (await parseJsonFile(f)) as { favorites?: typeof favorites }
                if (Array.isArray(parsed.favorites)) {
                  setFavorites((prev) => [...parsed.favorites!, ...prev.filter((p) => !parsed.favorites!.some((n) => n.id === p.id))])
                  setMsg('导入成功。')
                } else throw new Error()
              } catch {
                setMsg('导入失败：文件格式不符。')
              }
            }} />
          </div>
        </div>
      </aside>
    </div>
  )
}

const matrixCols = [
  { label: '学龄前 0—6', min: 0, max: 6 },
  { label: '小学低 6—9', min: 6, max: 9 },
  { label: '小学高 9—12', min: 9, max: 12 },
  { label: '中学 12—18', min: 12, max: 18 },
]

function parseRange(stage: string): [number, number] {
  const nums = stage.match(/\d+/g)?.map(Number) || []
  return [nums[0] ?? 0, nums[1] ?? nums[0] ?? 18]
}

function MatrixTool() {
  return (
    <div>
      <Callout variant="blue" title="如何使用">
        每次聚焦 2—3 项能力即可，不必全部都要。阶段是参考而非标准，个体差异显著。点击能力名称查看详情。
      </Callout>
      <div className="matrix-scroll" style={{ marginTop: 24 }}>
        <table className="matrix-table">
          <thead>
            <tr>
              <th style={{ minWidth: 130 }}>核心能力</th>
              {matrixCols.map((c) => (
                <th key={c.label} style={{ minWidth: 180 }}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s.slug}>
                <td>
                  <Link to={`/future-skills/${s.slug}`} style={{ color: 'var(--forest)' }}>{s.title}</Link>
                </td>
                {matrixCols.map((c) => {
                  const matched = s.ages.filter((a) => {
                    const [amin, amax] = parseRange(a.stage)
                    return amin < c.max && c.min < amax
                  })
                  return <td key={c.label}>{matched.map((m) => m.practice).join(' ') || '—'}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StrategyTool() {
  return (
    <div>
      <div className="split-feature" style={{ marginBottom: 36 }}>
        <div className="split-feature__visual"><StrategyMapIllustration /></div>
        <div className="split-feature__visual"><StrategyRadarChart /></div>
      </div>
      <Callout variant="forest" title="地图用于思考，不用于比较">
        五个维度不是时间表，也不是给孩子贴标签的工具。每周只推进两三件事，留白是计划的一部分。
      </Callout>
      <div className="strategy-page-dims" style={{ marginTop: 28 }}>
        {strategyDimensions.map((d) => (
          <div key={d.slug} className="strategy-block">
            <div className="strategy-block__head">
              <div>
                <div className="kicker" style={{ marginBottom: 6 }}>{d.en}</div>
                <h3 className="strategy-block__title" style={{ fontFamily: 'var(--serif)', color: 'var(--forest)' }}>{d.title}</h3>
                <p className="strategy-block__goal">{d.goal}</p>
              </div>
            </div>
            <div className="strategy-block__body">
              <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 20 }}>{d.why}</p>
              <div className="strategy-cols">
                <div className="strategy-col">
                  <h4>年度方向</h4>
                  <ul>{d.year.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="strategy-col">
                  <h4>季度行动</h4>
                  <ul>{d.quarter.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="strategy-col">
                  <h4>每周做法</h4>
                  <ul>{d.week.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {d.skills.map((s) => {
                  const sk = getSkill(s)
                  return sk ? <Link key={s} to={`/future-skills/${sk.slug}`} className="tag tag--gold">{sk.title}</Link> : null
                })}
                {d.articles.map((s) => {
                  const a = getArticle(s)
                  return a ? <Link key={s} to={a.route} className="tag">{a.title}</Link> : null
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--forest)', marginBottom: 16 }}>四条原则</h3>
        <div className="grid grid--2">
          {strategyPrinciples.map((p, i) => (
            <Callout key={p} title={`原则 ${i + 1}`}>{p}</Callout>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ToolPage() {
  const { slug } = useParams()
  const tool = slug ? getTool(slug) : undefined
  useSeo({
    title: tool ? `${tool.title} · 家庭教育工具箱` : '家庭教育工具箱',
    description: tool?.summary,
    path: `/tools/${slug}`,
    jsonLd: tool ? breadcrumbJsonLd([{ name: '家庭教育工具箱', path: '/tools' }, { name: tool.title, path: `/tools/${slug}` }]) : undefined,
  })
  if (!tool) return <NotFound />

  return (
    <>
      <Breadcrumbs items={[{ label: '家庭教育工具箱', to: '/tools' }, { label: tool.title }]} />
      <PageHero kicker={tool.en} title={tool.title} desc={tool.summary} />
      <section className="section">
        <div className="container">
          {tool.slug === 'favorites' ? <FavoritesTool /> : tool.kind === 'matrix' ? <MatrixTool /> : tool.kind === 'reference' ? <StrategyTool /> : <RecordsTool tool={tool} />}
        </div>
      </section>
    </>
  )
}
