!function(){var a=/SELECT\s+FROM\s+'([^']*)'\.'([^']*)'/i,t=/\'sigla\'\s*=\s*'([^']*)'/i,e=/\'(numero_oab|processo|)\'\s*=\s*'([^']*)'/i;harlan.trigger("projuris::init"),harlan.interface.instance.logo.empty().append($("<div />").addClass("logo-projuris")),harlan.interface.addCSSDocument("css/projuris.min.css"),$(".scroll-down .actions").hide(),$("#input-q").attr({placeholder:"Qual processo você esta procurando?",value:harlan.serverCommunication.apiKey,disabled:"disabled"}),harlan.registerCall("loader::catchElement",function(){return[]}),$("title").text("Projuris | Processos Jurídicos Acompanhados no Sistema"),$("link[rel='shortcut icon']").attr("href","images/favicon-projuris.png"),harlan.serverCommunication.call("SELECT FROM 'PUSHJURISTEK'.'REPORT'",harlan.call("loader::ajax",{success:function(r){var s=harlan.call("section")("Processos Cadastrados","Processos jurídicos acompanhados no sistema","Créditos disponíveis e extrato"),o=$(r),d=harlan.call("generateResult");d.addItem("Usuário",o.find("BPQL > body > username").text());var n=parseInt(o.find("BPQL > body > limit").text()),i=parseInt(o.find("BPQL > body > total").text()),l=i/n*100;console.log("Ainda restam para o usuário: "+l.toString()),(1/0==l||isNaN(l))&&(l=0),d.addItem("Créditos Contratados",numeral(n).format("0,")).addClass("center"),d.addItem("Créditos Utlizados",numeral(i).format("0,")).addClass("center");var c=harlan.interface.widgets.radialProject(d.addItem(null,"").addClass("center").find(".value"),l);l>.8?c.addClass("warning animated flash"):l>.6&&c.addClass("attention animated flash"),d.addItem().append($("<input />").addClass("submit").attr({type:"submit",value:"Adquirir Créditos"})).click(function(a){a.preventDefault(),window.location.href="http://www.projuris.com.br/"});var m=o.find("BPQL > body push");m.length&&(d.addSeparator("Extrato de Processos","Processos Realizados",1===m.length?"1 processo":m.length.toString()+" processos"),m.each(function(r,s){var o=$(s),n=harlan.call("generateResult");n.addItem("Título",o.attr("label")),n.addItem("Versão",o.attr("version")||"0").addClass("center"),n.addItem("Criação",moment(o.attr("created")).format("L")).addClass("center").addClass("center"),n.addItem("Atualização",moment(o.attr("nextJob")).fromNow());var i=o.find("data").text().match(t);i&&n.addItem("Sigla",i[1]);var l=o.find("data").text().match(a);l&&n.addItem(l[1],l[2]).css("width","20%");var c=o.find("data").text().match(e);c&&n.addItem(c[1],c[2]),d.generate().append(n.generate().addClass("table"))})),s[1].append(d.generate()),$(".app-content").append(s[0])}}))}();