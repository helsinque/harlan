/* global module, require, numeral */

var Harmonizer = require("color-harmony").Harmonizer,
        Color = require("color"),
        hashObject = require('hash-object'),
        sprintf = require("sprintf"),
        _ = require("underscore"),
        ChartJS = require("chart.js"),
        changeCase = require("change-case");

var harmonizer = new Harmonizer();
var colorMix = "neutral", colors = {
    error: harmonizer.harmonize("#ff1a53", colorMix),
    warning: harmonizer.harmonize("#ffe500", colorMix),
    success: harmonizer.harmonize("#00ff6b", colorMix)
};

var harmonyColors = harmonizer.harmonize('#27c891', 'sixToneCCW')
        .concat(harmonizer.harmonize('#ff9400', 'sixToneCCW'))
        .concat(harmonizer.harmonize('#c48bc8', 'sixToneCCW'));

var rfbStatus = {
    "regular": "success",
    "ativa": "success",
    "pendente": "warning",
    "suspensa": "warning",
    "baixada": "warning",
    "cancelada": "error",
    "nula": "error"
};


module.exports = (controller) => {

    var items = [];

    var closeItems = () => {
        var item;
        while (true) {
            item = items.shift();
            if (!item)
                break;
            item.close();
        }
    };

    /**
     * Agrupa resultados com menos de 5% evitando problemas no gráfico
     * @param {array} data
     * @returns {array}
     */
    var reduceDataset = (data) => {

        var sum = _.reduce(data, (a, b) => {
            return {value: a.value + b.value};
        });

        sum = sum && sum.value ? sum.value : 0;

        var idx = 1;

        return _.map(_.values(_.groupBy(data, (item) => {
            if (item.value < sum * 0.05) {
                return 0;
            }
            return idx++;
        })), (value) => _.reduce(value, (a, b) => {
                a.value += b.value;
                a.color = "#93A7D8";
                a.highlight = new Color("#93A7D8").lighten(0.1).hslString();
                a.label = "Outros";
                return a;
            }
        ));
    };


    controller.registerTrigger("authentication::authenticated::end", "dive::smartReport", () => {
        closeItems();

        var rfbColors = {success: 0, warning: 0, error: 0};
        controller.call("dive::smartReport::doughnut::show",
                "SELECT FROM 'DIVE'.'SpecialReportRFB'",
                "Situação dos Documentos",
                "Situação dos CPF/CNPJs na Receita Federal.",
                require("../../markdown/dive/receita-federal.html"),
                (node) => {
                    var statusIdx = $("_id", node).text().split(" ")[0].toLowerCase();
                    var color = colors[rfbStatus[statusIdx]][rfbColors[rfbStatus[statusIdx]]++];
                    return new Color(color);
                });

        var i = 0;
        controller.call("dive::smartReport::doughnut::show",
        "SELECT FROM 'DIVE'.'SPECIALREPORTINCOMETAX'",
                "Restituição do Imposto de Renda",
                "Exercício do Ano Corrente",
                require("../../markdown/dive/restituicao.html"),
                () => new Color(harmonyColors[i++]));



        i = 0;
        controller.call("dive::smartReport::doughnut::show",
        "SELECT FROM 'DIVE'.'SPECIALREPORTINCOMETAX' WHERE 'LASTYEAR' = 'TRUE'",
                "Restituição do Imposto de Renda",
                "Exercício do Ano Anterior",
                require("../../markdown/dive/restituicao.html"),
                () => new Color(harmonyColors[i++]));

        controller.call("dive::smartReport::polar::show",
                "SELECT FROM 'DIVE'.'SpecialReportCBusca'",
                "Quantidade Média de Registros",
                "Situação dos CPF/CNPJs no bureau de crédito Dive.",
                require("../../markdown/dive/bureau-dive.html"),
                {
                    avgTotalAddress: "Endereços",
                    avgTotalCar: "Carros",
                    avgTotalPhone: "Telefones",
                    avgTotalEmail: "Emails",
                    avgTotalCompany: "Empresas"
                }, {});
    });


    controller.registerCall("dive::smartReport::doughnut::show", (endpoint, title, subtitle, markdown, nodeColor) => {
        controller.serverCommunication.call(endpoint, {
            success: (ret) => {
                controller.call("dive::smartReport::doughnut",
                        title,
                        subtitle,
                        markdown,
                        ret,
                        nodeColor);
            }
        });
    });

    controller.registerCall("dive::smartReport::polar::show", (endpoint, title, subtitle, markdown, inputs, labels) => {
        controller.serverCommunication.call(endpoint, {
            success: (ret) => {
                controller.call("dive::smartReport::polar",
                        title,
                        subtitle,
                        markdown,
                        ret,
                        inputs,
                        labels);
            }
        });
    });


    controller.registerCall("dive::smartReport::polar", (title, subtitle, markdown, ret, inputs, labels) => {

        if (!$("BPQL > body > reduce > result", ret).children().length) {
            return;
        }

        let report = controller.call("report", title, subtitle, null, false),
            paragraph = report.paragraph().html(markdown),
            canvas = report.canvas(330, 330);

        $(".app-content").append(report.element());

        let dataset = [], i = 0;
        for (let name in inputs) {
            let element = $(name, ret),
                status = changeCase.titleCase(inputs[name]),
                total = parseFloat(element.text().replace(",", ".") || '0'),
                colorInstance = new Color(harmonyColors[i++]);

            dataset.push({
                value: Math.round(total * 10000) / 100,
                color: colorInstance.hslString(),
                highlight: colorInstance.lighten(0.1).hslString(),
                label: status
            });

            report.label(sprintf("%s: %s", status, numeral(total || 0).format("0,0.000"))).css({
                "background-color": colorInstance.hslString(),
                "color": colorInstance.light() ? "#000" : "#fff"
            }).insertAfter(paragraph);

        }

        for (let name in labels) {
            let cStatus = changeCase.titleCase(labels[name].replace(/[^0-9a-z\s]/i, '')),
                    Ctotal = parseFloat($(name, ret).text().replace(",", ".") || '0'),
                    cColorInstance = new Color(harmonyColors[i++]);
            report.label(sprintf("%s: %s", cStatus, numeral(cTotal).format("0,0.000"))).css({
                "background-color": cColorInstance.hslString(),
                "color": cColorInstance.light() ? "#000" : "#fff"
            }).insertAfter(paragraph);

        }

        report.gamification("lives");
        new ChartJS(canvas.getContext("2d")).PolarArea(dataset);

    });

    controller.registerCall("dive::smartReport::doughnut", (title, subtitle, markdown, ret, nodeColor) => {

        if (!$("BPQL > body > reduce > result", ret).children().length) {
            return;
        }

        var report = controller.call("report",
                title,
                subtitle,
                null,
                false);

        report.paragraph().html(markdown);

        report.newContent();

        var canvas = report.canvas(250, 250);
        $(".app-content").append(report.element());

        var dataset = [];
        $("BPQL > body node", ret).each((idx, node) => {
            var status = changeCase.titleCase($("_id", node).text()),
                    total = parseInt($("total", node).text()),
                    colorInstance = nodeColor(node);

            dataset.push({
                value: total,
                color: colorInstance.hslString(),
                highlight: colorInstance.lighten(0.1).hslString(),
                label: status
            });

            report.label(sprintf("%s: %d", status, total)).css({
                "background-color": colorInstance.hslString(),
                "color": colorInstance.light() ? "#000" : "#fff"
            });
        });

        new ChartJS(canvas.getContext("2d")).Doughnut(reduceDataset(dataset));
    });



};
