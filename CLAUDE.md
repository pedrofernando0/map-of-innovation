# CLAUDE.md — Mapa de Inovação Educacional

> Este arquivo é lido automaticamente pelo Claude Code ao iniciar uma sessão.
> Ele orquestra a execução dos sprints de refatoração definidos em `roadmap-arquitetura-mapa-inovacao.md`.

---

## Como usar

Ao iniciar o Claude Code neste projeto, diga:

```
Leia o CLAUDE.md e o roadmap-arquitetura-mapa-inovacao.md e me diga qual sprint está pendente.
```

O Claude Code irá identificar o sprint atual, executá-lo e **perguntar sua confirmação** antes de avançar.

---

## Regras de Operação (Claude Code deve seguir sempre)

1. **Um sprint por vez.** Nunca iniciar o próximo sem aprovação explícita (`"pode continuar"` ou `"próximo"`).
2. **Branch antes de tudo.** Toda tarefa começa com `git checkout -b feature/sX-nome`. Commit ao final de cada tarefa numerada, não do sprint inteiro.
3. **Checar antes de alterar.** Antes de editar qualquer arquivo, ler o conteúdo atual. Nunca sobrescrever sem leitura prévia.
4. **Não alterar UI.** Modificações em `src/screens/` e `src/components/` são apenas extrações ou encapsulamentos. A saída visual ao usuário não muda.
5. **Nenhum arquivo de serviço externo.** Não criar ou modificar lógica que chame APIs de IA (Gemini, OpenAI, etc.). O contrato `IDiagnosticService` deve ser criado, mas a implementação que chama serviço externo fica vazia ou com placeholder — nunca preenchida.
6. **Rodar verificações antes de perguntar sobre o próximo sprint.** Veja a seção "Gate de Qualidade" de cada sprint abaixo.

---

## Estado dos Sprints

Atualize esta seção manualmente (ou peça ao Claude Code para atualizar) após cada sprint concluído.

| Sprint | Status | Branch final | Data |
|--------|--------|-------------|------|
| Sprint 0 — Fundação e Qualidade | ✅ Concluído | main | 2026-03-20 |
| Sprint 1 — Isolamento do Domínio | ✅ Concluído | main | 2026-03-20 |
| Sprint 2 — Estado e Roteamento React | ✅ Concluído | main | 2026-03-20 |
| Sprint 3 — Princípios SOLID | ✅ Concluído | feature/s3-solid | 2026-03-20 |
| Sprint 4 — TDD e Cobertura | ✅ Concluído | feature/s4-tdd-coverage | 2026-03-20 |
| Sprint 5 — Infraestrutura Contínua | ✅ Concluído | feature/s5-infra | 2026-03-20 |

Legenda: ⬜ Pendente · 🔄 Em andamento · ✅ Concluído · ⚠️ Bloqueado

---

## Sprint 0 — Fundação e Qualidade

### Prompt de entrada (cole no Claude Code para iniciar)

```
Inicie o Sprint 0 do roadmap. Leia o roadmap-arquitetura-mapa-inovacao.md,
seção "Sprint 0", e execute cada tarefa na ordem. Crie a branch
feature/s0-linting antes de começar. Ao terminar todas as tarefas,
rode o gate de qualidade e me mostre o resultado antes de qualquer outra coisa.
```

### Tarefas (Claude Code executa nesta ordem)

**0.1 — ESLint + Prettier**
```
Tarefa 0.1: instale eslint, @typescript-eslint/eslint-plugin,
@typescript-eslint/parser, eslint-plugin-react-hooks, eslint-plugin-import,
prettier, eslint-config-prettier. Crie .eslintrc.cjs e .prettierrc na raiz.
Regras obrigatórias: no-explicit-any, react-hooks/exhaustive-deps, no-console.
Commit: "feat(s0): configure eslint + prettier"
```

**0.2 — Husky + Lint-staged**
```
Tarefa 0.2: instale husky e lint-staged. Configure pre-commit hook para
rodar: tsc --noEmit && lint-staged. Configure lint-staged para rodar
eslint --fix e prettier --write nos arquivos .ts e .tsx staged.
Commit: "feat(s0): add husky pre-commit hook"
```

