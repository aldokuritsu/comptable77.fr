import pages from '../data/pages.json';
import nav from '../data/nav.json';

export type Page = (typeof pages)[number];

export const SITE_URL = 'https://comptable77.fr';
export const SITE_NAME = 'comptable77.fr';
export const AUTHOR_NAME = 'Antoine C.';

/** URLs des six pages rubriques, dans l'ordre du menu principal. */
export const RUBRIQUES = nav.map((item) => item.href);

export const byUrl = new Map(pages.map((page) => [page.url, page]));

/** Rubrique à laquelle appartient une page, ou null pour l'accueil et les pages isolées. */
export function rubriqueOf(url: string): string | null {
  return RUBRIQUES.find((r) => url.startsWith(r) && url !== r) ?? null;
}

export function isRubrique(url: string): boolean {
  return RUBRIQUES.includes(url);
}

/** Articles d'une rubrique. */
export function childrenOf(rubrique: string): Page[] {
  return pages.filter((page) => page.url.startsWith(rubrique) && page.url !== rubrique);
}

/** Vrai si le contenu de la page pointe déjà vers cette URL. */
function linksTo(page: Page, url: string): boolean {
  return page.content.includes(`href="${url}"`);
}

/**
 * Articles de la rubrique qui ne sont liés nulle part dans son contenu.
 * Évite de dupliquer les listes déjà rédigées dans le corps de la page.
 */
export function unlinkedChildren(rubrique: string): Page[] {
  const page = byUrl.get(rubrique);
  if (!page) return [];
  return childrenOf(rubrique).filter((child) => !linksTo(page, child.url));
}

/** Deux articles voisins à proposer en fin d'article. */
export function siblingsOf(url: string, limit = 2): Page[] {
  const rubrique = rubriqueOf(url);
  if (!rubrique) return [];
  const page = byUrl.get(url);
  return childrenOf(rubrique)
    .filter((sibling) => sibling.url !== url && !(page && linksTo(page, sibling.url)))
    .slice(0, limit);
}

export function labelOf(url: string): string {
  return nav.find((item) => item.href === url)?.label ?? byUrl.get(url)?.h1 ?? url;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
