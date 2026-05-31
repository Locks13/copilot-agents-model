import { agentCode } from './agents/agentCode.js';
import { assistantAsk } from './agents/assistantAsk.js';
import { planner } from './agents/planner.js';
import { teacherStudy } from './agents/teacherStudy.js';
export { createAgent } from './agentFactory.js';

export { agentCode, assistantAsk, planner, teacherStudy };

export const sampleAgents = {
  agentCode,
  assistantAsk,
  planner,
  teacherStudy,
};

export default sampleAgents;
