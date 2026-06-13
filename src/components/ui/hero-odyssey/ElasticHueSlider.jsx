import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

export default function ElasticHueSlider({ value, onChange, className = '' }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className={`hidden md:flex items-center gap-3 ${className}`}>
      <Palette className="w-4 h-4 text-slate-400" />
      <div className="relative w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${(value / 360) * 100}%`,
            background: `hsl(${value}, 70%, 50%)`,
          }}
          initial={false}
          animate={{
            opacity: isDragging ? 1 : 0.7,
          }}
        />
        <input
          type="range"
          min="0"
          max="360"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      <span className="text-xs text-slate-400 font-mono">{Math.round(value)}°</span>
    </div>
  );
}