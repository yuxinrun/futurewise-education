import { useState } from 'react'
import { timelineNodes } from '../../data/timeline'
import { TagList } from '../ui/Common'

export function Timeline({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0)
  const node = timelineNodes[active]
  return (
    <div>
      <div className="timeline-strip" role="tablist" aria-label="未来 30 年时间轴">
        {timelineNodes.map((n, i) => (
          <button
            key={n.year}
            role="tab"
            aria-selected={i === active}
            className={`timeline-node ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            <div className="timeline-node__year">{n.year}</div>
            <div className="timeline-node__title">{n.title}</div>
          </button>
        ))}
      </div>
      <div className="timeline-detail" role="tabpanel">
        <div>
          <div className="timeline-detail__year">{node.year}</div>
          <div className="timeline-detail__phase">{node.phase}</div>
          <div style={{ marginTop: 16 }}>
            <TagList tags={node.tags} />
          </div>
        </div>
        <div>
          <h3 className="timeline-detail__title">{node.title}</h3>
          <div className="timeline-detail__grid">
            <div>
              <div className="timeline-detail__label">世界变化</div>
              <p className="timeline-detail__text">{node.world}</p>
            </div>
            <div>
              <div className="timeline-detail__label">教育影响</div>
              <p className="timeline-detail__text">{node.education}</p>
            </div>
            <div>
              <div className="timeline-detail__label">家庭可做</div>
              <p className="timeline-detail__text">{node.family}</p>
            </div>
          </div>
          {!compact && (
            <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 18, marginBottom: 0 }}>
              <strong style={{ color: 'var(--gold-2)' }}>不确定性提示：</strong>
              {node.uncertainty}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
