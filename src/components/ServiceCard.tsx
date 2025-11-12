import { LucideIcon, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

export function ServiceCard({ icon: Icon, title, description, color, onClick }: ServiceCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow aspect-square flex flex-col"
    >
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-auto`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <div className="mt-3 text-left">
        <h3 className="text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-600 text-xs line-clamp-2">{description}</p>
      </div>
    </motion.button>
  );
}