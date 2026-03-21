# Como Rodar o Mapa de Inovação Localmente

## Pré-requisitos

- Node.js 20+
- npm 9+

## Passo 1: Instalar dependências

```bash
npm install
```

## Passo 2: Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com os valores corretos. As variáveis obrigatórias são validadas por Zod em `src/env.ts` — se estiverem ausentes, o app lança erro explícito no console ao iniciar.

| Variável                     | Obrigatória | Descrição                                                                     |
| ---------------------------- | ----------- | ----------------------------------------------------------------------------- |
| `VITE_ADMIN_USER`            | Sim         | Login do painel admin                                                         |
| `VITE_ADMIN_PASS`            | Sim         | Senha do painel admin                                                         |
| `VITE_GEMINI_API_KEY`        | Não         | Chave da API Google Gemini. Sem ela, o app usa o texto de fallback por nível. |
| `VITE_WHATSAPP_NUMBER`       | Não         | Número para o botão de contato na tela CSP                                    |
| `VITE_DIAGNOSTIC_TIMEOUT_MS` | Não         | Timeout do diagnóstico em ms (default: 30000)                                 |

## Passo 3: Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O app abre em `http://localhost:5173` (padrão do Vite).

## Scripts disponíveis

```bash
npm run dev           # Servidor de desenvolvimento com hot reload
npm run build         # Build de produção em dist/
npm run preview       # Preview do build de produção (localhost:4173)
npm run lint          # ESLint — deve retornar zero erros
npm run test          # Vitest — roda a suite completa (82 testes)
npm run test:watch    # Vitest em modo watch
npm run test:coverage # Vitest com relatório de cobertura
npm run clean         # Remove dist/
```

## Verificação rápida de qualidade

```bash
npm run lint && npx tsc --noEmit && npm run test
```

Os três devem passar sem erros antes de qualquer commit (o pre-commit hook do Husky já enforça isso).

## Acessar o painel admin

Navegue para `http://localhost:5173/admin`

Use as credenciais definidas em `VITE_ADMIN_USER` e `VITE_ADMIN_PASS` no `.env`.

O painel exibe todas as respostas salvas no `localStorage` e permite exportar CSV.

## Modo Kiosk

A aplicação reseta automaticamente após 10 minutos de inatividade (configurável em `useKioskMode`). Um aviso é exibido 30 segundos antes do reset.

## Diagnóstico sem chave da API Gemini

Se `VITE_GEMINI_API_KEY` não estiver configurada, ou se a API demorar mais que `VITE_DIAGNOSTIC_TIMEOUT_MS`, o app usa automaticamente o `FALLBACK_DIAGNOSTICO` por nível (ESSENCIAL/EXPLORADOR/INTEGRADA). O fluxo completo funciona sem conexão com serviços externos.

## Solução de problemas

**App não abre no navegador:**

```bash
# Verificar se o servidor está respondendo
curl http://localhost:5173

# Limpar cache e reinstalar
rm -rf node_modules dist .vite
npm install
npm run dev
```

**Erros de TypeScript:**

```bash
npx tsc --noEmit
```

**Testes falhando:**

```bash
npm run test -- --reporter=verbose
```

**Cobertura de testes por arquivo:**

```bash
npm run test:coverage -- --reporter=text
```
