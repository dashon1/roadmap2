import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Users } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    text: "100% custom roadmaps"
  },
  {
    icon: Clock,
    text: "<48h turnaround"
  },
  {
    icon: Users,
    text: "Founder-led delivery"
  }
];

export default function CredibilityStrip({ isDark }) { // Added isDark prop
  const bgClass = isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200';
  const cardBg = isDark ? 'bg-slate-800/50 border-sky-500/30 hover:border-sky-400/50 hover:shadow-sky-500/20' : 'bg-slate-50 border-blue-300 hover:border-blue-400 hover:shadow-blue-400/20';
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';

  return (
    <section className={`py-12 ${bgClass} border-y backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl border hover:shadow-lg transition-all duration-300 ${cardBg}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${isDark ? 'bg-sky-500/20 border-sky-500/30' : 'bg-blue-100 border-blue-300'} border flex items-center justify-center`}>
                <benefit.icon className={`w-5 h-5 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
              </div>
              <span className={`${textColor} font-medium`}>{benefit.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}