import { router, dom } from '@artevelde-uas/canvas-lms-app';
import __ from './i18n';

import styles from './index.module.css';


export default function () {
    router.onRoute('courses.modules', function () {
        // Get the module ID from the URL hash
        const moduleId = window.location.hash.replace(/^#module_/, '');

        if (location.hash === '') return;

        // Replace the module ID in the URL hash with slash notation
        window.history.replaceState(null, document.title, window.location.pathname + '/' + moduleId);

        dom.onElementReady('#context_modules').then(modules => {
            // Get the selected module
            const selected = document.getElementById('context_module_' + moduleId);

            // Keep scrolling window to top to override Canvas' behavior
            const intervalID = setInterval(window.scrollTo, 100, 0, 0);

            /**
             * Clear the scroll to top interval
             */
            function clear() {
                clearInterval(intervalID);
            }

            modules.classList.add(styles.modules);
            selected.classList.add(styles.selected);

            dom.onElementReady('#content > .header-bar').then(header => {
                const addButton = document.querySelector('.header-bar .add_module_link');

                // Disable the '+ Module' button
                addButton && addButton.classList.add('disabled');

                // Inject the left button container if it does not exist yet
                if (header.querySelector('.header-bar-left') === null) {
                    header.insertAdjacentHTML('afterbegin', `
                        <div class="header-bar-left header-bar__module-layout">
                            <div class="header-bar-left__buttons"></div>
                        </div>
                    `);
                }

                // Append the 'View All Modules' button
                header.querySelector('.header-bar-left__buttons').insertAdjacentHTML('beforeend', `
                    <a id="view_all_modules" class="btn btn-primary">${__('view_all_modules')}</a>
                `);

                const viewAllButton = header.querySelector('.header-bar-left__buttons #view_all_modules')

                // Reset the page when the 'View All Modules' button is clicked
                viewAllButton.addEventListener('click', function () {
                    modules.classList.remove(styles.modules);

                    // Remove the module ID from the URL
                    history.replaceState(null, document.title, location.pathname.replace(/\/\d+$/, ''));

                    // Remove the 'View All Modules' button
                    viewAllButton.parentNode.removeChild(viewAllButton);

                    // Re-enable the '+ Module' button
                    addButton && addButton.classList.remove('disabled');
                });
            });

            // Stop scrolling to top after ten seconds
            setTimeout(clear, 10000);

            // Stop scrolling to top on first wheel, touch or key event
            ['wheel', 'keydown', 'touchstart'].forEach(function (name) {
                window.addEventListener(name, clear, {
                    capture: true,
                    once: true
                });
            });

            // Stop scrolling to top on first mousedown on vertical scrollbar
            window.addEventListener('mousedown', function scrollBarHandler(e) {
                // If X coordinate is greater than the client width the click was on the scrollbar
                if (e.target === document.documentElement && e.clientX >= document.documentElement.offsetWidth) {
                    window.removeEventListener('mousedown', scrollBarHandler);
                }
            }, true);
        });
    });
}
