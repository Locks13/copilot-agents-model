# Copilot Agents Model

Este repositório contém um conjunto leve de agentes reutilizáveis e fáceis de integrar em outros projetos.

## Estrutura

- `src/indexAgents.js` - exporta os agentes disponíveis.
- `src/agentFactory.js` - helper para criar agentes com interface consistente e regras.
- `src/rules.js` - regras de comportamento para cada agente.
- `src/agents/agentCode.js` - agente para implementação técnica de código.
- `src/agents/assistantAsk.js` - agente para dúvidas, explicações e diagnósticos.
- `src/agents/planner.js` - agente para planejamento de implementação.
- `src/agents/teacherStudy.js` - agente para ensino e compreensão de conceitos.

## Agentes

- `agentCode`: transforma requisitos em mudanças de código completas, com qualidade de engenharia.
- `assistantAsk`: responde dúvidas e explica código sem executar mudanças.
- `planner`: produz planos de implementação revisáveis com passos, riscos e validações.
- `teacherStudy`: explica conceitos, intuição e trade-offs como um tutor.

# Copilot Agents Model

Coleção de agentes reutilizáveis e opinionados para apoiar tarefas de desenvolvimento.

Principais agentes incluídos
- `agentCode` — transforma requisitos em mudanças de código completas (patchs/diffs, testes, instruções).
- `assistantAsk` — responde dúvidas, explica trechos de código e diagnostica, sem aplicar mudanças automaticamente.
- `planner` — produz planos de implementação revisáveis (escopo, passos, riscos, validações).
- `teacherStudy` — explica conceitos técnicos com progressão didática, analogias e exemplos.

Estrutura do repositório
- `src/` — código-fonte dos agentes e helpers.
- `test/` — testes automatizados (use `node --test`).
- `examples/` — exemplos executáveis (bloqueio do event loop e `worker_threads`).

Instalação e uso local
1. Clone o repositório e instale dependências (se houver):

```bash
git clone <repo> && cd copilot-agents-model
# não há dependências externas por padrão — apenas Node.js
```

2. Importar e usar os agentes em outro projeto (ESM):

```js
import { sampleAgents } from './src/indexAgents.js';
const { agentCode } = sampleAgents;

const result = await agentCode.run({
  prompt: 'Adicionar validação em agentFactory',
  context: { stack: { runtime: 'Node.js 18', moduleSystem: 'ESM' } },
});
console.log(result);
```

Logger opcional
`createAgent` aceita um parâmetro `logger` (padrão `console`). Exemplo:

```js
import { createAgent } from './src/agentFactory.js';

const customLogger = { log: (...args) => /* escrever em arquivo */ null, debug: () => null };
const a = createAgent({ name: 'x', description: 'y', run: async () => {}, logger: customLogger });
```

Rodando testes e exemplos
- Testes: `node --test` (executa os testes em `test/`).
- Exemplos: `node examples/blocking.js` e `node examples/worker-solution.js`.

Publicar no GitHub (passos rápidos)

```bash
# 1. Inicialize repositório remoto e adicione origem
git init
git add .
git commit -m "Initial agents scaffold"
git branch -M main
git remote add origin git@github.com:<seu-usuario>/<repo>.git
git push -u origin main
```

Notas e suposições
- Por padrão os agentes assumem uma stack moderna (Node.js 18+ e ESM) quando a informação de stack não for fornecida — a suposição é declarada nas respostas do agente. Ajuste `context.stack` nas chamadas para alterar o comportamento.
- Os agentes foram projetados para serem fáceis de importar em outros projetos; o `createAgent` valida inputs e aceita `logger` opcional.

Contribuição
- Sinta-se à vontade para abrir PRs com melhorias, adicionar agentes ou adaptar o estilo de resposta.

Licença
- MIT
