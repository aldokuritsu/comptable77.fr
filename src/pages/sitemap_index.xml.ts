import type { APIRoute } from 'astro';
import pages from '../data/pages.json';

const SITE = 'https://comptable77.fr';

export const GET: APIRoute = () => {
  const lastmod = pages
    .map((page) => page.modified)
    .filter(Boolean)
    .sort()
    .pop();

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<sitemap>
\t\t<loc>${SITE}/page-sitemap.xml</loc>${lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : ''}
\t</sitemap>
</sitemapindex>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
