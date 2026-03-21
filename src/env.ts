import { z } from 'zod';

// Credenciais padrão de fallback — sobrescritas por VITE_ADMIN_USER / VITE_ADMIN_PASS no .env.local
const ADMIN_USER_DEFAULT = 'geekie';
const ADMIN_PASS_DEFAULT = 'bett2026';

const envSchema = z.object({
  ADMIN_USER: z.string().default(ADMIN_USER_DEFAULT),
  ADMIN_PASS: z.string().default(ADMIN_PASS_DEFAULT),
  WHATSAPP_NUMBER: z.string().default('5511000000000'),
  DIAGNOSTIC_TIMEOUT_MS: z.coerce.number().default(30_000),
});

const parsed = envSchema.safeParse({
  ADMIN_USER: import.meta.env.VITE_ADMIN_USER,
  ADMIN_PASS: import.meta.env.VITE_ADMIN_PASS,
  WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER,
  DIAGNOSTIC_TIMEOUT_MS: import.meta.env.VITE_DIAGNOSTIC_TIMEOUT_MS,
});

if (!parsed.success) {
  const missing = Object.keys(parsed.error.flatten().fieldErrors).join(', ');
  console.error(`[env] Variáveis de ambiente inválidas: ${missing}`);
}

export const env = parsed.success
  ? parsed.data
  : {
      ADMIN_USER: ADMIN_USER_DEFAULT,
      ADMIN_PASS: ADMIN_PASS_DEFAULT,
      WHATSAPP_NUMBER: '5511000000000',
      DIAGNOSTIC_TIMEOUT_MS: 30_000,
    };
