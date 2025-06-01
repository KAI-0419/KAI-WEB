"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { useRef, useEffect } from "react"

const certificatesText = {
  ko: {
    title: "자격증",
    description: "전문성과 지속적인 학습을 보여주는 자격증과 성과들입니다.",
    issuer: "발급 기관",
    date: "발급일",
    category: "분류",
    skillsAcquired: "습득한 기술",
    certificates: {
      ntuFta: {
        title: "NTU-FTA Series",
        issuer: "Fintech Academy",
        category: "금융 & 기술",
        skills: ["핀테크", "금융 분석", "블록체인"],
      },
      aiWeb: {
        title: " AI를 활용한 웹 서비스 개발",
        issuer: "(주)멀티캠퍼스",
        category: "인공지능",
        skills: ["AI", "머신러닝", "웹 개발"],
      },
      cProgramming: {
        title: "C Programming",
        issuer: "(주)비트컴퓨터",
        category: "프로그래밍",
        skills: ["C 프로그래밍", "알고리즘", "자료구조"],
      },
    },
  },
  en: {
    title: "Certificates",
    description: "Professional certifications and achievements that demonstrate my expertise and continuous learning.",
    issuer: "Issuer",
    date: "Date",
    category: "Category",
    skillsAcquired: "Skills Acquired",
    certificates: {
      ntuFta: {
        title: "NTU-FTA Series",
        issuer: "Fintech Academy",
        category: "Finance & Technology",
        skills: ["FinTech", "Financial Analysis", "Blockchain"],
      },
      aiWeb: {
        title: "AI-based Web Dev",
        issuer: "Multicampus Co., Ltd.",
        category: "Artificial Intelligence",
        skills: ["AI", "Machine Learning", "Web Development"],
      },
      cProgramming: {
        title: "C Programming",
        issuer: "Bit Computer Co., Ltd.",
        category: "Programming",
        skills: ["C Programming", "Algorithms", "Data Structures"],
      },
    },
  },
}

type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  category: string
  skills: string[]
}

const CertificatesSection = () => {
  const { language } = useLanguage()
  const gridRef = useRef<HTMLDivElement>(null)

  // Animate grid fade-in
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.animate([
        { opacity: 0, transform: "translateY(40px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], {
        duration: 900,
        fill: "forwards",
        easing: "ease-out"
      })
    }
  }, [language])

  const certificates: Certificate[] = [
    {
      id: "ntu-fta",
      title: certificatesText[language].certificates.ntuFta.title,
      issuer: certificatesText[language].certificates.ntuFta.issuer,
      date: "Jul 2023",
      category: certificatesText[language].certificates.ntuFta.category,
      skills: certificatesText[language].certificates.ntuFta.skills,
    },
    {
      id: "ai-web",
      title: certificatesText[language].certificates.aiWeb.title,
      issuer: certificatesText[language].certificates.aiWeb.issuer,
      date: "Feb 2023",
      category: certificatesText[language].certificates.aiWeb.category,
      skills: certificatesText[language].certificates.aiWeb.skills,
    },
    {
      id: "c-programming",
      title: certificatesText[language].certificates.cProgramming.title,
      issuer: certificatesText[language].certificates.cProgramming.issuer,
      date: "Jan 2022",
      category: certificatesText[language].certificates.cProgramming.category,
      skills: certificatesText[language].certificates.cProgramming.skills,
    },
  ]

  return (
    <section id="certificates" className="relative py-24 bg-muted/30 overflow-hidden">
      {/* Gradient blob background for section heading */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-[420px] h-[220px] bg-gradient-to-br from-yellow-300/40 via-orange-100/30 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 justify-center relative">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-accent shadow-lg shadow-yellow-200/30">
              <Award className="h-7 w-7 text-white drop-shadow" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-0 section-heading inline-block font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-orange-500 to-primary">
              {certificatesText[language].title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            {certificatesText[language].description}
          </p>
        </motion.div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl hover:scale-[1.03] hover:shadow-yellow-400/40 hover:border-accent/70 transition-all duration-300 animate-fade-in-up"
            >
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100/60 rounded-full">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-orange-500 to-primary">
                    {cert.title}
                  </h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{certificatesText[language].issuer}:</span>
                    <span className="font-medium">{cert.issuer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{certificatesText[language].date}:</span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-yellow-600" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{certificatesText[language].category}:</span>
                    <Badge variant="secondary" className="border-yellow-300/60 bg-yellow-100/40 text-yellow-700 font-semibold shadow-sm">{cert.category}</Badge>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <h4 className="text-sm font-medium mb-2">{certificatesText[language].skillsAcquired}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="border-yellow-300/60 bg-yellow-100/40 text-yellow-700 font-semibold shadow-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificatesSection
