"use client"
import React from "react"
import { MeshGradient } from "@paper-design/shaders-react"

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-black">
      <MeshGradient
        className="w-full h-full absolute inset-0"
        colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        speed={1.0}
        backgroundColor="#000000"
      />
    </div>
  )
}
