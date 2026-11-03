import { test } from 'node:test';
import assert from 'node:assert/strict';
import middleware from '../middleware.js';

test('requires credentials for pages and static files', () => {
  for (const path of ['/', '/papers/', '/search.json', '/media/wiki/example.png']) {
    for (const authorization of [undefined, 'Basic ' + btoa('research:wrong')]) {
      const headers = authorization ? { authorization } : {};
      const response = middleware(new Request(`https://example.com${path}`, { headers }));
      assert.equal(response.status, 401);
      assert.match(response.headers.get('www-authenticate'), /^Basic /);
    }
    const response = middleware(new Request(`https://example.com${path}`, {
      headers: { authorization: 'Basic ' + btoa('research:research') },
    }));
    assert.equal(response.headers.get('x-middleware-next'), '1');
  }
});
