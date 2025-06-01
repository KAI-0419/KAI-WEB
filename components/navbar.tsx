"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, Globe } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-provider"
import { motion } from "framer-motion"

const navText = {
  ko: {
    about: "소개",
    projects: "프로젝트",
    skills: "기술",
    experience: "경력",
    certificates: "자격증",
    contact: "연락하기",
  },
  en: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    certificates: "Certificates",
    contact: "Contact",
  },
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [toggleOpen, setToggleOpen] = useState(false)
  const [lastToggle, setLastToggle] = useState<'lang' | 'mode'>('lang')
  const [activeSection, setActiveSection] = useState<string>('')
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { language, setLanguage } = useLanguage()
  const toggleTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ["about", "projects", "skills", "experience", "certificates", "contact"]
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(currentSection || '')
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  // Auto-collapse toggle after 2s
  const handleToggleOpen = (type: 'lang' | 'mode') => {
    setToggleOpen(true)
    setLastToggle(type)
    if (toggleTimeout.current) clearTimeout(toggleTimeout.current)
    toggleTimeout.current = setTimeout(() => setToggleOpen(false), 2000)
  }

  return (
    <header
      className={cn(
        "fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] sm:w-[95vw] max-w-5xl rounded-2xl transition-all duration-500",
        isScrolled
          ? "bg-gradient-to-b from-white/40 to-white/30 dark:from-background/40 dark:to-background/30 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border border-white/20 dark:border-white/10 py-1 sm:py-1.5 scale-95"
          : "bg-gradient-to-b from-white/30 to-white/20 dark:from-background/30 dark:to-background/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] border border-white/20 dark:border-white/10 py-1.5 sm:py-2 scale-100"
      )}
    >
      <div className="container mx-auto px-3 sm:px-6 flex items-center justify-between">
        <a
          href="#"
          className="group flex items-center gap-2 text-xl sm:text-2xl font-medium tracking-wider font-sans bg-gradient-to-r from-pink-500 via-blue-500 to-violet-500 text-transparent bg-clip-text drop-shadow-lg transition-transform duration-300 hover:scale-105"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          KΛI
        </a>
        {!isMobile && (
          <nav className="flex-1 flex justify-center">
            <ul className="flex gap-10 font-medium tracking-wide text-base">
              {["about", "projects", "skills", "experience", "certificates", "contact"].map((item) => (
                <li key={item} className="relative">
                  <Button
                    variant="ghost"
                    className={cn(
                      "capitalize px-3 py-2 h-9 flex items-center font-medium tracking-wide text-base bg-transparent hover:bg-white/20 dark:hover:bg-white/10 hover:text-accent-foreground transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r from-pink-500 via-blue-500 to-violet-500 after:rounded-full after:transition-all hover:after:w-3/4 focus-visible:after:w-3/4",
                      activeSection === item && "text-accent-foreground after:w-3/4"
                    )}
                    onClick={() => scrollToSection(item)}
                    aria-label={(navText[language] as Record<string, string>)[item]}
                  >
                    {(navText[language] as Record<string, string>)[item]}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {isMobile ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 sm:h-10 rounded-full bg-gradient-to-b from-white/40 to-white/30 dark:from-background/40 dark:to-background/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.06)] overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors text-base font-medium focus:z-20"
                aria-label={language === "ko" ? "Switch to English" : "한국어로 전환"}
                tabIndex={0}
              >
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="w-px h-5 bg-white/20 dark:bg-white/10 my-2.5 mx-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggleOpen('mode')}
                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors text-base font-medium focus:z-20"
                aria-label="Toggle theme"
              >
                <ModeToggle />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </Button>
          </div>
        ) : (
          <div className="ml-auto flex items-center">
            <div
              className={cn(
                "relative group flex items-center",
                toggleOpen ? "z-50" : ""
              )}
              onMouseEnter={() => setToggleOpen(true)}
              onMouseLeave={() => setToggleOpen(false)}
              onFocus={() => setToggleOpen(true)}
              onBlur={() => setToggleOpen(false)}
            >
              <div
                className={cn(
                  `flex items-center ${toggleOpen ? 'justify-between gap-x-0.5 w-24 px-2' : 'justify-center w-10 px-0'} bg-gradient-to-b from-white/40 to-white/30 dark:from-background/40 dark:to-background/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.06)] rounded-full overflow-hidden transition-all duration-300 h-10`
                )}
                tabIndex={0}
                aria-label={language === "ko" ? "언어/모드" : "Lang/Mode"}
              >
                {toggleOpen ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => { setLanguage(language === "ko" ? "en" : "ko"); handleToggleOpen('lang'); }}
                      className="h-8 w-8 flex items-center justify-center rounded-full transition-none text-base font-medium focus:z-20 !bg-transparent !text-inherit !shadow-none !outline-none"
                      aria-label={language === "ko" ? "Switch to English" : "한국어로 전환"}
                    >
                      <Globe className="h-5 w-5" />
                    </Button>
                    <div
                      className="h-8 w-8 flex items-center justify-center font-medium cursor-pointer"
                      onClick={() => handleToggleOpen('mode')}
                      tabIndex={0}
                      role="button"
                      aria-label="Toggle mode"
                      style={{ background: 'transparent', color: 'inherit', boxShadow: 'none', outline: 'none' }}
                    >
                      <ModeToggle />
                    </div>
                  </>
                ) : lastToggle === 'lang' ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => { setLanguage(language === "ko" ? "en" : "ko"); handleToggleOpen('lang'); }}
                    className="h-8 w-8 flex items-center justify-center rounded-full transition-none text-base font-medium focus:z-20 !bg-transparent !text-inherit !shadow-none !outline-none"
                    aria-label={language === "ko" ? "Switch to English" : "한국어로 전환"}
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                ) : (
                  <div
                    className="h-8 w-8 flex items-center justify-center font-medium cursor-pointer"
                    onClick={() => handleToggleOpen('mode')}
                    tabIndex={0}
                    role="button"
                    aria-label="Toggle mode"
                    style={{ background: 'transparent', color: 'inherit', boxShadow: 'none', outline: 'none' }}
                  >
                    <ModeToggle />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : -20
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "absolute top-full left-0 right-0 bg-gradient-to-b from-white/40 to-white/30 dark:from-background/40 dark:to-background/30 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-2xl mt-2 border border-white/20 dark:border-white/10",
            isMenuOpen ? "visible" : "invisible"
          )}
        >
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex flex-col gap-2 font-medium">
              {["about", "projects", "skills", "experience", "certificates", "contact"].map((item) => (
                <li key={item} className="relative">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start capitalize px-4 py-2 h-10 flex items-center font-medium tracking-wide text-sm bg-transparent hover:bg-white/20 dark:hover:bg-white/10 hover:text-accent-foreground transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r from-pink-500 via-blue-500 to-violet-500 after:rounded-full after:transition-all hover:after:w-3/4 focus-visible:after:w-3/4",
                      activeSection === item && "text-accent-foreground after:w-3/4"
                    )}
                    onClick={() => scrollToSection(item)}
                    aria-label={(navText[language] as Record<string, string>)[item]}
                  >
                    {(navText[language] as Record<string, string>)[item]}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar
