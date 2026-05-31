import { createAgent } from '../agentFactory.js';

export const projectHelper = createAgent({
  name: 'projectHelper',
  description: 'Ajuda a gerar um plano de ação ou estrutura de projeto a partir de um objetivo.',
  run: async ({ prompt }) => {
    const objective = prompt || 'descrever o objetivo';
    return {
      objective,
      steps: [
        'Analisar o objetivo e dividir em etapas claras.',
        'Definir entregáveis e prazos curtos.',
        'Criar exemplos e documentação para o uso do projeto.',
      ],
      note: `Plano criado para: ${objective}`,
    };
  }
});
