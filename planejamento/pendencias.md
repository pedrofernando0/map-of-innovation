# Pendências — Mapa de Inovação Educacional

_Atualizado: Março 2026 (21/03, pós-sincronização)_

> Apenas itens **ainda por executar**. Itens concluídos foram removidos.
> Para contexto de cada item, ver `roadmap.md` e os playbooks `CLAUDE-UI-RATIONALE.md` / `CLAUDE-UX-RATIONALE.md`.
> Para **executar**, abra `CLAUDE-SPRINTS.md` e copie o prompt do sprint desejado.

---

## PRÉ-BETT (urgente)

### ✅ S3 — Resiliência de Evento (CONCLUÍDO EM 21/03)

Todos os itens foram implementados e mergeados para main:

- ✅ **Persistência de rascunho** — métodos `saveDraft()`, `loadDraft()`, `clearDraft()` em LocalStorageAdapter
- ✅ **"Continuar onde parou"** — botão de resume na tela Splash com detecção de rascunho
- ✅ **Fallback contextualizado** — `generateFallback()` em LocalDiagnosticAdapter identifica pilares mais forte/fraco
- ✅ **Aviso de kiosk progressivo** — banner 30s antes de reset em AppLayout via useKioskMode
- ✅ **Credenciais admin sem fallback** — validação em env.ts, login bloqueado se credenciais não configuradas

### ✅ S4 — Experiência Essencial (UX) — CONCLUÍDO (21/03)

**Implementado (mergeado em main):**

- ✅ **Tokens semânticos em `index.css`** — camada semântica completa com cores, spacing (8pt grid), motion tokens
- ✅ **Acessibilidade — Focus ring global** — `:focus-visible` com ring 2px offset 2px em todos os inputs/buttons
- ✅ **Acessibilidade — `BettAtivacoes.tsx`** — `aria-expanded` + `aria-controls` no accordion
- ✅ **Acessibilidade — `Questoes.tsx`** — `role="radiogroup"` + `role="radio"` + `aria-labelledby`
- ✅ **Acessibilidade — `Ancora.tsx`** — `role="radio"` + `aria-checked` nos cards
- ✅ **Acessibilidade — Contraste** — corrigido text-gray-400 → text-gray-600 onde necessário
- ✅ **Acessibilidade — `index.html`** — `lang="pt-BR"` na tag `<html>`
- ✅ **Microcopy** — atualizado em Splash, Cadastro, Instrucao, Ancora, Questoes, Loading com tom apropriado
- ✅ **Testes de a11y** — `src/__tests__/a11y.test.tsx` com coverage de acessibilidade

**Documentação de jornada (concluída em 21/03):**

- ✅ **`docs/persona-primaria.md`** — Persona "Carla", Coordenadora Pedagógica, 38-50 anos
- ✅ **`docs/emotional-journey.md`** — Mapa emocional por tela + análise pico-final completa
- ✅ **`docs/microcopy-inventory.md`** — 40+ strings catalogadas com tipo, tom e avaliação

### S5 — Pico e Final (UX)

- [ ] **Resultado — Hierarquia de entrada**: nome da escola como elemento de maior peso visual, antes do badge e do score.
- [ ] **Resultado — Destaque do pilar mais forte**: elemento acima das barras de pilar: "✦ Ponto de maior consistência: [Pilar X] — [score]/100".
- [ ] **Resultado — Comparação âncora vs. real**: elemento visual conciso quando `ancora !== null`, com tom neutro-positivo em todos os casos (âncora acima, abaixo ou igual ao nível real).
- [ ] **Resultado — Velocidade do typewriter**: ajustar de 2ms para 8–12ms por caractere. Testar em tablet físico.
- [ ] **Resultado — Headers markdown**: avaliar se `### Síntese`, `### Pontos Fortes` etc. servem ao usuário leigo ou criam distância clínica. Substituir por negrito corrido se necessário.
- [ ] **CSP — Título por nível**: variar o H1 com linguagem não-vendedora por nível (ESSENCIAL/EXPLORADOR/INTEGRADA).
- [ ] **CSP — `<ClosingStatement />`**: componente de encerramento com reconhecimento do esforço + próxima ação concreta + frase que o usuário carrega, variável por nível.
- [ ] **CSP — Fade de saída**: transição suave (300ms, easeOut) antes do reset para Splash.
- [ ] **CSP — Botão contextual**: "Liberar para a próxima escola" (modo kiosk) / "Concluir diagnóstico" (geral).

---

## PÓS-BETT

### S6 — Governança de Conteúdo

- [ ] Criar `src/content/` com: `questoes.json`, `niveis.json`, `ativacoes-bett.json`, `fallbacks.json`, `csp-copy.json`
- [ ] Schema Zod para cada JSON — build falha se campo obrigatório ausente
- [ ] `constants.ts` re-exporta dados tipados dos JSONs
- [ ] `docs/content-guide.md`: como editar cada arquivo sem tocar em código

### S7 — Design System Completo

