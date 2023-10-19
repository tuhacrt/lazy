import { type Lazy, lazy } from './lib/lazy';

export type LazyList<T> = Lazy<{ head: Lazy<T>; tail: LazyList<T> } | null>;

export function toLazyList<T>(xs: Array<T>): LazyList<T> {
  return xs.length === 0 ? lazy(null) : lazy({ head: lazy(xs[0]), tail: toLazyList(xs.slice(1)) });
}

export function rangeOverflow(begin: Lazy<number>): LazyList<number> {
  return lazy({ head: begin, tail: range(lazy(begin() + 1)) });
}

export function range(begin: Lazy<number>): LazyList<number> {
  return () => ({ head: begin, tail: range(lazy(begin() + 1)) });
}

export function printLazyList<T>(xs: LazyList<T>) {
  let pair = xs();
  while (pair !== null) {
    // eslint-disable-next-line no-console
    console.log(pair.head());
    pair = pair.tail();
  }
}

export function take<T>(n: Lazy<number>, xs: LazyList<T>): LazyList<T> {
  return () => {
    const m = n();
    const pair = xs();

    if (m === 0 || pair === null) return null;
    return { head: pair.head, tail: take(lazy(m - 1), pair.tail) };
  };
}

export function filter<T>(f: (x: T) => boolean, xs: LazyList<T>): LazyList<T> {
  return () => {
    const pair = xs();

    if (!pair) return null;

    const x = pair.head();

    if (f(x)) return { head: pair.head, tail: filter(f, pair.tail) };
    return filter(f, pair.tail)();
  };
}

export function sieve(xs: LazyList<number>): LazyList<number> {
  return () => {
    const pair = xs();

    if (!pair) return null;
    return { head: pair.head, tail: sieve(filter(x => x % pair.head() !== 0, pair.tail)) };
  };
}

export const prime = sieve(range(lazy(2)));
