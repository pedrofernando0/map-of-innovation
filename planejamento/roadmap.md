# Roadmap — Mapa de Inovação Educacional

_Atualizado: Março 2026_

> **Fonte de verdade única** sobre o que fazer, em que ordem e por quê.
> Os playbooks de execução passo a passo estão em `CLAUDE-UI.md` e `CLAUDE-UX.md`.
> A arquitetura técnica atual está em `arquitetura.md`.

---

## Contexto do Produto

O MIE é uma SPA local (sem backend, sem nuvem) usada em evento presencial — Bett Brasil — em modo kiosk num tablet. Um gestor escolar passa 8–12 minutos preenchendo o questionário e recebe um diagnóstico de maturidade em inovação educacional gerado por IA. Dados em `localStorage`. Painel admin exporta CSV.

**O critério que organiza tudo:** o que precisa estar pronto antes do evento, e o que pode esperar. Não existe sprint que não responda a essa pergunta.

---

## Mapa de Dependências

```
PRÉ-BETT ─────────────────────────────────────────────────────
   │
   ├── S1: Fundação Técnica          ✅ Concluído
   │   └── S2: Domínio e Contratos   ✅ Concluído
   │
   ├── S3: Resiliência de Evento     ← urgente, pode rodar paralelo a S4
   │
   ├── S4: Experiência Essencial     ← depende de S1 (linting/ts ok)
   │   └── S5: Pico e Final          ← depende de S4
   │
PÓS-BETT ─────────────────────────────────────────────────────
   │
   ├── S6: Governança de Conteúdo    ← depende de S2 (domínio isolado)
   ├── S7: Design System Completo    ← depende de S4 (tokens semânticos)
   ├── S8: Testes Complementares     ← pode rodar a qualquer momento
   └── S9: Features de Produto       ← depende de backend (S9a primeiro)
```

---

## Tabela de Prioridade

| Sprint                      | Fase | Impacto     | Esforço        | Risco se pular                   |
| --------------------------- | ---- | ----------- | -------------- | -------------------------------- |
| S1 — Fundação Técnica       | PRÉ  | Alto        | Baixo          | ✅ Concluído                     |
| S2 — Domínio e Contratos    | PRÉ  | Alto        | Médio          | ✅ Concluído                     |
| S3 — Resiliência de Evento  | PRÉ  | **Crítico** | Médio          | App quebra no estande            |
| S4 — Experiência Essencial  | PRÉ  | Alto        | Médio          | Experiência fria, inacessível    |
| S5 — Pico e Final           | PRÉ  | **Crítico** | Baixo          | Memória negativa da Geekie       |
| S6 — Governança de Conteúdo | PÓS  | Alto        | Médio          | Dev como gatekeeper pedagógico   |
| S7 — Design System Completo | PÓS  | Médio       | Alto           | UI não evolui com consistência   |
| S8 — Testes Complementares  | PÓS  | Baixo       | Baixo          | Suite já em 98.5% — risco mínimo |
| S9 — Features de Produto    | PÓS  | Alto        | **Muito alto** | Depende de backend               |

---

## PRÉ-BETT

### S1 — Fundação Técnica ✅ Concluído

_2026-03-20_

ESLint + `@typescript-eslint` + `eslint-plugin-react-hooks`. Prettier. Husky + lint-staged: pre-commit roda `tsc --noEmit` + lint. Vitest + React Testing Library + jsdom. Testes de `calculateScores` (ponderação 80/20, três níveis, edge cases). GitHub Actions CI: lint + tsc + vitest em cada push.

---

### S2 — Domínio e Contratos ✅ Concluído

_2026-03-20_

