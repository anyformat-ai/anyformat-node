// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Workflows extends APIResource {
  /**
   * Create a new extraction workflow.
   *
   * Workflows define what data to extract from documents. After creating a workflow,
   * configure its extraction fields in the
   * [AnyFormat dashboard](https://app.anyformat.ai).
   */
  create(options?: RequestOptions): APIPromise<Workflow> {
    return this._client.post('/v2/workflows/', options);
  }

  /**
   * Retrieve a single workflow by its ID, including its configured extraction
   * fields.
   */
  retrieve(workflowID: string, options?: RequestOptions): APIPromise<Workflow> {
    return this._client.get(path`/v2/workflows/${workflowID}/`, options);
  }

  /**
   * List all workflows in your organization with pagination.
   *
   * Workflows can be filtered by status and sorted by any field.
   */
  list(
    query: WorkflowListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListResponse> {
    return this._client.get('/v2/workflows/', { query, ...options });
  }

  /**
   * Delete a workflow and all associated file collections and extraction results.
   *
   * This action is irreversible.
   */
  delete(workflowID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/workflows/${workflowID}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Upload one or more files to a workflow, creating a new file collection.
   *
   * Use this when you want to upload files without immediately running extraction.
   * To upload and extract in one step, use `POST /v2/workflows/{workflow_id}/run/`
   * instead.
   *
   * Supported file types: PDF, PNG, JPG, TIFF, TXT, DOCX, XLSX, CSV, and more.
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
   * Retrieve the extraction results for a file collection.
   *
   * Returns the structured data extracted from each file, including field values,
   * confidence scores, and source evidence (text excerpts and page numbers). Also
   * includes a `verification_url` linking to the AnyFormat dashboard for human
   * review.
   *
   * Returns **412 Precondition Failed** if the extraction is still in progress. Poll
   * this endpoint until you receive a 200 response, or use webhooks
   * (`extraction.completed` event) to be notified when processing finishes.
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
   *
   * A file collection groups one or more uploaded files together. Each collection
   * has a status indicating the extraction progress: `pending`, `processing`,
   * `completed`, or `failed`.
   */
  listFiles(
    workflowID: string,
    query: WorkflowListFilesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListFilesResponse> {
    return this._client.get(path`/v2/workflows/${workflowID}/files/`, { query, ...options });
  }

  /**
   * List all extraction runs for a workflow with pagination.
   *
   * Each run corresponds to a file collection that was processed by the workflow.
   * Use the run's `id` (collection UUID) with
   * `GET /v2/workflows/{workflow_id}/files/{id}/results/` to fetch detailed results.
   */
  listRuns(
    workflowID: string,
    query: WorkflowListRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListRunsResponse> {
    return this._client.get(path`/v2/workflows/${workflowID}/runs/`, { query, ...options });
  }

  /**
   * Upload a file and immediately run the extraction workflow on it.
   *
   * This is the primary endpoint for document extraction. It creates a file
   * collection, uploads the file, and starts extraction in one step. The response
   * includes a collection `id` that you can use to poll for results via
   * `GET /v2/workflows/{workflow_id}/files/{collection_id}/results/`.
   *
   * Provide the file as a binary upload in the `file` field, or send raw text in the
   * `text` field for text-only extraction.
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
   * Upload a file to a workflow without running extraction.
   *
   * Use this when you want to stage files for later processing. For
   * upload-and-extract in one step, use `POST /v2/workflows/{workflow_id}/run/`
   * instead.
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
 * A workflow defines the extraction template — what fields to extract from
 * documents, their types, and validation rules.
 */
export interface Workflow {
  /**
   * Unique identifier of the workflow (UUID).
   */
  id: string;

  /**
   * Human-readable name of the workflow.
   */
  name: string;

  /**
   * Timestamp when the workflow was created (ISO 8601).
   */
  created_at?: string | null;

  /**
   * Optional description of what this workflow extracts.
   */
  description?: string | null;

  /**
   * List of extraction field definitions configured for this workflow. `null` if not
   * yet configured.
   */
  fields?: Array<{ [key: string]: unknown }> | null;

  /**
   * Timestamp when the workflow was last modified (ISO 8601).
   */
  updated_at?: string | null;
}

/**
 * Paginated list of workflows.
 */
export interface WorkflowListResponse {
  /**
   * Total number of workflows matching the query.
   */
  count: number;

  /**
   * Current page number.
   */
  page: number;

  /**
   * Number of results per page.
   */
  page_size: number;

  /**
   * List of workflows for the current page.
   */
  results: Array<Workflow>;
}

/**
 * Response from creating a file collection. Contains the collection ID and the
 * status of each uploaded file.
 */
export interface WorkflowCreateFileResponse {
  /**
   * Unique identifier of the newly created file collection.
   */
  id: string;

  /**
   * List of files included in the collection, with their upload status.
   */
  files: Array<WorkflowCreateFileResponse.File>;

  /**
   * The UUID of the workflow this collection belongs to.
   */
  workflow_id: string;

  /**
   * Human-readable name for the collection.
   */
  name?: string | null;
}

export namespace WorkflowCreateFileResponse {
  /**
   * A single file within a collection, showing its name and upload status.
   */
  export interface File {
    /**
     * Name of the uploaded file.
     */
    filename: string;

    /**
     * Upload status: `uploaded` or `failed`.
     */
    status: string;
  }
}

export type WorkflowGetFileResultsResponse = unknown;

export interface WorkflowListFilesResponse {
  /**
   * Total number of items matching the query.
   */
  count: number;

  /**
   * Current page number.
   */
  page: number;

  /**
   * Number of results per page.
   */
  page_size: number;

  /**
   * List of items for the current page.
   */
  results: Array<WorkflowListFilesResponse.Result>;
}

export namespace WorkflowListFilesResponse {
  /**
   * A file collection entry in list responses. Each collection groups one or more
   * uploaded files and tracks their extraction status.
   */
  export interface Result {
    /**
     * Unique identifier of the file collection.
     */
    id: string;

    /**
     * Processing status: `pending`, `processing`, `completed`, or `failed`.
     */
    status: string;

    /**
     * Timestamp when the collection was created (ISO 8601).
     */
    created_at?: string | null;

    /**
     * Human-readable name for the collection.
     */
    name?: string | null;

    /**
     * Timestamp when the collection was last updated (ISO 8601).
     */
    updated_at?: string | null;
  }
}

/**
 * Paginated list of workflow runs.
 */
export interface WorkflowListRunsResponse {
  /**
   * Total number of runs for this workflow.
   */
  count: number;

  /**
   * Current page number.
   */
  page: number;

  /**
   * Number of results per page.
   */
  page_size: number;

  /**
   * List of runs for the current page.
   */
  results: Array<WorkflowListRunsResponse.Result>;
}

export namespace WorkflowListRunsResponse {
  /**
   * An extraction run entry, representing one execution of a workflow on a file
   * collection.
   */
  export interface Result {
    /**
     * The collection UUID for this run. Use this ID with
     * `GET /v2/workflows/{workflow_id}/files/{id}/results/` to fetch results.
     */
    id: string;

    /**
     * Processing status: `pending`, `processing`, `completed`, or `failed`.
     */
    status: string;

    /**
     * Timestamp when the run started (ISO 8601).
     */
    created_at?: string | null;

    /**
     * Timestamp when the run status was last updated (ISO 8601).
     */
    updated_at?: string | null;
  }
}

/**
 * Response after triggering a workflow run. Contains the collection ID to use for
 * polling extraction results.
 */
export interface WorkflowRunResponse {
  /**
   * The collection UUID for this run. Use this ID to poll for results via
   * `GET /v2/workflows/{workflow_id}/files/{id}/results/`.
   */
  id: string;

  /**
   * Initial status of the run, typically `success` (meaning the run was accepted,
   * not that extraction is complete).
   */
  status: string;

  /**
   * The UUID of the workflow that was executed.
   */
  workflow_id: string;
}

/**
 * Confirmation that a file was uploaded successfully without triggering
 * extraction.
 */
export interface WorkflowUploadResponse {
  /**
   * Upload result: `uploaded` on success.
   */
  status: string;

  /**
   * Name of the uploaded file.
   */
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
