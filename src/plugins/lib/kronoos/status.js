module.exports = (controller) => {

    const searchBarContainer = $(".kronoos-application .search-bar .container");
    const loader = $(".kronoos-application .kronoos-q-container i.status-icon");
    const logo = $(".kronoos-application .kronoos-q-container img.kronoos-logo");

    var iterations = 0;

    controller.registerCall("kronoos::status::ajax", function (icon, status, dict) {
        var kronoosStatus = controller.call("kronoos::status", icon, status),
            complete = dict.complete;

        dict.complete = function () {
            if (complete) complete(...arguments);
            kronoosStatus();
        };

        return dict;
    });

    controller.registerCall("kronoos::status", function (icon, status) {
        var it = iterations++;
        if (!it) {
            loader.show();
            logo.hide();
        }

        var statusMessage = $("<div />").addClass("status-message"),
            container = $("<div />").addClass("container"),
            content = $("<div />").addClass("content"),
            iconElement = $("<i />").addClass(`fa ${icon}`);

        statusMessage.append(container.append(content.text(status).prepend(iconElement)))
            .insertAfter(searchBarContainer);

        return function () {
            statusMessage.remove();
            if (!--iterations) {
                loader.hide();
                logo.show();
            }
        };
    });
};
