import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureItem({ icon: Icon, text, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="flex items-center gap-3"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-sky-400" />
      </div>
      <span className="text-slate-300 text-sm md:text-base font-medium">
        {text}
      </span>
    </motion.div>
  );
}