import type { Lazy } from './lib/lazy';

export function hang<T>(): T {
  return hang();
}

export function first<T>(a: T, _b: T): T {
  return a;
}

export function lazyFirst<T>(a: Lazy<T>, _b: Lazy<T>): Lazy<T> {
  return a;
}
