import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';

import type { IDiagnosticService } from '../ports/IDiagnosticService';
import type { Escola, Scores } from '../types';

import { useDiagnostico } from './useDiagnostico';

// ─── helpers ────────────────────────────────────────────────────────────────

const escola: Escola = {
  nome: 'Escola X',
  rede: 'privada',
  segmentos: [],
  cidade: '',
  estado: '',
  contato_nome: '',
  contato_cargo: '',
  contato_email: '',
  contato_telefone: '',
  parceira_geekie: null,
};

const scores: Scores = {
  pilares: { aprendizagem_ativa: 50, visibilidade: 50, flexibilidade: 50, personalizacao: 50 },
  eixos: { pedagogico: 50, tecnologico: 50 },
  total: 50,
  nivel: 'EXPLORADOR',
};

// ─── testes ──────────────────────────────────────────────────────────────────

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useDiagnostico', () => {
  it('retorna o resultado do serviço quando bem-sucedido', async () => {
    const service: IDiagnosticService = {
      generate: vi.fn().mockResolvedValue('Diagnóstico gerado'),
    };

    const { result } = renderHook(() => useDiagnostico(service));

    const promise = result.current.generate(escola, scores, null);
    vi.runAllTimersAsync();
    const text = await promise;

    expect(text).toBe('Diagnóstico gerado');
    expect(service.generate).toHaveBeenCalledWith(escola, scores, null);
  });

  it('retorna fallback EXPLORADOR quando o serviço falha', async () => {
    const service: IDiagnosticService = {
      generate: vi.fn().mockRejectedValue(new Error('falha')),
    };

    const { result } = renderHook(() => useDiagnostico(service));

    const text = await result.current.generate(escola, scores, null);

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('retorna fallback ESSENCIAL quando nivel é inválido e serviço falha', async () => {
    const service: IDiagnosticService = {
      generate: vi.fn().mockRejectedValue(new Error('falha')),
    };

    const invalidScores = { ...scores, nivel: '' as Scores['nivel'] };
    const { result } = renderHook(() => useDiagnostico(service));

    const text = await result.current.generate(escola, invalidScores, null);

    expect(typeof text).toBe('string');
    expect(text).toContain('início de uma jornada');
  });

  it('retorna fallback quando o serviço excede o timeout', async () => {
    const service: IDiagnosticService = {
      // Nunca resolve
      generate: vi.fn().mockImplementation(() => new Promise(() => {})),
    };

    const { result } = renderHook(() => useDiagnostico(service));

    const promise = result.current.generate(escola, scores, null);

    // Avança além do timeout padrão
    vi.advanceTimersByTime(35_000);

    const text = await promise;

    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });
});
