import type { AppState, IndexRecord, StoredRecord } from '../types';
import type { Escola } from '../types';

export interface DraftState {
  escola: Escola;
  respostas: Record<string, number>;
  ancora: number | null;
  savedAt: string; // ISO timestamp for expiry check
}

export interface IStorageRepository {
  save(state: AppState): string;
  getIndex(): IndexRecord[];
  getRecord(id: string): StoredRecord | null;
  saveDraft(state: Pick<AppState, 'escola' | 'respostas' | 'ancora'>): void;
  loadDraft(): DraftState | null;
  clearDraft(): void;
}
