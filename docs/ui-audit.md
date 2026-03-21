# UI Audit — Mapa de Inovação

Data: 2026-03-21
Auditor: Static analysis (Sprint UI-0)

---

## UI-0.1 Contraste de Cores

Metodologia: cálculo de luminância relativa (WCAG 2.1, fórmula sRGB).
Limiares: AA normal text ≥ 4.5:1 · AA large text (≥ 18 px ou 14 px bold) ≥ 3:1 · AAA ≥ 7:1.

| Elemento / Uso | Cor texto | Cor fundo | Contraste aprox. | WCAG AA normal | WCAG AA large | Observação |
|---|---|---|---|---|---|---|
| Placeholder / rótulo desabilitado | `#9ca3af` (gray-400) | `#ffffff` | ~2.8:1 | FAIL | FAIL | Usado em `text-gray-400` em botões de navegação (Admin.tsx l.217). Substituir por `text-gray-500` mínimo. |
| Texto de suporte / legenda | `#6b7280` (gray-500) | `#ffffff` | ~4.6:1 | PASS | PASS | Usado em `text-gray-500` (Admin.tsx l.238, l.266 etc.). Limite AA; não descer mais. |
| Texto secundário | `#4b5563` (gray-600) | `#ffffff` | ~7.0:1 | PASS (AAA) | PASS | Usado em `text-gray-600` (Cadastro.tsx l.57). Seguro. |
| Texto principal | `#1c1c1c` (geekie-preto) | `#ffffff` | ~17.5:1 | PASS (AAA) | PASS | Contraste excelente. |
| Texto branco em CTA primário | `#ffffff` | `#ff1547` (geekie-cereja) | ~3.6:1 | FAIL | PASS | Botões primários (Button, Admin export). Texto de botão é bold 16 px → qualifica como "large text", portanto PASS na prática. Monitorar se o tamanho cair abaixo de 14 px bold. |
| Texto cereja em fundo branco | `#ff1547` (geekie-cereja) | `#ffffff` | ~3.6:1 | FAIL | PASS | Usado em score total (Admin.tsx l.401), botão secundário (ui.tsx l.18). Idem acima: aceitável se bold ≥ 14 px. Atenção a usos em texto de corpo normal (não-bold). |
| Texto cereja em fundo branco (body normal) | `#ff1547` | `#ffffff` | ~3.6:1 | FAIL | — | Risco: se cereja for aplicada a texto de parágrafo normal (16 px não-bold), falha WCAG AA. Verificar antes de expandir uso. |
| Badge ESSENCIAL texto | `#7a5c00` | `#ffc300` (amarelo) | ~4.8:1 | PASS | PASS | ui.tsx l.41. Seguro. |
| Badge INTEGRADA texto | `#004d5c` | `#0fc3e6` (azul) | ~4.5:1 | PASS (limite) | PASS | ui.tsx l.42. No limite mínimo AA; não reduzir opacidade do fundo. |
| Badge EXPLORADOR texto | `#0d4a30` | `#32cd91` (verde) | ~5.1:1 | PASS | PASS | ui.tsx l.43. Seguro. |

### Resumo UI-0.1

- **Ação necessária:** `text-gray-400` não atinge AA em nenhum contexto. Substituir por `text-gray-500` (4.6:1) como mínimo em todos os usos de texto real (não decorativo).
- **Monitorar:** texto cereja (`#ff1547`) em fundos brancos só é AA-compliant quando o elemento é "large text" (≥ 18 px normal ou ≥ 14 px bold). Não usar em texto de corpo corrido.
- **Seguro para expansão:** `#4b5563` (gray-600) e acima, `#1c1c1c` (preto), badges com combinações atuais.

---

## UI-0.2 Foco e Target Size

### Elementos sem indicador de foco visível

Todos os usos de `outline-none` encontrados em 4 arquivos (6 ocorrências):

| Arquivo | Linha | Elemento | Tem substituto focus? | Risco |
|---|---|---|---|---|
| `src/components/forms/Input.tsx` | 16 | `<input>` | Sim — `focus:ring-2 focus:ring-[var(--color-geekie-cereja)]` | Baixo — ring presente, mas `outline-none` cancela o outline nativo. Com o ring, visualmente OK. Confirmar com `:focus-visible` para mouse vs teclado. |
| `src/components/forms/Select.tsx` | 17 | `<select>` | Sim — `focus:ring-2 focus:ring-[var(--color-geekie-cereja)]` | Baixo — mesmo caso do Input acima. |
| `src/screens/Cadastro.tsx` | 85 | `<input>` cidade | Sim — `focus:ring-2 focus:ring-[var(--color-geekie-cereja)]` | Baixo — mesmo caso. |
| `src/screens/Cadastro.tsx` | 91 | `<input>` UF | Sim — `focus:ring-2 focus:ring-[var(--color-geekie-cereja)]` | Baixo — mesmo caso. |
| `src/screens/Admin.tsx` | 188 | `<input>` usuário | Sim — `focus:ring-2 focus:ring-[var(--color-geekie-cereja)]` | Baixo — mesmo caso. |
| `src/screens/Admin.tsx` | 195 | `<input>` senha | Sim — `focus:ring-2 focus:ring-[var(--color-geekie-cereja)]` | Baixo — mesmo caso. |

