import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function FAQSection({ isDark }) {
  const [openIndex, setOpenIndex] = useState(0);

  const { data: faqs = [] } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const allFaqs = await base44.entities.FAQ.filter({ active: true }, 'order');
      return allFaqs;
    },
    initialData: []
  });

  const bgClass = isDark ? 'bg-slate-900/50' : 'bg-slate-50/50';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-400' : 'text-slate-600';
  const itemBg = isDark ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50';

  if (faqs.length === 0) return null;

  return (
    <section className={`relative py-20 ${bgClass} backdrop-blur-sm`}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold ${textColor} mb-4`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-lg ${subtextColor}`}>
            Everything you need to know about our AI services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`${itemBg} border rounded-xl overflow-hidden transition-colors`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className={`font-semibold ${textColor}`}>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 ${subtextColor} transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`px-6 pb-4 ${subtextColor}`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}