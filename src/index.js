import { router, dom } from '@artevelde-uas/canvas-lms-app';
import __ from './i18n';

import styles from './index.css';


export default function () {
    router.onRoute('courses.modules', function () {
        let moduleId = window.location.hash.replace(/^#module_/, '');

        if (location.hash === '') return;

        history.replaceState(null, document.title, window.location.pathname + '/' + moduleId);

        dom.onElementReady('#context_modules').then(modules => {
            let selected = document.getElementById('context_module_' + moduleId);
            let intervalID = setInterval(window.scrollTo, 100, 0, 0);

            function clear() {
                clearInterval(intervalID);
            }

            modules.classList.add(styles.modules);
            selected.classList.add(styles.selected);

            dom.onElementReady('#content > .header-bar').then(header => {
                let viewAllButton;
                let addButton = document.querySelector('.header-bar .add_module_link');

                addButton && addButton.classList.add('disabled');

                if (header.querySelector('.header-bar-left') === null) {
                    header.insertAdjacentHTML('afterbegin', `
                        <div class="header-bar-left header-bar__module-layout">
                            <div class="header-bar-left__buttons"></div>
                        </div>
                    `);
                }

                header.querySelector('.header-bar-left__buttons').insertAdjacentHTML('beforeend', `
                    <a id="view_all_modules" class="btn btn-primary">${__('view_all_modules')}</a>
                `);

                viewAllButton = header.querySelector('.header-bar-left__buttons #view_all_modules')

                viewAllButton.addEventListener('click', function () {
                    modules.classList.remove(styles.modules);
                    history.replaceState(null, document.title, location.pathname.replace(/\/\d+$/, ''));
                    viewAllButton.parentNode.removeChild(viewAllButton);
                    addButton && addButton.classList.remove('disabled');
                });
            });

            setTimeout(clear, 10000);

            ['wheel', 'keydown', 'touchstart'].forEach(function (name) {
                window.addEventListener(name, clear, {
                    capture: true,
                    once: true
                });
            });

            window.addEventListener('mousedown', function scrollBarHandler(e) {
                if (e.target === document.documentElement && e.clientX >= document.documentElement.offsetWidth) {
                    window.removeEventListener('mousedown', scrollBarHandler);
                }
            }, true);
        });
    });
}