**Problema raiz:** `focus:ring-*` usa a pseudo-classe `:focus` (ativada também por mouse/pointer), enquanto o padrão WCAG 2.2 (SC 2.4.11) recomenda `:focus-visible` para evitar rings indesejados em cliques, mantendo-os para teclado. A ausência do seletor `focus-visible:` significa que em navegadores modernos o ring aparece em cliques também (comportamento cosmético, não acessibilidade — não prejudica quem precisa do ring). O risco real é o inverso: em navegadores que implementam `:focus-visible` de forma diferente, o `outline-none` sem `focus-visible:outline-none` pode cancelar o ring nativo em cenários edge-case. **Correção em UI-0.4** adicionará `:focus-visible` global como salvaguarda.

### Botões sem foco explícito

| Arquivo | Elemento | Classes de foco | Status |
|---|---|---|---|
| `src/screens/Cadastro.tsx` l.123 | `<button>` parceira (Sim/Não) | Nenhuma | **RISCO** — sem nenhum estilo de foco definido. Depende inteiramente do outline nativo do browser. |
| `src/components/forms/SegmentoSelector.tsx` l.28 | `<button>` segmentos | Nenhuma | **RISCO** — mesmo caso acima. |
| `src/screens/Admin.tsx` l.147 | `<button>` voltar (pré-auth) | Nenhuma | Baixo — navegação secundária; ainda assim sem foco explícito. |
| `src/screens/Admin.tsx` l.197 | `<button>` Entrar | Nenhuma | **RISCO** — botão de submit de formulário sem indicador de foco. |
| `src/screens/Admin.tsx` l.215 | `<button>` voltar (pós-auth) | Nenhuma | Baixo — navegação secundária. |
| `src/screens/Admin.tsx` l.241 | `<button>` Exportar CSV | Nenhuma | Baixo — ação secundária. |
| `src/screens/Admin.tsx` l.405 | `<button>` Ver JSON | Nenhuma | Baixo — ação de tabela. |
| `src/components/ui.tsx` l.13 | `<Button>` (componente) | Nenhuma explícita de foco | **RISCO** — componente reutilizado em todo o app sem anel de foco definido. |

### Elementos com área de toque potencialmente pequena (< 44×44 px recomendado WCAG 2.5.5 / iOS HIG)

| Arquivo | Elemento | Tamanho estimado | Observação |
|---|---|---|---|
| `src/screens/Admin.tsx` l.215 | Botão ícone seta (voltar) | ~24×24 px (só SVG, sem padding) | Área de toque insuficiente. Adicionar `p-2` mínimo. |
| `src/screens/Admin.tsx` l.405 | "Ver JSON" texto-link | ~pequeno (texto de tabela `text-sm`) | Sem padding explícito. Adicionar padding inline. |
| `src/components/forms/SegmentoSelector.tsx` l.28 | Botões de segmento | `px-4 py-2` ≈ 36–40 px altura | Próximo do mínimo. OK em tablet (uso previsto), monitorar em mobile. |

### Ordem de tabulação

- Não há uso de `tabIndex` positivo (> 0) encontrado nos arquivos auditados — boa prática, ordem natural do DOM.
- O formulário de Cadastro segue ordem visual correta (nome → rede → segmentos → parceira → dados de contato → botões).
- O painel Admin exibe a tabela de dados sem células focalizáveis além do botão "Ver JSON" — aceitável para uso em kiosk/tablet, mas considerar `scope` em `<th>` para semântica.
- O botão "Voltar para o App" em Admin (pré-auth) está posicionado com `absolute top-8 left-8`, o que pode alterar a ordem de foco em leitores de tela se não for o primeiro elemento no DOM (está no markup antes do formulário, então OK).

### Resumo UI-0.2

**Ações para UI-0.4:**
1. Adicionar `:focus-visible` global em `src/index.css` como anel de segurança para qualquer elemento interativo não explicitamente estilizado.
2. Substituir `outline-none` por `focus-visible:outline-none` nos inputs (mantém ring existente, alinha com semântica correta).
3. Adicionar foco explícito ao componente `<Button>` em `ui.tsx`.
4. Adicionar foco explícito aos `<button>` em `SegmentoSelector` e aos botões parceira em `Cadastro`.
5. Aumentar área de toque do botão-ícone "voltar" em Admin (adicionar padding).
