// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Workflows extends APIResource {
  /**
   * Create a new workflow.
   */
  create(options?: RequestOptions): APIPromise<Workflow> {
    return this._client.post('/v2/workflows/', options);
  }

  /**
   * Get workflow by ID.
   */
  retrieve(workflowID: string, options?: RequestOptions): APIPromise<Workflow> {
    return this._client.get(path`/v2/workflows/${workflowID}/`, options);
  }

  /**
   * List workflows with pagination.
   */
  list(
    query: WorkflowListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListResponse> {
    return this._client.get('/v2/workflows/', { query, ...options });
  }

  /**
   * Delete workflow by ID.
   */
  delete(workflowID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/workflows/${workflowID}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Upload files to a workflow, creating a file collection.
   */
  createFile(
    workflowID: string,
    body: WorkflowCreateFileParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowCreateFileResponse> {
    return this._client.post(
      path`/v2/workflows/${workflowID}/files/`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Get processing results for a file collection.
   *
   * Returns the backend collection results with internal metadata stripped. Returns
   * 412 if processing is not yet complete.
   */
  getFileResults(
    collectionID: string,
    params: WorkflowGetFileResultsParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { workflow_id } = params;
    return this._client.get(path`/v2/workflows/${workflow_id}/files/${collectionID}/results/`, options);
  }

  /**
   * List file collections for a workflow.
   */
  listFiles(
    workflowID: string,
    query: WorkflowListFilesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListFilesResponse> {
    return this._client.get(path`/v2/workflows/${workflowID}/files/`, { query, ...options });
  }

  /**
   * List extraction runs for a workflow, identified by collection UUID.
   */
  listRuns(
    workflowID: string,
    query: WorkflowListRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListRunsResponse> {
    return this._client.get(path`/v2/workflows/${workflowID}/runs/`, { query, ...options });
  }

  /**
   * Execute workflow — returns collection UUID.
   */
  run(
    workflowID: string,
    body: WorkflowRunParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowRunResponse> {
    return this._client.post(
      path`/v2/workflows/${workflowID}/run/`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Upload file without executing workflow.
   */
  upload(
    workflowID: string,
    body: WorkflowUploadParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowUploadResponse> {
    return this._client.post(
      path`/v2/workflows/${workflowID}/upload/`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

/**
 * Workflow detail — used for get, create, and list items.
 */
export interface Workflow {
  id: string;

  name: string;

  created_at?: string | null;

  description?: string | null;

  fields?: Array<{ [key: string]: unknown }> | null;

  updated_at?: string | null;
}

/**
 * GET /workflows/ — paginated workflow list.
 */
export interface WorkflowListResponse {
  count: number;

  page: number;

  page_size: number;

  results: Array<Workflow>;
}

/**
 * Response from creating a file collection.
 */
export interface WorkflowCreateFileResponse {
  id: string;

  files: Array<WorkflowCreateFileResponse.File>;

  workflow_id: string;

  name?: string | null;
}

export namespace WorkflowCreateFileResponse {
  /**
   * A single file within a collection.
   */
  export interface File {
    filename: string;

    status: string;
  }
}

export type WorkflowGetFileResultsResponse = unknown;

export interface WorkflowListFilesResponse {
  count: number;

  page: number;

  page_size: number;

  results: Array<WorkflowListFilesResponse.Result>;
}

export namespace WorkflowListFilesResponse {
  /**
   * A single file collection entry in list responses.
   */
  export interface Result {
    id: string;

    status: string;

    created_at?: string | null;

    name?: string | null;

    updated_at?: string | null;
  }
}

/**
 * GET /workflows/{id}/runs/ — paginated run list.
 */
export interface WorkflowListRunsResponse {
  count: number;

  page: number;

  page_size: number;

  results: Array<WorkflowListRunsResponse.Result>;
}

export namespace WorkflowListRunsResponse {
  /**
   * Item in GET /workflows/{id}/runs/ paginated list.
   */
  export interface Result {
    id: string;

    status: string;

    created_at?: string | null;

    updated_at?: string | null;
  }
}

/**
 * Response for workflow run endpoint (v2) — collection UUID as identifier.
 */
export interface WorkflowRunResponse {
  id: string;

  status: string;

  workflow_id: string;
}

/**
 * POST /workflows/{id}/upload/ — upload confirmation.
 */
export interface WorkflowUploadResponse {
  status: string;

  filename?: string | null;
}

export interface WorkflowListParams {
  order?: string | null;

  page?: number;

  page_size?: number;

  sort_by?: string | null;

  status?: string | null;
}

export interface WorkflowCreateFileParams {
  files: Array<string>;
}

export interface WorkflowGetFileResultsParams {
  workflow_id: string;
}

export interface WorkflowListFilesParams {
  page?: number;

  page_size?: number;
}

export interface WorkflowListRunsParams {
  page?: number;

  page_size?: number;
}

export interface WorkflowRunParams {
  file?: string | null;

  text?: string | null;
}

export interface WorkflowUploadParams {
  file?: string | null;

  text?: string | null;
}

export declare namespace Workflows {
  export {
    type Workflow as Workflow,
    type WorkflowListResponse as WorkflowListResponse,
    type WorkflowCreateFileResponse as WorkflowCreateFileResponse,
    type WorkflowGetFileResultsResponse as WorkflowGetFileResultsResponse,
    type WorkflowListFilesResponse as WorkflowListFilesResponse,
    type WorkflowListRunsResponse as WorkflowListRunsResponse,
    type WorkflowRunResponse as WorkflowRunResponse,
    type WorkflowUploadResponse as WorkflowUploadResponse,
    type WorkflowListParams as WorkflowListParams,
    type WorkflowCreateFileParams as WorkflowCreateFileParams,
    type WorkflowGetFileResultsParams as WorkflowGetFileResultsParams,
    type WorkflowListFilesParams as WorkflowListFilesParams,
    type WorkflowListRunsParams as WorkflowListRunsParams,
    type WorkflowRunParams as WorkflowRunParams,
    type WorkflowUploadParams as WorkflowUploadParams,
  };
}
