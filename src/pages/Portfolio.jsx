import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');

  const { data: caseStudies = [], isLoading } = useQuery({
    queryKey: ['caseStudies', filter],
    queryFn: async () => {
      if (filter === 'all') {
        return await base44.entities.CaseStudy.filter({ featured: true }, '-created_date');
      }
      return await base44.entities.CaseStudy.filter({ featured: true, industry: filter }, '-created_date');
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Success Stories</h1>
          <p className="text-xl text-slate-400">
            Real AI implementations, real business impact
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {['all', 'healthcare', 'finance', 'retail', 'manufacturing', 'technology'].map((ind) => (
            <Button
              key={ind}
              onClick={() => setFilter(ind)}
              variant={filter === ind ? 'default' : 'outline'}
              className={filter === ind ? 'bg-sky-500' : 'border-slate-700 text-slate-300'}
            >
              {ind.charAt(0).toUpperCase() + ind.slice(1)}
            </Button>
          ))}
        </div>

        {/* Case Studies */}
        {isLoading ? (
          <div className="text-center text-slate-400 py-20">Loading...</div>
        ) : caseStudies.length === 0 ? (
          <div className="text-center text-slate-400 py-20">
            <p className="text-xl mb-4">No case studies yet</p>
            <p>Check back soon for success stories!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-colors"
              >
                <div className="md:flex">
                  {study.image_url && (
                    <img
                      src={study.image_url}
                      alt={study.title}
                      className="md:w-1/3 h-64 md:h-auto object-cover"
                    />
                  )}
                  <div className="p-8 flex-1">
                    <div className="inline-block px-3 py-1 bg-sky-500/20 border border-sky-500/30 rounded-full text-sky-400 text-sm mb-4">
                      {study.industry}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-4">{study.title}</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="text-sky-400 font-semibold mb-2">The Challenge</h3>
                        <p className="text-slate-300">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sky-400 font-semibold mb-2">The Solution</h3>
                        <p className="text-slate-300">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sky-400 font-semibold mb-2">Results</h3>
                        <p className="text-slate-300">{study.results}</p>
                      </div>
                    </div>

                    {study.metrics && (
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                        {study.metrics.cost_savings && (
                          <div className="text-center">
                            <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{study.metrics.cost_savings}</p>
                            <p className="text-sm text-slate-400">Cost Savings</p>
                          </div>
                        )}
                        {study.metrics.time_saved && (
                          <div className="text-center">
                            <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{study.metrics.time_saved}</p>
                            <p className="text-sm text-slate-400">Time Saved</p>
                          </div>
                        )}
                        {study.metrics.roi && (
                          <div className="text-center">
                            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{study.metrics.roi}</p>
                            <p className="text-sm text-slate-400">ROI</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}