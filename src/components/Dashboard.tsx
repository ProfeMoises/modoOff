import { UserStats } from '../types.ts';
import { Flame, Trophy, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  stats: UserStats;
}

export default function Dashboard({ stats }: DashboardProps) {
  const statCards = [
    { label: 'Puntos', value: stats.totalPoints, icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Racha', value: `${stats.currentStreak} días`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Tiempo Off', value: `${stats.totalOffMinutes} min`, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Desafíos', value: stats.completedChallenges, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-6 pb-24">
      <header className="flex flex-col items-center text-center space-y-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden"
        >
          <img
            src="https://picsum.photos/seed/nature/200"
            alt="Avatar"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <h1 className="text-2xl font-bold text-emerald-900">¡Hola, Explorador!</h1>
        <p className="text-emerald-600 text-sm font-medium">Nivel 1: Semilla de Presencia</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`${card.bg} p-4 rounded-2xl border border-white shadow-sm flex flex-col items-center text-center space-y-1`}
            >
              <Icon className={card.color} size={24} />
              <span className="text-2xl font-bold text-gray-800">{card.value}</span>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{card.label}</span>
            </motion.div>
          );
        })}
      </div>

      <section className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50 space-y-4">
        <h2 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
          <Zap size={20} className="text-amber-500" />
          Tu Progreso Diario
        </h2>
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            className="bg-emerald-500 h-full rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600">
          Estás al <span className="font-bold text-emerald-600">65%</span> de tu meta diaria de desconexión.
        </p>
      </section>

      <section className="bg-emerald-900 text-white p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h2 className="text-lg font-bold">¿Listo para desconectarte?</h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Activa el Modo Off ahora y gana 10 puntos por cada 15 minutos de presencia real.
          </p>
          <button className="bg-emerald-400 text-emerald-900 px-6 py-2 rounded-full font-bold text-sm mt-2 hover:bg-emerald-300 transition-colors">
            Empezar Ahora
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20">
          <Clock size={120} />
        </div>
      </section>
    </div>
  );
}
