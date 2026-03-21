# CLAUDE-UX.md — Sprints de Experiência do Usuário

## Mapa de Inovação Educacional

> Este arquivo é complementar ao `CLAUDE-UI.md` (que trata de tokens, acessibilidade,
> animação e componentes). Aqui, o foco é a **experiência**: o que o usuário sente,
> pensa e recorda em cada etapa. Fundamentado em pesquisa de psicologia aplicada
> ao design (Kahneman, Fogg, Norman, Nielsen) e em tendências de UX 2025-2026.
>
> **Para executar qualquer sprint deste arquivo:** use o prompt pronto em
> `CLAUDE-SPRINTS.md`. Os sprints S4 e S5 do roadmap encapsulam os sprints UX-0
> a UX-4 deste arquivo em prompts únicos e autocontidos.

---

## Pontos de Arquitetura Relevantes para os Sprints de UX

| O que alterar                    | Onde fica                                           | Regra                                                                   |
| -------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| Strings de microcopy             | `src/screens/*.tsx` e `src/constants.ts`            | Toda mudança de string tem justificativa psicológica no commit          |
| Conteúdo variável por nível      | `src/constants.ts` (CSP_COPY, FALLBACK_DIAGNOSTICO) | Acessar via `scores.nivel` do `useAppStore()` — nunca hardcoded na tela |
| Estado emocional/dados da escola | `src/stores/appStore.ts` via `useAppStore()`        | Zero prop drilling — qualquer tela acessa o store diretamente           |
| Lógica de kiosk                  | `src/hooks/useKioskMode.ts`                         | Estender, não duplicar — o hook já tem o timer                          |
| Navegação entre telas            | `useNavigate()` do React Router                     | Nunca `window.location`                                                 |
| Documentação de UX               | `docs/` (criar se não existir)                      | Arquivos de jornada e persona ficam em `docs/`, não em `planejamento/`  |

---

## A Distinção Que Organiza Tudo

UI e UX são frequentemente usados como sinônimos. Não são.

**UI (Interface de Usuário)** é a camada visual e interativa: botões, cores, tipografia,
espaçamentos, animações, ícones. UI responde à pergunta "como isso parece e responde?".

**UX (Experiência do Usuário)** é o conjunto de percepções, emoções e memórias que
o produto cria ao longo do tempo. UX responde à pergunta "como o uso desse produto
fez o usuário se sentir?". A distinção de Donald Norman, que cunhou o termo em 1988
na Apple, é precisa: experiência não é o que o designer faz, é o que o usuário
experimenta. O designer projeta intenções; o usuário vive resultados.

No contexto do Mapa de Inovação, isso tem consequências diretas. Um gestor escolar
que visita o estande da Bett passa pelo app em 8-12 minutos, na correria de um evento.
Ele provavelmente nunca usará o app novamente de forma isolada — o que ele vai
recordar é a sensação de ter sido compreendido (ou não) pelo diagnóstico, a facilidade
(ou frustração) do questionário, e o quanto a tela de resultado fez a escola parecer
vista com precisão. Essas memórias moldam a percepção da marca Geekie por semanas.

**UI cuida do "como parece". UX cuida do "como fica na memória".**

---

## Fundamentos Psicológicos Aplicados ao Projeto

Esta seção é leitura obrigatória antes de qualquer sprint. O Claude Code deve
internalizá-la como camada de raciocínio, não como checklist.

### 1. A Regra Pico-Final (Kahneman, 1993)

Daniel Kahneman — psicólogo e Nobel de Economia — demonstrou experimentalmente que
as pessoas não avaliam experiências pela média de todos os momentos. Elas recordam
dois pontos: **o pico emocional** (o momento de maior intensidade, positiva ou
negativa) e **o final** (como a experiência terminou). A duração total tem pouco
peso nessa memória.

**Aplicação direta ao MIE:**

O pico é inevitavelmente a tela de Resultado. É o momento de maior intensidade
emocional: o gestor vê pela primeira vez um número que representa a escola dele,
um nível (ESSENCIAL/EXPLORADOR/INTEGRADA) que categoriza sua instituição, e um
texto que precisa soar como diagnóstico legítimo, não como saída de sistema. Se
esse momento falhar — se parecer genérico, frio ou impreciso — toda a experiência
anterior é desvalorizada na memória.

O final é a tela CSP. Se o gestor sair do app com a sensação de que foi empurrado
para um vendedor, o recall emocional será negativo. Se sair com a sensação de que
ganhou algo concreto e que há um próximo passo natural e convidativo, o recall é
positivo — independente do nível que sua escola atingiu.

**O que isso instrui:** o investimento de design não deve ser proporcional ao tamanho
das telas. A tela Resultado merece atenção desproporcional. A tela CSP — que
atualmente é funcional mas fria — precisa de cuidado especial com microcopy.

### 2. Modelo de Comportamento de Fogg (Stanford, 2009)

BJ Fogg propôs que qualquer comportamento humano ocorre quando três elementos
convergem no mesmo momento: **Motivação** (o desejo de agir), **Habilidade** (a
facilidade de realizar a ação) e um **Prompt** (o gatilho que sinaliza "agora").
A fórmula: B = MAP.

Quando um comportamento não ocorre, ao menos um dos três está ausente ou insuficiente.

**Aplicação ao MIE:**

O comportamento-alvo principal é completar o questionário de 20 questões. Analisar
pelas três dimensões:

_Motivação:_ o gestor está no estande porque tem curiosidade sobre a posição da
escola. A motivação inicial é moderada-alta. Mas ela degrada com o tempo e com o
esforço percebido. A tela Instrucao.tsx e a Ancora.tsx existem para sustentar a
motivação antes de entrar nas questões — e devem fazê-lo de forma genuína, não com
linguagem de marketing.

_Habilidade:_ 20 questões em 4 blocos de 5 é cognitivamente gerenciável. O risco
está na formulação das questões — linguagem complexa ou ambígua reduz a habilidade
percebida e cria ansiedade de resposta ("o que exatamente querem dizer com isso?").
A escala de 4 pontos (de "não fazemos" a "é uma política institucional") é clara
e funcional.

_Prompt:_ o app depende de um consultor Geekie como gatilho físico no estande. No
design, os prompts internos são os botões de avanço e o feedback de progresso. O
botão desabilitado sem explicação visível (quando faltam respostas) é um anti-prompt
— suprime o comportamento sem orientar.

### 3. Carga Cognitiva (Sweller, 1988 — aplicada ao design por Nielsen)

A teoria da carga cognitiva distingue três tipos: **intrínseca** (complexidade do
conteúdo em si), **extrínseca** (complexidade introduzida pela interface) e
**germinal** (esforço de processamento produtivo, que leva ao aprendizado).

