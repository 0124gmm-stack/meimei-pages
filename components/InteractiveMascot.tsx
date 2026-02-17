import React, { useState, useEffect, useRef } from 'react';

interface Props {
  mood: 'happy' | 'thinking' | 'dancing' | 'curious';
  isPartyMode?: boolean;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  showHint?: boolean;
  message?: string;
}

const InteractiveMascot: React.FC<Props> = ({ mood, isPartyMode = false, audioRef, showHint = false, message = "Hi there!" }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isSquished, setIsSquished] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [beatIntensity, setBeatIntensity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showBubbleForce, setShowBubbleForce] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Refs for Audio Analysis
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);

  // Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 30;
      const y = (e.clientY - innerHeight / 2) / 30;
      setRotation({ x: -y, y: x });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Blinking Logic
  useEffect(() => {
    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      setTimeout(blinkLoop, Math.random() * 3000 + 2000);
    };
    const timer = setTimeout(blinkLoop, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Audio Analysis Logic - Runs only in this component
  useEffect(() => {
    if (isPartyMode && audioRef?.current) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 64;
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      // Connect source only once
      if (!sourceRef.current) {
        try {
            sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
            sourceRef.current.connect(analyserRef.current!);
            analyserRef.current!.connect(audioContextRef.current.destination);
        } catch (e) {
            console.warn("Media source already connected or failed", e);
        }
      }

      const bufferLength = analyserRef.current!.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateBeat = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Use low frequencies for "kick" beat
        const lowFreqs = dataArray.slice(0, 4); 
        const avg = lowFreqs.reduce((a, b) => a + b) / lowFreqs.length;
        // Dampen the value to make movement smoother
        const normalized = avg / 255;
        setBeatIntensity(prev => prev + (normalized - prev) * 0.3);
        
        rafRef.current = requestAnimationFrame(updateBeat);
      };
      
      updateBeat();
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setBeatIntensity(0);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPartyMode, audioRef]);

  const handleClick = () => {
    // Show bubble on click
    setShowBubbleForce(true);
    setTimeout(() => setShowBubbleForce(false), 2000);

    if (!isPartyMode) {
      if (!clickAudioRef.current) {
        clickAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
        clickAudioRef.current.volume = 0.3;
      }
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});

      setIsSquished(true);
      setTimeout(() => setIsSquished(false), 150);
    }
  };

  const isDancing = mood === 'dancing';
  const isCurious = mood === 'curious';

  // Calculate visual styles based on local beat state
  const beatScale = isDancing ? 1 + (beatIntensity * 0.2) : 1;
  const beatSquish = isDancing ? (beatIntensity * 18) : 0;
  const eyeDilation = isDancing ? 1 + (beatIntensity * 0.45) : 1;
  const armSwing = isDancing ? beatIntensity * 40 : 0;

  // Eye blinking transform
  const eyeScaleY = isBlinking ? 0.1 : 1;
  
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      
      {/* Speech Bubble - Hover or Click */}
      {showHint && (isHovered || showBubbleForce) && !isPartyMode && (
        <div className="absolute right-[65%] top-0 mr-4 w-40 md:w-48 animate-fade-in pointer-events-auto z-50">
           <div className="bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-2xl rounded-tr-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white transform transition-transform hover:scale-105">
              <p className="text-xs md:text-sm font-bold text-[#0a2540] mb-1 leading-tight">{message}</p>
              
              {/* Conditional Subtitle for Hero Section */}
              {message.includes("Hi") && (
                <div className="flex items-center gap-2 text-indigo-500 font-semibold text-[10px] md:text-xs uppercase tracking-wider mt-1">
                  Scroll to explore 
                  <svg className="w-3 h-3 md:w-4 md:h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}

              {/* Conditional Subtitle for Contact Section - Matching Style */}
              {message.includes("Thanks") && (
                 <div className="flex items-center gap-2 text-indigo-500 font-semibold text-[10px] md:text-xs uppercase tracking-wider mt-1">
                   Let's connect
                 </div>
              )}
           </div>
        </div>
      )}

      <div 
        ref={containerRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ease-out cursor-pointer pointer-events-auto ${isSquished ? 'scale-90' : 'scale-100'}`}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x * 0.5}deg) rotateY(${rotation.y * 0.5}deg) scale(${beatScale})`,
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Shadow */}
          <ellipse 
            cx="100" 
            cy="185" 
            rx={60 + (isDancing ? beatIntensity * 25 : 0)} 
            ry={12} 
            fill="rgba(0,0,0,0.04)" 
            className="transition-all duration-75"
          />
          
          {/* Main Body */}
          <path 
            d={`M 50 ${60 + beatSquish} C 50 ${40 + beatSquish}, 150 ${40 + beatSquish}, 150 ${60 + beatSquish} L 150 140 C 150 160, 50 160, 50 140 Z`} 
            fill="white" 
            className="transition-all duration-75 ease-out"
            style={{ 
              transform: isCurious ? 'translateY(-15px)' : 'none'
            }}
          />
          
          {/* Face Group */}
          <g transform={`translate(${rotation.y * 0.9}, ${-rotation.x * 0.6 + (isDancing ? -beatIntensity * 15 : 0) + (isCurious ? -15 : 0)})`}>
            {/* Eyes */}
            <g transform={`translate(75, 85) scale(1, ${eyeScaleY})`}>
              <circle r={12 * eyeDilation} fill="#111" className="transition-all duration-75" />
              <circle cx="-5" cy="-5" r="4.5" fill="white" />
            </g>
            <g transform={`translate(125, 85) scale(1, ${eyeScaleY})`}>
              <circle r={12 * eyeDilation} fill="#111" className="transition-all duration-75" />
              <circle cx="-5" cy="-5" r="4.5" fill="white" />
            </g>
            
            <circle cx="60" cy="104" r="7" fill="#ffb7b7" opacity="0.9" />
            <circle cx="140" cy="104" r="7" fill="#ffb7b7" opacity="0.9" />

            {/* Mouth */}
            {isDancing || mood === 'happy' ? (
               <path 
                d={`M 82 ${115 + beatIntensity * 4} Q 100 ${138 + beatIntensity * 12} 118 ${115 + beatIntensity * 4}`} 
                fill="transparent" 
                stroke="#111" 
                strokeWidth="6" 
                strokeLinecap="round" 
                className="transition-all duration-75"
              />
            ) : isCurious ? (
              <circle cx="100" cy="115" r="8" fill="#111" />
            ) : (
              <path d="M 88 122 Q 100 115 112 122" fill="transparent" stroke="#111" strokeWidth="5" strokeLinecap="round" />
            )}
          </g>

          {/* Arms */}
          <path 
            d={`M 50 100 Q ${isDancing ? -25 - armSwing : (isCurious ? '10 30' : '25 120')} ${isDancing ? 40 - armSwing * 0.5 : (isCurious ? '15 45' : '25 140')}`} 
            fill="transparent" stroke="white" strokeWidth="18" strokeLinecap="round" 
            className="transition-all duration-100"
          />
          <path 
            d={`M 150 100 Q ${isDancing ? 225 + armSwing : (isCurious ? '190 30' : '175 120')} ${isDancing ? 40 - armSwing * 0.5 : (isCurious ? '185 45' : '175 140')}`} 
            fill="transparent" stroke="white" strokeWidth="18" strokeLinecap="round"
            className="transition-all duration-100"
          />
        </svg>
        
        {/* Beat Particles */}
        {isDancing && beatIntensity > 0.6 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-6 h-6 bg-white/30 rounded-full animate-ping"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDuration: '0.4s'
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMascot;