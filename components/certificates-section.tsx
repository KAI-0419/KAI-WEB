"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const certificatesText = {
  ko: {
    title: "자격증 및 수료증",
    description: "전문성과 지속적인 학습을 보여주는 자격증과 수료증들입니다.",
    issuer: "발급 기관",
    date: "발급일",
    category: "분류",
    skillsAcquired: "습득한 기술",
    certificates: {
      awsCcp: {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services Training and Certification",
        category: "클라우드 컴퓨팅",
        skills: ["AWS", "클라우드 서비스", "인프라", "보안"],
      },
      metaFrontend: {
        title: "Meta Front-End Developer Certificate",
        issuer: "Coursera",
        category: "웹 개발",
        skills: ["React", "JavaScript", "UI/UX", "웹 최적화"],
      },
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
    title: "Certifications & Credentials",
    description: "Professional certifications and credentials that demonstrate my expertise and continuous learning.",
    issuer: "Issuer",
    date: "Date",
    category: "Category",
    skillsAcquired: "Skills Acquired",
    certificates: {
      awsCcp: {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services Training and Certification",
        category: "Cloud Computing",
        skills: ["AWS", "Cloud Services", "Infrastructure", "Security"],
      },
      metaFrontend: {
        title: "Meta Front-End Developer Certificate",
        issuer: "Coursera",
        category: "Web Development",
        skills: ["React", "JavaScript", "UI/UX", "Web Optimization"],
      },
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
  logo?: string
}

const CertificatesSection = () => {
  const { language } = useLanguage()
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselInnerRef = useRef<HTMLDivElement>(null)

  const certificates: Certificate[] = [
    {
      id: "aws-ccp",
      title: certificatesText[language].certificates.awsCcp.title,
      issuer: certificatesText[language].certificates.awsCcp.issuer,
      date: "May 2025",
      category: certificatesText[language].certificates.awsCcp.category,
      skills: certificatesText[language].certificates.awsCcp.skills,
    },
    {
      id: "meta-frontend",
      title: certificatesText[language].certificates.metaFrontend.title,
      issuer: certificatesText[language].certificates.metaFrontend.issuer,
      date: "May 2025",
      category: certificatesText[language].certificates.metaFrontend.category,
      skills: certificatesText[language].certificates.metaFrontend.skills,
    },
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

  // 무한 스크롤 애니메이션 설정
  useEffect(() => {
    if (!carouselInnerRef.current) return;
    
    // 초기 카드 너비 계산 - 고정 너비 사용
    const cardWidth = 700; // 고정된 카드 너비 사용
    const totalWidth = cardWidth * certificates.length;
    
    // 무한 스크롤 애니메이션
    const animation = carouselInnerRef.current.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${totalWidth}px)` }
      ],
      {
        duration: certificates.length * 12000, // 각 카드당 12초로 조정
        iterations: Infinity,
        easing: 'linear'
      }
    );

    // 마우스 오버 시 애니메이션 일시 정지
    const handleMouseEnter = () => {
      animation.pause();
    };

    // 마우스 아웃 시 애니메이션 재개
    const handleMouseLeave = () => {
      animation.play();
    };

    carouselRef.current?.addEventListener('mouseenter', handleMouseEnter);
    carouselRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animation.cancel();
      carouselRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      carouselRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [certificates.length, language]);

  // 카드 너비 계산 (화면에 2.5개 정도 표시)
  const cardWidthPercentage = 100 / 2.5; // 화면에 2.5개 카드 표시

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

        {/* 무한 스크롤 캐러셀 */}
        <div 
          ref={carouselRef}
          className="w-full overflow-hidden relative py-4"
        >
          <div 
            ref={carouselInnerRef}
            className="flex whitespace-nowrap"
          >
            {/* 원본 카드 세트 */}
            {certificates.map((cert) => (
              <div 
                key={cert.id} 
                className="cert-card inline-block px-4"
                style={{ width: `${cardWidthPercentage}%`, minWidth: '320px' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden shadow-lg border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl hover:shadow-yellow-400/30 hover:border-accent/50 transition-all duration-300 h-full"
                >
                  <CardContent className="p-6 h-[320px] flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 bg-yellow-100/60 rounded-full flex-shrink-0">
                        <Award className="h-4 w-4 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-orange-500 to-primary truncate max-w-[200px]">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="space-y-3 mb-4 flex-grow">
                      <div className="flex flex-col sm:items-start gap-1">
                        <span className="text-muted-foreground text-sm">{certificatesText[language].issuer}:</span>
                        <span className="font-medium text-sm truncate max-w-full">{cert.issuer}</span>
                      </div>
                      <div className="flex flex-col sm:items-start gap-1">
                        <span className="text-muted-foreground text-sm">{certificatesText[language].date}:</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-yellow-600" />
                          <span className="text-sm">{cert.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-start gap-1">
                        <span className="text-muted-foreground text-sm">{certificatesText[language].category}:</span>
                        <Badge variant="secondary" className="border-yellow-300/60 bg-yellow-100/40 text-yellow-700 text-xs font-semibold shadow-sm w-fit">
                          {cert.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <h4 className="text-xs font-medium mb-2">{certificatesText[language].skillsAcquired}:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="border-yellow-300/60 bg-yellow-100/40 text-yellow-700 text-xs font-semibold shadow-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              </div>
            ))}

            {/* 무한 스크롤을 위한 복제 카드 세트 */}
            {certificates.map((cert) => (
              <div 
                key={`${cert.id}-clone`} 
                className="cert-card inline-block px-4"
                style={{ width: `${cardWidthPercentage}%`, minWidth: '320px' }}
              >
                <div
                  className="rounded-xl overflow-hidden shadow-lg border-2 border-primary/10 bg-white/60 dark:bg-background/60 backdrop-blur-2xl hover:shadow-yellow-400/30 hover:border-accent/50 transition-all duration-300 h-full"
                >
                  <CardContent className="p-6 h-[320px] flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 bg-yellow-100/60 rounded-full flex-shrink-0">
                        <Award className="h-4 w-4 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-orange-500 to-primary truncate max-w-[200px]">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="space-y-3 mb-4 flex-grow">
                      <div className="flex flex-col sm:items-start gap-1">
                        <span className="text-muted-foreground text-sm">{certificatesText[language].issuer}:</span>
                        <span className="font-medium text-sm truncate max-w-full">{cert.issuer}</span>
                      </div>
                      <div className="flex flex-col sm:items-start gap-1">
                        <span className="text-muted-foreground text-sm">{certificatesText[language].date}:</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-yellow-600" />
                          <span className="text-sm">{cert.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-start gap-1">
                        <span className="text-muted-foreground text-sm">{certificatesText[language].category}:</span>
                        <Badge variant="secondary" className="border-yellow-300/60 bg-yellow-100/40 text-yellow-700 text-xs font-semibold shadow-sm w-fit">
                          {cert.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <h4 className="text-xs font-medium mb-2">{certificatesText[language].skillsAcquired}:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="border-yellow-300/60 bg-yellow-100/40 text-yellow-700 text-xs font-semibold shadow-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificatesSection
