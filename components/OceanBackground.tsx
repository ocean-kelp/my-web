"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// Dotted shapes mapped using simple grid coordinates (x,y)
const FISH_POINTS = [
  [2,0], [3,0], [1,1], [2,1], [3,1], [4,1],
  [0,2], [1,2], [2,2], [3,2], [4,2], [5,2],
  [1,3], [2,3], [3,3], [4,3], [2,4], [3,4],
  [6,1], [7,0], [6,2], [7,2], [6,3], [7,4]
];

const SHARK_POINTS = [
  [0,3], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2], [9,3], // Snout
  [4,1], [4,0], [5,1], // Dorsal
  [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3], [8,3], [9,3], [10,3], [11,3], // Body
  [1,4], [2,4], [3,4], [4,4], [5,4], [6,4], [7,4], [8,4], [9,4], // Underbelly
  [3,5], [4,6], [4,5], [5,5], // Pectoral
  [10,4], [11,4], [12,3], [13,2], [13,1], [14,0], [13,4], [14,5], [15,6] // Tail
];

const OCTOPUS_POINTS = [
  [2,0], [3,0], [4,0],
  [1,1], [2,1], [3,1], [4,1], [5,1],
  [1,2], [2,2], [3,2], [4,2], [5,2],
  [2,3], [3,3], [4,3],
  [1,4], [1,5], [1,6],
  [2,4], [2,5], [3,6],
  [4,4], [4,5], [4,6],
  [5,4], [5,5], [5,6]
];

const WHALE_POINTS = [
  [2,0], [3,0], [4,0], [5,0], [6,0],
  [2,1], [3,1], [4,1], [5,1], [6,1],
  [2,2], [3,2], [4,2], [5,2], [6,2],
  [2,3], [3,3], [4,3], [5,3], [6,3],
  [2,4], [3,4], [4,4], [5,4], [6,4],
  [3,5], [4,5], [5,5], [6,5],
  [3,6], [4,6], [5,6],
  [4,7], [5,7],
  [4,8], [5,8],
  [4,9], [5,9],
  [2,10], [3,10], [4,10], [5,10], [6,10], [7,10],
  [1,11], [2,11], [7,11], [8,11]
];

const CORAL_POINTS = [
  // Base
  [4,10], [5,10], [6,10],
  [4,9], [5,9], [6,9],
  [5,8],
  // Left branches
  [4,7], [3,6], [2,5], [2,4], [1,3], [1,2], [0,1],
  [3,5], [4,4], [3,3],
  // Center branches
  [5,7], [4,6], [5,5], [4,4], [5,3], [4,2], [5,1], [4,0],
  // Right branches
  [6,8], [7,7], [8,6], [9,5], [9,4], [10,3], [11,2], [10,1], [11,0],
  [8,5], [7,4], [8,3], [7,2],
  // Far right tips
  [12,2], [12,1], [13,0]
];

