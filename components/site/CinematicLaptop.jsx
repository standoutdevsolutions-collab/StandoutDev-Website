// 'use client'
// import { useRef, useEffect, useState, memo } from 'react'
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// export default function CinematicLaptop() {
//   const ref = useRef(null)
//   const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

//   const p = useSpring(scrollYProgress, {
//     stiffness: 90,
//     damping: 32,
//     mass: 0.5,
//     restDelta: 0.001,
//   })

//   const lidRotate       = useTransform(p, [0, 0.15, 0.35, 0.6, 1],  [-110, -110, -20, 0, 0])
//   const laptopScale     = useTransform(p, [0, 0.15, 0.5, 0.8, 1],   [0.55, 0.75, 1, 1.35, 2.2])
//   const laptopY         = useTransform(p, [0, 0.3, 0.6, 1],         [80, 20, 0, -60])
//   const laptopRotateY   = useTransform(p, [0, 0.5, 1],              [-14, 0, 18])
//   const laptopRotateX   = useTransform(p, [0, 0.5, 1],              [18, 6, -6])
//   const glowOpacity     = useTransform(p, [0, 0.3, 0.6, 1],         [0.15, 0.4, 0.55, 0.65])
//   const screenContentOp = useTransform(p, [0.2, 0.4, 1],            [0, 1, 1])

//   const t1  = useTransform(p, [0, 0.18, 0.28],           [1, 1, 0])
//   const t1y = useTransform(p, [0, 0.28],                 [0, -60])
//   const t2  = useTransform(p, [0.22, 0.32, 0.5, 0.6],    [0, 1, 1, 0])
//   const t2y = useTransform(p, [0.22, 0.6],               [40, -60])
//   const t3  = useTransform(p, [0.55, 0.65, 0.85, 0.98],  [0, 1, 1, 0])
//   const t3y = useTransform(p, [0.55, 0.98],              [40, -60])

//   return (
//     <section ref={ref} className="relative" style={{ height: '420vh' }}>
//       <style>{`
//         @keyframes cin-orbit {
//           from { transform: rotate(0deg); }
//           to   { transform: rotate(360deg); }
//         }
//         @keyframes cin-orbit-r {
//           from { transform: rotate(0deg); }
//           to   { transform: rotate(-360deg); }
//         }
//         .cin-perspective {
//           perspective: 1600px;
//           perspective-origin: 50% 50%;
//         }
//         .cin-laptop-base {
//           width: min(78vw, 900px);
//           aspect-ratio: 16 / 10;
//           will-change: transform;
//         }
//         .cin-screen-inner {
//           width: 100%;
//           height: 100%;
//         }
//         .cin-grad-text {
//           background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #818cf8 100%);
//           -webkit-background-clip: text;
//           background-clip: text;
//           -webkit-text-fill-color: transparent;
//           color: transparent;
//         }
//       `}</style>

//       <div
//         className="sticky top-0 h-screen w-full overflow-hidden"
//         style={{ isolation: 'isolate', background: '#020617' }}
//       >
//         {/* Background layers matching new hero */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: 'radial-gradient(ellipse at 50% 0%, #0a1a35 0%, #050d1f 40%, #020617 100%)',
//         }} />

//         {/* Grid */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           backgroundImage: `
//             linear-gradient(rgba(148,163,184,.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(148,163,184,.03) 1px, transparent 1px)
//           `,
//           backgroundSize: '60px 60px',
//           maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
//           WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
//         }} />

//         {/* Orbs */}
//         <div style={{
//           position: 'absolute', top: '-15%', left: '-10%',
//           width: 'min(700px, 80vw)', height: 'min(700px, 80vw)',
//           borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
//           background: 'radial-gradient(circle,rgba(37,99,235,.28) 0%,rgba(37,99,235,.05) 45%,transparent 70%)',
//         }} />
//         <div style={{
//           position: 'absolute', top: '20%', right: '-10%',
//           width: 'min(650px, 75vw)', height: 'min(650px, 75vw)',
//           borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
//           background: 'radial-gradient(circle,rgba(6,182,212,.22) 0%,rgba(6,182,212,.05) 45%,transparent 70%)',
//         }} />
//         <div style={{
//           position: 'absolute', bottom: '-20%', left: '30%',
//           width: 'min(800px, 90vw)', height: 'min(800px, 90vw)',
//           borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
//           background: 'radial-gradient(circle,rgba(99,102,241,.2) 0%,rgba(99,102,241,.04) 45%,transparent 70%)',
//         }} />

