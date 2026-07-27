'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Palette, Code2, Play, Rocket, Brain, Cpu } from 'lucide-react'

const services = [
  { icon: Palette, k: '01', t: 'Brand & Identity', d: 'Naming, logo systems, visual language, guidelines, and the story engine that powers everything downstream.', deliverables: ['Naming & narrative', 'Visual identity', 'Typography system', 'Brand guidelines'] },
  { icon: Code2, k: '02', t: 'Marketing sites', d: 'Cinematic, high-conversion websites that make your Series A landing page feel like a category launch.', deliverables: ['Design system', 'Framer/Next.js build', 'CMS integration', 'Performance & SEO'] },
  { icon: Play, k: '03', t: 'Motion & 3D', d: 'Scroll-driven cinema, WebGL scenes, and micro-interactions that make your product feel alive.', deliverables: ['Motion direction', 'Three.js / WebGL', 'Lottie & Rive', 'Sound design'] },
  { icon: Brain, k: '04', t: 'AI Product UX', d: 'UX for chat, agentic workflows, and generative surfaces. We design software for models that talk back.', deliverables: ['Conversational UX', 'Prompt scaffolding', 'Streaming interfaces', 'Eval loops'] },
  { icon: Cpu, k: '05', t: 'Product design & engineering', d: 'End-to-end product work: from Figma to shipped Next.js. One team, one voice, zero handoff friction.', deliverables: ['Discovery & strategy', 'UX / UI design', 'Full-stack build', 'QA & launch'] },
  { icon: Rocket, k: '06', t: 'Launch strategy', d: 'Positioning, launch narrative, press assets, and the choreography to make a real dent when you ship.', deliverables: ['Positioning', 'Launch narrative', 'Assets & press kit', 'GTM support'] },
]

const process = [
  { k: '01', t: 'Discover', d: 'Deep dive into your audience, competitive space, and ambition. We come back with sharp POV.' },
  { k: '02', t: 'Direct', d: 'Two or three distinct creative directions. We choose the one that scares you a little.' },
  { k: '03', t: 'Design', d: 'Component libraries, motion R&D, and pixel-obsessed reviews — in Figma and in code.' },
  { k: '04', t: 'Deliver', d: 'Production build in Next.js with performance budgets. Ship, measure, iterate.' },
]

function Services() {
  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-25" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-8">Services</motion.p>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1}} className="font-display text-6xl md:text-8xl font-bold leading-[0.95]">
            One team.<br/><span className="grad-text">Every discipline you need.</span>
          </motion.h1>
          <p className="mt-8 max-w-2xl text-lg text-white/60">From the first line of your narrative to the last line of production code, we handle every discipline in-house.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-4">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.k}
                  initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:0.6,delay:i*0.05,ease:[0.7,0,0.2,1]}}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 hover:bg-white/[0.04] transition"
                >
                  <div className="grid md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-1">
                      <div className="font-mono text-sm text-cyan-300/80">{s.k}</div>
                    </div>
                    <div className="md:col-span-5">
                      <Icon className="h-8 w-8 text-cyan-300 mb-4" />
                      <h3 className="font-display text-3xl md:text-5xl font-bold">{s.t}</h3>
                    </div>
                    <div className="md:col-span-4 text-white/60 leading-relaxed">{s.d}</div>
                    <div className="md:col-span-2">
                      <ul className="space-y-2 text-sm">
                        {s.deliverables.map(d => (
                          <li key={d} className="flex items-center gap-2 text-white/70"><span className="h-1 w-1 rounded-full bg-cyan-300" />{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-400/5 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#080b23] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Process</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold">Four beats.<br/><span className="grad-text">Six to twelve weeks.</span></h2>

          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {process.map((p,i) => (
              <motion.div key={p.k}
                initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay: i*0.08}}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="text-cyan-300/80 font-mono text-sm mb-4">{p.k}</div>
                <h3 className="font-display text-2xl font-semibold mb-3">{p.t}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">A word from a founder</p>
              <blockquote className="font-display text-3xl md:text-5xl font-bold leading-tight">
                "They understood our product better than most of our own team by <span className="grad-text">week two.</span> That's what real partnership looks like."
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
                <div>
                  <div className="font-semibold">Marcus Vale</div>
                  <div className="text-sm text-white/50">Head of Product, Northline OS</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/40 to-blue-500/20" />
              <div className="absolute inset-0 grid-lines opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="laptop-perspective">
                  <div className="laptop-base scale-90 floaty" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold">Let's find the right shape<br/>for your <span className="grad-text">project.</span></h2>
          <div className="mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-[#0a0e27] px-8 py-4 font-semibold hover:scale-[1.03] transition">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
