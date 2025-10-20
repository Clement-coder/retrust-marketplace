"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

const ClientSideBubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generatedBubbles: Bubble[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setBubbles(generatedBubbles);
  }, []);

  if (bubbles.length === 0) {
    return null; // Render nothing until bubbles are generated on the client
  }

  return (
    <>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            left: bubble.left,
            top: bubble.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
          }}
        />
      ))}
    </>
  );
};

export default ClientSideBubbles;