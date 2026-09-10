import type { APIRoute } from 'astro';
import pages from '../data/pages.json';

const SITE = 'https://comptable77.fr';

export const GET: APIRoute = () => {
  const urls = pages
    .map(
      (page) => `\t<url>
\t\t<loc>${SITE}${page.url}</loc>${page.modified ? `\n\t\t<lastmod>${page.modified}</lastmod>` : ''}
\t</url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
