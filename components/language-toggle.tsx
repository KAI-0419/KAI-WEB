"use client"

import { useLanguage } from "@/lib/language-provider"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
      className="h-9 w-9"
    >
      {language === "ko" ? "한" : "EN"}
    </Button>
  )
} 