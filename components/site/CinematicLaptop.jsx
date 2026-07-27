'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function CinematicLaptop() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Smooth spring for buttery motion
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  // laptop: opens (rotateX), rises, then falls back and scales up like flying at us
  const lidRotate = useTransform(p, [0, 0.15, 0.35, 0.6, 1], [-110, -110, -20, 0, 0])
  const laptopScale = useTransform(p, [0, 0.15, 0.5, 0.8, 1], [0.55, 0.75, 1, 1.35, 2.2])
  const laptopY = useTransform(p, [0, 0.3, 0.6, 1], [80, 20, 0, -60])
  const laptopRotateY = useTransform(p, [0, 0.5, 1], [-14, 0, 18])
  const laptopRotateX = useTransform(p, [0, 0.5, 1], [18, 6, -6])
  const glowOpacity = useTransform(p, [0, 0.3, 0.6, 1], [0.15, 0.35, 0.5, 0.6])
  const screenContentOpacity = useTransform(p, [0.2, 0.4, 1], [0, 1, 1])

  // Text choreo: 3 headline states swap
  const t1 = useTransform(p, [0, 0.18, 0.28], [1, 1, 0])
  const t1y = useTransform(p, [0, 0.28], [0, -60])
  const t2 = useTransform(p, [0.22, 0.32, 0.5, 0.6], [0, 1, 1, 0])
  const t2y = useTransform(p, [0.22, 0.6], [40, -60])
  const t3 = useTransform(p, [0.55, 0.65, 0.85, 0.98], [0, 1, 1, 0])
  const t3y = useTransform(p, [0.55, 0.98], [40, -60])

  return (
    <section ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0e16]">
        {/* Subtle SaaS-style background with bluish tint */}
        <div className="absolute inset-0">
          {/* Refined grid */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(96,165,250,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(96,165,250,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
            }}
          />

          {/* Soft ambient gradients - enhanced blue */}
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.12] blur-[120px]" />
          <div className="absolute right-[15%] top-[20%] h-[400px] w-[400px] rounded-full bg-indigo-500/[0.09] blur-[100px]" />
          <div className="absolute left-[10%] bottom-[15%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.08] blur-[100px]" />

          {/* Top and bottom vignette with blue tint */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0e16] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0e16] to-transparent" />
        </div>

        {/* Top nav badge */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-white/70 tracking-wide">New — v2.0 now available</span>
          </div>
        </div>

        {/* Laptop */}
        <div className="absolute inset-0 flex items-center justify-center laptop-perspective">
          <motion.div
            style={{
              scale: laptopScale, y: laptopY,
              rotateY: laptopRotateY, rotateX: laptopRotateX,
              transformStyle: 'preserve-3d'
            }}
            className="relative"
          >
            {/* Refined glow */}
            <motion.div style={{ opacity: glowOpacity }} className="absolute -inset-32 rounded-full bg-gradient-radial from-blue-500/30 via-indigo-500/10 to-transparent blur-3xl" />

            <div className="relative laptop-base" style={{ transformStyle: 'preserve-3d' }}>
              {/* Lid */}
              <motion.div
                style={{ rotateX: lidRotate, transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1d2e] to-[#0d0f1a] overflow-hidden shadow-2xl shadow-blue-500/10"
              >
                <div className="laptop-screen-inner">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                    <div className="ml-4 h-4 flex-1 rounded bg-white/5" />
                  </div>

                  <motion.div style={{ opacity: screenContentOpacity }} className="flex h-[calc(100%-32px)]">
                    {/* Sidebar */}
                    <div className="w-[22%] border-r border-white/5 bg-white/[0.02] p-3 space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500" />
                        <div className="h-2.5 w-14 rounded bg-white/20" />
                      </div>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`flex items-center gap-2 rounded px-2 py-1.5 ${i === 1 ? 'bg-white/10' : ''}`}>
                          <div className="h-2 w-2 rounded-sm bg-white/30" />
                          <div className="h-1.5 flex-1 rounded bg-white/15" />
                        </div>
                      ))}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-4 space-y-3">
                      {/* Header row */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1.5">
                          <div className="h-2.5 w-28 rounded bg-white/25" />
                          <div className="h-1.5 w-20 rounded bg-white/10" />
                        </div>
                        <div className="h-6 w-16 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500" />
                      </div>

                      {/* Stat cards */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { c: 'from-blue-500/30 to-blue-500/5', v: 'w-10' },
                          { c: 'from-indigo-500/30 to-indigo-500/5', v: 'w-8' },
                          { c: 'from-cyan-500/30 to-cyan-500/5', v: 'w-12' },
                        ].map((s, i) => (
                          <div key={i} className="rounded-md border border-white/5 bg-white/[0.02] p-2 space-y-1.5">
                            <div className="h-1.5 w-8 rounded bg-white/15" />
                            <div className={`h-3 rounded bg-white/30 ${s.v}`} />
                            <div className={`h-8 rounded bg-gradient-to-t ${s.c}`} />
                          </div>
                        ))}
                      </div>

                      {/* Chart */}
                      <div className="rounded-md border border-white/5 bg-white/[0.02] p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="h-2 w-16 rounded bg-white/20" />
                          <div className="flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                          </div>
                        </div>
                        <div className="flex items-end gap-1 h-12">
                          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-blue-500/60 to-indigo-400/60" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                {/* notch */}
                <div className="absolute left-1/2 top-1 -translate-x-1/2 h-1.5 w-16 rounded-b-lg bg-black/70" />
              </motion.div>

              {/* Base / keyboard */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3 w-[104%] rounded-b-2xl bg-gradient-to-b from-[#1a1d2e] to-[#05070f] border border-white/5" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 w-[70%] rounded-full bg-black/60" />
            </div>
          </motion.div>
        </div>

        {/* Text layers */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <motion.div style={{ opacity: t1, y: t1y }} className="absolute text-center max-w-5xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 mb-6 font-medium">Design & Engineering Studio</p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-white">
              Build products that<br/>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                stand out by design.
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-2xl mx-auto">
              We partner with ambitious teams to craft software that feels effortless and performs flawlessly.
            </p>
          </motion.div>

          <motion.div style={{ opacity: t2, y: t2y }} className="absolute text-center max-w-4xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 mb-6 font-medium">Purpose-Built Interfaces</p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
              Every interaction, thoughtfully<br/>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                engineered to convert.
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-2xl mx-auto">
              From micro-interactions to motion systems — pixel-perfect execution at every layer.
            </p>
          </motion.div>

          <motion.div style={{ opacity: t3, y: t3y }} className="absolute text-center max-w-4xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 mb-6 font-medium">End-to-End Delivery</p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
              From <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">strategy</span> to <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">shipped</span>,<br/>
              we own the outcome.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 max-w-2xl mx-auto">
              Trusted by teams shipping to millions. Ready when you are.
            </p>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-2 font-medium">
          <span>Scroll to explore</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}