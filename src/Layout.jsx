import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-transparent"> {/* Changed bg-slate-950 to bg-transparent to let the BackgroundGradientAnimation show through */}
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} AI Microtech Link. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a 
                href="mailto:contact@aimicrotechlink.com" 
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                Contact
              </a>
              <a 
                href="#privacy" 
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}