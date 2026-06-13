import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LeadForm({ isDark }) { // Added isDark prop
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    console.log('📝 Form submitted:', data);
    
    try {
      // 1. Save to base44 database
      await base44.entities.Lead.create({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        message: data.message,
        status: 'new'
      });
      console.log('✅ Saved to database');

      // 2. Call backend function to generate AI roadmap and send email
      console.log('🚀 Calling backend function to generate roadmap...');
      
      const response = await base44.functions.invoke('generateAIRoadmap', {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        prompt: data.message
      });

      if (response.data.success) {
        console.log('✅ Roadmap generated and email sent!');
      } else {
        console.log('⚠️ Backend function returned error:', response.data.error);
        alert(`There was an error generating your roadmap: ${response.data.error}. Please try again.`);
      }

      // 3. Navigate to success page
      navigate(createPageUrl('Success'));

    } catch (error) {
      console.error('❌ Error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgClass = isDark ? 'bg-slate-950' : 'bg-gradient-to-b from-slate-50 to-white';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const labelColor = isDark ? 'text-slate-300' : 'text-slate-700';
  const cardBg = isDark ? 'bg-slate-900/95' : 'bg-white/95';
  const cardBorder = isDark ? 'border-sky-500/30' : 'border-blue-400/30';
  const inputBg = isDark ? 'bg-slate-800/90' : 'bg-slate-50';
  const inputBorder = isDark ? 'border-slate-700' : 'border-slate-300';
  const inputText = isDark ? 'text-white' : 'text-slate-900';

  return (
    <section id="lead-form" className={`relative py-20 overflow-hidden ${bgClass}`}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${isDark ? 'bg-sky-500/10' : 'bg-blue-400/20'} rounded-full blur-[150px]`} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
            Ready to Transform Your Business?
          </h2>
          <p className={`text-xl ${subtextColor}`}>
            Fill out the form below to receive your free AI implementation roadmap
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Gradient border effect */}
          <div className={`absolute -inset-[2px] bg-gradient-to-r ${isDark ? 'from-sky-500 via-blue-500 to-sky-500' : 'from-blue-400 via-sky-400 to-blue-400'} rounded-[32px] opacity-75 blur-sm`} />
          
          <div className={`relative ${cardBg} backdrop-blur-xl rounded-[30px] p-8 md:p-10 border ${cardBorder} shadow-2xl`}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={labelColor}>First Name *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName', { required: 'Required' })}
                    className={`${inputBg} ${inputBorder} ${inputText} placeholder:text-slate-500 focus:border-sky-500`}
                    placeholder="John"
                    disabled={isSubmitting}
                  />
                  {errors.firstName && <p className="text-sm text-red-400">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className={labelColor}>Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName', { required: 'Required' })}
                    className={`${inputBg} ${inputBorder} ${inputText} placeholder:text-slate-500 focus:border-sky-500`}
                    placeholder="Doe"
                    disabled={isSubmitting}
                  />
                  {errors.lastName && <p className="text-sm text-red-400">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={labelColor}>Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
                  })}
                  className={`${inputBg} ${inputBorder} ${inputText} placeholder:text-slate-500 focus:border-sky-500`}
                  placeholder="john.doe@company.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className={labelColor}>
                  Describe a business process or problem you want to automate or enhance with AI *
                </Label>
                <Textarea
                  id="message"
                  {...register('message', {
                    required: 'Required',
                    minLength: { value: 20, message: 'Please provide at least 20 characters' }
                  })}
                  className={`min-h-[140px] ${inputBg} ${inputBorder} ${inputText} placeholder:text-slate-500 focus:border-sky-500`}
                  placeholder="E.g., We need to automate our customer support responses to handle common inquiries 24/7..."
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-sm text-red-400">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating your roadmap...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Get your free AI implementation guide
                  </>
                )}
              </Button>

              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} text-center pt-2`}>
                We respect your privacy and will never share your information
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}