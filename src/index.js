import { router, dom } from '@artevelde-uas/canvas-lms-app';
import __ from './i18n';

import styles from './index.module.css';


export default function () {
    router.onRoute('courses.modules', function () {
        // Set main class on body
        document.body.classList.add(styles.onlyShowSelectedModule);

        dom.onElementReady([
            '#content > .header-bar',
            '#context_modules'
        ]).then(([header, modules]) => {
            let selectedModule = null;

            // Inject the left button container if it does not exist yet
            if (header.querySelector('.header-bar-left') === null) {
                header.insertAdjacentHTML('afterbegin', `
                    <div class="header-bar-left header-bar__module-layout">
                        <div class="header-bar-left__buttons"></div>
                    </div>
                `);
            }

            const leftButtonBar = header.querySelector('.header-bar-left__buttons')
            const expandCollapseAllButton = document.getElementById('expand_collapse_all');

            // Append the module buttons
            leftButtonBar.insertAdjacentHTML('beforeend', `
                <a id="${styles.viewPreviousModule}" class="btn" disabled>
                    <i class="icon-mini-arrow-left"></i>
                    ${__('previous')}
                    </a>
                    <a id="${styles.viewNextModule}" class="btn" disabled>
                    ${__('next')}
                    <i class="icon-mini-arrow-right"></i>
                </a>
                <a id="${styles.viewAllModules}" class="btn" disabled>${__('view_all_modules')}</a>
            `);

            const viewPreviousButton = document.getElementById(styles.viewPreviousModule)
            const viewNextButton = document.getElementById(styles.viewNextModule)
            const viewAllButton = document.getElementById(styles.viewAllModules)

            function setSelectedModule(contextModuleId) {
                // Hide the previously selected module
                if (selectedModule !== null) {
                    selectedModule.classList.remove(styles.selected);
                }

                // Get the new selected module
                selectedModule = document.getElementById(contextModuleId);

                // Mark the module as selected
                modules.classList.add(styles.selected);
                selectedModule.classList.add(styles.selected);

                // Replace the module ID in the URL with the new one
                const moduleId = contextModuleId.replace(/^context_module_/, '');
                const url = location.pathname.replace(/\/modules(\/\d+)?\/?$/, '/modules/' + moduleId);

                window.history.replaceState(null, null, url);

                // Disable the module buttons if needed
                const previousModule = selectedModule.previousElementSibling;
                const nextModule = selectedModule.nextElementSibling;

                viewPreviousButton.toggleAttribute('disabled', (previousModule === null));
                viewNextButton.toggleAttribute('disabled', (nextModule === null));
                viewAllButton.toggleAttribute('disabled', (previousModule === null && nextModule === null));

                // Expand module when selected
                if (selectedModule.classList.contains('collapsed_module')) {
                    const expandModuleLink = selectedModule.querySelector('.expand_module_link');

                    expandModuleLink.click();
                }

                // Hide the 'Expand/Collapse All' button
                if (expandCollapseAllButton !== null) {
                    expandCollapseAllButton.classList.add('hidden');
                }
            }

            function showAllModules() {
                // Unhide the selected module
                modules.classList.remove(styles.selected);

                // Hide the previously selected module
                if (selectedModule !== null) {
                    selectedModule.classList.remove(styles.selected);
                }

                // Unset the selected module
                selectedModule = null;

                // Remove the module ID from the URL
                const url = location.pathname.replace(/\/modules(\/\d+)?\/?$/, '/modules');

                window.history.replaceState(null, null, url);

                // Disable the module buttons
                viewPreviousButton.toggleAttribute('disabled', true);
                viewNextButton.toggleAttribute('disabled', true);
                viewAllButton.toggleAttribute('disabled', true);

                // Unhide the 'Expand/Collapse All' button
                if (expandCollapseAllButton !== null) {
                    expandCollapseAllButton.classList.remove('hidden');
                }
            }

            // Show the previous module when the 'View Previous Module' button is clicked
            viewPreviousButton.addEventListener('click', function () {
                const previousModule = selectedModule.previousElementSibling;

                setSelectedModule(previousModule.id);
            });

            // Show the previous module when the 'View Previous Module' button is clicked
            viewNextButton.addEventListener('click', function () {
                const nextModule = selectedModule.nextElementSibling;

                setSelectedModule(nextModule.id);
            });

            // Reset the page when the 'View All Modules' button is clicked
            viewAllButton.addEventListener('click', showAllModules);

            dom.onElementAdded('.context_module', module => {
                // Add 'Only show this module' link
                module.querySelectorAll('.ig-header-title').forEach(title => {
                    title.insertAdjacentHTML('beforeend', `
                        &nbsp;
                        <a class="${styles.selectModule}" title="${__('focus_on_module')}">
                            <i role="presentation" class="icon-eye"></i>
                        </a>
                    `);
                });

                module.querySelectorAll(`.${styles.selectModule}`).forEach(link => {
                    jQuery(link).tooltip({
                        position: { my: 'left+12', at: 'right' },
                        tooltipClass: 'left middle horizontal'
                    });
                });

                // Detect if a new module was created
                if (selectedModule !== null && module.id.match(/^context_module_new$/) !== null) {
                    // Select module when the ID attribute is set
                    dom.onAttributeChange(module, setSelectedModule, {
                        once: true,
                        filter: ['id']
                    });
                }
            }, { root: modules });

            // Show all modules when an element is removed
            dom.onElementRemoved('.context_module', module => {
                // Only execute when module is selected
                if (selectedModule === null || module.id.match(/^context_module_new$/) !== null) return;

                showAllModules();
            });

            // Add an 'Only show this module' link to each module
            modules.addEventListener('click', event => {
                // Only detect clicks on 'Only show this module' links
                if (event.target.closest(`.${styles.selectModule}`) === null) return;

                // Prevent module collapse
                event.stopPropagation();

                // Get module ID
                const moduleId = event.target.closest('.context_module').id;

                // Set clicked module as 'selected'
                setSelectedModule(moduleId);
            }, { capture: true });

            // Prevent expand/collapse when a module is selected
            modules.addEventListener('click', event => {
                // 
                if (selectedModule === null || event.target.closest('.collapse_module_link') === null) return;

                event.stopPropagation();
            }, { capture: true });

            // If a hash is in the URL then this is the first run and some initialization needs to be done
            if (location.hash !== '') {
                // Get the module ID from the URL hash
                const moduleId = window.location.hash.replace(/^#module_/, '');

                // Replace the module ID in the URL hash with slash notation
                window.history.replaceState(null, document.title, window.location.pathname + '/' + moduleId);

                setSelectedModule('context_module_' + moduleId);

                // Keep scrolling window to top to override Canvas' behavior
                const scrollToTopID = setInterval(window.scrollTo, 100, 0, 0);
                const clearScrollToTop = clearInterval.bind(null, scrollToTopID);
                
                // Stop scrolling to top after ten seconds
                setTimeout(clearScrollToTop, 10000);

                // Stop scrolling to top on first wheel, touch or key event
                ['wheel', 'keydown', 'touchstart'].forEach(function (name) {
                    window.addEventListener(name, clearScrollToTop, { capture: true, once: true });
                });

                // Stop scrolling to top on first mousedown on vertical scrollbar
                window.addEventListener('mousedown', function scrollBarHandler(e) {
                    // If X coordinate is greater than the client width the click was on the scrollbar
                    if (e.target === document.documentElement && e.clientX >= document.documentElement.offsetWidth) {
                        window.removeEventListener('mousedown', scrollBarHandler);
                    }
                }, { capture: true });
            }
        });
    });

    return {
        ...require('../package.json'),
        title: __('package.title'),
        description: __('package.description')
    };
}
