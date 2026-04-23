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
    name: 'check',
    endpoint: '/health/',
    httpMethod: 'get',
    summary: 'Health Check',
    description:
      'Returns 200 OK if the service is running. No authentication required.\n\nUse this endpoint to verify API connectivity before making authenticated calls.',
    stainlessPath: '(resource) health > (method) check',
    qualified: 'client.health.check',
    response: '{ message: string; }',
    markdown:
      "## check\n\n`client.health.check(): { message: string; }`\n\n**get** `/health/`\n\nReturns 200 OK if the service is running. No authentication required.\n\nUse this endpoint to verify API connectivity before making authenticated calls.\n\n### Returns\n\n- `{ message: string; }`\n  Health check response confirming the API is operational.\n\n  - `message: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst response = await client.health.check();\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'health check',
        example: "anyformat health check \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Health.Check',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Health.Check(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Message)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/health/ \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'health.check',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.health.check()\nprint(response.message)',
      },
      typescript: {
        method: 'client.health.check',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.health.check();\n\nconsole.log(response.message);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/webhooks/',
    httpMethod: 'post',
    summary: 'Create webhook',
    description:
      'Create a new webhook subscription for your organization.\n\nThe webhook URL must use HTTPS. AnyFormat will send POST requests to this URL\nwhen the subscribed events occur. The response includes a `secret` that you\nshould use to verify webhook signatures.\n\nSupported events:\n- `extraction.completed` — fired when a file extraction finishes successfully.\n- `extraction.failed` — fired when a file extraction fails.',
    stainlessPath: '(resource) webhooks > (method) create',
    qualified: 'client.webhooks.create',
    params: ['url: string;', 'events?: string[];'],
    response:
      '{ id: string; created_at: string; events: string[]; is_active: boolean; secret: string; url: string; }',
    markdown:
      "## create\n\n`client.webhooks.create(url: string, events?: string[]): { id: string; created_at: string; events: string[]; is_active: boolean; secret: string; url: string; }`\n\n**post** `/v2/webhooks/`\n\nCreate a new webhook subscription for your organization.\n\nThe webhook URL must use HTTPS. AnyFormat will send POST requests to this URL\nwhen the subscribed events occur. The response includes a `secret` that you\nshould use to verify webhook signatures.\n\nSupported events:\n- `extraction.completed` — fired when a file extraction finishes successfully.\n- `extraction.failed` — fired when a file extraction fails.\n\n### Parameters\n\n- `url: string`\n  The HTTPS URL to receive webhook events. Must be publicly accessible.\n\n- `events?: string[]`\n  List of event types to subscribe to. Available events: `extraction.completed`, `extraction.failed`.\n\n### Returns\n\n- `{ id: string; created_at: string; events: string[]; is_active: boolean; secret: string; url: string; }`\n  Webhook subscription details including the signing secret. The secret is only returned at creation time.\n\n  - `id: string`\n  - `created_at: string`\n  - `events: string[]`\n  - `is_active: boolean`\n  - `secret: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst webhook = await client.webhooks.create({ url: 'https://example.com/webhooks/anyformat' });\n\nconsole.log(webhook);\n```",
    perLanguage: {
      cli: {
        method: 'webhooks create',
        example:
          "anyformat webhooks create \\\n  --api-key 'My API Key' \\\n  --url https://example.com/webhooks/anyformat",
      },
      go: {
        method: 'client.Webhooks.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhook, err := client.Webhooks.New(context.TODO(), anyformat.WebhookNewParams{\n\t\tURL: "https://example.com/webhooks/anyformat",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhook.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/webhooks/ \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY" \\\n    -d \'{\n          "url": "https://example.com/webhooks/anyformat",\n          "events": [\n            "extraction.completed",\n            "extraction.failed"\n          ]\n        }\'',
      },
      python: {
        method: 'webhooks.create',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.webhooks.create(\n    url="https://example.com/webhooks/anyformat",\n)\nprint(webhook.id)',
      },
      typescript: {
        method: 'client.webhooks.create',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.create({ url: 'https://example.com/webhooks/anyformat' });\n\nconsole.log(webhook.id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/webhooks/',
    httpMethod: 'get',
    summary: 'List webhooks',
    description:
      'List all webhook subscriptions for the authenticated organization.\n\nReturns a list of webhooks. Secrets are excluded from the list response\nfor security — they are only returned once, when the webhook is created.',
    stainlessPath: '(resource) webhooks > (method) list',
    qualified: 'client.webhooks.list',
    response: '{ id: string; created_at: string; events: string[]; is_active: boolean; url: string; }[]',
    markdown:
      "## list\n\n`client.webhooks.list(): { id: string; created_at: string; events: string[]; is_active: boolean; url: string; }[]`\n\n**get** `/v2/webhooks/`\n\nList all webhook subscriptions for the authenticated organization.\n\nReturns a list of webhooks. Secrets are excluded from the list response\nfor security — they are only returned once, when the webhook is created.\n\n### Returns\n\n- `{ id: string; created_at: string; events: string[]; is_active: boolean; url: string; }[]`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst webhooks = await client.webhooks.list();\n\nconsole.log(webhooks);\n```",
    perLanguage: {
      cli: {
        method: 'webhooks list',
        example: "anyformat webhooks list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Webhooks.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhooks, err := client.Webhooks.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhooks)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/webhooks/ \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'webhooks.list',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nwebhooks = client.webhooks.list()\nprint(webhooks)',
      },
      typescript: {
        method: 'client.webhooks.list',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhooks = await client.webhooks.list();\n\nconsole.log(webhooks);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/webhooks/{webhook_id}/',
    httpMethod: 'delete',
    summary: 'Delete webhook',
    description:
      'Delete a webhook subscription by ID.\n\nAfter deletion, AnyFormat will stop sending events to the webhook URL.\nThis action is irreversible.',
    stainlessPath: '(resource) webhooks > (method) delete',
    qualified: 'client.webhooks.delete',
    params: ['webhook_id: string;'],
    markdown:
      "## delete\n\n`client.webhooks.delete(webhook_id: string): void`\n\n**delete** `/v2/webhooks/{webhook_id}/`\n\nDelete a webhook subscription by ID.\n\nAfter deletion, AnyFormat will stop sending events to the webhook URL.\nThis action is irreversible.\n\n### Parameters\n\n- `webhook_id: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nawait client.webhooks.delete('webhook_id')\n```",
    perLanguage: {
      cli: {
        method: 'webhooks delete',
        example: "anyformat webhooks delete \\\n  --api-key 'My API Key' \\\n  --webhook-id webhook_id",
      },
      go: {
        method: 'client.Webhooks.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Webhooks.Delete(context.TODO(), "webhook_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/webhooks/$WEBHOOK_ID/ \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'webhooks.delete',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nclient.webhooks.delete(\n    "webhook_id",\n)',
      },
      typescript: {
        method: 'client.webhooks.delete',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.webhooks.delete('webhook_id');",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/files/{collection_id}/',
    httpMethod: 'delete',
    summary: 'Delete file collection',
    description:
      'Delete a file collection and all its files permanently.\n\nThis removes all uploaded files and any extraction results associated with\nthe collection. This action is irreversible.',
    stainlessPath: '(resource) files > (method) delete',
    qualified: 'client.files.delete',
    params: ['collection_id: string;'],
    markdown:
      "## delete\n\n`client.files.delete(collection_id: string): void`\n\n**delete** `/v2/files/{collection_id}/`\n\nDelete a file collection and all its files permanently.\n\nThis removes all uploaded files and any extraction results associated with\nthe collection. This action is irreversible.\n\n### Parameters\n\n- `collection_id: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nawait client.files.delete('collection_id')\n```",
    perLanguage: {
      cli: {
        method: 'files delete',
        example: "anyformat files delete \\\n  --api-key 'My API Key' \\\n  --collection-id collection_id",
      },
      go: {
        method: 'client.Files.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Files.Delete(context.TODO(), "collection_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/files/$COLLECTION_ID/ \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'files.delete',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nclient.files.delete(\n    "collection_id",\n)',
      },
      typescript: {
        method: 'client.files.delete',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.files.delete('collection_id');",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v2/workflows/',
    httpMethod: 'post',
    summary: 'Create workflow',
    description:
      'Create a new extraction workflow.\n\nWorkflows define what data to extract from documents. After creating a workflow,\nconfigure its extraction fields in the [AnyFormat dashboard](https://app.anyformat.ai).',
    stainlessPath: '(resource) workflows > (method) create',
    qualified: 'client.workflows.create',
    response:
      '{ id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }',
    markdown:
      "## create\n\n`client.workflows.create(): { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }`\n\n**post** `/v2/workflows/`\n\nCreate a new extraction workflow.\n\nWorkflows define what data to extract from documents. After creating a workflow,\nconfigure its extraction fields in the [AnyFormat dashboard](https://app.anyformat.ai).\n\n### Returns\n\n- `{ id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }`\n  A workflow defines the extraction template — what fields to extract from documents, their types, and validation rules.\n\n  - `id: string`\n  - `name: string`\n  - `created_at?: string`\n  - `description?: string`\n  - `fields?: object[]`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst workflow = await client.workflows.create();\n\nconsole.log(workflow);\n```",
    perLanguage: {
      cli: {
        method: 'workflows create',
        example: "anyformat workflows create \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Workflows.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkflow, err := client.Workflows.New(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workflow.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/ \\\n    -X POST \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.create',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nworkflow = client.workflows.create()\nprint(workflow.id)',
      },
      typescript: {
        method: 'client.workflows.create',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst workflow = await client.workflows.create();\n\nconsole.log(workflow.id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v2/workflows/',
    httpMethod: 'get',
    summary: 'List workflows',
    description:
      'List all workflows in your organization with pagination.\n\nWorkflows can be filtered by status and sorted by any field.',
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
      "## list\n\n`client.workflows.list(order?: string, page?: number, page_size?: number, sort_by?: string, status?: string): { count: number; page: number; page_size: number; results: workflow[]; }`\n\n**get** `/v2/workflows/`\n\nList all workflows in your organization with pagination.\n\nWorkflows can be filtered by status and sorted by any field.\n\n### Parameters\n\n- `order?: string`\n\n- `page?: number`\n\n- `page_size?: number`\n\n- `sort_by?: string`\n\n- `status?: string`\n\n### Returns\n\n- `{ count: number; page: number; page_size: number; results: { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }[]; }`\n  Paginated list of workflows.\n\n  - `count: number`\n  - `page: number`\n  - `page_size: number`\n  - `results: { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst workflows = await client.workflows.list();\n\nconsole.log(workflows);\n```",
    perLanguage: {
      cli: {
        method: 'workflows list',
        example: "anyformat workflows list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Workflows.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkflows, err := client.Workflows.List(context.TODO(), anyformat.WorkflowListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workflows.Count)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/ \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.list',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nworkflows = client.workflows.list()\nprint(workflows.count)',
      },
      typescript: {
        method: 'client.workflows.list',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst workflows = await client.workflows.list();\n\nconsole.log(workflows.count);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v2/workflows/{workflow_id}/',
    httpMethod: 'get',
    summary: 'Get workflow',
    description: 'Retrieve a single workflow by its ID, including its configured extraction fields.',
    stainlessPath: '(resource) workflows > (method) retrieve',
    qualified: 'client.workflows.retrieve',
    params: ['workflow_id: string;'],
    response:
      '{ id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }',
    markdown:
      "## retrieve\n\n`client.workflows.retrieve(workflow_id: string): { id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }`\n\n**get** `/v2/workflows/{workflow_id}/`\n\nRetrieve a single workflow by its ID, including its configured extraction fields.\n\n### Parameters\n\n- `workflow_id: string`\n\n### Returns\n\n- `{ id: string; name: string; created_at?: string; description?: string; fields?: object[]; updated_at?: string; }`\n  A workflow defines the extraction template — what fields to extract from documents, their types, and validation rules.\n\n  - `id: string`\n  - `name: string`\n  - `created_at?: string`\n  - `description?: string`\n  - `fields?: object[]`\n  - `updated_at?: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst workflow = await client.workflows.retrieve('workflow_id');\n\nconsole.log(workflow);\n```",
    perLanguage: {
      cli: {
        method: 'workflows retrieve',
        example: "anyformat workflows retrieve \\\n  --api-key 'My API Key' \\\n  --workflow-id workflow_id",
      },
      go: {
        method: 'client.Workflows.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tworkflow, err := client.Workflows.Get(context.TODO(), "workflow_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", workflow.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/$WORKFLOW_ID/ \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.retrieve',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nworkflow = client.workflows.retrieve(\n    "workflow_id",\n)\nprint(workflow.id)',
      },
      typescript: {
        method: 'client.workflows.retrieve',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst workflow = await client.workflows.retrieve('workflow_id');\n\nconsole.log(workflow.id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v2/workflows/{workflow_id}/',
    httpMethod: 'delete',
    summary: 'Delete workflow',
    description:
      'Delete a workflow and all associated file collections and extraction results.\n\nThis action is irreversible.',
    stainlessPath: '(resource) workflows > (method) delete',
    qualified: 'client.workflows.delete',
    params: ['workflow_id: string;'],
    markdown:
      "## delete\n\n`client.workflows.delete(workflow_id: string): void`\n\n**delete** `/v2/workflows/{workflow_id}/`\n\nDelete a workflow and all associated file collections and extraction results.\n\nThis action is irreversible.\n\n### Parameters\n\n- `workflow_id: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nawait client.workflows.delete('workflow_id')\n```",
    perLanguage: {
      cli: {
        method: 'workflows delete',
        example: "anyformat workflows delete \\\n  --api-key 'My API Key' \\\n  --workflow-id workflow_id",
      },
      go: {
        method: 'client.Workflows.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Workflows.Delete(context.TODO(), "workflow_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/$WORKFLOW_ID/ \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.delete',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nclient.workflows.delete(\n    "workflow_id",\n)',
      },
      typescript: {
        method: 'client.workflows.delete',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.workflows.delete('workflow_id');",
      },
    },
  },
  {
    name: 'run',
    endpoint: '/v2/workflows/{workflow_id}/run/',
    httpMethod: 'post',
    summary: 'Run workflow',
    description:
      'Upload a file and immediately run the extraction workflow on it.\n\nThis is the primary endpoint for document extraction. It creates a file collection,\nuploads the file, and starts extraction in one step. The response includes a collection\n`id` that you can use to poll for results via\n`GET /v2/workflows/{workflow_id}/files/{collection_id}/results/`.\n\nProvide the file as a binary upload in the `file` field, or send raw text in the\n`text` field for text-only extraction.',
    stainlessPath: '(resource) workflows > (method) run',
    qualified: 'client.workflows.run',
    params: ['workflow_id: string;', 'file?: string;', 'text?: string;'],
    response: '{ id: string; status: string; workflow_id: string; }',
    markdown:
      "## run\n\n`client.workflows.run(workflow_id: string, file?: string, text?: string): { id: string; status: string; workflow_id: string; }`\n\n**post** `/v2/workflows/{workflow_id}/run/`\n\nUpload a file and immediately run the extraction workflow on it.\n\nThis is the primary endpoint for document extraction. It creates a file collection,\nuploads the file, and starts extraction in one step. The response includes a collection\n`id` that you can use to poll for results via\n`GET /v2/workflows/{workflow_id}/files/{collection_id}/results/`.\n\nProvide the file as a binary upload in the `file` field, or send raw text in the\n`text` field for text-only extraction.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `file?: string`\n\n- `text?: string`\n\n### Returns\n\n- `{ id: string; status: string; workflow_id: string; }`\n  Response after triggering a workflow run. Contains the collection ID to use for polling extraction results.\n\n  - `id: string`\n  - `status: string`\n  - `workflow_id: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.run('workflow_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'workflows run',
        example: "anyformat workflows run \\\n  --api-key 'My API Key' \\\n  --workflow-id workflow_id",
      },
      go: {
        method: 'client.Workflows.Run',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workflows.Run(\n\t\tcontext.TODO(),\n\t\t"workflow_id",\n\t\tanyformat.WorkflowRunParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/$WORKFLOW_ID/run/ \\\n    -X POST \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.run',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workflows.run(\n    workflow_id="workflow_id",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.workflows.run',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workflows.run('workflow_id');\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'upload',
    endpoint: '/v2/workflows/{workflow_id}/upload/',
    httpMethod: 'post',
    summary: 'Upload file',
    description:
      'Upload a file to a workflow without running extraction.\n\nUse this when you want to stage files for later processing. For upload-and-extract\nin one step, use `POST /v2/workflows/{workflow_id}/run/` instead.',
    stainlessPath: '(resource) workflows > (method) upload',
    qualified: 'client.workflows.upload',
    params: ['workflow_id: string;', 'file?: string;', 'text?: string;'],
    response: '{ status: string; filename?: string; }',
    markdown:
      "## upload\n\n`client.workflows.upload(workflow_id: string, file?: string, text?: string): { status: string; filename?: string; }`\n\n**post** `/v2/workflows/{workflow_id}/upload/`\n\nUpload a file to a workflow without running extraction.\n\nUse this when you want to stage files for later processing. For upload-and-extract\nin one step, use `POST /v2/workflows/{workflow_id}/run/` instead.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `file?: string`\n\n- `text?: string`\n\n### Returns\n\n- `{ status: string; filename?: string; }`\n  Confirmation that a file was uploaded successfully without triggering extraction.\n\n  - `status: string`\n  - `filename?: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.upload('workflow_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'workflows upload',
        example: "anyformat workflows upload \\\n  --api-key 'My API Key' \\\n  --workflow-id workflow_id",
      },
      go: {
        method: 'client.Workflows.Upload',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workflows.Upload(\n\t\tcontext.TODO(),\n\t\t"workflow_id",\n\t\tanyformat.WorkflowUploadParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Status)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/$WORKFLOW_ID/upload/ \\\n    -X POST \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.upload',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workflows.upload(\n    workflow_id="workflow_id",\n)\nprint(response.status)',
      },
      typescript: {
        method: 'client.workflows.upload',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workflows.upload('workflow_id');\n\nconsole.log(response.status);",
      },
    },
  },
  {
    name: 'list_runs',
    endpoint: '/v2/workflows/{workflow_id}/runs/',
    httpMethod: 'get',
    summary: 'List workflow runs',
    description:
      "List all extraction runs for a workflow with pagination.\n\nEach run corresponds to a file collection that was processed by the workflow.\nUse the run's `id` (collection UUID) with\n`GET /v2/workflows/{workflow_id}/files/{id}/results/` to fetch detailed results.",
    stainlessPath: '(resource) workflows > (method) list_runs',
    qualified: 'client.workflows.listRuns',
    params: ['workflow_id: string;', 'page?: number;', 'page_size?: number;'],
    response:
      '{ count: number; page: number; page_size: number; results: { id: string; status: string; created_at?: string; updated_at?: string; }[]; }',
    markdown:
      "## list_runs\n\n`client.workflows.listRuns(workflow_id: string, page?: number, page_size?: number): { count: number; page: number; page_size: number; results: object[]; }`\n\n**get** `/v2/workflows/{workflow_id}/runs/`\n\nList all extraction runs for a workflow with pagination.\n\nEach run corresponds to a file collection that was processed by the workflow.\nUse the run's `id` (collection UUID) with\n`GET /v2/workflows/{workflow_id}/files/{id}/results/` to fetch detailed results.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `page?: number`\n\n- `page_size?: number`\n\n### Returns\n\n- `{ count: number; page: number; page_size: number; results: { id: string; status: string; created_at?: string; updated_at?: string; }[]; }`\n  Paginated list of workflow runs.\n\n  - `count: number`\n  - `page: number`\n  - `page_size: number`\n  - `results: { id: string; status: string; created_at?: string; updated_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.listRuns('workflow_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'workflows list_runs',
        example: "anyformat workflows list-runs \\\n  --api-key 'My API Key' \\\n  --workflow-id workflow_id",
      },
      go: {
        method: 'client.Workflows.ListRuns',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workflows.ListRuns(\n\t\tcontext.TODO(),\n\t\t"workflow_id",\n\t\tanyformat.WorkflowListRunsParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Count)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/$WORKFLOW_ID/runs/ \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.list_runs',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workflows.list_runs(\n    workflow_id="workflow_id",\n)\nprint(response.count)',
      },
      typescript: {
        method: 'client.workflows.listRuns',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workflows.listRuns('workflow_id');\n\nconsole.log(response.count);",
      },
    },
  },
  {
    name: 'list_files',
    endpoint: '/v2/workflows/{workflow_id}/files/',
    httpMethod: 'get',
    summary: 'List file collections',
    description:
      'List file collections for a workflow.\n\nA file collection groups one or more uploaded files together. Each collection\nhas a status indicating the extraction progress: `pending`, `processing`,\n`completed`, or `failed`.',
    stainlessPath: '(resource) workflows > (method) list_files',
    qualified: 'client.workflows.listFiles',
    params: ['workflow_id: string;', 'page?: number;', 'page_size?: number;'],
    response:
      '{ count: number; page: number; page_size: number; results: { id: string; status: string; created_at?: string; name?: string; updated_at?: string; }[]; }',
    markdown:
      "## list_files\n\n`client.workflows.listFiles(workflow_id: string, page?: number, page_size?: number): { count: number; page: number; page_size: number; results: object[]; }`\n\n**get** `/v2/workflows/{workflow_id}/files/`\n\nList file collections for a workflow.\n\nA file collection groups one or more uploaded files together. Each collection\nhas a status indicating the extraction progress: `pending`, `processing`,\n`completed`, or `failed`.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `page?: number`\n\n- `page_size?: number`\n\n### Returns\n\n- `{ count: number; page: number; page_size: number; results: { id: string; status: string; created_at?: string; name?: string; updated_at?: string; }[]; }`\n\n  - `count: number`\n  - `page: number`\n  - `page_size: number`\n  - `results: { id: string; status: string; created_at?: string; name?: string; updated_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.listFiles('workflow_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'workflows list_files',
        example:
          "anyformat workflows list-files \\\n  --api-key 'My API Key' \\\n  --workflow-id workflow_id",
      },
      go: {
        method: 'client.Workflows.ListFiles',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workflows.ListFiles(\n\t\tcontext.TODO(),\n\t\t"workflow_id",\n\t\tanyformat.WorkflowListFilesParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Count)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/$WORKFLOW_ID/files/ \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.list_files',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workflows.list_files(\n    workflow_id="workflow_id",\n)\nprint(response.count)',
      },
      typescript: {
        method: 'client.workflows.listFiles',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workflows.listFiles('workflow_id');\n\nconsole.log(response.count);",
      },
    },
  },
  {
    name: 'create_file',
    endpoint: '/v2/workflows/{workflow_id}/files/',
    httpMethod: 'post',
    summary: 'Create file collection',
    description:
      'Upload one or more files to a workflow, creating a new file collection.\n\nUse this when you want to upload files without immediately running extraction.\nTo upload and extract in one step, use `POST /v2/workflows/{workflow_id}/run/` instead.\n\nSupported file types: PDF, PNG, JPG, TIFF, TXT, DOCX, XLSX, CSV, and more.',
    stainlessPath: '(resource) workflows > (method) create_file',
    qualified: 'client.workflows.createFile',
    params: ['workflow_id: string;', 'files: string[];'],
    response:
      '{ id: string; files: { filename: string; status: string; }[]; workflow_id: string; name?: string; }',
    markdown:
      "## create_file\n\n`client.workflows.createFile(workflow_id: string, files: string[]): { id: string; files: object[]; workflow_id: string; name?: string; }`\n\n**post** `/v2/workflows/{workflow_id}/files/`\n\nUpload one or more files to a workflow, creating a new file collection.\n\nUse this when you want to upload files without immediately running extraction.\nTo upload and extract in one step, use `POST /v2/workflows/{workflow_id}/run/` instead.\n\nSupported file types: PDF, PNG, JPG, TIFF, TXT, DOCX, XLSX, CSV, and more.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `files: string[]`\n\n### Returns\n\n- `{ id: string; files: { filename: string; status: string; }[]; workflow_id: string; name?: string; }`\n  Response from creating a file collection. Contains the collection ID and the status of each uploaded file.\n\n  - `id: string`\n  - `files: { filename: string; status: string; }[]`\n  - `workflow_id: string`\n  - `name?: string`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.createFile('workflow_id', { files: ['string'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'workflows create_file',
        example:
          "anyformat workflows create-file \\\n  --api-key 'My API Key' \\\n  --workflow-id workflow_id \\\n  --file string",
      },
      go: {
        method: 'client.Workflows.NewFile',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workflows.NewFile(\n\t\tcontext.TODO(),\n\t\t"workflow_id",\n\t\tanyformat.WorkflowNewFileParams{\n\t\t\tFiles: []string{"string"},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/$WORKFLOW_ID/files/ \\\n    -H \'Content-Type: multipart/form-data\' \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY" \\\n    -F files=\'["string"]\'',
      },
      python: {
        method: 'workflows.create_file',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workflows.create_file(\n    workflow_id="workflow_id",\n    files=["string"],\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.workflows.createFile',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workflows.createFile('workflow_id', { files: ['string'] });\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'get_file_results',
    endpoint: '/v2/workflows/{workflow_id}/files/{collection_id}/results/',
    httpMethod: 'get',
    summary: 'Get file results',
    description:
      'Retrieve the extraction results for a file collection.\n\nReturns the structured data extracted from each file, including field values,\nconfidence scores, and source evidence (text excerpts and page numbers). Also\nincludes a `verification_url` linking to the AnyFormat dashboard for human review.\n\nReturns **412 Precondition Failed** if the extraction is still in progress. Poll\nthis endpoint until you receive a 200 response, or use webhooks\n(`extraction.completed` event) to be notified when processing finishes.',
    stainlessPath: '(resource) workflows > (method) get_file_results',
    qualified: 'client.workflows.getFileResults',
    params: ['workflow_id: string;', 'collection_id: string;'],
    response: 'object',
    markdown:
      "## get_file_results\n\n`client.workflows.getFileResults(workflow_id: string, collection_id: string): object`\n\n**get** `/v2/workflows/{workflow_id}/files/{collection_id}/results/`\n\nRetrieve the extraction results for a file collection.\n\nReturns the structured data extracted from each file, including field values,\nconfidence scores, and source evidence (text excerpts and page numbers). Also\nincludes a `verification_url` linking to the AnyFormat dashboard for human review.\n\nReturns **412 Precondition Failed** if the extraction is still in progress. Poll\nthis endpoint until you receive a 200 response, or use webhooks\n(`extraction.completed` event) to be notified when processing finishes.\n\n### Parameters\n\n- `workflow_id: string`\n\n- `collection_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat();\n\nconst response = await client.workflows.getFileResults('collection_id', { workflow_id: 'workflow_id' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'workflows get_file_results',
        example:
          "anyformat workflows get-file-results \\\n  --api-key 'My API Key' \\\n  --workflow-id workflow_id \\\n  --collection-id collection_id",
      },
      go: {
        method: 'client.Workflows.GetFileResults',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Workflows.GetFileResults(\n\t\tcontext.TODO(),\n\t\t"collection_id",\n\t\tanyformat.WorkflowGetFileResultsParams{\n\t\t\tWorkflowID: "workflow_id",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.anyformat.ai/v2/workflows/$WORKFLOW_ID/files/$COLLECTION_ID/results/ \\\n    -H "Authorization: Bearer $ANYFORMAT_API_KEY"',
      },
      python: {
        method: 'workflows.get_file_results',
        example:
          'import os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.workflows.get_file_results(\n    collection_id="collection_id",\n    workflow_id="workflow_id",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.workflows.getFileResults',
        example:
          "import Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workflows.getFileResults('collection_id', {\n  workflow_id: 'workflow_id',\n});\n\nconsole.log(response);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Anyformat CLI\n\nThe official CLI for the [Anyformat REST API](https://docs.anyformat.ai).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/anyformat-ai/anyformat-cli/cmd/anyformat@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nanyformat [resource] <command> [flags...]\n~~~\n\n~~~sh\nanyformat workflows run \\\n  --api-key 'My API Key' \\\n  --workflow-id 0686bb97-8c30-70f0-8000-97669e000eb8 \\\n  --text 'Invoice #12345\nDate: 2025-01-15\nAmount: $1,250.00\nVendor: Acme Corp'\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Required | Default value |\n| -------------------- | -------- | ------------- |\n| `ANYFORMAT_API_KEY`  | no       | `null`        |\n\n### Global flags\n\n- `--api-key` (can also be set with `ANYFORMAT_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nanyformat <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nanyformat <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nanyformat <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nanyformat <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nanyformat <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Anyformat Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/anyformat-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../anyformat-go`.\n",
  },
  {
    language: 'go',
    content:
      '# Anyformat Go API Library\n\n<a href="https://pkg.go.dev/github.com/anyformat-ai/anyformat-go"><img src="https://pkg.go.dev/badge/github.com/anyformat-ai/anyformat-go.svg" alt="Go Reference"></a>\n\nThe Anyformat Go library provides convenient access to the [Anyformat REST API](https://docs.anyformat.ai)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Anyformat MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=anyformat-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImFueWZvcm1hdC1tY3AiXSwiZW52Ijp7IkFOWUZPUk1BVF9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22anyformat-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22anyformat-mcp%22%5D%2C%22env%22%3A%7B%22ANYFORMAT_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/anyformat-ai/anyformat-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/anyformat-ai/anyformat-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/anyformat-ai/anyformat-go"\n\t"github.com/anyformat-ai/anyformat-go/option"\n)\n\nfunc main() {\n\tclient := anyformat.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("ANYFORMAT_API_KEY")\n\t)\n\tresponse, err := client.Workflows.Run(\n\t\tcontext.TODO(),\n\t\t"0686bb97-8c30-70f0-8000-97669e000eb8",\n\t\tanyformat.WorkflowRunParams{\n\t\t\tText: anyformat.String("Invoice #12345\\nDate: 2025-01-15\\nAmount: $1,250.00\\nVendor: Acme Corp"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Health.Check(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/anyformat-ai/anyformat-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Health.Check(context.TODO())\nif err != nil {\n\tvar apierr *anyformat.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/health/": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Health.Check(\n\tctx,\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := anyformat.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Health.Check(context.TODO(), option.WithMaxRetries(5))\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nresponse, err := client.Health.Check(context.TODO(), option.WithResponseInto(&response))\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", response)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/anyformat-ai/anyformat-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'python',
    content:
      '# Anyformat Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/anyformat.svg?label=pypi%20(stable))](https://pypi.org/project/anyformat/)\n\nThe Anyformat Python library provides convenient access to the Anyformat REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Anyformat MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=anyformat-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImFueWZvcm1hdC1tY3AiXSwiZW52Ijp7IkFOWUZPUk1BVF9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22anyformat-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22anyformat-mcp%22%5D%2C%22env%22%3A%7B%22ANYFORMAT_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.anyformat.ai](https://docs.anyformat.ai). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install anyformat\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom anyformat import Anyformat\n\nclient = Anyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\n\nresponse = client.workflows.run(\n    workflow_id="0686bb97-8c30-70f0-8000-97669e000eb8",\n    text="Invoice #12345\\nDate: 2025-01-15\\nAmount: $1,250.00\\nVendor: Acme Corp",\n)\nprint(response.id)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `ANYFORMAT_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncAnyformat` instead of `Anyformat` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom anyformat import AsyncAnyformat\n\nclient = AsyncAnyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  response = await client.workflows.run(\n      workflow_id="0686bb97-8c30-70f0-8000-97669e000eb8",\n      text="Invoice #12345\\nDate: 2025-01-15\\nAmount: $1,250.00\\nVendor: Acme Corp",\n  )\n  print(response.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install anyformat[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom anyformat import DefaultAioHttpClient\nfrom anyformat import AsyncAnyformat\n\nasync def main() -> None:\n  async with AsyncAnyformat(\n    api_key=os.environ.get("ANYFORMAT_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    response = await client.workflows.run(\n        workflow_id="0686bb97-8c30-70f0-8000-97669e000eb8",\n        text="Invoice #12345\\nDate: 2025-01-15\\nAmount: $1,250.00\\nVendor: Acme Corp",\n    )\n    print(response.id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `anyformat.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `anyformat.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `anyformat.APIError`.\n\n```python\nimport anyformat\nfrom anyformat import Anyformat\n\nclient = Anyformat()\n\ntry:\n    client.health.check()\nexcept anyformat.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept anyformat.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept anyformat.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom anyformat import Anyformat\n\n# Configure the default for all requests:\nclient = Anyformat(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).health.check()\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom anyformat import Anyformat\n\n# Configure the default for all requests:\nclient = Anyformat(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Anyformat(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).health.check()\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `ANYFORMAT_LOG` to `info`.\n\n```shell\n$ export ANYFORMAT_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom anyformat import Anyformat\n\nclient = Anyformat()\nresponse = client.health.with_raw_response.check()\nprint(response.headers.get(\'X-My-Header\'))\n\nhealth = response.parse()  # get the object that `health.check()` would have returned\nprint(health.message)\n```\n\nThese methods return an [`APIResponse`](https://github.com/anyformat-ai/anyformat-python/tree/main/src/anyformat/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/anyformat-ai/anyformat-python/tree/main/src/anyformat/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.health.with_streaming_response.check() as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom anyformat import Anyformat, DefaultHttpxClient\n\nclient = Anyformat(\n    # Or use the `ANYFORMAT_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom anyformat import Anyformat\n\nwith Anyformat() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/anyformat-ai/anyformat-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport anyformat\nprint(anyformat.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Anyformat TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/anyformat-ai.svg?label=npm%20(stable))](https://npmjs.org/package/anyformat-ai) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/anyformat-ai)\n\nThis library provides convenient access to the Anyformat REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.anyformat.ai](https://docs.anyformat.ai). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Anyformat MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=anyformat-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImFueWZvcm1hdC1tY3AiXSwiZW52Ijp7IkFOWUZPUk1BVF9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22anyformat-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22anyformat-mcp%22%5D%2C%22env%22%3A%7B%22ANYFORMAT_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install anyformat-ai\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.workflows.run('0686bb97-8c30-70f0-8000-97669e000eb8', {\n  text: 'Invoice #12345\\nDate: 2025-01-15\\nAmount: $1,250.00\\nVendor: Acme Corp',\n});\n\nconsole.log(response.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  apiKey: process.env['ANYFORMAT_API_KEY'], // This is the default and can be omitted\n});\n\nconst response: Anyformat.HealthCheckResponse = await client.health.check();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.health.check().catch(async (err) => {\n  if (err instanceof Anyformat.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Anyformat({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.health.check({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Anyformat({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.health.check({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Anyformat();\n\nconst response = await client.health.check().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.health.check().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.message);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `ANYFORMAT_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Anyformat from 'anyformat-ai';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Anyformat({\n  logger: logger.child({ name: 'Anyformat' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.workflows.run({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Anyformat from 'anyformat-ai';\nimport fetch from 'my-fetch';\n\nconst client = new Anyformat({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Anyformat from 'anyformat-ai';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Anyformat({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Anyformat from 'anyformat-ai';\n\nconst client = new Anyformat({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Anyformat from 'npm:anyformat-ai';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Anyformat({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/anyformat-ai/anyformat-node/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

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
