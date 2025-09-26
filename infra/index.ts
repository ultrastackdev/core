import * as linode from '@pulumi/linode';
import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';
import { remote, types } from '@pulumi/command';

interface InfraOptions {
  port: number;
  dockerArgs?: string | pulumi.Output<string>;
}

export const PROJECT_NAME = 'ultra-stack';

export const executeInfra = async ({ port, dockerArgs = '' }: InfraOptions): Promise<{ [key: string]: any }> => {
  const PR_PREFIX = 'pr';
  const PROD_PREFIX = 'prod';
  const pulumiConfig = new pulumi.Config();
  const containerPort = port;

  const env = pulumi.getStack();
  const isPreview = env.startsWith(`${PR_PREFIX}-`);
  const isProd = env.endsWith(`${PROD_PREFIX}`);
  const projectName = pulumi.getProject();
  const projectNameWithEnv = isPreview ? `${env}` : `${projectName}-${env}`;
  const DOCKER_REPO = pulumiConfig.requireSecret('DOCKER_REPO');
  const DOCKER_USER_NAME = pulumiConfig.requireSecret('DOCKER_USER');
  const DOCKER_PASS = pulumiConfig.requireSecret('DOCKER_PASS');
  const INSTANCE_USER = pulumiConfig.requireSecret('INSTANCE_ROOT_USER');
  const INSTANCE_PASS = pulumiConfig.requireSecret('INSTANCE_ROOT_PASS');
  const VERSION_NUMBER = pulumiConfig.require('VERSION_NUMBER');

  // const INSTANCE_SSH_KEY = pulumiConfig.requireSecret('instanceSSHKey');
  // let BALANCERS_COUNT = 0;

  // Push docker image to docker hub

  // Define a Docker image resource that builds an image and pushes it to Docker Hub
  const instanceImage = new docker.Image(`${projectNameWithEnv}-Image`, {
    imageName: pulumi.interpolate`${DOCKER_REPO}:${projectNameWithEnv}`, // Replace 'myusername' with your Docker Hub username and 'myapp' with your image name
    build: {
      platform: 'linux/amd64',
      context: '../', // Replace './app' with the path to your Docker context, usually the directory where your Dockerfile is located
    },

    registry: {
      server: 'docker.io',
      username: DOCKER_USER_NAME, // Replace with your Docker Hub username
      password: DOCKER_PASS, // Replace with your Docker Hub password
    },
  });

  //Output your NodeBalancer's Public IPV4 address and the port we configured to access it
  const baseImageName = instanceImage.baseImageName;

  const instanceConfig = {
    type: 'g6-nanode-1', // This is the type of the instance, you can choose the one that fits your needs
    region: 'eu-central', // Select the region where you want your instance
    image: 'linode/ubuntu20.04', // The image to use for your instance, here we are using Ubuntu 20.04
    rootPass: INSTANCE_PASS, // Replace with a secure password
    // authorizedKeys: [INSTANCE_SSH_KEY], // Replace with your SSH public key
    privateIp: true,
  };
  //
  const instance = new linode.Instance(
    projectNameWithEnv,
    {
      ...instanceConfig,
      label: projectNameWithEnv,
    },
    { deleteBeforeReplace: true },
  );

  // const generateNodeBalancerInstance = (): Promise<linode.NodeBalancer> =>
  //   // eslint-disable-next-line no-async-promise-executor
  //   new Promise(async (resolve, reject) => {
  //     const nodeBalancerLabel = `${projectNameWithEnv}-NodeBalancer`;
  //     const filteredInstances = await linode.getNodebalancers({
  //       filters: [
  //         {
  //           name: 'label',
  //           values: [nodeBalancerLabel],
  //         },
  //       ],
  //     });
  //     const id = filteredInstances.nodebalancers?.[0]?.id;
  //     if (id) {
  //       const instance = linode.NodeBalancer.get(
  //         nodeBalancerLabel,
  //         pulumi.interpolate`${id}`
  //       );
  //       resolve(instance);
  //     } else {
  //       const instance = isPreview
  //         ? undefined
  //         : new linode.NodeBalancer(`${nodeBalancerLabel}`, {
  //             clientConnThrottle: 20,
  //             label: `${nodeBalancerLabel}`,
  //             region: 'us-east',
  //           });
  //       resolve(instance);
  //     }
  //   });
  //
  const instanceIpAddress = instance.ipAddress;
  // const instancePrivateIpAddress = instance.privateIpAddress;

  const connection: types.input.remote.ConnectionArgs = {
    host: pulumi.interpolate`${instanceIpAddress}`,
    user: INSTANCE_USER,
    password: INSTANCE_PASS,
  };

  const dockerInstallCommand = pulumi.interpolate`
    # Update your package manager and install Docker
    sudo apt-get update
    if [ -x "$(command -v docker)" ]; then
        echo "docker found"
        # command
    else
        echo "Installing docker"
        # command
        sudo apt-get install -y docker.io
    fi
      `;

  const installDokcer = new remote.Command(
    'installDokcer',
    {
      connection,
      create: dockerInstallCommand,
      update: dockerInstallCommand,
    },
    { dependsOn: instanceImage },
  );

  const dockerStartCommand = pulumi.interpolate`
    # Start the Docker service
    systemctl start docker &&
    docker login -u ${DOCKER_USER_NAME} -p ${DOCKER_PASS} 
  `;

  const startDocker = new remote.Command(
    'startDocker',
    {
      connection,
      create: dockerStartCommand,
      update: dockerStartCommand,
    },
    { dependsOn: installDokcer },
  );

  const dockerCleanCommand = pulumi.interpolate`
    # Clean Containers
    echo ${new Date().toISOString()} &&
    docker stop $(docker ps -aq) 2> /dev/null || echo "No Containers to stop" &&
    docker rm -v $(docker ps -aq) 2> /dev/null || echo "No Containers to remove" &&
    docker rmi -f $(docker images -aq)  2> /dev/null || echo "No Images to remove"
    `;

  const dockerClean = new remote.Command(
    'dockerClean',
    {
      connection,
      create: dockerCleanCommand,
      update: dockerCleanCommand,
    },
    { dependsOn: startDocker },
  );

  const dockerPullCommand = pulumi.interpolate`
  # Pull Image
  echo ${new Date().toISOString()} &&
  docker pull ${baseImageName} 
`;

  const dockerPull = new remote.Command(
    'dockerPull',
    {
      connection,
      create: dockerPullCommand,
      update: dockerPullCommand,
    },
    { dependsOn: dockerClean },
  );

  const dockerCreateEnvCommand = pulumi.interpolate`
    # Create ENV
    echo ${new Date().toISOString()} &&
    echo -e "${dockerArgs}" > .env
  `;

  const dockerCreateEnv = new remote.Command(
    'dockerCreateEnv',
    {
      connection,
      create: dockerCreateEnvCommand,
      update: dockerCreateEnvCommand,
    },
    { dependsOn: dockerPull },
  );

  const dockerRunCommand = pulumi.interpolate`
    # Docker Run
    echo ${new Date().toISOString()} &&
    docker run -d -p 80:${containerPort} -p 8880:8880  --restart always --env-file ./.env -t ${baseImageName}  &&
    echo ${new Date().toISOString()} "---" ${VERSION_NUMBER} >> deploy-time.log
  `;

  const dockerRun = new remote.Command(
    'dockerRun',
    {
      connection,
      create: dockerRunCommand,
      update: dockerRunCommand,
    },
    { dependsOn: dockerCreateEnv },
  );

  // const nodeBalancer: {
  //   port: pulumi.Output<number | undefined>;
  //   ip: pulumi.Output<string>;
  // } = { port: pulumi.output(0), ip: pulumi.output('') };

  // Create and configure your NodeBalancer

  // generateNodeBalancerInstance().then((instance) => {
  //   if (instance) {
  //     const nodeBalancerId = instance.id.apply((id) => parseInt(id));
  //     const nodeBalancerConfig = new linode.NodeBalancerConfig(
  //       `${projectNameWithEnv}-NodeBalancerConfig`,
  //       {
  //         algorithm: 'source',
  //         check: 'http',
  //         checkAttempts: 3,
  //         checkTimeout: 30,
  //         checkInterval: 40,
  //         checkPath: '/',
  //         nodebalancerId: nodeBalancerId as unknown as pulumi.Input<number>,
  //         port: 80,
  //         protocol: 'http',
  //         stickiness: 'http_cookie',
  //       }
  //     );
  //     const balancerNode = new linode.NodeBalancerNode(
  //       `${projectNameWithEnv}-BalancerNode`,
  //       {
  //         address: pulumi.concat(
  //           instancePrivateIpAddress,
  //           ':',
  //           containerPort
  //         ),
  //         configId: nodeBalancerConfig.id.apply((id) => parseInt(id)),
  //         label: `${projectNameWithEnv}-BalancerNode${++BALANCERS_COUNT}`,
  //         nodebalancerId: nodeBalancerId,
  //         weight: 100,
  //       }
  //     );
  //     nodeBalancer.port = nodeBalancerConfig.port;
  //     nodeBalancer.ip = instance.ipv4;
  //   }
  // });

  const output = {
    // nodeBalancer,
    instance,
    installDokcer: { out: installDokcer.stdout, err: installDokcer.stderr },
    startDocker: { out: startDocker.stdout, err: startDocker.stderr },
    dockerClean: { out: dockerClean.stdout, err: dockerClean.stderr },
    dockerPull: { out: dockerPull.stdout, err: dockerPull.stderr },
    dockerCreateEnv: {
      out: dockerCreateEnv.stdout,
      err: dockerCreateEnv.stderr,
    },
    dockerRun: { out: dockerRun.stdout, err: dockerRun.stderr },
    url: pulumi.interpolate`${instanceIpAddress}`,
  };

  return output;
};
/////// LKE SETUP for scalability later //////////

