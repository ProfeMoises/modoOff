import { Achievement } from '../types';
import { Award, Compass, Crown, ZapOff, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AchievementsProps {
  achievements: Achievement[];
}

const iconMap: Record<string, any> = {
  Award,
  Compass,
  Crown,
  ZapOff,
};

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="space-y-6 pb-24">
      <header className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-emerald-900">Tus Logros</h2>
        <p className="text-gray-500 text-sm">Celebra cada paso hacia la presencia.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement, idx) => {
          const Icon = iconMap[achievement.icon] || Award;
          const isUnlocked = achievement.unlocked;

          return (
            <motion.div
              key={achievement.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center space-y-3 ${
                isUnlocked
                  ? 'bg-amber-50 border-amber-100 shadow-sm'
                  : 'bg-gray-50 border-gray-100 opacity-75 grayscale'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                isUnlocked ? 'bg-amber-400 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {isUnlocked ? <Icon size={32} /> : <Lock size={32} />}
              </div>
              <div className="space-y-1">
                <h3 className={`font-bold text-sm ${isUnlocked ? 'text-amber-900' : 'text-gray-500'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-[10px] leading-tight ${isUnlocked ? 'text-amber-700' : 'text-gray-400'}`}>
                  {achievement.description}
                </p>
              </div>
              {isUnlocked && (
                <div className="absolute top-2 right-2 text-amber-500">
                  <CheckCircle2 size={16} />
                </div>
              )}
              {!isUnlocked && (
                <div className="w-full bg-gray-200 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-gray-400 h-full w-1/3" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
