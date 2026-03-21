# CLAUDE-UI-RATIONALE.md — Rationale de Decisões de UI

> ⚠️ **ESTE É UM ARQUIVO DE REFERÊNCIA (leitura profunda).**
>
> Para **executar um sprint de UI**, abra `CLAUDE-SPRINTS.md` e copie o bloco de execução.
>
> Este arquivo contém a rationale técnica, descobertas de pesquisa e princípios que
> fundamentam as decisões de UI. Use para entender **por quê** as escolhas foram feitas.
>
> Fundamentação: pesquisa de mercado conduzida em março de 2026 sobre WCAG 2.2,
> Motion v12, Radix UI / shadcn, design tokens, sistemas de ícones, princípios de
> carga cognitiva (Nielsen/Norman Group) e benchmarks de performance (Lighthouse).

---

## Pontos de Arquitetura Relevantes para os Sprints de UI

Antes de executar qualquer sprint, a IA deve saber onde cada coisa vive:

| O que alterar         | Onde fica                                                         | Regra                                                                 |
| --------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| Tokens CSS            | `src/index.css` bloco `@theme`                                    | Sempre adicionar — nunca remover primitivos existentes                |
| Componentes de UI     | `src/components/ui.tsx`                                           | Encapsular — a saída visual não muda sem aprovação                    |
| Animações             | `motion/react` + `src/hooks/useMotionVariants.ts` (criar no UI-2) | Sempre com `prefers-reduced-motion`                                   |
| Ícones novos          | `@phosphor-icons/react` (instalar no UI-3)                        | Peso semântico: bold=ação, regular=info, fill=ativo                   |
| Toasts                | `sonner` (instalar no UI-4)                                       | Via `src/hooks/useToast.ts` — não chamar `toast.*` direto nas screens |
| Primitivos acessíveis | `shadcn/ui` sobre Radix (instalar no UI-3)                        | Componentes copiados para o repo — não são dependência runtime        |
| Testes de a11y        | `jest-axe` (instalar no UI-1)                                     | Zero violations críticas ou graves antes do commit                    |

---

## Base Teórica — Decisões de Biblioteca e Princípio

Esta seção justifica cada escolha técnica. O Claude Code deve lê-la antes de
executar qualquer sprint.

### Animação: Motion (ex-Framer Motion)

O projeto já usa `motion/react` (v12+), que é o nome atual da biblioteca. A distinção
importa: `framer-motion` virou `motion` em 2024. O import correto é
`import { motion, AnimatePresence } from 'motion/react'`. Qualquer snippet que use
`from 'framer-motion'` está desatualizado.

**Por que Motion e não GSAP aqui:** Motion roda animações nativamente via Web
Animations API + ScrollTimeline, atingindo 120fps sem JavaScript no thread principal.
GSAP é superior para timelines complexas e SVG morphing. Para transições de tela,
microinterações de botão e estados de feedback — o caso deste app — Motion é a
escolha certa. GSAP só seria indicado em sequências de scroll de alto impacto (ex: uma
landing page de Bett com scroll-driven storytelling).

**Regras de animação baseadas em evidência (NN/Group + Material Motion):**

| Contexto                      | Curva                                    | Duração        |
| ----------------------------- | ---------------------------------------- | -------------- |
| Elemento entrando na viewport | `easeOut` (desacelera ao chegar)         | 280–400ms      |
| Elemento saindo               | `easeIn` (acelera ao sair)               | 180–220ms      |
| Transição de tela             | `[0.22, 1, 0.36, 1]` (custom ease)       | 260–300ms      |
| Microinteração de botão       | `spring { stiffness: 400, damping: 30 }` | physics        |
| Lista com stagger             | `easeOut` + `delay: index * 60ms`        | 300ms por item |

**`prefers-reduced-motion` é obrigatório.** Animações que não respeitam esta
preferência violam WCAG 2.2 critério 2.3.3 (AAA) e causam desconforto físico em
usuários com desordens vestibulares.

### Primitivos de Componente: Radix UI via shadcn

O stack atual (`ui.tsx`) tem componentes de zero: `Button`, `Badge`, `ProgressBar`.
São corretos para o que fazem. O problema aparece em componentes interativos
complexos: modais, tooltips, dropdowns, accordions. Implementar estes manualmente
implica regredir em acessibilidade (foco preso, ESC não fecha, ARIA incorreto).

**Decisão:** shadcn/ui funciona como gerador de código (não é uma dependência em
runtime). Os componentes são copiados para o repo e possuem código-fonte visível e
editável. Sob o capô, usam Radix UI para comportamento (ARIA, focus trap, keyboard
navigation) e Tailwind para visual. Como o projeto já usa Tailwind v4, a integração
é direta.

**Quando usar Radix direto vs shadcn:** Radix puro é melhor quando o componente
precisa de estilização completamente customizada que conflita com os defaults do
shadcn. Para este projeto (brand Geekie já definida em CSS vars), shadcn sobre Radix
é o caminho mais rápido.

### Ícones: Phosphor + Lucide como fallback

Lucide é o default do projeto. Em 2026, Lucide tornou-se tão ubíquo que interfaces
idênticas emergem de projetos distintos. Para um produto de marca forte como o MIE
(cores Geekie, tipografia Mulish/Baloo 2), os ícones devem ter personalidade.

**Phosphor Icons** (`@phosphor-icons/react`) oferece 6 pesos por ícone (thin, light,
regular, bold, fill, duotone). Isso permite criar hierarquia visual sem trocar de
biblioteca: ícones de ação em `bold`, decorativos em `light`, estados ativos em
`fill`. Tree-shakeable, tipado, ~2KB per icon.

