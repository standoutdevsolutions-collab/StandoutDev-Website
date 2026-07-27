'use client'
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    let rx = 0, ry = 0, dx = 0, dy = 0, tx = 0, ty = 0
    const move = (e) => { tx = e.clientX; ty = e.clientY }
    const raf = () => {
      dx += (tx - dx) * 0.9
      dy += (ty - dy) * 0.9
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      if (dot.current) dot.current.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`
      requestAnimationFrame(raf)
    }
    window.addEventListener('mousemove', move)
    raf()

    const onOver = (e) => {
      const t = e.target
      if (t.closest('a, button, [data-cursor="hover"]')) setHover(true)
      else setHover(false)
    }
    window.addEventListener('mouseover', onOver)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', onOver) }
  }, [])

  return (
    <>
      <div ref={ring} className={`pointer-events-none fixed left-0 top-0 z-[200] hidden md:block h-9 w-9 rounded-full border transition-[width,height,border-color,background] duration-300 ${hover ? 'border-cyan-300 bg-cyan-300/10 scale-125' : 'border-white/40'}`} />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[201] hidden md:block h-2 w-2 rounded-full bg-cyan-300" />
    </>
  )
}
