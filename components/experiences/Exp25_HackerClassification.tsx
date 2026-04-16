"use client";

import { useState } from "react";
import type { DeficitType } from "@/app/page";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
  setDeficitType: (type: DeficitType) => void;
}

export default function Exp25_HackerClassification({ onNext, setDeficitType }: Props) {
  const [selected, setSelected] = useState<DeficitType | null>(null);
  const [signalError, setSignalError] = useState(false);

  const handleSelection = (type: DeficitType) => {
    if (selected) return;
    setSelected(type);
    setDeficitType(type);
    
    // Trigger signal error
    setTimeout(() => {
      setSignalError(true);
      // Wait for signal error duration, then next
      setTimeout(onNext, 2000);
    }, 500);
  };

  return (
    <div className="w-full h-screen bg-black text-white font-mono p-6 flex flex-col justify-center items-center overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!signalError ? (
          <motion.div 
            key="options"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            className="w-full max-w-md relative z-10"
          >
            <div className="text-center mb-10">
               <h2 className="text-[#00ff41] text-xs tracking-widest uppercase mb-2">Paso Mando — Sistema Central</h2>
               <h3 className="text-2xl font-bold tracking-widest uppercase">Selecciona el sector a calibrar</h3>
            </div>
            
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleSelection("FÍSICO")}
                className="w-full py-5 border border-white/20 bg-neutral-900/50 hover:bg-neutral-800 active:scale-95 transition-all text-center relative group rounded-sm"
              >
                <span className="font-bold text-lg tracking-widest">FÍSICO / PESO</span>
                <p className="text-xs text-neutral-400 mt-2 uppercase tracking-wide">Desempeño, estética, disciplina corporal</p>
                <div className="absolute left-0 top-0 h-full w-1 bg-[#00ff41] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
              </button>

              <button 
                onClick={() => handleSelection("PRODUCTIVIDAD")}
                className="w-full py-5 border border-white/20 bg-neutral-900/50 hover:bg-neutral-800 active:scale-95 transition-all text-center relative group rounded-sm"
              >
                <span className="font-bold text-lg tracking-widest">PRODUCTIVIDAD</span>
                <p className="text-xs text-neutral-400 mt-2 uppercase tracking-wide">Enfoque, tiempo, ejecución diaria</p>
                <div className="absolute left-0 top-0 h-full w-1 bg-[#00ff41] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
              </button>

              <button 
                onClick={() => handleSelection("SOCIAL")}
                className="w-full py-5 border border-white/20 bg-neutral-900/50 hover:bg-neutral-800 active:scale-95 transition-all text-center relative group rounded-sm"
              >
                <span className="font-bold text-lg tracking-widest">ATRACCIÓN SOCIAL</span>
                <p className="text-xs text-neutral-400 mt-2 uppercase tracking-wide">Presencia, confianza, relaciones</p>
                <div className="absolute left-0 top-0 h-full w-1 bg-[#00ff41] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-[#1c1c1e] flex flex-col items-center justify-center"
          >
            <div className="w-10 h-10 rounded-full border-[3px] border-[#3a3a3c] border-t-[#98989d] animate-spin mb-4"></div>
            <h1 className="text-[#98989d] font-sans font-medium text-lg">
              Sin conexión de red
            </h1>
            <p className="text-[#636366] font-sans text-sm mt-1">
              Reconectando...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
