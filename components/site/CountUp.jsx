// components/site/CountUp.jsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function CountUp({ end, suffix = '', prefix = '', duration = 2000 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime
    const numEnd = parseFloat(end)

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * numEnd)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  const display = Number.isInteger(parseFloat(end))
    ? Math.round(count)
    : count.toFixed(1)

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}