// import * as linode from "@pulumi/linode";
// import * as k8s from "@pulumi/kubernetes";

// // Create a new LKE cluster.
// const cluster = new linode.LkeCluster("my-cluster", {
//     label: "my-cluster",
//     k8sVersion: "1.20",
//     region: "us-central",
//     nodePools: [{
//         type: "g6-standard-2",
//         count: 3,
//     }],
// });

// // Export the Kubeconfig.
// export const kubeconfig = cluster.kubeconfig;

// // Create a Kubernetes provider instance using the kubeconfig from the LKE cluster.
// const k8sProvider = new k8s.Provider("k8s-provider", {
//     kubeconfig: cluster.kubeconfig,
// });

// // Deploy a Dockerized application to the LKE cluster.
// const appLabels = { app: "myapp" };
// const deployment = new k8s.apps.v1.Deployment("app-deployment", {
//     metadata: {
//         labels: appLabels,
//     },
//     spec: {
//         replicas: 2,
//         selector: { matchLabels: appLabels },
//         template: {
//             metadata: {
//                 labels: appLabels,
//             },
//             spec: {
//                 containers: [{
//                     name: "myapp",
//                     image: "your-container-image:tag", // Replace with your container image
//                 }],
//             },
//         },
//     },
// }, { provider: k8sProvider });

// // Export the deployment name
// export const deploymentName = deployment.metadata.name;