**Regra de uso:** Lucide permanece para ícones já em uso (`lucide-react` já instalado).
Phosphor entra nos componentes novos criados nestes sprints. A consistência visual
dentro de cada tela é mais importante que uniformidade cross-library.

### Design Tokens: Semântica sobre Primitiva

O `index.css` atual tem tokens primitivos corretos (`--color-geekie-cereja: #ff1547`).
Falta a camada semântica: tokens que expressam intenção, não valor.

**Estrutura de dois níveis:**

```
Primitivo:   --color-red-500: #ff1547
Semântico:   --color-brand-primary: var(--color-red-500)
             --color-action-default: var(--color-red-500)
             --color-feedback-error: var(--color-red-500)
```

Isso permite que a cor do erro e a cor da marca sejam iguais agora mas divergam no
futuro sem tocar nos componentes. No atual `index.css`, a cor cereja é usada para
tudo — marca, botões, erros, foco — sem distinção semântica.

**Grid de 8pt:** todo espaçamento (padding, margin, gap, height de elementos) deve
ser múltiplo de 8px (ou 4px como meia-unidade). Isso cria ritmo visual previsível
e elimina valores arbitrários como `py-3.5` ou `mt-[18px]`. Tailwind v4 com
`@theme` permite declarar isso como token de spacing.

### Acessibilidade: WCAG 2.2 como piso mínimo

WCAG 2.2 (W3C Recommendation, outubro 2023) adiciona 9 critérios sobre WCAG 2.1.
Os mais impactantes para este app:

**2.4.11 Focus Appearance (AA novo):** o indicador de foco deve ter área mínima
equivalente a um perímetro de 2px CSS ao redor do componente, com contraste mínimo
de 3:1 entre os estados com e sem foco. O atual `outline-none` nos inputs viola isto.

**2.5.3 Target Size Minimum (AA novo):** alvos interativos devem ter mínimo de
24x24px CSS. Botões pequenos em mobile provavelmente já atendem, mas ícones
clicáveis sem área de toque explícita podem não atender.

**1.4.3 Contraste de texto (AA, existente):** mínimo 4.5:1 para texto normal, 3:1
para texto grande (18px regular ou 14px bold). O texto cinza atual (`text-gray-500`)
sobre branco pode estar abaixo dependendo do tamanho.

**Ferramentas obrigatórias:** `jest-axe` para testes automatizados, axe DevTools
para auditoria manual, Lighthouse para relatório geral.

### Princípios de UX: Carga Cognitiva e Heurísticas de Nielsen

Os 10 heurísticas de Nielsen são o framework mais validado empiricamente para
avaliação de usabilidade. Para este app em contexto de evento (Bett Brasil), as mais
críticas:

**H1 — Visibilidade do status do sistema:** o usuário deve saber onde está no fluxo
em todo momento. A progress bar já existe. Falta: confirmação de resposta selecionada
com feedback háptico/visual imediato, indicador de bloco atual mais proeminente.

**H5 — Prevenção de erros:** o submit do questionário não deve ser possível sem todas
as respostas. O botão já é `disabled`, mas o feedback visual do "por que está
desabilitado" é fraco.

**H9 — Ajuda para reconhecer, diagnosticar e corrigir erros:** mensagens de erro
próximas ao campo (já existe em `Cadastro.tsx`), em linguagem positiva, sem termos
como "inválido" ou "incorreto".

**H10 — Ajuda e documentação:** a tela `Instrucao.tsx` cumpre isto. Manter.

**Skeleton vs. Spinner:** Skeleton states são superiores para conteúdo que tem
estrutura conhecida (lista de escolas no Admin, cards de pilar). Spinners são
corretos para operações de duração indefinida (geração do diagnóstico). A tela
`Loading.tsx` usa spinner, o que é correto para o diagnóstico.

---

## Estado dos Sprints de UI/UX

| Sprint                              | Status       | Branch final  | Data       |
| ----------------------------------- | ------------ | ------------- | ---------- |
| UI-0 — Auditoria e Design Tokens    | ✅ Concluído | main (via S4) | 2026-03-21 |
| UI-1 — Acessibilidade (WCAG 2.2)    | ✅ Concluído | main (via S4) | 2026-03-21 |
| UI-2 — Motion e Microinterações     | ⬜ Pendente  | —             | —          |
| UI-3 — Primitivos e Componentes     | ⬜ Pendente  | —             | —          |
| UI-4 — Feedback e Estado do Sistema | ⬜ Pendente  | —             | —          |
| UI-5 — Performance e Polish Final   | ⬜ Pendente  | —             | —          |

---

## Regras de Operação (valem para todos os sprints)

1. **Sem regressão visual.** Toda mudança preserva o layout existente. Nenhum
   componente muda de posição, tamanho ou cor sem aprovação explícita.
2. **`prefers-reduced-motion` em toda animação nova.** Sem exceção.
3. **Nenhum `outline-none` sem substituto.** Se remover o outline padrão, adicionar
   `:focus-visible` com estilo equivalente ou superior.
4. **Tokens antes de valores literais.** Nenhum valor de cor, espaçamento ou
   tipografia hard-coded em componente novo. Usar variável CSS ou classe Tailwind
   mapeada a token.
5. **Testar em mobile antes de fechar o sprint.** Viewport 375px (iPhone SE) e
   768px (tablet) são os alvos do contexto Bett.

