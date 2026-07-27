'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const principles = [
  { n: '01', t: 'Taste is the moat', d: 'Anyone can copy features. Nobody can copy taste. We obsess over the tiny details that make experiences feel alive.' },
  { n: '02', t: 'Design + Engineering, together', d: 'Our designers write code. Our engineers care about the pixel. There is no handoff — only craft.' },
  { n: '03', t: 'Ship the film, not the wireframe', d: 'Every project ships as a cinematic experience. Motion, sound, and story are first-class citizens.' },
  { n: '04', t: 'Small team, deep partnership', d: 'You work directly with senior craftspeople. No account managers, no diluted vision.' },
]

function About() {
  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-8">About the studio</motion.p>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1,ease:[0.7,0,0.2,1]}} className="font-display text-6xl md:text-8xl font-bold leading-[0.95]">
            A tiny studio with an<br/><span className="grad-text">obsessive standard.</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}} className="mt-10 max-w-2xl text-lg text-white/60 leading-relaxed">
            Standoutdev is a design and engineering studio started in 2021 by a small crew who believed the web could feel like cinema. We work with founders, product teams, and rebels who care about how their thing looks, feels, and moves.
          </motion.p>
        </div>
      </section>

      <section className="relative py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-10 mb-20">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">Principles</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">How we work.</h2>
            </div>
            <div className="md:col-span-8 space-y-4">
              {principles.map((p,i) => (
                <motion.div key={p.n}
                  initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay: i*0.06}}
                  className="grid grid-cols-12 gap-4 border-t border-white/10 pt-6"
                >
                  <div className="col-span-2 md:col-span-1 text-cyan-300/80 font-mono text-sm">{p.n}</div>
                  <div className="col-span-10 md:col-span-11">
                    <h3 className="font-display text-2xl md:text-3xl font-semibold">{p.t}</h3>
                    <p className="mt-3 text-white/60 leading-relaxed max-w-2xl">{p.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-[#080b23] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">The team</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold">Small crew.<br/><span className="grad-text">Zero passengers.</span></h2>
              <p className="mt-6 text-white/60 leading-relaxed max-w-lg">Eight people across design, motion, and engineering. Everyone ships. Everyone owns. Everyone gives a damn.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {n:'Aarav K.', r:'Creative Director'},
                {n:'Mira S.', r:'Design Engineer'},
                {n:'Kian D.', r:'Motion Lead'},
                {n:'Rhea T.', r:'Full-stack'},
              ].map(m => (
                <div key={m.n} className="aspect-[3/4] rounded-2xl border border-white/10 bg-gradient-to-br from-[#141a44] to-[#0a0e2f] p-5 flex flex-col justify-end relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="font-display text-xl font-semibold">{m.n}</div>
                    <div className="text-sm text-white/50">{m.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-[#080b23] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Our story</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">A studio, <span className="grad-text">not an agency.</span></h2>
              <p className="mt-6 text-white/60 leading-relaxed">Five people, one workshop, and an obsession with craft. Here's how we got here — and where we're going.</p>
            </div>
            <div className="md:col-span-7 space-y-8">
              {[
                { y: '2021', t: 'A studio is born', d: 'Aarav and Mira leave big-agency life to start Standoutdev over a shared Notion doc and one very ambitious tagline.' },
                { y: '2022', t: 'First Awwwards SOTD', d: 'The Halcyon Labs launch site wins Site of the Day. We stop sleeping and start hiring.' },
                { y: '2023', t: 'Design engineering, formalized', d: 'We codify our hybrid design-eng workflow. Figma to Next.js in the same afternoon becomes normal.' },
                { y: '2024', t: 'Motion department', d: 'Kian joins as Motion Lead. WebGL becomes a first-class deliverable. FWA nominates two of our sites.' },
                { y: '2025', t: 'The AI chapter', d: 'We start shipping AI product surfaces — streaming, agentic, and generative UX for a new generation of software.' },
              ].map((m, i) => (
                <motion.div key={m.y}
                  initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{duration:0.6, delay:i*0.05}}
                  className="grid grid-cols-12 gap-4 pb-6 border-b border-white/10"
                >
                  <div className="col-span-3 md:col-span-2 font-mono text-cyan-300/80 text-sm">{m.y}</div>
                  <div className="col-span-9 md:col-span-10">
                    <h3 className="font-display text-2xl font-semibold">{m.t}</h3>
                    <p className="mt-2 text-white/60 leading-relaxed">{m.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Values</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-16">What we <span className="grad-text">believe.</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'Ship, then polish', d: 'Perfection is the enemy of launched. We ship, learn, and refine in the light.' },
              { t: 'Taste is a discipline', d: 'We collect it, curate it, and defend it. Every brief is a chance to raise the floor.' },
              { t: 'Small over big', d: 'Small teams. Small egos. Small meetings. Big outcomes.' },
              { t: 'Curiosity always', d: "If we can't explain the tech behind it, we haven't studied it enough yet." },
              { t: 'Honesty first', d: "We'll tell you when your idea is bad. We expect the same in return." },
              { t: 'Play seriously', d: 'The best work is made when people are having a genuinely good time.' },
            ].map((v, i) => (
              <motion.div key={v.t}
                initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.05}}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
              >
                <h3 className="font-display text-xl font-semibold mb-3">{v.t}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold">Want to see what we build?</h2>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link href="/work" className="inline-flex items-center gap-2 rounded-full bg-white text-[#0a0e27] px-8 py-4 font-semibold hover:scale-[1.03] transition">Selected work <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold">Start a project</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
