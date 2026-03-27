// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Webhook subscriptions for async notifications.
 */
export class Webhooks extends APIResource {
  /**
   * Create a new webhook subscription.
   *
   * Validates URL (HTTPS only) and event types, then forwards to backend service.
   * Returns the created webhook with generated secret.
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/v2/webhooks/', { body, ...options });
  }

  /**
   * List all webhook subscriptions for the authenticated organization.
   *
   * Returns a list of webhooks (secrets are excluded in list view).
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/v2/webhooks/', options);
  }

  /**
   * Delete a webhook subscription by ID.
   *
   * Returns 204 on success, 404 if webhook not found, 403 if unauthorized.
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/webhooks/${webhookID}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Response schema for webhook subscription (includes secret)
 */
export interface WebhookCreateResponse {
  id: string;

  created_at: string;

  events: Array<string>;

  is_active: boolean;

  secret: string;

  url: string;
}

export type WebhookListResponse = Array<WebhookListResponse.WebhookListResponseItem>;

export namespace WebhookListResponse {
  /**
   * Response schema for listing webhooks (excludes secret)
   */
  export interface WebhookListResponseItem {
    id: string;

    created_at: string;

    events: Array<string>;

    is_active: boolean;

    url: string;
  }
}

export interface WebhookCreateParams {
  url: string;

  events?: Array<string>;
}

export declare namespace Webhooks {
  export {
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookCreateParams as WebhookCreateParams,
  };
}