`calculateScores` movida para `src/domain/scoring/`. Portas `IStorageRepository` e `IDiagnosticService` criadas. `LocalStorageAdapter` e `LocalDiagnosticAdapter` implementados. `AppServicesContext` provê os adaptadores via React Context. `Admin.tsx` consome via contexto — sem import direto de `storageService.ts`. React Router v7, Zustand, React Hook Form + Zod. `App.tsx` com 50 linhas. `Resultado.tsx` decomposto em 4 subcomponentes (SRP). `ErrorBoundary` global. `useDiagnostico` com timeout + fallback. `src/env.ts` com variáveis validadas por Zod. Cobertura de testes: 98.5% statements, 100% lines.

---

### S3 — Resiliência de Evento

**Duração estimada:** 2–3 dias | **Branch:** `feature/s3-resiliencia`

Este sprint tem o maior risco de parecer desnecessário e ser o que faz falta no dia. Um tablet de estande tem rede instável, bateria que acaba e usuários que desligam a tela sem avisar.

**Persistência de rascunho**
Quando o usuário fecha o app no meio do questionário (bloco 2, por exemplo), os dados devem sobreviver. Auto-save do `AppState` parcial no `localStorage` a cada resposta. Na abertura, verificar se existe rascunho e oferecer "Continuar onde parou" na Splash. Expirar o rascunho após 4 horas.

**Fallback do diagnóstico contextualizado**
O `FALLBACK_DIAGNOSTICO` atual em `constants.ts` é genérico demais. Reescrever para usar `scores.pilares` e produzir texto contextualizado mesmo sem IA — identificando o pilar mais forte e o mais fraco da escola específica. O timeout configurável via `VITE_DIAGNOSTIC_TIMEOUT_MS` (default 25000ms) já existe no `useDiagnostico`.

**Aviso de kiosk progressivo**
Antes do reset por inatividade, exibir aviso discreto 30 segundos antes: "Sessão encerrando em 30s — toque para continuar." O reset atual é abrupto. Usar o `useKioskMode` existente.

**Segurança mínima de credenciais admin**
Se `VITE_ADMIN_USER`/`VITE_ADMIN_PASS` não estiverem no `.env.local`, o login do admin deve estar bloqueado com mensagem de configuração — não acessível com credenciais hardcoded. Revisar e remover defaults expostos em `vite.config.ts`.

**Critérios de saída:**

- Fechar o app no bloco 3 e reabrir → opção "Continuar" aparece
- Simular perda de rede → fallback com texto contextualizado em até 25s
- Simular erro de renderização → `ErrorBoundary` captura e exibe recuperação
- Credenciais admin sem `.env.local` → login bloqueado

---

### S4 — Experiência Essencial

**Duração estimada:** 3–4 dias | **Branch:** `feature/s4-experiencia`
**Playbooks:** `CLAUDE-UI.md` (UI-0 a UI-1) + `CLAUDE-UX.md` (UX-0 a UX-2)

O visual já está adequado. O que falta é calibração emocional — o que o gestor escolar sente e lembra.

**Mapa de jornada (1 dia — documentação)**
Criar `docs/emotional-journey.md` com estado emocional esperado por tela, maior risco atual e intervenção planejada. Criar `docs/persona-primaria.md` com o perfil do usuário Bett. Esses documentos orientam o restante do sprint — sem eles, as mudanças são intuição; com eles, são hipóteses testáveis.

**Microcopy cirúrgico**
Botões de ação primária: nomear o resultado, não a ação.

- `"Continuar →"` → `"Ir para o questionário →"`
- `"Ver Resultado Final"` → `"Ver o diagnóstico da minha escola"`
- `"Encerrar diagnóstico"` → `"Liberar para a próxima escola"` (modo kiosk)

Mensagens de erro em Cadastro: explicar o motivo, não apenas marcar como obrigatório.

- `"Obrigatório"` → `"Necessário para personalizar o diagnóstico"`

Tela Ancora: linha-resumo de 5–7 palavras antes da descrição longa de cada nível.

- `"Explorador — Mudanças em andamento, ainda inconsistentes"`

Tela Loading: mensagens que comunicam processo rigoroso, não processamento genérico.

