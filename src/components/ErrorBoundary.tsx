import React, { Component, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Silently captured — do not log in production
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-white">
          <p className="text-6xl mb-6">⚠️</p>
          <h2 className="text-2xl font-bold text-[var(--color-geekie-preto)] mb-3">
            Algo deu errado
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm">
            Ocorreu um erro inesperado. Recarregue a página para continuar.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[var(--color-geekie-cereja)] text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
