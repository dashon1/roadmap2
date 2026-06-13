import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function TestimonialsSection({ isDark }) {
  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const allTestimonials = await base44.entities.Testimonial.filter({ featured: true });
      return allTestimonials.slice(0, 3);
    },
    initialData: []
  });

  const bgClass = isDark ? 'bg-slate-950/80' : 'bg-white/80';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-400' : 'text-slate-600';
  const cardBg = isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-slate-200';

  if (testimonials.length === 0) return null;

  return (
    <section className={`relative py-20 ${bgClass} backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold ${textColor} mb-4`}>
            What Our Clients Say
          </h2>
          <p className={`text-lg ${subtextColor}`}>
            Real results from real businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${cardBg} border rounded-2xl p-6 relative`}
            >
              <Quote className="w-8 h-8 text-sky-500 mb-4 opacity-50" />
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>

              <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} mb-6 italic`}>
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                {testimonial.image_url && (
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.client_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className={`font-semibold ${textColor}`}>{testimonial.client_name}</p>
                  <p className={`text-sm ${subtextColor}`}>
                    {testimonial.position} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}