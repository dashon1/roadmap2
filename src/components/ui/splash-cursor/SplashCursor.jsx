import React, { useEffect, useRef } from 'react';

export const SplashCursor = ({ color = 'rgba(56, 189, 248, 0.5)' }) => {
  const canvasRef = useRef(null);
  const trailsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Trail segment class
    class TrailSegment {
      constructor(x, y, prevX, prevY, hue) {
        this.x = x;
        this.y = y;
        this.prevX = prevX;
        this.prevY = prevY;
        this.hue = hue;
        this.life = 1.0;
        this.maxLife = 30; // Reduced from 60 for faster fade
        this.age = 0;
        this.size = 20 + Math.random() * 30;
      }

      update() {
        this.age++;
        this.life = 1 - (this.age / this.maxLife);
      }

      draw(ctx) {
        if (this.life <= 0) return;

        ctx.save();
        
        // Create gradient along the trail
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        const alpha = this.life * 0.3;
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${this.hue + 30}, 100%, 60%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.hue + 60}, 100%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      isDead() {
        return this.age >= this.maxLife;
      }
    }

    let hueOffset = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Create multiple trail segments for smooth effect
      const distance = Math.sqrt(
        Math.pow(mouseRef.current.x - mouseRef.current.prevX, 2) +
        Math.pow(mouseRef.current.y - mouseRef.current.prevY, 2)
      );
      
      if (distance > 2) {
        const segments = Math.ceil(distance / 10);
        for (let i = 0; i < segments; i++) {
          const t = i / segments;
          const x = mouseRef.current.prevX + (mouseRef.current.x - mouseRef.current.prevX) * t;
          const y = mouseRef.current.prevY + (mouseRef.current.y - mouseRef.current.prevY) * t;
          
          // Varying hues for rainbow effect
          const hue = (hueOffset + (i * 20)) % 360;
          
          trailsRef.current.push(
            new TrailSegment(x, y, mouseRef.current.prevX, mouseRef.current.prevY, hue)
          );
        }
        hueOffset = (hueOffset + 2) % 360;
      }
    };

    // Animation loop
    const animate = () => {
      // Faster fade with higher alpha
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Lighter blend mode for glowing effect
      ctx.globalCompositeOperation = 'lighter';

      // Update and draw trails
      trailsRef.current = trailsRef.current.filter(trail => {
        trail.update();
        trail.draw(ctx);
        return !trail.isDead();
      });

      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial clear
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}