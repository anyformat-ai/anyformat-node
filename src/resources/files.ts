// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * File collection management.
 */
export class Files extends APIResource {
  /**
   * Delete a file collection and all its files.
   */
  delete(collectionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/files/${collectionID}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}
