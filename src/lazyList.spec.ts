import { describe, expect, test } from 'bun:test';

import { filter, printLazyList, range, sieve, take, toLazyList } from './lazyList';
import { lazy } from './lib/lazy';

describe('toLazyList', () => {
  test(`
  Given: xs = [1, 2, 3]
  When: toLazyList
  Then: LazyList<[1, 2, 3]>`, () => {
    const xs = [1, 2, 3];
    const received = toLazyList(xs)();

    expect(received?.head()).toEqual(1);
    expect(received?.tail()?.head()).toEqual(2);
    expect(received?.tail()?.tail()?.head()).toEqual(3);
  });
});

describe('printLazyList', () => {
  test(`
  Given: xs = LazyList<[1, 2, 3]>
  When: printLazyList
  Then: print 1, 2, 3`, () => {
    const xs = toLazyList([1, 2, 3]);
    printLazyList(xs);
  });
});

describe('range', () => {
  test(`
  Given: x = lazy(3)
  When: range(x) and tail 3 times
  Then: 3, 4, 5, 6`, () => {
    const x = lazy(3);
    const received = range(x)();

    expect(received?.head()).toEqual(3);
    expect(received?.tail()?.head()).toEqual(4);
    expect(received?.tail()?.tail()?.head()).toEqual(5);
    expect(received?.tail()?.tail()?.tail()?.head()).toEqual(6);
  });
});

describe('take', () => {
  test(`
  Given: n = lazy(5), xs = range(lazy(50))
  When: take and printLazyList
  Then: 50 - 54`, () => {
    const n = lazy(5);
    const xs = range(lazy(50));
    const received = take(n, xs);
    printLazyList(received);
  });
});

describe('filter', () => {
  test(`
  Given: n = lazy(5), xs = range(lazy(101))
  When: filter isEven take and printLazyList
  Then: 102 - 110`, () => {
    const n = lazy(5);
    const xs = filter(x => x % 2 === 0, range(lazy(101)));
    const received = take(n, xs);
    printLazyList(received);
  });
});

describe('sieve', () => {
  test(`
  Given: prime = sieve(range(lazy(2)))
  When: take 10 and printLazyList
  Then: 2 - 29`, () => {
    const prime = sieve(range(lazy(2)));
    const received = take(lazy(10), prime);
    printLazyList(received);
  });
});