export default function OceanBackground() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // We use useMemo to cache all random starting variables so they DO NOT change 
  // and cause chaotic jumping when the user scrolls!
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      duration: Math.random() * 20 + 15,
      startX: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 15
    }));
  }, []);

  const corals = useMemo(() => {
    return Array.from({ length: 45 }).map(() => ({
      x: Math.random() * 100, // vw
      y: Math.random() * 10, // vh from bottom
      size: Math.random() * 4 + 2,
      delay: Math.random() * 4
    }));
  }, []);

  const coralFish = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const isLeftCoral = i < 15; // 15 fish on the left coral, 10 on the right
      const baseX = isLeftCoral ? 2 + Math.random() * 12 : 75 + Math.random() * 15; // vw
      const baseY = 3 + Math.random() * 12; // vh from bottom
      const duration = 12 + Math.random() * 10;
      const delay = Math.random() * 5;
      const colors = [
        "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,1)]",
        "bg-pink-400 shadow-[0_0_6px_rgba(244,114,182,1)]",
        "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,1)]",
        "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,1)]",
        "bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,1)]"
      ];
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      
      return { baseX, baseY, duration, delay, colorClass };
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const depthDarkness = Math.min(Math.max(scrollY - 50, 0) / 800, 1);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 dark:bg-slate-950 pointer-events-none transition-colors duration-700">
      {/* Light Mode: Gentle water surface. Dark Mode: Deep sea gradient fading on scroll */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400/20 via-slate-50 to-slate-100 dark:from-teal-900/20 dark:via-slate-950/80 dark:to-slate-950 transition-colors duration-700"
        style={{ opacity: 1 - depthDarkness }}
      ></div>
      
      {/* Sunlight glow at the top */}
      <div 
        className="absolute top-0 left-0 right-0 h-[30vh] bg-linear-to-b from-sky-200/50 dark:from-teal-900/30 to-transparent transition-opacity duration-700"
        style={{ opacity: 1 - depthDarkness * 1.5 }}
      ></div>

      {/* Bioluminescent glow at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-linear-to-t from-cyan-900/10 to-transparent dark:opacity-100 opacity-0 transition-opacity duration-700"></div>

      {/* Abstract Bubbles / Mist */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-600/30 dark:bg-teal-400/20 blur-[1px]"
          style={{ width: p.size, height: p.size, left: `${p.startX}vw` }}
          initial={{ y: "110vh" }}
          animate={{
            y: "-10vh",
            x: [0, -20, 20, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        />
      ))}

      {/* Coral Dust (Fixed to Bottom, pulses) */}
      <div className="absolute bottom-0 left-0 right-0 h-[15vh]">
        {corals.map((c, i) => (
          <motion.div
            key={`coral-${i}`}
            className="absolute rounded-full bg-orange-400/40 dark:bg-rose-400/30 blur-[1px]"
            style={{ width: c.size, height: c.size, left: `${c.x}vw`, bottom: `${c.y}vh` }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: c.delay
            }}
          />
        ))}
      </div>

      {/* Constellation Fish */}
      <motion.div
        className="absolute top-[30vh] opacity-60 dark:opacity-80"
        initial={{ x: "120vw" }}
        animate={{ x: "-20vw", y: ["0vh", "-5vh", "0vh", "5vh", "0vh"] }}
        transition={{
          x: { duration: 35, repeat: Infinity, ease: "linear" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          {FISH_POINTS.map(([x, y], i) => (
            <motion.div 
              key={`fish-${i}`} 
              className="absolute w-[3px] h-[3px] rounded-full bg-blue-500 dark:bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]" 
              style={{ left: x * 6, top: y * 6 }} 
              animate={x >= 6 ? { y: [-2, 2, -2] } : {}}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: x * 0.05 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Constellation Shark */}
      <motion.div
        className="absolute top-[60vh] opacity-40 dark:opacity-60"
        initial={{ x: "120vw" }}
        animate={{ x: "-30vw", y: ["0vh", "3vh", "0vh", "-3vh", "0vh"] }}
        transition={{
          x: { duration: 50, repeat: Infinity, ease: "linear", delay: 5 },
          y: { duration: 20, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          {SHARK_POINTS.map(([x, y], i) => {
            const isTail = x >= 12;
            const isDorsal = y <= 1;
            const isPectoral = y >= 5 && x < 10;
            let anim = {};

            if (isTail) anim = { y: [-6, 6, -6], x: [-1, 1, -1] };
            else if (isDorsal) anim = { x: [-2, 2, -2] };
            else if (isPectoral) anim = { y: [-3, 3, -3] };
            else if (x > 5) anim = { y: [-2, 2, -2] }; // Micro-sway for body

            return (
              <motion.div 
                key={`shark-${i}`} 
                className="absolute w-[3px] h-[3px] rounded-full bg-slate-600 dark:bg-teal-200 shadow-[0_0_6px_rgba(45,212,191,0.9)]" 
                style={{ left: x * 8, top: y * 8 }} 
                animate={Object.keys(anim).length > 0 ? anim : {}}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: x * 0.08 }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Constellation Octopus */}
      <motion.div
        className="absolute top-[40vh] opacity-50 dark:opacity-70"
        initial={{ x: "110vw" }}
        animate={{ x: "-10vw", y: ["0vh", "-8vh", "0vh"] }}
        transition={{
          x: { duration: 60, repeat: Infinity, ease: "linear", delay: 15 },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          {OCTOPUS_POINTS.map(([x, y], i) => {
            const isTentacle = y >= 4;
            return (
              <motion.div 
                key={`octopus-${i}`} 
                className="absolute w-[3px] h-[3px] rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.8)]" 
                style={{ left: x * 8, top: y * 8 }} 
                animate={isTentacle ? { x: [-3, 3, -3], y: [-2, 2, -2] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: y * 0.1 }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Constellation Sleeping Sperm Whale */}
      <motion.div
        className="absolute top-[65vh] left-[75vw] opacity-30 dark:opacity-50"
        animate={{ 
          y: ["-5vh", "5vh", "-5vh"],
          rotate: [0, 360]
        }}
        transition={{
          y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 120, repeat: Infinity, ease: "linear" }
        }}
      >
        {/* We wrap it in a slightly swaying div so it isn't completely rigid while it sleeps */}
        <div className="relative origin-center">
          {WHALE_POINTS.map(([x, y], i) => {
             const isTail = y >= 10;
             return (
              <motion.div 
                key={`whale-${i}`} 
                className="absolute w-[4px] h-[4px] rounded-full bg-slate-500 dark:bg-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.7)]" 
                style={{ left: x * 9, top: y * 9 }} 
                animate={isTail ? { x: [-3, 3, -3] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: y * 0.05 }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Constellation Coral Left */}
      <motion.div className="absolute bottom-[2vh] left-[5vw] opacity-80 dark:opacity-90 origin-bottom"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          {CORAL_POINTS.map(([x, y], i) => (
            <motion.div 
              key={`coral-l-${i}`} 
              className="absolute w-[4px] h-[4px] rounded-full bg-rose-400 dark:bg-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.8)]" 
              style={{ left: x * 8, top: (y - 12) * 8 }} 
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: (10 - y) * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Constellation Coral Right */}
      <motion.div className="absolute bottom-[5vh] right-[15vw] opacity-70 dark:opacity-80 origin-bottom"
        animate={{ rotate: [2, -2, 2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative scale-75">
          {CORAL_POINTS.map(([x, y], i) => (
            <motion.div 
              key={`coral-r-${i}`} 
              className="absolute w-[5px] h-[5px] rounded-full bg-amber-400 dark:bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]" 
              style={{ left: x * 8, top: (y - 12) * 8 }} 
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: (10 - y) * 0.15 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Tiny Coral Fish Ecosystem */}
      {coralFish.map((fish, i) => (
        <motion.div
          key={`tf-${i}`}
          className="absolute z-10"
          style={{ bottom: `${fish.baseY}vh`, left: `${fish.baseX}vw` }}
          animate={{
            x: [0, 15, -10, 20, -15, 0],
            y: [0, -12, 5, -8, 10, 0]
          }}
          transition={{
            duration: fish.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: fish.delay
          }}
        >
          {/* Fish body */}
          <div className={`absolute w-[3px] h-[3px] rounded-full flex ${fish.colorClass} opacity-90`} />
          {/* Fish tail (tiny dot rendering just behind it) */}
          <div className={`absolute -left-[3px] top-px w-px h-px rounded-full ${fish.colorClass} opacity-60`} />
        </motion.div>
      ))}

    </div>
  );
}
