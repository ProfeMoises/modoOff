export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  category: 'nature' | 'social' | 'creative' | 'health';
  completed?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredPoints: number;
  unlocked: boolean;
}

export interface UserStats {
  totalPoints: number;
  currentStreak: number;
  totalOffMinutes: number;
  completedChallenges: number;
  lastActiveDate: string | null;
}
