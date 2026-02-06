/**
 * My Personal Board — premium personal vision board
 *
 * Visual mood: intimate, editorial, zen, luxurious restraint, soulful.
 * Reference: Folio-style editorial clarity meets wabi-sabi restraint;
 * calm, museum-grade typography and spacing, no generic template vibes.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubtleStaffOverlay from './src/components/SubtleStaffOverlay.jsx';
import FloatingCard from './src/components/FloatingCard.jsx';

// ——— Spring presets: meditative, calm settle (stiffness 60–90, damping 25–40) ———
const springCalm = { type: 'spring', stiffness: 70, damping: 32 };
const springReveal = { type: 'spring', stiffness: 60, damping: 28 };
const springSettle = { type: 'spring', stiffness: 85, damping: 38 };

export default function BuildYourDreamTeam() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  const containerRef = useRef(null);
  const spotifyEmbedRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Sync theme to <html> so Tailwind dark: variants apply (darkMode: 'class' targets html)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Parallax: gentle 0.1–0.3 intensity for cinematic depth
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const leftColumnY = useTransform(scrollYProgress, [0.2, 0.5], [40, 0]);
  const rightColumnY = useTransform(scrollYProgress, [0.25, 0.55], [60, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  // Spotify embed with autoplay: load Iframe API and call play() when ready (browsers may block until user interaction)
  useEffect(() => {
    const el = spotifyEmbedRef.current;
    if (!el) return;

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const container = spotifyEmbedRef.current;
      if (!container || container.hasChildNodes()) return;
      IFrameAPI.createController(
        container,
        {
          uri: 'spotify:track:5sUFck3tEi8EIZ5kldFyVX',
          width: '100%',
          height: 152,
        },
        (EmbedController) => {
          EmbedController.play();
        }
      );
    };

    if (!document.querySelector('script[src*="spotify.com/embed/iframe-api"]')) {
      const script = document.createElement('script');
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Content — team members and copy as provided
  const teamMembers = [
    {
      role: "Creative Lead & Artist",
      person: "Me",
      superpowers: ["creativity", "emotional intelligence", "intuition", "strong sense for energy"],
      why: "responsible for vision, music, embodiment, and creative execution"
    },
    {
      role: "AI and Tech Lead",
      person: "Life partner",
      superpowers: ["Machine Learning", "Data", "AI automation", "Business consultation", "critical thinking and decision making"],
      why: "takes care of the Technical aspects, builds and maintains the website and supports online distribution and advanced technical and business implementation and knows me very well."
    },
    {
      role: "Music Production & Female Producer Network",
      person: "Female Producer Collective",
      superpowers: ["music production", "sound design", "technical expertise", "mentorship", "professional network"],
      why: "ensures high-quality music production and access to a female-led creative ecosystem"
    },
    {
      role: "Creative & Podcast Sparring Partner",
      person: "EMILIA LIMBA (ToU Student)",
      superpowers: ["podcast experience", "communication", "yoga background", "emotional support", "active listener"],
      why: "mutual inspiration, direct exchange"
    }
  ];

  const triggersNoGos = ["dishonesty", "disrespect", "unclear responsibilities, deadlines", "gossip"];
  const personalValues = ["openness", "authenticity", "meaningful collaboration", "conscious growth"];
  const howIChoseTeam = [
    "positive and grounded energy",
    "shared values around conscious work",
    "collaboration over competition",
    "Intuition plays an important role in my team decisions"
  ];

  // Song impressions: click an emotion to add your vote; count shows next to bubble
  const [impressionCounts, setImpressionCounts] = useState({});
  const addImpression = (id) => {
    setImpressionCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Stars across the whole song+feelings section: random positions and random glow timing
  const sectionStars = [
    { left: 8, top: 6, delay: 0, duration: 2.2, size: 3 },
    { left: 92, top: 12, delay: 0.7, duration: 1.6, size: 4 },
    { left: 22, top: 22, delay: 1.4, duration: 2.8, size: 3 },
    { left: 78, top: 18, delay: 0.2, duration: 1.9, size: 4 },
    { left: 48, top: 10, delay: 2.1, duration: 2.5, size: 3 },
    { left: 15, top: 32, delay: 0.5, duration: 3.1, size: 4 },
    { left: 85, top: 28, delay: 1.8, duration: 1.7, size: 3 },
    { left: 35, top: 38, delay: 2.4, duration: 2.3, size: 4 },
    { left: 65, top: 42, delay: 0.9, duration: 2.6, size: 3 },
    { left: 5, top: 48, delay: 1.2, duration: 1.8, size: 4 },
    { left: 72, top: 52, delay: 0.35, duration: 2.9, size: 3 },
    { left: 42, top: 58, delay: 1.6, duration: 2.1, size: 4 },
    { left: 55, top: 35, delay: 0.55, duration: 2.4, size: 3 },
    { left: 28, top: 62, delay: 2.2, duration: 1.5, size: 4 },
    { left: 88, top: 68, delay: 1.1, duration: 2.7, size: 3 },
    { left: 12, top: 72, delay: 0.8, duration: 3.2, size: 4 },
    { left: 95, top: 45, delay: 1.5, duration: 1.9, size: 3 },
    { left: 52, top: 78, delay: 0.15, duration: 2.5, size: 4 },
    { left: 38, top: 14, delay: 2.6, duration: 2.0, size: 3 },
    { left: 68, top: 82, delay: 0.4, duration: 2.8, size: 4 },
    { left: 18, top: 88, delay: 1.3, duration: 1.7, size: 3 },
    { left: 82, top: 8, delay: 0.6, duration: 2.6, size: 4 },
    { left: 58, top: 48, delay: 1.9, duration: 2.2, size: 3 },
    { left: 32, top: 52, delay: 0.25, duration: 3.0, size: 4 },
    { left: 75, top: 72, delay: 1.7, duration: 1.8, size: 3 },
    { left: 8, top: 42, delay: 2.8, duration: 2.4, size: 4 },
    { left: 90, top: 78, delay: 0.45, duration: 1.6, size: 3 },
    { left: 45, top: 28, delay: 1.0, duration: 2.9, size: 4 },
    { left: 62, top: 62, delay: 0.9, duration: 2.1, size: 3 },
    { left: 25, top: 85, delay: 2.0, duration: 1.9, size: 4 },
    { left: 70, top: 38, delay: 0.3, duration: 2.7, size: 3 },
    { left: 40, top: 8, delay: 1.4, duration: 2.0, size: 4 },
    { left: 85, top: 55, delay: 2.5, duration: 2.3, size: 3 },
    { left: 15, top: 55, delay: 0.7, duration: 1.5, size: 4 },
    { left: 55, top: 88, delay: 1.6, duration: 2.8, size: 3 },
    { left: 95, top: 22, delay: 0.1, duration: 2.2, size: 4 },
    { left: 5, top: 65, delay: 2.3, duration: 1.8, size: 3 },
    { left: 50, top: 42, delay: 0.85, duration: 2.5, size: 4 },
    { left: 30, top: 28, delay: 1.55, duration: 2.6, size: 3 },
    { left: 80, top: 65, delay: 0.5, duration: 1.9, size: 4 },
    { left: 20, top: 75, delay: 2.1, duration: 2.4, size: 3 },
    { left: 60, top: 18, delay: 0.4, duration: 3.1, size: 4 },
    { left: 88, top: 92, delay: 1.2, duration: 2.0, size: 3 },
    { left: 10, top: 25, delay: 2.7, duration: 1.7, size: 4 },
    { left: 75, top: 48, delay: 0.65, duration: 2.8, size: 3 },
    { left: 35, top: 68, delay: 1.85, duration: 2.2, size: 4 },
    { left: 92, top: 35, delay: 0.2, duration: 1.6, size: 3 },
    { left: 48, top: 58, delay: 2.4, duration: 2.9, size: 4 },
    { left: 65, top: 8, delay: 0.95, duration: 2.1, size: 3 },
    { left: 18, top: 48, delay: 1.35, duration: 2.5, size: 4 },
    { left: 82, top: 82, delay: 0.55, duration: 1.8, size: 3 },
    { left: 42, top: 15, delay: 2.2, duration: 2.7, size: 4 },
    { left: 58, top: 72, delay: 0.35, duration: 2.3, size: 3 },
    { left: 28, top: 38, delay: 1.65, duration: 1.9, size: 4 },
    { left: 72, top: 58, delay: 2.6, duration: 2.4, size: 3 },
    { left: 12, top: 92, delay: 0.75, duration: 2.0, size: 4 },
    { left: 88, top: 15, delay: 1.45, duration: 2.8, size: 3 },
    { left: 52, top: 65, delay: 0.15, duration: 1.5, size: 4 },
    { left: 38, top: 82, delay: 2.0, duration: 2.6, size: 3 },
    { left: 68, top: 32, delay: 0.9, duration: 2.2, size: 4 },
  ];

  const songImpressions = [
    { id: "calm", label: "calm", bg: "rgba(167, 190, 174, 0.35)", border: "rgba(167, 190, 174, 0.6)" },
    { id: "inspired", label: "inspired", bg: "rgba(193, 154, 107, 0.35)", border: "rgba(193, 154, 107, 0.6)" },
    { id: "peaceful", label: "peaceful", bg: "rgba(180, 200, 220, 0.4)", border: "rgba(180, 200, 220, 0.7)" },
    { id: "dreamy", label: "dreamy", bg: "rgba(220, 180, 220, 0.35)", border: "rgba(220, 180, 220, 0.6)" },
    { id: "hopeful", label: "hopeful", bg: "rgba(255, 220, 180, 0.4)", border: "rgba(255, 200, 150, 0.6)" },
    { id: "moved", label: "moved", bg: "rgba(220, 160, 160, 0.35)", border: "rgba(220, 160, 160, 0.6)" },
    { id: "nostalgic", label: "nostalgic", bg: "rgba(200, 180, 220, 0.35)", border: "rgba(200, 180, 220, 0.6)" },
    { id: "joy", label: "joy", bg: "rgba(255, 230, 150, 0.4)", border: "rgba(255, 210, 100, 0.6)" },
    { id: "melancholy", label: "melancholy", bg: "rgba(160, 180, 200, 0.35)", border: "rgba(160, 180, 200, 0.6)" },
    { id: "love", label: "love", bg: "rgba(240, 180, 190, 0.4)", border: "rgba(240, 160, 170, 0.6)" },
    { id: "serene", label: "serene", bg: "rgba(170, 210, 200, 0.35)", border: "rgba(170, 210, 200, 0.6)" },
    { id: "energy", label: "energy", bg: "rgba(255, 180, 120, 0.35)", border: "rgba(255, 160, 100, 0.6)" },
    { id: "warmth", label: "warmth", bg: "rgba(230, 190, 160, 0.4)", border: "rgba(230, 170, 140, 0.6)" },
    { id: "bittersweet", label: "bittersweet", bg: "rgba(210, 170, 190, 0.35)", border: "rgba(210, 170, 190, 0.6)" },
    { id: "free", label: "free", bg: "rgba(190, 220, 240, 0.35)", border: "rgba(190, 220, 240, 0.6)" },
    { id: "grounded", label: "grounded", bg: "rgba(180, 170, 150, 0.35)", border: "rgba(180, 170, 150, 0.6)" },
    { id: "uplifted", label: "uplifted", bg: "rgba(200, 230, 210, 0.35)", border: "rgba(200, 230, 210, 0.6)" },
    { id: "tender", label: "tender", bg: "rgba(240, 210, 220, 0.4)", border: "rgba(240, 210, 220, 0.6)" },
    { id: "flow", label: "flow", bg: "rgba(150, 200, 220, 0.35)", border: "rgba(150, 200, 220, 0.6)" },
    { id: "grateful", label: "grateful", bg: "rgba(220, 200, 150, 0.35)", border: "rgba(220, 200, 150, 0.6)" },
  ];

  // Magazines & news — meditation, mental health, energy, travels (curated from current web)
  const magazineCategories = [
    {
      id: 'meditation',
      label: 'Meditation',
      icon: '∿',
      items: [
        { title: "Meditation's Benefits Stretch Beyond the Person Who Meditates", source: 'Scientific American', url: 'https://www.scientificamerican.com/article/meditations-benefits-stretch-beyond-the-person-who-meditates/', blurb: 'The social ripple effect—calm and compassion spread to communities.' },
        { title: 'Dose–response effects of meditation on mental health and wellbeing', source: 'PMC / Research', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12336962/', blurb: 'Longitudinal study on practice and outcomes.' },
        { title: 'The dangers of meditation: into the dark night', source: 'Cosmos Magazine', url: 'https://cosmosmagazine.com/health/body-and-mind/the-dangers-of-meditation-into-the-dark-night/', blurb: 'When practice goes unguided—informed consent matters.' },
      ],
    },
    {
      id: 'mental-health',
      label: 'Mental Health',
      icon: '◐',
      items: [
        { title: "Scientists uncover meditation's hidden side effects", source: 'Science Daily', url: 'https://www.sciencedaily.com/releases/2025/11/251105050730.htm', blurb: 'Nearly 60% of meditators report some side effects; research is catching up.' },
        { title: 'Mindfulness and Qigong for Self-Healing', source: 'Frontiers in Psychiatry', url: 'https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2025.1508937/full', blurb: 'Randomized trial on Hwabyung and depression—anxiety and anger reduction.' },
        { title: 'Neural and molecular changes during mind-body healing', source: 'Nature Communications Biology', url: 'https://www.nature.com/articles/s42003-025-09088-3', blurb: 'How consciousness and practice reshape the body.' },
      ],
    },
    {
      id: 'energy',
      label: 'Energy & Mind–Body',
      icon: '◎',
      items: [
        { title: 'Meditation Retreat Rapidly Reprograms Body and Mind', source: 'Newswise', url: 'https://www.newswise.com/articles/meditation-retreat-rapidly-reprograms-body-and-mind', blurb: 'A week-long retreat—brain function and blood biology shift.' },
        { title: 'Bringing Reiki Into Hospitals', source: 'Healing Arts Health & Wellness', url: 'https://healingartshealthandwellness.com/2025/10/13/bringing-reiki-into-hospitals-pamela-miles-on-self-care-science-and-spiritual-practice/', blurb: 'Light touch, nervous system, and spiritual hygiene in clinical care.' },
        { title: 'Energy-like experiences in contemplative traditions', source: 'MDPI Religions', url: 'https://www.mdpi.com/2077-1444/16/11/1436', blurb: 'Somatic and energy experiences in meditation.' },
      ],
    },
    {
      id: 'travels',
      label: 'Travel & Wellness',
      icon: '✈',
      items: [
        { title: 'The 9 Biggest Wellness Travel Trends', source: 'Condé Nast Traveler', url: 'https://www.cntraveler.com/story/the-biggest-wellness-trends-of-2025', blurb: 'Social wellness, longevity, and lo-fi experiences.' },
        { title: 'Wellness travel trends you need to know for 2025', source: 'CN Traveller', url: 'https://www.cntraveller.com/article/the-new-wellness-travel-trends-you-need-to-know-for-2025', blurb: 'Community over isolation—group hikes, sauna socials, shared meals.' },
        { title: 'The Future of Wellness Tourism 2025', source: 'Global Wellness Summit', url: 'https://www.globalwellnesssummit.com/uncategorized/the-future-of-wellness-tourism-2025/', blurb: 'Market growth, emerging destinations, and what’s next.' },
      ],
    },
  ];

  const isDark = theme === 'dark';
  const bgBase = isDark ? 'bg-charcoal' : 'bg-cream';
  const textBase = isDark ? 'text-cream-light' : 'text-charcoal';
  const accentUnderline = isDark ? 'bg-sage/30' : 'bg-terracotta/20';

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${bgBase} ${textBase} font-sans antialiased`}
      style={{ position: 'relative' }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection {
          background: rgba(167, 190, 174, 0.25);
          color: #0F0D0A;
        }
        @keyframes glow-pulse-red {
          0%, 100% { box-shadow: 0 0 20px 2px rgba(220, 120, 120, 0.2), 0 0 40px 4px rgba(220, 100, 100, 0.08); }
          50% { box-shadow: 0 0 28px 4px rgba(220, 120, 120, 0.35), 0 0 56px 8px rgba(220, 100, 100, 0.12); }
        }
        @keyframes glow-pulse-green {
          0%, 100% { box-shadow: 0 0 20px 2px rgba(167, 190, 174, 0.25), 0 0 40px 4px rgba(167, 190, 174, 0.1); }
          50% { box-shadow: 0 0 28px 4px rgba(167, 190, 174, 0.4), 0 0 56px 8px rgba(167, 190, 174, 0.15); }
        }
        .glow-box-red {
          animation: glow-pulse-red 3s ease-in-out infinite;
        }
        .glow-box-green {
          animation: glow-pulse-green 3s ease-in-out infinite;
        }
        @keyframes float-bubble {
          0%, 100% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-8px) scale(1.02); }
          66% { transform: translateY(4px) scale(0.98); }
        }
        .float-bubble {
          animation: float-bubble 4s ease-in-out infinite;
        }
        @keyframes star-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); box-shadow: 0 0 6px 2px rgba(255, 250, 240, 0.8), 0 0 12px 4px rgba(255, 245, 230, 0.4); }
          50% { opacity: 1; transform: scale(1.25); box-shadow: 0 0 14px 5px rgba(255, 250, 240, 0.95), 0 0 24px 8px rgba(255, 245, 230, 0.5); }
        }
        .star-dot {
          animation: star-glow 2.5s ease-in-out infinite;
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      {/* Subtle grain overlay — 1–3% opacity, never overpowering */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      <SubtleStaffOverlay />

      {/* ——— Minimal fixed nav: top-right — Back to Top + theme toggle ——— */}
      <nav className="fixed top-0 right-0 z-50 flex items-center gap-4 p-6">
        <button
          type="button"
          onClick={scrollToTop}
          className="text-sm font-light tracking-wide opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-sage/30 focus:ring-offset-2 focus:ring-offset-cream rounded px-3 py-2"
          data-testid="nav-back-to-top"
          aria-label="Back to top"
        >
          Back to top
        </button>
        <button
          type="button"
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          className="rounded-full p-2 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-sage/30 focus:ring-offset-2 focus:ring-offset-cream"
          data-testid="nav-theme-toggle"
          aria-label="Toggle light/dark mode"
        >
          {isDark ? (
            <svg className="w-4 h-4 text-cream-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </nav>

      {/* ——— Full-screen hero: oversized title + script subtitle, breathing scale ——— */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light to-cream dark:from-charcoal dark:to-charcoal-soft" />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-8 lg:px-16 text-center"
        >
          <motion.h1
            className="font-serif text-hero font-normal tracking-serif-tight text-charcoal dark:text-cream-light"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springReveal}
            style={{ transformOrigin: 'center' }}
          >
            Welcome To My Personal Board
          </motion.h1>
          <motion.p
            className="font-script text-2xl lg:text-3xl text-charcoal-muted dark:text-cream-light/80 mt-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springReveal, delay: 0.15 }}
          >
            Wellness • Music • Embodiment
          </motion.p>
          <motion.p
            className="text-lg lg:text-xl font-light leading-relaxed text-charcoal-muted dark:text-cream-light/70 max-w-2xl mx-auto mt-8"
            style={{ lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A conscious approach to music, wellness, and collaboration
          </motion.p>
          <motion.div
            className="mt-6 space-y-2 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {['Create with integrity', 'Collaborate consciously', 'Build something lasting'].map((line, i) => (
              <p key={i} className="text-charcoal-muted dark:text-cream-light/60 text-sm italic font-sans">
                {line}
              </p>
            ))}
          </motion.div>
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springCalm, delay: 0.5 }}
          >
            <button
              type="button"
              onClick={() => scrollToSection('main-content')}
              className="px-8 py-3 text-sm font-medium tracking-wide text-cream bg-charcoal dark:bg-cream dark:text-charcoal rounded-full hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-sage/40 focus:ring-offset-2 focus:ring-offset-cream"
              data-testid="hero-explore"
            >
              Explore the vision
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('team')}
              className="px-8 py-3 text-sm font-medium tracking-wide border border-charcoal/20 dark:border-cream-light/20 rounded-full hover:bg-charcoal/5 dark:hover:bg-cream-light/5 transition-colors focus:outline-none focus:ring-2 focus:ring-sage/40 focus:ring-offset-2 focus:ring-offset-cream"
              data-testid="hero-meet-team"
            >
              Meet the dream team
            </button>
          </motion.div>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button
              type="button"
              onClick={() => scrollToSection('main-content')}
              className="inline-flex flex-col items-center gap-2 text-charcoal-muted dark:text-cream-light/60 hover:text-charcoal dark:hover:text-cream-light transition-colors focus:outline-none"
              data-testid="hero-scroll"
              aria-label="Scroll down"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ——— Two-column asymmetric: Left Foundations (Mission + Initiative), Right Dream Team ——— */}
      <section id="main-content" className="relative py-section lg:py-section-lg">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-20 grid lg:grid-cols-[0.42fr_0.58fr] gap-gap-2xl items-start">
          {/* ——— Left column: Mission + Initiative, stacked, left-aligned, generous margin ——— */}
          <motion.div style={{ y: leftColumnY }} className="space-y-gap-2xl lg:pl-8">
            <div>
              <motion.span
                className="block text-xs uppercase tracking-widest text-charcoal-muted dark:text-cream-light/60 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={springCalm}
              >
                Mission Statement
              </motion.span>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px', amount: 0.2 }}
                transition={{ ...springReveal, delay: 0.08 }}
              >
                <p className="font-sans text-lg lg:text-xl font-light leading-[1.85] text-charcoal dark:text-cream-light/90">
                  My mission is to create music and embodied wellness experiences that help people reconnect with their inner wisdom, self-worth, and presence.
                </p>
                <p className="font-sans text-lg lg:text-xl font-light leading-[1.85] text-charcoal dark:text-cream-light/90">
                  Through meditation, voice, and conscious community, I aim to support lasting wellbeing that integrates into everyday life.
                </p>
                <div className={`h-px w-16 ${accentUnderline} rounded-full`} />
              </motion.div>
            </div>

            <div>
              <motion.span
                className="block text-xs uppercase tracking-widest text-charcoal-muted dark:text-cream-light/60 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={springCalm}
              >
                My Initiative
              </motion.span>
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 56 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px', amount: 0.2 }}
                transition={{ ...springReveal, delay: 0.1 }}
              >
                <h2 className="font-serif text-display font-normal tracking-serif-tighter text-charcoal dark:text-cream-light">
                  Building a Wellness & Music Program
                </h2>
                <p className="font-sans text-lg font-light leading-[1.85] text-charcoal dark:text-cream-light/90">
                  My initiative is the first step toward building a long-term Wellness & Music program. The focus is on writing, producing, and releasing meditation and energy songs.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-normal text-charcoal dark:text-cream-light mb-2">My Role</h3>
                    <p className="font-sans text-base font-light leading-[1.8] text-charcoal-muted dark:text-cream-light/80">
                      I lead the creative direction, songwriting, and vocals. I collaborate with producers and female-led music networks to ensure high-quality production and sustainable growth.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-normal text-charcoal dark:text-cream-light mb-2">Community Vision</h3>
                    <p className="font-sans text-base font-light leading-[1.8] text-charcoal-muted dark:text-cream-light/80">
                      In parallel, I aim to build a female-based friendship and creative community, locally, internationally, and virtually with the long-term vision of sharing this music in conscious spaces such as singing circles and embodied gatherings.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ——— Triggers & No GOs — attractive block with soft red glow ——— */}
            <motion.div
              className="glow-box-red relative rounded-2xl border border-charcoal/[0.08] dark:border-cream-light/10 bg-white/[0.4] dark:bg-white/[0.03] backdrop-blur-sm p-8"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={springReveal}
            >
              <h3 className="font-serif text-xl font-normal tracking-serif-tighter text-charcoal dark:text-cream-light mb-4">
                Triggers & No GOs
              </h3>
              <div className={`h-0.5 w-12 ${accentUnderline} rounded-full mb-6`} />
              <ul className="flex flex-wrap gap-2">
                {triggersNoGos.map((item, i) => (
                  <li key={i}>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-light bg-charcoal/5 dark:bg-cream-light/5 text-charcoal dark:text-cream-light/90 border border-charcoal/10 dark:border-cream-light/10">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ——— Personal Values — attractive block with soft green glow ——— */}
            <motion.div
              className="glow-box-green relative rounded-2xl border border-charcoal/[0.08] dark:border-cream-light/10 bg-white/[0.4] dark:bg-white/[0.03] backdrop-blur-sm p-8"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ ...springReveal, delay: 0.06 }}
            >
              <h3 className="font-serif text-xl font-normal tracking-serif-tighter text-charcoal dark:text-cream-light mb-4">
                Personal Values
              </h3>
              <div className={`h-0.5 w-12 ${accentUnderline} rounded-full mb-6`} />
              <ul className="flex flex-wrap gap-2">
                {personalValues.map((item, i) => (
                  <li key={i}>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-light bg-sage/10 dark:bg-sage-muted text-charcoal dark:text-cream-light/90 border border-sage/20 dark:border-sage/30">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ——— How did I choose the team ——— */}
            <motion.div
              className="relative rounded-2xl border border-charcoal/[0.08] dark:border-cream-light/10 bg-white/[0.4] dark:bg-white/[0.03] backdrop-blur-sm p-8"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ ...springReveal, delay: 0.1 }}
            >
              <h3 className="font-serif text-xl font-normal tracking-serif-tighter text-charcoal dark:text-cream-light mb-4">
                How did I choose the team
              </h3>
              <div className={`h-0.5 w-12 ${accentUnderline} rounded-full mb-6`} />
              <ul className="space-y-3 font-sans text-base font-light leading-[1.8] text-charcoal-muted dark:text-cream-light/80">
                {howIChoseTeam.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-terracotta/40 dark:bg-sage/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Signature accent near foundations — handwritten "Yes!" */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...springSettle, delay: 0.4 }}
            >
              <span className="font-script text-2xl text-terracotta dark:text-sage opacity-90" aria-hidden="true">Yes!</span>
            </motion.div>
          </motion.div>

          {/* ——— Right column: Dream Team — large floating cards, staggered reveal ——— */}
          <motion.div id="team" style={{ y: rightColumnY }} className="space-y-8 lg:pr-4">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={springReveal}
            >
              <span className="block text-xs uppercase tracking-widest text-charcoal-muted dark:text-cream-light/60 mb-4">
                My Dream Team
              </span>
              <h2 className="font-serif text-section font-normal tracking-serif-tighter text-charcoal dark:text-cream-light">
                The people who bring this vision to life
              </h2>
            </motion.div>

            {teamMembers.map((member, index) => (
              <FloatingCard key={index} delay={index * 0.12} id={`team-${index}`}>
                <h3 className="font-serif text-xl lg:text-2xl font-normal tracking-serif-tighter text-charcoal dark:text-cream-light mb-1">
                  {member.role}
                </h3>
                <div className={`h-0.5 w-12 ${accentUnderline} rounded-full my-3`} />
                <p className="text-xs uppercase tracking-wider text-charcoal-muted dark:text-cream-light/60 font-medium mb-5">
                  {member.person}
                </p>
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-charcoal-muted dark:text-cream-light/50 mb-3 font-medium">
                    Superpowers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.superpowers.map((power, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-light bg-sage/10 dark:bg-sage-muted text-charcoal dark:text-cream-light/90 border border-sage/20 dark:border-sage/30"
                      >
                        {power}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-charcoal/10 dark:bg-cream-light/10 mb-6" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-charcoal-muted dark:text-cream-light/50 mb-2 font-medium">
                    Why
                  </p>
                  <p className="font-sans text-base font-light leading-[1.8] text-charcoal dark:text-cream-light/90">
                    {member.why}
                  </p>
                </div>
              </FloatingCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ——— Listen to my song · Choose your impression ——— */}
      <section id="song-impressions" className="relative py-20 lg:py-28 overflow-hidden border-t border-charcoal/10 dark:border-cream-light/10">
        {/* Stars across entire section: title + player + feelings — behind content, random glow */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          {sectionStars.map((star, i) => (
            <span
              key={i}
              className="star-dot absolute bg-amber-200/90 dark:bg-sage/90 shadow-[0_0_8px_2px_rgba(255,240,200,0.6)] dark:shadow-[0_0_8px_2px_rgba(167,190,174,0.5)]"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center mb-14">
          <motion.span
            className="block text-xs uppercase tracking-widest text-charcoal-muted dark:text-cream-light/50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springCalm}
          >
            Original song
          </motion.span>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-serif-tighter text-charcoal dark:text-cream-light mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springReveal, delay: 0.05 }}
          >
            Listen to my song and choose your impression
          </motion.h2>
          <motion.p
            className="font-sans text-lg font-light text-charcoal-muted dark:text-cream-light/70 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Press play, then tap any feeling that resonates — as many times as you like.
          </motion.p>
        </div>

        <motion.div
          className="relative z-10 max-w-md mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springReveal}
        >
          <div
            ref={spotifyEmbedRef}
            id="spotify-embed-autoplay"
            className="w-full min-h-[152px] bg-charcoal/5 dark:bg-cream-light/5"
            aria-label="Spotify – Listen to my song (autoplay)"
          />
        </motion.div>

        <div className="relative z-10 min-h-[320px] sm:min-h-[380px] flex items-center justify-center px-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {songImpressions.map((item, i) => {
              const count = impressionCounts[item.id] || 0;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => addImpression(item.id)}
                  className={`float-bubble relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 sm:px-5 sm:py-3 font-sans text-sm font-light text-charcoal dark:text-cream-light/95 border-2 backdrop-blur-sm hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream dark:focus:ring-offset-charcoal transition-transform duration-300 cursor-pointer select-none`}
                  style={{
                    backgroundColor: item.bg,
                    borderColor: item.border,
                    animationDelay: `${(i * 0.15) % 3}s`,
                    boxShadow: count > 0 ? `0 4px 20px ${item.border}` : 'none',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ ...springCalm, delay: i * 0.03 }}
                  data-testid={`impression-${item.id}`}
                >
                  <span>{item.label}</span>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full text-xs font-medium bg-charcoal/15 dark:bg-cream-light/15 text-charcoal dark:text-cream-light border border-charcoal/20 dark:border-cream-light/20"
                    >
                      {count}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Magazines & News: meditation, mental health, energy, travels ——— */}
      <section id="magazines" className="relative py-20 lg:py-28 overflow-hidden border-t border-charcoal/10 dark:border-cream-light/10 bg-terracotta/[0.06] dark:bg-sage/[0.08]">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springReveal}
          >
            <span className="block text-xs uppercase tracking-[0.2em] text-charcoal-muted dark:text-cream-light/50 mb-4">
              Curated from the web
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-serif-tight text-charcoal dark:text-cream-light mb-4">
              Magazines & News
            </h2>
            <p className="font-sans text-lg font-light text-charcoal-muted dark:text-cream-light/70 max-w-xl mx-auto">
              Meditation · Mental health · Energy · Travel — fresh reads to reflect and explore.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {magazineCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                className="flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...springReveal, delay: catIndex * 0.08 }}
              >
                <div className="sticky top-24 mb-6">
                  <span className="text-2xl text-terracotta/80 dark:text-sage/80 mb-2 block" aria-hidden="true">{category.icon}</span>
                  <h3 className="font-serif text-xl font-normal tracking-serif-tighter text-charcoal dark:text-cream-light border-b border-charcoal/10 dark:border-cream-light/10 pb-2">
                    {category.label}
                  </h3>
                </div>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.a
                      key={itemIndex}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl border border-charcoal/[0.08] dark:border-cream-light/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-5 hover:bg-white/80 dark:hover:bg-white/[0.08] hover:border-terracotta/20 dark:hover:border-sage/20 transition-all duration-300 hover:shadow-lg hover:shadow-terracotta/5 dark:hover:shadow-sage/5"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...springCalm, delay: catIndex * 0.08 + itemIndex * 0.05 }}
                      data-testid={`magazine-${category.id}-${itemIndex}`}
                    >
                      <p className="font-serif text-base font-normal text-charcoal dark:text-cream-light leading-snug group-hover:text-charcoal dark:group-hover:text-cream-light mb-2 line-clamp-3">
                        {item.title}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-charcoal-muted dark:text-cream-light/50 mb-1.5">
                        {item.source}
                      </p>
                      <p className="text-sm font-light text-charcoal-muted dark:text-cream-light/60 leading-relaxed line-clamp-2">
                        {item.blurb}
                      </p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-sm text-charcoal-muted dark:text-cream-light/50 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Links open in a new tab · Sources verified from current articles and research.
          </motion.p>
        </div>
      </section>

      {/* ——— Footer: invitation + Back to top + copyright ——— */}
      <footer className="relative py-16 lg:py-24 border-t border-charcoal/10 dark:border-cream-light/10">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.p
            className="font-sans text-lg lg:text-xl font-light leading-[1.85] text-charcoal-muted dark:text-cream-light/80"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springCalm}
          >
            This is an invitation to create something meaningful together—rooted in purpose, built with intention.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm font-light text-charcoal-muted dark:text-cream-light/60 hover:text-charcoal dark:hover:text-cream-light transition-colors focus:outline-none focus:ring-2 focus:ring-sage/30 focus:ring-offset-2 focus:ring-offset-cream rounded-full px-4 py-2"
              data-testid="footer-back-to-top"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              Back to top
            </button>
          </motion.div>
          <div className="h-px w-48 bg-charcoal/10 dark:bg-cream-light/10 mx-auto my-8" />
          <p className="text-xs text-charcoal-muted dark:text-cream-light/50">
            © {new Date().getFullYear()} My Personal Board
          </p>
        </div>
      </footer>
    </div>
  );
}
