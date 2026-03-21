import { useEffect } from 'react';

const INACTIVITY_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Resets the app after INACTIVITY_MS of no user interaction.
 * @param isActive - false on splash and admin screens (no timer needed)
 * @param onReset  - callback to reset state and navigate to splash
 */
export function useKioskMode(isActive: boolean, onReset: () => void): void {
  useEffect(() => {
    if (!isActive) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onReset, INACTIVITY_MS);
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
  }, [isActive, onReset]);
}
