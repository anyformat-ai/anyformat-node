// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

/**
 * Workflow CRUD, execution, runs, and results.
 */
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
   * Get workflow results.
   */
  results(
    workflowID: string,
    query: WorkflowResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/v2/workflows/${workflowID}/results/`, { query, ...options });
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

export type WorkflowResultsResponse = unknown;

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

export interface WorkflowListRunsParams {
  page?: number;

  page_size?: number;
}

export interface WorkflowResultsParams {
  as_lists?: string | null;

  output_format?: string;
}

export interface WorkflowRunParams {
  content_type?: string | null;

  file?: string | null;

  file_base64?: string | null;

  filename?: string | null;

  text?: string | null;
}

export interface WorkflowUploadParams {
  content_type?: string | null;

  file?: string | null;

  file_base64?: string | null;

  filename?: string | null;

  text?: string | null;
}

export declare namespace Workflows {
  export {
    type Workflow as Workflow,
    type WorkflowListResponse as WorkflowListResponse,
    type WorkflowListRunsResponse as WorkflowListRunsResponse,
    type WorkflowResultsResponse as WorkflowResultsResponse,
    type WorkflowRunResponse as WorkflowRunResponse,
    type WorkflowUploadResponse as WorkflowUploadResponse,
    type WorkflowListParams as WorkflowListParams,
    type WorkflowListRunsParams as WorkflowListRunsParams,
    type WorkflowResultsParams as WorkflowResultsParams,
    type WorkflowRunParams as WorkflowRunParams,
    type WorkflowUploadParams as WorkflowUploadParams,
  };
}
