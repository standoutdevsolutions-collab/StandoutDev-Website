'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Logo3DScene = dynamic(() => import('./Logo3DScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-24 w-24 animate-pulse rounded-full bg-blue-500/30 blur-3xl" />
    </div>
  ),
})

export default function CinematicLogoHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030616]">
      {/* ============ BACKGROUND LAYERS ============ */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#030616] via-[#050d24] to-[#020818]" />

        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96,165,250,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 100%)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(147,197,253,0.6) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="absolute right-[15%] top-1/2 h-[800px] w-[800px] -translate-y-1/2 rounded-full bg-blue-500/[0.18] blur-[140px]" />
        <div className="absolute right-[5%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.15] blur-[120px]" />
        <div className="absolute left-[5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.1] blur-[120px]" />
        <div className="absolute left-[30%] top-[10%] h-[300px] w-[300px] rounded-full bg-purple-500/[0.08] blur-[100px]" />

        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                opacity: Math.random() * 0.6 + 0.2,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030616] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030616] to-transparent" />
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-10 px-6 py-20 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-0">
        {/* LEFT: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex w-full max-w-xl flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left"
        >
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            We Build{' '}
            <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Products
            </span>
            <span className="block">That</span>
            <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Stand Out.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
            We design and develop digital products, websites, and AI solutions
            that help ambitious brands stand out in a crowded market.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/40 transition-all hover:shadow-blue-500/60 hover:scale-[1.03] sm:px-6 sm:py-3">
              Book a Discovery Call
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/25 sm:px-6 sm:py-3">
              View Our Work
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* RIGHT: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
          className="relative flex h-[360px] w-full items-center justify-center cursor-grab active:cursor-grabbing sm:h-[440px] md:h-[520px] lg:h-[640px] lg:w-1/2"
        >
          {/* Ambient glow halo behind canvas */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[110px] sm:h-[520px] sm:w-[520px]" />
          <div className="pointer-events-none absolute left-1/2 top-[65%] h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[90px] sm:h-[300px] sm:w-[300px]" />

          <div className="absolute inset-0">
            <Logo3DScene />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }
      `}</style>
    </section>
  )
}