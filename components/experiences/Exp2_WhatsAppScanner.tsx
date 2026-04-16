"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { playTone } from "@/lib/audio";
import { MoreVertical, Phone, Video, Smile, Paperclip, Camera, Mic } from "lucide-react";

interface Props {
  onNext: () => void;
}

const INITIAL_MESSAGES = [
  { id: 1, text: "Ya entraste en el radar.", delay: 1500, sender: "bot" },
  { id: 2, text: "No respondas… solo sigue.", delay: 2500, sender: "bot" },
  { id: 3, text: "Estamos verificando tu perfil…", delay: 3000, sender: "bot" },
  { id: 4, text: "(…)", delay: 1500, sender: "bot" },
  { id: 5, text: "Detectando patrones…", delay: 2500, sender: "bot" },
  { id: 6, text: "Necesito saber una cosa antes de continuar.", delay: 2000, sender: "bot" },
  { id: 7, text: "¿Quieres saber qué es?", delay: 1500, sender: "bot", isInteraction: true },
];

export default function Exp2_WhatsAppScanner({ onNext }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showInteraction, setShowInteraction] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showInteraction]);

  useEffect(() => {
    if (currentIndex >= INITIAL_MESSAGES.length) return;

    const msg = INITIAL_MESSAGES[currentIndex];
    setIsTyping(true);

    const timeout = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, msg]);
      
      // Simulate incoming message audio pop
      playTone(800, "sine", 0.05, 0.1);
      setTimeout(() => playTone(1200, "sine", 0.1, 0.1), 50);

      if (msg.isInteraction) {
        setShowInteraction(true);
      } else {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 800);
      }
    }, msg.delay);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleChoice = (choice: "Sí" | "No") => {
    setShowInteraction(false);
    
    // Add user message
    const userMsg = { id: Date.now(), text: choice, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    
    // Simulate thinking before reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyText = choice === "Sí" ? "Sabía que lo harías." : "Igual te lo voy a decir.";
        setMessages((prev) => [...prev, { id: Date.now() + 1, text: replyText, sender: "bot" }]);
        playTone(800, "sine", 0.05, 0.1);
        setTimeout(() => playTone(1200, "sine", 0.1, 0.1), 50);

        // Next messages: Link first, then exact conclusion
        setTimeout(() => pushFinalMessages(), 1500);
      }, 2000);
    }, 500);
  };

  const pushFinalMessages = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 2, text: "Accede aquí:", isLink: true, sender: "bot" }]);
      playTone(800, "sine", 0.05, 0.1);
      setTimeout(() => playTone(1200, "sine", 0.1, 0.1), 50);

      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, { id: Date.now() + 3, text: "Vamos a identificar qué exactamente.", sender: "bot" }]);
          playTone(800, "sine", 0.05, 0.1);
          setTimeout(() => playTone(1200, "sine", 0.1, 0.1), 50);
        }, 1500);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="w-full h-screen bg-[#0b141a] flex flex-col text-[#e9edef] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33] shadow-md z-20 relative">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-neutral-600 overflow-hidden mr-3">
            <div className="w-full h-full bg-[url('https://i.pravatar.cc/150?u=a042581f4e29026704d')] bg-cover"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[17px] leading-tight">Operador</span>
            <span className="text-[13px] text-[#8696a0]">
              {isTyping ? "escribiendo..." : "en línea"}
            </span>
          </div>
        </div>
        <div className="flex space-x-6 text-[#aebac1]">
          <Video size={22} className="cursor-not-allowed opacity-80" />
          <Phone size={20} className="cursor-not-allowed opacity-80" />
          <MoreVertical size={22} className="cursor-not-allowed opacity-80" />
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-contain bg-center opacity-95 relative"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex flex-col space-y-3 relative z-10 pb-4">
          {messages.map((msg) => {
            if (msg.isInteraction && showInteraction) {
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-[#202c33] self-start rounded-lg rounded-tl-sm text-[#e9edef] shadow-sm max-w-[85%] w-fit overflow-hidden"
                >
                  <div className="px-3 py-2 text-[15px] border-b border-[#303f46]/50">
                    {msg.text}
                  </div>
                  <button
                    onClick={() => handleChoice("Sí")}
                    className="w-full py-3 text-[#53bdeb] font-semibold text-center border-b border-[#303f46]/50 transition-colors active:bg-[#303f46]"
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => handleChoice("No")}
                    className="w-full py-3 text-[#53bdeb] font-semibold text-center transition-colors active:bg-[#303f46]"
                  >
                    No
                  </button>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`px-3 py-2 text-[15px] shadow-sm max-w-[85%] break-words relative ${
                  msg.sender === "user" 
                    ? "bg-[#005c4b] self-end rounded-lg rounded-tr-sm text-white" 
                    : "bg-[#202c33] self-start rounded-lg rounded-tl-sm text-[#e9edef]"
                }`}
              >
                <div>{msg.text}</div>
                {msg.isLink && (
                  <button
                    onClick={onNext}
                    className="mt-3 text-[#53bdeb] font-semibold active:bg-white/10 px-4 py-2 bg-[#2a3942] rounded-md transition-colors w-full text-center border border-[#53bdeb]/30 hover:bg-[#53bdeb]/10"
                  >
                    [ ENLACE DE ACCIONES ]
                  </button>
                )}
              </motion.div>
            );
          })}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#202c33] self-start rounded-lg rounded-tl-sm px-4 py-3 text-[15px] shadow-sm w-fit flex space-x-1"
            >
              <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Fake Input Bottom Bar */}
      <div className="px-2 py-3 bg-[#202c33] flex items-center space-x-2 z-20 relative w-full shadow-[0_-1px_3px_rgba(0,0,0,0.2)]">
        <div className="flex-1 bg-[#2a3942] rounded-full min-h-[44px] px-3 flex items-center shadow-inner gap-3 relative">
          <Smile size={24} className="text-[#8696a0] shrink-0" />
          <span className="text-[#8696a0] text-[16px] flex-1 select-none">Mensaje</span>
          <Paperclip size={22} className="text-[#8696a0] shrink-0 mr-1" />
          <Camera size={22} className="text-[#8696a0] shrink-0" />
        </div>
        <div className="w-[44px] h-[44px] rounded-full bg-[#00a884] flex items-center justify-center shrink-0 shadow-md">
          <Mic size={22} className="text-white" />
        </div>
      </div>
    </div>
  );
}
