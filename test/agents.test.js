import assert from 'node:assert';
import { describe, it } from 'node:test';
import { agentCode, assistantAsk, planner, teacherStudy } from '../src/indexAgents.js';
import { createAgent } from '../src/agentFactory.js';

describe('Agent package', () => {
  it('exports four agents', () => {
    assert.equal(agentCode.name, 'agentCode');
    assert.equal(assistantAsk.name, 'assistantAsk');
    assert.equal(planner.name, 'planner');
    assert.equal(teacherStudy.name, 'teacherStudy');
  });

  it('agentCode returns structured implementation guidance', async () => {
    const result = await agentCode.run({ prompt: 'Adicionar um agente de exemplo' });
    assert.equal(result.identity, 'AGENT CODE');
    assert.ok(result.implementation);
    assert.ok(Array.isArray(result.implementation.approach));
  });

  it('assistantAsk returns an answer structure', async () => {
    const result = await assistantAsk.run({ prompt: 'O que este agente faz?' });
    assert.equal(result.identity, 'ASK');
    assert.ok(result.answer.includes('Aqui está a explicação'));
  });

  it('planner returns a plan with risks and validations', async () => {
    const result = await planner.run({ prompt: 'Planejar a criação de agentes' });
    assert.equal(result.identity, 'PLAN');
    assert.ok(Array.isArray(result.steps));
    assert.ok(Array.isArray(result.risks));
    assert.ok(Array.isArray(result.validations));
  });

  it('teacherStudy returns a concept explanation', async () => {
    const result = await teacherStudy.run({ prompt: 'agentes técnicos' });
    assert.equal(result.identity, 'STUDY');
    assert.ok(result.explanation.includes('Explicação estruturada')); 
  });

  it('createAgent validates required fields', () => {
    assert.throws(() => createAgent({ name: 'bad', description: 'sem run' }), /createAgent/);
  });
});
