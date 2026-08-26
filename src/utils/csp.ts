export async function sha256CspHash(source: string): Promise<`sha256-${string}`> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(source));
  const binary = String.fromCharCode(...new Uint8Array(digest));
  return `sha256-${btoa(binary)}`;
}
