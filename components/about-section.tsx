"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-provider"
import { Code2, Globe, Layers, Lightbulb, Rocket, Users } from "lucide-react"
import { useEffect, useRef } from "react"

const heroText = {
  ko: {
    greeting: "안녕하세요,",
    name: "이강현",
    role: "프론트엔드 개발자",
    description: "누군가는 하던 일을 계속할 때, 해보지 않은 일에 도전하며 다양한 관점으로 문제를 해결하며 리딩해왔습니다.",
    resume: "이력서 다운로드",
    contact: "연락하기",
  },
  en: {
    greeting: "Hi, I'm",
    name: "Kai Lee",
    role: "Frontend Developer",
    description: "A frontend developer who values user experience. I build beautiful and functional web applications using modern web technologies.",
    resume: "Download CV",
    contact: "Contact Me",
  },
}

const aboutText = {
  ko: {
    title: "About Me",
    description: "누군가는 하던 일을 계속할 때, 해보지 않은 일에 도전하며 다양한 관점으로 문제를 해결하며 리딩해왔습니다.",
    skills: {
      title: "기술 스택",
      frontend: "프론트엔드",
      backend: "백엔드",
      tools: "도구",
    },
    experience: {
      title: "경험",
      years: "실무 경력(년)",
      projects: "프로젝트 완료",
      lead: "프로젝트 기획 및 리드 경험",
    },
    strengths: {
      title: "강점",
      clean: {
        title: "깔끔한 코드",
        description: "유지보수가 용이하고 확장 가능한 코드를 작성합니다.",
      },
      responsive: {
        title: "반응형 디자인",
        description: "모든 디바이스에서 최적의 사용자 경험을 제공합니다.",
      },
      performance: {
        title: "성능 최적화",
        description: "빠른 로딩과 부드러운 애니메이션을 구현합니다.",
      },
      collaboration: {
        title: "협업 능력",
        description: "효과적인 커뮤니케이션과 팀워크를 중시합니다.",
      },
      problem: {
        title: "문제 해결",
        description: "복잡한 문제를 창의적으로 해결합니다.",
      },
      learning: {
        title: "지속적 학습",
        description: "최신 기술 트렌드를 지속적으로 학습합니다.",
      },
    },
  },
  en: {
    title: "About Me",
    description: "Learn about my journey and expertise as a frontend developer.",
    skills: {
      title: "Tech Stack",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
    },
    experience: {
      title: "Experience",
      years: "Years (Professional)",
      projects: "Projects Completed",
      lead: "Project Leadership & Execution",
    },
    strengths: {
      title: "Strengths",
      clean: {
        title: "Clean Code",
        description: "Writing maintainable and scalable code.",
      },
      responsive: {
        title: "Responsive Design",
        description: "Providing optimal user experience across all devices.",
      },
      performance: {
        title: "Performance",
        description: "Implementing fast loading and smooth animations.",
      },
      collaboration: {
        title: "Collaboration",
        description: "Valuing effective communication and teamwork.",
      },
      problem: {
        title: "Problem Solving",
        description: "Solving complex problems creatively.",
      },
      learning: {
        title: "Continuous Learning",
        description: "Continuously learning new technologies.",
      },
    },
  },
}

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase"],
  tools: ["Git", "VS Code", "Figma", "Docker", "Vercel"],
}

const experience = [
  { value: "<1", label: "years" },
  { value: "15+", label: "projects" },
  { value: "5+", label: "lead" },
]

const strengths = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "clean",
    description: "clean",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "responsive",
    description: "responsive",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "performance",
    description: "performance",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "collaboration",
    description: "collaboration",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "problem",
    description: "problem",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "learning",
    description: "learning",
  },
]

const AboutSection = () => {
  const { language } = useLanguage()

  // Animation for accent line
  const accentLineRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (accentLineRef.current) {
      accentLineRef.current.animate([
        { height: "0%" },
        { height: "100%" }
      ], {
        duration: 900,
        fill: "forwards",
        easing: "ease-out"
      })
    }
  }, [language])

  return (
    <section id="about" className="relative py-24 bg-muted/30 overflow-hidden">
      {/* Gradient blob background for section heading */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-[420px] h-[220px] bg-gradient-to-br from-violet-400/40 via-indigo-200/30 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 justify-center relative">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 via-indigo-400 to-accent shadow-lg shadow-violet-300/30">
              <Code2 className="h-7 w-7 text-white drop-shadow" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-0 section-heading inline-block font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-indigo-700 to-primary">
              {aboutText[language].title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            {aboutText[language].description}
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          {/* Vertical accent line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-300/40 via-indigo-200/30 to-transparent rounded-full" ref={accentLineRef} style={{height: '100%'}} />

          {/* Skills Card */}
          <motion.div
            initial={{ opacity: 0, x: -24, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="animate-fade-in-up"
          >
            <Card className="h-full border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl shadow-2xl shadow-violet-300/20 rounded-3xl md:rounded-4xl transition-all duration-300 hover:scale-[1.03] hover:shadow-violet-400/40 hover:border-accent/70">
              <CardContent className="p-10">
                <h3 className="text-xl font-semibold mb-6 text-primary/90 tracking-tight flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-indigo-700 to-primary">
                  <Code2 className="h-6 w-6 text-violet-500" /> {aboutText[language].skills.title}
                </h3>
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-medium mb-2 text-primary/80 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-violet-400/60" />
                        {(aboutText[language].skills as Record<string, string>)[category]}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-violet-100/40 text-violet-700 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition-transform border border-violet-200/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Strengths Card */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="animate-fade-in-up"
          >
            <Card className="h-full border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl shadow-2xl shadow-violet-300/20 rounded-3xl md:rounded-4xl transition-all duration-300 hover:scale-[1.03] hover:shadow-violet-400/40 hover:border-accent/70">
              <CardContent className="p-10">
                <h3 className="text-xl font-semibold mb-6 text-primary/90 tracking-tight flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-indigo-700 to-primary">
                  <Lightbulb className="h-6 w-6 text-violet-500" /> {aboutText[language].strengths.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {strengths.map((strength) => (
                    <div
                      key={strength.title}
                      className="flex items-start gap-3 p-4 bg-violet-100/40 rounded-lg hover:bg-violet-200/60 transition-colors shadow-sm border border-violet-200/60"
                    >
                      <div className="p-2 bg-violet-200/40 rounded-lg shrink-0">
                        {strength.icon}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-primary/80">
                          {(aboutText[language].strengths as Record<string, any>)[strength.title].title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {(aboutText[language].strengths as Record<string, any>)[strength.title].description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Experience summary */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 animate-fade-in-up"
        >
          <Card className="border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl shadow-2xl shadow-violet-300/20 rounded-3xl md:rounded-4xl transition-all duration-300 hover:scale-[1.03] hover:shadow-violet-400/40 hover:border-accent/70">
            <CardContent className="p-10">
              <h3 className="text-xl font-semibold mb-6 text-center text-primary/90 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-indigo-700 to-primary">{aboutText[language].experience.title}</h3>
              <div className="grid grid-cols-3 gap-4">
                {experience.map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-3xl font-bold text-violet-700 mb-1 drop-shadow-lg">{item.value}</p>
                    <p className="text-muted-foreground">{(aboutText[language].experience as Record<string, string>)[item.label]}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
