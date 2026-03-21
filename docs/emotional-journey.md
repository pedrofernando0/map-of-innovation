# Mapa Emocional de Jornada — Mapa de Inovação Educacional

_Criado: Março 2026 | Sprint S4 — Experiência Essencial_

> Baseado na persona Carla (docs/persona-primaria.md) e nas telas reais do app.
> Atualizar sempre que uma tela for alterada de forma significativa.

---

## Fluxo Completo

```
Splash → Cadastro → Instrucao → Ancora → Questoes (4 blocos) → Loading → Resultado → CSP
```

---

## Tela: Splash

**Estado emocional esperado:** Curiosidade aberta, disposição para tentar

**Risco atual:** A headline "Mapa de Inovação Educacional" é o título do produto, não um convite. O subtítulo "Descubra a maturidade da sua escola na integração entre práticas pedagógicas e tecnologia" é correto mas técnico — pode soar distante para quem está no contexto de evento.

**Momento de atrito identificado:** Nenhum atrito de interação — a tela é limpa. O risco é emocional: o botão "Iniciar Diagnóstico" não nomeia o benefício que vem depois. O usuário inicia sem saber exatamente o que vai receber.

**Ponto de deleite identificado:** O botão de resume ("Continuar diagnóstico de [escola] →") — personalizado com o nome da escola — é o único elemento nomeado individualmente nesta tela. Tem potencial de deleite emocional quando aparece.

**Relação com pico-final:** Tela de abertura. Estabelece o tom emocional inicial. Não é nem pico nem final — é a primeira impressão visceral (Norman, nível visceral).

---

## Tela: Cadastro

**Estado emocional esperado:** Disposição, leve comprometimento — "vou investir 2 minutos para personalizar"

**Risco atual:** O formulário tem ~10 campos visíveis (nome da escola, rede, segmentos, cidade, estado, parceira Geekie, nome do contato, cargo, email, telefone). Para alguém em pé num evento barulhento, isso parece mais longo do que é. O label "Nome da Escola \*" é funcional mas frio.

**Momento de atrito identificado:** A quantidade de campos visíveis antes de rolar. O campo "Sua escola já é parceira Geekie?" pode gerar leve desconforto se a resposta for não — sensação de "estou sendo qualificado como lead?".

**Ponto de deleite identificado:** O chunking visual (dois blocos separados por `<hr>`) ajuda a perceber que são duas seções distintas. O campo de segmentos (checkboxes) é rápido de preencher.

**Relação com pico-final:** Etapa de comprometimento. Se o atrito aqui for alto, o usuário não chega ao pico.

---

## Tela: Instrucao

**Estado emocional esperado:** Orientação, segurança — "entendo o que vou fazer e por quê"

**Risco atual:** O texto atual é bem estruturado. O risco é ritmo: dois parágrafos densos + caixa informativa + lista de instruções. Para um leitor de evento com pressa, a tendência é escanear, não ler. O conteúdo é bom; a hierarquia visual pode ser melhorada.

**Momento de atrito identificado:** O aviso "Versão reduzida — Bett Brasil 2026 — avalia 1 das 5 categorias" é honesto e importante, mas pode gerar a sensação de "então esse resultado vai ser incompleto?", diminuindo a antecipação antes do questionário.

**Ponto de deleite identificado:** A nota sobre o time interdisciplinar (pedagogos + cientistas de dados) aumenta credibilidade percebida — o usuário sente que a ferramenta tem base séria.

**Relação com pico-final:** Tela de transição. Prepara cognitivamente para o questionário. Não deve ser longa.

---

## Tela: Ancora

**Estado emocional esperado:** Auto-reflexão honesta — "onde acho que estamos?"

**Risco atual:** As três opções (Essencial, Explorador, Integrada) têm descrições longas (3-4 linhas cada). O usuário precisa ler bastante antes de escolher. Falta uma linha-resumo que permita reconhecimento imediato.

**Momento de atrito identificado:** Escolher "Essencial" pode gerar constrangimento — equivale a admitir que a escola está no nível mais baixo. O label "Essencial" minimiza esse impacto (não é "Básico" nem "Insuficiente"), mas as descrições longas deixam a sensação de avaliação mais visível.

**Ponto de deleite identificado:** A pergunta "Como você avalia o nível de inovação da sua escola hoje?" é boa — fala diretamente com a identidade profissional do usuário. O botão "Ir para o questionário →" nomeia o destino, não apenas a ação.

**Relação com pico-final:** Âncora psicológica. O valor desta tela aparece no Resultado, quando o app compara a autopercepção com o score real — esse é um momento de insight potente.

---

## Tela: Questoes (4 blocos de 5 questões)

**Estado emocional esperado:** Fluxo (Csikszentmihalyi) — reflexão focada sem atrito

**Risco atual:** O maior risco é quebrar o fluxo. Causas possíveis: (1) não saber onde está na jornada total, (2) botão "Próximo Bloco" desabilitado sem explicação visível quando há questões não respondidas, (3) ausência de feedback imediato ao selecionar uma resposta.

**Momento de atrito identificado:** Transição entre blocos — não há confirmação visual de que o bloco foi completado antes de avançar. O progresso é indicado no topo, mas pode passar despercebido.

**Ponto de deleite identificado:** A escala de 4 pontos ("Não fazemos isso" → "É uma política institucional") é clara e bem calibrada. As questões são concretas e reconhecíveis para quem trabalha em escola.

**Relação com pico-final:** Etapa mais longa. Manter o fluxo aqui é crítico — se o usuário se entediar ou travar, o pico (Resultado) não tem o impacto esperado.

