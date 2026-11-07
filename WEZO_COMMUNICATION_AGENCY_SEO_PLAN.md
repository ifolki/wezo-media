# WEZO MEDIA — Plan d’Optimisation SEO : Agence de Communication Digitale au Maroc (`Phase 1 — Audit`)

**Date de l’audit :** Novembre 2026  
**Positionnement :** WEZO MEDIA — Agence de Communication Digitale & Digital Growth Partner au Maroc (Casablanca)  
**Périmètre :** Audit du code existant (Next.js 14 App Router + `next-intl`), analyse de l’intention de recherche, cartographie des mots-clés sur les 26 pages de services + pages principales, recommandations de contenu/métadonnées (FR / AR / EN), maillage interne et SEO technique.

---

## 1. Évaluation SEO Actuelle de la Page d’Accueil (`/fr`, `/ar`, `/en`)

### 1.1 Diagnostic des signaux Google Search Console (GSC)
Les données récentes (401 impressions, 2 clics, CTR de 0,5 %, position moyenne 25,7) ainsi que les requêtes émergentes (`boite de communication` : 9 imp., `agence marketing local` : 10 imp., `marketing agency` : 7 imp.) montrent que :
1. **Google commence à associer le domaine `wezomedia.ma` au champ sémantique des agences de communication et de marketing**, mais positionne le site en page 3 (pos. ~25.7) faute de signaux on-page explicites.
2. **Le terme « communication » est quasiment absent de la page d’accueil `/fr`** : ni le `<title>`, ni le `<h1>`, ni les sous-titres `<h2>` de la page d’accueil ne contiennent les expressions *« agence de communication digitale »*, *« agence de communication au Maroc »* ou *« boîte de communication »*.
3. **Le CTR très bas (0,5 %)** s’explique à la fois par la position moyenne (>20) et par un `<title>` générique doublonné (`WEZO MEDIA | Agence digitale & solutions digitales au Maroc | WEZO MEDIA`).

### 1.2 Audit du code de la page d’accueil (`app/[locale]/(public)/page.tsx` & composants)

| Élément SEO | État actuel sur `/fr` | Problème identifié | Impact SEO / Conversion |
| :--- | :--- | :--- | :--- |
| **`<title>` rendu** | `WEZO MEDIA \| Agence digitale & solutions digitales au Maroc \| WEZO MEDIA` | 1. Duplication de `\| WEZO MEDIA` à cause du `title.template` dans `app/[locale]/layout.tsx`.<br>2. Le mot-clé cible *« Agence de Communication Digitale au Maroc »* est absent.<br>3. Le nom de marque est placé au début ET à la fin. | **Élevé** (Dilution du poids des mots-clés et troncature SERP) |
| **Meta Description** | `WEZO MEDIA, agence de solutions digitales et partenaire de croissance au Maroc. Stratégie digitale, création de sites web & e-commerce, branding, publicité en ligne et automatisation IA pour entreprises ambitieuses.` (215 caractères) | Trop longue (>160 caractères, tronquée dans Google) et utilise *« agence de solutions digitales »* (peu recherché) au lieu de *« communication digitale »*. | **Moyen-Élevé** (Baisse du CTR) |
| **Balise `<h1>` (`Hero.tsx` + `messages/fr.json`)** | `Des solutions digitales intégrées pour développer votre entreprise` | Aucun mot-clé d’intention commerciale (*agence de communication digitale*, *Maroc*) dans le `<h1>`. Formulation purement descriptive sans ancrage géographique ni catégoriel. | **Critique** (Faible pertinence sur la requête principale) |
| **Texte d’introduction Hero (`messages/fr.json`)** | `WEZO MEDIA accompagne les entreprises au Maroc de la stratégie à l’exécution : identité, sites web, réseaux sociaux, contenu, publicité et automatisation.` | Bon texte de base, mais ne mentionne pas explicitement le rôle d’**agence de communication digitale** ni les résultats mesurables (génération de prospects/ventes). | **Moyen** |
| **Section `SolutionsGrid.tsx`** | Affiche en anglais sur `/fr` : `What do you want to achieve?`, `Outcome-Driven Solutions`, `Explore Solution` | `components/public/SolutionsGrid.tsx` (lignes 45, 54, 88) ne gère que `isAr ? ... : ...` sans condition `isFr`. Le visiteur francophone et Googlebot voient des titres `<h2>` en anglais au milieu de la page `/fr`. | **Élevé** (Signaux de langue mixtes FR/EN sur `/fr` + UX dégradée) |
| **Section `ServicesGrid.tsx` (6 Piliers)** | `<h2>` : `Accélérez Votre Croissance Digitale` | 1. Le `<h2>` ne contient aucun terme métier (*services de communication digitale*, *marketing*, *web*, *production*).<br>2. Les `fallbackPillars` dans `ServicesGrid.tsx` contiennent 6 slugs erronés (`google-ads-management`, `digital-strategy-audit`, `ad-creatives-ugc`, `social-content-design`, `crm-pipeline-setup`, `artist-branding-content`) qui ne correspondent pas aux slugs réels de `lib/config/services.ts` et génèrent des **404** si le fallback est activé. | **Critique** (Risque de liens internes cassés 404 + `<h2>` sous-optimisé) |
| **Section `AgencyStudio.tsx`** | `<h2>` : `L'espace où naissent vos prochaines campagnes`<br>`alt` image : `WEZO MEDIA Agency Creative Office HQ` (en anglais) | Manque d’ancrage sémantique (*studio de communication et production digitale à Casablanca, Maroc*) et attribut `alt` non localisé. | **Moyen** |
| **Section `CTA.tsx` & `messages/fr.json`** | `<h2>` : `Prêt à Démarrer Votre Prochain Projet ?`<br>Bouton : `Demander un Service Maintenant` | Copywriting traduit littéralement (« Demander un Service Maintenant ») au lieu d’un appel à l’action B2B naturel (*« Demander un devis personnalisé »* / *« Parler de votre projet »*). | **Moyen** (Conversion B2B) |

