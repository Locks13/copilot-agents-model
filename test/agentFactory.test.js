import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createAgent } from '../src/agentFactory.js';

describe('createAgent validation', () => {
  it('throws on missing run', () => {
    assert.throws(() => createAgent({ name: 'a', description: 'b' }), /run/);
  });

  it('throws on invalid name/description types', () => {
    assert.throws(() => createAgent({ name: '', description: 'desc', run: () => {} }), /name/);
    assert.throws(() => createAgent({ name: 'n', description: '', run: () => {} }), /description/);
  });

  it('throws when rules is not array', () => {
    assert.throws(() => createAgent({ name: 'n', description: 'd', run: () => {}, rules: 'no' }), /rules/);
  });

  it('agent.run validates input types', async () => {
    const a = createAgent({ name: 'a', description: 'd', run: async ({ prompt }) => ({ ok: true })});
    // valid
    await a.run({ prompt: 'hi' });
    // invalid inputs
    await assert.rejects(() => a.run(null), /input/);
    await assert.rejects(() => a.run({ prompt: 123 }), /prompt/);
    await assert.rejects(() => a.run({ metadata: 'x' }), /metadata/);
    await assert.rejects(() => a.run({ context: 'x' }), /context/);
  });
});
