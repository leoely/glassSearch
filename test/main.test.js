import { describe, expect, test, } from '@jest/globals';
import http from 'http';
import fetch from 'node-fetch';

test('[Main] glassSearch', async () => {
  const response = await fetch('http://localhost:8000/word/hi', { method: 'POST', });
  const body = await response.text();
  expect(JSON.stringify(body)).toMatch('\"[[\\\"/some\\\",1]]\"');
});
