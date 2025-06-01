"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Building, Calendar, GraduationCap, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/lib/language-provider"

const experienceText = {
  ko: {
    title: "성장 여정",
    description: "나의 성장을 이끈 경험과 배움의 기록입니다.",
    viewDetails: "자세히 보기",
    close: "닫기",
    experiences: {
      koica: {
        title: " KOICA 청년중기봉사단 (디지털)",
        company: "KOICA",
        location: "Arusha, Tanzania",
        shortDescription: "400명 이상의 학생을 대상으로 웹 개발 교육 및 IT 인프라 확장을 주도",
        fullDescription:
          "프로젝트 운영 및 예산 관리. 웹 개발 교육 실시 및 IT 인프라 확장. 400명 이상의 학생에게 웹 개발을 가르치고, 최종 평가에서 평균 82.8%의 정확도를 달성했습니다. HTML/CSS를 사용한 포트폴리오 웹 페이지 개발을 지도하여 90%의 완성도를 달성했습니다. 컴퓨터 수를 7대에서 40대로 늘리고 라우터, 프린터, 프로젝터를 설치하여 IT 인프라를 확장했습니다.",
      },
      transputec: {
        title: "인턴 · QA/테스터",
        company: "Transputec Ltd",
        location: "Wembley, United Kingdom",
        shortDescription: "웹 및 모바일 애플리케이션의 기능 및 보안 테스트 수행",
        fullDescription:
          "Crises Control 웹 및 모바일 애플리케이션의 기능 및 보안 테스트를 수행했습니다. 국제 개발자들과 협력하여 효율적인 커뮤니케이션 방법과 다양한 문제 해결 접근 방식을 배웠습니다.",
      },
      poinblack: {
        title: "인턴 · 프론트엔드 개발",
        company: "(주)포인블랙",
        location: "Anyang, South Korea",
        shortDescription: "웹 성능 최적화 및 서비스 확장으로 로딩 시간을 4초 이상에서 1초 미만으로 단축",
        fullDescription:
          "레거시 코드를 리팩토링하여 UI와 성능을 개선하고, 로딩 시간을 4초 이상에서 1초 미만으로 단축했습니다. ChatGPT 기반 퀴즈 피드백 시스템, 가상계좌와 간편결제를 위한 KCP API 통합, 일괄 인증서 다운로드 기능 등 새로운 기능을 개발했습니다.",
      },
      wonkwang: {
        title: "원광대학교",
        company: "원광대학교",
        location: "Iksan, South Korea",
        shortDescription: "NTU FinTech Academy 학생 대표로 선발되고 웹 개발 대회에서 장려상 수상",
        fullDescription:
          "NTU FinTech Academy 인재 양성 프로그램의 학생 대표로 선발되어 통역을 담당했습니다. SW중심대학 웹 개발 대회에서 팀 리더로 참가하여 장려상을 수상했습니다. 중앙 프로그래밍 동아리(Artineer)에서 멘티와 멘토로 활동했습니다. 중앙 검도부(원검회) 부회장을 역임했습니다.",
      },
    },
  },
  en: {
    title: "Journey & Learning",
    description: "A record of experiences and learning that shaped my growth.",
    viewDetails: "View Details",
    close: "Close",
    experiences: {
      koica: {
        title: "KOICA Youth Middle-term Volunteer (Digital)",
        company: "KOICA",
        location: "Arusha, Tanzania",
        shortDescription: "Led web development education and IT infrastructure expansion for 400+ students",
        fullDescription:
          "Managed project operations and budget. Conducted web development education and expanded IT infrastructure. Taught web development to over 400 students, achieving an average accuracy rate of 82.8% in the final assessment. Guided the development of portfolio web pages using HTML/CSS with a 90% completion rate. Expanded IT infrastructure by increasing the number of computers from 7 to 40 and installing routers, printers, and projectors.",
      },
      transputec: {
        title: "Intern · QA/Tester",
        company: "Transputec Ltd",
        location: "Wembley, United Kingdom",
        shortDescription: "Performed functionality and security testing for web and mobile applications",
        fullDescription:
          "Performed functionality and security testing for the Crises Control web and mobile applications. Collaborated with international developers to learn efficient communication methods and diverse problem-solving approaches.",
      },
      poinblack: {
        title: "Intern · Front-End Developer",
        company: "PoinBlack Inc.",
        location: "Anyang, South Korea",
        shortDescription: "Optimized web performance and expanded services, reducing loading time from 4+ seconds to under 1 second",
        fullDescription:
          "Optimized web performance and expanded services by refactoring legacy code to improve UI and performance, reducing loading time from over 4 seconds to under 1 second. Developed new features including a ChatGPT-based quiz feedback system, integrated KCP API for virtual accounts and easy payments, and created a batch certificate download feature.",
      },
      wonkwang: {
        title: "Wonkwang University",
        company: "Wonkwang University",
        location: "Iksan, South Korea",
        shortDescription: "Selected as NTU FinTech Academy student representative and won an encouragement award in web development",
        fullDescription:
          "Selected as a student representative for the NTU FinTech Academy Talent Programme and served as an interpreter. Won an encouragement award as a team leader in the SW-centered University web development competition. Participated in the central programming club (Artineer) as both a mentee and mentor. Served as vice president of the central Kendo club (Wongeomhoe).",
      },
    },
  },
}

