import { useReducedMotion } from 'motion/react';

/**
 * Hook que retorna variantes de animação Motion pré-definidas,
 * respeitando automaticamente `prefers-reduced-motion` (WCAG 2.2 — 2.3.3).
 *
 * Regras de tempo baseadas em NN/Group + Material Motion:
 *   Entrada:       easeOut, 280ms
 *   Saída:         easeIn,  200ms
 *   Microinteração: spring  stiffness:400, damping:30
 *   Stagger:       60ms por item
 */
export function useMotionVariants() {
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: shouldReduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduce ? 0 : -12 },
    transition: {
      duration: shouldReduce ? 0.01 : 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: shouldReduce ? 0.01 : 0.2 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.06,
      },
    },
  };

  const scaleIn = {
    initial: { scale: shouldReduce ? 1 : 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: shouldReduce ? 1 : 0.95, opacity: 0 },
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  };

  /** Variante de confirmação: pulso suave ao selecionar um card */
  const confirmPulse = {
    animate: shouldReduce ? { scale: 1 } : { scale: [1, 0.97, 1.01, 1] as number[] },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  };

  return { fadeUp, fadeIn, stagger, scaleIn, confirmPulse, shouldReduce };
}
