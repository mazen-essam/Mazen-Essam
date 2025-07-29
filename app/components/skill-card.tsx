"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

interface SkillCardProps {
  skill: {
    name: string
    level: number
    icon: string
    category: string
  }
  index: number
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 100)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      className={`group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
          {skill.category}
        </Badge>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
        {skill.name}
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Proficiency</span>
          <span className="text-cyan-400 font-medium">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out transform origin-left"
            style={{
              width: isVisible ? `${skill.level}%` : "0%",
              transform: isVisible ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
