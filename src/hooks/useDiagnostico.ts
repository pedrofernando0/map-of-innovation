import { useCallback } from 'react';

import { generateFallback } from '../adapters/LocalDiagnosticAdapter';
import type { IDiagnosticService } from '../ports/IDiagnosticService';
import type { Escola, Scores } from '../types';

const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_DIAGNOSTIC_TIMEOUT_MS) || 30_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timer = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('diagnostic_timeout')), ms)
  );
  return Promise.race([promise, timer]);
}

/**
 * Wraps IDiagnosticService.generate() with a configurable timeout.
 * Falls back to generateFallback (contextualized by real scores) on timeout or error.
 */
export function useDiagnostico(service: IDiagnosticService) {
  const generate = useCallback(
    async (escola: Escola, scores: Scores, ancora: number | null): Promise<string> => {
      try {
        return await withTimeout(service.generate(escola, scores, ancora), DEFAULT_TIMEOUT_MS);
      } catch {
        return generateFallback(escola, scores);
      }
    },
    [service]
  );

  return { generate };
}
