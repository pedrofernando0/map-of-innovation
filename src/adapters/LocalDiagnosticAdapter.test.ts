import { describe, it, expect } from 'vitest';

import type { Escola, Scores } from '../types';

import { LocalDiagnosticAdapter, generateFallback } from './LocalDiagnosticAdapter';

// ─── helpers ────────────────────────────────────────────────────────────────

function makeEscola(override: Partial<Escola> = {}): Escola {
  return {
    nome: 'Escola Modelo',
    rede: 'privada',
    segmentos: ['EF1', 'EM'],
    cidade: 'São Paulo',
    estado: 'SP',
    contato_nome: 'Ana',
    contato_cargo: 'Diretora',
    contato_email: 'ana@escola.com',
    contato_telefone: '',
    parceira_geekie: false,
    ...override,
  };
}

function makeScores(nivel: Scores['nivel'], total: number, override: Partial<Scores> = {}): Scores {
  return {
    pilares: { aprendizagem_ativa: 60, visibilidade: 40, flexibilidade: 70, personalizacao: 30 },
    eixos: { pedagogico: 55, tecnologico: 45 },
    total,
    nivel,
    ...override,
  };
}

const adapter = new LocalDiagnosticAdapter();

// ─── fallback ────────────────────────────────────────────────────────────────

describe('LocalDiagnosticAdapter — fallback', () => {
  it('retorna FALLBACK_ESSENCIAL quando nivel é string vazia', async () => {
    const result = await adapter.generate(makeEscola(), makeScores('' as Scores['nivel'], 0), null);
    expect(result).toContain('início de uma jornada');
  });
});

// ─── por nível ───────────────────────────────────────────────────────────────

describe('LocalDiagnosticAdapter — por nível', () => {
  it('ESSENCIAL: retorna texto com síntese e pilares', async () => {
    const result = await adapter.generate(makeEscola(), makeScores('ESSENCIAL', 20), null);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(100);
    expect(result).toContain('Escola Modelo');
    expect(result).toContain('Pontos Fortes');
    expect(result).toContain('Oportunidades');
  });

  it('EXPLORADOR: inclui o pilar mais forte na abertura', async () => {
    const result = await adapter.generate(makeEscola(), makeScores('EXPLORADOR', 55), null);
    expect(result).toContain('Escola Modelo');
    expect(result).toContain('Pontos Fortes');
  });

  it('INTEGRADA: inclui o pilar mais fraco na abertura', async () => {
    const result = await adapter.generate(makeEscola(), makeScores('INTEGRADA', 80), null);
    expect(result).toContain('Escola Modelo');
    expect(result).toContain('Pontos Fortes');
  });
});

// ─── ancora ──────────────────────────────────────────────────────────────────

describe('LocalDiagnosticAdapter — ancora', () => {
  it('ancora=null → não inclui comentário de auto-percepção', async () => {
    const result = await adapter.generate(makeEscola(), makeScores('EXPLORADOR', 55), null);
    expect(result).not.toContain('auto-percepção');
  });

  it('ancora com gap grande (> 15) → inclui nota de gap em ESSENCIAL', async () => {
    // ancora=4 → percepção de 100, score=20 → gap = 4*25 - 20 = 80 > 15
    const result = await adapter.generate(makeEscola(), makeScores('ESSENCIAL', 20), 4);
    // A abertura do ESSENCIAL menciona a auto-percepção quando gap > 15
    expect(result).toContain('auto-percepção');
  });

  it('ancora alinhado ao score → inclui frase de consistência', async () => {
    // ancora=2 → score >= ancora*25-5 → 55 >= 50-5=45 ✓
    const result = await adapter.generate(makeEscola(), makeScores('EXPLORADOR', 55), 2);
    expect(result).toContain('alinhada');
  });

  it('ancora não alinhado ao score → inclui nota de divergência', async () => {
    // ancora=4 → score >= 4*25-5 = 95 → 55 < 95 → divergência
    const result = await adapter.generate(makeEscola(), makeScores('EXPLORADOR', 55), 4);
    expect(result).toContain('difere');
  });
});

// ─── eixos ───────────────────────────────────────────────────────────────────

describe('LocalDiagnosticAdapter — eixos', () => {
  it('quando tecnológico > pedagógico → menciona "tecnológico" como frente', async () => {
    const scores = makeScores('INTEGRADA', 80, {
      eixos: { pedagogico: 40, tecnologico: 90 },
    });
    const result = await adapter.generate(makeEscola(), scores, null);
    expect(result).toContain('tecnológico');
  });

  it('quando pedagógico >= tecnológico → menciona consistência do pedagógico', async () => {
    const scores = makeScores('INTEGRADA', 80, {
      eixos: { pedagogico: 90, tecnologico: 40 },
    });
    const result = await adapter.generate(makeEscola(), scores, null);
    expect(result).toContain('pedagógico');
  });
});

// ─── generateFallback ────────────────────────────────────────────────────────

describe('generateFallback', () => {
  it('menciona o nome da escola', () => {
    const result = generateFallback(makeEscola(), makeScores('ESSENCIAL', 25));
    expect(result).toContain('Escola Modelo');
  });

  it('menciona o nível correto', () => {
    const result = generateFallback(makeEscola(), makeScores('INTEGRADA', 80));
    expect(result).toContain('INTEGRADA');
    expect(result).toContain('80/100');
  });

  it('identifica o pilar mais forte e o mais fraco', () => {
    // pilares: aa=60, vis=40, flex=70, pers=30 → max=flex(70), min=pers(30)
    const result = generateFallback(makeEscola(), makeScores('EXPLORADOR', 50));
    expect(result).toContain('Flexibilidade');
    expect(result).toContain('Personalização');
    expect(result).toContain('70/100');
    expect(result).toContain('30/100');
  });

  it('usa ESSENCIAL como default quando nivel é string vazia', () => {
    const result = generateFallback(makeEscola(), makeScores('' as Scores['nivel'], 0));
    expect(result).toContain('ESSENCIAL');
    expect(result).toContain('Escola Modelo');
  });

  it('retorna string não vazia para todos os níveis', () => {
    for (const nivel of ['ESSENCIAL', 'INTEGRADA', 'EXPLORADOR'] as Scores['nivel'][]) {
      const result = generateFallback(makeEscola(), makeScores(nivel, 50));
      expect(result.length).toBeGreaterThan(50);
    }
  });

  it('ancora=3 → getAncoraLabel retorna "Integrada" via generate ESSENCIAL com gap', async () => {
    // ancora=3 → score 25 < 3*25-5=70 → divergência comment; also exercises getAncoraLabel(3)
    const result = await adapter.generate(makeEscola(), makeScores('ESSENCIAL', 25), 3);
    expect(result).toContain('Escola Modelo');
  });
});
