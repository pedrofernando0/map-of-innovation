import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { EixoEspectro } from '../EixoEspectro';
import { CategoryIndicator } from '../CategoryIndicator';
import { Badge, ProgressBar } from '../ui';

// ─── EixoEspectro ────────────────────────────────────────────────────────────

describe('EixoEspectro', () => {
  it('score=0 → marcador clampado em 4%', () => {
    const { container } = render(
      <EixoEspectro label="Geral" score={0} extremoEsquerdo="A" extremoDireito="B" cor="#ff0000" />
    );
    // Badge flutuante tem style left: 4%
    const marker = container.querySelector('[style*="left: 4%"]');
    expect(marker).toBeInTheDocument();
  });

  it('score=100 → marcador clampado em 96%', () => {
    const { container } = render(
      <EixoEspectro
        label="Geral"
        score={100}
        extremoEsquerdo="A"
        extremoDireito="B"
        cor="#ff0000"
      />
    );
    const marker = container.querySelector('[style*="left: 96%"]');
    expect(marker).toBeInTheDocument();
  });

  it('score=50 → marcador em 50% (sem clamp)', () => {
    const { container } = render(
      <EixoEspectro label="Geral" score={50} extremoEsquerdo="A" extremoDireito="B" cor="#ff0000" />
    );
    const marker = container.querySelector('[style*="left: 50%"]');
    expect(marker).toBeInTheDocument();
  });

  it('renderiza o label e os extremos', () => {
    render(
      <EixoEspectro
        label="Eixo Pedagógico"
        score={60}
        extremoEsquerdo="Transmissivo"
        extremoDireito="Protagonista"
        cor="#6146f1"
      />
    );
    expect(screen.getByText('Eixo Pedagógico')).toBeInTheDocument();
    expect(screen.getByText('Transmissivo')).toBeInTheDocument();
    expect(screen.getByText('Protagonista')).toBeInTheDocument();
  });
});

// ─── CategoryIndicator ───────────────────────────────────────────────────────

describe('CategoryIndicator', () => {
  it.each([
    ['ESSENCIAL' as const, 20, 'Essencial'],
    ['EXPLORADOR' as const, 55, 'Explorador'],
    ['INTEGRADA' as const, 80, 'Integrada'],
  ])('nivel=%s → card correto exibe "Perfil atual"', (nivel, score, expectedName) => {
    render(<CategoryIndicator nivel={nivel} score={score} />);
    expect(screen.getByText('Perfil atual')).toBeInTheDocument();
    // A leitura no rodapé confirma qual categoria está ativa
    expect(screen.getByText(new RegExp(`^${expectedName}:`))).toBeInTheDocument();
  });

  it('nivel="" → usa score para determinar o card ativo', () => {
    render(<CategoryIndicator nivel="" score={80} />);
    // score=80 → fallbackIndex INTEGRADA
    expect(screen.getByText('Perfil atual')).toBeInTheDocument();
    expect(screen.getByText(/^Integrada:/)).toBeInTheDocument();
  });
});

// ─── Badge ───────────────────────────────────────────────────────────────────

describe('Badge', () => {
  it('não renderiza nada quando nivel é string vazia', () => {
    const { container } = render(<Badge nivel="" />);
    expect(container.firstChild).toBeNull();
  });

  it.each(['ESSENCIAL', 'EXPLORADOR', 'INTEGRADA'] as const)(
    'renderiza o texto do nível: %s',
    (nivel) => {
      render(<Badge nivel={nivel} />);
      expect(screen.getByText(nivel)).toBeInTheDocument();
    }
  );
});

// ─── ProgressBar ─────────────────────────────────────────────────────────────

describe('ProgressBar', () => {
  it.each([0, 50, 100])('progress=%s → largura do preenchimento é %s%', (progress) => {
    const { container } = render(<ProgressBar progress={progress} />);
    // O div interno tem style.width = `${progress}%`
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar.style.width).toBe(`${progress}%`);
  });
});