**0.3 — Configurar Vitest**
```
Tarefa 0.3: instale vitest, @vitest/coverage-v8, @testing-library/react,
@testing-library/user-event, @testing-library/jest-dom, jsdom.
Crie vitest.config.ts com environment jsdom, alias @/ apontando para ./,
e threshold de cobertura de 60% em lines para src/domain/ e src/services/.
Adicione scripts "test" e "test:coverage" no package.json.
Commit: "feat(s0): configure vitest + testing library"
```

**0.4 — Testes de calculateScores**
```
Tarefa 0.4: crie src/constants.test.ts com testes para calculateScores.
Testes obrigatórios:
- todas as respostas = 4 → total >= 90 e nivel = 'INTEGRADA'
- todas as respostas = 1 → total <= 10 e nivel = 'ESSENCIAL'
- respostas mistas → ponderação 80/20 pedagógico/tecnológico
- sem nenhuma resposta → total = 0
- nivel = 'INTEGRADA' quando total >= 71
- nivel = 'EXPLORADOR' quando total está entre 41 e 70
- nivel = 'ESSENCIAL' quando total < 41
Não mova calculateScores ainda, só teste onde ela está.
Commit: "test(s0): add calculateScores unit tests"
```

**0.5 — CI básico**
```
Tarefa 0.5: crie .github/workflows/ci.yml com job que roda em push e PR
para qualquer branch. Steps: checkout, node setup (versão do .nvmrc ou 20),
npm ci, npm run lint, npx tsc --noEmit, npm run test.
Commit: "feat(s0): add GitHub Actions CI pipeline"
```

### Gate de Qualidade — Sprint 0

Claude Code deve rodar e mostrar o output de cada item:

```
Gate Sprint 0:
1. npm run lint             → deve retornar zero erros
2. npx tsc --noEmit         → deve retornar zero erros
3. npm run test             → todos os testes devem passar
4. npm run test:coverage    → cobertura de calculateScores >= 60%
```

### Pergunta de transição

Após mostrar o resultado do gate:

> **Sprint 0 concluído.**
> Resultados do gate: [resultados acima]
>
> Deseja prosseguir para o **Sprint 1 — Isolamento do Domínio** (Arquitetura Hexagonal)?
> Responda `sim` para continuar ou descreva qualquer ajuste antes de avançar.

---

## Sprint 1 — Isolamento do Domínio

### Prompt de entrada

```
Inicie o Sprint 1 do roadmap. Leia a seção "Sprint 1" do
roadmap-arquitetura-mapa-inovacao.md. Crie a branch feature/s1-domain
antes de começar. Execute as tarefas 1.1 a 1.5 em ordem.
Ao terminar, rode o gate de qualidade.
```

### Tarefas

**1.1 — Extrair calculateScores para o domínio**
```
Tarefa 1.1: crie src/domain/scoring/calculateScores.ts e mova a função
calculateScores de src/constants.ts para lá. Em constants.ts, mantenha
um reexport temporário com comentário @deprecated.
Mova também o test file: src/domain/scoring/calculateScores.test.ts.
Atualize todos os imports que apontavam para constants.ts#calculateScores.
Rode npm run test para confirmar que nada quebrou.
Commit: "refactor(s1): extract calculateScores to src/domain/scoring"
```

**1.2 — Criar IStorageRepository**
```
Tarefa 1.2: crie src/ports/IStorageRepository.ts com a interface:
  save(state: AppState): string
  getIndex(): IndexRecord[]
  getRecord(id: string): StoredRecord | null
Importe os tipos de src/types.ts. Nenhuma implementação neste arquivo.
Commit: "feat(s1): add IStorageRepository port"
```

**1.3 — Criar LocalStorageAdapter**
```
Tarefa 1.3: crie src/adapters/LocalStorageAdapter.ts implementando
IStorageRepository. O conteúdo é idêntico às funções de storageService.ts,
mas como métodos de uma classe que implementa a interface.
Não apague storageService.ts ainda.
Commit: "feat(s1): add LocalStorageAdapter implementing IStorageRepository"
```

