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
   *
   * @example
   * ```ts
   * const workflow = await client.workflows.create({
   *   fields: [{ data_type: 'bar', name: 'bar' }],
   *   name: 'Invoice Processing',
   * });
   * ```
   */
  create(body: WorkflowCreateParams, options?: RequestOptions): APIPromise<Workflow> {
    return this._client.post('/v2/workflows/', { body, ...options, __security: {} });
  }

  /**
   * Retrieve a single workflow by its ID, including its configured extraction
   * fields.
   *
   * @example
   * ```ts
   * const workflow = await client.workflows.retrieve(
   *   'workflow_id',
   * );
   * ```
   */
  retrieve(workflowID: string, options?: RequestOptions): APIPromise<Workflow> {
    return this._client.get(path`/v2/workflows/${workflowID}/`, { ...options, __security: {} });
  }

  /**
   * List all workflows in your organization with pagination.
   *
   * Workflows can be filtered by status and sorted by any field.
   *
   * @example
   * ```ts
   * const workflows = await client.workflows.list();
   * ```
   */
  list(
    query: WorkflowListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListResponse> {
    return this._client.get('/v2/workflows/', { query, ...options, __security: {} });
  }

  /**
   * Delete a workflow and all associated file collections and extraction results.
   *
   * This action is irreversible.
   *
   * @example
   * ```ts
   * await client.workflows.delete('workflow_id');
   * ```
   */
  delete(workflowID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/workflows/${workflowID}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
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
   *
   * @example
   * ```ts
   * const response = await client.workflows.createFile(
   *   'workflow_id',
   *   { files: ['string'] },
   * );
   * ```
   */
  createFile(
    workflowID: string,
    body: WorkflowCreateFileParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowCreateFileResponse> {
    return this._client.post(
      path`/v2/workflows/${workflowID}/files/`,
      multipartFormRequestOptions({ body, ...options, __security: {} }, this._client),
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
   * Possible non-200 responses:
   *
   * - **412 `PRECONDITION_FAILED`** — extraction still in progress; retry with
   *   backoff.
   * - **422 `EXTRACTION_FAILED`** — extraction did not complete successfully;
   *   terminal. Polling will not transition the collection out of this state.
   *   Possible next steps: review the document, retry the upload, or open the
   *   collection in the AnyFormat dashboard for more context.
   * - **422 `EXTRACTION_CANCELLED`** — extraction was cancelled; terminal. Possible
   *   next steps: review the document, retry the upload, or open the collection in
   *   the AnyFormat dashboard.
   *
   * Use webhooks (`extraction.completed` event) to avoid polling.
   *
   * @example
   * ```ts
   * const response = await client.workflows.getFileResults(
   *   'collection_id',
   *   { workflow_id: 'workflow_id' },
   * );
   * ```
   */
  getFileResults(
    collectionID: string,
    params: WorkflowGetFileResultsParams,
    options?: RequestOptions,
  ): APIPromise<WorkflowGetFileResultsResponse> {
    const { workflow_id } = params;
    return this._client.get(path`/v2/workflows/${workflow_id}/files/${collectionID}/results/`, {
      ...options,
      __security: {},
    });
  }

  /**
   * List file collections for a workflow.
   *
   * A file collection groups one or more uploaded files together. Each collection
   * has a status indicating the extraction progress: `pending`, `processing`,
   * `completed`, or `failed`.
   *
   * @example
   * ```ts
   * const response = await client.workflows.listFiles(
   *   'workflow_id',
   * );
   * ```
   */
  listFiles(
    workflowID: string,
    query: WorkflowListFilesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListFilesResponse> {
    return this._client.get(path`/v2/workflows/${workflowID}/files/`, { query, ...options, __security: {} });
  }

  /**
   * List all extraction runs for a workflow with pagination.
   *
   * Each run corresponds to a file collection that was processed by the workflow.
   * Use the run's `id` (collection UUID) with
   * `GET /v2/workflows/{workflow_id}/files/{id}/results/` to fetch detailed results.
   *
   * @example
   * ```ts
   * const response = await client.workflows.listRuns(
   *   'workflow_id',
   * );
   * ```
   */
  listRuns(
    workflowID: string,
    query: WorkflowListRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowListRunsResponse> {
    return this._client.get(path`/v2/workflows/${workflowID}/runs/`, { query, ...options, __security: {} });
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
   *
   * @example
   * ```ts
   * const response = await client.workflows.run('workflow_id');
   * ```
   */
  run(
    workflowID: string,
    body: WorkflowRunParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowRunResponse> {
    return this._client.post(
      path`/v2/workflows/${workflowID}/run/`,
      multipartFormRequestOptions({ body, ...options, __security: {} }, this._client),
    );
  }

  /**
   * Upload a file to a workflow without running extraction.
   *
   * Use this when you want to stage files for later processing. For
   * upload-and-extract in one step, use `POST /v2/workflows/{workflow_id}/run/`
   * instead.
   *
   * @example
   * ```ts
   * const response = await client.workflows.upload(
   *   'workflow_id',
   * );
   * ```
   */
  upload(
    workflowID: string,
    body: WorkflowUploadParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WorkflowUploadResponse> {
    return this._client.post(
      path`/v2/workflows/${workflowID}/upload/`,
      multipartFormRequestOptions({ body, ...options, __security: {} }, this._client),
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

/**
 * Canonical response shape for the file-collection results endpoint.
 *
 * Returned with HTTP 200 once processing completes. Returns 412 while processing
 * is in progress; poll until 200, or use webhooks.
 */
export interface WorkflowGetFileResultsResponse {
  /**
   * The file collection's UUID. Same value as the `id` returned by
   * `POST /v2/workflows/{wid}/run/`.
   */
  collection_id: string;

  /**
   * Per-classifier-node verdicts. Empty when the workflow has no classifier.
   */
  classifications?: Array<WorkflowGetFileResultsResponse.Classification>;

  /**
   * @deprecated **Deprecated** — use `extractions` instead. Extracted fields keyed
   * by field name, populated only for linear workflows (single extract node, no
   * splitter). `null` for split workflows; read `extractions[]` instead.
   */
  extraction?: {
    [key: string]:
      | WorkflowGetFileResultsResponse.ExtractedField
      | Array<{ [key: string]: WorkflowGetFileResultsResponse.ExtractedField }>;
  } | null;

  /**
   * Flat list of extraction datapoints. Linear workflows produce one entry with
   * `split_name=null` and `partition=null`. Split workflows produce one entry per
   * (split, partition). Empty when no extraction has run yet.
   */
  extractions?: Array<WorkflowGetFileResultsResponse.Extraction>;

  /**
   * Parsed markdown for a file.
   */
  parse?: WorkflowGetFileResultsResponse.Parse | null;

  /**
   * Splitter output: category-level geometry with optional partitions. Empty when
   * the workflow has no splitter.
   */
  splits?: Array<WorkflowGetFileResultsResponse.Split>;

  /**
   * Link to the AnyFormat dashboard for human review of this collection's results.
   * `null` if the dashboard URL cannot be constructed (e.g. no files in the
   * collection, or the deployment has no frontend URL configured).
   */
  verification_url?: string | null;
}

export namespace WorkflowGetFileResultsResponse {
  /**
   * One classifier verdict for the collection.
   */
  export interface Classification {
    /**
     * The category the document was classified as.
     */
    category: string;

    /**
     * 0-100 model confidence in the verdict.
     */
    confidence: number;

    /**
     * Free-form evidence text (the snippets the classifier cited). `null` when none
     * captured.
     */
    evidence?: string | null;
  }

  /**
   * One extracted field's value, confidence, and supporting evidence.
   */
  export interface ExtractedField {
    /**
     * The extracted value. Type depends on the field's `data_type` (string, number,
     * date, etc.). `null` when extraction could not produce a value.
     */
    value: unknown;

    /**
     * Model confidence in the extracted value, on a 0-100 scale. `null` when the
     * backend did not produce a confidence (e.g. manual entry).
     */
    confidence?: number | null;

    /**
     * Source-text snippets the model used to derive this value.
     */
    evidence?: Array<ExtractedField.Evidence>;

    /**
     * A human-supplied override of the extracted `value`, if one was set during
     * verification. `null` when no override exists.
     */
    value_override?: unknown;

    /**
     * Verification state for this datapoint (e.g. `not_verified`, `verified`). `null`
     * when not yet reviewed.
     */
    verification_status?: string | null;
  }

  export namespace ExtractedField {
    /**
     * A snippet of source text supporting an extracted value, with the page it came
     * from.
     */
    export interface Evidence {
      /**
       * 1-indexed page number where the snippet was found.
       */
      page_number: number;

      /**
       * The exact source-text snippet that supports the extracted value.
       */
      text: string;
    }
  }

  /**
   * One extracted field's value, confidence, and supporting evidence.
   */
  export interface ExtractedField {
    /**
     * The extracted value. Type depends on the field's `data_type` (string, number,
     * date, etc.). `null` when extraction could not produce a value.
     */
    value: unknown;

    /**
     * Model confidence in the extracted value, on a 0-100 scale. `null` when the
     * backend did not produce a confidence (e.g. manual entry).
     */
    confidence?: number | null;

    /**
     * Source-text snippets the model used to derive this value.
     */
    evidence?: Array<ExtractedField.Evidence>;

    /**
     * A human-supplied override of the extracted `value`, if one was set during
     * verification. `null` when no override exists.
     */
    value_override?: unknown;

    /**
     * Verification state for this datapoint (e.g. `not_verified`, `verified`). `null`
     * when not yet reviewed.
     */
    verification_status?: string | null;
  }

  export namespace ExtractedField {
    /**
     * A snippet of source text supporting an extracted value, with the page it came
     * from.
     */
    export interface Evidence {
      /**
       * 1-indexed page number where the snippet was found.
       */
      page_number: number;

      /**
       * The exact source-text snippet that supports the extracted value.
       */
      text: string;
    }
  }

  /**
   * One unit of extracted data. For linear (parse->extract) workflows there is
   * exactly one entry with `split_name=null` and `partition=null`. For split
   * workflows there is one entry per (split, partition) pair; join with `splits[]`
   * by `split_name` to look up geometry.
   */
  export interface Extraction {
    /**
     * Extracted fields keyed by field name. Same shape as the legacy top-level
     * `extraction`.
     */
    fields: {
      [key: string]: Extraction.ExtractedField | Array<{ [key: string]: Extraction.ExtractedField }>;
    };

    /**
     * The partition value within the split. `null` when the split has no partitions.
     */
    partition?: string | null;

    /**
     * The split category this extraction belongs to. `null` for linear workflows.
     */
    split_name?: string | null;
  }

  export namespace Extraction {
    /**
     * One extracted field's value, confidence, and supporting evidence.
     */
    export interface ExtractedField {
      /**
       * The extracted value. Type depends on the field's `data_type` (string, number,
       * date, etc.). `null` when extraction could not produce a value.
       */
      value: unknown;

      /**
       * Model confidence in the extracted value, on a 0-100 scale. `null` when the
       * backend did not produce a confidence (e.g. manual entry).
       */
      confidence?: number | null;

      /**
       * Source-text snippets the model used to derive this value.
       */
      evidence?: Array<ExtractedField.Evidence>;

      /**
       * A human-supplied override of the extracted `value`, if one was set during
       * verification. `null` when no override exists.
       */
      value_override?: unknown;

      /**
       * Verification state for this datapoint (e.g. `not_verified`, `verified`). `null`
       * when not yet reviewed.
       */
      verification_status?: string | null;
    }

    export namespace ExtractedField {
      /**
       * A snippet of source text supporting an extracted value, with the page it came
       * from.
       */
      export interface Evidence {
        /**
         * 1-indexed page number where the snippet was found.
         */
        page_number: number;

        /**
         * The exact source-text snippet that supports the extracted value.
         */
        text: string;
      }
    }

    /**
     * One extracted field's value, confidence, and supporting evidence.
     */
    export interface ExtractedField {
      /**
       * The extracted value. Type depends on the field's `data_type` (string, number,
       * date, etc.). `null` when extraction could not produce a value.
       */
      value: unknown;

      /**
       * Model confidence in the extracted value, on a 0-100 scale. `null` when the
       * backend did not produce a confidence (e.g. manual entry).
       */
      confidence?: number | null;

      /**
       * Source-text snippets the model used to derive this value.
       */
      evidence?: Array<ExtractedField.Evidence>;

      /**
       * A human-supplied override of the extracted `value`, if one was set during
       * verification. `null` when no override exists.
       */
      value_override?: unknown;

      /**
       * Verification state for this datapoint (e.g. `not_verified`, `verified`). `null`
       * when not yet reviewed.
       */
      verification_status?: string | null;
    }

    export namespace ExtractedField {
      /**
       * A snippet of source text supporting an extracted value, with the page it came
       * from.
       */
      export interface Evidence {
        /**
         * 1-indexed page number where the snippet was found.
         */
        page_number: number;

        /**
         * The exact source-text snippet that supports the extracted value.
         */
        text: string;
      }
    }
  }

  /**
   * Parsed markdown for a file.
   */
  export interface Parse {
    /**
     * Document content rendered as structured markdown (with `<DOCUMENT>` /
     * `<section>` tags, embedded images for the `visual` variant). `null` if parsing
     * failed.
     */
    markdown: string | null;
  }

  /**
   * A category-level split: which pages of which files fall under it, plus any
   * partitions inside it. Extraction data lives under `extractions[]` — join by
   * `split_name`.
   */
  export interface Split {
    /**
     * 0-100 aggregate confidence (min across partitions).
     */
    confidence: number;

    /**
     * Per-file page lists, union of all partitions.
     */
    files: Array<Split.File>;

    /**
     * The split's category name.
     */
    name: string;

    partitions?: Array<Split.Partition>;
  }

  export namespace Split {
    /**
     * A file's contribution of pages to a split or partition. 1-indexed.
     */
    export interface File {
      /**
       * The file's UUID.
       */
      file_id: string;

      /**
       * The file's display name.
       */
      file_name: string;

      /**
       * 1-indexed page numbers from this file.
       */
      pages: Array<number>;
    }

    /**
     * A partition value within a split (e.g. `1234-5678` under `Account Holdings`).
     */
    export interface Partition {
      /**
       * 0-100 minimum confidence across the partition's ranges.
       */
      confidence: number;

      files: Array<Partition.File>;

      /**
       * The partition value (free-form string).
       */
      name: string;
    }

    export namespace Partition {
      /**
       * A file's contribution of pages to a split or partition. 1-indexed.
       */
      export interface File {
        /**
         * The file's UUID.
         */
        file_id: string;

        /**
         * The file's display name.
         */
        file_name: string;

        /**
         * 1-indexed page numbers from this file.
         */
        pages: Array<number>;
      }
    }
  }
}

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
     * Processing status: `pending`, `queued`, `in_progress`, `processed`, `error`, or
     * `cancelled`.
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
     * Processing status: `pending`, `queued`, `in_progress`, `processed`, `error`, or
     * `cancelled`.
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

export interface WorkflowCreateParams {
  /**
   * Field definitions
   */
  fields: Array<{ [key: string]: unknown }>;

  /**
   * Workflow name
   */
  name: string;

  /**
   * Workflow description
   */
  description?: string | null;
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
    type WorkflowCreateParams as WorkflowCreateParams,
    type WorkflowListParams as WorkflowListParams,
    type WorkflowCreateFileParams as WorkflowCreateFileParams,
    type WorkflowGetFileResultsParams as WorkflowGetFileResultsParams,
    type WorkflowListFilesParams as WorkflowListFilesParams,
    type WorkflowListRunsParams as WorkflowListRunsParams,
    type WorkflowRunParams as WorkflowRunParams,
    type WorkflowUploadParams as WorkflowUploadParams,
  };
}
