/// <reference path="../Libs/underscore-min.js" />

require([
    './Config',
    './module/Ico/item-list',
    './Common',
    './module/generater',
    './module/Ico/drag-ico',
    './KeyEventBind',
    './module/mountain'




], function(CFG, ItemList, common, generater, DragIco, key, mountain, RiverBlock) {
    window.mountain = mountain;
    common.resetWorkZone();
    window.COMMON = common;
    if (window.JSON_DATA) {
        _.each(window.JSON_DATA, function(i) {
            var dIco = new DragIco();
            _.extend(dIco, i);
            dIco.init(i);
            window.ITEM_ARRAY.push(dIco);
            $("#scence_name").val(window.StageScence_title);
            $("#main-stage-editor").append(dIco.dom);
        });
    }



    key.init();
    if (location.href.indexOf("AddStageScence") > -1) {
        //mountain.init();
    }


    var typeBtnHtmlTemplate = '<button type="button" class="btn btn-primary btn-xs">{{data}}</button>';
    var typeArray = [];

    var typeBtnHtml = [];
    _.each(CFG.icos, function(i, n) {
        typeArray.push(i.type);
    });
    typeArray = _.uniq(typeArray);


    _.each(typeArray, function(i, n) {
        typeBtnHtml.push(typeBtnHtmlTemplate.replace("{{data}}", i));
    });

    typeBtnHtml = typeBtnHtml.join("   ");
    $(".control-bar").html(typeBtnHtml);


    $(".control-bar button").bind("click", function(e) {
        $("#item-container").html("");
        var type = this.innerHTML;
        var a = _.filter(CFG.icos, function(item) {
            return item.type == type

        });

        var itemList = new ItemList();
        itemList.init(a);

        _.each(itemList.domArray, function(i, n) {
            $("#item-container").append(i.dom);
        });

    });



});