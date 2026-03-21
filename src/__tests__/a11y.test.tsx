import React from 'react';
import { describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import { AppServicesProvider } from '../contexts/AppServicesContext';
import { Splash } from '../screens/Splash';
import { Cadastro } from '../screens/Cadastro';
import { Instrucao } from '../screens/Instrucao';
import { Ancora } from '../screens/Ancora';
import { Resultado } from '../screens/Resultado';
import { CSP } from '../screens/CSP';
import { useAppStore } from '../stores/appStore';

beforeAll(() => {
  expect.extend(toHaveNoViolations);
});

function wrap(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <AppServicesProvider>{ui}</AppServicesProvider>
    </MemoryRouter>
  );
}

function setupMockScores() {
  useAppStore.setState({
    escola: {
      nome: 'Escola Teste',
      rede: 'privada',
      segmentos: ['EF1'],
      cidade: 'São Paulo',
      estado: 'SP',
      contato_nome: 'João Silva',
      contato_cargo: 'Diretor',
      contato_email: 'joao@escola.com',
      contato_telefone: '',
      parceira_geekie: null,
    },
    scores: {
      pilares: {
        aprendizagem_ativa: 60,
        visibilidade: 45,
        flexibilidade: 70,
        personalizacao: 55,
      },
      eixos: { pedagogico: 65, tecnologico: 50 },
      total: 57,
      nivel: 'INTEGRADA',
    },
    diagnostico:
      'Sua escola demonstra uma trajetória consistente de inovação pedagógica.\n\n**Pontos fortes:**\n- Prática A\n- Prática B\n\n**Oportunidades:**\n- Oportunidade X',
    ancora: 2,
    respostas: {},
  });
}

describe('Acessibilidade WCAG 2.2 AA — axe baseline', () => {
  it('Splash: sem violações críticas/sérias', async () => {
    const { container } = wrap(<Splash />);
    const results = await axe(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    expect(results).toHaveNoViolations();
  });

  it('Cadastro: sem violações críticas/sérias', async () => {
    const { container } = wrap(<Cadastro />);
    const results = await axe(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    expect(results).toHaveNoViolations();
  });

  it('Instrucao: sem violações críticas/sérias', async () => {
    const { container } = wrap(<Instrucao />);
    const results = await axe(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    expect(results).toHaveNoViolations();
  });

  it('Ancora: sem violações críticas/sérias', async () => {
    const { container } = wrap(<Ancora />);
    const results = await axe(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    expect(results).toHaveNoViolations();
  });

  it('Resultado: sem violações críticas/sérias (com appState mockado)', async () => {
    setupMockScores();
    const { container } = wrap(<Resultado />);
    const results = await axe(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    expect(results).toHaveNoViolations();
  });

  it('CSP: sem violações críticas/sérias', async () => {
    const { container } = wrap(<CSP />);
    const results = await axe(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    expect(results).toHaveNoViolations();
  });
});
