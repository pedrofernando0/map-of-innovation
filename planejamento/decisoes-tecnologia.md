# Decisões de Tecnologia — Análise e Benefícios

_Atualizado: Março 2026_

> Este documento não é um plano de execução — é um registro de raciocínio.
> Serve para quem precisa decidir **se** e **quando** adotar cada tecnologia,
> sem precisar ser desenvolvedor para entender o impacto.

---

## 1. API de Inteligência Artificial para o Diagnóstico

### Contexto atual

Hoje o diagnóstico gerado ao final do questionário é produzido localmente, sem internet, por lógica de pontuação determinística. O resultado é consistente e rápido, mas é o mesmo para qualquer escola com o mesmo perfil de respostas — não há personalização baseada em linguagem natural.

O contrato técnico (`IDiagnosticService`) já existe no código. Isso significa que conectar uma API de IA no futuro **não exige reescrever o app** — apenas trocar o "motor" por baixo.

### O que uma API de IA mudaria na prática

**Para o gestor escolar que usa o app:**

- O texto do diagnóstico deixaria de ser pré-formatado e passaria a ler como uma análise escrita especificamente para aquela escola, naquele momento — com o nome da escola, o segmento, os pontos fortes e fracos reais identificados nas respostas.
- A linguagem se adaptaria ao tom: mais encorajador para escolas em nível Essencial, mais técnico e aprofundado para escolas em nível Integrada.
- Seria possível incluir referências contextuais (ex: BNCC, tendências de inovação pedagógica) de forma dinâmica, sem precisar atualizar o app.

**Para a Geekie:**

- O diagnóstico se tornaria um diferencial de produto, não apenas uma funcionalidade — algo difícil de replicar por concorrentes sem o mesmo volume de dados e refinamento pedagógico.
- A análise poderia evoluir sem lançar uma nova versão do app: basta ajustar o prompt.

### APIs que fazem sentido considerar

| API                     | Ponto forte                                                   | Consideração                          |
| ----------------------- | ------------------------------------------------------------- | ------------------------------------- |
| **OpenAI (GPT-4o)**     | Qualidade de linguagem em português, ampla adoção             | Custo por token; requer chave de API  |
| **Google Gemini**       | Integração com ecossistema Google, versão gratuita generosa   | Latência pode variar                  |
| **Anthropic (Claude)**  | Respostas longas e estruturadas com boa coerência             | Menos conhecido no mercado brasileiro |
| **Maritaca AI (Sabiá)** | Modelo treinado em português brasileiro, menor latência local | Ecossistema menor, menos documentação |

**Recomendação para quando a decisão for tomada:** começar com OpenAI GPT-4o ou Gemini, com fallback local já existente. O usuário nunca veria uma tela de erro — se a API falhar, o diagnóstico local entra automaticamente.

### O que é necessário para implementar

Do ponto de vista técnico, o trabalho está em grande parte pronto. O que falta:

1. Criar `src/adapters/ExternalDiagnosticAdapter.ts` com a chamada à API escolhida
2. Escrever o prompt base com as respostas do questionário como contexto
3. Adicionar a chave de API às variáveis de ambiente
4. Trocar o adaptador em `AppServicesContext.tsx` (uma linha de código)

**Estimativa de esforço:** 1–2 dias de desenvolvimento após a decisão de qual API usar.

**Dependência de internet:** sim. Para a Bett (uso em estande, sem garantia de rede estável), o fallback local continua sendo a opção mais segura. A API de IA faz mais sentido para uso pós-evento — quando o app for disponibilizado de forma independente ou via link.

---

## 2. Backend com Supabase (ou similar)

### Contexto atual

Hoje todos os dados preenchidos pelos gestores (respostas, nome da escola, nível de diagnóstico) ficam salvos **somente no tablet** onde o app está rodando, via `localStorage`. Isso significa:

- Se o tablet for resetado ou trocado, todos os dados somem.
- Para ver os resultados das escolas, é preciso estar com o tablet em mãos.
- Não é possível enviar o resultado por e-mail, gerar um link compartilhável ou comparar escolas ao longo do tempo.

