// components/site/CinematicLaptop.jsx
'use client'
import { useRef, useEffect, useState, memo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/* ============================================
   PARTICLE FIELD — matches page theme
   ============================================ */
const ParticleField = memo(function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let animId
    let isVisible = true
    const particles = []
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(DPR, DPR)
    }
    resize()

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200)
    }
    window.addEventListener('resize', onResize)

    const onVisibility = () => {
      isVisible = !document.hidden
      if (isVisible && !animId) tick()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const COUNT = window.innerWidth < 768 ? 25 : 40
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        op: Math.random() * 0.3 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const tick = () => {
      if (!isVisible) {
        animId = null
        return
      }
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = 'rgba(120, 220, 255, 0.5)'
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.018
        if (p.x < 0) p.x = w
        else if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        else if (p.y > h) p.y = 0

        const twinkle = 0.5 + 0.5 * Math.sin(p.pulse)
        ctx.globalAlpha = p.op * twinkle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      clearTimeout(resizeTimer)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
})

/* ============================================
   ORBIT RINGS — matches page theme
   ============================================ */
function OrbitRings() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const rings = [
    { size: 460, duration: 40, opacity: 0.4, reverse: false },
    { size: 720, duration: 60, opacity: 0.22, reverse: true },
    { size: 980, duration: 80, opacity: 0.12, reverse: false },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 pointer-events-none rounded-full border border-cyan-300/[0.06]"
          style={{
            width: r.size,
            height: r.size,
            marginLeft: -r.size / 2,
            marginTop: -r.size / 2,
            animation: `cin-orbit${r.reverse ? '-r' : ''} ${r.duration}s linear infinite`,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          <div
            className="absolute h-2 w-2 rounded-full bg-cyan-300"
            style={{
              opacity: r.opacity,
              left: '50%',
              top: -4,
              marginLeft: -4,
              boxShadow: '0 0 10px rgba(103, 232, 249, 0.8)',
            }}
          />
        </div>
      ))}
    </div>
  )
}

/* ============================================
   CINEMATIC LAPTOP — matches StandoutDev theme
   ============================================ */
