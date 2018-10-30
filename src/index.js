import i18n from './i18n';


export default function (app, options) {
    app.addRouteListener('course.modules', function () {
        var anchors = [];
        
        if (window.location.hash === '') return;
        
        app.addReadyListener('#context_modules', function (el) {
            anchors = el.querySelectorAll(`.context_module > a:not(${window.location.hash})`);
            
            anchors.forEach(function (anchor) {
                anchor.parentElement.classList.add('hidden');
            });
        });
        
        app.addReadyListener('#content > .header-bar', function (el) {
            if (el.querySelector('.header-bar-left') === null) {
                el.insertAdjacentHTML('afterbegin', `
                    <div class="header-bar-left header-bar__module-layout">
                        <div class="header-bar-left__buttons"></div>
                    </div>
                `);
            }
            
            el.querySelector('.header-bar-left__buttons').insertAdjacentHTML('beforeend', `
                <a class="btn btn-primary view_all_modules" href="#">${i18n.t('view_all_modules')}</a>
            `);
            
            el.querySelector('.header-bar-left__buttons .view_all_modules').addEventListener('click', function () {
                anchors.forEach(function (anchor) {
                    anchor.parentElement.classList.remove('hidden');
                    history.replaceState(null, document.title, location.pathname);
                });
            });
        });
    });
}