---

## Sprint UI-0 — Auditoria e Design Tokens

### Objetivo

Estabelecer o diagnóstico atual e a infraestrutura semântica de tokens antes de
qualquer mudança visual. Ao final, o `index.css` tem duas camadas (primitiva e
semântica) e um relatório de auditoria documentado.

### Prompt de entrada

```
Inicie o Sprint UI-0. Leia o CLAUDE-UI.md, seção "Sprint UI-0".
Crie a branch feature/ui0-tokens.
Antes de escrever qualquer código, execute as auditorias listadas
nas tarefas UI-0.1 e UI-0.2 e apresente os resultados.
Aguarde confirmação para prosseguir com UI-0.3.
```

### Tarefas

**UI-0.1 — Auditoria de contraste (sem código)**

```
Tarefa UI-0.1: execute auditoria de contraste usando axe DevTools
(extensão de browser) ou lighthouse CI em cada tela do app.
Registre os resultados em docs/ui-audit.md com formato:
| Elemento | Cor texto | Cor fundo | Contraste | WCAG AA |
Foque em: text-gray-400, text-gray-500, text-gray-600 sobre branco
e texto branco sobre --color-geekie-cereja.
NÃO altere nenhum arquivo de código nesta tarefa.
```

**UI-0.2 — Auditoria de foco e target size (sem código)**

```
Tarefa UI-0.2: navegue pelo app usando APENAS teclado (Tab, Shift+Tab,
Enter, Space, Escape). Documente em docs/ui-audit.md:
- Elementos que perdem o indicador de foco visual
- Elementos com area clicável menor que 24x24px (inspecionar no DevTools)
- Ordem de tabulação ilógica
NÃO altere nenhum arquivo de código.
```

**UI-0.3 — Camada semântica de tokens**

```
Tarefa UI-0.3: em src/index.css, dentro do bloco @theme, adicione
tokens semânticos referenciando os primitivos existentes:

  /* Semânticos — Marca */
  --color-brand-primary: var(--color-geekie-cereja);
  --color-brand-secondary: var(--color-geekie-azul);
  --color-brand-accent: var(--color-geekie-laranja);

  /* Semânticos — Feedback */
  --color-feedback-error: var(--color-geekie-cereja);
  --color-feedback-success: var(--color-geekie-verde);
  --color-feedback-warning: var(--color-geekie-amarelo);
  --color-feedback-info: var(--color-geekie-azul);

  /* Semânticos — Superfície */
  --color-surface-default: var(--color-geekie-branco);
  --color-surface-subtle: #f8f8f8;
  --color-surface-brand: var(--color-geekie-cereja);

  /* Semânticos — Texto */
  --color-text-primary: var(--color-geekie-preto);
  --color-text-secondary: #4b5563;   /* gray-600, contraste 7:1 */
  --color-text-tertiary: #6b7280;    /* gray-500, contraste 4.6:1 */
  --color-text-on-brand: var(--color-geekie-branco);
  --color-text-disabled: #9ca3af;    /* gray-400 — só para estado disabled */

  /* Semânticos — Foco */
  --color-focus-ring: var(--color-geekie-cereja);
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;

  /* Spacing tokens (8pt grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Motion tokens */
  --duration-fast: 180ms;
  --duration-base: 280ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

NÃO substitua os tokens primitivos existentes. NÃO altere componentes ainda.
Commit: "feat(ui0): add semantic token layer to design system"
```

**UI-0.4 — Focus ring global**

```
Tarefa UI-0.4: adicione ao src/index.css (fora do @theme) a regra global
de focus:

  :focus-visible {
    outline: var(--focus-ring-width) solid var(--color-focus-ring);
    outline-offset: var(--focus-ring-offset);
    border-radius: 4px;
  }

Remova TODOS os `outline-none` do código que não tenham um `:focus-visible`
substituto logo abaixo. Se um input usa `outline-none` para estilização,
substitua por `focus:ring-2 focus:ring-[var(--color-focus-ring)]` do Tailwind.
Verifique: src/components/ui.tsx, src/screens/Cadastro.tsx, src/screens/Admin.tsx.
Commit: "fix(ui0): restore focus visibility across all interactive elements"
```

### Gate de Qualidade — Sprint UI-0

```
Gate UI-0:
1. docs/ui-audit.md existe e documenta os achados das tarefas 0.1 e 0.2
2. npm run build → sem erros
3. Teste de teclado: Tab pela tela Cadastro → todos os campos e botões
   têm indicador de foco visível
4. CSS vars: grep --color-brand- src/index.css → retorna tokens semânticos
5. CSS vars: grep --space- src/index.css → retorna escala de 8pt
```

### Pergunta de transição

> **Sprint UI-0 concluído.**
> O relatório de auditoria está em `docs/ui-audit.md`.
> Deseja prosseguir para o **Sprint UI-1 — Acessibilidade WCAG 2.2**?
> Este sprint corrige os problemas identificados na auditoria.

---

## Sprint UI-1 — Acessibilidade WCAG 2.2

### Objetivo

Atingir conformidade WCAG 2.2 nível AA em todas as telas. Lighthouse
Accessibility >= 95. Nenhuma violação crítica no axe.

### Prompt de entrada

```
Inicie o Sprint UI-1. Leia o CLAUDE-UI.md, seção "Sprint UI-1".
Crie a branch feature/ui1-a11y.
Instale jest-axe antes de começar:
npm install -D jest-axe @types/jest-axe
Execute as tarefas em ordem. Cada tarefa deve incluir um
teste axe que passa antes do commit.
```

