"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import emailjs from '@emailjs/browser'

const contactText = {
  ko: {
    title: "연락하기",
    description: "프로젝트나 기회에 대해 논의하고 싶으신가요? 아래의 채널을 통해 언제든지 연락해 주세요.",
    contactInfo: "연락처 정보",
    sendMessage: "메시지 보내기",
    name: "이름",
    email: "이메일",
    subject: "제목",
    message: "메시지",
    sending: "전송 중...",
    followMe: "팔로우하기",
    messageSent: "메시지가 전송되었습니다!",
    messageSentDesc: "메시지를 보내주셔서 감사합니다. 곧 답변 드리겠습니다.",
  },
  en: {
    title: "Get In Touch",
    description: "Have a project in mind or want to discuss potential opportunities? Feel free to reach out to me through any of the channels below.",
    contactInfo: "Contact Information",
    sendMessage: "Send Message",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    sending: "Sending...",
    followMe: "Follow Me",
    messageSent: "Message sent!",
    messageSentDesc: "Thank you for your message. I'll get back to you soon.",
  },
}

const ContactSection = () => {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    emailjs.init('udIHwPKN0OP5SD90e')
  }, [])

  // Enhanced grid fade-in animation
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await emailjs.send(
        'service_287rvbh',
        'template_iwnvp8o',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'a90605190@gmail.com',
          reply_to: formData.email
        },
        'udIHwPKN0OP5SD90e'
      )
      if (result.status === 200) {
        toast({
          title: contactText[language].messageSent,
          description: contactText[language].messageSentDesc,
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: language === 'ko' ? '메시지 전송 오류' : 'Message sending error',
        description: language === 'ko' ? '메시지 전송 중 오류가 발생했습니다. 나중에 다시 시도해주세요.' : 'An error occurred while sending your message. Please try again later.',
      })
    }
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      label: "Email",
      value: "a90605190@gmail.com",
      link: "mailto:a90605190@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      label: "Phone",
      value: "+82 10-9060-5190",
      link: "tel:+821090605190",
    },
    {
      icon: <Github className="h-5 w-5 text-primary" />,
      label: "GitHub",
      value: "github.com/kailee",
      link: "https://github.com/kailee",
    },
    {
      icon: <Linkedin className="h-5 w-5 text-primary" />,
      label: "LinkedIn",
      value: "linkedin.com/in/kai0419",
      link: "https://www.linkedin.com/in/kai0419/",
    },
  ]

  return (
    <section id="contact" className="relative py-24 bg-muted/30 overflow-hidden">
      {/* Enhanced gradient blob background */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-[420px] h-[220px] bg-gradient-to-br from-emerald-300/40 via-green-200/30 to-transparent rounded-full blur-3xl opacity-70 animate-pulse" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 justify-center relative">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 via-green-400 to-accent shadow-lg shadow-emerald-200/30 animate-pulse">
              <svg className="h-7 w-7 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5" />
                <path d="M21 10.5a2.5 2.5 0 0 1-5 0V6" />
                <path d="M21 10.5V19a2 2 0 0 1-2 2h-7.5" />
              </svg>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-0 section-heading inline-block font-poppins tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-green-700 to-primary">
              {contactText[language].title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            {contactText[language].description}
          </p>
        </motion.div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="h-full border-2 border-primary/20 bg-white/60 dark:bg-background/60 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-primary/90 tracking-tight flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" /> {contactText[language].contactInfo}
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-start gap-4 group relative overflow-hidden rounded-lg p-3 hover:bg-primary/5 transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="p-3 bg-primary/10 rounded-full shrink-0 group-hover:bg-primary/20 transition-colors relative z-10">
                        {info.icon}
                      </div>
                      <div className="relative z-10">
                        <p className="font-medium text-lg group-hover:text-primary transition-colors">{info.label}</p>
                        <p className="text-muted-foreground group-hover:text-primary/80 transition-colors text-base">{info.value}</p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-3">{contactText[language].followMe}</h4>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full shadow-md hover:bg-primary/10 hover:text-primary transition-all duration-300 group" 
                      asChild
                    >
                      <a href="https://github.com/kailee" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full shadow-md hover:bg-primary/10 hover:text-primary transition-all duration-300 group" 
                      asChild
                    >
                      <a
                        href="https://linkedin.com/in/kailee"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="h-full border-2 border-primary/20 bg-white/60 dark:bg-background/60 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-primary/90 tracking-tight flex items-center gap-2">
                  <Send className="h-6 w-6 text-primary" /> {contactText[language].sendMessage}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {contactText[language].name}
                      </label>
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          placeholder={contactText[language].name}
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          required
                          className={`transition-all duration-300 ${
                            focusedField === 'name' ? 'border-primary shadow-lg shadow-primary/20' : ''
                          }`}
                        />
                        {focusedField === 'name' && (
                          <div className="absolute inset-0 border-2 border-primary rounded-md animate-pulse" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {contactText[language].email}
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={contactText[language].email}
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          required
                          className={`transition-all duration-300 ${
                            focusedField === 'email' ? 'border-primary shadow-lg shadow-primary/20' : ''
                          }`}
                        />
                        {focusedField === 'email' && (
                          <div className="absolute inset-0 border-2 border-primary rounded-md animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {contactText[language].subject}
                    </label>
                    <div className="relative">
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={contactText[language].subject}
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        required
                        className={`transition-all duration-300 ${
                          focusedField === 'subject' ? 'border-primary shadow-lg shadow-primary/20' : ''
                        }`}
                      />
                      {focusedField === 'subject' && (
                        <div className="absolute inset-0 border-2 border-primary rounded-md animate-pulse" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {contactText[language].message}
                    </label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={contactText[language].message}
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        required
                        className={`transition-all duration-300 ${
                          focusedField === 'message' ? 'border-primary shadow-lg shadow-primary/20' : ''
                        }`}
                      />
                      {focusedField === 'message' && (
                        <div className="absolute inset-0 border-2 border-primary rounded-md animate-pulse" />
                      )}
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full shadow-md hover:bg-primary/80 hover:text-white transition-all duration-300 group relative overflow-hidden" 
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        contactText[language].sending
                      ) : (
                        <>
                          {contactText[language].sendMessage} <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
