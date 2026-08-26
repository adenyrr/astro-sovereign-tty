import type { NavigationItem } from '../types';

export function normalizePath(path = '/'): string {
  const pathname = path.split(/[?#]/u, 1)[0].replace(/\\/gu, '/');
  const rooted = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const compact = rooted.replace(/\/{2,}/gu, '/').replace(/\/+$/u, '');
  return compact || '/';
}

export function stripBasePath(currentPath: string, basePath?: string): string {
  const current = normalizePath(currentPath);
  const base = normalizePath(basePath);
  if (!basePath || base === '/') return current;
  if (current === base) return '/';
  return current.startsWith(`${base}/`) ? current.slice(base.length) || '/' : current;
}

export function isNavigationItemActive(
  item: NavigationItem,
  currentPath: string,
  basePath?: string,
): boolean {
  if (typeof item.active === 'boolean') return item.active;
  if (item.external || !item.route) return false;
  const current = stripBasePath(currentPath, basePath);
  const route = normalizePath(item.route);
  return current === route || (route !== '/' && current.startsWith(`${route}/`));
}
