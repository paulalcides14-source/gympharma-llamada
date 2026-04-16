"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { DeficitType } from "@/app/page";

interface Props {
  deficitType: DeficitType;
  testAnswers?: Record<string, string>;
}

interface Product {
  tag: string;
  name: string;
  desc: string;
  review?: string;
  img: string;
  imgHD: string;
  href: string;
}

// ── Paleta de acento por segmento ─────────────────────────────────────────────
const ACCENT: Record<NonNullable<DeficitType>, string> = {
  FÍSICO:        "#00c8ff",
  PRODUCTIVIDAD: "#00c8ff",
  SOCIAL:        "#00c8ff",
};

// ── Datos de productos (imágenes en alta resolución) ─────────────────────────
const PRODUCTS: Record<NonNullable<DeficitType>, Product[]> = {
  FÍSICO: [
    {
      tag: "Suplementación",
      name: "Proteína Whey Premium",
      desc: "5000 mg de proteínas por dosis. Sin gluten, NO-GMO. El pilar #1 de cualquier transformación física.",
      review: '"20-30 min antes del desayuno. Llegó rápido, muy recomendable."',
      img: "https://ae01.alicdn.com/kf/S096eeb4c408d4586b7aa82caac546becs.jpg_640x640.jpg",
      imgHD: "https://ae01.alicdn.com/kf/S096eeb4c408d4586b7aa82caac546becs.jpg",
      href: "https://s.click.aliexpress.com/e/_c3SzE14V",
    },
    {
      tag: "Suplementación",
      name: "Quemador Termogénico Nocturno",
      desc: "Quemador de grasa + supresor del apetito + soporte para el sueño. Ataca directamente el déficit de peso.",
      review: '"2 semanas tomando y ya no tengo migraña. Duermo como un bebé."',
      img: "https://ae01.alicdn.com/kf/Sb980f896203d42cd9a80a08f5498fdc16.jpg_640x640.jpg",
      imgHD: "https://ae01.alicdn.com/kf/Sb980f896203d42cd9a80a08f5498fdc16.jpg",
      href: "https://s.click.aliexpress.com/e/_c3Qr1x45",
    },
    {
      tag: "Rendimiento",
      name: "Creatina Monohidratada",
      desc: "3000 mg por servicio. Mejora fuerza y rendimiento en gym. Esencial si entrenas 3-4 veces por semana.",
      img: "https://ae01.alicdn.com/kf/S8f115b35a52d415ba84104d4d837062e7.jpg_640x640.jpg",
      imgHD: "https://ae01.alicdn.com/kf/S8f115b35a52d415ba84104d4d837062e7.jpg",
      href: "https://s.click.aliexpress.com/e/_c3VUT4fX",
    },
  ],
  PRODUCTIVIDAD: [
    {
      tag: "Energía & Enfoque",
      name: "Complejo de Vitaminas B",
      desc: "B12, B2, B3, B6, ácido fólico y biotina. Energía natural contra el cansancio mental, sin depender de cafeína.",
      review: '"Barato y de buena calidad. Lo usaré de nuevo."',
      img: "https://ae01.alicdn.com/kf/S69ce50975540414ca5c794b9fddba20fw.jpg_640x640.jpg",
      imgHD: "https://ae01.alicdn.com/kf/S69ce50975540414ca5c794b9fddba20fw.jpg",
      href: "https://s.click.aliexpress.com/e/_c3OScxx7",
    },
    {
      tag: "Cognitivo",
      name: "Omega-3 EPA/DHA Premium",
      desc: "Mejora la función cerebral y la claridad mental. Ejecuta sin distracciones y toma mejores decisiones más rápido.",
      img: "https://ae01.alicdn.com/kf/Sb14aeb5a93924996af9cde0090bf7a87b.jpg_640x640.jpg",
      imgHD: "https://ae01.alicdn.com/kf/Sb14aeb5a93924996af9cde0090bf7a87b.jpg",
      href: "https://s.click.aliexpress.com/e/_c3wQUk2H",
    },
    {
      tag: "Recuperación",
      name: "Magnesio Glicinato",
      desc: "El perfil OPERATIVO suele dormir mal. El magnesio mejora el sueño profundo para rendir al 100% al día siguiente.",
      img: "https://ae01.alicdn.com/kf/S05b52839d0004158a77837bc05b42122v.jpg_640x640.jpg",
      imgHD: "https://ae01.alicdn.com/kf/S05b52839d0004158a77837bc05b42122v.jpg",
      href: "https://s.click.aliexpress.com/e/_c3rlT6yZ",
    },
  ],
  SOCIAL: [
    {
      tag: "Estética & Piel",
      name: "Colágeno Hidrolizado + Vitamina C",
      desc: "Mejora piel, cabello y uñas. El upgrade visible que notan los demás.",
      review: '"Lo recibí con éxito, esperando el éxito 💋"',
      img: "https://ae01.alicdn.com/kf/S6a96756777784efc96f31289b44c8e4dt.jpg_640x640.jpg",
      imgHD: "https://ae01.alicdn.com/kf/S6a96756777784efc96f31289b44c8e4dt.jpg",
      href: "https://s.click.aliexpress.com/e/_c39PbHKD",
    },
    {
      tag: "Vitalidad & Carisma",
      name: "Zinc + Booster Natural de Testosterona",
      desc: "Parches transdérmicos de zinc. Confianza y energía para proyectarte bien ante los demás.",
      review: '"Han mejorado mi nivel de energía general."',
      img: "https://ae01.alicdn.com/kf/Sf3954714d62c4fc4803d0e8c684bf208Q.png_640x640.png",
      imgHD: "https://ae01.alicdn.com/kf/Sf3954714d62c4fc4803d0e8c684bf208Q.png",
      href: "https://s.click.aliexpress.com/e/_c4k4H3ul",
    },
    {
      tag: "Estrés & Seguridad",
      name: "Ashwagandha (Adaptógeno)",
      desc: "1200 mg. Reduce el cortisol y la ansiedad social. Ideal para quien evita situaciones sociales por inseguridad o nervios.",
      review: '"Me siento más tranquila de lo habitual. Duermo bien."',
      img: "https://ae01.alicdn.com/kf/S19dd408b8ecc4e5cbfe74beeb09d35e3c.jpg_640x640.jpg",
      imgHD: "https://ae01.alicdn.com/kf/S19dd408b8ecc4e5cbfe74beeb09d35e3c.jpg",
      href: "https://s.click.aliexpress.com/e/_c3cqmezT",
    },
  ],
};