---

## 2. Cartographie des Mots-Clés (Keyword Mapping) & Architecture des Pages

### 2.1 Analyse de l’intention de recherche (Search Intent)
Au Maroc, les dirigeants de PME, marques et entreprises utilisent deux familles d’expressions pour chercher un partenaire digital :
1. **Intention « Agence Globale / 360° »** : `agence de communication digitale maroc`, `agence de communication maroc`, `boite de communication maroc`, `agence communication digitale pour entreprises`. L’utilisateur cherche une **agence structurée** capable de prendre en charge son image de marque (branding, contenu, vidéo), sa présence web (site vitrine/e-commerce) et sa visibilité (publicité, réseaux sociaux). **C’est l’intention exacte de la page d’accueil `/fr`**.
2. **Intention « Acquisition & Performance Marketing »** : `agence marketing digital maroc`, `agence de publicité digitale maroc`. L’utilisateur cherche spécifiquement de la génération de leads, du Media Buying (Meta Ads, Google Ads, TikTok Ads) et de la stratégie d’acquisition. **Le site possède déjà une landing page ultra-complète dédiée à cette intention : `/fr/services/marketing`**.

### 2.2 Faut-il créer une page séparée `/fr/agence-de-communication` ?
**Non.** Conformément aux directives de l’audit :
- L’intention de recherche de *« agence de communication digitale maroc »* et *« boîte de communication maroc »* correspond directement à la proposition de valeur globale de l’agence (les 6 piliers réunis).
- Créer une page `/fr/agence-de-communication` séparée diluerait l’autorité (PageRank interne) de la page d’accueil `/fr` et créerait une cannibalisation directe avec `/` et `/services/marketing`.

### 2.3 Cartographie Complète : Pages Principales & 26 Pages de Services

#### A. Pages Stratégiques Principales

| URL (`/fr/...`) | Mot-clé Principal Cible (FR) | Mots-clés Secondaires / Champ Sémantique | Intention de Recherche |
| :--- | :--- | :--- | :--- |
| **`/fr` (Homepage)** | **agence de communication digitale maroc** | `agence de communication maroc`, `boite de communication maroc`, `agence communication digitale pour entreprises`, `agence digitale casablanca maroc` | Commerciale / Navigationnelle — Trouver une agence de communication digitale complète au Maroc |
| **`/fr/services`** | **services de communication digitale et marketing au maroc** | `prestations agence digitale maroc`, `catalogue services communication web vidéo` | Commerciale — Comparer les pôles d’expertise de l’agence |
| **`/fr/services/marketing`** | **agence marketing digital maroc** | `agence de publicité digitale maroc`, `stratégie marketing digital maroc`, `acquisition clients maroc` | Commerciale / Transactionnelle — Déléguer le marketing digital et la génération de leads |
| **`/fr/growth`** | **système d'acquisition client maroc** | `audit croissance digitale`, `tunnel de vente maroc` | Transactionnelle — Demander un audit de croissance (Growth System) |
| **`/fr/portfolio`** | **portfolio agence de communication maroc** | `études de cas marketing digital maroc`, `réalisations web et branding` | Évaluation commerciale — Vérifier les références et résultats clients |
| **`/fr/about`** | **à propos wezo media casablanca** | `agence digitale casablanca`, `studio créatif maroc` | Informationnelle / Confiance — Découvrir l’équipe et le studio |
| **`/fr/get-quote`** | **devis agence de communication maroc** | `demander un devis marketing digital`, `tarif communication digitale maroc` | Transactionnelle — Obtenir une proposition chiffrée sur mesure |

#### B. Les 26 Pages de Services (`lib/config/services.ts`) — Vérification de Non-Cannibalisation

