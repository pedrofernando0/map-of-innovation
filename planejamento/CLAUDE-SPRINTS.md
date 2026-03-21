# CLAUDE-SPRINTS.md — Prompts de Execução por Sprint

_Atualizado: Março 2026_

> Este arquivo contém os **prompts prontos para colar na IA** de cada sprint.
> Cada prompt é autocontido: lê os documentos certos, cria a branch certa,
> executa em ordem e roda o gate de qualidade antes de encerrar.
>
> Para iniciar qualquer sprint, copie o bloco "Prompt de execução" e cole
> diretamente na conversa com a IA. Nada mais é necessário.

---

## Como usar este arquivo

1. Verifique o status atual dos sprints em `CLAUDE.md` (tabela de sprints)
2. Identifique o próximo sprint pendente
3. Copie o prompt completo do sprint desejado
4. Cole na IA e aguarde execução
5. Ao final, a IA pedirá confirmação antes de avançar

**Regra:** nunca iniciar dois sprints na mesma sessão sem aprovação explícita entre eles.

---

## Índice de Sprints

| Sprint                           | Fase     | Arquivo de referência                     | Status      |
| -------------------------------- | -------- | ----------------------------------------- | ----------- |
| S3 — Resiliência de Evento       | PRÉ-BETT | `roadmap.md` seção S3                     | ⬜ Pendente |
| S4 — Experiência Essencial (UX)  | PRÉ-BETT | `roadmap.md` + `CLAUDE-UX.md` UX-0 a UX-2 | ⬜ Pendente |
| S5 — Pico e Final                | PRÉ-BETT | `roadmap.md` + `CLAUDE-UX.md` UX-3 a UX-4 | ⬜ Pendente |
| UI-0 — Auditoria e Design Tokens | PRÉ-BETT | `CLAUDE-UI.md` seção UI-0                 | ⬜ Pendente |
| UI-1 — Acessibilidade WCAG 2.2   | PRÉ-BETT | `CLAUDE-UI.md` seção UI-1                 | ⬜ Pendente |
| S6 — Governança de Conteúdo      | PÓS-BETT | `roadmap.md` seção S6                     | ⬜ Pendente |
| S7 / UI-2 a UI-5 — Design System | PÓS-BETT | `CLAUDE-UI.md` UI-2 a UI-5                | ⬜ Pendente |
| S8 — Testes Complementares       | PÓS-BETT | `roadmap.md` seção S8                     | ⬜ Pendente |
| S9 — Features de Produto         | PÓS-BETT | `roadmap.md` seção S9                     | ⬜ Pendente |

---

## S3 — Resiliência de Evento

**Contexto:** Sprint crítico pré-Bett. O app será usado em tablet de estande com rede instável e usuários que podem fechar a tela sem avisar. Este sprint garante que nada se perde e que o app nunca fica em estado inválido.

**Arquitetura relevante:**

- `useKioskMode.ts` — reset por inatividade (já existe, precisa de aviso progressivo)
- `useDiagnostico.ts` — timeout + fallback (timeout já existe, fallback precisa ser contextualizado)
- `LocalStorageAdapter.ts` implementando `IStorageRepository` — onde persistir rascunho
- `appStore.ts` (Zustand) — estado que precisa ser serializado para rascunho
- `Splash.tsx` — onde oferecer "Continuar onde parou"
- `src/env.ts` — validação de credenciais admin via Zod

### Prompt de execução

