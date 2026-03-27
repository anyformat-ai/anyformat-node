// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

/**
 * File collection management.
 */
export class Files extends APIResource {
  /**
   * Upload files to a workflow, creating a file collection.
   */
  create(body: FileCreateParams, options?: RequestOptions): APIPromise<FileCreateResponse> {
    return this._client.post('/v2/files/', multipartFormRequestOptions({ body, ...options }, this._client));
  }

  /**
   * List file collections for a workflow.
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileListResponse> {
    return this._client.get('/v2/files/', { query, ...options });
  }

  /**
   * Delete a file collection and all its files.
   */
  delete(collectionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/files/${collectionID}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get extraction results for a file collection.
   *
   * Returns 412 if the extraction is not yet complete.
   */
  getExtractionResults(collectionID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.get(path`/v2/files/${collectionID}/extraction/`, options);
  }
}

/**
 * Response from creating a file collection.
 */
export interface FileCreateResponse {
  id: string;

  files: Array<FileCreateResponse.File>;

  workflow_id: string;

  name?: string | null;
}

export namespace FileCreateResponse {
  /**
   * A single file within a collection.
   */
  export interface File {
    filename: string;

    status: string;
  }
}

export interface FileListResponse {
  count: number;

  page: number;

  page_size: number;

  results: Array<FileListResponse.Result>;
}

export namespace FileListResponse {
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

export type FileGetExtractionResultsResponse = unknown;

export interface FileCreateParams {
  files: Array<string>;

  workflow_id: string;
}

export interface FileListParams {
  page?: number;

  page_size?: number;

  workflow_id?: string | null;
}

export declare namespace Files {
  export {
    type FileCreateResponse as FileCreateResponse,
    type FileListResponse as FileListResponse,
    type FileGetExtractionResultsResponse as FileGetExtractionResultsResponse,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };
}
