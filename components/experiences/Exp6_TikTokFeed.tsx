"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const VIDEOS = [
  {
    id: 1,
    copyTop: "Y ya fue detectado.",
    descTitle: "Descripción",
    descBody: "No todos fallan igual.",
    tags: "#disciplina #sistema",
  },
  {
    id: 2,
    copyTop: "Eso construye un cuerpo mediocre.",
    descTitle: "Error",
    descBody: "Te enfocas en lo general.",
    tags: "#realidad",
  },
  {
    id: 3,
    copyTop: "Y eso es lo que no tienes.",
    descTitle: "Este no es contenido",
    descBody: "es estructura real.",
    tags: "#sistema #solución",
  }
];

export default function Exp6_TikTokFeed({ onNext }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      const index = Math.round(scrollTop / clientHeight);
      setCurrentIndex(index);

      // If passing the last video
      if (scrollTop + clientHeight > scrollHeight + 50) {
        onNext();
      }
    }
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full snap-y snap-mandatory overflow-y-scroll hide-scrollbar relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {VIDEOS.map((video, idx) => (
          <div key={video.id} className="w-full h-full snap-center relative flex justify-center items-center">
            
            {/* Background Simulated Video */}
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
               {/* Glitch or dummy element representing video */}
               {currentIndex === idx && (
                 <div className="w-full h-full bg-gradient-to-b from-neutral-800 to-black animate-pulse opacity-50 mix-blend-screen"></div>
               )}
            </div>

            {/* Overlay Gradient for Text */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

            {/* Top Text Overlay */}
            <div className="absolute top-1/4 left-0 right-0 px-6 text-center z-10 pointer-events-none">
               <motion.h2 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: currentIndex === idx ? 1 : 0, scale: currentIndex === idx ? 1 : 0.9 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="text-white text-3xl font-bold uppercase tracking-wide drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] balance break-words"
               >
                 {video.copyTop}
               </motion.h2>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-12 left-6 right-16 z-10 pointer-events-none">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: currentIndex === idx ? 1 : 0, y: currentIndex === idx ? 0 : 20 }}
                 transition={{ duration: 0.5, delay: 0.4 }}
               >
                 <h3 className="text-white font-semibold text-base mb-1">{video.descTitle}: {video.descBody}</h3>
                 <p className="text-white/80 font-medium text-sm">{video.tags}</p>
               </motion.div>
            </div>
            
            {/* Edge Swipe Hint on the last one */}
            {idx === VIDEOS.length - 1 && (
               <div className="absolute bottom-2 left-0 right-0 text-center animate-bounce">
                  <span className="text-white/50 text-xs uppercase tracking-widest font-mono">
                     Swipe down to finalize
                  </span>
               </div>
            )}
          </div>
        ))}
        
        {/* Invisible Extra trigger block at the bottom */}
        <div className="w-full h-24 snap-end"></div>
      </div>
      
      {/* Interaction overlay to allow swiping via mouse mimicking touch if necessary */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
