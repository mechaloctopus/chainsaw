import type { APIRoute } from 'astro';
import { site } from '../data/site';

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
const u = (p: string) => `${base}/${p.replace(/^\/+/, '')}`;

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: site.name,
        short_name: site.short,
        description: site.description,
        start_url: u('/'),
        scope: u('/'),
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#efe6d6',
        theme_color: '#efe6d6',
        lang: 'en',
        categories: ['education', 'utilities'],
        icons: [
          { src: u('/icon.svg'), sizes: 'any', type: 'image/svg+xml' },
          { src: u('/icon-192.png'), sizes: '192x192', type: 'image/png' },
          { src: u('/icon-512.png'), sizes: '512x512', type: 'image/png' },
          { src: u('/icon-maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Downed power lines', url: u('/modules/12-downed-power-lines/') },
          { name: 'Field card', url: u('/field-card/') },
          { name: 'Pre-start check', url: u('/modules/03-pre-start-inspection/') },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
