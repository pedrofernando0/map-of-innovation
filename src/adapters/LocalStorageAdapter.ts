import type { AppState, IndexRecord, StoredRecord } from '../types';
import type { IStorageRepository, DraftState } from '../ports/IStorageRepository';

const DRAFT_KEY = 'mapa-inovacao:draft';
const DRAFT_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hours

export class LocalStorageAdapter implements IStorageRepository {
  save(state: AppState): string {
    const id = crypto.randomUUID();
    const record: StoredRecord = { id, timestamp: new Date().toISOString(), ...state };

    try {
      localStorage.setItem(`escola:${id}`, JSON.stringify(record));

      let index: IndexRecord[] = [];
      try {
        const idx = localStorage.getItem('escolas:index');
        if (idx) index = JSON.parse(idx);
      } catch {
        // índice corrompido — começa com array vazio
      }

      index.push({ id, nome: state.escola.nome, nivel: state.scores.nivel, ts: record.timestamp });
      localStorage.setItem('escolas:index', JSON.stringify(index));
    } catch (e) {
      console.warn('Storage indisponível, continuando sem salvar:', e);
    }

    return id;
  }

  getIndex(): IndexRecord[] {
    try {
      const idx = localStorage.getItem('escolas:index');
      if (idx) return JSON.parse(idx);
    } catch {
      // storage corrompido — retorna array vazio
    }
    return [];
  }

  getRecord(id: string): StoredRecord | null {
    try {
      const record = localStorage.getItem(`escola:${id}`);
      if (record) return JSON.parse(record);
    } catch {
      // registro corrompido — retorna null
    }
    return null;
  }

  saveDraft(state: Pick<AppState, 'escola' | 'respostas' | 'ancora'>): void {
    try {
      const draft: DraftState = {
        escola: state.escola,
        respostas: state.respostas,
        ancora: state.ancora,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn('Não foi possível salvar rascunho:', e);
    }
  }

  loadDraft(): DraftState | null {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      const draft: DraftState = JSON.parse(raw);
      const age = Date.now() - new Date(draft.savedAt).getTime();
      if (age > DRAFT_EXPIRY_MS) {
        localStorage.removeItem(DRAFT_KEY);
        return null;
      }
      return draft;
    } catch {
      return null;
    }
  }

  clearDraft(): void {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // silently ignore
    }
  }
}