//         {/* Animated beams */}
//         <div style={{
//           position: 'absolute', top: '50%', left: '50%',
//           width: '200%', height: '60px',
//           background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,.15) 30%, rgba(6,182,212,.2) 50%, rgba(59,130,246,.15) 70%, transparent 100%)',
//           filter: 'blur(30px)', transformOrigin: 'center', pointerEvents: 'none',
//           animation: 'cin-beam-1 25s linear infinite',
//         }} />
//         <div style={{
//           position: 'absolute', top: '50%', left: '50%',
//           width: '200%', height: '60px',
//           background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,.15) 30%, rgba(6,182,212,.2) 50%, rgba(59,130,246,.15) 70%, transparent 100%)',
//           filter: 'blur(30px)', transformOrigin: 'center', pointerEvents: 'none',
//           animation: 'cin-beam-2 30s linear infinite',
//         }} />

//         <style>{`
//           @keyframes cin-beam-1 {
//             0%, 100% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.15; }
//             50%      { transform: translate(-50%, -50%) rotate(180deg); opacity: 0.3; }
//           }
//           @keyframes cin-beam-2 {
//             0%, 100% { transform: translate(-50%, -50%) rotate(45deg); opacity: 0.1; }
//             50%      { transform: translate(-50%, -50%) rotate(225deg); opacity: 0.25; }
//           }
//         `}</style>

//         {/* Noise overlay */}
//         <div className="noise" style={{
//           position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4, zIndex: 1,
//         }} />

//         {/* Vignettes */}
//         <div style={{
//           position: 'absolute', inset: '0 0 auto 0', height: 160,
//           background: 'linear-gradient(to bottom, #020617, transparent)', pointerEvents: 'none',
//         }} />
//         <div style={{
//           position: 'absolute', inset: 'auto 0 0 0', height: 160,
//           background: 'linear-gradient(to top, #020617, transparent)', pointerEvents: 'none',
//         }} />

//         {/* Top badge */}
//         <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
//           <span style={{
//             display: 'inline-flex', alignItems: 'center', gap: 10,
//             padding: '8px 18px 8px 8px', borderRadius: 100,
//             background: 'rgba(255,255,255,.03)', backdropFilter: 'blur(20px)',
//             border: '1px solid rgba(255,255,255,.08)',
//           }}>
//             <span style={{
//               display: 'inline-flex', alignItems: 'center', gap: 6,
//               padding: '4px 10px', borderRadius: 100,
//               background: 'rgba(59,130,246,.15)', border: '1px solid rgba(59,130,246,.25)',
//             }}>
//               <span style={{
//                 width: 6, height: 6, borderRadius: '50%', background: '#06b6d4',
//                 boxShadow: '0 0 8px rgba(6,182,212,.7)',
//                 animation: 'cin-dot-pulse 2s ease-in-out infinite',
//               }} />
//               <span style={{
//                 fontSize: 10, fontWeight: 700, color: '#60a5fa',
//                 letterSpacing: '.12em', textTransform: 'uppercase',
//               }}>Live</span>
//             </span>
//             <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,.55)', letterSpacing: '.04em' }}>
//               Scroll Experience
//             </span>
//           </span>
//         </div>

//         <style>{`
//           @keyframes cin-dot-pulse {
//             0%,100% { opacity:1; transform:scale(1); }
//             50%     { opacity:.4; transform:scale(.75); }
//           }
//         `}</style>

//         {/* LAPTOP */}
//         <div className="absolute inset-0 flex items-center justify-center cin-perspective">
//           <motion.div
//             style={{
//               scale: laptopScale,
//               y: laptopY,
//               rotateY: laptopRotateY,
//               rotateX: laptopRotateX,
//               transformStyle: 'preserve-3d',
//               willChange: 'transform',
//             }}
//             className="relative"
//           >
//             {/* Ambient glow */}
//             <motion.div
//               style={{ opacity: glowOpacity, willChange: 'opacity' }}
//               className="absolute -inset-32 rounded-full blur-3xl"
//             >
//               <div
//                 className="absolute inset-0 rounded-full"
//                 style={{
//                   background:
//                     'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(6,182,212,0.2) 45%, transparent 75%)',
//                 }}
//               />
//             </motion.div>

