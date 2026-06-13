import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToAction({ onScrollToForm, isDark }) { // Added isDark prop
  const bgClass = isDark ? 'from-slate-900/80 via-slate-950/80 to-slate-900/80' : 'from-slate-50/80 via-white/80 to-slate-50/80';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-300' : 'text-slate-600';

  return (
    <section className={`relative py-24 bg-gradient-to-b ${bgClass} overflow-hidden backdrop-blur-sm`}>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Sparkle icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-500/50"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${textColor} leading-tight`}
          >
            Ready to Start Your
            <span className="block mt-2 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400 bg-clip-text text-transparent">
              AI Journey?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl ${subtextColor} max-w-2xl mx-auto font-light`}
          >
            Get your personalized AI implementation roadmap in less than 48 hours
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <Button
              onClick={onScrollToForm}
              size="lg"
              className="group relative h-16 px-12 text-xl font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/60 transition-all duration-300"
            >
              <span className="relative flex items-center gap-3">
                Get Your Free Roadmap Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className={`flex flex-wrap items-center justify-center gap-8 pt-8 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>100% free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Results in 48 hours</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}