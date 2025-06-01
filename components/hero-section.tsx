"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-provider";
import { Download, Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const heroText = {
  ko: {
    greeting: "안녕하세요,",
    name: "이강현입니다.",
    role: "프론트엔드 개발자",
    description:
      "누군가는 하던 일을 계속할 때, 해보지 않은 일에 도전하며 다양한 관점으로 문제를 해결하며 리딩해왔습니다.",
    resume: "이력서 다운로드",
    contact: "연락하기",
  },
  en: {
    greeting: "Hi, I'm",
    name: "Kai Lee",
    role: "Frontend Developer",
    description:
      "A passionate developer with a challenging mindset, problem-solving skills, and continuous growth. Creating impactful web experiences that leave a lasting impression.",
    resume: "Download CV",
    contact: "Contact Me",
  },
};

const BUTTON_WIDTH = '16rem';
const BUTTON_HEIGHT = '3.5rem';

const HeroSection = () => {
  const { language } = useLanguage();
  const [typedText, setTypedText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const fullText = heroText[language].description;

  useEffect(() => {
    setTypedText("");
    const fullTextArr = fullText.split("");
    const typeText = async () => {
      let currentText = "";
      for (let i = 0; i < fullTextArr.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 24));
        currentText += fullTextArr[i];
        setTypedText(currentText);
      }
    };
    typeText();
  }, [fullText]);

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = language === "ko" ? "/이력서.pdf" : "/Resume.pdf";
    link.download = language === "ko" ? "이강현_이력서.pdf" : "Kai Lee_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToAboutMe = () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const startY = window.scrollY;
    const endY = aboutSection.getBoundingClientRect().top + window.scrollY;
    const duration = 1100; // ms
    const cubic = (t: number) => t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
    let start: number | null = null;
    function step(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = cubic(progress);
      window.scrollTo(0, startY + (endY - startY) * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  };

  // Parallax/floating effect (mouse/touch/tilt)
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const springCardX = useSpring(cardX, { stiffness: 60, damping: 12 });
  const springCardY = useSpring(cardY, { stiffness: 60, damping: 12 });
  const springImageX = useSpring(imageX, { stiffness: 80, damping: 14 });
  const springImageY = useSpring(imageY, { stiffness: 80, damping: 14 });

  // Mouse move parallax for desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      cardX.set(x * 18);
      cardY.set(y * 12);
      imageX.set(x * 32);
      imageY.set(y * 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cardX, cardY, imageX, imageY]);

  // Device orientation for mobile/tablet
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (window.innerWidth >= 768) return;
      const x = (e.gamma || 0) / 45; // left/right tilt
      const y = (e.beta || 0) / 90; // front/back tilt
      cardX.set(x * 12);
      cardY.set(y * 8);
      imageX.set(x * 18);
      imageY.set(y * 12);
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [cardX, cardY, imageX, imageY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden select-text hero-section"
      aria-label="Hero Section"
      style={{ 
        minHeight: '100dvh', 
        height: '100dvh', 
        paddingTop: 'env(safe-area-inset-top)', 
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      {/* Subtle gradient overlay for section transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 sm:h-56 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 30%, hsl(var(--background) / 0) 100%)'
        }}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-20 w-full max-w-5xl mx-auto">
          {/* Profile image */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-auto">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl border-4 border-transparent bg-gradient-to-br from-[#94a3b8] via-[#e2e8f0] to-[#f8fafc]">
              <img
                src="/images/증명사진.jpg"
                alt="Kai Lee"
                className="w-full h-full object-cover rounded-full"
                style={{ objectPosition: "center 25%" }}
                draggable={false}
              />
              {/* Enhanced gradient border */}
              <div className="absolute inset-0 rounded-full ring-2 ring-[#94a3b8]/30 pointer-events-none" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col items-center md:items-start w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-sm sm:text-base font-semibold tracking-widest uppercase mb-2 select-text text-center md:text-left"
            >
              {heroText[language].greeting}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight select-text mb-2 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80"
              style={{ letterSpacing: '-0.01em' }}
            >
              {heroText[language].name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground select-text mb-3 text-center md:text-left"
            >
              {heroText[language].role}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed select-text mb-6 sm:mb-8 text-center md:text-left relative"
            >
              {typedText}
              <motion.span
                className="inline-block w-0.5 h-5 bg-muted-foreground/60 align-bottom ml-1"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </motion.p>

            {/* Action buttons */}
            <div className="flex flex-col items-center md:items-start w-full gap-4">
              <motion.button
                onClick={handleResumeDownload}
                className="rounded-xl bg-gradient-to-r from-[#334155] to-[#1e293b] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:from-[#1e293b] hover:to-[#334155] focus:ring-2 focus:ring-[#94a3b8]/30 transition-all duration-200 outline-none px-8"
                style={{ 
                  width: BUTTON_WIDTH, 
                  height: BUTTON_HEIGHT,
                  minWidth: BUTTON_WIDTH,
                  minHeight: BUTTON_HEIGHT,
                  maxWidth: BUTTON_WIDTH,
                  maxHeight: BUTTON_HEIGHT,
                  whiteSpace: 'nowrap',
                  lineHeight: '1.6'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={heroText[language].resume}
              >
                <Download className="h-6 w-6" />
                {heroText[language].resume}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.button
          onClick={scrollToAboutMe}
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          whileHover={{ y: 2 }}
          whileTap={{ y: 4 }}
          aria-label="Scroll to About Me section"
        >
          <motion.div
            className="p-2 rounded-full bg-gradient-to-b from-background/40 to-background/30 backdrop-blur-xl border border-foreground/20 shadow-[0_4px_16px_0_rgba(0,0,0,0.06)]"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;