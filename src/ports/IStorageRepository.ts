import type { AppState, IndexRecord, StoredRecord } from '../types';

export interface IStorageRepository {
  save(state: AppState): string;
  getIndex(): IndexRecord[];
  getRecord(id: string): StoredRecord | null;
}
