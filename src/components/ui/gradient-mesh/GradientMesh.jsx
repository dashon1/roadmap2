import React, { useEffect, useRef } from "react";

// Convert hex to RGB
const hexToRgb = (hex) => {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return [r, g, b];
};

export function GradientMesh({
  colors = ["#3b2a8d", "#aaa7d7", "#f75092"],
  speed = 0.5,
  scale = 1.0,
  className = "",
  ...rest
}) {
  const canvasRef = useRef(null);
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

    const rgbColors = colors.map(hexToRgb);
    let time = 0;

    const animate = () => {
      time += 0.001 * speed;

      const width = canvas.width;
      const height = canvas.height;

      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Create gradient mesh effect with more intense colors
      const gradient1 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(time) * width * 0.25,
        height * 0.3 + Math.cos(time * 0.8) * height * 0.25,
        0,
        width * 0.3,
        height * 0.3,
        width * 0.9 * scale
      );
      gradient1.addColorStop(0, `rgba(${rgbColors[0].join(",")}, 0.8)`);
      gradient1.addColorStop(0.5, `rgba(${rgbColors[0].join(",")}, 0.4)`);
      gradient1.addColorStop(1, `rgba(${rgbColors[0].join(",")}, 0)`);

      const gradient2 = ctx.createRadialGradient(
        width * 0.7 + Math.cos(time * 1.2) * width * 0.25,
        height * 0.6 + Math.sin(time * 0.9) * height * 0.25,
        0,
        width * 0.7,
        height * 0.6,
        width * 0.8 * scale
      );
      gradient2.addColorStop(0, `rgba(${rgbColors[1].join(",")}, 0.8)`);
      gradient2.addColorStop(0.5, `rgba(${rgbColors[1].join(",")}, 0.4)`);
      gradient2.addColorStop(1, `rgba(${rgbColors[1].join(",")}, 0)`);

      const gradient3 = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.7) * width * 0.35,
        height * 0.8 + Math.cos(time * 1.1) * height * 0.25,
        0,
        width * 0.5,
        height * 0.8,
        width * 0.7 * scale
      );
      gradient3.addColorStop(0, `rgba(${rgbColors[2].join(",")}, 0.8)`);
      gradient3.addColorStop(0.5, `rgba(${rgbColors[2].join(",")}, 0.4)`);
      gradient3.addColorStop(1, `rgba(${rgbColors[2].join(",")}, 0)`);

      // Clear and draw
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";

      // Add stronger blur effect
      ctx.filter = "blur(80px)";
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = "none";

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed, scale]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      {...rest}
    />
  );
}