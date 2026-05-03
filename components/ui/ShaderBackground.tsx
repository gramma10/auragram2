"use client"
import React from "react"
import { MeshGradient } from "@paper-design/shaders-react"

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020205]">
      {/* Subtle Grid System */}
      <div 
        className="absolute inset-0 opacity-[0.07] animate-pulse-slow" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #3533cd 1px, transparent 1px), linear-gradient(to bottom, #3533cd 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      {/* Moving Tech Lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-royal/40 to-transparent animate-scan-y"></div>
        <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-royal/30 to-transparent animate-scan-y" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-royal/20 to-transparent animate-scan-x"></div>
      </div>

      {/* Futuristic Aura Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-royal/[0.08] blur-[140px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-royal/[0.05] blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Minimalist Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  )
}


// Add these to your global CSS or tailwind config:
// @keyframes pulse-slow {
//   0%, 100% { opacity: 0.3; transform: scale(1); }
//   50% { opacity: 0.6; transform: scale(1.1); }
// }
// .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }

