import React, { useRef, useEffect } from 'react';

export default function Lightning({ hue = 210, speed = 1.2, intensity = 0.45 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Lightning animation with 2D canvas
    let time = 0;

    const drawLightning = () => {
      const width = canvas.width;
      const height = canvas.height;

      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(drawLightning);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        width / 2, height / 3, 0,
        width / 2, height / 3, Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, ${intensity * 0.3})`);
      gradient.addColorStop(0.5, `hsla(${hue}, 60%, 40%, ${intensity * 0.15})`);
      gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw lightning bolts
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      for (let i = 0; i < 3; i++) {
        const offset = (time * speed + i * 2) % 10;
        const startX = width * 0.3 + Math.sin(time * 0.5 + i) * width * 0.2;
        const startY = height * 0.2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Create jagged lightning path
        let x = startX;
        let y = startY;
        const segments = 8;
        
        for (let j = 0; j < segments; j++) {
          x += (Math.random() - 0.5) * width * 0.15;
          y += height / segments;
          ctx.lineTo(x, y);
        }

        // Lightning glow
        const lightningGradient = ctx.createLinearGradient(startX, startY, x, y);
        lightningGradient.addColorStop(0, `hsla(${hue}, 100%, 80%, ${intensity * 0.8})`);
        lightningGradient.addColorStop(0.5, `hsla(${hue}, 100%, 60%, ${intensity * 0.5})`);
        lightningGradient.addColorStop(1, `hsla(${hue}, 80%, 40%, 0)`);

        ctx.strokeStyle = lightningGradient;
        ctx.lineWidth = Math.max(1, 2 + Math.sin(offset) * 1.5);
        ctx.lineCap = 'round';
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
        ctx.stroke();
      }

      ctx.restore();

      // Animated particles
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 30; i++) {
        const particleTime = (time * speed * 2 + i * 0.3) % 6;
        const x = width * 0.2 + Math.sin(particleTime + i) * width * 0.3;
        const y = height * 0.3 + Math.cos(particleTime * 0.7 + i * 0.5) * height * 0.3;
        
        // Ensure size is always positive and has a minimum value
        const sizeCalc = Math.sin(particleTime) * 2 + 2;
        const size = Math.max(0.5, Math.abs(sizeCalc));
        
        const alphaCalc = (Math.sin(particleTime * 2) + 1) * 0.3 * intensity;
        const alpha = Math.max(0, Math.min(1, alphaCalc));

        if (size > 0 && alpha > 0) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
          ctx.fill();
        }
      }

      time += 0.016;
      animationRef.current = requestAnimationFrame(drawLightning);
    };

    drawLightning();

    return () => {
      window.removeEventListener('resize', setSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hue, speed, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}