import React, { useEffect, useRef, useState } from "react";

function mergeClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(15, 23, 42)",
  gradientBackgroundEnd = "rgb(30, 41, 59)",
  firstColor = "59, 130, 246",
  secondColor = "139, 92, 246",
  thirdColor = "34, 211, 238",
  fourthColor = "99, 102, 241",
  fifthColor = "236, 72, 153",
  pointerColor = "96, 165, 250",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}) => {
  const interactiveRef = useRef(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  return (
    <div
      className={mergeClasses(
        "min-h-screen w-full relative overflow-hidden",
        containerClassName
      )}
      style={{
        background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`
      }}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      
      <div className={mergeClasses("relative z-10", className)}>{children}</div>
      
      <div
        className={mergeClasses(
          "gradients-container absolute inset-0 blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className="absolute w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-moveVertical opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(${firstColor}, 1) 0, rgba(${firstColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
          }}
        />
        <div
          className="absolute w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-moveInCircleReverse opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(${secondColor}, 0.8) 0, rgba(${secondColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            transformOrigin: 'calc(50% - 400px)',
          }}
        />
        <div
          className="absolute w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-moveInCircle opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(${thirdColor}, 0.8) 0, rgba(${thirdColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            transformOrigin: 'calc(50% + 400px)',
          }}
        />
        <div
          className="absolute w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-moveHorizontal opacity-70"
          style={{
            background: `radial-gradient(circle at center, rgba(${fourthColor}, 0.8) 0, rgba(${fourthColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            transformOrigin: 'calc(50% - 200px)',
          }}
        />
        <div
          className="absolute w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-moveInCircleSlow opacity-100"
          style={{
            background: `radial-gradient(circle at center, rgba(${fifthColor}, 0.8) 0, rgba(${fifthColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            transformOrigin: 'calc(50% - 800px) calc(50% + 800px)',
          }}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className="absolute w-full h-full -top-1/2 -left-1/2 opacity-70"
            style={{
              background: `radial-gradient(circle at center, rgba(${pointerColor}, 0.8) 0, rgba(${pointerColor}, 0) 50%)`,
              mixBlendMode: blendingValue,
            }}
          />
        )}
      </div>
    </div>
  );
};