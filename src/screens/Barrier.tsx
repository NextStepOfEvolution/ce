import { useState } from "react";
import {
  ArrowLeft,
  DoorOpen,
  QrCode,
  Video,
  UserPlus,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface BarrierProps {
  onBack: () => void;
}

export function Barrier({ onBack }: BarrierProps) {
  const [showCall, setShowCall] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [guestQR, setGuestQR] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-12">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="text-slate-900 mb-1">Шлагбаум</h1>
        <p className="text-slate-600">Управление паркингом</p>
      </div>

      <div className="p-8 space-y-4">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1559669797-7c99e15e2b0d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
          alt="Map"
          className="w-full h-full object-cover opacity-70"
        />
        <Button
          onClick={() => setShowCall(false)}
          className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl flex items-center justify-center gap-2"
        >
          <DoorOpen className="w-5 h-5" />
          Открыть шлагбаум
        </Button>
      </div>
    </div>
  );
}