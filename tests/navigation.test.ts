import { describe, expect, it } from 'vitest';
import { isNavigationItemActive, normalizePath, stripBasePath } from '../src/utils/navigation';

describe('navigation helpers', () => {
  it('normalizes slashes, query strings and trailing slashes', () => {
    expect(normalizePath('blog//post/?draft=1')).toBe('/blog/post');
  });

  it('strips a normalized base path only on a segment boundary', () => {
    expect(stripBasePath('/portfolio/blog/post', '/portfolio/')).toBe('/blog/post');
    expect(stripBasePath('/portfolio', 'portfolio')).toBe('/');
    expect(stripBasePath('/portfolio-old/blog', '/portfolio')).toBe('/portfolio-old/blog');
  });

  it('matches routes on complete path segments', () => {
    expect(isNavigationItemActive({ label: 'Blog', route: '/blog' }, '/blog/post')).toBe(true);
    expect(isNavigationItemActive({ label: 'Blog', route: '/blog' }, '/blogging')).toBe(false);
    expect(
      isNavigationItemActive({ label: 'Blog', route: '/blog' }, '/site/blog/post', '/site'),
    ).toBe(true);
  });

  it('honours explicit and external states', () => {
    expect(isNavigationItemActive({ label: 'Elsewhere', route: '/', active: true }, '/x')).toBe(
      true,
    );
    expect(
      isNavigationItemActive({ label: 'Elsewhere', route: '/blog', external: true }, '/blog'),
    ).toBe(false);
  });
});
