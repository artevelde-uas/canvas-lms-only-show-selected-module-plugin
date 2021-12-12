import { router, dom } from '@artevelde-uas/canvas-lms-app';
import __ from './i18n';

import styles from './index.module.css';


export default function () {
    router.onRoute('courses.modules', function () {
        // Get the module ID from the URL hash
        let moduleId = window.location.hash.replace(/^#module_/, '');

        if (location.hash === '') return;

        // Replace the module ID in the URL hash with slash notation
        window.history.replaceState(null, document.title, window.location.pathname + '/' + moduleId);

        dom.onElementReady('#context_modules').then(modules => {
            // Keep scrolling window to top to override Canvas' behavior
            const intervalID = setInterval(window.scrollTo, 100, 0, 0);

            // Get the selected module
            let selectedModule = document.getElementById('context_module_' + moduleId);

            selectedModule.classList.add(styles.selected);
            modules.classList.add(styles.modules);

            dom.onElementReady('#content > .header-bar').then(header => {
                const addButton = document.querySelector('.header-bar .add_module_link');

                // Disable the '+ Module' button
                if (addButton !== null) {
                    addButton.classList.add('disabled');
                }

                // Inject the left button container if it does not exist yet
                if (header.querySelector('.header-bar-left') === null) {
                    header.insertAdjacentHTML('afterbegin', `
                        <div class="header-bar-left header-bar__module-layout">
                            <div class="header-bar-left__buttons"></div>
                        </div>
                    `);
                }

                const leftButtonBar = header.querySelector('.header-bar-left__buttons')

                // Append the module buttons
                leftButtonBar.insertAdjacentHTML('beforeend', `
                    <a id="${styles.viewPreviousModule}" class="btn">&lt;</a>
                    <a id="${styles.viewNextModule}" class="btn">&gt;</a>
                    <a id="${styles.viewAllModules}" class="btn btn-primary">${__('view_all_modules')}</a>
                `);

                const viewPreviousButton = document.getElementById(styles.viewPreviousModule)
                const viewNextButton = document.getElementById(styles.viewNextModule)
                const viewAllButton = document.getElementById(styles.viewAllModules)

                // Show the previous module when the 'View Previous Module' button is clicked
                viewPreviousButton.addEventListener('click', function () {
                    const previousModule = selectedModule.previousElementSibling;

                    if (previousModule === null) return;

                    // Show the previous module
                    selectedModule.classList.remove(styles.selected);
                    previousModule.classList.add(styles.selected);

                    // Set the previous module as the selected one
                    selectedModule = previousModule;
                    moduleId = selectedModule.querySelector(':scope > .header').id;

                    // Replace the module ID in the URL with the new one
                    window.history.replaceState(null, document.title, moduleId);

                });

                // Show the previous module when the 'View Previous Module' button is clicked
                viewNextButton.addEventListener('click', function () {
                    const nextModule = selectedModule.nextElementSibling;

                    if (nextModule === null) return;
                    
                    // Show the next module
                    selectedModule.classList.remove(styles.selected);
                    nextModule.classList.add(styles.selected);

                    // Set the previous module as the selected one
                    selectedModule = nextModule;
                    moduleId = selectedModule.querySelector(':scope > .header').id;

                    // Replace the module ID in the URL with the new one
                    window.history.replaceState(null, document.title, moduleId);
                });

                // Reset the page when the 'View All Modules' button is clicked
                viewAllButton.addEventListener('click', function () {
                    modules.classList.remove(styles.modules);

                    // Remove the module ID from the URL
                    history.replaceState(null, document.title, location.pathname.replace(/\/\d+$/, ''));

                    // Remove the module buttons
                    leftButtonBar.removeChild(viewPreviousButton);
                    leftButtonBar.removeChild(viewNextButton);
                    leftButtonBar.removeChild(viewAllButton);

                    // Re-enable the '+ Module' button
                    addButton && addButton.classList.remove('disabled');
                });
            });

            /**
             * Clear the scroll to top interval
             */
            function clear() {
                clearInterval(intervalID);
            }

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
