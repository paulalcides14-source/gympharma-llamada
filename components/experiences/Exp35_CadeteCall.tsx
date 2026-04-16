"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, MicOff, Grid, Volume2, Plus, MonitorOff, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DeficitType } from "@/app/page";
import { playTone } from "@/lib/audio";

interface Props {
  onNext: () => void;
  deficitType: DeficitType;
}

export default function Exp35_CadeteCall({ onNext, deficitType }: Props) {
  const [callStatus, setCallStatus] = useState<"incoming" | "active" | "ended">("incoming");
  const [timer, setTimer] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudioSource = () => {
    switch (deficitType) {
      case "FÍSICO":
        return "/audios/variante fisico.mp3";
      case "PRODUCTIVIDAD":
        return "/audios/variantes productividad.mp3";
      case "SOCIAL":
        return "/audios/variante atraccion social.mp3";
      default:
        return "/audios/variantes productividad.mp3"; // Fallback
    }
  };

  // Simulated Ringtone / Buzz
  useEffect(() => {
    if (callStatus === "incoming") {
      const interval = setInterval(() => {
        if ("vibrate" in navigator) navigator.vibrate([500, 200, 500]);
        // Samsung style ring simulated with sine tones
        playTone(440, "sine", 0.5, 0.2); 
        setTimeout(() => playTone(554.37, "sine", 0.4, 0.2), 200); 
        setTimeout(() => playTone(659.25, "sine", 0.5, 0.2), 400); 
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [callStatus]);

  // Active call timer
  useEffect(() => {
    if (callStatus === "active") {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [callStatus]);

  const handleAudioEnd = () => {
    setCallStatus("ended");
    setTimeout(() => onNext(), 1500);
  };

  const handleAccept = () => {
    setCallStatus("active");
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed", e));
    }
  };

  const handleReject = () => {
    // Only allow skipping if incoming
    if (callStatus === "incoming") {
      setCallStatus("ended");
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setTimeout(() => onNext(), 1500);
    }
    // If active, do nothing to enforce listening to the full audio
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <AnimatePresence>
      <audio
        ref={audioRef}
        src={getAudioSource()}
        onEnded={handleAudioEnd}
        preload="auto"
      />
      {callStatus !== "ended" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full h-screen flex flex-col items-center justify-between py-20 px-8 bg-black overflow-hidden"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center brightness-75"
            style={{ backgroundImage: "url('/cadete_bg.jpg')" }}
          />

          {/* Top content: "Cadete Oliva" & Timer */}
          <div className="flex flex-col items-center mt-12 z-10 w-full relative">
            <h1 className="text-4xl font-bold tracking-wide text-white drop-shadow-md pb-2 uppercase">
              Cadete Oliva
            </h1>
            <p className="text-white text-2xl font-light tracking-widest drop-shadow-md">
               {callStatus === "incoming" ? "00:00" : formatTime(timer)}
            </p>
          </div>

          <div className="flex w-full justify-around max-w-sm mb-16 z-10 relative">
            {callStatus === "incoming" && (
              <>
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={handleReject}
                    className="w-[72px] h-[72px] rounded-full bg-red-500/90 flex items-center justify-center hover:bg-red-500 transition-colors shadow-lg shadow-red-500/30 backdrop-blur-sm"
                  >
                    <PhoneOff size={34} fill="currentColor" className="text-white" />
                  </button>
                  <span className="text-white text-sm font-medium drop-shadow-md">Rechazar</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-60"></div>
                    <button
                      onClick={handleAccept}
                      className="relative w-[72px] h-[72px] rounded-full bg-green-500/90 flex items-center justify-center hover:bg-green-500 transition-colors shadow-lg shadow-green-500/30 z-10 backdrop-blur-sm"
                    >
                      <Phone size={34} fill="currentColor" className="text-white animate-pulse" />
                    </button>
                  </div>
                  <span className="text-white text-sm font-medium drop-shadow-md">Aceptar</span>
                </div>
              </>
            )}

            {callStatus === "active" && (
              <div className="flex flex-col w-full px-6 mb-4">
                {/* Samsung-style Active Call Grid */}
                <div className="grid grid-cols-3 gap-y-8 gap-x-6 mb-12">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <MicOff size={28} className="text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">Silenciar</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <Grid size={28} className="text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">Teclado</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <Volume2 size={28} className="text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">Altavoz</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <Plus size={28} className="text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">Añadir</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <MonitorOff size={28} className="text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">Video</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <UserPlus size={28} className="text-white" />
                    </div>
                    <span className="text-white/80 text-xs font-medium">Contactos</span>
                  </div>
                </div>

                {/* Hang up button (does nothing to enforce listening) */}
                <div className="flex justify-center w-full">
                  <button
                    onClick={handleReject}
                    className="w-[72px] h-[72px] rounded-full bg-red-500/90 flex items-center justify-center hover:bg-red-500 transition-all active:scale-95 shadow-lg shadow-red-500/30 backdrop-blur-sm opacity-50 cursor-not-allowed"
                  >
                    <PhoneOff size={34} fill="currentColor" className="text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
