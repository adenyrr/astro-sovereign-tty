const SCHEME = /^([a-z][a-z\d+.-]*):/iu;

function hasControlCharacter(value: string): boolean {
  return Array.from(value).some((character) => {
    const code = character.codePointAt(0) ?? 0;
    return code <= 31 || (code >= 127 && code <= 159);
  });
}

/**
 * Validates a configuration-provided URL before it is inserted into the DOM.
 * Relative URLs and explicit web protocols are accepted; ambiguous,
 * executable, and protocol-relative URLs are rejected.
 */
export function safeHref(value: unknown, fallback = '#'): string {
  if (typeof value !== 'string') return fallback;
  const href = value.trim();
  if (!href || hasControlCharacter(href)) return fallback;
  if (href.includes('\\') || href.startsWith('//')) return fallback;

  const match = href.match(SCHEME);
  if (match && !['http', 'https', 'mailto', 'tel'].includes(match[1].toLowerCase())) {
    return fallback;
  }
  return href;
}
