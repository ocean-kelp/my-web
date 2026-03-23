"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const seaCreatures = ["🦦", "🪸", "🐠", "🐟", "🐙", "🦑", "🐋", "🫧", "🌿", "🫧", "🫧"];

export default function OceanBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950 pointer-events-none">
      {/* Deep Ocean Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-teal-900/20 via-slate-950/80 to-slate-950"></div>
      
      {/* Bioluminescent glow at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-linear-to-t from-cyan-900/10 to-transparent"></div>

      {/* Floating Creatures & Bubbles */}
      {seaCreatures.map((emoji, i) => {
        const isUpward = emoji === "🫧" || emoji === "🌿" || emoji === "🪸";
        const duration = Math.random() * 30 + 20; // 20-50s
        const startX = Math.random() * 100; // 0-100vw
        const isFlipped = Math.random() > 0.5;
        
        return (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-6xl opacity-20 blur-[2px]"
            initial={{ 
              x: isUpward ? `${startX}vw` : (isFlipped ? "110vw" : "-10vw"), 
              y: isUpward ? "110vh" : `${Math.random() * 80 + 10}vh`,
              rotate: 0,
              scale: (Math.random() * 0.5 + 0.5) * (isFlipped ? -1 : 1)
            }}
            animate={isUpward ? {
              y: "-10vh",
              x: [`${startX}vw`, `${startX - 5}vw`, `${startX + 5}vw`, `${startX}vw`],
              rotate: [0, 15, -15, 0]
            } : {
              x: isFlipped ? ["110vw", "-10vw"] : ["-10vw", "110vw"],
              y: [`${Math.random() * 80 + 10}vh`, `${Math.random() * 80 + 10}vh`],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20
            }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
