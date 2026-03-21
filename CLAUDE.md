# CLAUDE.md — Mapa de Inovação Educacional

> Este arquivo é lido automaticamente pelo Claude Code ao iniciar uma sessão.
> Contém o índice dos documentos de planejamento e as regras de operação.

---

## Como Navegar a Documentação

### Para **executar um sprint:**

1. Abra `planejamento/CLAUDE-SPRINTS.md`
2. Localize o sprint desejado
3. Copie o bloco "Prompt de execução" completo
4. Cole na IA — o prompt é autocontido

### Para **entender as decisões** (leitura profunda):

- `planejamento/CLAUDE-UI-RATIONALE.md` — teoria de UI, decisões de bibliotecas, princípios
- `planejamento/CLAUDE-UX-RATIONALE.md` — psicologia aplicada, jornada emocional, princípios

### Para **conhecer dependências** e contexto:

- `planejamento/roadmap.md` — mapa de dependências, prioridades
- `planejamento/arquitetura.md` — stack técnico: hexagonal, Zustand, React Router v7
- `planejamento/pendencias.md` — itens ainda por executar

---

## Índice de Documentos

| Arquivo                  | Propósito                                          | Quando usar                     |
| ------------------------ | -------------------------------------------------- | ------------------------------- |
| `CLAUDE-SPRINTS.md`      | Prompts prontos por sprint (S1-S9)                 | Antes de cada sprint            |
| `CLAUDE-UI-RATIONALE.md` | Rationale: UI, tokens, a11y, motion, componentes   | Para entender "por quê"         |
| `CLAUDE-UX-RATIONALE.md` | Rationale: psicologia, jornada, microcopy, pico    | Para entender "por quê"         |
| `arquitetura.md`         | Stack técnico atual (hexagonal, Zustand, v7)       | Antes de features técnicas      |
| `roadmap.md`             | Mapa de dependências + prioridades (fonte verdade) | Contexto do projeto             |
| `pendencias.md`          | Itens pendentes por sprint e tema                  | Para saber o estado             |
| `como_rodar.md`          | Setup, scripts, variáveis de ambiente              | Para onboarding/troubleshooting |
| `decisoes-tecnologia.md` | Análise IA e Supabase — benefícios e impactos      | Para decisões técnicas          |

---

## Estado dos Sprints

| Sprint                                                | Status       | Data       |
| ----------------------------------------------------- | ------------ | ---------- |
| S1 — Fundação Técnica (lint, testes, CI)              | ✅ Concluído | 2026-03-20 |
| S2 — Domínio e Contratos (hexagonal, Zustand, Router) | ✅ Concluído | 2026-03-20 |
| S3 — Resiliência de Evento (draft + resume)           | ✅ Concluído | 2026-03-21 |
| S4 — Experiência Essencial (UX/a11y + tokens)         | ✅ Concluído | 2026-03-21 |
| S5 — Pico e Final (Resultado + CSP)                   | ✅ Concluído | 2026-03-21 |
| S6 — Governança de Conteúdo                           | ⬜ Pendente  | —          |
| S7 — Design System Completo                           | ✅ Concluído | 2026-03-21 |
| S8 — Testes (complementar)                            | ⬜ Pendente  | —          |
| S9 — Features de Produto                              | ⬜ Pendente  | —          |

Legenda: ⬜ Pendente · 🔄 Em andamento · ✅ Concluído · ⚠️ Bloqueado

---

## 🚨 REGRA CRÍTICA: Sincronização Branch ↔ Main

**IMPORTANTE:** Para evitar gaps entre documentação e código, toda sprint DEVE terminar em `main`:

1. **Toda sprint termina em main.** Nunca deixar trabalho em branches por mais de 1 dia.
   - Exceção: aguardando revisão/aprovação (máximo 24h).
   - Se uma branch ficar "órfã" (não mergeada após 2+ dias), deletar e recriar com mesmo nome.

2. **Ao fazer merge para main:**
   - Rodar gate completo: `npm run lint && npx tsc --noEmit && npm run test`
   - Resolver conflitos e testar
   - Fazer commit com mensagem clara indicando sprint/tarefa

3. **Atualizar documentação IMEDIATAMENTE após merge:**
   - Atualizar tabela de status em `CLAUDE.md` (este arquivo)
   - Atualizar `pendencias.md`: remover itens concluídos
   - Se faltam sub-tasks: criar novo sprint ou adicionar a próximo

4. **Evitar:**
   - ❌ Deixar branches sem merge por dias
   - ❌ Esquecer de atualizar tabela de status
   - ❌ Rodar código sem passar no gate de qualidade primeiro
   - ❌ Duplicar trabalho em branches paralelas sem sincronização

---

## Regras de Operação

1. **Um sprint por vez.** Nunca iniciar o próximo sem aprovação explícita.
2. **Branch antes de tudo.** `git checkout -b feature/sX-nome`. Commit ao final de cada tarefa numerada.
3. **Checar antes de alterar.** Ler o arquivo atual antes de qualquer edição.
4. **Sem regressão de UI.** Modificações em `src/screens/` e `src/components/` só encapsulam — a saída visual não muda.
5. **Sem chamadas a APIs externas.** O contrato `IDiagnosticService` existe; a implementação que chama serviço externo não deve ser preenchida sem decisão explícita.
6. **Rodar o gate de qualidade** antes de perguntar sobre o próximo sprint:
   ```bash
   npm run lint && npx tsc --noEmit && npm run test
   ```

---

## Comandos Úteis

```bash
# Ver o que está pendente
cat planejamento/pendencias.md

# Verificação completa de qualidade
npm run lint && npx tsc --noEmit && npm run test:coverage

# Verificar imports diretos de storageService (deve ser vazio)
grep -r "from.*storageService" src/screens/ src/components/

# Contar linhas do App.tsx (deve ser < 60)
wc -l src/App.tsx

# Ver cobertura por arquivo
npm run test:coverage -- --reporter=text
```
