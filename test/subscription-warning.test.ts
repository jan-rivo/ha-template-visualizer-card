import assert from 'node:assert/strict';
import { test } from 'node:test';
import { shouldWarnForSubscriptionCount, SUBSCRIPTION_WARNING_LIMIT } from '../src/card';

test('no warning below the limit, even for admins', () => {
  assert.equal(shouldWarnForSubscriptionCount(SUBSCRIPTION_WARNING_LIMIT - 1, true), false);
  assert.equal(shouldWarnForSubscriptionCount(5, true), false);
});

test('no warning exactly at the limit', () => {
  assert.equal(shouldWarnForSubscriptionCount(SUBSCRIPTION_WARNING_LIMIT, true), false);
});

test('warning above the limit, but only for admins', () => {
  assert.equal(shouldWarnForSubscriptionCount(SUBSCRIPTION_WARNING_LIMIT + 1, true), true);
  assert.equal(shouldWarnForSubscriptionCount(SUBSCRIPTION_WARNING_LIMIT + 1, false), false);
  assert.equal(shouldWarnForSubscriptionCount(100, false), false);
});

test('custom limit is honored', () => {
  assert.equal(shouldWarnForSubscriptionCount(10, true, 5), true);
  assert.equal(shouldWarnForSubscriptionCount(10, true, 20), false);
});
