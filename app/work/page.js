// app/work/page.jsx
'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight, ArrowLeft, X, ExternalLink,
  ChevronLeft, ChevronRight, Globe, Code, Palette,
  Smartphone, Layers, Sparkles, Monitor, Zap, Users,
  CheckCircle, Clock, Target, Award, Layout, Search,
  PenTool, Megaphone, BarChart3, Shield
} from 'lucide-react'

const smoothEase = [0.22, 1, 0.36, 1]

const projects = [
  {
    id: 'uma-metals',
    title: 'Uma Metal Craft',
    subtitle: 'Premium Metal Manufacturing',
    tag: 'Manufacturing · Website',
    cat: 'Website',
    year: '2024',
    duration: '6 Weeks',
    color: 'from-amber-500 to-orange-600',
    colorHex: '#f59e0b',
    accentLight: 'rgba(245,158,11,0.15)',
    accentBorder: 'rgba(245,158,11,0.25)',
    url: 'https://umametalcraft.com/',
    desc: 'A premium manufacturing website for Uma Metal Craft — showcasing their industrial expertise with a modern, conversion-focused design.',
    fullDesc: 'Uma Metal Craft is a leading manufacturer specializing in precision metal components, custom fabrication, and industrial solutions. They needed a digital presence that reflected the quality and precision of their metalwork while driving business inquiries from potential clients across industries.',
    challenge: 'The existing web presence was outdated and failed to communicate the company\'s manufacturing capabilities effectively. Potential clients couldn\'t easily browse products, understand capabilities, or submit inquiries. The site had high bounce rates and minimal lead generation.',
    solution: 'We designed and developed a complete website overhaul with an intuitive product catalog system, detailed capability showcases, and a streamlined inquiry flow. The site features smooth scroll animations, responsive design across all devices, and an SEO-optimized structure to improve organic discoverability.',
    keyFeatures: [
      { icon: Layout, title: 'Product Catalog', desc: 'Organized product showcase with categories, specifications, and high-quality imagery' },
      { icon: Search, title: 'SEO Optimized', desc: 'Technical SEO implementation for improved search engine rankings and organic traffic' },
      { icon: Smartphone, title: 'Fully Responsive', desc: 'Seamless experience across desktop, tablet, and mobile devices' },
      { icon: Zap, title: 'Fast Performance', desc: 'Optimized loading with lazy images, code splitting, and edge caching' },
      { icon: Target, title: 'Lead Generation', desc: 'Strategic CTAs and inquiry forms designed to convert visitors into leads' },
      { icon: Shield, title: 'Modern Stack', desc: 'Built with Next.js and Tailwind CSS for maintainability and performance' },
    ],
    services: ['Web Design', 'Frontend Development', 'UI/UX Design', 'SEO Optimization', 'Content Strategy', 'Performance Tuning'],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    results: [
      { metric: '3×', label: 'More Inquiries', desc: 'Lead generation tripled within 2 months of launch' },
      { metric: '60%', label: 'Bounce Rate Drop', desc: 'Visitors now explore an average of 4+ pages per session' },
      { metric: '2.1s', label: 'Load Time', desc: 'From 8+ seconds down to under 2.5s on mobile networks' },
      { metric: '85+', label: 'Performance Score', desc: 'Lighthouse performance score across all key pages' },
    ],
    testimonial: {
      quote: 'StandoutDev transformed our online presence completely. We now receive quality inquiries daily through the website.',
      name: 'Uma Metal Craft',
      role: 'Management Team',
    },
    thumbnail: '/uma1.png',
    screenshots: [
      '/uma1.png',
      '/uma2.png',
      '/uma3.png',
    ],
  },
  {
    id: 'siddhanath-physics',
    title: 'Siddhanath Krupa Physics',
    subtitle: 'Interactive Education Platform',
    tag: 'Education · Web App',
    cat: 'Product',
    year: '2024',
    duration: '4 Weeks',
    color: 'from-blue-500 to-indigo-600',
    colorHex: '#3b82f6',
    accentLight: 'rgba(59,130,246,0.15)',
    accentBorder: 'rgba(59,130,246,0.25)',
    url: 'https://siddhanath-physics.vercel.app/',
    desc: 'An interactive education platform for Siddhanath Krupa Physics Classes — making physics learning accessible and engaging for students.',
    fullDesc: 'Siddhanath Krupa Physics Classes is a renowned coaching institute specializing in physics education for competitive exam aspirants. They needed a modern web platform to extend their classroom experience online, reaching more students and providing resources beyond the physical classroom.',
    challenge: 'The institute relied entirely on word-of-mouth and physical presence for student enrollment. There was no digital platform for students to access course information, schedules, study materials, or contact the institute. Parents and students had difficulty finding reliable information about the classes.',
    solution: 'We built a student-first web platform that presents course information, faculty profiles, study resources, and class schedules in an engaging, easy-to-navigate format. The design prioritizes readability with a clean interface that works seamlessly for both students and parents on any device.',
    keyFeatures: [
      { icon: Users, title: 'Student Portal', desc: 'Dedicated sections for course details, schedules, and faculty information' },
      { icon: Layout, title: 'Clean Interface', desc: 'Student-friendly design with clear typography and intuitive navigation' },
      { icon: Smartphone, title: 'Mobile First', desc: 'Optimized for mobile devices where most students access the platform' },
      { icon: Zap, title: 'Instant Loading', desc: 'Sub-second page loads for seamless browsing experience' },
      { icon: Megaphone, title: 'Announcements', desc: 'Real-time updates for schedule changes, exam dates, and notices' },
      { icon: PenTool, title: 'Brand Identity', desc: 'Complete visual identity reflecting academic excellence and trust' },
    ],
    services: ['UI/UX Design', 'Web Development', 'Branding', 'Content Strategy', 'Mobile Optimization', 'Deployment'],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Responsive Design'],
    results: [
      { metric: '150+', label: 'Students Enrolled', desc: 'New enrollments driven directly through the website' },
      { metric: '95%', label: 'Satisfaction Rate', desc: 'Based on student and parent feedback surveys' },
      { metric: '<1s', label: 'Page Load', desc: 'Blazing fast performance across all pages' },
      { metric: '4.9★', label: 'User Rating', desc: 'Average rating from student feedback' },
    ],
    testimonial: {
      quote: 'The website has become an essential part of our institute. Students and parents love how easy it is to find information.',
      name: 'Siddhanath Krupa Physics',
      role: 'Institute Director',
    },
    thumbnail: '/phy1.png',
    screenshots: [
      '/phy1.png',
      '/phy2.png',
      '/phy3.png',
    ],
  },
  {
    id: 'digital-developers',
    title: 'Digital Developers',
    subtitle: 'Premium Agency Website',
    tag: 'Agency · Website',
    cat: 'Website',
    year: '2024',
    duration: '8 Weeks',
    color: 'from-violet-500 to-purple-600',
    colorHex: '#8b5cf6',
    accentLight: 'rgba(139,92,246,0.15)',
    accentBorder: 'rgba(139,92,246,0.25)',
    url: 'https://digitaldeveloperss.com/',
    desc: 'A bold agency website for Digital Developers — high-impact digital presence communicating authority, creativity, and technical excellence.',
    fullDesc: 'Digital Developers is a full-service digital agency offering web development, mobile app development, UI/UX design, and digital marketing services. They needed a website that would position them as a premium, cutting-edge agency capable of handling enterprise-level projects.',
    challenge: 'The agency lacked a website that matched their actual capabilities. They were losing potential enterprise clients to competitors with more impressive digital presences. The existing site felt generic and didn\'t differentiate them in a crowded market of development agencies.',
    solution: 'We crafted a visually striking, performance-optimized website with cinematic scroll animations, dynamic content sections, and a compelling narrative flow. The site features 3D elements, smooth page transitions, and interactive components that demonstrate the agency\'s technical prowess while converting visitors into clients.',
    keyFeatures: [
      { icon: Sparkles, title: 'Cinematic Animations', desc: 'Scroll-driven animations and micro-interactions throughout the experience' },
      { icon: Monitor, title: '3D Elements', desc: 'Three.js powered 3D visuals showcasing technical capabilities' },
      { icon: BarChart3, title: 'Case Studies', desc: 'Detailed project showcases with results and testimonials' },
      { icon: Target, title: 'Conversion Focused', desc: 'Strategic CTA placement and lead capture throughout the site' },
      { icon: Zap, title: 'Performance', desc: 'Perfect 100 Lighthouse score with optimized assets and code' },
      { icon: Award, title: 'Brand Authority', desc: 'Visual design that positions the agency as an industry leader' },
    ],
    services: ['Brand Strategy', 'Web Design', 'Full-Stack Development', 'Motion Design', '3D Integration', 'SEO & Analytics'],
    tech: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'React', 'Vercel'],
    results: [
      { metric: '5×', label: 'Lead Generation', desc: 'Five-fold increase in qualified project inquiries' },
      { metric: '40%', label: 'Conversion Rate', desc: 'Visitor-to-lead conversion rate on contact pages' },
      { metric: '100', label: 'Performance Score', desc: 'Perfect Google Lighthouse performance score' },
      { metric: '12s', label: 'Avg. Session', desc: 'Average time spent on site per visitor' },
    ],
    testimonial: {
      quote: 'Our new website has completely changed how clients perceive us. We\'re now landing enterprise projects we couldn\'t before.',
      name: 'Digital Developers',
      role: 'Founding Team',
    },
    thumbnail: '/dg.png',
    screenshots: [
      '/dg.png',
      '/dgg.png',
      '/gdd.png',
    ],
  },
]

