import i18n from './i18n';

import styles from './index.css';


export default function (app, options) {
    app.addRouteListener('course.modules', function () {
        let moduleId = window.location.hash.replace(/^#module_/, '');
        
        if (location.hash === '') return;
        
        history.replaceState(null, document.title, window.location.pathname + '/' + moduleId);

        app.addReadyListener('#context_modules', function (modules) {
            let selected = document.getElementById('context_module_' + moduleId);
            let intervalID = setInterval(window.scrollTo, 500, 0, 0);
            
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
                    <a id="view_all_modules" class="btn btn-primary">${i18n.t('view_all_modules')}</a>
                `);
                
                header.querySelector('.header-bar-left__buttons #view_all_modules').addEventListener('click', function () {
                    modules.classList.remove(styles.modules);
                    history.replaceState(null, document.title, location.pathname.replace(/\/\d+$/, ''));
                });
            });
            
            setTimeout(function () {
                clearInterval(intervalID);
            }, 2000);
        });
    });
}
