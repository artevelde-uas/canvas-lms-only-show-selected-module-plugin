
export default function (app, options) {
    app.addRouteListener('course.modules', function () {
        app.addReadyListener('#context_modules', function (el) {
            let anchors = el.querySelectorAll(`.context_module > a:not(${window.location.hash})`);
            
            anchors.forEach(function (anchor) {
                anchor.parentElement.classList.add('hidden');
            });
        });
    });
}
