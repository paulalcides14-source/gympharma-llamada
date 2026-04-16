"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const MESSAGES = [
  { id: 1, text: "Ya viste suficiente.", delay: 1000 },
  { id: 2, text: "Esto no es contenido gratuito.", delay: 1500 },
  { id: 3, text: "Es un sistema.", delay: 2000 },
  { id: 4, text: "(...)", delay: 3500 },
  { id: 5, text: "Si entras... sigues.", delay: 1500 },
  { id: 6, text: "Si no... vuelves a lo mismo.", delay: 1500 },
  { id: 7, text: "Acceso aquí:", delay: 1000, isLink: true },
];

export default function Exp7_WhatsAppFinal({ onNext }: Props) {
  const [visibleMessages, setVisibleMessages] = useState<typeof MESSAGES>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const showNextMessage = () => {
      if (currentIndex < MESSAGES.length) {
        setIsTyping(true);
        const msg = MESSAGES[currentIndex];
        
        timeout = setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, msg]);
          
          currentIndex++;
          if (currentIndex < MESSAGES.length) {
            timeout = setTimeout(showNextMessage, 600);
          }
        }, msg.delay);
      }
    };

    showNextMessage();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  return (
    <div className="w-full h-screen bg-[#0b141a] flex flex-col text-[#e9edef]">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-[#202c33] shadow-sm z-10 sticky top-0">
        <div className="w-10 h-10 rounded-full bg-neutral-600 overflow-hidden mr-3">
          <div className="w-full h-full bg-[url('https://i.pravatar.cc/150')] bg-cover"></div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-base leading-tight">Operador</span>
          <span className="text-xs text-[#8696a0]">
            {isTyping ? "escribiendo..." : "en línea"}
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-contain"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex flex-col space-y-2 max-w-[85%]">
          {visibleMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2 text-[15px] shadow-sm w-fit max-w-full break-words"
            >
              <div>{msg.text}</div>
              {msg.isLink && (
                <button
                  onClick={onNext}
                  className="mt-2 text-[#53bdeb] underline font-medium active:bg-white/10 p-1 rounded transition-colors"
                >
                  [link_sistema_acceso]
                </button>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#202c33] rounded-lg rounded-tl-none px-4 py-3 text-[15px] shadow-sm w-fit flex space-x-1"
            >
              <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
