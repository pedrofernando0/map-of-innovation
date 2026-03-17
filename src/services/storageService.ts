import { AppState, IndexRecord } from '../types';

export function saveResponse(appState: AppState): string {
  const id = crypto.randomUUID();
  const record = { id, timestamp: new Date().toISOString(), ...appState };

  try {
    localStorage.setItem(`escola:${id}`, JSON.stringify(record));
    
    let index: IndexRecord[] = [];
    try {
      const idx = localStorage.getItem('escolas:index');
      if (idx) {
        index = JSON.parse(idx);
      }
    } catch(e) {}
    
    index.push({ 
      id, 
      nome: appState.escola.nome, 
      nivel: appState.scores.nivel, 
      ts: record.timestamp 
    });
    
    localStorage.setItem('escolas:index', JSON.stringify(index));
  } catch(e) {
    console.warn('Storage indisponível, continuando sem salvar:', e);
  }
  return id;
}

export function getIndex(): IndexRecord[] {
  try {
    const idx = localStorage.getItem('escolas:index');
    if (idx) {
      return JSON.parse(idx);
    }
  } catch(e) {}
  return [];
}

export function getRecord(id: string): any {
  try {
    const record = localStorage.getItem(`escola:${id}`);
    if (record) {
      return JSON.parse(record);
    }
  } catch(e) {}
  return null;
}
