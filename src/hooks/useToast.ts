/**
 * Hook semântico sobre Sonner (toast library, ~1.8KB, aria-live embutido).
 *
 * Regra de uso:
 *   - Não chamar toast.* diretamente nas screens — usar este hook.
 *   - success: confirmação de ação concluída (salvo, copiado)
 *   - error:   falha recuperável (storage cheio, rede, timeout)
 *   - info:    feedback neutro (dados restaurados do cache)
 *
 * O <Toaster> é montado em App.tsx com position="bottom-center".
 */
import { toast } from 'sonner';

export function useToast() {
  return {
    /** Diagnóstico salvo, CSV exportado, clipboard copiado */
    success: (message: string) => toast.success(message),

    /** Falha de storage ou serviço externo */
    error: (message: string) =>
      toast.error(message, {
        duration: 6000, // erros ficam mais tempo
      }),

    /** Informação neutra: draft restaurado, ação silenciosa */
    info: (message: string) => toast(message),
  };
}
