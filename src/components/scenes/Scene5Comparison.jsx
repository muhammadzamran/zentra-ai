import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X, Minus, Plus, ExternalLink } from 'lucide-react'
import { play } from '../../lib/sounds'

gsap.registerPlugin(ScrollTrigger)

const TOOL_DATA = {
  'ChatGPT':    { price:'Free / $20', speed:'Fast',    context:'128K', api:true,  mobile:true,  img:true,  code:true,  best:'Writing & Chat',   color:'#10B981' },
  'Claude':     { price:'Free / $20', speed:'Fast',    context:'200K', api:true,  mobile:true,  img:true,  code:true,  best:'Long-form & Code',  color:'#7C3AED' },
  'Gemini':     { price:'Free / $20', speed:'Fast',    context:'1M',   api:true,  mobile:true,  img:true,  code:true,  best:'Google Workspace',  color:'#06B6D4' },
  'Perplexity': { price:'Free / $20', speed:'Fast',    context:'32K',  api:true,  mobile:true,  img:false, code:false, best:'Research & Search', color:'#F59E0B' },
  'Midjourney': { price:'$10-$60',    speed:'Medium',  context:'—',    api:false, mobile:false, img:true,  code:false, best:'AI Art',            color:'#8B5CF6' },
  'DALL-E 3':   { price:'Credits',    speed:'Medium',  context:'—',    api:true,  mobile:false, img:true,  code:false, best:'Precise Images',    color:'#EF4444' },
  'Stable Diffusion':{ price:'Free',  speed:'Variable',context:'—',    api:true,  mobile:false, img:true,  code:false, best:'Local/Custom',      color:'#14B8A6' },
  'GitHub Copilot':  { price:'$10',   speed:'Fast',    context:'8K',   api:false, mobile:false, img:false, code:true,  best:'Code Completion',   color:'#7C3AED' },
  'Cursor':     { price:'Free / $20', speed:'Fast',    context:'64K',  api:false, mobile:false, img:false, code:true,  best:'AI Code Editor',    color:'#06B6D4' },
  'Suno':       { price:'Free / $10', speed:'Fast',    context:'—',    api:false, mobile:true,  img:false, code:false, best:'Music Generation',  color:'#10B981' },
  'ElevenLabs': { price:'Free / $5',  speed:'Fast',    context:'—',    api:true,  mobile:true,  img:false, code:false, best:'Voice Cloning',     color:'#F97316' },
  'Gamma':      { price:'Free / $10', speed:'Fast',    context:'—',    api:false, mobile:true,  img:false, code:false, best:'Presentations',     color:'#F59E0B' },
}

const ALL_TOOLS = Object.keys(TOOL_DATA)

const FEATURES = [
  { key:'price',  label:'Price' },
  { key:'speed',  label:'Speed' },
  { key:'context',label:'Context Window' },
  { key:'api',    label:'Has API',   bool:true },
  { key:'mobile', label:'Mobile App',bool:true },
  { key:'img',    label:'Images',    bool:true },
  { key:'code',   label:'Coding',    bool:true },
  { key:'best',   label:'Best For' },
]

export default function Scene5Comparison() {
  const ref      = useRef(null)
  const [selected, setSelected] = useState(['ChatGPT','Claude'])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cmp-title', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y:50, opacity:0, duration:0.9, ease:'power3.out'
      })
      gsap.from('.cmp-table', {
        scrollTrigger: { trigger: ref.current, start: 'top 60%' },
        y:40, opacity:0, duration:0.8, ease:'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const toggle = (t) => {
    play('click')
    if (selected.includes(t)) {
      if (selected.length > 2) setSelected(s => s.filter(x => x !== t))
    } else {
      if (selected.length < 3) setSelected(s => [...s, t])
    }
  }

  const BoolCell = ({ val }) => val
    ? <Check size={14} className="text-z-green mx-auto"/>
    : <X     size={14} className="text-z-red mx-auto"/>

  return (
    <section ref={ref} className="py-28 px-6 border-t border-white/[0.03]">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="cmp-title text-center mb-14">
          <p className="text-z-cyan text-[10px] tracking-[0.3em] uppercase mb-3">
            Comparison Engine
          </p>
          <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-4">
            Choose smarter,<br/>
            <span className="text-z-cyan text-glow-c">not harder.</span>
          </h2>
          <p className="text-z-muted text-sm">Select 2–3 tools to compare side by side</p>
        </div>

        {/* Tool selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {ALL_TOOLS.map(t => {
            const data = TOOL_DATA[t]
            const sel  = selected.includes(t)
            return (
              <button key={t}
                onMouseEnter={() => play('hover')} onClick={() => toggle(t)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border
                            transition-all ${sel
                  ? 'text-white border-opacity-60' : 'text-z-muted border-[#1a1a1a] hover:text-white'
                }`}
                style={sel ? { borderColor: data.color + '60', background: data.color + '12', color: data.color } : {}}>
                {sel ? <Minus size={10}/> : <Plus size={10}/>}
                {t}
              </button>
            )
          })}
        </div>

        {/* Comparison table */}
        <div className="cmp-table glass rounded-2xl overflow-hidden border border-white/[0.04]">
          {/* Header */}
          <div className="grid border-b border-white/[0.04]"
            style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr)` }}>
            <div className="px-4 py-4 text-[#333] text-[10px] tracking-widest uppercase">Feature</div>
            {selected.map(t => (
              <div key={t} className="px-4 py-4 text-center border-l border-white/[0.04]">
                <div className="inline-flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full"
                    style={{ background: TOOL_DATA[t].color }}/>
                  <p className="text-white font-grotesk font-semibold text-sm">{t}</p>
                </div>
                <p className="text-z-muted text-[10px] mt-0.5">{TOOL_DATA[t].best}</p>
              </div>
            ))}
          </div>

          {/* Rows */}
          {FEATURES.map((f, fi) => (
            <div key={f.key}
              className="grid border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors"
              style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr)` }}>
              <div className="px-4 py-3.5 text-z-muted text-xs font-medium flex items-center">
                {f.label}
              </div>
              {selected.map(t => {
                const val = TOOL_DATA[t][f.key]
                return (
                  <div key={t} className="px-4 py-3.5 text-center border-l border-white/[0.03]
                                          flex items-center justify-center">
                    {f.bool
                      ? <BoolCell val={val} />
                      : <span className="text-white text-xs">{val}</span>
                    }
                  </div>
                )
              })}
            </div>
          ))}

          {/* Visit row */}
          <div className="grid"
            style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr)` }}>
            <div className="px-4 py-4 text-z-muted text-xs font-medium flex items-center">Visit</div>
            {selected.map(t => (
              <div key={t} className="px-4 py-4 flex justify-center border-l border-white/[0.03]">
                <a href={`https://${t.toLowerCase().replace(/ /g,'')}.${t === 'ChatGPT' ? 'com' : t === 'DALL-E 3' ? 'openai.com' : 'com'}`}
                  target="_blank" rel="noreferrer"
                  onMouseEnter={() => play('hover')} onClick={() => play('click')}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{ background: TOOL_DATA[t].color + '15', color: TOOL_DATA[t].color,
                           border:`1px solid ${TOOL_DATA[t].color}30` }}>
                  Open <ExternalLink size={10}/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