//             <div className="relative cin-laptop-base" style={{ transformStyle: 'preserve-3d' }}>
//               {/* Lid / screen */}
//               <motion.div
//                 style={{
//                   rotateX: lidRotate,
//                   transformOrigin: 'bottom center',
//                   transformStyle: 'preserve-3d',
//                   willChange: 'transform',
//                 }}
//                 className="absolute inset-0 rounded-2xl overflow-hidden"
//                 style2={{
//                   border: '1px solid rgba(59,130,246,0.15)',
//                   background: 'linear-gradient(to bottom, #0a1a35, #020617)',
//                 }}
//               >
//                 <div style={{
//                   position: 'absolute', inset: 0, borderRadius: 16,
//                   border: '1px solid rgba(59,130,246,0.15)',
//                   background: 'linear-gradient(to bottom, #0a1a35, #020617)',
//                   overflow: 'hidden',
//                 }}>
//                   {/* Box shadow */}
//                   <div style={{
//                     position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
//                     boxShadow: '0 30px 80px -20px rgba(59,130,246,0.35)',
//                   }} />

//                   <div className="cin-screen-inner">
//                     {/* Browser chrome */}
//                     <div style={{
//                       display: 'flex', alignItems: 'center', gap: 6,
//                       padding: '8px 12px',
//                       borderBottom: '1px solid rgba(255,255,255,0.05)',
//                       background: 'rgba(255,255,255,0.02)',
//                     }}>
//                       <span style={{ height: 10, width: 10, borderRadius: '50%', background: 'rgba(248,113,113,0.7)' }} />
//                       <span style={{ height: 10, width: 10, borderRadius: '50%', background: 'rgba(250,204,21,0.7)' }} />
//                       <span style={{ height: 10, width: 10, borderRadius: '50%', background: 'rgba(74,222,128,0.7)' }} />
//                       <div style={{
//                         marginLeft: 16, height: 16, flex: 1, borderRadius: 4,
//                         background: 'rgba(255,255,255,0.05)',
//                         display: 'flex', alignItems: 'center', padding: '0 8px',
//                       }}>
//                         <div style={{ height: 4, width: 96, borderRadius: 2, background: 'rgba(96,165,250,0.2)' }} />
//                       </div>
//                       <div style={{ height: 16, width: 16, borderRadius: 4, background: 'rgba(255,255,255,0.05)' }} />
//                     </div>

//                     <motion.div
//                       style={{ opacity: screenContentOp, willChange: 'opacity' }}
//                       className="flex h-[calc(100%-32px)]"
//                     >
//                       {/* Sidebar */}
//                       <div style={{
//                         width: '22%', borderRight: '1px solid rgba(255,255,255,0.05)',
//                         background: 'rgba(255,255,255,0.02)', padding: 12,
//                       }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
//                           <div style={{
//                             height: 24, width: 24, borderRadius: 6,
//                             background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
//                           }} />
//                           <div style={{ height: 10, width: 56, borderRadius: 4, background: 'rgba(255,255,255,0.2)' }} />
//                         </div>
//                         {[...Array(5)].map((_, i) => (
//                           <div key={i} style={{
//                             display: 'flex', alignItems: 'center', gap: 8,
//                             borderRadius: 4, padding: '6px 8px', marginBottom: 4,
//                             ...(i === 1 ? {
//                               background: 'rgba(59,130,246,0.1)',
//                               border: '1px solid rgba(59,130,246,0.2)',
//                             } : {}),
//                           }}>
//                             <div style={{
//                               height: 8, width: 8, borderRadius: 2,
//                               background: i === 1 ? '#60a5fa' : 'rgba(255,255,255,0.3)',
//                             }} />
//                             <div style={{ height: 6, flex: 1, borderRadius: 4, background: 'rgba(255,255,255,0.15)' }} />
//                           </div>
//                         ))}
//                         <div style={{ paddingTop: 12, marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
//                           <div style={{ height: 4, width: 32, borderRadius: 4, background: 'rgba(96,165,250,0.4)', marginBottom: 6 }} />
//                           <div style={{ height: 4, width: 48, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }} />
//                         </div>
//                       </div>

//                       {/* Main dashboard */}
//                       <div style={{ flex: 1, padding: 16 }}>
//                         {/* Header row */}
//                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
//                           <div>
//                             <div style={{ height: 10, width: 128, borderRadius: 4, background: 'rgba(255,255,255,0.25)', marginBottom: 6 }} />
//                             <div style={{ height: 6, width: 80, borderRadius: 4, background: 'rgba(255,255,255,0.1)' }} />
//                           </div>
//                           <div style={{
//                             height: 24, width: 80, borderRadius: 6,
//                             background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
//                             boxShadow: '0 0 20px rgba(59,130,246,0.4)',
//                           }} />
//                         </div>

