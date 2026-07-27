'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  { title: 'Halcyon Labs', tag: 'Brand · Website', cat: 'Brand', year: '2025', color: 'from-blue-500 to-cyan-400', desc: 'Complete brand system + cinematic marketing site for a stealth AI infra startup.' },
  { title: 'Northline OS', tag: 'Product · Motion', cat: 'Product', year: '2025', color: 'from-violet-500 to-blue-500', desc: 'Design engineering for a next-gen developer platform. WebGL landing, docs, and dashboard.' },
  { title: 'Prism Cloud', tag: 'Marketing site', cat: 'Website', year: '2024', color: 'from-cyan-400 to-emerald-400', desc: 'A category-defining launch site with scroll-driven 3D and a full identity refresh.' },
  { title: 'Nova AI', tag: 'AI Product UX', cat: 'Product', year: '2024', color: 'from-pink-500 to-violet-500', desc: 'Conversational UX and streaming interfaces for a consumer-facing agent product.' },
  { title: 'Ember Studio', tag: 'Brand', cat: 'Brand', year: '2024', color: 'from-orange-500 to-rose-500', desc: 'Naming, identity, and launch narrative for a boutique motion studio.' },
  { title: 'Kairo', tag: 'Product · Web', cat: 'Product', year: '2023', color: 'from-emerald-400 to-teal-500', desc: 'Full-stack product design and Next.js build for a fintech platform.' },
]

const filters = ['All', 'Brand', 'Website', 'Product']
const clients = ['Northline', 'Halcyon', 'Prism', 'Nova AI', 'Ember', 'Kairo', 'Obscura', 'Lumen', 'Vertex', 'Argon', 'Cascade', 'Meridian']

function Work() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter)
  return (
    <>
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-25" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-8">Selected work</motion.p>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1}} className="font-display text-6xl md:text-8xl font-bold leading-[0.95]">
            Things we've<br/><span className="grad-text">obsessed over.</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 mb-12 flex flex-wrap gap-3">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${filter === f ? 'bg-white text-[#0a0e27] border-white' : 'border-white/20 text-white/70 hover:border-cyan-300 hover:text-white'}`}
            >{f} <span className="ml-1.5 text-xs opacity-60">{f === 'All' ? projects.length : projects.filter(p=>p.cat===f).length}</span></button>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-6 space-y-24">
          {filtered.map((p, i) => (
            <motion.div key={p.title}
              initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-120px'}} transition={{duration:0.8,delay:i*0.04,ease:[0.7,0,0.2,1]}}
              className={`grid md:grid-cols-12 gap-8 items-center ${i%2 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`md:col-span-7 ${i%2 ? 'md:order-2' : ''}`}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[16/10]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-90`} />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,14,39,0.7)_100%)]" />
                  <div className="absolute inset-0 grid-lines opacity-25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="laptop-perspective">
                      <div className="laptop-base scale-90 group-hover:scale-100 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`md:col-span-5 ${i%2 ? 'md:order-1' : ''}`}>
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/50">
                  <span>{p.tag}</span><span>·</span><span>{p.year}</span>
                </div>
                <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold">{p.title}</h2>
                <p className="mt-4 text-white/60 leading-relaxed">{p.desc}</p>
                <a href="#" className="mt-6 inline-flex items-center gap-2 link-underline text-sm font-semibold">Read case study <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-[#080b23] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Selected clients</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold">Companies we've<br/>helped <span className="grad-text">stand out.</span></h2>
            </div>
            <p className="max-w-md text-white/60 leading-relaxed">From Series-A rockets to public-company relaunches, we've partnered with 80+ ambitious teams across the world.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {clients.map(c => (
              <div key={c} className="bg-[#080b23] py-10 flex items-center justify-center font-display text-lg md:text-xl font-semibold text-white/50 hover:text-white hover:bg-[#0a0e27] transition-all">{c}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold">Yours could be <span className="grad-text">next.</span></h2>
          <div className="mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-[#0a0e27] px-8 py-4 font-semibold hover:scale-[1.03] transition">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Work
