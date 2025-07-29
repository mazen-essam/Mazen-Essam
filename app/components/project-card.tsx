"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Eye, Star, ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    tech: string[]
    github: string
    live: string
    featured?: boolean
  }
  featured: boolean
  index?: number
}

export default function ProjectCard({ project, featured, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, index * 150) // Stagger animation
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  // Image load animation
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsLoaded(true)
      },
      500 + index * 100,
    )

    return () => clearTimeout(timer)
  }, [index])

  if (featured) {
    return (
      <div
        ref={cardRef}
        className={`transform transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        <Card
          className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-cyan-400 rounded-full transition-all duration-1000 ${
                  isHovered ? "animate-pulse" : ""
                }`}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 200}ms`,
                  transform: isHovered ? `translateY(-${10 + i * 5}px)` : "translateY(0)",
                }}
              />
            ))}
          </div>

          <div className="relative overflow-hidden">
            <div className="relative">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className={`w-full h-64 object-cover transition-all duration-700 ${
                  isLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
                } ${isHovered ? "scale-110 brightness-110" : ""}`}
              />

              {/* Animated overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
                  isHovered ? "opacity-100" : "opacity-60"
                }`}
              />

              {/* Scanning line effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                  isHovered ? "translate-x-full" : "-translate-x-full"
                }`}
                style={{ width: "50%" }}
              />
            </div>

            {/* Action buttons with stagger animation */}
            <div
              className={`absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-500 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="sm"
                variant="outline"
                className={`border-white/50 text-white hover:bg-white hover:text-black bg-black/20 backdrop-blur-sm transform transition-all duration-300 ${
                  isHovered ? "scale-100 translate-y-0" : "scale-90 translate-y-2"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <Github className="h-4 w-4 mr-2" />
                Code
              </Button>
              <Button
                size="sm"
                className={`bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0 transform transition-all duration-300 ${
                  isHovered ? "scale-100 translate-y-0" : "scale-90 translate-y-2"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
            </div>

            {/* Featured badge with pulse animation */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 animate-pulse">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-0 h-0 border-l-[30px] border-l-cyan-500/20 border-b-[30px] border-b-transparent transition-all duration-300 group-hover:border-l-cyan-500/40" />
          </div>

          <CardHeader className="pb-4 relative">
            <CardTitle
              className={`text-xl text-white group-hover:text-cyan-400 transition-all duration-300 ${
                isVisible ? "translate-x-0" : "translate-x-4"
              }`}
            >
              {project.title}
              <ArrowUpRight className="inline-block h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </CardTitle>
            <CardDescription
              className={`text-gray-300 text-base leading-relaxed transition-all duration-500 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className={`bg-white/10 text-gray-300 border-white/20 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300 transform ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${300 + techIndex * 50}ms`,
                    animationDelay: `${techIndex * 100}ms`,
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Card>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-95"
      }`}
    >
      <Card
        className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating dots */}
        <div className="absolute top-2 right-2 flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full bg-cyan-400/50 transition-all duration-300 ${
                isHovered ? "animate-bounce" : ""
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className={`w-full h-48 object-cover transition-all duration-500 ${
              isLoaded ? "scale-100 blur-0" : "scale-105 blur-sm"
            } ${isHovered ? "scale-110 brightness-110" : ""}`}
          />

          {/* Shimmer effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-all duration-1000 ${
              isHovered ? "translate-x-full" : "-translate-x-full"
            }`}
            style={{ width: "30%" }}
          />

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              className={`border-white/50 text-white hover:bg-white hover:text-black bg-black/20 backdrop-blur-sm transform transition-all duration-300 ${
                isHovered ? "scale-100 rotate-0" : "scale-90 rotate-3"
              }`}
            >
              <Github className="h-4 w-4 mr-1" />
              Code
            </Button>
            <Button
              size="sm"
              className={`bg-cyan-500 hover:bg-cyan-600 border-0 transform transition-all duration-300 ${
                isHovered ? "scale-100 rotate-0" : "scale-90 -rotate-3"
              }`}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>

        <CardHeader className="relative">
          <CardTitle
            className={`text-white group-hover:text-cyan-400 transition-all duration-300 ${
              isVisible ? "translate-x-0" : "translate-x-2"
            }`}
          >
            {project.title}
          </CardTitle>
          <CardDescription
            className={`text-gray-400 transition-all duration-500 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
            }`}
          >
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`bg-white/10 text-gray-300 border-white/20 text-xs hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
                style={{
                  transitionDelay: `${200 + techIndex * 50}ms`,
                }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-500" />
      </Card>
    </div>
  )
}
