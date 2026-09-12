import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      '# The safety content is meant to be copied, translated and forked.',
      '# Content is CC BY 4.0 — attribution is all that is asked.',
      '',
      `Sitemap: ${new URL('sitemap-index.xml', site ?? 'https://kauaisawschool.org').href}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
