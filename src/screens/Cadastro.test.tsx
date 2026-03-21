import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { AppServicesProvider } from '../contexts/AppServicesContext';

import { Cadastro } from './Cadastro';

function renderCadastro() {
  return render(
    <MemoryRouter initialEntries={['/cadastro']}>
      <AppServicesProvider>
        <Cadastro />
      </AppServicesProvider>
    </MemoryRouter>
  );
}

describe('Cadastro form', () => {
  it('exibe erro no campo nome após blur sem preenchimento', async () => {
    const user = userEvent.setup();
    renderCadastro();
    const input = screen.getByPlaceholderText('Ex: Colégio São Paulo');
    await user.click(input);
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText('Obrigatório')).toBeInTheDocument();
    });
  });

  it('erro some quando o campo é preenchido', async () => {
    const user = userEvent.setup();
    const { container } = renderCadastro();
    const input = screen.getByPlaceholderText('Ex: Colégio São Paulo');
    // The nome input is wrapped in a div; find its parent container
    const nomeWrapper = input.closest('div') as HTMLElement;
    await user.click(input);
    await user.tab();
    await waitFor(() => expect(nomeWrapper.querySelector('.text-red-500')).toBeInTheDocument());
    await user.type(input, 'Escola Teste');
    await user.tab();
    await waitFor(() => expect(nomeWrapper.querySelector('.text-red-500')).not.toBeInTheDocument());
    // suppress unused container warning
    expect(container).toBeDefined();
  });

  it('botão submit desabilitado enquanto formulário é inválido', async () => {
    renderCadastro();
    const submitBtn = screen.getByRole('button', { name: /continuar/i });
    expect(submitBtn).toBeDisabled();
  });
});
