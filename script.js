/* ============================================================
   ZOEY TAN — Dynamic Portfolio
   script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────── */
  const qs  = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── GSAP plugins ────────────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── Reduced-motion check ────────────────────────────── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ══════════════════════════════════════════════════════
     00  INTRO ANIMATION
  ══════════════════════════════════════════════════════ */
  function runIntro() {
    const overlay = qs('#intro-overlay');
    const name    = qs('#intro-name');

    if (prefersReduced) {
      overlay.style.display = 'none';
      initAfterIntro();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.pointerEvents = 'none';
        initAfterIntro();
      }
    });

    tl
      .to(name, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      })
      .to(name, {
        opacity: 0,
        y: -20,
        duration: 0.45,
        ease: 'power2.in',
        delay: 0.55
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.1');
  }

  /* ══════════════════════════════════════════════════════
     01  HERO ANIMATION  (runs after intro)
  ══════════════════════════════════════════════════════ */
  function initAfterIntro() {
    if (!prefersReduced) {
      animateHero();
    }
    initNav();
    initMouseGlow();
    initScrollAnimations();
    initProjectReveal();
    initSkillCards();
    initContactReveal();
    initHeroParallax();
  }

  function animateHero() {
    /* Wrap each headline line text for mask reveal */
    qsa('.hero-headline .line').forEach(line => {
      const inner = document.createElement('span');
      inner.innerHTML = line.innerHTML;
      line.innerHTML = '';
      line.appendChild(inner);
    });

    const tl = gsap.timeline({ delay: 0.1 });

    tl
      .to('.hero-eyebrow', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      })
      .from(qsa('.hero-headline .line > span'), {
        y: '110%',
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out'
      }, '-=0.4')
      .to('.hero-sub', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.5')
      .to('.btn-primary', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.45')
      .to('.hero-scroll-hint', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.nav-logo', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.8')
      .to(qsa('.nav-links a'), {
        opacity: 1,
        stagger: 0.08,
        duration: 0.45,
        ease: 'power2.out'
      }, '-=0.6');

    /* Hero image slow zoom */
    gsap.to('.hero-img, .hero-img-fallback', {
      scale: 1.06,
      duration: 8,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }

  /* ══════════════════════════════════════════════════════
     NAV — scroll state
  ══════════════════════════════════════════════════════ */
  function initNav() {
    const nav = qs('#nav');
    const threshold = 60;

    /* Show nav items if intro skipped (reduced motion) */
    if (prefersReduced) {
      qs('.nav-logo').style.opacity = 1;
      qsa('.nav-links a').forEach(a => a.style.opacity = 1);
    }

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > threshold);
    }, { passive: true });

    /* Smooth scroll for nav links */
    qsa('.nav-links a, a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = qs(href);
          if (target) {
            target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
          }
        }
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     MOUSE GLOW
  ══════════════════════════════════════════════════════ */
  function initMouseGlow() {
    if (prefersReduced || window.innerWidth < 769) return;
    const glow = qs('#mouse-glow');
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      cx = lerp(cx, mx, 0.07);
      cy = lerp(cy, my, 0.07);
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ══════════════════════════════════════════════════════
     HERO PARALLAX on scroll
  ══════════════════════════════════════════════════════ */
  function initHeroParallax() {
    if (prefersReduced) return;
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => {
        const p = self.progress;
        gsap.set('.hero-content', { y: p * 120, opacity: 1 - p * 1.5 });
        gsap.set('.hero-img-wrap, .hero-img-fallback', { y: p * 60 });
      }
    });
  }

  /* ══════════════════════════════════════════════════════
     SCROLL ANIMATIONS — About & Identity
  ══════════════════════════════════════════════════════ */
  function initScrollAnimations() {
    if (prefersReduced) return;

    /* Generic title reveals */
    qsa('.reveal-title').forEach(el => {
      const inner = document.createElement('div');
      inner.innerHTML = el.innerHTML;
      el.innerHTML = '';
      el.appendChild(inner);

      gsap.from(inner, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: '100%',
        duration: 0.9,
        ease: 'power4.out'
      });
    });

    /* Paragraph reveals */
    qsa('.reveal-para').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
        },
        opacity: 0,
        y: 28,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
      });
    });

    /* Identity phrases — staggered on scroll */
    qsa('.identity-phrase').forEach((phrase, i) => {
      const text = qs('.phrase-text', phrase);
      gsap.to(text, {
        scrollTrigger: {
          trigger: phrase,
          start: 'top 82%',
        },
        y: '0%',
        duration: 0.85,
        delay: i * 0.08,
        ease: 'power4.out'
      });
    });

    /* Identity body */
    gsap.from('.identity-body', {
      scrollTrigger: {
        trigger: '.identity-body',
        start: 'top 85%',
      },
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out'
    });
  }

  /* ══════════════════════════════════════════════════════
     PROJECT REVEAL — clip-path mask
  ══════════════════════════════════════════════════════ */
  function initProjectReveal() {
    if (prefersReduced) return;

    qsa('.project').forEach(project => {
      const clip    = qs('.project-img-clip',  project);
      const img     = qs('.project-img',       project);
      const title   = qs('.project-title',     project);
      const num     = qs('.project-num',       project);
      const type    = qs('.project-type',      project);
      const desc    = qs('.project-desc',      project);
      const meta    = qs('.project-meta',      project);
      const btn     = qs('.btn-ghost',         project);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: 'top 70%',
        }
      });

      /* image clip reveal */
      tl.to(clip, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.1,
        ease: 'power3.inOut'
      });

      /* image scale during reveal */
      if (img) {
        tl.from(img, {
          scale: 1.2,
          duration: 1.1,
          ease: 'power3.out'
        }, '<');
      }

      /* text elements */
      tl.from([num, title, type, desc, meta, btn].filter(Boolean), {
        opacity: 0,
        y: 22,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out'
      }, '-=0.5');
    });
  }

  /* ══════════════════════════════════════════════════════
     SKILL CARDS — staggered reveal
  ══════════════════════════════════════════════════════ */
  function initSkillCards() {
    if (prefersReduced) return;

    gsap.from(qsa('.skill-card'), {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
      },
      opacity: 0,
      y: 36,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }

  /* ══════════════════════════════════════════════════════
     CONTACT SECTION
  ══════════════════════════════════════════════════════ */
  function initContactReveal() {
    if (prefersReduced) return;

    gsap.from('.contact-headline', {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
      },
      opacity: 0,
      y: 50,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.contact-sub', {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 72%',
      },
      opacity: 0,
      y: 30,
      duration: 0.9,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from(qsa('.contact-link'), {
      scrollTrigger: {
        trigger: '.contact-links',
        start: 'top 85%',
      },
      opacity: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power3.out'
    });
  }

  /* ══════════════════════════════════════════════════════
     KICK OFF
  ══════════════════════════════════════════════════════ */
  runIntro();

})();
