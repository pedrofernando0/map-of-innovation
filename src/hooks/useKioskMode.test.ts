import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

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
    act(() => {
      vi.advanceTimersByTime(10 * 60 * 1000);
    });
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
    act(() => {
      vi.advanceTimersByTime(9 * 60 * 1000);
    });
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove'));
    });
    // Another 9 minutes — still no reset
    act(() => {
      vi.advanceTimersByTime(9 * 60 * 1000);
    });
    expect(onReset).not.toHaveBeenCalled();
    // One more minute (total 10 since last interaction)
    act(() => {
      vi.advanceTimersByTime(60 * 1000);
    });
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('showWarning é false no início', () => {
    const onReset = vi.fn();
    const { result } = renderHook(() => useKioskMode(true, onReset));
    expect(result.current.showWarning).toBe(false);
  });

  it('showWarning fica true 30s antes do reset', () => {
    const onReset = vi.fn();
    const { result } = renderHook(() => useKioskMode(true, onReset));
    // Advance to just before warning (9min29s) — still false
    act(() => {
      vi.advanceTimersByTime(9 * 60 * 1000 + 29 * 1000);
    });
    expect(result.current.showWarning).toBe(false);
    // Advance 1 more second (9min30s) — warning triggers
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.showWarning).toBe(true);
  });

  it('showWarning volta a false ao interagir', () => {
    const onReset = vi.fn();
    const { result } = renderHook(() => useKioskMode(true, onReset));
    // Trigger warning
    act(() => {
      vi.advanceTimersByTime(9 * 60 * 1000 + 30 * 1000);
    });
    expect(result.current.showWarning).toBe(true);
    // User interacts — resets timer
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove'));
    });
    expect(result.current.showWarning).toBe(false);
  });

  it('showWarning é false quando isActive=false', () => {
    const onReset = vi.fn();
    const { result } = renderHook(() => useKioskMode(false, onReset));
    act(() => {
      vi.advanceTimersByTime(15 * 60 * 1000);
    });
    expect(result.current.showWarning).toBe(false);
  });
});