---

## Tela: Loading

**Estado emocional esperado:** Antecipação positiva — "algo significativo está sendo calculado"

**Risco atual:** As mensagens atuais ("Organizando resultados…", "Redigindo devolutiva…", "Finalizando leitura…") são corretas mas neutras. Não transmitem a sensação de que algo personalizado está sendo gerado para aquela escola específica.

**Momento de atrito identificado:** A espera em si. Se durar mais de 15 segundos sem feedback de progresso diferenciado, o usuário pode achar que o app travou.

**Ponto de deleite identificado:** O spinner animado em cereja é visualmente consistente com a marca. O fade das mensagens (via Motion) cria ritmo.

**Relação com pico-final:** Tela de transição crítica — é o momento imediatamente antes do pico. A qualidade emocional desta tela define a abertura do usuário ao receber o resultado.

---

## Tela: Resultado

**Estado emocional esperado:** Clareza + reconhecimento — "esse resultado faz sentido para a minha escola"

**Risco atual:** A tela apresenta simultaneamente: badge de nível, score total, 4 barras de pilar, eixos espectrais, indicador de categoria, ativações Bett e diagnóstico textual (typewriter). A densidade é intencional para um produto de análise, mas a ordem de revelação determina se o usuário sente clareza ou sobrecarga. Atualmente, o nome da escola não é o elemento de maior peso visual.

**Momento de atrito identificado:** O diagnóstico textual em typewriter começa antes do usuário processar os dados visuais acima. A velocidade de 2ms por caractere é rápida demais para leitura confortável — o usuário observa o texto "correr" sem conseguir acompanhar.

**Ponto de deleite identificado (potencial):** A comparação âncora vs. resultado real — quando o app mostra que a escola está acima do que o usuário esperava, é um momento de surpresa positiva. Quando está abaixo, o tom do texto determina se é construtivo ou desconfortável.

**Relação com pico-final:** **ESTE É O PICO.** O investimento de design nesta tela tem retorno desproporcional. Cada segundo aqui molda a memória que o usuário carrega da Geekie.

---

## Tela: CSP (Próximos Passos)

**Estado emocional esperado:** Confiança + próximo passo natural — "sei o que fazer com isso"

**Risco atual:** O título atual ("O próximo passo é compreender a realidade da sua escola com mais profundidade") é longo e fala em nome da Geekie, não do usuário. O badge "Devolutiva pedagógica Geekie" no topo pode ativar o radar de "aqui começa a venda". O botão final "Encerrar diagnóstico" é neutro — não deixa nenhuma frase emocional que o usuário carrega.

**Momento de atrito identificado:** Os três cards de próximos passos descrevem o processo da Geekie (o que a empresa vai fazer), não o benefício para a escola. O usuário pode ler e pensar "isso parece um script de vendas".

**Ponto de deleite identificado:** O campo que personaliza com o nome do contato e e-mail ("O retorno considera os dados preenchidos por [nome]...") é um momento de personalização genuína — confirma que o processo continua a partir do diagnóstico real.

**Relação com pico-final:** **ESTE É O FINAL.** A última frase que o usuário lê antes de sair determina o recall emocional da experiência inteira. Atualmente o app encerra com "Encerrar diagnóstico" — funcional, mas não deixa nenhum sentimento.

---

## Análise Pico-Final

### O PICO

**Tela:** Resultado  
**Momento específico:** O instante em que o usuário vê o nome da escola + o nível (ESSENCIAL / EXPLORADOR / INTEGRADA) pela primeira vez.  
**O que está em jogo emocionalmente:** Validação profissional. A coordenadora passou anos construindo práticas pedagógicas. Ver um diagnóstico externo sobre esse trabalho é ao mesmo tempo desejado e temido. Se o número e o nível "fazem sentido" — se correspondem à autopercepção ou a superam — o resultado gera orgulho e abertura. Se parecer genérico ou injusto, gera rejeição.  
**Gestão atual:** Parcial. O badge de nível é visível e bem estilizado. Falta: nome da escola como elemento de maior peso, destaque do pilar mais forte antes dos gaps, e velocidade de typewriter que permita leitura real.

### O FINAL

**Tela:** CSP  
**Última frase lida:** "Encerrar diagnóstico" (label do botão)  
**Última ação realizada:** Clicar em "Encerrar diagnóstico" e retornar à Splash  
**Último sentimento:** Neutro a levemente decepcionante — o app "acabou" sem ceremony. Não há reconhecimento do esforço de 10 minutos, não há frase que o usuário leva consigo.  
**Gestão atual:** Insuficiente. A tela CSP é funcionalmente correta mas emocionalmente fria. Não cria closure — deixa o usuário "suspenso".

### GAPS IDENTIFICADOS

| Gap                                                       | Impacto                                      | Sprint responsável  |
| --------------------------------------------------------- | -------------------------------------------- | ------------------- |
| Nome da escola não é o maior elemento visual do Resultado | Alto — enfraquece a personalização percebida | S5                  |
| Pilar mais forte não é destacado antes dos gaps           | Alto — perde âncora emocional positiva       | S5                  |
| Typewriter a 2ms/char — não dá para ler                   | Médio — reduz absorção do diagnóstico        | S5                  |
| CSP sem encerramento emocional                            | Alto — último sentimento é neutro            | S5                  |
| Loading com mensagens genéricas                           | Baixo — antecipação não é potencializada     | S5 (ou S7)          |
| Ancora sem linha-resumo (só descrições longas)            | Baixo — autodiagnóstico demora mais          | S4 — já documentado |
