"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ReactLenis } from "lenis/react"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
  category,
  link
}: {
  i: number
  title: string
  src: string
  progress: any
  range: [number, number]
  targetScale: number
  category?: string
  link?: string
}) => {
  const container = useRef<HTMLDivElement>(null)

  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-[15vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{
          scale,
          top: `${i * 25}px`,
        }}
        className="rounded-2xl sm:rounded-3xl lg:rounded-[2rem] relative flex origin-top flex-col overflow-hidden bg-midnight/80 backdrop-blur-xl border border-white/10
                   h-[350px] w-full 
                   sm:h-[400px] sm:w-[500px] 
                   md:h-[450px] md:w-[650px] 
                   lg:h-[550px] lg:w-[900px] shadow-2xl"
      >
        <div className="relative w-full h-[75%] lg:h-[80%] overflow-hidden">
          <img src={src || "/placeholder.svg"} alt={title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          {/* Overlay gradient for aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-60"></div>
        </div>
        
        {/* Card Content Footer */}
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex justify-between items-end">
          <div>
            {category && <span className="text-royal font-bold text-[10px] md:text-xs uppercase tracking-widest block mb-2">{category}</span>}
            <h3 className="text-white text-xl md:text-3xl font-serif font-medium">{title}</h3>
          </div>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-royal hover:text-white hover:-rotate-45 transition-all duration-300 border border-white/20">
              <ArrowRight size={20} />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const ImagesScrollingAnimation = ({ projects }: { projects: any[] }) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <div
      ref={container}
      className="relative flex w-full flex-col items-center justify-center 
                 pb-[10vh] pt-[5vh] 
                 lg:pb-[20vh] lg:pt-[10vh]"
    >
        {projects.map((project, i) => {
          const targetScale = Math.max(0.85, 1 - (projects.length - i - 1) * 0.05)
          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * (1 / projects.length), 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
  )
}

export { ImagesScrollingAnimation, StickyCard_001 }
