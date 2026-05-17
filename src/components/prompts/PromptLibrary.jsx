import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Copy, Check, BookOpen } from 'lucide-react'
import { play } from '../../lib/sounds'

gsap.registerPlugin(ScrollTrigger)

const PROMPTS = {
  'Writing': [
    { title:'Blog Post Writer',     prompt:'Write a 1000-word SEO-optimized blog post about [TOPIC]. Include an intro, 5 sections with H2 headings, and a conclusion with a CTA. Tone: conversational and informative.' },
    { title:'Email Cold Outreach',  prompt:'Write a cold email to [PERSON/COMPANY] about [YOUR OFFER]. Keep it under 100 words. Focus on value, not features. End with a clear single CTA.' },
    { title:'LinkedIn Post Viral',  prompt:'Write a LinkedIn post about [TOPIC] that starts with a shocking one-liner, shares a personal story, gives 3 actionable tips, and ends with a question to drive comments.' },
    { title:'Product Description',  prompt:'Write a compelling product description for [PRODUCT]. Highlight 3 key benefits, address the main pain point it solves, and include social proof language.' },
  ],
  'Coding': [
    { title:'Debug My Code',        prompt:'Here is my code: [PASTE CODE]. It gives this error: [ERROR]. Explain what is wrong, why it happens, and give me the fixed code with comments explaining each change.' },
    { title:'Code Review',          prompt:'Review this code for: 1) bugs 2) performance issues 3) security vulnerabilities 4) best practices violations. Give specific line numbers and fixes.' },
    { title:'Build a Feature',      prompt:'I am building [APP TYPE] with [TECH STACK]. I need a [FEATURE NAME] feature. Give me the complete code with file structure, all required files, and setup instructions.' },
    { title:'Explain Code Simply',  prompt:'Explain this code to me like I am a beginner: [PASTE CODE]. Break it down line by line in simple English. Use analogies where helpful.' },
  ],
  'Freelancing': [
    { title:'Proposal Template',    prompt:'Write a winning Fiverr/Upwork proposal for a [JOB TYPE] gig. I have [X YEARS] experience. Highlight my skills, ask 2 smart questions about their project, and end with a specific CTA. Max 150 words.' },
    { title:'Client Pricing Reply', prompt:'A client said my rate of $[AMOUNT] is too high. Write a confident, professional response that justifies my value without sounding defensive. Offer one alternative option.' },
    { title:'Project Scope Doc',    prompt:'Create a project scope document for [PROJECT TYPE]. Include: objectives, deliverables, timeline, what is included, what is NOT included, and payment terms.' },
    { title:'Follow-up Email',      prompt:'I sent a proposal to [CLIENT] 3 days ago and got no reply. Write a short, non-pushy follow-up email that adds value and has a clear CTA.' },
  ],
  'Business': [
    { title:'Business Plan Section',prompt:'Write the [SECTION: Executive Summary / Market Analysis / Revenue Model] for a business plan for [BUSINESS IDEA]. Be specific with realistic numbers and data.' },
    { title:'SWOT Analysis',        prompt:'Do a detailed SWOT analysis for [BUSINESS/IDEA]. For each point (Strengths, Weaknesses, Opportunities, Threats), give 4 specific, actionable points with brief explanations.' },
    { title:'Investor Pitch',       prompt:'Write a 60-second elevator pitch for [STARTUP IDEA]. Include: the problem, solution, market size, business model, traction, and ask. Make it compelling and memorable.' },
    { title:'Social Media Strategy',prompt:'Create a 30-day social media content strategy for [BUSINESS] targeting [AUDIENCE] on [PLATFORM]. Include content types, posting frequency, hashtag strategy, and 5 sample post ideas.' },
  ],
}

export default function PromptLibrary() {
  const ref       = useRef(null)
  const [cat,     setCat]     = useState('Writing')
  const [copied,  setCopied]  = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pl-title', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y:50, opacity:0, duration:0.9, ease:'power3.out'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const copy = (text, i) => {
    navigator.clipboard.writeText(text)
    play('click')
    setCopied(i)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section ref={ref} className="py-28 px-6 border-t border-white/[0.03]">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="pl-title text-center mb-14">
          <p className="text-z-green text-[10px] tracking-[0.3em] uppercase mb-3">
            Prompt Library
          </p>
          <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-4">
            Top AI prompts.<br/>
            <span className="text-z-green">Ready to use.</span>
          </h2>
          <p className="text-z-muted text-sm">Copy, paste, and get results. 16 battle-tested prompts.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {Object.keys(PROMPTS).map(c => (
            <button key={c}
              onMouseEnter={() => play('hover')} onClick={() => { play('click'); setCat(c) }}
              className={`text-xs px-4 py-2 rounded-lg border font-medium transition-all ${
                cat === c
                  ? 'bg-z-green/15 text-z-green border-z-green/40'
                  : 'text-z-muted border-[#1a1a1a] hover:text-white'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Prompts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMPTS[cat].map((p, i) => (
            <div key={i} className="glass rounded-xl p-5 group hover:border-white/08 transition-all">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={13} className="text-z-green shrink-0" />
                  <p className="text-white text-sm font-semibold">{p.title}</p>
                </div>
                <button onClick={() => copy(p.prompt, i)}
                  onMouseEnter={() => play('hover')}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-z-green/10
                             transition-all shrink-0">
                  {copied === i
                    ? <Check size={12} className="text-z-green"/>
                    : <Copy  size={12} className="text-z-muted group-hover:text-white transition-colors"/>
                  }
                </button>
              </div>
              <p className="text-z-muted text-xs leading-relaxed font-mono bg-white/[0.02]
                            px-3 py-2.5 rounded-lg border border-white/[0.04] line-clamp-3">
                {p.prompt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