```
Leia os seguintes arquivos antes de qualquer ação:
- planejamento/roadmap.md (seção "S3 — Resiliência de Evento")
- planejamento/arquitetura.md (completo)
- src/hooks/useKioskMode.ts
- src/hooks/useDiagnostico.ts
- src/adapters/LocalStorageAdapter.ts
- src/stores/appStore.ts
- src/screens/Splash.tsx
- src/env.ts

Crie a branch: git checkout -b feature/s3-resiliencia

Execute as tarefas abaixo em ordem. Rode o gate de qualidade ao final de cada tarefa antes de avançar para a próxima.

---

TAREFA S3-1: Persistência de rascunho

Adicione ao LocalStorageAdapter (que implementa IStorageRepository) um método de
rascunho separado do registro definitivo:
  saveDraft(state: Partial<AppStore>): void
  loadDraft(): Partial<AppStore> | null
  clearDraft(): void

O rascunho deve expirar após 4 horas (salvar timestamp junto).
Serialize apenas os campos relevantes: escola, respostas, ancora.
NÃO serialize scores ou diagnostico — esses são gerados, não preenchidos.

Em Questoes.tsx, chame saveDraft a cada resposta selecionada.
Use o IStorageRepository via useContext(AppServicesContext) — nunca importe
o adapter diretamente.

Commit: "feat(s3): draft persistence — auto-save respostas to localStorage"

Gate S3-1:
- Preencher 3 questões → fechar o app → reabrir → draft existe no localStorage
- Draft tem campo expires e é ignorado se expirado (simular com timestamp passado)
- npm run test → todos passam

---

TAREFA S3-2: "Continuar onde parou" na tela Splash

Em Splash.tsx, ao montar, verificar via IStorageRepository.loadDraft() se existe
rascunho válido (não expirado, com pelo menos escola preenchida).

Se existir:
- Mostrar um segundo botão abaixo do principal: "Continuar diagnóstico de [escola.nome] →"
- Ao clicar, restaurar o estado no appStore via setEscola/setResposta e navegar para /questoes
- Mostrar toast discreto: "Respostas restauradas — continue de onde parou"

Se não existir: Splash fica idêntico ao atual.

Commit: "feat(s3): resume flow — detect draft on Splash and offer continuation"

Gate S3-2:
- Iniciar questionário → responder 5 questões → reabrir Splash → botão "Continuar" aparece
- Clicar em "Continuar" → Questoes.tsx com respostas já marcadas
- Iniciar novo diagnóstico (botão principal) → draft é limpo com clearDraft()
- npm run test → todos passam

---

TAREFA S3-3: Aviso progressivo de kiosk

Em useKioskMode.ts, adicionar lógica de aviso antes do reset.
O hook já tem o timer de reset. Adicione:
- Estado showWarning: boolean
- Aos 30 segundos antes do reset (ex: se timeout é 10min, warning em 9min30s),
  setar showWarning = true
- Qualquer interação do usuário: showWarning = false e resetar o timer

Em AppLayout.tsx, consumir showWarning do hook e renderizar um banner
fixo no bottom da tela quando true:
  "Sessão encerrando em 30 segundos por inatividade — toque para continuar"
  Estilo: fundo escuro semitransparente, texto branco, z-index alto
  NÃO é um modal — não bloqueia a interação

Commit: "feat(s3): progressive kiosk warning 30s before session reset"

Gate S3-3:
- Simular inatividade com timeout reduzido (ex: 60s) para testar em dev
- Banner aparece 30s antes do reset
- Qualquer clique/toque → banner some e timer reinicia
- npm run test → todos passam

---

TAREFA S3-4: Fallback de diagnóstico contextualizado

Em LocalDiagnosticAdapter.ts, o FALLBACK_DIAGNOSTICO atual é genérico por nível.
Reescreva a função generateFallback para usar os scores reais:

  function generateFallback(escola: Escola, scores: Scores): string

O texto deve:
1. Mencionar o nome da escola
2. Identificar o pilar com maior score e nomeá-lo como ponto forte
3. Identificar o pilar com menor score e nomeá-lo como oportunidade prioritária
4. Manter o nível (ESSENCIAL/EXPLORADOR/INTEGRADA) como enquadramento

Estrutura do texto:
  "[Escola.nome] apresenta nível [NÍVEL] de maturidade em inovação.
  Ponto de maior consistência: [Pilar mais alto] ([score]/100).
  Maior oportunidade identificada: [Pilar mais baixo] ([score]/100).
  [Parágrafo de 2-3 frases contextualizado pelo nível]"

Os pilares estão em scores.pilares — verificar a estrutura em src/types.ts.

Commit: "feat(s3): contextualize fallback diagnostic using real pillar scores"

Gate S3-4:
- Simular timeout do diagnóstico (VITE_DIAGNOSTIC_TIMEOUT_MS=1) → fallback ativa
- Fallback menciona o nome da escola e os pilares corretos
- npm run test → atualizar testes do LocalDiagnosticAdapter para cobrir novo fallback
- Cobertura de adapters permanece >= 97%

---

TAREFA S3-5: Credenciais admin sem fallback hardcoded

Em src/env.ts, verificar se VITE_ADMIN_USER e VITE_ADMIN_PASS têm fallback
hardcoded. Se tiverem, remover.

Em Admin.tsx (ou onde o login admin é verificado), se as credenciais não
estiverem definidas (env retorna undefined/vazio), bloquear o acesso com
mensagem de configuração:
  "Painel admin não configurado. Defina VITE_ADMIN_USER e VITE_ADMIN_PASS no .env.local"

Não deve existir nenhuma credencial hardcoded no código como fallback.

Commit: "fix(s3): block admin access when env credentials are missing"

Gate S3-5:
- Renomear .env.local temporariamente → tentar acessar /admin → mensagem de configuração
- Com .env.local correto → login funciona normalmente
- grep -r "admin\|password\|senha" src/ → nenhuma credencial hardcoded
- npm run test → todos passam

---

GATE FINAL S3:
1. npm run lint && npx tsc --noEmit && npm run test → tudo passa
2. Simular o cenário completo:
   a. Preencher questionário até o bloco 3
   b. Fechar o app (simular fechando a aba)
   c. Reabrir → Splash mostra "Continuar diagnóstico de [escola]"
   d. Clicar em Continuar → questões respondidas preservadas
3. Simular inatividade → warning aparece → toque → reinicia → reset
4. Simular timeout de diagnóstico → fallback com nome da escola e pilares corretos
5. git add -A && git commit && git push origin feature/s3-resiliencia

Após gate: informe o resultado e aguarde aprovação para o próximo sprint.
```

