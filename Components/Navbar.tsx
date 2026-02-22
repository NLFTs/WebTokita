"use client";

import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link"; // Import Link dari Next.js untuk navigasi halaman
import { Menu, X, BookOpen } from "lucide-react"; // Tambah BookOpen icon
import { gsap } from "gsap";

interface MenuItem {
  name: string;
  to: string;
  isPage?: boolean; // Untuk membedakan link halaman atau scroll
  href?: string; // Untuk link ke halaman lain
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const menuItems: MenuItem[] = [
    { name: "About", to: "about" },
    { name: "Journey", to: "journey" },
    { name: "Languages", to: "languages" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
    // Tambah link ke blog
    { name: "Cerita Maria", to: "blog", isPage: true, href: "/blog" }
  ];

  // Navbar entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [isOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <ScrollLink
            to="hero"
            smooth
            duration={500}
            className="text-2xl font-bold cursor-pointer text-gray-800 hover:text-sky-500 transition-colors"
          >
            Nafeez
          </ScrollLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isPage ? (
                // Link ke halaman lain (blog)
                <Link
                  key={item.to}
                  href={item.href || '#'}
                  className="relative font-medium text-gray-700 cursor-pointer group transition-colors flex items-center gap-1"
                >
                  {item.name === "Cerita Maria" && <BookOpen size={16} className="text-[#8B5F7F]" />}
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                // Link scroll dalam halaman
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  spy
                  offset={-80}
                  activeClass="text-sky-500"
                  className="relative font-medium text-gray-700 cursor-pointer group transition-colors"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                </ScrollLink>
              )
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-4 pb-4 space-y-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4"
          >
            {menuItems.map((item) => (
              item.isPage ? (
                // Link ke halaman lain di mobile
                <Link
                  key={item.to}
                  href={item.href || '#'}
                  onClick={() => setIsOpen(false)}
                  className="block font-medium text-gray-700 hover:text-sky-500 transition-colors flex items-center gap-2"
                >
                  {item.name === "Cerita Maria" && <BookOpen size={16} className="text-[#8B5F7F]" />}
                  {item.name}
                </Link>
              ) : (
                // Link scroll di mobile
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  spy
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="block font-medium text-gray-700 hover:text-sky-500 transition-colors"
                >
                  {item.name}
                </ScrollLink>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;