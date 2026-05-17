import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Image, PenLine, Music, Video, Code, Monitor, Bot, BookOpen, Layers, Zap, Mic } from 'lucide-react'
import { categories } from '../../data/tools'
import { play } from '../../lib/sounds'

gsap.registerPlugin(ScrollTrigger)

const ICONS = { Globe, Image, PenLine, Music, Video, Code, Monitor, Bot, BookOpen, Layers, Zap, Mic }

export default function CategoryGrid() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cg-title', {
        scrollTrigger: { trigger: ref.current, start:'top 80%' },
        y:40, opacity:0, duration:0.8, ease:'power3.out'
      })
      gsap.from('.cat-card', {
        scrollTrigger: { trigger: ref.current, start:'top 70%' },
        y:50, opacity:0, duration:0.7, stagger:0.06, ease:'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="cg-title text-center mb-16">
          <p className="text-z-violet text-[10px] tracking-[0.3em] uppercase mb-3">Browse by Category</p>
          <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-white leading-tight">
            12 Categories.<br/>
            <span className="text-z-muted font-normal">Every AI use case covered.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = ICONS[cat.icon] || Globe
            return (
              <Link key={cat.id} to={`/directory?cat=${cat.id}`}
                onMouseEnter={() => play('hover')} onClick={() => play('click')}
                className="cat-card glass rounded-xl p-5 group hover:border-white/10
                           transition-all hover:-translate-y-1.5 hover:shadow-lg"
                style={{ '--glow': cat.color + '20' }}>

                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: cat.color + '15', border:`1px solid ${cat.color}30` }}>
                  <Icon size={18} style={{ color: cat.color }} />
                </div>

                <h3 className="text-white font-grotesk font-semibold text-sm mb-1
                               group-hover:text-white transition-colors">
                  {cat.label}
                </h3>
                <p className="text-z-muted text-xs leading-relaxed">{cat.desc}</p>

                <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100
                                transition-opacity">
                  <span className="text-[10px] tracking-widest uppercase"
                    style={{ color: cat.color }}>Explore</span>
                  <span style={{ color: cat.color }} className="text-xs">→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
