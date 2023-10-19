import { describe, expect, test } from 'bun:test';

import { lazy } from './lib/lazy';
import { lazySum, sum } from './sum';

describe('sum/lazySum', () => {
  test(`
  Given: 1 and 2
  When: sum and lazySum
  Then: isEqual`, () => {
    const x = 1;
    const y = 2;
    const sumResult = sum(x, y);
    const lazySumResult = lazySum(lazy(x), lazy(y));

    expect(lazySumResult()).toEqual(sumResult);
  });
});
