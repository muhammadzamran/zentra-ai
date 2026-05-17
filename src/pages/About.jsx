import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CustomCursor from '../components/layout/CustomCursor'
import ZentraChat from '../components/chatbot/ZentraChat'
import { Github, Mail, ExternalLink, Code, Sparkles, BookOpen, Zap } from 'lucide-react'
import { play } from '../lib/sounds'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const ref = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ duration:1.2, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)) })
    const raf = (t)=>{ lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      gsap.from('.ab-block', {
        scrollTrigger:{ trigger: ref.current, start:'top 75%' },
        y:50, opacity:0, duration:0.8, stagger:0.15, ease:'power3.out'
      })
    }, ref)
    return () => { lenis.destroy(); ctx.revert() }
  }, [])

  const skills = [
    { icon:Code,     label:'CS Engineer',      desc:'Computer Science background with a passion for building.' },
    { icon:Sparkles, label:'Learning AI',       desc:'Exploring every corner of the AI landscape daily.' },
    { icon:BookOpen, label:'BScs Student',      desc:'5th Semester — combining theory with real-world projects.' },
    { icon:Zap,      label:'Making it Easier',  desc:'Building tools that help people find what they need faster.' },
  ]

  return (
    <div className="bg-[#030303] min-h-screen">
      <div className="noise"/>
      <CustomCursor/>
      <Navbar/>

      <main ref={ref} className="max-w-4xl mx-auto px-6 pt-32 pb-20">

        {/* Hero */}
        <div className="ab-block text-center mb-20">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-z-violet to-z-cyan
                          flex items-center justify-center mx-auto mb-6 text-3xl font-grotesk
                          font-bold text-white">
            MZ
          </div>
          <h1 className="text-5xl md:text-7xl font-grotesk font-bold text-white mb-4 leading-tight">
            Muhammad<br/><span className="grad-v">Zamran</span>
          </h1>
          <p className="text-z-muted text-lg max-w-xl mx-auto leading-relaxed">
            CS Engineer. Learning AI. Building things that make people's lives easier.
          </p>
        </div>

        {/* Story */}
        <div className="ab-block glass rounded-2xl p-8 mb-8">
          <p className="text-[#333] text-[10px] tracking-[0.2em] uppercase mb-4">The Story</p>
          <p className="text-white text-lg leading-relaxed mb-4">
            I built ZentraAI because I was frustrated.
          </p>
          <p className="text-z-muted text-sm leading-relaxed mb-4">
            Every week there are 10 new AI tools. Everyone's talking about them on Twitter.
            But nobody had built a single, premium place to actually browse, compare and
            discover them — especially for people from Pakistan and the developing world
            who are trying to learn and build with AI.
          </p>
          <p className="text-z-muted text-sm leading-relaxed">
            So I built one. ZentraAI is my contribution to making AI accessible.
            106+ tools. 12 categories. One beautiful directory. And Zentra — an AI chatbot
            that helps you find exactly what you need.
          </p>
        </div>

        {/* Skills/About cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {skills.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="ab-block glass rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-z-violet/10 border border-z-violet/20
                                flex items-center justify-center mb-4">
                  <Icon size={18} className="text-z-violet"/>
                </div>
                <h3 className="text-white font-grotesk font-semibold mb-1">{s.label}</h3>
                <p className="text-z-muted text-xs leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Contact */}
        <div className="ab-block glass rounded-2xl p-8 text-center">
          <p className="text-[#333] text-[10px] tracking-[0.2em] uppercase mb-4">Get In Touch</p>
          <h2 className="text-3xl font-grotesk font-bold text-white mb-6">Let's Connect</h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:zamran.qaxi@gmail.com"
              onMouseEnter={() => play('hover')} onClick={() => play('click')}
              className="flex items-center gap-2 bg-z-violet/10 border border-z-violet/30
                         text-z-violet px-6 py-3 rounded-xl hover:bg-z-violet/20
                         transition-all text-sm font-medium">
              <Mail size={15}/> zamran.qaxi@gmail.com
            </a>
            <a href="https://github.com/muhammadzamran" target="_blank" rel="noreferrer"
              onMouseEnter={() => play('hover')} onClick={() => play('click')}
              className="flex items-center gap-2 glass border border-white/10 text-white
                         px-6 py-3 rounded-xl hover:border-white/20 transition-all text-sm">
              <Github size={15}/> github.com/muhammadzamran <ExternalLink size={11}/>
            </a>
          </div>
        </div>
      </main>

      <Footer/>
      <ZentraChat/>
    </div>
  )
}

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-z-violet to-z-cyan
                      flex items-center justify-center mb-6">
        <Sparkles size={24} className="text-white"/>
      </div>
      <h1 className="text-8xl font-grotesk font-bold grad-v mb-3">404</h1>
      <p className="text-z-muted text-lg mb-8">This page doesn't exist in any dimension.</p>
      <Link to="/"
        className="flex items-center gap-2 bg-z-violet text-white font-medium px-6 py-3
                   rounded-xl hover:bg-violet-500 transition-colors text-sm">
        Back to ZentraAI
      </Link>
    </div>
  )
}
