
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const useCases = [
  {
    id: 1,
    title: "Customer Support Automation",
    description: "AI chatbots handling 80% of customer inquiries 24/7",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop",
    stat: "80% automation rate"
  },
  {
    id: 2,
    title: "Predictive Analytics",
    description: "Forecast sales and optimize inventory with AI-powered insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    stat: "95% accuracy"
  },
  {
    id: 3,
    title: "Content Generation",
    description: "Create marketing content 10x faster with AI assistance",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&h=300&fit=crop",
    stat: "10x faster output"
  },
  {
    id: 4,
    title: "Process Automation",
    description: "Automate repetitive workflows and save 20+ hours per week",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop",
    stat: "20+ hours saved"
  },
  {
    id: 5,
    title: "Data Analysis",
    description: "Extract insights from complex data sets in minutes, not days",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    stat: "100x faster analysis"
  }
];

export default function AIUseCasesStack({ isDark }) {
  const [cards, setCards] = useState(useCases);
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveToEnd = () => {
    setCards(prev => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  const moveToStart = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  const bgClass = isDark ? 'bg-slate-950/80' : 'bg-slate-50/80';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-400' : 'text-slate-600';
  const cardBorder = isDark ? 'border-slate-700' : 'border-slate-300';
  const controlBg = isDark ? 'bg-slate-800/80 hover:bg-slate-700/80' : 'bg-white/80 hover:bg-slate-100/80';

  return (
    <section className={`relative py-20 ${bgClass} backdrop-blur-sm overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${textColor} mb-4`}>
            Real-World AI Applications
          </h2>
          <p className={`text-lg ${subtextColor} max-w-2xl mx-auto`}>
            See how businesses like yours are leveraging AI to drive growth
          </p>
        </motion.div>

        {/* Card Stack Container */}
        <div className="relative max-w-2xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={moveToStart}
            variant="outline"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 ${controlBg} border ${cardBorder}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            onClick={moveToEnd}
            variant="outline"
            size="icon"
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 ${controlBg} border ${cardBorder}`}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Card Stack */}
          <div className="relative w-full aspect-video">
            <AnimatePresence>
              {cards.map((card, i) => {
                const isFront = i === 0;
                const offset = 10;
                const scaleStep = 0.05;
                const brightness = Math.max(0.4, 1 - i * 0.15);

                return (
                  <motion.div
                    key={card.id}
                    className={`absolute w-full h-full rounded-2xl overflow-hidden border-2 ${cardBorder} shadow-2xl cursor-pointer`}
                    style={{
                      zIndex: cards.length - i,
                    }}
                    animate={{
                      top: `${i * -offset}px`,
                      scale: 1 - i * scaleStep,
                      filter: `brightness(${brightness})`,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 }
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 170,
                      damping: 26
                    }}
                    whileHover={isFront ? { scale: 1.02 } : {}}
                    onClick={isFront ? moveToEnd : undefined}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 mb-3 bg-sky-500/20 border border-sky-500/30 rounded-full">
                        <span className="text-sky-300 text-sm font-semibold">{card.stat}</span>
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-2">{card.title}</h3>
                      <p className="text-white/80 text-sm">{card.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {useCases.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? `${isDark ? 'bg-sky-400' : 'bg-blue-600'} w-8`
                    : `${isDark ? 'bg-slate-700' : 'bg-slate-300'} w-1.5`
                }`}
              />
            ))}
          </div>

          {/* Instruction */}
          <p className={`text-center mt-4 text-sm ${subtextColor}`}>
            Click card or use arrows to navigate • {currentIndex + 1} of {useCases.length}
          </p>
        </div>
      </div>
    </section>
  );
}
