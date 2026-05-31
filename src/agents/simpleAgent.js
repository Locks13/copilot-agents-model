import { createAgent } from '../agentFactory.js';

export const simpleResponder = createAgent({
  name: 'simpleResponder',
  description: 'Retorna uma resposta curta e clara para o prompt fornecido.',
  run: async ({ prompt }) => {
    return `Resposta do agente: ${prompt}`;
  }
});
