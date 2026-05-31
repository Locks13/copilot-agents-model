import { createAgent } from '../agentFactory.js';
import { agentRules } from '../rules.js';

export const agentCode = createAgent({
  name: 'agentCode',
  description: 'Transforma requisitos em mudanças reais de código, com testes e qualidade de engenharia.',
  rules: [
    ...(agentRules.agentCode && agentRules.agentCode.stack && agentRules.agentCode.stack.rules ? agentRules.agentCode.stack.rules : []),
    ...(agentRules.agentCode && agentRules.agentCode.principles ? agentRules.agentCode.principles : []),
  ],
  run: async ({ prompt, context }) => {
    const objective = prompt || 'implemente a funcionalidade solicitada';
    // normalize incoming context.stack and declare assumptions when missing
    const stack = (context && context.stack) ? { ...context.stack } : {};
    const assumptions = [];
    if (!stack.runtime) { stack.runtime = 'Node.js 18 (assumido)'; assumptions.push('Assumo runtime: Node.js 18'); }
    if (!stack.framework) { stack.framework = 'Express (assumido)'; assumptions.push('Assumo framework: Express'); }
    if (!stack.moduleSystem) { stack.moduleSystem = 'ESM (assumido)'; assumptions.push('Assumo módulo: ESM'); }
    if (!stack.tests) { stack.tests = 'node:test ou Jest (assumido)'; assumptions.push('Assumo framework de testes: node:test ou Jest'); }

    const implementation = {
      summary: `Construir ou ajustar código para atender: ${objective}`,
      approach: [
        'A - Descobrir: entender requisitos, entradas e restrições.',
        'P - Planejar: listar arquivos afetados, passos e critérios de aceite.',
        'I - Implementar: aplicar mudanças com funções pequenas e testes.',
        'V - Verificar: executar testes unitários e lint/format.',
        'F - Finalizar: checklist, documentação de uso e próximos passos.',
      ],
      filesSuggested: [
        'src/agentFactory.js',
        'src/agents/agentCode.js',
        'test/agents.test.js',
      ],
      examplePatch: `*** Arquivo: src/agents/agentCode.js (exemplo de modificação)\n@@\n-  // implementação antiga (exemplo)\n+  // implementação atualizada: adiciona validação de entrada e exemplos de saída\n+  // Exemplo de código a aplicar: adicionar checagem simples\n+  if (!prompt || typeof prompt !== 'string') {\n+    throw new Error('Prompt inválido: esperado string');\n+  }\n@@\n`,
      tests: 'Adicionar testes que validem o formato de saída e casos de borda; por exemplo testar respostas com prompt vazio, com objetos de contexto grandes e com stacks distintas.'
    };

    return {
      identity: 'AGENT CODE',
      objective,
      assumptions,
      stack,
      analysis: 'Requisitos devem ser convertidos em alterações de código completas, considerando organização, testes e edge cases.',
      implementation,
      outputShape: {
        codeChanges: 'descrição ou trecho de código que deve ser aplicado (ex.: patch/diff)',
        tests: 'estratégia de validação e exemplos de casos de teste',
      },
      instructions: 'Forneça um patch ou implementação de função, incluindo testes e validações; não apenas explique em alto nível. Declare suposições no topo e siga o ciclo A-P-I-V-F.'
    };
  }
});
