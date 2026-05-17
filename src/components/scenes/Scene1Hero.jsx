import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { Sparkles, ArrowRight, Zap, ChevronDown } from 'lucide-react'
import { play } from '../../lib/sounds'
import * as THREE from 'three'

// ── Three.js Neural Globe ─────────────────────────────────────────────
function NeuralCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas   = canvasRef.current
    if (!canvas) return
    const W = canvas.parentElement.offsetWidth
    const H = canvas.parentElement.offsetHeight
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.set(0, 0, 6)

    // ── Particles ──
    const COUNT  = window.innerWidth < 768 ? 600 : 1800
    const geo    = new THREE.BufferGeometry()
    const pos    = new Float32Array(COUNT * 3)
    const col    = new Float32Array(COUNT * 3)
    const sizes  = new Float32Array(COUNT)
    const palette = [
      new THREE.Color('#7C3AED'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#F59E0B'),
      new THREE.Color('#8B5CF6'),
    ]
    for (let i = 0; i < COUNT; i++) {
      const r   = 3 + Math.random() * 5
      const θ   = Math.random() * Math.PI * 2
      const φ   = Math.acos(2 * Math.random() - 1)
      pos[i*3]   = r * Math.sin(φ) * Math.cos(θ)
      pos[i*3+1] = r * Math.sin(φ) * Math.sin(θ)
      pos[i*3+2] = r * Math.cos(φ)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i*3]   = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
      sizes[i]   = Math.random() * 2 + 0.5
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      size: 0.04, vertexColors: true, transparent: true,
      opacity: 0.7, sizeAttenuation: true,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // ── Connection lines ──
    const lineGeo  = new THREE.BufferGeometry()
    const linePos  = []
    const nodeCount = 40
    const nodes     = []
    for (let i = 0; i < nodeCount; i++) {
      const θ = Math.random() * Math.PI * 2
      const φ = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 1.5
      nodes.push(new THREE.Vector3(
        r * Math.sin(φ) * Math.cos(θ),
        r * Math.sin(φ) * Math.sin(θ),
        r * Math.cos(φ)
      ))
    }
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.5) {
          linePos.push(nodes[i].x, nodes[i].y, nodes[i].z)
          linePos.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
    const lineMat  = new THREE.LineBasicMaterial({ color: '#7C3AED', transparent: true, opacity: 0.12 })
    const lineSegs = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lineSegs)

    // ── Node spheres ──
    nodes.forEach(n => {
      const g = new THREE.SphereGeometry(0.04, 8, 8)
      const m = new THREE.MeshBasicMaterial({ color: '#7C3AED', transparent: true, opacity: 0.6 })
      const s = new THREE.Mesh(g, m)
      s.position.copy(n)
      scene.add(s)
    })

    // ── Mouse parallax ──
    let tx = 0, ty = 0
    const onMove = (e) => {
      tx = (e.clientX / W - 0.5) * 0.8
      ty = (e.clientY / H - 0.5) * 0.8
    }
    window.addEventListener('mousemove', onMove)

    // ── Animate ──
    let frame = 0
    const tick = () => {
      frame++
      points.rotation.y   += 0.0008
      points.rotation.x   += 0.0003
      lineSegs.rotation.y += 0.0006
      lineSegs.rotation.x += 0.0002
      camera.position.x += (tx - camera.position.x) * 0.03
      camera.position.y += (-ty - camera.position.y) * 0.03
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      const W2 = canvas.parentElement.offsetWidth
      const H2 = canvas.parentElement.offsetHeight
      renderer.setSize(W2, H2)
      camera.aspect = W2 / H2
      camera.updateProjectionMatrix()
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

// ── Hero Component ────────────────────────────────────────────────────
export default function HeroCinematic() {
  const ref    = useRef(null)
  const [cnt, setCnt] = useState({ tools: 0, cats: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.from('.hs-badge',  { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.hs-t1',     { y: 80, opacity: 0, duration: 1.0, ease: 'power4.out' }, '-=0.3')
        .from('.hs-t2',     { y: 80, opacity: 0, duration: 1.0, ease: 'power4.out' }, '-=0.7')
        .from('.hs-sub',    { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from('.hs-cta',    { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, '-=0.3')
        .from('.hs-stats',  { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .from('.hs-pills',  { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1')
    }, ref)

    // Counters
    const dur = 2200, start = Date.now()
    const tick = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCnt({ tools: Math.floor(e * 106), cats: Math.floor(e * 12) })
      if (p >= 1) clearInterval(tick)
    }, 16)
    return () => { ctx.revert(); clearInterval(tick) }
  }, [])

  const pills = [
    { label: 'Website AI', to: '/directory?cat=website-building', c: '#7C3AED' },
    { label: 'Image AI',   to: '/directory?cat=image-generation',  c: '#06B6D4' },
    { label: 'Code AI',    to: '/directory?cat=coding-assistants', c: '#8B5CF6' },
    { label: 'Music AI',   to: '/directory?cat=song-music',        c: '#10B981' },
    { label: 'Video AI',   to: '/directory?cat=video-generation',  c: '#EF4444' },
    { label: 'Write AI',   to: '/directory?cat=creative-writing',  c: '#F59E0B' },
  ]

  return (
    <section ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center
                 px-6 pt-20 pb-16 overflow-hidden">

      {/* Three.js Canvas */}
      <NeuralCanvas />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Deep glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[900px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 65%)' }} />

      {/* Scene label */}
      <div className="hs-badge relative z-10 inline-flex items-center gap-2 mb-8
                      glass rounded-full px-4 py-2 border border-z-violet/20">
        <span className="w-1.5 h-1.5 bg-z-violet rounded-full animate-pulse" />
        <span className="text-z-violet text-xs font-medium tracking-widest uppercase">
          {cnt.tools}+ Tools · {cnt.cats} Categories · 100% Free
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-6 max-w-5xl">
        <div className="overflow-hidden mb-2">
          <h1 className="hs-t1 text-[clamp(44px,9vw,130px)] font-grotesk font-bold
                         leading-none tracking-tight text-white">
            Discover the AI
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hs-t2 text-[clamp(44px,9vw,130px)] font-grotesk font-bold
                         leading-none tracking-tight grad-v">
            Behind Everything.
          </h1>
        </div>
      </div>

      {/* Sub */}
      <p className="hs-sub relative z-10 text-z-muted text-base md:text-xl
                    max-w-2xl text-center leading-relaxed mb-10">
        Not just a list. A platform. Find tools, compare them,
        build workflows, and get AI recommendations — instantly.
      </p>

      {/* CTAs */}
      <div className="hs-cta relative z-10 flex flex-col sm:flex-row gap-4 mb-14">
        <Link to="/directory"
          onMouseEnter={() => play('hover')} onClick={() => play('click')}
          className="flex items-center gap-2 bg-z-violet text-white font-semibold
                     px-8 py-4 rounded-xl hover:bg-violet-500 transition-all text-sm
                     hover:gap-4 hover:shadow-2xl hover:shadow-z-violet/30">
          Explore {cnt.tools}+ Tools <ArrowRight size={15}/>
        </Link>
        <button
          onMouseEnter={() => play('hover')} onClick={() => { play('click'); document.getElementById('zentra-toggle')?.click() }}
          className="flex items-center gap-2 glass border border-z-violet/20 text-white
                     font-medium px-8 py-4 rounded-xl hover:border-z-violet/50 transition-all text-sm">
          <Sparkles size={14} className="text-z-violet" /> Ask Zentra AI
        </button>
      </div>

      {/* Stats */}
      <div className="hs-stats relative z-10 flex items-center gap-10 md:gap-16 mb-10">
        {[
          { val: cnt.tools + '+', lbl: 'AI Tools' },
          { val: cnt.cats,        lbl: 'Categories' },
          { val: '10+',           lbl: 'Features' },
          { val: '100%',          lbl: 'Free Access' },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-2xl md:text-4xl font-grotesk font-bold text-white tabular-nums">{s.val}</p>
            <p className="text-z-muted text-[10px] mt-1 tracking-widest uppercase">{s.lbl}</p>
          </div>
        ))}
      </div>

      {/* Pills */}
      <div className="hs-pills relative z-10 flex flex-wrap justify-center gap-2">
        {pills.map(p => (
          <Link key={p.to} to={p.to}
            onMouseEnter={() => play('hover')} onClick={() => play('click')}
            className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
            style={{ borderColor: p.c + '40', color: p.c, background: p.c + '10' }}>
            {p.label}
          </Link>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[#222] text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
        <ChevronDown size={16} className="text-[#333] animate-bounce" />
      </div>
    </section>
  )
}
