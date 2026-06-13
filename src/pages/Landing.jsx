import React, { useState, useEffect } from 'react';
import Hero from '../components/landing/Hero';
import CredibilityStrip from '../components/landing/CredibilityStrip';
import ValueCards from '../components/landing/ValueCards';
import AIUseCasesStack from '../components/landing/AIUseCasesStack';
import TrustedByStrip from '../components/landing/TrustedByStrip';
import CallToAction from '../components/landing/CallToAction';
import LeadForm from '../components/landing/LeadForm';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FAQSection from '../components/landing/FAQSection';
import ThemeToggle from '../components/ui/ThemeToggle';
import FloatingChatbot from '../components/chatbot/FloatingChatbot';
import { BackgroundGradientAnimation } from '../components/ui/background-gradient/BackgroundGradientAnimation';

export default function Landing() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || savedTheme === null;
    setIsDark(prefersDark);

    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark);
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Gradient Animation */}
      <BackgroundGradientAnimation
        gradientBackgroundStart={isDark ? "rgb(15, 23, 42)" : "rgb(219, 234, 254)"}
        gradientBackgroundEnd={isDark ? "rgb(30, 41, 59)" : "rgb(243, 244, 246)"}
        firstColor={isDark ? "59, 130, 246" : "59, 130, 246"}
        secondColor={isDark ? "139, 92, 246" : "147, 51, 234"}
        thirdColor={isDark ? "34, 211, 238" : "6, 182, 212"}
        fourthColor={isDark ? "99, 102, 241" : "99, 102, 241"}
        fifthColor={isDark ? "236, 72, 153" : "236, 72, 153"}
        pointerColor={isDark ? "96, 165, 250" : "37, 99, 235"}
        size="80%"
        blendingValue="hard-light"
        className="fixed inset-0 z-0"
      >
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Content */}
        <div className="relative z-10">
          <Hero onScrollToForm={scrollToForm} isDark={isDark} />
          <CredibilityStrip isDark={isDark} />
          <ValueCards isDark={isDark} />
          <TrustedByStrip isDark={isDark} />
          <AIUseCasesStack isDark={isDark} />
          <TestimonialsSection isDark={isDark} />
          <FAQSection isDark={isDark} />
          <CallToAction onScrollToForm={scrollToForm} isDark={isDark} />
          <LeadForm isDark={isDark} />
        </div>

        {/* Floating Chatbot */}
        <FloatingChatbot />
      </BackgroundGradientAnimation>
    </div>
  );
}