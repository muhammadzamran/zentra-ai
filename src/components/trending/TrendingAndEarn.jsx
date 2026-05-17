import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TrendingUp, Zap, ExternalLink, DollarSign, Briefcase, Globe } from 'lucide-react'
import { play } from '../../lib/sounds'

gsap.registerPlugin(ScrollTrigger)

const TRENDING = [
  { name:'Suno',         reason:'AI music blowing up',           change:'+840%', color:'#10B981', url:'https://suno.com' },
  { name:'Bolt.new',     reason:'Full apps from one prompt',     change:'+620%', color:'#7C3AED', url:'https://bolt.new' },
  { name:'Grok',         reason:'Real-time X data access',       change:'+510%', color:'#06B6D4', url:'https://grok.x.ai' },
  { name:'Gamma',        reason:'Instant AI presentations',      change:'+390%', color:'#F97316', url:'https://gamma.app' },
  { name:'Flux',         reason:'Best image quality right now',  change:'+350%', color:'#F59E0B', url:'https://blackforestlabs.ai' },
  { name:'Perplexity',   reason:'Google killer AI search',       change:'+280%', color:'#EF4444', url:'https://perplexity.ai' },
]

const EARN_IDEAS = [
  {
    icon: Briefcase,
    title: 'AI Freelancing',
    earning: '$500–$5,000/mo',
    desc: 'Offer AI services on Fiverr/Upwork — content writing, image generation, video creation, automation.',
    tools: ['ChatGPT', 'Midjourney', 'ElevenLabs'],
    color: '#7C3AED',
  },
  {
    icon: Globe,
    title: 'Build AI SaaS',
    earning: '$1,000–$50,000/mo',
    desc: 'Use Bolt or Cursor to build micro-SaaS tools. Validate fast, charge monthly subscriptions.',
    tools: ['Bolt', 'Claude', 'Cursor'],
    color: '#06B6D4',
  },
  {
    icon: Zap,
    title: 'AI Content Creator',
    earning: '$200–$3,000/mo',
    desc: 'Start a YouTube or newsletter about AI tools. Grow fast — AI content is the hottest niche.',
    tools: ['ChatGPT', 'Runway ML', 'Canva AI'],
    color: '#F59E0B',
  },
  {
    icon: DollarSign,
    title: 'Sell AI Art & Music',
    earning: '$100–$2,000/mo',
    desc: 'Generate and sell AI art on Etsy, or AI music on streaming platforms via Suno and Udio.',
    tools: ['Midjourney', 'Suno', 'Udio'],
    color: '#10B981',
  },
]

export function TrendingSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tr-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        y:40, opacity:0, duration:0.6, stagger:0.08, ease:'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-28 px-6 bg-[#050505] border-t border-white/[0.03]">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-z-red text-[10px] tracking-[0.3em] uppercase mb-3">Trending Now</p>
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold text-white mb-3">
            What's hot this week 🔥
          </h2>
          <p className="text-z-muted text-sm">The fastest-growing AI tools right now</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRENDING.map((t, i) => (
            <a key={i} href={t.url} target="_blank" rel="noreferrer"
              onMouseEnter={() => play('hover')} onClick={() => play('click')}
              className="tr-card glass rounded-xl p-5 group hover:border-white/10 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={13} style={{ color: t.color }}/>
                  <span className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: t.color }}>{t.change}</span>
                </div>
                <ExternalLink size={11} className="text-[#333] group-hover:text-z-muted transition-colors"/>
              </div>
              <p className="text-white font-grotesk font-bold text-base mb-1">{t.name}</p>
              <p className="text-z-muted text-xs">{t.reason}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EarnWithAI() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.earn-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        y:50, opacity:0, duration:0.7, stagger:0.12, ease:'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-28 px-6 border-t border-white/[0.03]">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-z-amber text-[10px] tracking-[0.3em] uppercase mb-3">Earn with AI</p>
          <h2 className="text-4xl md:text-5xl font-grotesk font-bold text-white mb-3">
            Turn AI into<br/>
            <span className="grad-a">income.</span>
          </h2>
          <p className="text-z-muted text-sm max-w-lg mx-auto">
            Real ways students and professionals are making money with AI tools right now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {EARN_IDEAS.map((e, i) => {
            const Icon = e.icon
            return (
              <div key={i} className="earn-card glass rounded-2xl p-6 hover:border-white/08 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: e.color + '15', border:`1px solid ${e.color}25` }}>
                    <Icon size={18} style={{ color: e.color }}/>
                  </div>
                  <div>
                    <h3 className="text-white font-grotesk font-bold text-base">{e.title}</h3>
                    <p className="font-mono text-xs font-bold mt-0.5" style={{ color: e.color }}>
                      {e.earning}
                    </p>
                  </div>
                </div>

                <p className="text-z-muted text-sm leading-relaxed mb-4">{e.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-[#333] mr-1">Tools:</span>
                  {e.tools.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded glass text-z-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