O design deve minimizar a carga extrínseca — que é causada por interface confusa,
jargão, instruções ambíguas, excesso de informação simultânea — para liberar
capacidade cognitiva para a carga intrínseca (as próprias questões) e germinal
(a reflexão sobre a escola).

**Aplicação ao MIE:**

O maior risco de carga extrínseca está na tela de Resultado, que apresenta
simultaneamente: badge de nível, score numérico, 4 barras de pilar, 3 eixos espectrais,
indicador de categoria, ativações da Bett e o diagnóstico textual. Isso não é
necessariamente excessivo — é denso por design, para um produto de análise. Mas a
ordem de apresentação, a hierarquia visual e o ritmo de revelação da informação
determinam se o usuário sente que está recebendo clareza ou sendo bombardeado.

**Princípio de divulgação progressiva:** revelar informação no momento em que é
relevante, não tudo de uma vez. No Resultado, isso significa uma hierarquia clara:
primeiro o número (score) e o nível — o usuário precisa orientação emocional antes
de absorver os detalhes. Depois os pilares. Depois os eixos. O diagnóstico por último,
como síntese narrativa do que os dados já mostraram.

### 4. Curva de Fluxo (Csikszentmihalyi, 1990)

Mihaly Csikszentmihalyi mapeou o estado de fluxo como o ponto de equilíbrio entre
desafio percebido e habilidade percebida. Quando o desafio supera a habilidade:
ansiedade. Quando a habilidade supera o desafio: tédio. No ponto de equilíbrio:
engajamento total.

**Aplicação ao MIE:**

O questionário tem potencial natural para fluxo: as questões são concretas,
a escola do usuário é o tema, e a escala é simples. O risco é quebrar o fluxo com
atrito desnecessário — rolagem excessiva entre questões, feedback tardio da seleção,
ausência de marcação de progresso que situe o usuário dentro da tarefa.

O modo kiosk (reset por inatividade) é um anti-fluxo clássico: interrompe bruscamente
uma experiência em andamento. Se for necessário (é, para o contexto de estande), deve
ser precedido de um aviso suave ("Sua sessão será reiniciada em 60 segundos") que
preserve a sensação de controle.

### 5. Design Emocional — Os Três Níveis (Norman, 2004)

Donald Norman propôs que o design opera em três camadas simultâneas:

**Visceral:** a reação imediata antes do pensamento consciente. "Parece confiável?"
"Parece profissional?" Formada em 50-100ms. Depende de UI: cor, tipografia, layout.

**Comportamental:** a sensação durante o uso. "Consigo fazer o que quero?" "O app
responde como espero?" Depende de UX: fluxo, feedback, clareza, velocidade.

**Reflexivo:** a narrativa que o usuário constrói depois. "Valeu meu tempo?" "Essa
empresa entende educação?" "Vou recomendar isso?" Depende de resultado percebido,
microcopy, tom, e da qualidade do "final" (regra pico-final).

**Aplicação ao MIE:**

A camada visceral está bem resolvida — o design Geekie é limpo, com identidade
visual forte. A camada comportamental tem gaps identificados neste documento. A
camada reflexiva — a que determina se o gestor vai falar sobre essa experiência
para colegas — depende quase inteiramente do diagnóstico (o pico) e da tela CSP
(o final). Essas são as apostas mais altas do produto.

### 6. Microcopy como Camada de UX (não de UI)

Microcopy — labels de botão, mensagens de erro, texto de placeholder, mensagens de
sucesso, tooltips — é frequentemente tratada como detalhe visual. É um erro de
categorização. Microcopy é UX porque determina o estado emocional do usuário no
momento da decisão.

Pesquisas da Nielsen Norman Group e dados da indústria convergem nos mesmos achados:

- Trocar "Continuar" por "Ver meu diagnóstico" em um botão final aumenta conclusão
  porque nomeia o benefício em vez da ação
- Mensagens de erro que dizem "Obrigatório" (julgam o usuário) aumentam abandono
  comparado com mensagens que dizem "Precisamos do nome da escola para personalizar
  seu diagnóstico" (explicam o motivo)
- Microcopy que usa "você" e tempo presente reduz ansiedade em formulários
- Botões com verbos específicos ("Calcular meu resultado") superam genéricos
  ("Próximo") em tasks de alto engajamento

**O MIE tem microcopy funcional mas não emocional.** Exemplos atuais que podem
evoluir:

- "Continuar →" → "Calcular meu diagnóstico →"
- "Ver Resultado Final" → "Ver o resultado da [escola.nome]" (personalizado)
- "Obrigatório" → "Informe para personalizarmos o diagnóstico"
- "Novo preenchimento (Reset)" → "Recomeçar para outra escola"

---

## Mapa Emocional do Fluxo Atual

Antes de qualquer sprint, é necessário entender o que o usuário sente em cada tela.
Este mapa é o instrumento de UX mais importante do documento.

```
TELA          EMOÇÃO ESPERADA          RISCO ATUAL               INTERVENÇÃO
─────────────────────────────────────────────────────────────────────────────
Splash        Curiosidade, abertura    Impessoal, corporativo     Microcopy
Cadastro      Disposição, leve atrito  Formulário frio, extenso   Microcopy + ordem
Instrucao     Orientação, segurança    Texto denso, conteúdo OK   Ritmo visual
Ancora        Auto-reflexão            Opções OK, falta peso       Microcopy
Questoes      Fluxo, reflexão          Feedback tardio, progresso  Progresso + feedback
Loading       Antecipação              Vazio emocional             Microcopy + animação
Resultado     Clareza, orgulho/alerta  Informação densa, fria      Hierarquia + pico
CSP           Confiança, próximo passo Tom vendedor, fechamento    Microcopy + ritual
```

---

## Estado dos Sprints de UX

| Sprint                                  | Status      | Branch final | Data |
| --------------------------------------- | ----------- | ------------ | ---- |
| UX-0 — Mapa de Jornada e Auditoria      | ⬜ Pendente | —            | —    |
| UX-1 — Microcopy e Tom de Voz           | ⬜ Pendente | —            | —    |
| UX-2 — Fluxo e Carga Cognitiva          | ⬜ Pendente | —            | —    |
| UX-3 — O Pico: Tela de Resultado        | ⬜ Pendente | —            | —    |
| UX-4 — O Final: Tela CSP e Encerramento | ⬜ Pendente | —            | —    |
| UX-5 — Validação Comportamental         | ⬜ Pendente | —            | —    |

---

## Regras de Operação (valem para todos os sprints)

