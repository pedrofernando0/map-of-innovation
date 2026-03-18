import React from 'react';
import { Button } from '../components/ui';
import { CSP_COPY } from '../constants';
import { AppState } from '../types';

interface CSPProps {
  appState: AppState;
}

export function CSP({ appState }: CSPProps) {
  const copy = CSP_COPY[appState.scores.nivel as keyof typeof CSP_COPY] || CSP_COPY.ESSENCIAL;
  
  const text = `Olá! Acabei de fazer o Mapa de Inovação na Bett. Minha escola é ${appState.escola.nome} e ficou no nível ${appState.scores.nivel}. Gostaria de conversar com um consultor.`;
  const whatsappNumber = process.env.WHATSAPP_NUMBER || '5511999999999';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-preto)] mb-6">
          {copy.titulo}
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          {copy.subtitulo}
        </p>

        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 text-lg rounded-xl font-bold transition-colors bg-[#25D366] text-white hover:bg-[#128C7E] shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Falar via WhatsApp
        </a>

        <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-left">
          <div className="flex items-start gap-4">
            <div className="text-[var(--color-geekie-cereja)] mt-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div>
              <h4 className="font-bold text-[var(--color-geekie-preto)] mb-2">Versão Reduzida Bett</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Aviso: Este Mapa de Inovação é uma versão reduzida criada especialmente para a Bett Brasil. Se desejar, podemos enviar a versão completa para preenchimento, que fornecerá resultados ainda mais acurados sobre a maturidade da sua escola. Fale com nosso consultor para solicitar.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Obrigado por participar do Mapa de Inovação Geekie!
        </p>
      </div>
    </div>
  );
}
