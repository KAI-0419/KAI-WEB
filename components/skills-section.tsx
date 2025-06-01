"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-provider"
import { Code2, Database, Globe, Layers, Palette, Server } from "lucide-react"
import { useRef, useEffect } from "react"

const skillsText = {
  ko: {
    title: "기술 스택",
    description: "프론트엔드 개발과 관련된 다양한 기술들을 다룹니다.",
    categories: {
      frontend: "프론트엔드",
      backend: "백엔드",
      database: "데이터베이스",
      devops: "DevOps",
      design: "디자인",
      other: "기타 기술",
    },
    additional: {
      title: "추가 기술",
    },
  },
  en: {
    title: "Skills",
    description: "Various technologies I work with in front-end development.",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
      design: "Design",
      other: "Other Skills",
    },
    additional: {
      title: "Additional Skills",
    },
  },
}

const skillCategories = [
  {
    name: "Frontend",
    icon: <Code2 className="h-5 w-5 text-primary" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    description: {
      ko: "모던 프론트엔드 프레임워크와 라이브러리를 활용한 웹 애플리케이션 개발",
      en: "Web application development using modern frontend frameworks and libraries",
    },
  },
  {
    name: "Backend",
    icon: <Server className="h-5 w-5 text-primary" />,
    skills: ["Node.js", "Express", "REST API", "GraphQL", "Python"],
    description: {
      ko: "서버 사이드 개발 및 API 설계와 구현",
      en: "Server-side development and API design & implementation",
    },
  },
  {
    name: "Database",
    icon: <Database className="h-5 w-5 text-primary" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    description: {
      ko: "다양한 데이터베이스 시스템을 활용한 데이터 관리",
      en: "Data management using various database systems",
    },
  },
  {
    name: "DevOps",
    icon: <Layers className="h-5 w-5 text-primary" />,
    skills: ["Git", "Docker", "AWS", "CI/CD", "Linux"],
    description: {
      ko: "개발 환경 구축 및 배포 자동화",
      en: "Development environment setup and deployment automation",
    },
  },
  {
    name: "Design",
    icon: <Palette className="h-5 w-5 text-primary" />,
    skills: ["Figma", "Adobe XD", "UI/UX", "Responsive Design", "Wireframing"],
    description: {
      ko: "사용자 중심의 인터페이스 디자인 및 프로토타이핑",
      en: "User-centered interface design and prototyping",
    },
  },
  {
    name: "Other",
    icon: <Globe className="h-5 w-5 text-primary" />,
    skills: ["Agile", "Scrum", "Technical Writing", "Problem Solving", "Team Leadership"],
    description: {
      ko: "프로젝트 관리 및 협업 도구 활용",
      en: "Project management and collaboration tools",
    },
  },
]

const additionalSkills = [
  "GitHub",
  "Jira",
  "Slack",
  "VS Code",
  "Postman",
  "Webpack",
  "Jest",
  "Cypress",
]

const SkillsSection = () => {
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

  return (
    <section id="skills" className="relative py-24 bg-muted/30 overflow-hidden">
      {/* Gradient blob background for section heading */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-[420px] h-[220px] bg-gradient-to-br from-blue-400/40 via-teal-200/30 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 justify-center relative">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-teal-400 to-accent shadow-lg shadow-blue-300/30">
              <Code2 className="h-7 w-7 text-white drop-shadow" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-0 section-heading inline-block font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-teal-700 to-primary">
              {skillsText[language].title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            {skillsText[language].description}
          </p>
        </motion.div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl hover:scale-[1.03] hover:shadow-blue-400/40 hover:border-accent/70 transition-all duration-300 relative animate-fade-in-up"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400/40 via-teal-300/30 to-transparent" />
              <div className="p-10 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2">
                  {cat.icon}
                  <h3 className="text-lg font-semibold text-primary/90 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-teal-700 to-primary">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100/40 text-blue-700 rounded-full text-xs font-medium shadow-sm hover:scale-105 transition-transform border border-blue-200/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {cat.description[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection