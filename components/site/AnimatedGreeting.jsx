// components/site/AnimatedGreeting.jsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const greetings = [
  'Hello',
  '你好',
  'नमस्ते',
  'Hola',
  'Bonjour',
  'مرحبا',
  'হ্যালো',
  'Olá',
  'ہیلو',
  'Hallo',
]

export default function AnimatedGreeting() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[1.2em] overflow-hidden inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={greetings[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grad-text font-display font-bold"
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}