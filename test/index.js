import { deepStrictEqual } from 'assert';
import path from 'path';
import runTest from 'tapdance';
import AdapterSingleton from 'fortune/lib/adapter/singleton.js';
import testAdapter from 'fortune/test/adapter.js';
import Adapter from '../lib/index.js';

const recordTypes = {
  user: {
    name: String,
    following: [Array('user'), 'followers'],
    followers: [Array('user'), 'following'],
    posts: [Array('post'), 'author'],
  },
  post: {
    message: String,
    'in-reply-to': ['post', 'replies'],
    replies: [Array('post'), 'in-reply-to'],
    author: ['user', 'posts'],
  },
};

const options = {
  dbPath: path.resolve('test/fixtures'),
};

testAdapter(Adapter);

runTest(async (assert, comment) => {
  comment('with fixtures');

  const assertEqual = (a, b, msg) => assert(
    deepStrictEqual(a, b) || true, msg
  );

  const adapter = new AdapterSingleton({
    recordTypes,
    adapter: [ Adapter, options ]
  });
  await adapter.connect();

  let results;

  results = await adapter.find('user', [1]);
  assert(results[0].name === 'Chris', 'user 1 has name');
  assertEqual(results[0].followers, [2,3,4], 'user 1 has followers');

  results = await adapter.find('user', [5]);
  assert(results[0].name === 'Catbug', 'user 5 has name');
  assertEqual(results[0].followers, [1,2,3,4], 'user 5 has followers');

  results = await adapter.find('post', [1]);
  assert(results[0].author === 5, 'post 1 has author');
  assertEqual(results[0].replies, [2], 'post 1 has replies');

  results = await adapter.find('post', [2]);
  assert(results[0].author === 4, 'post 2 has author');
  assertEqual(results[0].replies, [3], 'post 2 has replies');

  await adapter.disconnect();
});
