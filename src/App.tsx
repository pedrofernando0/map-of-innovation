import React, { useState, useEffect } from 'react';
import { AppState, Escola } from './types';
import { calculateScores } from './constants';
import { gerarDiagnostico } from './services/geminiService';
import { saveResponse } from './services/storageService';

import { Header } from './components/Header';
import { Splash } from './screens/Splash';
import { Cadastro } from './screens/Cadastro';
import { Instrucao } from './screens/Instrucao';
import { Ancora } from './screens/Ancora';
import { Questoes } from './screens/Questoes';
import { Loading } from './screens/Loading';
import { Resultado } from './screens/Resultado';
import { CSP } from './screens/CSP';
import { Admin } from './screens/Admin';

const INITIAL_STATE: AppState = {
  escola: {
    nome: '', rede: '', segmentos: [], cidade: '', estado: '',
    contato_nome: '', contato_email: '', contato_telefone: '',
    parceira_geekie: false
  },
  respostas: {},
  ancora: null,
  scores: { pilares: { aprendizagem_ativa: 0, visibilidade: 0, flexibilidade: 0, personalizacao: 0 }, eixos: { pedagogico: 0, tecnologico: 0 }, total: 0, nivel: '' },
  diagnostico: ''
};

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);
  const [progress, setProgress] = useState(0);

  // Kiosk mode: reset after 5 mins of inactivity
  useEffect(() => {
    let timeoutId: number;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (screen !== 'splash' && screen !== 'admin') {
        timeoutId = window.setTimeout(() => {
          setAppState(INITIAL_STATE);
          setScreen('splash');
        }, 10 * 60 * 1000);
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      clearTimeout(timeoutId);
    };
  }, [screen]);

  useEffect(() => {
    // Limpar hash residual ao iniciar (evita entrar direto no admin via refresh)
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setScreen('admin');
      } else if (hash === '') {
        setScreen('splash');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleFinishQuestoes = async () => {
    setScreen('loading');
    const scores = calculateScores(appState.respostas);
    const diagnostico = await gerarDiagnostico(appState.escola, scores, appState.ancora);
    
    const finalState = { ...appState, scores, diagnostico };
    setAppState(finalState);
    saveResponse(finalState);
    
    setScreen('resultado');
  };

  if (screen === 'admin') return <Admin />;
  if (screen === 'splash') return <Splash onNext={() => { setScreen('cadastro'); setProgress(10); }} />;

  return (
    <div className="min-h-screen bg-[var(--color-geekie-branco)]">
      <Header progress={progress} />
      
      <main>
        {screen === 'cadastro' && (
          <Cadastro 
            escola={appState.escola} 
            onChange={(escola) => setAppState({ ...appState, escola })}
            onNext={() => { setScreen('instrucao'); setProgress(20); }} 
            onBack={() => { setScreen('splash'); setProgress(0); }}
          />
        )}
        
        {screen === 'instrucao' && (
          <Instrucao 
            onNext={() => { setScreen('ancora'); setProgress(30); }} 
            onBack={() => { setScreen('cadastro'); setProgress(10); }}
          />
        )}
        
        {screen === 'ancora' && (
          <Ancora 
            ancora={appState.ancora}
            onChange={(ancora) => setAppState({ ...appState, ancora })}
            onNext={() => { setScreen('questoes'); setProgress(40); }} 
            onBack={() => { setScreen('instrucao'); setProgress(20); }}
          />
        )}
        
        {screen === 'questoes' && (
          <Questoes 
            respostas={appState.respostas}
            onChange={(id, val) => {
              const novas = { ...appState.respostas, [id]: val };
              setAppState({ ...appState, respostas: novas });
              const respondidas = Object.keys(novas).length;
              setProgress(40 + (respondidas / 20) * 40); // 40% to 80%
            }}
            onFinish={handleFinishQuestoes} 
            onBack={() => { setScreen('ancora'); setProgress(30); }}
          />
        )}
        
        {screen === 'loading' && <Loading />}
        
        {screen === 'resultado' && (
          <Resultado 
            appState={appState} 
            onNext={() => { setScreen('csp'); setProgress(100); }} 
          />
        )}
        
        {screen === 'csp' && <CSP appState={appState} />}
      </main>
    </div>
  );
}
