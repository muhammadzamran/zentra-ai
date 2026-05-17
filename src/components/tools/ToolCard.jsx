import { ExternalLink, Star } from 'lucide-react'
import { play } from '../../lib/sounds'
import { categories } from '../../data/tools'

export default function ToolCard({ tool }) {
  const cat = categories.find(c => c.id === tool.category)

  return (
    <a href={tool.url} target="_blank" rel="noreferrer"
      onMouseEnter={() => play('hover')} onClick={() => play('click')}
      className="tool-card glass rounded-xl p-5 flex flex-col gap-3 group
                 hover:border-white/10 hover:shadow-lg transition-all block">

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        {/* Icon letter */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                        font-grotesk font-bold text-base"
          style={{
            background: (cat?.color || '#7C3AED') + '15',
            color: cat?.color || '#7C3AED',
            border: `1px solid ${(cat?.color || '#7C3AED')}25`
          }}>
          {tool.name[0]}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {tool.badge && (
            <span className="badge"
              style={{ background: tool.badgeColor + '15', color: tool.badgeColor,
                       border:`1px solid ${tool.badgeColor}30` }}>
              {tool.badge}
            </span>
          )}
          {tool.free && (
            <span className="badge" style={{ background:'#10B98115', color:'#10B981',
                                             border:'1px solid #10B98130' }}>
              Free
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-white font-grotesk font-semibold text-sm group-hover:text-z-violet
                         transition-colors">
            {tool.name}
          </h3>
          <ExternalLink size={11} className="text-z-muted opacity-0 group-hover:opacity-100
                                             transition-opacity shrink-0" />
        </div>
        <p className="text-z-muted text-xs mt-1.5 leading-relaxed line-clamp-2">{tool.desc}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-auto">
        {tool.tags.slice(0,3).map(t => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04]
                                   text-z-muted border border-white/[0.04]">
            #{t}
          </span>
        ))}
      </div>
    </a>
  )
}
