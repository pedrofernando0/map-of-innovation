import { Escola, Scores } from '../types';

// ─── helpers ────────────────────────────────────────────────────────────────

const PILAR_LABEL: Record<string, string> = {
  aprendizagem_ativa: 'Aprendizagem Ativa',
  visibilidade: 'Visibilidade',
  flexibilidade: 'Flexibilidade',
  personalizacao: 'Personalização',
};

function span(pilar: string) {
  return `<span style="color: var(--color-geekie-cereja); font-weight: bold;">${PILAR_LABEL[pilar] ?? pilar}</span>`;
}

function faixa(score: number): 'baixo' | 'medio' | 'alto' {
  if (score < 40) return 'baixo';
  if (score < 70) return 'medio';
  return 'alto';
}

// ─── abertura por nível ──────────────────────────────────────────────────────

const ABERTURA: Record<string, (escola: Escola, scores: Scores, ancora: number | null) => string> = {
  ESSENCIAL: (escola, scores, ancora) => {
    const gap = ancora !== null ? ancora * 25 - scores.total : null;
    const gapTxt = gap !== null && gap > 15
      ? ` A auto-percepção indicada (${ancora}/4) está acima do score medido (${scores.total}/100), o que sugere que práticas inovadoras ainda dependem de iniciativas individuais e não estão institucionalizadas.`
      : '';
    return `**${escola.nome}** apresenta um perfil de inovação em estágio inicial, com espaço significativo para estruturação intencional das práticas pedagógicas e do uso de tecnologia.${gapTxt}`;
  },
  EXPLORADOR: (escola, scores, ancora) => {
    const entries = Object.entries(scores.pilares);
    const max = entries.reduce((a, b) => a[1] > b[1] ? a : b);
    return `**${escola.nome}** está em processo ativo de transformação pedagógica, com o pilar de ${span(max[0])} como principal referência interna (${max[1]}/100). O desafio central é converter iniciativas promissoras em práticas institucionais consolidadas.`;
  },
  INTEGRADA: (escola, scores) => {
    const entries = Object.entries(scores.pilares);
    const min = entries.reduce((a, b) => a[1] < b[1] ? a : b);
    return `**${escola.nome}** demonstra maturidade consolidada em inovação educacional, com integração intencional entre pedagogia e tecnologia. O pilar de ${span(min[0])} (${min[1]}/100) representa a principal fronteira de expansão para atingir excelência sistêmica.`;
  },
};

// ─── pontos fortes por pilar ─────────────────────────────────────────────────

const FORTES: Record<string, Record<string, string>> = {
  aprendizagem_ativa: {
    alto: `O currículo prevê projetos e metodologias ativas de forma estruturada, colocando o estudante no centro do processo de aprendizagem`,
    medio: `Há iniciativas de aprendizagem ativa em desenvolvimento, com professores engajados na adoção de metodologias investigativas`,
    baixo: `A escola reconhece a importância do protagonismo estudantil e demonstra abertura para iniciar essa transformação`,
  },
  visibilidade: {
    alto: `Objetivos de aprendizagem são claros e progressivos, e o progresso dos estudantes é monitorado de forma sistemática`,
    medio: `Existem práticas de monitoramento e uso de dados, ainda que não totalmente integradas à rotina pedagógica`,
    baixo: `Há potencial para estruturar rotinas de visibilidade do aprendizado, tornando o progresso dos estudantes mais rastreável`,
  },
  flexibilidade: {
    alto: `O planejamento docente é flexível e o currículo permite articulações interdisciplinares com autonomia real dos professores`,
    medio: `Professores têm alguma margem para adaptar sequências didáticas conforme as necessidades da turma`,
    baixo: `A escola demonstra disposição para rever a rigidez curricular e ampliar a autonomia docente no planejamento`,
  },
  personalizacao: {
    alto: `O ensino é diferenciado e orientado por dados, com percursos adaptados ao ritmo e perfil de cada estudante`,
    medio: `Existem estratégias de diferenciação para grupos específicos, com uso crescente de dados para decisões pedagógicas`,
    baixo: `Há espaço para implementar práticas de diferenciação e personalização de forma mais sistemática e baseada em evidências`,
  },
};

// ─── oportunidades por pilar ─────────────────────────────────────────────────