export default function CinematicLaptop() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 32,
    mass: 0.5,
    restDelta: 0.001,
  })

  // Laptop choreo
  const lidRotate       = useTransform(p, [0, 0.15, 0.35, 0.6, 1],  [-110, -110, -20, 0, 0])
  const laptopScale     = useTransform(p, [0, 0.15, 0.5, 0.8, 1],   [0.55, 0.75, 1, 1.35, 2.2])
  const laptopY         = useTransform(p, [0, 0.3, 0.6, 1],         [80, 20, 0, -60])
  const laptopRotateY   = useTransform(p, [0, 0.5, 1],              [-14, 0, 18])
  const laptopRotateX   = useTransform(p, [0, 0.5, 1],              [18, 6, -6])
  const glowOpacity     = useTransform(p, [0, 0.3, 0.6, 1],         [0.15, 0.4, 0.55, 0.65])
  const screenContentOp = useTransform(p, [0.2, 0.4, 1],            [0, 1, 1])

  // Text crossfades
  const t1  = useTransform(p, [0, 0.18, 0.28],           [1, 1, 0])
  const t1y = useTransform(p, [0, 0.28],                 [0, -60])
  const t2  = useTransform(p, [0.22, 0.32, 0.5, 0.6],    [0, 1, 1, 0])
  const t2y = useTransform(p, [0.22, 0.6],               [40, -60])
  const t3  = useTransform(p, [0.55, 0.65, 0.85, 0.98],  [0, 1, 1, 0])
  const t3y = useTransform(p, [0.55, 0.98],              [40, -60])

  return (
    <section ref={ref} className="relative" style={{ height: '420vh' }}>
      {/* Self-contained CSS keyframes + laptop dimensions */}
      <style jsx>{`
        @keyframes cin-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes cin-orbit-r {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .cin-perspective {
          perspective: 1600px;
          perspective-origin: 50% 50%;
        }
        .cin-laptop-base {
          width: min(78vw, 900px);
          aspect-ratio: 16 / 10;
          will-change: transform;
        }
        .cin-screen-inner {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#060920]"
        style={{ isolation: 'isolate' }}
      >
        {/* ==== BACKGROUND LAYERS — matches page theme ==== */}
        <div className="absolute inset-0 bg-[#060920]" />
        <ParticleField />

        {/* Aurora / radial gradients matching page */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(56,130,246,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_48%,rgba(34,211,238,0.06)_0%,transparent_70%)]" />

        {/* Grid — cyan tint to match page */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(103,232,249,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(103,232,249,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          }}
        />

        {/* Themed ambient orbs — cyan / blue / violet */}
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/[0.07] blur-[130px]" />
        <div className="absolute -right-40 bottom-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.06] blur-[110px]" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-[120px]" />

        {/* Vignettes to blend into surrounding sections */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0e27] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080b23] to-transparent" />

        {/* Orbit rings — same as page hero */}
        <OrbitRings />

        {/* ==== TOP BADGE — matches page style ==== */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.03] backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            Scroll Experience
          </span>
        </div>

        {/* ==== LAPTOP ==== */}
        <div className="absolute inset-0 flex items-center justify-center cin-perspective">
          <motion.div
            style={{
              scale: laptopScale,
              y: laptopY,
              rotateY: laptopRotateY,
              rotateX: laptopRotateX,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            className="relative"
          >
            {/* Ambient glow — cyan/blue theme */}
            <motion.div
              style={{ opacity: glowOpacity, willChange: 'opacity' }}
              className="absolute -inset-32 rounded-full blur-3xl"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(34,211,238,0.35) 0%, rgba(59,130,246,0.2) 45%, transparent 75%)',
                }}
              />
            </motion.div>

            <div className="relative cin-laptop-base" style={{ transformStyle: 'preserve-3d' }}>
              {/* Lid / screen */}
              <motion.div
                style={{
                  rotateX: lidRotate,
                  transformOrigin: 'bottom center',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
                className="absolute inset-0 rounded-2xl border border-cyan-400/15 bg-gradient-to-b from-[#0a0e27] to-[#060920] overflow-hidden"
              >
                {/* Cyan-tinted drop shadow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: '0 30px 80px -20px rgba(34,211,238,0.35)' }}
                />

                <div className="cin-screen-inner">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                    <div className="ml-4 h-4 flex-1 rounded bg-white/5 flex items-center px-2">
                      <div className="h-1 w-24 rounded bg-cyan-400/20" />
                    </div>
                    <div className="h-4 w-4 rounded bg-white/5" />
                  </div>

                  <motion.div
                    style={{ opacity: screenContentOp, willChange: 'opacity' }}
                    className="flex h-[calc(100%-32px)]"
                  >
                    {/* Sidebar — themed */}
                    <div className="w-[22%] border-r border-white/5 bg-white/[0.02] p-3 space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400" />
                        <div className="h-2.5 w-14 rounded bg-white/20" />
                      </div>
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 rounded px-2 py-1.5 ${
                            i === 1 ? 'bg-cyan-400/10 border border-cyan-400/20' : ''
                          }`}
                        >
                          <div
                            className={`h-2 w-2 rounded-sm ${
                              i === 1 ? 'bg-cyan-300' : 'bg-white/30'
                            }`}
                          />
                          <div className="h-1.5 flex-1 rounded bg-white/15" />
                        </div>
                      ))}
                      <div className="pt-3 mt-3 border-t border-white/5 space-y-1.5">
                        <div className="h-1 w-8 rounded bg-cyan-300/40" />
                        <div className="h-1 w-12 rounded bg-white/10" />
                      </div>
                    </div>

                    {/* Main dashboard */}
                    <div className="flex-1 p-4 space-y-3">
                      {/* Header row */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1.5">
                          <div className="h-2.5 w-32 rounded bg-white/25" />
                          <div className="h-1.5 w-20 rounded bg-white/10" />
                        </div>
                        <div className="h-6 w-20 rounded-md bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
                      </div>

                      {/* Stat cards — cyan themed */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { c: 'from-blue-500/40 to-blue-500/5', v: 'w-10' },
                          { c: 'from-cyan-400/40 to-cyan-400/5', v: 'w-8' },
                          { c: 'from-violet-500/40 to-violet-500/5', v: 'w-12' },
                        ].map((s, i) => (
                          <div
                            key={i}
                            className="rounded-md border border-cyan-400/10 bg-white/[0.02] p-2 space-y-1.5"
                          >
                            <div className="h-1.5 w-8 rounded bg-cyan-300/30" />
                            <div className={`h-3 rounded bg-white/30 ${s.v}`} />
                            <div className={`h-8 rounded bg-gradient-to-t ${s.c}`} />
                          </div>
                        ))}
                      </div>

                      {/* Chart — cyan bars */}
                      <div className="rounded-md border border-cyan-400/10 bg-white/[0.02] p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="h-2 w-16 rounded bg-white/20" />
                          <div className="flex gap-1.5 items-center">
                            <div className="flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                              <div className="h-1 w-6 rounded bg-white/15" />
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                              <div className="h-1 w-6 rounded bg-white/15" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end gap-1 h-14">
                          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm bg-gradient-to-t from-blue-500/70 to-cyan-400/70"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Bottom row — mini metric strip */}
                      <div className="grid grid-cols-2 gap-2">
                        {[0, 1].map((i) => (
                          <div
                            key={i}
                            className="rounded-md border border-white/5 bg-white/[0.02] p-2 flex items-center gap-2"
                          >
                            <div className="h-6 w-6 rounded bg-gradient-to-br from-cyan-400/40 to-blue-500/20" />
                            <div className="flex-1 space-y-1">
                              <div className="h-1 w-full rounded bg-white/15" />
                              <div className="h-1 w-1/2 rounded bg-cyan-300/40" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Notch */}
                <div className="absolute left-1/2 top-1 -translate-x-1/2 h-1.5 w-16 rounded-b-lg bg-black/70" />

                {/* Screen sheen */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(115deg, transparent 40%, rgba(103,232,249,0.06) 50%, transparent 60%)',
                  }}
                />
              </motion.div>

              {/* Keyboard deck — themed */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3 w-[104%] rounded-b-2xl bg-gradient-to-b from-[#0a0e27] to-[#020410] border border-cyan-400/10" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 w-[70%] rounded-full bg-black/60" />
            </div>
          </motion.div>
        </div>

        {/* ==== TEXT OVERLAYS — matches page typography ==== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">

          {/* Frame 1 */}
          <motion.div
            style={{ opacity: t1, y: t1y, willChange: 'opacity, transform' }}
            className="absolute text-center max-w-5xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">
              Design &amp; Development Studio
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight text-white">
              Build products that<br />
              <span className="grad-text">stand out by design.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              We partner with ambitious teams to craft software that feels effortless
              and performs flawlessly.
            </p>
          </motion.div>

          {/* Frame 2 */}
          <motion.div
            style={{ opacity: t2, y: t2y, willChange: 'opacity, transform' }}
            className="absolute text-center max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">
              Purpose-Built Interfaces
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white">
              Every interaction, thoughtfully<br />
              <span className="grad-text">engineered to convert.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              From micro-interactions to motion systems — pixel-perfect execution at every layer.
            </p>
          </motion.div>

          {/* Frame 3 */}
          <motion.div
            style={{ opacity: t3, y: t3y, willChange: 'opacity, transform' }}
            className="absolute text-center max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">
              End-to-End Delivery
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white">
              From <span className="grad-text">strategy</span> to{' '}
              <span className="grad-text">shipped</span>,<br />
              we own the outcome.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Trusted by teams shipping to millions. Ready when you are.
            </p>
          </motion.div>
        </div>

        {/* Scroll cue — matches page style */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.45em] text-white/25">Scroll to explore</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-cyan-400/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}