---

## S4 — Experiência Essencial (UX)

**Contexto:** Sprint pré-Bett focado em calibração emocional e acessibilidade. O visual já está adequado. O que falta é o que o gestor escolar sente e recorda.

**Arquitetura relevante:**

- `src/screens/` — todas as telas (Splash, Cadastro, Instrucao, Ancora, Questoes, Loading)
- `src/components/ui.tsx` — Button, Badge, ProgressBar
- `src/index.css` — tokens CSS existentes (primitivos)
- `constants.ts` — strings de questões, níveis, ativações (não alterar questões)
- `CLAUDE-UX.md` — sprints UX-0 a UX-2 (mapa de jornada, microcopy, fluxo)
- `CLAUDE-UI.md` — sprints UI-0 a UI-1 (tokens, acessibilidade)

### Prompt de execução

```
Leia os seguintes arquivos antes de qualquer ação:
- planejamento/CLAUDE-UX.md (completo)
- planejamento/CLAUDE-UI.md (seções "Base Teórica", "Sprint UI-0" e "Sprint UI-1")
- planejamento/roadmap.md (seção "S4 — Experiência Essencial")
- planejamento/arquitetura.md (completo)
- src/index.css
- src/screens/Splash.tsx
- src/screens/Cadastro.tsx
- src/screens/Instrucao.tsx
- src/screens/Ancora.tsx
- src/screens/Questoes.tsx

Crie a branch: git checkout -b feature/s4-experiencia

Execute os grupos de tarefas abaixo. Cada grupo tem seu próprio gate antes de avançar.

---

GRUPO A — Documentação de jornada (sem código, executa primeiro)

Execute as tarefas UX-0.1, UX-0.2, UX-0.3 e UX-0.4 exatamente como
descritas em CLAUDE-UX.md, seção "Sprint UX-0".

Output: arquivos em docs/persona-primaria.md, docs/emotional-journey.md,
docs/microcopy-inventory.md

Gate A: os 3 arquivos existem com conteúdo completo. Apresente um resumo
dos principais achados antes de continuar.

---

GRUPO B — Design tokens semânticos e foco (UI-0.3 e UI-0.4 do CLAUDE-UI.md)

Após aprovação do Gate A, execute:
1. UI-0.3: adicionar camada semântica de tokens em src/index.css
   (usar exatamente os tokens listados na tarefa UI-0.3 do CLAUDE-UI.md)
2. UI-0.4: adicionar regra global :focus-visible e remover outline-none
   sem substituto em ui.tsx, Cadastro.tsx e Admin.tsx

Commit: "feat(s4): semantic token layer + global focus ring"

Gate B:
- grep --color-brand- src/index.css → retorna tokens
- Navegar por Cadastro apenas com teclado → foco visível em todos os campos
- npm run build → sem erros

---

GRUPO C — Acessibilidade WCAG 2.2 (UI-1 do CLAUDE-UI.md)

Execute as tarefas UI-1.2, UI-1.3, UI-1.4 e UI-1.5 do CLAUDE-UI.md:
- UI-1.2: semântica HTML (lang, h1 único, sections)
- UI-1.3: ARIA em BettAtivacoes, EixoEspectro, Ancora, Questoes
- UI-1.4: contraste (substituir text-gray-400 em texto real)
- UI-1.5: touch targets (mínimo 44px)

Commit por subtarefa conforme especificado no CLAUDE-UI.md.

Gate C:
- npm run test → todos passam
- Teste manual de teclado (documentar no commit): Tab por Cadastro → ordem lógica
- Nenhum outline-none sem :focus-visible substituto em src/

---

GRUPO D — Microcopy (UX-1 do CLAUDE-UX.md)

Execute as tarefas UX-1.1, UX-1.2, UX-1.3 e UX-1.4 do CLAUDE-UX.md:
- UX-1.1: Splash e Cadastro
- UX-1.2: Instrucao e Ancora
- UX-1.3: Questoes (não alterar texto das questões — apenas navegação e feedback)
- UX-1.4: Loading e CSP (apenas strings, não lógica)

REGRA: toda string alterada deve ter justificativa psicológica ou comportamental
no próprio commit. "Soa melhor" não é justificativa válida.

Gate D:
- grep "Obrigatório\|inválido\|incorreto" src/screens/ → zero ocorrências
- Botões de ação primária usam verbo + resultado
- npm run build → sem erros

---

GRUPO E — Fluxo e carga cognitiva (UX-2 do CLAUDE-UX.md)

Execute as tarefas UX-2.1, UX-2.2, UX-2.3 e UX-2.4 do CLAUDE-UX.md:
- UX-2.1: reorganizar Cadastro (chunking visual, ordem dos campos)
- UX-2.2: orientação temporal nas telas de transição
- UX-2.3: guia de escala na primeira questão do primeiro bloco
- UX-2.4: aviso progressivo de kiosk (use o useKioskMode já atualizado no S3)

Gate E:
- Cronometrar fluxo completo: deve estar entre 8-12 minutos
- O aviso de kiosk usa o hook existente (não duplica lógica)
- npm run lint && npx tsc --noEmit && npm run test → tudo passa

---

GATE FINAL S4:
1. npm run lint && npx tsc --noEmit && npm run test → tudo passa
2. docs/ tem os 3 arquivos de jornada preenchidos
3. Lighthouse Accessibility >= 90 (rodar: npm run preview → auditar)
4. Ler todo o fluxo em voz alta — nenhuma frase soa mecânica ou corporativa
5. git add -A && git commit && git push origin feature/s4-experiencia

Após gate: apresente o score de Lighthouse e aguarde aprovação para S5.
```