### Tarefas

**UI-1.1 — Instalar jest-axe e escrever testes de baseline**

```
Tarefa UI-1.1: crie src/__tests__/a11y.test.tsx. Importe axe de jest-axe.
Escreva testes para: Splash, Cadastro (estado inicial), Instrucao, Ancora,
Resultado (com appState mockado), CSP.
Execute: npm run test — todos devem passar ou falhar com violations listadas.
Os violations listados se tornam o backlog desta sprint.
Commit: "test(ui1): add axe accessibility baseline tests"
```

**UI-1.2 — Semântica HTML**

```
Tarefa UI-1.2: audite e corrija a estrutura HTML semântica:
- index.html: adicionar lang="pt-BR" na tag <html>
- Todas as telas: verificar que há exatamente um <h1> por "página lógica"
  (cada screen = uma página para o screen reader)
- Questoes.tsx: o número da questão (div com number) deve ser <span aria-hidden>
  dentro de um elemento com role correto
- Instrucao.tsx: listas de <li> estão corretas; verificar se o <ul> tem
  contexto semântico
- Resultado.tsx: as seções (Pilares, Eixos, Diagnóstico) devem ter <section>
  com aria-labelledby apontando para o h2/h3 de cada seção
Commit: "fix(ui1): semantic HTML structure across all screens"
```

**UI-1.3 — ARIA nos componentes interativos**

```
Tarefa UI-1.3: aplique ARIA correto:
- BettAtivacoes.tsx: o botão de accordion precisa de
  aria-expanded={aberto} e aria-controls apontando para o id do conteúdo
- EixoEspectro.tsx: o tooltip (botão ⓘ) precisa de aria-label="Mais informações
  sobre [label do eixo]" e aria-describedby no conteúdo do tooltip
- Ancora.tsx: os cards de seleção precisam de role="radio" + aria-checked +
  role="radiogroup" no container
- Questoes.tsx: cada grupo de opções de resposta precisa de role="radiogroup"
  aria-labelledby apontando para o texto da questão
Commit: "fix(ui1): add ARIA attributes to interactive components"
```

**UI-1.4 — Contraste mínimo**

```
Tarefa UI-1.4: com base no docs/ui-audit.md, corrija os valores de cor
que estão abaixo de 4.5:1. Use APENAS os tokens semânticos definidos
em UI-0.3. Não introduza novos valores hex.
Substitua ocorrências de text-gray-400 em texto real (não em
placeholders ou estados disabled) por text-gray-600 ou
text-[var(--color-text-secondary)].
Commit: "fix(ui1): fix color contrast to meet WCAG AA 4.5:1"
```

**UI-1.5 — Touch targets**

```
Tarefa UI-1.5: garanta que todos os alvos interativos tenham
mínimo 44x44px de área de toque em mobile (WCAG 2.2 recomenda 24px,
mas Apple HIG recomenda 44px para conforto de uso).
Em componentes que visualmente parecem menores (ícones de tooltip,
botão "Novo preenchimento"), adicione padding invisível:
  className="p-2 -m-2"  (expande área sem mudar layout)
Commit: "fix(ui1): expand touch targets to minimum 44px"
```

### Gate de Qualidade — Sprint UI-1

```
Gate UI-1:
1. npm run test (incluindo a11y.test.tsx) → zero violations de axe
   de severity "critical" ou "serious"
2. Lighthouse Accessibility score >= 95 (rodar: npx lighthouse
   http://localhost:3000 --only-categories=accessibility)
3. Teste manual de teclado (documentar no PR):
   [ ] Tab por Splash → chega no botão "Iniciar Diagnóstico"
   [ ] Tab por Cadastro → ordem lógica, todos os campos atingíveis
   [ ] Em Ancora → Space/Enter seleciona opção, Tab avança para botão
   [ ] Em Questoes → opções de resposta navegáveis por teclado
   [ ] Modal/tooltip do ⓘ → abre com Enter, fecha com Escape
4. Verificação de screen reader (VoiceOver macOS ou NVDA Windows):
   [ ] Navegação pelo formulário anuncia labels corretamente
   [ ] Progresso do questionário é anunciado ("Bloco 2 de 4")
   [ ] Erro de validação é anunciado quando campo fica inválido
```

### Pergunta de transição

> **Sprint UI-1 concluído.**
> Lighthouse Accessibility: [score]. Violations axe: [número].
> Deseja prosseguir para o **Sprint UI-2 — Motion e Microinterações**?

---

## Sprint UI-2 — Motion e Microinterações

### Objetivo

Elevar a qualidade perceptual do app com animações funcionais (não decorativas).
Cada animação deve comunicar uma transição de estado, confirmar uma ação ou
orientar a atenção. Nenhuma animação existe apenas por estética.

### Prompt de entrada

```
Inicie o Sprint UI-2. Leia o CLAUDE-UI.md, seção "Sprint UI-2".
Leia também a seção "Base Teórica — Animação" deste arquivo.
Crie a branch feature/ui2-motion.
REGRA: toda animação nova deve ter versão reduzida dentro de um bloco
@media (prefers-reduced-motion: reduce) ou via useReducedMotion() do Motion.
```

### Tarefas

**UI-2.1 — Hook useReducedMotion e variantes globais**