const TITLES: Record<NonNullable<DeficitType>, { prefix: string; accent: string }> = {
  FÍSICO:        { prefix: "PROTOCOLO DE RECONSTRUCCIÓN ", accent: "FÍSICA ACTIVADO." },
  PRODUCTIVIDAD: { prefix: "SISTEMA DE OPTIMIZACIÓN ", accent: "OPERATIVA LISTO." },
  SOCIAL:        { prefix: "MÓDULO DE PRESENCIA Y ", accent: "ATRACCIÓN SOCIAL CONCEDIDO." },
};

const SUBTITLES: Record<NonNullable<DeficitType>, string> = {
  FÍSICO:        "Las herramientas que tu perfil FÍSICO necesita para operar al máximo.",
  PRODUCTIVIDAD: "Las herramientas que tu perfil OPERATIVO necesita para ejecutar sin fricción.",
  SOCIAL:        "Las herramientas que tu perfil PRESENCIA necesita para proyectarse con poder.",
};

const BRIEFING_LINES = [
  "ACCEDIENDO A PROTOCOLO DE SUMINISTROS...",
  "VERIFICANDO CLEARANCE...",
  "CARGANDO KIT DE MISIÓN...",
  "HERRAMIENTAS SEGMENTADAS LISTAS.",
];

const REASONS: Record<NonNullable<DeficitType>, string[]> = {
  FÍSICO: [
    "Proteína + Creatina = la base científica de cualquier transformación física real.",
    "El termogénico nocturno ataca la grasa mientras duermes — sin esfuerzo extra.",
    "Stack diseñado para resultados visibles en 30 días si entrenas 3-4x/semana.",
  ],
  PRODUCTIVIDAD: [
    "Vitaminas B + Omega-3 = energía mental sostenida sin crashes de cafeína.",
    "El magnesio repara tu sueño — y el sueño es el multiplicador #1 de productividad.",
    "Stack diseñado para operadores que necesitan claridad mental 12+ horas al día.",
  ],
  SOCIAL: [
    "Colágeno + Zinc = el upgrade visible que los demás notan antes de que hables.",
    "Ashwagandha elimina la ansiedad social — proyectas confianza sin forzar.",
    "Stack diseñado para construir presencia magnética en 30 días.",
  ],
};

