module.exports = function (controller) {

    if (controller.confs.kronoos.hosts.indexOf(document.location.hostname) >= 0) {
        controller.registerBootstrap("kronoos::init::plataform", function (callback) {
            $.getScript("js/kronoos.js", function () {
                callback();
            });
        });
    }

};
