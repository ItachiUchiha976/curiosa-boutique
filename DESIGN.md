# DESIGN.md — Système de design Curiosa (curiosaboutique.fr)

> **À LIRE AVANT TOUTE ÉDITION DU SITE.** Ce fichier est la référence unique du design
> de la boutique Curiosa — Cabinet de Curiosités. Tout agent (Claude Code ou autre) qui
> modifie une page, un style ou un script DOIT respecter ce système. Extrait du code réel
> (`styles.css`, `bos-modern.css`, pages HTML, `bos-*.js`) le 17/07/2026 — rien n'est inventé.

---

## 1. Identité — « Cabinet de Curiosités »

Univers : cabinet de curiosités du XVIIIᵉ siècle — parchemin, encre, or, ornements célestes
(étoiles, lune, étoile filante). Chaque produit est raconté comme une **pièce de collection
avec une histoire** (mystère, Grandes Découvertes, Égypte ancienne), jamais comme un gadget.

- Fond clair « parchemin » pour le contenu, sections sombres « encre/sépia » pour le hero,
  la capture email et le footer.
- L'or (`--gold`) est LA couleur d'action : tout CTA, lien, accent est doré.
- Grille discrète dorée en filigrane dans le hero (`repeating-linear-gradient`), champ
  d'étoiles scintillantes et étoile filante — signature visuelle de la marque.

## 2. Palette exacte (tokens CSS — `styles.css` `:root`)

| Token | Hex / valeur | Rôle |
|---|---|---|
| `--ink` | `#0D0B07` | Noir encre — fond footer, texte sur boutons or |
| `--sepia` | `#1C1508` | Brun sombre — topbar, header, menu mobile, sections dark, toasts |
| `--gold` | `#C8960C` | **Or principal** — CTAs, liens, accents, bordure gauche des citations |
| `--gold-lt` | `#E8D094` | Or clair — hover des boutons, texte doré sur fond sombre |
| `--parch` | `#F5EDD5` | Parchemin — fond de page (body) |
| `--parch2` | `#EBE0C3` | Parchemin foncé — sections alternées, fonds d'images, encart description |
| `--parch3` | `#DDD0B0` | Parchemin atténué — texte secondaire sur fond sombre |
| `--copper` | `#7A3B0A` | Cuivre — tags produit (uppercase) |
| `--text` | `#2A1F0A` | Texte principal sur fond clair |
| `--text2` | `#5C4A2A` | Texte secondaire |
| `--text3` | `#8A7050` | Texte tertiaire / placeholders / breadcrumb |
| `--green` | `#1A4A2A` | Vert — icône note de livraison |
| `--border` | `rgba(200,150,12,0.25)` | Bordure standard (or à 25 %) |
| `--shadow` | `rgba(0,0,0,0.3)` | Ombre de référence |
| `--radius` | `8px` | Rayon standard (boutons, inputs) |
| `--r-lg` | `16px` | Rayon large (cartes, encarts) |

Valeurs hors tokens mais réelles dans le code :
- **Hero sombre** : `linear-gradient(160deg, #0D0B07 0%, #1C1508 55%, #2A1A05 100%)`.
- **Encarts capture sombres** : `linear-gradient(135deg, #1C1508 0%, #2A1F0A 100%)` (et inversé).
- **Reflet doré animé** du mot en italique du hero : dégradé `#E8D094 → #FBEFC4 → #C8960C → #FBEFC4 → #E8D094`.
- **Badge prix** (`.price-badge`) : fond `#FEF3C7`, texte `#92400E`.
- **Bandeau promo** injecté par `bos-promo.js` : dégradé indigo-violet `#6366f1 → #8b5cf6 → #a855f7`
  (volontairement hors palette pour trancher — ne pas le « thémer » sans raison).
- Pilules/badges arrondis : `border-radius: 999px`.

## 3. Typographies

Chargées via Google Fonts (`<link>` dans le `<head>` de chaque page) :

