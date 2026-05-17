import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Scene2Problem() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prob-word', {
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
        y: 40, opacity: 0, duration: 0.6,
        stagger: 0.08, ease: 'power3.out'
      })
      gsap.from('.prob-stat', {
        scrollTrigger: { trigger: ref.current, start: 'top 55%' },
        scale: 0.8, opacity: 0, duration: 0.5,
        stagger: 0.1, ease: 'back.out(1.5)'
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const words   = ['1,000+', 'AI', 'tools.', 'But', 'no', 'clear', 'direction.']
  const problem = [
    { num: '1000+', label: 'Tools exist',        sub: 'Most people know 3' },
    { num: '73%',   label: 'Users feel lost',    sub: 'Too many options' },
    { num: '2hrs',  label: 'Average search time', sub: 'For the right tool' },
  ]

  return (
    <section ref={ref}
      className="py-28 px-6 relative overflow-hidden border-t border-white/[0.03]">

      {/* Bg chaos particles - CSS only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full opacity-[0.04]"
            style={{
              width:  Math.random() * 200 + 50 + 'px',
              height: Math.random() * 200 + 50 + 'px',
              left:   Math.random() * 100 + '%',
              top:    Math.random() * 100 + '%',
              background: i % 2 === 0 ? '#7C3AED' : '#EF4444',
              filter: 'blur(40px)',
              transform: 'translate(-50%,-50%)',
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Kinetic title */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-16">
          {words.map((w, i) => (
            <span key={i}
              className={`prob-word font-grotesk font-bold leading-none
                ${i < 3
                  ? 'text-[clamp(40px,7vw,100px)] text-white'
                  : 'text-[clamp(40px,7vw,100px)] text-z-muted'
                }`}>
              {w}
            </span>
          ))}
        </div>

        {/* Problem stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {problem.map((p, i) => (
            <div key={i} className="prob-stat glass rounded-xl p-6 text-center
                                    border border-z-red/10">
              <p className="text-4xl md:text-5xl font-grotesk font-bold text-z-red mb-2">
                {p.num}
              </p>
              <p className="text-white text-sm font-medium mb-1">{p.label}</p>
              <p className="text-z-muted text-xs">{p.sub}</p>
            </div>
          ))}
        </div>

        {/* Bridge line */}
        <p className="text-center text-z-muted text-lg mt-16 font-medium">
          ZentraAI fixes this.{' '}
          <span className="text-white">One platform. Complete clarity.</span>
        </p>
      </div>
    </section>
  )
}
