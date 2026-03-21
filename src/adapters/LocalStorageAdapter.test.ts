import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import type { AppState } from '../types';

import { LocalStorageAdapter } from './LocalStorageAdapter';

// ─── helpers ────────────────────────────────────────────────────────────────

function makeState(overrides: Partial<AppState> = {}): AppState {
  return {
    escola: {
      nome: 'Escola Teste',
      rede: 'privada',
      segmentos: ['EF1'],
      cidade: 'São Paulo',
      estado: 'SP',
      contato_nome: 'Joana',
      contato_cargo: 'Diretora',
      contato_email: 'joana@escola.com',
      contato_telefone: '11999999999',
      parceira_geekie: false,
    },
    respostas: { '1.1': 3, '1.2': 2 },
    ancora: 2,
    scores: {
      pilares: { aprendizagem_ativa: 50, visibilidade: 40, flexibilidade: 30, personalizacao: 60 },
      eixos: { pedagogico: 45, tecnologico: 55 },
      total: 47,
      nivel: 'EXPLORADOR',
    },
    diagnostico: 'Diagnóstico de teste.',
    ...overrides,
  };
}

// ─── mocks ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    _store: {} as Record<string, string>,
    getItem(key: string) {
      return this._store[key] ?? null;
    },
    setItem(key: string, value: string) {
      this._store[key] = value;
    },
    removeItem(key: string) {
      delete this._store[key];
    },
    clear() {
      this._store = {};
    },
  });
});

afterEach(() => {
  vi.useRealTimers();
});

// ─── save ────────────────────────────────────────────────────────────────────

