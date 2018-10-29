import i18n from './i18n';

import styles from './index.css';


export default function (app, options) {
    app.addRouteListener('course.modules', function () {
        let moduleId = location.hash.replace(/^#/, 'context_');
        
        if (moduleId === '') return;
        
        app.addReadyListener('#context_modules', function (modules) {
            let selected = document.getElementById(moduleId);
            
            modules.classList.add(styles.modules);
            selected.classList.add(styles.selected);
            
            app.addReadyListener('#content > .header-bar', function (header) {
                if (header.querySelector('.header-bar-left') === null) {
                    header.insertAdjacentHTML('afterbegin', `
                        <div class="header-bar-left header-bar__module-layout">
                            <div class="header-bar-left__buttons"></div>
                        </div>
                    `);
                }
                
                header.querySelector('.header-bar-left__buttons').insertAdjacentHTML('beforeend', `
                    <a id="view_all_modules" class="btn btn-primary" href="#">${i18n.t('view_all_modules')}</a>
                `);
                
                header.querySelector('.header-bar-left__buttons #view_all_modules').addEventListener('click', function () {
                    modules.classList.remove(styles.modules);
                    history.replaceState(null, document.title, location.pathname);
                });
            });
        });
    });
}
