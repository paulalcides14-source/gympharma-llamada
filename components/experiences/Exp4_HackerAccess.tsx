"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DeficitType } from "@/app/page";

interface Props {
  onNext: () => void;
  deficitType: DeficitType;
  testAnswers: Record<string, string>;
}

const UNIT_MAP: Record<NonNullable<DeficitType>, string> = {
  FÍSICO: "FÍSICO",
  PRODUCTIVIDAD: "OPERATIVO",
  SOCIAL: "PRESENCIA",
};

const Q_COMMITMENT = "¿Has intentado resolverlo antes con algún método?";
const Q_TIME = "¿Cuánto tiempo al día puedes invertir en esto?";

function calcClearanceLevel(testAnswers: Record<string, string>): number {
  let score = 0;
  const commitment = testAnswers[Q_COMMITMENT];
  if (commitment === "Nunca he intentado nada") score += 1;
  else score += 2;
  const time = testAnswers[Q_TIME];
  if (time === "10–15 min" || time === "30 min") score += 1;
  else score += 2;
  return score;
}

function getCommitmentLabel(testAnswers: Record<string, string>): string {
  const commitment = testAnswers[Q_COMMITMENT];
  if (commitment === "Nunca he intentado nada") return "ESTÁNDAR";
  if (commitment === "Sí, sin resultados") return "MODERADO";
  return "ELEVADO";
}

// ── Barra de carga que se llena bloque a bloque ──
function AnimatedBar({ targetBlocks, totalBlocks = 10 }: { targetBlocks: number; totalBlocks?: number }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setFilled(current);
      if (current >= targetBlocks) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [targetBlocks]);

  const percent = Math.round((filled / totalBlocks) * 100);
  const bar = "█".repeat(filled) + "░".repeat(totalBlocks - filled);

  return (
    <motion.div
      className="text-white text-base font-bold tracking-wider"
      animate={filled >= targetBlocks ? { opacity: [1, 0.3, 1, 0.5, 1] } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      [{bar}] {percent}%
    </motion.div>
  );
}

// ── Línea que aparece con efecto typing ──
function TypedLine({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(value.slice(0, i));
      if (i >= value.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [visible, value]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="text-[#00ff41]"
    >
      {label}{" "}
      <span className="text-white font-bold">
        {typed}
        {typed.length < value.length && (
          <span className="animate-pulse">▌</span>
        )}
      </span>
    </motion.div>
  );
}

export default function Exp4_HackerAccess({ onNext, deficitType, testAnswers }: Props) {
  const [phase, setPhase] = useState(0);

  const unit = UNIT_MAP[deficitType ?? "FÍSICO"] ?? "FÍSICO";
  const level = calcClearanceLevel(testAnswers);
  const commitmentLabel = getCommitmentLabel(testAnswers);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 4500);   // 0 → 4.5s
    const t2 = setTimeout(() => setPhase(2), 10000);  // 4.5 → 10s
    const t3 = setTimeout(() => setPhase(3), 16000);  // 10 → 16s
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black text-[#00ff41] font-mono flex flex-col justify-center items-center overflow-hidden p-6 relative">

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff41 2px, #00ff41 4px)" }}
      />

      <div className="w-full max-w-sm flex flex-col text-sm tracking-widest relative z-10">
        <AnimatePresence mode="wait">

          {/* ── FASE 0: Activación ── */}
          {phase === 0 && (
            <motion.div
              key="phase0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border border-[#00ff41]/40 p-5 space-y-3"
            >
              <div className="text-white font-bold text-xs uppercase tracking-widest border-b border-[#00ff41]/30 pb-3">
                ▓ SISTEMA DE EVALUACIÓN TÁCTICA ACTIVADO
              </div>
              <div className="text-xs space-y-2">
                <div className="text-[#00ff41]">
                  UNIDAD: <span className="text-white font-bold">{unit}</span>
                </div>
                <div className="text-[#00ff41] animate-pulse">
                  RECLUTA EN EVALUACIÓN...
                </div>
              </div>
            </motion.div>
          )}

          {/* ── FASE 1: 80% — Análisis ── */}
          {phase === 1 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <div className="text-white text-xs uppercase tracking-widest">
                EVALUACIÓN DE PERFIL EN CURSO
              </div>
              <AnimatedBar targetBlocks={8} />
              <div className="space-y-3 text-xs text-[#00ff41]">
                <div>
                  ▸ Diagnóstico:{" "}
                  <span className="text-white font-bold">PROCESADO</span>
                </div>
                <div>
                  ▸ Nivel de compromiso:{" "}
                  <span className="text-white font-bold">{commitmentLabel}</span>
                </div>
                <div className="animate-pulse">
                  ▸ Capacidad operativa:{" "}
                  <span className="text-white">ANALIZANDO...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── FASE 2: 100% — Resultado con tipeo animado ── */}
          {phase === 2 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {/* Barra llena con glitch al completarse */}
              <AnimatedBar targetBlocks={10} />

              {/* Caja de resultados que aparece tras terminar la barra */}
              <motion.div
                className="border border-white/30"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.35 }}
              >
                <div className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/20 px-4 py-3">
                  ▓ RESULTADO DE EVALUACIÓN
                </div>
                <div className="px-4 py-4 space-y-3 text-xs">
                  {/* Las líneas aparecen escalonadas con efecto de escritura */}
                  <TypedLine label="CANDIDATO:" value="APTO PARA ENTRENAMIENTO" delay={1700} />
                  <TypedLine label="CLEARANCE:" value={`NIVEL ${level}`} delay={3100} />
                  <TypedLine label="MISIÓN ASIGNADA:" value="PAQUETES GYMPHARMA" delay={4300} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── FASE 3: Clearance concedido + Botón ── */}
          {phase === 3 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="w-full border-t border-b border-[#00ff41]/40 py-4 space-y-2 text-xs">
                <div>▓ CLEARANCE CONCEDIDO</div>
                <div>
                  ▓ UNIDAD:{" "}
                  <span className="text-white font-bold">{unit}</span>
                </div>
                <div>
                  ▓ ESTADO:{" "}
                  <span className="text-white font-bold">LISTO PARA DESPLIEGUE</span>
                </div>
              </div>

              <motion.button
                onClick={onNext}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full py-4 border border-[#00ff41] bg-[#00ff41]/5 hover:bg-[#00ff41]/15 text-white font-bold tracking-widest uppercase text-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(0,255,65,0.1)]"
              >
                [ INICIAR BRIEFING DE MISIÓN ]
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