---

## S5 — Pico e Final

**Contexto:** Sprint pré-Bett. A regra pico-final de Kahneman: o usuário não lembra de 80% da experiência — lembra do momento em que viu o resultado (pico) e de como saiu (final). Retorno desproporcional de investimento aqui.

**Arquitetura relevante:**

- `src/screens/Resultado.tsx` + subcomponentes em `src/components/resultado/`
- `src/screens/CSP.tsx`
- `src/stores/appStore.ts` — scores.nivel, scores.pilares, escola, ancora
- `src/adapters/LocalDiagnosticAdapter.ts` — fallback já contextualizado (S3)
- `constants.ts` — CSP_COPY por nível
- `CLAUDE-UX.md` — sprints UX-3 e UX-4

### Prompt de execução

```
Leia os seguintes arquivos antes de qualquer ação:
- planejamento/CLAUDE-UX.md (seções "Sprint UX-3" e "Sprint UX-4" completas)
- planejamento/roadmap.md (seção "S5 — Pico e Final")
- src/screens/Resultado.tsx
- src/components/resultado/ResultadoHeader.tsx
- src/components/resultado/ResultadoPilares.tsx
- src/components/resultado/ResultadoEixos.tsx
- src/components/resultado/ResultadoDiagnostico.tsx
- src/screens/CSP.tsx
- src/stores/appStore.ts
- src/constants.ts (seção CSP_COPY)
- src/types.ts (interfaces Scores, Escola)

Se o arquivo docs/emotional-journey.md existir (criado no S4),
leia também antes de começar.

Crie a branch: git checkout -b feature/s5-pico-final

ATENÇÃO: este sprint mexe na tela de maior risco (Resultado).
Liste TODAS as mudanças planejadas antes de editar qualquer arquivo.
Aguarde confirmação explícita antes de iniciar.

---

TAREFA S5-1: Hierarquia de entrada do Resultado (UX-3.1)

Em ResultadoHeader.tsx, redesenhe a hierarquia visual conforme UX-3.1:
1. Nome da escola — elemento de maior peso visual (font-size display)
2. Cidade/UF/Rede — subtítulo
3. Badge do nível + score — lado a lado, abaixo do nome

O componente recebe escola e scores via props vindas de Resultado.tsx.
Usar os tokens semânticos de --text-display e --text-heading (definidos no S4).
NÃO alterar o layout geral da tela — apenas a hierarquia interna do header.

Commit: "ux(s5-1): escola name as primary visual element in ResultadoHeader"

Gate S5-1:
- Mostrar a tela para alguém que não conhece o app
- Primeira coisa que dizem ao ver: deve mencionar o nome da escola, não o score
- npm run test → todos passam (atualizar snapshot se necessário)

---

TAREFA S5-2: Destaque do pilar mais forte (UX-3.2)

Em ResultadoPilares.tsx, antes do grid de barras de pilar, adicionar:
  ✦ Ponto de maior consistência: [Nome do Pilar Mais Alto] — [score]/100

Calcular o pilar mais alto com: Object.entries(scores.pilares).sort((a,b) => b[1]-a[1])[0]
O nome do pilar vem da chave de scores.pilares — verificar o mapeamento em types.ts.

Estilo: texto destacado, mas menor que o nome da escola. Usar ícone Sparkle
do lucide-react (já instalado) ou caractere ✦ com aria-hidden="true".

Commit: "ux(s5-2): add pillar strength highlight before comparison grid"

Gate S5-2:
- Scores com pilares diferentes → elemento mostra o pilar correto
- Scores com pilares iguais → mostrar qualquer um (comportamento defensivo)
- npm run test → todos passam

---

TAREFA S5-3: Comparação âncora vs. real (UX-3.3)

Em ResultadoEixos.tsx ou em Resultado.tsx, adicionar um elemento de comparação
quando ancora !== null:

  Se ancora === scores.nivel:
    "Sua leitura institucional está alinhada ao diagnóstico."
  Se ancora > scores.nivel (auto-percepção mais alta que o real):
    "O diagnóstico identificou mais oportunidades do que a estimativa inicial
    — um ponto de partida valioso para a conversa."
  Se ancora < scores.nivel (auto-percepção mais baixa que o real):
    "Sua escola está mais avançada do que a estimativa inicial. Há práticas
    consolidadas que merecem ser reconhecidas."

ancora vem de appStore via useAppStore(). O mapeamento de número para nível
está em NIVEL_RULES em constants.ts — usar para comparar com scores.nivel.

Tom: neutro-positivo em todos os casos. Nunca "sua percepção estava errada".

Commit: "ux(s5-3): anchor vs. real comparison with calibrated tone"

Gate S5-3:
- Testar com ancora === nivel, ancora > nivel, ancora < nivel, ancora === null
- Elemento desaparece quando ancora é null (não preenchida)
- npm run test → todos passam

---

TAREFA S5-4: Velocidade do typewriter e headers do diagnóstico (UX-3.4)

Em ResultadoDiagnostico.tsx (ou onde o efeito de typewriter está implementado):
1. Ajustar velocidade de 2ms/char para 10ms/char
2. Avaliar se os headers markdown (### Síntese, ### Pontos Fortes) servem
   ao usuário leigo. Se forem headings literais no texto, substituir por
   **negrito** no corpo do parágrafo (ex: "**Pontos Fortes:** ...")

ATENÇÃO: não altere a lógica de geração do diagnóstico — apenas o ritmo
de exibição e a formatação de apresentação.

Commit: "ux(s5-4): adjust typewriter speed and diagnostic formatting for readability"

Gate S5-4:
- Cronometrar diagnóstico médio: deve estar entre 20-35 segundos
- npm run test → todos passam

---

TAREFA S5-5: Tela CSP — personalização por nível e closure emocional (UX-4)

Execute as tarefas UX-4.1, UX-4.2 e UX-4.3 do CLAUDE-UX.md:

UX-4.1: personalizar subtítulo dos steps por nível (scores.nivel vem do store)
UX-4.2: criar componente src/components/ClosingStatement.tsx
  Props: { nivel: 'ESSENCIAL' | 'EXPLORADOR' | 'INTEGRADA' }
  Renderiza: reconhecimento + expectativa concreta + frase de encerramento
  Renderizar em CSP.tsx acima do botão final
UX-4.3: botão contextual por modo kiosk + fade de saída antes do reset

O modo kiosk é detectado via useKioskMode — usar o valor existente.
O fade de saída: antes de chamar resetToSplash(), aplicar animação
de opacity 0 na tela (Motion, 300ms easeOut).

Commit por subtarefa conforme UX-4 do CLAUDE-UX.md.

Gate S5-5:
- Os 3 níveis de ClosingStatement renderizam corretamente
- Botão "Liberar para a próxima escola" aparece em modo kiosk
- Fade antes do reset funciona e dura ~300ms
- npm run test → todos passam

---

GATE FINAL S5:
1. npm run lint && npx tsc --noEmit && npm run test → tudo passa
2. Simulação do pico: mostrar Resultado para colega — primeira frase deve
   mencionar nome da escola ou nível, não layout
3. Simulação do final: mostrar CSP para colega após fluxo completo —
   deve sentir "informado e com próximo passo claro", não "empurrado para vendas"
4. git add -A && git commit && git push origin feature/s5-pico-final

Após gate: apresente as observações das simulações e aguarde aprovação.
```

