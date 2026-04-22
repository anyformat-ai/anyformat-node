// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Webhook subscriptions for asynchronous event notifications. Get notified when extractions complete or fail.
 */
export class Webhooks extends APIResource {
  /**
   * Create a new webhook subscription for your organization.
   *
   * The webhook URL must use HTTPS. AnyFormat will send POST requests to this URL
   * when the subscribed events occur. The response includes a `secret` that you
   * should use to verify webhook signatures.
   *
   * Supported events:
   *
   * - `extraction.completed` — fired when a file extraction finishes successfully.
   * - `extraction.failed` — fired when a file extraction fails.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   url: 'https://example.com/webhooks/anyformat',
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/v2/webhooks/', { body, ...options });
  }

  /**
   * List all webhook subscriptions for the authenticated organization.
   *
   * Returns a list of webhooks. Secrets are excluded from the list response for
   * security — they are only returned once, when the webhook is created.
   *
   * @example
   * ```ts
   * const webhooks = await client.webhooks.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/v2/webhooks/', options);
  }

  /**
   * Delete a webhook subscription by ID.
   *
   * After deletion, AnyFormat will stop sending events to the webhook URL. This
   * action is irreversible.
   *
   * @example
   * ```ts
   * await client.webhooks.delete('webhook_id');
   * ```
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v2/webhooks/${webhookID}/`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Webhook subscription details including the signing secret. The secret is only
 * returned at creation time.
 */
export interface WebhookCreateResponse {
  /**
   * Unique identifier of the webhook.
   */
  id: string;

  /**
   * Timestamp when the webhook was created (ISO 8601).
   */
  created_at: string;

  /**
   * Event types this webhook is subscribed to.
   */
  events: Array<string>;

  /**
   * Whether the webhook is currently active and receiving events.
   */
  is_active: boolean;

  /**
   * Webhook signing secret. Use this to verify that incoming webhook requests are
   * authentic. **Store securely — this value is only shown once at creation time.**
   */
  secret: string;

  /**
   * The URL receiving webhook events.
   */
  url: string;
}

export type WebhookListResponse = Array<WebhookListResponse.WebhookListResponseItem>;

export namespace WebhookListResponse {
  /**
   * Webhook subscription details (secret excluded for security).
   */
  export interface WebhookListResponseItem {
    /**
     * Unique identifier of the webhook.
     */
    id: string;

    /**
     * Timestamp when the webhook was created (ISO 8601).
     */
    created_at: string;

    /**
     * Event types this webhook is subscribed to.
     */
    events: Array<string>;

    /**
     * Whether the webhook is currently active.
     */
    is_active: boolean;

    /**
     * The URL receiving webhook events.
     */
    url: string;
  }
}

export interface WebhookCreateParams {
  /**
   * The HTTPS URL to receive webhook events. Must be publicly accessible.
   */
  url: string;

  /**
   * List of event types to subscribe to. Available events: `extraction.completed`,
   * `extraction.failed`.
   */
  events?: Array<string>;
}

export declare namespace Webhooks {
  export {
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookCreateParams as WebhookCreateParams,
  };
}
