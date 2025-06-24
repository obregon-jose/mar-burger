"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminAccessButton() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          {isVisible ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
        </Button>
      </div>

      {isVisible && (
        <div className="fixed bottom-24 left-6 z-40">
          <div className="bg-black/90 backdrop-blur-sm border border-red-600/20 rounded-lg p-4 shadow-xl animate-in slide-in-from-bottom-2 duration-300">
            <div className="text-center space-y-3">
              <p className="text-white text-sm font-medium">Panel Administrativo</p>
              <Link href="/admin">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold w-full"
                  onClick={() => setIsVisible(false)}
                >
                  Acceder
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
