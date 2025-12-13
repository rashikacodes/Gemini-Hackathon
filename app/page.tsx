import Link from "next/link"
import { ArrowRight, Leaf, Map, Brain, TrendingUp, CheckCircle2, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8 animate-fade-in-up">
            {/* Subtitle Badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Leaf className="w-4 h-4" />
              <span>AI‑powered waste monitoring</span>
            </div> */}

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              <span className="text-foreground">Transforming City</span>
              <br />
              <span className="text-primary">Cleanliness with AI</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Real‑time waste detection that helps cities identify and clean overflowing bins before they become a
              problem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/upload"
                className="group px-8 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-accent hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 font-semibold text-lg flex items-center gap-2 hover:scale-105"
              >
                Report Waste Bin
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl bg-card text-card-foreground border-2 border-border hover:border-primary hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                View Live Dashboard
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-primary">92%</div>
                <div className="text-sm text-muted-foreground">AI Accuracy</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-accent">50%</div>
                <div className="text-sm text-muted-foreground">Faster Cleanup</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-secondary">30+</div>
                <div className="text-sm text-muted-foreground">Hotspots Daily</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </section>

      {/* Feature Highlights */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Powerful Features for <span className="text-primary">Smarter Cities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Built with cutting-edge AI technology to revolutionize urban waste management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">AI Trash Detection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Upload any waste-bin image — Gemini Vision AI instantly analyzes and returns the fill status with 92%
                  accuracy.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Map className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Real‑Time City Map</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All reports stored in MongoDB and displayed on a live map with color-coded markers indicating severity
                  levels.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-secondary hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative space-y-4">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Smart Alerts & Hotspots</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Critical bins flagged immediately, enabling 50% faster cleaning routes and better resource allocation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              How <span className="text-primary">SmartWaste AI</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Four simple steps to revolutionize your city&apos;s waste management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", icon: "📸", title: "Capture", desc: "User snaps a picture of a garbage bin" },
              {
                step: "2",
                icon: "🧠",
                title: "Analyze",
                desc: "Gemini Vision evaluates bin fill-level with high accuracy",
              },
              { step: "3", icon: "💾", title: "Store", desc: "Data stored in MongoDB with GPS + timestamp" },
              { step: "4", icon: "🗺️", title: "Visualize", desc: "Dashboard map highlights hotspots for workers" },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <div className="pt-4 space-y-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Why <span className="text-primary">SmartWaste AI</span> Matters
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cities worldwide struggle with waste management challenges that affect public health, cleanliness, and
                operational efficiency.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "Overflowing bins cause diseases & pollution",
                  "Municipal workers waste time checking locations manually",
                  "No existing real-time waste monitoring system",
                  "Data-driven cleanliness for modern cities",
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-foreground text-lg">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex flex-col items-center justify-center space-y-6 border-2 border-primary/20 hover:border-primary/40 transition-colors duration-500">
                <div className="text-center space-y-4">
                  <BarChart3 className="w-20 h-20 text-primary mx-auto animate-float" />
                  <h3 className="text-3xl font-bold text-foreground">Real Impact</h3>
                  <p className="text-muted-foreground text-lg max-w-xs">
                    Building cleaner, smarter cities — one AI detection at a time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built with <span className="text-primary">Modern Technology</span>
            </h2>
            <p className="text-lg text-muted-foreground">Powered by industry-leading tools and frameworks</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "⚡ Next.js App Router",
              "🧠 Gemini 2.5 Flash Vision",
              "🍃 MongoDB Atlas",
              "🗺 Leaflet Maps",
              "🎨 TailwindCSS",
            ].map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full bg-card border border-border hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 text-foreground font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-balance leading-tight">Ready to Transform Your City?</h2>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto">
            Join us in building cleaner, healthier, and smarter communities with AI-powered waste monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/signup"
              className="group px-8 py-4 rounded-xl bg-primary-foreground text-primary hover:shadow-2xl transition-all duration-300 font-semibold text-lg flex items-center gap-2 hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 font-semibold text-lg hover:scale-105"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold text-primary">SmartWaste AI</span>
            </div>
            <p className="text-muted-foreground text-center">
              Building cleaner, smarter cities — one AI detection at a time.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors duration-300">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
