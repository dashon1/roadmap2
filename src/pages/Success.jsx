import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-2xl w-full text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-8 shadow-xl shadow-green-500/25"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Main message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
        >
          Thank You!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-200 mb-8"
        >
          <p className="text-xl text-slate-700 leading-relaxed mb-6">
            Your information has been received. 
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Expect your AI implementation guide in your inbox in <strong className="text-blue-600">5–7 minutes</strong>.
          </p>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <p className="text-slate-600 mb-6">
            Want to discuss your specific needs?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              className="h-12 px-6 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              <Link to={createPageUrl('Landing')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25"
            >
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a 20-min discovery call
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-slate-500"
        >
          If you don't see the email, please check your spam folder
        </motion.p>
      </motion.div>
    </div>
  );
}