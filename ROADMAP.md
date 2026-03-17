# Roadmap - Mapa de Inovacao Geekie

> Plataforma de diagnostico de maturidade em inovacao educacional para escolas brasileiras.

---

## Visao Geral

O Mapa de Inovacao e atualmente uma SPA (Single Page Application) com questionario de 20 perguntas, diagnostico por IA (Gemini), dashboard de resultados e painel administrativo. Os dados sao armazenados apenas em localStorage. Este roadmap define a evolucao da plataforma em 7 sprints de 2 semanas cada.

---

## Sprint 0: Fundacao e Qualidade (Semana 1-2)

**Objetivo:** Estabelecer base solida de qualidade antes de adicionar novas funcionalidades.

| # | Tarefa | Branch | Descricao |
|---|--------|--------|-----------|
| 0.1 | Code cleanup | `feature/s0-code-cleanup` | Aplicar todas as correcoes de seguranca, remover codigo duplicado, tipar retornos, organizar dependencias |
| 0.2 | Configurar ESLint + Prettier | `feature/s0-linting-setup` | Adicionar ESLint com regras para React/TypeScript e Prettier para formatacao consistente |
| 0.3 | Configurar Vitest | `feature/s0-testing-setup` | Configurar Vitest + React Testing Library com cobertura minima de 60% |
| 0.4 | Testes unitarios core | `feature/s0-core-tests` | Escrever testes para `calculateScores()`, `storageService`, e componentes criticos |
| 0.5 | CI/CD basico | `feature/s0-ci-pipeline` | GitHub Actions: lint + type-check + testes em cada push/PR |

**Criterios de aceite:**
- `npm run lint` sem erros
- `npm run build` sem warnings
- Cobertura de testes >= 60% nos modulos core
- Pipeline CI verde

---

## Sprint 1: UX e Acessibilidade (Semana 3-4)

**Objetivo:** Melhorar a experiencia do usuario e garantir acessibilidade.

| # | Tarefa | Branch | Descricao |
|---|--------|--------|-----------|
| 1.1 | Validacao de formulario | `feature/s1-form-validation` | Validacao em tempo real no Cadastro com feedback visual (campos obrigatorios, email, telefone) |
| 1.2 | Acessibilidade (a11y) | `feature/s1-accessibility` | Navegacao por teclado completa, atributos ARIA, contraste WCAG AA, foco visivel |
| 1.3 | Indicador de progresso detalhado | `feature/s1-progress-indicator` | Indicador "Bloco X de 4" + barra de progresso dentro de cada bloco de questoes |
| 1.4 | Transicoes animadas | `feature/s1-transitions` | Animacoes suaves de entrada/saida entre telas usando Motion (ja instalado) |
| 1.5 | Admin responsivo | `feature/s1-responsive-admin` | Layout mobile-first para o painel administrativo com tabela responsiva |

**Criterios de aceite:**
- Formulario nao permite avanco sem campos obrigatorios preenchidos
- Score 90+ no Lighthouse Accessibility
- Todas as telas navegaveis por teclado
- Admin usavel em dispositivos moveis

---

## Sprint 2: Exportacao e Compartilhamento (Semana 5-6)

**Objetivo:** Permitir que escolas exportem e compartilhem seus resultados.

| # | Tarefa | Branch | Descricao |
|---|--------|--------|-----------|
| 2.1 | Exportar PDF | `feature/s2-pdf-export` | Botao "Baixar PDF" na tela de Resultado (radar chart, scores, diagnostico IA) |
| 2.2 | Link compartilhavel | `feature/s2-share-link` | Gerar URL unica para resultado (ex: `/resultado/:id`) com dados persistidos |
| 2.3 | Modal JSON no Admin | `feature/s2-admin-json-modal` | Botao "Ver JSON" abre modal com JSON formatado e botao de copiar |
| 2.4 | Filtros no Admin | `feature/s2-admin-filters` | Filtrar tabela por: nivel (Essencial/Explorador/Integrada), cidade, estado, periodo |

**Criterios de aceite:**
- PDF gerado com layout fiel ao resultado na tela
- Link compartilhavel abre resultado sem necessidade de refazer questionario
- Admin permite filtrar e encontrar escolas rapidamente

---

## Sprint 3: Persistencia e Backend (Semana 7-8)

**Objetivo:** Migrar de localStorage para persistencia real com API.

| # | Tarefa | Branch | Descricao |
|---|--------|--------|-----------|
| 3.1 | API REST | `feature/s3-api-setup` | Criar backend com Express (endpoints: POST /api/responses, GET /api/responses, GET /api/responses/:id) |
| 3.2 | Banco de dados | `feature/s3-database` | Configurar SQLite (dev) ou Firestore/Supabase (producao) com schema para escolas e respostas |
| 3.3 | Migrar storage | `feature/s3-migrate-storage` | Refatorar `storageService.ts` para chamar API. Manter fallback localStorage para offline |
| 3.4 | Autenticacao Admin | `feature/s3-admin-auth` | Implementar auth real (JWT) para o painel admin. Tela de login com sessao persistente |
| 3.5 | Seguranca da API | `feature/s3-api-security` | Rate limiting, CORS, validacao de input, headers de seguranca |

**Criterios de aceite:**
- Dados persistidos no banco apos diagnostico
- Admin requer autenticacao JWT valida
- API protegida contra abuso (rate limit: 100 req/min)
- Fallback localStorage funciona sem backend

