'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react'

const budgets = ['< $25k', '$25k – $50k', '$50k – $100k', '$100k+']
const services = ['Brand', 'Website', 'Motion / 3D', 'Product', 'AI UX', 'Launch']

function Contact() {
  const [selectedServices, setSelectedServices] = useState([])
  const [budget, setBudget] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggle = (s) => {
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-25" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-8">Get in touch</motion.p>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.1}} className="font-display text-6xl md:text-8xl font-bold leading-[0.95]">
            Tell us about<br/><span className="grad-text">your project.</span>
          </motion.h1>
          <p className="mt-8 max-w-2xl text-lg text-white/60">The more detail you share, the sharper our first response. We reply within one business day.</p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Email</div>
              <a href="mailto:hi@standoutdev.co" className="font-display grad-text flex items-center gap-2"><Mail className="h-5 w-5" />standoutdevsolutions@gmail.com</a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Studio</div>
              <div className="flex items-start gap-2 text-white/70"><MapPin className="h-5 w-5 mt-0.5 text-cyan-300" /><div>Pune , Maharashra , IN<br/>Remote-first, worldwide</div></div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Response time</div>
              <div className="text-white/70">Within 1 business day. We take on limited engagements each quarter.</div>
            </div>
          </div>

          <div className="md:col-span-8">
            {submitted ? (
              <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="rounded-3xl border border-cyan-400/30 bg-cyan-400/5 p-12 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6 glow">
                  <Send className="h-7 w-7 text-[#0a0e27]" />
                </div>
                <h3 className="font-display text-4xl font-bold">Message received.</h3>
                <p className="mt-4 text-white/60">Thanks for reaching out. A real human on our team will reply within one business day.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40">Your name</label>
                    <input required className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40">Your email</label>
                    <input required type="email" className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition" placeholder="jane@company.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Company / Project</label>
                    <input className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition" placeholder="Acme Inc." />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 block mb-3">Services needed</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map(s => (
                      <button type="button" key={s} onClick={() => toggle(s)}
                        className={`px-4 py-2 rounded-full border text-sm transition ${selectedServices.includes(s) ? 'bg-white text-[#0a0e27] border-white' : 'border-white/20 text-white/70 hover:border-cyan-300'}`}
                      >{s}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 block mb-3">Budget</label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map(b => (
                      <button type="button" key={b} onClick={() => setBudget(b)}
                        className={`px-4 py-2 rounded-full border text-sm transition ${budget === b ? 'bg-white text-[#0a0e27] border-white' : 'border-white/20 text-white/70 hover:border-cyan-300'}`}
                      >{b}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40">Tell us about the project</label>
                  <textarea required rows={5} className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition resize-none" placeholder="What are you building? What does success look like? Any references?" />
                </div>

                <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-white text-[#0a0e27] px-8 py-4 font-semibold hover:scale-[1.03] transition">
                  Send message <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
