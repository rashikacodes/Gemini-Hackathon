import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-background/80 backdrop-blur-md border-b border-border z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary hover:text-accent transition-colors duration-300">
          🌿 SmartWaste AI
        </Link>

        {/* Right Buttons */}
        <div className="flex gap-4">
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
      </div>
    </nav>
  )
}
