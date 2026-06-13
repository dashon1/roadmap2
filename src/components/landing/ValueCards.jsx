import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, DollarSign } from 'lucide-react';

const cards = [
  {
    icon: TrendingUp,
    title: "Faster Operations",
    description: "Automate repetitive tasks",
    stat: "Up to 40% boost",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Brain,
    title: "Better Decisions",
    description: "AI-powered insights",
    stat: "Smarter choices",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: DollarSign,
    title: "Lower Costs",
    description: "Reduce expenses",
    stat: "Scale effectively",
    gradient: "from-green-500 to-emerald-500"
  }
];

export default function ValueCards({ isDark }) {
  const bgClass = isDark ? 'bg-slate-950/80' : 'bg-slate-50/80';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isDark ? 'bg-slate-800/50' : 'bg-white';
  const cardBorder = isDark ? 'border-slate-700' : 'border-slate-200';

  return (
    <section className={`py-20 ${bgClass} backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${textColor} mb-4`}>
            Transform Your Business with AI
          </h2>
          <p className={`text-lg ${subtextColor} max-w-2xl mx-auto`}>
            Get measurable results that drive growth and efficiency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Gradient border on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300`} />
              
              {/* Card content */}
              <div className={`relative ${cardBg} border ${cardBorder} rounded-xl p-8 transition-all duration-300`}>
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className={`text-xl font-bold ${textColor} mb-2`}>
                  {card.title}
                </h3>
                <p className={`${subtextColor} mb-4`}>
                  {card.description}
                </p>
                <p className={`text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} font-semibold text-lg`}>
                  {card.stat}
                </p>

                {/* Animated shine effect on hover */}
                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}