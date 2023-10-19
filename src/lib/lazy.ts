export type Lazy<T> = () => T;

export function lazy<T>(value: T): Lazy<T> {
  return () => value;
}
