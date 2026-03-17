export const QUESTOES = [
  { id: '1.1', pilar: 'aprendizagem_ativa', eixo: 'pedagogico', texto: 'Minha escola organiza o currículo de forma a incluir projetos que mobilizam os estudantes a aplicar conhecimentos para resolver problemas reais ou contextualizados.' },
  { id: '1.2', pilar: 'aprendizagem_ativa', eixo: 'pedagogico', texto: 'O currículo da minha escola prevê, de forma explícita, o desenvolvimento de competências socioemocionais e do pensamento crítico como objetivos de aprendizagem em todos os segmentos.' },
  { id: '1.3', pilar: 'aprendizagem_ativa', eixo: 'tecnologico', texto: 'Minha escola prevê a utilização de recursos e plataformas digitais que ampliam as possibilidades de investigação, produção e autoria dos estudantes no desenvolvimento das atividades curriculares.' },
  { id: '1.4', pilar: 'aprendizagem_ativa', eixo: 'pedagogico', texto: 'Minha escola adota materiais didáticos e recursos pedagógicos que orientam a realização de atividades investigativas, colaborativas ou baseadas em projetos.' },
  { id: '1.5', pilar: 'aprendizagem_ativa', eixo: 'pedagogico', texto: 'Minha escola organiza o planejamento docente de forma a prever experiências de aprendizagem em que os estudantes participam ativamente da construção do conhecimento.' },
  
  { id: '1.6', pilar: 'visibilidade', eixo: 'pedagogico', texto: 'Minha escola organiza o currículo com objetivos de aprendizagem claros e progressivos, permitindo que estudantes e professores compreendam o percurso de desenvolvimento esperado.' },
  { id: '1.7', pilar: 'visibilidade', eixo: 'pedagogico', texto: 'Minha escola integra ao currículo práticas que incentivam os estudantes a refletir sobre seu processo de aprendizagem e a acompanhar seu próprio progresso.' },
  { id: '1.8', pilar: 'visibilidade', eixo: 'tecnologico', texto: 'Minha escola dispõe de painéis ou relatórios digitais atualizados que consolidam dados de desempenho dos estudantes e são acessíveis à equipe pedagógica para consulta e tomada de decisão.' },
  { id: '1.9', pilar: 'visibilidade', eixo: 'pedagogico', texto: 'Minha escola adota materiais didáticos que explicitam objetivos de aprendizagem, critérios de sucesso e evidências esperadas de desenvolvimento das habilidades.' },
  { id: '1.10', pilar: 'visibilidade', eixo: 'pedagogico', texto: 'Minha escola orienta o planejamento docente a partir de objetivos de aprendizagem claros e de estratégias para monitorar continuamente o progresso dos estudantes.' },

  { id: '1.11', pilar: 'flexibilidade', eixo: 'pedagogico', texto: 'Minha escola organiza o currículo de forma a permitir articulações entre diferentes componentes curriculares em torno de temas, projetos ou problemas relevantes.' },
  { id: '1.12', pilar: 'flexibilidade', eixo: 'pedagogico', texto: 'Os professores da minha escola têm autonomia para ajustar a sequência, a profundidade e o tempo dedicado aos temas do currículo com base nas necessidades observadas na turma.' },
  { id: '1.13', pilar: 'flexibilidade', eixo: 'pedagogico', texto: 'Minha escola adota materiais didáticos que permitem integrar diferentes metodologias e organizar experiências de aprendizagem variadas ao longo do percurso formativo.' },
  { id: '1.14', pilar: 'flexibilidade', eixo: 'pedagogico', texto: 'Minha escola organiza o planejamento docente de forma flexível, permitindo ajustes nas estratégias de ensino conforme o progresso e as necessidades da turma.' },
  { id: '1.15', pilar: 'flexibilidade', eixo: 'tecnologico', texto: 'Minha escola utiliza plataforma digital para organizar conteúdo programático e adaptar sequência didática de acordo com a necessidade de cada turma.' },

  { id: '1.16', pilar: 'personalizacao', eixo: 'pedagogico', texto: 'Minha escola promove atividades que incentivam os estudantes a fazer escolhas, definir metas e assumir maior responsabilidade por sua aprendizagem.' },
  { id: '1.17', pilar: 'personalizacao', eixo: 'pedagogico', texto: 'Na minha escola, planejamento curricular inclui estratégias específicas de diferenciação para estudantes com deficiência, transtornos de aprendizagem ou altas habilidades.' },
  { id: '1.18', pilar: 'personalizacao', eixo: 'tecnologico', texto: 'Minha escola utiliza plataformas digitais com recursos adaptativos integrados ao currículo, de modo que os percursos individuais de aprendizagem sejam ajustados com base em dados de desempenho.' },
  { id: '1.19', pilar: 'personalizacao', eixo: 'pedagogico', texto: 'Na minha escola, as propostas curriculares oferecem diferentes formas de acesso ao conhecimento (atividades, recursos ou abordagens variadas).' },
  { id: '1.20', pilar: 'personalizacao', eixo: 'pedagogico', texto: 'Na minha escola, a organização curricular prevê momentos em que os estudantes podem avançar ou aprofundar conteúdos de acordo com seu ritmo de aprendizagem.' }
];

export const ESCALA_RESPOSTAS = [
  { valor: 1, texto: 'Discordo completamente' },
  { valor: 2, texto: 'Discordo' },
  { valor: 3, texto: 'Concordo' },
  { valor: 4, texto: 'Concordo completamente' }
];