```
Tarefa UI-2.1: crie src/hooks/useMotionVariants.ts.
Este hook exporta variantes pré-definidas que respeitam
prefers-reduced-motion:

  export function useMotionVariants() {
    const shouldReduce = useReducedMotion(); // de motion/react
    return {
      fadeUp: {
        initial: { opacity: 0, y: shouldReduce ? 0 : 18 },
        animate: { opacity: 1, y: 0 },
        exit:    { opacity: 0, y: shouldReduce ? 0 : -12 },
        transition: { duration: shouldReduce ? 0.01 : 0.28,
                      ease: [0.22, 1, 0.36, 1] }
      },
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit:    { opacity: 0 },
        transition: { duration: shouldReduce ? 0.01 : 0.2 }
      },
      stagger: {
        animate: { transition: { staggerChildren: shouldReduce ? 0 : 0.06 } }
      },
      scaleIn: {
        initial: { scale: shouldReduce ? 1 : 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: 'spring', stiffness: 400, damping: 30 }
      }
    };
  }

Commit: "feat(ui2): add useMotionVariants hook with reduced-motion support"
```

**UI-2.2 — Microinteração nos botões**

```
Tarefa UI-2.2: em src/components/ui.tsx, envolva o <button> do componente
Button com motion.button (ou adicione whileHover e whileTap diretamente).
Mas APENAS para o estado enabled. Disabled não anima.

  whileHover={{ y: -2, transition: { duration: 0.15 } }}
  whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}

O botão já tem `enabled:hover:-translate-y-0.5` via Tailwind. Remova
essa classe e deixe o Motion controlar o hover. Isso evita conflito
entre CSS transition e JS animation.
Commit: "feat(ui2): button microinteraction via Motion"
```

**UI-2.3 — Animação de entrada nas questões**

```
Tarefa UI-2.3: em Questoes.tsx, use as variantes `stagger` + `fadeUp`
para animar a entrada dos cards de questão quando o bloco muda.
Envolva a lista em <motion.div variants={stagger}> e cada card em
<motion.div variants={fadeUp}>.
O efeito: ao trocar de bloco, os 5 cards entram com offset de 60ms
entre si, criando uma cascata suave.
Commit: "feat(ui2): stagger animation on questionnaire block change"
```

**UI-2.4 — Barras de progresso dos pilares animadas**

```
Tarefa UI-2.4: em ResultadoPilares.tsx (criado no Sprint 3 de arquitetura,
ou em Resultado.tsx se ainda não foi refatorado), anime as barras de
progresso usando motion.div com animate={{ width: `${score}%` }}.
A animação deve iniciar com delay proporcional ao índice do pilar
(0, 80, 160, 240ms) para criar efeito de "preenchimento em cascata".
Transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
Commit: "feat(ui2): animated progress bars on Resultado screen"
```

**UI-2.5 — Feedback visual nas respostas selecionadas**

```
Tarefa UI-2.5: em Questoes.tsx, ao selecionar uma resposta, adicione
uma microanimação de confirmação no card selecionado:

  whileHover={{ scale: 1.01 }} (estados não selecionados)
  animate={{ scale: [1, 0.98, 1] }} quando recém selecionado

Implemente via key prop: quando respostas[q.id] muda, a animação de
confirmação roda uma vez.
Commit: "feat(ui2): selection confirmation microinteraction"
```

### Gate de Qualidade — Sprint UI-2

```
Gate UI-2:
1. Testar com prefers-reduced-motion: reduce ativado no SO:
   → Animações de transição de tela: instantâneas (opacity muda, sem y)
   → Barras de progresso: aparecem sem animação
   → Botões: sem whileHover visual
2. Performance: rodar Lighthouse Performance em /resultado
   → FCP (First Contentful Paint) <= 1.5s
   → TBT (Total Blocking Time) <= 200ms
   → CLS (Cumulative Layout Shift) <= 0.1
3. Inspeção visual: nenhuma animação causa layout shift (elementos
   empurrando outros durante a animação)
4. Teste em mobile (375px): animações não causam jank (frame drops)
   visíveis ao rolar a tela de resultado
```

### Pergunta de transição

> **Sprint UI-2 concluído.**
> Lighthouse Performance: [score]. CLS: [valor]. Reduced-motion: ok.
> Deseja prosseguir para o **Sprint UI-3 — Primitivos e Componentes**?

---

## Sprint UI-3 — Primitivos e Componentes

### Objetivo

Introduzir Radix UI via shadcn para componentes com comportamento interativo
complexo. Adicionar sistema de ícones com hierarquia visual usando Phosphor.
Nenhum componente existente é removido sem ser substituído.

### Prompt de entrada

```
Inicie o Sprint UI-3. Leia o CLAUDE-UI.md, seção "Sprint UI-3" e
a seção "Base Teórica — Primitivos" e "Ícones".
Crie a branch feature/ui3-primitives.
Antes de qualquer instalação, liste todas as dependências que serão
adicionadas e aguarde confirmação.
```

### Tarefas

**UI-3.1 — Instalar shadcn e Phosphor**

```
Tarefa UI-3.1:
1. Inicializar shadcn: npx shadcn@latest init
   - Style: Default
   - Base color: Neutral (vamos sobrescrever com tokens Geekie)
   - CSS variables: Yes
2. Instalar Phosphor: npm install @phosphor-icons/react
3. Em components.json (gerado pelo shadcn), verificar que o path
   de aliases aponta corretamente para @/src/components/ui

Após instalar, atualizar src/index.css para mapear as variáveis CSS
do shadcn (--primary, --secondary, etc.) para os tokens semânticos
Geekie existentes:
  --primary: var(--color-brand-primary);
  --primary-foreground: var(--color-text-on-brand);
  --ring: var(--color-focus-ring);
Commit: "feat(ui3): initialize shadcn + install Phosphor icons"
```

