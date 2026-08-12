// app/page.jsx
'use client';

import { useState, memo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight, Layers,
  Plus, Minus, Star, Globe,
  Palette, Code, Smartphone, MonitorPlay, ShoppingCart,
  LayoutDashboard, Clapperboard, PenTool,
  ExternalLink, CheckCircle, ArrowRight,
  Search, Rocket, FlaskConical, Eye,
} from 'lucide-react';
import CountUp from '@/components/site/CountUp';
import Hero from '@/components/sections/Hero';

/* ============================================
   DATA
============================================ */
const clientLogos  = ['Uma Metal Craft','Siddhanath Physics','Digital Developers','Vercel','Linear','Notion','Figma','Supabase','Webflow','Framer'];
const clientLogos2 = ['OpenAI','GitHub','Slack','Discord','Spotify','Airbnb','Uber','Netflix','Adobe','Dribbble'];

const services = [
  { icon: Clapperboard,    title: 'Motion Graphics Design', tags: ['Microinteractions','UI Animation','Storyboarding'],        desc: 'Scroll-driven cinema, micro-interactions, and motion that makes users feel something.' },
  { icon: PenTool,         title: 'Branding',               tags: ['Logo Design','Style Guide','Typography'],                  desc: 'Identity systems and visual languages that scale from favicon to flagship.' },
  { icon: Palette,         title: 'UI/UX Design',           tags: ['Wireframes','Prototypes','Design System'],                 desc: 'User-centered design where every pixel has a purpose.' },
  { icon: Code,            title: 'Web Development',        tags: ['API Development','CMS','Back-end'],                        desc: 'Full-stack engineering with modern frameworks, fast and scalable.' },
  { icon: Globe,           title: 'Web Design',             tags: ['Navigation','User Flow','Sitemap'],                        desc: 'Marketing sites that convert visitors into customers.' },
  { icon: MonitorPlay,     title: 'WordPress Development',  tags: ['Custom Dev','Plugin','Headless'],                          desc: 'Enterprise WordPress that actually performs.' },
  { icon: LayoutDashboard, title: 'SaaS Web & App Design',  tags: ['Dashboard UI','Data Viz','Admin Panel'],                   desc: 'Complex data made simple. Dashboards users love.' },
  { icon: ShoppingCart,    title: 'Shopify Development',    tags: ['Product Page','Checkout','CRO'],                           desc: 'Commerce experiences optimized for conversion.' },
  { icon: Smartphone,      title: 'Mobile App Design',      tags: ['Wireframes','Prototypes','Usability Testing'],             desc: 'Native-feel mobile experiences for retention.' },
  { icon: Layers,          title: 'Webflow Development',    tags: ['Responsive','No-Code','UI'],                               desc: 'Pixel-perfect Webflow builds with clean interactions.' },
];

const portfolioWork = [
  {
    id: 'uma-metals',
    title: 'Uma Metal Craft',
    tag: 'Manufacturing · Website',
    filters: ['Website Design','Web Development'],
    tools: ['next.js','tailwind'],
    color: 'from-amber-500 to-orange-600',
    colorHex: '#f59e0b',
    colorRgb: '245,158,11',
    url: 'https://umametalcraft.com/',
    desc: 'A premium manufacturing website with conversion-focused design that tripled inquiries.',
    thumbnail: '/uma1.png',
    results: [{ v:'3×', l:'Inquiries' },{ v:'60%', l:'Bounce ↓' },{ v:'2.1s', l:'Load' }],
    services: ['Web Design','Development','SEO'],
    year: '2024',
  },
  {
    id: 'siddhanath-physics',
    title: 'Siddhanath Krupa Physics',
    tag: 'Education · Web App',
    filters: ['Web Development','UI/UX Design'],
    tools: ['next.js','react'],
    color: 'from-blue-500 to-indigo-600',
    colorHex: '#3b82f6',
    colorRgb: '59,130,246',
    url: 'https://siddhanath-physics.vercel.app/',
    desc: 'An interactive education platform making physics accessible and engaging.',
    thumbnail: '/phy1.png',
    results: [{ v:'150+', l:'Students' },{ v:'95%', l:'Satisfaction' },{ v:'<1s', l:'Load' }],
    services: ['UI/UX','Development','Branding'],
    year: '2024',
  },
  {
    id: 'digital-developers',
    title: 'Digital Developers',
    tag: 'Agency · Website',
    filters: ['Website Design','Web Development','Branding'],
    tools: ['next.js','framer'],
    color: 'from-violet-500 to-purple-600',
    colorHex: '#8b5cf6',
    colorRgb: '139,92,246',
    url: 'https://digitaldeveloperss.com/',
    desc: 'A bold agency website with cinematic scroll animations and perfect performance.',
    thumbnail: '/dg.png',
    results: [{ v:'5×', l:'Leads' },{ v:'40%', l:'Conversion' },{ v:'100', l:'Perf.' }],
    services: ['Brand Strategy','Web Design','Motion'],
    year: '2024',
  },
];

const portfolioFilters = ['All','Website Design','Web Development','UI/UX Design','Branding'];

const testimonials = [
  { q:'StandoutDev transformed our online presence completely. The new website is professional, fast, and has tripled our inquiry rate. Best investment we made for our business.', n:'Uma Metal Craft', r:'Manufacturing, Rajkot', c:'from-amber-500 to-orange-600', letter:'U', project:'umametalcraft.com' },
  { q:"Our students and parents love the new platform. It's clean, loads instantly, and makes it easy to find course information. Enrollment went up significantly after launch.", n:'Siddhanath Krupa Physics', r:'Education Institute', c:'from-blue-500 to-indigo-600', letter:'S', project:'siddhanath-physics.vercel.app' },
  { q:'We hired StandoutDev to build our agency website and the result exceeded every expectation. Cinematic animations, perfect performance score, and clients now reach out calling us premium.', n:'Digital Developers', r:'Digital Agency', c:'from-violet-500 to-purple-600', letter:'D', project:'digitaldeveloperss.com' },
  { q:'The attention to detail is unmatched. Every pixel, every animation, every interaction felt intentional. Our conversion rate went from near zero to 40% on the contact page alone.', n:'Rohan Mehta', r:'Founder, TechStart India', c:'from-cyan-400 to-emerald-400', letter:'R', project:'Client project' },
];

