import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useKioskMode } from './useKioskMode';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useKioskMode', () => {
  it('não dispara reset quando isActive=false', () => {
    const onReset = vi.fn();
    renderHook(() => useKioskMode(false, onReset));
    vi.advanceTimersByTime(15 * 60 * 1000);
    expect(onReset).not.toHaveBeenCalled();
  });

  it('dispara reset após 10 minutos de inatividade', () => {
    const onReset = vi.fn();
    renderHook(() => useKioskMode(true, onReset));
    vi.advanceTimersByTime(10 * 60 * 1000);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('cancela o timer ao desmontar', () => {
    const onReset = vi.fn();
    const { unmount } = renderHook(() => useKioskMode(true, onReset));
    unmount();
    vi.advanceTimersByTime(10 * 60 * 1000);
    expect(onReset).not.toHaveBeenCalled();
  });

  it('reinicia o timer quando o usuário interage', () => {
    const onReset = vi.fn();
    renderHook(() => useKioskMode(true, onReset));
    // Advance 9 minutes, then fire a mousemove event
    vi.advanceTimersByTime(9 * 60 * 1000);
    window.dispatchEvent(new MouseEvent('mousemove'));
    // Another 9 minutes — still no reset
    vi.advanceTimersByTime(9 * 60 * 1000);
    expect(onReset).not.toHaveBeenCalled();
    // One more minute (total 10 since last interaction)
    vi.advanceTimersByTime(60 * 1000);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
