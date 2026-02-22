"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";  
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  Download,
  Award,
  Instagram,
  Github,
  Mail,
  MessageCircle,
} from "lucide-react";
import { SiMyanimelist, SiRobloxstudio } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import { PiGameControllerDuotone } from "react-icons/pi";

import law from "../img/ce.jpg";

// ✅ Komponen Alert Popup
const Alert = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <>
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="alert-title"
      >
        <div 
          className="relative bg-[#1A1A1A] border border-[#3A3A3A] shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 animate-popup"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8A8A8A] hover:text-white transition-colors p-1 hover:bg-[#2C2C2C] rounded-full"
            aria-label="Tutup alert"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#2C2C2C] border border-[#4A6B7F] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#6B9FBF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 id="alert-title" className="text-lg font-semibold text-white mb-1">
                Informasi
              </h3>
              <p className="text-[#C0C0C0] leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#2C2C2C] border border-[#4A6B7F] text-white font-medium rounded-xl hover:bg-[#3A3A3A] transition-all duration-200"
            >
              Mengerti
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-popup {
          animation: popup 0.3s ease-out forwards;
        }
      `}</style>
    </>,
    document.body
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 80, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: "power3.out" }
        );
      }

      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.4)", delay: 0.6 }
        );
      }

      if (socialRef.current) {
        gsap.fromTo(
          socialRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.9 }
        );
      }

      if (orbitRef.current) {
        gsap.to(orbitRef.current, { rotate: 360, duration: 25, ease: "linear", repeat: -1, transformOrigin: "center center" });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCVClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAlertMessage("Waduhh😧😧 CV belum tersedia, silakan cek nanti ya!");
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden min-h-screen bg-[#1A1A1A]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(74, 107, 127, 0.1) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(107, 159, 191, 0.05) 0%, transparent 40%),
          repeating-linear-gradient(45deg, rgba(44, 44, 44, 0.2) 0px, rgba(44, 44, 44, 0.2) 2px, transparent 2px, transparent 6px)
        `
      }}
    >
      {/* Overlay gelap lembut */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-28 md:pt-32 gap-10 min-h-screen">
        {/* TEXT */}
        <div ref={textRef} className="text-center md:text-left space-y-5 md:w-1/2 z-10">

          {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-[2px_2px_0px_#000000]">
            Welcome to my portfolio
          </h1>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#6B9FBF] drop-shadow-[2px_2px_0px_#000000]">
            {"I'm Nafis"}
          </h2>

          {/* ICON SOSIAL - subtle dark */}
          <div ref={socialRef} className="flex justify-center md:justify-start gap-4 pt-2">
            <a href="https://www.instagram.com/_nafietzsche/" target="_blank" rel="noopener noreferrer" 
               className="bg-[#2C2C2C] p-3 rounded-lg border border-[#3A3A3A] hover:border-[#6B9FBF] transition-all duration-200">
              <Instagram size={24} className="text-[#C0C0C0] hover:text-white" />
            </a>
            <a href="https://github.com/MuhammadNafeezKh" target="_blank" rel="noopener noreferrer"
               className="bg-[#2C2C2C] p-3 rounded-lg border border-[#3A3A3A] hover:border-[#6B9FBF] transition-all duration-200">
              <Github size={24} className="text-[#C0C0C0] hover:text-white" />
            </a>
            <a href="nafismuhammad277@gmail.com"
               className="bg-[#2C2C2C] p-3 rounded-lg border border-[#3A3A3A] hover:border-[#6B9FBF] transition-all duration-200">
              <Mail size={24} className="text-[#C0C0C0] hover:text-white" />
            </a>
            <a href="#contact"
               className="bg-[#2C2C2C] p-3 rounded-lg border border-[#3A3A3A] hover:border-[#6B9FBF] transition-all duration-200">
              <MessageCircle size={24} className="text-[#C0C0C0] hover:text-white" />
            </a>
          </div>

          <p className="text-xl md:text-2xl text-[#F0F0F0] drop-shadow-[1px_1px_0px_#000000]">
            <span className="font-semibold text-[#6B9FBF]">Front End Developer</span> & <span className="font-semibold text-[#B06C6C]">UI/UX Design Enthusiast</span>
          </p>

          {/* BUTTONS */}
          <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center md:justify-start pt-6">
            <Link
              href="/serti"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2C2C2C] border border-[#3A3A3A] text-white font-semibold rounded-xl hover:bg-[#3A3A3A] hover:border-[#6B9FBF] transition-all duration-200"
            >
              <Award size={20} className="text-[#6B9FBF]" />
              Certificate
            </Link>

            <a
              href="#"
              onClick={handleCVClick}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2C2C2C] border border-[#3A3A3A] text-white font-semibold rounded-xl hover:bg-[#3A3A3A] hover:border-[#B06C6C] transition-all duration-200"
            >
              <Download size={20} className="text-[#B06C6C]" />
              Download CV
            </a>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative w-80 h-[420px] md:w-[480px] md:h-[540px] flex items-center justify-center">
          {/* Foto utama */}
          <div ref={imageRef} className="absolute w-72 h-96 md:w-[400px] md:h-[480px] overflow-hidden border border-[#3A3A3A] shadow-2xl z-10">
            <Image src={law} alt="Profile" fill className="object-cover" priority />
          </div>

          {/* Orbit ikon */}
          <div ref={orbitRef} className="absolute w-full h-full flex items-center justify-center" style={{ transformOrigin: "center" }}>
            {/* Orbit guide */}
            <div className="absolute inset-0 rounded-full border border-[#3A3A3A] border-dashed"></div>

            {/* Ikon atas */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[100px]">
              <div className="bg-[#232323] border border-[#3A3A3A] rounded-lg p-3 hover:border-[#6B9FBF] transition-all duration-200">
                <SiMyanimelist className="text-[#6B9FBF] text-4xl" />
              </div>
            </div>

            {/* Ikon kanan */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[100px]">
              <div className="bg-[#232323] border border-[#3A3A3A] rounded-lg p-3 hover:border-[#B06C6C] transition-all duration-200">
                <SiRobloxstudio className="text-[#B06C6C] text-4xl" />
              </div>
            </div>

            {/* Ikon bawah */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[100px]">
              <div className="bg-[#232323] border border-[#3A3A3A] rounded-lg p-3 hover:border-[#6B9FBF] transition-all duration-200">
                <FaReact className="text-[#6B9FBF] text-4xl" />
              </div>
            </div>

            {/* Ikon kiri */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[100px]">
              <div className="bg-[#232323] border border-[#3A3A3A] rounded-lg p-3 hover:border-[#B06C6C] transition-all duration-200">
                <PiGameControllerDuotone className="text-[#B06C6C] text-4xl" />
              </div>
            </div>

          </div>
        </div>

      </div>
      {/* GARIS PEMISAH */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6B9FBF] to-transparent mt-10 md:mt-16 opacity-30"></div>

    </section>
  );
};

export default Hero;