import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "https://cdn.worldvectorlogo.com/logos/google-icon.svg",
  "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
  "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
  "https://cdn.worldvectorlogo.com/logos/facebook-4.svg",
  "https://cdn.worldvectorlogo.com/logos/apple-14.svg",
  "https://cdn.worldvectorlogo.com/logos/netflix-3.svg",
  "https://cdn.worldvectorlogo.com/logos/tesla-motors.svg",
  "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
];

export default function TrustedByStrip({ isDark }) {
  const bgClass = isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200';
  const textColor = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <section className={`relative py-12 ${bgClass} border-y backdrop-blur-sm overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-6">
        <p className={`text-center text-sm font-medium ${textColor} mb-8`}>
          Trusted by companies leveraging AI innovation
        </p>
        
        {/* Infinite Scroll Animation */}
        <div className="relative">
          <div className="flex gap-12 items-center">
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...logos, ...logos].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="Company logo"
                  className={`h-8 w-auto grayscale ${isDark ? 'opacity-50 hover:opacity-80' : 'opacity-70 hover:opacity-100'} transition-opacity flex-shrink-0`}
                />
              ))}
            </motion.div>
          </div>
          
          {/* Gradient Fades - Fixed to match background */}
          <div className={`absolute left-0 top-0 h-full w-32 pointer-events-none`} style={{
            background: `linear-gradient(to right, ${isDark ? 'rgb(15 23 42)' : 'rgb(248 250 252)'}, transparent)`
          }} />
          <div className={`absolute right-0 top-0 h-full w-32 pointer-events-none`} style={{
            background: `linear-gradient(to left, ${isDark ? 'rgb(15 23 42)' : 'rgb(248 250 252)'}, transparent)`
          }} />
        </div>
      </div>
    </section>
  );
}