---

## UI-0 e UI-1 — Tokens e Acessibilidade

> Se S4 foi executado, UI-0 e UI-1 já estão cobertos dentro dele.
> Use este prompt apenas se quiser executar os sprints de UI de forma independente.

### Prompt de execução

```
Leia os seguintes arquivos antes de qualquer ação:
- planejamento/CLAUDE-UI.md (seções "Base Teórica", "Sprint UI-0", "Sprint UI-1")
- planejamento/arquitetura.md
- src/index.css
- src/components/ui.tsx

Crie a branch: git checkout -b feature/ui01-tokens-a11y

Execute as tarefas UI-0.3, UI-0.4 (tokens e foco) e depois UI-1.1 a UI-1.5
(jest-axe, semântica, ARIA, contraste, touch targets) exatamente como
descritas no CLAUDE-UI.md.

Gate: npm run test → zero violations axe de severity crítica ou grave.
Lighthouse Accessibility >= 95.

git push origin feature/ui01-tokens-a11y
Aguarde aprovação antes de continuar para UI-2.
```

---

## S6 — Governança de Conteúdo

**Contexto:** Sprint pós-Bett. Hoje, quando a equipe pedagógica quer ajustar uma questão, a mudança passa pelo desenvolvedor. Isso não é sustentável.

**Arquitetura relevante:**

- `src/constants.ts` — onde todo o conteúdo editorial está hoje
- `src/domain/scoring/calculateScores.ts` — usa QUESTOES e NIVEL_RULES
- `src/env.ts` — padrão de validação Zod que será replicado para JSONs

### Prompt de execução

```
Leia os seguintes arquivos antes de qualquer ação:
- planejamento/roadmap.md (seção "S6 — Governança de Conteúdo")
- planejamento/arquitetura.md
- src/constants.ts (completo)
- src/domain/scoring/calculateScores.ts
- src/env.ts (para ver o padrão de validação Zod)

Crie a branch: git checkout -b feature/s6-conteudo

---

TAREFA S6-1: Extrair questoes.json

Criar src/content/questoes.json com todas as questões de QUESTOES em constants.ts.
Criar src/content/schemas/questoes.schema.ts com schema Zod para validar o JSON.
Schema mínimo obrigatório: id, texto, bloco, opcoes (array de {label, valor}).

Importar e validar em constants.ts:
  import questoesRaw from './content/questoes.json'
  const QUESTOES = QuestoesSchema.parse(questoesRaw)

Se o parse falhar, o build deve falhar com mensagem clara.
Commit: "feat(s6): extract QUESTOES to questoes.json with Zod schema"

Gate S6-1:
- Remover um campo obrigatório do JSON → npm run build → erro Zod explícito
- npm run test → todos passam (calculateScores usa QUESTOES — validar)

---

TAREFA S6-2: Extrair niveis.json e fallbacks.json

Mesma lógica para NIVEL_RULES → src/content/niveis.json
Mesma lógica para FALLBACK_DIAGNOSTICO → src/content/fallbacks.json
Schema Zod para cada um.

Commit: "feat(s6): extract NIVEL_RULES and fallbacks to content JSONs"

---

TAREFA S6-3: Extrair ativacoes-bett.json e csp-copy.json

ATIVACOES_BETT → src/content/ativacoes-bett.json
CSP_COPY → src/content/csp-copy.json

Commit: "feat(s6): extract Bett activations and CSP copy to content JSONs"

---

TAREFA S6-4: Criar content-guide.md

Criar docs/content-guide.md explicando como editar cada arquivo JSON
sem tocar em código. Estrutura:
- O que é cada arquivo
- Campos obrigatórios e opcionais
- Como adicionar uma nova questão
- O que acontece se um campo obrigatório for removido (build falha)
- Como testar depois de editar (npm run build)

Commit: "docs(s6): content guide for non-developer editing"

---

GATE FINAL S6:
1. npm run lint && npx tsc --noEmit && npm run test → tudo passa
2. grep -r "QUESTOES\s*=" src/constants.ts → retorna apenas re-export do JSON
3. Editar questoes.json adicionando campo inexistente → build não quebra
   Remover campo obrigatório → build quebra com erro Zod legível
4. git add -A && git commit && git push origin feature/s6-conteudo

Após gate: aguarde aprovação antes do próximo sprint.
```

