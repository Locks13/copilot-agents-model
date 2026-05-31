export function createAgent({ name, description, run, rules = [], logger = console }) {
  // logger: optional (default console) — will be used for debug information during agent.run
  if (logger == null || (typeof logger.debug !== 'function' && typeof logger.log !== 'function')) {
    logger = console;
  }

  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('createAgent: "name" deve ser uma string não vazia');
  }
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error('createAgent: "description" deve ser uma string não vazia');
  }
  if (typeof run !== 'function') {
    throw new Error('createAgent: "run" deve ser uma função');
  }
  if (!Array.isArray(rules)) {
    throw new Error('createAgent: "rules" deve ser um array quando fornecido');
  }

  return {
    name,
    description,
    rules,
    run: async (input = {}) => {
      // basic runtime validation with helpful logging
      if (input === null || typeof input !== 'object') {
        logger.debug && logger.debug(`[agent ${name}] invalid input type`, input);
        throw new Error('agent.run: "input" deve ser um objeto');
      }

      const { prompt = '', metadata = {}, context = {} } = input;

      if (prompt !== '' && typeof prompt !== 'string') {
        logger.debug && logger.debug(`[agent ${name}] invalid prompt type`, typeof prompt);
        throw new Error('agent.run: "prompt" deve ser string quando fornecido');
      }
      if (metadata !== null && typeof metadata !== 'object') {
        logger.debug && logger.debug(`[agent ${name}] invalid metadata type`, typeof metadata);
        throw new Error('agent.run: "metadata" deve ser um objeto quando fornecido');
      }
      if (context !== null && typeof context !== 'object') {
        logger.debug && logger.debug(`[agent ${name}] invalid context type`, typeof context);
        throw new Error('agent.run: "context" deve ser um objeto quando fornecido');
      }

      // log start of execution (use debug if available)
      (logger.debug || logger.log).call(logger, `[agent ${name}] run start`, { prompt: typeof prompt === 'string' ? `${prompt.slice(0,120)}${prompt.length>120? '...':''}` : typeof prompt });

      const payload = { prompt, metadata, context };
      const result = await run(payload);

      (logger.debug || logger.log).call(logger, `[agent ${name}] run end`);
      return result;
    }
  };
}
