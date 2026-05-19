import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CustomCursor from '../components/layout/CustomCursor'
import ZentraChat from '../components/chatbot/ZentraChat'
import ParticleBackground from '../components/three/ParticleBackground'
import { Github, Mail, ExternalLink, Code, Sparkles, BookOpen, Zap } from 'lucide-react'
import { play } from '../lib/sounds'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const ref = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      gsap.from('.ab-block', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.1,
        clearProps: 'all'
      })
    }, ref)

    return () => { lenis.destroy(); ctx.revert() }
  }, [])

  const skills = [
    { icon: Code,      label: 'CS Engineer',    desc: 'Computer Science background with a passion for building robust applications.' },
    { icon: Sparkles,  label: 'Learning AI',    desc: 'Exploring every corner of the AI landscape - daily.' },
    { icon: BookOpen,  label: 'BScs Student',   desc: '5th Semester - combining theory with real-world projects.' },
    { icon: Zap,       label: 'Making it Easier', desc: 'Building tools that help people find what they need faster.' },
  ]

  return (
    <div className="bg-[#030303] min-h-screen relative">
      <div className="noise" />
      <ParticleBackground />
      <CustomCursor />
      <Navbar />

      <main ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">

        {/* --- PHOTO + NAME HERO --- */}
        <div className="ab-block flex flex-col items-center text-center mb-20">

          <div className="relative mb-8 w-36 h-36 md:w-44 md:h-44" style={{ filter: 'drop-shadow(0 0 20px #7C3AED) drop-shadow(0 0 40px #7C3AED)' }}>
           
            {/* Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl bg-white"
              style={{ zIndex: 10, position: 'relative' }}>
              <img
                src="https://i.ibb.co/DDR5FSRD/zamran-jpg.png"
                alt="Muhammad Zamran"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['React Developer', 'AI Enthusiast', 'Problem Solver', 'Pakistan PK'].map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full glass border border-z-violet/20 text-z-violet">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=zamran.qaxi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => play('hover')}
              className="flex items-center gap-2 bg-z-violet/10 border border-z-violet/30 text-z-violet px-6 py-3 rounded-xl hover:border-z-violet/60 transition-all"
            >
              <Mail size={15} /> zamran.qaxi@gmail.com
            </a>

            <a
              href="https://github.com/muhammadzamran"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => play('hover')}
              onClick={() => play('click')}
              className="flex items-center gap-2 glass border border-white/10 text-white px-6 py-3 rounded-xl hover:border-white/"
            >
              <Github size={15} /> github.com/muhammadzamran
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* --- STORY SECTION --- */}
        <div className="ab-block glass rounded-2xl p-8 mb-6 border border-z-violet/10 hover:border-z-violet/20 transition-all">
          <p className="text-z-violet font-bold text-xs tracking-[0.2em] uppercase mb-4">The Story</p>

          <p className="text-white text-2xl font-grotesk font-semibold leading-tight mb-6">
            I built ZentraAI to solve a real frustration.
          </p>

          <div className="space-y-4 text-gray-200 text-base md:text-lg leading-relaxed">
            <p>
              I am a passionate computer science student and a dedicated enthusiast of both AI and web development. Like many, I
              found myself overwhelmed by the sheer pace of the AI revolution. New tools emerge daily, and there wasn't a single,
              premium place to browse, compare, and discover them.
            </p>
            <p>
              This website is specially designed for non-technical people who don't have a clear direction or don't know what tools
              to use. ZentraAI cuts through the noise. With 106+ tools, 12 categories, a smart finder, workflow generator, and
              prompt library, everything is organized to make your life easier.
            </p>
            <p className="text-white font-medium">
              If you find this website valuable, please share and promote it to other users so that everyone can access it! My goal
              is to make AI accessible for everyone, especially for students and builders from Pakistan and beyond. And if you're
              ever lost, just ask Zentra, our AI chatbot, to guide you.
            </p>
          </div>
        </div>

        {/* --- SKILLS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {skills.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="ab-block glass rounded-xl p-6 hover:border-z-violet/20 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-z-violet/10 border border-z-violet/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-z-violet" />
                </div>
                <h3 className="text-white font-grotesk font-semibold mb-1">{s.label}</h3>
                <p className="text-z-muted text-xs leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>

      </main>
      <Footer />
      <ZentraChat />
    </div>
  )
}

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] relative flex flex-col items-center justify-center px-6">
      <ParticleBackground />
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-z-violet to-z-cyan flex items-center justify-center mx-auto mb-8">
          <Sparkles size={24} className="text-white" />
        </div>
        <h1 className="text-8xl font-grotesk font-bold grad-v mb-3">404</h1>
        <p className="text-z-muted text-lg mb-8">This page doesn't exist in any dimension.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-z-violet text-white font-medium px-6 py-3 rounded-xl hover:bg-z-violet/80 transition-all">
          Back to ZentraAI
        </Link>
      </div>
    </div>
  )
}
