import type { Escola, Scores } from '../types';

export interface IDiagnosticService {
  generate(escola: Escola, scores: Scores, ancora: number | null): Promise<string>;
}
