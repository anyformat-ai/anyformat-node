// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Anyformat from '@anyformat/anyformat-ai';

const client = new Anyformat({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource workflows', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.workflows.create({
      fields: [{ data_type: 'bar', name: 'bar' }],
      name: 'Invoice Processing',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.workflows.create({
      fields: [{ data_type: 'bar', name: 'bar' }],
      name: 'Invoice Processing',
      description: 'Extracts invoice number, vendor, total, and line items.',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.workflows.retrieve('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.workflows.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workflows.list(
        {
          order: 'order',
          page: 1,
          page_size: 1,
          sort_by: 'sort_by',
          status: 'status',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Anyformat.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.workflows.delete('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createFile: only required params', async () => {
    const responsePromise = client.workflows.createFile('workflow_id', { files: ['string'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createFile: required and optional params', async () => {
    const response = await client.workflows.createFile('workflow_id', { files: ['string'] });
  });

  // Mock server tests are disabled
  test.skip('getFileResults: only required params', async () => {
    const responsePromise = client.workflows.getFileResults('collection_id', { workflow_id: 'workflow_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getFileResults: required and optional params', async () => {
    const response = await client.workflows.getFileResults('collection_id', { workflow_id: 'workflow_id' });
  });

  // Mock server tests are disabled
  test.skip('listFiles', async () => {
    const responsePromise = client.workflows.listFiles('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listFiles: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workflows.listFiles(
        'workflow_id',
        { page: 1, page_size: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Anyformat.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listRuns', async () => {
    const responsePromise = client.workflows.listRuns('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listRuns: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workflows.listRuns(
        'workflow_id',
        { page: 1, page_size: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Anyformat.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('run', async () => {
    const responsePromise = client.workflows.run('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('run: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workflows.run(
        'workflow_id',
        { file: 'file', text: 'text' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Anyformat.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('upload', async () => {
    const responsePromise = client.workflows.upload('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('upload: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.workflows.upload(
        'workflow_id',
        { file: 'file', text: 'text' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Anyformat.NotFoundError);
  });
});