| Famille | Token | Graisses chargées | Rôle |
|---|---|---|---|
| **EB Garamond** | `--font-serif: 'EB Garamond', Georgia, 'Times New Roman', serif` | 400, 600, italic 400 | Titres : logo, `hero-title`, `section-title`, titres de cartes/produits, `blockquote`, h3 d'encarts |
| **Inter** | `--font-sans: 'Inter', 'Segoe UI', system-ui, sans-serif` | 400, 500, 600, 700 | Corps de texte, boutons, nav, formulaires (le `body` est en sans) |
| **Lora** | *(pas de token — chargée sur les fiches produit)* | 400, 600 | **Typo distinctive des descriptions produit** (`.product-detail__story`) — ajoutée le 17/07/2026 |

**Description produit (`.product-detail__story`) — règle du 17/07/2026** (définie en fin de
`bos-modern.css`, elle prime sur `styles.css`) :

```css
.product-detail__story{
  font-family:'Lora', var(--font-serif), Georgia, serif;
  font-style:normal;            /* JAMAIS d'italique long : illisible (retour Fred 16/07) */
  font-weight:400;
  font-size:1.05rem;
  line-height:1.75;
  color:var(--text);
  background:var(--parch2);     /* encart parchemin */
  border-left:4px solid var(--gold);
  border-radius:12px;
  padding:1.25rem 1.5rem;
  margin-bottom:1.25rem;
}
.product-detail__story strong{ font-weight:600; }
```

Historique à connaître : Garamond italique (illisible) → Inter droit (16/07) → **Lora droite
dans un encart parchemin bordé d'or (17/07 = état actuel)**. Ne pas revenir en arrière.

**Échelle typographique (réelle)** :
- `hero-title` : `clamp(2.2rem, 5vw, 3.5rem)`, serif 600, line-height 1.15 ; le mot clé en `<em>` doré italique.
- `section-title` : `clamp(1.75rem, 4vw, 2.75rem)`, serif 600.
- `product-detail__title` : `clamp(1.6rem, 3.5vw, 2.4rem)`, serif 600.
- `section-label` / tags : `.72–.78rem`, **uppercase**, `letter-spacing .08–.12em`, bold, or ou cuivre.
- Corps : `1rem` base (html 16px), line-height 1.7 ; sous-titres `1.05rem` ; cartes `.88–.95rem`.
- Prix : `.price-main` 1.3rem bold (2rem sur fiche produit) ; `.price-rec` (« Prix conseillé ») `.85rem` `--text3`.

## 4. Échelles d'espacement & layout

- **Container** : `max-width: 1140px`, padding latéral `1.25rem`. Mobile-first.
- **Sections** : `padding: 4.5rem 0` (`.section`) ; capture email `4rem 0` ; hero `padding: 5rem 0 4rem`, `min-height: 75vh`.
- **Grilles** : produits `repeat(auto-fill, minmax(260px,1fr))` gap `1.5rem` ; bundles `minmax(280px,1fr)` ;
  grilles 2 colonnes (hero, fiche produit, story) gap `3rem`, breakpoint unique `@media(min-width:768px)`.
- **Rythme interne** : marges en `.5 / .75 / 1 / 1.25 / 1.5 / 2 / 3rem` (utilitaires `.mt-1/2/3`, `.mb-1/2`).
- **Header** : hauteur `64px`, sticky, fond `rgba(12,9,3,.97)` + `backdrop-filter: blur(8px)`.
- **Touch targets** : min `44px` (inputs email et boutons de formulaires ont `min-height:44px`).
- **Ratios images** : cartes `4/3`, hero visuel `1/1` (`object-fit: contain` hero, `cover` ailleurs).

## 5. Composants récurrents

- **Boutons** — `.btn-primary` (fond or, texte `--ink`, bordure 2px or, radius 8px, hover `--gold-lt`
  + élévation `translateY(-2px)` + balayage lumineux `::after` défini dans `bos-modern.css`) ·
  `.btn-outline` (transparent, bordure parchemin 30 %, hover or) · `.btn-card` / `.btn-addcart` /
  `.btn-checkout` (or plein, pleine largeur) · `.btn-secondary-full` (bordure, hover or).
- **Cartes produit** — `.product-card` : fond blanc, `--r-lg`, bordure `--border`, image `4/3` avec
  zoom `scale(1.05)` au hover ; couche moderne : levée `-8px` + double ombre + voile sombre bas d'image.
