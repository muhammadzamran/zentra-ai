import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 768) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const move = (e) => { mx = e.clientX; my = e.clientY }
    const tick = () => {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13
      if (dot.current)  { dot.current.style.left  = mx + 'px'; dot.current.style.top  = my + 'px' }
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px' }
      requestAnimationFrame(tick)
    }
    const on  = () => { dot.current?.classList.add('hov');    ring.current?.classList.add('hov') }
    const off = () => { dot.current?.classList.remove('hov'); ring.current?.classList.remove('hov') }
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', on); el.addEventListener('mouseleave', off)
    })
    const raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dot}  className="c-dot  hidden md:block" />
      <div ref={ring} className="c-ring hidden md:block" />
    </>
  )
}
