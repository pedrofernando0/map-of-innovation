# Especificação Visual — Tela de Resultado

## Contexto

Esta é a tela de maior impacto do protótipo. É o momento em que o gestor escolar vê pela primeira vez o diagnóstico da própria escola. Precisa ser visualmente impactante, legível em tablet, e impressionável no estande da Bett.

O resultado é gerado em tempo real via IA. O texto aparece com efeito typewriter.

## Layout (desktop 1200px)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER — logo Geekie + progress bar 100%                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│  │  COLUNA ESQUERDA (40%)   │  │  COLUNA DIREITA (60%)    │ │
│  │                          │  │                          │ │
│  │  [BADGE NÍVEL]           │  │  [4 CARDS DE PILAR]      │ │
│  │  Colégio São Paulo       │  │  AA ████████░░ 78        │ │
│  │  São Paulo / SP          │  │  VIS █████░░░░ 52        │ │
│  │                          │  │  FLEX███████░░ 70        │ │
│  │  [GRÁFICO RADAR]         │  │  PERS████░░░░░ 45        │ │
│  │                          │  │                          │ │
│  │  [EIXOS: ped vs tec]     │  │  [DIAGNÓSTICO TEXTO]     │ │
│  │                          │  │  com efeito typewriter   │ │
│  │  [AUTO vs REAL]          │  │                          │ │
│  │                          │  │  [BTN IMPRIMIR]          │ │
│  │                          │  │  [BTN FALAR COM CSP] ←  │ │
│  └──────────────────────────┘  └──────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Layout (mobile 375px — coluna única)

```
BADGE NÍVEL
Nome da escola
Radar (max-width 280px, centrado)
Eixos (ped vs tec)
Auto vs Real
4 cards de pilar (empilhados)
Diagnóstico texto
[BTN IMPRIMIR]
[BTN FALAR COM CSP]
```

## Badge de nível

- **ESSENCIAL**: background `#ffc300`, color `#7a5c00`
- **INTEGRADA**: background `#0fc3e6`, color `#004d5c`
- **EXPLORADOR**: background `#32cd91`, color `#0d4a30`

## Gráfico radar (Recharts)

Utiliza a biblioteca `recharts` para renderizar o gráfico radar com os 4 pilares: Aprendizagem Ativa, Visibilidade, Flexibilidade e Personalização. A cor principal do gráfico é o Cereja Geekie (`#ff1547`).

## Cards de pilar

Cada card contém:
- Ícone do pilar
- Nome do pilar
- Score numérico em destaque
- Barra de progresso (trilha `#f0f0f0`, preenchimento com a cor do pilar)
- Legenda indicativa do status

Cores por pilar:
- Aprendizagem Ativa: `#ff1547` (cereja)
- Visibilidade: `#0fc3e6` (azul)
- Flexibilidade: `#32cd91` (verde)
- Personalização: `#6146f1` (roxo)

## Comparativos

- **Eixos (Pedagógico vs Tecnológico)**: Duas barras horizontais lado a lado.
- **Auto-percepção vs Score Real**: Texto indicativo comparando a nota âncora com o nível real calculado.

## Área do diagnóstico

Contém um cabeçalho indicando que foi gerado por IA e o texto do diagnóstico renderizado utilizando `react-markdown` para formatar negritos e listas, com um efeito visual de "typewriter".

## Botões e Impressão

- Botão secundário para "Imprimir diagnóstico" (aciona `window.print()`).
- Botão primário para "Falar com meu consultor Geekie".
- Estilos de impressão (`@media print`) ocultam elementos de navegação e botões, ajustando o layout para papel.
