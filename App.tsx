
import React, { useState, useEffect, useRef } from 'react';
import InteractiveMascot from './components/InteractiveMascot';
import ContentSection from './components/ContentSection';
import { SectionType } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<'email' | 'linkedin' | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sections: { id: SectionType; title: string; color: string }[] = [
    { id: 'hero', title: 'Home', color: 'bg-[#FF9494]' }, // Coral Pink
    { id: 'work', title: 'Work', color: 'bg-[#89E0D0]' }, // Mint Teal
    { id: 'education', title: 'Edu & Skills', color: 'bg-[#C7A9F5]' }, // Soft Purple
    { id: 'contact', title: 'Contact', color: 'bg-[#FFD36E]' }, // Golden Yellow
  ];

  const workItems = [
    {
      title: "Merchant Growth Strategy",
      category: "ByteDance | Strategy PM",
      url: "https://www.bytedance.com",
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop",
      desc: "Engineered a dynamic goal-setting engine and intelligent notification system for 3M+ merchants on Douyin E-commerce."
    },
    {
      title: "Global Marketplace Scaling",
      category: "Poizon Global | Platform PM",
      url: "https://www.poizon.com/authentication/home?&re_source=1",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
      desc: "Architected a cross-border data processing platform and scalable infrastructure to drive global import GMV."
    },
    {
      title: "Merchant Risk Infrastructure",
      category: "ByteDance | Platform PM",
      url: "https://www.bytedance.com",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      desc: "Designed transaction throttling models and managed end-to-end deposit systems for 5M+ merchants."
    },
    {
      title: "Platform Trust & Safety",
      category: "Pinduoduo | Trust PM",
      url: "https://m.pinduoduo.com/en/",
      image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop",
      desc: "Orchestrated large-scale merchant governance frameworks and rigorous quality-control workflows to eliminate counterfeit listings and uphold marketplace integrity."
    }
  ];

  const skillGroups = [
    {
      category: "Technical Skills",
      skills: ["SQL (Proficient)", "A/B Testing", "Data Analysis"]
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
    return () => window.removeEventListener('scroll', handleScroll);
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

  const activeColor = sections.find(s => s.id === activeSection)?.color || 'bg-[#FF9494]';

  const getMascotContainerClasses = () => {
    if (isPartyMode) return 'items-end justify-end p-[5%]';
    switch (activeSection) {
      case 'hero': return 'items-end justify-end p-[1%] sm:p-[2%] md:p-[1%]'; 
      case 'work': return 'items-start justify-end p-[8%] lg:p-[4%]'; 
      case 'education': return 'items-start justify-start p-[8%] lg:p-[4%]'; 
      case 'contact':
        if (hoveredContact === 'email') return 'items-center justify-end pr-[5%] md:pr-[22%] lg:pr-[25%]'; 
        if (hoveredContact === 'linkedin') return 'items-center justify-start pl-[5%] md:pl-[22%] lg:pl-[25%]'; 
        return 'items-center justify-center';
      default: return 'items-center justify-center';
    }
  };

  const getMascotTransformClasses = () => {
    let base = "pointer-events-auto h-[140px] w-[140px] sm:h-[180px] sm:w-[180px] md:h-[260px] md:w-[260px] lg:h-[320px] lg:w-[320px] transition-all duration-1000 transform ";
    if (isPartyMode) return base + "scale-75 rotate-6";
    if (activeSection === 'hero') return base + "scale-[0.35] sm:scale-60 md:scale-80 lg:scale-95 translate-x-2 translate-y-2";
    if (activeSection === 'work' || activeSection === 'education') return base + "scale-[0.4] sm:scale-[0.5] opacity-10 md:opacity-20 grayscale-[0.3] -translate-y-12";
    if (activeSection === 'contact') {
      if (hoveredContact) return base + "scale-80 md:scale-90 rotate-12";
      return base + "scale-90 md:scale-100";
    }
    return base;
  };

  const getContactBtnStyle = (type: 'email' | 'linkedin') => {
    const isThisHovered = hoveredContact === type;
    const isOtherHovered = hoveredContact !== null && hoveredContact !== type;
    
    let baseClass = "w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] h-[80px] md:h-[150px] rounded-[2rem] md:rounded-[4rem] flex items-center justify-center text-base md:text-2xl font-black uppercase tracking-widest transition-all duration-500 border ";
    const shadowClass = isThisHovered ? "shadow-[0_20px_60px_rgba(255,255,255,0.6)]" : "shadow-[0_10px_30px_rgba(255,255,255,0.2)]";
    if (isThisHovered) return baseClass + `scale-105 bg-white text-black border-white z-20 ${shadowClass}`;
    if (isOtherHovered) return baseClass + "scale-[0.9] bg-white/10 text-black/10 border-white/5 z-10 blur-[1.5px]";
    return baseClass + `bg-white/70 backdrop-blur-2xl text-black border-white/40 hover:bg-white hover:text-black hover:border-white ${shadowClass}`;
  };

  const SignatureBadge = () => (
    <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-50 flex flex-col items-end gap-3 pointer-events-none select-none group">
      <div className="flex flex-col items-end gap-1">
        <div className="px-4 py-2 bg-black text-white rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-2xl transition-all group-hover:-translate-y-1">
          Designed by <span className="text-[#FF9494]">Meimei</span>
        </div>
        <div className="px-4 py-2 bg-white text-black rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-xl border border-black/5 transition-all group-hover:-translate-y-0.5 delay-75">
          Implemented by <span className="text-black/40">Gemini AI Studio</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`transition-all duration-1000 ease-in-out min-h-screen ${isPartyMode ? 'animate-rainbow' : activeColor}`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="confetti-particle animate-confetti" style={{ backgroundColor: ['#000', '#fff'][i % 2], '--tw-translate-x': `${(Math.random()-0.5)*1000}px`, '--tw-translate-y': `${(Math.random()-0.5)*1000}px`, '--tw-rotate': `${Math.random()*720}deg` } as any} />
          ))}
        </div>
      )}

      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] bg-white/50 rounded-full blur-[140px] animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-15%] w-[70%] h-[70%] bg-white/30 rounded-full blur-[180px] animate-blob animation-delay-2000"></div>
      </div>

      <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 bg-white/25 backdrop-blur-3xl px-3 md:px-4 py-2 rounded-full border border-black/5 flex items-center gap-1 md:gap-2 transition-all shadow-xl max-w-[95vw]">
        {sections.map((s) => (
          <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })} className={`px-2 md:px-4 py-1.5 rounded-full text-[8px] md:text-xs font-black uppercase tracking-widest transition-all ${activeSection === s.id ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}>
            {s.title}
          </button>
        ))}
        <div className="w-[1px] h-4 bg-black/10 mx-1 md:mx-2"></div>
        <button onClick={toggleMusic} className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 rounded-full transition-all bg-black/5 hover:bg-black/10 border border-black/5 group">
          <svg className={`w-3 md:w-3.5 h-3 md:h-3.5 transition-all duration-300 ${isPartyMode ? 'text-black scale-110' : 'text-black/40 scale-100'}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <div className={`w-6 md:w-8 h-3.5 md:h-4 rounded-full relative transition-colors duration-300 ${isPartyMode ? 'bg-black' : 'bg-black/20'}`}>
             <div className={`absolute top-0.5 w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-white shadow-sm transition-all duration-300 ${isPartyMode ? 'left-3 md:left-4' : 'left-0.5 md:left-1'}`}></div>
          </div>
        </button>
      </nav>

      <div className={`fixed inset-0 pointer-events-none z-10 flex transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${getMascotContainerClasses()}`}>
        <div className={getMascotTransformClasses()}>
          <InteractiveMascot 
            mood={isPartyMode ? 'dancing' : activeSection === 'hero' ? 'happy' : hoveredContact ? 'curious' : 'happy'} 
            isPartyMode={isPartyMode} 
            audioRef={audioRef}
          />
        </div>
      </div>

      <main className="relative z-20">
        <div id="hero" className="h-[100svh] flex items-center justify-center px-6 text-center relative overflow-hidden">
          <div className="max-w-5xl relative z-20">
            <h1 className="text-5xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-white leading-none tracking-tighter select-none">
              I'M MEIMEI.
            </h1>
            <div className="mt-8 md:mt-12 flex flex-col items-center animate-float">
              <div className="h-[2px] w-12 md:w-20 bg-black/20 mb-6 md:mb-8 opacity-50"></div>
              <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-black/80 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] relative inline-block group px-4">
                Ecommerce Product Manager
                <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-[2px] md:h-[3px] bg-black/10 scale-x-75 group-hover:scale-x-100 transition-transform duration-700"></span>
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-2 md:gap-6">
                <span className="text-black/60 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-xs">
                  6 YEARS OF SCALING PRODUCTS
                </span>
                <span className="hidden sm:block w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-black/20 animate-subtle-pulse"></span>
                <span className="text-black/60 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-xs">
                  DRIVING GLOBAL GROWTH
                </span>
              </div>
            </div>
          </div>
          <SignatureBadge />
        </div>

        <ContentSection id="work" title="Work">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-14">
            {workItems.map((item, i) => (
              <div key={i} className="group relative bg-white/60 backdrop-blur-2xl aspect-[16/10] rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-black/5 shadow-2xl transition-all duration-700 hover:-translate-y-2 md:hover:-translate-y-3">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-all duration-1000 scale-110 group-hover:scale-100" />
                <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-block self-start mb-2 md:mb-4">
                    <span className="text-black/40 font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] group-hover:text-black transition-colors duration-500 underline decoration-black/10 hover:decoration-black/40 underline-offset-4">
                      {item.category}
                    </span>
                  </a>
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 mb-2 md:mb-3 tracking-tight leading-none">{item.title}</h3>
                  <p className="text-slate-700 font-bold text-[12px] sm:text-sm md:text-base leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0 transform transition-transform hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection id="education" title="Profile & Mastery">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-start">
            <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white/40 p-6 md:p-10 shadow-xl space-y-6 md:space-y-8 h-full transition-transform hover:-translate-y-2 duration-500">
              <h3 className="text-[10px] md:text-xs font-black text-black/30 uppercase tracking-[0.3em]">Education</h3>
              <div className="space-y-6 md:space-y-8">
                <div className="relative pl-6 border-l-2 border-black/10">
                  <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-black/20"></div>
                  <span className="block text-[8px] md:text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Master in Marketing | GPA 3.80</span>
                  <a href="https://www.whu.edu.cn/" target="_blank" rel="noopener noreferrer" className="group/edu">
                    <h4 className="text-lg md:text-xl font-black text-black leading-tight group-hover/edu:text-black/60 transition-colors">
                      Wuhan University
                      <span className="inline-block ml-1 opacity-0 group-hover/edu:opacity-100 transition-opacity text-xs align-top">↗</span>
                    </h4>
                  </a>
                  <p className="text-black/40 font-bold text-[8px] md:text-[10px] uppercase mt-1">2016 - 2019</p>
                </div>
                <div className="relative pl-6 border-l-2 border-black/10">
                  <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-black/20"></div>
                  <span className="block text-[8px] md:text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Bachelor in Marketing | GPA 3.55</span>
                  <a href="https://www.lzu.edu.cn/" target="_blank" rel="noopener noreferrer" className="group/edu">
                    <h4 className="text-lg md:text-xl font-black text-black leading-tight group-hover/edu:text-black/60 transition-colors">
                      Lanzhou University
                      <span className="inline-block ml-1 opacity-0 group-hover/edu:opacity-100 transition-opacity text-xs align-top">↗</span>
                    </h4>
                  </a>
                  <p className="text-black/40 font-bold text-[8px] md:text-[10px] uppercase mt-1">2012 - 2016</p>
                </div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white/40 p-6 md:p-10 shadow-xl space-y-6 md:space-y-8 h-full transition-transform hover:-translate-y-2 duration-500">
              <h3 className="text-[10px] md:text-xs font-black text-black/30 uppercase tracking-[0.3em]">Academic Publication</h3>
              <div className="space-y-5 md:space-y-6">
                <a 
                  href="https://www.cnki.net/KCMS/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2019&filename=GGYY201910011&uniplatform=OVERSEA&v=KZLB3_urHJDQK4ggahOt4b-IaXbUWoKgF9lmxzcwseum_TA_7pO-lBTFCeOfAYVe" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block group/pub"
                >
                  <p className="text-black/70 text-sm md:text-base font-bold leading-relaxed italic mb-3 group-hover/pub:text-black transition-colors decoration-black/10 group-hover/pub:decoration-black underline underline-offset-4">
                    "Gain" and "Loss" of Graphic and Textual Advertising in Social Media: Business Image vs. Product Attitude
                  </p>
                  <div className="p-4 rounded-2xl bg-black/5 border border-black/5 group-hover/pub:bg-black/10 transition-all">
                    <p className="text-[9px] md:text-[10px] text-black/50 font-black uppercase tracking-widest leading-normal mb-1">
                      China Industrial Economics (CIE) • Published Oct 2019 • Top 2 Journal of CASS
                    </p>
                    <p className="text-[9px] md:text-[10px] text-black font-black uppercase tracking-widest border-t border-black/10 pt-2 mt-2">
                      To date, it has been downloaded over 4,000 times and cited over 50 times.
                    </p>
                  </div>
                </a>
                <p className="text-black/40 text-[10px] md:text-[11px] font-medium leading-relaxed">
                  Researching the intersection of behavioral economics and social commerce strategy.
                </p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white/40 p-6 md:p-10 shadow-xl space-y-8 md:space-y-10 h-full transition-transform hover:-translate-y-2 duration-500 md:col-span-2 lg:col-span-1">
              <h3 className="text-[10px] md:text-xs font-black text-black/30 uppercase tracking-[0.3em]">Mastery & Skills</h3>
              {skillGroups.map((group, idx) => (
                <div key={idx} className="space-y-3 md:space-y-4">
                  <h4 className="text-[8px] md:text-[10px] font-black text-black/20 uppercase tracking-[0.2em]">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-black/5 border border-black/5 text-black/70 text-[10px] md:text-[11px] font-black transition-all hover:bg-black hover:text-white cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </ContentSection>

        <div id="contact" className="h-[100svh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
          <div className="relative z-30 flex flex-col items-center max-w-6xl w-full">
            <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black text-white mb-10 md:mb-20 tracking-tighter select-none">
              LET'S CONNECT.
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-4xl px-4">
              <a 
                href="mailto:0124gmm@gmail.com" 
                onMouseEnter={() => setHoveredContact('email')} 
                onMouseLeave={() => setHoveredContact(null)} 
                className={getContactBtnStyle('email')}
              >
                <span>Direct Mail</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/meimei-gu-68778a26a" 
                target="_blank" 
                rel="noopener noreferrer" 
                onMouseEnter={() => setHoveredContact('linkedin')} 
                onMouseLeave={() => setHoveredContact(null)} 
                className={getContactBtnStyle('linkedin')}
              >
                <span>LinkedIn</span>
              </a>
            </div>
            <p className="mt-10 md:mt-20 text-black/40 font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-[8px] md:text-[10px] animate-pulse">BASED IN SANTA CLARA, CA</p>
          </div>
          <SignatureBadge />
        </div>
      </main>
    </div>
  );
};

export default App;
