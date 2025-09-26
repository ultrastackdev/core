import { executeInfra } from '../../../infra';

export const output = executeInfra({ port: 5000 }).then((output) => output);
