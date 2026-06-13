import React from 'react';
import { Sparkles } from 'lucide-react';

// Utility function to merge classNames
function mergeClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DisplayCard({
  className,
  icon = <Sparkles className="w-4 h-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}) {
  return (
    <div
      className={mergeClasses(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-slate-800/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-slate-950 after:to-transparent after:content-[''] hover:border-white/20 hover:bg-slate-800 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={mergeClasses("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-slate-300">{description}</p>
      <p className="text-slate-400">{date}</p>
    </div>
  );
}