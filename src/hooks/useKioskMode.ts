import { useEffect, useState, useCallback } from 'react';

const INACTIVITY_MS = 10 * 60 * 1000; // 10 minutes
const WARNING_BEFORE_MS = 30 * 1000; // show warning 30s before reset

export interface KioskModeResult {
  showWarning: boolean;
}

/**
 * Resets the app after INACTIVITY_MS of no user interaction.
 * Shows a warning banner WARNING_BEFORE_MS before the reset.
 * @param isActive - false on splash and admin screens (no timer needed)
 * @param onReset  - callback to reset state and navigate to splash
 */
export function useKioskMode(isActive: boolean, onReset: () => void): KioskModeResult {
  const [showWarning, setShowWarning] = useState(false);

  const handleReset = useCallback(() => {
    setShowWarning(false);
    onReset();
  }, [onReset]);

  useEffect(() => {
    if (!isActive) return;

    let resetTimeoutId: ReturnType<typeof setTimeout>;
    let warningTimeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(resetTimeoutId);
      clearTimeout(warningTimeoutId);
      setShowWarning(false);

      warningTimeoutId = setTimeout(() => {
        setShowWarning(true);
      }, INACTIVITY_MS - WARNING_BEFORE_MS);

      resetTimeoutId = setTimeout(handleReset, INACTIVITY_MS);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      clearTimeout(resetTimeoutId);
      clearTimeout(warningTimeoutId);
    };
  }, [isActive, handleReset]);

  return { showWarning };
}
