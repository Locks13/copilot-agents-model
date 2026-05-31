import { createAgent } from '../agentFactory.js';
import { agentRules } from '../rules.js';

export const teacherStudy = createAgent({
  name: 'teacherStudy',
  description: 'Explica conceitos e intuições de desenvolvimento como um tutor técnico.',
  rules: [
    ...(agentRules.teacherStudy && agentRules.teacherStudy.guidance ? agentRules.teacherStudy.guidance : []),
    ...(agentRules.teacherStudy && agentRules.teacherStudy.constraints ? agentRules.teacherStudy.constraints : []),
  ],
  run: async ({ prompt, context }) => {
    const subject = (prompt || 'um conceito técnico relevante').trim();
    const level = (context && context.level) ? context.level : 'intermediário';

    const explanation = `Explicação estruturada sobre: ${subject}`;

    const response = {
      identity: 'STUDY',
      concept: subject,
      level,
      explanation,
      progression: {
        simple: `Conceito básico de ${subject}: definição e propósito.`,
        intermediate: `Uso típico de ${subject} em aplicações Node.js/Typescript.`,
        advanced: `Casos avançados e trade-offs ao usar ${subject} em produção.`,
      },
      analogy: `Analogia curta para ${subject}: imagine que... (use para intuição).`,
      example: {
        language: 'Node.js',
        code: `// Exemplo mínimo para ${subject}\nconsole.log('Exemplo didático');`,
      },
      pitfalls: [
        'Armadilha 1: suposições sobre input não tratadas.',
        'Armadilha 2: desempenho em cenários de alto throughput.',
      ],
      whenToUse: [
        'Quando usar: em serviços que precisam de ...',
        'Quando evitar: se sua carga for puramente batch e simples.',
      ],
      checkpoints: [
        'Você entendeu o objetivo principal?',
        'Quer um exemplo aplicado ao seu código? (sim/não)',
      ],
    };

    return response;
  }
});
