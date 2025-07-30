"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Menu,
  X,
  Code,
  Palette,
  Zap,
  Globe,
  ArrowDown,
  MapPin,
  Phone,
  ExternalLink,
  Calendar,
  Award,
  Users,
  Star,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import FullPageInteractiveScene from "./components/full-page-interactive-scene"
import AnimatedCounter from "./components/animated-counter"
import SkillCard from "./components/skill-card"
import ProjectCard from "./components/project-card"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const skills = [
    { name: "React/Next.js", level: 95, icon: "⚛️", category: "Frontend" },
    { name: "TypeScript", level: 90, icon: "📘", category: "Language" },
    { name: "JavaScript", level: 92, icon: "🟨", category: "Language" },
    { name: "Laravel", level: 85, icon: "🔴", category: "Backend" },
    { name: "Tailwind CSS", level: 95, icon: "🎨", category: "Styling" },
    { name: "Three.js", level: 80, icon: "🎮", category: "3D/Graphics" },
    { name: "Node.js", level: 75, icon: "🟢", category: "Backend" },
    { name: "MySQL", level: 80, icon: "🗄️", category: "Database" },
  ]

  const experience = [
    {
      title: "Junior Frontend Developer",
      company: "Learnock",
      period: "Nov 2024 - Present",
      description:
        "Working as a front-end developer with React and Laravel, collaborating with teams on multiple client projects using different technologies.",
      technologies: ["React", "Laravel", "JavaScript", "Team Collaboration"],
      type: "current",
    },
    {
      title: "Frontend Developer",
      company: "Tech-Cell",
      period: "Sep 2024 - Nov 2024",
      description:
        "Part of a 10-person team (5 front-end, 5 back-end developers) completing three projects. Presented on Tailwind CSS and Three.js topics.",
      technologies: ["React", "Tailwind CSS", "GitHub", "Three.js"],
      type: "past",
    },
    {
      title: "Frontend Intern",
      company: "Link Development",
      period: "Jun 2023 - Aug 2023",
      description:
        "Worked as a front-end intern in a team of 5, collaborating on projects using ReactJS and Sass with Azure DevOps for version control.",
      technologies: ["ReactJS", "Sass", "Adobe XD", "Azure DevOps"],
      type: "internship",
    },
  ]

  const projects = [
    {
      title: "Tech-Nest (Graduation Project)",
      description:
        "Social media platform focused on technology with article posting, comments, likes, and author following features. Built with a team of 5 developers.",
      image: "/placeholder.svg?height=300&width=400&text=Tech-Nest+Social+Platform",
      tech: ["Next.js", "TypeScript", "MUI", "Prisma", "Tailwind CSS"],
      github: "https://github.com/mazen-essam",
      live: "#",
      featured: true,
      category: "Full Stack",
    },
    {
      title: "3D Interactive Portfolio",
      description:
        "Modern portfolio website with Three.js animations, interactive 3D elements, and responsive design showcasing technical skills.",
      image: "/placeholder.svg?height=300&width=400&text=3D+Portfolio",
      tech: ["Next.js", "Three.js", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/mazen-essam",
      live: "#",
      featured: true,
      category: "Frontend",
    },
    {
      title: "Arcplan Group Website",
      description:
        "Learning Management System (LMS) website for Arcplan Group with comprehensive course management and user interaction features.",
      image: "/placeholder.svg?height=300&width=400&text=Arcplan+LMS",
      tech: ["Laravel", "Tailwind CSS", "MySQL", "PHP"],
      github: "https://github.com/mazen-essam",
      live: "#",
      featured: false,
      category: "Full Stack",
    },
    {
      title: "Gallaxy Academy Platform",
      description:
        "Educational platform for Gallaxy Academy with course management, student tracking, and interactive learning features.",
      image: "/placeholder.svg?height=300&width=400&text=Gallaxy+Academy",
      tech: ["Laravel", "Tailwind CSS", "MySQL", "JavaScript"],
      github: "https://github.com/mazen-essam",
      live: "#",
      featured: false,
      category: "Full Stack",
    },
    {
      title: "Arkan Group E-commerce",
      description:
        "Full-featured e-commerce website for Arkan Group with product catalog, shopping cart, and payment integration.",
      image: "/placeholder.svg?height=300&width=400&text=Arkan+E-commerce",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Stripe"],
      github: "https://github.com/mazen-essam",
      live: "#",
      featured: false,
      category: "E-commerce",
    },
    {
      title: "Summarize AI",
      description:
        "AI-powered text summarization tool using OpenAI API with link-based content extraction and processing capabilities.",
      image: "/placeholder.svg?height=300&width=400&text=Summarize+AI",
      tech: ["React", "Tailwind CSS", "OpenAI API", "Redux"],
      github: "https://github.com/mazen-essam",
      live: "#",
      featured: false,
      category: "AI/ML",
    },
  ]

  const stats = [
    { label: "Years Experience", value: 2, suffix: "+", icon: Calendar },
    { label: "Projects Completed", value: 15, suffix: "+", icon: Code },
    { label: "Technologies", value: 12, suffix: "+", icon: Zap },
    { label: "Team Projects", value: 8, suffix: "+", icon: Users },
  ]

  const education = [
    {
      degree: "Computer Science and Artificial Intelligence",
      school: "Helwan University",
      period: "2020 - 2024",
      location: "Cairo, Egypt",
      status: "Completed",
      gpa: "Good",
    },
  ]

  const certifications = [
    {
      title: "Frontend Development Training",
      organization: "ITI (Information Technology Institute)",
      period: "Jun 2023 - Aug 2023",
      description: "Intensive training in React.js and Tailwind CSS for Frontend Development",
      type: "Training",
    },
    {
      title: "Front-End Diploma",
      organization: "Instant Software Solution",
      period: "2023",
      description: "Comprehensive frontend development program",
      type: "Diploma",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden relative">
      {/* Enhanced 3D Scene */}
      <FullPageInteractiveScene />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Mazen Essam
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative group px-3 py-2 rounded-lg ${
                    activeSection === item
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform transition-transform duration-300 ${
                      activeSection === item ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 bg-black/50 backdrop-blur-xl rounded-b-lg">
              {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 px-4 capitalize text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg mx-2 mb-1"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60 z-10" />

        {/* Animated background elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div
          className={`relative z-20 text-center max-w-5xl mx-auto px-4 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Enhanced Status Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-6 py-3 bg-black/40 backdrop-blur-md rounded-full text-cyan-400 text-sm font-medium border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
              Available for work
              <Star className="ml-2 h-3 w-3 text-yellow-400" />
            </span>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-white mb-4 drop-shadow-2xl">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
              Mazen Essam
            </span>
          </h1>

          {/* Enhanced Job Title */}
          <h2 className="text-3xl md:text-4xl text-cyan-400 font-semibold mb-6 drop-shadow-lg">Frontend Developer</h2>

          {/* Enhanced Description */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Passionate about building responsive and innovative web applications
          </p>

          {/* Tech Stack Highlight */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["ReactJS", "Next.js", "Tailwind CSS", "Laravel", "TypeScript"].map((tech) => (
              <Badge
                key={tech}
                className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Enhanced Location & Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 text-gray-300">
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span>6th of October, Giza, Egypt</span>
            </div>
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <Phone className="h-4 w-4 text-cyan-400" />
              <span>+201090650710</span>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 px-10 py-4 text-lg font-semibold group"
              onClick={() => scrollToSection("projects")}
            >
              <Code className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-cyan-400 bg-black/30 backdrop-blur-md transition-all duration-300 px-10 py-4 text-lg font-semibold group"
            >
              <Download className="mr-3 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              Download CV
            </Button>
          </div>

          {/* Enhanced Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
            {[
              { icon: Github, href: "https://github.com/mazen-essam", label: "GitHub", color: "hover:text-gray-300" },
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/mazenessamahmed",
                label: "LinkedIn",
                color: "hover:text-blue-400",
              },
              { icon: Mail, href: "mailto:mazenessam80@gmail.com", label: "Email", color: "hover:text-red-400" },
            ].map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-gray-300 ${color} hover:bg-black/60 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-110`}
                aria-label={label}
              >
                <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-300 mb-3 font-medium">Scroll to explore</span>
            <button
              onClick={() => scrollToSection("about")}
              className="p-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 animate-bounce hover:animate-none group"
            >
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Passionate developer crafting digital experiences with modern technologies
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-black/40 backdrop-blur-md rounded-3xl p-2 border border-white/10">
                <img
                  src="/placeholder.svg?height=600&width=500&text=Mazen+Essam"
                  alt="Mazen Essam"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Passionate Frontend Developer</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Passionate and results-driven Front-End Developer with strong experience in building responsive and
                  innovative web applications using ReactJS, Next.js, and Tailwind CSS. A fast learner with hands-on
                  experience working in collaborative teams on real-world projects.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Skilled in clean code practices, Agile methodologies, and delivering pixel-perfect user interfaces.
                  Eager to grow in a dynamic development environment and contribute to impactful products.
                </p>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: Code,
                    title: "Clean Code",
                    desc: "Writing maintainable, scalable code",
                    color: "text-cyan-400",
                  },
                  {
                    icon: Palette,
                    title: "UI/UX Focus",
                    desc: "Creating beautiful user interfaces",
                    color: "text-purple-400",
                  },
                  {
                    icon: Zap,
                    title: "Agile Methods",
                    desc: "Working with Scrum and Agile practices",
                    color: "text-yellow-400",
                  },
                  {
                    icon: Globe,
                    title: "Team Player",
                    desc: "Collaborative development experience",
                    color: "text-green-400",
                  },
                ].map(({ icon: Icon, title, desc, color }) => (
                  <div
                    key={title}
                    className="p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300 group"
                  >
                    <Icon
                      className={`h-10 w-10 ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <h4 className="font-semibold text-white mb-2">{title}</h4>
                    <p className="text-sm text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <stat.icon className="h-8 w-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Enhanced Education */}
              <div className="mt-12">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <GraduationCap className="mr-3 h-6 w-6 text-cyan-400" />
                  Education
                </h4>
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-all duration-300"
                  >
                    <h5 className="font-semibold text-cyan-400 text-lg">{edu.degree}</h5>
                    <p className="text-white font-medium text-lg">{edu.school}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-gray-400">{edu.location}</span>
                      <span className="text-gray-400">{edu.period}</span>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{edu.status}</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">GPA: {edu.gpa}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/20 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Expertise in modern web technologies and development practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          {/* Enhanced Additional Skills */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Technologies",
                icon: Code,
                skills: ["HTML5", "CSS3", "Sass", "Bootstrap", "MUI", "jQuery"],
                color: "cyan",
              },
              {
                title: "Backend & Database",
                icon: Briefcase,
                skills: ["Node.js", "Express", "MySQL", "Prisma", "REST APIs"],
                color: "purple",
              },
              {
                title: "Tools & Methodologies",
                icon: Zap,
                skills: ["Git", "GitHub", "Azure DevOps", "Agile", "Scrum", "Figma"],
                color: "green",
              },
            ].map(({ title, icon: Icon, skills, color }) => (
              <div
                key={title}
                className="p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center mb-6">
                  <Icon
                    className={`h-6 w-6 text-${color}-400 mr-3 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <h4 className="text-xl font-bold text-white">{title}</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className={`bg-${color}-500/20 text-${color}-300 border-${color}-500/30 hover:bg-${color}-500/30 transition-all duration-300`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Building expertise through diverse development experiences
            </p>
          </div>

          <div className="space-y-12 mb-16">
            {experience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 to-blue-500 ml-6" />
                <div
                  className={`absolute left-0 top-8 w-3 h-3 rounded-full ml-5 ${
                    exp.type === "current"
                      ? "bg-green-400 animate-pulse"
                      : exp.type === "past"
                        ? "bg-cyan-400"
                        : "bg-purple-400"
                  }`}
                />

                <div className="ml-16 p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <p className="text-cyan-400 font-medium text-lg">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">{exp.period}</span>
                      {exp.type === "current" && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Current</Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Certifications */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center">
              <Award className="mr-3 h-8 w-8 text-cyan-400" />
              Certifications & Training
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                      {cert.title}
                    </h4>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{cert.type}</Badge>
                  </div>
                  <p className="text-white font-medium mb-3">{cert.organization}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-400 text-sm">{cert.period}</p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Organizations */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center">
              <Users className="mr-3 h-8 w-8 text-cyan-400" />
              Organizations & Activities
            </h3>
            <div className="p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300">
              <h4 className="text-xl font-bold text-cyan-400 mb-3">IEEE Student Activity Participation</h4>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="text-gray-400 text-sm">2022 - 2023</p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Actively participated in IEEE student activities, organizing and conducting sessions on front-end
                development with React. These sessions aimed to prepare participants for competitions and enhance their
                technical skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/20 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Showcasing innovative solutions and technical expertise
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <ProjectCard key={index} project={project} featured={true} index={index} />
              ))}
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <ProjectCard key={index} project={project} featured={false} index={index + 2} />
              ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-sm" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
            <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let's create something amazing together
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to start your project?</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm always excited to work on new projects and collaborate with amazing teams. Whether you need a
                  modern web application, responsive frontend, or technical consultation, let's discuss how we can bring
                  your ideas to life.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "mazenessam80@gmail.com",
                    href: "mailto:mazenessam80@gmail.com",
                    color: "text-red-400",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+201090650710",
                    href: "tel:+201090650710",
                    color: "text-green-400",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    value: "github.com/mazen-essam",
                    href: "https://github.com/mazen-essam",
                    color: "text-gray-400",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/mazenessamahmed",
                    href: "https://linkedin.com/in/mazenessamahmed",
                    color: "text-blue-400",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "6th of October, Giza, Egypt",
                    href: "#",
                    color: "text-cyan-400",
                  },
                ].map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center space-x-6 p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div
                      className={`p-4 rounded-full bg-black/60 ${color} group-hover:bg-black/80 group-hover:scale-110 transition-all duration-300`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-medium">{label}</div>
                      <div className="text-white font-medium text-lg group-hover:text-cyan-400 transition-colors duration-300">
                        {value}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <Card className="bg-black/40 backdrop-blur-sm border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-300">
              <CardContent className="p-10">
                <h4 className="text-2xl font-bold text-white mb-8 text-center">Send me a message</h4>
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                      <Input
                        placeholder="John Doe"
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <Input
                      placeholder="Project Discussion"
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={6}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 h-14 text-lg font-semibold group">
                    <Mail className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-4 border-t border-white/10 bg-black/60 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-6 md:mb-0">
              Mazen Essam
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="text-lg mb-2">© 2024 Mazen Essam - Frontend Developer</p>
              <p className="text-sm">Built with Next.js, Three.js, and Tailwind CSS</p>
              <div className="flex justify-center md:justify-end gap-4 mt-4">
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                  React
                </Badge>
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                  Next.js
                </Badge>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                  Three.js
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