- `"Identificando pontos fortes e oportunidades…"`

**Acessibilidade — piso mínimo WCAG 2.2 AA**

- `<html lang="pt-BR">` em `index.html`
- Focus ring visível: regra global `:focus-visible` em `index.css`. Remover todos os `outline-none` sem substituto.
- `aria-expanded` + `aria-controls` no accordion de `BettAtivacoes.tsx`
- `role="radiogroup"` + `role="radio"` nas opções de resposta das questões; `aria-labelledby` apontando para o texto da questão
- `role="radio"` + `aria-checked` + `role="radiogroup"` nos cards de Ancora
- Contraste: verificar `text-gray-400` em texto real (não placeholder). Substituir por `text-gray-600` onde necessário.
- `role="alert"` nas mensagens de erro do form Admin

**Tokens semânticos**
Adicionar camada semântica em `index.css` sem remover os primitivos existentes: `--color-brand-primary`, `--color-feedback-error`, `--color-text-secondary`, `--color-focus-ring`, escala de spacing 8pt (`--space-1` a `--space-16`), tokens de motion (`--duration-base: 280ms`, `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`). Esses tokens são a base para S7 — não precisam ser consumidos agora, só precisam existir.

**Critérios de saída:**

- Lighthouse Accessibility >= 90 (90 é o piso pré-evento; 95 é meta do S7)
- Navegação completa por teclado sem elemento invisível
- Leitura em voz alta de todo o fluxo: nenhuma frase soa mecânica
- `docs/emotional-journey.md` preenchido

---

### S5 — Pico e Final

**Duração estimada:** 2–3 dias | **Branch:** `feature/s5-pico-final`
**Playbook:** `CLAUDE-UX.md` (UX-3 a UX-4)

A Regra Pico-Final de Kahneman é o fundamento: o usuário não vai lembrar de 80% da experiência — vai lembrar do momento em que viu o resultado da escola dele (pico) e de como saiu da conversa (final). Investir aqui tem retorno desproporcional na percepção da marca Geekie.

**Tela de Resultado — o pico**

O gestor escolar que preenche o questionário está em posição vulnerável: acabou de avaliar a escola que dirige. O resultado pode confirmar ou contradizer a auto-percepção. O design emocional para este momento exige reconhecimento antes de avaliação.

- **Hierarquia de entrada:** o nome da escola deve ser o elemento de maior peso visual, antes do score e do badge. Sem mudar o layout geral.
- **Destaque do pilar mais forte:** `"✦ Maior consistência: [Pilar X] — [score]/100"` antes do grid de barras. Cria âncora positiva antes da comparação e reduz reação defensiva ao resultado.
- **Comparação âncora vs. real** quando `ancora !== null`: elemento visual conciso com tom neutro-positivo em todos os casos:
  - Âncora == nível real: `"Sua leitura institucional está alinhada ao diagnóstico."`
  - Âncora > nível real: `"O diagnóstico identificou mais oportunidades do que a estimativa inicial — um ponto de partida valioso para a conversa."`
  - Âncora < nível real: `"Sua escola está mais avançada do que a estimativa inicial. Há práticas consolidadas que merecem ser reconhecidas."`
- **Velocidade do typewriter:** de 2ms/char para 8–12ms/char. Ainda rápido, mas perceptível como processo em andamento. Testar em tablet físico.
- **Headers markdown:** avaliar se `### Síntese`, `### Pontos Fortes` etc. servem ao usuário leigo ou criam distância clínica. Substituir por negrito corrido se necessário.

**Tela CSP — o final**

Uma experiência sem closure emocional deixa o usuário suspenso. A tela CSP atual cumpre função de CTA mas não cria o "ponto final" da frase.

- **Título varia por nível** com linguagem não-vendedora:
  - `ESSENCIAL: "Há um caminho claro a partir daqui"`
  - `EXPLORADOR: "O diagnóstico aponta onde focar"`
  - `INTEGRADA: "Sua escola já lidera — o próximo passo é expandir"`
