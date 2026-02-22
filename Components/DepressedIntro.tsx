"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Props {
  onEnter?: () => void;
}

const DarkIntro = ({ onEnter }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const [displayText, setDisplayText] = useState("");
  const [showEnter, setShowEnter] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isDarkPhase, setIsDarkPhase] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Dialog
  const gentleLines = [
    "Halo...",
    "Ini portofolioku.",
    "Tapi...",
  ];

  const darkLines = [
    "Di balik karya ini...",
    "Ada cerita yang tak terlihat.",
    "Kau tetap ingin masuk?"
  ];

  // Refs untuk tracking
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentPhaseRef = useRef<'gentle' | 'dark'>('gentle');
  const isActiveRef = useRef<boolean>(true);

  // Init audio
  const playTone = (type: 'gentle' | 'dark' | 'warning' | 'enter') => {
    if (!audioContext) return;
    
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      if (type === 'gentle') {
        osc.frequency.value = 440;
        gain.gain.value = 0.05;
        osc.start();
        osc.stop(audioContext.currentTime + 0.2);
      } else if (type === 'dark') {
        osc.frequency.value = 220;
        gain.gain.value = 0.1;
        osc.start();
        osc.stop(audioContext.currentTime + 0.3);
      } else if (type === 'warning') {
        osc.frequency.value = 110;
        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        osc.start();
        osc.stop(audioContext.currentTime + 0.5);
      } else if (type === 'enter') {
        osc.frequency.setValueAtTime(330, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 1);
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        osc.start();
        osc.stop(audioContext.currentTime + 1);
      }
    } catch (e) {
      console.log("Audio error:", e);
    }
  };

  // Reset semua state
  const resetAll = () => {
    // Matikan semua timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    
    // Reset refs
    isActiveRef.current = true;
    currentPhaseRef.current = 'gentle';
    
    // Reset states
    setIsDarkPhase(false);
    setShowWarning(false);
    setShowEnter(false);
  };

  // Start gentle phase
  const startGentlePhase = () => {
    resetAll();
    
    setDisplayText(gentleLines[0]);
    playTone('gentle');
    
    const tl = gsap.timeline();
    timelineRef.current = tl;
    
    tl.to({}, { duration: 2 })
      .call(() => {
        if (isActiveRef.current && currentPhaseRef.current === 'gentle') {
          setDisplayText(gentleLines[1]);
          playTone('gentle');
        }
      })
      .to({}, { duration: 2 })
      .call(() => {
        if (isActiveRef.current && currentPhaseRef.current === 'gentle') {
          setDisplayText(gentleLines[2]);
          playTone('gentle');
        }
      })
      .to({}, { duration: 2 })
      .call(() => {
        if (isActiveRef.current && currentPhaseRef.current === 'gentle') {
          startDarkPhase();
        }
      });
  };

  // Start dark phase
  const startDarkPhase = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    currentPhaseRef.current = 'dark';
    setIsDarkPhase(true);
    setDisplayText(darkLines[0]);
    playTone('warning');
    
    // Efek transisi
    gsap.to(containerRef.current, {
      backgroundColor: '#000000',
      duration: 1.5
    });
    
    gsap.to(vignetteRef.current, {
      opacity: 0.8,
      duration: 1.5
    });
    
    const tl = gsap.timeline();
    timelineRef.current = tl;
    
    tl.to({}, { duration: 2 })
      .call(() => {
        if (isActiveRef.current && currentPhaseRef.current === 'dark') {
          setDisplayText(darkLines[1]);
          playTone('dark');
        }
      })
      .to({}, { duration: 2 })
      .call(() => {
        if (isActiveRef.current && currentPhaseRef.current === 'dark') {
          setDisplayText(darkLines[2]);
          playTone('dark');
        }
      })
      .to({}, { duration: 2 })
      .call(() => {
        if (isActiveRef.current && currentPhaseRef.current === 'dark') {
          setShowWarning(true);
          playTone('warning');
        }
      });
  };

  useEffect(() => {
    // Setup AudioContext
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);

    if (!containerRef.current) return;

    // Mulai dengan gentle phase
    startGentlePhase();

    // Animasi title
    gsap.to(titleRef.current, {
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animasi vignette
    gsap.to(vignetteRef.current, {
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const handleWarningChoice = (choice: 'yes' | 'no') => {
    setShowWarning(false);
    
    if (choice === 'yes') {
      setShowEnter(true);
      playTone('enter');
      
      gsap.to(containerRef.current, {
        backgroundColor: '#0a0505',
        duration: 1
      });
    } else {
      // Reset dengan benar
      isActiveRef.current = false; // Matikan timeline yang sedang berjalan
      
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      
      // Reset states
      setIsDarkPhase(false);
      setShowEnter(false);
      
      // Reset visual
      gsap.to(containerRef.current, {
        backgroundColor: '#111111',
        duration: 0.5
      });
      
      gsap.to(vignetteRef.current, {
        opacity: 0.3,
        duration: 0.5
      });
      
      // Mulai ulang dari awal setelah delay sebentar
      setTimeout(() => {
        isActiveRef.current = true;
        startGentlePhase();
      }, 100);
    }
  };

  const handleEnter = () => {
    playTone('enter');
    
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 1.5,
        onComplete: () => {
          if (onEnter) onEnter();
        }
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        onComplete: onEnter
      });
    }
  };

  const handleScreenClick = () => {
    if (!showWarning && !showEnter) {
      isActiveRef.current = false; // Matikan timeline
      
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      
      // Langsung ke warning
      setIsDarkPhase(true);
      setDisplayText(darkLines[2]);
      setShowWarning(true);
      playTone('warning');
      
      gsap.to(containerRef.current, {
        backgroundColor: '#000000',
        duration: 0.5
      });
      
      gsap.to(vignetteRef.current, {
        opacity: 0.8,
        duration: 0.5
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#111] overflow-hidden flex items-start justify-center cursor-pointer transition-colors duration-1000 pt-[25vh]"
      onClick={handleScreenClick}
      style={{
        backgroundImage: isDarkPhase 
          ? 'radial-gradient(circle at 50% 50%, #1a0a0a 0%, #000000 100%)'
          : 'radial-gradient(circle at 50% 50%, #2a2a2a 0%, #0a0a0a 100%)'
      }}
    >
      {/* Portfolio Indicator */}
      <div 
        ref={titleRef}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20 opacity-30"
      >
        <span className="text-[#8B0000] text-xs tracking-[0.5em] font-mono">
          PORTFOLIO
        </span>
        <div className="h-px w-full bg-[#8B0000]/30 mt-1" />
      </div>

      {/* Simple decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 border border-red-900/20 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-red-900/10 rounded-full" />
      </div>

      {/* Text */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-4 max-w-2xl"
      >
        <p className={`
          text-2xl md:text-3xl font-light tracking-wide transition-all duration-1000
          ${isDarkPhase ? 'text-red-900/90' : 'text-gray-300'}
        `}>
          {displayText}
        </p>
        
        {/* Simple indicator */}
        {!showWarning && !showEnter && displayText && (
          <div className="mt-6 flex justify-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDarkPhase ? 'bg-red-900/50' : 'bg-gray-500/50'}`} />
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse delay-75 ${isDarkPhase ? 'bg-red-900/50' : 'bg-gray-500/50'}`} />
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse delay-150 ${isDarkPhase ? 'bg-red-900/50' : 'bg-gray-500/50'}`} />
          </div>
        )}
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#1a0f0f] border-2 border-red-900 p-8 max-w-md w-full mx-4 shadow-2xl mt-[15vh]">
            <h2 className="text-red-900 text-xl text-center mb-6 font-mono tracking-widest">
              PERINGATAN
            </h2>
            
            <p className="text-gray-300 text-center mb-8">
              "Portofolio ini menyimpan<br/>
              cerita yang kelam."
            </p>
            
            <p className="text-red-900/70 text-sm text-center mb-6">
              Kau tetap ingin melanjutkan?
            </p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleWarningChoice('yes')}
                className="px-8 py-3 border-2 border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all duration-500 font-mono tracking-wider text-sm"
              >
                LANJUTKAN
              </button>
              
              <button
                onClick={() => handleWarningChoice('no')}
                className="px-8 py-3 border-2 border-gray-700 text-gray-500 hover:border-gray-500 transition-all duration-500 font-mono tracking-wider text-sm"
              >
                KEMBALI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enter Button */}
      {showEnter && !showWarning && (
        <div className="absolute inset-0 flex items-start justify-center z-30 pt-[40vh]">
          <button
            onClick={handleEnter}
            className="group relative px-10 py-4 border-2 border-red-900/60 hover:border-red-900 transition-all duration-700"
          >
            <span className="relative text-red-900/80 group-hover:text-red-900 text-sm tracking-[0.3em] font-light">
              LIHAT PORTOFOLIO
            </span>
            <div className="absolute inset-0 border border-red-900/0 group-hover:border-red-900/30 scale-95 group-hover:scale-100 transition-all duration-700" />
          </button>
        </div>
      )}

      {/* Click hint */}
      {!showWarning && !showEnter && displayText && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 font-mono">
          [ klik untuk lewati ]
        </div>
      )}

      {/* Year indicator */}
      <div className="absolute bottom-8 right-8 text-[#8B0000]/20 text-xs font-mono">
        © 2024
      </div>

      {/* White overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-white opacity-0 pointer-events-none transition-opacity duration-1000"
      />

      {/* Vignette */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 30%, black 90%)',
          opacity: 0.3
        }}
      />
    </div>
  );
};

export default DarkIntro;