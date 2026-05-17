import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CustomCursor from '../components/layout/CustomCursor'
import ZentraChat from '../components/chatbot/ZentraChat'
import ToolCard from '../components/tools/ToolCard'
import SearchBar from '../components/tools/SearchBar'
import { Globe, Image, PenLine, Music, Video, Code, Monitor, Bot, BookOpen, Layers, Zap, Mic } from 'lucide-react'
import { tools, categories } from '../data/tools'
import { play } from '../lib/sounds'

const ICONS = { Globe, Image, PenLine, Music, Video, Code, Monitor, Bot, BookOpen, Layers, Zap, Mic }

export function Directory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState(searchParams.get('cat') || 'all')

  useEffect(() => {
    const lenis = new Lenis({ duration:1.2, easing:t => Math.min(1,1.001-Math.pow(2,-10*t)) })
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActive(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    let res = tools
    if (active !== 'all') res = res.filter(t => t.category === active)
    if (query.trim())     res = res.filter(t =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.desc.toLowerCase().includes(query.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    return res
  }, [active, query])

  const selectCat = (id) => {
    play('click')
    setActive(id)
    setQuery('')
    if (id === 'all') setSearchParams({})
    else setSearchParams({ cat: id })
    window.scrollTo({ top: 0, behavior:'smooth' })
  }

  const activeCat = categories.find(c => c.id === active)

  return (
    <div className="bg-[#030303] min-h-screen">
      <div className="noise"/>
      <CustomCursor/>
      <Navbar/>

      <main className="pt-20">
        {/* Header */}
        <div className="px-6 py-12 border-b border-white/[0.04] text-center">
          <p className="text-z-violet text-[10px] tracking-[0.3em] uppercase mb-3">
            AI Tools Directory
          </p>
          <h1 className="text-4xl md:text-6xl font-grotesk font-bold text-white mb-4">
            {activeCat ? activeCat.label : 'All AI Tools'}
          </h1>
          <p className="text-z-muted text-sm mb-8">
            {filtered.length} tool{filtered.length !== 1 ? 's' : ''} found
          </p>
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-1">
              <button
                onClick={() => selectCat('all')}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium
                            transition-all ${active === 'all'
                  ? 'bg-z-violet/15 text-z-violet border border-z-violet/30'
                  : 'text-z-muted hover:text-white hover:bg-white/[0.03]'}`}>
                All Tools ({tools.length})
              </button>

              {categories.map(cat => {
                const Icon  = ICONS[cat.icon] || Globe
                const count = tools.filter(t => t.category === cat.id).length
                return (
                  <button key={cat.id}
                    onClick={() => selectCat(cat.id)}
                    onMouseEnter={() => play('hover')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium
                                transition-all flex items-center gap-2.5 ${active === cat.id
                      ? 'text-white' : 'text-z-muted hover:text-white hover:bg-white/[0.03]'}`}
                    style={active === cat.id ? {
                      background: cat.color + '12',
                      border: `1px solid ${cat.color}30`,
                      color: cat.color
                    } : {}}>
                    <Icon size={13}/>
                    <span className="flex-1 truncate">{cat.label}</span>
                    <span className={`text-[10px] ${active === cat.id ? '' : 'text-[#333]'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Tools grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile category scroll */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
              <button onClick={() => selectCat('all')}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  active === 'all'
                    ? 'bg-z-violet/15 text-z-violet border-z-violet/30'
                    : 'text-z-muted border-[#1a1a1a] hover:text-white'
                }`}>
                All
              </button>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => selectCat(cat.id)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    active === cat.id ? 'text-white' : 'text-z-muted border-[#1a1a1a] hover:text-white'
                  }`}
                  style={active === cat.id ? { background: cat.color+'15', borderColor: cat.color+'40', color: cat.color } : {}}>
                  {cat.label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-z-muted text-sm">No tools found for "{query}"</p>
                <button onClick={() => setQuery('')}
                  className="text-z-violet text-xs mt-2 hover:underline">
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(tool => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer/>
      <ZentraChat/>
    </div>
  )
}
