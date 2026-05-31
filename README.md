# Copilot Agents Model

Coleção leve de agentes reutilizáveis para apoiar tarefas de desenvolvimento.

## O que tem aqui

- `src/indexAgents.js` — exporta os agentes principais
- `src/agentFactory.js` — helper para criar novos agentes com interface consistente
- `src/rules.js` — regras de comportamento para cada agente
- `src/agents/agentCode.js` — implementações de código e mudanças técnicas
- `src/agents/assistantAsk.js` — respostas e diagnósticos em modo leitura
- `src/agents/planner.js` — planos de implementação revisáveis
- `src/agents/teacherStudy.js` — explicações didáticas e conceitos
- `test/` — testes automáticos com `node --test`
- `examples/` — exemplos práticos de uso

## Como usar

### 1) Importar os agentes

```js
import { sampleAgents } from './src/indexAgents.js';

const { agentCode, assistantAsk, planner, teacherStudy } = sampleAgents;
```

### 2) Executar um agente

```js
const result = await agentCode.run({
  prompt: 'Adicionar validação em agentFactory',
  context: {
    stack: {
      runtime: 'Node.js 18',
      moduleSystem: 'ESM',
    },
  },
});

console.log(result);
```

### 3) Agentes principais

- `agentCode` — converte requisitos em código, testes e instruções de execução
- `assistantAsk` — responde dúvidas sem editar nada
- `planner` — cria planos com escopo, passos, riscos e validações
- `teacherStudy` — explica conceitos com analogias e exemplos

## Primeiros passos

1) Copie o `sampleAgents` para o seu código:

```js
import { sampleAgents } from './src/indexAgents.js';
const { agentCode, assistantAsk, planner, teacherStudy } = sampleAgents;
```

2) Execute cada agente com um prompt simples:

```js
const codeResult = await agentCode.run({ prompt: 'Melhorar validação de entrada' });
const askResult = await assistantAsk.run({ prompt: 'O que este código faz?' });
const planResult = await planner.run({ prompt: 'Planejar um recurso de login' });
const studyResult = await teacherStudy.run({ prompt: 'Explique event loop do Node.js' });
```

3) Verifique rapidamente o tipo de resposta:

- `agentCode` normalmente retorna um texto com mudanças de código e instruções.
- `assistantAsk` retorna explicações em formato de resposta de ajuda.
- `planner` retorna uma estrutura com passos, riscos e validações.
- `teacherStudy` retorna explicações claras e exemplos didáticos.

4) Personalize `context.stack` se precisar de comportamento específico:

```js
await agentCode.run({
  prompt: 'Adicionar validação em agentFactory',
  context: { stack: { runtime: 'Node.js 20', moduleSystem: 'ESM' } },
});
```

### 4) Criar seu próprio agente

```js
import { createAgent } from './src/agentFactory.js';

const myAgent = createAgent({
  name: 'myAgent',
  description: 'Agente de exemplo',
  run: async ({ prompt, context }) => {
    return `Recebi: ${prompt}`;
  },
});

const output = await myAgent.run({ prompt: 'Teste rápido' });
console.log(output);
```

## Rodar testes e exemplos

- Testes: `node --test`
- Exemplo de bloqueio do event loop: `node examples/blocking.js`
- Exemplo com `worker_threads`: `node examples/worker-solution.js`
- Exemplo rápido de primeiros passos: `node examples/quick-start.js`

## Publicar no GitHub

```bash
git add .
git commit -m "Initial agents scaffold with README and CI"
git push -u origin main
```

## Notas rápidas

- Use `context.stack` nas chamadas para alterar suposições de stack.
- O `createAgent` aceita `logger` opcional, útil para debug.
- O projeto já inclui workflow de CI em `.github/workflows/ci.yml`.

## Licença

MIT
