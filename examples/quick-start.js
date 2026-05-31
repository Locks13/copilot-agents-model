import { sampleAgents } from '../src/indexAgents.js';

const { agentCode, assistantAsk, planner, teacherStudy } = sampleAgents;

async function runQuickStart() {
  const codeResult = await agentCode.run({ prompt: 'Melhorar validação de entrada em agentFactory' });
  console.log('=== agentCode ===');
  console.log(codeResult);

  const askResult = await assistantAsk.run({ prompt: 'O que faz o módulo agentFactory?' });
  console.log('\n=== assistantAsk ===');
  console.log(askResult);

  const planResult = await planner.run({ prompt: 'Planejar um recurso de autenticação simples' });
  console.log('\n=== planner ===');
  console.log(planResult);

  const studyResult = await teacherStudy.run({ prompt: 'Explique o propósito do createAgent' });
  console.log('\n=== teacherStudy ===');
  console.log(studyResult);
}

runQuickStart().catch((error) => {
  console.error('Erro no quick-start:', error);
  process.exit(1);
});
