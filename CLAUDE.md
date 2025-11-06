# Notes de développement - Site Losanj Lab

## Session du 6 novembre 2025

### Contexte

Création d'un site vitrine professionnel pour **Losanj Lab** - Collectif de compositeur(ice)s de musiques originales pour TV, publicité, films et séries.

---

## Phase 1 : Développement initial (jour 1)

### Design et structure

**Évolution du design :**
1. **Version initiale** : Thème sombre (dark mode)
2. **Refonte complète** : Passage au thème blanc minimaliste
   - Background : noir → blanc
   - Texte : blanc → noir (#1a1a1a)
   - Sections alternées : gris subtil (#fafbfc)
   - Ombres et bordures minimalistes

**Optimisations layout :**
- Largeur réduite de 1200px → 800px pour meilleur focus
- Navigation responsive avec réduction progressive des espacements
- Texte justifié sur desktop, left-aligned sur mobile

### Contenu et traductions

**Support bilingue (FR/EN) :**
- Système i18n client-side avec `translations.js`
- Détection automatique du navigateur (`navigator.language`)
- Persistance du choix via `localStorage`
- Switcher FR/EN dans la navigation

**Évolution du contenu :**
- Tagline FR : "Compositeur(ice)s de musiques originales pour TV, publicité, films et séries."
- Tagline EN : "Songwriting and production lab for TV, advertising, film & series"
- Copyright : 2024 → 2025
- Langage inclusif : "compositeurs" → "compositeur(ice)s"
- Titres projets affinés (NATRAN au lieu de GRTgaz)
- Descriptions enrichies (Krys : "d'un Christopher Nolan", NATRAN : "électro French touch")

**Contenu multimédia :**
- 3 vidéos de publicités renommées pour compatibilité web :
  - `mcdonalds-sonic-happy-meal.mp4` (16.5 MB)
  - `krys-la-rencontre.mp4` (15.7 MB)
  - `grtgaz-transition-energetique.mp4` (17.1 MB)

### Liens sociaux

**Ajoutés :**
- Instagram : https://www.instagram.com/losanjlab/
- LinkedIn : https://www.linkedin.com/in/losanj-lab-696a75395/
- Attributs de sécurité : `rel="noopener noreferrer"` sur tous les liens externes
- Fix : Nettoyage URL Instagram (suppression paramètre tracking temporaire `?igsh=...`)

### Bugs résolus

**1. Vidéos ne se lançant pas**
- Cause : Noms de fichiers avec espaces
- Fix : Renommage en format web-friendly

**2. Navigation mobile - "À Propos" à la ligne**
- Cause : Espacement trop large + tagline long
- Fix : Multiple itérations de réduction (gaps, font-size, padding)
- Résultat final : 8px gap, 11px font, 5px padding @ 480px

**3. Lien Instagram intermittent**
- Cause : Paramètre tracking `?igsh=Zjl6bnY2Z2RiaDZ3` expirait
- Fix : URL nettoyée vers base path

**4. Texte justifié illisible sur mobile**
- Fix : `text-align: justify` uniquement desktop, `left` sur mobile

---

## Phase 2 : Migration Netlify → GitHub Pages (jour 1, suite)

### Problème Netlify

**Symptôme** : Site ne fonctionne plus
**Cause identifiée** : Dépassement de limite gratuite Netlify
- Message : "This team has exceeded the credit limit"
- Tous les projets mis en pause automatiquement
- Restauration prévue : mois suivant

### Décision stratégique

**Analyse des options professionnelles :**

| Solution | Coût/an | Avantages | Inconvénients |
|----------|---------|-----------|---------------|
| **GitHub Pages + Domaine OVH** | ~22€ | Gratuit, illimité, fiable | Repo public (gratuit) |
| GitHub Pages Pro + Domaine | ~70€ | Repo privé | Plus cher |
| Hostinger Premium | ~36€ | Tout inclus, interface facile | Hébergement mutualisé |
| OVH Perso | ~58€ | Français, 10 emails | Setup plus complexe |
| Netlify Pro | ~228€ | Analytics | Beaucoup trop cher |

**Choix final : Option 1 - GitHub Pages + OVH (22€/an)**

**Justification :**
- ✅ Hébergement site gratuit et illimité
- ✅ Infrastructure GitHub ultra-fiable
- ✅ CDN mondial performant
- ✅ SSL automatique
- ✅ Déploiement automatique depuis Git
- ✅ Email pro inclus (Zimbra Starter)
- ✅ Meilleur rapport qualité/prix

### Migration technique

**1. Repository GitHub**
- Repository existant : `github.com/julienserie/Losanj.lab`
- Passage du statut privé → public (requis pour GitHub Pages gratuit)
- Branche source : `main`

**2. Activation GitHub Pages**
- Settings → Pages
- Source : Branch `main` / folder `/ (root)`
- URL temporaire : https://julienserie.github.io/Losanj.lab/
- Déploiement automatique : ✅ Fonctionnel

**3. Bug résolu : Navbar noire**
- **Symptôme** : Navigation avec fond noir au scroll (ancien thème)
- **Cause** : `script.js` contenait `rgba(10, 10, 10)` au lieu de blanc
- **Fix** : Ligne 19-21 changée vers `rgba(255, 255, 255, 0.98)`
- **Commit** : `e428d9b`

### Achat domaine et email OVH

**Domaine : losanj-lab.com**
- Extension `.com` (la plus professionnelle)
- Prix : 7,99€ HT la 1ère année (puis 13,49€/an)
- Commande OVH : #238671450
- Date : 6 novembre 2025, 19:16 CET

**Email professionnel inclus :**
- Service : Zimbra Starter (gratuit avec domaine)
- Capacité : 5 Go
- Adresse prévue : contact@losanj-lab.com
- Interface webmail + compatible clients email

**Total facturé : 9,59€ TTC**

**Options incluses :**
- ✅ DNSSEC (sécurité DNS)
- ✅ 1 compte email Zimbra Starter
- ✅ Zone DNS automatique

---

## Configuration à venir (en attente activation OVH)

### Étape 3 : Configuration DNS

**À faire quand domaine activé :**

1. **Dans OVH - Zone DNS :**
   - Record `A` : @ → `185.199.108.153` (GitHub Pages IP)
   - Record `A` : @ → `185.199.109.153`
   - Record `A` : @ → `185.199.110.153`
   - Record `A` : @ → `185.199.111.153`
   - Record `CNAME` : www → `julienserie.github.io`

2. **Dans GitHub Pages Settings :**
   - Custom domain : `www.losanj-lab.com`
   - Enforce HTTPS : ✅ Cocher (après propagation DNS)

3. **Vérification :**
   - Attendre propagation DNS (2-48h, souvent ~30min)
   - Tester : `dig losanj-lab.com` et `dig www.losanj-lab.com`
   - Vérifier SSL : https://www.ssllabs.com/ssltest/

### Étape 4 : Configuration Email

**À faire après activation Zimbra :**

1. **Dans OVH - Espace client :**
   - Créer compte email : contact@losanj-lab.com
   - Définir mot de passe fort
   - Configurer redirections si nécessaire

2. **Webmail Zimbra :**
   - URL : https://mail.ovh.net/zimbra/
   - Login : contact@losanj-lab.com
   - Personnaliser signature email

3. **Configuration clients email (optionnel) :**
   - **IMAP** :
     - Serveur : ssl0.ovh.net
     - Port : 993 (SSL)
   - **SMTP** :
     - Serveur : ssl0.ovh.net
     - Port : 465 (SSL)

4. **Mettre à jour le site :**
   - Remplacer `losanj.lab@gmail.com` par `contact@losanj-lab.com` dans :
     - `index.html` (ligne 177)
     - `README.md`

---

## Architecture technique finale

### Stack technologique

**Frontend :**
- HTML5 sémantique
- CSS3 (custom properties, flexbox, media queries)
- JavaScript vanilla ES6+
- Aucune dépendance externe

**Hébergement :**
- GitHub Pages (site statique)
- GitHub Actions (déploiement auto)
- OVH (domaine + DNS + email)

**Versioning :**
- Git + GitHub
- Repository : https://github.com/julienserie/Losanj.lab
- Branche production : `main`

### Structure fichiers

```
Losanj.lab/
├── index.html              # Page principale (12 KB)
├── styles.css              # Styles minimalistes (9.5 KB)
├── script.js               # Interactions (2.8 KB)
├── translations.js         # i18n FR/EN (7.3 KB)
├── README.md               # Documentation
├── CLAUDE.md               # Historique développement (ce fichier)
├── .gitignore              # Exclusions Git
├── mcdonalds-sonic-happy-meal.mp4       (16.5 MB)
├── krys-la-rencontre.mp4                (15.7 MB)
└── grtgaz-transition-energetique.mp4    (17.1 MB)
```

### Fonctionnalités implémentées

**Navigation :**
- Smooth scroll vers sections
- Active link highlighting
- Background sticky avec backdrop-filter
- Responsive avec breakpoints 768px et 480px

**Vidéos :**
- Lazy loading avec IntersectionObserver
- Contrôles natifs HTML5
- Optimisation bande passante

**Animations :**
- Fade-in au scroll pour project cards
- Hover effects sur liens et boutons
- Transitions CSS fluides (0.3s ease)

**i18n :**
- Détection langue navigateur
- Persistance localStorage
- Update DOM temps réel via `data-i18n`
- Switcher FR/EN dans navbar

**Accessibilité :**
- Sémantique HTML correcte
- Attributs alt sur éléments visuels
- Contraste WCAG AA minimum
- Navigation clavier fonctionnelle

---

## Performances

**Scores attendus (Lighthouse) :**
- Performance : 90-100 (après optimisation vidéos)
- Accessibilité : 95-100
- Best Practices : 100
- SEO : 90-100

**Optimisations appliquées :**
- Lazy loading vidéos
- CSS minimaliste (< 10 KB)
- JavaScript vanilla (< 15 KB total)
- Aucune dépendance externe
- CDN GitHub Pages mondial

**Temps de chargement attendu :**
- First Contentful Paint : < 1s
- Time to Interactive : < 2s
- Total page load : < 3s (hors vidéos)

---

## Git commits significatifs

```
e428d9b - Fix: Update navbar background color to match white theme
5cb56e4 - Remove 'Based in France.' from English tagline
5a7da82 - Fix Instagram URL and add security to all external links
aa216fb - Remove justified text alignment on mobile
83be787 - Update NATRAN description: electro-ambiante to French touch
57b9ae3 - Update Krys project description in FR and EN
[... historique complet sur GitHub]
```

---

## Prochaines sessions

### À faire immédiatement (attente OVH)

- [ ] Vérifier activation domaine losanj-lab.com dans "Mes offres & services"
- [ ] Configurer DNS zone OVH pour pointer vers GitHub Pages
- [ ] Ajouter custom domain dans GitHub Pages settings
- [ ] Activer HTTPS forcé sur GitHub Pages
- [ ] Configurer email contact@losanj-lab.com
- [ ] Tester envoi/réception email

### Améliorations futures possibles

**SEO :**
- [ ] Ajouter meta description multilingue
- [ ] Ajouter Open Graph tags (partage réseaux sociaux)
- [ ] Créer sitemap.xml
- [ ] Ajouter robots.txt
- [ ] Optimiser balises title par section

**Fonctionnalités :**
- [ ] Formulaire de contact (EmailJS ou Formspree)
- [ ] Galerie photos/vidéos étendue
- [ ] Section "News" ou "Blog"
- [ ] Player audio pour extraits musicaux
- [ ] Mode sombre (toggle optionnel)

**Contenu :**
- [ ] Remplacer losanj.lab@gmail.com par contact@losanj-lab.com
- [ ] Ajouter photos membres du collectif
- [ ] Enrichir section "À Propos"
- [ ] Ajouter témoignages clients

**Performance :**
- [ ] Compresser vidéos (codec VP9 ou AV1)
- [ ] Ajouter posters vidéos (thumbnails)
- [ ] Lazy load progressive (IntersectionObserver v2)
- [ ] Service Worker pour cache offline

---

## Notes techniques

### Système i18n

**Fonctionnement :**
```javascript
// Détection langue
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('fr') ? 'fr' : 'en';
}

// Application traductions
function updatePageContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}
```

**Structure dictionnaire :**
```javascript
const translations = {
    fr: {
        'nav.portfolio': 'Portfolio',
        'hero.tagline': 'Compositeur(ice)s de musiques originales...',
        // ...
    },
    en: {
        'nav.portfolio': 'Portfolio',
        'hero.tagline': 'Songwriting and production lab...',
        // ...
    }
};
```

### Responsive breakpoints

**Desktop (default)** : > 768px
- Container : 800px max-width
- Font-size base : 16-18px
- Text-align : justify (paragraphes)

**Tablet** : ≤ 768px
- Nav gaps : 12px → 15px
- Font-size : 13px → 16px
- Text-align : left (paragraphes)

**Mobile** : ≤ 480px
- Nav gaps : 8px
- Logo : 16px
- Font-size : 10px → 11px
- Padding minimal

---

## Ressources et liens

**GitHub :**
- Repository : https://github.com/julienserie/Losanj.lab
- GitHub Pages : https://julienserie.github.io/Losanj.lab/

**OVH :**
- Espace client : https://www.ovh.com/manager/
- Webmail Zimbra : https://mail.ovh.net/zimbra/

**Documentation :**
- GitHub Pages : https://docs.github.com/pages
- OVH DNS : https://docs.ovh.com/fr/domains/
- GitHub Pages IPs : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

**Outils :**
- SSL Test : https://www.ssllabs.com/ssltest/
- DNS Checker : https://dnschecker.org/
- Lighthouse : Chrome DevTools

---

## Contact développement

**Développé avec :** Claude Code (Anthropic)
**Date :** 6 novembre 2025
**Durée session :** ~3-4 heures
**Lignes de code :** ~500 (HTML + CSS + JS)
**Commits :** 10+

---

**🎵 Losanj Lab - Press Start to Compose! 🎮**
