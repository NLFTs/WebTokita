"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Window = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cursor1Ref = useRef<HTMLSpanElement>(null);
  const cursor2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 0%",
          scrub: 2.5,
          toggleActions: "play play reverse reverse",
        },
      });

      // ✨ Window 1: Kehidupan Loop (kiri-atas)
      tl.fromTo(
        ".window-1",
        { opacity: 0, x: -20, y: 30, scale: 0.98 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.4, ease: "power3.out" }
      )
      .fromTo(
        ".window-1 .code-line",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" },
        "-=1"
      )
      .to(
        cursor1Ref.current,
        { opacity: 1, duration: 0.7, repeat: -1, yoyo: true, ease: "steps(1)" },
        "-=0.5"
      )

      // ✨ Window 2: Ubur-ubur (kanan-bawah)
      .fromTo(
        ".window-2",
        { opacity: 0, x: 20, y: -30, scale: 0.98 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.4, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        ".window-2 .code-line",
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" },
        "-=1"
      )
      .to(
        cursor2Ref.current,
        { opacity: 1, duration: 0.7, repeat: -1, yoyo: true, ease: "steps(1)" },
        "-=0.5"
      );

      // ✨ Floating animation - lebih halus
      gsap.to(".window-1", {
        y: -4,
        x: -2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".window-2", {
        y: 5,
        x: 3,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // ✨ Fade out saat scroll lanjut
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 0%",
        end: "bottom bottom",
        onLeave: () => {
          gsap.to(".window-1, .window-2", {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: "power2.in",
          });
        },
        onEnterBack: () => {
          gsap.to(".window-1, .window-2", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-40 px-4 overflow-visible"
      aria-hidden="true"
    >
      {/* Background gradient - light theme subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e6f0fa]/30 to-transparent pointer-events-none" />
      
      {/* Subtle grid - light */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30,30,30,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,30,30,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ✨ WINDOW 1: Kehidupan Loop (Kiri-Atas) - RESPONSIVE */}
      <div className="window-1 absolute left-1/2 -translate-x-1/2 md:left-[12%] md:-translate-x-0 xl:left-[17%] top-[5%] md:top-[10%] w-[85vw] sm:w-[480px] md:w-[520px] lg:w-[620px] xl:w-[720px] z-10">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] overflow-hidden shadow-xl shadow-gray-200/50 w-full">
          {/* Header - Responsive */}
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-[#f3f3f3] border-b border-[#e0e0e0]">
            <div className="flex gap-1 sm:gap-2">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-gray-500 font-mono truncate">hidup.tsx</span>
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <span className="text-[8px] sm:text-xs text-gray-400 hidden xs:inline">TypeScript React</span>
            </div>
          </div>

          {/* Code Content - Responsive dengan overflow scroll untuk mobile */}
          <pre className="p-3 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-800 leading-relaxed sm:leading-loose overflow-x-auto whitespace-pre bg-white">
            <code className="block min-w-[300px] sm:min-w-0">
              <span className="code-line block text-[#008000]">
                <span className="text-[#0000ff]">//</span> kehidupan adalah loop tanpa break;
              </span>

              <span className="code-line block mt-2 sm:mt-4">
                <span className="text-[#0000ff]">const</span>{" "}
                <span className="text-[#001080] font-semibold">hidup</span>{" "}
                <span className="text-gray-800">=</span>{" "}
                <span className="text-[#0000ff]">async</span>{" "}
                <span className="text-gray-800">()</span>{" "}
                <span className="text-gray-800">=&gt;</span>{" "}
                <span className="text-gray-800">{"{"}</span>
              </span>

              <span className="code-line block pl-2 sm:pl-5 mt-2 sm:mt-4">
                <span className="text-[#0000ff]">await</span>{" "}
                <span className="text-[#001080] font-semibold">kematianPertama</span>
                <span className="text-gray-800">(</span>
                <span className="text-[#a31515]">&quot;umur 25&quot;</span>
                <span className="text-gray-800">);</span>{" "}
                <span className="text-[#008000] hidden sm:inline">// idealisme.exit()</span>
              </span>

              <span className="code-line block pl-2 sm:pl-5 mt-2 sm:mt-3">
                <span className="text-[#0000ff]">while</span>{" "}
                <span className="text-gray-800">(</span>
                <span className="text-[#001080] font-semibold">sendiri</span>
                <span className="text-gray-800">)</span>{" "}
                <span className="text-gray-800">{"{"}</span>
              </span>
              <span className="code-line block pl-4 sm:pl-10 mt-1 sm:mt-2">
                <span className="text-[#001080] font-semibold">berjalan</span>
                <span className="text-gray-800">();</span>
              </span>
              <span className="code-line block pl-4 sm:pl-10 text-[#008000] hidden xs:block">
                <span className="text-[#0000ff]">//</span> tanpa jaminan, tanpa janji
              </span>
              <span className="code-line block pl-2 sm:pl-5">
                <span className="text-gray-800">{"}"}</span>
              </span>

              <span className="code-line block pl-2 sm:pl-5 mt-2 sm:mt-4">
                <span className="text-[#0000ff]">await</span>{" "}
                <span className="text-[#001080] font-semibold">kematianKedua</span>
                <span className="text-gray-800">(</span>
                <span className="text-[#a31515]">&quot;roh.meninggalkan(tubuh)&quot;</span>
                <span className="text-gray-800">);</span>
              </span>

              <span className="code-line block pl-2 sm:pl-5 mt-2 sm:mt-4">
                <span className="text-[#0000ff]">return</span>{" "}
                <span className="text-[#a31515]">&quot;...&quot;</span>
                <span className="text-gray-800">;</span>
              </span>

              <span className="code-line block mt-2 sm:mt-4">
                <span className="text-gray-800">{"}"}</span>
              </span>

              <span
                ref={cursor1Ref}
                className="inline-block w-[2px] h-4 sm:h-5 bg-[#0000ff] align-middle opacity-0 ml-[2px] animate-pulse"
              />
            </code>
          </pre>
        </div>
      </div>

      {/* ✨ WINDOW 2: Ubur-ubur / Drifting (Kanan-Bawah) - RESPONSIVE */}
      <div className="window-2 absolute left-1/2 -translate-x-1/2 md:right-[12%] md:left-auto md:-translate-x-0 xl:right-[17%] bottom-[5%] md:bottom-[10%] w-[85vw] sm:w-[480px] md:w-[520px] lg:w-[620px] xl:w-[720px] z-10">
        <div className="bg-white rounded-2xl border border-[#e0e0e0] overflow-hidden shadow-xl shadow-gray-200/50 w-full">
          {/* Header - Responsive */}
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-[#f3f3f3] border-b border-[#e0e0e0]">
            <div className="flex gap-1 sm:gap-2">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-gray-500 font-mono truncate">ubur-ubur.tsx</span>
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <span className="text-[8px] sm:text-xs text-gray-400 hidden xs:inline">TypeScript React</span>
            </div>
          </div>

          {/* Code Content - Responsive dengan overflow scroll untuk mobile */}
          <pre className="p-3 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-800 leading-relaxed sm:leading-loose overflow-x-auto whitespace-pre bg-white">
            <code className="block min-w-[300px] sm:min-w-0">
              <span className="code-line block text-[#008000]">
                <span className="text-[#0000ff]">//</span> aku melihat ubur-ubur itu
              </span>

              <span className="code-line block mt-2 sm:mt-4">
                <span className="text-[#0000ff]">const</span>{" "}
                <span className="text-[#001080] font-semibold">mereka</span>{" "}
                <span className="text-gray-800">=</span>{" "}
                <span className="text-gray-800">{"{"}</span>
              </span>
              <span className="code-line block pl-2 sm:pl-5">
                <span className="text-[#001080] font-semibold">tujuan</span>
                <span className="text-gray-800">:</span>{" "}
                <span className="text-[#a31515]">&quot;none&quot;</span>
                <span className="text-gray-800">,</span>
              </span>
              <span className="code-line block pl-2 sm:pl-5">
                <span className="text-[#001080] font-semibold">beban</span>
                <span className="text-gray-800">:</span>{" "}
                <span className="text-[#0000ff]">null</span>
              </span>
              <span className="code-line block">
                <span className="text-gray-800">{"}"};</span>
              </span>

              <span className="code-line block pl-2 sm:pl-5 mt-2 sm:mt-4">
                <span className="text-[#0000ff]">while</span>{" "}
                <span className="text-gray-800">(</span>
                <span className="text-[#001080] font-semibold">arus</span>
                <span className="text-gray-800">)</span>{" "}
                <span className="text-gray-800">{"{"}</span>
              </span>
              <span className="code-line block pl-4 sm:pl-10 mt-1 sm:mt-2">
                <span className="text-[#001080] font-semibold">hanyut</span>
                <span className="text-gray-800">();</span>
              </span>
              <span className="code-line block pl-4 sm:pl-10 text-[#008000] hidden xs:block">
                <span className="text-[#0000ff]">//</span> tanpa bertanya &quot;mengapa&quot;
              </span>
              <span className="code-line block pl-2 sm:pl-5">
                <span className="text-gray-800">{"}"}</span>
              </span>

              <span className="code-line block mt-2 sm:mt-4 text-[#008000] hidden xs:block">
                <span className="text-[#0000ff]">//</span> kadang aku iri pada kesederhanaan mereka
              </span>
              <span className="code-line block mt-2 sm:mt-3">
                <span className="text-[#0000ff]">if</span>{" "}
                <span className="text-gray-800">(</span>
                <span className="text-[#001080] font-semibold">pikiran</span>{" "}
                <span className="text-gray-800">===</span>{" "}
                <span className="text-[#a31515]">&quot;berat&quot;</span>
                <span className="text-gray-800">)</span>{" "}
                <span className="text-gray-800">{"{"}</span>
              </span>
              <span className="code-line block pl-4 sm:pl-10">
                <span className="text-[#001080] font-semibold">berhenti</span>
                <span className="text-gray-800">();</span>
              </span>
              <span className="code-line block pl-4 sm:pl-10">
                <span className="text-[#001080] font-semibold">menatap</span>
                <span className="text-gray-800">(</span>
                <span className="text-[#001080] font-semibold">laut</span>
                <span className="text-gray-800">);</span>
              </span>
              <span className="code-line block">
                <span className="text-gray-800">{"}"}</span>
              </span>

              <span className="code-line block mt-2 sm:mt-4 text-[#008000] hidden xs:block">
                <span className="text-[#0000ff]">//</span> tapi tetap di sini, memilih untuk ada
              </span>

              <span
                ref={cursor2Ref}
                className="inline-block w-[2px] h-4 sm:h-5 bg-[#0000ff] align-middle opacity-0 ml-[2px] animate-pulse"
              />
            </code>
          </pre>
        </div>
      </div>

      {/* ✨ Floating particles - responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gray-400/20"
            style={{
              top: `${10 + i * 12}%`,
              left: i % 2 === 0 ? '5%' : '95%',
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-5px) translateX(1px); opacity: 0.4; }
        }
        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
            50% { transform: translateY(-3px) translateX(1px); opacity: 0.3; }
          }
        }
      `}</style>
    </section>
  );
};

export default Window;