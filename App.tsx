import React, { useState, useEffect, useRef } from 'react';
import ContentSection from './components/ContentSection';
import { SectionType } from './types';

// Helper component for buttons with firework/sparkle effects
const FireworkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,209,255,0.3)] flex items-center justify-center overflow-visible bg-white text-[#07192f] border border-transparent hover:bg-[#00d1ff] hover:text-white w-full sm:w-auto"
    >
      <span className="relative z-10">{text}</span>
      
      {/* Sparkle Particles - Added z-20 to bring them in front of the button text and background */}
      <span className="absolute z-20 top-1/2 left-1/2 w-2 h-2 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-8 group-hover:-translate-x-6 bg-[#00d1ff]" />
      <span className="absolute z-20 top-1/2 left-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-8 group-hover:translate-x-6 delay-75 bg-white" />
      <span className="absolute z-20 top-1/2 left-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-8 group-hover:translate-x-2 delay-100 bg-[#ff0000]" />
      <span className="absolute z-20 top-1/2 left-1/2 w-1 h-1 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 group-hover:-translate-x-10 delay-50 bg-[#00d1ff]" />
      <span className="absolute z-20 top-1/2 left-1/2 w-2 h-2 rounded-full transition-all duration-500 ease-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 group-hover:translate-x-10 delay-50 bg-white" />
    </a>
  );
};

