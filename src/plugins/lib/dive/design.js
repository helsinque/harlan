module.exports = function (controller, config) {

    var siteTemplate = require('../../templates/dive-site.html.js'),
            emailRegex = require("email-regex");

    document.title = "Mergulhe sua cobrança em dados. | Dive";
    controller.interface.helpers.changeFavicon(`${config.url}/favicon.png`);
    require("../../styles/dive.js");
    $("body").append(siteTemplate);

    var resize = function () {
        $("body > .dive-site .call-to-action").css({
            "min-height": $(window).height(),
            "height": $(window).height()
        });
    };

    $(window).resize(resize);
    resize();

    /* única forma segura de sair do sistema e voltar a home */
    $("body > .dive-site .action-login").click(function () {
        controller.interface.helpers.activeWindow(".login");
    });

    controller.registerCall("default::page", function () {
        controller.interface.helpers.activeWindow(".dive-site");
    });

    var emailInput = $("body > .dive-site .email");
    $("body > .dive-site .form-createAccount").submit(function (e) {
        e.preventDefault();
        if (!emailRegex().test(emailInput.val())) {
            emailInput.addClass("error");
            return;
        }
        emailInput.removeClass("error");
        controller.call("bipbop::createAccount", this);
    });

    $(".dive-site .action-buy").click(function (e) {
        e.preventDefault();
        controller.call("bipbop::createAccount");
    });

};