**UI-3.2 — Substituir tooltip do EixoEspectro**

```
Tarefa UI-3.2: o tooltip de EixoEspectro.tsx usa useState local e
posicionamento manual. Substitua pelo componente Tooltip do shadcn
(que usa Radix UI sob o capô), garantindo:
- Foco por teclado abre o tooltip
- Escape fecha
- aria-describedby correto no trigger
- Posicionamento automático (sem sair da viewport)

npx shadcn add tooltip

Substitua o bloco de tooltip em EixoEspectro.tsx.
Remova o useState de showTooltip.
Commit: "refactor(ui3): replace manual tooltip with Radix/shadcn Tooltip"
```

**UI-3.3 — Substituir modal "Ver JSON" no Admin**

```
Tarefa UI-3.3: o Admin.tsx usa alert(JSON.stringify(...)) para mostrar
dados. Substitua por um Dialog do shadcn com JSON formatado e botão
"Copiar". O Dialog:
- Abre com botão "Ver JSON"
- Mostra <pre> com o JSON indentado (max-height com overflow-y: scroll)
- Tem botão "Copiar para clipboard" (navigator.clipboard.writeText)
- Fecha com Escape ou clique fora
- Focus trap: Tab fica dentro do dialog enquanto aberto

npx shadcn add dialog

Commit: "feat(ui3): replace alert() with accessible Dialog in Admin"
```

**UI-3.4 — Ícones com hierarquia visual**

```
Tarefa UI-3.4: substitua os SVGs inline das telas por ícones Phosphor
com peso semântico. Regra de uso:
- weight="bold": ações primárias (botão Iniciar, navegação principal)
- weight="regular": ícones informativos (setas de voltar, ícones de pilar)
- weight="light": ícones decorativos ou secundários
- weight="fill": estado ativo/selecionado

Substitua especificamente:
- Seta de "Voltar" em Admin.tsx e CSP.tsx → ArrowLeft do Phosphor
- Ícone de download CSV em Admin.tsx → DownloadSimple
- Ícone de info (ⓘ) em EixoEspectro e Instrucao → Info
- Ícones ✦ usados como decorativos → SparkleIcon (Phosphor) ou manter
  como texto se forem puramente decorativos (aria-hidden)
Commit: "feat(ui3): replace inline SVGs with Phosphor icon system"
```

### Gate de Qualidade — Sprint UI-3

```
Gate UI-3:
1. npm run test → todos passam (incluindo a11y tests)
2. Tooltip (EixoEspectro):
   [ ] Abre com foco + Enter no botão ⓘ
   [ ] Fecha com Escape
   [ ] Não sai da viewport em telas pequenas (testar mobile 375px)
3. Dialog (Admin JSON):
   [ ] Alert não é mais chamado em nenhum lugar do Admin.tsx
   [ ] Focus fica preso no dialog até fechar
   [ ] Escape fecha
   [ ] Botão "Copiar" funciona
4. Bundle size: npm run build → verificar que não houve aumento > 15KB
   no bundle principal (shadcn é tree-shakeable, mas verificar)
5. Ícones: grep -r "viewBox" src/screens/ → resultado deve ser vazio
   ou mínimo (SVGs inline substituídos por componentes Phosphor)
```

### Pergunta de transição

> **Sprint UI-3 concluído.**
> Tooltips e Dialog acessíveis. Ícones com hierarquia.
> Deseja prosseguir para o **Sprint UI-4 — Feedback e Estado do Sistema**?

---

## Sprint UI-4 — Feedback e Estado do Sistema

### Objetivo

Implementar padrões de feedback consistentes: sistema de toast para
notificações não bloqueantes, skeleton states no Admin, indicador de
progresso dentro de cada bloco de questões, e estados de erro aprimorados.

### Prompt de entrada

```
Inicie o Sprint UI-4. Leia o CLAUDE-UI.md, seção "Sprint UI-4" e
a seção "Base Teórica — Carga Cognitiva e Heurísticas".
Crie a branch feature/ui4-feedback.
```

### Tarefas

**UI-4.1 — Sistema de Toast (Sonner)**

```
Tarefa UI-4.1: instale sonner (toast library, 1.8KB, acessível):
npm install sonner

Sonner é preferível ao shadcn/toast por ser mais simples, menor e
ter boas práticas de a11y embutidas (role="status", aria-live).

Em App.tsx (ou no root do router), adicione: <Toaster position="bottom-center" />

Crie src/hooks/useToast.ts que exporta funções semânticas:
  toast.success("Diagnóstico salvo com sucesso")
  toast.error("Não foi possível salvar. Tente novamente.")
  toast.info("Respostas restauradas do cache local")

Use nos seguintes pontos:
- saveResponse() bem-sucedido → toast.success
- saveResponse() falha (catch do storageService) → toast.error
- Modo kiosk reset → não usar toast (reset é silencioso)
Commit: "feat(ui4): add Sonner toast system for feedback"
```

**UI-4.2 — Progress indicator dentro do bloco de questões**

```
Tarefa UI-4.2: em Questoes.tsx, abaixo do título do bloco, adicione
um indicador de progresso interno do bloco:

"3 de 5 respondidas" com uma mini progress bar de dots ou segmentos.
Usar Phosphor: Circle (vazio) e CircleFill para questões respondidas.

Exemplo visual: ● ● ● ○ ○ (3 de 5 respondidas)

Cada dot/segmento muda de estado com animação de scale via Motion
quando a resposta é selecionada.
Commit: "feat(ui4): intra-block progress indicator in questionnaire"
```

