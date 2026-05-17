import { Link } from 'react-router-dom'
import { Sparkles, Github, Mail, ExternalLink } from 'lucide-react'
import { play } from '../../lib/sounds'

export default function Footer() {
  return (
    <footer className="bg-[#030303] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-z-violet to-z-cyan flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-grotesk font-bold text-white">Zentra<span className="text-z-violet">AI</span></span>
            </Link>
            <p className="text-z-muted text-sm leading-relaxed">Every AI tool. One place. Find, compare and explore the world's best AI tools.</p>
          </div>
          <div>
            <p className="text-[#333] text-[10px] tracking-[0.2em] uppercase mb-4">Categories</p>
            <div className="space-y-2">
              {['Website Building','Image Generation','Creative Writing','Coding Assistants','Presentations'].map(c => (
                <Link key={c} to={`/directory?cat=${c.toLowerCase().replace(/ /g,'-')}`}
                  onClick={() => play('click')}
                  className="block text-xs text-z-muted hover:text-white transition-colors">{c}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#333] text-[10px] tracking-[0.2em] uppercase mb-4">Explore</p>
            <div className="space-y-2">
              {['Song & Music','Video Generation','Chatbots','Research & Study','Design & UI'].map(c => (
                <Link key={c} to={`/directory?cat=${c.toLowerCase().replace(/ /g,'-').replace('&','-')}`}
                  onClick={() => play('click')}
                  className="block text-xs text-z-muted hover:text-white transition-colors">{c}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#333] text-[10px] tracking-[0.2em] uppercase mb-4">Contact</p>
            <div className="space-y-3">
              <a
                href="mailto:zamran.qaxi@gmail.com"
                onMouseEnter={() => play('hover')}
                className="flex items-center gap-2 text-xs text-z-muted hover:text-z-violet transition-colors group cursor-pointer">
                <Mail size={12} className="group-hover:scale-110 transition-transform shrink-0" />
                zamran.qaxi@gmail.com
              </a>
              <a href="https://github.com/muhammadzamran" target="_blank" rel="noreferrer"
                onMouseEnter={() => play('hover')} onClick={() => play('click')}
                className="flex items-center gap-2 text-xs text-z-muted hover:text-z-violet transition-colors group">
                <Github size={12} className="group-hover:scale-110 transition-transform shrink-0" />
                github.com/muhammadzamran
                <ExternalLink size={9} className="text-[#333]" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#222] text-xs">© 2026 ZentraAI. All rights reserved.</p>
          <div className="text-center">
            <p className="text-[#222] text-[10px] tracking-[0.2em] uppercase mb-1">Built by</p>
            <p className="font-grotesk font-bold text-white text-lg tracking-wide">Muhammad Zamran</p>
            <p className="text-[#333] text-[10px] mt-0.5">CS Engineer · Learning AI · Making things easier</p>
          </div>
          <p className="text-[#222] text-xs">Built with React + Groq AI</p>
        </div>
      </div>
    </footer>
  )
}
