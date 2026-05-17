import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CustomCursor from '../components/layout/CustomCursor'
import ZentraChat from '../components/chatbot/ZentraChat'
import Scene1Hero from '../components/scenes/Scene1Hero'
import Scene2Problem from '../components/scenes/Scene2Problem'
import CategoryGrid from '../components/landing/CategoryGrid'
import Scene4Decision from '../components/scenes/Scene4Decision'
import Scene5Comparison from '../components/scenes/Scene5Comparison'
import Scene6Workflow from '../components/scenes/Scene6Workflow'
import PromptLibrary from '../components/prompts/PromptLibrary'
import { TrendingSection, EarnWithAI } from '../components/trending/TrendingAndEarn'

gsap.registerPlugin(ScrollTrigger)

export function Landing() {
  useEffect(() => {
    const lenis = new Lenis({ duration:1.2, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)) })
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    return () => lenis.destroy()
  }, [])
  return (
    <div className="bg-[#030303] min-h-screen">
      <div className="noise"/>
      <CustomCursor/>
      <Navbar/>
      <main>
        <Scene1Hero/>
        <Scene2Problem/>
        <CategoryGrid/>
        <Scene4Decision/>
        <Scene5Comparison/>
        <Scene6Workflow/>
        <PromptLibrary/>
        <TrendingSection/>
        <EarnWithAI/>
        <section className="py-28 px-6 text-center border-t border-white/[0.03] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none" style={{background:'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)'}}/>
          <div className="relative z-10">
            <p className="text-z-violet text-[10px] tracking-[0.3em] uppercase mb-4">Start Now</p>
            <h2 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-4">Start exploring AI<br/><span className="grad-v">the smart way.</span></h2>
            <p className="text-z-muted text-base mb-10 max-w-lg mx-auto">106+ tools. 12 categories. Smart recommendations. All free.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/directory" className="inline-flex items-center justify-center gap-2 bg-z-violet text-white font-semibold px-10 py-4 rounded-xl hover:bg-violet-500 transition-all text-sm">Explore Tools →</a>
              <button onClick={()=>document.getElementById('zentra-toggle')?.click()} className="inline-flex items-center justify-center gap-2 glass border border-white/10 text-white px-10 py-4 rounded-xl hover:border-white/20 transition-all text-sm">Ask Zentra AI</button>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
      <ZentraChat/>
    </div>
  )
}
