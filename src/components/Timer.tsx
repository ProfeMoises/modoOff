import { useState, useEffect, useRef } from 'react';
import { Play, Square, Timer as TimerIcon, Award, ZapOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMER_OPTIONS } from '../constants';

interface TimerProps {
  onComplete: (minutes: number) => void;
}

export default function Timer({ onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedTime, setSelectedTime] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setTimeLeft(selectedTime * 60);
    setIsActive(true);
    setIsFinished(false);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(0);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      onComplete(selectedTime);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, selectedTime, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isActive ? (1 - timeLeft / (selectedTime * 60)) * 100 : 0;

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <header className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-emerald-900">Modo Off</h2>
        <p className="text-gray-500 text-sm">Comprométete a estar presente.</p>
      </header>

      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-emerald-100 fill-none"
            strokeWidth="8"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            className="stroke-emerald-500 fill-none"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 - timeLeft / (selectedTime * 60) : 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </svg>

        <div className="text-center z-10">
          {isActive ? (
            <motion.span
              key="timer-display"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-mono font-bold text-emerald-900"
            >
              {formatTime(timeLeft)}
            </motion.span>
          ) : (
            <div className="flex flex-col items-center space-y-1">
              <ZapOff size={48} className="text-emerald-200 mb-2" />
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Listo para</span>
              <span className="text-xl font-bold text-emerald-900">Desconectar</span>
            </div>
          )}
        </div>
      </div>

      {!isActive && !isFinished && (
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          {TIMER_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedTime(option.value)}
              className={`py-3 rounded-2xl font-bold transition-all duration-300 ${
                selectedTime === option.value
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white text-emerald-600 border border-emerald-100 hover:bg-emerald-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        {!isActive ? (
          <button
            onClick={startTimer}
            className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-emerald-500 transition-colors"
          >
            <Play size={20} fill="currentColor" />
            Activar Modo Off
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="bg-red-50 text-red-600 border border-red-100 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-100 transition-colors"
          >
            <Square size={20} fill="currentColor" />
            Cancelar Sesión
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-amber-50 border border-amber-100 p-6 rounded-3xl text-center space-y-3 shadow-sm"
          >
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
              <Award className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-amber-900">¡Sesión Completada!</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              Has ganado <span className="font-bold">+{selectedTime * 2} puntos</span> por tu tiempo de presencia real.
            </p>
            <button
              onClick={() => setIsFinished(false)}
              className="bg-amber-400 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-amber-500 transition-colors"
            >
              ¡Genial!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-gray-400 text-center max-w-[250px] leading-relaxed">
        Al activar el Modo Off, comprométete a no usar tu dispositivo. La presencia real es el mejor regalo.
      </p>
    </div>
  );
}
