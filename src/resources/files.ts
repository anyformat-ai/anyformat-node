// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * File collections group uploaded documents and track their extraction progress. Upload files, check status, and retrieve extraction results.
 */
export class Files extends APIResource {
  /**
   * Delete a file collection and all its files permanently.
   *
   * This removes all uploaded files and any extraction results associated with the
   * collection. This action is irreversible.
   */
  delete(collectionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/files/${collectionID}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }
}
