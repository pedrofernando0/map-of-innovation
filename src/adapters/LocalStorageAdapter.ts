import type { AppState, IndexRecord, StoredRecord } from '../types';
import type { IStorageRepository } from '../ports/IStorageRepository';

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
}
