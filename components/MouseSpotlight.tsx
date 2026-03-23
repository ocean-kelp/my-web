"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function MouseSpotlight() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted || resolvedTheme !== "dark") return null;

  return null; // The visual overlay is now handled purely by CSS targetting the text directly!
}
