import React from 'react';
import { Button } from '../components/ui';

interface AncoraProps {
  ancora: number | null;
  onChange: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Ancora({ ancora, onChange, onNext, onBack }: AncoraProps) {
  const opcoes = [
    { val: 1, label: 'Iniciante', desc: 'Estamos dando os primeiros passos na inovação.' },
    { val: 2, label: 'Em desenvolvimento', desc: 'Temos iniciativas, mas ainda não são institucionais.' },
    { val: 3, label: 'Avançada', desc: 'A inovação já faz parte da nossa cultura e rotina.' },
    { val: 4, label: 'Referência', desc: 'Somos reconhecidos pelas nossas práticas inovadoras.' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-preto)] mb-4">
          Antes de começarmos...
        </h1>
        <p className="text-xl text-gray-600">
          Como você avalia o nível de inovação da sua escola hoje?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {opcoes.map((op) => (
          <button
            key={op.val}
            onClick={() => onChange(op.val)}
            className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
              ancora === op.val
                ? 'border-[var(--color-geekie-cereja)] bg-red-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-bold text-xl ${ancora === op.val ? 'text-[var(--color-geekie-cereja)]' : 'text-[var(--color-geekie-preto)]'}`}>
                {op.label}
              </h3>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                ancora === op.val ? 'border-[var(--color-geekie-cereja)]' : 'border-gray-300'
              }`}>
                {ancora === op.val && <div className="w-3 h-3 rounded-full bg-[var(--color-geekie-cereja)]" />}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{op.desc}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="lg">
          ← Voltar
        </Button>
        <Button 
          onClick={onNext} 
          size="lg"
          disabled={!ancora}
        >
          Ir para o questionário →
        </Button>
      </div>
    </div>
  );
}
