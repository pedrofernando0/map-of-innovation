import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { Escola, Scores } from '../types';
import { FALLBACK_DIAGNOSTICO } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function gerarDiagnostico(escola: Escola, scores: Scores, ancora: number | null): Promise<string> {
  const entries = Object.entries(scores.pilares);
  if (entries.length === 0) return FALLBACK_DIAGNOSTICO[scores.nivel as keyof typeof FALLBACK_DIAGNOSTICO];
  const pilarMax = entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const pilarMin = entries.reduce((a, b) => a[1] < b[1] ? a : b)[0];

  const prompt = `ESCOLA: ${escola.nome}, ${escola.cidade}/${escola.estado} | Rede: ${escola.rede} | Segmentos: ${escola.segmentos.join(', ')}
NÍVEL: ${scores.nivel} (${scores.total}/100) | Auto-percepção: ${ancora}/4

PILARES:
- Aprendizagem Ativa: ${scores.pilares.aprendizagem_ativa}/100
- Visibilidade: ${scores.pilares.visibilidade}/100
- Flexibilidade: ${scores.pilares.flexibilidade}/100
- Personalização: ${scores.pilares.personalizacao}/100

EIXOS: Pedagógico ${scores.eixos.pedagogico}/100 | Tecnológico ${scores.eixos.tecnologico}/100
Pilar mais forte: ${pilarMax} | Maior oportunidade: ${pilarMin}

Gere diagnóstico com a seguinte estrutura Markdown:
### Abertura
(2 frases: reconheça o perfil com especificidade)

### Pontos Fortes
(3 bullets: o que a escola já faz bem)

### Oportunidades de Evolução
(3 bullets: lacunas críticas com recomendações concretas)

### Próximos Passos
(1 parágrafo: ação específica para os próximos 30 dias)`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: `Você é consultor pedagógico da Geekie Educação, especializado em inovação educacional.
Regras obrigatórias:
- Linguagem pedagógica e institucional, nunca comercial.
- Seja realista e objetivo. Se os dados forem desencorajadores (scores baixos), aponte as deficiências de forma clara e construtiva, sem otimismo excessivo.
- Separe claramente o que é percepção da escola (baseado nas respostas do questionário) de informações públicas ou pesquisas externas que você possa ter sobre a instituição.
- Recomendações acionáveis nos próximos 90 dias.
- Conecte recomendações aos pilares: Aprendizagem Ativa, Personalização, Visibilidade, Flexibilidade.
- SEMPRE que citar os nomes dos pilares (Aprendizagem Ativa, Visibilidade, Flexibilidade, Personalização), envolva-os em uma tag HTML para destaque: <span style="color: var(--color-geekie-cereja); font-weight: bold;">Nome do Pilar</span>.
- Não mencione produtos da Geekie pelo nome.
- Tom de parceiro, não de vendedor.
- Responda em português brasileiro.
- Limite: 300 palavras.
- Use ** para negrito e - para listas.`,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
      }
    });
    return response.text || FALLBACK_DIAGNOSTICO[scores.nivel as keyof typeof FALLBACK_DIAGNOSTICO];
  } catch (error) {
    console.error("Erro ao gerar diagnóstico", error);
    return FALLBACK_DIAGNOSTICO[scores.nivel as keyof typeof FALLBACK_DIAGNOSTICO];
  }
}
