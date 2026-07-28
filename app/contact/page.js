'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react'

const services = ['Brand', 'Website', 'Motion / 3D', 'Product', 'AI UX', 'Launch']

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (error) setError('')
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', service: '', description: '' })
    } catch {
      setError('Could not send your message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-25" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-8">Get in touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-6xl md:text-8xl font-bold leading-[0.95]">
            Tell us about<br /><span className="grad-text">your project.</span>
          </motion.h1>
          <p className="mt-8 max-w-2xl text-lg text-white/60">The more detail you share, the sharper our first response. We reply within one business day.</p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Email</div>
              <a href="mailto:standoutdevsolutions@gmail.com" className="font-display grad-text flex items-center gap-2"><Mail className="h-5 w-5" />standoutdevsolutions@gmail.com</a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Studio</div>
              <div className="flex items-start gap-2 text-white/70"><MapPin className="h-5 w-5 mt-0.5 text-cyan-300" /><div>Pune, Maharashtra 411052<br />India · Worldwide</div></div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Response time</div>
              <div className="text-white/70">Within 1 business day. We take on limited engagements each quarter.</div>
            </div>
          </div>

          <div className="md:col-span-8">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-cyan-400/30 bg-cyan-400/5 p-12 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6 glow">
                  <Send className="h-7 w-7 text-[#0a0e27]" />
                </div>
                <h3 className="font-display text-4xl font-bold">Message received.</h3>
                <p className="mt-4 text-white/60">Thanks for reaching out. A real human on our team will reply within one business day.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm text-cyan-300 hover:text-white transition"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={update('name')}
                      className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40">Phone number</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40">Service</label>
                    <select
                      required
                      value={form.service}
                      onChange={update('service')}
                      className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#0a0e27]">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-[#0a0e27]">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40">Description</label>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={update('description')}
                    className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-[#0a0e27] px-8 py-4 font-semibold hover:scale-[1.03] transition disabled:opacity-60 disabled:hover:scale-100"
                >
                  {loading ? 'Sending...' : 'Send message'}
                  {!loading && <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />}
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