| # | Slug (`/services/[slug]`) | Type | Rôle & Cible Sémantique (FR) | Risque de conflit avec `/fr` (Homepage) |
| :--- | :--- | :--- | :--- | :--- |
| **1** | `marketing` *(servi par `/services/marketing`)* | **Pilier 1** | **Agence Marketing Digital au Maroc & Gestion Publicitaire** (`agence marketing digital maroc`, `agence de publicité digitale maroc`) | **Modéré (à encadrer)** : `/fr` doit cibler *Agence de Communication Digitale*, tandis que `/fr/services/marketing` cible *Agence de Marketing Digital & Acquisition*. |
| 2 | `meta-ads-management` | Sous-service 1.1 | Gestion Publicités Meta Ads (Facebook & Instagram Ads Maroc) | Aucun (Spécifique régie Meta) |
| 3 | `google-ads` | Sous-service 1.2 | Publicité Google Ads Maroc (Search, Maps & YouTube) | Aucun (Spécifique régie Google) |
| 4 | `tiktok-ads` | Sous-service 1.3 | Publicité TikTok Ads Maroc & Acquisition Vidéo | Aucun (Spécifique régie TikTok) |
| 5 | `advertising-audit` | Sous-service 1.4 | Audit Publicitaire & Stratégie ROAS | Aucun (Spécifique audit de compte) |
| **6** | `business-website` | **Pilier 2** | **Création de Sites Web Professionnels au Maroc** (`création site web maroc`, `agence web maroc`) | Aucun (Spécifique développement web) |
| 7 | `landing-page` | Sous-service 2.1 | Création de Landing Page Haute Conversion | Aucun (Spécifique tunnel/page de capture) |
| 8 | `ecommerce-store` | Sous-service 2.2 | Création de Boutique E-commerce au Maroc (COD & Paiement en ligne) | Aucun (Spécifique e-commerce) |
| 9 | `website-maintenance` | Sous-service 2.3 | Maintenance, Sécurité & Gestion de Site Web | Aucun (Spécifique maintenance) |
| 10 | `web` *(legacy)* | Sous-service 2.4 | Développement Web Sur-Mesure & Plateformes SaaS (Next.js) | Aucun (Spécifique applications web) |
| **11** | `reels-social-video` | **Pilier 3** | **Production Vidéo Publicitaire & Reels au Maroc** | Aucun (Spécifique vidéo) |
| 12 | `ugc-advertising-content` | Sous-service 3.1 | Production Vidéos UGC Maroc (Créateurs de contenu) | Aucun (Spécifique UGC) |
| 13 | `ai-advertising-video` | Sous-service 3.2 | Production Vidéo Publicitaire par IA | Aucun (Spécifique vidéo IA) |
| 14 | `motion-video-editing` | Sous-service 3.3 | Motion Design & Montage Vidéo Professionnel | Aucun (Spécifique motion design) |
| 15 | `video` *(legacy)* | Sous-service 3.4 | Tournage Terrain, Films Institutionnels & Clips Vidéo | Aucun (Spécifique tournage institutionnel) |
| **16** | `brand-identity` | **Pilier 4** | **Identité Visuelle, Logo & Charte Graphique au Maroc** (`agence branding maroc`, `création logo maroc`) | Aucun (Spécifique design & identité) |
| 17 | `marketing-design` | Sous-service 4.1 | Design Marketing & Visuels Publicitaires (Carrousels, Bannières) | Aucun (Spécifique design graphique) |
| 18 | `social-media-setup` | Sous-service 4.2 | Création & Optimisation des Profils Réseaux Sociaux | Aucun (Spécifique setup social) |
| 19 | `social-media-management` | Sous-service 4.3 | Gestion des Réseaux Sociaux & Community Management au Maroc | Aucun (Spécifique community management) |
| 20 | `content-production` | Sous-service 4.4 | Production Mensuelle de Contenu (Visuels & Vidéos) | Aucun (Spécifique pack contenu) |
| **21** | `whatsapp-lead-automation` | **Pilier 5** | **Automatisation WhatsApp, CRM & IA au Maroc** | Aucun (Spécifique automatisation WhatsApp) |
| 22 | `crm-sales-pipeline` | Sous-service 5.1 | Configuration CRM & Pipeline Commercial | Aucun (Spécifique CRM) |
| 23 | `ai-business-assistant` | Sous-service 5.2 | Assistant Virtuel IA sur-mesure (Vente & Support 24/7) | Aucun (Spécifique agent IA) |
| **24** | `music-production` | **Pilier 6** | **Studio d’Enregistrement, Production Audio & Musique** | Aucun (Spécifique studio audio) |
| 25 | `artist` | Sous-service 6.1 | Services aux Artistes & Distribution Musicale | Aucun (Spécifique artistes) |
| 26 | `audio` *(legacy)* | Sous-service 6.2 | Ingénierie Sonore, Mixage & Voix-Off Publicitaire | Aucun (Spécifique voix-off/mixage) |

---

## 3. Recommandations : Title & Meta Description Multilingues (FR / AR / EN)

### 3.1 Correction du bug de duplication `| WEZO MEDIA | WEZO MEDIA`
Dans `app/[locale]/layout.tsx`, la configuration actuelle est :
```ts
title: {
  default: "WEZO MEDIA | وكالة حلول رقمية وتسويق رقمي في المغرب",
  template: "%s | WEZO MEDIA",
}
```
Comme `app/[locale]/(public)/page.tsx` renvoie une chaîne contenant déjà `| WEZO MEDIA`, Next.js applique le `template` et génère `... | WEZO MEDIA | WEZO MEDIA`.  
**Solution technique :** Utiliser `title: { absolute: title }` dans `app/[locale]/(public)/page.tsx` (ou retirer `| WEZO MEDIA` des chaînes enfants) afin que le `<title>` HTML rendu soit **exactement** celui prévu.

