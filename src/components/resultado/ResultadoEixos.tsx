import React from 'react';

import { EixoEspectro } from '../EixoEspectro';
import { CategoryIndicator } from '../CategoryIndicator';
import type { Scores } from '../../types';

interface Props {
  scores: Scores;
}

export function ResultadoEixos({ scores }: Props) {
  return (
    <section
      aria-labelledby="eixos-heading"
      className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8"
    >
      <div>
        <h2
          id="eixos-heading"
          className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6"
        >
          Eixos de Inovação
        </h2>
        <div className="space-y-10">
          <EixoEspectro
            label="Eixo Geral"
            score={scores.total}
            extremoEsquerdo="Clássica"
            extremoDireito="Inovadora"
            cor="#ff1547"
            isMain
            tooltip="Resultado combinado da inovação pedagógica e tecnológica da sua escola — dois eixos avaliados de forma independente e integrados nesta pontuação única."
          />
          <div className="space-y-8 pt-2">
            <EixoEspectro
              label="Eixo Pedagógico"
              score={scores.eixos.pedagogico}
              extremoEsquerdo="Transmissivo"
              extremoDireito="Protagonista"
              cor="#6146f1"
              tooltip="Transformação intencional das práticas de ensino, aprendizagem, avaliação e formação docente em direção a modelos que ampliem o protagonismo do estudante. Avaliado aqui pela categoria Currículo e organização da aprendizagem."
            />
            <EixoEspectro
              label="Eixo Tecnológico"
              score={scores.eixos.tecnologico}
              extremoEsquerdo="Analógica"
              extremoDireito="Conectada"
              cor="#FF8219"
              tooltip='Incorporação intencional de recursos digitais ao fluxo pedagógico, de modo que ampliem as possibilidades de aprendizagem. O indicador não é "a escola tem plataforma", mas "a plataforma é parte da rotina".'
            />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-8">
        <h3
          id="perfil-heading"
          className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6"
        >
          Perfil de Inovação
        </h3>
        <CategoryIndicator nivel={scores.nivel} score={scores.total} />
      </div>
    </section>
  );
}
