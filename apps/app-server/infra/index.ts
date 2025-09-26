import { executeInfra } from '../../../infra';
import * as pulumi from '@pulumi/pulumi';

const pulumiConfig = new pulumi.Config();

// const DB_URL = pulumiConfig.requireSecret('DB_URL');
// const JWT_SECRET = pulumiConfig.requireSecret('JWT_SECRET');


const DOCKER_RUN_OPTIONS = {
  // DB_URL,
  // JWT_SECRET,
};

const dockerArgs = pulumi.all(Object.entries(DOCKER_RUN_OPTIONS)).apply(
  (decoded) =>
    `${decoded.reduce((accumulator, currentValue) => {
      return accumulator + `${currentValue[0]}=${currentValue[1]}\n`;
    }, '')}`
);

export const output = executeInfra({ port: 9000, dockerArgs }).then((output) => output);