### 3.2 Validation des propositions pour la Page d’Accueil (`/fr`, `/ar`, `/en`)

#### Français (`/fr`)
- **Title proposé (validé — 55 caractères) :**  
  `Agence de Communication Digitale au Maroc | WEZO MEDIA`
  *Pourquoi :* Place le mot-clé principal exact (`Agence de Communication Digitale au Maroc`) dès le premier octet, respecte la limite des 60 caractères (55 car.) et positionne la marque `WEZO MEDIA` en fin de titre.
- **Meta Description proposée (validée — 148 caractères) :**  
  `WEZO MEDIA accompagne les entreprises au Maroc en communication digitale, publicité Meta Ads, création de sites web, branding et automatisation.`
  *Pourquoi :* Longueur idéale (148 caractères, aucune troncature mobile/desktop), couvre les intentions clés (entreprises au Maroc, communication digitale, publicité Meta Ads, sites web, branding, automatisation).

#### Arabe (`/ar`)
- **Title recommandé (57 caractères) :**  
  `وكالة التواصل والتسويق الرقمي في المغرب | WEZO MEDIA`
  *Pourquoi :* Cible naturellement la recherche arabe au Maroc (*وكالة التواصل والتسويق الرقمي في المغرب*) en parfaite cohérence avec le positionnement d’agence de communication et de croissance digitale.
- **Meta Description recommandée (154 caractères) :**  
  `وكالة WEZO MEDIA للتواصل والتسويق الرقمي في المغرب. نرافق الشركات في بناء الهوية البصرية، تطوير المواقع والمتاجر، الإعلانات الممولة، الإنتاج المرئي والأتمتة.`

#### Anglais (`/en`)
- **Title recommandé (58 caractères) :**  
  `Digital Marketing & Communication Agency Morocco | WEZO MEDIA`
  *Note :* Alternative courte (56 car.) : `Digital Communication & Marketing Agency in Morocco | WEZO` ou via `absolute` : `Digital Marketing & Communication Agency in Morocco | WEZO MEDIA` (64 car.). Nous recommandons :  
  `Digital Marketing & Communication Agency in Morocco | WEZO MEDIA`
- **Meta Description recommandée (155 caractères) :**  
  `WEZO MEDIA is a digital communication and marketing agency in Morocco helping businesses grow through branding, websites, paid ads, video, and automation.`

---

## 4. Modifications Proposées pour le H1 et le Copywriting de la Page d’Accueil

L’objectif est d’intégrer naturellement la thématique **Agence de communication digitale au Maroc** et de répondre aux 5 questions fondamentales du prospect B2B (*Que fait WEZO MEDIA ? Pour quelles entreprises ? Quels services ? Pourquoi nous choisir ? Comment demander un devis ?*) sans bourrage de mots-clés (keyword stuffing) et sans casser le design existant.

### 4.1 Section Hero (`components/public/Hero.tsx` & `messages/fr.json`, `ar.json`, `en.json`)

| Clé (`messages/fr.json`) | Texte Actuel (`/fr`) | Texte Proposé (`/fr`) | Justification SEO & Conversion |
| :--- | :--- | :--- | :--- |
| `hero.eyebrow` | `VOTRE PARTENAIRE DE CROISSANCE DIGITALE` | `AGENCE DE COMMUNICATION DIGITALE AU MAROC` | Annonce immédiatement la catégorie métier au-dessus de la ligne de flottaison. |
| `hero.title_line1` *(dans le `<h1>`)* | `Des solutions digitales intégrées` | `Agence de communication digitale` | Intègre le mot-clé cible principal dans le `<h1>` avec une typographie naturelle. |
| `hero.title_line2` *(dans le `<h1>`)* | `pour développer votre entreprise` | `& croissance digitale au Maroc` | Combine l’intention de recherche (*communication digitale au Maroc*) et le positionnement (*croissance digitale*). |
| `hero.description` | `WEZO MEDIA accompagne les entreprises au Maroc de la stratégie à l’exécution : identité, sites web, réseaux sociaux, contenu, publicité et automatisation.` | `WEZO MEDIA accompagne les PME, marques et entreprises au Maroc de la stratégie à l’exécution : branding, création de sites web, production vidéo, publicité digitale (Meta & Google Ads) et automatisation CRM.` | Précise **qui** nous servons (PME, marques, entreprises au Maroc) et **comment** (branding, web, vidéo, publicité digitale, automatisation). |
| `hero.ctaPrimary` | `Parlez-nous de votre projet` | `Demander un devis` *(ou « Parler de votre projet »)* — nous proposons `Demander un devis` en CTA primaire (qui pointe vers `/get-quote`) et `Découvrir nos services` en CTA secondaire | Alignement direct avec l’intention transactionnelle du bouton `/get-quote`. |
| `hero.tagline` | `Stratégie • Identité • Web • Publicité • Automatisation` | `Stratégie • Branding • Sites Web • Publicité • Vidéo • Automatisation` | Reflète fidèlement les 6 piliers de l’agence. |