### O que um backend mudaria na prática

**Para o gestor escolar:**

- Receberia o diagnóstico por e-mail logo após o evento — sem precisar anotar ou fotografar a tela.
- Poderia acessar o resultado pelo celular, semanas depois, via link único.
- Num segundo diagnóstico (ex: daqui a um ano), veria a evolução da escola em relação ao diagnóstico anterior.

**Para a Geekie:**

- Todos os diagnósticos ficam centralizados e acessíveis de qualquer lugar — não apenas no tablet do estande.
- É possível exportar relatórios por estado, rede de ensino ou nível de maturidade.
- O dado acumulado ao longo do tempo vira inteligência de mercado: quais regiões concentram escolas em nível Essencial, quais segmentos estão mais avançados.
- Base para benchmarking anonimizado — cada escola receberia não apenas seu resultado, mas sua posição em relação à média das escolas participantes.

### O que é Supabase (explicado sem jargão)

Supabase é uma plataforma que oferece, num único lugar:

- **Banco de dados:** onde os diagnósticos ficam salvos com segurança, acessíveis de qualquer dispositivo.
- **Autenticação:** sistema de login para o painel admin — sem precisar criar do zero.
- **Storage de arquivos:** se no futuro for necessário salvar PDFs gerados ou imagens, ficam armazenados aqui.
- **Painel visual:** é possível ver e filtrar todos os dados numa interface similar a uma planilha, sem precisar de código.

Tem plano gratuito que suporta confortavelmente o volume de uma ou mais edições da Bett. O custo começa a existir apenas se o número de acessos crescer muito.

### Alternativas ao Supabase

| Opção                 | Ponto forte                                                  | Consideração                                            |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| **Supabase**          | Open source, painel visual amigável, plano gratuito generoso | Requer configuração inicial de banco                    |
| **Firebase (Google)** | Muito maduro, fácil de integrar com outros serviços Google   | Modelo de preço por uso pode surpreender em escala      |
| **PocketBase**        | Leve, pode rodar no próprio servidor, custo zero             | Menos recursos nativos de autenticação e storage        |
| **Airtable + API**    | Interface visual familiar (tipo planilha), sem código        | Não é um banco de dados real; limites no plano gratuito |

**Recomendação:** Supabase é a opção com melhor equilíbrio entre facilidade de adoção, custo inicial zero e capacidade de crescer junto com o produto. Firebase é igualmente válido se já houver familiaridade com o ecossistema Google.

### O que é necessário para implementar

A arquitetura técnica do app já foi desenhada para suportar um backend — o `IStorageRepository` é o contrato que permite trocar o localStorage por qualquer banco sem alterar as telas do app.

O que falta:

1. Criar projeto no Supabase e definir as tabelas (diagnósticos, respostas, escolas)
2. Criar `src/adapters/SupabaseStorageAdapter.ts` implementando `IStorageRepository`
3. Trocar o adaptador em `AppServicesContext.tsx`
4. Configurar autenticação admin via Supabase Auth
5. Ajustar o painel Admin para consumir dados via API em vez de localStorage

**Estimativa de esforço:** 3–5 dias de desenvolvimento (Sprint S9a no roadmap).

**Para a Bett:** não é necessário. O app funciona 100% offline com localStorage. O backend é o próximo passo natural após o evento, quando o volume de dados e a necessidade de acesso remoto justificam a migração.

---

## Resumo das Decisões

| Tecnologia             | Status                                   | Impacto para o usuário                            | Impacto para a Geekie                            | Quando faz sentido                              |
| ---------------------- | ---------------------------------------- | ------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| **API de IA**          | Sem decisão — fallback local em produção | Diagnóstico personalizado por escola              | Diferencial de produto, evolução sem novo deploy | Pós-Bett, quando o app for usado fora do evento |
| **Supabase (backend)** | Sem decisão — localStorage em produção   | E-mail pós-evento, link compartilhável, histórico | Dados centralizados, relatórios, benchmarking    | Pós-Bett, como Sprint S9a                       |

Nenhuma das duas decisões bloqueia a Bett. O app está pronto para o evento com o que existe hoje.
