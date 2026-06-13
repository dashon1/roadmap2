import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onScrollToForm, isDark }) { // Added isDark prop
  const bgClass = isDark ? 'from-slate-900/80 via-slate-800/80 to-slate-900/80' : 'from-white/80 via-slate-50/80 to-white/80';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const badgeBg = isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-100 border-blue-300';
  const badgeText = isDark ? 'text-blue-300' : 'text-blue-700';

  return (
    <section className={`relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b ${bgClass} backdrop-blur-sm`}> {/* Added backdrop-blur-sm */}
      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eded39da875932b33c0576/1983b5de7_ChatGPTImageJul6202503_24_48PM.png"
          alt="AI Microtech Link"
          className="w-16 h-16"
          loading="eager"
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full ${badgeBg}`}>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className={`text-sm font-medium ${badgeText}`}>AI Consulting Services</span>
          </div>

          <h1 className={`text-5xl md:text-6xl font-bold ${textColor} mb-6`}>
            AI Microtech Link
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              AI Development and Consulting
            </span>
          </h1>

          <p className={`text-xl ${subtextColor} mb-10 max-w-2xl mx-auto`}>
            Get your free AI implementation roadmap
          </p>

          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition-all"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}