// Simplified Signature Badge Component
const SignatureBadge = () => (
  <div className="px-4 py-2 md:px-5 md:py-2.5 bg-[#112240] border border-slate-700/50 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-[8px] sm:text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase cursor-default whitespace-nowrap">
    Designed by Meimei • Implemented by Gemini AI Studio
  </div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  
  // Separate hover states for Hero and Contact texts
  const [isHeroTextHovered, setIsHeroTextHovered] = useState(false);
  const [isContactTextHovered, setIsContactTextHovered] = useState(false);
  
  // Separate refs for the Vanta instances
  const vantaHeroRef = useRef<HTMLDivElement>(null);
  const vantaContactRef = useRef<HTMLDivElement>(null);

  const sections: { id: SectionType; title: string }[] = [
    { id: 'hero', title: 'Home' },
    { id: 'work', title: 'Work' }, 
    { id: 'education', title: 'Expertise' }, 
    { id: 'contact', title: 'Contact' },
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
      brandGradient: "bg-gradient-to-r from-[#335eea] to-[#45aaf2]", 
      brandText: "text-[#45aaf2]"
    },
    {
      project: "Global Marketplace Scaling",
      company: "Poizon Global",
      industry: "E-COMMERCE PLATFORM",
      role: "Platform Product Manager",
      timeline: "2023 — 2025",
      url: "https://www.poizon.com/authentication/home?&re_source=1",
      desc: "Architected a cross-border data processing platform and scalable infrastructure to drive global import GMV.",
      brandGradient: "bg-gradient-to-r from-[#00bba4] to-[#00d0bc]",
      brandText: "text-[#00d0bc]"
    },
    {
      project: "Merchant Risk Infrastructure",
      company: "ByteDance",
      industry: "GLOBAL TECH",
      role: "Platform Product Manager",
      timeline: "2021 — 2023",
      url: "https://www.bytedance.com",
      desc: "Designed transaction throttling models and managed end-to-end deposit systems for 5M+ merchants.",
      brandGradient: "bg-gradient-to-r from-[#335eea] to-[#45aaf2]", 
      brandText: "text-[#45aaf2]"
    },
    {
      project: "Platform Trust & Safety",
      company: "Pinduoduo",
      industry: "SOCIAL E-COMMERCE",
      role: "Trust Product Manager",
      timeline: "2019 — 2021",
      url: "https://m.pinduoduo.com/en/",
      desc: "Championed Pinduoduo's anti-counterfeiting initiative and successfully safeguarding marketplace integrity for millions of consumers.",
      brandGradient: "bg-gradient-to-r from-[#e02e24] to-[#ff5d5d]",
      brandText: "text-[#ff5d5d]"
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

  // Localized Vanta Background Logic (For both Hero and Contact)
  useEffect(() => {
    let vantaHeroEffectInstance: any = null;
    let vantaContactEffectInstance: any = null;
    
    const vantaConfig = {
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: 0x07192f,
      color1: 0xff0000,
      color2: 0x00d1ff,
      colorMode: "varianceGradient",
      quantity: 4.00,
      birdSize: 1.50,
      wingSpan: 30.00,
      speedLimit: 5.00,
      separation: 50.00,
      alignment: 20.00,
      cohesion: 20.00
    };

    const initVanta = () => {
      if ((window as any).VANTA) {
        if (!vantaHeroEffectInstance && vantaHeroRef.current) {
          vantaHeroEffectInstance = (window as any).VANTA.BIRDS({
            el: vantaHeroRef.current,
            ...vantaConfig
          });
        }
        if (!vantaContactEffectInstance && vantaContactRef.current) {
          vantaContactEffectInstance = (window as any).VANTA.BIRDS({
            el: vantaContactRef.current,
            ...vantaConfig
          });
        }
      }
    };

    const checkVanta = setInterval(() => {
      if ((window as any).VANTA) {
        initVanta();
        clearInterval(checkVanta);
      }
    }, 100);

    return () => {
      clearInterval(checkVanta);
      if (vantaHeroEffectInstance) vantaHeroEffectInstance.destroy();
      if (vantaContactEffectInstance) vantaContactEffectInstance.destroy();
    };
  }, []);

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
  
  return (
    <div className="bg-[#07192f] transition-colors duration-700 min-h-screen font-sans antialiased text-slate-200">
      
      {/* Navigation - Dark Glassmorphism */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]">
        <div className="bg-[#112240]/90 backdrop-blur-md px-2 py-1.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-slate-700/50 flex items-center gap-1 transition-all">
          {sections.map((s) => (
            <button 
              key={s.id} 
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })} 
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${activeSection === s.id ? 'bg-white text-[#07192f] shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col items-center relative overflow-hidden px-6 pt-24 pb-8">
          
          <div className="flex-1 w-full max-w-[90rem] z-10 animate-fade-in flex flex-col justify-center items-center text-center pointer-events-none">
            
            {/* Interactive Text Container (Touch & Mouse Support) */}
            <div 
              className="relative group pointer-events-auto cursor-pointer md:cursor-default flex flex-col items-center justify-center py-8 px-12"
              onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setIsHeroTextHovered(true); }}
              onMouseLeave={() => { if (window.matchMedia('(hover: hover)').matches) setIsHeroTextHovered(false); }}
              onClick={() => { if (window.matchMedia('(hover: none)').matches) setIsHeroTextHovered(!isHeroTextHovered); }}
            >
              
              {/* Localized Canvas 2D Effect - Fades in on hover and masked around the text */}
              <div 
                ref={vantaHeroRef} 
                className={`absolute inset-[-100px] md:inset-[-200px] z-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${isHeroTextHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
                  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)'
                }}
              ></div>

              <h1 className="relative z-10 font-black text-white leading-[0.9] tracking-tighter flex flex-col items-center select-none drop-shadow-2xl transition-transform duration-700 group-hover:scale-105">
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-4 transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-slate-300">I'M</span>
                <span className="text-[18vw] sm:text-[16vw] md:text-[15vw] leading-[0.85] tracking-tight text-white drop-shadow-xl transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00d1ff]">MEIMEI</span>
              </h1>
            </div>

            <div className="mt-8 md:mt-12 space-y-4 max-w-4xl relative z-10">
              <h2 className="text-base sm:text-lg md:text-2xl font-black text-slate-100 tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-lg">
                Product Manager
              </h2>
              <p className="text-[10px] sm:text-xs font-bold text-[#00d1ff] tracking-[0.15em] uppercase drop-shadow-md">
                6 YEARS SCALING MARKETPLACES <span className="text-white mx-2">•</span> DATA-DRIVEN STRATEGY <span className="text-white mx-2">•</span> AI PRACTITIONER
              </p>
            </div>
          </div>
          
          {/* Signature Badge - Document Flow ensures no overlap */}
          <div className="w-full flex justify-center px-4 relative z-30 mt-8">
             <SignatureBadge />
          </div>
        </section>

        {/* WORK SECTION */}
        <ContentSection id="work" title="Work">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {workItems.map((item, i) => (
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={i} 
                className={`group relative block bg-[#112240] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(0,209,255,0.2)] transition-all duration-700 ease-out border border-slate-700 hover:border-[#00d1ff]/50 hover:bg-[#162b4f] hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full ${visibleSections['work'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Decorative Color Strip - Color Coded by Company Brand */}
                <div className="relative">
                  <div className={`h-14 relative overflow-hidden flex items-center justify-between px-6 ${item.brandGradient}`}>
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors z-0" />
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)', backgroundSize: '10px 10px'}}></div>

                    <span className="relative z-10 text-[10px] font-black text-white tracking-[0.2em] uppercase border border-white/30 px-2 py-1 rounded backdrop-blur-sm">
                      {item.industry}
                    </span>
                    
                    <span className="relative z-10 text-white/90 font-mono text-[10px] md:text-xs font-bold tracking-tight">
                      {item.timeline}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 px-6 pb-8 pt-6 flex flex-col">
                   <div className="mb-4">
                     <div className="flex flex-col items-start mb-2">
                         <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter transition-colors mb-2 leading-none group-hover:opacity-90">
                            <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300" style={{ '--hover-color': item.brandText.match(/\[(.*?)\]/)?.[1] || '#00d1ff' } as React.CSSProperties}>{item.company}</span>
                         </h3>
                         <span className={`text-xs font-bold uppercase tracking-widest ${item.brandText}`}>
                           {item.role}
                         </span>
                     </div>
                     <h4 className="text-base font-bold text-slate-200 leading-snug mt-2">{item.project}</h4>
                   </div>
                   <p className="text-slate-400 text-sm leading-relaxed mt-auto border-t border-slate-700/50 pt-4">
                     {item.desc}
                   </p>
                </div>
              </a>
            ))}
          </div>
        </ContentSection>

        {/* EXPERTISE SECTION */}
        <ContentSection id="education" title="Expertise">
           <div className="space-y-8">
             
             {/* Skills Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillGroups.map((group, idx) => (
                  <div key={idx} className="bg-[#112240] p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-slate-700 hover:border-[#00d1ff]/50 hover:shadow-[0_8px_30px_rgba(0,209,255,0.2)] hover:bg-[#162b4f] transition-all duration-300 h-full flex flex-col group">
                    <div className="mb-4 pb-3 border-b border-slate-700/50">
                        <h4 className="text-lg font-black text-white tracking-tight group-hover:text-[#00d1ff] transition-colors">{group.category}</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                      {group.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2.5 text-slate-300 font-bold text-sm tracking-wide">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00d1ff] group-hover:scale-125 group-hover:shadow-[0_0_8px_#00d1ff] transition-all shrink-0"></div>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
             </div>

             {/* Education & Publications */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Education Card */}
                <div className="bg-[#112240] p-6 rounded-2xl border border-slate-700 flex flex-col justify-center shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-slate-500 hover:bg-[#162b4f] transition-all">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Education History</h3>
                   <div className="space-y-6">
                      <div className="flex flex-col gap-1">
                         <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-base font-bold text-white">Wuhan University</h4>
                            <span className="text-xs text-slate-400 font-mono font-medium">2016—2019</span>
                         </div>
                         <p className="text-sm font-medium text-slate-400">Master in Marketing <span className="text-[#00d1ff] font-bold ml-1">• GPA 3.80</span></p>
                      </div>
                      <div className="w-full h-px bg-slate-700/50"></div>
                      <div className="flex flex-col gap-1">
                         <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-base font-bold text-white">Lanzhou University</h4>
                            <span className="text-xs text-slate-400 font-mono font-medium">2012—2016</span>
                         </div>
                         <p className="text-sm font-medium text-slate-400">Bachelor in Marketing <span className="text-[#00d1ff] font-bold ml-1">• GPA 3.55</span></p>
                      </div>
                   </div>
                </div>

                {/* Publication Card */}
                <a href="https://www.cnki.net/KCMS/detail/detail.aspx?dbcode=CJFD&dbname=CJFDLAST2019&filename=GGYY201910011&uniplatform=OVERSEA" target="_blank" className="group bg-[#112240] p-6 rounded-2xl border border-slate-700 hover:border-[#00d1ff]/50 hover:shadow-[0_8px_30px_rgba(0,209,255,0.2)] hover:bg-[#162b4f] transition-all flex flex-col justify-center relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                   {/* Background Decor */}
                   <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                      <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                   </div>
                   
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Selected Publication</h3>
                   
                   <div className="relative z-10">
                      <h4 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-[#00d1ff] transition-colors">
                        "Gain" and "Loss" of Graphic and Textual Advertising in Social Media
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                        <span className="bg-[#00d1ff]/20 text-[#00d1ff] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-[#00d1ff]/30">Journal</span>
                        <span className="text-xs">China Industrial Economics (CIE)</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-200 transition-colors">
                            Cited 50+ times
                         </div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-200 transition-colors flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-slate-500 group-hover:bg-[#00d1ff]"></span>
                            Downloaded 4,000+ times
                         </div>
                      </div>
                   </div>
                </a>
             </div>
           </div>
        </ContentSection>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen flex flex-col items-center px-6 text-center relative overflow-hidden pt-24 md:pt-32 pb-8">
           
           <div className="flex-1 w-full max-w-[90rem] z-20 flex flex-col justify-center items-center">

              {/* Interactive Contact Text Container (Touch & Mouse Support) */}
              <div 
                className="relative group/contact pointer-events-auto cursor-pointer md:cursor-default flex flex-col items-center justify-center py-8 px-4 sm:px-12 mb-8"
                onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setIsContactTextHovered(true); }}
                onMouseLeave={() => { if (window.matchMedia('(hover: hover)').matches) setIsContactTextHovered(false); }}
                onClick={() => { if (window.matchMedia('(hover: none)').matches) setIsContactTextHovered(!isContactTextHovered); }}
              >
                {/* Localized Canvas 2D Effect - Fades in on hover and masked around the text */}
                <div 
                  ref={vantaContactRef} 
                  className={`absolute inset-[-100px] md:inset-[-200px] z-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${isContactTextHovered ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
                    maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)'
                  }}
                ></div>

                <h2 className="relative z-10 text-center font-black text-white leading-[1.1] md:leading-[1.1] tracking-tighter flex flex-col items-center select-none drop-shadow-2xl transition-transform duration-700 group-hover/contact:scale-105">
                  <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-1 md:mb-2 transition-colors duration-500 group-hover/contact:text-transparent group-hover/contact:bg-clip-text group-hover/contact:bg-gradient-to-b group-hover/contact:from-white group-hover/contact:to-slate-300">
                    Let's build
                  </span>
                  <span className="whitespace-nowrap text-[8.5vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#00d1ff] drop-shadow-xl transition-colors duration-500 group-hover/contact:text-transparent group-hover/contact:bg-clip-text group-hover/contact:bg-gradient-to-r group-hover/contact:from-white group-hover/contact:to-[#00d1ff]">
                    something together.
                  </span>
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md sm:max-w-none relative z-20">
                 <FireworkButton href="mailto:0124gmm@gmail.com" text="Email Me" />
                 <FireworkButton href="https://www.linkedin.com/in/meimei-gu-68778a26a" text="LinkedIn Profile" />
              </div>
           </div>
           
           {/* Document Flow ensures no overlap */}
           <footer className="w-full flex justify-center px-4 relative z-30 mt-12 md:mt-16">
             <SignatureBadge />
           </footer>
        </section>

      </main>
    </div>
  );
};

export default App;