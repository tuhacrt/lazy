import { type Lazy, lazy } from './lib/lazy';

export function sum(a: number, b: number): number {
  return a + b;
}

export function lazySum(a: Lazy<number>, b: Lazy<number>): Lazy<number> {
  return lazy(a() + b());
}
