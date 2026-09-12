const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Root-absolute site URL, base-path aware. */
export function u(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${BASE}/${path.replace(/^\/+/, '')}`;
}

export function isCurrent(current: string, href: string): boolean {
  const a = current.replace(/\/+$/, '');
  const b = u(href).replace(/\/+$/, '');
  return a === b;
}