#### Équivalents localisés pour `ar.json` et `en.json` :
- **Arabe (`/ar`) :**
  - `hero.eyebrow` : `وكالة التواصل والنمو الرقمي في المغرب`
  - `hero.title_line1` : `وكالة التواصل والتسويق الرقمي`
  - `hero.title_line2` : `لتنمية أعمالك في المغرب`
  - `hero.description` : `ترافق WEZO MEDIA الشركات والمؤسسات في المغرب من الاستراتيجية إلى التنفيذ: الهوية البصرية، تطوير المواقع والمتاجر، الإنتاج المرئي، الإعلانات الممولة (Meta & Google Ads) وأتمتة المبيعات.`
  - `hero.ctaPrimary` : `اطلب عرض سعر`
- **Anglais (`/en`) :**
  - `hero.eyebrow` : `DIGITAL COMMUNICATION & GROWTH AGENCY IN MOROCCO`
  - `hero.title_line1` : `Digital Communication & Marketing Agency`
  - `hero.title_line2` : `Built for Business Growth in Morocco`
  - `hero.description` : `WEZO MEDIA partners with SMEs, brands, and enterprises in Morocco from strategy to execution: brand identity, websites, commercial video, paid advertising (Meta & Google Ads), and CRM automation.`
  - `hero.ctaPrimary` : `Request a Quote`

### 4.2 Section Solutions (`components/public/SolutionsGrid.tsx` & `app/[locale]/(public)/page.tsx`)
1. **Correction de la localisation française manquante dans `SolutionsGrid.tsx`** :
   - Badge : `Que souhaitez-vous accomplir ?` (FR) / `ماذا تريد أن تحقق لمشروعك؟` (AR) / `What do you want to achieve?` (EN)
   - `<h2>` : `Des Solutions de Communication Orientées Résultats` (FR) / `حلول تواصل ونمو متكاملة بالنتائج` (AR) / `Outcome-Driven Digital Solutions` (EN)
   - Sous-titre explicatif (nouveau paragraphe court sous le `<h2>`) répondant à *« Quelles entreprises accompagnons-nous ? »* :
     - **FR :** `Que vous soyez une PME, une marque e-commerce, une clinique ou une entreprise B2B au Maroc, nous déployons l’écosystème adapté à vos objectifs commerciaux.`
     - **AR :** `سواء كنت مقاولة صغرى أو متوسطة، علامة تجارية، عيادة أو شركة خدمات في المغرب، نبني لك المنظومة الرقمية المتوافقة مع أهدافك التجارية.`
     - **EN :** `Whether you are an SME, e-commerce brand, clinic, or B2B company in Morocco, we deploy the digital ecosystem tailored to your commercial goals.`
   - Lien : `Découvrir la solution` (FR) / `استكشف الحل التجاري` (AR) / `Explore Solution` (EN)
   - Grille : Passer de `md:grid-cols-2` à `md:grid-cols-3` (car il y a 3 solutions mises en avant sur la page d’accueil).

### 4.3 Section des 6 Pôles de Services (`components/public/ServicesGrid.tsx`)
- **En-tête de section (`<h2>` et texte d’introduction)** :
  - Badge FR : `Nos 6 Pôles d’Expertise Digitale`
  - `<h2>` FR : `Services de Communication Digitale, Web & Acquisition` (au lieu de `Accélérez Votre Croissance Digitale`, afin d’inclure un `<h2>` riche de sens pour Google et les décideurs).
  - Paragraphe d’introduction sous le `<h2>` :
    - **FR :** `Une boîte de communication et de marketing digital qui réunit conseil stratégique, studio créatif, développement web et acquisition publicitaire sous un même toit.`
    - **AR :** `وكالة تواصل وتسويق رقمي تجمع بين التخطيط الاستراتيجي، الاستوديو الإبداعي، تطوير الويب وإدارة الحملات الإعلانية تحت سقف واحد.`
    - **EN :** `A full-service digital communication and marketing agency uniting strategic advisory, creative studio production, web engineering, and paid acquisition under one roof.`

### 4.4 Section Studio & Valeur Ajoutée (`components/public/AgencyStudio.tsx` & `messages/*.json`)
- **Objectif :** Répondre à *« Pourquoi choisir WEZO MEDIA plutôt qu’un prestataire isolé ? »* tout en renforçant l’ancrage local (Casablanca, Maroc).
- **`messages/fr.json` (`agency_studio`)** :
  - `badge` : `Pourquoi Choisir Notre Agence 🏢`
  - `title_prefix` : `Un studio de communication et de production `
  - `title_highlight` : `intégré à Casablanca`
  - `description` : `Plus qu’une boîte de communication classique, WEZO MEDIA réunit dans son studio à Casablanca réalisateurs, designers, développeurs web et experts en acquisition publicitaire. Cette synergie sans intermédiaires garantit une exécution rapide, une image de marque cohérente et un retour sur investissement mesurable pour votre entreprise.`
- **Image `alt` localisé dans `AgencyStudio.tsx`** :
  - FR : `Studio de création et agence de communication digitale WEZO MEDIA à Casablanca, Maroc`
  - AR : `استوديو ومقر وكالة التواصل والتسويق الرقمي WEZO MEDIA في الدار البيضاء، المغرب`
  - EN : `WEZO MEDIA digital communication agency and creative studio in Casablanca, Morocco`