- **Badges** — `.hero-badge` (pilule uppercase or translucide), `.product-detail__badge-img`
  (pilule or sur l'image), `.price-badge` (ambre), `.cart-count` (rond or sur l'icône panier).
- **Barre promo −10 % permanente** — injectée par `bos-promo.js` en haut de page (sticky, dégradé
  indigo-violet). **Source de vérité unique du calcul : `window.BOS_PROMO.discount(cart)`**
  (−10 % sur l'article le plus cher, arrondi au centime, utilisée par le panier ET le checkout
  PayPal/Stripe → affiché = facturé). Aucun compte à rebours, aucun code promo : la remise est
  permanente et automatique. Ne s'affiche que sur les pages avec panier.
- **Pastille rétractation** — `bos-retractation.js` crée `#bos-retract-link` (fixe en bas).
  Règle de cohabitation : `body.bos-atc-open #bos-retract-link{ bottom: 88px; }` pour ne pas
  chevaucher la barre d'achat sticky mobile.
- **Barre d'achat sticky mobile** — `.bos-sticky-atc`, construite par `bos-reveal.js` à partir du
  1er bouton `[data-add-cart]` de la page (proxy du vrai bouton = zéro duplication de logique).
  Mobile uniquement, apparaît quand le CTA principal sort de l'écran, fond `rgba(12,9,3,.96)`.
- **Header auto-masquant** — `.bos-nav-hidden` (translateY −110 %) : se range en descendant,
  revient en remontant, jamais quand le menu mobile est ouvert.
- **Menu mobile** — tiroir droit fixe `min(300px, 90vw)`, fond `--sepia`, `overflow-y:auto`,
  overlay `rgba(0,0,0,.5)`, z-index 500 (> header 100). Même `nav-list`/`mobile-menu` sur toutes les pages.
- **Encarts capture email** — boîtes dégradé sombre + input translucide `rgba(255,255,255,.08)`,
  focus bordure or, consentement RGPD (`.capture-consent`) sur sa propre ligne.
- **Divers** — trust-bar (sépia, icônes or), FAQ accordéon, order bump panier, toast (bas droite,
  sépia), cartes avis (`.review-card`, blanches, étoiles or), breadcrumb, notes de livraison honnêtes.

## 6. Principes d'animation

Tout est CSS keyframes + IntersectionObserver — **aucune lib JS d'animation**.

