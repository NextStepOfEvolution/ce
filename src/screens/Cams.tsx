import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Camera,
  MapPin,
  Loader2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Play } from "lucide-react";
interface CamsProps {
  onBack: () => void;
}
const video = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1568715684971-9ac138754ab9?q=80&w=1730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1561579776-1dd5b07b751e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1563122089-71f56e4e8d06?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1581262177000-8139a463e531?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
export function Cams({ onBack }: CamsProps) {
  const [view, setView] = useState<"list" | "details">("list");
  const [selectedCamId, setSelectedCamId] = useState<
    number | null
  >(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-12">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="text-slate-900 mb-1">Камеры</h1>
        {view == "list" && (
          <div className="grid grid-cols-2 gap-4">
            {video.map((item) => (
              <div
                className="relative rounded-md overflow-hidden"
                key={item.id}
                onClick={() => {
                  setView("details");
                  setSelectedCamId(item.id);
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center
 justify-center pointer "
                >
                  <Play
                    size="50"
                    color="white"
                    className="pointer"
                    absoluteStrokeWidth="true"
                    fill="white"
                  />
                </div>
                <ImageWithFallback
                  src={item.url}
                  alt="video"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {view == "details" && selectedCamId && (
          <div>
            <ImageWithFallback
              src={
                video.find((i) => i.id == selectedCamId)?.url
              }
              alt="video"
              className="w-full h-full object-cover"
            />

            <Button
              className="mt-4"
              onClick={() => {
                setView("list");
                setSelectedCamId(null);
              }}
            >
              Назад
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}