"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const projectText = {
  ko: {
    title: "프로젝트",
    description: "주요 프로젝트와 성과를 소개합니다.",
    viewDetails: "자세히 보기",
    overview: "개요",
    challenges: "도전 과제",
    solutions: "해결책",
    results: "결과",
  },
  en: {
    title: "My Projects",
    description: "A showcase of my work, demonstrating my skills and experience in front-end development and problem-solving.",
    viewDetails: "View Details",
    overview: "Overview",
    challenges: "Challenges",
    solutions: "Solutions",
    results: "Results",
  },
}

const projects = [
  {
    id: "poincampus",
    ko: {
      title: "포인캠퍼스",
    },
    en: {
      title: "PoinCampus",
    },
    description: {
      ko: "교육 콘텐츠를 만들고 관리하는 데 필요한 모든 도구를 제공하는 교육 플랫폼입니다.",
      en: "An educational platform that provides all the tools needed to create and manage educational content.",
    },
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Vue.js", "JavaScript", "API Integration", "UI/UX"],
    role: "Frontend Developer Intern",
    company: "PoinBlack",
    period: "Mar 2023 - Jun 2023",
    details: {
      overview: {
        ko: "PoinCampus는 교육 플랫폼을 만들고 관리하기 위한 웹 애플리케이션입니다. 콘텐츠 제작, 퀴즈 관리, 결제 처리, 자격증 생성 등의 도구를 제공합니다.",
        en: "PoinCampus is a web application designed to help create and manage educational platforms. It provides tools for content creation, quiz management, payment processing, and certificate generation.",
      },
      challenges: {
        ko: [
          "레거시 코드로 인한 느린 렌더링과 통합 어려움",
          "퀴즈 응시자에 대한 즉각적인 피드백 부족",
          "제한된 결제 옵션",
          "자격증 파일 관리의 비효율성",
        ],
        en: [
          "Legacy code issues causing slow rendering and integration difficulties",
          "Lack of immediate feedback for quiz takers",
          "Limited payment options",
          "Inefficient file management for certificates",
        ],
      },
      solutions: {
        ko: [
          "성능과 유지보수성을 개선하기 위한 코드 리팩토링",
          "24/7 퀴즈 피드백을 위한 ChatGPT API 통합",
          "가상 계좌와 간편 결제를 위한 KCP API 구현",
          "일괄 자격증 다운로드 기능 개발",
        ],
        en: [
          "Code refactoring to improve performance and maintainability",
          "Integration of ChatGPT API for 24/7 quiz feedback",
          "Implementation of KCP API for virtual accounts and easy payments",
          "Development of batch certificate download functionality",
        ],
      },
      technologies: [
        "Vue.js",
        "JavaScript (ES6+)",
        "ChatGPT API",
        "KCP Payment API",
        "Async/Await",
        "Regex",
        "GitLab",
        "Slack",
      ],
      results: {
        ko: [
          "로딩 시간을 4초 이상에서 1초 미만으로 단축",
          "즉각적인 퀴즈 피드백으로 사용자 만족도 향상",
          "더 나은 사용자 경험을 위한 결제 옵션 확장",
          "자격증 관리 프로세스 간소화",
        ],
        en: [
          "Reduced loading time from 4+ seconds to under 1 second",
          "Improved user satisfaction with immediate quiz feedback",
          "Expanded payment options for better user experience",
          "Streamlined certificate management process",
        ],
      },
    },
    links: {
      live: "https://poincampus.com/",
      github: null,
    },
  },
  {
    id: "letsplay",
    ko: {
      title: "랫플",
    },
    en: {
      title: "Let's Play",
    },
    description: {
      ko: "사용자를 스포츠 시설, 레슨, 다른 플레이어와 연결하는 스포츠 매칭 및 시설 예약 플랫폼입니다.",
      en: "A sports matching and facility reservation platform that connects users with sports facilities, lessons, and other players.",
    },
    image: "/placeholder.svg?height=400&width=600",
    tags: ["JavaScript", "Kakao Maps API", "OAuth", "GitHub"],
    role: "Frontend Developer",
    period: "Dec 2022 - Feb 2023",
    details: {
      overview: {
        ko: "Let's Play는 사용자가 스포츠 시설을 찾고 예약하고, 다른 플레이어와 매칭할 수 있는 원스톱 스포츠 플랫폼입니다. 위치 기반 서비스와 소셜 로그인 기능을 통합했습니다.",
        en: "Let's Play is a one-stop sports platform that allows users to find and book sports facilities, lessons, and match with other players. It integrates location-based services and social login features.",
      },
      challenges: {
        ko: [
          "여러 플랫폼에 분산된 정보",
          "신뢰할 수 있는 리뷰와 평점 부족",
          "낮은 스포츠 참여율",
        ],
        en: [
          "Scattered information across multiple platforms",
          "Lack of reliable reviews and ratings",
          "Low sports participation rates",
        ],
      },
      solutions: {
        ko: [
          "스포츠 시설과 레슨을 위한 통합 플랫폼 개발",
          "신뢰할 수 있는 리뷰 시스템 구현",
          "사용자를 연결하는 파트너 매칭 시스템 구축",
        ],
        en: [
          "Development of an integrated platform for sports facilities and lessons",
          "Implementation of a reliable review system",
          "Creation of a partner matching system to connect users",
        ],
      },
      technologies: ["JavaScript", "Kakao Maps API", "OAuth (Naver, Kakao)", "GitHub", "AWS S3"],
      results: {
        ko: [
          "스포츠 정보 중앙화로 접근성 향상",
          "검증된 리뷰로 사용자 신뢰도 향상",
          "사용자 매칭을 통한 스포츠 참여율 증가",
        ],
        en: [
          "Centralized sports information for easier access",
          "Improved user trust with verified reviews",
          "Increased sports participation through user matching",
        ],
      },
    },
    links: {
      live: null,
      github: "https://github.com/multiletsplay/letsplay",
    },
  },
  {
    id: "codeship",
    ko: {
      title: "코드쉽",
    },
    en: {
      title: "Codeship",
    },
    description: {
      ko: "UI/UX를 개선하고 평가자 만족도를 크게 향상시킨 코딩 교육 지원 플랫폼입니다.",
      en: "A coding education support platform that improved UI/UX and led to a significant increase in evaluator satisfaction.",
    },
    image: "/placeholder.svg?height=400&width=600",
    tags: ["UI/UX", "Team Leadership", "Problem Solving"],
    role: "Team Leader",
    period: "Sep 2022",
    details: {
      overview: {
        ko: "Codeship은 평가와 피드백을 위한 도구를 제공하여 코딩 교육을 지원하는 플랫폼입니다. 이 프로젝트는 사용자 인터페이스와 경험을 개선하는 데 중점을 두었습니다.",
        en: "Codeship is a platform designed to support coding education by providing tools for assessment and feedback. The project focused on improving the user interface and experience.",
      },
      challenges: {
        ko: [
          "낮은 평가자 만족도(20%)를 초래하는 불량한 사용자 인터페이스",
          "비효율적인 평가 프로세스",
          "제한된 피드백 메커니즘",
        ],
        en: [
          "Poor user interface leading to low evaluator satisfaction (20%)",
          "Inefficient assessment processes",
          "Limited feedback mechanisms",
        ],
      },
      solutions: {
        ko: [
          "포괄적인 UI/UX 재설계",
          "평가 워크플로우 간소화",
          "향상된 피드백 시스템",
        ],
        en: [
          "Comprehensive UI/UX redesign",
          "Streamlined assessment workflows",
          "Enhanced feedback systems",
        ],
      },
      technologies: ["HTML", "CSS", "JavaScript", "UI/UX Design Principles"],
      results: {
        ko: [
          "평가자 만족도를 20%에서 80%로 향상",
          "비전공자 3명으로 구성된 팀을 이끌어 SW 대학 학과장상 수상",
          "전체 플랫폼 사용성과 효율성 개선",
        ],
        en: [
          "Increased evaluator satisfaction from 20% to 80%",
          "Led a team of 3 non-CS majors to win the SW University Department Director's Award",
          "Improved overall platform usability and efficiency",
        ],
      },
    },
    links: {
      live: null,
      github: null,
    },
  },
]