//                         {/* Stat cards */}
//                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
//                           {[
//                             { c: 'from-blue-500/40 to-blue-500/5', v: 40 },
//                             { c: 'from-cyan-500/40 to-cyan-500/5', v: 32 },
//                             { c: 'from-indigo-500/40 to-indigo-500/5', v: 48 },
//                           ].map((s, i) => (
//                             <div key={i} style={{
//                               borderRadius: 6, padding: 8,
//                               border: '1px solid rgba(59,130,246,0.1)',
//                               background: 'rgba(255,255,255,0.02)',
//                             }}>
//                               <div style={{ height: 6, width: 32, borderRadius: 4, background: 'rgba(96,165,250,0.3)', marginBottom: 6 }} />
//                               <div style={{ height: 12, width: s.v, borderRadius: 4, background: 'rgba(255,255,255,0.3)', marginBottom: 6 }} />
//                               <div style={{ height: 32, borderRadius: 4, background: `linear-gradient(to top, rgba(59,130,246,0.4), rgba(6,182,212,0.05))` }} />
//                             </div>
//                           ))}
//                         </div>

//                         {/* Chart */}
//                         <div style={{
//                           borderRadius: 6, padding: 12, marginBottom: 12,
//                           border: '1px solid rgba(59,130,246,0.1)',
//                           background: 'rgba(255,255,255,0.02)',
//                         }}>
//                           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
//                             <div style={{ height: 8, width: 64, borderRadius: 4, background: 'rgba(255,255,255,0.2)' }} />
//                             <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
//                               <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
//                                 <div style={{ height: 6, width: 6, borderRadius: '50%', background: '#60a5fa' }} />
//                                 <div style={{ height: 4, width: 24, borderRadius: 4, background: 'rgba(255,255,255,0.15)' }} />
//                               </div>
//                               <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
//                                 <div style={{ height: 6, width: 6, borderRadius: '50%', background: '#06b6d4' }} />
//                                 <div style={{ height: 4, width: 24, borderRadius: 4, background: 'rgba(255,255,255,0.15)' }} />
//                               </div>
//                             </div>
//                           </div>
//                           <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56 }}>
//                             {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
//                               <div key={i} style={{
//                                 flex: 1, borderRadius: 2, height: `${h}%`,
//                                 background: 'linear-gradient(to top, rgba(37,99,235,0.7), rgba(6,182,212,0.7))',
//                               }} />
//                             ))}
//                           </div>
//                         </div>

//                         {/* Bottom row */}
//                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
//                           {[0, 1].map((i) => (
//                             <div key={i} style={{
//                               borderRadius: 6, padding: 8,
//                               border: '1px solid rgba(255,255,255,0.05)',
//                               background: 'rgba(255,255,255,0.02)',
//                               display: 'flex', alignItems: 'center', gap: 8,
//                             }}>
//                               <div style={{
//                                 height: 24, width: 24, borderRadius: 4,
//                                 background: 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(6,182,212,0.2))',
//                               }} />
//                               <div style={{ flex: 1 }}>
//                                 <div style={{ height: 4, width: '100%', borderRadius: 4, background: 'rgba(255,255,255,0.15)', marginBottom: 4 }} />
//                                 <div style={{ height: 4, width: '50%', borderRadius: 4, background: 'rgba(96,165,250,0.4)' }} />
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>

//                   {/* Notch */}
//                   <div style={{
//                     position: 'absolute', left: '50%', top: 4, transform: 'translateX(-50%)',
//                     height: 6, width: 64, borderRadius: '0 0 8px 8px', background: 'rgba(0,0,0,0.7)',
//                   }} />

//                   {/* Screen sheen */}
//                   <div style={{
//                     position: 'absolute', inset: 0, pointerEvents: 'none',
//                     background: 'linear-gradient(115deg, transparent 40%, rgba(96,165,250,0.06) 50%, transparent 60%)',
//                   }} />
//                 </div>
//               </motion.div>

//               {/* Keyboard deck */}
//               <div style={{
//                 position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
//                 height: 12, width: '104%', borderRadius: '0 0 16px 16px',
//                 background: 'linear-gradient(to bottom, #0a1a35, #020617)',
//                 border: '1px solid rgba(59,130,246,0.1)',
//               }} />
//               <div style={{
//                 position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)',
//                 height: 4, width: '70%', borderRadius: 100, background: 'rgba(0,0,0,0.6)',
//               }} />
//             </div>
//           </motion.div>
//         </div>

