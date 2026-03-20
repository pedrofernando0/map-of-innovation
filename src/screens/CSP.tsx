import React from 'react';
import { Button } from '../components/ui';
import { CSP_COPY } from '../constants';
import { AppState } from '../types';

interface CSPProps {
  appState: AppState;
  onBack?: () => void;
}

export function CSP({ appState, onBack }: CSPProps) {
  const copy = CSP_COPY[appState.scores.nivel as keyof typeof CSP_COPY] || CSP_COPY.ESSENCIAL;
  
  const text = `Olá! Acabei de fazer o Mapa de Inovação na Bett. Minha escola é ${appState.escola.nome} e ficou no nível ${appState.scores.nivel}. Gostaria de conversar com um consultor.`;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-2xl w-full mx-auto space-y-4">

        {/* Botão voltar */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-geekie-cereja)] transition-colors font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Voltar ao relatório
          </button>
        )}

        {/* Card principal com destaque */}
        <div className="bg-[var(--color-geekie-cereja)] rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>

          <p className="text-white text-opacity-80 text-sm font-bold uppercase tracking-wider mb-3">Próximo passo</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            {copy.titulo}
          </h1>
          <p className="text-lg text-white text-opacity-90 mb-10 leading-relaxed max-w-lg mx-auto">
            {copy.subtitulo}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg rounded-xl font-bold transition-all bg-white text-[var(--color-geekie-cereja)] hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Quero ser uma escola mais inovadora
          </a>
        </div>

        {/* Info versão reduzida */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-[var(--color-geekie-cereja)] mt-0.5">ⓘ</span>
            <div>
              <h4 className="font-bold text-[var(--color-geekie-preto)] mb-1 text-sm">Versão Reduzida — Bett Brasil 2026</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Esta é uma versão reduzida do Mapa de Inovação Educacional, desenvolvida especialmente para a Bett Brasil. Avalia 1 de 5 categorias do instrumento completo. Fale com um consultor para acessar o diagnóstico integral da sua escola.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pt-2">
          Obrigado por participar do Mapa de Inovação Educacional Geekie!
        </p>
      </div>
    </div>
  );
}