const OPORTUNIDADES: Record<string, Record<string, string>> = {
  aprendizagem_ativa: {
    baixo: `Estruturar ao menos um projeto interdisciplinar por segmento por semestre, com critérios claros de avaliação de competências — transformando o excepcional em rotina no pilar de ${span('aprendizagem_ativa')}`,
    medio: `Institucionalizar as metodologias ativas já praticadas por professores-referência, criando protocolos de planejamento compartilhados para o pilar de ${span('aprendizagem_ativa')}`,
    alto: `Expandir as práticas de ${span('aprendizagem_ativa')} para todos os segmentos e componentes, garantindo que o protagonismo estudantil não dependa do professor mas da proposta curricular`,
  },
  visibilidade: {
    baixo: `Definir objetivos de aprendizagem explícitos por habilidade e torná-los visíveis para estudantes e famílias, como primeiro passo concreto no pilar de ${span('visibilidade')}`,
    medio: `Integrar os dados de desempenho disponíveis às reuniões de planejamento docente, criando ciclos regulares de diagnóstico-intervenção no pilar de ${span('visibilidade')}`,
    alto: `Aprofundar o uso de rubricas e autoavaliação pelos estudantes para fortalecer ainda mais o pilar de ${span('visibilidade')}`,
  },
  flexibilidade: {
    baixo: `Criar espaços formais de planejamento integrado entre componentes curriculares, permitindo que professores articulem conteúdos em torno de temas comuns — base para evoluir no pilar de ${span('flexibilidade')}`,
    medio: `Ampliar a autonomia docente para reorganizar sequências didáticas com base em evidências da turma, fortalecendo o pilar de ${span('flexibilidade')} de forma institucional`,
    alto: `Formalizar e documentar o modelo de flexibilidade curricular adotado para que seja replicável e não dependa de iniciativas individuais no pilar de ${span('flexibilidade')}`,
  },
  personalizacao: {
    baixo: `Iniciar práticas de diferenciação a partir de dados simples de desempenho (exercícios por nível), criando a cultura de personalização no pilar de ${span('personalizacao')}`,
    medio: `Ampliar o uso de plataformas adaptativas e qualificar os professores para interpretar relatórios e intervir de forma personalizada no pilar de ${span('personalizacao')}`,
    alto: `Criar percursos de aprofundamento para estudantes avançados e reforço estruturado para os que precisam — consolidando a excelência no pilar de ${span('personalizacao')}`,
  },
};

// ─── gerador principal ────────────────────────────────────────────────────────

export async function gerarDiagnostico(escola: Escola, scores: Scores, ancora: number | null): Promise<string> {
  const entries = Object.entries(scores.pilares) as [string, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const [pilarMax] = sorted[0];
  const [pilarMin] = sorted[sorted.length - 1];

  // Abertura
  const fn = ABERTURA[scores.nivel] ?? ABERTURA['ESSENCIAL'];
  const abertura = fn(escola, scores, ancora);

  // Pontos fortes: pilar mais alto + eixo pedagógico vs tecnológico
  const fortePilarAlto = FORTES[pilarMax][faixa(scores.pilares[pilarMax as keyof typeof scores.pilares])];
  const fortePilarSeg = FORTES[sorted[1][0]][faixa(sorted[1][1])];
  const forteEixo = scores.eixos.pedagogico >= scores.eixos.tecnologico
    ? `O eixo pedagógico (${scores.eixos.pedagogico}/100) é o ponto de maior consistência da escola, refletindo práticas de ensino mais intencionais que o uso de tecnologia`
    : `O eixo tecnológico (${scores.eixos.tecnologico}/100) está à frente das práticas pedagógicas, indicando infraestrutura disponível que pode ser melhor aproveitada`;

  // Oportunidades: pilar mais baixo + segundo mais baixo + eixo fraco
  const opPilarMin = OPORTUNIDADES[pilarMin][faixa(scores.pilares[pilarMin as keyof typeof scores.pilares])];
  const opPilarSeg = OPORTUNIDADES[sorted[sorted.length - 2][0]][faixa(sorted[sorted.length - 2][1])];
  const eixoFraco = scores.eixos.pedagogico < scores.eixos.tecnologico
    ? `Alinhar as práticas pedagógicas ao nível de infraestrutura tecnológica disponível — a tecnologia existe, mas ainda não está integrada ao fluxo de ensino de forma intencional`
    : `Ampliar o uso intencional de recursos digitais no fluxo pedagógico, transformando a tecnologia de suporte em instrumento ativo de aprendizagem`;

  // Eixos: comparativo auto-percepção
  const ancoraComentario = ancora !== null
    ? scores.total >= ancora * 25 - 5
      ? `A auto-percepção da gestão está alinhada ao diagnóstico medido — sinal de leitura institucional consistente da realidade.`
      : `Vale observar que a auto-percepção da gestão (${ancora}/4) difere do score medido (${scores.total}/100) — uma oportunidade para aprofundar a leitura coletiva sobre o estágio atual da escola.`
    : '';

  return [
    `### Síntese`,
    abertura,
    ancoraComentario,
    ``,
    `### Pontos Fortes`,
    `- ${fortePilarAlto}`,
    `- ${fortePilarSeg}`,
    `- ${forteEixo}`,
    ``,
    `### Oportunidades de Evolução`,
    `- ${opPilarMin}`,
    `- ${opPilarSeg}`,
    `- ${eixoFraco}`,
  ].join('\n');
}