- **Componente `<ClosingStatement nivel={scores.nivel} />`** antes do botão final. Contém: reconhecimento do esforço + o que acontece concretamente depois + frase que o usuário carrega:
  - `"Você dedicou tempo para olhar com honestidade para a sua escola."`
  - `"Nos próximos dias, um pedagogo da Geekie vai ler este diagnóstico antes de entrar em contato."`
  - Por nível: `ESSENCIAL: "Toda jornada começa com um mapa. Você tem o seu."` / `EXPLORADOR: "O caminho está aberto. A próxima etapa é sistematizar."` / `INTEGRADA: "Você já chegou longe. O próximo passo é ir mais fundo."`
- **Botão de encerramento contextual:**
  - Modo kiosk: `"Liberar para a próxima escola"` (contextualiza o reset como ato intencional)
  - Uso geral: `"Concluir diagnóstico"`
- **Fade de saída** antes do reset para Splash (300ms, easeOut). O ponto final da frase, não um corte brusco.

**Critérios de saída:**

- Mostrar a tela de Resultado para alguém de fora do projeto. Primeira frase que diz ao ver a tela: deve mencionar a escola ou o nível — não o layout.
- A tela CSP varia por nível.
- Fade de saída implementado e suave.

---

## PÓS-BETT

Os sprints abaixo são importantes mas não urgentes para o evento. Não existe ordem absoluta entre eles — dependem de disponibilidade e contexto.

---

### S6 — Governança de Conteúdo

**Duração estimada:** 3–5 dias | **Branch:** `feature/s6-conteudo`

Hoje, quando a equipe pedagógica precisa ajustar uma questão do instrumento, uma descrição de nível, um texto de ativação da Bett, ou um fallback de diagnóstico, a mudança passa pelo desenvolvedor e pelo versionamento de código. Isso não é sustentável para um produto pedagógico que evolui.

**O que faz:**

- Extrair todo conteúdo editorial de `constants.ts` para `src/content/`: `questoes.json`, `niveis.json`, `ativacoes-bett.json`, `fallbacks.json`, `csp-copy.json`
- Os arquivos JSON têm schema TypeScript validado por Zod na importação. Se um campo obrigatório estiver ausente, o build falha com mensagem clara.
- `constants.ts` passa a re-exportar os dados tipados dos JSONs — compatibilidade mantida, internamente organizada.
- `docs/content-guide.md`: como editar cada arquivo sem tocar em código.

**Resultado:** a equipe pedagógica edita `questoes.json` no VS Code, faz commit, o app reflete sem tocar em lógica. O desenvolvedor não é mais gatekeeper de conteúdo pedagógico.

---

### S7 — Design System Completo

**Duração estimada:** 4–6 dias | **Branch:** `feature/s7-design-system`
**Playbook:** `CLAUDE-UI.md` (UI-2 a UI-5)

**O que faz:**

- Hook `useMotionVariants` com `prefers-reduced-motion`: variantes `fadeUp`, `fadeIn`, `stagger`, `scaleIn`
- Microinteração nos botões via Motion (`whileHover`, `whileTap`)
- Animação stagger nas questões ao trocar de bloco (cascata de 60ms entre cards)
- Barras de pilar animadas com `animate={{ width }}` e delay por índice
- shadcn/ui via Radix: `Tooltip` (substituir implementação manual em `EixoEspectro.tsx`) e `Dialog` (substituir `alert()` em `Admin.tsx`)
- Phosphor Icons com hierarquia de peso semântico (bold/regular/light/fill)
- Sonner para toast notifications (feedback de save, erro de storage)
- Indicador de progresso interno por bloco de questões (dots animados)
- `SkeletonRow.tsx` no Admin (preparação para migração futura para API)
- Tipografia fluida com `clamp()` nos headings principais
- Carregamento de fontes otimizado: substituir `@import` CSS por `preconnect` + `preload` no `index.html`
- Dark mode básico via `prefers-color-scheme` usando os tokens semânticos do S4
- Responsividade validada em 375px (viewport do evento)
- Lighthouse Accessibility >= 95 (meta final após S4 com >= 90)