---

## S7 — Design System Completo (UI-2 a UI-5)

**Contexto:** Sprint pós-Bett. Adicionar Motion, shadcn, Phosphor, Sonner, tipografia fluida, dark mode, responsividade.

**Pré-requisito:** UI-0 e UI-1 devem estar concluídos (tokens semânticos e foco ring).

### Prompt de execução

```
Leia os seguintes arquivos antes de qualquer ação:
- planejamento/CLAUDE-UI.md (completo — seções UI-2 a UI-5)
- planejamento/arquitetura.md
- src/components/ui.tsx
- src/lib/transitions.ts
- src/index.css

Crie a branch: git checkout -b feature/s7-design-system

Execute os sprints UI-2, UI-3, UI-4 e UI-5 do CLAUDE-UI.md em ordem,
com o gate de qualidade de cada sprint antes de avançar para o próximo.

Regras globais:
- Toda animação nova: prefers-reduced-motion via useMotionVariants
- Nenhum valor hex literal em componente novo — apenas tokens ou classes Tailwind
- Cada instalação de nova dependência: listar e aguardar confirmação

Instalar nesta ordem (aguardar confirmação entre cada instalação):
1. @phosphor-icons/react (UI-3)
2. sonner (UI-4)
3. shadcn: npx shadcn@latest init (UI-3) — aguardar confirmação antes

Gate global:
- Lighthouse Performance >= 90
- Lighthouse Accessibility >= 95
- CLS <= 0.1
- prefers-reduced-motion: todas as animações desativam corretamente
- npm run test → todos passam

git push origin feature/s7-design-system
```

---

## S8 — Testes Complementares

**Contexto:** A cobertura já está em 98.5%. Este sprint é de consolidação qualitativa — testes axe e testes dos novos componentes dos sprints S4/S5.

### Prompt de execução

```
Leia os seguintes arquivos antes de qualquer ação:
- planejamento/roadmap.md (seção "S8 — Testes Complementares")
- planejamento/arquitetura.md (seção "Cobertura de Testes")
- src/__tests__/ (todos os arquivos existentes)

Crie a branch: git checkout -b feature/s8-testes

---

TAREFA S8-1: Instalar jest-axe e criar testes de acessibilidade

npm install -D jest-axe @types/jest-axe

Criar src/__tests__/a11y.test.tsx.
Testar com axe: Splash, Cadastro, Instrucao, Ancora, Resultado (com mock
de appStore), CSP.

Cada teste deve passar com zero violations de severity "critical" ou "serious".
Se houver violations, elas se tornam bugs a corrigir antes do commit.

Commit: "test(s8): axe accessibility tests for all screens"

---

TAREFA S8-2: Testes dos componentes dos sprints S4/S5

Testar:
- ClosingStatement: renderiza corretamente para os 3 níveis
- Comparação âncora vs. real: os 4 casos (null, igual, maior, menor)
- Destaque do pilar mais forte: pilar correto é identificado
- Aviso de kiosk: aparece e desaparece corretamente

Commit: "test(s8): tests for S4/S5 components"

---

GATE FINAL S8:
1. npm run test:coverage → cobertura global permanece >= 95% statements
2. Suite completa roda em < 30s
3. Zero violations axe críticas ou graves
4. git add -A && git commit && git push origin feature/s8-testes
```

---

## S9 — Features de Produto

**Contexto:** Sprint pós-Bett com múltiplos ciclos. Depende de decisão de backend (ver `decisoes-tecnologia.md`). Iniciar apenas após S9a estar decidido.

**Pré-requisito:** decisão sobre backend (Supabase, Firebase ou outro) documentada em `decisoes-tecnologia.md`.

### Prompt de execução — S9a (Backend)

