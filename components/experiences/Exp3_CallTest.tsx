"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DeficitType } from "@/app/page";

interface Props {
  onNext: () => void;
  deficitType: DeficitType;
  setTestAnswers: (val: any) => void;
}

const TEST1_DATA: Record<NonNullable<DeficitType>, { q: string; opts: string[] }[]> = {
  FÍSICO: [
    { q: "¿Cuántas veces por semana haces actividad física?", opts: ["Ninguna", "1–2", "3–4", "Todos los días"] },
    { q: "¿Cuál es tu mayor obstáculo?", opts: ["No tengo tiempo", "No sé por dónde empezar", "Empiezo y abandono", "Me falta energía"] },
    { q: "¿Cuánto tiempo llevas intentando cambiar esto?", opts: ["Menos de 3 meses", "6 meses", "+1 año", "Años"] },
  ],
  PRODUCTIVIDAD: [
    { q: "¿Cuántas horas productivas reales tienes al día?", opts: ["Menos de 1h", "1–2h", "3–4h", "+5h"] },
    { q: "¿Qué te paraliza más?", opts: ["Las distracciones", "No saber qué hacer primero", "El cansancio", "La motivación"] },
    { q: "¿Tienes una rutina fija?", opts: ["No tengo ninguna", "La tengo pero no la sigo", "Sí, pero no funciona", "Sí y funciona"] },
  ],
  SOCIAL: [
    { q: "¿Cómo describes tu impacto en los demás hoy?", opts: ["Paso desapercibido", "Me notan poco", "Genero algo de impacto", "Tengo presencia fuerte"] },
    { q: "¿Qué área te pesa más?", opts: ["Mi imagen física", "Mi forma de hablar", "Mi confianza", "Mis relaciones"] },
    { q: "¿Evitas situaciones sociales importantes?", opts: ["Frecuentemente", "A veces", "Casi nunca", "Nunca"] },
  ]
};

const TEST2_DATA = [
  { q: "¿Has intentado resolverlo antes con algún método?", opts: ["Nunca he intentado nada", "Sí, sin resultados", "Sí, con resultados parciales"] },
  { q: "¿Cuánto tiempo al día puedes invertir en esto?", opts: ["10–15 min", "30 min", "1 hora", "Lo que sea necesario"] }
];

export default function Exp3_CallTest({ onNext, deficitType, setTestAnswers }: Props) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Select dynamic questions on mount to avoid hydration mismatch
    const type = deficitType || "PRODUCTIVIDAD";
    const pool = [...TEST1_DATA[type]];
    
    // Pick 2 random from Test 1
    const selectedPhase1 = [];
    while (selectedPhase1.length < 2 && pool.length > 0) {
      const r = Math.floor(Math.random() * pool.length);
      selectedPhase1.push(pool.splice(r, 1)[0]);
    }
    
    setQuestions([...selectedPhase1, ...TEST2_DATA]);
    setIsReady(true);
  }, [deficitType]);

  const handleSelect = (question: string, answer: string) => {
    setTestAnswers((prev: any) => ({ ...prev, [question]: answer }));
    
    if (currentIdx === 1) {
      // Transition from Phase 1 to Phase 2
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentIdx(2);
      }, 2500);
    } else if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  if (!isReady || questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  return (
    <div className="min-h-screen w-full bg-black text-[#00ff41] font-mono p-6 flex flex-col justify-center items-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isProcessing ? (
           <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md text-center py-10"
           >
              <div className="text-[#00ff41] text-lg tracking-widest animate-pulse">
                [██████░░░░] 61% — PROCESANDO
              </div>
           </motion.div>
        ) : (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md bg-black/90 p-8 relative z-10 border-l-2 border-[#00ff41]/50 shadow-[0_0_30px_rgba(0,255,65,0.05)]"
          >
            <h3 className="text-lg mb-8 font-medium leading-relaxed text-white">
              {currentQ.q}
            </h3>

            <div className="flex flex-col gap-3">
              {currentQ.opts.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleSelect(currentQ.q, opt)}
                  className="w-full text-left px-5 py-4 bg-[#051408] border border-[#00ff41]/30 hover:bg-[#00ff41]/20 hover:border-[#00ff41] transition-all text-sm tracking-wide text-white/90 flex items-center justify-between group rounded-sm"
                >
                  <span>{opt}</span>
                  <span className="opacity-0 group-hover:opacity-100 text-[#00ff41] font-bold">»</span>
                </button>
              ))}
            </div>

            {/* Footer visual */}
            <div className="mt-8 text-[10px] opacity-40 text-right uppercase">
              SECURE RELAY // STEP 0{currentIdx + 1}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