---

### S8 — Testes Complementares

**Duração estimada:** 1–2 dias | **Branch:** `feature/s8-testes`

A cobertura global já está em 98.5% statements / 100% lines. Este sprint é de consolidação qualitativa, não de quantidade.

**O que faz:**

- Instalar `jest-axe`. Criar `src/__tests__/a11y.test.tsx` com testes axe para todas as telas
- Testes dos componentes criados nos sprints S4 e S5 (`ClosingStatement`, destaque de pilar, comparação âncora vs. real)
- Verificar que a suite completa continua abaixo de 30s após as adições

---

### S9 — Features de Produto

**Duração estimada:** contínuo (múltiplos ciclos) | **Pré-requisito:** backend (S9a)

**S9a — Backend e Migração de Storage**

- API REST (Express): `POST /api/responses`, `GET /api/responses`, `GET /api/responses/:id`
- Banco de dados: SQLite (dev) / Firestore ou Supabase (produção)
- `src/adapters/ApiStorageAdapter.ts` implementando `IStorageRepository` — trocar instância em `AppServicesContext.tsx`
- Autenticação admin com JWT. Tela de login com sessão persistente.
- Rate limiting, CORS, validação de input, headers de segurança

**S9b — Exportação e Compartilhamento**

- Exportar PDF do resultado (react-pdf ou html2canvas + jsPDF)
- Link compartilhável: `/resultado/:id` com dados persistidos no backend
- Filtros no Admin: por nível (Essencial/Explorador/Integrada), cidade, estado, período
- Exportar relatório CSV com filtros aplicados

**S9c — Analytics e Insights**

- Dashboard Admin com gráficos de tendência (diagnósticos por semana/mês)
- Benchmarking anonimizado por rede/região
- Heatmap geográfico por estado (Recharts já instalado)
- Relatório agregado PDF/CSV por rede de escolas

**S9d — Diagnóstico Completo e Engajamento**

- Questionário com 40+ questões + seletor de versão (Rápida/Completa)
- IA com histórico da escola e benchmarks regionais
- Plano de ação com timeline 30/60/90 dias
- Re-diagnóstico com comparativo de evolução
- Email pós-diagnóstico (SendGrid ou Resend)
- Página pública de resultado por escola
- Selo digital de maturidade exportável (PNG/SVG)

---

## O Que Foi Descartado e Por Quê

**Analytics/telemetria (agora):** sem backend, sem dados estruturados. Fica para S9.

**Internacionalização (i18n):** conteúdo especificamente brasileiro (BNCC, contexto escolar nacional). Sem indicação de necessidade.

**PWA / instalação offline:** o app já roda local. Complexidade de service worker sem benefício claro para o contexto atual.

**Performance em hardware antigo:** testar no tablet físico antes da Bett como checklist operacional, não como sprint de desenvolvimento.

**Storybook/docsite:** projeto solo. O código bem estruturado (S2 já concluído) é a documentação.

---

## Relação com os Outros Documentos

| Documento        | Papel                                                                           |
| ---------------- | ------------------------------------------------------------------------------- |
| `CLAUDE-UI.md`   | Playbook passo a passo para S4 (tokens/a11y) e S7 (motion, componentes, polish) |
| `CLAUDE-UX.md`   | Playbook passo a passo para S4 (microcopy/fluxo) e S5 (pico e final)            |
| `arquitetura.md` | Arquitetura técnica atual do projeto                                            |
| `pendencias.md`  | Checklist executável de todos os itens pendentes, por tema                      |
| `como_rodar.md`  | Setup local, scripts, variáveis de ambiente                                     |
