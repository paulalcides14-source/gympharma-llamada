"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

import type { DeficitType } from "@/app/page";

interface Props {
  onNext: () => void;
  deficitType: DeficitType;
}

export default function Exp5_PlayerVSL({ onNext, deficitType }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEndTransition, setShowEndTransition] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate Video Ending after 10 seconds for demo purposes
    setTimeout(() => {
      setShowEndTransition(true);
      setTimeout(() => onNext(), 2000);
    }, 10000);
  };

  return (
    <div className="w-full h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg aspect-video bg-neutral-900 border border-white/10 rounded-lg overflow-hidden relative flex flex-col justify-center items-center shadow-2xl"
      >
        {!isPlaying ? (
          <>
            {/* Thumbnail simulator with glitch effect via CSS or static image */}
            <div className="absolute inset-0 bg-neutral-800 flex flex-col items-center justify-center">
               <div className="absolute inset-0 opacity-20 mix-blend-color-dodge bg-[url('https://textures.bjnir.com/static/images/noise.png')]"></div>
               <p className="text-neutral-500 font-mono tracking-widest text-sm absolute top-4 left-4 uppercase">
                 Acceso autorizado
               </p>
               <p className="text-neutral-400 font-mono text-xs absolute bottom-4 uppercase animate-pulse">
                 Cargando contenido...
               </p>
            </div>
            
            <button 
              onClick={handlePlay}
              className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all group"
            >
              <Play className="ml-2 text-white/80 group-hover:text-white transition-colors" size={36} />
            </button>
          </>
        ) : (
          <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
             {/* Simulated video playback - in real life use React Player */}
             <div className="absolute inset-0 bg-gradient-radial from-neutral-800 to-black animate-pulse-slow"></div>
             <p className="text-neutral-600 font-mono uppercase tracking-widest z-10 animate-pulse text-center">
               Reproduciendo VSL...<br/>
               <span className="text-sm opacity-50">PERFIL: {deficitType || "DESCONOCIDO"}</span>
             </p>
             <div className="absolute bottom-0 left-0 h-1 bg-neutral-800 w-full">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 10, ease: "linear" }}
                 className="h-full bg-red-600 shadow-[0_0_10px_red]"
               />
             </div>
          </div>
        )}

      </motion.div>

      {showEndTransition && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black z-50 pointer-events-none"
        />
      )}
    </div>
  );
}
