import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, Target, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Lightning from './Lightning';
import ElasticHueSlider from './ElasticHueSlider';
import FeatureItem from './FeatureItem';

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightningHue, setLightningHue] = useState(210);

  return (
    <div className="relative w-full min-h-screen bg-slate-950 overflow-hidden">
      {/* WebGL Lightning Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Lightning 
          hue={lightningHue} 
          speed={1.2} 
          intensity={0.45} 
          size={1.6} 
        />
      </div>

      {/* Subtle glow circle */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-sky-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Navigation */}
      <header className="relative z-20 border-b border-slate-800/50 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-sky-400"
              >
                <path
                  d="M16 4L26 12V20L16 28L6 20V12L16 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M16 12L20 16L16 20L12 16L16 12Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-lg font-bold text-white hidden sm:block">
                AI Microtechlink
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded px-2 py-1"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded px-2 py-1"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded px-2 py-1"
              >
                Contact
              </a>
              <Button
                className="bg-sky-600 hover:bg-sky-700 text-white focus-visible:ring-2 focus-visible:ring-sky-300"
                size="sm"
              >
                Book a call
              </Button>
            </div>

            {/* Hue Slider (Desktop only, for theming) */}
            <ElasticHueSlider
              value={lightningHue}
              onChange={setLightningHue}
              className="absolute right-20 top-1/2 -translate-y-1/2"
            />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 pb-4 border-t border-slate-800/50 pt-4 space-y-3"
            >
              <a
                href="#home"
                className="block text-slate-300 hover:text-white transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded px-2"
              >
                Home
              </a>
              <a
                href="#services"
                className="block text-slate-300 hover:text-white transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded px-2"
              >
                Services
              </a>
              <a
                href="#contact"
                className="block text-slate-300 hover:text-white transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded px-2"
              >
                Contact
              </a>
              <Button
                className="w-full bg-sky-600 hover:bg-sky-700 text-white focus-visible:ring-2 focus-visible:ring-sky-300"
                size="sm"
              >
                Book a call
              </Button>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-sky-300">AI Consulting Services</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              AI Microtechlink
              <span className="block mt-2 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                AI Consulting
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light"
          >
            Get your free AI implementation roadmap
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-300 text-lg px-8 py-6"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300 text-lg px-8 py-6"
            >
              See how it works
            </Button>
          </motion.div>

          {/* Feature Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto"
          >
            <FeatureItem icon={Target} text="100% custom roadmaps" delay={1.1} />
            <FeatureItem icon={Clock} text="<48h turnaround" delay={1.2} />
            <FeatureItem icon={Users} text="Founder-led delivery" delay={1.3} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}