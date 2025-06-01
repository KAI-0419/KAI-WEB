"use client"

import { useLanguage } from "@/lib/language-provider"

const footerText = {
  ko: {
    copyright: "© {year} 이강현. All rights reserved.",
    description: "Front-end Developer | Problem Solver | Continuous Learner",
  },
  en: {
    copyright: "© {year} Kai Lee. All rights reserved.",
    description: "Front-end Developer | Problem Solver | Continuous Learner",
  },
}

const Footer = () => {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground">
          {footerText[language].copyright.replace("{year}", currentYear.toString())}
        </p>
        <p className="text-sm text-muted-foreground mt-2">{footerText[language].description}</p>
      </div>
    </footer>
  )
}

export default Footer
