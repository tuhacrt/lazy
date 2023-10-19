import { describe, expect, test } from 'bun:test';

import type { Lazy } from './lib/lazy';
import { lazy } from './lib/lazy';
import { and, or } from './shortCircuit';

/** display if the lazy value is triggered */
export function trace<T>(x: Lazy<T>, _str: string): Lazy<T> {
  return () => {
    // console.log(`${str} === ${x()}`);
    return x();
  };
}

describe('and', () => {
  test(`Given: false && false === false`, () => {
    const x = false;
    const y = false;
    const expected = false;
    const received = and(trace(lazy(x), 'L'), trace(lazy(y), 'R'));

    expect(received()).toEqual(expected);
  });

  test(`Given: true && false === false`, () => {
    const x = true;
    const y = false;
    const expected = false;
    const received = and(trace(lazy(x), 'L'), trace(lazy(y), 'R'));

    expect(received()).toEqual(expected);
  });

  test(`Given: false && true === false`, () => {
    const x = false;
    const y = true;
    const expected = false;
    const received = and(trace(lazy(x), 'L'), trace(lazy(y), 'R'));

    expect(received()).toEqual(expected);
  });

  test(`Given: true && true === true`, () => {
    const x = true;
    const y = true;
    const expected = true;
    const received = and(trace(lazy(x), 'L'), trace(lazy(y), 'R'));

    expect(received()).toEqual(expected);
  });
});

describe('or', () => {
  test(`Given: false || false === false`, () => {
    const x = false;
    const y = false;
    const expected = false;
    const received = or(trace(lazy(x), 'L'), trace(lazy(y), 'R'));

    expect(received()).toEqual(expected);
  });

  test(`Given: true || false === true`, () => {
    const x = true;
    const y = false;
    const expected = true;
    const received = or(trace(lazy(x), 'L'), trace(lazy(y), 'R'));

    expect(received()).toEqual(expected);
  });

  test(`Given: false || true === true`, () => {
    const x = false;
    const y = true;
    const expected = true;
    const received = or(trace(lazy(x), 'L'), trace(lazy(y), 'R'));

    expect(received()).toEqual(expected);
  });

  test(`Given: true || true === true`, () => {
    const x = true;
    const y = true;
    const expected = true;
    const received = or(trace(lazy(x), 'L'), trace(lazy(y), 'R'));

    expect(received()).toEqual(expected);
  });
});
