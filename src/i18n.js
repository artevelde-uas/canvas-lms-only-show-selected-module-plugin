import i18next from 'i18next';


export default i18next.createInstance().init({
    lng: document.documentElement.lang,
    fallbackLng: 'en',
    resources: {
        "en": {
            "translation": {
                "view_all_modules": "View All Modules"
            }
        },
        "nl": {
            "translation": {
                "view_all_modules": "Alle modules weergeven"
            }
        },
        "fr": {
            "translation": {
                "view_all_modules": "Afficher toutes les modules"
            }
        },
        "de": {
            "translation": {
                "view_all_modules": "Alle Module anzeigen"
            }
        },
        "es": {
            "translation": {
                "view_all_modules": "Ver todas las módulos"
            }
        },
        "pt": {
            "translation": {
                "view_all_modules": "Ver todas as módulos"
            }
        },
        "it": {
            "translation": {
                "view_all_modules": "Visualizza tutte le moduli"
            }
        },
        "zh": {
            "translation": {
                "view_all_modules": "查看所有单元"
            }
        },
        "jp": {
            "translation": {
                "view_all_modules": "すべてのモジュールを表示"
            }
        }
    }
});
