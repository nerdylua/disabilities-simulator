"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuroraTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content to display with the aurora effect
   */
  children: ReactNode;
  /**
   * Array of colors for the gradient
   * @default ["#ff40aa", "#40aaff", "#ff40aa"]
   */
  colors?: string[];
  /**
   * Animation duration in seconds
   * @default 8
   */
  animationSpeed?: number;
}

export function AuroraText({
  children,
  className,
  colors = ["#ff40aa", "#40aaff", "#ff40aa"],
  animationSpeed = 8,
  ...props
}: AuroraTextProps) {
  const gradientColors = colors.join(", ");

  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r bg-clip-text text-transparent animate-gradient",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientColors}, ${colors[0]})`,
        backgroundSize: "200% 100%",
        animationDuration: `${animationSpeed}s`,
      }}
      {...props}
    >
      {children}
    </span>
  );
}