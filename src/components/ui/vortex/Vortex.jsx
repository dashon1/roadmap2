import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function mergeClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = 500,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0.5,
  rangeSpeed = 1.0,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "rgb(15, 23, 42)",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Particle system
    const particles = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: centerY + (Math.random() - 0.5) * rangeY * 2,
        vx: 0,
        vy: 0,
        life: Math.random() * 100,
        ttl: 50 + Math.random() * 150,
        speed: baseSpeed + Math.random() * rangeSpeed,
        radius: baseRadius + Math.random() * rangeRadius,
        hue: baseHue + Math.random() * 100,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.016;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Calculate angle towards center with some noise
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Add swirl effect
        const angle = Math.atan2(dy, dx) + Math.sin(time + particle.angle) * 0.5;
        
        // Update velocity with swirl
        particle.vx = Math.cos(angle) * particle.speed;
        particle.vy = Math.sin(angle) * particle.speed;

        // Update position
        const oldX = particle.x;
        const oldY = particle.y;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update life
        particle.life += 1;

        // Fade in/out based on life
        const fadeInOut = Math.abs(((particle.life + particle.ttl / 2) % particle.ttl) - particle.ttl / 2) / (particle.ttl / 2);

        // Draw particle trail
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineWidth = particle.radius;
        ctx.strokeStyle = `hsla(${particle.hue}, 100%, 60%, ${fadeInOut * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(particle.x, particle.y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        // Reset particle if out of bounds or life exceeded
        if (
          particle.x > canvas.width ||
          particle.x < 0 ||
          particle.y > canvas.height ||
          particle.y < 0 ||
          particle.life > particle.ttl
        ) {
          particle.x = Math.random() * canvas.width;
          particle.y = centerY + (Math.random() - 0.5) * rangeY * 2;
          particle.life = 0;
          particle.angle = Math.random() * Math.PI * 2;
        }
      });

      // Add glow effect
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(4px)";
      particles.forEach((particle) => {
        const fadeInOut = Math.abs(((particle.life + particle.ttl / 2) % particle.ttl) - particle.ttl / 2) / (particle.ttl / 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${fadeInOut * 0.3})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, rangeY, baseHue, baseSpeed, rangeSpeed, baseRadius, rangeRadius, backgroundColor]);

  return (
    <div className={mergeClasses("relative h-full w-full", containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute h-full w-full inset-0 z-0 bg-transparent flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </motion.div>

      <div className={mergeClasses("relative z-10", className)}>
        {children}
      </div>
    </div>
  );
};