const CTA_URGENCY: Record<NonNullable<DeficitType>, string> = {
  FÍSICO: "Cada día sin este stack es un día más lejos de tu mejor versión física.",
  PRODUCTIVIDAD: "Cada hora sin optimizar tu cerebro es output que pierdes para siempre.",
  SOCIAL: "Cada interacción sin presencia es una oportunidad que no vuelve.",
};

// ── Decoración de esquinas tipo HUD ──────────────────────────────────────────
function HudCorners({ color = "#00c8ff", size = 12 }: { color?: string; size?: number }) {
  const s = size;
  const positions = [
    { top: 0, left: 0, borderTop: true, borderLeft: true },
    { top: 0, right: 0, borderTop: true, borderRight: true },
    { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
    { bottom: 0, right: 0, borderBottom: true, borderRight: true },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: pos.top,
            left: pos.left,
            right: (pos as { right?: number }).right,
            bottom: pos.bottom,
            width: s,
            height: s,
            borderTop: pos.borderTop ? `2px solid ${color}` : undefined,
            borderLeft: pos.borderLeft ? `2px solid ${color}` : undefined,
            borderBottom: pos.borderBottom ? `2px solid ${color}` : undefined,
            borderRight: (pos as { borderRight?: boolean }).borderRight ? `2px solid ${color}` : undefined,
          }}
        />
      ))}
    </>
  );
}

// ── Línea de Briefing con typing ─────────────────────────────────────────────
function BriefingLine({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const isLast = text === "HERRAMIENTAS SEGMENTADAS LISTAS.";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [visible, text]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="text-xs font-mono tracking-widest"
      style={{ color: isLast ? "#00c8ff" : "rgba(0,200,255,0.6)" }}
    >
      <span style={{ color: "rgba(0,200,255,0.35)", marginRight: 8 }}>▸</span>
      {typed}
      {typed.length < text.length && <span className="animate-pulse">▌</span>}
    </motion.div>
  );
}

