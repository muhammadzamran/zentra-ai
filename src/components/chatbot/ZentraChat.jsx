import { useState, useRef, useEffect } from 'react'
import { Sparkles, X, Send, Loader } from 'lucide-react'
import { askZentra } from '../../lib/openai'
import { play } from '../../lib/sounds'
import { motion, AnimatePresence } from 'framer-motion'

const GREET = [
  "Hi! I'm Zentra 👋 Tell me your goal and I'll pick the perfect AI tool.",
  "Need an AI recommendation? I know 100+ tools. What are you building?",
  "What do you want to create or automate today?",
]

export default function ZentraChat() {
  const [open,    setOpen]    = useState(false)
  const [msgs,    setMsgs]    = useState([{ role:'assistant', content: GREET[Math.floor(Math.random()*3)] }])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}) },[msgs,loading])
  useEffect(()=>{ if(open) setTimeout(()=>inputRef.current?.focus(),300) },[open])

  const send = async () => {
    const q = input.trim()
    if(!q||loading) return
    play('chatSend')
    setInput('')
    const um = {role:'user',content:q}
    setMsgs(m=>[...m,um])
    setLoading(true)
    try {
      const r = await askZentra([...msgs,um])
      play('chatReceive')
      setMsgs(m=>[...m,{role:'assistant',content:r}])
    } catch(e) {
      setMsgs(m=>[...m,{role:'assistant',content:`API error: ${e.message}. Check VITE_OPENAI_API_KEY in .env`}])
    } finally { setLoading(false) }
  }

  const onKey = e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()} }
  const toggle = () => { setOpen(o=>!o); play('click') }
  const suggestions = ['Best free AI tools','Compare ChatGPT vs Claude','How to earn with AI']

  return (
    <>
      <button id="zentra-toggle" onClick={toggle} onMouseEnter={()=>play('hover')}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-z-violet to-z-cyan shadow-2xl shadow-z-violet/30 flex items-center justify-center hover:scale-110 transition-transform">
        <AnimatePresence mode="wait">
          {open ? <motion.div key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.2}}><X size={20} className="text-white"/></motion.div>
                : <motion.div key="s" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.2}}><Sparkles size={20} className="text-white"/></motion.div>}
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:20,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.95}} transition={{duration:.25,ease:[.16,1,.3,1]}}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#111] bg-gradient-to-r from-z-violet/10 to-z-cyan/5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-z-violet to-z-cyan flex items-center justify-center"><Sparkles size={14} className="text-white"/></div>
              <div><p className="text-white text-sm font-grotesk font-semibold">Zentra AI</p><p className="text-z-muted text-[10px]">AI tool expert · GPT-4o powered</p></div>
              <div className="ml-auto flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-z-green rounded-full animate-pulse"/><span className="text-z-muted text-[10px]">Online</span></div>
            </div>
            <div className="chat-scroll h-64 overflow-y-auto p-4 space-y-3">
              {msgs.map((m,i)=>(
                <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                  {m.role==='assistant'&&<div className="w-6 h-6 rounded-md bg-gradient-to-br from-z-violet to-z-cyan flex items-center justify-center mr-2 shrink-0 mt-0.5"><Sparkles size={10} className="text-white"/></div>}
                  <div className={`max-w-[82%] px-3 py-2.5 rounded-xl text-xs leading-relaxed ${m.role==='user'?'chat-bubble-user text-white rounded-br-sm':'chat-bubble-ai text-z-text rounded-bl-sm'}`}>{m.content}</div>
                </div>
              ))}
              {loading&&<div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-gradient-to-br from-z-violet to-z-cyan flex items-center justify-center"><Sparkles size={10} className="text-white"/></div><div className="chat-bubble-ai px-3 py-2.5 rounded-xl"><div className="flex gap-1">{[0,150,300].map(d=><span key={d} className="w-1.5 h-1.5 bg-z-violet rounded-full animate-bounce" style={{animationDelay:d+'ms'}}/>)}</div></div></div>}
              <div ref={bottomRef}/>
            </div>
            {msgs.length<=1&&<div className="px-4 pb-2 flex flex-wrap gap-1.5">{suggestions.map(s=><button key={s} onClick={()=>{setInput(s);inputRef.current?.focus()}} className="text-[10px] px-2.5 py-1 rounded-lg glass border border-z-violet/20 text-z-violet hover:bg-z-violet/10 transition-colors">{s}</button>)}</div>}
            <div className="px-3 py-3 border-t border-[#111] flex gap-2">
              <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} placeholder="Ask about any AI tool..." rows={1} className="flex-1 bg-[#111] border border-[#1a1a1a] text-white text-xs px-3 py-2.5 rounded-lg outline-none resize-none focus:border-z-violet/50 transition-colors placeholder-z-muted font-sans"/>
              <button onClick={send} disabled={!input.trim()||loading} onMouseEnter={()=>play('hover')} className="w-9 h-9 bg-z-violet rounded-lg flex items-center justify-center hover:bg-violet-500 transition-colors disabled:opacity-40 shrink-0">
                {loading?<Loader size={13} className="text-white animate-spin"/>:<Send size={13} className="text-white"/>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
