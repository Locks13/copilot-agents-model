import { createAgent } from '../agentFactory.js';
import { agentRules } from '../rules.js';

export const planner = createAgent({
  name: 'planner',
  description: 'Gera um plano de implementação revisável com passos, riscos e validações.',
  rules: [
    ...(agentRules.planner && agentRules.planner.guidance ? agentRules.planner.guidance : []),
    ...(agentRules.planner && agentRules.planner.constraints ? agentRules.planner.constraints : []),
  ],
  run: async ({ prompt, context }) => {
    const objective = prompt || 'defina um plano de implementação';

    const assumptions = [];
    // infer stack assumptions from context if provided
    const stack = (context && context.stack) ? { ...context.stack } : { runtime: 'Node.js (assumido)', language: 'TypeScript (assumido)' };
    if (!context || !context.stack) {
      assumptions.push('Assumo stack padrão: Node.js + TypeScript');
    }

    const plan = {
      identity: 'PLAN',
      objective,
      contextAndAssumptions: {
        assumptions,
        stack,
      },
      scope: {
        includes: ['Definição de critérios de aceite', 'Implementação incremental com testes', 'Documentação de uso básica'],
        excludes: ['Deploy em produção', 'Mudanças em infra crítica sem aprovação'],
      },
      strategy: [
        'Adotar abordagem incremental: pequenas entregas com validação contínua.',
        'Escrever testes antes ou junto com a implementação (TDD quando possível).',
      ],
      filesAffected: [
        'src/agents/*.js',
        'src/agentFactory.js',
        'test/*.test.js',
      ],
      steps: [
        'Revisar requisitos e confirmar escopo (checkpoint).',
        'Criar testes que definam o comportamento esperado (unitários).',
        'Implementar alterações mínimas para passar nos testes.',
        'Executar lint/format e rodar a suíte de testes.',
        'Preparar PR com descrição clara e critérios de aceite.',
      ],
      validations: [
        'Os novos testes passam localmente (ex.: `node --test`).',
        'Cobertura mínima definida para as mudanças críticas.',
      ],
      testsAndValidation: {
        summary: 'Plano de testes: unitários, integrações e validações de aceitação.',
        commands: [
          'Executar testes unitários: `node --test` (ou `npm test` / `npx jest` conforme setup).',
          'Executar lint e format: `npx eslint .` e `npx prettier --check .`.',
          'Executar testes de integração localmente com dependências em memória ou containers (ex.: docker-compose).',
        ],
        cases: {
          unit: [
            'Comportamento nominal: função X retorna Y para input válido.',
            'Casos de borda: inputs vazios, nulos, tipos inválidos.',
            'Erros esperados: validação dispara erro com mensagem clara.',
          ],
          integration: [
            'Fluxo completo HTTP: endpoint responde 200 com payload correto.',
            'Falha de dependência: simular banco indisponível e validar fallback/erro.',
            'Autenticação: validar respostas 401/403 quando aplicável.',
          ],
          acceptance: [
            'Critérios de aceite documentados e verificáveis via testes automatizados.',
            'Testes E2E mínimos cobrindo o caminho crítico do usuário.',
          ],
          performance: [
            'Testar latência do endpoint sob carga (ex.: 100 req/s) e validar SLAs.',
            'Monitorar uso de memória em cenários de alto throughput.',
          ],
          security: [
            'Verificar validação contra injeção (SQL/NoSQL), XSS e SSRF onde aplicável.',
            'Assegurar não expondo segredos em logs e mensagens de erro.',
          ],
        },
        edgeCases: [
          'Payloads muito grandes (streaming ou chunking).',
          'Concorrência: múltiplas requisições que atualizam o mesmo recurso.',
          'Requisições lentas e timeouts: validar cancelamento e retry limitada.',
          'Dados parcialmente corretos: validação e mensagens de erro úteis.',
        ],
        ciChecks: [
          'Incluir etapa no CI para rodar `npx eslint` e suite de testes antes do merge.',
          'Executar checks de segurança automáticos (ex.: dependabot, npm audit).',
        ],
      },
      risks: [
        'Escopo excessivo: mitigação — dividir em pequenos PRs.',
        'Breaking changes em APIs: mitigação — adicionar compat shim ou feature flag.',
      ],
      nextSteps: 'Se aprovar o plano, posso gerar o patch correspondente (diga: gere o patch).',
      questions: [],
    };

    return plan;
  }
});
