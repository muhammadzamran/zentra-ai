import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Menu, X, Volume2, VolumeX } from 'lucide-react'
import { play, setMuted } from '../../lib/sounds'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [muted, setMutedState]  = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const toggleMute = () => {
    const next = !muted
    setMuted(next); setMutedState(next)
    play('click')
  }

  const links = [
    { to:'/directory',                       label:'Directory' },
    { to:'/directory?cat=website-building',  label:'Web AI'    },
    { to:'/directory?cat=coding-assistants', label:'Code AI'   },
    { to:'/about',                           label:'About'     },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#030303]/90 backdrop-blur-xl' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative:">

        <Link to="/" className="flex items-center gap-2 group"
          onMouseEnter={() => play('hover')} onClick={() => play('click')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-z-violet to-z-cyan
                          flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-grotesk font-bold text-white tracking-tight">
            Zentra<span className="text-z-violet">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              onMouseEnter={() => play('hover')} onClick={() => play('click')}
              className={`text-sm transition-colors ${
                loc.pathname === l.to.split('?')[0] ? 'text-white' : 'text-z-muted hover:text-white'
              }`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleMute} className="p-2 text-z-muted hover:text-white transition-colors">
            {muted ? <VolumeX size={15}/> : <Volume2 size={15}/>}
          </button>
          <Link to="/directory"
            onMouseEnter={() => play('hover')} onClick={() => play('click')}
            className="flex items-center gap-2 bg-z-violet/10 border border-z-violet/30
                       text-z-violet text-xs font-medium px-4 py-2 rounded-lg
                       hover:bg-z-violet/20 hover:border-z-violet/60 transition-all">
            <Sparkles size={12}/> Explore Tools
          </Link>
          <SignedOut>
            <SignInButton mode="modal">
              <button onMouseEnter={() => play('hover')}
                className="text-xs text-z-muted hover:text-white transition-colors px-3 py-2">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button onMouseEnter={() => play('hover')}
                className="text-xs bg-white text-black font-semibold px-4 py-2 rounded-lg
                           hover:bg-gray-200 transition-colors">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 rounded-lg' } }}/>
          </SignedIn>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: 'w-7 h-7 rounded-lg' } }}/>
          </SignedIn>
          <button className="text-white p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0c0c0c] px-6 py-4 space-y-3">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => { setOpen(false); play('click') }}
              className="block text-sm text-z-muted hover:text-white py-2 transition-colors">
              {l.label}
            </Link>
          ))}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="block text-sm text-z-violet py-2">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="block text-sm text-white font-semibold py-2">Sign Up Free</button>
            </SignUpButton>
          </SignedOut>
        </div>
      )}
    </nav>
  )
}