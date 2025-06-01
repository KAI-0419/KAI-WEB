"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const scrollToTopText = {
  ko: {
    ariaLabel: "맨 위로 스크롤",
  },
  en: {
    ariaLabel: "Scroll to top",
  },
}

export const ScrollToTop = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full z-50 shadow-lg"
          size="icon"
          aria-label={scrollToTopText[language].ariaLabel}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
