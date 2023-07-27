import { test, expect } from '@playwright/test';

test('returns posts', async ({request}) => {
  const captureResponse = await request.get('/api/posts');
  expect(captureResponse.ok()).toBeTruthy();
  const json = await captureResponse.json();

  const title = "Hello World";
  const slug = "hello-world";
  const markdown = "This is my first post!";
  expect(json.posts).toEqual([{title, slug, markdown}]);
});

test('creates post', async ({request}) => {
  const title = "Hello again!";
  const slug = "hello-again";
  const markdown = "This is my second post!";
  const data = {
    title, slug, markdown,
  };

  const createResponse = await request.post('/api/posts', {
    data,
  });
  expect(createResponse.ok()).toBeTruthy();
  const json = await createResponse.json();
  expect(json.post).toEqual(data);
});

test('errors out on invalid request', async ({request}) => {
  const data = {
    other: true,
  };

  const createResponse = await request.post('/api/posts', {
    data,
  });
  expect(createResponse.ok()).toBeFalsy();
  expect(createResponse.status()).toEqual(400);
});

