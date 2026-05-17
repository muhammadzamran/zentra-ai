import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ExternalLink, Zap } from 'lucide-react'
import { play } from '../../lib/sounds'

gsap.registerPlugin(ScrollTrigger)

const WORKFLOWS = [
  {
    goal: 'Start a YouTube Channel',
    color: '#EF4444',
    steps: [
      { step:'Idea & Script',  tool:'ChatGPT',    action:'Generate video scripts & titles',    url:'https://chat.openai.com', color:'#10B981' },
      { step:'Voiceover',      tool:'ElevenLabs', action:'Clone voice or pick AI narrator',    url:'https://elevenlabs.io',   color:'#7C3AED' },
      { step:'Video Edit',     tool:'Runway ML',  action:'AI-powered video generation & edit', url:'https://runwayml.com',    color:'#EF4444' },
      { step:'Thumbnail',      tool:'Canva AI',   action:'Design click-worthy thumbnails',     url:'https://canva.com',       color:'#06B6D4' },
      { step:'Publish',        tool:'YouTube',    action:'Upload and optimize with AI tags',   url:'https://youtube.com',     color:'#F59E0B' },
    ]
  },
  {
    goal: 'Launch a SaaS Product',
    color: '#7C3AED',
    steps: [
      { step:'Idea Validate',  tool:'ChatGPT',    action:'Research market & validate idea',    url:'https://chat.openai.com', color:'#10B981' },
      { step:'Build App',      tool:'Bolt',       action:'Generate full-stack code from prompt',url:'https://bolt.new',       color:'#7C3AED' },
      { step:'Design UI',      tool:'Framer',     action:'Beautiful website & landing page',   url:'https://framer.com',      color:'#F59E0B' },
      { step:'Write Copy',     tool:'Jasper',     action:'Marketing copy & landing page text', url:'https://jasper.ai',       color:'#06B6D4' },
      { step:'Deploy',         tool:'Vercel',     action:'Push live in one command',           url:'https://vercel.com',      color:'#EF4444' },
    ]
  },
  {
    goal: 'Freelance as AI Artist',
    color: '#06B6D4',
    steps: [
      { step:'Portfolio',      tool:'Midjourney', action:'Generate stunning AI artwork',       url:'https://midjourney.com',  color:'#8B5CF6' },
      { step:'Website',        tool:'Framer',     action:'Build your portfolio site',          url:'https://framer.com',      color:'#F59E0B' },
      { step:'Sell Art',       tool:'Gumroad',    action:'Sell AI art packs & presets',        url:'https://gumroad.com',     color:'#10B981' },
      { step:'Market',         tool:'Canva AI',   action:'Create social content to promote',  url:'https://canva.com',       color:'#06B6D4' },
      { step:'Scale',          tool:'ChatGPT',    action:'Write client proposals & emails',   url:'https://chat.openai.com', color:'#EF4444' },
    ]
  },
  {
    goal: 'Create Online Course',
    color: '#F59E0B',
    steps: [
      { step:'Outline',        tool:'ChatGPT',    action:'Generate complete course structure', url:'https://chat.openai.com', color:'#10B981' },
      { step:'Slides',         tool:'Gamma',      action:'Build beautiful slide decks',        url:'https://gamma.app',       color:'#F97316' },
      { step:'Record',         tool:'Descript',   action:'Record, edit audio/video with AI',  url:'https://descript.com',    color:'#06B6D4' },
      { step:'Thumbnails',     tool:'Canva AI',   action:'Design course cover images',        url:'https://canva.com',       color:'#7C3AED' },
      { step:'Publish',        tool:'Gumroad',    action:'Sell your course instantly',        url:'https://gumroad.com',     color:'#EF4444' },
    ]
  },
]

