// Escala: 1=não fazemos | 2=fazemos pontualmente | 3=fazemos regularmente (rotina, mas não é política formal) | 4=fazemos como política institucional (documentado, monitorado, toda a escola)
export const QUESTOES = [
  {
    id: '1.1',
    pilar: 'aprendizagem_ativa',
    eixo: 'pedagogico',
    texto:
      'Minha escola organiza o currículo de forma a incluir projetos que mobilizam os estudantes a aplicar conhecimentos para resolver problemas reais ou contextualizados.',
    escala: [
      'Não organizamos',
      'Organizamos pontualmente',
      'Organizamos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.2',
    pilar: 'aprendizagem_ativa',
    eixo: 'pedagogico',
    texto:
      'O currículo da minha escola prevê, de forma explícita, o desenvolvimento de competências socioemocionais e do pensamento crítico como objetivos de aprendizagem em todos os segmentos.',
    escala: [
      'Não prevemos',
      'Prevemos pontualmente',
      'Prevemos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.3',
    pilar: 'aprendizagem_ativa',
    eixo: 'tecnologico',
    texto:
      'Minha escola prevê a utilização de recursos e plataformas digitais que ampliam as possibilidades de investigação, produção e autoria dos estudantes no desenvolvimento das atividades curriculares.',
    escala: [
      'Não prevemos',
      'Prevemos pontualmente',
      'Prevemos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.4',
    pilar: 'aprendizagem_ativa',
    eixo: 'pedagogico',
    texto:
      'Minha escola adota materiais didáticos e recursos pedagógicos que orientam a realização de atividades investigativas, colaborativas ou baseadas em projetos.',
    escala: [
      'Não adotamos',
      'Adotamos pontualmente',
      'Adotamos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.5',
    pilar: 'aprendizagem_ativa',
    eixo: 'pedagogico',
    texto:
      'Minha escola organiza o planejamento docente de forma a prever experiências de aprendizagem em que os estudantes participam ativamente da construção do conhecimento.',
    escala: [
      'Não organizamos',
      'Organizamos pontualmente',
      'Organizamos com regularidade',
      'É uma política institucional',
    ],
  },

  {
    id: '1.6',
    pilar: 'visibilidade',
    eixo: 'pedagogico',
    texto:
      'Minha escola organiza o currículo com objetivos de aprendizagem claros e progressivos, permitindo que estudantes e professores compreendam o percurso de desenvolvimento esperado.',
    escala: [
      'Não organizamos',
      'Organizamos pontualmente',
      'Organizamos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.7',
    pilar: 'visibilidade',
    eixo: 'pedagogico',
    texto:
      'Minha escola integra ao currículo práticas que incentivam os estudantes a refletir sobre seu processo de aprendizagem e a acompanhar seu próprio progresso.',
    escala: [
      'Não integramos',
      'Integramos pontualmente',
      'Integramos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.8',
    pilar: 'visibilidade',
    eixo: 'tecnologico',
    texto:
      'Minha escola dispõe de painéis ou relatórios digitais atualizados que consolidam dados de desempenho dos estudantes e são acessíveis à equipe pedagógica para consulta e tomada de decisão.',
    escala: [
      'Não dispomos',
      'Dispomos parcialmente',
      'Dispomos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.9',
    pilar: 'visibilidade',
    eixo: 'pedagogico',
    texto:
      'Minha escola adota materiais didáticos que explicitam objetivos de aprendizagem, critérios de sucesso e evidências esperadas de desenvolvimento das habilidades.',
    escala: [
      'Não adotamos',
      'Adotamos pontualmente',
      'Adotamos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.10',
    pilar: 'visibilidade',
    eixo: 'pedagogico',
    texto:
      'Minha escola orienta o planejamento docente a partir de objetivos de aprendizagem claros e de estratégias para monitorar continuamente o progresso dos estudantes.',
    escala: [
      'Não orientamos',
      'Orientamos pontualmente',
      'Orientamos com regularidade',
      'É uma política institucional',
    ],
  },

  {
    id: '1.11',
    pilar: 'flexibilidade',
    eixo: 'pedagogico',
    texto:
      'Minha escola organiza o currículo de forma a permitir articulações entre diferentes componentes curriculares em torno de temas, projetos ou problemas relevantes.',
    escala: [
      'Não organizamos',
      'Organizamos pontualmente',
      'Organizamos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.12',
    pilar: 'flexibilidade',
    eixo: 'pedagogico',
    texto:
      'Os professores da minha escola têm autonomia para ajustar a sequência, a profundidade e o tempo dedicado aos temas do currículo com base nas necessidades observadas na turma.',
    escala: [
      'Não têm autonomia',
      'Têm autonomia limitada',
      'Têm autonomia na prática',
      'Autonomia garantida institucionalmente',
    ],
  },
  {
    id: '1.13',
    pilar: 'flexibilidade',
    eixo: 'pedagogico',
    texto:
      'Minha escola adota materiais didáticos que permitem integrar diferentes metodologias e organizar experiências de aprendizagem variadas ao longo do percurso formativo.',
    escala: [
      'Não adotamos',
      'Adotamos pontualmente',
      'Adotamos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.14',
    pilar: 'flexibilidade',
    eixo: 'pedagogico',
    texto:
      'Minha escola organiza o planejamento docente de forma flexível, permitindo ajustes nas estratégias de ensino conforme o progresso e as necessidades da turma.',
    escala: [
      'Não organizamos',
      'Organizamos pontualmente',
      'Organizamos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.15',
    pilar: 'flexibilidade',
    eixo: 'tecnologico',
    texto:
      'Minha escola utiliza plataforma digital para organizar conteúdo programático e adaptar sequência didática de acordo com a necessidade de cada turma.',
    escala: [
      'Não utilizamos',
      'Utilizamos pontualmente',
      'Utilizamos com regularidade',
      'É uma política institucional',
    ],
  },

  {
    id: '1.16',
    pilar: 'personalizacao',
    eixo: 'pedagogico',
    texto:
      'Minha escola promove atividades que incentivam os estudantes a fazer escolhas, definir metas e assumir maior responsabilidade por sua aprendizagem.',
    escala: [
      'Não promovemos',
      'Promovemos pontualmente',
      'Promovemos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.17',
    pilar: 'personalizacao',
    eixo: 'pedagogico',
    texto:
      'Na minha escola, o planejamento curricular inclui estratégias específicas de diferenciação para estudantes com deficiência, transtornos de aprendizagem ou altas habilidades.',
    escala: [
      'Não incluímos',
      'Incluímos pontualmente',
      'Incluímos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.18',
    pilar: 'personalizacao',
    eixo: 'tecnologico',
    texto:
      'Minha escola utiliza plataformas digitais com recursos adaptativos integrados ao currículo, de modo que os percursos individuais de aprendizagem sejam ajustados com base em dados de desempenho.',
    escala: [
      'Não utilizamos',
      'Utilizamos pontualmente',
      'Utilizamos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.19',
    pilar: 'personalizacao',
    eixo: 'pedagogico',
    texto:
      'Na minha escola, as propostas curriculares oferecem diferentes formas de acesso ao conhecimento (atividades, recursos ou abordagens variadas).',
    escala: [
      'Não oferecemos',
      'Oferecemos pontualmente',
      'Oferecemos com regularidade',
      'É uma política institucional',
    ],
  },
  {
    id: '1.20',
    pilar: 'personalizacao',
    eixo: 'pedagogico',
    texto:
      'Na minha escola, a organização curricular prevê momentos em que os estudantes podem avançar ou aprofundar conteúdos de acordo com seu ritmo de aprendizagem.',
    escala: [
      'Não prevemos',
      'Prevemos pontualmente',
      'Prevemos com regularidade',
      'É uma política institucional',
    ],
  },
];

// Escala genérica de fallback
export const ESCALA_RESPOSTAS = [
  { valor: 1, texto: 'Não fazemos' },
  { valor: 2, texto: 'Fazemos pontualmente' },
  { valor: 3, texto: 'Fazemos com regularidade' },
  { valor: 4, texto: 'É uma política institucional' },
];

// Threshold (0–100): pilar abaixo desse valor exibe ativações da Bett correspondentes
export const ATIVACAO_THRESHOLD = 50;

export interface Ativacao {
  titulo: string;
  descricao: string;
  tag: 'Lançamento' | 'Novidade 2026' | 'Expansão' | 'Destaque';
  impacto: string; // como sua escola pode evoluir através desta prática
}

export interface AtivacoesPilar {
  pilar: string;
  corPilar: string;
  corFundo: string;
  icone: string;
  intro: string;
  ativacoes: Ativacao[];
}

export const ATIVACOES_BETT: Record<string, AtivacoesPilar> = {
  aprendizagem_ativa: {
    pilar: 'Aprendizagem Ativa',
    corPilar: '#ff1547',
    corFundo: '#fff5f7',
    icone: '⚡',
    intro:
      'Sua escola tem oportunidade de avançar no protagonismo dos estudantes. Conheça o que a Geekie apresenta na Bett 2026 para apoiar essa jornada:',
    ativacoes: [
      {
        titulo: 'Estação Geekie — STEAM no Ensino Fundamental II',
        descricao:
          'Projetos interdisciplinares com entrega física que mobilizam diferentes áreas do conhecimento. Expansão dos projetos STEAM para o Fundamental II, agora com material impresso.',
        tag: 'Expansão',
        impacto:
          'Sua escola pode substituir atividades tradicionais por projetos de investigação reais, fazendo com que o estudante experimente, questione e crie — em vez de apenas reproduzir conteúdo.',
      },
      {
        titulo: 'Educação Digital reformulada — EFAF',
        descricao:
          'Componente curricular com conteúdo mais robusto e entrega física, que explora os desafios do mundo digital por meio de metodologias ativas.',
        tag: 'Novidade 2026',
        impacto:
          'Sua escola pode incorporar ao currículo formal práticas de autoria, investigação e produção digital — transformando o uso da tecnologia em experiência ativa de aprendizagem.',
      },
      {
        titulo: 'Itinerários Formativos — Nova abordagem para o Ensino Médio',
        descricao:
          'Mais de 46 itinerários com temas atuais e contextualizados, incluindo Projeto de Vida e Educação Digital no formato impresso.',
        tag: 'Lançamento',
        impacto:
          'Sua escola pode oferecer percursos em que o estudante faz escolhas reais sobre sua formação — tornando o protagonismo parte da estrutura, não do discurso.',
      },
    ],
  },

  visibilidade: {
    pilar: 'Visibilidade',
    corPilar: '#0fc3e6',
    corFundo: '#f0fbff',
    icone: '👁',
    intro:
      'Sua escola tem oportunidade de tornar o aprendizado mais visível para gestores, professores, estudantes e famílias. Veja o que a Geekie apresenta na Bett 2026:',
    ativacoes: [
      {
        titulo: 'Rotinas do Pensamento — Influência Project Zero (Harvard)',
        descricao:
          'Estratégias pedagógicas que tornam o raciocínio visível enquanto os estudantes aprendem: levantar hipóteses, argumentar, pensar sob diferentes perspectivas e evidenciar conexões.',
        tag: 'Destaque',
        impacto:
          'Sua escola pode fazer com que professores e estudantes enxerguem o processo de pensar — não apenas o resultado — tornando a aprendizagem rastreável e orientada por evidências.',
      },
      {
        titulo: 'Correção de Redação com IA — Geekie Teste',
        descricao:
          'Correção automática com base na matriz do ENEM, com feedbacks imediatos e individualizados, maior frequência de prática e otimização do tempo do professor.',
        tag: 'Lançamento',
        impacto:
          'Sua escola pode ampliar a frequência de avaliações escritas sem sobrecarregar professores — e cada estudante recebe um retorno preciso sobre onde está e o que precisa melhorar.',
      },
      {
        titulo: 'Relatoria — Painel do Gestor, Professor e Aluno',
        descricao:
          'Solução integrada que transforma uso de produtos em insights pedagógicos acionáveis, com dados consolidados por habilidades e competências para cada perfil.',
        tag: 'Destaque',
        impacto:
          'Sua escola pode transformar dados de desempenho em decisões pedagógicas reais — com painéis que mostram o que está funcionando e onde intervir, para cada gestor, professor e estudante.',
      },
    ],
  },

  flexibilidade: {
    pilar: 'Flexibilidade',
    corPilar: '#32cd91',
    corFundo: '#f0fff8',
    icone: '🔀',
    intro:
      'Sua escola tem oportunidade de ampliar sua autonomia curricular e integrar melhor o físico e o digital. Conheça o que a Geekie apresenta na Bett 2026:',
    ativacoes: [
      {
        titulo: 'Nova Coleção Impressa 2027 — EFAI, EFAF e EM',
        descricao:
          'Coleção 100% impressa, com entrega anual, conteúdo atualizado e recursos de integração digital para coleta estratégica de dados por professores e gestores.',
        tag: 'Lançamento',
        impacto:
          'Sua escola pode trabalhar no próprio ritmo, sem depender de conectividade constante — e ainda gerar dados pedagógicos a partir do material impresso, com integração à plataforma digital.',
      },
      {
        titulo: 'Ferramenta de Flexibilidade Curricular',
        descricao:
          'Permite que sua escola reordene os conteúdos do material didático de acordo com a necessidade da equipe pedagógica e o contexto local.',
        tag: 'Novidade 2026',
        impacto:
          'Sua escola pode adaptar a sequência didática à realidade de cada turma — dando ao professor autonomia real para ajustar profundidade, ordem e tempo dos conteúdos.',
      },
      {
        titulo: 'Integração Físico ↔ Digital',
        descricao:
          'Lista de checagem que acompanha o avanço dos alunos no livro e gera dados automaticamente na plataforma digital, com base ampliada de exercícios online.',
        tag: 'Destaque',
        impacto:
          'Sua escola pode combinar o melhor dos dois mundos — a solidez do impresso e a agilidade do digital — adaptando o fluxo de ensino ao contexto de cada turma sem abrir mão de dados.',
      },
    ],
  },

  personalizacao: {
    pilar: 'Personalização',
    corPilar: '#6146f1',
    corFundo: '#f5f3ff',
    icone: '🎯',
    intro:
      'Sua escola tem oportunidade de adaptar o ensino ao ritmo e às necessidades de cada estudante. Veja o que a Geekie apresenta na Bett 2026:',
    ativacoes: [
      {
        titulo: 'Plano de Estudos Personalizado',
        descricao:
          'Transforma dados de desempenho em ações: listas de exercícios adaptadas às dificuldades individuais, recomendações com foco em vestibulares e Calculadora SISU.',
        tag: 'Lançamento',
        impacto:
          'Sua escola pode parar de tratar todos os estudantes da mesma forma — e começar a oferecer intervenções baseadas no desempenho real de cada um, com recomendações automáticas e precisas.',
      },
      {
        titulo: 'Trilhas Pós-Simulados',
        descricao:
          'Após cada simulado, o estudante recebe trilhas de reforço personalizadas com base nos seus resultados, priorizando as habilidades com maior potencial de evolução.',
        tag: 'Destaque',
        impacto:
          'Sua escola pode transformar o pós-simulado em ponto de partida para a evolução — com cada estudante recebendo um percurso diferente, construído a partir das suas lacunas reais.',
      },
      {
        titulo: 'Geekie Teste — Impressão de Avaliações',
        descricao:
          'Sua escola passa a poder imprimir suas avaliações, ampliando a fidelidade à experiência dos vestibulares e mantendo a análise pedagógica automatizada.',
        tag: 'Novidade 2026',
        impacto:
          'Sua escola pode oferecer uma experiência de avaliação mais próxima da realidade dos vestibulares — e ainda obter diagnósticos detalhados por habilidade para personalizar as intervenções seguintes.',
      },
    ],
  },
};

export const CSP_COPY = {
  ESSENCIAL: {
    titulo: 'Identificamos oportunidades claras de evolução',
    subtitulo:
      'Seu consultor Geekie pode apresentar um plano de implementação adaptado à sua realidade.',
  },
  EXPLORADOR: {
    titulo: 'Sua escola está no caminho certo',
    subtitulo: 'Veja como potencializar os pilares que ainda têm espaço para crescer.',
  },
  INTEGRADA: {
    titulo: 'Sua escola lidera em inovação',
    subtitulo: 'Descubra como manter e expandir esse nível de excelência.',
  },
};
