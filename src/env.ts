import { z } from 'zod';

const envSchema = z.object({
  ADMIN_USER: z.string().optional(),
  ADMIN_PASS: z.string().optional(),
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
      ADMIN_USER: undefined,
      ADMIN_PASS: undefined,
      WHATSAPP_NUMBER: '5511000000000',
      DIAGNOSTIC_TIMEOUT_MS: 30_000,
    };
