import { useState, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { play } from '../../lib/sounds'

export default function SearchBar({ value, onChange }) {
  const ref = useRef(null)

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-z-muted" />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={e => { onChange(e.target.value); play('search') }}
        placeholder="Search 106+ AI tools..."
        className="w-full bg-[#0c0c0c] border border-[#1a1a1a] text-white pl-11 pr-10 py-3.5
                   rounded-xl text-sm outline-none focus:border-z-violet/50 transition-colors
                   placeholder-z-muted font-sans"
      />
      {value && (
        <button onClick={() => { onChange(''); ref.current?.focus() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-z-muted hover:text-white
                     transition-colors">
          <X size={14}/>
        </button>
      )}
    </div>
  )
}
