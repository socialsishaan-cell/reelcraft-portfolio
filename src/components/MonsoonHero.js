'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useMonsoon } from '@/components/MonsoonContext';
import CountUp from '@/components/CountUp';

/* ─────────────────────────────────────────────
   Rain-drop generator (2D CSS ambient layer)
───────────────────────────────────────────── */
const COUNT = 60;
const DROPS = Array.from({ length: COUNT }, (_, i) => ({
  id: i,
  left: `${(i / COUNT) * 100}%`,
  height: `${50 + (i % 7) * 15}px`,
  delay: `${(i % 10) * 0.4}s`,
  duration: `${0.5 + (i % 6) * 0.25}s`,
  near: i % 3 === 0,
}));

/* ─────────────────────────────────────────────
   Skyline SVG (Mumbai silhouette)
───────────────────────────────────────────── */
function Skyline() {
  return (
    <svg
      className="hero-skyline"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="0"   y="190" width="85"  height="130" fill="#101B30" />
      <rect x="90"  y="150" width="65"  height="170" fill="#0D1626" />
      <rect x="160" y="205" width="100" height="115" fill="#101B30" />
      <rect x="265" y="130" width="55"  height="190" fill="#0D1626" />
      <rect x="325" y="175" width="80"  height="145" fill="#101B30" />
      <rect x="415" y="150" width="60"  height="170" fill="#0D1626" />
      <line x1="640" y1="70"  x2="640" y2="260" stroke="#16243C" strokeWidth="6" />
      <line x1="800" y1="70"  x2="800" y2="260" stroke="#16243C" strokeWidth="6" />
      <line x1="640" y1="80"  x2="500" y2="260" stroke="#16243C" strokeWidth="2" />
      <line x1="640" y1="80"  x2="720" y2="260" stroke="#16243C" strokeWidth="2" />
      <line x1="800" y1="80"  x2="720" y2="260" stroke="#16243C" strokeWidth="2" />
      <line x1="800" y1="80"  x2="920" y2="260" stroke="#16243C" strokeWidth="2" />
      <rect x="960"  y="160" width="70"  height="160" fill="#101B30" />
      <rect x="1035" y="190" width="90"  height="130" fill="#0D1626" />
      <rect x="1130" y="140" width="60"  height="180" fill="#101B30" />
      <rect x="1195" y="185" width="110" height="135" fill="#0D1626" />
      <rect x="1310" y="160" width="70"  height="160" fill="#101B30" />
      <rect x="1385" y="200" width="55"  height="120" fill="#0D1626" />
      {[
        [18,220],[40,245],[110,180],[190,230],[440,185],
        [990,195],[1060,220],[1220,215],[1330,195],
      ].map(([x, y], i) => (
        <rect key={i} className="skyline-window" x={x} y={y} width="6" height="8" fill="#F2A93B" />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   3D Canvas — loaded dynamically to avoid SSR
───────────────────────────────────────────── */
function HeroCanvas3D({ thunderCallbackRef }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let cancelled = false;
    let animId;
    let renderer, bloomPass;

    async function init() {
      let THREE, EffectComposer, RenderPass, UnrealBloomPass;
      try {
        const mod = await import('three');
        THREE = mod.default || mod;
        const { EffectComposer: EC } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
        const { RenderPass: RP } = await import('three/examples/jsm/postprocessing/RenderPass.js');
        const { UnrealBloomPass: UBP } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');
        EffectComposer = EC; RenderPass = RP; UnrealBloomPass = UBP;
      } catch (err) {
        console.error('Failed to load Three.js locally:', err);
        return;
      }

      if (cancelled || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setSize(W, H, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ReinhardToneMapping;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
      camera.position.set(0, 0, 18);

      const count = W < 768 ? 300 : 800;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        velocities[i] = 0.04 + Math.random() * 0.06;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.09,
        color: new THREE.Color('#4FD8C4'),
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // Wireframe droplet
      const dropShape = new THREE.Shape();
      dropShape.moveTo(0, 2);
      dropShape.bezierCurveTo(1.2, 1.2, 1.5, 0, 1.5, -0.8);
      dropShape.bezierCurveTo(1.5, -1.8, 0.8, -2.5, 0, -2.5);
      dropShape.bezierCurveTo(-0.8, -2.5, -1.5, -1.8, -1.5, -0.8);
      dropShape.bezierCurveTo(-1.5, 0, -1.2, 1.2, 0, 2);
      const extrudeGeo = new THREE.ExtrudeGeometry(dropShape, { depth: 0.3, bevelEnabled: false });
      const wireMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#4FD8C4'), wireframe: true, transparent: true, opacity: 0.3 });
      const dropMesh = new THREE.Mesh(extrudeGeo, wireMat);
      dropMesh.position.z = -2;
      scene.add(dropMesh);

      const renderScene = new RenderPass(scene, camera);
      bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 1.2, 0.4, 0.6);
      const bloomComposer = new EffectComposer(renderer);
      bloomComposer.addPass(renderScene);
      bloomComposer.addPass(bloomPass);

      if (thunderCallbackRef) {
        thunderCallbackRef.current = () => {
          if (!bloomPass) return;
          const orig = bloomPass.strength;
          bloomPass.strength = 3.5;
          setTimeout(() => { if (bloomPass) bloomPass.strength = orig; }, 130);
        };
      }

      const onResize = () => {
        if (!canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        bloomComposer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);
      sceneRef.current = { renderer, onResize };

      function animate() {
        if (cancelled) return;
        animId = requestAnimationFrame(animate);
        const pos = particles.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
          pos.array[i * 3 + 1] -= velocities[i];
          if (pos.array[i * 3 + 1] < -15) pos.array[i * 3 + 1] = 15;
        }
        pos.needsUpdate = true;
        dropMesh.rotation.y += 0.003;
        bloomComposer.render();
      }
      animate();
    }

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      if (sceneRef.current?.renderer) sceneRef.current.renderer.dispose();
      if (sceneRef.current?.onResize) window.removeEventListener('resize', sceneRef.current.onResize);
    };
  }, [thunderCallbackRef]);

  return <canvas ref={canvasRef} className="hero-canvas-3d" aria-hidden="true" />;
}

/* ─────────────────────────────────────────────
   Scroll progress bar (teal → amber)
───────────────────────────────────────────── */
function ScrollScrubber() {
  const barRef = useRef(null);
  useEffect(() => {
    function update() {
      if (!barRef.current) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      barRef.current.style.width = `${pct}%`;
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="monsoon-scrubber" aria-hidden="true">
      <div className="monsoon-scrubber-fill" ref={barRef} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Hero component
───────────────────────────────────────────── */
export default function MonsoonHero() {
  const { thunderActive } = useMonsoon();
  // All client-only state starts false — matches server render exactly
  const [mounted, setMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const thunderCallbackRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Detect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);

    // Detect WebGL
    try {
      const c = document.createElement('canvas');
      setWebglSupported(!!(c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch {
      setWebglSupported(false);
    }

    return () => mq.removeEventListener('change', handler);
  }, []);

  // Sync thunder to 3D bloom
  useEffect(() => {
    if (thunderActive && thunderCallbackRef.current) {
      thunderCallbackRef.current();
    }
  }, [thunderActive]);

  return (
    <>
      {/* Fixed scroll scrubber */}
      <ScrollScrubber />

      {/* Thunder flash overlay — always in DOM, active class toggled client-side */}
      <div
        className={`monsoon-lightning-flash${mounted && thunderActive && !prefersReduced ? ' active' : ''}`}
        aria-hidden="true"
      />
      <svg
        className={`monsoon-lightning-bolt${mounted && thunderActive && !prefersReduced ? ' active' : ''}`}
        viewBox="0 0 100 300"
        aria-hidden="true"
      >
        <path d="M55 0 L20 130 L45 130 L15 300 L85 110 L55 110 Z" fill="#EAF6FF" />
      </svg>

      {/*
        SVG grain filter definition — always rendered, same on server & client.
        The .monsoon-grain div references it via CSS filter: url(#monsoonGrain).
      */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="monsoonGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0" />
          </filter>
        </defs>
      </svg>
      {/* Film grain — always rendered; animation paused via CSS under reduced-motion */}
      <div className="monsoon-grain" aria-hidden="true" />

      {/* Hero section */}
      <section className="monsoon-hero" id="top">
        <div className="monsoon-hero-bg" aria-hidden="true" />
        <Skyline />

        {/* 2D ambient rain — restricted strictly to hero section */}
        <div className="monsoon-rain-layer" aria-hidden="true">
          {DROPS.map((d) => (
            <span
              key={d.id}
              className={`monsoon-drop${d.near ? ' monsoon-drop--near' : ''}`}
              style={{
                left: d.left,
                height: d.height,
                animationDelay: d.delay,
                animationDuration: d.duration,
              }}
            />
          ))}
        </div>

        {/* Viewfinder brackets */}
        <div className="monsoon-viewfinder" aria-hidden="true">
          <span className="vf-tl" /><span className="vf-tr" />
          <span className="vf-bl" /><span className="vf-br" />
        </div>

        {/* 3D canvas — client-only after mount + WebGL confirm */}
        {mounted && webglSupported && !prefersReduced && (
          <HeroCanvas3D thunderCallbackRef={thunderCallbackRef} />
        )}

        {/* Hero content */}
        <div className="container monsoon-hero-content">
          <span className="monsoon-badge">
            <span className="monsoon-badge-dot" />
            Available for new projects
          </span>

          <h1>
            Crafting Stories,<br />
            <span className="monsoon-accent-text">Frame by Frame.</span>
          </h1>

          <p className="monsoon-hero-sub">
            Content that makes an impact on your audience — not your wallet.
            Let&apos;s start importing.
          </p>

          <div className="monsoon-hero-actions">
            <Link href="/portfolio" className="monsoon-btn monsoon-btn-primary">
              View My Work →
            </Link>
            <Link href="/contact" className="monsoon-btn monsoon-btn-ghost">
              Get in Touch
            </Link>
          </div>

          <div className="monsoon-stats">
            <div className="monsoon-stat">
              <span className="monsoon-stat-value"><CountUp target={16} suffix="+" /></span>
              <p>Reels Cut</p>
            </div>
            <div className="monsoon-stat">
              <span className="monsoon-stat-value"><CountUp target={2} suffix="+" /></span>
              <p>Years Behind the Timeline</p>
            </div>
            <div className="monsoon-stat">
              <span className="monsoon-stat-value"><CountUp target={12} suffix="+" /></span>
              <p>Clients Served</p>
            </div>
          </div>
        </div>

        <div className="monsoon-scroll-cue" aria-hidden="true">
          <span className="monsoon-scroll-label">scroll to play</span>
          <span className="monsoon-scroll-line" />
        </div>
      </section>
    </>
  );
}
