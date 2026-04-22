// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Health check endpoints to verify API availability.
 */
export class Health extends APIResource {
  /**
   * Returns 200 OK if the service is running. No authentication required.
   *
   * Use this endpoint to verify API connectivity before making authenticated calls.
   */
  check(options?: RequestOptions): APIPromise<HealthCheckResponse> {
    return this._client.get('/health/', options);
  }
}

/**
 * Health check response confirming the API is operational.
 */
export interface HealthCheckResponse {
  /**
   * Status message. Returns `"ok"` when the service is healthy.
   */
  message: string;
}

export declare namespace Health {
  export { type HealthCheckResponse as HealthCheckResponse };
}