type Experience = {
  id: string
  type: "work" | "education" | "volunteer"
  title: string
  company: string
  location: string
  period: string
  shortDescription: string
  fullDescription: string
  skills: string[]
}

const ExperienceSection = () => {
  const { language } = useLanguage()
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Animate timeline fade-in
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.animate([
        { opacity: 0, transform: "translateY(40px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], {
        duration: 900,
        fill: "forwards",
        easing: "ease-out"
      })
    }
  }, [language])

  const openDialog = (experience: Experience) => {
    setSelectedExperience(experience)
  }

  const closeDialog = () => {
    setSelectedExperience(null)
  }

  const experiences: Experience[] = [
    {
      id: "koica",
      type: "volunteer",
      title: experienceText[language].experiences.koica.title,
      company: experienceText[language].experiences.koica.company,
      location: experienceText[language].experiences.koica.location,
      period: "Aug 2024 - Jan 2025",
      shortDescription: experienceText[language].experiences.koica.shortDescription,
      fullDescription: experienceText[language].experiences.koica.fullDescription,
      skills: ["Leadership", "Education", "Web Development", "Project Management"],
    },
    {
      id: "transputec",
      type: "work",
      title: experienceText[language].experiences.transputec.title,
      company: experienceText[language].experiences.transputec.company,
      location: experienceText[language].experiences.transputec.location,
      period: "Jan 2024 - Feb 2024",
      shortDescription: experienceText[language].experiences.transputec.shortDescription,
      fullDescription: experienceText[language].experiences.transputec.fullDescription,
      skills: ["QA", "Testing", "International Collaboration"],
    },
    {
      id: "poinblack",
      type: "work",
      title: experienceText[language].experiences.poinblack.title,
      company: experienceText[language].experiences.poinblack.company,
      location: experienceText[language].experiences.poinblack.location,
      period: "Mar 2023 - Jun 2023",
      shortDescription: experienceText[language].experiences.poinblack.shortDescription,
      fullDescription: experienceText[language].experiences.poinblack.fullDescription,
      skills: ["Vue.js", "API Integration", "Performance Optimization", "UI/UX"],
    },
    {
      id: "wonkwang",
      type: "education",
      title: experienceText[language].experiences.wonkwang.title,
      company: experienceText[language].experiences.wonkwang.company,
      location: experienceText[language].experiences.wonkwang.location,
      period: "Mar 2019 - Aug 2025",
      shortDescription: experienceText[language].experiences.wonkwang.shortDescription,
      fullDescription: experienceText[language].experiences.wonkwang.fullDescription,
      skills: ["Leadership", "Teamwork", "Web Development"],
    },
  ]

  return (
    <section id="experience" className="relative py-24 bg-muted/30 overflow-hidden">
      {/* Enhanced gradient blob background */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-[420px] h-[220px] bg-gradient-to-br from-purple-400/40 via-blue-300/30 to-transparent rounded-full blur-3xl opacity-70 animate-pulse" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 justify-center relative">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-accent shadow-lg shadow-purple-300/30 animate-pulse">
              <Briefcase className="h-7 w-7 text-white drop-shadow" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-0 section-heading inline-block font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-blue-700 to-primary">
              {experienceText[language].title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            {experienceText[language].description}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Enhanced timeline accent line with gradient animation */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-300/40 via-blue-200/30 to-transparent rounded-full -translate-x-1/2 z-0 animate-pulse" />
          
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative mb-16 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:ml-auto md:mr-0 md:pl-0" : "md:pl-12 md:mr-auto md:ml-0 md:pr-0"} animate-fade-in-up`}
              style={{ zIndex: 1 }}
              onMouseEnter={() => setHoveredExperience(exp.id)}
              onMouseLeave={() => setHoveredExperience(null)}
            >
              {/* Enhanced glowing dot with animation */}
              <div
                className={`absolute left-0 md:left-auto ${index % 2 === 0 ? "md:right-0" : "md:left-0"} top-0 flex flex-col items-center z-10 transition-transform duration-300 ${hoveredExperience === exp.id ? 'scale-110' : ''}`}
                style={{ minWidth: '3.5rem' }}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-accent shadow-2xl shadow-purple-400/40 border-4 border-white/60 flex items-center justify-center relative transition-all duration-300 ${hoveredExperience === exp.id ? 'scale-110 shadow-purple-400/60' : ''}`}>
                  <span className={`absolute w-16 h-16 rounded-full bg-purple-300/30 blur-2xl transition-all duration-300 ${hoveredExperience === exp.id ? 'animate-pulse scale-125' : ''}`} />
                  {exp.type === "work" ? (
                    <Briefcase className="h-5 w-5 text-white drop-shadow transition-transform duration-300" style={{ transform: hoveredExperience === exp.id ? 'rotate(12deg)' : 'none' }} />
                  ) : exp.type === "education" ? (
                    <GraduationCap className="h-5 w-5 text-white drop-shadow transition-transform duration-300" style={{ transform: hoveredExperience === exp.id ? 'rotate(12deg)' : 'none' }} />
                  ) : (
                    <Briefcase className="h-5 w-5 text-white drop-shadow transition-transform duration-300" style={{ transform: hoveredExperience === exp.id ? 'rotate(12deg)' : 'none' }} />
                  )}
                </div>
              </div>

              <Card
                className={`border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl shadow-2xl shadow-purple-300/20 rounded-3xl md:rounded-4xl transition-all duration-300 cursor-pointer
                  ${hoveredExperience === exp.id 
                    ? 'scale-[1.03] shadow-purple-400/40 border-accent/70 transform -translate-y-1' 
                    : 'hover:scale-[1.02] hover:shadow-purple-300/30'}`}
                onClick={() => openDialog(exp)}
              >
                <CardContent className="p-10 md:p-12">
                  <div className="flex flex-col gap-1 mb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-primary/90 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-blue-700 to-primary">
                        {exp.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Building className="h-4 w-4 mr-1 shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1 shrink-0" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 min-h-[40px]">{exp.shortDescription}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.slice(0, 3).map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className={`border-purple-300/60 bg-purple-100/40 text-purple-700 font-semibold shadow-sm transition-all duration-300
                          ${hoveredExperience === exp.id ? 'bg-purple-200/60 scale-105' : 'hover:bg-purple-200/60'}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                    {exp.skills.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className={`border-purple-300/60 bg-purple-100/40 text-purple-700 font-semibold shadow-sm transition-all duration-300
                          ${hoveredExperience === exp.id ? 'bg-purple-200/60 scale-105' : 'hover:bg-purple-200/60'}`}
                      >
                        +{exp.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Experience Detail Dialog */}
      <Dialog open={selectedExperience !== null} onOpenChange={closeDialog}>
        {selectedExperience && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-blue-700 to-primary">
                {selectedExperience.title}
              </DialogTitle>
              <DialogDescription className="text-base">
                {selectedExperience.company}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{selectedExperience.location}</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{selectedExperience.period}</span>
              </div>

              <div className="pt-2">
                <h4 className="font-semibold mb-2 text-primary/90">Description</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedExperience.fullDescription}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-primary/90">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline"
                      className="border-purple-300/60 bg-purple-100/40 text-purple-700 font-semibold shadow-sm hover:bg-purple-200/60 transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}

export default ExperienceSection
