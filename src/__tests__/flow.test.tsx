import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';

import { AppServicesProvider } from '../contexts/AppServicesContext';
import App from '../App';

/** Expõe a rota atual como data-testid para asserção sem depender de animações */
function CurrentPath() {
  const location = useLocation();
  return <div data-testid="current-path">{location.pathname}</div>;
}

function renderAtCadastro() {
  return render(
    <MemoryRouter initialEntries={['/cadastro']}>
      <AppServicesProvider>
        <App />
        <CurrentPath />
      </AppServicesProvider>
    </MemoryRouter>
  );
}

describe('fluxo: Cadastro → Instrucao', () => {
  it('navega para /instrucao após preenchimento válido do formulário', async () => {
    const { container } = renderAtCadastro();

    // Preenche todos os campos obrigatórios via eventos nativos
    fireEvent.change(container.querySelector('input[name="nome"]')!, {
      target: { value: 'Escola Teste' },
    });
    fireEvent.change(container.querySelector('select[name="rede"]')!, {
      target: { value: 'privada' },
    });
    // Segmentos: clique no botão do SegmentoSelector
    fireEvent.click(screen.getByText('Ensino Médio'));
    fireEvent.change(container.querySelector('input[name="contato_nome"]')!, {
      target: { value: 'João Silva' },
    });
    fireEvent.change(container.querySelector('select[name="contato_cargo"]')!, {
      target: { value: 'Diretor' },
    });
    fireEvent.change(container.querySelector('input[name="contato_email"]')!, {
      target: { value: 'joao@escola.com' },
    });

    // Submete o formulário (handleSubmit do RHF valida tudo e chama onSubmit)
    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByTestId('current-path').textContent).toBe('/instrucao');
    });
  });

  it('formulário está na tela /cadastro após render', () => {
    renderAtCadastro();
    expect(screen.getByPlaceholderText('Ex: Colégio São Paulo')).toBeInTheDocument();
    expect(screen.getByTestId('current-path').textContent).toBe('/cadastro');
  });
});