**1.4 — Criar IDiagnosticService**
```
Tarefa 1.4: crie src/ports/IDiagnosticService.ts com a interface:
  generate(escola: Escola, scores: Scores, ancora: number | null): Promise<string>
Crie src/adapters/LocalDiagnosticAdapter.ts que implementa IDiagnosticService.
O conteúdo de LocalDiagnosticAdapter é a função gerarDiagnostico de
geminiService.ts, adaptada como método generate(). NÃO adicione nenhuma
chamada a API externa. NÃO modifique geminiService.ts.
Commit: "feat(s1): add IDiagnosticService port + LocalDiagnosticAdapter"
```

**1.5 — Injetar adaptadores via contexto**
```
Tarefa 1.5: crie src/contexts/AppServicesContext.tsx que provê via React
Context uma instância de IStorageRepository e IDiagnosticService.
Em App.tsx, instancie LocalStorageAdapter e LocalDiagnosticAdapter,
envolva o app com AppServicesContext.Provider.
Em Admin.tsx, substitua os imports diretos de storageService.ts por
useContext(AppServicesContext). Rode o app e confirme que Admin
continua funcionando. Commit: "refactor(s1): inject adapters via context"
```

### Gate de Qualidade — Sprint 1

```
Gate Sprint 1:
1. npm run lint                    → zero erros
2. npx tsc --noEmit                → zero erros
3. npm run test                    → todos os testes passam
4. grep -r "from.*storageService"  src/screens/ → resultado vazio (zero imports diretos)
5. grep -r "from.*storageService"  src/components/ → resultado vazio
6. Verificação manual: abrir /admin no browser, autenticar, ver tabela
```

### Pergunta de transição

> **Sprint 1 concluído.**
> Resultados do gate: [resultados]
>
> Deseja prosseguir para o **Sprint 2 — Estado e Roteamento React**?
> Este sprint é o de maior impacto no `App.tsx`. Responda `sim` para continuar.

---

## Sprint 2 — Estado e Roteamento React

### Prompt de entrada

```
Inicie o Sprint 2 do roadmap. Leia a seção "Sprint 2".
Crie a branch feature/s2-state-routing.
ATENÇÃO: este sprint mexe em App.tsx e em todas as screens.
Antes de qualquer edição, leia o arquivo atual e liste o que vai mudar.
Só comece a modificar após eu confirmar: "pode prosseguir".
```

> **Pausa obrigatória:** Claude Code deve listar as mudanças planejadas e aguardar confirmação antes de editar qualquer arquivo neste sprint.

### Tarefas

**2.1 — React Router v7**
```
Tarefa 2.1: instale react-router-dom@7. Crie src/router.tsx com as rotas:
/ (Splash), /cadastro, /instrucao, /ancora, /questoes,
/loading, /resultado, /csp, /admin.
Em App.tsx, substitua o switch manual de screen por <RouterProvider>.
Cada screen passa a usar useNavigate() para navegação.
O progresso do Header deve continuar funcionando — use um hook
useProgress ou derive do pathname.
Commit: "feat(s2): migrate to React Router v7"
```

**2.2 — Estado global com Zustand**
```
Tarefa 2.2: instale zustand. Crie src/stores/appStore.ts com o store
contendo: escola, respostas, ancora, scores, diagnostico e as actions
setEscola, setResposta, setAncora, setScores, setDiagnostico, reset.
Substitua todos os useState de AppState em App.tsx pelo store.
Remova os props onChange/onNext/onBack das screens que agora usam
useNavigate() + useAppStore() diretamente.
Commit: "feat(s2): add Zustand store, remove prop drilling"
```

**2.3 — Hook useKioskMode**
```
Tarefa 2.3: crie src/hooks/useKioskMode.ts. O hook recebe
{ isActive: boolean, onReset: () => void, timeoutMs?: number }.
Internamente gerencia os event listeners e o timer.
Em App.tsx, substitua o useEffect de kiosk pelo hook.
Commit: "refactor(s2): extract kiosk logic to useKioskMode hook"
```

