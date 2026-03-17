# Arquitetura e Próximos Passos - Mapa de Inovação Geekie

Este documento descreve a arquitetura do projeto e o plano de execução (sprints) para a construção do Mapa de Inovação Geekie, versão Bett Brasil 2026.

## Arquitetura do Projeto

O projeto foi construído utilizando **React**, **TypeScript**, **Vite** e **Tailwind CSS**, garantindo um código limpo, modular e de fácil manutenção, com divisão clara de pastas.

### Estrutura de Pastas

```
src/
├── components/       # Componentes de UI reutilizáveis (Botões, Cards, Gráficos, etc.)
├── constants/        # Constantes do projeto (Questões, Escalas, Textos de Fallback)
├── screens/          # Telas da aplicação (Splash, Cadastro, Questões, Resultado, Admin, etc.)
├── services/         # Integrações com APIs (Gemini) e Storage (LocalStorage)
├── types/            # Definições de tipos TypeScript
├── App.tsx           # Componente principal e gerenciamento de estado/rotas
├── index.css         # Estilos globais e variáveis do Design System da Geekie
└── main.tsx          # Ponto de entrada da aplicação
```

### Gerenciamento de Estado

O estado principal da aplicação (`AppState`) é mantido no componente `App.tsx` e passado para as telas conforme necessário. O estado inclui:
- Dados da escola (nome, rede, segmentos, etc.)
- Respostas do questionário
- Auto-percepção (âncora)
- Scores calculados (pilares, eixos, total, nível)
- Diagnóstico gerado por IA

### Integração com IA (Gemini)

O diagnóstico personalizado é gerado utilizando a API do **Google Gemini** (`gemini-3.1-pro-preview` com `thinkingLevel: HIGH`), seguindo um prompt estruturado que analisa os scores da escola e gera recomendações acionáveis. Em caso de falha na API, um texto de fallback predefinido por nível é utilizado.

### Persistência de Dados

Os dados são salvos localmente utilizando `localStorage` para garantir que as respostas e diagnósticos não sejam perdidos e possam ser acessados pelo painel de administração (`/admin`).

## Sprints de Execução e Check-lists

### Sprint 1: Estrutura Base e Design System
- [x] Configurar variáveis CSS com as cores e fontes da Geekie (`Mulish` e `Baloo 2`).
- [x] Criar componentes base de UI (Botões, Badges, Layout).
- [x] Implementar navegação entre telas (Splash -> Cadastro -> Instrução).

### Sprint 2: Questionário e Lógica de Scores
- [x] Definir as 20 questões da Categoria 1 no arquivo de constantes.
- [x] Implementar a tela de auto-percepção (Âncora).
- [x] Implementar a tela de questões com paginação (4 blocos de 5 questões).
- [x] Desenvolver a função de cálculo de scores (Pilares, Eixos, Total, Nível).

### Sprint 3: Tela de Resultado (Visualização de Dados)
- [x] Implementar o gráfico Radar utilizando `recharts`.
- [x] Criar os cards de pilares com barras de progresso.
- [x] Implementar o comparativo de eixos (Pedagógico vs Tecnológico).
- [x] Adicionar o comparativo de auto-percepção vs score real.

### Sprint 4: Integração com IA (Gemini)
- [x] Configurar o serviço de integração com a API do Gemini.
- [x] Criar o prompt dinâmico com base nos dados da escola e scores.
- [x] Implementar o efeito "typewriter" para a exibição do diagnóstico.
- [x] Configurar textos de fallback em caso de erro na API.

### Sprint 5: Persistência e Painel Admin
- [x] Implementar serviço de storage (`localStorage`).
- [x] Salvar os dados da escola ao finalizar o questionário.
- [x] Criar a tela de Admin (`#admin`) com tabela de escolas.
- [x] Adicionar funcionalidade de exportação para CSV.

### Sprint 6: Finalização e Polimento
- [x] Implementar a tela de contato com o CSP (Customer Success Partner).
- [x] Adicionar estilos específicos para impressão (`@media print`).
- [x] Implementar o "Modo Kiosk" (reset automático após inatividade).
- [x] Revisão final de UI/UX e responsividade.
