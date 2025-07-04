"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  icon: string
  x: number
  y: number
  size: number
  opacity: number
  velocityX: number
  velocityY: number
  rotation: number
  rotationSpeed: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const foodIcons = [
      "🍔", "🍟", "🥤", "🌭", "🍕", "🥪", "🧀", "🥓", "🍅", "🥬", 
      "🍖", "🥒", "🧅", "🌶️", "🍤", "🍗", "🥩", "🥪", "🌮","🍳", 
      "🧆", "🍺", "🥕", "🥃", "🍿"]

    const initialElements: FloatingElement[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      icon: foodIcons[i % foodIcons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 20,
      opacity: Math.random() * 0.2 + 0.1,
      velocityX: (Math.random() - 0.5) * 0.5,
      velocityY: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    }))

    setElements(initialElements)

    const animateElements = () => {
      setElements((prevElements) =>
        prevElements.map((element) => {
          let newX = element.x + element.velocityX
          let newY = element.y + element.velocityY
          let newVelocityX = element.velocityX
          let newVelocityY = element.velocityY

          // Rebote en los bordes
          if (newX <= 0 || newX >= 95) {
            newVelocityX = -element.velocityX
            newX = Math.max(0, Math.min(95, newX))
          }
          if (newY <= 0 || newY >= 95) {
            newVelocityY = -element.velocityY
            newY = Math.max(0, Math.min(95, newY))
          }

          return {
            ...element,
            x: newX,
            y: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
            rotation: element.rotation + element.rotationSpeed,
          }
        }),
      )
    }

    const interval = setInterval(animateElements, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute transition-all duration-75 ease-linear"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            opacity: element.opacity,
            transform: `rotate(${element.rotation}deg)`,
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  )
}
