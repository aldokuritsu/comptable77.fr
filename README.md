# comptable77.fr — version Astro

Reconstruction du site [comptable77.fr](https://comptable77.fr/) (à l'origine
WordPress + Elementor) en site statique [Astro](https://astro.build/).

Les URLs, les contenus, les images et le rendu visuel du site d'origine sont
conservés à l'identique.

## Démarrage

```bash
npm install
npm run dev      # serveur de développement sur http://localhost:4321
npm run build    # génère le site statique dans dist/
npm run preview  # prévisualise le build
```

## Structure

```
public/
  wp-content/uploads/     images et logos, aux chemins d'origine
  robots.txt
src/
  components/             en-tête, pied de page, icônes, encart auteur, formulaire
  data/
    pages.json            contenu et métadonnées des 33 pages
    home.json             contenu de la page d'accueil
    nav.json              menu principal
  layouts/
    BaseLayout.astro      <head>, métadonnées SEO, favicons
    PageLayout.astro      gabarit des pages intérieures
  pages/
    index.astro           page d'accueil (gabarit spécifique)
    [...slug].astro       toutes les autres pages, générées depuis pages.json
    sitemap_index.xml.ts  /sitemap_index.xml
    page-sitemap.xml.ts   /page-sitemap.xml
  styles/global.css       feuille de style globale
```

## URLs conservées

Les 32 URLs du `page-sitemap.xml` d'origine sont reprises telles quelles, plus
`/a-propos-de-ce-site/` (page publiée mais absente du sitemap). Astro est
configuré avec `trailingSlash: 'always'` et `build.format: 'directory'` afin de
produire exactement les mêmes chemins.

Les images conservent également leurs URLs d'origine
(`/wp-content/uploads/AAAA/MM/...`).

## Design

Les couleurs, typographies et espacements reprennent le kit Elementor du site
d'origine :

| Rôle | Valeur |
| --- | --- |
| Primaire (barre de contact) | `#5EB2FC` |
| Secondaire (fonds sombres) | `#36434D` |
| Accent (boutons, liens) | `#F96900` |
| Accent secondaire (soulignement du menu) | `#F17F29` |
| Texte courant | `#7A7A7A` |
| Titres | `#16163F` |

Comme sur le site d'origine, les familles Roboto / Montserrat / Merriweather
sont déclarées mais les webfonts ne sont pas chargées : le rendu utilise les
polices système, à l'identique. Pour charger les vraies polices, décommenter le
lien Google Fonts dans `src/layouts/BaseLayout.astro`.

## Ligne éditoriale

Le positionnement du site et les règles de rédaction sont décrits dans
[`LIGNE-EDITORIALE.md`](LIGNE-EDITORIALE.md). À lire avant toute modification de
contenu. Règle principale : **le site est une publication d'information
indépendante, jamais un cabinet d'expertise comptable.** Le balisage
`schema.org` reflète ce positionnement (`WebSite`, `Article`,
`BreadcrumbList` — jamais `AccountingService` ni `LocalBusiness`).

## Mesure d'audience

Le site n'utilise aucun cookie. La mesure d'audience passe par
[Umami](https://umami.is/), sans cookie ni identifiant publicitaire, et n'est
active que si `PUBLIC_UMAMI_SRC` et `PUBLIC_UMAMI_WEBSITE_ID` sont définies
(voir `.env.example`). Sans elles, aucune balise n'est rendue.

## Vérification des données

Les données chiffrées publiées sont tracées dans [`SOURCES.md`](SOURCES.md) :
valeur retenue, source primaire, version ou date de consultation. À revérifier
au moins une fois par an, et après chaque loi de finances.

## Reste à faire

- **Mentions légales.** Le site n'a pas de page de mentions légales. La LCEN
  impose d'identifier l'éditeur réel : la signature « Antoine C. » est un nom de
  plume et ne s'y substitue pas. Il manque l'identité de l'éditeur et le nom de
  l'hébergeur.
- **Ancrage local.** Trois rubriques sur six ont leur section locale vérifiée
  (création d'entreprise, fiscalité, expertise comptable). Restent Social et RH,
  Patrimoine, et Reprise d'entreprise, ainsi que les articles.

## Différences assumées avec le site d'origine

- **Formulaire de contact** : le formulaire Elementor Pro nécessitait un
  back-end PHP. Le balisage et le style sont identiques, mais il faut brancher
  l'action du `<form>` sur un service d'envoi (Formspree, Netlify Forms, une
  fonction serverless…).
- **Vignettes des dernières publications** : le site d'origine laisse un grand
  espace vide sous chaque vignette (conteneur au ratio 0,66 en plus de la
  hauteur naturelle de l'image). Cet artefact n'est pas reproduit.
- **Lien « Politique de confidentialité »** du pied de page d'accueil : il
  pointait vers l'accueil sur le site d'origine, il pointe désormais vers
  `/privacy-policy/`.
- **Contenu réécrit** : les mentions de mise en vente du site ont été
  supprimées, et les passages présentant le site comme un cabinet d'expertise
  comptable ont été réécrits (voir la charte éditoriale). Les balises `title`,
  `meta description` et `h1` ont été refaites, et un maillage interne
  systématique a été ajouté.
- **Avatar de l'auteur** : toujours servi par Gravatar, comme sur le site
  d'origine.
- Les animations d'apparition et effets de parallaxe d'Elementor ne sont pas
  reproduits.
