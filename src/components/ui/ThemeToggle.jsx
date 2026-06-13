import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme !== 'light';
    setIsDark(prefersDark);
    applyTheme(prefersDark);
  }, []);

  const applyTheme = (dark) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove('light-theme');
      root.classList.add('dark-theme');
      document.body.style.backgroundColor = '#020617';
    } else {
      root.classList.remove('dark-theme');
      root.classList.add('light-theme');
      document.body.style.backgroundColor = '#f8fafc';
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    applyTheme(newTheme);
    
    // Trigger event for other components
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDark: newTheme } }));
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full backdrop-blur-sm transition-all duration-300 ${
        isDark 
          ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 hover:border-sky-500/50' 
          : 'bg-white/80 border-slate-300 hover:bg-slate-50 hover:border-blue-400/50'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </Button>
  );
}