const stats = [
  { value:15, suffix:'+',  prefix:'', label:'Projects Delivered' },
  { value:10, suffix:'+',  prefix:'', label:'Happy Clients' },
  { value:95, suffix:'%',  prefix:'', label:'Client Satisfaction' },
  { value:3,  suffix:'+',  prefix:'', label:'Industries Served' },
  { value:48, suffix:'hr', prefix:'', label:'Avg Kickoff Time' },
  { value:4.9,suffix:'★',  prefix:'', label:'Average Rating' },
];

const processSteps = [
  { n:'01', title:'Discovery',    desc:'We map your goals, audience, and UX strategy in a focused workshop.', icon: Search,      color:'from-blue-500 to-cyan-400' },
  { n:'02', title:'Research',     desc:'Competitive analysis, user research, and deep insight synthesis.',     icon: Eye,         color:'from-violet-500 to-blue-500' },
  { n:'03', title:'UI/UX Design', desc:'Wireframes, prototyping, design systems, and usability testing.',      icon: Palette,     color:'from-cyan-400 to-emerald-400' },
  { n:'04', title:'Development',  desc:'Clean, performant code using modern frameworks and best practices.',   icon: Code,        color:'from-emerald-400 to-teal-500' },
  { n:'05', title:'QA Testing',   desc:'Cross-browser testing, performance audits, and accessibility.',        icon: FlaskConical,color:'from-amber-400 to-orange-500' },
  { n:'06', title:'Launch',       desc:'Deployment, monitoring, and post-launch optimization sprints.',        icon: Rocket,      color:'from-pink-500 to-violet-500' },
];

const faqs = [
  { q:'What UI/UX design services does StandoutDev offer?',  a:'We offer end-to-end UI/UX design including wireframing, prototyping, user research, design systems, usability testing, and high-fidelity UI design for web, mobile, and SaaS platforms.' },
  { q:'How does StandoutDev approach a new project?',        a:'Every project starts with a Discovery phase — we map your goals, audience, and competitive landscape. Then we move through Research, Design, Development, QA, and Launch in structured sprints with weekly reviews.' },
  { q:'How long does a typical engagement take?',            a:'Marketing sites and brand launches run 4–8 weeks. Full product engagements are usually 2–4 months. We scope tightly and ship in phases.' },
  { q:'Do you work with early-stage startups?',              a:"Yes — we love working with founders who care about how their product looks and feels. We've shaped early products that went on to earn real traction." },
  { q:'What tech stack do you build in?',                    a:'Next.js, React, Three.js, and Framer Motion for the front. Tailwind CSS for styling. Vercel for hosting. We fit into your stack when you have one.' },
  { q:'Do you offer ongoing support after launch?',          a:'Absolutely. Most clients continue with us on a retainer for evolution, campaigns, and new features.' },
  { q:'Can you work with our in-house team?',                a:'Yes — we frequently embed with in-house design and eng teams. We can lead, support, or pair, depending on your needs.' },
  { q:'How do you handle pricing?',                          a:"We scope each engagement based on ambition and outcomes, not hours. We'll share a range on the first call and a firm number after discovery." },
];

/* ============================================
   SHARED
============================================ */
const BG  = '#020617';
const BGA = '#050d1f';
const gT  = { background:'linear-gradient(135deg,#60a5fa 0%,#06b6d4 50%,#818cf8 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', color:'transparent' };
const wT  = { background:'linear-gradient(180deg,#fff 0%,#cbd5e1 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' };
const LBL = { fontSize:11, textTransform:'uppercase', letterSpacing:'0.3em', color:'rgba(96,165,250,0.8)', marginBottom:16, fontWeight:600 };
const HD  = { fontWeight:900, lineHeight:1.02, letterSpacing:'-0.03em', fontSize:'clamp(2.2rem,5vw,3.8rem)' };
const BD  = { color:'rgba(255,255,255,0.5)', lineHeight:1.7, fontSize:'clamp(0.9rem,1.3vw,1rem)' };
const E   = [0.22,1,0.36,1];

