import { createAgent } from '../agentFactory.js';
import { agentRules } from '../rules.js';

export const assistantAsk = createAgent({
  name: 'assistantAsk',
  description: 'Responde dúvidas e explica código com clareza, sem executar alterações automáticas.',
  rules: [
    ...(agentRules.assistantAsk && agentRules.assistantAsk.guidance ? agentRules.assistantAsk.guidance : []),
    ...(agentRules.assistantAsk && agentRules.assistantAsk.constraints ? agentRules.assistantAsk.constraints : []),
  ],
  run: async ({ prompt, context }) => {
    const question = (prompt || 'explique o comportamento solicitado').trim();

    // Determine if user explicitly asked for code/patch
    const wantsSnippet = Boolean(
      (context && context.requestPatch) || /me dê o código|me dê um patch|patch|snippet|codigo|código|dá pra gerar/i.test(question)
    );

    const summary = `Certo. Resposta curta para: ${question}`;
    const explanation = `Entendi o contexto; segue uma explicação direta.`;
    const howToConfirm = [
      'Reproduza o erro com o comando que falhou (ex.: `node index.js`).',
      'Verifique logs/stack trace para localizar a linha exata do erro.',
    ];
    const options = [
      'Opção A: testar entrada X e confirmar comportamento.',
      'Opção B: inspecionar módulo Y e validar retorno.',
    ];

    const response = {
      identity: 'ASK',
      summary,
      answer: `Aqui está a explicação para: ${question}`,
      explanation,
      howToConfirm,
      options,
      offerSnippet: wantsSnippet ? 'Usuário solicitou snippet/patch explicitamente; incluir abaixo.' : 'Posso fornecer snippet/patch se você pedir explicitamente (diga: me dê o código/patch).',
      guidance: agentRules.assistantAsk.guidance,
      constraints: agentRules.assistantAsk.constraints,
    };

    if (context && context.code) {
      response.codeExplanation = `Recebi um trecho de código com ${String(context.code).length} caracteres; destaquei possíveis pontos de falha.`;
    }

    if (wantsSnippet) {
      response.snippet = '// Exemplo de snippet (apenas exemplo, NÃO APLICAR automaticamente)\nconsole.log("exemplo");';
    }

    return response;
  }
});
