// components/site/CustomCursor.jsx
'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only show on desktop
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const cursor = cursorRef.current
    if (!cursor) return

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleEnterInteractive = () => cursor.classList.add('expanded')
    const handleLeaveInteractive = () => cursor.classList.remove('expanded')

    let raf
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      cursor.style.left = `${pos.current.x}px`
      cursor.style.top = `${pos.current.y}px`
      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMove)
    animate()

    // Listen for interactive elements
    const observer = new MutationObserver(() => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer'
      )
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnterInteractive)
        el.removeEventListener('mouseleave', handleLeaveInteractive)
        el.addEventListener('mouseenter', handleEnterInteractive)
        el.addEventListener('mouseleave', handleLeaveInteractive)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Initial bind
    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-pointer'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnterInteractive)
      el.addEventListener('mouseleave', handleLeaveInteractive)
    })

    return () => {
      document.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden lg:block"
      style={{ left: -100, top: -100 }}
    />
  )
}