# Pendências — Mapa de Inovação Educacional

_Atualizado: Março 2026_

> Apenas itens **ainda por executar**. Itens concluídos foram removidos.
> Para contexto de cada item, ver `roadmap.md` e os playbooks `CLAUDE-UI.md` / `CLAUDE-UX.md`.

---

## PRÉ-BETT (urgente)

### S3 — Resiliência de Evento

- [ ] **Persistência de rascunho**: auto-save do `AppState` parcial no `localStorage` a cada resposta. Expirar após 4h.
- [ ] **"Continuar onde parou"**: na tela Splash, detectar rascunho e oferecer opção de retomar.
- [ ] **Fallback contextualizado**: reescrever `FALLBACK_DIAGNOSTICO` para usar `scores.pilares` — identificar o pilar mais forte e mais fraco da escola, em vez de texto genérico por nível.
- [ ] **Aviso de kiosk progressivo**: exibir mensagem discreta 30s antes do reset ("Sessão encerrando em 30s — toque para continuar"). Reset continua aos 10 minutos. Usar `useKioskMode` existente.
- [ ] **Credenciais admin sem fallback**: se `VITE_ADMIN_USER`/`VITE_ADMIN_PASS` não estiverem no `.env.local`, o login do admin deve estar bloqueado com mensagem de configuração — não acessível com credenciais hardcoded.

### S4 — Experiência Essencial (UX)

- [ ] **`docs/persona-primaria.md`**: perfil do usuário Bett (cargo, contexto no evento, estado emocional, maior medo, frase ao sair).
- [ ] **`docs/emotional-journey.md`**: estado emocional esperado por tela, maior risco atual, momento de atrito, ponto de deleite, relação com regra pico-final.
- [ ] **`docs/microcopy-inventory.md`**: inventário de todas as strings por tela com classificação de tom e problema identificado.
- [ ] **Microcopy — Splash**: subtítulo mais próximo e menos corporativo. Ex. direção: "Em 10 minutos, saiba exatamente onde sua escola está — e para onde pode ir."
- [ ] **Microcopy — Cadastro**: labels orientadas ao benefício ("Como se chama sua escola?"), mensagens de erro que explicam o motivo ("Precisamos do nome para personalizar seu diagnóstico"), botão "Ir para o questionário →".
- [ ] **Microcopy — Instrucao**: voz ativa e direta nos parágrafos de instrução. Indicação de tempo ("Você está a ~8 minutos do resultado").
- [ ] **Microcopy — Ancora**: linha-resumo de 5–7 palavras antes de cada descrição longa ("Essencial — Inovações pontuais, sem sistematização").
- [ ] **Microcopy — Questoes**: timer por bloco ("Bloco 1 de 4 · ~2 min"), contador motivador ("Tudo respondido! Pronto para avançar."), botão "Ver o diagnóstico da minha escola".
- [ ] **Microcopy — Loading**: mensagens que comunicam processo rigoroso ("Identificando pontos fortes e oportunidades…").
- [ ] **Acessibilidade — `index.html`**: adicionar `lang="pt-BR"` na tag `<html>`.
- [ ] **Acessibilidade — Focus ring global**: adicionar `:focus-visible` com estilo visual em `index.css`. Remover todos os `outline-none` sem substituto.
- [ ] **Acessibilidade — `BettAtivacoes.tsx`**: `aria-expanded` + `aria-controls` no botão de accordion.
- [ ] **Acessibilidade — `Questoes.tsx`**: `role="radiogroup"` + `role="radio"` nas opções de resposta. `aria-labelledby` apontando para o texto da questão.
- [ ] **Acessibilidade — `Ancora.tsx`**: `role="radio"` + `aria-checked` + `role="radiogroup"` nos cards de seleção.
- [ ] **Acessibilidade — Contraste**: verificar e corrigir `text-gray-400` em texto real (não em placeholder/disabled). Usar `text-gray-600` onde necessário.
- [ ] **Tokens semânticos em `index.css`**: adicionar camada semântica sobre os primitivos existentes: `--color-brand-primary`, `--color-feedback-error`, `--color-text-secondary`, `--color-focus-ring`, escala de spacing 8pt (`--space-1` a `--space-16`), tokens de motion (`--duration-base`, `--ease-out`).

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

- [ ] Instalar `jest-axe`. Criar `src/__tests__/a11y.test.tsx` com testes axe para todas as telas
- [ ] Testes dos novos componentes criados nos sprints S4/S5 (ClosingStatement, destaque de pilar, etc.)
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

1. **Data do evento Bett Brasil**: sem essa informação, não é possível ajustar a prioridade dos sprints pré-Bett com precisão de tempo.
2. **Serviço externo de IA para `ExternalDiagnosticAdapter`**: qual API? Quais credenciais? Qual modelo? O contrato `IDiagnosticService` está pronto — falta a decisão de implementação.
3. **Backend de produção**: Firestore vs. Supabase vs. outro? Isso determina o Sprint 9a.