1. **UX não é sobre preferência estética.** Cada decisão deve ter justificativa
   psicológica ou comportamental. "Parece melhor" não é argumento. "Reduz carga
   cognitiva em X etapa" é.
2. **Microcopy é código.** Tratar strings de interface como texto de segundo nível
   é o erro mais comum. Toda mudança de texto tem o mesmo rigor que mudança de lógica.
3. **Nenhum sprint altera o fluxo de navegação sem aprovação.** Reordenar telas,
   adicionar ou remover etapas requer confirmação explícita.
4. **Testar com contexto real.** O app será usado em evento com barulho, pressa e
   usuário que talvez nunca tenha visto a Geekie. As simulações devem ter essa persona
   em mente: "gestor escolar, 45 anos, no estande da Bett, com 10 minutos disponíveis".

---

## Sprint UX-0 — Mapa de Jornada e Auditoria Emocional

### Objetivo

Construir o instrumento de diagnóstico antes de qualquer intervenção. O output
deste sprint é um documento — não código — que orienta todos os sprints seguintes.

### Prompt de entrada

```
Inicie o Sprint UX-0. Leia o CLAUDE-UX.md completo antes de começar.
Crie a branch feature/ux0-journey-map.
Este sprint produz documentação, não código de produção.
```

### Tarefas

**UX-0.1 — Definir a persona primária do MIE**

```
Tarefa UX-0.1: crie docs/persona-primaria.md com a persona do usuário
principal do app em contexto de Bett.

Estrutura obrigatória:
- Nome fictício, cargo, rede de ensino (pública/privada)
- Contexto no evento: chegou sozinho? com diretor? quanto tempo tem?
- Estado emocional ao entrar no estande (curiosidade? ceticismo?)
- Maior medo ao usar o app ("e se minha escola tirar nota baixa?")
- O que constituiria uma experiência de sucesso para ela
- Frase que ela poderia dizer ao sair: "Isso foi [...]"

Base nos dados reais: os segmentos do Cadastro indicam que
EF2 e EM são os mais comuns. A rede pode ser privada ou pública.
O cargo mais recorrente tende a ser Coordenador Pedagógico ou Diretor.
```

**UX-0.2 — Mapear o estado emocional em cada tela**

```
Tarefa UX-0.2: crie docs/emotional-journey.md com o mapa emocional
completo. Para cada tela do fluxo, documente:

Tela: [nome]
Estado emocional esperado: [emoção que queremos que o usuário sinta]
Risco atual: [o que pode fazer o usuário sentir o oposto]
Momento de atrito identificado: [onde o usuário pode parar ou hesitar]
Ponto de deleite identificado: [onde o usuário pode sentir satisfação]
Relação com pico-final: [é um pico? é o final? é uma etapa de transição?]

Fluxo: Splash → Cadastro → Instrucao → Ancora → Questoes (4 blocos)
→ Loading → Resultado → CSP
```

**UX-0.3 — Inventário de microcopy atual**

```
Tarefa UX-0.3: crie docs/microcopy-inventory.md.
Para cada tela, liste todas as strings que o usuário lê e classifique:
- Tipo: [label / botão / erro / instrução / placeholder / sucesso]
- Tom atual: [neutro / frio / amigável / técnico]
- Problema identificado: [sim/não + descrição se sim]

Não altere nenhum arquivo de código. Apenas documente.
```

**UX-0.4 — Identificar o pico e o final**

```
Tarefa UX-0.4: com base nos documentos anteriores, adicione uma seção
"Análise Pico-Final" em docs/emotional-journey.md:

PICO: qual tela e qual momento específico é a experiência de maior
intensidade emocional? Por que? O que está em jogo emocionalmente?

FINAL: qual é a última impressão que o usuário carrega? A tela CSP
é o final técnico, mas qual é a última frase que ele lê, a última
ação que realiza, o último sentimento antes de sair?

GAPS: o pico está sendo gerenciado com a atenção que merece?
O final cria closure emocional ou deixa o usuário suspenso?
```

### Gate de Qualidade — Sprint UX-0

```
Gate UX-0 (documentação):
1. docs/persona-primaria.md existe e tem os 6 campos preenchidos
2. docs/emotional-journey.md tem entrada para cada uma das 9 telas
3. docs/microcopy-inventory.md lista pelo menos 30 strings categorizadas
4. Seção "Análise Pico-Final" identifica o pico e o final com justificativa
5. Revisão: os documentos fazem sentido para alguém que não conhece o app?
```

### Pergunta de transição

> **Sprint UX-0 concluído.**
> Documentos em `docs/`. O mapa de jornada revela [gaps principais].
> Deseja prosseguir para o **Sprint UX-1 — Microcopy e Tom de Voz**?

---

## Sprint UX-1 — Microcopy e Tom de Voz

### Objetivo

Reescrever o microcopy de todas as telas com base nos princípios de UX writing:
voz ativa, linguagem de benefício (não de função), tom que varia com o contexto
emocional da tela, e eliminação de linguagem que culpa ou julga o usuário.

### Fundamentação psicológica

**Micro-comprometimentos (Cialdini — Foot-in-the-Door):** quando um usuário completa
uma ação pequena, a probabilidade de completar a próxima aumenta. Um botão que diz
"Começar" cria comprometimento menor que "Descobrir o nível da minha escola". O
segundo nomeia o resultado desejado, ativando antecipação antes da ação.

**Teoria da autodeterminação (Deci & Ryan):** pessoas têm necessidade psicológica de
autonomia, competência e pertencimento. Microcopy que explica o motivo de um pedido
("Precisamos do nome para personalizar o diagnóstico") satisfaz autonomia. Microcopy
que confirma progresso ("3 de 5 respondidas") satisfaz competência. Microcopy que
conecta o resultado à escola ("o diagnóstico da [escola]") satisfaz pertencimento.

**Efeito de nomeação:** pesquisa da NNGroup indica que CTAs com verbos específicos
e resultado nomeado superam genéricos em conclusão de tarefa. "Ver meu resultado"
supera "Continuar". "Calcular diagnóstico" supera "Próximo".

### Prompt de entrada

```
Inicie o Sprint UX-1. Leia o docs/microcopy-inventory.md gerado no UX-0.
Crie a branch feature/ux1-microcopy.
REGRA: toda mudança de string deve ter justificativa psicológica ou
comportamental anotada no commit. Não existe "soa melhor" como justificativa.
```

### Diretrizes de Tom de Voz por Tela

Antes das tarefas, o Claude Code deve internalizar este mapa de tom:

