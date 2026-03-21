import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Circle } from '@phosphor-icons/react';

import { Button } from '../components/ui';
import { useAppStore } from '../stores/appStore';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { useDiagnostico } from '../hooks/useDiagnostico';
import { useMotionVariants } from '../hooks/useMotionVariants';
import { useToast } from '../hooks/useToast';
import { useServices } from '../contexts/AppServicesContext';
import { calculateScores } from '../domain/scoring/calculateScores';
import { QUESTOES } from '../constants';
import { SCREEN_TRANSITION } from '../lib/transitions';

export function Questoes() {
  const navigate = useNavigate();
  const {
    respostas,
    escola,
    ancora,
    setRespostas,
    setAncora,
    setScores,
    setDiagnostico,
    setProgress,
  } = useAppStore();
  const { storage, diagnostic } = useServices();
  const { generate } = useDiagnostico(diagnostic);
  const { fadeUp, stagger, shouldReduce } = useMotionVariants();
  const { success: toastSuccess, error: toastError } = useToast();

  const handleFinish = async (
    respostasOverride?: Record<string, number>,
    ancoraOverride?: number | null
  ) => {
    const respostasParaCalculo = respostasOverride ?? respostas;
    const ancoraParaCalculo = ancoraOverride !== undefined ? ancoraOverride : ancora;
    navigate('/loading');
    const scores = calculateScores(respostasParaCalculo);
    const diagnostico = await generate(escola, scores, ancoraParaCalculo);
    const finalState = { ...useAppStore.getState(), scores, diagnostico };
    setScores(scores);
    setDiagnostico(diagnostico);
    // UI-4.1: toast de sucesso/erro ao salvar — aparece na tela de resultado
    try {
      storage.save({ ...finalState, scores, diagnostico });
      setProgress(90);
      navigate('/resultado');
      toastSuccess('Diagnóstico salvo com sucesso');
    } catch {
      toastError('Não foi possível salvar. Tente novamente.');
      setProgress(90);
      navigate('/resultado');
    }
  };

  const handleBack = () => {
    setProgress(30);
    navigate('/ancora');
  };

  const {
    blocoAtual,
    bloco,
    totalBlocos,
    todasRespondidas,
    pendentes,
    isLastBloco,
    handleNext,
    handleBack: questBack,
  } = useQuestionnaire(respostas, handleFinish, handleBack);

  const handleChange = (id: string, val: number) => {
    const novas = { ...respostas, [id]: val };
    setRespostas(novas);
    setProgress(40 + (Object.keys(novas).length / 20) * 40);
    storage.saveDraft({ escola, respostas: novas, ancora });
  };

  const handleRandomAnswers = () => {
    const aleatorias: Record<string, number> = {};
    for (const q of QUESTOES) {
      aleatorias[q.id] = Math.floor(Math.random() * 4) + 1;
    }
    const ancoraAleatoria = Math.ceil(Math.random() * 3);
    setRespostas(aleatorias);
    setAncora(ancoraAleatoria);
    setProgress(80);
    handleFinish(aleatorias, ancoraAleatoria);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}
      >
        <motion.div
          key={blocoAtual}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduce ? 0 : -12 }}
          transition={SCREEN_TRANSITION}
        >
          <div className="mb-10 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                Bloco {blocoAtual + 1} de {totalBlocos}
              </h2>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-cereja)]">
                {bloco.titulo}
              </h1>
            </div>
            {blocoAtual === 0 && (
              <button
                onClick={handleRandomAnswers}
                className="flex-shrink-0 mt-1 text-xs text-[var(--color-text-tertiary)] underline underline-offset-2 hover:text-gray-600 transition-colors duration-150"
              >
                Ir para o relatório
              </button>
            )}
          </div>

          {/* UI-4.2: Progress indicator interno do bloco — dots respondidos */}
          <div
            className="flex items-center gap-2 mb-6"
            role="status"
            aria-live="polite"
            aria-label={`${bloco.qs.filter((q) => respostas[q.id] !== undefined).length} de ${bloco.qs.length} respondidas neste bloco`}
          >
            {bloco.qs.map((q) => {
              const answered = respostas[q.id] !== undefined;
              return (
                <motion.span
                  key={q.id}
                  aria-hidden="true"
                  animate={answered && !shouldReduce ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Circle
                    size={12}
                    weight={answered ? 'fill' : 'regular'}
                    className={answered ? 'text-[var(--color-geekie-cereja)]' : 'text-gray-300'}
                  />
                </motion.span>
              );
            })}
            <span className="ml-1 text-xs text-[var(--color-text-tertiary)] font-medium">
              {bloco.qs.filter((q) => respostas[q.id] !== undefined).length}/{bloco.qs.length}
            </span>
          </div>

          {/* UI-2.3: stagger nos cards de questão ao trocar de bloco */}
          <motion.div className="space-y-12" variants={stagger} initial="initial" animate="animate">
            {bloco.qs.map((q, i) => {
              const questionTextId = `question-text-${q.id}`;
              return (
                <motion.div
                  key={q.id}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex gap-4 mb-6">
                    <div
                      className="flex-shrink-0 w-10 h-10 bg-red-50 text-[var(--color-geekie-cereja)] rounded-full flex items-center justify-center font-bold text-lg"
                      aria-hidden="true"
                    >
                      <span aria-hidden="true">{blocoAtual * 5 + i + 1}</span>
                    </div>
                    <p
                      id={questionTextId}
                      className="text-xl md:text-2xl text-[var(--color-geekie-preto)] leading-snug pt-1"
                    >
                      {q.texto}
                    </p>
                  </div>
                  <div
                    role="radiogroup"
                    aria-labelledby={questionTextId}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8"
                  >
                    {q.escala.map((texto, idx) => {
                      const valor = idx + 1;
                      const isSelected = respostas[q.id] === valor;
                      return (
                        // UI-2.5: microanimação de confirmação + hover nos não selecionados
                        <motion.button
                          key={valor}
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => handleChange(q.id, valor)}
                          whileHover={isSelected || shouldReduce ? undefined : { scale: 1.01 }}
                          animate={
                            isSelected && !shouldReduce
                              ? { scale: [1, 0.97, 1.01, 1] }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className={`text-left p-4 rounded-xl border-2 transition-[border-color,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 ${
                            isSelected
                              ? 'border-[var(--color-geekie-cereja)] bg-red-50 text-[var(--color-geekie-cereja)] font-bold shadow-sm'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-sm leading-tight">{texto}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky bottom-4 z-10">
        <Button variant="outline" onClick={questBack}>
          ← Voltar
        </Button>
        <div className="text-gray-500 font-medium hidden sm:block">
          {todasRespondidas
            ? `${bloco.qs.length} de ${bloco.qs.length} respondidas`
            : `Faltam ${pendentes} respostas para avançar`}
        </div>
        <Button onClick={handleNext} size="lg" disabled={!todasRespondidas}>
          {isLastBloco ? 'Ver Resultado Final' : 'Próximo Bloco →'}
        </Button>
      </div>
    </div>
  );
}