describe('LocalStorageAdapter.save()', () => {
  it('retorna um UUID válido', () => {
    const adapter = new LocalStorageAdapter();
    const id = adapter.save(makeState());
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('persiste o record com id e timestamp', () => {
    const adapter = new LocalStorageAdapter();
    const state = makeState();
    const id = adapter.save(state);

    const raw = localStorage.getItem(`escola:${id}`);
    expect(raw).not.toBeNull();

    const parsed = JSON.parse(raw!);
    expect(parsed.id).toBe(id);
    expect(parsed.timestamp).toBeDefined();
    expect(parsed.escola.nome).toBe('Escola Teste');
  });

  it('adiciona entrada ao índice após salvar', () => {
    const adapter = new LocalStorageAdapter();
    const id = adapter.save(makeState());

    const raw = localStorage.getItem('escolas:index');
    const index = JSON.parse(raw!);
    expect(index).toHaveLength(1);
    expect(index[0].id).toBe(id);
    expect(index[0].nivel).toBe('EXPLORADOR');
  });

  it('acumula múltiplas escolas no índice', () => {
    const adapter = new LocalStorageAdapter();
    adapter.save(makeState());
    adapter.save(makeState({ escola: { ...makeState().escola, nome: 'Escola B' } }));

    const index = JSON.parse(localStorage.getItem('escolas:index')!);
    expect(index).toHaveLength(2);
  });

  it('não lança quando localStorage.setItem falha', () => {
    localStorage.setItem = () => {
      throw new DOMException('QuotaExceeded');
    };
    const adapter = new LocalStorageAdapter();
    expect(() => adapter.save(makeState())).not.toThrow();
  });
});

// ─── getIndex ────────────────────────────────────────────────────────────────

describe('LocalStorageAdapter.getIndex()', () => {
  it('retorna array vazio quando storage está limpo', () => {
    const adapter = new LocalStorageAdapter();
    expect(adapter.getIndex()).toEqual([]);
  });

  it('retorna o índice populado após salvar', () => {
    const adapter = new LocalStorageAdapter();
    adapter.save(makeState());
    adapter.save(makeState());

    const index = adapter.getIndex();
    expect(index).toHaveLength(2);
    expect(index[0]).toHaveProperty('id');
    expect(index[0]).toHaveProperty('nome');
    expect(index[0]).toHaveProperty('nivel');
    expect(index[0]).toHaveProperty('ts');
  });

  it('retorna array vazio quando índice está corrompido', () => {
    localStorage.setItem('escolas:index', 'não é json{{{');
    const adapter = new LocalStorageAdapter();
    expect(adapter.getIndex()).toEqual([]);
  });
});

// ─── getRecord ───────────────────────────────────────────────────────────────

describe('LocalStorageAdapter.getRecord()', () => {
  it('retorna null para id inexistente', () => {
    const adapter = new LocalStorageAdapter();
    expect(adapter.getRecord('id-que-nao-existe')).toBeNull();
  });

  it('retorna o record correto para id existente', () => {
    const adapter = new LocalStorageAdapter();
    const state = makeState();
    const id = adapter.save(state);

    const record = adapter.getRecord(id);
    expect(record).not.toBeNull();
    expect(record!.id).toBe(id);
    expect(record!.escola.nome).toBe('Escola Teste');
  });

  it('retorna null quando registro está corrompido', () => {
    localStorage.setItem('escola:bad-id', 'json corrompido{{');
    const adapter = new LocalStorageAdapter();
    expect(adapter.getRecord('bad-id')).toBeNull();
  });
});

// ─── draft ────────────────────────────────────────────────────────────────────

describe('LocalStorageAdapter.saveDraft() / loadDraft() / clearDraft()', () => {
  it('loadDraft retorna null quando não há rascunho', () => {
    const adapter = new LocalStorageAdapter();
    expect(adapter.loadDraft()).toBeNull();
  });

  it('salva e carrega rascunho corretamente', () => {
    const adapter = new LocalStorageAdapter();
    const state = makeState();
    adapter.saveDraft({ escola: state.escola, respostas: state.respostas, ancora: state.ancora });

    const draft = adapter.loadDraft();
    expect(draft).not.toBeNull();
    expect(draft!.escola.nome).toBe('Escola Teste');
    expect(draft!.respostas).toEqual(state.respostas);
    expect(draft!.ancora).toBe(2);
    expect(draft!.savedAt).toBeDefined();
  });

  it('clearDraft remove o rascunho', () => {
    const adapter = new LocalStorageAdapter();
    const state = makeState();
    adapter.saveDraft({ escola: state.escola, respostas: state.respostas, ancora: state.ancora });
    adapter.clearDraft();
    expect(adapter.loadDraft()).toBeNull();
  });

  it('loadDraft retorna null quando rascunho está expirado (> 4h)', () => {
    vi.useFakeTimers();
    const adapter = new LocalStorageAdapter();
    const state = makeState();
    adapter.saveDraft({ escola: state.escola, respostas: state.respostas, ancora: state.ancora });
    // Advance time by more than 4 hours
    vi.advanceTimersByTime(4 * 60 * 60 * 1000 + 1);
    expect(adapter.loadDraft()).toBeNull();
  });

  it('loadDraft retorna rascunho quando dentro de 4h', () => {
    vi.useFakeTimers();
    const adapter = new LocalStorageAdapter();
    const state = makeState();
    adapter.saveDraft({ escola: state.escola, respostas: state.respostas, ancora: state.ancora });
    // Advance only 3 hours
    vi.advanceTimersByTime(3 * 60 * 60 * 1000);
    expect(adapter.loadDraft()).not.toBeNull();
  });

  it('loadDraft retorna null quando dados estão corrompidos', () => {
    localStorage.setItem('mapa-inovacao:draft', 'json corrompido{{');
    const adapter = new LocalStorageAdapter();
    expect(adapter.loadDraft()).toBeNull();
  });

  it('saveDraft não lança quando localStorage.setItem falha', () => {
    localStorage.setItem = () => {
      throw new DOMException('QuotaExceeded');
    };
    const adapter = new LocalStorageAdapter();
    const state = makeState();
    expect(() =>
      adapter.saveDraft({ escola: state.escola, respostas: state.respostas, ancora: state.ancora })
    ).not.toThrow();
  });
});