**2.4 — Hook useQuestionnaire**
```
Tarefa 2.4: crie src/hooks/useQuestionnaire.ts que encapsula:
blocoAtual, setBlocoAtual, blocos (array fixo), todasRespondidas,
handleNext, handleBack. Questoes.tsx passa a usar o hook e fica
responsável apenas por renderizar.
Commit: "refactor(s2): extract pagination to useQuestionnaire hook"
```

**2.5 — Componentização do formulário**
```
Tarefa 2.5: instale react-hook-form zod @hookform/resolvers.
Crie src/components/forms/Input.tsx e Select.tsx com props
{ label, error, ...htmlProps }. Crie src/schemas/cadastroSchema.ts
com validação Zod (nome obrigatório, email válido, segmentos >= 1).
Refatore Cadastro.tsx para usar useForm + zodResolver.
Remova o estado manual de errors.
Commit: "refactor(s2): Cadastro form with React Hook Form + Zod"
```

### Gate de Qualidade — Sprint 2

```
Gate Sprint 2:
1. npm run lint                 → zero erros
2. npx tsc --noEmit             → zero erros
3. npm run test                 → todos passam
4. App.tsx tem menos de 60 linhas? → contar: wc -l src/App.tsx
5. Verificação manual (liste como concluídas):
   [ ] Fluxo completo Splash → CSP sem erros de console
   [ ] Refresh na rota /resultado mantém a tela (não joga para /)
   [ ] Formulário de Cadastro: submit sem nome exibe erro inline
   [ ] Formulário de Cadastro: submit com dados válidos navega
   [ ] Modo Kiosk: aguardar ou simular inatividade → reset para /
   [ ] /admin → login → tabela → exportar CSV
```

### Pergunta de transição

> **Sprint 2 concluído.**
> Resultados do gate: [resultados]
>
> Deseja prosseguir para o **Sprint 3 — Princípios SOLID**?
> Este sprint é o menos arriscado: só decomposição de componentes e limpeza.
> Responda `sim` para continuar.

---

## Sprint 3 — Princípios SOLID

### Prompt de entrada

```
Inicie o Sprint 3 do roadmap. Leia a seção "Sprint 3".
Crie a branch feature/s3-solid.
Este sprint é cirúrgico: decomposição de Resultado.tsx,
refatoração do OCP em calculateScores e remoção de dead code.
```

### Tarefas

**3.1 — SRP em Resultado.tsx**
```
Tarefa 3.1: crie os subcomponentes:
- src/components/resultado/ResultadoHeader.tsx   (badge + escola + score)
- src/components/resultado/ResultadoPilares.tsx  (4 barras horizontais)
- src/components/resultado/ResultadoEixos.tsx    (EixoEspectro + CategoryIndicator)
- src/components/resultado/ResultadoDiagnostico.tsx (TypingMarkdown + botões)
Resultado.tsx passa a importar e compor esses 4 componentes.
Resultado visual: idêntico. Rode o app e confirme.
Commit: "refactor(s3): decompose Resultado.tsx following SRP"
```

**3.2 — OCP em calculateScores**
```
Tarefa 3.2: em src/domain/scoring/calculateScores.ts, substitua o
bloco if/else de classificação de nível por:

const NIVEL_RULES: Array<{ min: number; nivel: Scores['nivel'] }> = [
  { min: 71, nivel: 'INTEGRADA' },
  { min: 41, nivel: 'EXPLORADOR' },
  { min: 0,  nivel: 'ESSENCIAL' },
];

const resolveNivel = (total: number) =>
  NIVEL_RULES.find(r => total >= r.min)?.nivel ?? 'ESSENCIAL';

Todos os testes existentes devem continuar passando sem modificação.
Commit: "refactor(s3): apply OCP to nivel classification"
```

**3.3 — Remover dead code**
```
Tarefa 3.3:
- Remover o reexport @deprecated de calculateScores em constants.ts
- Remover QUESTOES_TECNOLOGICAS (Set declarado mas não utilizado)
- Mover FALLBACK_DIAGNOSTICO de constants.ts para LocalDiagnosticAdapter.ts
  (é implementação, não constante pública)
- Rodar: npx ts-prune (ou equivalente) para listar exports não utilizados
Commit: "chore(s3): remove dead code and consolidate fallback diagnostico"
```

