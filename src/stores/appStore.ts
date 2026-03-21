import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { AppState, Escola, Scores } from '../types';

const INITIAL_ESCOLA: Escola = {
  nome: '',
  rede: '',
  segmentos: [],
  cidade: '',
  estado: '',
  contato_nome: '',
  contato_cargo: '',
  contato_email: '',
  contato_telefone: '',
  parceira_geekie: null,
};

const INITIAL_SCORES: Scores = {
  pilares: { aprendizagem_ativa: 0, visibilidade: 0, flexibilidade: 0, personalizacao: 0 },
  eixos: { pedagogico: 0, tecnologico: 0 },
  total: 0,
  nivel: '',
};

const INITIAL_APP_STATE: AppState = {
  escola: INITIAL_ESCOLA,
  respostas: {},
  ancora: null,
  scores: INITIAL_SCORES,
  diagnostico: '',
};

interface AppStore extends AppState {
  progress: number;
  setEscola: (escola: Escola) => void;
  setRespostas: (respostas: Record<string, number>) => void;
  setAncora: (ancora: number | null) => void;
  setScores: (scores: Scores) => void;
  setDiagnostico: (diagnostico: string) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...INITIAL_APP_STATE,
      progress: 0,
      setEscola: (escola) => set({ escola }),
      setRespostas: (respostas) => set({ respostas }),
      setAncora: (ancora) => set({ ancora }),
      setScores: (scores) => set({ scores }),
      setDiagnostico: (diagnostico) => set({ diagnostico }),
      setProgress: (progress) => set({ progress }),
      reset: () => set({ ...INITIAL_APP_STATE, progress: 0 }),
    }),
    {
      name: 'mapa-inovacao-session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
