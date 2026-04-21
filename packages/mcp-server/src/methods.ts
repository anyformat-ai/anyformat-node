// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.health.check',
    fullyQualifiedName: 'health.check',
    httpMethod: 'get',
    httpPath: '/health/',
  },
  {
    clientCallName: 'client.webhooks.create',
    fullyQualifiedName: 'webhooks.create',
    httpMethod: 'post',
    httpPath: '/v2/webhooks/',
  },
  {
    clientCallName: 'client.webhooks.list',
    fullyQualifiedName: 'webhooks.list',
    httpMethod: 'get',
    httpPath: '/v2/webhooks/',
  },
  {
    clientCallName: 'client.webhooks.delete',
    fullyQualifiedName: 'webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/v2/webhooks/{webhook_id}/',
  },
  {
    clientCallName: 'client.files.delete',
    fullyQualifiedName: 'files.delete',
    httpMethod: 'delete',
    httpPath: '/v2/files/{collection_id}/',
  },
  {
    clientCallName: 'client.workflows.create',
    fullyQualifiedName: 'workflows.create',
    httpMethod: 'post',
    httpPath: '/v2/workflows/',
  },
  {
    clientCallName: 'client.workflows.retrieve',
    fullyQualifiedName: 'workflows.retrieve',
    httpMethod: 'get',
    httpPath: '/v2/workflows/{workflow_id}/',
  },
  {
    clientCallName: 'client.workflows.list',
    fullyQualifiedName: 'workflows.list',
    httpMethod: 'get',
    httpPath: '/v2/workflows/',
  },
  {
    clientCallName: 'client.workflows.delete',
    fullyQualifiedName: 'workflows.delete',
    httpMethod: 'delete',
    httpPath: '/v2/workflows/{workflow_id}/',
  },
  {
    clientCallName: 'client.workflows.createFile',
    fullyQualifiedName: 'workflows.createFile',
    httpMethod: 'post',
    httpPath: '/v2/workflows/{workflow_id}/files/',
  },
  {
    clientCallName: 'client.workflows.getFileResults',
    fullyQualifiedName: 'workflows.getFileResults',
    httpMethod: 'get',
    httpPath: '/v2/workflows/{workflow_id}/files/{collection_id}/results/',
  },
  {
    clientCallName: 'client.workflows.listFiles',
    fullyQualifiedName: 'workflows.listFiles',
    httpMethod: 'get',
    httpPath: '/v2/workflows/{workflow_id}/files/',
  },
  {
    clientCallName: 'client.workflows.listRuns',
    fullyQualifiedName: 'workflows.listRuns',
    httpMethod: 'get',
    httpPath: '/v2/workflows/{workflow_id}/runs/',
  },
  {
    clientCallName: 'client.workflows.run',
    fullyQualifiedName: 'workflows.run',
    httpMethod: 'post',
    httpPath: '/v2/workflows/{workflow_id}/run/',
  },
  {
    clientCallName: 'client.workflows.upload',
    fullyQualifiedName: 'workflows.upload',
    httpMethod: 'post',
    httpPath: '/v2/workflows/{workflow_id}/upload/',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
