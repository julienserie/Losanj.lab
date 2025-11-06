// Translations dictionary for Losanj Lab website
const translations = {
    fr: {
        // Navigation
        'nav.portfolio': 'Portfolio',
        'nav.about': 'À Propos',
        'nav.contact': 'Contact',

        // Hero section
        'hero.tagline': 'Compositeur(ice)s de musiques originales pour TV, publicité et films.',
        'hero.cta': 'Découvrir nos créations',

        // Portfolio section
        'portfolio.title': 'Portfolio',
        'portfolio.subtitle': 'Nos créations pour les plus grandes marques',

        // Project 1: McDonald's
        'project1.description': "À l'occasion de la sortie du film Sonic 3 dans les cinémas du monde entier, Losanj Lab a composé la musique de la campagne publicitaire mondiale pour le Happy Meal exclusif McDonald's.",
        'project1.stat1': 'Pays',
        'project1.stat2': 'Vues',
        'project1.link1': 'Voir la pub Brazil (18M vues)',
        'project1.link2': 'Voir la pub UK',

        // Project 2: Krys
        'project2.description': "Une composition orchestrale spectaculaire qui marie la tension cinématographique de Christopher Nolan à l'épique de Hans Zimmer. Suspense palpitant et grandeur des sommets pour une publicité qui marque les esprits.",
        'project2.tag1': 'Orchestral',
        'project2.tag2': 'Cinématique',
        'project2.tag3': 'Suspense',
        'project2.tag4': 'Épique',
        'project2.location': 'France • Belgique • Suisse',
        'project2.link': 'Voir la publicité sur YouTube',

        // Project 3: NATRAN
        'project3.description': "Une composition électro-ambiante qui évoque la liberté des grands espaces et l'harmonie avec la nature. Une bande-son futuriste et apaisante pour illustrer le chemin vers l'énergie renouvelable et un avenir durable.",
        'project3.tag1': 'Electro',
        'project3.tag2': 'Ambient',
        'project3.tag3': 'Nature',
        'project3.tag4': 'Futuriste',
        'project3.stat': 'Vues',
        'project3.link': 'Voir la publicité sur YouTube (1.8M vues)',

        // About section
        'about.title': 'À Propos',
        'about.intro': "Losanj Lab est un collectif de compositeur(ice)s aux univers contrastés : pop, électro, urbain, variété, jazz, metal, orchestral. Ils se réunissent pour créer des musiques originales pour l'image, la publicité et les librairies musicales.",
        'about.description': "Déjà au service de marques comme McDonald's, Krys ou Natran, le collectif allie créativité et exigence professionnelle pour imaginer des bandes-son sur mesure, puissantes et singulières.",

        // Contact section
        'contact.title': 'Contact',
        'contact.subtitle': 'Discutons de votre prochain projet',
        'contact.instagram': 'Suivez-nous sur Instagram',
        'contact.linkedin': 'Connectez-vous sur LinkedIn',

        // Footer
        'footer.copyright': '© 2025 Losanj Lab - Tous droits réservés'
    },
    en: {
        // Navigation
        'nav.portfolio': 'Portfolio',
        'nav.about': 'About',
        'nav.contact': 'Contact',

        // Hero section
        'hero.tagline': 'Based in France. Songwriting and production lab for TV, advertising & film',
        'hero.cta': 'Discover our creations',

        // Portfolio section
        'portfolio.title': 'Portfolio',
        'portfolio.subtitle': 'Our creations for the biggest brands',

        // Project 1: McDonald's
        'project1.description': "For the worldwide release of Sonic 3 in theaters, Losanj Lab composed the music for the global McDonald's exclusive Happy Meal advertising campaign.",
        'project1.stat1': 'Countries',
        'project1.stat2': 'Views',
        'project1.link1': 'Watch Brazil ad (18M views)',
        'project1.link2': 'Watch UK ad',

        // Project 2: Krys
        'project2.description': "A spectacular orchestral composition that blends Christopher Nolan's cinematic tension with Hans Zimmer's epic scale. Thrilling suspense and mountain grandeur for an ad that leaves a lasting impression.",
        'project2.tag1': 'Orchestral',
        'project2.tag2': 'Cinematic',
        'project2.tag3': 'Suspense',
        'project2.tag4': 'Epic',
        'project2.location': 'France • Belgium • Switzerland',
        'project2.link': 'Watch the ad on YouTube',

        // Project 3: NATRAN
        'project3.description': "An electro-ambient composition evoking the freedom of wide-open spaces and harmony with nature. A futuristic and soothing soundtrack illustrating the path to renewable energy and a sustainable future.",
        'project3.tag1': 'Electro',
        'project3.tag2': 'Ambient',
        'project3.tag3': 'Nature',
        'project3.tag4': 'Futuristic',
        'project3.stat': 'Views',
        'project3.link': 'Watch the ad on YouTube (1.8M views)',

        // About section
        'about.title': 'About',
        'about.intro': "Losanj Lab is a collective of composers with contrasting universes: pop, electro, urban, variety, jazz, metal, orchestral. They come together to create original music for film, advertising and music libraries.",
        'about.description': "Already serving brands such as McDonald's, Krys and Natran, the collective combines creativity and professional excellence to create custom, powerful and unique soundtracks.",

        // Contact section
        'contact.title': 'Contact',
        'contact.subtitle': "Let's discuss your next project",
        'contact.instagram': 'Follow us on Instagram',
        'contact.linkedin': 'Connect on LinkedIn',

        // Footer
        'footer.copyright': '© 2025 Losanj Lab - All rights reserved'
    }
};

// Language detection and management
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('fr') ? 'fr' : 'en';
}

function getCurrentLanguage() {
    return localStorage.getItem('losanjlab-lang') || getBrowserLanguage();
}

function setLanguage(lang) {
    localStorage.setItem('losanjlab-lang', lang);
    document.documentElement.lang = lang;
    updatePageContent(lang);
    updateLanguageButton(lang);
}

function updatePageContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

function updateLanguageButton(lang) {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    setLanguage(currentLang);

    // Add click handlers to language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});
