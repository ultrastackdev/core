import { executeInfra } from '../../../infra';
import * as pulumi from '@pulumi/pulumi';

const pulumiConfig = new pulumi.Config();

const API_URL = pulumiConfig.require('API_URL');


const DOCKER_RUN_OPTIONS = {
  API_URL,
};

const dockerArgs = pulumi.all(Object.entries(DOCKER_RUN_OPTIONS)).apply(
  (decoded) =>
    `${decoded.reduce((accumulator, currentValue) => {
      return accumulator + `${currentValue[0]}=${currentValue[1]}\n`;
    }, '')}`
);

export const output = executeInfra({ port: 3000, dockerArgs }).then((output) => output);
