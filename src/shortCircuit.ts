import { type Lazy, lazy } from './lib/lazy';

export function and(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return lazy(!a() ? false : b());
}

export function or(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
  return lazy(a() ? true : b());
}