// ── Modal de Análisis Visual ──────────────────────────────────────────────────
function AnalysisModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [scanDone, setScanDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setScanDone(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,5,20,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #050d1a, #0a1428)",
          border: "1px solid rgba(0,200,255,0.4)",
          boxShadow: "0 0 40px rgba(0,200,255,0.15), inset 0 0 40px rgba(0,200,255,0.03)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <HudCorners color="#00c8ff" size={14} />

        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid rgba(0,200,255,0.2)" }}
        >
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "rgba(0,200,255,0.7)" }}>
            ▓ ANÁLISIS VISUAL — HERRAMIENTA
          </span>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Imagen con escaneo */}
        <div className="relative overflow-hidden" style={{ background: "#040b18" }}>
          <img src={product.imgHD} alt={product.name} className="w-full object-contain max-h-80" />

          {!scanDone && (
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.1, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 pointer-events-none"
              style={{
                position: "absolute",
                background: "#00c8ff",
                boxShadow: "0 0 16px 4px rgba(0,200,255,0.6)",
              }}
            />
          )}

          <HudCorners color="#00c8ff" size={12} />

          <AnimatePresence>
            {scanDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 px-4 py-3 font-mono text-[10px] md:text-xs tracking-widest flex justify-between"
                style={{ background: "rgba(0,5,20,0.75)", color: "rgba(0,200,255,0.6)" }}
              >
                <span>ANÁLISIS COMPLETO</span>
                <span>PROVEEDOR: ALIEXPRESS</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contenido Modal */}
        <div className="p-6 space-y-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(0,200,255,0.6)" }}>
              {product.tag}
            </p>
            <h4 className="font-bold text-white text-lg md:text-xl">{product.name}</h4>
          </div>
          <p className="text-sm md:text-base text-neutral-300 leading-relaxed">{product.desc}</p>
          {product.review && (
            <p className="text-xs text-neutral-400 italic pl-3" style={{ borderLeft: "2px solid rgba(0,200,255,0.4)" }}>
              💬 {product.review}
            </p>
          )}
          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-center gap-3 w-full py-4 mt-5 font-bold font-mono text-[13px] md:text-[14px] uppercase tracking-widest text-center transition-all duration-300 active:scale-95"
            style={{
              color: "#fff",
              background: "linear-gradient(90deg, rgba(0,150,255,0.25), rgba(0,200,255,0.35))",
              border: "1px solid rgba(0,200,255,0.8)",
              boxShadow: "0 0 20px rgba(0,200,255,0.25), inset 0 0 20px rgba(0,200,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(90deg, rgba(0,180,255,0.4), rgba(0,220,255,0.5))";
              e.currentTarget.style.boxShadow = "0 0 35px rgba(0,200,255,0.5), inset 0 0 30px rgba(0,200,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(90deg, rgba(0,150,255,0.25), rgba(0,200,255,0.35))";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,200,255,0.25), inset 0 0 20px rgba(0,200,255,0.05)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:"#00c8ff"}}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            OBTENER AHORA EL SUMINISTRO
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Tarjeta de Producto ───────────────────────────────────────────────────────
function ProductCard({ index, product, onZoom }: { index: number; product: Product; onZoom: (p: Product) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden h-full snap-center shrink-0 w-[85vw] md:w-auto"
      style={{
        background: "linear-gradient(160deg, #060f1e, #0a1628)",
        border: `1px solid ${hovered ? "rgba(0,200,255,0.6)" : "rgba(0,200,255,0.2)"}`,
        boxShadow: hovered
          ? "0 0 30px rgba(0,200,255,0.15), inset 0 0 20px rgba(0,200,255,0.04)"
          : "0 0 10px rgba(0,200,255,0.05)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <HudCorners color={hovered ? "#00c8ff" : "rgba(0,200,255,0.5)"} size={10} />

      {/* Cabecera */}
      <div
        className="flex items-center justify-between px-4 py-3 gap-2"
        style={{ borderBottom: "1px solid rgba(0,200,255,0.15)" }}
      >
        <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase" style={{ color: "rgba(0,200,255,0.6)" }}>
          [ HTA CLAVE : 0{index + 1} ]
        </span>
        <span
          className="font-mono text-[10px] md:text-xs tracking-widest uppercase px-2 py-1 whitespace-nowrap"
          style={{ color: "rgba(255,140,0,0.9)", border: "1px solid rgba(255,140,0,0.4)", background: "rgba(255,140,0,0.05)" }}
        >
          SUMINISTRO / AE
        </span>
      </div>

      {/* Imagen */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onZoom(product)}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-52 object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        {/* Gradiente inferior */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(6,15,30,0.8) 0%, transparent 60%)" }}
        />
        {/* Botón analizar */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div
            className="flex items-center gap-2 font-mono text-[11px] md:text-xs tracking-widest uppercase px-4 py-2"
            style={{
              background: "rgba(6,15,30,0.9)",
              border: "1px solid rgba(0,200,255,0.7)",
              color: "#00c8ff",
              boxShadow: "0 0 15px rgba(0,200,255,0.2)",
            }}
          >
            <ZoomIn size={14} />
            ANALIZAR VISUALMENTE
          </div>
        </div>
      </div>

      {/* Contenido Mejorado (Más grande y legible) */}
      <div className="flex-1 p-4 space-y-3 flex flex-col">
        <div>
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(0,200,255,0.6)" }}>
            {product.tag}
          </span>
          <h4 className="font-bold text-white text-base leading-tight mt-1">{product.name}</h4>
        </div>
        
        <p className="text-sm text-neutral-300 leading-relaxed flex-1">
          {product.desc}
        </p>
        
        {product.review && (
          <p
            className="text-xs text-neutral-400 italic pl-3 py-1"
            style={{ borderLeft: "2px solid rgba(0,200,255,0.4)" }}
          >
            💬 {product.review}
          </p>
        )}
        
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn flex items-center justify-center gap-3 w-full py-4 mt-4 font-bold font-mono text-[12px] md:text-[13px] uppercase tracking-widest text-center transition-all duration-300 active:scale-95"
          style={{
            color: "#fff",
            background: "linear-gradient(90deg, rgba(0,150,255,0.25), rgba(0,200,255,0.35))",
            border: "1px solid rgba(0,200,255,0.8)",
            boxShadow: "0 0 20px rgba(0,200,255,0.25), inset 0 0 20px rgba(0,200,255,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(90deg, rgba(0,180,255,0.4), rgba(0,220,255,0.5))";
            e.currentTarget.style.boxShadow = "0 0 35px rgba(0,200,255,0.5), inset 0 0 30px rgba(0,200,255,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(90deg, rgba(0,150,255,0.25), rgba(0,200,255,0.35))";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,200,255,0.25), inset 0 0 20px rgba(0,200,255,0.05)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:"#00c8ff"}}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          COMPRAR EN ALIEXPRESS
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

// ── Componente Principal ──────────────────────────────────────────────────────
export default function Exp8_SalesPage({ deficitType }: Props) {
  const [phase, setPhase] = useState<"loading" | "revealed">("loading");
  const [zoomedProduct, setZoomedProduct] = useState<Product | null>(null);

  const type = deficitType ?? "FÍSICO";
  const products = PRODUCTS[type];
  const titleParts = TITLES[type];
  const subtitle = SUBTITLES[type];
  const accent = ACCENT[type];
  const reasons = REASONS[type];
  const ctaUrgency = CTA_URGENCY[type];

  useEffect(() => {
    const t = setTimeout(() => setPhase("revealed"), 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full min-h-screen text-white flex flex-col"
      style={{
        background: "linear-gradient(160deg, #04080f 0%, #060d1c 40%, #030810 100%)",
      }}
    >
      {/* Textura de fondo sutil - grid hexagonal */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Modal */}
      <AnimatePresence>
        {zoomedProduct && (
          <AnalysisModal product={zoomedProduct} onClose={() => setZoomedProduct(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* ── FASE 0: Briefing ── */}
        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen p-8"
          >
            <div
              className="relative w-full max-w-xs p-6 space-y-4 font-mono"
              style={{
                background: "linear-gradient(145deg, #050d1a, #0a1428)",
                border: "1px solid rgba(0,200,255,0.35)",
                boxShadow: "0 0 40px rgba(0,200,255,0.1)",
              }}
            >
              <HudCorners color={accent} size={12} />
              <div
                className="text-white font-bold text-xs uppercase tracking-widest pb-4 mb-2"
                style={{ borderBottom: "1px solid rgba(0,200,255,0.2)" }}
              >
                ▓ PROTOCOLO GYMPHARMA — FASE 2
              </div>
              {BRIEFING_LINES.map((line, i) => (
                <BriefingLine key={i} text={line} delay={i * 750} />
              ))}
              <motion.div
                className="h-px mt-4"
                style={{ background: "rgba(0,200,255,0.4)", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.8, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}

        {/* ── FASE 1: Contenido Revelado ── */}
        {phase === "revealed" && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-4xl mx-auto px-5 py-16 w-full space-y-20 flex flex-col items-center"
          >

            {/* Hero */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-5 w-full"
            >
              {/* Badge con corchetes */}
              <div className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase" style={{ color: accent }}>
                <span className="opacity-60">[</span>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                PERFIL DETECTADO:{" "}
                <span className="font-black">{type}</span>
                <span className="opacity-60">]</span>
              </div>

              {/* Título grande */}
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                {titleParts.prefix}
                <br />
                <span style={{ color: accent }}>{titleParts.accent}</span>
              </h1>

              <p className="text-neutral-400 text-lg max-w-xl mx-auto">{subtitle}</p>
            </motion.section>

            {/* Kit de Herramientas */}
            <section className="space-y-8 w-full">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] md:text-xs tracking-widest uppercase whitespace-nowrap" style={{ color: accent }}>
                  KIT DE MISIÓN ASIGNADO
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(0,200,255,0.25)" }} />
                <span className="font-mono text-[10px] md:text-[11px] text-neutral-500 tracking-widest uppercase whitespace-nowrap hidden md:inline-block">
                  Desliza o haz clic para analizar
                </span>
                <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase whitespace-nowrap md:hidden">
                  ← Desliza →
                </span>
              </div>

              {/* Swipe Horizontal — siempre activo */}
              <div
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onWheel={(e) => {
                  const el = e.currentTarget;
                  const atStart = el.scrollLeft <= 0;
                  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
                  // Only hijack scroll if there's horizontal room to scroll
                  if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
                    e.preventDefault();
                    el.scrollLeft += e.deltaY * 1.5;
                  }
                }}
              >
                {products.map((p, i) => (
                  <div key={p.name} className="snap-center shrink-0 w-[85vw] md:w-[360px]">
                    <ProductCard index={i} product={p} onZoom={setZoomedProduct} />
                  </div>
                ))}
              </div>
            </section>

            {/* ── Sección: Por qué estas herramientas ── */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full"
            >
              <div
                className="relative w-full p-6 md:p-8 space-y-6"
                style={{
                  background: "linear-gradient(145deg, #050d1a, #0a1428)",
                  border: "1px solid rgba(0,200,255,0.25)",
                  boxShadow: "0 0 30px rgba(0,200,255,0.08)",
                }}
              >
                <HudCorners color={accent} size={12} />

                <div
                  className="flex items-center gap-3 pb-4"
                  style={{ borderBottom: "1px solid rgba(0,200,255,0.15)" }}
                >
                  <ShieldCheck size={18} style={{ color: accent }} />
                  <span
                    className="font-mono text-xs tracking-widest uppercase"
                    style={{ color: accent }}
                  >
                    ¿POR QUÉ ESTE KIT?
                  </span>
                </div>

                <div className="space-y-4">
                  {reasons.map((reason, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: accent }}
                      />
                      <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                        {reason}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* ── Sección: CTA Final ── */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full text-center space-y-6 pb-28"
            >
              <div className="w-16 h-px mx-auto" style={{ background: accent }} />

              <p
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: "rgba(0,200,255,0.5)" }}
              >
                TRANSMISIÓN FINAL
              </p>

              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                TU KIT ESTÁ LISTO.
                <br />
                <span style={{ color: accent }}>LA DECISIÓN ES TUYA.</span>
              </h2>

              <p className="text-neutral-400 text-sm md:text-base max-w-md mx-auto">
                {ctaUrgency}
              </p>

              <div className="flex flex-col items-center gap-4 pt-4">
                <a
                  href={products[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-10 py-5 font-bold font-mono text-sm md:text-base uppercase tracking-widest transition-all duration-300 active:scale-95"
                  style={{
                    color: "#fff",
                    background:
                      "linear-gradient(90deg, rgba(0,150,255,0.3), rgba(0,200,255,0.45))",
                    border: "1px solid rgba(0,200,255,0.9)",
                    boxShadow:
                      "0 0 30px rgba(0,200,255,0.35), inset 0 0 20px rgba(0,200,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(90deg, rgba(0,180,255,0.45), rgba(0,220,255,0.6))";
                    e.currentTarget.style.boxShadow =
                      "0 0 50px rgba(0,200,255,0.55), inset 0 0 30px rgba(0,200,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(90deg, rgba(0,150,255,0.3), rgba(0,200,255,0.45))";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(0,200,255,0.35), inset 0 0 20px rgba(0,200,255,0.08)";
                  }}
                >
                  COMENZAR AHORA
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00c8ff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <span className="font-mono text-[10px] text-neutral-600 tracking-widest uppercase">
                  Envío global — AliExpress verificado
                </span>
              </div>
            </motion.section>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky CTA Bar ── */}
      <AnimatePresence>
        {phase === "revealed" && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 md:py-4 flex items-center justify-center gap-4"
            style={{
              background:
                "linear-gradient(to top, rgba(4,8,15,0.98), rgba(4,8,15,0.88))",
              borderTop: "1px solid rgba(0,200,255,0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              className="hidden md:inline font-mono text-[10px] tracking-widest uppercase"
              style={{ color: "rgba(0,200,255,0.5)" }}
            >
              KIT LISTO ▸
            </span>
            <a
              href={products[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 font-bold font-mono text-xs md:text-sm uppercase tracking-widest transition-all duration-300 active:scale-95"
              style={{
                color: "#fff",
                background:
                  "linear-gradient(90deg, rgba(0,150,255,0.3), rgba(0,200,255,0.45))",
                border: "1px solid rgba(0,200,255,0.8)",
                boxShadow: "0 0 25px rgba(0,200,255,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, rgba(0,180,255,0.45), rgba(0,220,255,0.6))";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(0,200,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, rgba(0,150,255,0.3), rgba(0,200,255,0.45))";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(0,200,255,0.3)";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00c8ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              OBTENER KIT COMPLETO
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00c8ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