export const FALLBACK_DIAGNOSTICO = {
  ESSENCIAL: `Sua escola está no início de uma jornada importante de inovação.

**Pontos fortes identificados:**
- Disposição institucional para iniciar o processo de transformação
- Reconhecimento da importância da inovação pedagógica
- Base estrutural para desenvolver novas práticas

**Oportunidades prioritárias:**
- Estruturar um plano de inovação com metas de médio prazo
- Investir em formação docente voltada a metodologias ativas
- Iniciar o uso intencional de dados para orientar decisões pedagógicas

**Próximos passos:** Agende uma conversa com seu consultor Geekie para construir juntos um plano de implementação adaptado à realidade da sua escola.`,

  EXPLORADOR: `Sua escola está em processo consistente de transformação pedagógica.

**Pontos fortes identificados:**
- Práticas inovadoras em desenvolvimento em múltiplos eixos
- Consciência institucional sobre a importância da inovação
- Iniciativas pedagógicas que apontam para maior protagonismo estudantil

**Oportunidades prioritárias:**
- Sistematizar as práticas que ainda ocorrem de forma isolada
- Ampliar o uso de dados para personalizar percursos de aprendizagem
- Fortalecer a cultura de formação docente contínua e estruturada

**Próximos passos:** Seu consultor Geekie pode ajudar a mapear quais pilares têm maior potencial de evolução e definir prioridades para o próximo ciclo.`,

  INTEGRADA: `Sua escola demonstra maturidade consolidada em inovação educacional.

**Pontos fortes identificados:**
- Cultura institucional de inovação integrada ao currículo e à gestão
- Uso intencional de tecnologia articulado às práticas pedagógicas
- Processos estruturados de formação docente e uso de dados

**Oportunidades prioritárias:**
- Expandir as práticas consolidadas para todos os segmentos
- Aprofundar ciclos de diagnóstico, intervenção e reavaliação
- Compartilhar a experiência da escola como referência para a rede

**Próximos passos:** Converse com seu consultor Geekie para explorar como ampliar o impacto das práticas já consolidadas e atingir novos patamares de personalização.`
};

export const CSP_COPY = {
  ESSENCIAL: {
    titulo: 'Identificamos oportunidades claras de evolução',
    subtitulo: 'Seu consultor Geekie pode apresentar um plano de implementação adaptado à sua realidade.'
  },
  EXPLORADOR: {
    titulo: 'Sua escola está no caminho certo',
    subtitulo: 'Veja como potencializar os pilares que ainda têm espaço para crescer.'
  },
  INTEGRADA: {
    titulo: 'Sua escola lidera em inovação',
    subtitulo: 'Descubra como manter e expandir esse nível de excelência.'
  }
};

export function calculateScores(respostas: Record<string, number>) {
  const pilares = { aprendizagem_ativa: 0, visibilidade: 0, flexibilidade: 0, personalizacao: 0 };
  const eixos = { pedagogico: 0, tecnologico: 0 };
  
  const counts = {
    pilares: { aprendizagem_ativa: 0, visibilidade: 0, flexibilidade: 0, personalizacao: 0 },
    eixos: { pedagogico: 0, tecnologico: 0 }
  };

  let totalSum = 0;
  let totalCount = 0;

  QUESTOES.forEach(q => {
    const val = respostas[q.id];
    if (val) {
      pilares[q.pilar as keyof typeof pilares] += val;
      counts.pilares[q.pilar as keyof typeof counts.pilares] += 1;
      
      eixos[q.eixo as keyof typeof eixos] += val;
      counts.eixos[q.eixo as keyof typeof counts.eixos] += 1;
      
      totalSum += val;
      totalCount += 1;
    }
  });

  // Normaliza a soma de respostas (escala 1-4) para percentual 0-100%.
  // Formula: ((soma - count) / (count * 3)) * 100
  //   - (soma - count) remove o piso de 1 ponto por questao, resultando em 0 quando todas = 1
  //   - (count * 3) e o maximo possivel apos remocao do piso (4-1=3 por questao)
  //   - Resultado: 0% = todas "Discordo completamente", 100% = todas "Concordo completamente"
  const calcPercentage = (sum: number, count: number) => {
    if (count === 0) return 0;
    return Math.round(((sum - count) / (count * 3)) * 100);
  };

  const scores = {
    pilares: {
      aprendizagem_ativa: calcPercentage(pilares.aprendizagem_ativa, counts.pilares.aprendizagem_ativa),
      visibilidade: calcPercentage(pilares.visibilidade, counts.pilares.visibilidade),
      flexibilidade: calcPercentage(pilares.flexibilidade, counts.pilares.flexibilidade),
      personalizacao: calcPercentage(pilares.personalizacao, counts.pilares.personalizacao)
    },
    eixos: {
      pedagogico: calcPercentage(eixos.pedagogico, counts.eixos.pedagogico),
      tecnologico: calcPercentage(eixos.tecnologico, counts.eixos.tecnologico)
    },
    total: calcPercentage(totalSum, totalCount),
    nivel: '' as 'ESSENCIAL' | 'INTEGRADA' | 'EXPLORADOR' | ''
  };

  if (scores.eixos.pedagogico >= 50 && scores.eixos.tecnologico >= 50) {
    scores.nivel = 'INTEGRADA';
  } else if (scores.eixos.pedagogico < 50 && scores.eixos.tecnologico < 50) {
    scores.nivel = 'ESSENCIAL';
  } else {
    scores.nivel = 'EXPLORADOR';
  }

  return scores;
}
