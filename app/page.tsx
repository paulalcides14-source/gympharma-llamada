"use client";

import { useState } from "react";
import Exp1_IncomingCall from "@/components/experiences/Exp1_IncomingCall";
import Exp2_WhatsAppScanner from "@/components/experiences/Exp2_WhatsAppScanner";
import Exp25_HackerClassification from "@/components/experiences/Exp25_HackerClassification";
import Exp3_CallTest from "@/components/experiences/Exp3_CallTest";
import Exp35_CadeteCall from "@/components/experiences/Exp35_CadeteCall";
import Exp4_HackerAccess from "@/components/experiences/Exp4_HackerAccess";
import Exp8_SalesPage from "@/components/experiences/Exp8_SalesPage";

export type DeficitType = "FÍSICO" | "PRODUCTIVIDAD" | "SOCIAL" | null;

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [deficitType, setDeficitType] = useState<DeficitType>(null);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});

  const nextStep = () => setCurrentStep((prev) => prev + 1);

  return (
    <main className="min-h-screen w-full bg-black text-white font-sans overflow-hidden">
      {currentStep === 1 && <Exp1_IncomingCall onNext={nextStep} />}
      {currentStep === 2 && <Exp2_WhatsAppScanner onNext={nextStep} />}
      {currentStep === 3 && (
        <Exp25_HackerClassification onNext={nextStep} setDeficitType={setDeficitType} />
      )}
      {currentStep === 4 && <Exp3_CallTest onNext={nextStep} deficitType={deficitType} setTestAnswers={setTestAnswers} />}
      {currentStep === 5 && <Exp35_CadeteCall onNext={nextStep} deficitType={deficitType} />}
      {currentStep === 6 && <Exp4_HackerAccess onNext={nextStep} deficitType={deficitType} testAnswers={testAnswers} />}
      {currentStep === 7 && <Exp8_SalesPage deficitType={deficitType} testAnswers={testAnswers} />}
    </main>
  );
}
