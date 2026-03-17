export interface Escola {
  nome: string;
  rede: string;
  segmentos: string[];
  cidade: string;
  estado: string;
  contato_nome: string;
  contato_email: string;
  contato_telefone: string;
}

export interface Scores {
  pilares: {
    aprendizagem_ativa: number;
    visibilidade: number;
    flexibilidade: number;
    personalizacao: number;
  };
  eixos: {
    pedagogico: number;
    tecnologico: number;
  };
  total: number;
  nivel: 'ESSENCIAL' | 'INTEGRADA' | 'EXPLORADOR' | '';
}

export interface AppState {
  escola: Escola;
  respostas: Record<string, number>;
  ancora: number | null;
  scores: Scores;
  diagnostico: string;
}

export interface StoredRecord extends AppState {
  id: string;
  timestamp: string;
}

export interface IndexRecord {
  id: string;
  nome: string;
  nivel: string;
  ts: string;
}