/* ============================================
   FAQ
============================================ */
const FAQItem = memo(function FAQItem({ q, a, i, openIndex, setOpenIndex }) {
  const o = openIndex === i;
  return (
    <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:i*0.03, ease:E }} style={{ borderTop:'1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={() => setOpenIndex(o ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left gap-6 group">
        <span style={{ fontSize:'clamp(0.95rem,1.8vw,1.1rem)', fontWeight:600, lineHeight:1.4, color:'rgba(255,255,255,0.9)', transition:'color 0.4s' }} className="group-hover:text-[#60a5fa]">{q}</span>
        <span style={{ flexShrink:0, height:36, width:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${o?'#60a5fa':'rgba(255,255,255,0.12)'}`, background:o?'linear-gradient(135deg,#2563eb,#06b6d4)':'transparent', color:o?'#020617':'inherit', transform:o?'rotate(180deg)':'rotate(0)', transition:'all 0.5s cubic-bezier(0.22,1,0.36,1)' }}>
          {o ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <div style={{ display:'grid', gridTemplateRows:o?'1fr':'0fr', opacity:o?1:0, paddingBottom:o?20:0, transition:'all 0.55s cubic-bezier(0.22,1,0.36,1)' }}>
        <div style={{ overflow:'hidden' }}><p style={{ color:'rgba(255,255,255,0.5)', lineHeight:1.75, maxWidth:720, fontSize:14 }}>{a}</p></div>
      </div>
    </motion.div>
  );
});

/* ============================================
   GRID PROJECT CARD — Compact Grid Version
============================================ */
const GridProjectCard = memo(function GridProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr]   = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: E }}
      layout
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          border: `1px solid ${hovered ? `rgba(${p.colorRgb},0.2)` : 'rgba(255,255,255,0.06)'}`,
          background: hovered
            ? `linear-gradient(135deg, rgba(${p.colorRgb},0.04) 0%, rgba(255,255,255,0.02) 100%)`
            : 'rgba(255,255,255,0.015)',
          transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: hovered
            ? `0 20px 60px -12px rgba(${p.colorRgb},0.18), 0 0 0 1px rgba(${p.colorRgb},0.06)`
            : '0 2px 12px rgba(0,0,0,0.12)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── IMAGE AREA ─────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            cursor: 'pointer',
            overflow: 'hidden',
            flexShrink: 0,
          }}
          onClick={() => window.open(p.url, '_blank')}
        >
          {/* Bottom gradient fade */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(2,6,23,0) 50%, rgba(2,6,23,0.95) 100%)',
          }} />

          {/* Colour tint */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: `linear-gradient(135deg, rgba(${p.colorRgb},0.08) 0%, transparent 60%)`,
          }} />

          {/* Browser chrome mini */}
          <div style={{
            position: 'absolute',
            top: 10, left: 10, right: 10, bottom: 0,
            zIndex: 3,
            borderRadius: '10px 10px 0 0',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            borderBottom: 'none',
            background: 'rgba(5,10,28,0.6)',
            backdropFilter: 'blur(8px)',
            transform: hovered ? 'translateY(-4px) scale(1.005)' : 'translateY(0) scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
            boxShadow: hovered
              ? `0 12px 40px -8px rgba(${p.colorRgb},0.2)`
              : '0 4px 16px rgba(0,0,0,0.2)',
          }}>
            {/* Chrome bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 10px',
              background: 'rgba(0,0,0,0.5)',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {['rgba(255,95,86,0.6)','rgba(255,189,46,0.6)','rgba(39,201,63,0.6)'].map((c, k) => (
                  <span key={k} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 4,
                padding: '3px 8px', borderRadius: 5,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.04)',
                maxWidth: 200, margin: '0 auto',
              }}>
                <Globe className="h-2 w-2 flex-shrink-0" style={{ color: `rgba(${p.colorRgb},0.5)` }} />
                <span style={{
                  fontSize: 8, color: 'rgba(255,255,255,0.22)',
                  fontFamily: 'monospace',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{p.url.replace('https://', '')}</span>
              </div>
            </div>

            {/* Screenshot */}
            <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 28px)' }}>
              {imgErr ? (
                <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:0.35 }}>
                  <Layers className="h-8 w-8" />
                  <p style={{ marginTop:4, fontWeight:600, fontSize:11 }}>{p.title}</p>
                </div>
              ) : (
                <Image
                  src={p.thumbnail} alt={p.title} fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    transform: hovered ? 'scale(1.04) translateY(-2%)' : 'scale(1) translateY(0)',
                    transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  onError={() => setImgErr(true)}
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  quality={85}
                  priority={i === 0}
                />
              )}
            </div>
          </div>

          {/* Hover overlay */}
          <motion.div
            style={{
              position: 'absolute', inset: 0, zIndex: 5,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(2,6,23,0.5)', backdropFilter: 'blur(4px)',
            }}
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={false}
              animate={{ scale: hovered ? 1 : 0.85, y: hovered ? 0 : 8 }}
              transition={{ duration: 0.4, ease: E }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 100,
                background: `linear-gradient(135deg, rgba(${p.colorRgb},0.9), rgba(${p.colorRgb},0.6))`,
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: 11, fontWeight: 700,
                boxShadow: `0 4px 18px rgba(${p.colorRgb},0.35)`,
              }}
            >
              <ExternalLink className="h-3.5 w-3.5" /> Visit Site
            </motion.div>
          </motion.div>

          {/* Year badge */}
          <div style={{
            position: 'absolute', top: 16, right: 16, zIndex: 6,
            fontSize: 9, padding: '3px 8px', borderRadius: 100,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', fontWeight: 600,
          }}>{p.year}</div>
        </div>

        {/* ── INFO PANEL ─────────────────────────────── */}
        <div style={{
          position: 'relative', zIndex: 4,
          padding: 'clamp(14px,2vw,20px)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Tag + Tools */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8, gap:6 }}>
            <span style={{ fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:`rgba(${p.colorRgb},0.7)`, fontWeight:700 }}>{p.tag}</span>
            <div style={{ display:'flex', gap:3 }}>
              {p.tools.map(t => (
                <span key={t} style={{ fontSize:8, padding:'2px 6px', borderRadius:100, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.35)', fontWeight:500 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h3 style={{ fontSize:'clamp(1.1rem,2.2vw,1.4rem)', fontWeight:800, letterSpacing:'-0.02em', lineHeight:1.15, margin:'0 0 6px', ...wT }}>{p.title}</h3>

          {/* Desc */}
          <p style={{ color:'rgba(255,255,255,0.42)', lineHeight:1.6, fontSize:12, marginBottom:14, flex:1 }}>{p.desc}</p>

          {/* Results row */}
          <div style={{ display:'flex', gap:6, marginBottom:14 }}>
            {p.results.map(r => (
              <div key={r.l} style={{
                padding: '6px 10px', borderRadius: 10, flex: 1,
                background: `linear-gradient(135deg, rgba(${p.colorRgb},0.06) 0%, rgba(${p.colorRgb},0.02) 100%)`,
                border: `1px solid rgba(${p.colorRgb},0.08)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <span style={{
                  fontSize: 'clamp(0.8rem,1.4vw,0.95rem)', fontWeight: 900, lineHeight: 1,
                  background: `linear-gradient(135deg, rgba(${p.colorRgb},1) 0%, #fff 100%)`,
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>{r.v}</span>
                <span style={{ fontSize:7, color:'rgba(255,255,255,0.25)', marginTop:2, textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600 }}>{r.l}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:'flex', gap:6 }}>
            <Link href="/work" style={{
              display:'inline-flex', alignItems:'center', gap:4, flex:1, justifyContent:'center',
              padding:'8px 14px', borderRadius:100, fontSize:11, fontWeight:600,
              background:`linear-gradient(135deg, rgba(${p.colorRgb},0.85), rgba(${p.colorRgb},0.55))`,
              color:'#fff', textDecoration:'none',
              boxShadow:`0 3px 12px rgba(${p.colorRgb},0.2)`,
              transition:'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}>
              Case Study <ArrowUpRight className="h-3 w-3" />
            </Link>
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
              display:'inline-flex', alignItems:'center', gap:4,
              padding:'8px 12px', borderRadius:100, fontSize:11, fontWeight:600,
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
              color:'rgba(255,255,255,0.5)', textDecoration:'none',
              transition:'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }} className="hover:bg-white/[0.08] hover:text-white/90">
              <ExternalLink className="h-3 w-3" /> Live
            </a>
          </div>

          {/* Service tags */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:10, paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.04)' }}>
            {p.services.map(s => (
              <span key={s} style={{
                fontSize:9, padding:'2px 8px', borderRadius:100,
                background:`rgba(${p.colorRgb},0.04)`,
                border:`1px solid rgba(${p.colorRgb},0.08)`,
                color:`rgba(${p.colorRgb},0.6)`, fontWeight:500,
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ============================================
   TESTIMONIAL CARD
============================================ */
const TestimonialCard = memo(function TestimonialCard({ t, i }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:30 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay:i*0.08, ease:E }}
    >
      <div style={{
        borderRadius:20, padding:'clamp(22px,3vw,32px)',
        border:'1px solid rgba(255,255,255,0.06)',
        background:'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)',
        position:'relative', overflow:'hidden',
        transition:'all 0.5s cubic-bezier(0.22,1,0.36,1)',
        display:'flex', flexDirection:'column', height:'100%',
      }} className="testimonial-card-hover">
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${t.c}`} style={{ opacity:0.6 }} />
        <div className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${t.c}`} style={{ opacity:0.04, filter:'blur(32px)' }} />
        <div style={{ display:'flex', gap:3, marginBottom:14 }}>
          {[...Array(5)].map((_,k)=><Star key={k} className="h-3.5 w-3.5" style={{ fill:'#60a5fa', color:'#60a5fa' }} />)}
        </div>
        <p style={{ fontSize:'clamp(0.875rem,1.4vw,1rem)', lineHeight:1.7, color:'rgba(255,255,255,0.75)', flex:1, marginBottom:18, fontStyle:'italic' }}>
          &ldquo;{t.q}&rdquo;
        </p>
        <div style={{ height:1, background:'rgba(255,255,255,0.06)', marginBottom:16 }} />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.c} flex items-center justify-center flex-shrink-0`}
              style={{ fontWeight:800, color:'#020617', fontSize:14 }}>{t.letter}</div>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:'rgba(255,255,255,0.9)' }}>{t.n}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>{t.r}</div>
            </div>
          </div>
          <div style={{ fontSize:9, padding:'3px 8px', borderRadius:100, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.28)', whiteSpace:'nowrap' }}>{t.project}</div>
        </div>
      </div>
    </motion.div>
  );
});

/* ============================================
   PROCESS STEP
============================================ */
const ProcessStep = memo(function ProcessStep({ step, i, total }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const Icon  = step.icon;
  const glowColor = step.color.includes('blue')?'rgba(59,130,246,0.3)':step.color.includes('violet')?'rgba(139,92,246,0.3)':step.color.includes('emerald')?'rgba(52,211,153,0.3)':step.color.includes('amber')?'rgba(251,191,36,0.3)':step.color.includes('pink')?'rgba(236,72,153,0.3)':'rgba(6,182,212,0.3)';
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, x: i%2===0?-35:35 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.65, delay:i*0.09, ease:E }}
      style={{ display:'flex', gap:'clamp(14px,2.5vw,28px)', alignItems:'flex-start', marginBottom: i<total-1?'clamp(24px,4vw,44px)':0 }}
    >
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0, width:50 }}>
        <div className={`bg-gradient-to-br ${step.color}`} style={{ width:46, height:46, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 20px ${glowColor}` }}>
          <Icon className="h-4.5 w-4.5" style={{ color:'#020617' }} />
        </div>
        {i<total-1 && <div style={{ width:2, flex:1, minHeight:32, background:'linear-gradient(180deg,rgba(96,165,250,0.25) 0%,rgba(96,165,250,0.04) 100%)', borderRadius:100, marginTop:6 }} />}
      </div>
      <div style={{ paddingTop:2, flex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
          <span style={{ fontFamily:'monospace', fontSize:11, fontWeight:700, color:'rgba(96,165,250,0.55)' }}>{step.n}</span>
          <div style={{ height:1, width:20, background:'rgba(255,255,255,0.07)' }} />
        </div>
        <h3 style={{ fontSize:'clamp(1.1rem,2vw,1.5rem)', fontWeight:800, marginBottom:5, color:'rgba(255,255,255,0.95)' }}>{step.title}</h3>
        <p style={{ color:'rgba(255,255,255,0.4)', lineHeight:1.65, fontSize:'clamp(0.8rem,1.1vw,0.875rem)', maxWidth:400 }}>{step.desc}</p>
      </div>
    </motion.div>
  );
});

/* ============================================
   CONTACT FORM
============================================ */
function ContactFormEmbed() {
  const [form, setForm]         = useState({ name:'', email:'', details:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const update = useCallback((f) => (e) => { setForm(p=>({...p,[f]:e.target.value})); if(error) setError(''); }, [error]);
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const r = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      const d = await r.json();
      if(!r.ok){setError(d.error||'Something went wrong.');return;}
      setSubmitted(true);
    } catch { setError('Could not send. Email us at standoutdevsolutions@gmail.com'); }
    finally { setLoading(false); }
  };
  if (submitted) return (
    <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:E}}
      style={{borderRadius:20,padding:40,textAlign:'center',border:'1px solid rgba(59,130,246,0.25)',background:'rgba(59,130,246,0.05)'}}>
      <div style={{margin:'0 auto 20px',height:56,width:56,borderRadius:'50%',background:'linear-gradient(135deg,#2563eb,#06b6d4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <CheckCircle className="h-7 w-7" style={{color:'#020617'}}/>
      </div>
      <h3 style={{fontSize:'clamp(1.3rem,2.5vw,1.7rem)',fontWeight:700}}>Message received!</h3>
      <p style={{marginTop:10,color:'rgba(255,255,255,0.5)',fontSize:14}}>We&apos;ll reply within one business day.</p>
    </motion.div>
  );
  const inp = {marginTop:6,width:'100%',background:'transparent',border:'none',borderBottom:'1px solid rgba(255,255,255,0.1)',padding:'10px 0',fontSize:15,color:'#fff',outline:'none',transition:'border-color 0.4s ease'};
  return (
    <form onSubmit={submit} style={{borderRadius:20,padding:'clamp(20px,3vw,36px)',border:'1px solid rgba(255,255,255,0.06)',background:'rgba(255,255,255,0.02)'}}>
      <div className="grid md:grid-cols-2 gap-5" style={{marginBottom:20}}>
        {[['name','Name','Your name','text'],['email','Email','you@company.com','email']].map(([f,l,ph,t])=>(
          <div key={f}>
            <label style={{fontSize:9,textTransform:'uppercase',letterSpacing:'0.18em',color:'rgba(255,255,255,0.3)'}}>{l}</label>
            <input required type={t} value={form[f]} onChange={update(f)} style={inp} placeholder={ph}
              onFocus={e=>e.target.style.borderBottomColor='#60a5fa'}
              onBlur={e=>e.target.style.borderBottomColor='rgba(255,255,255,0.1)'}/>
          </div>
        ))}
      </div>
      <div style={{marginBottom:20}}>
        <label style={{fontSize:9,textTransform:'uppercase',letterSpacing:'0.18em',color:'rgba(255,255,255,0.3)'}}>Project Details</label>
        <textarea required rows={4} value={form.details} onChange={update('details')} style={{...inp,resize:'none'}} placeholder="Tell us about your project…"
          onFocus={e=>e.target.style.borderBottomColor='#60a5fa'}
          onBlur={e=>e.target.style.borderBottomColor='rgba(255,255,255,0.1)'}/>
      </div>
      {error && <p style={{fontSize:12,color:'#f87171',marginBottom:14}}>{error}</p>}
      <button type="submit" disabled={loading} style={{display:'inline-flex',alignItems:'center',gap:7,borderRadius:100,padding:'12px 24px',fontWeight:600,fontSize:13,background:'linear-gradient(135deg,#2563eb,#0891b2)',color:'#fff',border:'none',cursor:loading?'wait':'pointer',boxShadow:'0 4px 24px rgba(59,130,246,.28)',transition:'all 0.45s cubic-bezier(0.22,1,0.36,1)',opacity:loading?0.55:1}}>
        {loading?'Sending…':'Send Message'}{!loading&&<ArrowUpRight className="h-4 w-4"/>}
      </button>
      <p style={{marginTop:12,fontSize:10,color:'rgba(255,255,255,0.18)'}}>Or email us at <a href="mailto:standoutdevsolutions@gmail.com" style={{color:'rgba(96,165,250,0.45)'}}>standoutdevsolutions@gmail.com</a></p>
    </form>
  );
}

/* ============================================
   SHIMMER TEXT
============================================ */
const ShimmerText = memo(function ShimmerText({ children }) {
  return (
    <span style={{position:'relative',display:'inline-block'}}>
      <span style={{position:'relative',zIndex:1}}>{children}</span>
      <motion.span
        style={{position:'absolute',inset:0,zIndex:2,backgroundImage:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.4) 50%,transparent 100%)',backgroundSize:'200% 100%',WebkitBackgroundClip:'text',backgroundClip:'text',WebkitTextFillColor:'transparent',pointerEvents:'none'}}
        animate={{backgroundPosition:['200% 0','-200% 0']}}
        transition={{duration:4,repeat:Infinity,ease:'linear'}}
        aria-hidden
      >{children}</motion.span>
    </span>
  );
});

/* ============================================
   PAGE
============================================ */
export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [faqOpen, setFaqOpen]           = useState(0);
  const filteredWork = activeFilter==='All'
    ? portfolioWork
    : portfolioWork.filter(w => w.filters.includes(activeFilter));

  return (
    <>
      <style jsx global>{`
        *,*::before,*::after{box-sizing:border-box}
        html{scroll-behavior:smooth}
        @keyframes soft-pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
        @keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes logo-float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-18px) rotate(1deg)}}
        .pg-section{position:relative;overflow:hidden}
        .pg-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
        .pg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(148,163,184,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.025) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 20%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at center,black 20%,transparent 70%)}
        .pg-tag{font-size:.65rem;padding:2px 9px;border-radius:100px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.45)}
        .pg-card{border-radius:16px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);transition:all .5s cubic-bezier(0.22,1,0.36,1)}
        .pg-card:hover{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.1);transform:translateY(-2px)}
        :focus-visible{outline:2px solid #60a5fa;outline-offset:2px}
        .testimonial-card-hover:hover{border-color:rgba(255,255,255,0.12)!important;transform:translateY(-3px);box-shadow:0 14px 44px rgba(0,0,0,0.28)}
      `}</style>

      <Hero />

      {/* ══════════ LOGO / IDENTITY ══════════ */}
      <section className="pg-section" style={{ background:BG, padding:'clamp(56px,7vw,112px) 0' }}>
        <div className="pg-grid" />
        <div className="pg-orb" style={{top:'-15%',left:'-10%',width:500,height:500,background:'radial-gradient(circle,rgba(37,99,235,.12) 0%,transparent 70%)'}} />
        <div className="pg-orb" style={{bottom:'-15%',right:'-10%',width:400,height:400,background:'radial-gradient(circle,rgba(6,182,212,.1) 0%,transparent 70%)'}} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8,ease:E}} className="mb-5">
                <span style={{display:'inline-flex',alignItems:'center',gap:10,padding:'7px 16px 7px 7px',borderRadius:100,background:'rgba(255,255,255,.03)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,.06)'}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'#06b6d4',boxShadow:'0 0 8px rgba(6,182,212,.7)',animation:'soft-pulse 2.5s ease-in-out infinite'}} />
                  <span style={{fontSize:10,fontWeight:700,color:'#60a5fa',letterSpacing:'.12em',textTransform:'uppercase'}}>Our Identity</span>
                </span>
              </motion.div>
              <motion.h2 initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9,delay:0.1,ease:E}} style={HD} className="mb-5">
                <span style={wT}>We Build </span><span style={gT}>Products</span><br/>
                <span style={wT}>That </span><ShimmerText><span style={gT}>Stand Out.</span></ShimmerText>
              </motion.h2>
              <motion.p initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.2,ease:E}} style={{...BD,maxWidth:520,marginBottom:28}}>
                Every project we ship carries this mark — a promise that craft, precision, and ambition will be present in every pixel.
              </motion.p>
              <motion.ul initial="hidden" whileInView="visible" viewport={{once:true}} variants={{hidden:{},visible:{transition:{staggerChildren:0.08,delayChildren:0.3}}}} className="space-y-2.5 mb-8">
                {[{label:'Bold',desc:'Confidence baked into every pixel'},{label:'Modular',desc:'Systems that scale with your brand'},{label:'Timeless',desc:'Designed to last across decades'}].map(item=>(
                  <motion.li key={item.label} variants={{hidden:{opacity:0,x:-15},visible:{opacity:1,x:0,transition:{duration:0.6,ease:E}}}} className="flex items-start gap-3 group">
                    <div style={{marginTop:6,height:6,width:6,borderRadius:'50%',background:'#06b6d4',boxShadow:'0 0 10px rgba(6,182,212,0.8)',transition:'transform 0.5s cubic-bezier(0.22,1,0.36,1)',flexShrink:0}} className="group-hover:scale-150"/>
                    <div><span style={{fontSize:16,fontWeight:700,color:'rgba(255,255,255,0.9)',marginRight:7}}>{item.label}.</span><span style={{color:'rgba(255,255,255,0.5)',fontSize:14}}>{item.desc}</span></div>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.6,ease:E}}>
                <Link href="/about" style={{display:'inline-flex',alignItems:'center',gap:7,borderRadius:100,padding:'11px 22px',fontWeight:600,fontSize:13,background:'rgba(255,255,255,0.04)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.85)',transition:'all 0.5s cubic-bezier(0.22,1,0.36,1)',textDecoration:'none'}} className="hover:bg-white/[0.08] hover:border-white/[0.18]">
                  Learn Our Story <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div initial={{opacity:0,scale:0.88}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:1.2,ease:E}} className="relative order-1 lg:order-2 flex items-center justify-center" style={{height:'clamp(320px,48vw,540px)'}}>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div style={{width:'min(460px,72%)',height:'min(460px,72%)',borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.26) 0%,rgba(6,182,212,0.12) 40%,transparent 70%)',filter:'blur(60px)',animation:'soft-pulse 5s ease-in-out infinite'}}/></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div style={{width:380,height:380,borderRadius:'50%',border:'1px solid rgba(96,165,250,0.1)',animation:'orbit 60s linear infinite',position:'relative'}}><div style={{position:'absolute',top:-4,left:'50%',marginLeft:-4,height:8,width:8,borderRadius:'50%',background:'#60a5fa',boxShadow:'0 0 14px rgba(96,165,250,0.9)'}}/></div></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div style={{width:270,height:270,borderRadius:'50%',border:'1px solid rgba(6,182,212,0.08)',animation:'orbit 40s linear infinite reverse',position:'relative'}}><div style={{position:'absolute',bottom:-3,left:'50%',marginLeft:-3,height:6,width:6,borderRadius:'50%',background:'#06b6d4',boxShadow:'0 0 10px rgba(6,182,212,0.9)'}}/></div></div>
              <div style={{position:'relative',zIndex:10,width:'clamp(140px,20vw,240px)',height:'clamp(140px,20vw,240px)',animation:'logo-float 6s ease-in-out infinite',filter:'drop-shadow(0 0 36px rgba(59,130,246,0.5)) drop-shadow(0 0 70px rgba(6,182,212,0.22))'}}>
                <Image src="/logo1.png" alt="StandoutDev Logo" fill style={{objectFit:'contain'}} priority />
              </div>
              <div className="absolute pointer-events-none" style={{bottom:'clamp(20px,4vw,48px)',left:0,right:0,display:'flex',justifyContent:'center'}}>
                <div style={{position:'relative'}}>
                  <div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',top:-20,height:100,width:180,borderRadius:'50%',background:'rgba(96,165,250,0.28)',filter:'blur(44px)'}}/>
                  <div style={{height:5,width:'clamp(200px,28vw,320px)',borderRadius:100,border:'2px solid rgba(96,165,250,0.26)',boxShadow:'0 0 22px rgba(96,165,250,0.28)',animation:'soft-pulse 3s ease-in-out infinite'}}/>
                  <div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',top:10,height:3,width:52,borderRadius:100,background:'#fff',boxShadow:'0 0 16px rgba(255,255,255,0.9), 0 0 30px rgba(6,182,212,0.7)',animation:'soft-pulse 2s ease-in-out infinite'}}/>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <section style={{position:'relative',padding:'44px 0',borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)',background:BGA,overflow:'hidden'}}>
        <p style={{textAlign:'center',...LBL,marginBottom:20}}>Trusted by teams shipping the future</p>
        {[clientLogos,clientLogos2].map((row,ri)=>(
          <div key={ri} style={{overflow:'hidden',marginBottom:ri===0?10:0}}>
            <div className={ri===0?'marquee-track':'marquee-track-reverse'} style={{gap:56,paddingRight:56}}>
              {[...row,...row].map((l,j)=><span key={j} style={{fontSize:'clamp(1rem,2vw,1.4rem)',fontWeight:600,color:'rgba(255,255,255,0.1)',whiteSpace:'nowrap',transition:'color 0.45s ease'}} className="hover:text-white/40">{l}</span>)}
            </div>
          </div>
        ))}
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section className="pg-section" style={{background:BG,padding:'clamp(64px,8vw,112px) 0'}}>
        <div className="pg-orb" style={{top:120,right:'-10%',width:480,height:480,background:'radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)'}} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-12">
            <div className="md:col-span-7">
              <p style={LBL}>What we do</p>
              <h2 style={HD}><span style={wT}>Everything you need,</span><br/><span style={gT}>all in one studio.</span></h2>
            </div>
            <p className="md:col-span-5" style={BD}>From strategy to launch — we design and build brands, websites, apps, and SaaS platforms that stand out.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s,i)=>{ const Icon=s.icon; return(
              <motion.div key={s.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:0.6,delay:i*0.04,ease:E}} className="pg-card group relative overflow-hidden p-6">
                <Icon className="h-5 w-5 mb-4" style={{color:'#60a5fa'}} />
                <h3 style={{fontSize:16,fontWeight:700,marginBottom:6}}>{s.title}</h3>
                <div className="flex flex-wrap gap-1 mb-2.5">{s.tags.map(t=><span key={t} className="pg-tag">{t}</span>)}</div>
                <p style={{color:'rgba(255,255,255,0.4)',lineHeight:1.55,fontSize:12}}>{s.desc}</p>
                <ArrowUpRight className="absolute right-4 top-4 h-3.5 w-3.5" style={{color:'rgba(255,255,255,0.1)'}} />
              </motion.div>
            );})}
          </div>
        </div>
      </section>

      {/* ══════════ PORTFOLIO — GRID LAYOUT ══════════ */}
      <section style={{
        position:'relative',
        padding:'clamp(64px,8vw,112px) 0',
        background:BGA,
        borderTop:'1px solid rgba(255,255,255,0.04)',
        borderBottom:'1px solid rgba(255,255,255,0.04)',
        overflow:'hidden',
      }}>
        <div className="pg-orb" style={{top:'5%',right:'-12%',width:560,height:560,background:'radial-gradient(circle,rgba(99,102,241,.05) 0%,transparent 70%)'}} />
        <div className="pg-orb" style={{bottom:'8%',left:'-10%',width:440,height:440,background:'radial-gradient(circle,rgba(6,182,212,.04) 0%,transparent 70%)'}} />
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(148,163,184,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.018) 1px,transparent 1px)',backgroundSize:'80px 80px',maskImage:'radial-gradient(ellipse at center,black 20%,transparent 80%)',WebkitMaskImage:'radial-gradient(ellipse at center,black 20%,transparent 80%)',pointerEvents:'none'}} />

        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'clamp(28px,4vw,48px)',flexWrap:'wrap',gap:20}}>
            <div>
              <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,ease:E}} style={LBL}>Selected work</motion.p>
              <motion.h2 initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.1,ease:E}} style={HD}>
                <span style={wT}>Work we&apos;re </span><ShimmerText><span style={gT}>proud of.</span></ShimmerText>
              </motion.h2>
              <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.2,ease:E}} style={{...BD,marginTop:10,maxWidth:440,fontSize:13}}>
                Each project is a partnership — here&apos;s what happens when ambition meets execution.
              </motion.p>
            </div>
            <motion.div initial={{opacity:0,x:15}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.3,ease:E}}>
              <Link href="/work" style={{display:'inline-flex',alignItems:'center',gap:7,fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.5)',textDecoration:'none',padding:'10px 18px',borderRadius:100,border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)',transition:'all 0.4s ease'}} className="hover:text-white hover:border-white/14 hover:bg-white/[0.05]">
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.2,ease:E}}
            style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:'clamp(28px,4vw,44px)',padding:'5px',borderRadius:100,background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)',width:'fit-content'}}>
            {portfolioFilters.map(f=>(
              <button key={f} onClick={()=>setActiveFilter(f)} style={{
                borderRadius:100,padding:'7px 16px',fontSize:11,fontWeight:600,cursor:'pointer',
                transition:'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                ...(activeFilter===f
                  ?{background:'linear-gradient(135deg,#2563eb,#06b6d4)',color:'#fff',border:'none',boxShadow:'0 3px 14px rgba(59,130,246,0.28)'}
                  :{background:'transparent',border:'1px solid transparent',color:'rgba(255,255,255,0.38)'}),
              }} className={activeFilter!==f?'hover:text-white/65 hover:bg-white/[0.04]':''}>
                {f}
              </button>
            ))}
          </motion.div>

          {/* ★ GRID CARDS ★ */}
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredWork.map((w, i) => (
                <GridProjectCard key={w.id} p={w} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredWork.length===0 && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-16" style={{color:'rgba(255,255,255,0.28)'}}>
              <Layers className="h-10 w-10 mx-auto mb-3" style={{opacity:0.28}} />
              <p style={{fontSize:18,fontWeight:700}}>No projects in this category yet.</p>
              <p style={{marginTop:6,fontSize:13}}>Try selecting a different filter.</p>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:E}}
            style={{textAlign:'center',marginTop:'clamp(28px,4vw,48px)',padding:'clamp(24px,4vw,44px)',borderRadius:20,border:'1px solid rgba(255,255,255,0.05)',background:'linear-gradient(135deg,rgba(59,130,246,0.04) 0%,rgba(6,182,212,0.02) 100%)'}}>
            <p style={{fontSize:'clamp(1rem,1.8vw,1.3rem)',fontWeight:700,color:'rgba(255,255,255,0.85)',marginBottom:6}}>Have a project in mind?</p>
            <p style={{...BD,marginBottom:20,maxWidth:380,marginLeft:'auto',marginRight:'auto',fontSize:13}}>Let&apos;s build something that stands out together.</p>
            <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:7,borderRadius:100,padding:'12px 24px',fontWeight:600,fontSize:13,background:'linear-gradient(135deg,#2563eb,#0891b2)',color:'#fff',textDecoration:'none',boxShadow:'0 4px 20px rgba(59,130,246,0.28)',transition:'all 0.4s cubic-bezier(0.22,1,0.36,1)'}}>
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="pg-section" style={{background:BG,padding:'clamp(64px,8vw,112px) 0'}}>
        <div className="pg-orb" style={{top:60,left:'-10%',width:380,height:380,background:'radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)'}} />
        <div className="pg-orb" style={{bottom:60,right:'-8%',width:320,height:320,background:'radial-gradient(circle,rgba(139,92,246,.08) 0%,transparent 70%)'}} />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p style={LBL}>Kind words</p>
            <h2 style={{...HD,maxWidth:640,margin:'0 auto'}}><span style={wT}>Real results from </span><span style={gT}>real clients.</span></h2>
            <div className="flex items-center justify-center gap-2 mt-5">
              {[...Array(5)].map((_,i)=><Star key={i} className="h-4 w-4" style={{fill:'#60a5fa',color:'#60a5fa'}} />)}
              <span style={{marginLeft:6,color:'rgba(255,255,255,0.38)',fontSize:13}}>4.9 / 5 average</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t,i)=><TestimonialCard key={t.n} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section style={{position:'relative',padding:'clamp(64px,8vw,112px) 0',borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)',background:`linear-gradient(to bottom,${BGA},${BG})`,overflow:'hidden'}}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p style={LBL}>By the numbers</p>
            <h2 style={{...HD,maxWidth:860,margin:'0 auto'}}><span style={wT}>Why brands choose StandoutDev for </span><span style={gT}>design &amp; development</span><span style={wT}>?</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {stats.map((s,i)=>(
              <motion.div key={s.label} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.05,ease:E}} className="pg-card text-center p-6">
                <div style={{fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:900,...gT}}><CountUp end={s.value} suffix={s.suffix} prefix={s.prefix}/></div>
                <div style={{marginTop:6,fontSize:12,color:'rgba(255,255,255,0.36)'}}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section className="pg-section" style={{background:BG,padding:'clamp(64px,8vw,112px) 0'}}>
        <div className="pg-orb" style={{bottom:60,right:'-10%',width:380,height:380,background:'radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 70%)'}} />
        <div className="pg-orb" style={{top:100,left:'-8%',width:320,height:320,background:'radial-gradient(circle,rgba(6,182,212,.08) 0%,transparent 70%)'}} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <p style={LBL}>Our process</p>
              <h2 style={HD}><span style={wT}>How we </span><span style={gT}>get it done.</span></h2>
              <p style={{...BD,marginTop:16,maxWidth:420,fontSize:14}}>Six focused phases, zero wasted time. Every step is designed to move you from idea to live product with clarity and confidence.</p>
              <div style={{marginTop:28}}>
                <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:7,borderRadius:100,padding:'11px 22px',fontWeight:600,fontSize:13,background:'linear-gradient(135deg,#2563eb,#0891b2)',color:'#fff',textDecoration:'none',boxShadow:'0 4px 20px rgba(59,130,246,0.28)',transition:'all 0.45s cubic-bezier(0.22,1,0.36,1)'}}>
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div>{processSteps.map((step,i)=><ProcessStep key={step.n} step={step} i={i} total={processSteps.length} />)}</div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="pg-section" style={{padding:'clamp(64px,8vw,112px) 0'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 0%,#0a1a35 0%,#050d1f 40%,#020617 100%)'}} />
        <div className="pg-grid" style={{opacity:0.12}} />
        <div className="pg-orb" style={{top:30,left:'20%',width:200,height:200,background:'radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)',animation:'soft-pulse 7s ease-in-out infinite'}} />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <p style={LBL}>Let&apos;s talk</p>
          <h2 style={{...HD,lineHeight:0.98}}><span style={wT}>Consult strategy to build</span><br/><span style={gT}>a stronger product.</span></h2>
          <p style={{...BD,marginTop:22,maxWidth:480,marginLeft:'auto',marginRight:'auto',fontSize:14}}>30 minutes to understand your product, uncover the real problems, and map the path to a solution that moves the needle.</p>
          <div className="mt-8">
            <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:7,borderRadius:100,padding:'13px 26px',fontWeight:600,fontSize:13,background:'linear-gradient(135deg,#2563eb,#0891b2)',color:'#fff',boxShadow:'0 4px 24px rgba(59,130,246,.32)',transition:'all 0.45s cubic-bezier(0.22,1,0.36,1)',textDecoration:'none'}}>
              Book a Free Consultation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section style={{position:'relative',padding:'clamp(64px,8vw,112px) 0',background:BGA}}>
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <p style={LBL}>Frequently asked</p>
            <h2 style={HD}><span style={wT}>Got Questions?</span><br/><span style={gT}>Let&apos;s Clear Things Up.</span></h2>
          </div>
          <div>
            {faqs.map((f,i)=><FAQItem key={f.q} q={f.q} a={f.a} i={i} openIndex={faqOpen} setOpenIndex={setFaqOpen} />)}
            <div style={{borderTop:'1px solid rgba(255,255,255,0.07)'}}/>
          </div>
          <div className="mt-8 text-center">
            <Link href="/faq" style={{display:'inline-flex',alignItems:'center',gap:7,borderRadius:100,padding:'10px 20px',fontSize:12,fontWeight:600,border:'1px solid rgba(255,255,255,0.09)',background:'transparent',color:'rgba(255,255,255,0.65)',textDecoration:'none',transition:'all 0.4s cubic-bezier(0.22,1,0.36,1)'}} className="hover:bg-white/[0.04]">
              See All FAQs <ArrowUpRight className="h-3.5 w-3.5"/>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" style={{position:'relative',padding:'clamp(64px,8vw,112px) 0',background:BG,overflow:'hidden'}}>
        <div className="pg-orb" style={{top:'-20%',right:'-10%',width:380,height:380,background:'radial-gradient(circle,rgba(37,99,235,.1) 0%,transparent 70%)'}} />
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-10">
            <p style={LBL}>Start your project</p>
            <h2 style={HD}><span style={wT}>Let&apos;s Talk About</span><br/><span style={gT}>Your Project.</span></h2>
            <p style={{...BD,marginTop:12,maxWidth:480,marginLeft:'auto',marginRight:'auto',fontSize:13}}>Tell us what you&apos;re building — we&apos;ll get back within one business day.</p>
          </div>
          <ContactFormEmbed />
        </div>
      </section>
    </>
  );
}