import React, { useState, useEffect, useRef } from 'react';
import InteractiveMascot from './components/InteractiveMascot';
import ContentSection from './components/ContentSection';
import { SectionType } from './types';

// Helper component for buttons with firework/sparkle effects
const FireworkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center overflow-visible bg-white text-[#0a2540] border border-slate-200 shadow-sm hover:bg-[#0a2540] hover:text-white hover:border-[#0a2540] w-full sm:w-auto"
    >
      <span className="relative z-10">{text}</span>
      
      {/* Sparkle Particles - optimized for dark background on hover */}
      {/* Top Left - Pink */}
      <span className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-8 group-hover:-translate-x-6 bg-pink-400" />
      
      {/* Top Right - Blue */}
      <span className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-8 group-hover:translate-x-6 delay-75 bg-blue-400" />
      
      {/* Bottom - Yellow */}
      <span className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-8 group-hover:translate-x-2 delay-100 bg-yellow-400" />
      
      {/* Left - Teal */}
      <span className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 group-hover:-translate-x-10 delay-50 bg-teal-400" />
       
      {/* Right - Purple */}
      <span className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 group-hover:translate-x-10 delay-50 bg-purple-400" />
    </a>
  );
};

// Simplified Signature Badge Component
// Updated to ensure single line on mobile with whitespace-nowrap and responsive font size
const SignatureBadge = () => (
  <div className="px-4 py-2 md:px-5 md:py-2.5 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-full shadow-sm text-[8px] sm:text-[10px] md:text-xs font-bold text-slate-500 tracking-widest uppercase cursor-default whitespace-nowrap">
    Designed by Meimei • Implemented by Gemini AI Studio
  </div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Defined minimalist color themes per section (backgrounds)
  // Updated Work theme to a subtle slate-blue gradient to distinguish from white
  const sections: { id: SectionType; title: string; theme: string }[] = [
    { id: 'hero', title: 'Home', theme: 'gradient-mesh' },
    { id: 'work', title: 'Work', theme: 'bg-gradient-to-b from-[#f8faff] to-[#f0f4f8]' }, 
    { id: 'education', title: 'Skills', theme: 'bg-[#f6f9fc]' },
    { id: 'contact', title: 'Contact', theme: 'bg-white' },
  ];

  const workItems = [
    {
      project: "Merchant Growth Strategy",
      company: "ByteDance",
      industry: "GLOBAL TECH",
      role: "Strategy Product Manager",
      timeline: "2025 — 2025",
      url: "https://www.bytedance.com",
      desc: "Engineered a dynamic goal-setting engine and intelligent notification system for 3M+ merchants on Douyin E-commerce.",
      // Tech Blue Gradient
      brandGradient: "bg-gradient-to-r from-[#335eea] to-[#45aaf2]", 
      brandText: "text-[#335eea]"
    },
    {
      project: "Global Marketplace Scaling",
      company: "Poizon Global",
      industry: "E-COMMERCE PLATFORM",
      role: "Platform Product Manager",
      timeline: "2023 — 2025",
      url: "https://www.poizon.com/authentication/home?&re_source=1",
      desc: "Architected a cross-border data processing platform and scalable infrastructure to drive global import GMV.",
      // Poizon Signature Turquoise/Cyan
      brandGradient: "bg-gradient-to-r from-[#00bba4] to-[#00d0bc]",
      brandText: "text-[#00bba4]"
    },
    {
      project: "Merchant Risk Infrastructure",
      company: "ByteDance",
      industry: "GLOBAL TECH",
      role: "Platform Product Manager",
      timeline: "2021 — 2023",
      url: "https://www.bytedance.com",
      desc: "Designed transaction throttling models and managed end-to-end deposit systems for 5M+ merchants.",
      // Tech Blue Gradient
      brandGradient: "bg-gradient-to-r from-[#335eea] to-[#45aaf2]", 
      brandText: "text-[#335eea]"
    },
    {
      project: "Platform Trust & Safety",
      company: "Pinduoduo",
      industry: "SOCIAL E-COMMERCE",
      role: "Trust Product Manager",
      timeline: "2019 — 2021",
      url: "https://m.pinduoduo.com/en/",
      desc: "Championed Pinduoduo's anti-counterfeiting initiative and successfully safeguarding marketplace integrity for millions of consumers.",
      // Pinduoduo Red
      brandGradient: "bg-gradient-to-r from-[#e02e24] to-[#ff5d5d]",
      brandText: "text-[#e02e24]"
    }
  ];

  const skillGroups = [
    {
      category: "Technical Skills",
      skills: ["SQL (Proficient)", "A/B Testing", "Data Analysis", "Python"]
    },
    {
      category: "Product Mastery",
      skills: ["Growth Strategy", "Merchant Ecosystem", "Platform Scalability", "Trust & Safety"]
    },
    {
      category: "Languages",
      skills: ["Mandarin (Native)", "English (Professional)"]
    }
  ];

  useEffect(() => {
    // Scroll Spy Logic
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const current = sections.find((s) => {
        const element = document.getElementById(s.id);
        if (!element) return false;
        const nextElement = document.getElementById(sections[sections.indexOf(s) + 1]?.id);
        return scrollPos >= element.offsetTop && (!nextElement || scrollPos < nextElement.offsetTop);
      });
      if (current && current.id !== activeSection) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for Animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [activeSection, sections]);

  const toggleMusic = () => {
    const newState = !isPartyMode;
    setIsPartyMode(newState);
    if (newState) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      if (!audioRef.current) {
        audioRef.current = new Audio('https://cdn.jsdelivr.net/gh/0124gmm-stack/whatever@main/bgm2.mp3');
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(() => setIsPartyMode(false));
    } else {
      audioRef.current?.pause();
    }
  };

  // Determine styles for the Mascot container based on sections
  const getMascotContainerClasses = () => {
    // Party Mode: Bottom right, z-0 to stay under text
    if (isPartyMode) return 'bottom-0 right-0 fixed z-0 pointer-events-none origin-bottom-right';

    switch (activeSection) {
      case 'hero':
        // Hero: Top Right
        // Moved closer to center on mobile (top-[18%]) to be nearer to the text, instead of pinned to the corner
        return 'top-[18%] right-[8%] md:top-[15%] md:right-[5%] z-20 absolute';
      case 'work':
        // Work: Peek from bottom right
        return 'bottom-0 right-10 translate-y-1/2 opacity-20 hover:opacity-100 transition-opacity fixed z-20';
      case 'education':
        // Edu: Left side peek
        return 'bottom-0 left-10 translate-y-1/4 opacity-10 fixed z-20';
      case 'contact':
        // Contact: Center stage, but HIGHER UP
        // Adjusted top position from 8% to 16% to bring it closer to text on mobile as requested
        return 'top-[16%] left-1/2 -translate-x-1/2 z-20 fixed';
      default:
        return 'hidden';
    }
  };

  const getMascotTransformClasses = () => {
    let base = "pointer-events-auto transition-all duration-1000 ease-out ";
    // Smaller scale in party mode so it doesn't block text
    if (isPartyMode) return base + "scale-75 md:scale-90 rotate-12 h-[200px] w-[200px] md:h-[300px] md:w-[300px]";
    
    switch (activeSection) {
      case 'hero':
        // Hero: Reduced size on mobile to 60px to prevent text overlap
        return base + "h-[60px] w-[60px] md:h-[200px] md:w-[200px] opacity-100 rotate-12";
      case 'work':
        return base + "h-[150px] w-[150px] scale-75 grayscale opacity-50";
      case 'education':
        return base + "h-[150px] w-[150px] -rotate-12 grayscale opacity-40";
      case 'contact':
        // Contact: Even smaller on mobile (100px) to prevent overlap with text
        return base + "h-[100px] w-[100px] md:h-[180px] md:w-[180px] scale-100";
      default:
        return base;
    }
  };

  const getMascotMessage = () => {
    if (activeSection === 'contact') return "Thanks for browsing!";
    return "Hi there!";
  };

  const activeTheme = sections.find(s => s.id === activeSection)?.theme || 'bg-white';
  
  return (
    <div className={`transition-colors duration-700 min-h-screen font-sans antialiased ${activeTheme}`}>
      
      {/* Pink Party Mode Overlay */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-500 z-50 ${isPartyMode ? 'opacity-100' : 'opacity-0'}`}>
         {isPartyMode && (
           <div className="absolute inset-0 bg-pink-500/10 mix-blend-multiply pointer-events-none"></div>
         )}
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="confetti-particle animate-confetti" style={{ backgroundColor: ['#635bff', '#00d4ff', '#ff4d4d'][i % 3], '--tw-translate-x': `${(Math.random()-0.5)*1500}px`, '--tw-translate-y': `${(Math.random()-0.5)*1500}px`, '--tw-rotate': `${Math.random()*720}deg` } as any} />
          ))}
        </div>
      )}

      {/* Navigation - Clean Floating Pill */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]">
        <div className="bg-white/80 backdrop-blur-md pl-2 pr-2 py-1.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-1 transition-all">
          {sections.map((s) => (
            <button 
              key={s.id} 
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })} 
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${activeSection === s.id ? 'bg-[#0a2540] text-white shadow-md' : 'text-slate-500 hover:text-[#0a2540] hover:bg-slate-50'}`}
            >
              {s.title}
            </button>
          ))}
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          <button 
            onClick={toggleMusic} 
            className={`p-2 rounded-full transition-all ${isPartyMode ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mascot Container */}
      <div className={`transition-all duration-1000 ${getMascotContainerClasses()}`}>
        <div className={getMascotTransformClasses()}>
          <InteractiveMascot 
            mood={isPartyMode ? 'dancing' : activeSection === 'hero' ? 'happy' : activeSection === 'contact' ? 'curious' : 'happy'} 
            isPartyMode={isPartyMode} 
            audioRef={audioRef}
            showHint={(activeSection === 'hero' || activeSection === 'contact') && !isPartyMode}
            message={getMascotMessage()}
          />
        </div>
      </div>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        {/* Added pb-20 md:pb-40 to shift center of content upwards visually, clearing space for bottom badges */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6 pt-20 pb-20 md:pb-40">
          {/* Abstract Stripe Shape */}
          <div className="absolute top-0 right-0 w-[70%] h-full hero-accent-shape skew-x-[-12deg] translate-x-1/4 -z-10 origin-bottom"></div>
          
          <div className="w-full max-w-[90rem] z-10 animate-fade-in flex flex-col items-center text-center">
            
            {/* Removed 'Open for opportunities' button as requested */}

            <h1 className="font-black text-[#0a2540] leading-[0.9] tracking-tighter flex flex-col items-center select-none">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-4">I'M</span>
              <span className="text-[18vw] sm:text-[16vw] md:text-[15vw] leading-[0.85] tracking-tight text-[#0a2540]">MEIMEI.</span>
            </h1>

            <div className="mt-12 md:mt-16 space-y-4 max-w-4xl">
              <h2 className="text-base sm:text-lg md:text-2xl font-black text-[#0a2540] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                Senior Product Manager
              </h2>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-[0.15em] uppercase">
                6 YEARS SCALING MARKETPLACES <span className="text-indigo-400 mx-2">•</span> DATA-DRIVEN STRATEGY <span className="text-indigo-400 mx-2">•</span> AI PRACTITIONER
              </p>
            </div>
          </div>
          
          {/* Signature Badge - Centered Bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex justify-center w-full px-4">
             <SignatureBadge />
          </div>
        </section>

        {/* WORK SECTION */}
        <ContentSection id="work" title="Selected Work" isDark={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {workItems.map((item, i) => (
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={i} 
                className={`group relative block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 ease-out border border-slate-100 hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full ${visibleSections['work'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Redesigned Card Header: Industry & Theme Strip */}
                <div className="relative">
                  {/* Decorative Color Strip - Color Coded by Company Brand */}
                  <div className={`h-14 relative overflow-hidden flex items-center justify-between px-6 ${item.brandGradient}`}>
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors z-0" />
                    
                    {/* Abstract Pattern overlay */}
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)', backgroundSize: '10px 10px'}}></div>

                    {/* Industry Badge */}
                    <span className="relative z-10 text-[10px] font-black text-white tracking-[0.2em] uppercase border border-white/30 px-2 py-1 rounded backdrop-blur-sm">
                      {item.industry}
                    </span>
                    
                    {/* Timeline Badge */}
                    <span className="relative z-10 text-white/90 font-mono text-[10px] md:text-xs font-bold tracking-tight">
                      {item.timeline}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 px-6 pb-8 pt-6 flex flex-col">
                   <div className="mb-4">
                     <div className="flex flex-col items-start mb-2">
                         {/* EMPHASIZED COMPANY NAME: Larger font size, bold weight */}
                         <h3 className={`text-3xl md:text-4xl font-black text-[#0a2540] tracking-tighter transition-colors mb-2 leading-none group-hover:${item.brandText.replace('text-', 'text-')}`.includes('#') ? 'group-hover:opacity-80' : ''} style={item.brandText.startsWith('text-[#') ? { '--hover-color': item.brandText.match(/\[(.*?)\]/)?.[1] } as React.CSSProperties : {}}>
                            {/* We handle hover color via class if possible, or style */}
                            <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300" style={{ '--hover-color': item.brandText.match(/\[(.*?)\]/)?.[1] || '#4f46e5' } as React.CSSProperties}>{item.company}</span>
                         </h3>
                         <span className={`text-xs font-bold uppercase tracking-widest ${item.brandText}`}>
                           {item.role}
                         </span>
                     </div>
                     <h4 className="text-base font-bold text-slate-700 leading-snug mt-2">{item.project}</h4>
                   </div>
                   <p className="text-slate-500 text-sm leading-relaxed mt-auto border-t border-slate-50 pt-4">
                     {item.desc}
                   </p>
                </div>
              </a>
            ))}
          </div>
        </ContentSection>

        {/* EDUCATION & SKILLS SECTION - RESTRUCTURED */}
        <ContentSection id="education" title="Expertise" isDark={false}>
           <div className="space-y-8">
             
             {/* 1. Primary Focus: Skills (Top, Full Width, Emphasized) */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillGroups.map((group, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                    <div className="mb-4 pb-3 border-b border-slate-50">
                        <h4 className="text-lg font-black text-[#0a2540] tracking-tight group-hover:text-indigo-600 transition-colors">{group.category}</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                      {group.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2.5 text-slate-600 font-bold text-sm tracking-wide">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:bg-indigo-600 group-hover:scale-125 transition-all shrink-0"></div>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
             </div>

             {/* 2. Secondary Focus: Education & Publications (Bottom, Compact, Consistent Style) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Education Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-center shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                   <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">Education History</h3>
                   <div className="space-y-6">
                      <div className="flex flex-col gap-1">
                         <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-base font-bold text-[#0a2540]">Wuhan University</h4>
                            <span className="text-xs text-slate-400 font-mono font-medium">2016—2019</span>
                         </div>
                         <p className="text-sm font-medium text-slate-500">Master in Marketing <span className="text-indigo-500 font-bold ml-1">• GPA 3.80</span></p>
                      </div>
                      <div className="w-full h-px bg-slate-50"></div>
                      <div className="flex flex-col gap-1">
                         <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-base font-bold text-[#0a2540]">Lanzhou University</h4>
                            <span className="text-xs text-slate-400 font-mono font-medium">2012—2016</span>
                         </div>
                         <p className="text-sm font-medium text-slate-500">Bachelor in Marketing <span className="text-indigo-500 font-bold ml-1">• GPA 3.55</span></p>
                      </div>
                   </div>
                </div>

                {/* Publication Card - Redesigned to match aesthetic */}
                <a href="https://www.cnki.net/KCMS/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2019&filename=GGYY201910011&uniplatform=OVERSEA" target="_blank" className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all flex flex-col justify-center relative overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                   {/* Background Decor */}
                   <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                      <svg className="w-32 h-32 text-indigo-900" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                   </div>
                   
                   <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">Selected Publication</h3>
                   
                   <div className="relative z-10">
                      <h4 className="text-base font-bold text-[#0a2540] leading-snug mb-3 group-hover:text-indigo-600 transition-colors">
                        "Gain" and "Loss" of Graphic and Textual Advertising in Social Media
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Journal</span>
                        <span className="text-xs">China Industrial Economics (CIE)</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
                            Cited 50+ times
                         </div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-indigo-400"></span>
                            Downloaded 4,000+ times
                         </div>
                      </div>
                   </div>
                </a>
             </div>
           </div>
        </ContentSection>

        {/* CONTACT SECTION */}
        {/* Updated: 
            1. Layout: Significantly reduced top padding for mobile (pt-32) to prevent text from being pushed too far down.
            2. Reordering: Moved the "Currently based in" badge ABOVE the headline for better vertical flow on mobile.
            3. Structure: Used flex-col with better gap management to fill space evenly.
            4. Text Refinement: 'something world-class' is kept together with nowrap to prevent orphan words on mobile.
        */}
        <section id="contact" className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-white via-[#f0f4f8] to-[#dbe4ff] relative overflow-hidden pt-32 md:pt-40 pb-20">
           
           {/* Background Decorations */}
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
           <div className="absolute -left-20 top-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl mix-blend-multiply animate-pulse-slow"></div>
           <div className="absolute -right-20 bottom-1/3 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl mix-blend-multiply animate-pulse-slow animation-delay-2000"></div>
           
           <div className="relative z-20 max-w-4xl w-full flex flex-col items-center mt-4 md:mt-0">
              
              {/* Badge moved to top as an eyebrow */}
              <div className="mb-6 flex justify-center w-full px-4 animate-fade-in delay-100">
                 <div className="group flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-default">
                    <div className="relative flex h-3 w-3 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </div>
                    <span className="text-xs md:text-sm font-bold text-slate-600 tracking-wide group-hover:text-indigo-600 transition-colors uppercase whitespace-nowrap">
                      Currently based in Santa Clara, CA
                    </span>
                 </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-[#0a2540] mb-8 tracking-tight drop-shadow-sm leading-tight md:leading-tight">
                Let's build <span className="inline-block">something <span className="text-indigo-600 whitespace-nowrap">world-class.</span></span>
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md sm:max-w-none">
                 <FireworkButton href="mailto:0124gmm@gmail.com" text="Email Me" />
                 <FireworkButton href="https://www.linkedin.com/in/meimei-gu-68778a26a" text="LinkedIn Profile" />
              </div>
           </div>
           
           <footer className="absolute bottom-6 w-full flex justify-center px-4">
             <SignatureBadge />
           </footer>
        </section>

      </main>
    </div>
  );
};

export default App;