// components/sections/Hero.jsx
'use client';

import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';

const E = [0.22, 1, 0.36, 1];

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const spring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const contentOp = useTransform(spring, [0, 0.5], [1, 0]);
  const contentY = useTransform(spring, [0, 0.8], [0, 60]);

  const scrollTo = useCallback((href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section ref={containerRef} className="hero-root">
      <style>{`
        .hero-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #020617;
          overflow: hidden;
        }

        /* Simple gradient bg */
        .hero-bg-grad {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(6,182,212,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 20% 80%, rgba(99,102,241,0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Subtle grid */
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
          pointer-events: none;
        }

        /* Content */
        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 860px;
          padding: 140px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px 6px 6px;
          border-radius: 100px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 28px;
          cursor: default;
          transition: border-color 0.4s ease;
        }
        .hero-badge:hover {
          border-color: rgba(255,255,255,0.12);
        }
        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 8px rgba(34,211,238,0.6);
          flex-shrink: 0;
          animation: badge-pulse 2.5s ease-in-out infinite;
        }
        @keyframes badge-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero-badge-text {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.02em;
        }

        /* Title */
        .hero-h1 {
          font-size: clamp(2.8rem, 8vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin: 0 0 20px;
        }
        .hero-h1-white {
          background: linear-gradient(180deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-h1-grad {
          background: linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #818cf8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Subtitle */
        .hero-sub {
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          color: rgba(255,255,255,0.42);
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto 36px;
        }
        .hero-sub strong {
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }

        /* CTA row */
        .hero-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 56px;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          background: linear-gradient(135deg, #2563eb, #0891b2);
          color: #fff;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(37,99,235,0.3);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          white-space: nowrap;
        }
        .hero-btn-primary:hover {
          box-shadow: 0 8px 36px rgba(37,99,235,0.45);
          transform: translateY(-2px);
        }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.65);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          white-space: nowrap;
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.16);
          color: #fff;
          transform: translateY(-1px);
        }

        /* Stats strip */
        .hero-stats-strip {
          display: flex;
          align-items: center;
          gap: clamp(20px, 4vw, 48px);
        }
        .hero-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }
        .hero-stat-val {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #e0f2fe, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .hero-stat-lbl {
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .hero-stat-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          flex-shrink: 0;
        }

        /* Scroll cue */
        .hero-scroll-cue {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 5;
        }
        .hero-scroll-label {
          font-size: 9px;
          font-weight: 600;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .hero-scroll-bar {
          width: 1px;
          height: 36px;
          background: linear-gradient(180deg, rgba(255,255,255,0.15), transparent);
          position: relative;
          overflow: hidden;
        }
        @keyframes scroll-pip {
          0%   { top: -6px; opacity: 0; }
          30%  { opacity: 1; }
          100% { top: 36px; opacity: 0; }
        }
        .hero-scroll-bar::after {
          content: '';
          position: absolute;
          left: -1px;
          width: 3px;
          height: 6px;
          background: #60a5fa;
          border-radius: 100px;
          box-shadow: 0 0 6px #60a5fa;
          animation: scroll-pip 2.4s cubic-bezier(0.4,0,0.2,1) infinite;
        }

        /* Trusted row */
        .hero-trusted {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .hero-trusted-label {
          font-size: 10px;
          font-weight: 600;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hero-trusted-logos {
          display: flex;
          align-items: center;
          gap: clamp(20px, 4vw, 40px);
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-trusted-name {
          font-size: clamp(12px, 1.3vw, 15px);
          font-weight: 600;
          color: rgba(255,255,255,0.1);
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        .hero-trusted-name:hover {
          color: rgba(255,255,255,0.3);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-inner {
            padding: 120px 20px 60px;
          }
          .hero-cta-row {
            margin-bottom: 40px;
          }
          .hero-btn-primary,
          .hero-btn-ghost {
            padding: 12px 20px;
            font-size: 13px;
          }
          .hero-scroll-cue {
            display: none;
          }
          .hero-trusted {
            margin-top: 36px;
          }
        }

        @media (max-width: 480px) {
          .hero-inner {
            padding: 100px 16px 48px;
          }
          .hero-badge {
            margin-bottom: 20px;
          }
          .hero-btn-primary,
          .hero-btn-ghost {
            padding: 11px 18px;
            font-size: 12px;
          }
          .hero-stats-strip {
            gap: 16px;
          }
        }
      `}</style>

      {/* Background — pure CSS, zero JS */}
      <div className="hero-bg-grad" />
      <div className="hero-grid-bg" />

      {/* Content */}
      <motion.div
        className="hero-inner"
        style={{ opacity: contentOp, y: contentY }}
      >
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: E }}
        >
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Design & Development Studio</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="hero-h1"
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.25, duration: 1, ease: E }}
        >
          <span className="hero-h1-white">We build products</span>
          <br />
          <span className="hero-h1-white">that </span>
          <span className="hero-h1-grad">stand out.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: E }}
        >
          We design and develop <strong>websites</strong>,{' '}
          <strong>SaaS platforms</strong>, and <strong>digital products</strong>{' '}
          for ambitious brands that refuse to blend in.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="hero-cta-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: E }}
        >
          <Link href="/contact" className="hero-btn-primary">
            <span>Start a Project</span>
            <ArrowUpRight style={{ width: 15, height: 15 }} />
          </Link>
          <Link href="/work" className="hero-btn-ghost">
            <span>View Our Work</span>
            <ArrowUpRight style={{ width: 14, height: 14 }} />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats-strip"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: E }}
        >
          {[
            { v: '15+', l: 'Projects' },
            { v: '10+', l: 'Clients' },
            { v: '4.9★', l: 'Rating' },
            { v: '95%', l: 'Satisfaction' },
          ].map((s, i, arr) => (
            <div key={s.l} style={{ display: 'contents' }}>
              <div className="hero-stat-item">
                <span className="hero-stat-val">{s.v}</span>
                <span className="hero-stat-lbl">{s.l}</span>
              </div>
              {i < arr.length - 1 && <span className="hero-stat-dot" />}
            </div>
          ))}
        </motion.div>

        {/* Trusted */}
        <motion.div
          className="hero-trusted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1, ease: E }}
        >
          <span className="hero-trusted-label">Trusted by</span>
          <div className="hero-trusted-logos">
            {['Uma Metal Craft', 'Siddhanath Physics', 'Digital Developers', 'Vercel', 'Linear'].map(name => (
              <span key={name} className="hero-trusted-name">{name}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
      >
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-bar" />
      </motion.div>
    </section>
  );
}