```
Antes de iniciar, confirme:
1. Qual backend foi escolhido? (Supabase / Firebase / outro)
2. As credenciais estão disponíveis?

Leia os seguintes arquivos:
- planejamento/roadmap.md (seção "S9 — Features de Produto")
- planejamento/arquitetura.md (seção "Arquitetura Hexagonal" e "Ponto de extensão")
- planejamento/decisoes-tecnologia.md (seção do backend escolhido)
- src/ports/IStorageRepository.ts
- src/adapters/LocalStorageAdapter.ts
- src/contexts/AppServicesContext.tsx

Crie a branch: git checkout -b feature/s9a-backend

TAREFA S9a-1: Criar adapter para o backend escolhido

Criar src/adapters/[Backend]StorageAdapter.ts implementando IStorageRepository.
As assinaturas dos métodos devem ser idênticas ao LocalStorageAdapter:
  save(record: IndexRecord): Promise<void>
  getIndex(): Promise<IndexRecord[]>
  getRecord(id: string): Promise<AppState | null>
  saveDraft(state: Partial<AppStore>): void  [se S3 foi executado]
  loadDraft(): Partial<AppStore> | null
  clearDraft(): void

Commit: "feat(s9a): [Backend]StorageAdapter implementing IStorageRepository"

TAREFA S9a-2: Trocar adapter em AppServicesContext

Em src/contexts/AppServicesContext.tsx, trocar:
  new LocalStorageAdapter()
por:
  new [Backend]StorageAdapter()

Zero mudança nas screens ou hooks — esse é o contrato da arquitetura hexagonal.

Commit: "feat(s9a): switch storage adapter to [backend] in AppServicesContext"

TAREFA S9a-3: Adicionar variáveis de ambiente do backend

Em src/env.ts, adicionar as variáveis necessárias (URL, chave API, etc.)
com validação Zod. Documentar em planejamento/como_rodar.md.

Commit: "feat(s9a): add [backend] env vars with Zod validation"

GATE S9a:
1. npm run test → todos passam (adapters com mocks do backend)
2. Fluxo completo → dados chegam no painel do backend
3. Admin.tsx → tabela carrega dados do backend
4. git push origin feature/s9a-backend
```

### Prompt de execução — S9d (IA externa)

```
Antes de iniciar, confirme:
1. Qual API de IA foi escolhida? (OpenAI / Gemini / Claude / Maritaca)
2. A chave de API está disponível?

Leia os seguintes arquivos:
- planejamento/decisoes-tecnologia.md (seção de IA)
- src/ports/IDiagnosticService.ts
- src/adapters/LocalDiagnosticAdapter.ts
- src/hooks/useDiagnostico.ts
- src/contexts/AppServicesContext.tsx
- src/env.ts

Crie a branch: git checkout -b feature/s9d-ia-externa

TAREFA: Criar ExternalDiagnosticAdapter

Criar src/adapters/ExternalDiagnosticAdapter.ts implementando IDiagnosticService:
  generate(escola: Escola, scores: Scores, ancora: number | null): Promise<string>

O prompt para a IA deve incluir:
- Nome da escola, segmento, cidade, rede
- Scores por pilar (valores numéricos)
- Nível calculado (ESSENCIAL/EXPLORADOR/INTEGRADA)
- Âncora (auto-percepção) se disponível
- Instrução de tom: diagnóstico de maturidade educacional, neutro-positivo,
  português brasileiro, 3-4 parágrafos, sem jargão técnico excessivo

Adicionar VITE_[API]_KEY em src/env.ts (opcional — fallback ativo sem ela).
Em AppServicesContext.tsx, usar ExternalDiagnosticAdapter se a chave existir,
LocalDiagnosticAdapter como fallback.

Commit: "feat(s9d): ExternalDiagnosticAdapter with [API] + local fallback"

GATE S9d:
1. Com chave válida → diagnóstico personalizado gerado
2. Com chave inválida ou sem internet → fallback local ativa (sem erro visível)
3. Timeout de 25s ainda funciona (useDiagnostico usa Promise.race)
4. npm run test → todos passam (mock da API nos testes)
5. git push origin feature/s9d-ia-externa
```

---

## Referência: Arquitetura e Pontos de Extensão

Resumo dos pontos de extensão que cada sprint deve usar, não contornar:

| O que fazer           | Como fazer (correto)                                      | O que NÃO fazer                                   |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------- |
| Persistir dados       | Via `IStorageRepository` no contexto                      | Importar `LocalStorageAdapter` direto nas screens |
| Gerar diagnóstico     | Via `IDiagnosticService` no contexto                      | Chamar API diretamente na screen                  |
| Acessar estado global | Via `useAppStore()`                                       | Prop drilling ou useState local duplicado         |
| Variáveis de ambiente | Via `src/env.ts` (Zod validado)                           | `import.meta.env.VITE_*` direto nos componentes   |
| Animações             | Via `useMotionVariants` (respeita prefers-reduced-motion) | CSS transition sem fallback                       |
| Tokens de cor/espaço  | Via CSS vars `--color-brand-*`, `--space-*`               | Valores hex ou px literais                        |