### Gate de Qualidade — Sprint 3

```
Gate Sprint 3:
1. npm run lint              → zero erros
2. npx tsc --noEmit          → zero erros
3. npm run test              → todos passam (nenhum teste modificado)
4. wc -l src/screens/Resultado.tsx → deve ser < 80 linhas
5. grep "QUESTOES_TECNOLOGICAS" src/ -r → resultado vazio
6. Verificação visual: tela de Resultado idêntica ao antes da sprint
   (pilares, eixos, diagnóstico, BettAtivacoes, botões de impressão)
```

### Pergunta de transição

> **Sprint 3 concluído.**
> Resultados do gate: [resultados]
>
> Deseja prosseguir para o **Sprint 4 — TDD e Cobertura de Testes**?
> Este sprint só adiciona testes, sem alterar código de produção.
> Responda `sim` para continuar.

---

## Sprint 4 — TDD e Cobertura de Testes

### Prompt de entrada

```
Inicie o Sprint 4 do roadmap. Leia a seção "Sprint 4".
Crie a branch feature/s4-tdd-coverage.
Este sprint é somente adição de testes. Zero alteração em arquivos
que não sejam *.test.ts ou *.test.tsx.
```

### Tarefas

**4.1 — Cobertura completa de calculateScores**
```
Tarefa 4.1: expanda src/domain/scoring/calculateScores.test.ts para
cobrir 100% das linhas: todos os pilares individualmente, eixos
pedagógico e tecnológico separados, ponderação 80/20 verificada
numericamente, todos os 3 níveis de classificação.
```

**4.2 — Testes do LocalStorageAdapter**
```
Tarefa 4.2: crie src/adapters/LocalStorageAdapter.test.ts.
Use vi.stubGlobal('localStorage', ...) para mockar o storage.
Teste save() (cria registro + atualiza index), getIndex() com
storage vazio e populado, getRecord() com ID válido e inválido,
e comportamento quando setItem lança exceção (storage cheio).
```

**4.3 — Testes de integração do fluxo principal**
```
Tarefa 4.3: crie src/__tests__/flow.test.tsx.
Renderize <App /> com MemoryRouter, simule:
- Preenchimento do formulário Cadastro com dados válidos
- Clique em "Continuar"
- Verificação de que a rota mudou para /instrucao
Não teste o output do diagnóstico (vem de serviço externo mockado).
Mock do IDiagnosticService retornando string fixa.
```

**4.4 — Testes de componentes críticos**
```
Tarefa 4.4: crie testes para:
- EixoEspectro: marcador fica entre 4% e 96% com score 0 e 100
- CategoryIndicator: card correto fica ativo para cada nível
- Badge: não renderiza quando nivel === ''
- ProgressBar: style.width reflete a prop progress numericamente
```

**4.5 — Snapshots de telas estáticas**
```
Tarefa 4.5: crie snapshots para Splash, Instrucao e CSP
(telas sem estado complexo). Use toMatchSnapshot() do Vitest.
```

### Gate de Qualidade — Sprint 4

```
Gate Sprint 4:
1. npm run test:coverage → relatório completo
2. src/domain/         coverage lines: 100%
3. src/adapters/       coverage lines: >= 80%
4. src/hooks/          coverage lines: >= 80%
5. Cobertura global    coverage lines: >= 70%
6. npm run test        todos passam, tempo total < 30s
```

### Pergunta de transição

> **Sprint 4 concluído.**
> Resultados do gate: [resultados de cobertura]
>
> Deseja prosseguir para o **Sprint 5 — Infraestrutura Contínua** (sprint final)?
> Responda `sim` para continuar.

---

## Sprint 5 — Infraestrutura Contínua

### Prompt de entrada

```
Inicie o Sprint 5 do roadmap. Leia a seção "Sprint 5".
Crie a branch feature/s5-infra.
Este sprint fecha o ciclo: ErrorBoundary, tratamento de erro do
serviço de diagnóstico, env vars tipadas e meta tags.
```

### Tarefas