| Tela      | Tom                                        | Justificativa                                                     | Proibido                                                    |
| --------- | ------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| Splash    | Convidativo, direto                        | Primeira impressão; criar curiosidade sem prometer demais         | Jargão pedagógico, hipérboles ("revolucionário")            |
| Cadastro  | Parceiro solicitando, não sistema exigindo | Reduz atrito do formulário                                        | "Obrigatório", asteriscos sem explicação                    |
| Instrucao | Professor empático, não manual técnico     | A pessoa precisa se sentir capaz antes de começar                 | Linguagem passiva, frases longas                            |
| Ancora    | Espelho respeitoso                         | O usuário está fazendo auto-avaliação; não deve sentir julgamento | Linguagem que soa como "certo ou errado"                    |
| Questoes  | Claro, sem ambiguidade                     | Texto da questão já é denso; o resto deve ser zero fricção        | Instrução redundante, termos técnicos nos botões            |
| Loading   | Antecipação com credibilidade              | O diagnóstico sendo gerado deve parecer rigoroso, não instantâneo | "Carregando..." (genérico), frases vazias                   |
| Resultado | Diagnóstico autorizado, não relatório frio | O gestor deve sentir que foi visto com precisão                   | "Seu score é X" (reduz a pessoa a número)                   |
| CSP       | Convite sem pressão de venda               | O final deve criar desejo, não obrigação                          | "Nosso consultor entrará em contato", linguagem de pipeline |

### Tarefas

**UX-1.1 — Reescrever microcopy de Splash e Cadastro**

```
Tarefa UX-1.1: com base no tom acima e na análise do UX-0, reescreva:

SPLASH:
- Subtítulo atual: "Descubra a maturidade da sua escola na integração
  entre práticas pedagógicas e tecnologia."
  → Reescrever: mais próximo, menos corporativo. Sugestão de direção:
  "Em 10 minutos, saiba exatamente onde sua escola está — e para onde
  pode ir."

CADASTRO:
- Label "Nome da Escola *" → "Como se chama sua escola?"
- Label "Rede de Ensino *" → "Tipo de rede"
- Placeholder do campo nome → "Ex: Colégio São Paulo" (manter — é bom)
- Mensagem de erro "Obrigatório" → contextualizar: para cada campo
  obrigatório, escrever por que precisa desse dado. Ex: nome → "Precisamos
  do nome para personalizar seu diagnóstico"; email → "Para enviarmos
  seu relatório completo"
- Botão final "Continuar →" → "Ir para o questionário →"

Commit: "ux(1.1): rewrite Splash and Cadastro microcopy with intent"
```

**UX-1.2 — Reescrever microcopy de Instrucao e Ancora**

```
Tarefa UX-1.2:

INSTRUCAO:
- O texto atual tem bom conteúdo mas tom de manual. Reescrever o parágrafo
  de instrução para voz ativa e direta:
  Atual: "Responda com base na realidade atual da escola, não nos planos futuros."
  → Sugestão: "Responda pelo que a escola faz hoje, não pelo que planeja fazer."
  Atual: "Pense na prática institucional, não apenas em iniciativas isoladas..."
  → Sugestão: "Se só um professor faz, ainda não é da escola. Se a escola
  orienta, então é."
- O aviso de versão pocket está bom — manter.

ANCORA:
- O texto de cada opção é extenso e usa 3ª pessoa ("Nossa escola possui...").
  Preservar o conteúdo, mas verificar se o início de cada opção com o nome
  do nível (Essencial / Explorador / Integrada) é suficientemente claro
  para orientar a escolha sem leitura completa. Considerar adicionar uma
  linha-resumo de 5-7 palavras antes da descrição longa:
  "Essencial — Inovações pontuais, sem sistematização"
  "Explorador — Mudanças em andamento, ainda inconsistentes"
  "Integrada — Práticas consolidadas em toda a escola"

Commit: "ux(1.2): rewrite Instrucao and Ancora microcopy"
```

**UX-1.3 — Reescrever microcopy de Questoes**

```
Tarefa UX-1.3: o texto das questões está fixo (é o instrumento pedagógico
— não alterar). O que pode ser reescrito:

- Cabeçalho "Bloco 1 de 4" → manter estrutura, mas adicionar subtítulo
  de orientação temporal: "Bloco 1 de 4 · ~2 minutos"
- Contador de respostas atual:
  "Faltam X respostas para avançar" → "Responda mais X para continuar"
  "X de X respondidas" → "Tudo respondido! Pronto para avançar."
- Botão de avanço dentro dos blocos:
  "Próximo Bloco →" → "Próximo bloco: [nome do próximo bloco] →"
  (ex: "Próximo bloco: Visibilidade →")
  Isso reduz incerteza sobre o que vem e mantém o fluxo
- Botão final "Ver Resultado Final" → "Ver o diagnóstico da minha escola"

Commit: "ux(1.3): rewrite questionnaire navigation microcopy"
```

**UX-1.4 — Reescrever microcopy de Loading e CSP**

```
Tarefa UX-1.4:

LOADING:
As mensagens atuais ("Organizando resultados…", "Redigindo devolutiva…",
"Finalizando leitura…") são razoáveis. Verificar se comunicam processo
rigoroso ou processo rápido-demais. Sugestão de revisão:
"Analisando as respostas da escola…"
"Identificando pontos fortes e oportunidades…"
"Preparando seu diagnóstico personalizado…"
A segunda mensagem é o momento de maior tensão — o usuário está esperando.
Ela deve comunicar que algo significativo está acontecendo.

CSP:
Esta tela é o final da experiência. Reescrever com atenção à regra pico-final.
O objetivo: o gestor deve sair sentindo que tem um próximo passo claro e
desejável, não que foi encaminhado para uma equipe de vendas.

- H1 atual: "O próximo passo é compreender a realidade da sua escola com
  mais profundidade" → muito genérico. Proposta de direção: personalizar
  com o nível da escola. Ex:
  ESSENCIAL: "Há um caminho claro a partir daqui"
  EXPLORADOR: "O diagnóstico aponta para onde focar"
  INTEGRADA: "Sua escola já lidera — o próximo passo é expandir isso"
- Botão final "Encerrar diagnóstico" → "Concluir e aguardar contato"
  (nomeia o que acontece depois, não apenas encerra)

Commit: "ux(1.4): rewrite Loading and CSP microcopy with peak-end intent"
```

### Gate de Qualidade — Sprint UX-1

```
Gate UX-1:
1. Cada mudança de string tem justificativa no commit
2. Zero uso de linguagem de culpa: grep "Obrigatório\|inválido\|incorreto\
   \|erro\|falha" src/screens/ → retornar apenas o esperado
3. Botões de ação primária usam verbo + resultado (não apenas verbo)
4. A tela CSP varia de acordo com o nível do diagnóstico
5. npm run build → sem erros
6. Revisão manual: ler todo o fluxo em voz alta. Qualquer frase que
   soe mecânica ou corporativa é um ponto de revisão
```

### Pergunta de transição

> **Sprint UX-1 concluído.**
> O tom de voz está calibrado por tela. Deseja prosseguir para o
> **Sprint UX-2 — Fluxo e Carga Cognitiva**?

---

## Sprint UX-2 — Fluxo e Carga Cognitiva

### Objetivo

Reduzir a carga cognitiva extrínseca em cada etapa. Não pela remoção de conteúdo,
mas pela reorganização da ordem de apresentação, pelo ritmo de revelação de informação
e pelo suporte contextual que mantém o usuário orientado sem precisar pedir ajuda.

### Fundamentação

**Chunking (Miller, 1956):** a memória de trabalho humana sustenta 7 ± 2 unidades de
informação simultaneamente. Quando mais que isso é apresentado de uma vez, o usuário
começa a descartar informação — geralmente a que parece menos urgente, que pode ser
exatamente a mais importante. O design de chunking divide a informação em grupos
significativos de 3-5 itens.

**Progressive Disclosure (Liddle, 1977 — popularizado por Cooper):** revelar apenas
a informação necessária para a decisão atual. Toda informação adicional, por mais
relevante que seja, se não é necessária agora, é carga extrínseca.

**Hick's Law (1952):** o tempo para tomar uma decisão cresce logaritmicamente com
o número de opções. Menos opções simultâneas = decisão mais rápida e menos ansiosa.

### Prompt de entrada

```
Inicie o Sprint UX-2. Leia as seções de fundamentação psicológica do CLAUDE-UX.md.
Crie a branch feature/ux2-flow-cognition.
Este sprint é o mais cirúrgico: pequenas mudanças com grande impacto perceptual.
```

### Tarefas

**UX-2.1 — Reorganizar Cadastro para reduzir atrito percebido**

```
Tarefa UX-2.1: o formulário de Cadastro tem 7+ campos visíveis de uma vez.
Aplicar chunking visual sem alterar os campos ou validações:

1. Criar uma separação visual nítida entre os dois grupos lógicos:
   GRUPO A — "Sobre a escola" (nome, rede, cidade/UF, segmentos, parceira)
   GRUPO B — "Sobre você" (contato: nome, cargo, email, telefone)
   Já existe um <hr> entre eles — torná-lo semântico com um label
   de seção: "Agora, sobre quem está preenchendo".

2. Reordenar: parceira_geekie deve ir DEPOIS de todos os dados de
   contato, não no meio. É uma pergunta sensível (pode fazer o usuário
   hesitar) — colocá-la por último reduz impacto no fluxo.

3. Verificar se telefone pode ser opcional visualmente (já é opcional
   na validação — tornar isso claro com "(opcional)" próximo ao label).

Commit: "ux(2.1): reorganize Cadastro layout to reduce cognitive load"
```

**UX-2.2 — Adicionar orientação temporal em todas as telas de transição**

```
Tarefa UX-2.2: o usuário do estande não sabe quanto tempo vai demorar.
Sem essa informação, o cérebro superestima a duração (pesquisa de Maister
sobre "the psychology of waiting lines" — incerteza amplifica percepção
de espera).

Adicionar indicação de tempo em:
- Splash: "10 minutos para o diagnóstico completo" (ou valor real)
- Instrucao: "Você está a ~8 minutos do resultado"
- Cabeçalho de cada bloco de questões: "Bloco X de 4 · ~2 min"
- Loading: "O diagnóstico leva cerca de 20 segundos"

Os tempos devem ser estimativas honestas, ligeiramente subestimadas
(chegue antes do prometido — isso cria surpresa positiva).

Commit: "ux(2.2): add temporal anchoring across transition screens"
```

**UX-2.3 — Eliminar ambiguidade na escala de respostas**

```
Tarefa UX-2.3: cada questão tem uma escala de 4 pontos personalizada
(ex: "Não fazemos" / "Fazemos pontualmente" / "Fazemos com regularidade" /
"É uma política institucional"). A ambiguidade central está entre os
valores 2 e 3: o que distingue "pontualmente" de "com regularidade"?

Adicionar ao topo da tela Questoes (visível apenas na primeira questão
do primeiro bloco, depois colapsa) um guia de escala rápido:
  1 = Nunca ou raramente (menos de 25% das vezes)
  2 = Às vezes (sem consistência)
  3 = Frequentemente (mas sem política formal)
  4 = Sempre, documentado e monitorado

Isso é divulgação progressiva — aparece quando necessário, some
quando não é mais útil.

Commit: "ux(2.3): add scale guidance for first questionnaire block"
```

**UX-2.4 — Revisar o alerta de modo kiosk**

```
Tarefa UX-2.4: o reset por inatividade ocorre abruptamente (setScreen
para splash sem aviso). Isso viola a heurística H4 de Nielsen
("liberdade e controle do usuário") e pode causar frustração se o
usuário pausou para pensar.

Implementar aviso progressivo antes do reset:
- 9 minutos de inatividade: nada (não interromper)
- 9 min 30s: aviso sutil no canto inferior: "Sessão encerrando em
  30 segundos por inatividade. Toque para continuar."
- 10 minutos: reset para splash

O aviso deve ser discreto (não modal, não bloqueante) e desaparecer
com qualquer interação. Usar o hook useKioskMode existente.

Commit: "ux(2.4): add progressive kiosk warning before session reset"
```

### Gate de Qualidade — Sprint UX-2

```
Gate UX-2:
1. Simulação com persona (persona-primaria.md): um colega que não
   conhece o app preenche sem instrução verbal. Registrar onde para,
   hesita ou pergunta. Zero fricção é o objetivo.
2. Cronometrar o fluxo completo: deve completar em 8-12 minutos
3. O aviso de kiosk aparece aos 30s antes do reset e desaparece
   com qualquer toque
4. A separação de grupos no Cadastro está visualmente clara
5. npm run test → todos passam
```

### Pergunta de transição

> **Sprint UX-2 concluído.**
> Fluxo cronometrado: [X min]. Fricções identificadas: [lista].
> Deseja prosseguir para o **Sprint UX-3 — O Pico: Tela de Resultado**?

---

## Sprint UX-3 — O Pico: Tela de Resultado

### Objetivo

A tela de Resultado é o pico emocional de toda a experiência. A regra pico-final
de Kahneman é explícita: o usuário vai recordar este momento mais do que qualquer
outro. A intervenção aqui tem retorno desproporcional sobre a percepção de valor
de todo o produto.

### O que está em jogo psicologicamente

O gestor escolar que preenche o questionário está em posição vulnerável: ele acabou
de avaliar a escola que dirige ou coordena. O resultado pode confirmar ou contradizer
sua auto-percepção (capturada na tela Ancora). Se a diferença for grande, existe
o risco de reação defensiva — "o instrumento está errado" — que fecha o usuário
para qualquer conversa com o consultor.

Design emocional para este momento exige:

1. **Reconhecimento antes de avaliação.** O primeiro elemento que o usuário vê deve
   ser o nome da escola — não o score. Nomear a escola cria pertencimento imediato
   e sinaliza que o diagnóstico é sobre essa escola específica, não um genérico.

2. **Hierarquia informacional precisa.** Primeiro: o que sua escola é (nível e score).
   Depois: como chegou lá (pilares). Depois: onde está no espectro (eixos). Depois:
   o que pode fazer com isso (diagnóstico). A ordem atual respeita isso parcialmente.

3. **Validação da auto-percepção.** Quando o score real difere da âncora declarada,
   isso deve ser mencionado com delicadeza — não como "você estava errado" mas como
   "uma perspectiva complementar". O diagnóstico já aborda isso, mas a tela em si pode
   antecipar esse dado antes do texto.

4. **Celebração do que funciona antes de apontar o que falta.** Independente do nível,
   há sempre um pilar mais forte. Mostrar o pilar mais alto com destaque visual antes
   de mostrar o mais fraco é a diferença entre uma experiência que motiva e uma que
   constrange.

### Prompt de entrada

```
Inicie o Sprint UX-3. Leia a seção "O Pico" deste arquivo e a análise
docs/emotional-journey.md do Sprint UX-0.
Crie a branch feature/ux3-resultado-peak.
ATENÇÃO: este sprint mexe na tela de maior risco. Qualquer mudança
deve ser discutida antes de implementada. Liste as mudanças planejadas
e aguarde confirmação antes de editar qualquer arquivo.
```

### Tarefas

**UX-3.1 — Redesenhar a hierarquia de entrada da tela**

```
Tarefa UX-3.1: o primeiro elemento visível ao entrar no Resultado
deve ser o nome da escola, em destaque. Não o score. Não o badge.
A escola primeiro, como declaração de autoria do diagnóstico.

Estrutura atual do header: [badge nível] + [nome escola + cidade] +
[score 60/100]

Proposta de hierarquia (discutir antes de implementar):
1. "[Nome da Escola]" — display grande, o elemento de maior peso visual
2. "[Cidade / UF · Rede]" — subtítulo pequeno
3. "[Badge EXPLORADOR]" + "[68/100]" — lado a lado, com peso visual menor
   que o nome mas maior que o subtítulo

Isso aplica o princípio de Norman: reconhecimento (quem sou) antes de
avaliação (o que valho).
```

**UX-3.2 — Adicionar "ponto de força" como elemento de entrada dos pilares**

```
Tarefa UX-3.2: antes das 4 barras de pilar, adicionar um elemento
visual que destaca o pilar mais alto da escola.

Exemplo de padrão visual:
  ✦ Ponto de maior consistência: [Nome do Pilar Mais Alto] — [score]/100

Isso serve três funções psicológicas:
(a) cria um âncora positiva antes de mostrar os pilares em comparação
(b) ativa o viés de enquadramento positivo (o que funciona, antes do
    que não funciona)
(c) reduz reação defensiva ao resultado geral

Implementação: calcular pilar mais alto nos scores e renderizar o
elemento acima do grid de barras.

Commit: "ux(3.2): add strength highlight before pillar comparison"
```

**UX-3.3 — Melhorar o momento da comparação âncora vs. real**

```
Tarefa UX-3.3: quando a âncora (auto-percepção) difere do score real,
este dado aparece apenas no texto do diagnóstico. É um dado importante
que merece presença visual na tela.

Adicionar, na seção de eixos ou acima do diagnóstico, um elemento
conciso de comparação:
  "Você estimou: [âncora em texto] · Resultado medido: [nível]"

Se âncora == nível: "Sua leitura institucional está alinhada ao diagnóstico."
Se âncora > nível: "O diagnóstico identificou mais oportunidades do que
  a estimativa inicial — um ponto de partida valioso para a conversa."
Se âncora < nível: "Sua escola está mais avançada do que a estimativa
  inicial. Há práticas consolidadas que merecem ser reconhecidas."

Tom: neutro-positivo em todos os casos. Nunca "sua percepção estava errada".

Commit: "ux(3.3): add anchor vs. real comparison with calibrated tone"
```

**UX-3.4 — Revisar o ritmo de revelação do diagnóstico**

```
Tarefa UX-3.4: o efeito typewriter já existe e é correto — cria
antecipação e a sensação de que o texto está sendo gerado em tempo real.

Dois ajustes:
(a) A velocidade atual (2ms/char) é muito rápida para ser percebida
    como "escrita ao vivo". Ajustar para 8-12ms/char — ainda rápido,
    mas perceptível como processo. Testar em contexto real.
(b) O diagnóstico começa com "### Síntese" — um header markdown visível
    que quebra a ilusão de texto natural. Avaliar se os headers de seção
    (### Pontos Fortes, ### Oportunidades) servem ao usuário leigo ou
    criam distância clínica. Proposta: substituir por negrito dentro de
    parágrafo ou por um separador visual sutil sem heading explícito.

Commit: "ux(3.4): adjust typewriter speed and diagnostic section markers"
```

### Gate de Qualidade — Sprint UX-3

```
Gate UX-3:
1. Simulação do pico: mostrar a tela de Resultado para alguém que
   não conhece o app (colega, familiar). Primeira pergunta que fazem:
   se for "que escola é essa?" → hierarquia funcionou.
   Se for "o que significa esse número?" → hierarquia falhou.
2. Velocidade do typewriter: contar tempo do início ao fim do diagnóstico.
   Deve estar entre 20-35 segundos para texto médio (cria antecipação
   sem frustrar)
3. Elemento de força visual está presente e nomeia o pilar correto
   (o de maior score nos pilares)
4. Comparação âncora vs. real aparece quando ancora !== null e difere
   do nível real
5. npm run test → todos passam
```

### Pergunta de transição

> **Sprint UX-3 concluído.**
> O pico está calibrado para criar memória positiva. Deseja prosseguir
> para o **Sprint UX-4 — O Final: Tela CSP e Encerramento**?

---

## Sprint UX-4 — O Final: Tela CSP e Encerramento

### Objetivo

A regra pico-final é tão precisa sobre o final quanto sobre o pico. O último
contato emocional do usuário com o produto determina como ele vai descrever a
experiência para outros. A tela CSP atual cumpre sua função de CTA mas não cria
closure emocional. A intervenção aqui é sobre ritual de encerramento.

### O conceito de closure em UX

Em psicologia da Gestalt, closure é a tendência mental de completar padrões
incompletos. Em UX, closure é o momento em que o usuário sente que a experiência
chegou a um fim natural e satisfatório — não foi interrompida, não ficou suspensa.

Uma experiência sem closure cria dissonância: o usuário sabe que terminou
funcionalmente, mas não emocionalmente. É a diferença entre uma conversa que
termina com "Certo, obrigado" e uma que termina com "Isso foi muito útil, fico
feliz que você veio." O conteúdo é quase o mesmo; o impacto emocional é completamente
diferente.

O conceito de speech acts de J.L. Austin é relevante aqui: algumas frases não apenas
descrevem uma situação, elas performam uma ação. "Seu diagnóstico está pronto" descreve
um estado. "Parabéns — você dedicou tempo para entender sua escola mais fundo" performa
reconhecimento. O segundo cria closure; o primeiro não.

### Prompt de entrada

```
Inicie o Sprint UX-4. Leia a seção "O Final" e "O conceito de closure"
deste arquivo. Crie a branch feature/ux4-csp-closure.
Este sprint tem muito mais peso em texto do que em código.
```

### Tarefas

**UX-4.1 — Personalizar a tela CSP por nível de diagnóstico**

```
Tarefa UX-4.1: a tela CSP.tsx tem o componente CSP_COPY em constants.ts
que já varia por nível (ESSENCIAL / EXPLORADOR / INTEGRADA). Mas o
restante do corpo da tela é idêntico para todos os níveis.

Adicionar variação contextual nos elementos:
- O subtítulo dos 3 passos ("Leitura do contexto", "Devolutiva", etc.)
  é genérico. Para cada nível, o step 1 pode ter uma primeira linha que
  ancora na realidade do usuário:
  ESSENCIAL: "A Geekie parte de onde sua escola está agora..."
  EXPLORADOR: "A Geekie parte das iniciativas que já estão funcionando..."
  INTEGRADA: "A Geekie parte da cultura consolidada da sua escola..."

Isso aplica o princípio de pertencimento: o usuário reconhece sua escola
na descrição do próximo passo.

Commit: "ux(4.1): contextualize CSP steps by diagnosis level"
```

**UX-4.2 — Adicionar ritual de encerramento**

```
Tarefa UX-4.2: criar um elemento de reconhecimento explícito no final
da tela CSP, antes do botão de encerramento.

O elemento deve:
(a) reconhecer o esforço (não o resultado): "Você dedicou tempo para
    olhar com honestidade para a sua escola."
(b) criar expectativa do próximo momento: nomear o que acontece depois
    de forma concreta — não "entraremos em contato" mas "nos próximos
    dias, um pedagogo da Geekie vai ler seu diagnóstico antes de entrar
    em contato."
(c) encerrar com algo que o usuário carrega: uma frase que resume o
    diagnóstico em linguagem simples, variável por nível.
    ESSENCIAL: "Toda jornada começa com um mapa. Você tem o seu."
    EXPLORADOR: "O caminho está aberto. A próxima etapa é sistematizar."
    INTEGRADA: "Você já chegou longe. O próximo passo é ir mais fundo."

Implementação: componente <ClosingStatement nivel={scores.nivel} />
renderizado acima do botão final.

Commit: "ux(4.2): add closing statement with emotional closure"
```

**UX-4.3 — Revisar o botão de encerramento final**

```
Tarefa UX-4.3: o botão atual "Encerrar diagnóstico" chama resetToSplash
e reinicia o app. É funcionalmente correto mas emocionalmente frio —
como fechar uma conversa apertando "Finalizar sessão".

Proposta: para o modo kiosk (estande), o botão deve ser:
"Liberar para a próxima escola"
(contextualiza o reset como ato intencional, não abandono da sessão)

Para uso não-kiosk, manter alternativa:
"Concluir diagnóstico"

Adicionar uma micro-animação de encerramento: a tela faz um fade suave
(não instantâneo) antes de voltar ao Splash. Isso cria o senso de
transição intencional — o "ponto final" da frase.

Commit: "ux(4.3): replace reset button with contextual closure action"
```

### Gate de Qualidade — Sprint UX-4

```
Gate UX-4:
1. Teste do final: mostrar a tela CSP para alguém que completou o fluxo.
   Perguntar: "Como você se sentiu ao terminar?" Se "satisfeito" ou
   "bem informado" → funcional. Se "vendido para" ou "suspenso" → ajustar.
2. A ClosingStatement varia corretamente pelos 3 níveis
3. O botão de encerramento usa linguagem contextual
4. A transição de volta ao Splash tem fade (300ms, easeOut)
5. npm run test → todos passam
```

### Pergunta de transição

> **Sprint UX-4 concluído.**
> O final cria closure. A experiência termina com intencionalidade.
> Deseja prosseguir para o **Sprint UX-5 — Validação Comportamental**?

---

## Sprint UX-5 — Validação Comportamental

### Objetivo

Fechar o ciclo com validação real da experiência. Sem usuário real, não existe
UX — existe hipótese de UX. Este sprint estrutura um protocolo de teste que pode
ser executado antes do evento Bett ou durante ele.

### Por que validação é UX, não QA

Testes de QA verificam se o código faz o que foi escrito. Testes de UX verificam
se o produto faz o que o usuário precisa — que pode ser completamente diferente do
que foi escrito.

O resultado de um teste de UX bem conduzido é frequentemente uma descoberta
desconfortável: algo que parecia óbvio para quem construiu o produto causa confusão
total para quem usa pela primeira vez. Isso não é falha de desenvolvimento — é
informação valiosa que só emerge quando código encontra humano.

### Prompt de entrada

```
Inicie o Sprint UX-5. Leia o CLAUDE-UX.md completo e os documentos
em docs/ gerados nos sprints anteriores.
Crie a branch feature/ux5-validation.
Este sprint produz protocolo de teste E implementa melhorias baseadas
nos resultados da validação.
```

### Tarefas

**UX-5.1 — Criar protocolo de teste de usabilidade**

```
Tarefa UX-5.1: crie docs/usability-test-protocol.md.

Estrutura:
OBJETIVO DO TESTE
- O que queremos descobrir (não "se funciona", mas "onde há atrito")

PERFIL DO PARTICIPANTE
- Cargo: Coordenador Pedagógico ou Diretor
- Rede: indiferente
- Familiaridade com tecnologia: usuário médio de smartphone
- Não pode conhecer o produto antes do teste

CENÁRIO DADO AO PARTICIPANTE (verbatim)
"Você está visitando o estande da Geekie na Bett. Um consultor pediu
que você preenchesse esse instrumento sobre sua escola. Você tem 10
minutos. Siga em frente normalmente — eu não vou ajudar com nada."

TAREFAS OBSERVADAS (sem instrução verbal)
1. Completar o cadastro da escola
2. Responder ao questionário
3. Interpretar o resultado

MÉTRICAS
- Onde o participante pausa por mais de 5 segundos (atrito)
- Onde o participante verbaliza dúvida
- Qual o tempo total de conclusão
- Se o participante lê ou pula a tela Instrucao
- Se o participante entende a diferença entre âncora e score real
- Qual a primeira frase dita ao ver o resultado

PERGUNTAS PÓS-TESTE (não diretivas)
- "Como foi usar isso?"
- "O que você achou mais útil?"
- "O que não ficou claro?"
- "O que você contaria para um colega sobre essa ferramenta?"
```

**UX-5.2 — Executar teste com 2-3 participantes e documentar**

```
Tarefa UX-5.2: executar o protocolo de UX-5.1 com 2 ou 3 pessoas
que se encaixam no perfil. Documentar em docs/usability-test-results.md:
- Transcrição dos momentos de atrito
- Citações diretas dos participantes
- Tempo de conclusão por participante
- Lista priorizada de problemas por frequência e severidade

Classificar cada problema:
CRÍTICO: impede conclusão da tarefa
GRAVE: causa confusão significativa ou abandono parcial
MODERADO: gera hesitação mas o usuário continua
COSMÉTICO: comentado mas não impede uso

Commit: "ux(5.2): document usability test results"
```

**UX-5.3 — Implementar correções dos problemas críticos e graves**

```
Tarefa UX-5.3: com base nos resultados documentados, implementar as
correções necessárias em ordem de severidade.

Cada correção deve referenciar o problema documentado:
"fix(ux): corrige [descrição do problema] identificado em usability test"

Os problemas críticos e graves bloqueiam o lançamento. Moderados e
cosméticos entram no backlog.
```

### Gate Final — Sprint UX-5 (e de todo o ciclo UX)

```
Gate UX-5 — Validação Final de Experiência:

PERSONA
[ ] O perfil de usuário está documentado e todos os sprints anteriores
    foram desenvolvidos tendo essa persona em mente

JORNADA EMOCIONAL
[ ] O mapa emocional em docs/emotional-journey.md está atualizado
    com as mudanças implementadas
[ ] Nenhuma tela tem "emoção esperada" e "risco atual" idênticos

PICO E FINAL (regra de Kahneman)
[ ] O pico (Resultado) foi identificado e recebeu atenção de design
    desproporcional ao tamanho da tela
[ ] O final (CSP) cria closure emocional com ritual explícito de
    encerramento
[ ] Nenhuma tela entre pico e final introduz fricção desnecessária

MICROCOPY
[ ] Zero uso de linguagem de culpa ou julgamento
[ ] Botões de ação primária nomeiam resultado, não apenas ação
[ ] Tom varia por contexto emocional da tela
[ ] Microcopy personalizado com dados do usuário onde possível
    (nome da escola nos botões finais, âncora na comparação)

FLUXO E CARGA COGNITIVA
[ ] Estimativas de tempo visíveis nas telas de transição
[ ] Chunking aplicado no Cadastro (grupos visuais claros)
[ ] Aviso de kiosk progressivo antes do reset

VALIDAÇÃO COMPORTAMENTAL
[ ] Pelo menos 2 testes de usabilidade realizados com persona correta
[ ] Problemas críticos e graves resolvidos antes do evento
[ ] docs/usability-test-results.md documentado e revisado
```

### Mensagem de encerramento

> **Sprint UX-5 concluído. Ciclo de UX encerrado.**
>
> O Mapa de Inovação agora tem:
>
> - Uma persona definida com contexto emocional específico
> - Um mapa de jornada emocional com pico e final gerenciados
> - Microcopy calibrado por tom de voz por tela
> - Fluxo com carga cognitiva reduzida e anchoring temporal
> - Tela de Resultado projetada para criar memória positiva
> - Tela CSP com closure emocional genuíno
> - Protocolo de validação executado com usuários reais

---

## Referência: Distinção UI vs. UX por Dimensão

| Dimensão          | UI cuida de                       | UX cuida de                                                 |
| ----------------- | --------------------------------- | ----------------------------------------------------------- |
| Cores             | Contraste, identidade de marca    | Carga emocional da paleta por tela                          |
| Tipografia        | Legibilidade, escala, peso        | Hierarquia de informação, ritmo de leitura                  |
| Animação          | Duração, easing, performance      | Quando animar — e quando não animar                         |
| Botões            | Tamanho, shape, estado hover      | Label que nomeia o resultado do clique                      |
| Formulários       | Estilo de input, validação visual | Ordem dos campos, chunking, mensagem de por quê             |
| Loading           | Spinner vs. skeleton, animação    | O que comunicar durante a espera para sustentar antecipação |
| Tela de resultado | Layout, gráficos, componentes     | Hierarquia de revelação, gestão do pico emocional           |
| Tela final        | Botão de encerramento, visual     | Closure: o usuário sai com sensação de completude           |

---

## Leituras de Referência (para aprofundamento)

As seguintes obras fundamentam este documento — não como autoridade retórica, mas
como base empírica para as decisões:

- Daniel Kahneman, _Thinking, Fast and Slow_ (2011) — regra pico-final, sistemas 1 e 2
- BJ Fogg, _Tiny Habits_ (2019) — modelo MAP, baby steps, prompts
- Don Norman, _The Design of Everyday Things_ (1988, rev. 2013) — affordances, feedback, três níveis emocionais
- Aaron Walter, _Designing for Emotion_ (2011) — pirâmide de necessidades em UX
- J.L. Austin, _How to Do Things with Words_ (1962) — speech acts, linguagem performativa
- Nielsen Norman Group, artigos sobre cognitive load, error messages, microcopy (2020-2026)
- Mihaly Csikszentmihalyi, _Flow_ (1990) — condições para estado de fluxo

---

_Última atualização: Março 2026_
_Fundamentado em: pesquisa de tendências UX 2025-2026 (UX Collective, Medium/Design Bootcamp,
Laws of UX), estudos comportamentais aplicados ao design (inBeat, NN/Group, UXPin),
e literatura de psicologia cognitiva e comportamental._
