# Anyformat

Types:

- <code><a href="./src/resources/top-level.ts">HealthCheckResponse</a></code>

Methods:

- <code title="get /">client.<a href="./src/index.ts">healthCheck</a>() -> unknown</code>

# Health

Types:

- <code><a href="./src/resources/health.ts">HealthCheckResponse</a></code>

Methods:

- <code title="get /health/">client.health.<a href="./src/resources/health.ts">check</a>() -> unknown</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>

Methods:

- <code title="post /v2/webhooks/">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /v2/webhooks/">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /v2/webhooks/{webhook_id}/">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(webhookID) -> void</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">FileCreateResponse</a></code>
- <code><a href="./src/resources/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/files.ts">FileGetExtractionResultsResponse</a></code>

Methods:

- <code title="post /v2/files/">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> FileCreateResponse</code>
- <code title="get /v2/files/">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FileListResponse</code>
- <code title="delete /v2/files/{collection_id}/">client.files.<a href="./src/resources/files.ts">delete</a>(collectionID) -> void</code>
- <code title="get /v2/files/{collection_id}/extraction/">client.files.<a href="./src/resources/files.ts">getExtractionResults</a>(collectionID) -> unknown</code>

# Workflows

Types:

- <code><a href="./src/resources/workflows.ts">Workflow</a></code>
- <code><a href="./src/resources/workflows.ts">WorkflowListResponse</a></code>
- <code><a href="./src/resources/workflows.ts">WorkflowListRunsResponse</a></code>
- <code><a href="./src/resources/workflows.ts">WorkflowResultsResponse</a></code>
- <code><a href="./src/resources/workflows.ts">WorkflowRunResponse</a></code>
- <code><a href="./src/resources/workflows.ts">WorkflowUploadResponse</a></code>

Methods:

- <code title="post /v2/workflows/">client.workflows.<a href="./src/resources/workflows.ts">create</a>() -> Workflow</code>
- <code title="get /v2/workflows/{workflow_id}/">client.workflows.<a href="./src/resources/workflows.ts">retrieve</a>(workflowID) -> Workflow</code>
- <code title="get /v2/workflows/">client.workflows.<a href="./src/resources/workflows.ts">list</a>({ ...params }) -> WorkflowListResponse</code>
- <code title="delete /v2/workflows/{workflow_id}/">client.workflows.<a href="./src/resources/workflows.ts">delete</a>(workflowID) -> void</code>
- <code title="get /v2/workflows/{workflow_id}/runs/">client.workflows.<a href="./src/resources/workflows.ts">listRuns</a>(workflowID, { ...params }) -> WorkflowListRunsResponse</code>
- <code title="get /v2/workflows/{workflow_id}/results/">client.workflows.<a href="./src/resources/workflows.ts">results</a>(workflowID, { ...params }) -> unknown</code>
- <code title="post /v2/workflows/{workflow_id}/run/">client.workflows.<a href="./src/resources/workflows.ts">run</a>(workflowID, { ...params }) -> WorkflowRunResponse</code>
- <code title="post /v2/workflows/{workflow_id}/upload/">client.workflows.<a href="./src/resources/workflows.ts">upload</a>(workflowID, { ...params }) -> WorkflowUploadResponse</code>
