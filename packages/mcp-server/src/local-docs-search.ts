// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'health_check',
    endpoint: '/',
    httpMethod: 'get',
    summary: 'Health Check',
    description:
      'Health check endpoint.\n\nReturns 200 OK if the service is running.\nNo authentication required.',
    stainlessPath: '(resource) $client > (method) health_check',
    qualified: 'client.healthCheck',
    response: 'object',
    markdown:
      "## health_check\n\n`client.healthCheck(): object`\n\n**get** `/`\n\nHealth check endpoint.\n\nReturns 200 OK if the service is running.\nNo authentication required.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst response = await client.healthCheck();\n\nconsole.log(response);\n```",
  },
  {
    name: 'check',
    endpoint: '/health/',
    httpMethod: 'get',
    summary: 'Health Check',
    description:
      'Health check endpoint.\n\nReturns 200 OK if the service is running.\nNo authentication required.',
    stainlessPath: '(resource) health > (method) check',
    qualified: 'client.health.check',
    response: 'object',
    markdown:
      "## check\n\n`client.health.check(): object`\n\n**get** `/health/`\n\nHealth check endpoint.\n\nReturns 200 OK if the service is running.\nNo authentication required.\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst response = await client.health.check();\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v2/webhooks/',
    httpMethod: 'post',
    summary: 'Create webhook',
    description:
      'Create a new webhook subscription.\n\nValidates URL (HTTPS only) and event types, then forwards to backend service.\nReturns the created webhook with generated secret.',
    stainlessPath: '(resource) webhooks > (method) create',
    qualified: 'client.webhooks.create',
    params: ['url: string;', 'events?: string[];'],
    response:
      '{ id: string; created_at: string; events: string[]; is_active: boolean; secret: string; url: string; }',
    markdown:
      "## create\n\n`client.webhooks.create(url: string, events?: string[]): { id: string; created_at: string; events: string[]; is_active: boolean; secret: string; url: string; }`\n\n**post** `/v2/webhooks/`\n\nCreate a new webhook subscription.\n\nValidates URL (HTTPS only) and event types, then forwards to backend service.\nReturns the created webhook with generated secret.\n\n### Parameters\n\n- `url: string`\n\n- `events?: string[]`\n\n### Returns\n\n- `{ id: string; created_at: string; events: string[]; is_active: boolean; secret: string; url: string; }`\n  Response schema for webhook subscription (includes secret)\n\n  - `id: string`\n  - `created_at: string`\n  - `events: string[]`\n  - `is_active: boolean`\n  - `secret: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst webhook = await client.webhooks.create({ url: 'https://example.com' });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list',
    endpoint: '/v2/webhooks/',
    httpMethod: 'get',
    summary: 'List webhooks',
    description:
      'List all webhook subscriptions for the authenticated organization.\n\nReturns a list of webhooks (secrets are excluded in list view).',
    stainlessPath: '(resource) webhooks > (method) list',
    qualified: 'client.webhooks.list',
    response: '{ id: string; created_at: string; events: string[]; is_active: boolean; url: string; }[]',
    markdown:
      "## list\n\n`client.webhooks.list(): { id: string; created_at: string; events: string[]; is_active: boolean; url: string; }[]`\n\n**get** `/v2/webhooks/`\n\nList all webhook subscriptions for the authenticated organization.\n\nReturns a list of webhooks (secrets are excluded in list view).\n\n### Returns\n\n- `{ id: string; created_at: string; events: string[]; is_active: boolean; url: string; }[]`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst webhooks = await client.webhooks.list();\n\nconsole.log(webhooks);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v2/webhooks/{webhook_id}/',
    httpMethod: 'delete',
    summary: 'Delete webhook',
    description:
      'Delete a webhook subscription by ID.\n\nReturns 204 on success, 404 if webhook not found, 403 if unauthorized.',
    stainlessPath: '(resource) webhooks > (method) delete',
    qualified: 'client.webhooks.delete',
    params: ['webhook_id: string;'],
    markdown:
      "## delete\n\n`client.webhooks.delete(webhook_id: string): void`\n\n**delete** `/v2/webhooks/{webhook_id}/`\n\nDelete a webhook subscription by ID.\n\nReturns 204 on success, 404 if webhook not found, 403 if unauthorized.\n\n### Parameters\n\n- `webhook_id: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nawait client.webhooks.delete('webhook_id')\n```",
  },
  {
    name: 'create',
    endpoint: '/v2/files/',
    httpMethod: 'post',
    summary: 'Create file collection',
    description: 'Upload files to a workflow, creating a file collection.',
    stainlessPath: '(resource) files > (method) create',
    qualified: 'client.files.create',
    params: ['files: string[];', 'workflow_id: string;'],
    response:
      '{ id: string; files: { filename: string; status: string; }[]; workflow_id: string; name?: string; }',
    markdown:
      "## create\n\n`client.files.create(files: string[], workflow_id: string): { id: string; files: object[]; workflow_id: string; name?: string; }`\n\n**post** `/v2/files/`\n\nUpload files to a workflow, creating a file collection.\n\n### Parameters\n\n- `files: string[]`\n\n- `workflow_id: string`\n\n### Returns\n\n- `{ id: string; files: { filename: string; status: string; }[]; workflow_id: string; name?: string; }`\n  Response from creating a file collection.\n\n  - `id: string`\n  - `files: { filename: string; status: string; }[]`\n  - `workflow_id: string`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst file = await client.files.create({ files: ['string'], workflow_id: 'workflow_id' });\n\nconsole.log(file);\n```",
  },
  {
    name: 'list',
    endpoint: '/v2/files/',
    httpMethod: 'get',
    summary: 'List file collections',
    description: 'List file collections for a workflow.',
    stainlessPath: '(resource) files > (method) list',
    qualified: 'client.files.list',
    params: ['page?: number;', 'page_size?: number;', 'workflow_id?: string;'],
    response:
      '{ count: number; page: number; page_size: number; results: { id: string; status: string; created_at?: string; name?: string; updated_at?: string; }[]; }',
    markdown:
      "## list\n\n`client.files.list(page?: number, page_size?: number, workflow_id?: string): { count: number; page: number; page_size: number; results: object[]; }`\n\n**get** `/v2/files/`\n\nList file collections for a workflow.\n\n### Parameters\n\n- `page?: number`\n\n- `page_size?: number`\n\n- `workflow_id?: string`\n\n### Returns\n\n- `{ count: number; page: number; page_size: number; results: { id: string; status: string; created_at?: string; name?: string; updated_at?: string; }[]; }`\n\n  - `count: number`\n  - `page: number`\n  - `page_size: number`\n  - `results: { id: string; status: string; created_at?: string; name?: string; updated_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst files = await client.files.list();\n\nconsole.log(files);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v2/files/{collection_id}/',
    httpMethod: 'delete',
    summary: 'Delete file collection',
    description: 'Delete a file collection and all its files.',
    stainlessPath: '(resource) files > (method) delete',
    qualified: 'client.files.delete',
    params: ['collection_id: string;'],
    markdown:
      "## delete\n\n`client.files.delete(collection_id: string): void`\n\n**delete** `/v2/files/{collection_id}/`\n\nDelete a file collection and all its files.\n\n### Parameters\n\n- `collection_id: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nawait client.files.delete('collection_id')\n```",
  },
  {
    name: 'get_extraction_results',
    endpoint: '/v2/files/{collection_id}/extraction/',
    httpMethod: 'get',
    summary: 'Get extraction results',
    description:
      'Get extraction results for a file collection.\n\nReturns 412 if the extraction is not yet complete.',
    stainlessPath: '(resource) files > (method) get_extraction_results',
    qualified: 'client.files.getExtractionResults',
    params: ['collection_id: string;'],
    response: 'object',
    markdown:
      "## get_extraction_results\n\n`client.files.getExtractionResults(collection_id: string): object`\n\n**get** `/v2/files/{collection_id}/extraction/`\n\nGet extraction results for a file collection.\n\nReturns 412 if the extraction is not yet complete.\n\n### Parameters\n\n- `collection_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst response = await client.files.getExtractionResults('collection_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v2/workflows/',
    httpMethod: 'post',
    summary: 'Create workflow',
    description: 'Create a new workflow.',
    stainlessPath: '(resource) workflows > (method) create',
    qualified: 'client.workflows.create',
    response:
      '{ id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }',
    markdown:
      "## create\n\n`client.workflows.create(): { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }`\n\n**post** `/v2/workflows/`\n\nCreate a new workflow.\n\n### Returns\n\n- `{ id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }`\n  Workflow detail — used for get, create, and list items.\n\n  - `id: string`\n  - `name: string`\n  - `created_at?: string`\n  - `description?: string`\n  - `fields?: object[]`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst workflow = await client.workflows.create();\n\nconsole.log(workflow);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/v2/workflows/{workflow_id}/',
    httpMethod: 'get',
    summary: 'Get workflow',
    description: 'Get workflow by ID.',
    stainlessPath: '(resource) workflows > (method) retrieve',
    qualified: 'client.workflows.retrieve',
    params: ['workflow_id: string;'],
    response:
      '{ id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }',
    markdown:
      "## retrieve\n\n`client.workflows.retrieve(workflow_id: string): { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }`\n\n**get** `/v2/workflows/{workflow_id}/`\n\nGet workflow by ID.\n\n### Parameters\n\n- `workflow_id: string`\n\n### Returns\n\n- `{ id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }`\n  Workflow detail — used for get, create, and list items.\n\n  - `id: string`\n  - `name: string`\n  - `created_at?: string`\n  - `description?: string`\n  - `fields?: object[]`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst workflow = await client.workflows.retrieve('workflow_id');\n\nconsole.log(workflow);\n```",
  },
  {
    name: 'list',
    endpoint: '/v2/workflows/',
    httpMethod: 'get',
    summary: 'List workflows',
    description: 'List workflows with pagination.',
    stainlessPath: '(resource) workflows > (method) list',
    qualified: 'client.workflows.list',
    params: [
      'order?: string;',
      'page?: number;',
      'page_size?: number;',
      'sort_by?: string;',
      'status?: string;',
    ],
    response:
      '{ count: number; page: number; page_size: number; results: { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }[]; }',
    markdown:
      "## list\n\n`client.workflows.list(order?: string, page?: number, page_size?: number, sort_by?: string, status?: string): { count: number; page: number; page_size: number; results: workflow[]; }`\n\n**get** `/v2/workflows/`\n\nList workflows with pagination.\n\n### Parameters\n\n- `order?: string`\n\n- `page?: number`\n\n- `page_size?: number`\n\n- `sort_by?: string`\n\n- `status?: string`\n\n### Returns\n\n- `{ count: number; page: number; page_size: number; results: { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }[]; }`\n  GET /workflows/ — paginated workflow list.\n\n  - `count: number`\n  - `page: number`\n  - `page_size: number`\n  - `results: { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst workflows = await client.workflows.list();\n\nconsole.log(workflows);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v2/workflows/{workflow_id}/',
    httpMethod: 'delete',
    summary: 'Delete workflow',
    description: 'Delete workflow by ID.',
    stainlessPath: '(resource) workflows > (method) delete',
    qualified: 'client.workflows.delete',
    params: ['workflow_id: string;'],
    markdown:
      "## delete\n\n`client.workflows.delete(workflow_id: string): void`\n\n**delete** `/v2/workflows/{workflow_id}/`\n\nDelete workflow by ID.\n\n### Parameters\n\n- `workflow_id: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nawait client.workflows.delete('workflow_id')\n```",
  },
  {
    name: 'list_runs',
    endpoint: '/v2/workflows/{workflow_id}/runs/',
    httpMethod: 'get',
    summary: 'List workflow runs',
    description: 'List extraction runs for a workflow, identified by collection UUID.',
    stainlessPath: '(resource) workflows > (method) list_runs',
    qualified: 'client.workflows.listRuns',
    params: ['workflow_id: string;', 'page?: number;', 'page_size?: number;'],
    response:
      '{ count: number; page: number; page_size: number; results: { id: string; status: string; created_at?: string; updated_at?: string; }[]; }',
    markdown:
      "## list_runs\n\n`client.workflows.listRuns(workflow_id: string, page?: number, page_size?: number): { count: number; page: number; page_size: number; results: object[]; }`\n\n**get** `/v2/workflows/{workflow_id}/runs/`\n\nList extraction runs for a workflow, identified by collection UUID.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `page?: number`\n\n- `page_size?: number`\n\n### Returns\n\n- `{ count: number; page: number; page_size: number; results: { id: string; status: string; created_at?: string; updated_at?: string; }[]; }`\n  GET /workflows/{id}/runs/ — paginated run list.\n\n  - `count: number`\n  - `page: number`\n  - `page_size: number`\n  - `results: { id: string; status: string; created_at?: string; updated_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.listRuns('workflow_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'results',
    endpoint: '/v2/workflows/{workflow_id}/results/',
    httpMethod: 'get',
    summary: 'Get workflow results',
    description: 'Get workflow results.',
    stainlessPath: '(resource) workflows > (method) results',
    qualified: 'client.workflows.results',
    params: ['workflow_id: string;', 'as_lists?: string;', 'output_format?: string;'],
    response: 'object',
    markdown:
      "## results\n\n`client.workflows.results(workflow_id: string, as_lists?: string, output_format?: string): object`\n\n**get** `/v2/workflows/{workflow_id}/results/`\n\nGet workflow results.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `as_lists?: string`\n\n- `output_format?: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.results('workflow_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'run',
    endpoint: '/v2/workflows/{workflow_id}/run/',
    httpMethod: 'post',
    summary: 'Run workflow',
    description: 'Execute workflow — returns collection UUID.',
    stainlessPath: '(resource) workflows > (method) run',
    qualified: 'client.workflows.run',
    params: [
      'workflow_id: string;',
      'content_type?: string;',
      'file?: string;',
      'file_base64?: string;',
      'filename?: string;',
      'text?: string;',
    ],
    response: '{ id: string; status: string; workflow_id: string; }',
    markdown:
      "## run\n\n`client.workflows.run(workflow_id: string, content_type?: string, file?: string, file_base64?: string, filename?: string, text?: string): { id: string; status: string; workflow_id: string; }`\n\n**post** `/v2/workflows/{workflow_id}/run/`\n\nExecute workflow — returns collection UUID.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `content_type?: string`\n\n- `file?: string`\n\n- `file_base64?: string`\n\n- `filename?: string`\n\n- `text?: string`\n\n### Returns\n\n- `{ id: string; status: string; workflow_id: string; }`\n  Response for workflow run endpoint (v2) — collection UUID as identifier.\n\n  - `id: string`\n  - `status: string`\n  - `workflow_id: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.run('workflow_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'upload',
    endpoint: '/v2/workflows/{workflow_id}/upload/',
    httpMethod: 'post',
    summary: 'Upload file',
    description: 'Upload file without executing workflow.',
    stainlessPath: '(resource) workflows > (method) upload',
    qualified: 'client.workflows.upload',
    params: [
      'workflow_id: string;',
      'content_type?: string;',
      'file?: string;',
      'file_base64?: string;',
      'filename?: string;',
      'text?: string;',
    ],
    response: '{ status: string; filename?: string; }',
    markdown:
      "## upload\n\n`client.workflows.upload(workflow_id: string, content_type?: string, file?: string, file_base64?: string, filename?: string, text?: string): { status: string; filename?: string; }`\n\n**post** `/v2/workflows/{workflow_id}/upload/`\n\nUpload file without executing workflow.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `content_type?: string`\n\n- `file?: string`\n\n- `file_base64?: string`\n\n- `filename?: string`\n\n- `text?: string`\n\n### Returns\n\n- `{ status: string; filename?: string; }`\n  POST /workflows/{id}/upload/ — upload confirmation.\n\n  - `status: string`\n  - `filename?: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.upload('workflow_id');\n\nconsole.log(response);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
