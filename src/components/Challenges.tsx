import { Challenge } from '../types.ts';
import { Footprints, PenLine, MessageSquare, Cloud, BookOpen, Sprout, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ChallengesProps {
  challenges: Challenge[];
  onComplete: (id: string, points: number) => void;
}

const iconMap: Record<string, any> = {
  Footprints,
  PenLine,
  MessageSquare,
  Cloud,
  BookOpen,
  Sprout,
};

export default function Challenges({ challenges, onComplete }: ChallengesProps) {
  return (
    <div className="space-y-6 pb-24">
      <header className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-emerald-900">Desafíos Reales</h2>
        <p className="text-gray-500 text-sm">Pequeñas acciones, grandes cambios.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {challenges.map((challenge, idx) => {
          const Icon = iconMap[challenge.icon] || Zap;
          const isCompleted = challenge.completed;

          return (
            <motion.div
              key={challenge.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-5 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                isCompleted
                  ? 'bg-emerald-50 border-emerald-100 opacity-75'
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200'
              }`}
            >
              <div className="flex gap-4 items-start relative z-10">
                <div className={`p-3 rounded-2xl ${isCompleted ? 'bg-emerald-200 text-emerald-700' : 'bg-emerald-100 text-emerald-600'}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold ${isCompleted ? 'text-emerald-800 line-through' : 'text-gray-800'}`}>
                      {challenge.title}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${isCompleted ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-100 text-amber-700'}`}>
                      +{challenge.points} pts
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isCompleted ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {challenge.description}
                  </p>
                  {!isCompleted && (
                    <button
                      onClick={() => onComplete(challenge.id, challenge.points)}
                      className="mt-3 bg-emerald-600 text-white px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-emerald-500 transition-colors"
                    >
                      Completar Desafío
                    </button>
                  )}
                </div>
              </div>
              {isCompleted && (
                <div className="absolute right-4 bottom-4 text-emerald-500 opacity-20 rotate-12">
                  <CheckCircle2 size={64} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