const filters = ['All', 'Website', 'Product']

/* ============================================
   PROJECT DETAIL VIEW (Full-Page Section)
============================================ */
function ProjectDetail({ project, onClose }) {
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [imgErrors, setImgErrors] = useState({})
  const [showIframe, setShowIframe] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const detailRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.body.style.overflow = ''
  }, [])

  const handleImgError = useCallback((key) => {
    setImgErrors((p) => ({ ...p, [key]: true }))
  }, [])

  const nextShot = useCallback(() => {
    setActiveScreenshot((p) => (p + 1) % project.screenshots.length)
  }, [project.screenshots.length])

  const prevShot = useCallback(() => {
    setActiveScreenshot((p) =>
      (p - 1 + project.screenshots.length) % project.screenshots.length
    )
  }, [project.screenshots.length])

  return (
    <motion.div
      ref={detailRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: smoothEase }}
    >
      <style>{`
        .detail-page { background: #020617; min-height: 100vh; }

        /* ── Back bar ── */
        .detail-back-bar {
          position: sticky; top: 0; z-index: 50;
          padding: 16px 24px;
          background: rgba(2,6,23,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
          max-width: 100%;
        }
        .detail-back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 100px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          text-decoration: none;
        }
        .detail-back-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .detail-visit-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 100px;
          background: linear-gradient(135deg, #2563eb, #0891b2);
          color: #fff; font-size: 13px; font-weight: 600;
          text-decoration: none;
          box-shadow: 0 2px 16px rgba(59,130,246,0.3);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .detail-visit-btn:hover {
          box-shadow: 0 4px 24px rgba(59,130,246,0.45);
          transform: translateY(-1px);
        }

        /* ── Hero ── */
        .detail-hero {
          position: relative; overflow: hidden;
          padding: clamp(60px,10vw,100px) 24px clamp(60px,10vw,100px);
        }
        .detail-hero-bg {
          position: absolute; inset: 0; opacity: 0.2;
        }
        .detail-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(2,6,23,0.3) 0%, #020617 100%);
        }
        .detail-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        .detail-hero-content {
          position: relative; z-index: 2;
          max-width: 900px; margin: 0 auto;
          text-align: center;
        }
        .detail-hero-meta {
          display: inline-flex; align-items: center; gap: 12px;
          margin-bottom: 20px; font-size: 12px;
          text-transform: uppercase; letter-spacing: 0.15em;
          color: rgba(255,255,255,0.45);
        }
        .detail-hero-meta-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
        }
        .detail-hero-title {
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 0.95; margin: 0 0 12px;
          background: linear-gradient(180deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .detail-hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 500; margin: 0 0 32px;
          background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #818cf8 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .detail-hero-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center;
        }
        .detail-hero-tag {
          font-size: 12px; padding: 6px 16px; border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.55);
        }

        /* ── Sections shared ── */
        .detail-section {
          max-width: 1120px; margin: 0 auto;
          padding: clamp(48px,8vw,80px) 24px;
        }
        .detail-section + .detail-section {
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .detail-section-label {
          font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.3em; font-weight: 600;
          color: rgba(96,165,250,0.8); margin-bottom: 20px;
          display: flex; align-items: center; gap: 8px;
        }
        .detail-section-label-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #06b6d4;
          box-shadow: 0 0 8px rgba(6,182,212,0.7);
        }
        .detail-section-title {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 800; letter-spacing: -0.02em;
          line-height: 1.1; margin: 0 0 24px;
        }
        .detail-section-title .white {
          background: linear-gradient(180deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .detail-section-title .grad {
          background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #818cf8 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .detail-body-text {
          color: rgba(255,255,255,0.5);
          line-height: 1.8; font-size: clamp(0.95rem,1.3vw,1.05rem);
          max-width: 720px;
        }

        /* ── Screenshot gallery ── */
        .detail-gallery { padding: 0 24px clamp(40px,6vw,64px); }
        .detail-gallery-inner {
          max-width: 1120px; margin: 0 auto;
        }
        .detail-gallery-main {
          position: relative; border-radius: 20px;
          overflow: hidden; border: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 12px; background: #050d1f;
        }
        .detail-gallery-aspect {
          position: relative; width: 100%;
          aspect-ratio: 16/9.5;
        }
        .detail-gallery-img {
          object-fit: cover; object-position: top center;
        }
        .detail-gallery-fallback {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          opacity: 0.5;
        }
        .detail-gallery-fallback p {
          margin-top: 12px; font-size: 18px;
          font-weight: 700; color: rgba(255,255,255,0.6);
        }
        .detail-gallery-fallback span {
          font-size: 13px; color: rgba(255,255,255,0.35);
          margin-top: 4px;
        }

        .detail-gal-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 5; width: 44px; height: 44px; border-radius: 50%;
          background: rgba(0,0,0,0.55); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.35s ease;
        }
        .detail-gal-nav:hover { background: rgba(255,255,255,0.12); }
        .detail-gal-nav.prev { left: 16px; }
        .detail-gal-nav.next { right: 16px; }

        .detail-gal-dots {
          position: absolute; bottom: 16px; left: 50%;
          transform: translateX(-50%); display: flex; gap: 8px; z-index: 5;
        }
        .detail-gal-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(255,255,255,0.2); border: none;
          cursor: pointer; padding: 0;
          transition: all 0.35s ease;
        }
        .detail-gal-dot.active {
          background: #60a5fa; width: 28px; border-radius: 100px;
          box-shadow: 0 0 12px rgba(96,165,250,0.6);
        }

        .detail-thumbstrip {
          display: flex; gap: 10px;
        }
        .detail-thumb {
          position: relative; flex: 1; aspect-ratio: 16/10;
          border-radius: 12px; overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer; padding: 0; background: #050d1f;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .detail-thumb.active {
          border-color: #60a5fa;
          box-shadow: 0 0 14px rgba(96,165,250,0.3);
        }
        .detail-thumb:not(.active):hover {
          border-color: rgba(255,255,255,0.15);
        }
        .detail-thumb-img {
          object-fit: cover; object-position: top center;
        }
        .detail-thumb-fallback {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0.35;
        }

        /* ── Overview grid ── */
        .detail-overview-grid {
          display: grid; gap: 24px;
          grid-template-columns: 1fr;
        }
        @media(min-width:768px){
          .detail-overview-grid { grid-template-columns: 1fr 1fr; }
        }
        .detail-overview-card {
          padding: clamp(24px,3vw,32px);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .detail-overview-card h4 {
          font-size: 13px; text-transform: uppercase;
          letter-spacing: 0.15em; font-weight: 600;
          color: rgba(96,165,250,0.8); margin: 0 0 14px;
        }
        .detail-overview-card p {
          color: rgba(255,255,255,0.5);
          line-height: 1.75; font-size: 15px; margin: 0;
        }

        /* ── Features grid ── */
        .detail-features-grid {
          display: grid; gap: 16px;
          grid-template-columns: 1fr;
        }
        @media(min-width:640px){
          .detail-features-grid { grid-template-columns: 1fr 1fr; }
        }
        @media(min-width:1024px){
          .detail-features-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        .detail-feature-card {
          padding: 28px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .detail-feature-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
        .detail-feature-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .detail-feature-card:hover .detail-feature-icon {
          transform: scale(1.1);
        }
        .detail-feature-card h3 {
          font-size: 16px; font-weight: 700;
          margin: 0 0 8px; color: rgba(255,255,255,0.9);
        }
        .detail-feature-card p {
          font-size: 14px; color: rgba(255,255,255,0.45);
          line-height: 1.6; margin: 0;
        }

        /* ── Results ── */
        .detail-results-grid {
          display: grid; gap: 16px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media(min-width:768px){
          .detail-results-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .detail-result-card {
          padding: 28px 20px; border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          text-align: center;
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .detail-result-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
        .detail-result-value {
          font-size: clamp(1.75rem,3.5vw,2.5rem);
          font-weight: 900; line-height: 1;
          background: linear-gradient(135deg, #60a5fa, #06b6d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 6px;
        }
        .detail-result-label {
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.7); margin-bottom: 6px;
        }
        .detail-result-desc {
          font-size: 12px; color: rgba(255,255,255,0.35);
          line-height: 1.5;
        }

        /* ── Tech + Services ── */
        .detail-pills {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .detail-pill {
          font-size: 13px; padding: 8px 18px; border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          transition: all 0.3s ease;
        }
        .detail-pill.tech {
          background: rgba(59,130,246,0.08);
          border-color: rgba(59,130,246,0.15);
          color: #93c5fd;
        }

        /* ── Testimonial ── */
        .detail-testimonial {
          padding: clamp(32px,5vw,48px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          position: relative; overflow: hidden;
        }
        .detail-testimonial-glow {
          position: absolute; top: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          filter: blur(80px); opacity: 0.15; pointer-events: none;
        }
        .detail-testimonial-quote {
          font-size: clamp(1.1rem,2vw,1.35rem);
          font-weight: 500; font-style: italic;
          line-height: 1.6; color: rgba(255,255,255,0.8);
          margin: 0 0 24px; position: relative; z-index: 1;
        }
        .detail-testimonial-author {
          display: flex; align-items: center; gap: 12px;
          position: relative; z-index: 1;
        }
        .detail-testimonial-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 16px; color: #020617;
        }
        .detail-testimonial-name {
          font-weight: 700; font-size: 15px;
          color: rgba(255,255,255,0.9);
        }
        .detail-testimonial-role {
          font-size: 13px; color: rgba(255,255,255,0.4);
        }

        /* ── Live Preview ── */
        .detail-preview-container {
          border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: #050d1f;
        }
        .detail-preview-bar {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: rgba(0,0,0,0.4);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .detail-preview-dots { display: flex; gap: 5px; }
        .detail-preview-dots span {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .detail-preview-url {
          flex: 1; display: flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .detail-preview-url-text {
          font-size: 12px; color: rgba(255,255,255,0.35);
          font-family: monospace;
        }
        .detail-preview-iframe-wrap {
          position: relative; width: 100%;
          height: clamp(400px,50vw,700px);
          background: #fff;
        }
        .detail-preview-iframe {
          width: 100%; height: 100%; border: none;
        }
        .detail-preview-loader {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: #050d1f; gap: 16px;
        }
        @keyframes preview-spin {
          to { transform: rotate(360deg); }
        }
        .detail-preview-spinner {
          width: 32px; height: 32px; border-radius: 50%;
          border: 3px solid rgba(96,165,250,0.2);
          border-top-color: #60a5fa;
          animation: preview-spin 0.8s linear infinite;
        }
        .detail-preview-toggle {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 100px;
          font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        /* ── CTA bottom ── */
        .detail-bottom-cta {
          text-align: center;
          padding: clamp(60px,10vw,100px) 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .detail-bottom-cta h3 {
          font-size: clamp(1.75rem,4vw,2.5rem);
          font-weight: 800; margin: 0 0 12px;
        }
        .detail-bottom-cta p {
          color: rgba(255,255,255,0.4);
          font-size: clamp(0.95rem,1.3vw,1.05rem);
          margin: 0 0 28px;
        }
        .detail-bottom-cta-actions {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
        }
      `}</style>

      <div className="detail-page">
        {/* ── Sticky back bar ── */}
        <div className="detail-back-bar">
          <button className="detail-back-btn" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
            Back to Work
          </button>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="detail-visit-btn">
            <Globe className="h-3.5 w-3.5" />
            Visit Site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* ── Hero ── */}
        <div className="detail-hero">
          <div className={`detail-hero-bg bg-gradient-to-br ${project.color}`} />
          <div className="detail-hero-overlay" />
          <div className="detail-hero-grid" />
          <div className="detail-hero-content">
            <motion.div className="detail-hero-meta"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: smoothEase }}>
              <span>{project.tag}</span>
              <span className="detail-hero-meta-dot" />
              <span>{project.year}</span>
              <span className="detail-hero-meta-dot" />
              <span>{project.duration}</span>
            </motion.div>
            <motion.h1 className="detail-hero-title"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.1, duration: 0.9, ease: smoothEase }}>
              {project.title}
            </motion.h1>
            <motion.p className="detail-hero-subtitle"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: smoothEase }}>
              {project.subtitle}
            </motion.p>
            <motion.div className="detail-hero-tags"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: smoothEase }}>
              {project.services.map((s) => (
                <span key={s} className="detail-hero-tag">{s}</span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Screenshot Gallery ── */}
        <motion.div className="detail-gallery"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: smoothEase }}>
          <div className="detail-gallery-inner">
            <div className="detail-gallery-main">
              <div className="detail-gallery-aspect">
                {imgErrors[`shot-${activeScreenshot}`] ? (
                  <div className={`detail-gallery-fallback bg-gradient-to-br ${project.color}`}>
                    <Layers className="h-14 w-14" style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <p>{project.title}</p>
                    <span>Screenshot {activeScreenshot + 1}</span>
                  </div>
                ) : (
                  <Image
                    src={project.screenshots[activeScreenshot]}
                    alt={`${project.title} — Screenshot ${activeScreenshot + 1}`}
                    fill className="detail-gallery-img"
                    onError={() => handleImgError(`shot-${activeScreenshot}`)}
                    priority
                  />
                )}
              </div>
              {project.screenshots.length > 1 && (
                <>
                  <button className="detail-gal-nav prev" onClick={prevShot}>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button className="detail-gal-nav next" onClick={nextShot}>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="detail-gal-dots">
                {project.screenshots.map((_, i) => (
                  <button key={i}
                    className={`detail-gal-dot ${i === activeScreenshot ? 'active' : ''}`}
                    onClick={() => setActiveScreenshot(i)} />
                ))}
              </div>
            </div>
            <div className="detail-thumbstrip">
              {project.screenshots.map((src, i) => (
                <button key={i}
                  className={`detail-thumb ${i === activeScreenshot ? 'active' : ''}`}
                  onClick={() => setActiveScreenshot(i)}>
                  {imgErrors[`thumb-${i}`] ? (
                    <div className={`detail-thumb-fallback bg-gradient-to-br ${project.color}`}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>{i + 1}</span>
                    </div>
                  ) : (
                    <Image src={src} alt={`Thumb ${i + 1}`} fill
                      className="detail-thumb-img"
                      onError={() => handleImgError(`thumb-${i}`)} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Overview ── */}
        <motion.div className="detail-section"
          initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: smoothEase }}>
          <div className="detail-section-label">
            <span className="detail-section-label-dot" /> Project Overview
          </div>
          <div className="detail-section-title" style={{ marginBottom: 32 }}>
            <span className="white">The </span>
            <span className="grad">Story.</span>
          </div>
          <div className="detail-overview-grid">
            <div className="detail-overview-card">
              <h4>Background</h4>
              <p>{project.fullDesc}</p>
            </div>
            <div className="detail-overview-card">
              <h4>The Challenge</h4>
              <p>{project.challenge}</p>
            </div>
            <div className="detail-overview-card" style={{ gridColumn: '1 / -1' }}>
              <h4>Our Solution</h4>
              <p>{project.solution}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Key Features ── */}
        <motion.div className="detail-section"
          initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: smoothEase }}>
          <div className="detail-section-label">
            <span className="detail-section-label-dot" /> Key Features
          </div>
          <div className="detail-section-title" style={{ marginBottom: 32 }}>
            <span className="white">What We </span>
            <span className="grad">Built.</span>
          </div>
          <div className="detail-features-grid">
            {project.keyFeatures.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} className="detail-feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: smoothEase }}>
                  <div className="detail-feature-icon"
                    style={{ background: project.accentLight, border: `1px solid ${project.accentBorder}` }}>
                    <Icon className="h-5 w-5" style={{ color: project.colorHex }} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ── Results ── */}
        <motion.div className="detail-section"
          initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: smoothEase }}>
          <div className="detail-section-label">
            <span className="detail-section-label-dot" /> Results
          </div>
          <div className="detail-section-title" style={{ marginBottom: 32 }}>
            <span className="white">The </span>
            <span className="grad">Impact.</span>
          </div>
          <div className="detail-results-grid">
            {project.results.map((r, i) => (
              <motion.div key={r.label} className="detail-result-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: smoothEase }}>
                <div className="detail-result-value">{r.metric}</div>
                <div className="detail-result-label">{r.label}</div>
                <div className="detail-result-desc">{r.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Tech & Services ── */}
        <motion.div className="detail-section"
          initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: smoothEase }}>
          <div style={{ display: 'grid', gap: 40, gridTemplateColumns: '1fr' }}>
            <div>
              <div className="detail-section-label">
                <span className="detail-section-label-dot" /> Technology
              </div>
              <div className="detail-pills">
                {project.tech.map((t) => (
                  <span key={t} className="detail-pill tech">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="detail-section-label">
                <span className="detail-section-label-dot" /> Services Provided
              </div>
              <div className="detail-pills">
                {project.services.map((s) => (
                  <span key={s} className="detail-pill">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Testimonial ── */}
        <motion.div className="detail-section"
          initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: smoothEase }}>
          <div className="detail-section-label">
            <span className="detail-section-label-dot" /> Client Feedback
          </div>
          <div className="detail-testimonial">
            <div className={`detail-testimonial-glow bg-gradient-to-br ${project.color}`} />
            <p className="detail-testimonial-quote">"{project.testimonial.quote}"</p>
            <div className="detail-testimonial-author">
              <div className={`detail-testimonial-avatar bg-gradient-to-br ${project.color}`}>
                {project.testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="detail-testimonial-name">{project.testimonial.name}</div>
                <div className="detail-testimonial-role">{project.testimonial.role}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Live Preview ── */}
        <motion.div className="detail-section"
          initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: smoothEase }}>
          <div className="detail-section-label">
            <span className="detail-section-label-dot" /> Live Preview
          </div>
          <div className="detail-section-title" style={{ marginBottom: 24 }}>
            <span className="white">See It </span>
            <span className="grad">Live.</span>
          </div>

          {!showIframe ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <Monitor className="h-12 w-12 mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 20, fontSize: 15 }}>
                Load a live preview of {project.title} right here.
              </p>
              <button className="detail-preview-toggle"
                style={{ background: 'linear-gradient(135deg,#2563eb,#0891b2)', color: '#fff', border: 'none', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}
                onClick={() => setShowIframe(true)}>
                <Monitor className="h-4 w-4" />
                Load Preview
              </button>
            </div>
          ) : (
            <div className="detail-preview-container">
              <div className="detail-preview-bar">
                <div className="detail-preview-dots">
                  <span style={{ background: 'rgba(239,68,68,0.6)' }} />
                  <span style={{ background: 'rgba(234,179,8,0.6)' }} />
                  <span style={{ background: 'rgba(34,197,94,0.6)' }} />
                </div>
                <div className="detail-preview-url">
                  <Globe className="h-3 w-3" style={{ color: 'rgba(255,255,255,0.35)' }} />
                  <span className="detail-preview-url-text">{project.url.replace('https://', '')}</span>
                </div>
                <a href={project.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Open <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="detail-preview-iframe-wrap">
                {!iframeLoaded && (
                  <div className="detail-preview-loader">
                    <div className="detail-preview-spinner" />
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Loading {project.title}…</p>
                  </div>
                )}
                <iframe
                  src={project.url}
                  className="detail-preview-iframe"
                  title={`${project.title} preview`}
                  onLoad={() => setIframeLoaded(true)}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <div className="detail-bottom-cta">
          <h3>
            <span className="white" style={{
              background: 'linear-gradient(180deg,#fff 0%,#cbd5e1 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Like what you see? </span>
            <span style={{
              background: 'linear-gradient(135deg,#60a5fa 0%,#06b6d4 50%,#818cf8 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Let's work together.</span>
          </h3>
          <p>We'd love to craft something exceptional for your brand.</p>
          <div className="detail-bottom-cta-actions">
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600,
              background: 'linear-gradient(135deg,#2563eb,#0891b2)', color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(59,130,246,0.35)',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}>
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button className="detail-back-btn" onClick={onClose}
              style={{ padding: '14px 24px', fontSize: 14 }}>
              <ArrowLeft className="h-4 w-4" /> Back to All Work
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ============================================
   PROJECT CARD
============================================ */
function ProjectCard({ project, index, onOpen }) {
  const [imgError, setImgError] = useState(false)
  const isReversed = index % 2 !== 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: smoothEase }}
      className="project-row"
    >
      <div className={`project-row-inner ${isReversed ? 'reversed' : ''}`}>
        <div className="project-image-col" onClick={() => onOpen(project)}>
          <div className="project-image-wrapper group">
            <div className={`project-image-bg bg-gradient-to-br ${project.color}`} />
            <div className="project-image-overlay" />
            <div className="browser-frame">
              <div className="browser-dots"><span /><span /><span /></div>
              <div className="browser-url">
                <Globe className="h-3 w-3 opacity-40" />
                <span className="browser-url-text">{project.url.replace('https://', '')}</span>
              </div>
            </div>
            <div className="project-screenshot-container">
              {imgError ? (
                <div className={`project-screenshot-fallback bg-gradient-to-br ${project.color}`}>
                  <Layers className="h-16 w-16 opacity-30" />
                  <p className="text-white/50 mt-4 font-semibold text-lg">{project.title}</p>
                </div>
              ) : (
                <Image src={project.thumbnail} alt={project.title} fill
                  className="project-screenshot-img"
                  onError={() => setImgError(true)}
                  sizes="(max-width: 768px) 100vw, 60vw" />
              )}
            </div>
            <div className="project-hover-overlay">
              <div className="project-hover-content">
                <span>View Project</span>
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="project-info-col">
          <div className="project-info">
            <div className="project-info-meta">
              <span>{project.tag}</span>
              <span className="meta-dot" />
              <span>{project.year}</span>
            </div>
            <h2 className="project-info-title">{project.title}</h2>
            <p className="project-info-desc">{project.desc}</p>
            <div className="project-info-services">
              {project.services.slice(0, 3).map((s) => (
                <span key={s} className="project-service-tag">{s}</span>
              ))}
            </div>
            <div className="project-info-actions">
              <button className="project-action-btn primary" onClick={() => onOpen(project)}>
                View Details <ArrowUpRight className="h-4 w-4" />
              </button>
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="project-action-btn ghost">
                <ExternalLink className="h-4 w-4" /> Live Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ============================================
   PAGE
============================================ */
export default function Work() {
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.cat === filter)

  const openProject = useCallback((project) => {
    setSelectedProject(project)
  }, [])

  const closeProject = useCallback(() => {
    setSelectedProject(null)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }, [])

  return (
    <>
      <style>{`
        :root { --ease: cubic-bezier(0.22, 1, 0.36, 1); }

        /* ═══ HERO ═══ */
        .work-hero {
          position: relative;
          padding: clamp(140px, 20vh, 200px) 0 clamp(60px, 10vh, 100px);
          overflow: hidden; background: #020617;
        }
        .work-hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, #0a1a35 0%, #050d1f 40%, #020617 100%);
        }
        .work-hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
        }
        .work-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
        }
        .work-hero-content {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto; padding: 0 24px;
        }
        .work-hero-label {
          font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.3em; color: rgba(96,165,250,0.8);
          font-weight: 600; margin-bottom: 24px;
          display: flex; align-items: center; gap: 10px;
        }
        .work-hero-label-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #06b6d4; box-shadow: 0 0 10px rgba(6,182,212,0.8);
        }
        .work-hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900; line-height: 0.95;
          letter-spacing: -0.03em; margin: 0 0 24px;
        }
        .work-hero-title-white {
          background: linear-gradient(180deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .work-hero-title-grad {
          background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #818cf8 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .work-hero-sub {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 560px;
        }

        /* ═══ FILTERS ═══ */
        .work-filters {
          display: flex; gap: 8px; flex-wrap: wrap;
          max-width: 1280px; margin: 0 auto;
          padding: 0 24px clamp(40px, 6vw, 64px);
        }
        .work-filter-btn {
          padding: 10px 20px; border-radius: 100px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: all 0.45s var(--ease);
          border: 1px solid transparent;
          display: flex; align-items: center; gap: 8px;
        }
        .work-filter-btn.active {
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: #020617;
        }
        .work-filter-btn:not(.active) {
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.5);
          border-color: rgba(255,255,255,0.08);
        }
        .work-filter-btn:not(.active):hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8);
          border-color: rgba(255,255,255,0.15);
        }
        .work-filter-count { font-size: 11px; opacity: 0.6; }

        /* ═══ PROJECT ROWS ═══ */
        .work-projects {
          max-width: 1280px; margin: 0 auto;
          padding: 0 24px clamp(80px, 10vw, 140px);
        }
        .project-row { margin-bottom: clamp(60px, 8vw, 100px); }
        .project-row:last-child { margin-bottom: 0; }
        .project-row-inner {
          display: grid; grid-template-columns: 1fr;
          gap: clamp(24px, 4vw, 48px); align-items: center;
        }
        @media(min-width:768px){
          .project-row-inner { grid-template-columns: 1.2fr 1fr; }
          .project-row-inner.reversed { grid-template-columns: 1fr 1.2fr; }
          .project-row-inner.reversed .project-image-col { order: 2; }
          .project-row-inner.reversed .project-info-col { order: 1; }
        }
        .project-image-col { cursor: pointer; }
        .project-image-wrapper {
          position: relative; border-radius: 20px;
          overflow: hidden; border: 1px solid rgba(255,255,255,0.08);
          aspect-ratio: 16/10;
          transition: border-color 0.5s ease, transform 0.6s var(--ease);
        }
        .project-image-wrapper:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-4px);
        }
        .project-image-bg { position: absolute; inset: 0; opacity: 0.85; }
        .project-image-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(2,6,23,0.5) 100%);
          z-index: 1;
        }
        .browser-frame {
          position: absolute; top: 12px; left: 12px; right: 12px; z-index: 3;
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; border-radius: 10px 10px 0 0;
          background: rgba(0,0,0,0.4); backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08); border-bottom: none;
        }
        .browser-dots { display: flex; gap: 5px; flex-shrink: 0; }
        .browser-dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.15); }
        .browser-dots span:first-child { background: rgba(239,68,68,0.6); }
        .browser-dots span:nth-child(2) { background: rgba(234,179,8,0.6); }
        .browser-dots span:nth-child(3) { background: rgba(34,197,94,0.6); }
        .browser-url {
          flex: 1; display: flex; align-items: center; gap: 6px;
          padding: 3px 10px; border-radius: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .browser-url-text {
          font-size: 10px; color: rgba(255,255,255,0.35);
          font-family: monospace; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .project-screenshot-container {
          position: absolute; top: 44px; left: 12px; right: 12px; bottom: 12px;
          border-radius: 0 0 10px 10px; overflow: hidden; z-index: 2;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.06); border-top: none;
        }
        .project-screenshot-img {
          object-fit: cover; object-position: top center;
          transition: transform 3s var(--ease);
        }
        .project-image-wrapper:hover .project-screenshot-img {
          transform: translateY(-8%);
        }
        .project-screenshot-fallback {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; opacity: 0.6;
        }
        .project-hover-overlay {
          position: absolute; inset: 0; z-index: 4;
          display: flex; align-items: center; justify-content: center;
          background: rgba(2,6,23,0.6); backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0; transition: opacity 0.5s var(--ease);
        }
        .project-image-wrapper:hover .project-hover-overlay { opacity: 1; }
        .project-hover-content {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 100px;
          background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff; font-size: 14px; font-weight: 600;
          transform: translateY(8px); transition: transform 0.5s var(--ease);
        }
        .project-image-wrapper:hover .project-hover-content {
          transform: translateY(0);
        }
        .project-info { padding: clamp(0px, 2vw, 16px) 0; }
        .project-info-meta {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.15em; color: rgba(255,255,255,0.4);
          margin-bottom: 16px;
        }
        .meta-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
        }
        .project-info-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800; letter-spacing: -0.03em;
          line-height: 1; margin: 0 0 16px;
          background: linear-gradient(180deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .project-info-desc {
          color: rgba(255,255,255,0.5); line-height: 1.7;
          font-size: clamp(0.9rem, 1.2vw, 1rem); margin-bottom: 20px;
        }
        .project-info-services {
          display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px;
        }
        .project-service-tag {
          font-size: 11px; padding: 4px 12px; border-radius: 100px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
        }
        .project-info-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .project-action-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 100px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: all 0.45s var(--ease); white-space: nowrap;
          text-decoration: none;
        }
        .project-action-btn.primary {
          background: linear-gradient(135deg, #2563eb, #0891b2);
          color: #fff; border: none;
          box-shadow: 0 4px 20px rgba(59,130,246,0.3);
        }
        .project-action-btn.primary:hover {
          box-shadow: 0 6px 30px rgba(59,130,246,0.45);
          transform: translateY(-1px);
        }
        .project-action-btn.ghost {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
        }
        .project-action-btn.ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18); color: #fff;
        }

        /* ═══ CTA ═══ */
        .work-cta {
          position: relative; padding: clamp(80px, 12vw, 140px) 0;
          text-align: center; overflow: hidden; background: #020617;
        }
        .work-cta-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 50%, #0a1a35 0%, #050d1f 40%, #020617 100%);
        }
        .work-cta-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
        }
        .work-cta-content {
          position: relative; z-index: 2;
          max-width: 700px; margin: 0 auto; padding: 0 24px;
        }
        .work-cta-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1; margin: 0 0 12px;
        }
        .work-cta-sub {
          color: rgba(255,255,255,0.45);
          font-size: clamp(0.95rem, 1.4vw, 1.1rem);
          line-height: 1.7; margin: 0 0 32px;
        }
        .work-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 32px; border-radius: 100px;
          font-size: 15px; font-weight: 600;
          background: linear-gradient(135deg, #2563eb, #0891b2);
          color: #fff; border: none; text-decoration: none;
          box-shadow: 0 4px 30px rgba(59,130,246,0.35);
          transition: all 0.45s var(--ease); cursor: pointer;
        }
        .work-cta-btn:hover {
          box-shadow: 0 8px 40px rgba(59,130,246,0.5);
          transform: translateY(-2px);
        }

        /* ═══ RESPONSIVE ═══ */
        @media(max-width:768px){
          .project-row-inner { gap: 20px; }
          .browser-frame { display: none; }
          .project-screenshot-container {
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 0; border: none;
          }
          .project-image-wrapper { aspect-ratio: 16/9; border-radius: 16px; }
        }
        @media(max-width:480px){
          .project-image-wrapper { aspect-ratio: 4/3; }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key="detail"
            project={selectedProject}
            onClose={closeProject}
          />
        ) : (
          <motion.div
            key="listing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          >
            {/* ═══ HERO ═══ */}
            <section className="work-hero">
              <div className="work-hero-bg" />
              <div className="work-hero-orb" style={{
                top: '-20%', left: '-10%', width: 500, height: 500,
                background: 'radial-gradient(circle,rgba(37,99,235,.2) 0%,transparent 70%)',
              }} />
              <div className="work-hero-orb" style={{
                bottom: '-15%', right: '-10%', width: 400, height: 400,
                background: 'radial-gradient(circle,rgba(6,182,212,.15) 0%,transparent 70%)',
              }} />
              <div className="work-hero-grid" />
              <div className="work-hero-content">
                <motion.div className="work-hero-label"
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: smoothEase }}>
                  <span className="work-hero-label-dot" /> Selected Work
                </motion.div>
                <motion.h1 className="work-hero-title"
                  initial={{ opacity: 0, y: 25, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.15, duration: 1, ease: smoothEase }}>
                  <span className="work-hero-title-white">Things we've</span><br />
                  <span className="work-hero-title-grad">obsessed over.</span>
                </motion.h1>
                <motion.p className="work-hero-sub"
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.9, ease: smoothEase }}>
                  Real projects, real results. Each one crafted with obsessive
                  attention to detail and engineered for impact.
                </motion.p>
              </div>
            </section>

            {/* ═══ FILTERS + PROJECTS ═══ */}
            <section style={{ background: '#020617', paddingTop: 'clamp(40px, 6vw, 64px)' }}>
              <motion.div className="work-filters"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: smoothEase }}>
                {filters.map((f) => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`work-filter-btn ${filter === f ? 'active' : ''}`}>
                    {f}
                    <span className="work-filter-count">
                      {f === 'All' ? projects.length : projects.filter((p) => p.cat === f).length}
                    </span>
                  </button>
                ))}
              </motion.div>
              <div className="work-projects">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} onOpen={openProject} />
                ))}
                {filtered.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
                    <p style={{ fontSize: 20, fontWeight: 600 }}>No projects in this category.</p>
                  </div>
                )}
              </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="work-cta">
              <div className="work-cta-bg" />
              <div className="work-cta-orb" style={{
                top: '20%', left: '15%', width: 200, height: 200,
                background: 'radial-gradient(circle,rgba(37,99,235,.2) 0%,transparent 70%)',
              }} />
              <div className="work-cta-orb" style={{
                bottom: '20%', right: '15%', width: 160, height: 160,
                background: 'radial-gradient(circle,rgba(6,182,212,.15) 0%,transparent 70%)',
              }} />
              <div className="work-cta-content">
                <motion.h2 className="work-cta-title"
                  initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: smoothEase }}>
                  <span className="work-hero-title-white">Yours could be </span>
                  <span className="work-hero-title-grad">next.</span>
                </motion.h2>
                <motion.p className="work-cta-sub"
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.8, ease: smoothEase }}>
                  Let's build something worth obsessing over together.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8, ease: smoothEase }}>
                  <Link href="/contact" className="work-cta-btn">
                    Start a Project <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}