**UI-4.3 — Skeleton state no painel Admin**

```
Tarefa UI-4.3: o Admin.tsx carrega dados do localStorage de forma
síncrona (não precisa de skeleton), mas quando for migrado para API
(Sprint 3 do roadmap de arquitetura), precisará. Prepare a estrutura:

Crie src/components/SkeletonRow.tsx: uma linha de tabela com shimmer
animation via CSS (não Motion — CSS keyframes são mais performáticos
para shimmer repetitivo).

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

Admin.tsx: adicionar estado isLoading. Quando true, mostrar 5
SkeletonRows no lugar da tabela. Atualmente isLoading será sempre
false (dados são síncronos), mas o padrão fica pronto.
Commit: "feat(ui4): skeleton state infrastructure for Admin table"
```

**UI-4.4 — Mensagens de erro aprimoradas em Cadastro**

```
Tarefa UI-4.4: as mensagens de erro atuais são funcionais mas frias
("Obrigatório"). Aplique as diretrizes de heurística H9:
- Linguagem positiva: "Nome da escola é necessário para continuar"
- Próxima ao campo (já está — manter)
- role="alert" no elemento de erro para screen readers anunciarem
  automaticamente: <p role="alert" className="...">
- Ícone de feedback: Warning do Phosphor (weight="fill", cor vermelha)
  antes do texto
- Remover o estado de erro quando o campo é corrigido (já implementado,
  apenas verificar que funciona com React Hook Form se Sprint 2 de
  arquitetura já foi feito)
Commit: "fix(ui4): improve error messaging tone and accessibility"
```

### Gate de Qualidade — Sprint UI-4

```
Gate UI-4:
1. Toast:
   [ ] Aparece após completar o questionário e salvar
   [ ] Aparece em erro de storage (testar bloqueando localStorage)
   [ ] Announce por screen reader (aria-live="polite" no Toaster)
2. Progress dots em Questoes:
   [ ] Atualiza em tempo real ao selecionar resposta
   [ ] Anima com reduced-motion respeitado
3. Mensagens de erro no Cadastro:
   [ ] São anunciadas por screen reader imediatamente após submit
   [ ] Tom positivo (sem "Obrigatório" sozinho)
4. npm run test → todos passam
5. Lighthouse Accessibility >= 95 (manter)
```

### Pergunta de transição

> **Sprint UI-4 concluído.**
> Feedback contextual e acessível em todos os pontos de interação críticos.
> Deseja prosseguir para o **Sprint UI-5 — Performance e Polish Final**?

---

## Sprint UI-5 — Performance e Polish Final

### Objetivo

Fechar o ciclo com otimizações de performance, tipografia fluida,
responsividade validada em dispositivos reais, e auditoria final Lighthouse
com score >= 90 em todas as categorias.

### Prompt de entrada

```
Inicie o Sprint UI-5. Leia o CLAUDE-UI.md, seção "Sprint UI-5".
Crie a branch feature/ui5-polish.
Este sprint tem mais verificações manuais que automáticas.
Apresente cada resultado antes de avançar para a próxima tarefa.
```

### Tarefas

**UI-5.1 — Tipografia fluida com clamp()**

```
Tarefa UI-5.1: substitua os tamanhos de fonte hard-coded nos títulos
principais por valores fluidos usando clamp(). Isso elimina o salto
brusco entre breakpoints.

No src/index.css, adicione:
  /* Tipografia fluida: escala de 375px a 1200px */
  --text-display: clamp(2.5rem, 6vw, 4.5rem);   /* h1 de Splash e Resultado */
  --text-heading: clamp(1.75rem, 4vw, 2.5rem);  /* h1 de telas internas */
  --text-subheading: clamp(1.25rem, 2.5vw, 1.5rem);

Aplique em: Splash.tsx (h1 "Mapa de Inovação"), Resultado.tsx (h1 do nome
da escola), Instrucao.tsx (h1 "Como funciona").
NÃO aplique em texto de corpo — o tamanho de leitura confortável é fixo
(16–18px). Fluida só para display e headings.
Commit: "feat(ui5): fluid typography with clamp() for headings"
```

**UI-5.2 — Otimização de fontes**

```
Tarefa UI-5.2: o app carrega Baloo 2 e Mulish do Google Fonts via @import
no CSS. Isso bloqueia renderização. Substitua por:

Em index.html:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style"
    href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Mulish:wght@400;500;700;800&display=swap">
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Mulish:wght@400;500;700;800&display=swap"
    media="print" onload="this.media='all'">

Remova o @import de src/index.css.
O font-display: swap já vem no URL do Google Fonts com &display=swap.
Commit: "perf(ui5): optimize font loading with preconnect + preload"
```

**UI-5.3 — Dark mode (sistema)**

```
Tarefa UI-5.3: adicione suporte a dark mode via prefers-color-scheme,
usando os tokens semânticos. O dark mode não precisa ser completo —
apenas garantir que o app não fique ilegível quando o SO está em modo
escuro (evitar text preto em fundo preto).

Em src/index.css, adicione:
  @media (prefers-color-scheme: dark) {
    :root {
      --color-surface-default: #1c1c1c;
      --color-surface-subtle: #2a2a2a;
      --color-text-primary: #f5f5f5;
      --color-text-secondary: #d1d5db;
      --color-text-tertiary: #9ca3af;
    }
  }

Teste: ativar dark mode no SO e verificar que as telas brancas
(Cadastro, Resultado, Admin) se adaptam. A tela Splash (fundo vermelho)
e os cards coloridos são imunes — já têm cores fixas.
Commit: "feat(ui5): basic dark mode via prefers-color-scheme"
```

