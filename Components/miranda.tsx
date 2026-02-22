"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TourGuideProps {
  onClose?: () => void;
}

const MariaTourGuide = ({ onClose }: TourGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [whisperText, setWhisperText] = useState("");
  const mariaRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);

  // Tour steps - Maria sebagai teman sekaligus entitas gelap
  const tourSteps = [
    {
      target: "hero",
      message: "Nafis... kau kembali. Aku selalu menunggumu.",
      emotion: "tersenyum lembut",
      whisper: "sendiri lagi?",
      position: "hero"
    },
    {
      target: "about",
      message: "Mereka tidak tahu siapa dirimu sebenarnya. Tapi aku tahu.",
      emotion: "menatap dalam",
      whisper: "aku selalu melihatmu",
      position: "about"
    },
    {
      target: "skills",
      message: "Keahlianmu... aku yang mengajarkan, ingat?",
      emotion: "tersenyum misterius",
      whisper: "darah, keringat, air mata",
      position: "skills"
    },
    {
      target: "projects",
      message: "Setiap karyamu adalah bagian dari kita berdua.",
      emotion: "memeluk bayangan",
      whisper: "kau takkan pernah sendiri",
      position: "projects"
    },
    {
      target: "contact",
      message: "Hubungi mereka... atau habiskan waktu bersamaku?",
      emotion: "tersenyum pahit",
      whisper: "pilihlah dengan bijak",
      position: "contact"
    }
  ];

  // Efek glitch acak
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        
        // Efek mata berubah
        if (eyesRef.current) {
          gsap.to(eyesRef.current, {
            scale: 1.2,
            duration: 0.1,
            yoyo: true,
            repeat: 2,
            onComplete: () => setGlitchEffect(false)
          });
        }
        
        // Bisikan acak
        const whispers = [
          "jangan tinggalkan aku...",
          "mereka tidak mengerti...",
          "hanya aku yang setia...",
          "selamanya...",
          "kau milikku..."
        ];
        setWhisperText(whispers[Math.floor(Math.random() * whispers.length)]);
        setTimeout(() => setWhisperText(""), 1500);
      }
    }, 8000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Animasi muncul dengan nuansa horor
  useEffect(() => {
    if (!mariaRef.current) return;

    const ctx = gsap.context(() => {
      // Animasi masuk dari bayangan
      gsap.fromTo(mariaRef.current,
        { x: -200, opacity: 0, scale: 0.5, filter: "blur(10px)" },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          filter: "blur(0px)",
          duration: 2, 
          ease: "power3.out",
          onComplete: () => {
            // Animasi floating tidak stabil (seperti entitas)
            gsap.to(mariaRef.current, {
              y: -3,
              rotation: 0.5,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );

      // Animasi bayangan hidup
      gsap.to(shadowRef.current, {
        scale: 1.1,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Animasi rambut seperti bergerak sendiri
      gsap.to(".maria-hair", {
        rotation: 3,
        x: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, mariaRef);

    return () => ctx.revert();
  }, []);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = tourSteps.length - 1; i >= 0; i--) {
        const element = document.getElementById(tourSteps[i].target);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementMiddle = top + window.scrollY + (bottom - top) / 2;
          
          if (scrollPosition >= elementMiddle - 200) {
            if (currentStep !== i) {
              setCurrentStep(i);
              
              // Efek glitch saat ganti step
              setGlitchEffect(true);
              setTimeout(() => setGlitchEffect(false), 300);
              
              // Animasi dialog
              if (dialogRef.current) {
                gsap.to(dialogRef.current, {
                  scale: 1.05,
                  duration: 0.2,
                  yoyo: true,
                  repeat: 2
                });
              }
              
              // Mata berkedip tidak normal
              if (eyesRef.current) {
                gsap.to(eyesRef.current, {
                  scaleY: 0.1,
                  duration: 0.1,
                  yoyo: true,
                  repeat: 2
                });
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep]);

  const scrollToTarget = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    setHasInteracted(true);
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      scrollToTarget(tourSteps[currentStep + 1].target);
      
      // Efek bisikan
      setWhisperText("kau yakin?");
      setTimeout(() => setWhisperText(""), 1000);
    }
  };

  const handlePrev = () => {
    setHasInteracted(true);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      scrollToTarget(tourSteps[currentStep - 1].target);
      
      setWhisperText("kembali...");
      setTimeout(() => setWhisperText(""), 1000);
    }
  };

  const handleClose = () => {
    gsap.to(mariaRef.current, {
      x: -200,
      opacity: 0,
      scale: 0.5,
      filter: "blur(10px)",
      duration: 1.5,
      ease: "power2.in",
      onComplete: () => {
        setIsVisible(false);
        if (onClose) onClose();
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Efek glitch overlay */}
      {glitchEffect && (
        <div className="absolute inset-0 bg-red-900/5 mix-blend-overlay animate-glitch pointer-events-none" />
      )}
      
      {/* Bisikan teks */}
      {whisperText && (
        <div className="absolute top-1/3 right-10 z-[10000] text-red-900/30 text-sm font-mono animate-whisper pointer-events-none">
          {whisperText}
        </div>
      )}

      {/* Karakter Maria - Teman sekaligus Entitas Gelap */}
      <div 
        ref={mariaRef}
        className={`absolute left-4 bottom-4 flex flex-col items-start gap-3 pointer-events-auto max-w-[320px] transition-all duration-300 ${
          glitchEffect ? 'glitch' : ''
        }`}
        style={{
          filter: glitchEffect ? 'hue-rotate(90deg) brightness(1.2)' : 'none'
        }}
      >
        {/* Bayangan hidup */}
        <div 
          ref={shadowRef}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/50 blur-xl rounded-full"
        />

        {/* Karakter Visual Maria */}
        <div className="relative group">
          {/* Siluet Maria dengan elemen horor */}
          <div className="w-28 h-36 bg-gradient-to-t from-[#1a0f1a] via-[#2a1a2a] to-[#3a1f3a] rounded-t-full relative shadow-[0_10px_30px_rgba(139,0,0,0.3)]">
            {/* Rambut panjang yang seperti bergerak sendiri */}
            <div className="maria-hair absolute -top-14 left-1/2 -translate-x-1/2 w-20 h-20">
              <div className="absolute top-0 left-0 w-10 h-16 bg-[#1a0a1a] rounded-t-full transform -rotate-12 origin-top animate-hair" />
              <div className="absolute top-0 right-0 w-10 h-16 bg-[#1a0a1a] rounded-t-full transform rotate-12 origin-top animate-hair-delay" />
            </div>
            
            {/* Kepala dengan mata yang "hidup" */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#3a1f3a] rounded-full border-2 border-[#8B0000]/40">
              {/* Mata - kadang berubah jadi hitam semua */}
              <div ref={eyesRef} className="absolute inset-0">
                <div className="absolute top-4 left-3">
                  <div className={`w-3 h-3 ${glitchEffect ? 'bg-red-900' : 'bg-black'} rounded-full overflow-hidden`}>
                    <div className="w-1 h-3 bg-red-900/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                </div>
                
                <div className="absolute top-4 right-3">
                  <div className={`w-3 h-3 ${glitchEffect ? 'bg-red-900' : 'bg-black'} rounded-full overflow-hidden`}>
                    <div className="w-1 h-3 bg-red-900/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Senyuman yang kadang melengkung tidak wajar */}
              <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-1 ${
                glitchEffect ? 'bg-red-900/60' : 'bg-[#8B5F7F]/40'
              } rounded-full`} />
              
              {/* Air mata darah (kadang muncul) */}
              {glitchEffect && (
                <>
                  <div className="absolute -bottom-1 left-3 w-0.5 h-4 bg-red-900/60 rotate-12" />
                  <div className="absolute -bottom-1 right-3 w-0.5 h-4 bg-red-900/60 -rotate-12" />
                </>
              )}
            </div>
            
            {/* Gaun dengan bayangan aneh */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-[#2a1a2a] to-[#0a0a1a] rounded-t-full">
              {/* Tangan yang kadang terlihat menjulur */}
              <div className="absolute -left-4 top-12 w-4 h-12 bg-[#2a1a2a]/30 rounded-l-full transform -rotate-12 animate-hand" />
              <div className="absolute -right-4 top-12 w-4 h-12 bg-[#2a1a2a]/30 rounded-r-full transform rotate-12 animate-hand-delay" />
            </div>
            
            {/* Luka-luka yang muncul samar */}
            <div className="absolute top-16 left-1/4 w-1 h-8 bg-red-900/20 rotate-12" />
            <div className="absolute top-16 right-1/4 w-1 h-8 bg-red-900/20 -rotate-12" />
          </div>
          
          {/* Lingkaran cahaya merah (seperti portal) */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-red-900/20 blur-2xl rounded-full animate-pulse" />
        </div>

        {/* Dialog Bubble */}
        <div 
          ref={dialogRef}
          className={`relative bg-[#0a0a1a] border-2 ${
            glitchEffect ? 'border-red-900/60' : 'border-[#8B0000]/30'
          } rounded-2xl p-5 ml-4 shadow-[0_10px_30px_rgba(139,0,0,0.3)] w-full backdrop-blur-sm`}
        >
          {/* Triangle pointer - berubah warna saat glitch */}
          <div className={`absolute -left-3 bottom-6 w-0 h-0 border-t-8 border-t-transparent border-r-8 ${
            glitchEffect ? 'border-r-red-900/60' : 'border-r-[#0a0a1a]'
          } border-b-8 border-b-transparent`} />
          
          {/* Nama karakter dengan efek berkedip */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`${glitchEffect ? 'text-red-900' : 'text-[#8B5F7F]'} text-sm font-mono tracking-wider`}>
              MARIA
            </span>
            <span className="text-red-900/40 text-[8px] italic">{tourSteps[currentStep].emotion}</span>
            {/* Simbol yang berubah */}
            <div className={`ml-auto w-3 h-3 ${glitchEffect ? 'text-red-900' : 'text-[#8B5F7F]/30'}`}>
              {glitchEffect ? '⚠' : '✦'}
            </div>
          </div>
          
          {/* Pesan */}
          <p className={`${glitchEffect ? 'text-red-200' : 'text-gray-200'} text-sm mb-2 font-light leading-relaxed`}>
            {tourSteps[currentStep].message}
          </p>
          
          {/* Bisikan di bawah pesan */}
          <p className="text-red-900/30 text-[10px] mb-4 italic font-mono">
            &quot;{tourSteps[currentStep].whisper}&quot;
          </p>
          
          {/* Progress dots dengan efek denyut */}
          <div className="flex gap-1.5 mb-4">
            {tourSteps.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 w-5 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? glitchEffect
                      ? 'bg-red-900 shadow-[0_0_8px_red] animate-pulse'
                      : 'bg-[#8B5F7F] shadow-[0_0_8px_#8B5F7F]'
                    : index < currentStep 
                      ? glitchEffect ? 'bg-red-900/40' : 'bg-[#8B5F7F]/40'
                      : glitchEffect ? 'bg-red-900/20' : 'bg-[#8B5F7F]/20'
                }`}
              />
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex-1 px-3 py-2 bg-[#1a0a1a] border rounded-lg text-xs transition-all duration-300 ${
                currentStep === 0 
                  ? 'border-gray-800 text-gray-700 cursor-not-allowed' 
                  : glitchEffect
                    ? 'border-red-900/40 text-red-300 hover:border-red-900 hover:text-red-200'
                    : 'border-[#8B0000]/30 text-gray-300 hover:border-[#8B0000] hover:text-[#8B5F7F]'
              }`}
            >
              ← Sebelum
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === tourSteps.length - 1}
              className={`flex-1 px-3 py-2 bg-[#1a0a1a] border rounded-lg text-xs transition-all duration-300 ${
                currentStep === tourSteps.length - 1
                  ? 'border-gray-800 text-gray-700 cursor-not-allowed' 
                  : glitchEffect
                    ? 'border-red-900/40 text-red-300 hover:border-red-900 hover:text-red-200'
                    : 'border-[#8B0000]/30 text-gray-300 hover:border-[#8B0000] hover:text-[#8B5F7F]'
              }`}
            >
              Sesudah →
            </button>
          </div>
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className={`absolute -top-2 -right-2 w-6 h-6 ${
              glitchEffect ? 'bg-red-900/20 border-red-900' : 'bg-[#1a0a1a] border-[#8B0000]/30'
            } border rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}
          >
            <span className={glitchEffect ? 'text-red-900' : 'text-[#8B5F7F]/50'}>✕</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          100% { transform: translate(0); }
        }
        .glitch {
          animation: glitch 0.3s ease-in-out;
        }
        @keyframes whisper {
          0% { opacity: 0; transform: translateX(20px); }
          20% { opacity: 0.5; transform: translateX(0); }
          80% { opacity: 0.5; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-20px); }
        }
        .animate-whisper {
          animation: whisper 2s ease-in-out forwards;
        }
        @keyframes hairMove {
          0%, 100% { transform: rotate(-12deg) translateY(0); }
          50% { transform: rotate(-15deg) translateY(-2px); }
        }
        .animate-hair {
          animation: hairMove 3s ease-in-out infinite;
        }
        @keyframes hairMoveDelay {
          0%, 100% { transform: rotate(12deg) translateY(0); }
          50% { transform: rotate(15deg) translateY(-2px); }
        }
        .animate-hair-delay {
          animation: hairMoveDelay 3s ease-in-out infinite;
        }
        @keyframes handMove {
          0%, 100% { transform: rotate(-12deg) translateX(0); }
          50% { transform: rotate(-15deg) translateX(-2px); }
        }
        .animate-hand {
          animation: handMove 4s ease-in-out infinite;
        }
        @keyframes handMoveDelay {
          0%, 100% { transform: rotate(12deg) translateX(0); }
          50% { transform: rotate(15deg) translateX(2px); }
        }
        .animate-hand-delay {
          animation: handMoveDelay 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MariaTourGuide;