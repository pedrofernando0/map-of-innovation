# Arquitetura — Mapa de Inovação Educacional

_Estado atual: Março 2026_

> Este documento descreve a arquitetura **real e atual** do projeto, após a conclusão dos Sprints 0–5 de refatoração (arquitetura hexagonal, estado global, roteamento, testes e infraestrutura contínua).

---

## Visão Geral

SPA (Single Page Application) React sem backend. Usada em contexto de evento presencial (Bett Brasil) em modo kiosk num tablet. Um gestor escolar preenche um questionário de 20 perguntas em ~10 minutos e recebe um diagnóstico de maturidade em inovação educacional gerado por IA. Dados persistidos em `localStorage`. Painel admin exporta CSV.

**Stack:**

| Camada        | Tecnologia                     | Versão             |
| ------------- | ------------------------------ | ------------------ |
| Frontend      | React + TypeScript + Vite      | React 19           |
| Estilos       | Tailwind CSS                   | v4                 |
| Animações     | Motion (motion/react)          | v12                |
| Gráficos      | Recharts                       | v3                 |
| Roteamento    | React Router                   | v7 (BrowserRouter) |
| Estado global | Zustand                        | v5                 |
| Formulários   | React Hook Form + Zod          | —                  |
| Testes        | Vitest + React Testing Library | v4                 |
| CI            | GitHub Actions                 | —                  |

---

## Arquitetura Hexagonal

```
┌─────────────────────────────────────────────────────────────┐
│  DOMÍNIO (src/domain/)                                      │
│  calculateScores, questoes-metadata                         │
│  Zero dependências externas. Testável sem React.            │
└────────────────────┬────────────────────────────────────────┘
                     │ usa
┌────────────────────▼────────────────────────────────────────┐
│  PORTAS (src/ports/)                                        │
│  IStorageRepository, IDiagnosticService                     │
│  Interfaces TypeScript puras — sem implementação.           │
└──────────┬─────────────────────────┬────────────────────────┘
           │ implementado por        │ implementado por
┌──────────▼──────────┐   ┌──────────▼──────────────────────┐
│  LocalStorageAdapter│   │  LocalDiagnosticAdapter         │
│  (src/adapters/)    │   │  (src/adapters/)                │
│  IStorageRepository │   │  IDiagnosticService             │
│  via localStorage   │   │  Usa Gemini + fallback por nível│
└─────────────────────┘   └─────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  APLICAÇÃO REACT (src/)                                     │
│  Screens, Hooks, Store (Zustand), Contexto, UI              │
│  Conhece apenas as Portas via AppServicesContext.           │
│  Nunca importa adaptadores diretamente.                     │
└─────────────────────────────────────────────────────────────┘
```

### Ponto de extensão: novo serviço de IA

Para integrar um novo serviço de diagnóstico:

1. Criar `src/adapters/ExternalDiagnosticAdapter.ts` implementando `IDiagnosticService`
2. Trocar a instância em `AppServicesContext.tsx`
3. Zero mudança nas screens, hooks ou store

---

## Estrutura de Pastas

```
src/
├── __tests__/                    # Testes de integração e snapshots
│   ├── flow.test.tsx             # Fluxo: Cadastro → /instrucao
│   └── snapshots.test.tsx        # Snapshots de telas estáticas
│
├── adapters/                     # Implementações concretas das portas
│   ├── LocalDiagnosticAdapter.ts # IDiagnosticService (Gemini API + fallback)
│   └── LocalStorageAdapter.ts    # IStorageRepository (localStorage)
│
├── components/                   # Componentes de UI reutilizáveis
│   ├── resultado/                # Subcomponentes de Resultado.tsx (SRP)
│   │   ├── ResultadoHeader.tsx   # Badge + nome da escola + score
│   │   ├── ResultadoPilares.tsx  # 4 barras horizontais
│   │   ├── ResultadoEixos.tsx    # EixoEspectro + CategoryIndicator
│   │   └── ResultadoDiagnostico.tsx # TypingMarkdown + botões
│   ├── forms/                    # Componentes de formulário
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── SegmentoSelector.tsx
│   ├── BettAtivacoes.tsx         # Accordion de ativações da Bett
│   ├── CategoryIndicator.tsx
│   ├── EixoEspectro.tsx
│   ├── ErrorBoundary.tsx         # Class component (captura erros de renderização)
│   ├── Header.tsx                # Progress bar + logo
│   └── ui.tsx                    # Button, Badge, ProgressBar
│
├── contexts/
│   └── AppServicesContext.tsx    # Provê IStorageRepository + IDiagnosticService via React Context
│
├── domain/
│   └── scoring/
│       ├── calculateScores.ts        # Lógica pura de domínio (ponderação 80/20, NIVEL_RULES)
│       ├── calculateScores.test.ts   # 100% de cobertura
│       └── questoes-metadata.ts
│
├── env.ts                        # Variáveis de ambiente validadas por Zod
│
├── hooks/
│   ├── useDiagnostico.ts         # Promise.race com timeout + fallback por nível
│   ├── useKioskMode.ts           # Reset por inatividade (event listeners + timer)
│   └── useQuestionnaire.ts       # Paginação de blocos de questões
│
├── lib/
│   ├── transitions.ts            # Constantes de animação Motion
│   └── utils.ts
│
├── ports/
│   ├── IDiagnosticService.ts     # Interface: generate(escola, scores, ancora): Promise<string>
│   └── IStorageRepository.ts     # Interface: save, getIndex, getRecord
│
├── screens/                      # Telas da aplicação (leem do store, navegam via useNavigate)
│   ├── Admin.tsx                 # Painel admin: tabela + CSV export
│   ├── Ancora.tsx                # Auto-percepção do nível
│   ├── AppLayout.tsx             # Layout: Header + useKioskMode
│   ├── Cadastro.tsx              # React Hook Form + Zod
│   ├── CSP.tsx                   # Customer Success Partner
│   ├── Instrucao.tsx
│   ├── Loading.tsx               # Spinner durante geração do diagnóstico
│   ├── Questoes.tsx              # Questionário com useQuestionnaire
│   ├── Resultado.tsx             # Composição dos 4 subcomponentes
│   └── Splash.tsx
│
├── services/                     # LEGADO — não importados por screens
│   ├── geminiService.ts          # Substituído por LocalDiagnosticAdapter
│   └── storageService.ts         # Substituído por LocalStorageAdapter
│
├── stores/
│   └── appStore.ts               # Zustand: escola, respostas, ancora, scores, diagnostico
│
├── constants.ts                  # Dados puros: QUESTOES, NIVEL_RULES, ATIVACOES_BETT, CSP_COPY
├── types.ts                      # Tipos TypeScript: AppState, Escola, Scores, IndexRecord...
├── App.tsx                       # ~50 linhas: Routes + AnimatePresence
└── main.tsx                      # BrowserRouter + AppServicesProvider + StrictMode
```

