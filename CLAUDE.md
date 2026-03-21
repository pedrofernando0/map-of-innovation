# CLAUDE.md — Mapa de Inovação Educacional

> Este arquivo é lido automaticamente pelo Claude Code ao iniciar uma sessão.
> Contém o índice dos documentos de planejamento e as regras de operação.

---

## Índice de Documentos

Toda a documentação de planejamento está em `planejamento/`:

| Arquivo                       | Conteúdo                                                                    |
| ----------------------------- | --------------------------------------------------------------------------- |
| `planejamento/arquitetura.md` | Arquitetura atual: hexagonal, Zustand, React Router v7, testes, CI          |
| `planejamento/roadmap.md`     | Roadmap consolidado com status e prioridades (fonte de verdade)             |
| `planejamento/pendencias.md`  | Lista executável de itens pendentes, organizados por sprint e tema          |
| `planejamento/como_rodar.md`  | Setup, scripts, variáveis de ambiente, troubleshooting                      |
| `planejamento/CLAUDE-UI.md`   | Playbook de execução para sprints de UI (tokens, a11y, motion, componentes) |
| `planejamento/CLAUDE-UX.md`   | Playbook de execução para sprints de UX (jornada, microcopy, pico, final)   |

**Para saber o que está pendente:**

```
Leia planejamento/pendencias.md e me diga qual tema tem maior prioridade.
```

**Para iniciar um sprint:**

```
Leia planejamento/roadmap.md e planejamento/CLAUDE-UX.md (ou CLAUDE-UI.md),
seção "[nome do sprint]", e execute as tarefas em ordem.
```

---

## Estado dos Sprints

| Sprint                                                | Status       | Data       |
| ----------------------------------------------------- | ------------ | ---------- |
| S1 — Fundação Técnica (lint, testes, CI)              | ✅ Concluído | 2026-03-20 |
| S2 — Domínio e Contratos (hexagonal, Zustand, Router) | ✅ Concluído | 2026-03-20 |
| S3 — Resiliência de Evento                            | ⬜ Pendente  | —          |
| S4 — Experiência Essencial (microcopy, a11y, tokens)  | ⬜ Pendente  | —          |
| S5 — Pico e Final (Resultado + CSP)                   | ⬜ Pendente  | —          |
| S6 — Governança de Conteúdo                           | ⬜ Pendente  | —          |
| S7 — Design System Completo                           | ⬜ Pendente  | —          |
| S8 — Testes (complementar, axe)                       | ⬜ Pendente  | —          |
| S9 — Features de Produto (backend, PDF, analytics)    | ⬜ Pendente  | —          |

Legenda: ⬜ Pendente · 🔄 Em andamento · ✅ Concluído · ⚠️ Bloqueado

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