**UI-5.4 — Responsividade em 375px (evento presencial)**

```
Tarefa UI-5.4: este app será usado em tablets e celulares no estande.
Realize uma sessão de teste em 375px (viewport DevTools → iPhone SE).

Telas a verificar manualmente:
[ ] Splash: logo + h1 + botão sem overflow
[ ] Cadastro: todos os inputs visíveis sem scroll horizontal
[ ] Questoes: os 4 cards de resposta empilham em coluna (já tem sm:grid-cols-2)
[ ] Resultado: radar chart legível, pilares não cortam texto
[ ] Admin: tabela tem scroll horizontal ou colapsa em cards

Para cada problema encontrado, corrigir com classes Tailwind responsive.
Não introduzir breakpoints customizados — usar apenas sm/md/lg do Tailwind.
Commit: "fix(ui5): mobile responsiveness at 375px viewport"
```

### Gate Final — Sprint UI-5 (e de todo o ciclo UI/UX)

```
Gate UI-5 — Auditoria Final Completa:

LIGHTHOUSE (npm run preview → auditar http://localhost:4173)
[ ] Performance   >= 90
[ ] Accessibility >= 95
[ ] Best Practices >= 90
[ ] SEO           >= 85

WCAG 2.2 CHECKLIST FINAL
[ ] Zero violations críticas no axe (jest-axe + browser)
[ ] Todas as telas navegáveis por teclado
[ ] Focus indicator visível em todos os elementos interativos
[ ] Contraste 4.5:1 em todo texto de corpo
[ ] Contraste 3:1 em texto grande e ícones informativos
[ ] Touch targets >= 44px em mobile
[ ] prefers-reduced-motion respeitado em todas as animações

MOTION CHECKLIST
[ ] Transições de tela: easeOut, 280ms, com reduced-motion fallback
[ ] Botões: spring microinteração, sem conflito CSS/JS
[ ] Barras de pilar: animação de preenchimento em cascata
[ ] Zero animação de mais de 400ms sem propósito funcional

DESIGN SYSTEM CHECKLIST
[ ] Zero valores hex literais em componentes (apenas tokens ou classes Tailwind)
[ ] Zero `outline-none` sem `:focus-visible` substituto
[ ] Ícones com hierarquia de peso semântica (bold/regular/light)
[ ] Tipografia fluida em headings principais

RESPONSIVIDADE
[ ] 375px: sem overflow horizontal em nenhuma tela
[ ] 768px: layout de duas colunas funciona em Cadastro e Resultado
[ ] 1200px: layout desktop com max-width respeitado
```

### Mensagem de encerramento

> **Sprint UI-5 concluído. Ciclo de UI/UX encerrado.**
>
> O app agora tem:
>
> - WCAG 2.2 AA em todas as telas
> - Sistema de design com tokens semânticos de dois níveis
> - Animações funcionais com respeito a `prefers-reduced-motion`
> - Componentes interativos complexos via Radix UI / shadcn
> - Ícones com hierarquia visual via Phosphor
> - Sistema de feedback (toast + skeleton + progress indicators)
> - Tipografia fluida e responsividade validada em 375px

---

## Referência Rápida: Bibliotecas e Versões

| Biblioteca              | Propósito                  | Versão alvo | Import                       |
| ----------------------- | -------------------------- | ----------- | ---------------------------- |
| `motion/react`          | Animações React            | ^12.x       | `from 'motion/react'`        |
| `@radix-ui/react-*`     | Primitivos acessíveis      | latest      | via shadcn                   |
| `@phosphor-icons/react` | Sistema de ícones          | ^2.x        | named imports                |
| `lucide-react`          | Ícones existentes (manter) | ^0.5x       | named imports                |
| `sonner`                | Toast notifications        | ^1.x        | `<Toaster />` + `toast.*`    |
| `jest-axe`              | Testes de acessibilidade   | ^8.x        | `axe` + `toHaveNoViolations` |

## Referência Rápida: Valores de Contraste Seguros

| Token                    | Hex       | Sobre branco | WCAG              |
| ------------------------ | --------- | ------------ | ----------------- |
| `--color-text-primary`   | `#1c1c1c` | 17.3:1       | AAA               |
| `--color-text-secondary` | `#4b5563` | 7.0:1        | AAA               |
| `--color-text-tertiary`  | `#6b7280` | 4.6:1        | AA                |
| `--color-text-disabled`  | `#9ca3af` | 2.9:1        | Só para disabled  |
| `--color-brand-primary`  | `#ff1547` | 4.6:1        | AA (texto grande) |

> Atenção: `#ff1547` sobre branco tem 4.6:1. Passa para texto grande (18px+)
> mas fica no limite para texto pequeno. Use peso bold >= 700 se o tamanho
> for menor que 18px.

---

_Última atualização: Março 2026_
_Fundamentado em: WCAG 2.2 (W3C), Motion v12 docs, NN/Group UX Heuristics,
State of JS 2024, Radix UI docs, Phosphor Icons docs, Carbon Design System
spacing guidelines, research comparativo de bibliotecas UI/React 2025-2026._
