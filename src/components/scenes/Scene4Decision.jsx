import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react'
import { play } from '../../lib/sounds'

gsap.registerPlugin(ScrollTrigger)

const GOALS = [
  {
    input: 'I want to earn online',
    tools: [
      { name: 'ChatGPT',    use: 'Write content & offers',  url: 'https://chat.openai.com',  color: '#10B981' },
      { name: 'Canva AI',   use: 'Design thumbnails & posts', url: 'https://canva.com',       color: '#06B6D4' },
      { name: 'ElevenLabs', use: 'Create voiceovers',        url: 'https://elevenlabs.io',   color: '#7C3AED' },
      { name: 'Midjourney', use: 'Sell AI art',              url: 'https://midjourney.com',  color: '#F59E0B' },
    ]
  },
  {
    input: 'I want to start a YouTube channel',
    tools: [
      { name: 'ChatGPT',    use: 'Write scripts',            url: 'https://chat.openai.com', color: '#10B981' },
      { name: 'ElevenLabs', use: 'AI voiceover',             url: 'https://elevenlabs.io',   color: '#7C3AED' },
      { name: 'Runway ML',  use: 'Edit videos with AI',      url: 'https://runwayml.com',    color: '#EF4444' },
      { name: 'Canva AI',   use: 'Create thumbnails',        url: 'https://canva.com',       color: '#06B6D4' },
    ]
  },
  {
    input: 'I want to build a website',
    tools: [
      { name: 'Bolt',       use: 'Build full-stack app',     url: 'https://bolt.new',        color: '#7C3AED' },
      { name: 'Framer',     use: 'Design & publish',         url: 'https://framer.com',      color: '#F59E0B' },
      { name: 'Claude',     use: 'Write & debug code',       url: 'https://claude.ai',       color: '#06B6D4' },
      { name: 'Cursor',     use: 'AI code editor',           url: 'https://cursor.sh',       color: '#10B981' },
    ]
  },
  {
    input: 'I want to make music',
    tools: [
      { name: 'Suno',       use: 'Generate full songs',      url: 'https://suno.com',        color: '#10B981' },
      { name: 'Udio',       use: 'Studio-quality AI music',  url: 'https://udio.com',        color: '#7C3AED' },
      { name: 'ElevenLabs', use: 'AI vocals & voice',        url: 'https://elevenlabs.io',   color: '#F59E0B' },
      { name: 'Mubert',     use: 'Background music',         url: 'https://mubert.com',      color: '#06B6D4' },
    ]
  },
]

export default function Scene4DecisionEngine() {
  const ref      = useRef(null)
  const [active, setActive]   = useState(null)
  const [typed,  setTyped]    = useState('')
  const [custom, setCustom]   = useState('')
  const [shown,  setShown]    = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.de-title', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out'
      })
      gsap.from('.de-goal', {
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
        y: 30, opacity: 0, duration: 0.6,
        stagger: 0.1, ease: 'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Typing animation
  useEffect(() => {
    if (active === null) return
    const text = GOALS[active].input
    setTyped('')
    setShown(false)
    let i = 0
    const timer = setInterval(() => {
      setTyped(text.slice(0, i + 1))
      i++
      if (i >= text.length) { clearInterval(timer); setTimeout(() => setShown(true), 300) }
    }, 40)
    return () => clearInterval(timer)
  }, [active])

  const result = active !== null ? GOALS[active] : null

  return (
    <section ref={ref}
      className="py-28 px-6 bg-[#050505] border-t border-white/[0.03]">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="de-title text-center mb-16">
          <p className="text-z-violet text-[10px] tracking-[0.3em] uppercase mb-3">
            Smart Finder
          </p>
          <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-4">
            Tell us your goal.<br/>
            <span className="grad-v">We pick your tools.</span>
          </h2>
          <p className="text-z-muted text-sm max-w-lg mx-auto">
            Not sure which AI tool to use? Select your goal and we'll
            recommend the perfect AI stack for you.
          </p>
        </div>

        {/* Goal selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {GOALS.map((g, i) => (
            <button key={i}
              onMouseEnter={() => play('hover')}
              onClick={() => { play('click'); setActive(i) }}
              className={`de-goal text-left px-5 py-4 rounded-xl border transition-all
                ${active === i
                  ? 'border-z-violet/60 bg-z-violet/10 text-white'
                  : 'glass text-z-muted hover:text-white hover:border-white/10'
                }`}>
              <p className="text-sm font-medium">"{g.input}"</p>
            </button>
          ))}
        </div>

        {/* Result panel */}
        {active !== null && (
          <div className="glass rounded-2xl overflow-hidden border border-z-violet/20">
            {/* Typing input */}
            <div className="px-6 py-4 border-b border-white/[0.04] flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-z-violet animate-pulse"/>
              <p className="text-white text-sm font-medium font-mono">
                {typed}
                <span className="inline-block w-0.5 h-4 bg-z-violet ml-0.5 animate-pulse align-middle"/>
              </p>
            </div>

            {/* Tool recommendations */}
            {shown && (
              <div className="p-6">
                <p className="text-z-muted text-xs tracking-widest uppercase mb-4">
                  Recommended AI Stack
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.tools.map((t, i) => (
                    <a key={i} href={t.url} target="_blank" rel="noreferrer"
                      onMouseEnter={() => play('hover')} onClick={() => play('click')}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border
                                 border-white/[0.05] hover:border-white/10 transition-all group
                                 bg-white/[0.02] hover:bg-white/[0.04]">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center
                                      font-grotesk font-bold text-sm shrink-0"
                        style={{ background: t.color + '15', color: t.color }}>
                        {t.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium group-hover:text-z-violet
                                      transition-colors truncate">{t.name}</p>
                        <p className="text-z-muted text-xs truncate">{t.use}</p>
                      </div>
                      <ExternalLink size={12} className="text-[#333] group-hover:text-z-muted
                                                         transition-colors shrink-0"/>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {active === null && (
          <div className="glass rounded-2xl p-10 text-center border border-dashed border-white/[0.06]">
            <Sparkles size={24} className="text-z-violet mx-auto mb-3 opacity-50"/>
            <p className="text-z-muted text-sm">Select a goal above to see your AI stack</p>
          </div>
        )}
      </div>
    </section>
  )
}
