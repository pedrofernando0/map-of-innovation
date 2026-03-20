import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AppServicesProvider } from '../contexts/AppServicesContext';
import { Splash } from '../screens/Splash';
import { Instrucao } from '../screens/Instrucao';
import { CSP } from '../screens/CSP';

function wrap(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <AppServicesProvider>{ui}</AppServicesProvider>
    </MemoryRouter>
  );
}

describe('Snapshots — telas estáticas', () => {
  it('Splash', () => {
    const { container } = wrap(<Splash />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Instrucao', () => {
    const { container } = wrap(<Instrucao />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('CSP', () => {
    const { container } = wrap(<CSP />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
