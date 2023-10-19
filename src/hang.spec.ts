import { describe, expect, test } from 'bun:test';

import { hang, lazyFirst } from './hang';
import { lazy } from './lib/lazy';

describe('first/lazyFirst', () => {
  // test(`
  // Given: 1 and hang
  // When: first
  // Then: hang forever`, () => {
  //   const x = 1;
  //   const y = hang();
  //   const received = first(x, y);

  //   expect(received).toEqual(1);
  // });

  test(`
  Given: 1 and hang
  When: lazyFirst
  Then: 1`, () => {
    const x = lazy(1);
    const y = hang;
    const received = lazyFirst(x, y);

    expect(received()).toEqual(1);
  });
});