- [ ] Hook `useMotionVariants` com `prefers-reduced-motion`: variantes `fadeUp`, `fadeIn`, `stagger`, `scaleIn`
- [ ] Microinteração nos botões via Motion (`whileHover`, `whileTap`). Remover classe CSS de hover conflitante.
- [ ] Animação stagger nas questões ao trocar de bloco (cascata de 60ms entre cards)
- [ ] Barras de pilar animadas com `animate={{ width }}` e delay proporcional ao índice
- [ ] Microanimação de confirmação ao selecionar resposta
- [ ] Instalar shadcn: `npx shadcn@latest init`. Mapear variáveis CSS do shadcn para tokens Geekie.
- [ ] Substituir tooltip manual de `EixoEspectro.tsx` pelo Tooltip do shadcn (Radix) — foco por teclado, Escape fecha, posicionamento automático
- [ ] Substituir `alert(JSON.stringify(...))` em `Admin.tsx` por Dialog do shadcn com JSON formatado e botão "Copiar"
- [ ] Instalar Phosphor Icons. Substituir SVGs inline por ícones com hierarquia de peso (bold/regular/light/fill)
- [ ] Instalar Sonner. Adicionar `<Toaster>` no root. Toast de sucesso no save, toast de erro em falha de storage.
- [ ] Indicador de progresso dentro do bloco de questões: dots (Circle/CircleFill do Phosphor)
- [ ] `SkeletonRow.tsx` com shimmer CSS para tabela do Admin (preparação para API futura)
- [ ] Tipografia fluida com `clamp()` em `index.css`: `--text-display`, `--text-heading`, `--text-subheading`. Aplicar em Splash, Resultado, Instrucao.
- [ ] Otimizar carregamento de fontes: substituir `@import` no CSS por `<link rel="preconnect">` + `<link rel="preload">` no `index.html`
- [ ] Dark mode básico via `@media (prefers-color-scheme: dark)` usando tokens semânticos do S4
- [ ] Responsividade 375px: sessão de teste e correção de overflow horizontal em todas as telas

### S8 — Cobertura de Testes (complementar)

> Nota: cobertura global já está em 98.5% statements e 100% lines. Este sprint é de complementação qualitativa.

- [ ] Expandir `src/__tests__/a11y.test.tsx` (já existe — criado no S4) para cobrir telas adicionais criadas no S5
- [ ] Testes dos novos componentes criados no S5 (ClosingStatement, destaque de pilar, comparação âncora)
- [ ] Verificar que suite completa continua abaixo de 30s após adições

### S9 — Features de Produto

**9a — Backend e Migração de Storage:**

- [ ] API REST (Express): `POST /api/responses`, `GET /api/responses`, `GET /api/responses/:id`
- [ ] Banco de dados: SQLite (dev) / Firestore ou Supabase (produção)
- [ ] `src/adapters/ApiStorageAdapter.ts` implementando `IStorageRepository`
- [ ] Trocar instância em `AppServicesContext.tsx` para `ApiStorageAdapter`
- [ ] Autenticação admin com JWT
- [ ] Rate limiting, CORS, validação de input, headers de segurança

**9b — Exportação e Compartilhamento:**

- [ ] Exportar PDF do resultado (react-pdf ou html2canvas + jsPDF)
- [ ] Link compartilhável: `/resultado/:id` com dados persistidos no backend
- [ ] Filtros no Admin: por nível, cidade, estado, período
- [ ] Exportar relatório CSV com filtros aplicados

**9c — Analytics e Insights:**

- [ ] Dashboard Admin com gráficos de tendência (diagnósticos por semana/mês)
- [ ] Benchmarking anonimizado por rede/região
- [ ] Heatmap geográfico por estado
- [ ] Relatório agregado PDF/CSV por rede de escolas

**9d — Diagnóstico Completo e Engajamento:**

- [ ] Questionário com 40+ questões + seletor de versão (Rápida/Completa)
- [ ] IA com histórico da escola e benchmarks regionais
- [ ] Plano de ação com timeline 30/60/90 dias
- [ ] Re-diagnóstico com comparativo de evolução
- [ ] Email pós-diagnóstico (SendGrid ou Resend)
- [ ] Página pública de resultado por escola
- [ ] Selo digital de maturidade exportável

---

## Limpeza Técnica

- [ ] Remover `src/services/geminiService.ts` — não importado por nenhuma screen (substituído por `LocalDiagnosticAdapter`)
- [ ] Remover `src/services/storageService.ts` — não importado por nenhuma screen (substituído por `LocalStorageAdapter`)
- [ ] Verificar com `npx ts-prune` se há outros exports não utilizados após remoções

---

## Decisões Humanas Pendentes

> Estes itens não podem ser resolvidos tecnicamente — exigem decisão de produto ou contexto.

1. **Data do evento Bett Brasil**: ✅ **5 a 8 de maio de 2026.** Restam ~45 dias. Sprints S3, S4 e S5 são críticos e precisam ser concluídos antes dessa data.
2. **Serviço externo de IA para `ExternalDiagnosticAdapter`**: nenhuma API será usada por agora. O `LocalDiagnosticAdapter` (fallback local) é a implementação de produção para a Bett. A análise de qual API adotar no futuro e o que ela muda no produto está em `decisoes-tecnologia.md`.
3. **Backend de produção**: ainda sem decisão entre Supabase e outras opções. A análise de benefícios e impactos no produto está em `decisoes-tecnologia.md`.