---

## Roteamento

React Router v7 com `BrowserRouter`. Rotas definidas em `App.tsx`. Cada screen usa `useNavigate()`.

| Rota         | Tela      |
| ------------ | --------- |
| `/`          | Splash    |
| `/cadastro`  | Cadastro  |
| `/instrucao` | Instrucao |
| `/ancora`    | Ancora    |
| `/questoes`  | Questoes  |
| `/loading`   | Loading   |
| `/resultado` | Resultado |
| `/csp`       | CSP       |
| `/admin`     | Admin     |

---

## Estado Global (Zustand)

`src/stores/appStore.ts`:

```typescript
interface AppStore {
  escola: Escola | null;
  respostas: Record<string, number>;
  ancora: number | null;
  scores: Scores | null;
  diagnostico: string;
  // Actions:
  setEscola(escola: Escola): void;
  setResposta(id: string, valor: number): void;
  setAncora(ancora: number): void;
  setScores(scores: Scores): void;
  setDiagnostico(texto: string): void;
  reset(): void;
}
```

Zero prop drilling. Cada screen acessa o store diretamente via `useAppStore()`.

---

## Fluxo Principal

```
/           (Splash)
 └─ /cadastro      → setEscola()
 └─ /instrucao     → (navegação)
 └─ /ancora        → setAncora()
 └─ /questoes      → setResposta() por questão (useQuestionnaire)
 └─ /loading       → useDiagnostico():
                       IDiagnosticService.generate(escola, scores, ancora)
                       Promise.race vs. timeout (VITE_DIAGNOSTIC_TIMEOUT_MS)
                       setScores() + setDiagnostico()
                       IStorageRepository.save(appState)
 └─ /resultado     → lê scores + diagnostico do store
 └─ /csp           → lê scores.nivel do store
```

---

## Diagnóstico com Resiliência

`useDiagnostico.ts` usa `Promise.race` com timeout configurável. Em caso de falha ou timeout, o `LocalDiagnosticAdapter` usa `FALLBACK_DIAGNOSTICO` por nível (ESSENCIAL/EXPLORADOR/INTEGRADA). O spinner do Loading nunca fica em loop infinito.

---

## Cobertura de Testes

Suite: **82 testes** em ~3s.

| Camada          | Stmts | Lines |
| --------------- | ----- | ----- |
| `src/domain/`   | 100%  | 100%  |
| `src/adapters/` | 97%   | 100%  |
| `src/hooks/`    | 100%  | 100%  |
| Global          | 98.5% | 100%  |

---

## Variáveis de Ambiente

Definidas em `.env`, validadas por Zod em `src/env.ts`. Se variável obrigatória estiver ausente, o app lança erro explícito no console.

| Variável                     | Obrigatória | Uso                                          |
| ---------------------------- | ----------- | -------------------------------------------- |
| `VITE_ADMIN_USER`            | Sim         | Login do painel admin                        |
| `VITE_ADMIN_PASS`            | Sim         | Senha do painel admin                        |
| `VITE_GEMINI_API_KEY`        | Não         | Chave da API Gemini (fallback ativo sem ela) |
| `VITE_WHATSAPP_NUMBER`       | Não         | Número para botão de CSP                     |
| `VITE_DIAGNOSTIC_TIMEOUT_MS` | Não         | Timeout do diagnóstico (default: 30000ms)    |

---

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`): roda em todo push/PR para qualquer branch.

Steps: `checkout` → `node setup (v20)` → `npm ci` → `npm run lint` → `npx tsc --noEmit` → `npm run test`

---

## O Que Não Existe (Intencionalmente)

- **Backend/API REST**: sem servidor. Dados em `localStorage`.
- **Autenticação JWT**: admin usa credenciais via `.env`.
- **ExternalDiagnosticAdapter**: o ponto de extensão existe (interface `IDiagnosticService`), mas a implementação que chama serviço externo não foi criada.
- **`src/services/`**: `geminiService.ts` e `storageService.ts` existem como legado mas não são consumidos por nenhuma screen — candidatos a remoção.