export default function Scene6Workflow() {
  const ref      = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wf-title', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y:50, opacity:0, duration:0.9, ease:'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Animate nodes when workflow changes
  useEffect(() => {
    gsap.from('.wf-node', {
      scale: 0.8, opacity: 0, duration: 0.5,
      stagger: 0.1, ease: 'back.out(1.4)'
    })
    gsap.from('.wf-arrow', {
      scaleX: 0, opacity: 0, duration: 0.4,
      stagger: 0.1, ease: 'power2.out', delay: 0.1
    })
  }, [active])

  const wf = WORKFLOWS[active]

  return (
    <section ref={ref} className="py-28 px-6 bg-[#050505] border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="wf-title text-center mb-14">
          <p className="text-z-amber text-[10px] tracking-[0.3em] uppercase mb-3">
            Workflow Generator
          </p>
          <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-4">
            Turn ideas into<br/>
            <span className="grad-a">execution.</span>
          </h2>
          <p className="text-z-muted text-sm max-w-lg mx-auto">
            Select a goal and see the exact AI tool chain to make it happen.
          </p>
        </div>

        {/* Goal tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {WORKFLOWS.map((w, i) => (
            <button key={i}
              onMouseEnter={() => play('hover')} onClick={() => { play('click'); setActive(i) }}
              className={`text-xs px-4 py-2 rounded-xl border font-medium transition-all ${
                active === i ? 'text-white' : 'text-z-muted border-[#1a1a1a] hover:text-white'
              }`}
              style={active === i ? {
                background: w.color + '15',
                borderColor: w.color + '50',
                color: w.color
              } : {}}>
              {w.goal}
            </button>
          ))}
        </div>

        {/* Workflow pipeline */}
        <div className="glass rounded-2xl p-8 border border-white/[0.04]">

          {/* Active goal label */}
          <div className="flex items-center gap-2 mb-8">
            <Zap size={14} style={{ color: wf.color }} />
            <span className="text-white font-grotesk font-semibold">{wf.goal}</span>
          </div>

          {/* Desktop horizontal pipeline */}
          <div className="hidden md:flex items-start gap-0">
            {wf.steps.map((s, i) => (
              <div key={i} className="flex items-start flex-1">
                <div className="flex-1">
                  <div className="wf-node flex flex-col items-center text-center">
                    {/* Step number */}
                    <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center
                                    text-xs font-bold mb-3"
                      style={{ borderColor: s.color + '60', color: s.color, background: s.color + '12' }}>
                      {i + 1}
                    </div>
                    {/* Tool card */}
                    <a href={s.url} target="_blank" rel="noreferrer"
                      onMouseEnter={() => play('hover')} onClick={() => play('click')}
                      className="w-full glass rounded-xl p-4 hover:border-white/10 transition-all
                                 group cursor-pointer">
                      <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center
                                      justify-center font-grotesk font-bold text-sm"
                        style={{ background: s.color + '15', color: s.color }}>
                        {s.tool[0]}
                      </div>
                      <p className="text-white text-xs font-semibold mb-1 group-hover:text-z-violet
                                    transition-colors">{s.tool}</p>
                      <p className="text-z-muted text-[10px] leading-relaxed">{s.action}</p>
                      <div className="flex items-center justify-center gap-1 mt-2 opacity-0
                                      group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px]" style={{ color: s.color }}>Open</span>
                        <ExternalLink size={9} style={{ color: s.color }}/>
                      </div>
                    </a>
                    <p className="text-z-muted text-[10px] mt-2 tracking-wide">{s.step}</p>
                  </div>
                </div>

                {/* Arrow */}
                {i < wf.steps.length - 1 && (
                  <div className="wf-arrow flex items-center justify-center w-8 pt-8 shrink-0">
                    <ArrowRight size={14} className="text-[#222]"/>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile vertical pipeline */}
          <div className="md:hidden space-y-3">
            {wf.steps.map((s, i) => (
              <div key={i} className="wf-node">
                <a href={s.url} target="_blank" rel="noreferrer"
                  onMouseEnter={() => play('hover')} onClick={() => play('click')}
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:border-white/10
                             transition-all group">
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center
                                  text-xs font-bold shrink-0"
                    style={{ borderColor: s.color + '60', color: s.color }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{s.tool}
                      <span className="text-z-muted font-normal text-xs ml-2">— {s.step}</span>
                    </p>
                    <p className="text-z-muted text-xs">{s.action}</p>
                  </div>
                  <ExternalLink size={12} className="text-[#333] group-hover:text-z-muted shrink-0"/>
                </a>
                {i < wf.steps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className="w-px h-3" style={{ background: wf.color + '30' }}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