const ProjectsSection = () => {
  const { language } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
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

  const handleOpenProject = (id: string) => {
    setSelectedProject(id)
    setActiveTab("overview")
  }

  const handleCloseProject = () => {
    setSelectedProject(null)
  }

  const currentProject = projects.find((p) => p.id === selectedProject)

  return (
    <section id="projects" className="relative py-24 bg-muted/30 overflow-hidden">
      {/* Gradient blob background for section heading */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-[420px] h-[220px] bg-gradient-to-br from-pink-400/40 via-orange-200/30 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 justify-center relative">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 via-orange-400 to-accent shadow-lg shadow-pink-300/30">
              <ExternalLink className="h-7 w-7 text-white drop-shadow" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-0 section-heading inline-block font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-700 via-orange-600 to-primary">
              {projectText[language].title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            {projectText[language].description}
          </p>
        </motion.div>

        {/* Masonry/Grid layout */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl hover:scale-[1.03] hover:shadow-pink-400/40 hover:border-accent/70 transition-all duration-300 animate-fade-in-up"
            >
              {/* Project image with overlay */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project[language]?.title || project.ko?.title || project.en?.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-300/30 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300 z-10" />
              </div>
              <CardContent className="p-8 md:p-10">
                <h3 className="text-xl font-bold mb-2 text-primary/90 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-700 via-orange-600 to-primary">
                  {project[language]?.title || project.ko?.title || project.en?.title}
                </h3>
                <p className="text-muted-foreground mb-4 min-h-[48px]">
                  {project.description[language]}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-pink-100/40 text-pink-700 rounded-full text-xs font-medium shadow-sm hover:scale-105 transition-transform border border-pink-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    {project.links.live && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full shadow hover:bg-pink-100/40 hover:text-pink-700 border-pink-200/60 transition-all duration-200"
                      >
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                          <span className="sr-only">Live</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full shadow hover:bg-pink-100/40 hover:text-pink-700 border-pink-200/60 transition-all duration-200"
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <span className="sr-only">GitHub</span>
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-400/80 to-orange-400/80 text-white shadow-lg hover:from-pink-500/90 hover:to-orange-500/90 hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-pink-300/60"
                    onClick={() => handleOpenProject(project.id)}
                  >
                    <span>{projectText[language].viewDetails}</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={handleCloseProject}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-background/90 backdrop-blur-xl border-2 border-primary/20 shadow-2xl">
          {currentProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary/90 tracking-tight">
                  {currentProject[language]?.title || currentProject.ko?.title || currentProject.en?.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {currentProject.role} {currentProject.company && `at ${currentProject.company}`} | {currentProject.period}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={currentProject.image || "/placeholder.svg"}
                  alt={currentProject[language]?.title || currentProject.ko?.title || currentProject.en?.title}
                  className="w-full h-64 object-cover rounded-md mb-6 shadow-lg"
                />
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full bg-primary/10 rounded-lg mb-4">
                    <TabsTrigger value="overview" className="flex-1">{projectText[language].overview}</TabsTrigger>
                    <TabsTrigger value="challenges" className="flex-1">{projectText[language].challenges}</TabsTrigger>
                    <TabsTrigger value="solutions" className="flex-1">{projectText[language].solutions}</TabsTrigger>
                    <TabsTrigger value="results" className="flex-1">{projectText[language].results}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-2">
                    <p className="text-muted-foreground mb-4">{currentProject.details.overview[language]}</p>
                    <h4 className="font-semibold mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {currentProject.details.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="challenges" className="mt-2">
                    <h4 className="font-semibold mb-2">Key Challenges:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {currentProject.details.challenges[language].map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="solutions" className="mt-2">
                    <h4 className="font-semibold mb-2">Solutions Implemented:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {currentProject.details.solutions[language].map((solution, i) => (
                        <li key={i}>{solution}</li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="results" className="mt-2">
                    <h4 className="font-semibold mb-2">Results & Impact:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {currentProject.details.results[language].map((result, i) => (
                        <li key={i}>{result}</li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                {currentProject.links.github && (
                  <Button variant="outline" asChild>
                    <a href={currentProject.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub Repository
                    </a>
                  </Button>
                )}
                {currentProject.links.live && (
                  <Button asChild>
                    <a href={currentProject.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default ProjectsSection