**5.1 — Error Boundary global**
```
Tarefa 5.1: crie src/components/ErrorBoundary.tsx como class component
(React exige class para error boundaries). Exibe mensagem amigável
e botão "Recarregar" (window.location.reload()). Envolva o <main>
em App.tsx com <ErrorBoundary>.
Commit: "feat(s5): add global ErrorBoundary"
```

**5.2 — Timeout e fallback no diagnóstico**
```
Tarefa 5.2: em src/hooks/useDiagnostico.ts (criar se não existir),
implemente: chamar IDiagnosticService.generate() com Promise.race
contra um timeout configurável via env var VITE_DIAGNOSTIC_TIMEOUT_MS
(default 30000). Se timeout ou erro, usar FALLBACK_DIAGNOSTICO por nível.
O Loading screen deve parar de girar mesmo se o serviço falhar.
Commit: "feat(s5): add timeout + fallback to diagnostic service"
```

**5.3 — Env vars tipadas**
```
Tarefa 5.3: crie src/env.ts que exporta um objeto validado com Zod:
  ADMIN_USER, ADMIN_PASS, WHATSAPP_NUMBER, DIAGNOSTIC_TIMEOUT_MS.
Substitua todos os import.meta.env.VITE_* espalhados no código por
imports de src/env.ts. Se uma var obrigatória estiver ausente,
o app lança erro claro no console com a var faltante.
Commit: "feat(s5): typed env vars via Zod"
```

**5.4 — Meta tags e HTML**
```
Tarefa 5.4: atualize index.html:
  <title>Mapa de Inovação Educacional — Geekie</title>
  <meta name="description" content="...">
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta name="theme-color" content="#ff1547">
Commit: "feat(s5): update meta tags in index.html"
```

### Gate Final — Sprint 5 (e do projeto)

```
Gate Sprint 5 — Verificação Final do Projeto:

QUALIDADE DE CÓDIGO
1. npm run lint              → zero erros
2. npx tsc --noEmit          → zero erros
3. npm run test:coverage     → cobertura global >= 70%
4. npm run build             → build sem warnings

RESILIÊNCIA
5. Simular localStorage bloqueado:
   → no console do browser: Object.defineProperty(window, 'localStorage',
     { get: () => { throw new Error('blocked') } })
   → completar o questionário → app não crasha, só não salva

6. Simular timeout do diagnóstico:
   → VITE_DIAGNOSTIC_TIMEOUT_MS=100 npm run dev
   → completar questionário → fallback aparece no lugar do diagnóstico

ACESSIBILIDADE E PERFORMANCE
7. Lighthouse (npm run preview → auditar localhost:4173):
   Performance >= 90
   Accessibility >= 95
   Best Practices >= 90
```

### Mensagem de encerramento

> **Sprint 5 concluído. Roadmap de refatoração concluído.**
>
> Resumo do que foi implementado:
> - Arquitetura Hexagonal com domínio isolado em `src/domain/`
> - Portas (`IStorageRepository`, `IDiagnosticService`) desacoplam infraestrutura
> - Estado global com Zustand, roteamento com React Router v7
> - Formulários com React Hook Form + Zod
> - Cobertura de testes >= 70% com Vitest
> - CI/CD via GitHub Actions
> - ErrorBoundary + fallbacks de resiliência
>
> Para integrar o serviço externo de diagnóstico: implemente `IDiagnosticService`
> em um novo arquivo `src/adapters/ExternalDiagnosticAdapter.ts` e troque
> a instância no `AppServicesContext`. Zero mudança nas screens.

---

## Comandos úteis de referência

```bash
# Ver estado atual do roadmap
cat CLAUDE.md | grep -A 10 "Estado dos Sprints"

# Rodar todos os checks de qualidade de uma vez
npm run lint && npx tsc --noEmit && npm run test:coverage

# Ver cobertura por arquivo
npm run test:coverage -- --reporter=text

# Verificar imports diretos de storageService (deve ser vazio após Sprint 1)
grep -r "from.*storageService" src/screens/ src/components/

# Contar linhas do App.tsx (deve ser < 60 após Sprint 2)
wc -l src/App.tsx
```
