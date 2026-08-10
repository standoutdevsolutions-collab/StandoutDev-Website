// components/sections/Hero.jsx
'use client';

import { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import useMousePosition from '@/hooks/useMousePosition';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => null,
});

function useIsMobile(bp = 768) {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const check = () => setIs(window.innerWidth < bp);
    check();
    let timeout;
    const debounced = () => {
      clearTimeout(timeout);
      timeout = setTimeout(check, 150);
    };
    window.addEventListener('resize', debounced);
    return () => {
      window.removeEventListener('resize', debounced);
      clearTimeout(timeout);
    };
  }, [bp]);
  return is;
}

export default function Hero() {
  const { normalized } = useMousePosition();
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const smoothEase = [0.22, 1, 0.36, 1];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Single spring — drives everything scroll-related
  const spring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.0005,
  });

  const contentOp    = useTransform(spring, [0, 0.45], [1, 0]);
  const contentY     = useTransform(spring, [0, 0.8],  [0, 50]);
  const contentScale = useTransform(spring, [0, 0.6],  [1, 0.97]);

  const scrollTo = useCallback((href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section ref={containerRef} id="hero" className="hero-section">
      <style>{`
        /* ─── Reset / base ─── */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          background: #020617;
          isolation: isolate;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ─── Static background layers ─── */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 50% 0%,
            #0a1a35 0%, #050d1f 40%, #020617 100%);
        }

        /* Pure CSS orbs — no JS animation, GPU composited */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes orb-pulse-1 {
          0%, 100% { opacity: .7;  transform: scale(1);    }
          50%       { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes orb-pulse-2 {
          0%, 100% { opacity: .6;  transform: scale(1);    }
          50%       { opacity: .9;  transform: scale(1.08); }
        }
        @keyframes orb-pulse-3 {
          0%, 100% { opacity: .5;  transform: scale(1);    }
          50%       { opacity: .8;  transform: scale(1.05); }
        }
        .hero-orb-1 {
          top: -15%; left: -10%;
          width: min(700px, 80vw); height: min(700px, 80vw);
          background: radial-gradient(circle,
            rgba(37,99,235,.22) 0%,
            rgba(37,99,235,.04) 45%,
            transparent 70%);
          filter: blur(70px);
          animation: orb-pulse-1 9s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .hero-orb-2 {
          top: 20%; right: -10%;
          width: min(650px, 75vw); height: min(650px, 75vw);
          background: radial-gradient(circle,
            rgba(6,182,212,.16) 0%,
            rgba(6,182,212,.03) 45%,
            transparent 70%);
          filter: blur(70px);
          animation: orb-pulse-2 11s ease-in-out infinite;
          animation-delay: -4s;
          will-change: transform, opacity;
        }
        .hero-orb-3 {
          bottom: -20%; left: 30%;
          width: min(800px, 90vw); height: min(800px, 90vw);
          background: radial-gradient(circle,
            rgba(99,102,241,.14) 0%,
            rgba(99,102,241,.03) 45%,
            transparent 70%);
          filter: blur(70px);
          animation: orb-pulse-3 13s ease-in-out infinite;
          animation-delay: -7s;
          will-change: transform, opacity;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(148,163,184,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
        }

        /* ─── Beams (pure CSS, no Framer) ─── */
        @keyframes beam-1 {
          0%   { transform: translate(-50%, -50%) rotate(0deg);   opacity: .1; }
          50%  { transform: translate(-50%, -50%) rotate(180deg); opacity: .2; }
          100% { transform: translate(-50%, -50%) rotate(360deg); opacity: .1; }
        }
        @keyframes beam-2 {
          0%   { transform: translate(-50%, -50%) rotate(45deg);  opacity: .07; }
          50%  { transform: translate(-50%, -50%) rotate(225deg); opacity: .16; }
          100% { transform: translate(-50%, -50%) rotate(405deg); opacity: .07; }
        }
        .hero-beam {
          position: absolute;
          top: 50%; left: 50%;
          width: 200%; height: 48px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(59,130,246,.1)  30%,
            rgba(6,182,212,.14)  50%,
            rgba(59,130,246,.1)  70%,
            transparent 100%);
          filter: blur(28px);
          transform-origin: center;
          pointer-events: none;
          z-index: 0;
          will-change: transform, opacity;
        }
        .hero-beam.b1 { animation: beam-1 32s linear infinite; }
        .hero-beam.b2 { animation: beam-2 40s linear infinite; }

        /* ─── Particles ─── */
        @keyframes pfloat {
          0%,100% { transform: translate3d(0,    0,0) scale(1);   opacity: .25; }
          25%      { transform: translate3d(3px, -11px,0) scale(1.1); opacity: .6; }
          50%      { transform: translate3d(-2px,-18px,0) scale(1);   opacity: .75; }
          75%      { transform: translate3d(2px, -9px, 0) scale(.9);  opacity: .5; }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          pointer-events: none;
          z-index: 1;
          animation: pfloat 10s ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* ─── Badge ─── */
        @keyframes dot-pulse {
          0%,100% { opacity:1;  transform:scale(1);    }
          50%      { opacity:.4; transform:scale(.75);  }
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px 8px 8px;
          border-radius: 100px;
          background: rgba(255,255,255,.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,.08);
          margin-bottom: 32px;
          transition: border-color .5s ease;
        }
        .hero-badge:hover { border-color: rgba(255,255,255,.15); }
        .hero-badge-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 100px;
          background: rgba(59,130,246,.14);
          border: 1px solid rgba(59,130,246,.22);
        }
        .hero-badge-chip-text {
          font-size: 10px; font-weight: 700;
          color: #60a5fa; letter-spacing: .12em; text-transform: uppercase;
        }
        .hero-badge-text {
          font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,.52); letter-spacing: .04em;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #06b6d4;
          box-shadow: 0 0 8px rgba(6,182,212,.7);
          animation: dot-pulse 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* ─── Title ─── */
        .hero-title {
          position: relative;
          font-size: clamp(3.5rem, 12vw, 10rem);
          font-weight: 900;
          letter-spacing: -0.055em;
          line-height: .9;
          margin: 0 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 20px);
          flex-wrap: wrap;
        }
        .hero-title-word {
          background: linear-gradient(180deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-title-accent {
          background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #818cf8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 28px rgba(59,130,246,.32));
        }
        .hero-title-logo {
          display: inline-block;
          width:  clamp(80px, 12vw, 160px);
          height: clamp(80px, 12vw, 160px);
          vertical-align: middle;
          position: relative;
        }
        .hero-title-logo-glow {
          position: absolute; top:50%; left:50%;
          width:130%; height:130%;
          transform: translate(-50%,-50%);
          background: radial-gradient(circle,
            rgba(59,130,246,.4) 0%,
            rgba(6,182,212,.18) 40%,
            transparent 70%);
          filter: blur(22px);
          pointer-events: none; z-index: -1;
        }
        .hero-title-underline { position:relative; display:inline-block; }
        .hero-title-underline::after {
          content:'';
          position:absolute; left:5%; right:5%; bottom:-6px;
          height:3px; border-radius:2px;
          background: linear-gradient(90deg, transparent, #06b6d4, #3b82f6, transparent);
          filter: blur(.5px); opacity:.45;
        }

        /* ─── Sub ─── */
        .hero-sub {
          max-width: 600px;
          font-size: clamp(.95rem, 1.6vw, 1.15rem);
          color: rgba(255,255,255,.48);
          line-height: 1.75;
          margin: 0 auto 40px;
        }
        .hero-sub-highlight { color:#93c5fd; font-weight:500; }

        /* ─── Buttons ─── */
        .hero-cta {
          display: flex; gap:14px; flex-wrap:wrap;
          justify-content:center; margin-bottom:64px;
        }
        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 28px; border-radius:100px;
          font-size:14px; font-weight:600;
          background: linear-gradient(135deg, #2563eb, #0891b2);
          color:#fff; border:none; cursor:pointer;
          box-shadow: 0 4px 28px rgba(59,130,246,.32),
                      inset 0 1px 0 rgba(255,255,255,.14);
          transition: box-shadow .45s cubic-bezier(.22,1,.36,1),
                      transform   .45s cubic-bezier(.22,1,.36,1);
          white-space:nowrap; position:relative; overflow:hidden;
        }
        .btn-primary::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          opacity:0;
          transition: opacity .45s ease;
        }
        .btn-primary:hover::before { opacity:1; }
        .btn-primary:hover {
          box-shadow: 0 8px 36px rgba(59,130,246,.48),
                      inset 0 1px 0 rgba(255,255,255,.14);
          transform: translateY(-2px);
        }
        .btn-primary > * { position:relative; z-index:1; }

        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 26px; border-radius:100px;
          font-size:14px; font-weight:600;
          background: rgba(255,255,255,.04);
          backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,.1);
          color:rgba(255,255,255,.7); cursor:pointer;
          transition: background .45s cubic-bezier(.22,1,.36,1),
                      border-color .45s cubic-bezier(.22,1,.36,1),
                      color .45s cubic-bezier(.22,1,.36,1),
                      transform .45s cubic-bezier(.22,1,.36,1);
          white-space:nowrap;
        }
        .btn-ghost:hover {
          background:rgba(255,255,255,.08);
          border-color:rgba(255,255,255,.2);
          color:#fff; transform:translateY(-1px);
        }

        /* ─── Stats ─── */
        .hero-stats {
          display:flex; align-items:center;
          gap:clamp(24px,4vw,56px);
          padding:20px 36px; border-radius:100px;
          background:rgba(255,255,255,.025);
          backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border:1px solid rgba(255,255,255,.06);
          transition: border-color .5s ease;
        }
        .hero-stats:hover { border-color:rgba(255,255,255,.12); }
        .hero-stat { display:flex; flex-direction:column; align-items:center; gap:4px; }
        .hero-stat-value {
          font-size:clamp(1.25rem,2vw,1.6rem); font-weight:800;
          letter-spacing:-.02em;
          background:linear-gradient(135deg,#e0f2fe,#67e8f9);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          margin:0; line-height:1;
        }
        .hero-stat-label {
          font-size:10px; color:rgba(255,255,255,.32); font-weight:600;
          letter-spacing:.15em; text-transform:uppercase; margin:0; white-space:nowrap;
        }
        .hero-stat-divider { width:1px; height:24px; background:rgba(255,255,255,.07); }

        /* ─── Scroll indicator ─── */
        .hero-scroll {
          position:absolute; bottom:30px; left:50%;
          transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center;
          gap:8px; z-index:5;
        }
        .hero-scroll-text {
          font-size:9px; font-weight:600;
          color:rgba(255,255,255,.18); letter-spacing:.35em; text-transform:uppercase;
        }
        .hero-scroll-line {
          width:1px; height:40px;
          background:linear-gradient(180deg,rgba(255,255,255,.18),transparent);
          position:relative; overflow:hidden;
        }
        @keyframes scroll-drop {
          0%   { top:-8px; opacity:0; }
          30%  { opacity:1; }
          100% { top:40px; opacity:0; }
        }
        .hero-scroll-line::after {
          content:''; position:absolute; left:-1px;
          width:3px; height:8px;
          background:#60a5fa; border-radius:100px;
          box-shadow:0 0 8px #60a5fa;
          animation:scroll-drop 2.6s cubic-bezier(.4,0,.2,1) infinite;
        }

        /* ─── Side labels ─── */
        .hero-side-labels {
          position:absolute; top:0; bottom:0; right:20px;
          z-index:15; display:flex; flex-direction:column;
          justify-content:center; gap:32px;
        }
        .side-label {
          writing-mode:vertical-rl; text-orientation:mixed;
          font-size:10px; font-weight:500;
          letter-spacing:.35em; text-transform:uppercase;
          color:rgba(255,255,255,.18);
          transition: color .5s ease, transform .5s ease;
          text-decoration:none;
        }
        .side-label:hover { color:rgba(255,255,255,.65); transform:translateX(-2px); }

        /* ─── Content wrapper ─── */
        .hero-content {
          position:relative; z-index:10; width:100%; max-width:1280px;
          padding:120px 32px 60px;
          display:flex; flex-direction:column; align-items:center; text-align:center;
        }

        /* ─── Responsive ─── */
        @media(max-width:1024px){ .hero-content{padding:110px 24px 60px;} }
        @media(max-width:768px){
          .hero-side-labels{display:none;}
          .hero-content{padding:100px 20px 80px;}
          .hero-title{gap:6px 12px;margin-bottom:20px;}
          .hero-title-logo{width:70px;height:70px;}
          .hero-badge{margin-bottom:24px;padding:7px 14px 7px 6px;}
          .hero-badge-text{font-size:11px;}
          .hero-badge-chip-text{font-size:9px;}
          .hero-sub{margin-bottom:32px;}
          .hero-cta{margin-bottom:44px;gap:10px;}
          .btn-primary,.btn-ghost{padding:12px 22px;font-size:13px;}
          .hero-stats{
            padding:16px 24px;gap:20px;
            flex-wrap:wrap;justify-content:center;border-radius:24px;
          }
          .hero-stat-divider{display:none;}
          .hero-scroll{display:none;}
        }
        @media(max-width:480px){
          .hero-content{padding:90px 16px 60px;}
          .hero-title{gap:4px 8px;}
          .hero-title-logo{width:56px;height:56px;}
          .btn-primary,.btn-ghost{padding:11px 18px;font-size:12px;}
          .hero-stats{padding:14px 20px;gap:16px;}
        }
        @media(max-height:700px) and (min-width:769px){
          .hero-content{padding:90px 32px 40px;}
          .hero-cta{margin-bottom:32px;}
        }
      `}</style>

      {/* ── BACKGROUND (pure CSS, zero JS overhead) ── */}
      <div className="hero-bg" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid" />
      <div className="hero-beam b1" />
      <div className="hero-beam b2" />

      {/* Particles — static divs, CSS animation only */}
      {!isMobile && [
        { top:'18%', left:'12%', size:4, color:'#60a5fa', delay:0,   dur:9  },
        { top:'32%', left:'85%', size:3, color:'#06b6d4', delay:1.5, dur:11 },
        { top:'65%', left:'8%',  size:5, color:'#818cf8', delay:3,   dur:10 },
        { top:'75%', left:'88%', size:3, color:'#60a5fa', delay:4.5, dur:12 },
        { top:'22%', left:'62%', size:2, color:'#06b6d4', delay:2,   dur:8  },
        { top:'55%', left:'92%', size:4, color:'#818cf8', delay:6,   dur:13 },
      ].map((p, i) => (
        <div key={i} className="particle" style={{
          top: p.top, left: p.left,
          width: p.size, height: p.size,
          background: p.color,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
        }} />
      ))}

      {/* ── SIDE LABELS ── */}
      <div className="hero-side-labels">
        {['Twitter','Dribbble','GitHub'].map((label, i) => (
          <motion.a
            key={label}
            className="side-label"
            href="#"
            initial={{ opacity:0, x:16 }}
            animate={{ opacity:1, x:0 }}
            transition={{ delay: 1.8 + i * 0.12, duration:0.9, ease: smoothEase }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      {/* ── MAIN CONTENT — single motion.div for scroll transforms ── */}
      <motion.div
        className="hero-content"
        style={{ opacity: contentOp, y: contentY, scale: contentScale }}
      >
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity:0, y:-14, filter:'blur(8px)' }}
          animate={{ opacity:1, y:0,   filter:'blur(0px)' }}
          transition={{ delay:0.15, duration:1, ease: smoothEase }}
        >
          <span className="hero-badge-chip">
            <Sparkles style={{ width:11, height:11, color:'#60a5fa' }} />
            <span className="hero-badge-chip-text">New</span>
          </span>
          <span className="hero-badge-text">Premium Digital Agency</span>
          <span className="hero-badge-dot" />
        </motion.div>

        {/* Headline — one animation block, no nested motion.spans */}
        <motion.h1
          className="hero-title"
          initial={{ opacity:0, y:28, filter:'blur(14px)' }}
          animate={{ opacity:1, y:0,  filter:'blur(0px)'  }}
          transition={{ delay:0.35, duration:1.1, ease: smoothEase }}
        >
          <span className="hero-title-word">Standout</span>

          <span className="hero-title-logo">
            <span className="hero-title-logo-glow" />
            <Suspense fallback={null}>
              <HeroScene mouse={normalized} />
            </Suspense>
          </span>

          <span className="hero-title-accent hero-title-underline">Dev</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="hero-sub"
          initial={{ opacity:0, y:14 }}
          animate={{ opacity:1, y:0  }}
          transition={{ delay:0.65, duration:1, ease: smoothEase }}
        >
          We craft <span className="hero-sub-highlight">premium websites</span>,{' '}
          <span className="hero-sub-highlight">AI products</span> and{' '}
          <span className="hero-sub-highlight">SaaS platforms</span> engineered
          for ambitious brands that refuse to blend in.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="hero-cta"
          initial={{ opacity:0, y:14 }}
          animate={{ opacity:1, y:0  }}
          transition={{ delay:0.82, duration:1, ease: smoothEase }}
        >
          <MagneticButton className="btn-primary" onClick={() => scrollTo('#contact')}>
            <span>Start Your Project</span>
            <ArrowUpRight style={{ width:15, height:15 }} />
          </MagneticButton>
          <MagneticButton className="btn-ghost" onClick={() => scrollTo('#portfolio')}>
            <Play style={{ width:13, height:13, fill:'currentColor' }} />
            <span>Watch Showreel</span>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity:0, y:18 }}
          animate={{ opacity:1, y:0  }}
          transition={{ delay:1.0, duration:1, ease: smoothEase }}
        >
          {[
            { value:'150+', label:'Projects' },
            { value:'40+',  label:'Clients'  },
            { value:'5★',   label:'Rating'   },
            { value:'3×',   label:'Growth'   },
          ].map(({ value, label }, i, arr) => (
            <div key={label} style={{ display:'contents' }}>
              <div className="hero-stat">
                <p className="hero-stat-value">{value}</p>
                <p className="hero-stat-label">{label}</p>
              </div>
              {i < arr.length - 1 && <div className="hero-stat-divider" />}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.8, duration:1.4, ease:'easeOut' }}
      >
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}