---

## Sprint 4: Analytics e Insights (Semana 9-10)

**Objetivo:** Transformar dados coletados em insights acionaveis para gestores.

| # | Tarefa | Branch | Descricao |
|---|--------|--------|-----------|
| 4.1 | Graficos temporais | `feature/s4-trend-charts` | Dashboard Admin com graficos de tendencia: diagnosticos por semana/mes, evolucao de scores |
| 4.2 | Benchmarking | `feature/s4-benchmarking` | Comparativo entre escolas da mesma rede/regiao com anonimizacao |
| 4.3 | Heatmap geografico | `feature/s4-geo-heatmap` | Mapa do Brasil com cores por estado indicando nivel medio de maturidade |
| 4.4 | Relatorio de rede | `feature/s4-network-report` | Exportar relatorio agregado PDF/CSV com visao consolidada de uma rede de escolas |

**Criterios de aceite:**
- Dashboard mostra tendencias com granularidade semanal e mensal
- Benchmarking anonimiza dados individuais de escolas
- Heatmap renderiza corretamente todos os 26 estados + DF
- Relatorio de rede exportavel em PDF e CSV

---

## Sprint 5: Versao Completa do Diagnostico (Semana 11-12)

**Objetivo:** Expandir o questionario e melhorar a precisao do diagnostico com IA.

| # | Tarefa | Branch | Descricao |
|---|--------|--------|-----------|
| 5.1 | Questionario completo | `feature/s5-full-questionnaire` | Expandir para 40+ questoes cobrindo mais dimensoes de cada pilar |
| 5.2 | Seletor de versao | `feature/s5-version-selector` | Tela inicial permite escolher: "Versao Rapida (Bett)" ou "Diagnostico Completo" |
| 5.3 | IA com historico | `feature/s5-improved-ai` | Enriquecer prompt do Gemini com dados historicos da escola (se disponivel) e benchmarks da regiao |
| 5.4 | Plano de acao | `feature/s5-action-plan` | Gerar secao de recomendacoes com timeline de 30/60/90 dias baseada nos resultados |
| 5.5 | Re-diagnostico | `feature/s5-re-assessment` | Permitir escola refazer diagnostico apos periodo, com comparativo de evolucao |

**Criterios de aceite:**
- Questionario completo com 40+ questoes funcional
- Seletor de versao claro e intuitivo
- Diagnostico IA referencia dados historicos quando disponivel
- Plano de acao com acoes concretas por pilar
- Re-diagnostico mostra delta de evolucao

---

## Sprint 6: Engajamento e Retencao (Semana 13-14)

**Objetivo:** Manter escolas engajadas apos o diagnostico inicial.

| # | Tarefa | Branch | Descricao |
|---|--------|--------|-----------|
| 6.1 | Notificacoes por email | `feature/s6-email-notifications` | Enviar email pos-diagnostico com resumo + lembrete trimestral para re-diagnostico |
| 6.2 | Pagina publica de resultado | `feature/s6-public-result-page` | URL publica com branding da escola mostrando nivel e destaques (sem dados sensiveis) |
| 6.3 | Historico da escola | `feature/s6-school-history` | Timeline visual mostrando evolucao dos diagnosticos ao longo do tempo |
| 6.4 | Selo digital | `feature/s6-digital-badge` | Badge/selo de maturidade em inovacao para escola usar em site/redes sociais |

**Criterios de aceite:**
- Email enviado automaticamente apos diagnostico com design profissional
- Pagina publica acessivel sem autenticacao
- Timeline mostra ate 10 diagnosticos historicos
- Selo digital exportavel como imagem PNG/SVG

---

## Resumo Visual

```
Sprint 0 (S1-2)   ████ Fundacao: cleanup, lint, testes, CI
Sprint 1 (S3-4)   ████ UX: validacao, a11y, animacoes, responsive
Sprint 2 (S5-6)   ████ Export: PDF, share links, filtros admin
Sprint 3 (S7-8)   ████ Backend: API, banco, auth, seguranca
Sprint 4 (S9-10)  ████ Analytics: tendencias, benchmark, heatmap
Sprint 5 (S11-12) ████ Diagnostico: questionario completo, IA, re-assessment
Sprint 6 (S13-14) ████ Engajamento: email, pagina publica, historico, selo
```

---

## Dependencias entre Sprints

- **Sprint 0** e pre-requisito para todos os demais
- **Sprint 1** e **Sprint 2** podem ser paralelizados
- **Sprint 3** (backend) e pre-requisito para Sprints 4, 5 e 6
- **Sprint 4** e **Sprint 5** podem ser paralelizados apos Sprint 3
- **Sprint 6** depende de Sprint 3 e Sprint 5

---

## Stack Tecnologica Planejada

| Camada | Atual | Planejado |
|--------|-------|-----------|
| Frontend | React 19 + Vite + Tailwind | Manter |
| Backend | - | Express + JWT |
| Banco de Dados | localStorage | SQLite (dev) / Firestore (prod) |
| IA | Gemini API | Gemini com contexto historico |
| Testes | - | Vitest + React Testing Library |
| CI/CD | - | GitHub Actions |
| Email | - | SendGrid ou Resend |
| PDF | - | react-pdf ou html2canvas + jsPDF |

---

*Ultima atualizacao: Marco 2026*