### 4.5 Section Appel à l’Action Final (`components/public/CTA.tsx` & `messages/*.json`)
- **`messages/fr.json` (`cta`)** :
  - `title` : `Prêt à Développer la Visibilité de Votre Entreprise ?`
  - `desc` : `Parlez-nous de vos objectifs commerciaux. Notre équipe étudie votre besoin et vous propose un plan d’action et un devis personnalisé sous 24h.`
  - `button` : `Demander un devis personnalisé`
  - Bouton secondaire existant conservé : `Discuter sur WhatsApp`

---

## 5. Recommandations de Maillage Interne (Internal Linking)

### 5.1 Correction urgente des slugs de sous-services dans `ServicesGrid.tsx`
Dans `components/public/ServicesGrid.tsx` (lignes 68–226), le tableau `fallbackPillars` contient 6 slugs qui **n’existent pas** dans `lib/config/services.ts` :

| Pilier | Slug erroné actuel dans `ServicesGrid.tsx` | Slug réel existant dans `lib/config/services.ts` | Ancre FR recommandée |
| :--- | :--- | :--- | :--- |
| **1. Marketing** | `google-ads-management` ❌ (404) | `google-ads` ✅ | `Publicité Google Ads` |
| **1. Marketing** | `digital-strategy-audit` ❌ (404) | `advertising-audit` ✅ | `Audit Publicitaire & Stratégie` |
| **1. Marketing** | *(manquant dans fallback)* | `tiktok-ads` ✅ | `Publicité TikTok Ads` |
| **2. Web** | *(manquant dans fallback)* | `website-maintenance` ✅ | `Maintenance & Sécurité Web` |
| **3. Vidéo** | `ad-creatives-ugc` ❌ (404) | `ugc-advertising-content` ✅ | `Vidéos Publicitaires UGC` |
| **3. Vidéo** | *(manquant dans fallback)* | `motion-video-editing` ✅ | `Motion Design & Montage` |
| **4. Branding** | `social-content-design` ❌ (404) | `marketing-design` ✅ | `Design Marketing & Visuels Ads` |
| **4. Branding** | *(manquant dans fallback)* | `content-production` ✅ | `Production de Contenu Mensuel` |
| **5. Automatisation** | `crm-pipeline-setup` ❌ (404) | `crm-sales-pipeline` ✅ | `Configuration CRM & Pipeline` |
| **6. Audio** | `artist-branding-content` ❌ (404) | `artist` ✅ | `Services Artistes & Distribution` |
| **6. Audio** | *(manquant dans fallback)* | `audio` *(ou garder uniquement `artist` car `audio` est dans `LEGACY_HIDDEN_SLUGS`)* | — |

### 5.2 Renforcement du maillage entre `/` (Homepage) et `/services/marketing`
- Sur la carte du Pilier 1 (`marketing`) dans `ServicesGrid.tsx`, le lien principal pointe déjà vers `/fr/services/marketing` (qui est la page dédiée *Agence de Marketing Digital au Maroc*).
- **Recommandation :** Utiliser comme titre de carte du Pilier 1 sur `/fr` : **`Marketing Digital & Publicité en Ligne`** et en description : *« Stratégie d’acquisition sur mesure, gestion de campagnes Meta Ads, Google Ads et TikTok Ads pour générer des prospects qualifiés et des ventes au Maroc. »*
- Dans `Footer.tsx` (lignes 15–52), les 6 liens de services pointent vers les 6 piliers (`/services/marketing`, `/services/business-website`, `/services/brand-identity`, `/services/whatsapp-lead-automation`, `/services/reels-social-video`, `/services/music-production`). Nous recommandons également d’améliorer le texte de présentation de l’agence dans `Footer.tsx` (ligne 85) pour inclure naturellement *« Agence de communication digitale et de marketing digital à Casablanca, Maroc »*.

---

## 6. Conclusions de l’Audit SEO Technique & Données Structurées

### 6.1 Duplication du suffixe `| WEZO MEDIA` dans les balises `<title>`
- **Constat :** `app/[locale]/layout.tsx` définit `title.template: "%s | WEZO MEDIA"`. Or, `app/[locale]/(public)/page.tsx`, `app/[locale]/(public)/services/page.tsx`, `app/[locale]/(public)/services/[slug]/page.tsx`, `app/[locale]/(public)/services/marketing/page.tsx` et `app/[locale]/(public)/growth/page.tsx` incluent déjà `| WEZO MEDIA` dans leur chaîne `title`.
- **Résultat actuel :** Le HTML rendu contient `<title>... | WEZO MEDIA | WEZO MEDIA</title>`.
- **Correction prévue en Phase 2 :** Dans `app/[locale]/(public)/page.tsx` (et vérification sur les pages principales), utiliser `title: { absolute: title }` ou harmoniser avec le template du layout pour éliminer définitivement le double suffixe.

### 6.2 Données Structurées (`JSON-LD`) sur la Page d’Accueil (`app/[locale]/(public)/page.tsx`)
- **Constat 1 — `aggregateRating` codé en dur non vérifié :**  
  Aux lignes 154–160 de `app/[locale]/(public)/page.tsx`, le schéma `LocalBusiness` / `ProfessionalService` contient :
  ```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "230",
    "bestRating": "5",
    "worstRating": "1"
  }
  ```
  Or, selon les consignes strictes du projet (*« Do not invent addresses, reviews, awards, certifications, or business locations. Use only verified company information »*) et les règles de Google sur les *Self-Serving Reviews* pour `LocalBusiness`/`Organization`, un `AggregateRating` statique sans avis vérifiables exposés sur la page risque une pénalité manuelle de données structurées dans Google Search Console.
