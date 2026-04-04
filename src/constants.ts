import { Challenge, Achievement } from './types';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'walk-1',
    title: 'Caminata Consciente',
    description: 'Sal a caminar 15 minutos sin mirar el celular.',
    points: 50,
    icon: 'Footprints',
    category: 'health',
  },
  {
    id: 'write-1',
    title: 'Escritura Analógica',
    description: 'Escribe una página en un cuaderno o papel.',
    points: 30,
    icon: 'PenLine',
    category: 'creative',
  },
  {
    id: 'talk-1',
    title: 'Charla Real',
    description: 'Ten una conversación de 10 minutos cara a cara.',
    points: 40,
    icon: 'MessageSquare',
    category: 'social',
  },
  {
    id: 'nature-1',
    title: 'Observador de Nubes',
    description: 'Mira el cielo durante 5 minutos y relájate.',
    points: 20,
    icon: 'Cloud',
    category: 'nature',
  },
  {
    id: 'read-1',
    title: 'Lectura de Papel',
    description: 'Lee 10 páginas de un libro físico.',
    points: 45,
    icon: 'BookOpen',
    category: 'creative',
  },
  {
    id: 'plant-1',
    title: 'Cuidado Verde',
    description: 'Riega tus plantas o cuida un espacio verde.',
    points: 25,
    icon: 'Sprout',
    category: 'nature',
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'novice',
    title: 'Iniciador Off',
    description: 'Consigue tus primeros 100 puntos.',
    icon: 'Award',
    requiredPoints: 100,
    unlocked: false,
  },
  {
    id: 'explorer',
    title: 'Explorador Real',
    description: 'Consigue 500 puntos reconectando.',
    icon: 'Compass',
    requiredPoints: 500,
    unlocked: false,
  },
  {
    id: 'master',
    title: 'Maestro de la Presencia',
    description: 'Alcanza los 1000 puntos.',
    icon: 'Crown',
    requiredPoints: 1000,
    unlocked: false,
  },
  {
    id: 'zen',
    title: 'Zen Digital',
    description: 'Desconéctate por un total de 10 horas.',
    icon: 'ZapOff',
    requiredPoints: 2000,
    unlocked: false,
  },
];

export const TIMER_OPTIONS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '1 hora', value: 60 },
  { label: '2 horas', value: 120 },
];