//         {/* TEXT OVERLAYS */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
//           {/* Frame 1 */}
//           <motion.div
//             style={{ opacity: t1, y: t1y, willChange: 'opacity, transform' }}
//             className="absolute text-center max-w-5xl"
//           >
//             <p style={{
//               fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.3em',
//               color: 'rgba(96,165,250,0.8)', marginBottom: 24,
//             }}>
//               Design &amp; Development Studio
//             </p>
//             <h1 style={{
//               fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.02em',
//               fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
//             }}>
//               <span style={{
//                 background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 Build products that
//               </span>
//               <br />
//               <span className="cin-grad-text">stand out by design.</span>
//             </h1>
//             <p style={{
//               marginTop: 24, fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
//               color: 'rgba(255,255,255,0.5)', maxWidth: 640, margin: '24px auto 0', lineHeight: 1.7,
//             }}>
//               We partner with ambitious teams to craft software that feels effortless
//               and performs flawlessly.
//             </p>
//           </motion.div>

//           {/* Frame 2 */}
//           <motion.div
//             style={{ opacity: t2, y: t2y, willChange: 'opacity, transform' }}
//             className="absolute text-center max-w-4xl"
//           >
//             <p style={{
//               fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.3em',
//               color: 'rgba(96,165,250,0.8)', marginBottom: 24,
//             }}>
//               Purpose-Built Interfaces
//             </p>
//             <h2 style={{
//               fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em',
//               fontSize: 'clamp(2rem, 5vw, 3.75rem)',
//             }}>
//               <span style={{
//                 background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 Every interaction, thoughtfully
//               </span>
//               <br />
//               <span className="cin-grad-text">engineered to convert.</span>
//             </h2>
//             <p style={{
//               marginTop: 24, fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
//               color: 'rgba(255,255,255,0.5)', maxWidth: 640, margin: '24px auto 0', lineHeight: 1.7,
//             }}>
//               From micro-interactions to motion systems — pixel-perfect execution at every layer.
//             </p>
//           </motion.div>

//           {/* Frame 3 */}
//           <motion.div
//             style={{ opacity: t3, y: t3y, willChange: 'opacity, transform' }}
//             className="absolute text-center max-w-4xl"
//           >
//             <p style={{
//               fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.3em',
//               color: 'rgba(96,165,250,0.8)', marginBottom: 24,
//             }}>
//               End-to-End Delivery
//             </p>
//             <h2 style={{
//               fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em',
//               fontSize: 'clamp(2rem, 5vw, 3.75rem)',
//             }}>
//               <span style={{
//                 background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 From{' '}
//               </span>
//               <span className="cin-grad-text">strategy</span>
//               <span style={{
//                 background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 {' '}to{' '}
//               </span>
//               <span className="cin-grad-text">shipped</span>
//               <span style={{
//                 background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 ,
//               </span>
//               <br />
//               <span style={{
//                 background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
//                 WebkitBackgroundClip: 'text', backgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}>
//                 we own the outcome.
//               </span>
//             </h2>
//             <p style={{
//               marginTop: 24, fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
//               color: 'rgba(255,255,255,0.5)', maxWidth: 640, margin: '24px auto 0', lineHeight: 1.7,
//             }}>
//               Trusted by teams shipping to millions. Ready when you are.
//             </p>
//           </motion.div>
//         </div>

//         {/* Scroll cue */}
//         <div style={{
//           position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
//           display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
//           pointerEvents: 'none', zIndex: 5,
//         }}>
//           <span style={{
//             fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,.25)',
//             letterSpacing: '.35em', textTransform: 'uppercase',
//           }}>Scroll</span>
//           <div style={{
//             width: 1, height: 40, position: 'relative', overflow: 'hidden',
//             background: 'linear-gradient(180deg, rgba(255,255,255,.3), transparent)',
//           }}>
//             <style>{`
//               @keyframes cin-scroll-dot {
//                 0%   { top: -8px; opacity: 0; }
//                 50%  { opacity: 1; }
//                 100% { top: 40px; opacity: 0; }
//               }
//             `}</style>
//             <div style={{
//               position: 'absolute', left: -1, width: 3, height: 8,
//               background: '#60a5fa', borderRadius: 100,
//               boxShadow: '0 0 8px #60a5fa',
//               animation: 'cin-scroll-dot 2s ease-in-out infinite',
//             }} />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }