# Inventário de Microcopy — Mapa de Inovação Educacional

_Criado: Março 2026 | Sprint S4 — Experiência Essencial_
_Baseado no código real das telas em 21/03/2026_

> Strings catalogadas com tipo, tom atual e avaliação.
> "Problema" = o texto cria atrito, ambiguidade ou tom inadequado para a persona.
> Strings marcadas com ✅ estão adequadas. Marcadas com ⚠️ têm oportunidade de melhoria. Marcadas com ❌ precisam de revisão (prioridade S5+).

---

## Tela: Splash

| String                                                                                       | Tipo                      | Tom atual                | Avaliação | Observação                                                                                                                                                       |
| -------------------------------------------------------------------------------------------- | ------------------------- | ------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Mapa de Inovação Educacional"                                                               | Título (h1)               | Neutro / institucional   | ✅        | É o nome do produto — não alterar                                                                                                                                |
| "Descubra a maturidade da sua escola na integração entre práticas pedagógicas e tecnologia." | Subtítulo                 | Técnico / formal         | ⚠️        | Correto mas longo. "Integração entre práticas pedagógicas e tecnologia" é jargão para quem está em evento barulhento. Direção: mais direto, menos nominalizações |
| "Iniciar Diagnóstico"                                                                        | Botão primário            | Neutro                   | ⚠️        | Nomeia a ação, não o benefício. Alternativa considerada: "Descobrir o nível da minha escola" — porém mais longo. Trade-off aceitável no atual estado             |
| "Continuar diagnóstico de [escola.nome] →"                                                   | Botão secundário (resume) | Amigável / personalizado | ✅        | Excelente — único elemento personalizado na tela                                                                                                                 |
| "Respostas restauradas — continue de onde parou"                                             | Toast                     | Informativo              | ✅        | Claro, direto, tom correto                                                                                                                                       |
| "Acesso Admin"                                                                               | Link discreto             | Técnico                  | ✅        | Intencionalmente discreto (opacity 50%) — correto                                                                                                                |

---

## Tela: Cadastro

| String                                      | Tipo                    | Tom atual            | Avaliação | Observação                                                                                                                                                |
| ------------------------------------------- | ----------------------- | -------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Cadastro da Escola" (ou equivalente no h1) | Título                  | Neutro               | ⚠️        | Verificar título exato no render — "Cadastro" é frio. "Sobre a sua escola" seria mais próximo                                                             |
| "Nome da Escola \*"                         | Label de campo          | Funcional            | ⚠️        | O asterisco sinaliza obrigatoriedade mas não explica o porquê. Alternativa: "Nome da escola (para personalizar o diagnóstico)"                            |
| "Ex: Colégio São Paulo"                     | Placeholder             | Neutro               | ✅        | Exemplo claro                                                                                                                                             |
| "Rede de Ensino \*"                         | Label de campo          | Técnico              | ⚠️        | "Rede" é jargão do setor — adequado para a persona (gestores conhecem o termo)                                                                            |
| "Comunitária / Filantrópica"                | Opção de select         | Técnico              | ✅        | Terminologia do setor, correta                                                                                                                            |
| "Sua escola já é parceira Geekie?"          | Label de campo          | Interrogativo        | ⚠️        | Pode ativar "estou sendo qualificado como lead?". Não tem solução óbvia sem mudar a lógica do campo                                                       |
| Mensagens de erro (ex: "Campo obrigatório") | Erro de validação       | Neutro/julgador      | ⚠️        | Não confirmado no código sem rodar o form. Verificar se React Hook Form gera mensagens customizadas ou padrão. Meta: explicar o motivo, não apenas marcar |
| "Seu Nome \*"                               | Label de campo          | Neutro               | ⚠️        | Ausência de contexto — "por que precisa do meu nome?" é implícito mas não respondido. Alternativa: "Seu nome (para personalizar o retorno)"               |
| "Ir para o questionário →"                  | Botão primário (submit) | Orientado ao destino | ✅        | Nomeia o próximo passo — bom                                                                                                                              |
| "← Voltar"                                  | Botão secundário        | Neutro               | ✅        | Correto para navegação secundária                                                                                                                         |

---

## Tela: Instrucao

| String                                                                                                                         | Tipo                        | Tom atual                       | Avaliação | Observação                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| "Como funciona o Mapa"                                                                                                         | Título (h1)                 | Neutro / descritivo             | ⚠️        | Descreve a tela, não convida. Alternativa: "O que você vai descobrir" — mas o atual é funcional   |
| "O Mapa de Inovação foi desenvolvido por um time interdisciplinar da Geekie..."                                                | Parágrafo 1                 | Institucional / credível        | ✅        | Constrói credibilidade — manter                                                                   |
| "O objetivo é entender como a sua escola integra práticas pedagógicas e o uso de tecnologia de forma intencional e sistêmica." | Parágrafo 2                 | Técnico / formal                | ⚠️        | "Intencional e sistêmica" é jargão. Para a persona, é compreensível mas não emocional             |
| "Versão reduzida — Bett Brasil 2026"                                                                                           | Título da caixa informativa | Neutro / honesto                | ✅        | Honestidade é correta, mesmo que diminua expectativa                                              |
| "Esta versão avalia 1 das 5 categorias..."                                                                                     | Corpo da caixa informativa  | Informativo                     | ⚠️        | Honesto, mas pode criar sensação de incompletude. Não tem solução sem mudar a política de produto |
| "Responda com base na realidade atual da escola, não nos planos futuros."                                                      | Instrução                   | Direto / autoritário (positivo) | ✅        | Tom correto — instrução clara e sem julgamento                                                    |
| "Pense na prática institucional, não apenas em iniciativas isoladas de um ou outro professor."                                 | Instrução                   | Direto                          | ✅        | Calibra a resposta — evita viés de confirmação                                                    |
| "Entendi, vamos começar"                                                                                                       | Botão primário              | Amigável                        | ✅        | Tom correto — confirma compreensão sem ser arrogante                                              |

---

## Tela: Ancora

| String                                                                                                    | Tipo                 | Tom atual               | Avaliação | Observação                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Antes de começarmos..."                                                                                  | Título (h1)          | Suave / introdutório    | ✅        | Cria pausa antes da auto-avaliação — psicologicamente adequado                                                                                                |
| "Como você avalia o nível de inovação da sua escola hoje?"                                                | Subtítulo            | Direto / reflexivo      | ✅        | Pergunta central bem formulada                                                                                                                                |
| "Essencial"                                                                                               | Label de opção       | Neutro / não pejorativo | ✅        | Evita "Básico" ou "Iniciante" — decisão correta                                                                                                               |
| "Explorador"                                                                                              | Label de opção       | Positivo / ativo        | ✅        | Bom posicionamento — sugere movimento                                                                                                                         |
| "Integrada"                                                                                               | Label de opção       | Positivo / alcançado    | ✅        | Meta alcançável, não distante                                                                                                                                 |
| "Nossa escola possui condições básicas de funcionamento. Práticas inovadoras existem de forma pontual..." | Descrição Essencial  | Técnico / longo         | ⚠️        | 3 frases para ler antes de escolher. Falta linha-resumo de 5-7 palavras antes da descrição longa. Meta S5: "Essencial — Inovação pontual, sem sistematização" |
| "Nossa escola tem processos em construção, com orientação institucional parcial..."                       | Descrição Explorador | Técnico / longo         | ⚠️        | Mesmo problema — falta headline curta                                                                                                                         |
| "Nossa escola demonstra cultura institucional consolidada de inovação..."                                 | Descrição Integrada  | Positivo / longo        | ⚠️        | Mesmo problema                                                                                                                                                |
| "Ir para o questionário →"                                                                                | Botão primário       | Orientado ao destino    | ✅        | Correto                                                                                                                                                       |

---

## Tela: Questoes

| String                                                      | Tipo           | Tom atual         | Avaliação | Observação                                                                             |
| ----------------------------------------------------------- | -------------- | ----------------- | --------- | -------------------------------------------------------------------------------------- |
| Textos das questões (20 questões)                           | Questão        | Técnico / preciso | ✅        | Não alterar — validados pedagogicamente                                                |
| Labels da escala de resposta                                | Escala         | Neutro / claro    | ✅        | "Não fazemos isso" → "É uma política institucional" — calibração correta               |
| Indicador de bloco (ex: "Bloco 1 de 4")                     | Progresso      | Neutro            | ✅        | Presente e funcional                                                                   |
| Botão "Próximo Bloco" / "Ver o diagnóstico da minha escola" | Botão primário | Variável          | ✅        | O botão final nomeia o benefício — correto                                             |
| Feedback de questões respondidas no bloco                   | Status         | —                 | ⚠️        | Verificar se há contador "X de 5 respondidas" no bloco atual. Se não: gap identificado |

---

## Tela: Loading

| String                                  | Tipo                | Tom atual   | Avaliação | Observação                                                                                                                              |
| --------------------------------------- | ------------------- | ----------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| "Gerando seu diagnóstico personalizado" | Título (h2)         | Informativo | ⚠️        | "Gerando" é correto mas mecânico. "Preparando o diagnóstico de [escola]" seria mais personalizado — requer acesso ao store              |
| "Organizando resultados…"               | Mensagem rotativa 1 | Genérico    | ⚠️        | Não transmite rigor ou personalização. Alternativa: "Identificando pontos fortes e oportunidades…"                                      |
| "Redigindo devolutiva…"                 | Mensagem rotativa 2 | Técnico     | ⚠️        | "Devolutiva" é jargão do setor pedagógico — adequado para a persona, mas frio. Alternativa: "Elaborando seu diagnóstico personalizado…" |
| "Finalizando leitura…"                  | Mensagem rotativa 3 | Neutro      | ⚠️        | Vago — "leitura" de quê? Alternativa: "Quase pronto — organizando os resultados por pilar…"                                             |

---

## Tela: Resultado

| String                                                    | Tipo                | Tom atual           | Avaliação | Observação                                                                                                                |
| --------------------------------------------------------- | ------------------- | ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| Nome da escola                                            | Identificador       | Personalizado       | ✅        | Aparece, mas não como elemento de maior peso visual                                                                       |
| Badge de nível (ESSENCIAL / EXPLORADOR / INTEGRADA)       | Badge               | Neutro / categórico | ✅        | Nomenclatura correta — não pejorativa                                                                                     |
| Score total (ex: "72/100")                                | Número              | Neutro / objetivo   | ✅        | Claro                                                                                                                     |
| Texto do diagnóstico (typewriter)                         | Diagnóstico textual | Técnico / preciso   | ✅        | Conteúdo correto — problema é a velocidade (2ms/char = ilegível em tempo real)                                            |
| Headers markdown no diagnóstico (ex: "### Pontos Fortes") | Header              | Técnico / clínico   | ⚠️        | Para usuário leigo em evento, headers markdown criam distância clínica. Meta S5: avaliar substituição por negrito corrido |
| Labels dos pilares (ex: "Aprendizagem Ativa")             | Label               | Técnico             | ✅        | Terminologia do instrumento — manter                                                                                      |
| "Ver próximos passos →" ou equivalente                    | Botão               | —                   | ⚠️        | Verificar label exato do CTA da tela de Resultado para CSP                                                                |

---

## Tela: CSP

| String                                                                          | Tipo                       | Tom atual           | Avaliação | Observação                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------- | -------------------------- | ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Devolutiva pedagógica Geekie"                                                  | Badge / label              | Institucional       | ⚠️        | "Devolutiva" é correto para a persona mas pode ativar "aqui começa a venda". É o primeiro elemento grande que o usuário lê                                                                                                                                                                                |
| "O próximo passo é compreender a realidade da sua escola com mais profundidade" | Título (h1)                | Passivo / longo     | ⚠️        | Longo (14 palavras) e fala em nome da Geekie ("compreender a realidade"). Alternativa: "Sua escola merece uma leitura mais profunda" ou variar por nível                                                                                                                                                  |
| "Ao solicitar o relatório, a Geekie entrará em contato..."                      | Parágrafo principal        | Formal / comercial  | ⚠️        | "Ao solicitar o relatório" — o usuário não "solicitou" nada neste contexto. O frame é de vendas                                                                                                                                                                                                           |
| "Leitura do contexto escolar"                                                   | Título do card 1           | Técnico             | ✅        | Adequado                                                                                                                                                                                                                                                                                                  |
| "Devolutiva pedagógica"                                                         | Título do card 2           | Técnico / jargão    | ⚠️        | Repete "devolutiva" — terminologia correta para o setor mas pode soar repetitiva                                                                                                                                                                                                                          |
| "Aplicação à realidade da escola"                                               | Título do card 3           | Neutro / concreto   | ✅        | O mais claro dos três                                                                                                                                                                                                                                                                                     |
| "Como a continuidade acontece"                                                  | Título da seção inferior   | Neutro              | ⚠️        | "Continuidade" é vago — de quê? Alternativa: "Como o contato acontece"                                                                                                                                                                                                                                    |
| "O retorno considera os dados preenchidos por [nome] e o e-mail [email]..."     | Corpo da seção inferior    | Personalizado       | ✅        | Excelente — único momento de personalização genuína da tela                                                                                                                                                                                                                                               |
| "Voltar ao relatório"                                                           | Link de navegação          | Neutro              | ✅        | Correto                                                                                                                                                                                                                                                                                                   |
| "Encerrar diagnóstico"                                                          | Botão primário (CTA final) | Neutro / fechamento | ❌        | **Último texto que o usuário lê.** Encerrar é funcional mas não cria nenhum sentimento. Meta S5: substituir por frase que o usuário carrega. Sugestão por nível: ESSENCIAL: "Levar esses achados para a escola" / EXPLORADOR: "Avançar com o que foi mapeado" / INTEGRADA: "Aprofundar o que já funciona" |

---

## Resumo por Prioridade

### ❌ Prioridade Alta (S5 — impacto no pico ou final)

- `"Encerrar diagnóstico"` (CSP) — substituir por frase emocional variável por nível
- `"O próximo passo é compreender..."` (CSP h1) — reescrever para linguagem de parceiro, não de vendedor
- Velocidade do typewriter no Resultado (2ms → 8-12ms) — não é microcopy mas afeta absorção do texto

### ⚠️ Prioridade Média (S5 ou S7 — melhoria de experiência)

- Mensagens de loading (3 strings) — de genérico para personalizado
- Descrições das opções de Ancora (3 strings) — adicionar linha-resumo de 5-7 palavras
- Subtítulo da Splash — reduzir jargão

### ✅ Adequado (manter)

- Botões de navegação ("← Voltar", "Ir para o questionário →")
- Textos das 20 questões e escala de resposta
- Toast de resume ("Respostas restauradas")
- Textos de instrução ("Responda com base na realidade atual")
- Personalização no rodapé da CSP (nome + email do contato)
