"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Leaf } from 'lucide-react'
import { useUser } from "@/contexts/userContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const {user}=useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Leaf className="w-6 h-6 text-primary" />
            </div> */}
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold text-foreground">
              WasteX <span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}

{ !user && (
<div className="hidden md:flex items-center gap-8">
  <Link href="/" className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
    Home
  </Link>

  <Link
    href="/dashboard"
    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
  >
    Dashboard
  </Link>

  <Link
    href="/upload"
    className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold"
  >
    Report Waste
  </Link>
  </div>
  )
}



  {user && (
    <div className="hidden md:flex items-center gap-4">
      <Link
        href="/login"
        className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="px-5 py-2.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-accent hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
      >
        Sign Up
      </Link>
    </div>
  )}



          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-300"
          >
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link
              href="/"
              className="block py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/upload"
              className="block w-full text-center py-2.5 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all duration-300 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Report Waste
            </Link>

          </div>
        )}


      </div>
    </nav>
  )
}