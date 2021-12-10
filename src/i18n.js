import { addTranslations, getTranslator } from '@artevelde-uas/canvas-lms-app/services/i18n';


// Build the translations object
const translations = {
    "en": {
        "view_all_modules": "View All Modules"
    },
    "nl": {
        "view_all_modules": "Alle modules weergeven"
    },
    "fr": {
        "view_all_modules": "Afficher tous les modules"
    },
    "de": {
        "view_all_modules": "Alle Module anzeigen"
    },
    "es": {
        "view_all_modules": "Ver todas las módulos"
    },
    "pt": {
        "view_all_modules": "Ver todas as módulos"
    },
    "it": {
        "view_all_modules": "Visualizza tutte le moduli"
    },
    "zh": {
        "view_all_modules": "查看所有单元"
    },
    "jp": {
        "view_all_modules": "すべてのモジュールを表示"
    }
};

// Get the namespace from the package
const namespace = require('../package.json').name;

// Add all the translation files to the namespace
addTranslations(namespace, translations);

// Get the default translator for the namespace
const translator = getTranslator(namespace);


export default translator;
