import { describe, expect, it } from 'vitest';
import { safeHref } from '../src/utils/safe-href';

describe('safeHref', () => {
  it.each([
    '/',
    '/blog/post',
    './post',
    '../post',
    'post',
    '#main',
    '?page=2',
    'https://example.com/path',
    'http://example.com',
    'mailto:hello@example.com',
    'tel:+3212345678',
  ])('accepts %s', (href) => expect(safeHref(href)).toBe(href));

  it.each([
    '',
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,boom',
    'vbscript:msgbox(1)',
    '//evil.example/path',
    '\\\\evil.example',
    '/\\evil.example',
    'https:\\evil.example',
    'java\u0000script:alert(1)',
    'https://example.com/\u007fpath',
  ])('rejects %j', (href) => expect(safeHref(href, '/')).toBe('/'));

  it('rejects non-string values', () => {
    expect(safeHref(undefined, '/')).toBe('/');
    expect(safeHref(42, '/')).toBe('/');
  });
});
