import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/ui';
import { useAppStore } from '../stores/appStore';

export function Ancora() {
  const navigate = useNavigate();
  const { ancora, setAncora, setProgress } = useAppStore();

  const opcoes = [
    {
      val: 1,
      label: 'Essencial',
      desc: 'Nossa escola possui condições básicas de funcionamento. Práticas inovadoras existem de forma pontual ou dependem de iniciativas individuais. Há espaço significativo para intencionalidade e estruturação.',
    },
    {
      val: 2,
      label: 'Explorador',
      desc: 'Nossa escola tem processos em construção, com orientação institucional parcial. Há práticas inovadoras em desenvolvimento, mas a integração ainda não é sistêmica. Coexistem práticas tradicionais e inovadoras.',
    },
    {
      val: 3,
      label: 'Integrada',
      desc: 'Nossa escola demonstra cultura institucional consolidada de inovação. Práticas pedagógicas ativas e uso intencional de tecnologia estão integrados ao currículo, à formação e à gestão.',
    },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {opcoes.map((op) => (
          <button
            key={op.val}
            onClick={() => setAncora(op.val)}
            className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
              ancora === op.val
                ? 'border-[var(--color-geekie-cereja)] bg-red-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3
                className={`font-bold text-xl ${ancora === op.val ? 'text-[var(--color-geekie-cereja)]' : 'text-[var(--color-geekie-preto)]'}`}
              >
                {op.label}
              </h3>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  ancora === op.val ? 'border-[var(--color-geekie-cereja)]' : 'border-gray-300'
                }`}
              >
                {ancora === op.val && (
                  <div className="w-3 h-3 rounded-full bg-[var(--color-geekie-cereja)]" />
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm">{op.desc}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setProgress(20);
            navigate('/instrucao');
          }}
          size="lg"
        >
          ← Voltar
        </Button>
        <Button
          onClick={() => {
            setProgress(40);
            navigate('/questoes');
          }}
          size="lg"
          disabled={!ancora}
        >
          Ir para o questionário →
        </Button>
      </div>
    </div>
  );
}