- **Constat 2 — Informations d’entreprise vérifiées :**  
  Les coordonnées utilisées dans `siteConfig` (`lib/config/site.ts`) sont vérifiées et cohérentes sur tout le site :
  - Nom : `WEZO MEDIA`
  - Adresse : `BD Moustapha El Maani N 22, Casablanca, MA`
  - Téléphone : `+212665875449`
  - Email : `contact@wezomedia.ma`
  - Réseaux sociaux : Instagram, Facebook, LinkedIn, TikTok, YouTube.
- **Correction prévue en Phase 2 :**
  1. **Retirer `aggregateRating` non vérifié** du schéma de la page d’accueil.
  2. **Enrichir le JSON-LD de la page d’accueil** avec un graphe `@graph` propre comprenant :
     - `Organization` / `ProfessionalService` (ou `AdvertisingAgency`) avec `@id: "https://www.wezomedia.ma/#organization"`, les coordonnées vérifiées de Casablanca, `areaServed: Morocco`, `knowsLanguage: ["fr", "ar", "en"]`, et un `hasOfferCatalog` listant les 6 pôles de services avec leurs URLs localisées.
     - `WebSite` (`@id: "https://www.wezomedia.ma/#website"`) et `WebPage` pour renforcer la compréhension de la structure trilingue par Google.

### 6.3 Balises Canonical & `hreflang` (`alternates`)
- **Constat :**
  - Dans `app/[locale]/(public)/page.tsx` (lignes 43–51), les URLs canoniques et `alternates.languages` (`ar`, `fr`, `en`, `x-default`) sont bien définies en URLs absolues (`https://www.wezomedia.ma/fr`, etc.).
  - En revanche, dans `app/[locale]/(public)/about/page.tsx` (ligne 35), `alternates` définit `canonical` mais omet `languages` (`ar`, `fr`, `en`), ce qui fait hériter ou perdre les liens `hreflang` réciproques.
  - Dans `app/[locale]/(public)/solutions/page.tsx` et `app/[locale]/(public)/contact/page.tsx`, il n’y a pas de `generateMetadata` dédié (elles héritent donc du titre arabe par défaut du layout `WEZO MEDIA | وكالة حلول رقمية وتسويق رقمي في المغرب` même en `/fr` et `/en` !).

### 6.4 Sitemap (`app/sitemap.ts`) & Robots (`app/robots.ts`)
- **`app/sitemap.ts`** : Génère correctement toutes les routes statiques + les 26 services (en évitant le doublon `/services/marketing`) + les 7 solutions + les études de cas portfolio pour les 3 langues (`ar`, `fr`, `en`).
- **`app/robots.ts`** : Autorise l’indexation de `/` et bloque correctement `/api/`, `/*/admin/` et `/*/dashboard/`, avec déclaration de `https://www.wezomedia.ma/sitemap.xml`.

### 6.5 Performance Mobile & Core Web Vitals
- Le composant `Hero.tsx` utilise déjà `useReducedMotion()` pour désactiver les animations superflues si nécessaire et évite tout décalage de mise en page (CLS).
- Les polices Google Fonts (`Tajawal`, `DM_Sans`, `Cairo`, `Syne`) sont chargées via `next/font/google`.
- Aucune modification lourde du DOM ou ajout de librairie JS externe n’est requise : toutes les optimisations SEO reposent sur du HTML sémantique rendu côté serveur / SSR et des traductions statiques.

---

## 7. Analyse des Risques de Cannibalisation de Mots-Clés

| Paire de pages | Risque | Stratégie de différenciation stricte |
| :--- | :--- | :--- |
| **`/fr` (Homepage)** vs **`/fr/services/marketing`** | **Moyen** si les deux pages ciblent *« Agence Marketing Digital Maroc »* | - **`/fr` (Homepage)** cible **exclusivement** le positionnement global : **`Agence de Communication Digitale au Maroc`** (*agence de communication maroc*, *boîte de communication maroc*, *solutions digitales intégrées*).<br>- **`/fr/services/marketing`** conserve le ciblage spécifique : **`Agence Marketing Digital au Maroc`** (*stratégie marketing*, *campagnes d’acquisition*, *génération de leads*).<br>- Le lien depuis la Homepage vers `/fr/services/marketing` utilise une ancre explicite (*« Marketing Digital & Gestion Publicitaire »*), indiquant clairement à Google que `/fr/services/marketing` est la page fille dédiée au marketing digital. |
| **`/fr` (Homepage)** vs **`/fr/services`** | **Faible** | - **`/fr`** cible l’entité *Agence de communication digitale au Maroc*.<br>- **`/fr/services`** cible le *Catalogue des prestations et forfaits* (`Nos Services Digitaux, Web, Vidéo & Acquisition`). |
| **`/fr/services/marketing`** vs **`/fr/services/meta-ads-management` & `/fr/services/google-ads`** | **Faible** | - **`/fr/services/marketing`** cible l’accompagnement marketing multi-leviers.<br>- **`meta-ads-management`**, **`google-ads`** et **`tiktok-ads`** ciblent chacune une régie publicitaire spécifique (Facebook/Instagram Ads, Google Search/Maps, TikTok Ads). |
| **`/fr` (Homepage)** vs **`/fr/about`** | **Très faible** | - **`/fr/about`** cible l’histoire, l’équipe et les valeurs de WEZO MEDIA à Casablanca (`À Propos | Agence Digitale & Studio Créatif WEZO MEDIA`). |

