export function isDefined<T>(arg: T | null | undefined): arg is T {
  return arg !== null && arg !== undefined;
}

export function isUndefined<T>(arg: T | null | undefined): arg is T {
  return arg === null || arg === undefined;
}