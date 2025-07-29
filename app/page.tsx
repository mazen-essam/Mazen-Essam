"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Download, Menu, X, Code, Palette, Zap, Globe, ArrowDown } from "lucide-react"
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
    { name: "TypeScript", level: 92, icon: "📘", category: "Language" },
    { name: "Laravel", level: 88, icon: "🔴", category: "Backend" },
    { name: "Node.js", level: 90, icon: "🟢", category: "Backend" },
    { name: "Tailwind CSS", level: 94, icon: "🎨", category: "Styling" },
    { name: "Three.js/WebGL", level: 85, icon: "🎮", category: "3D/Graphics" },
    { name: "Vue.js", level: 87, icon: "💚", category: "Frontend" },
    { name: "PHP", level: 86, icon: "🐘", category: "Backend" },
  ]

  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend development for enterprise applications using React, Next.js, and modern web technologies.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2020 - 2022",
      description: "Developed full-stack applications using Laravel backend and React frontend, serving 10k+ users.",
      technologies: ["Laravel", "React", "MySQL", "AWS"],
    },
    {
      title: "Frontend Developer",
      company: "Creative Agency",
      period: "2019 - 2020",
      description: "Created responsive web applications and interactive user interfaces for various clients.",
      technologies: ["Vue.js", "Node.js", "SCSS", "JavaScript"],
    },
  ]

  const projects = [
    {
      title: "E-Commerce Dashboard",
      description:
        "Modern admin dashboard built with Next.js and Laravel API, featuring real-time analytics and inventory management.",
      image: "/placeholder.svg?height=300&width=400&text=E-Commerce+Dashboard",
      tech: ["Next.js", "Laravel", "MySQL", "Tailwind CSS", "Chart.js"],
      github: "#",
      live: "#",
      featured: true,
    },
    {
      title: "3D Portfolio Website",
      description: "Interactive portfolio with Three.js animations, particle systems, and modern design principles.",
      image: "/placeholder.svg?height=300&width=400&text=3D+Portfolio",
      tech: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
      github: "#",
      live: "#",
      featured: true,
    },
    {
      title: "Real-time Chat Application",
      description:
        "Full-stack chat app with Laravel backend, React frontend, and WebSocket integration for real-time messaging.",
      image: "/placeholder.svg?height=300&width=400&text=Chat+Application",
      tech: ["React", "Laravel", "Socket.io", "Redis", "MySQL"],
      github: "#",
      live: "#",
      featured: false,
    },
    {
      title: "Task Management System",
      description:
        "Collaborative project management tool with drag-and-drop functionality and team collaboration features.",
      image: "/placeholder.svg?height=300&width=400&text=Task+Management",
      tech: ["Vue.js", "Node.js", "MongoDB", "Express"],
      github: "#",
      live: "#",
      featured: false,
    },
    {
      title: "Restaurant Booking Platform",
      description: "Full-featured restaurant reservation system with payment integration and admin panel.",
      image: "/placeholder.svg?height=300&width=400&text=Restaurant+Platform",
      tech: ["Laravel", "React", "Stripe", "PostgreSQL"],
      github: "#",
      live: "#",
      featured: false,
    },
    {
      title: "Weather Visualization App",
      description: "Interactive weather dashboard with beautiful data visualizations and location-based forecasts.",
      image: "/placeholder.svg?height=300&width=400&text=Weather+App",
      tech: ["React", "D3.js", "OpenWeather API", "Styled Components"],
      github: "#",
      live: "#",
      featured: false,
    },
  ]

  const stats = [
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Projects Completed", value: 50, suffix: "+" },
    { label: "Happy Clients", value: 30, suffix: "+" },
    { label: "Code Commits", value: 1000, suffix: "+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden relative">
      {/* Full Page Interactive 3D Scene */}
      <FullPageInteractiveScene />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              &lt;DevPortfolio /&gt;
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === item ? "text-cyan-400" : "text-gray-300 hover:text-white"
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
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 bg-black/50 backdrop-blur-xl rounded-b-lg">
              {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 px-4 capitalize text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Content overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 z-10" />

        <div
          className={`relative z-20 text-center max-w-4xl mx-auto px-4 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Status Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-cyan-400 text-sm font-medium border border-cyan-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Available for work
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block text-white mb-2">Hi, I'm a</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Frontend Developer
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            I create exceptional digital experiences with modern web technologies
            <br />
            <span className="text-cyan-400 font-medium">React • Next.js • Laravel • Node.js</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 px-8 py-4 text-lg"
              onClick={() => scrollToSection("projects")}
            >
              <Code className="mr-2 h-5 w-5" />
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-cyan-400 bg-black/30 backdrop-blur-md transition-all duration-300 px-8 py-4 text-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-gray-300 hover:text-white hover:bg-black/60 hover:border-cyan-500/50 transition-all duration-300 group"
                aria-label={label}
              >
                <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-300 mb-2">Scroll to explore</span>
            <button
              onClick={() => scrollToSection("about")}
              className="p-2 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 animate-bounce"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl" />
              <img
                src="/placeholder.svg?height=500&width=500&text=Professional+Photo"
                alt="Profile"
                className="relative rounded-2xl shadow-2xl border border-white/10 w-full max-w-md mx-auto"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Passionate Frontend Developer</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  With over 5 years of experience in frontend development, I specialize in creating exceptional user
                  experiences using modern web technologies. My expertise spans across React, Next.js, Laravel, and
                  Node.js ecosystems.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm passionate about writing clean, maintainable code and staying up-to-date with the latest industry
                  trends. I believe in the power of great design combined with robust functionality to create digital
                  experiences that users love.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, title: "Clean Code", desc: "Writing maintainable, scalable code" },
                  { icon: Palette, title: "UI/UX Focus", desc: "Creating beautiful user interfaces" },
                  { icon: Zap, title: "Performance", desc: "Optimizing for speed and efficiency" },
                  { icon: Globe, title: "Modern Web", desc: "Using cutting-edge technologies" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-all duration-300"
                  >
                    <Icon className="h-8 w-8 text-cyan-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">{title}</h4>
                    <p className="text-sm text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10"
                  >
                    <div className="text-2xl font-bold text-cyan-400 mb-1">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 to-blue-500 ml-4" />
                <div className="absolute left-0 top-6 w-2 h-2 bg-cyan-400 rounded-full ml-3" />

                <div className="ml-12 p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-cyan-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-sm mt-2 md:mt-0">{exp.period}</span>
                  </div>

                  <p className="text-gray-300 mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <ProjectCard key={index} project={project} featured={true} index={index} />
              ))}
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <ProjectCard key={index} project={project} featured={false} index={index + 2} />
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to start your project?</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm always excited to work on new projects and collaborate with amazing people. Whether you need a
                  modern web application, a stunning frontend, or technical consultation, let's discuss how we can bring
                  your ideas to life.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "hello@yourname.com", href: "mailto:hello@yourname.com" },
                  { icon: Github, label: "GitHub", value: "github.com/yourname", href: "https://github.com/yourname" },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/yourname",
                    href: "https://linkedin.com/in/yourname",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{label}</div>
                      <div className="text-white font-medium">{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <Card className="bg-black/40 backdrop-blur-sm border-white/10 hover:bg-black/60 transition-all duration-300">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      placeholder="Subject"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={6}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 bg-black/50 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4 md:mb-0">
              &lt;DevPortfolio /&gt;
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 Frontend Developer Portfolio</p>
              <p className="text-sm">Built with Next.js, Three.js, and Tailwind CSS</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
