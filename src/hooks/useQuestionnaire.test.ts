import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useQuestionnaire } from './useQuestionnaire';

describe('useQuestionnaire', () => {
  it('começa no bloco 0', () => {
    const { result } = renderHook(() => useQuestionnaire({}, vi.fn(), vi.fn()));
    expect(result.current.blocoAtual).toBe(0);
    expect(result.current.bloco.titulo).toBe('Aprendizagem Ativa');
  });

  it('não avança bloco se há respostas pendentes', () => {
    const { result } = renderHook(() => useQuestionnaire({}, vi.fn(), vi.fn()));
    act(() => result.current.handleNext());
    expect(result.current.blocoAtual).toBe(0);
  });

  it('avança para o próximo bloco quando todas as respostas do bloco estão preenchidas', () => {
    const respostas = { '1.1': 3, '1.2': 3, '1.3': 3, '1.4': 3, '1.5': 3 };
    const { result } = renderHook(() => useQuestionnaire(respostas, vi.fn(), vi.fn()));
    act(() => result.current.handleNext());
    expect(result.current.blocoAtual).toBe(1);
    expect(result.current.bloco.titulo).toBe('Visibilidade');
  });

  it('retorna ao bloco anterior com handleBack', () => {
    const respostas = { '1.1': 3, '1.2': 3, '1.3': 3, '1.4': 3, '1.5': 3 };
    const { result } = renderHook(() => useQuestionnaire(respostas, vi.fn(), vi.fn()));
    act(() => result.current.handleNext());
    expect(result.current.blocoAtual).toBe(1);
    act(() => result.current.handleBack());
    expect(result.current.blocoAtual).toBe(0);
  });

  it('chama onBack quando handleBack é chamado no bloco 0', () => {
    const onBack = vi.fn();
    const { result } = renderHook(() => useQuestionnaire({}, vi.fn(), onBack));
    act(() => result.current.handleBack());
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('chama onFinish quando avança no último bloco', () => {
    const onFinish = vi.fn();
    // Fill all 20 questions
    const respostas = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`1.${i + 1}`, 3]));
    const { result } = renderHook(() => useQuestionnaire(respostas, onFinish, vi.fn()));
    // Advance through all 4 blocks
    act(() => result.current.handleNext()); // bloco 0 → 1
    act(() => result.current.handleNext()); // bloco 1 → 2
    act(() => result.current.handleNext()); // bloco 2 → 3
    act(() => result.current.handleNext()); // bloco 3 → onFinish
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('informa corretamente o número de pendentes', () => {
    const respostas = { '1.1': 2, '1.2': 2 }; // 2 of 5 answered in bloco 0
    const { result } = renderHook(() => useQuestionnaire(respostas, vi.fn(), vi.fn()));
    expect(result.current.pendentes).toBe(3);
    expect(result.current.todasRespondidas).toBe(false);
  });
});
