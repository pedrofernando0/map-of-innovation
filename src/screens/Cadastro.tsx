import React, { useState } from 'react';
import { Button } from '../components/ui';
import { Escola } from '../types';

interface CadastroProps {
  escola: Escola;
  onChange: (escola: Escola) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Cadastro({ escola, onChange, onNext, onBack }: CadastroProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...escola, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSegmento = (seg: string) => {
    const novos = escola.segmentos.includes(seg)
      ? escola.segmentos.filter(s => s !== seg)
      : [...escola.segmentos, seg];
    onChange({ ...escola, segmentos: novos });
    if (errors.segmentos) setErrors({ ...errors, segmentos: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!escola.nome) newErrors.nome = 'Obrigatório';
    if (!escola.rede) newErrors.rede = 'Obrigatório';
    if (escola.segmentos.length === 0) newErrors.segmentos = 'Selecione ao menos um';
    if (!escola.contato_nome) newErrors.contato_nome = 'Obrigatório';
    if (!escola.contato_email) newErrors.contato_email = 'Obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-preto)] mb-4">
          Conte-nos sobre sua escola
        </h1>
        <p className="text-lg text-gray-600">
          Precisamos de alguns dados para personalizar seu diagnóstico.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nome da Escola *</label>
            <input 
              type="text" name="nome" value={escola.nome} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] focus:border-transparent outline-none transition-all"
              placeholder="Ex: Colégio São Paulo"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Rede de Ensino *</label>
              <select 
                name="rede" value={escola.rede} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] outline-none bg-white"
              >
                <option value="">Selecione...</option>
                <option value="privada">Privada</option>
                <option value="publica">Pública</option>
                <option value="comunitaria">Comunitária / Filantrópica</option>
              </select>
              {errors.rede && <p className="text-red-500 text-sm mt-1">{errors.rede}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cidade / Estado</label>
              <div className="flex gap-2">
                <input 
                  type="text" name="cidade" value={escola.cidade} onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] outline-none"
                  placeholder="Cidade"
                />
                <input
                  type="text"
                  name="estado"
                  value={escola.estado}
                  onChange={handleChange}
                  maxLength={2}
                  className="w-16 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] outline-none bg-white uppercase text-center"
                  placeholder="UF"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Segmentos Atendidos *</label>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'EI', label: 'Educação Infantil' },
                { id: 'EF1', label: 'Ensino Fundamental I' },
                { id: 'EF2', label: 'Ensino Fundamental II' },
                { id: 'EM', label: 'Ensino Médio' }
              ].map(seg => (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => handleSegmento(seg.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-bold transition-colors ${
                    escola.segmentos.includes(seg.id)
                      ? 'bg-[var(--color-geekie-cereja)] border-[var(--color-geekie-cereja)] text-white'
                      : 'border-gray-300 text-gray-600 hover:border-[var(--color-geekie-cereja)]'
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>
            {errors.segmentos && <p className="text-red-500 text-sm mt-2">{errors.segmentos}</p>}
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Seu Nome *</label>
              <input 
                type="text" name="contato_nome" value={escola.contato_nome} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] outline-none"
              />
              {errors.contato_nome && <p className="text-red-500 text-sm mt-1">{errors.contato_nome}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">E-mail *</label>
              <input 
                type="email" name="contato_email" value={escola.contato_email} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] outline-none"
              />
              {errors.contato_email && <p className="text-red-500 text-sm mt-1">{errors.contato_email}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Telefone</label>
              <input 
                type="tel" name="contato_telefone" value={escola.contato_telefone} onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] outline-none"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-between">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            ← Voltar
          </Button>
          <Button type="submit" size="lg">
            Continuar →
          </Button>
        </div>
      </form>
    </div>
  );
}