- **Reveal au scroll** (`bos-reveal.js` + `[data-reveal]` dans `bos-modern.css`) : fade-up 26px,
  `.7s`, cascade `.08/.16/.24s` dans les grilles. Triple filet anti-contenu-invisible :
  (1) passe synchrone au chargement (rien de visible n'est masqué → zéro flash),
  (2) filet au scroll (tout élément dépassé est révélé),
  (3) **backstop dur à 5 s** : tout `[data-reveal]` encore masqué devient visible coûte que coûte.
  En cas d'erreur JS, le `catch` révèle tout. **Ne jamais supprimer ces filets.**
- **Hero vivant** : halo doré pulsant (`bosGlow` 6s), flottement du visuel (`bosFloat` 7s),
  étoiles scintillantes (`bosTwinkle` 5s), reflet doré sur le `<em>` du titre (`bosShine` 6.5s),
  étoile filante (7.5s), inclinaison 3D au survol souris (desktop `hover:hover + pointer:fine` uniquement).
- **Animations SVG produit** (`.bos-anim-produit`, `styles.css`) : vignette animée thématique en
  haut à droite de la galerie de chaque fiche — lune qui tourne, avion sur la carte, plume qui
  écrit, sable qui coule, engrenage, pièce de puzzle, limaille magnétique, étincelles, flamme,
  carte de tarot qui se retourne. SVG inline + keyframes uniquement, `pointer-events:none`.
- **Micro-interactions** : hover cartes (levée + ombre), zoom image `.4s`, boutons `.2s`,
  transitions `.2–.32s` avec `cubic-bezier(.2,.7,.2,1)`.
- **`prefers-reduced-motion: reduce` = OBLIGATOIRE** : toutes les animations sont coupées et
  `[data-reveal]` forcé visible (déjà géré dans `bos-modern.css` et `styles.css` — toute nouvelle
  animation DOIT être ajoutée à ces blocs).

## 7. Ton de voix (FR)

- **Français impeccable, accents corrects partout** (y compris majuscules accentuées : É, À).
- **Vouvoiement** client, chaleureux et érudit — le conservateur d'un cabinet de curiosités qui
  raconte ses pièces : « Cette mappemonde style XVIIIᵉ évoque l'ère des Grandes Découvertes… ».
- **Storytelling d'abord, specs ensuite** : chaque produit a une histoire (mystère, Histoire,
  magie) puis les bullets pratiques (« ✨ Pourquoi vous allez l'adorer »).
- **Honnêteté totale** : livraison affichée « estimée 12 à 20 jours ouvrés » (expédition Chine),
  « Prix conseillé » au lieu de prix barré, remise réelle et permanente, droit de rétractation 14 j visible.
- Vocabulaire maison : « le Cabinet », « pièce », « collection », « curiosité ».
- Fred = masculin dans toute réponse/signature (« ravi », jamais « ravie »).

## 8. INTERDITS (non négociables)

1. ⛔ **JAMAIS de compte à rebours, de fausse urgence ni de faux stock limité** — pratique
   commerciale trompeuse (DGCCRF, art. L121-2 Code de la consommation). Le bandeau promo est
   honnête par conception (`bos-promo.js`) : ne pas y réintroduire de chrono ni de code promo.
2. ⛔ **JAMAIS de prix barré** non documenté : `.price-cross` existe dans le CSS mais n'est
   utilisée par AUCUNE page (remplacée par `.price-rec` « Prix conseillé »). Ne pas la réutiliser.
3. ⛔ **JAMAIS de lien `github.io` brut en public** — toujours `curiosaboutique.fr` (règle §12.28
   du système BOS). Idem dans les balises canonical/og:url/sitemap.
4. ⛔ **Contraste AA minimum** (WCAG 2.1) pour tout texte — la palette actuelle le respecte
   (`--text` sur `--parch`, `--parch` sur `--sepia`, `--ink` sur `--gold`) ; ne pas créer de
   combinaisons faibles (ex. `--gold-lt` sur `--parch`).
5. ⛔ **Ne JAMAIS casser la chaîne de paiement** : ne pas toucher à `bos-stripe.js`,
   `bos-paypal.js`, `bos-paypal-cart.js` ni aux attributs `data-bos-key="…"` des boutons produit
   (clés mappées côté serveur VPS : `lampe-lune-3d`, `carte-du-monde-vintage`, `journal-infini`,
   `sablier-magnetique`, `boite-mystere-puzzle`, `anubis-statue`, `magnetic-hourglass`, …) ;
   idem `[data-add-cart]`/`data-price`/`data-name` (panier + barre sticky) et
   `window.BOS_PROMO.discount()` (affiché = facturé, au centime près).
6. ⛔ **Jamais d'italique long** dans les descriptions produit (retour Fred 16/07) et jamais de
   texte non français dans les visuels/pages.
7. ⛔ **Ne pas supprimer** : le backstop 5 s du reveal, le fail-safe `catch`, les blocs
   `prefers-reduced-motion`, la ligne `body.bos-atc-open #bos-retract-link` (anti-chevauchement).
8. ⛔ Pas de nouvelle dépendance externe (lib CSS/JS, CDN) : le site est 100 % statique,
   vanilla, GitHub Pages. Les seules ressources externes autorisées sont Google Fonts déjà en place.

## 9. Ordre de chargement des scripts (référence)

Sur `index.html` : `bos-promo.js` → `bos-retractation.js` → `app.js` (panier/menu/FAQ/toast) →
`bos-consent.js` → `bos-trust.js` → `bos-reveal.js`. Les fiches produit ajoutent
`bos-stripe.js`, `bos-paypal.js`/`bos-paypal-cart.js`, `bos-sticky-cta.js`, `bos-reviews.js`.
`bos-modern.css` est une **couche additive** chargée après `styles.css` : les enrichissements
visuels y vont ; les fondations (tokens, layout) restent dans `styles.css`.

---
*Créé le 17/07/2026 à partir du code réel du repo (recommandation de l'analyse
`Analyse_jmjgljCC-O4_design.md`). À maintenir : toute évolution du design DOIT être
répercutée ici dans le même commit.*
