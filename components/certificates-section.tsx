"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, ChevronRight, ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { cn } from "@/lib/utils"

// 스타일 상수 분리
const STYLES = {
  // 카드 스타일
  card: {
    width: {
      desktop: "calc(100% / 3)", // 데스크탑에서는 3개씩
      tablet: "calc(100% / 2)",  // 태블릿에서는 2개씩
      mobile: "100%",            // 모바일에서는 1개씩
    },
    minWidth: "360px",
    maxWidth: "450px",
    height: "380px", // 카드 전체 높이를 조금 늘림
  },
  // 내부 요소 고정 높이
  cardContent: {
    header: "60px",      // 헤더 높이 늘림
    body: {
      wrapper: "170px",  // 본문 영역 전체 높이 늘림
      item: "52px",      // 각 항목 고정 높이 늘림
    },
    footer: "90px",      // 푸터 높이 늘림
  },
  // 애니메이션 관련
  animation: {
    duration: 12000, // 기본 애니메이션 지속 시간 (ms)
  },
  // 색상 관련
  colors: {
    badge: "border-yellow-300/60 bg-yellow-100/40 text-yellow-700",
    cardBorder: "border-primary/10 hover:border-accent/50",
    cardShadow: "shadow-lg hover:shadow-yellow-400/30",
    titleGradient: "from-yellow-600 via-orange-500 to-primary",
  }
}

const certificatesText = {
  ko: {
    title: "자격증 및 수료증",
    description: "전문성과 지속적인 학습을 보여주는 자격증과 수료증들입니다.",
    issuer: "발급 기관",
    date: "발급일",
    category: "분류",
    skillsAcquired: "습득한 기술",
    viewDetails: "상세 보기",
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
    viewDetails: "View Details",
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

// 카드 컴포넌트 분리
const CertificateCard = ({ 
  cert, 
  language, 
  isClone = false 
}: { 
  cert: Certificate, 
  language: 'ko' | 'en', 
  isClone?: boolean 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "cert-card inline-block px-4",
        "transition-all duration-300",
        "md:w-1/3 sm:w-1/2 w-full",
      )}
      style={{
        minWidth: STYLES.card.minWidth,
        maxWidth: STYLES.card.maxWidth,
      }}
    >
      <motion.div
        initial={!isClone ? { opacity: 0, y: 20 } : undefined}
        whileInView={!isClone ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          "rounded-xl overflow-hidden border-2",
          "bg-white/60 dark:bg-background/60 backdrop-blur-2xl",
          "transition-all duration-300 h-full",
          STYLES.colors.cardBorder,
          STYLES.colors.cardShadow
        )}
      >
        <CardContent className="p-6 flex flex-col h-full justify-between">
          {/* 카드 헤더 - 고정 높이 */}
          <div className="flex items-start gap-3 mb-2" style={{ height: STYLES.cardContent.header }}>
            <div className="p-1.5 bg-yellow-100/60 rounded-full flex-shrink-0 mt-1">
              <Award className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex-grow">
              <h3 className={cn(
                "text-lg font-semibold tracking-tight",
                "bg-clip-text text-transparent bg-gradient-to-r",
                "line-clamp-2 hover:line-clamp-none transition-all duration-300",
                STYLES.colors.titleGradient
              )}>
                {cert.title}
              </h3>
            </div>
          </div>

          {/* 카드 본문 - 고정 높이 */}
          <div className="space-y-1" style={{ height: STYLES.cardContent.body.wrapper }}>
            {/* 발급 기관 - 고정 높이 */}
            <div className="flex flex-col mb-3" style={{ height: STYLES.cardContent.body.item }}>
              <span className="text-muted-foreground text-sm font-medium mb-1">{certificatesText[language].issuer}:</span>
              <span className="font-medium text-sm line-clamp-1 hover:line-clamp-none">{cert.issuer}</span>
            </div>
            
            {/* 발급일 - 고정 높이 */}
            <div className="flex flex-col mb-3" style={{ height: STYLES.cardContent.body.item }}>
              <span className="text-muted-foreground text-sm font-medium mb-1">{certificatesText[language].date}:</span>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-2 text-yellow-600" />
                <span className="text-sm">{cert.date}</span>
              </div>
            </div>
            
            {/* 분류 - 고정 높이 */}
            <div className="flex flex-col mb-5" style={{ height: STYLES.cardContent.body.item }}>
              <span className="text-muted-foreground text-sm font-medium mb-1">{certificatesText[language].category}:</span>
              <Badge variant="secondary" className={cn("text-xs font-semibold shadow-sm w-fit", STYLES.colors.badge)}>
                {cert.category}
              </Badge>
            </div>
          </div>

          {/* 카드 푸터 - 고정 높이 */}
          <div className="pt-4 border-t border-border mt-2" style={{ height: STYLES.cardContent.footer }}>
            <h4 className="text-xs font-medium mb-3">{certificatesText[language].skillsAcquired}:</h4>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill) => (
                <Badge 
                  key={`${cert.id}-${skill}${isClone ? '-clone' : ''}`} 
                  variant="secondary" 
                  className={cn("text-xs font-semibold shadow-sm px-2 py-1", STYLES.colors.badge)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </motion.div>
    </div>
  );
};

const CertificatesSection = () => {
  const { language } = useLanguage()
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselInnerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // 반응형 디스플레이를 위한 카드 표시 개수 계산
  const getVisibleCardCount = () => {
    if (typeof window === 'undefined') return 3; // 서버 사이드 렌더링 시 기본값
    
    if (window.innerWidth < 640) return 1; // 모바일
    if (window.innerWidth < 1024) return 2; // 태블릿
    return 3; // 데스크탑
  };

  // 무한 스크롤 애니메이션 설정
  useEffect(() => {
    if (!carouselInnerRef.current) return;
    
    // 반응형 카드 너비 설정
    const updateCarouselWidth = () => {
      if (!carouselInnerRef.current) return;
      
      const visibleCards = getVisibleCardCount();
      const cardWidth = 100 / visibleCards;
      const totalWidth = cardWidth * certificates.length;
      
      // 무한 스크롤 애니메이션 업데이트
      const animation = carouselInnerRef.current.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${totalWidth}%)` }
        ],
        {
          duration: certificates.length * STYLES.animation.duration,
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
    };

    // 초기 설정
    const cleanup = updateCarouselWidth();
    
    // 화면 크기 변경 시 업데이트
    window.addEventListener('resize', updateCarouselWidth);
    
    return () => {
      cleanup && cleanup();
      window.removeEventListener('resize', updateCarouselWidth);
    };
  }, [certificates.length, language]);

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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 justify-center relative">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-orange-300 to-accent shadow-lg shadow-yellow-200/30">
              <Award className="h-7 w-7 text-white drop-shadow" />
            </span>
            <h2 className={cn(
              "text-3xl md:text-4xl font-bold mb-0 section-heading",
              "inline-block font-poppins tracking-tight",
              "bg-clip-text text-transparent bg-gradient-to-r",
              STYLES.colors.titleGradient
            )}>
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
            className="flex"
          >
            {/* 원본 카드 세트 */}
            {certificates.map((cert) => (
              <CertificateCard 
                key={cert.id}
                cert={cert}
                language={language as 'ko' | 'en'}
              />
            ))}

            {/* 무한 스크롤을 위한 복제 카드 세트 */}
            {certificates.map((cert) => (
              <CertificateCard 
                key={`${cert.id}-clone`}
                cert={cert}
                language={language as 'ko' | 'en'}
                isClone={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificatesSection
