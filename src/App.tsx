/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation.tsx';
import Dashboard from './components/Dashboard.tsx';
import Timer from './components/Timer.tsx';
import Challenges from './components/Challenges.tsx';
import Achievements from './components/Achievements.tsx';
import { INITIAL_CHALLENGES, INITIAL_ACHIEVEMENTS } from './constants.ts';
import { UserStats, Challenge, Achievement } from './types.ts';

const STORAGE_KEY_STATS = 'planeta-modo-off-stats';
const STORAGE_KEY_CHALLENGES = 'planeta-modo-off-challenges';
const STORAGE_KEY_ACHIEVEMENTS = 'planeta-modo-off-achievements';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATS);
    return saved ? JSON.parse(saved) : {
      totalPoints: 0,
      currentStreak: 1,
      totalOffMinutes: 0,
      completedChallenges: 0,
      lastActiveDate: new Date().toISOString(),
    };
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CHALLENGES);
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CHALLENGES, JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  // Check for new achievements whenever points change
  useEffect(() => {
    setAchievements(prev => prev.map(achievement => {
      if (!achievement.unlocked && stats.totalPoints >= achievement.requiredPoints) {
        return { ...achievement, unlocked: true };
      }
      return achievement;
    }));
  }, [stats.totalPoints]);

  const handleTimerComplete = (minutes: number) => {
    const earnedPoints = minutes * 2;
    setStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + earnedPoints,
      totalOffMinutes: prev.totalOffMinutes + minutes,
    }));
  };

  const handleChallengeComplete = (id: string, points: number) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, completed: true } : c));
    setStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      completedChallenges: prev.completedChallenges + 1,
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'timer':
        return <Timer onComplete={handleTimerComplete} />;
      case 'challenges':
        return <Challenges challenges={challenges} onComplete={handleChallengeComplete} />;
      case 'achievements':
        return <Achievements achievements={achievements} />;
      default:
        return <Dashboard stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-emerald-100">
      <div className="max-w-md mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