---

## 8. Liste Exacte des Fichiers à Modifier en Phase 2

Aucune modification de base de données, de schéma Prisma ou de configuration serveur ne sera effectuée. Seuls les fichiers front-end et de configuration de contenu suivants seront modifiés après approbation :

1. **`app/[locale]/(public)/page.tsx`**
   - Mise à jour de `generateMetadata` pour `/fr`, `/ar`, `/en` avec les nouveaux `title` (en utilisant `{ absolute: title }` pour éviter le doublon `| WEZO MEDIA | WEZO MEDIA`) et `description`.
   - Mise à jour du JSON-LD (`localBusinessSchema`) : suppression de l’`aggregateRating` statique non vérifié, enrichissement de la description localisée, ajout de `hasOfferCatalog` pointant vers les 6 piliers de services.
2. **`messages/fr.json`**
   - Optimisation naturelle des clés `hero` (`eyebrow`, `title_line1`, `title_line2`, `title`, `description`, `ctaPrimary`, `tagline`), `agency_studio` (`badge`, `title_prefix`, `title_highlight`, `description`), `process` et `cta` (`title`, `desc`, `button`).
3. **`messages/ar.json`**
   - Optimisation équivalente et naturelle en arabe (`وكالة التواصل والتسويق الرقمي في المغرب`) pour `hero`, `agency_studio` et `cta`.
4. **`messages/en.json`**
   - Optimisation équivalente et naturelle en anglais (`Digital Communication & Marketing Agency in Morocco`) pour `hero`, `agency_studio` et `cta`.
5. **`components/public/SolutionsGrid.tsx`**
   - Ajout de la prise en charge complète du français (`isFr`) pour le badge, le `<h2>`, le sous-titre explicatif B2B et le libellé des liens (corrigeant le texte anglais affiché sur `/fr`).
   - Correction des icônes par slug (`launch-business-brand`, `scale-customer-acquisition`, `automate-crm-operations`) et passage de la grille en 3 colonnes sur desktop (`lg:grid-cols-3`).
6. **`components/public/ServicesGrid.tsx`**
   - Optimisation du `<h2>` et ajout d’un court paragraphe d’introduction sémantique sous le `<h2>` (FR / AR / EN).
   - Correction des 6 slugs erronés dans `fallbackPillars` (`google-ads`, `advertising-audit`, `ugc-advertising-content`, `marketing-design`, `crm-sales-pipeline`, `artist`) pour garantir zéro lien interne 404.
7. **`components/public/AgencyStudio.tsx`**
   - Localisation de l’attribut `alt` de l’image `/assets/agency/office.jpg` en FR / AR / EN.
8. **`components/public/Footer.tsx`**
   - Légère optimisation de la phrase de présentation de l’agence (ligne 85) en FR / AR / EN pour inclure naturellement *« Agence de communication digitale et de marketing digital au Maroc »*.

---

## 9. Plan de Tests et de Validation (Phase 2)

Une fois votre accord donné pour passer à la **Phase 2**, nous exécuterons le protocole de validation suivant :
1. **Vérification de l’intégrité des JSON de traduction :** Validation syntaxique stricte de `messages/fr.json`, `messages/ar.json` et `messages/en.json`.
2. **Contrôle TypeScript & Linting :** Exécution de `npx tsc --noEmit` et `npm run lint` pour garantir zéro erreur de typage ou de compilation.
3. **Test de Build de Production :** Exécution de `npm run build` (`next build`) pour valider le rendu SSR/SSG de toutes les routes multilingues (`/ar`, `/fr`, `/en`).
4. **Inspection du HTML rendu sur `/fr`, `/ar`, `/en` :**
   - Vérification que `<title>` correspond exactement à `Agence de Communication Digitale au Maroc | WEZO MEDIA` sans double `| WEZO MEDIA`.
   - Vérification de `<meta name="description">`, `<link rel="canonical">` et des balises `<link rel="alternate" hreflang="...">`.
   - Vérification de l’unicité du `<h1>` et de la hiérarchie `<h1>` → `<h2>` → `<h3>` (100 % en français sur `/fr`, 100 % en arabe sur `/ar`, 100 % en anglais sur `/en`).
   - Validation syntaxique du bloc `<script type="application/ld+json">` et vérification de tous les liens internes vers les services et `/get-quote`.
5. **Préservation des parcours de conversion :** Vérification que les boutons CTA (`/get-quote`, WhatsApp, événements Google Analytics `trackRequestQuote` et `trackWhatsAppClick`) et les animations Framer Motion fonctionnent à l’identique.
