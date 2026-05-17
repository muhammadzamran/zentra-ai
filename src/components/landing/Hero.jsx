import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'
import { play } from '../../lib/sounds'
import * as THREE from 'three'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas   = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 5

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Particles
    const count = window.innerWidth < 768 ? 800 : 2000
    const geo   = new THREE.BufferGeometry()
    const pos   = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const violet = new THREE.Color('#7C3AED')
    const cyan   = new THREE.Color('#06B6D4')
    const amber  = new THREE.Color('#F59E0B')
    const palette = [violet, cyan, amber]

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.03, vertexColors: true, transparent: true, opacity: 0.6
    })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Mouse parallax
    let mx = 0, my = 0
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.5
      my = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMove)

    let frame = 0
    const animate = () => {
      frame++
      particles.rotation.y  += 0.0003
      particles.rotation.x  += 0.0001
      camera.position.x += (mx - camera.position.x) * 0.03
      camera.position.y += (-my - camera.position.y) * 0.03
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default function Hero() {
  const heroRef = useRef(null)
  const [count, setCount] = useState({ tools: 0, cats: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.h-badge',  { y:30, opacity:0, duration:0.8, ease:'power3.out', delay:0.2 })
      gsap.from('.h-title',  { y:60, opacity:0, duration:1.0, ease:'power4.out', delay:0.4, stagger:0.12 })
      gsap.from('.h-sub',    { y:30, opacity:0, duration:0.8, ease:'power3.out', delay:0.9 })
      gsap.from('.h-cta',    { y:20, opacity:0, duration:0.7, ease:'power3.out', delay:1.1, stagger:0.1 })
      gsap.from('.h-stat',   { y:20, opacity:0, duration:0.7, ease:'power3.out', delay:1.3, stagger:0.08 })
      gsap.from('.h-cats',   { y:30, opacity:0, duration:0.8, ease:'power3.out', delay:1.6 })
    }, heroRef)

    // Counters
    const dur = 2000, start = Date.now()
    const tick = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCount({ tools: Math.floor(e * 106), cats: Math.floor(e * 12) })
      if (p >= 1) clearInterval(tick)
    }, 16)

    return () => { ctx.revert(); clearInterval(tick) }
  }, [])

  const quickCats = [
    { label:'Website AI', color:'#7C3AED', cat:'website-building' },
    { label:'Image AI',   color:'#06B6D4', cat:'image-generation' },
    { label:'Code AI',    color:'#8B5CF6', cat:'coding-assistants' },
    { label:'Music AI',   color:'#10B981', cat:'song-music' },
    { label:'Video AI',   color:'#EF4444', cat:'video-generation' },
    { label:'Write AI',   color:'#F59E0B', cat:'creative-writing' },
  ]

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center
                                      justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Three.js canvas */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[700px] h-[500px] pointer-events-none"
        style={{ background:'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">

        {/* Badge */}
        <div className="h-badge inline-flex items-center gap-2 glass rounded-full
                        px-4 py-2 mb-8 border border-z-violet/20">
          <span className="w-1.5 h-1.5 bg-z-violet rounded-full animate-pulse" />
          <span className="text-z-violet text-xs font-medium tracking-wide">
            {count.tools}+ AI Tools · {count.cats} Categories
          </span>
        </div>

        {/* Title */}
        <h1 className="overflow-hidden mb-4">
          <span className="h-title block text-[clamp(52px,10vw,140px)] font-grotesk font-bold
                           leading-none tracking-tight text-white">
            Every AI Tool.
          </span>
          <span className="h-title block text-[clamp(52px,10vw,140px)] font-grotesk font-bold
                           leading-none tracking-tight grad-v">
            One Place.
          </span>
        </h1>

        {/* Sub */}
        <p className="h-sub text-z-muted text-lg md:text-xl max-w-2xl mx-auto
                      leading-relaxed mb-10">
          Stop wasting time searching. Find the perfect AI tool for writing,
          coding, design, music — everything — in seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link to="/directory"
            onMouseEnter={() => play('hover')} onClick={() => play('click')}
            className="h-cta flex items-center gap-2 bg-z-violet text-white font-semibold
                       px-8 py-3.5 rounded-xl hover:bg-violet-500 transition-all text-sm
                       hover:gap-4 hover:shadow-lg hover:shadow-z-violet/25">
            Explore Directory <ArrowRight size={15}/>
          </Link>
          <button
            onMouseEnter={() => play('hover')}
            onClick={() => { play('click'); document.getElementById('zentra-toggle')?.click() }}
            className="h-cta flex items-center gap-2 glass border border-white/10 text-white
                       font-medium px-8 py-3.5 rounded-xl hover:border-white/20 transition-all text-sm">
            <Sparkles size={14} className="text-z-violet"/> Ask Zentra AI
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mb-14">
          {[
            { val: count.tools + '+', label:'AI Tools' },
            { val: count.cats,        label:'Categories' },
            { val: '100%',            label:'Free to Browse' },
          ].map((s, i) => (
            <div key={i} className="h-stat text-center">
              <p className="text-3xl md:text-4xl font-grotesk font-bold text-white tabular-nums">
                {s.val}
              </p>
              <p className="text-z-muted text-xs mt-1 tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick category pills */}
        <div className="h-cats flex flex-wrap items-center justify-center gap-2">
          {quickCats.map(c => (
            <Link key={c.cat} to={`/directory?cat=${c.cat}`}
              onMouseEnter={() => play('hover')} onClick={() => play('click')}
              className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
              style={{
                borderColor: c.color + '40',
                color: c.color,
                background: c.color + '10',
              }}>
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#222] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-z-violet/30 to-transparent" />
      </div>
    </section>
  )
}
